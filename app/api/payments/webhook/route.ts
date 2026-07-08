import { NextRequest, NextResponse } from "next/server";
import { getDb } from "@/lib/mongodb";
import { verifyICICICallback } from "@/lib/payment/icici";
import { completeEnrollment } from "@/lib/enrollment/service";

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  try {
    const contentType = req.headers.get("content-type") || "";
    let params: Record<string, any> = {};

    if (contentType.includes("form") || contentType.includes("multipart")) {
      const formData = await req.formData();
      formData.forEach((value, key) => {
        params[key] = value.toString();
      });
    } else {
      params = (await req.json()) as Record<string, any>;
    }

    console.log("[ICICI PG WEBHOOK] Received Webhook payload:", JSON.stringify(params));

    // Verify signature
    const isSignatureValid = verifyICICICallback(params);
    if (!isSignatureValid) {
      console.warn("⚠️ ICICI webhook signature verification failed!");
      return NextResponse.json(
        { success: false, message: "Signature verification failed." },
        { status: 400 }
      );
    }

    const merchantTxnNo = params.merchantTxnNo;
    const responseCode = params.responseCode;
    const isSuccess = responseCode === "000" || responseCode === "0000";

    const db = await getDb();
    const transaction = await db.collection("transactions").findOne({ merchantTxnNo });

    if (!transaction) {
      console.error(`[ICICI PG WEBHOOK] Transaction with merchantTxnNo: ${merchantTxnNo} not found.`);
      return NextResponse.json(
        { success: false, message: "Transaction record not found." },
        { status: 404 }
      );
    }

    if (transaction.status !== "pending") {
      console.log(`[ICICI PG WEBHOOK] Webhook skipped. Transaction ${merchantTxnNo} was already processed with status: ${transaction.status}`);
      return NextResponse.json({ success: true, message: "Already processed." }, { status: 200 });
    }

    const pgTxnId = params.originalTxnNo || params.pgTxnId || "";

    if (isSuccess) {
      console.log(`[ICICI PG WEBHOOK] Processing successful payment webhook for transaction ${merchantTxnNo}`);
      
      // Update transaction status to success
      await db.collection("transactions").updateOne(
        { merchantTxnNo },
        { $set: { status: "success", pgTxnId, updatedAt: new Date() } }
      );

      // Complete enrollment
      const enrollmentId = transaction.enrollmentId.toString();
      await completeEnrollment(enrollmentId, pgTxnId);
    } else {
      console.warn(`[ICICI PG WEBHOOK] Processing failed payment webhook for transaction ${merchantTxnNo}. responseCode: ${responseCode}`);
      
      // Update transaction status to failed
      await db.collection("transactions").updateOne(
        { merchantTxnNo },
        {
          $set: {
            status: "failed",
            error: params.responseMessage || "Payment failed or rejected.",
            updatedAt: new Date(),
          },
        }
      );

      // Update enrollment status to failed_payment
      await db.collection("enrollments").updateOne(
        { _id: transaction.enrollmentId },
        { $set: { status: "failed_payment" } }
      );
    }

    return NextResponse.json({ success: true, message: "Webhook processed successfully." }, { status: 200 });
  } catch (err: any) {
    console.error("[ICICI PG WEBHOOK ERROR]", err);
    return NextResponse.json(
      { success: false, message: "Webhook processing internal server error." },
      { status: 500 }
    );
  }
}
