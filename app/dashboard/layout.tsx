import Sidebar from "@/components/dashboard/Sidebar";
import Header from "@/components/dashboard/Header";
import Footer from "@/components/dashboard/Footer";
import { AuthProvider } from "@/context/AuthContext";
import Dashboard from "@/components/dashboard/Dashboard";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  
  return (
    <div className="flex h-screen ">
     
      <Sidebar />

     
      <div className="flex-1 flex flex-col overflow-hidden">
       
        <Header />
        
        {/* Page Content */}
        <main className="flex-1 overflow-auto  p-4 md:p-6 lg:p-8">
          <Dashboard/>
        </main>
        <Footer />
      </div>
    </div>
  );
}