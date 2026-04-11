import type { Metadata } from "next";
import { Montserrat, Source_Serif_4 } from "next/font/google";
import "./globals.css";
import "./styles/shared.css";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
});

const sourceSerif = Source_Serif_4({
  variable: "--font-source-serif-4",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Flex Collective - Global Hospitality Potential",
  description: "Unlock Global Hospitality Potential with Flex Collective.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${montserrat.variable} ${sourceSerif.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col w-full overflow-x-hidden">
        {children}
      </body>
    </html>
  );
}
