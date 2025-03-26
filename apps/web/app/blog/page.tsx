import Image from "next/image"
import Link from "next/link"

export default function BlogPage() {
  const posts = [
    {
      title: "10 Browser Extensions That Help You Save Money While Shopping Online",
      description:
        "Discover the best browser add-ons that automatically find coupon codes, compare prices, and alert you to price drops on your favorite products.",
      category: "Shopping Tools",
      date: "July 5, 2023",
      slug: "browser-extensions-save-money",
      image: "https://images.unsplash.com/photo-1610986603166-f78428624e76?q=80&w=600&h=400&auto=format&fit=crop",
    },
    {
      title: "How to Read Price History Charts to Make Smarter Purchases",
      description:
        "Learn to interpret price fluctuation patterns to determine if a 'sale' is really a good deal or just clever marketing.",
      category: "Smart Shopping",
      date: "July 18, 2023",
      slug: "read-price-history-charts",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=600&h=400&auto=format&fit=crop",
    },
    {
      title: "The Psychology of Discounts: Don't Fall for These Pricing Tricks",
      description:
        "Understand the psychological tactics retailers use to make deals seem better than they are, and how to spot genuine bargains.",
      category: "Consumer Psychology",
      date: "August 3, 2023",
      slug: "psychology-of-discounts",
      image: "https://images.unsplash.com/photo-1607082350899-7e105aa886ae?q=80&w=600&h=400&auto=format&fit=crop",
    },
  ]

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-6">Blog</h1>
      <p className="text-gray-400 mb-8">Tips, tricks, and insights to help you save money while shopping online.</p>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.map((post) => (
          <Link href={`/blog/${post.slug}`} key={post.slug} className="group">
            <div className="space-y-3">
              <div className="relative h-48 rounded-lg overflow-hidden border border-gray-800 group-hover:border-purple-500/50 transition-colors">
                <Image src={post.image || "/placeholder.svg"} alt={post.title} fill className="object-cover" />
              </div>
              <div>
                <div className="text-xs text-purple-500 mb-2">{post.category}</div>
                <h3 className="font-medium group-hover:text-purple-400 transition-colors">{post.title}</h3>
                <p className="text-gray-400 text-sm mt-2 line-clamp-2">{post.description}</p>
                <div className="text-xs text-gray-500 mt-3">{post.date}</div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}

