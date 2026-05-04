import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import type { ReactNode } from "react";
import { CopyProtection } from "@/components/CopyProtection";
import { FloatingWhatsApp } from "@/components/FloatingWhatsApp";
import { SimpleChatbot } from "@/components/SimpleChatbot";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { company } from "@/lib/site-data";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-display",
});

export const metadata: Metadata = {
  title: {
    default: `${company.name} | Designing, Printing & Branding`,
    template: `%s | ${company.name}`,
  },
  description:
    "Shivrudra Graphics Pvt Ltd provides designing, printing, branding, signages, industrial labels, corporate gifts, trophies, engraving, and fabrication in Pune.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${playfair.variable}`}>
        <CopyProtection />
        <SiteHeader />
        {children}
        <SimpleChatbot />
        <FloatingWhatsApp />
        <SiteFooter />
      </body>
    </html>
  );
}
