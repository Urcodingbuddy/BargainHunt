"use client";

import { useState, useRef, type FormEvent } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { BrainCircuit, Clock, Cpu, Eye } from "lucide-react";
import ProductCarousel from "@/components/product-carousel";
import { BorderBeam } from "@/components/ui/border-beam";
import { InteractiveGridPattern } from "@/components/ui/intrective-grid-pattern";
import { cn } from "@/lib/utils";

export default function Home() {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const newsletterRef = useRef<HTMLElement>(null);

  const scrollToNewsletter = () => {
    newsletterRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSubscribe = async (e: FormEvent) => {
    e.preventDefault();

    if (!email || !email.includes("@")) {
      alert("Please enter a valid email address.");
      return;
    }

    setIsSubmitting(true);

    // Simulate subscription process
    setTimeout(() => {
      alert(
        "Thank you for subscribing to our price alerts and deal notifications."
      );
      setEmail("");
      setIsSubmitting(false);
    }, 1000);
  };

  return (
    <div className="@container mx-auto px-4 py-12">
      <InteractiveGridPattern
        className={cn(
          "[mask-image:radial-gradient(35vw_circle_at_center,white,transparent)]",
          "inset-x-0 inset-y-[-30%] h-[200%] skew-y-12",
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
              <Button
                variant="outline"
                className="border-gray-700 cursor-pointer pointer-events-auto hover:bg-gray-900 rounded-md"
                onClick={scrollToNewsletter}
              >
                Join Newsletter
              </Button>
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
            className="text-purple-500 hover:text-purple-400 text-sm flex items-center gap-2 pointer-events-auto z-20"
          >
            View all <Eye className="h-4 w-4" />
          </Link>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          <FeaturedCard
            title="How to Find the Best Deals on Electronics items ?"
            description="Learn expert strategies for comparing prices, timing your purchases, and using price tracking tools to save big on smartphones, laptops, and other gadgets."
            image="https://images.unsplash.com/photo-1498049794561-7780e7231661?q=80&w=600&h=400&auto=format&fit=crop"
            date="May 15, 2023"
            category="Shopping Tips"
            icon={<BrainCircuit className="h-5 w-5" />}
            slug="find-best-electronics-deals"
          />
          <FeaturedCard
            title="Amazon vs Flipkart: Which Offers Better Prices?"
            description="A comprehensive analysis of pricing strategies, discount patterns, and exclusive deals on both platforms to help you decide where to shop for maximum savings."
            image="https://images.unsplash.com/photo-1563013544-824ae1b704d3?q=80&w=600&h=400&auto=format&fit=crop"
            date="June 2, 2023"
            category="Price Comparison"
            icon={<Cpu className="h-5 w-5" />}
            slug="amazon-vs-flipkart-price-comparison"
          />
          <FeaturedCard
            title="Ultimate Seasonal Sales Guide: When to Buy What ?"
            description="Discover the best times of year to purchase different product categories for maximum discounts, from electronics and appliances to clothing and furniture."
            image="https://images.unsplash.com/photo-1607083206968-13611e3d76db?q=80&w=600&h=400&auto=format&fit=crop"
            date="June 28, 2023"
            category="Shopping Calendar"
            icon={<Eye className="h-5 w-5" />}
            slug="seasonal-sales-guide"
          />
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

      <section
        ref={newsletterRef}
        id="newsletter"
        className="bg-gray-900 rounded-lg p-8 mb-20 "
      >
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div className="space-y-4">
            <h2 className="text-2xl font-bold">
              Never Miss a <span className="text-purple-500">Deal</span>
            </h2>
            <p className="text-gray-400">
              Subscribe to receive price drop alerts, exclusive discount codes,
              and shopping tips to save more on your favorite products.
            </p>
          </div>
          <form onSubmit={handleSubscribe} className="flex gap-2">
            <Input
              type="email"
              placeholder="Enter your email"
              className="bg-black border-gray-800 focus-visible:ring-purple-500 rounded-md"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <Button
              type="submit"
              className="text-white cursor-pointer bg-purple-600 hover:bg-purple-700 whitespace-nowrap rounded-md"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Subscribing..." : "Subscribe"}
            </Button>
          </form>
        </div>
      </section>
    </div>
  );
}

function FeaturedCard({
  title,
  description,
  image,
  date,
  category,
  icon,
  slug = "",
}: any) {
  return (
    <Card className="backdrop-blur-3xl bg-gradient-to-tl from-purple-900/35 via-black/30 to-transparent border-gray-800 overflow-hidden hover:border-purple-500/50 transition-colors rounded-lg">
      <div className="relative h-48 overflow-hidden group">
        <Image
          src={image || "/placeholder.svg"}
          alt={title}
          fill
          className="transition-transform duration-500 ease-in-out group-hover:scale-110 object-cover"
        />
      </div>
      <CardHeader>
        <div className="flex items-center gap-2 text-sm text-purple-500 mb-2">
          {icon}
          <span>{category}</span>
        </div>
        <CardTitle className="text-xl">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <CardDescription className="text-gray-400">
          {description}
        </CardDescription>
      </CardContent>
      <CardFooter className="flex justify-between text-sm text-gray-500">
        <div className="flex items-center gap-1">
          <Clock className="h-4 w-4" />
          <span>{date}</span>
        </div>
        <Link
          href={`/guides/${slug}`}
          className="text-purple-500 hover:text-white"
        >
          Read more →
        </Link>
      </CardFooter>
    </Card>
  );
}

function ArticleCard({
  title,
  description,
  category,
  date,
  slug = "",
  image,
}: any) {
  return (
    <Link href={`/blog/${slug}`} className="group">
      <div className="space-y-3">
        <div className="relative h-48 rounded-lg overflow-hidden border border-gray-800 hover:border-purple-500/50 transition-colors">
          <Image
            src={image || "/placeholder.svg"}
            alt={`${title} thumbnail`}
            fill
            className="object-cover"
          />
        </div>
        <div>
          <div className="flex items-center gap-2 text-xs text-purple-500 mb-2">
            <BrainCircuit className="h-4 w-4" />
            <span>{category}</span>
          </div>
          <h3 className="font-medium group-hover:text-purple-400 transition-colors">
            {title}
          </h3>
          <p className="text-gray-400 text-sm mt-2 line-clamp-2">
            {description}
          </p>
          <div className="flex items-center gap-1 mt-3 text-xs text-gray-500">
            <Clock className="h-3 w-3" />
            <span>{date}</span>
          </div>
        </div>
      </div>
    </Link>
  );
}
