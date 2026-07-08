import { NextRequest, NextResponse } from "next/server";
import { getDb } from "@/lib/mongodb";
import { verifyICICICallback } from "@/lib/payment/icici";
import { completeEnrollment } from "@/lib/enrollment/service";

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
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

    console.log("[ICICI PG CALLBACK] Received Callback payload:", JSON.stringify(params));

    // Verify Callback Signature Check
    const isSignatureValid = verifyICICICallback(params);
    if (!isSignatureValid) {
      console.warn("⚠️ ICICI callback signature verification failed!");
      return NextResponse.redirect(
        `${baseUrl}/enrollment/status?success=false&message=${encodeURIComponent("Security signature check failed.")}`,
        303
      );
    }

    const merchantTxnNo = params.merchantTxnNo;
    const responseCode = params.responseCode;
    const isSuccess = responseCode === "000" || responseCode === "0000";

    const db = await getDb();
    const transaction = await db.collection("transactions").findOne({ merchantTxnNo });

    if (!transaction) {
      console.error(`[ICICI PG CALLBACK] Transaction with merchantTxnNo: ${merchantTxnNo} not found.`);
      return NextResponse.redirect(
        `${baseUrl}/enrollment/status?success=false&message=${encodeURIComponent("Transaction record not found.")}`,
        303
      );
    }

    // Determine target pgTxnId
    const pgTxnId = params.originalTxnNo || params.pgTxnId || "";

    if (transaction.status === "pending") {
      if (isSuccess) {
        console.log(`[ICICI PG CALLBACK] Payment successful for transaction ${merchantTxnNo}`);

        // Update transaction status to success
        await db.collection("transactions").updateOne(
          { merchantTxnNo },
          { $set: { status: "success", pgTxnId, updatedAt: new Date() } }
        );

        // Finalize enrollment using enrollment/service helper
        const enrollmentId = transaction.enrollmentId.toString();
        await completeEnrollment(enrollmentId, pgTxnId);
      } else {
        console.warn(`[ICICI PG CALLBACK] Payment rejected for transaction ${merchantTxnNo}. responseCode: ${responseCode}`);

        // Update transaction to failed
        await db.collection("transactions").updateOne(
          { merchantTxnNo },
          {
            $set: {
              status: "failed",
              error: params.responseMessage || "Payment rejected by gateway.",
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
    } else {
      console.log(`[ICICI PG CALLBACK] Transaction ${merchantTxnNo} was already processed with status: ${transaction.status}`);
    }

    if (isSuccess) {
      return NextResponse.redirect(
        `${baseUrl}/enrollment/status?success=true&txnNo=${merchantTxnNo}`,
        303
      );
    } else {
      const errMsg = params.responseMessage || "Payment failed or rejected.";
      return NextResponse.redirect(
        `${baseUrl}/enrollment/status?success=false&message=${encodeURIComponent(errMsg)}&txnNo=${merchantTxnNo}`,
        303
      );
    }
  } catch (err: any) {
    console.error("[ICICI PG CALLBACK ERROR]", err);
    return NextResponse.redirect(
      `${baseUrl}/enrollment/status?success=false&message=${encodeURIComponent("Callback processing server error.")}`,
      303
    );
  }
}
