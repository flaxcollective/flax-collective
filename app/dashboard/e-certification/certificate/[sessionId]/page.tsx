"use client";

import React, { useState, useEffect, use } from "react";
import { useRouter } from "next/navigation";
import { Award, Printer, ShieldCheck, ChevronLeft } from "lucide-react";

interface CertificateDetails {
  sessionId: string;
  examId: string;
  examTitle: string;
  score: number;
  correctCount: number;
  totalCount: number;
  timeTaken: string;
  submittedAt: string;
  passed: boolean;
  certificateId: string;
  studentName: string;
  studentId: string;
}

export default function CertificatePage({ params }: { params: Promise<{ sessionId: string }> }) {
  const resolvedParams = use(params);
  const sessionId = resolvedParams.sessionId;
  const router = useRouter();

  const [cert, setCert] = useState<CertificateDetails | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCert = async () => {
      try {
        const res = await fetch(`/api/student/exams/review?sessionId=${sessionId}`);
        const data = await res.json();
        if (data.success && data.review) {
          if (!data.review.passed) {
            router.push("/dashboard/e-certification");
            return;
          }
          setCert(data.review);
        } else {
          router.push("/dashboard/e-certification");
        }
      } catch (err) {
        console.error("Error loading certificate:", err);
        router.push("/dashboard/e-certification");
      } finally {
        setLoading(false);
      }
    };

    if (sessionId) {
      fetchCert();
    }
  }, [sessionId]);

  const handlePrint = () => {
    window.print();
  };

  if (loading || !cert) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#FAF8F5]">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 border-4 border-gray-200 border-t-[#6E7C3A] rounded-full animate-spin"></div>
          <span className="text-sm font-semibold text-gray-400">Loading digital certificate...</span>
        </div>
      </div>
    );
  }

  const printDate = new Date(cert.submittedAt).toLocaleDateString("en-US", {
    day: "numeric",
    month: "long",
    year: "numeric"
  });

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4 md:p-8 font-sans print:bg-white print:p-0">
      
      {/* Print Control Bar (Hidden on print) */}
      <div className="w-full max-w-4xl mb-6 flex items-center justify-between print:hidden bg-white rounded-2xl border border-gray-150 p-4 shadow-sm select-none">
        <button
          onClick={() => router.push(`/dashboard/e-certification/result/${sessionId}`)}
          className="flex items-center gap-1.5 px-4 py-2 border border-gray-200 hover:bg-gray-50 rounded-xl text-xs font-bold text-gray-600 transition-colors cursor-pointer"
        >
          <ChevronLeft className="w-4 h-4" />
          Back to Results
        </button>

        <button
          onClick={handlePrint}
          className="flex items-center gap-2 px-5 py-2.5 bg-[#6E7C3A] hover:bg-[#5a6630] text-white text-xs font-bold rounded-xl shadow-md transition-all cursor-pointer"
        >
          <Printer className="w-4 h-4" />
          Print / Download PDF
        </button>
      </div>

      {/* Landscape Certificate Container */}
      <div className="w-full max-w-4xl aspect-[1.414/1] bg-white border-[16px] border-double border-[#2F3E56] p-10 md:p-14 text-center shadow-2xl relative flex flex-col justify-between select-none print:shadow-none print:border-[12px] print:my-0 print:mx-auto">
        
        {/* Inner thin decorative border */}
        <div className="absolute inset-2 border border-[#6E7C3A] pointer-events-none print:inset-1.5" />

        {/* Certificate Header */}
        <div className="space-y-4">
          {/* Logo / Badge */}
          <div className="flex items-center justify-center gap-3">
            <img
              src="/assets/images/logo/flax-square-logo.png"
              alt="FLAX Collective Logo"
              className="h-14 w-auto object-contain print:h-12"
            />
          </div>

          <div className="space-y-1">
            <h1 className="text-3xl md:text-4xl font-extrabold text-[#2F3E56] font-serif uppercase tracking-widest print:text-3xl">
              Certificate of Achievement
            </h1>
            <p className="text-[#6E7C3A] font-serif italic text-sm md:text-base tracking-wider mt-1.5">
              This credential certifies that
            </p>
          </div>
        </div>

        {/* Candidate Name */}
        <div className="my-6">
          <h2 className="text-3xl md:text-4xl font-black text-gray-900 border-b-2 border-double border-[#6E7C3A]/50 inline-block px-12 pb-2 font-serif capitalize print:text-3xl">
            {cert.studentName}
          </h2>
          <p className="text-xs text-gray-500 font-medium max-w-md mx-auto leading-relaxed mt-4">
            has successfully completed the curriculum and met the evaluation standards required to earn the industry-recognized qualification in
          </p>
        </div>

        {/* Certification Title */}
        <div className="space-y-2">
          <h3 className="text-xl md:text-2xl font-extrabold text-[#2F3E56] font-serif tracking-wide print:text-lg">
            {cert.examTitle}
          </h3>
          <p className="text-xs text-gray-400 font-semibold uppercase tracking-wider">
            Earned with a score of <strong className="text-[#6E7C3A]">{cert.score}%</strong> on {printDate}
          </p>
        </div>

        {/* Certificate footer details / Signatures */}
        <div className="grid grid-cols-3 items-end gap-4 mt-8 pt-6 border-t border-gray-100/50 print:mt-4 print:pt-4">
          
          {/* Issued By details */}
          <div className="text-left space-y-1 text-[10px] text-gray-500">
            <div className="font-bold uppercase tracking-wider text-gray-400">Authority</div>
            <div className="font-extrabold text-[#2F3E56] text-xs">FLAX Collective</div>
            <div className="flex items-center gap-1 mt-1 font-semibold text-[#6E7C3A]">
              <ShieldCheck className="w-3.5 h-3.5 shrink-0" />
              Verified Status
            </div>
          </div>

          {/* Verification signatures - Removed for now until dynamic logic is added */}
          <div className="text-center flex flex-col items-center">
          </div>

          {/* Certificate IDs */}
          <div className="text-right space-y-1 text-[10px] text-gray-500 select-all">
            <div className="font-bold uppercase tracking-wider text-gray-400">Student ID</div>
            <div className="font-extrabold text-[#2F3E56] font-mono text-xs tracking-tight mb-2">
              {cert.studentId}
            </div>
            <div className="font-bold uppercase tracking-wider text-gray-400">Certificate ID</div>
            <div className="font-extrabold text-[#2F3E56] font-mono text-xs tracking-tight">
              {cert.certificateId}
            </div>
            <div className="text-gray-400 mt-1 font-semibold">
              Verify: www.flaxcollective.com/verify
            </div>
          </div>

        </div>

      </div>

      {/* Styled Print Rules */}
      <style jsx global>{`
        @media print {
          body {
            background: white !important;
            margin: 0 !important;
            padding: 0 !important;
          }
          .print\\:hidden {
            display: none !important;
          }
        }
      `}</style>

    </div>
  );
}
