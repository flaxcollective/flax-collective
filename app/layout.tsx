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
  title: "Flax Collective",
  description: "Where learning meets opportunity. Flax Collective empowers individuals through practical learning, industry connections, and community-driven growth.",
  icons: {
    icon: "/assets/images/flex-collective-logo.png",
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
