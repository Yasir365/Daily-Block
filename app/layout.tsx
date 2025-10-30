
import type { Metadata } from "next";
import LayoutWrapper from "@/providers/Layout";
import { Titillium_Web, Lato, Unbounded, Mulish, Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";

export const metadata: Metadata = {
  title: "DailyBlock",
  description: "Crypto community and insights platform",
};

const titilliumWeb = Titillium_Web({
  subsets: ["latin"],
  weight: ["200", "300", "400", "600", "700", "900"],
  display: "swap",
});

const lato = Lato({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-lato",
  display: "swap",
});
// ✅ Unbounded → for special headings or highlights
const unbounded = Unbounded({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  variable: "--font-unbounded",
  display: "swap",
});
// ✅ Mulish → for UI labels, buttons, or modern clean text
const mulish = Mulish({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-mulish",
  display: "swap",
});
// Inter → for dashboard numbers, labels, etc.
const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-inter",
  display: "swap",
});
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${titilliumWeb.className} ${lato.variable} min-h-screen flex flex-col`} suppressHydrationWarning>
        <LayoutWrapper>{children}</LayoutWrapper>
        <Toaster position="top-right" />

      </body>
    </html>
  );
}
