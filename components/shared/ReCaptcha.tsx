import React, { useEffect, useRef } from "react";
import Script from "next/script";

declare global {
  interface Window {
    grecaptcha: any;
    onloadRecaptchaCallback: () => void;
  }
}

interface ReCaptchaProps {
  onVerify: (token: string | null) => void;
}

export default function ReCaptcha({ onVerify }: ReCaptchaProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const widgetIdRef = useRef<number | null>(null);

  useEffect(() => {
    const renderWidget = () => {
      if (
        typeof window !== "undefined" &&
        window.grecaptcha &&
        window.grecaptcha.render &&
        containerRef.current &&
        widgetIdRef.current === null
      ) {
        try {
          const id = window.grecaptcha.render(containerRef.current, {
            sitekey: process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY,
            callback: (token: string) => onVerify(token),
            "expired-callback": () => onVerify(null),
            "error-callback": () => onVerify(null),
          });
          widgetIdRef.current = id;
        } catch (e) {
          console.error("Error rendering reCAPTCHA widget:", e);
        }
      }
    };

    if (typeof window !== "undefined") {
      if (window.grecaptcha && window.grecaptcha.render) {
        renderWidget();
      } else {
        const prevCallback = window.onloadRecaptchaCallback;
        window.onloadRecaptchaCallback = () => {
          if (prevCallback) prevCallback();
          renderWidget();
        };
      }
    }

    return () => {
      if (typeof window !== "undefined" && window.grecaptcha && widgetIdRef.current !== null) {
        widgetIdRef.current = null;
      }
    };
  }, [onVerify]);

  return (
    <div className="flex justify-center my-3 max-w-full overflow-hidden rounded-lg">
      <Script
        src="https://www.google.com/recaptcha/api.js?onload=onloadRecaptchaCallback&render=explicit"
        strategy="afterInteractive"
      />
      <div ref={containerRef} />
    </div>
  );
}
