import crypto from "crypto";

export function generateHashV1(params: Record<string, any>, secretKey: string): string {
  // Sort keys alphabetically, filter out null, undefined, empty string and "secureHash"
  const sortedKeys = Object.keys(params)
    .filter(
      key =>
        key !== "secureHash" &&
        params[key] !== null &&
        params[key] !== undefined &&
        params[key] !== ""
    )
    .sort();

  // Concatenate values
  const textToHash = sortedKeys.map(key => params[key].toString()).join("");

  // Create HMAC SHA-256 hash in lowercase hex
  return crypto
    .createHmac("sha256", secretKey)
    .update(textToHash)
    .digest("hex")
    .toLowerCase();
}

export function formatTxnDate(date: Date): string {
  const pad = (n: number) => n.toString().padStart(2, "0");
  return (
    date.getFullYear().toString() +
    pad(date.getMonth() + 1) +
    pad(date.getDate()) +
    pad(date.getHours()) +
    pad(date.getMinutes()) +
    pad(date.getSeconds())
  );
}

export interface InitiateSaleParams {
  merchantTxnNo: string;
  amount: string; // must be formatted with 2 decimal places e.g. "100.00"
  customerEmailID: string;
  customerMobileNo: string;
  customerName: string;
  addlParam1?: string; // e.g. Course Code
  addlParam2?: string; // e.g. Enrollment ID
}

export interface InitiateSaleResponse {
  responseCode: string;
  merchantId: string;
  merchantTxnNo: string;
  redirectURI?: string;
  tranCtx?: string;
  secureHash?: string;
  message?: string;
}

export async function initiateICICISale(params: InitiateSaleParams): Promise<InitiateSaleResponse> {
  const merchantId = process.env.ICICI_MERCHANT_ID;
  const secureKey = process.env.ICICI_SECURE_KEY;
  const initiateUrl = process.env.ICICI_INITIATE_SALE_URL;
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

  if (!merchantId || !secureKey || !initiateUrl) {
    throw new Error("ICICI PG configurations are missing in environment variables.");
  }

  const payload: Record<string, any> = {
    merchantId,
    merchantTxnNo: params.merchantTxnNo,
    amount: params.amount,
    currencyCode: "356", // INR
    payType: "0", // Standard Redirection
    customerEmailID: params.customerEmailID,
    transactionType: "SALE",
    returnURL: `${baseUrl}/api/payments/callback`,
    txnDate: formatTxnDate(new Date()),
    customerMobileNo: params.customerMobileNo,
    customerName: params.customerName,
  };

  if (process.env.ICICI_AGGREGATOR_ID) {
    payload.aggregatorID = process.env.ICICI_AGGREGATOR_ID;
  }
  if (params.addlParam1) payload.addlParam1 = params.addlParam1;
  if (params.addlParam2) payload.addlParam2 = params.addlParam2;

  // Generate secure hash
  payload.secureHash = generateHashV1(payload, secureKey);

  console.log("[ICICI PG] Sending Initiate Sale Request payload:", JSON.stringify(payload));

  const response = await fetch(initiateUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    throw new Error(`ICICI PG Initiate Sale HTTP error: ${response.status}`);
  }

  const data = (await response.json()) as InitiateSaleResponse;
  console.log("[ICICI PG] Received Initiate Sale Response:", JSON.stringify(data));

  // Verify response signature if present
  if (data.secureHash) {
    const verifiedHash = generateHashV1(data, secureKey);
    if (verifiedHash !== data.secureHash.toLowerCase()) {
      console.warn("⚠️ ICICI Response signature verification failed!");
      // Under UAT or production we can throw or just log depending on environment strictness
    }
  }

  return data;
}

export function verifyICICICallback(params: Record<string, any>): boolean {
  const secureKey = process.env.ICICI_SECURE_KEY;
  if (!secureKey) {
    console.error("ICICI_SECURE_KEY is missing in environment.");
    return false;
  }

  if (!params.secureHash) {
    console.warn("⚠️ Received callback payload with no secureHash.");
    return false;
  }

  const calculated = generateHashV1(params, secureKey);
  const result = calculated === params.secureHash.toLowerCase();
  if (!result) {
    console.warn(`⚠️ Hash mismatch. Calculated: ${calculated}, Received: ${params.secureHash}`);
  }
  return result;
}
