"use client";

import Sidebar from "@/components/dashboard/Sidebar";
import Header from "@/components/dashboard/Header";
import Footer from "@/components/dashboard/Footer";
import { useAuth } from "@/context/AuthContext";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";
import Script from "next/script";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, loading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  const isExamRoute = pathname?.includes("/e-certification/exam/");

  useEffect(() => {
    if (!loading && !user) {
      window.location.href = "/auth/login";
    }
  }, [user, loading, router]);

  useEffect(() => {
    if (typeof window !== "undefined" && (window as any).fbq) {
      (window as any).fbq("init", "1088562114073343");
      (window as any).fbq("track", "PageView");
    }
  }, []);

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
    return (
      <div className="flex h-screen w-screen justify-center items-center bg-[#FAF8F5]">
        <div className="text-center">
          <p className="text-gray-500 font-medium text-lg">Redirecting to login...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <Script
        id="meta-pixel-dashboard"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '1088562114073343');
            fbq('track', 'PageView');
          `,
        }}
      />
      <noscript>
        <img
          height="1"
          width="1"
          style={{ display: "none" }}
          src="https://www.facebook.com/tr?id=1088562114073343&ev=PageView&noscript=1"
          alt=""
        />
      </noscript>

      {isExamRoute ? (
        children
      ) : (
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
      )}
    </>
  );
}