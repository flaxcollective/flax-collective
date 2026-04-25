import "@/app/styles/home/home-responsive.css";
import Header from "@/components/shared/Header";
import Footer from "@/components/shared/Footer";
import Program from "@/components/program/Program"



export default function Page() {
    return (
        <>
        <Header/>
            <Program/>
           <Footer/>
        </>

    );
}