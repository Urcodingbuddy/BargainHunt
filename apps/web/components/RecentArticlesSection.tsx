"use client";

import ArticleCard from "@/components/Article-card";
import useArticles from "../lib/hooks/useArticles";
import ArticleCardSkeleton from "./skeletons/ArticleCardSkeleton";

export default function RecentArticlesSection() {
  const { articles, loading } = useArticles();

  if (loading)
    return (
      <div  className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        <ArticleCardSkeleton />
        <ArticleCardSkeleton />
        <ArticleCardSkeleton />
      </div>
    );

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      {articles.map((article: any) => (
        <ArticleCard
          key={article.id}
          title={article.title}
          description={article.description}
          category={article.category}
          date={new Date(article.date).toDateString()}
          slug={article.slug}
          image={article.image}
        />
      ))}
    </div>
  );
}
