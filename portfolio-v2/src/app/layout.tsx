import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import CustomCursor from "@/components/ui/CustomCursor";

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
    <html lang="en" className="dark">
      <body
        className={`${inter.variable} ${jetbrains.variable} antialiased selection:bg-primary/30 selection:text-primary-foreground`}
      >
        <div className="noise" />
        <CustomCursor />
        {children}
      </body>
    </html>
  );
}
