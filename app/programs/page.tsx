import "@/app/styles/home/home-responsive.css";
import { Suspense } from "react";
import Header from "@/components/shared/Header";
import Footer from "@/components/shared/Footer";
import Program from "@/components/program/Program";

export default function Page() {
    return (
        <>
            <Header />
            <Suspense fallback={<div className="min-h-screen bg-[#FAF8F5]" />}>
                <Program />
            </Suspense>
            <Footer />
        </>
    );
}