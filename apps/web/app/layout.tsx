import type React from "react";
import type { Metadata } from "next";
import { Funnel_Display } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Toaster } from "@/components/ui/toaster";
import { Suspense } from "react";
import Head from "next/head";
import Chatbot from "@/components/Chatbot";
import { CompareProvider } from "@/contexts/CompareContext";

const inter = Funnel_Display({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "BargainHunt - Compare Prices",
  description: "Find the best deals across Amazon and Flipkart",

  openGraph: {
    title: "BargainHunt - Compare Prices",
    description: "Find the best deals across Amazon and Flipkart",
    url: "https://bargainhunt.vercel.app",
    images: [
      {
        url: "./thumbnail-preview.png", // Add your OG image
        width: 1200,
        height: 630,
        alt: "A preview of my Next.js app",
      },
    ],
  },
  icons: {
    icon: "/favicon.ico", // Favicon
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <Head>
        <meta property="og:title" content="BargainHunt" />
        <meta property="og:type" content="E-commerce Compare" />
        <meta property="og:url" content="https://bargainhunt.vercel.app" />
        <meta property="og:image" content="./thumbnail-preview.png" />
        <meta
          property="og:description"
          content="Find the best deals across Amazon and Flipkart"
        />
      </Head>
      <body className={`${inter.className} mini-scrollbar`}>
        <div className="min-h-screen flex flex-col">
          <Header />
          <main className="flex-1 mx-2 sm:mx-8 md:mx-12 lg:mx-14">
            <CompareProvider>
              <Suspense>
                {children}
                <Chatbot />
              </Suspense>
            </CompareProvider>
          </main>
          <Footer />
          <Toaster />
        </div>
      </body>
    </html>
  );
}
