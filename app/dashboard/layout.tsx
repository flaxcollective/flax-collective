"use client";

import Sidebar from "@/components/dashboard/Sidebar";
import Header from "@/components/dashboard/Header";
import Footer from "@/components/dashboard/Footer";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.replace("/auth/login");
    }
  }, [user, loading, router]);

  if (loading) {
    return (
      <div className="flex h-screen w-screen justify-center items-center bg-[#FAF8F5]">
        <div className="text-center">
          <p className="text-gray-500 font-medium text-lg">Verifying session...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="flex h-screen ">
      <Sidebar />

      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        
        {/* Page Content */}
        <main className="flex-1 overflow-auto  p-4 md:p-6 lg:p-8">
          {children}
        </main>
        <Footer />
      </div>
    </div>
  );
}