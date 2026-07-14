"use client";

import React, { useState } from "react";
import Link from "next/link";
import { CheckCircle2, XCircle, Search, ShieldCheck } from "lucide-react";
import "@/app/styles/auth/GetStarted.css";

interface CertificateDetails {
  certificateId: string;
  studentName: string;
  examTitle: string;
  score: number;
  issueDate: string;
  enrollmentId: string;
}

export default function VerifyPage() {
  const [certId, setCertId] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<{
    success: boolean;
    certificate?: CertificateDetails;
    message?: string;
  } | null>(null);

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!certId.trim()) return;

    setLoading(true);
    setResult(null);

    try {
      const res = await fetch(`/api/verify?certId=${encodeURIComponent(certId.trim())}`);
      const data = await res.json();
      setResult(data);
    } catch (error) {
      setResult({ success: false, message: "Network error occurred. Please try again." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="signstarted-bg min-h-screen w-full flex items-center justify-center p-4">
      <div className="signupstarted-card max-w-md w-full relative">
        
        {/* Logo */}
        <Link href="/" className="block mb-6 text-center">
          <img
            src="/assets/images/logo/flax-square-logo.png"
            alt="FLAX Collective Logo"
            className="getstarted-logo mx-auto"
          />
        </Link>

        <h2 className="text-2xl font-bold text-center text-[#2F3E56] font-serif mb-2">
          Verify Certificate
        </h2>
        <p className="text-center text-gray-500 text-xs mb-8 leading-relaxed px-4">
          Enter a Certificate ID to verify the authenticity of a FLAX Collective certification credential.
        </p>

        <form onSubmit={handleVerify} className="space-y-4">
          <div>
            <div className="relative">
              <input
                type="text"
                value={certId}
                onChange={(e) => setCertId(e.target.value)}
                placeholder="e.g. CPS-2026-000001"
                className="w-full px-4 py-3 pl-10 border border-gray-300 bg-[#F0F0F0] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#6E7C3A] font-mono text-sm tracking-wide text-gray-800"
                required
              />
              <Search className="w-4 h-4 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2" />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading || !certId.trim()}
            className="w-full bg-[#2F3E56] hover:bg-[#1f2a3a] text-white py-3.5 rounded-xl font-bold text-sm shadow-md transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                Verifying...
              </>
            ) : (
              <>
                <ShieldCheck className="w-4 h-4" />
                Verify Credential
              </>
            )}
          </button>
        </form>

        {/* Results Area */}
        {result && (
          <div className="mt-8 pt-6 border-t border-gray-100 animate-fade-in">
            {result.success && result.certificate ? (
              <div className="bg-[#f7f9f6] border border-[#6E7C3A]/30 rounded-2xl p-6 text-center space-y-4 shadow-sm">
                <div className="w-14 h-14 bg-green-100 rounded-full flex items-center justify-center mx-auto text-green-600">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <div>
                  <h3 className="text-green-800 font-bold text-lg">Valid Certification</h3>
                  <p className="text-xs text-gray-500 mt-1">This credential is official and verified.</p>
                </div>
                
                <div className="bg-white rounded-xl p-4 text-left border border-gray-100 space-y-3 mt-4">
                  <div>
                    <span className="block text-[10px] text-gray-400 font-bold uppercase tracking-wider">Candidate</span>
                    <strong className="text-sm text-[#2F3E56] capitalize">{result.certificate.studentName}</strong>
                  </div>
                  <div>
                    <span className="block text-[10px] text-gray-400 font-bold uppercase tracking-wider">Certification</span>
                    <strong className="text-sm text-[#2F3E56] font-serif">{result.certificate.examTitle}</strong>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <span className="block text-[10px] text-gray-400 font-bold uppercase tracking-wider">Score</span>
                      <strong className="text-sm text-[#6E7C3A]">{result.certificate.score}%</strong>
                    </div>
                    <div>
                      <span className="block text-[10px] text-gray-400 font-bold uppercase tracking-wider">Issue Date</span>
                      <strong className="text-xs text-[#2F3E56]">{new Date(result.certificate.issueDate).toLocaleDateString("en-US", { year: 'numeric', month: 'short', day: 'numeric'})}</strong>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-red-50 border border-red-100 rounded-2xl p-6 text-center space-y-3">
                <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto text-red-500">
                  <XCircle className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-red-800 font-bold">Invalid Certificate ID</h3>
                  <p className="text-xs text-red-600/80 mt-1">{result.message || "We couldn't find a valid credential matching this ID."}</p>
                </div>
              </div>
            )}
          </div>
        )}

      </div>
    </div>
  );
}
