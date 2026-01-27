import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "../components/Navbar";
import MobileNavbar from "../components/MobileNavbar";
import SmoothScroll from "../components/SmoothScroll";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "KUATROMETRIC - Agencia de Marketing Digital",
  description: "Agencia de marketing digital premium especializada en estrategias innovadoras y resultados excepcionales.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className="scroll-smooth" suppressHydrationWarning>
      <body className={`${inter.variable} font-sans antialiased`}>
        <SmoothScroll />
        <Navbar />
        <MobileNavbar />
        <main className="pt-[72px] md:pt-[90px] bg-[var(--page-bg)]">
          {children}
        </main>
      </body>
    </html>
  );
}
