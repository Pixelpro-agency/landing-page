import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import CookieConsent from '../components/CookieConsent';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "EstateVision | Unified Asset Intelligence",
  description: "Operational intelligence and predictive risk monitoring for high-security environments.",
  alternates: {
    types: {
      'text/plain': [
        { url: '/llm.txt', title: 'EstateVision LLM Protocol' },
      ],
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
        <CookieConsent />
      </body>
    </html>
  );
}
