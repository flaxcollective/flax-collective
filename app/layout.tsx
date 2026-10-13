import type { Metadata } from "next";
import { Montserrat, Source_Serif_4, Inter } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import "./styles/shared.css";
import "./styles/animations.css";
import { cn } from "@/lib/utils";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { AuthProvider } from "@/context/AuthContext";
import PixelRouteTracker from "@/components/analytics/PixelRouteTracker";

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
  description:
    "Where learning meets opportunity. Flax Collective empowers individuals through practical learning, industry connections, and community-driven growth.",
  icons: {
    icon: "/assets/images/flex-collective-logo.png",
  },
  alternates: {
    canonical: "https://www.flaxcollective.com/",
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
      <head>
        <meta name="google-site-verification" content="t3sNZ8RRA8Dix18tkniOsqTPxH7wHskzcTfrBlRfkq8" />
        <Script
          id="meta-pixel"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              !function(f,b,e,v,n,t,s)
              {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
              n.callMethod.apply(n,arguments):n.queue.push(arguments)};
              if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
              n.queue=[];t=b.createElement(e);t.async=!0;
              t.src=v;s=b.getElementsByTagName(e)[0];
              s.parentNode.insertBefore(t,s)}(window, document,'script',
              'https://connect.facebook.net/en_US/fbevents.js');
              fbq('init', '1471567164840164');
              fbq('track', 'PageView');
            `,
          }}
        />
        <noscript>
          <img
            height="1"
            width="1"
            style={{ display: "none" }}
            src="https://www.facebook.com/tr?id=1471567164840164&ev=PageView&noscript=1"
            alt=""
          />
        </noscript>
      </head>
      <body className="min-h-full flex flex-col w-full overflow-x-hidden" suppressHydrationWarning>
        <AuthProvider>
          <PixelRouteTracker />
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}