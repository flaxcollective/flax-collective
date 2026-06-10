// components/dashboard/Footer.tsx
export default function Footer() {
    return (
        <footer className="bg-white border-t border-gray-200 py-2.5 px-6 text-sm text-gray-600">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">

                <div className="grid grid-cols-2 md:flex underline gap-x-2 gap-y-5 md:gap-3 lg:gap-6">
                    <a
                        href="/privacy"
                        className="text-text-body hover:text-[#6e7c3a] font-medium text-nowrap text-sm md:text-base transition"
                    >
                        Privacy Policy
                    </a>

                    <a
                        href="/terms"
                        className="text-text-body hover:text-[#6e7c3a] font-medium text-nowrap text-sm md:text-base transition"
                    >
                        Terms & Conditions
                    </a>

                    <a
                        href="/refund"
                        className="col-span-2 text-center md:col-span-1 md:text-left text-text-body hover:text-[#6e7c3a] font-medium text-nowrap text-sm md:text-base transition"
                    >
                        Refund Policy
                    </a>
                </div>

                <div className="text-text-body hover:text-[#6e7c3a] font-medium  text-xs lg:text-base transition">
                    © 2026 FLAX Collective. All Rights Reserved.
                </div>

            </div>
        </footer>
    );
}