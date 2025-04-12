
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { BrainCircuit, CalendarSearch , Cpu, Eye } from "lucide-react";
import ProductCarousel from "@/components/product-carousel";
import { BorderBeam } from "@/components/ui/border-beam";
import { InteractiveGridPattern } from "@/components/ui/intrective-grid-pattern";
import { cn } from "@/lib/utils";
import {SubscribeEmail, SubscribeButton} from "@/components/Subscribe-email";
import FeaturedCard from "@/components/Featured-cards";
import ArticleCard from "@/components/Article-card";
import { PrismaClient } from "@prisma/client";
import { JSX } from "react";
const prisma = new PrismaClient();

export default async function Home() {
  let featuredGuides: any[] = [];

  try {
    featuredGuides = await prisma.guide.findMany({
      orderBy: { date: "desc" },
      take: 3,
    });
  } catch (err) {
    console.error("Prisma error:", err);
  }

  const iconMap: Record<string, JSX.Element> = {
    "Shopping Tips": <BrainCircuit className="h-5 w-5" />,
    "Price Comparison": <Cpu className="h-5 w-5" />,
    "Shopping Calendar": <CalendarSearch  className="h-5 w-5" />,
  };

  return (
    <div className="@container mx-auto px-4 py-16">
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
            <div className="flex flex-col sm:flex-row gap-4">
              <Button className="bg-purple-600 cursor-pointer pointer-events-auto hover:bg-purple-700 rounded-md text-white">
                <Link href="/compare">Compare Prices</Link>
              </Button>
              <SubscribeButton/>
            </div>
          </div>
          <div className="relative w-full h-[14rem] sm:h-[16rem] md:h-[18rem] lg:h-[24rem] rounded-xl overflow-hidden border-2">
            <ProductCarousel />
            <BorderBeam />
          </div>
        </div>
      </section>

      <section className="mb-20 ">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold">Featured Guides</h2>
          <Link
            href="/guides"
            className="text-purple-500 hover:text-purple-400 text-sm flex items-center gap-2 pointer-events-auto z-5"
          >
            View all <Eye className="h-4 w-4" />
          </Link>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
        {featuredGuides.map((guide:any) => (
          <FeaturedCard
            key={guide.id}
            title={guide.title}
            description={guide.description}
            image={guide.image}
            date={guide.date.toDateString()}
            category={guide.category}
            icon={iconMap[guide.category] || <Eye className="h-5 w-5" />}
            slug={guide.slug}
          />
        ))}
        </div>
      </section>

      <section className="mb-20 ">
        <h2 className="text-2xl font-bold mb-8">Recent Articles</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <ArticleCard
            title="10 Browser Extensions That Help You Save Money While Shopping Online"
            description="Discover the best browser add-ons that automatically find coupon codes, compare prices, and alert you to price drops on your favorite products."
            category="Shopping Tools"
            date="July 5, 2023"
            slug="browser-extensions-save-money"
            image="https://images.unsplash.com/photo-1610986603166-f78428624e76?q=80&w=600&h=400&auto=format&fit=crop"
          />
          <ArticleCard
            title="How to Read Price History Charts to Make Smarter Purchases"
            description="Learn to interpret price fluctuation patterns to determine if a 'sale' is really a good deal or just clever marketing."
            category="Smart Shopping"
            date="July 18, 2023"
            slug="read-price-history-charts"
            image="https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=600&h=400&auto=format&fit=crop"
          />
          <ArticleCard
            title="The Psychology of Discounts: Don't Fall for These Pricing Tricks"
            description="Understand the psychological tactics retailers use to make deals seem better than they are, and how to spot genuine bargains."
            category="Consumer Psychology"
            date="August 3, 2023"
            slug="psychology-of-discounts"
            image="https://images.unsplash.com/photo-1607082350899-7e105aa886ae?q=80&w=600&h=400&auto=format&fit=crop"
          />
        </div>
      </section>

      <SubscribeEmail />
    </div>
  );
}


