"use client"

import Link from "next/link"
import Image from "next/image"
import { Clock } from "lucide-react"
import useGuides from "@/lib/hooks/useGuides"
import ArticleCardSkeleton from "@/components/skeletons/ArticleCardSkeleton"

export default function GuidesPage() {
  const { guides, loading } = useGuides()

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-6">Shopping Guides</h1>
      <p className="text-gray-400 mb-8">Expert advice to help you make smarter purchasing decisions.</p>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {loading ? (
          // Show 6 skeletons while loading
          Array.from({ length: 6 }).map((_, i) => (
            <ArticleCardSkeleton key={i} />
          ))
        ) : guides.length ? (
          guides.map((guide) => (
            <Link href={`/guides/${guide.slug}`} key={guide.slug} className="group">
              <div className="space-y-3">
                <div className="relative h-48 rounded-lg overflow-hidden border border-gray-800 group-hover:border-purple-500/50 transition-colors">
                  <Image src={guide.image || "/placeholder.svg"} alt={guide.title} fill className="object-cover" />
                </div>
                <div>
                  <div className="text-xs text-purple-500 mb-2">{guide.category}</div>
                  <h3 className="font-medium group-hover:text-purple-400 transition-colors">{guide.title}</h3>
                  <p className="text-gray-400 text-sm mt-2 line-clamp-2">{guide.description}</p>
                  <div className="text-xs flex gap-2 text-gray-500 mt-3">
                    <Clock className="h-4 w-4" />
                    {new Date(guide.date).toDateString()}
                  </div>
                </div>
              </div>
            </Link>
          ))
        ) : (
          <p className="text-gray-500 col-span-full text-center">No guides available right now.</p>
        )}
      </div>
    </div>
  )
}
