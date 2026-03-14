import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import CustomCursor from "@/components/ui/CustomCursor";
import CommandPalette from "@/components/ui/CommandPalette";
import Navbar from "@/components/layout/Navbar";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const jetbrains = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
});

export const viewport: Viewport = {
  themeColor: "#050505",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  title: "Dev Portfolio | Premium Experience",
  description: "A high-performance modern developer portfolio built with Next.js, Framer Motion, and Three.js.",
  openGraph: {
    title: "Dev Portfolio | Modern Experience",
    description: "Premium developer portfolio showcasing interactive 3D and high-performance design.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <body
        className={`${inter.variable} ${jetbrains.variable} antialiased bg-background text-foreground selection:bg-primary/30 selection:text-primary-foreground`}
      >
        <CustomCursor />
        <CommandPalette />
        <Navbar />
        {children}
        
        {/* Simple noise overlay for texture */}
        <div className="fixed inset-0 pointer-events-none z-[999] opacity-[0.03] bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
      </body>
    </html>
  );
}
