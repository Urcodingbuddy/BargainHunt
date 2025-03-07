import type { Metadata } from "next";
import { Tomorrow } from "next/font/google";
import "./globals.css";
import { ScraperProvider } from "./context/ScraperContext";
import Branding from "./components/Branding";
import HeroSection from "./components/HeroSection";
const tomorrow = Tomorrow({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-tomorrow",
});

export const metadata: Metadata = {
  title: "BargainHunt | Find the best deals on products",
  description: "BargainHunt is a platform for finding the best deals on products",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${tomorrow.className}
      [&::-webkit-scrollbar]:w-2
            [&::-webkit-scrollbar-track]:bg-[#1a11a]
            [&::-webkit-scrollbar-thumb]:bg-primary/50
            [&::-webkit-scrollbar-thumb]:rounded-full
            [&::-webkit-scrollbar-thumb]:border-2
            [&::-webkit-scrollbar-thumb]:border-[#1a1a1a]
            [&::-webkit-scrollbar-thumb]:hover:bg-primary`}>
        <ScraperProvider>
         <Branding />
         {children}
        </ScraperProvider>
      </body>
    </html>
  );
}
