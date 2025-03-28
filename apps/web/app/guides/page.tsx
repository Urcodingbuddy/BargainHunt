import Image from "next/image"
import Link from "next/link"

export default function GuidesPage() {
  const guides = [
    {
      title: "How to Find the Best Deals on Electronics items ?",
      description:
        "Learn expert strategies for comparing prices, timing your purchases, and using price tracking tools to save big on smartphones, laptops, and other gadgets.",
      category: "Shopping Tips",
      date: "May 15, 2023",
      slug: "find-best-electronics-deals",
      image: "https://images.unsplash.com/photo-1498049794561-7780e7231661?q=80&w=600&h=400&auto=format&fit=crop",
    },
    {
      title: "Amazon vs Flipkart: Which Offers Better Prices?",
      description:
        "A comprehensive analysis of pricing strategies, discount patterns, and exclusive deals on both platforms to help you decide where to shop for maximum savings.",
      category: "Price Comparison",
      date: "June 2, 2023",
      slug: "amazon-vs-flipkart-price-comparison",
      image: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?q=80&w=600&h=400&auto=format&fit=crop",
    },
    {
      title: "Ultimate Seasonal Sales Guide: When to Buy What ?",
      description:
        "Discover the best times of year to purchase different product categories for maximum discounts, from electronics and appliances to clothing and furniture.",
      category: "Shopping Calendar",
      date: "June 28, 2023",
      slug: "seasonal-sales-guide",
      image: "https://images.unsplash.com/photo-1607083206968-13611e3d76db?q=80&w=600&h=400&auto=format&fit=crop",
    },
  ]

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-6">Shopping Guides</h1>
      <p className="text-gray-400 mb-8">Expert advice to help you make smarter purchasing decisions.</p>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {guides.map((guide) => (
          <Link href={`/guides/${guide.slug}`} key={guide.slug} className="group">
            <div className="space-y-3">
              <div className="relative h-48 rounded-lg overflow-hidden border border-gray-800 group-hover:border-purple-500/50 transition-colors">
                <Image src={guide.image || "/placeholder.svg"} alt={guide.title} fill className="object-cover" />
              </div>
              <div>
                <div className="text-xs text-purple-500 mb-2">{guide.category}</div>
                <h3 className="font-medium group-hover:text-purple-400 transition-colors">{guide.title}</h3>
                <p className="text-gray-400 text-sm mt-2 line-clamp-2">{guide.description}</p>
                <div className="text-xs text-gray-500 mt-3">{guide.date}</div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}

