import "@/app/styles/home/home-responsive.css";
import Header from "@/components/shared/Header";
import Footer from "@/components/shared/Footer";
import Home from "@/components/home/Home";

export default function Page() {
  return (
    <main>
      <Header />
      <Home />
      <Footer />
    </main>
  );
}
