import type { Metadata } from "next";
import { Navbar } from "@/components/layout/navbar/Navbar";
import { Footer } from "@/components/layout/footer/Footer";
import { Titillium_Web, Lato } from "next/font/google";
import "./globals.css";

// 👇 Import Providers here
import { Providers } from "@/providers/Providers";

export const metadata: Metadata = {
  title: "DailyBlock",
  description: "Crypto community and insights platform",
};

const titilliumWeb = Titillium_Web({
  subsets: ["latin"],
  weight: ["200", "300", "400", "600", "700", "900"],
  display: "swap",
});
// Lato → for headings
const lato = Lato({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-lato",
  display: "swap",
});
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${titilliumWeb.className}  ${lato.variable} min-h-screen flex flex-col`}>
        <Navbar />
        <main className="flex-grow">
          <Providers>{children}</Providers>
        </main>
        <Footer />
      </body>
    </html>
  );
}
