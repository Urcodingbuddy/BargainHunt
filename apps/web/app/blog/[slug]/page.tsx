"use client"

import Link from "next/link"
import Image from "next/image"
import { ArrowLeft, BrainCircuit, Clock, Share2, Twitter, Facebook, Linkedin } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useToast } from "@/components/ui/use-toast"
import { useEffect } from "react"

// This is a static mapping of blog posts
const blogPosts = {
  "browser-extensions-save-money": {
    title: "10 Browser Extensions That Help You Save Money While Shopping Online",
    date: "July 5, 2023",
    author: "Rahul Sharma",
    category: "Shopping Tools",
    readTime: "8 min read",
    image: "https://images.unsplash.com/photo-1610986603166-f78428624e76?q=80&w=2000&h=1000&auto=format&fit=crop",
    content: `
      <p>Online shopping has become the norm for many of us, but are you getting the best deals possible? Browser extensions can be powerful tools to help you save money, find discounts, and make smarter purchasing decisions. Here are ten browser extensions that every savvy online shopper should consider installing.</p>
      
      <h2>1. Honey</h2>
      <p>Honey automatically finds and applies coupon codes at checkout. It works with thousands of retailers including Amazon, Flipkart, Myntra, and more. The extension also offers a feature called Droplist that notifies you when prices drop on items you're watching.</p>
      
      <h2>2. CamelCamelCamel</h2>
      <p>This Amazon-specific tool tracks price histories and alerts you when prices drop. The browser extension, called The Camelizer, lets you view price history charts without leaving the product page, helping you determine if that "sale" is actually a good deal.</p>
      
      <h2>3. BargainHunt</h2>
      <p>Our very own extension automatically compares prices between Amazon and Flipkart whenever you shop online. It shows you which platform has the better price and by how much, saving you the hassle of checking multiple sites.</p>
      
      <h2>4. Cashback Monitor</h2>
      <p>This extension helps you find the highest cashback rates across different cashback websites. When you visit an online store, it shows you which cashback portal offers the best rate, helping you maximize your savings.</p>
      
      <h2>5. Rakuten (formerly Ebates)</h2>
      <p>Rakuten offers cashback at thousands of stores. The browser extension automatically alerts you when you're shopping on a site that offers cashback through Rakuten and activates it with one click.</p>
      
      <h2>6. PayPal Honey</h2>
      <p>In addition to finding coupon codes, PayPal Honey offers a rewards program called Honey Gold. You earn Gold points on purchases at participating retailers, which can be redeemed for gift cards.</p>
      
      <h2>7. Invisible Hand</h2>
      <p>This extension alerts you if the product you're viewing is available for a lower price elsewhere. It works with flights, hotels, and retail products, showing you a notification when a better deal is found.</p>
      
      <h2>8. PriceBlink</h2>
      <p>PriceBlink shows you price comparisons from other retailers while you shop. It also automatically searches for coupons and free shipping offers.</p>
      
      <h2>9. Fakespot</h2>
      <p>While not directly a money-saving tool, Fakespot helps you avoid wasting money on poor-quality products with fake reviews. It analyzes product reviews on Amazon, Flipkart, and other sites to identify potentially fake or misleading reviews.</p>
      
      <h2>10. Capital One Shopping</h2>
      <p>This extension automatically applies coupon codes, compares prices across retailers, and offers rewards for shopping at participating stores. It also provides price drop alerts for items you're watching.</p>
      
      <h2>Tips for Using Shopping Extensions</h2>
      <ul>
        <li><strong>Don't install too many</strong>: Having multiple coupon or price comparison extensions can sometimes cause conflicts or slow down your browser.</li>
        <li><strong>Check privacy policies</strong>: These extensions track your shopping behavior to provide their services, so make sure you're comfortable with their data practices.</li>
        <li><strong>Disable when not shopping</strong>: Some extensions can slow down your browsing experience, so consider disabling them when you're not shopping.</li>
      </ul>
      
      <h2>Conclusion</h2>
      <p>Browser extensions can be powerful allies in your quest to save money while shopping online. By automatically finding coupons, comparing prices, and alerting you to better deals, these tools can help you make smarter purchasing decisions and keep more money in your wallet.</p>
      
      <p>Remember that while these tools can help you save money, the best way to save is still to shop mindfully and only purchase what you truly need. No discount is a good deal if you're buying something unnecessary!</p>
    `,
    relatedPosts: [
      {
        title: "How to Read Price History Charts to Make Smarter Purchases",
        category: "Smart Shopping",
        image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=600&h=400&auto=format&fit=crop",
        slug: "read-price-history-charts",
      },
      {
        title: "Cashback Apps and Reward Programs: Maximizing Your Savings",
        category: "Savings Strategies",
        image: "https://images.unsplash.com/photo-1559526324-593bc073d938?q=80&w=600&h=400&auto=format&fit=crop",
        slug: "cashback-apps-reward-programs",
      },
    ],
  },
  "read-price-history-charts": {
    title: "How to Read Price History Charts to Make Smarter Purchases",
    date: "July 18, 2023",
    author: "Priya Patel",
    category: "Smart Shopping",
    readTime: "7 min read",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2000&h=1000&auto=format&fit=crop",
    content: `
      <p>Have you ever wondered if that "limited-time offer" is actually a good deal? Or if you should wait for a better price? Price history charts are powerful tools that can help you make more informed purchasing decisions by showing how a product's price has fluctuated over time. In this guide, we'll explain how to read and interpret these charts to become a smarter shopper.</p>
      
      <h2>What Are Price History Charts?</h2>
      <p>Price history charts track the price changes of products over time, typically displaying data from multiple months or even years. Tools like CamelCamelCamel (for Amazon), BargainHunt, and Keepa collect this data and present it in visual form, allowing you to see patterns in pricing.</p>
      
      <h2>Why Price History Matters</h2>
      <p>Retailers often use dynamic pricing strategies, changing prices based on demand, competition, time of year, and other factors. What looks like a "sale" might actually be a regular price fluctuation. By understanding a product's price history, you can:</p>
      <ul>
        <li>Determine if a current "sale" is actually a good deal</li>
        <li>Identify the best times to buy certain products</li>
        <li>Set price alerts for when prices drop to historical lows</li>
        <li>Avoid impulse purchases based on deceptive "limited time" offers</li>
      </ul>
      
      <h2>How to Read a Price History Chart</h2>
      
      <h3>1. Understand the Basic Elements</h3>
      <p>Most price history charts include:</p>
      <ul>
        <li><strong>Time axis (horizontal)</strong>: Shows dates, typically ranging from months to years</li>
        <li><strong>Price axis (vertical)</strong>: Shows the product's price</li>
        <li><strong>Price line</strong>: The main line showing how the price has changed over time</li>
        <li><strong>Current price indicator</strong>: Highlights the current price relative to historical data</li>
      </ul>
      
      <h3>2. Identify Price Patterns</h3>
      <p>Look for these common patterns:</p>
      <ul>
        <li><strong>Cyclical patterns</strong>: Regular price drops that occur at specific times (e.g., seasonal sales)</li>
        <li><strong>Downward trends</strong>: Gradually decreasing prices, common for technology products</li>
        <li><strong>Sudden drops</strong>: Sharp price reductions that might indicate flash sales or clearance events</li>
        <li><strong>Price floors</strong>: The lowest price points a product typically reaches</li>
      </ul>
      
      <h3>3. Compare Current Price to Historical Data</h3>
      <p>To determine if a current price is a good deal, compare it to:</p>
      <ul>
        <li><strong>All-time low</strong>: The lowest price the product has ever been</li>
        <li><strong>Average price</strong>: The typical price over the past few months</li>
        <li><strong>Recent trends</strong>: Whether prices have been rising, falling, or stable lately</li>
      </ul>
      
      <h2>Interpreting Different Chart Patterns</h2>
      
      <h3>Seasonal Products</h3>
      <p>Many products follow seasonal pricing patterns. For example:</p>
      <ul>
        <li>Electronics often drop in price during festival sales and after new model releases</li>
        <li>Clothing is typically cheapest at the end of each season</li>
        <li>Home appliances often see discounts during specific sales events</li>
      </ul>
      <p>If you notice a product consistently drops in price during certain months, consider waiting for those periods to make your purchase.</p>
      
      <h3>Technology Products</h3>
      <p>Technology products often show a downward price trend over time, with occasional spikes back up. The best strategy is usually to:</p>
      <ul>
        <li>Wait for the price to drop below the recent average</li>
        <li>Look for sharp drops, which often indicate special promotions</li>
        <li>Be aware of new model releases, which typically cause older models to drop in price</li>
      </ul>
      
      <h3>Limited Stock Items</h3>
      <p>Some products, especially collectibles or limited editions, may show an upward price trend as availability decreases. For these items, buying sooner rather than later might be the better strategy.</p>
      
      <h2>Using Price History Tools Effectively</h2>
      
      <h3>1. Set Price Alerts</h3>
      <p>Most price tracking tools allow you to set alerts for when a product drops below a certain price. Set these alerts based on historical lows or your personal budget.</p>
      
      <h3>2. Check Multiple Retailers</h3>
      <p>Prices can vary significantly between retailers. Tools like BargainHunt compare prices across platforms like Amazon and Flipkart to ensure you're getting the best deal.</p>
      
      <h3>3. Consider Price Protection Policies</h3>
      <p>Some credit cards and retailers offer price protection, refunding the difference if a price drops shortly after your purchase. Check if these policies apply to your purchases.</p>
      
      <h2>Conclusion</h2>
      <p>Price history charts are powerful tools that transform you from an impulsive shopper into a strategic buyer. By understanding how prices fluctuate over time, you can make purchases at optimal moments, avoid marketing tricks, and ensure you're getting genuine deals.</p>
      
      <p>Remember, the goal isn't always to get the absolute lowest price possible—sometimes waiting months for a small discount isn't worth it. Instead, use price history data to make informed decisions about when a price is reasonable relative to its historical patterns.</p>
    `,
    relatedPosts: [
      {
        title: "10 Browser Extensions That Help You Save Money While Shopping Online",
        category: "Shopping Tools",
        image: "https://images.unsplash.com/photo-1610986603166-f78428624e76?q=80&w=600&h=400&auto=format&fit=crop",
        slug: "browser-extensions-save-money",
      },
      {
        title: "The Psychology of Discounts: Don't Fall for These Pricing Tricks",
        category: "Consumer Psychology",
        image: "https://images.unsplash.com/photo-1607082350899-7e105aa886ae?q=80&w=600&h=400&auto=format&fit=crop",
        slug: "psychology-of-discounts",
      },
    ],
  },
  "psychology-of-discounts": {
    title: "The Psychology of Discounts: Don't Fall for These Pricing Tricks",
    date: "August 3, 2023",
    author: "Dr. Vikram Mehta",
    category: "Consumer Psychology",
    readTime: "9 min read",
    image: "https://images.unsplash.com/photo-1607082350899-7e105aa886ae?q=80&w=2000&h=1000&auto=format&fit=crop",
    content: `
      <p>We've all experienced the thrill of spotting a "70% OFF!" sign or the urgency created by a "Limited Time Offer!" notification. But have you ever wondered why these marketing tactics are so effective at getting us to open our wallets? In this article, we'll explore the psychological principles behind discount pricing strategies and how to avoid falling for tricks that might lead to unnecessary purchases.</p>
      
      <h2>The Science Behind Discount Psychology</h2>
      <p>Retailers don't just randomly decide to offer discounts—they strategically use price reductions based on well-researched psychological principles:</p>
      
      <h3>1. The Anchoring Effect</h3>
      <p>When we see a product with an original price of ₹10,000 marked down to ₹6,000, our brain "anchors" to the original price, making the sale price seem like a better deal. This happens even if the "original" price was artificially inflated and ₹6,000 is actually the regular market price.</p>
      <p><strong>How to avoid it:</strong> Research the actual market value of products before purchasing. Use price comparison tools like BargainHunt to see what the item typically sells for across different retailers.</p>
      
      <h3>2. Loss Aversion</h3>
      <p>Humans are wired to fear missing out more than we desire gaining something of equal value. When we see a "limited time offer," our brain triggers fear of missing out on savings, even if we didn't plan to buy the item in the first place.</p>
      <p><strong>How to avoid it:</strong> Ask yourself if you would buy the item at this price if the offer wasn't about to expire. If the answer is no, it's probably not a purchase you need to make.</p>
      
      <h3>3. The Endowment Effect</h3>
      <p>Once we feel ownership over something—even just mentally—we value it more highly. This is why "add to cart" buttons are so prominent, and why sites show you what you've selected even before you've purchased it.</p>
      <p><strong>How to avoid it:</strong> Implement a waiting period before completing purchases. Leave items in your cart for 24-48 hours to see if you still want them after the initial excitement fades.</p>
      
      <h2>Common Discount Tactics to Watch For</h2>
      
      <h3>1. Artificial Price Inflation</h3>
      <p>Some retailers raise prices shortly before a sale, then "discount" them back to their regular price. This creates the illusion of savings when you're actually paying the normal price.</p>
      <p><strong>Example:</strong> A shirt that normally sells for ₹1,500 is marked up to ₹2,500 for a week, then offered at "40% off" (₹1,500) during a sale.</p>
      <p><strong>How to avoid it:</strong> Use price tracking tools to see the item's price history before being impressed by a discount.</p>
      
      <h3>2. Decoy Pricing</h3>
      <p>Retailers often present three pricing options where the middle option is designed to seem like the best value, pushing consumers toward a more expensive purchase than they initially intended.</p>
      <p><strong>Example:</strong> A streaming service offers:</p>
      <ul>
        <li>Basic: ₹199/month (limited features)</li>
        <li>Premium: ₹399/month (all features)</li>
        <li>Family: ₹499/month (all features for 5 users)</li>
      </ul>
      <p>The Family plan is the "decoy" that makes Premium seem like a better deal, even though Basic might meet your needs.</p>
      <p><strong>How to avoid it:</strong> Evaluate each option based solely on your actual needs, not in comparison to other options.</p>
      
      <h3>3. Minimum Purchase Thresholds</h3>
      <p>"Free shipping on orders over ₹999" or "Save ₹500 when you spend ₹2,500" offers often lead consumers to add items they don't need just to reach the threshold.</p>
      <p><strong>How to avoid it:</strong> Calculate whether the extra items you're adding actually cost less than the discount you're receiving. Often, they don't.</p>
      
      <h3>4. Bundling</h3>
      <p>Retailers bundle products together at a "discount," but often include items you wouldn't otherwise purchase.</p>
      <p><strong>How to avoid it:</strong> Calculate the cost of buying just the items you want separately, and compare that to the bundle price.</p>
      
      <h3>5. Odd Pricing</h3>
      <p>Prices ending in 9, 7, or 5 (like ₹499 instead of ₹500) create the perception of a better deal. Our brains process these prices from left to right, so we focus more on the first digit.</p>
      <p><strong>How to avoid it:</strong> Consciously round up prices when evaluating purchases to counter this effect.</p>
      
      <h2>Seasonal and Event-Based Discount Tactics</h2>
      
      <h3>1. Flash Sales</h3>
      <p>Limited-time offers create urgency and fear of missing out. The countdown timer on many e-commerce sites is specifically designed to trigger impulse purchases.</p>
      <p><strong>How to avoid it:</strong> Remember that most "exclusive" sales events recur regularly. If you miss one, another will likely come along soon.</p>
      
      <h3>2. Festival and Holiday Sales</h3>
      <p>Major shopping events like Diwali sales, Black Friday, or End of Season sales often feature genuine discounts, but they're also designed to encourage excessive consumption.</p>
      <p><strong>How to avoid it:</strong> Prepare a shopping list before sale events and stick to it, rather than browsing for "deals."</p>
      
      <h2>Digital Marketing Discount Tactics</h2>
      
      <h3>1. Personalized Discounts</h3>
      <p>Retailers track your browsing behavior and send targeted discounts for items you've viewed but not purchased.</p>
      <p><strong>How to avoid it:</strong> Use incognito browsing or clear cookies when researching products you're not ready to buy.</p>
      
      <h3>2. Abandoned Cart Discounts</h3>
      <p>Many retailers will email you a special discount if you add items to your cart but don't complete the purchase.</p>
      <p><strong>How to avoid falling for unnecessary purchases:</strong> Only use this tactic for items you genuinely intend to buy.</p>
      
      <h2>Developing Healthier Shopping Habits</h2>
      
      <h3>1. Create a Shopping List and Budget</h3>
      <p>Decide what you need and how much you're willing to spend before you start shopping.</p>
      
      <h3>2. Implement a Waiting Period</h3>
      <p>For non-essential purchases over a certain amount, wait 24-48 hours before buying.</p>
      
      <h3>3. Ask the Right Questions</h3>
      <p>Before making a purchase, ask yourself:</p>
      <ul>
        <li>Would I buy this if it wasn't on sale?</li>
        <li>Do I need this item, or do I just want it?</li>
        <li>Am I buying this because of the product itself or because of the perceived savings?</li>
      </ul>
      
      <h2>Conclusion</h2>
      <p>Discounts aren't inherently bad—they can help us save money on products we genuinely need. The key is to recognize when psychological tactics are being used to manipulate our purchasing decisions and to develop strategies to make rational choices.</p>
      
      <p>By understanding the psychology behind discounts, you can become a more conscious consumer, saving money for things that truly matter to you rather than falling for clever marketing tricks.</p>
    `,
    relatedPosts: [
      {
        title: "How to Read Price History Charts to Make Smarter Purchases",
        category: "Smart Shopping",
        image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=600&h=400&auto=format&fit=crop",
        slug: "read-price-history-charts",
      },
      {
        title: "Hidden Costs of Online Shopping: Shipping, Taxes, and More",
        category: "Shopping Guide",
        image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?q=80&w=600&h=400&auto=format&fit=crop",
        slug: "hidden-costs-online-shopping",
      },
    ],
  },
}

