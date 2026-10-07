"use client";

import React, { Suspense, useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowRight, CheckCircle2, AlertCircle } from "lucide-react";

function LoadingState() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#FAF8F5]">
      <div className="flex flex-col items-center gap-4">
        <div className="w-12 h-12 border-4 border-[#2F3E56] border-t-transparent rounded-full animate-spin"></div>
        <p className="text-gray-600 font-medium font-montserrat">Checking transaction status...</p>
      </div>
    </div>
  );
}

function StatusContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const success = searchParams.get("success") === "true";
  const txnNo = searchParams.get("txnNo") || "";
  const message = searchParams.get("message") || "";
  const [secondsLeft, setSecondsLeft] = useState(3);

  useEffect(() => {
    if (!success) return;

    const interval = setInterval(() => {
      setSecondsLeft((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          router.push("/dashboard");
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [success, router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#FAF8F5] px-4 py-12">
      <div className="max-w-md w-full bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden transform transition-all duration-300 animate-fade-in">
        <div className="p-8 flex flex-col items-center text-center">
          {success ? (
            <>
              {/* Success Badge */}
              <div className="w-20 h-20 bg-[#ecfdf5] text-[#10b981] rounded-full flex items-center justify-center mb-5 shadow-inner">
                <CheckCircle2 className="w-12 h-12 text-[#10b981]" />
              </div>
              <h1 className="text-2xl font-bold text-[#2F3E56] font-montserrat mb-2">
                Enrollment Confirmed!
              </h1>
              <p className="text-gray-600 text-sm mb-5 leading-relaxed">
                Thank you for your payment. Your registration has been successfully confirmed. 
                You can now access your learning sessions and certification exams in your dashboard.
              </p>

              {/* Automatic Redirect Banner */}
              <div className="w-full bg-[#736A2F]/10 border border-[#736A2F]/30 rounded-xl py-2.5 px-4 mb-6 flex items-center justify-center gap-2 text-xs font-semibold text-[#736A2F]">
                <span className="w-2 h-2 rounded-full bg-[#736A2F] animate-ping" />
                Redirecting to your Dashboard in {secondsLeft}s...
              </div>

              <div className="w-full bg-[#f8fafc] border border-[#e2e8f0] rounded-xl p-4 mb-6 text-left text-sm">
                <div className="flex justify-between py-1.5 border-b border-[#f1f5f9]">
                  <span className="text-gray-500 font-medium">Status</span>
                  <span className="text-[#10b981] font-bold">SUCCESSFUL</span>
                </div>
                {txnNo && (
                  <div className="flex justify-between py-1.5">
                    <span className="text-gray-500 font-medium">Transaction ID</span>
                    <span className="text-gray-800 font-mono font-bold select-all">{txnNo}</span>
                  </div>
                )}
              </div>

              {/* Action buttons */}
              <div className="w-full flex flex-col gap-3">
                <button
                  onClick={() => router.push("/dashboard")}
                  className="w-full bg-[#2F3E56] hover:bg-[#1e293b] text-white font-semibold py-3 px-6 rounded-xl transition duration-200 text-center font-montserrat shadow-md flex items-center justify-center gap-2 cursor-pointer"
                >
                  Go to Student Dashboard
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </>
          ) : (
            <>
              {/* Failure Badge */}
              <div className="w-20 h-20 bg-[#fef2f2] text-[#ef4444] rounded-full flex items-center justify-center mb-5 shadow-inner">
                <AlertCircle className="w-12 h-12 text-[#ef4444]" />
              </div>
              <h1 className="text-2xl font-bold text-[#2F3E56] font-montserrat mb-2">
                Payment Incomplete
              </h1>
              <p className="text-gray-600 text-sm mb-6 leading-relaxed">
                We couldn't process your payment. {message || "The transaction was rejected or cancelled."}
              </p>

              <div className="w-full bg-[#f8fafc] border border-[#e2e8f0] rounded-xl p-4 mb-8 text-left text-sm">
                <div className="flex justify-between py-1.5 border-b border-[#f1f5f9]">
                  <span className="text-gray-500 font-medium">Status</span>
                  <span className="text-[#ef4444] font-bold">FAILED / DECLINED</span>
                </div>
                {txnNo && (
                  <div className="flex justify-between py-1.5">
                    <span className="text-gray-500 font-medium">Transaction ID</span>
                    <span className="text-gray-800 font-mono font-bold">{txnNo}</span>
                  </div>
                )}
              </div>

              {/* Action buttons */}
              <div className="w-full flex flex-col gap-3">
                <Link
                  href="/programs"
                  className="w-full bg-[#2F3E56] hover:bg-[#1e293b] text-white font-semibold py-3 px-6 rounded-xl transition duration-200 text-center font-montserrat shadow-md"
                >
                  Back to Programs
                </Link>
                <Link
                  href="/contact"
                  className="w-full bg-white hover:bg-gray-50 text-gray-700 font-semibold py-3 px-6 rounded-xl border border-gray-300 transition duration-200 text-center font-montserrat"
                >
                  Contact Support
                </Link>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default function EnrollmentStatusPage() {
  return (
    <Suspense fallback={<LoadingState />}>
      <StatusContent />
    </Suspense>
  );
}
