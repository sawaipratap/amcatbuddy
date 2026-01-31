import type { Metadata } from "next";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { AuthProvider } from "@/components/providers/AuthProvider";

export const metadata: Metadata = {
  title: {
    default: "AMCATBuddy - Ace AMCAT Automata, Land Your Dream Job",
    template: "%s | AMCATBuddy",
  },
  description: "Practice real AMCAT Automata coding patterns, take mock tests, and prepare to ace your AMCAT assessment. Join thousands preparing for their dream jobs.",
  keywords: ["AMCAT preparation", "AMCAT Automata", "AMCAT coding practice", "AMCAT mock test", "job placement", "coding assessment"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          <Header />
          <main className="main">
            {children}
          </main>
        </AuthProvider>
      </body>
    </html>
  );
}
