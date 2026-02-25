import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { AuthProvider } from "@/components/providers/AuthProvider";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";

export const metadata: Metadata = {
  title: {
    default: "AMCATBuddy - Ace AMCAT Automata, Land Your Dream Job",
    template: "%s | AMCATBuddy",
  },
  description: "Practice real AMCAT Automata coding patterns, take mock tests, and prepare to ace your AMCAT assessment. Join thousands preparing for their dream jobs.",
  keywords: ["AMCAT preparation", "AMCAT Automata", "AMCAT coding practice", "AMCAT mock test", "job placement", "coding assessment"],
  icons: {
    icon: "/logo.png",
    apple: "/logo.png",
  },
  openGraph: {
    title: "AMCATBuddy - Ace AMCAT Automata",
    description: "Practice real AMCAT Automata coding patterns and prepare for your dream job.",
    images: ["/logo.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-TG9BFSMCNF"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-TG9BFSMCNF');
          `}
        </Script>
      </head>
      <body>
        <AuthProvider>
          <Header />
          <main className="main">
            {children}
          </main>
          <Analytics />
          <SpeedInsights />
        </AuthProvider>
      </body>
    </html>
  );
}
