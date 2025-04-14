export const dynamic = "force-dynamic";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { BrainCircuit, CalendarSearch, Cpu, Eye, LucideBolt, Zap } from "lucide-react";
import ProductCarousel from "@/components/product-carousel";
import { BorderBeam } from "@/components/ui/border-beam";
import { InteractiveGridPattern } from "@/components/ui/intrective-grid-pattern";
import { cn } from "@/lib/utils";
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

  if (!featuredGuides) {
    return (
      <div className="min-h-screen text-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-4">No Guides Found</h1>
          <p className="mb-6">We couldn't find any guides at the moment.</p>
        </div>
      </div>
    );
  }

  let recentAritcles: any[] = [];
  try {
    recentAritcles = await prisma.article.findMany({
      orderBy: { date: "desc" },
      take: 3,
    });
  } catch (err) {
    console.error("Prisma error:", err);
  }
  if (!recentAritcles) {
    return (
      <div className="min-h-screen text-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-4">No Guides Found</h1>
          <p className="mb-6">We couldn't find any guides at the moment.</p>
        </div>
      </div>
    );
  }

  const iconMap: Record<string, JSX.Element> = {
    "Shopping Tips": <BrainCircuit className="h-5 w-5" />,
    "Price Comparison": <Cpu className="h-5 w-5" />,
    "Shopping Calendar": <CalendarSearch className="h-5 w-5" />,
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
          {featuredGuides.map((guide: any) => (
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
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold">Recent Articles</h2>
          <Link
            href="/blogs"
            className="text-purple-500 hover:text-purple-400 text-sm flex items-center gap-2 pointer-events-auto z-5"
          >
            View all <Eye className="h-4 w-4" />
          </Link>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {recentAritcles.map((article: any) => (
            <ArticleCard
              key={article.id}
              title={article.title}
              description={article.description}
              category={article.category}
              date={article.date.toDateString()}
              slug={article.slug}
              image={article.image}
            />
          ))}
        </div>
      </section>
    </div>
  );
}
