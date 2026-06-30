"use client";

import Sidebar from "@/components/dashboard/Sidebar";
import Header from "@/components/dashboard/Header";
import Footer from "@/components/dashboard/Footer";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function AdminDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading) {
      if (!user) {
        router.replace("/auth/login");
      } else if (user.usertype !== "admin") {
        router.replace("/dashboard");
      }
    }
  }, [user, loading, router]);

  if (loading) {
    return (
      <div className="flex h-screen w-screen justify-center items-center bg-[#FAF8F5]">
        <div className="text-center">
          <p className="text-gray-500 font-medium text-lg">Verifying admin session...</p>
        </div>
      </div>
    );
  }

  if (!user || user.usertype !== "admin") {
    return null;
  }

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Header */}
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

