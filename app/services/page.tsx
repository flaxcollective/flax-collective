import "@/app/styles/home/home-responsive.css";
import Header from "@/components/shared/Header";
import Footer from "@/components/shared/Footer";
import Services from "@/components/services/service";



export default function Page() {
    return (
        <>
        <Header/>
           <Services/>
           <Footer/>
        </>

    );
}