import "@/app/styles/home/home-responsive.css";
import Header from "@/components/shared/Header";
import Footer from "@/components/shared/Footer";
import ContactHero from "@/components/contact/ContactHero";



export default function Page() {
    return (
        <>
        <Header/>
            <ContactHero/>
         
        <Footer/>
        </>

    );
}