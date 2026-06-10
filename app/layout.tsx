import type { Metadata } from "next";
<<<<<<< HEAD
import { Montserrat, Source_Serif_4, Inter } from "next/font/google";
import "./globals.css";
import "./styles/shared.css";
import "./styles/animations.css";
import { cn } from "@/lib/utils";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { AuthProvider } from "@/context/AuthContext";

const inter = Inter({ subsets: ['latin'], variable: '--font-sans' });
=======
import { Montserrat, Source_Serif_4 } from "next/font/google";
import "./globals.css";
import "./styles/shared.css";
import "./styles/animations.css";
>>>>>>> 70a3c600e509d3d5019cd6c5191f9e78e42e0186

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
  description: "Train.Transform.Thrive.",
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
<<<<<<< HEAD
      className={cn("h-full", "antialiased", montserrat.variable, sourceSerif.variable, "font-sans", inter.variable)}
    >
      <body className="min-h-full flex flex-col w-full overflow-x-hidden" >
        <AuthProvider>
          {children}
        </AuthProvider>
=======
      className={`${montserrat.variable} ${sourceSerif.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col w-full overflow-x-hidden">
        {children}
>>>>>>> 70a3c600e509d3d5019cd6c5191f9e78e42e0186
      </body>
    </html>
  );
}
