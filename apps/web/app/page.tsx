import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Eye, Zap, BookHeadphones, Newspaper } from "lucide-react";
import ProductCarousel from "@/components/product-carousel";
import { BorderBeam } from "@/components/ui/border-beam";
import { InteractiveGridPattern } from "@/components/ui/intrective-grid-pattern";
import { cn } from "@/lib/utils";
import FeaturedGuidesSection from "@/components/FeaturedGuidesSection";
import RecentArticlesSection from "@/components/RecentArticlesSection";
import TestimonialClient from "@/components/ui/testimonials";
import FAQ from "@/components/FAQ";

export default async function Home() {
  return (
    <main className="@container mx-auto px-4 py-16">
      <InteractiveGridPattern
        className={cn(
          "[mask-image:radial-gradient(35vw_circle_at_center,white,transparent)]",
          "inset-x-0 inset-y-[-30%] h-[200%] skew-y-12"
        )}
      />
      <section className="relative mb-20 pointer-events-none">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h1 className="text-4xl md:text-6xl font-bold leading-tight">
              Find the Best <span className="text-purple-500">Deals</span>{" "}
              Across Amazon and Flipkart
            </h1>
            <p className="text-gray-400 text-lg md:text-xl">
              Compare prices, discover discounts, and make smarter shopping
              decisions with our real-time price comparison tool.
            </p>
            <div className="flex justify-self-start items-center gap-4">
              <Link href="/products">
                {" "}
                <Button className="bg-purple-600 cursor-pointer pointer-events-auto hover:bg-purple-700 rounded-md text-white">
                  Compare Prices
                </Button>
              </Link>
              <Link href="/compare">
                <Button className="bg-transparent hover:text-yellow-500 border-2 hover:bg-black/60 cursor-pointer pointer-events-auto rounded-md text-white">
                  Live Search <Zap className="ml-2 h-4 w-4 inline-block " />
                </Button>
              </Link>
            </div>
          </div>
          <div className="relative w-full h-[14rem] sm:h-[16rem] md:h-[18rem] lg:h-[24rem] rounded-xl overflow-hidden border-2">
            <ProductCarousel />
            <BorderBeam />
          </div>
        </div>
      </section>

      <section className="mb-20">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold gap-2 flex items-center">
            Featured Guides{" "}
            <BookHeadphones className="text-purple-600 h-6 w-6" />
          </h2>
          <Link
            href="/guides"
            className="text-purple-500 pointer-events z-10 hover:text-yellow-500 text-sm flex items-center gap-2"
          >
            View all <Eye className="h-4 w-4" />
          </Link>
        </div>
        <FeaturedGuidesSection />
      </section>

      <section className="mb-20">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold flex items-center gap-2">
            Recent Articles
            <Newspaper className="text-purple-600 h-6 w-6" />
          </h2>
          <Link
            href="/blogs"
            className="text-purple-500 pointer-events-auto z-10 hover:text-yellow-500 text-sm flex items-center gap-2"
          >
            View all <Eye className="h-4 w-4" />
          </Link>
        </div>
        <RecentArticlesSection />
      </section>
      <section>
        <TestimonialClient />
      </section>
      <section className="min-h-screen">
        <FAQ/>
      </section>
    </main>
  );
}
