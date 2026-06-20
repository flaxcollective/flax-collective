// components/dashboard/Footer.tsx
import Link from "next/link";

export default function Footer() {
    return (
        <footer className="bg-white border-t border-gray-200 py-2 px-6 text-gray-600">
            <div className="flex flex-col md:flex-row items-center justify-between gap-2">

                <div className="flex flex-col items-center gap-y-1.5 md:flex-row md:flex-wrap underline gap-x-2 md:gap-3 lg:gap-6">
                    {/* Group 1: About, Contact & Privacy */}
                    <div className="flex flex-wrap justify-center gap-x-4 gap-y-1 md:contents">
                        <Link
                            href="/about"
                            className="text-text-body hover:text-[#6e7c3a] font-medium text-nowrap text-[11px] transition"
                        >
                            About Us
                        </Link>

                        <Link
                            href="/contact"
                            className="text-text-body hover:text-[#6e7c3a] font-medium text-nowrap text-[11px] transition"
                        >
                            Contact Us
                        </Link>

                        <Link
                            href="/privacy-policy"
                            className="text-text-body hover:text-[#6e7c3a] font-medium text-nowrap text-[11px] transition"
                        >
                            Privacy Policy
                        </Link>
                    </div>

                    {/* Group 2: Terms & Refund */}
                    <div className="flex flex-wrap justify-center gap-x-4 gap-y-1 md:contents">
                        <Link
                            href="/terms-conditions"
                            className="text-text-body hover:text-[#6e7c3a] font-medium text-nowrap text-[11px] transition"
                        >
                            Terms & Conditions
                        </Link>

                        <Link
                            href="/refund-policy"
                            className="text-text-body hover:text-[#6e7c3a] font-medium text-nowrap text-[11px] transition"
                        >
                            Refund & Cancellation Policy
                        </Link>
                    </div>
                </div>

                <div className="text-text-body hover:text-[#6e7c3a] font-medium text-[11px] transition">
                    © {new Date().getFullYear()} FLAX Collective. All Rights Reserved.
                </div>

            </div>
        </footer>
    );
}