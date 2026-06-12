import Sidebar from "@/components/dashboard/Sidebar";
import Header from "@/components/dashboard/Header";
import Footer from "@/components/dashboard/Footer";

export default function AdminDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
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

