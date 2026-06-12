import type { Metadata } from "next";
import { Montserrat, Source_Serif_4, Inter } from "next/font/google";
import "./globals.css";
import "./styles/shared.css";
import "./styles/animations.css";
import { cn } from "@/lib/utils";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { AuthProvider } from "@/context/AuthContext";

const inter = Inter({ subsets: ['latin'], variable: '--font-sans' });

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
});

const sourceSerif = Source_Serif_4({
  variable: "--font-source-serif-4",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://www.flaxcollective.com'),
  title: "Flax Collective",
  description: "Flax Collective is an educational and industry engagement platform redefining how learning is experienced. By bridging the gap between academia and industry, we create immersive opportunities that enable learners to gain insight, build capability, and explore future possibilities beyond traditional education.",
  icons: {
    icon: "/assets/images/flex-collective-logo.png",
  },
  verification: {
    google: "t3sNZ8RRA8Dix18tkniOsqTPxH7wHskzcTfrBlRfkq8",
  },
  alternates: {
    canonical: 'https://www.flaxcollective.com/',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={cn("h-full", "antialiased", montserrat.variable, sourceSerif.variable, "font-sans", inter.variable)}
    >
      <body className="min-h-full flex flex-col w-full overflow-x-hidden" suppressHydrationWarning>
        <AuthProvider>
          {children}
        </AuthProvider> 
      </body>
    </html>
  );
}
