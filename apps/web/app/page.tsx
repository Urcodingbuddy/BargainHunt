"use client"

import { useState, useRef, type FormEvent } from "react"
import Link from "next/link"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { BrainCircuit, Clock, Cpu, Eye, Github, Linkedin, Mail, Rss, Search, Twitter } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"
import ProductCarousel from "@/components/product-carousel"

export default function Home() {
  const [email, setEmail] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { toast } = useToast()
  const router = useRouter()
  const newsletterRef = useRef<HTMLElement>(null)

  const scrollToNewsletter = () => {
    newsletterRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  const handleSubscribe = async (e: FormEvent) => {
    e.preventDefault()

    if (!email || !email.includes("@")) {
      toast({
        title: "Invalid email",
        description: "Please enter a valid email address.",
        variant: "destructive",
      })
      return
    }

    setIsSubmitting(true)

    // Simulate subscription process
    setTimeout(() => {
      toast({
        title: "Subscription successful!",
        description: "Thank you for subscribing to our newsletter.",
      })
      setEmail("")
      setIsSubmitting(false)
    }, 1000)
  }

  const handleSearchClick = () => {
    router.push("/search?open=true")
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <header className="container mx-auto py-6">
        <div className="flex items-center justify-between">
          <Link href="/" className="text-xl font-bold tracking-tighter">
            Bargain<span className="text-purple-500">Hunt</span>
          </Link>
          <nav className="hidden md:flex items-center space-x-6 text-sm">
            <Link href="/" className="text-gray-400 hover:text-white transition-colors">
              Home
            </Link>
            <Link href="/compare" className="text-gray-400 hover:text-white transition-colors">
              Compare Prices
            </Link>
            <Link href="/deals/" className="text-gray-400 hover:text-white transition-colors">
              Today's Deals
            </Link>
            <Link href="/guides/" className="text-gray-400 hover:text-white transition-colors">
              Buying Guides
            </Link>
          </nav>
          <Button
            variant="outline"
            className="border-purple-500 text-purple-500 hover:bg-purple-950 hover:text-white"
            onClick={handleSearchClick}
          >
            <Search className="h-4 w-4 mr-2" />
            Search
          </Button>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12">
        <section className="mb-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h1 className="text-4xl md:text-6xl font-bold leading-tight">
                Find the Best <span className="text-purple-500">Deals</span> Across Amazon and Flipkart
              </h1>
              <p className="text-gray-400 text-lg md:text-xl">
                Compare prices, discover discounts, and make smarter shopping decisions with our real-time price
                comparison tool.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button className="bg-purple-600 hover:bg-purple-700">
                  <Link href="/compare">Compare Prices</Link>
                </Button>
                <Button variant="outline" className="border-gray-700 hover:bg-gray-900" onClick={scrollToNewsletter}>
                  Join Newsletter
                </Button>
              </div>
            </div>
            <div className="relative h-[400px] rounded-xl overflow-hidden border border-gray-800">
              <ProductCarousel />
            </div>
          </div>
        </section>

        <section className="mb-20">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold">Featured Guides</h2>
            <Link href="/guides" className="text-purple-500 hover:text-purple-400 text-sm flex items-center gap-2">
              View all <Eye className="h-4 w-4" />
            </Link>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <FeaturedCard
              title="How to Find the Best Deals on Electronics"
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
              title="Seasonal Sales Guide: When to Buy What"
              description="Discover the best times of year to purchase different product categories for maximum discounts, from electronics and appliances to clothing and furniture."
              image="https://images.unsplash.com/photo-1607083206968-13611e3d76db?q=80&w=600&h=400&auto=format&fit=crop"
              date="June 28, 2023"
              category="Shopping Calendar"
              icon={<Eye className="h-5 w-5" />}
              slug="seasonal-sales-guide"
            />
          </div>
        </section>

        <section className="mb-20">
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
            <ArticleCard
              title="Hidden Costs of Online Shopping: Shipping, Taxes, and More"
              description="Learn how to calculate the true cost of your online purchases by factoring in all additional expenses beyond the listed price."
              category="Shopping Guide"
              date="August 15, 2023"
              slug="hidden-costs-online-shopping"
              image="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?q=80&w=600&h=400&auto=format&fit=crop"
            />
            <ArticleCard
              title="How to Set Up Price Drop Alerts for Your Wishlist Items"
              description="A step-by-step guide to creating automated notifications for when products you want go on sale across multiple retailers."
              category="Price Tracking"
              date="September 2, 2023"
              slug="price-drop-alerts-setup"
              image="https://images.unsplash.com/photo-1563013544-824ae1b704d3?q=80&w=600&h=400&auto=format&fit=crop"
            />
            <ArticleCard
              title="Cashback Apps and Reward Programs: Maximizing Your Savings"
              description="Discover how to layer multiple savings strategies like cashback, rewards points, and credit card benefits for the biggest discounts."
              category="Savings Strategies"
              date="September 20, 2023"
              slug="cashback-apps-reward-programs"
              image="https://images.unsplash.com/photo-1559526324-593bc073d938?q=80&w=600&h=400&auto=format&fit=crop"
            />
          </div>
        </section>

        <section ref={newsletterRef} id="newsletter" className="bg-gray-900 rounded-xl p-8 mb-20">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="space-y-4">
              <h2 className="text-2xl font-bold">Never Miss a Deal</h2>
              <p className="text-gray-400">
                Subscribe to our newsletter to receive price drop alerts, exclusive discount codes, and shopping tips to
                save more on your favorite products.
              </p>
            </div>
            <form onSubmit={handleSubscribe} className="flex gap-2">
              <Input
                type="email"
                placeholder="Enter your email"
                className="bg-black border-gray-800 focus-visible:ring-purple-500"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <Button
                type="submit"
                className="bg-purple-600 hover:bg-purple-700 whitespace-nowrap"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Subscribing..." : "Subscribe"}
              </Button>
            </form>
          </div>
        </section>
      </main>

      <footer className="border-t border-gray-800 py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="space-y-4">
              <Link href="/" className="text-xl font-bold tracking-tighter">
                Bargain<span className="text-purple-500">Hunt</span>
              </Link>
              <p className="text-gray-400 text-sm">
                Your trusted companion for finding the best deals across Amazon and Flipkart.
              </p>
              <div className="flex space-x-4">
                <Link href="#" className="text-gray-400 hover:text-white">
                  <Twitter className="h-5 w-5" />
                </Link>
                <Link href="#" className="text-gray-400 hover:text-white">
                  <Github className="h-5 w-5" />
                </Link>
                <Link href="#" className="text-gray-400 hover:text-white">
                  <Linkedin className="h-5 w-5" />
                </Link>
                <Link href="#" className="text-gray-400 hover:text-white">
                  <Rss className="h-5 w-5" />
                </Link>
              </div>
            </div>
            <div>
              <h3 className="font-medium mb-4">Categories</h3>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>
                  <Link href="#" className="hover:text-white">
                    Electronics
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white">
                    Home & Kitchen
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white">
                    Fashion
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white">
                    Books & Media
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white">
                    Beauty & Personal Care
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-medium mb-4">Resources</h3>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>
                  <Link href="#" className="hover:text-white">
                    Buying Guides
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white">
                    Deal Alerts
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white">
                    Price History
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white">
                    Coupon Codes
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white">
                    Shopping Tips
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-medium mb-4">Contact</h3>
              <ul className="space-y-2 text-sm text-gray-400">
                <li className="flex items-center gap-2">
                  <Mail className="h-4 w-4" />
                  <span>contact@bargainhunt.com</span>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-12 pt-6 text-sm text-gray-400">
            <p>© {new Date().getFullYear()} BargainHunt. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

function FeaturedCard({ title, description, image, date, category, icon, slug = "" }:any) {
  return (
    <Card className="bg-gray-900 border-gray-800 overflow-hidden hover:border-purple-500/50 transition-colors">
      <div className="relative h-48">
        <Image src={image || "/placeholder.svg"} alt={title} fill className="object-cover" />
      </div>
      <CardHeader>
        <div className="flex items-center gap-2 text-sm text-purple-500 mb-2">
          {icon}
          <span>{category}</span>
        </div>
        <CardTitle className="text-xl">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <CardDescription className="text-gray-400">{description}</CardDescription>
      </CardContent>
      <CardFooter className="flex justify-between text-sm text-gray-500">
        <div className="flex items-center gap-1">
          <Clock className="h-4 w-4" />
          <span>{date}</span>
        </div>
        <Link href={`/guides/${slug}`} className="text-purple-500 hover:text-purple-400">
          Read more →
        </Link>
      </CardFooter>
    </Card>
  )
}

function ArticleCard({ title, description, category, date, slug = "", image }:any) {
  return (
    <Link href={`/blog/${slug}/`} className="group">
      <div className="space-y-3">
        <div className="relative h-48 rounded-lg overflow-hidden border border-gray-800 group-hover:border-purple-500/50 transition-colors">
          <Image src={image || "/placeholder.svg"} alt={`${title} thumbnail`} fill className="object-cover" />
        </div>
        <div>
          <div className="flex items-center gap-2 text-xs text-purple-500 mb-2">
            <BrainCircuit className="h-4 w-4" />
            <span>{category}</span>
          </div>
          <h3 className="font-medium group-hover:text-purple-400 transition-colors">{title}</h3>
          <p className="text-gray-400 text-sm mt-2 line-clamp-2">{description}</p>
          <div className="flex items-center gap-1 mt-3 text-xs text-gray-500">
            <Clock className="h-3 w-3" />
            <span>{date}</span>
          </div>
        </div>
      </div>
    </Link>
  )
}