export default function BlogPost({ params }: { params: { slug: string } }) {
  const { toast } = useToast()
  const post = blogPosts[params.slug]

  useEffect(() => {
    if (!post) {
      toast({
        title: "Post not found",
        description: "The requested blog post could not be found.",
        variant: "destructive",
      })
    }
  }, [post, toast])

  if (!post) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-4">Post Not Found</h1>
          <p className="mb-6">The blog post you're looking for doesn't exist or has been moved.</p>
          <Button asChild>
            <Link href="/">Return Home</Link>
          </Button>
        </div>
      </div>
    )
  }

  const handleShare = (platform: string) => {
    const url = window.location.href
    const text = `Check out this article: ${post.title}`

    let shareUrl = ""

    switch (platform) {
      case "twitter":
        shareUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`
        break
      case "facebook":
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`
        break
      case "linkedin":
        shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`
        break
      default:
        // Copy to clipboard
        navigator.clipboard.writeText(url)
        toast({
          title: "Link copied",
          description: "The article link has been copied to your clipboard.",
        })
        return
    }

    if (shareUrl) {
      window.open(shareUrl, "_blank")
    }
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-3xl mx-auto">
        <Link href="/blog" className="inline-flex items-center text-gray-400 hover:text-white mb-8">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to articles
        </Link>

        <div className="flex items-center gap-2 text-sm text-purple-500 mb-4">
          <BrainCircuit className="h-5 w-5" />
          <span>{post.category}</span>
        </div>

        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight mb-6">{post.title}</h1>

        <div className="flex items-center gap-4 text-sm text-gray-400 mb-8">
          <div className="flex items-center gap-1">
            <Clock className="h-4 w-4" />
            <span>{post.readTime}</span>
          </div>
          <div>{post.date}</div>
          <div>By {post.author}</div>
        </div>

        <div className="relative h-[400px] md:h-[500px] rounded-xl overflow-hidden border border-gray-800 mb-8">
          <Image
            src={post.image || "/placeholder.svg"}
            alt={`Featured image for ${post.title}`}
            fill
            className="object-cover"
            priority
          />
        </div>

        <div className="flex justify-between items-center mb-8">
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              className="h-8 px-3 border-gray-800 hover:bg-gray-900 rounded-md"
              onClick={() => handleShare("twitter")}
            >
              <Twitter className="h-4 w-4 mr-1" />
              Share
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="h-8 px-3 border-gray-800 hover:bg-gray-900 rounded-md"
              onClick={() => handleShare("facebook")}
            >
              <Facebook className="h-4 w-4 mr-1" />
              Share
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="h-8 px-3 border-gray-800 hover:bg-gray-900 rounded-md"
              onClick={() => handleShare("linkedin")}
            >
              <Linkedin className="h-4 w-4 mr-1" />
              Share
            </Button>
          </div>
          <Button
            variant="outline"
            size="sm"
            className="h-8 px-3 border-gray-800 hover:bg-gray-900 rounded-md"
            onClick={() => handleShare("clipboard")}
          >
            <Share2 className="h-4 w-4 mr-1" />
            Share
          </Button>
        </div>

        <article className="prose prose-invert prose-purple max-w-none">
          <div dangerouslySetInnerHTML={{ __html: post.content }} />
        </article>

        <div className="border-t border-gray-800 mt-12 pt-8">
          <h3 className="text-xl font-bold mb-6">Related Articles</h3>
          <div className="grid md:grid-cols-2 gap-6">
            {post.relatedPosts.map((relatedPost, index) => (
              <Link href={`/blog/${relatedPost.slug}`} className="group" key={index}>
                <div className="space-y-3">
                  <div className="relative h-48 rounded-lg overflow-hidden border border-gray-800 group-hover:border-purple-500/50 transition-colors">
                    <Image
                      src={relatedPost.image || "/placeholder.svg"}
                      alt={`${relatedPost.title} thumbnail`}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <div className="flex items-center gap-2 text-xs text-purple-500 mb-2">
                      <BrainCircuit className="h-4 w-4" />
                      <span>{relatedPost.category}</span>
                    </div>
                    <h3 className="font-medium group-hover:text-purple-400 transition-colors">{relatedPost.title}</h3>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

