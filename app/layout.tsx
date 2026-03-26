import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import CustomCursor from "@/components/ui/CustomCursor";
import Navbar from "@/components/layout/Navbar";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#050505",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  title: "Suhaib — Software Engineer",
  description: "Software Engineer specializing in Product & AI Systems. Minimalist, high-performance architecture.",
  icons: {
    icon: "/favicon.png",
  },
  keywords: ["developer", "portfolio", "React", "Next.js", "TypeScript", "Python", "AI", "Software Engineer"],
  authors: [{ name: "Suhaib" }],
  creator: "Suhaib",
  openGraph: {
    title: "Suhaib — Developer Portfolio",
    description: "Junior developer. I build (and break) things for the web.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    creator: "@suhaibX0",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth dark">
      <body
        className={`${inter.variable} ${jetbrains.variable} antialiased`}
        style={{ background: "var(--bg)", color: "var(--foreground)" }}
      >
        <div className="noise-overlay" />
        <CustomCursor />
        <Navbar />
        {children}
      </body>
    </html>
  );
}
