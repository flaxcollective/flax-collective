"use client";

import React, { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

function LoadingState() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f9fafb]">
      <div className="flex flex-col items-center gap-4">
        <div className="w-12 h-12 border-4 border-[#2F3E56] border-t-transparent rounded-full animate-spin"></div>
        <p className="text-gray-600 font-medium font-montserrat">Checking transaction status...</p>
      </div>
    </div>
  );
}

function StatusContent() {
  const searchParams = useSearchParams();
  const success = searchParams.get("success") === "true";
  const txnNo = searchParams.get("txnNo") || "";
  const message = searchParams.get("message") || "";

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f9fafb] px-4 py-12">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden transform transition-all duration-300 hover:scale-[1.01] hover:shadow-2xl animate-fade-in">
        <div className="p-8 flex flex-col items-center text-center">
          {success ? (
            <>
              {/* Success Badge */}
              <div className="w-20 h-20 bg-[#ecfdf5] text-[#10b981] rounded-full flex items-center justify-center text-4xl mb-6 shadow-inner animate-bounce">
                ✓
              </div>
              <h1 className="text-2xl font-bold text-[#2F3E56] font-montserrat mb-3">
                Enrollment Confirmed!
              </h1>
              <p className="text-gray-600 text-sm mb-6 leading-relaxed">
                Thank you for your payment. Your enrollment has been successfully completed. 
                A verification email with your onboarding package has been sent to your registered address.
              </p>

              <div className="w-full bg-[#f8fafc] border border-[#e2e8f0] rounded-xl p-4 mb-8 text-left text-sm">
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
            </>
          ) : (
            <>
              {/* Failure Badge */}
              <div className="w-20 h-20 bg-[#fef2f2] text-[#ef4444] rounded-full flex items-center justify-center text-4xl mb-6 shadow-inner animate-pulse">
                ✕
              </div>
              <h1 className="text-2xl font-bold text-[#2F3E56] font-montserrat mb-3">
                Payment Failed
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
            </>
          )}

          {/* Action buttons */}
          <div className="w-full flex flex-col gap-3">
            <Link
              href="/dashboard"
              className="w-full bg-[#2F3E56] hover:bg-[#1e293b] text-white font-semibold py-3 px-6 rounded-xl transition duration-200 text-center font-montserrat shadow-md"
            >
              Go to Student Dashboard
            </Link>
            <Link
              href="/"
              className="w-full bg-white hover:bg-gray-50 text-gray-700 font-semibold py-3 px-6 rounded-xl border border-gray-300 transition duration-200 text-center font-montserrat"
            >
              Return to Homepage
            </Link>
          </div>
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
