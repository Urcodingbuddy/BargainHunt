"use client";

import Link from "next/link";
import Image from "next/image";
import { Clock } from "lucide-react";
import useArticles from "@/lib/hooks/useArticles";
import ArticleCardSkeleton from "@/components/skeletons/ArticleCardSkeleton";

export default function BlogPage() {
  const { articles, loading } = useArticles();

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-6">Blogs</h1>
      <p className="text-gray-400 mb-8">
        Tips, tricks, and insights to help you save money while shopping online.
      </p>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {loading ? (
          Array.from({ length: 6 }).map((_, i) => <ArticleCardSkeleton key={i} />)
        ) : articles.length > 0 ? (
          articles.map((article:any) => (
            <Link href={`/blogs/${article.slug}`} key={article.slug} className="group">
              <div className="space-y-3">
                <div className="relative h-48 rounded-lg overflow-hidden border border-gray-800 group-hover:border-purple-500/50 transition-colors">
                  <Image
                    src={article.image || "/placeholder.svg"}
                    alt={article.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <div className="text-xs text-purple-500 mb-2">{article.category}</div>
                  <h3 className="font-medium group-hover:text-purple-400 transition-colors">{article.title}</h3>
                  <p className="text-gray-400 text-sm mt-2 line-clamp-2">{article.description}</p>
                  <div className="text-xs flex gap-2 text-gray-500 mt-3">
                    <Clock className="h-4 w-4" />
                    {new Date(article.date).toDateString()}
                  </div>
                </div>
              </div>
            </Link>
          ))
        ) : (
          <p className="text-gray-500 col-span-full text-center">No articles found.</p>
        )}
      </div>
    </div>
  );
}
