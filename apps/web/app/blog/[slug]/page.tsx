import Link from "next/link"
import Image from "next/image"
import { ArrowLeft, BrainCircuit, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import BlogArticleClient from "./client"
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

type Params = Promise<{ slug: string }>

export default async function BlogPost({ params }: { params: Params }) {
  const {slug} = await params
  let Article;
  try {
    Article = await prisma.article.findUnique({
      where: { slug },
    });
  } catch (error) {
    console.error("Error fetching guide:", error);
    Article = null;
  }
  if (!Article) {
    return (
      <div className="min-h-screen text-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-4">Guide Not Found</h1>
          <p className="mb-6">
            The guide you're looking for doesn't exist or has been moved.
          </p>
          <Button asChild>
            <Link href="/">Return Home</Link>
          </Button>
        </div>
      </div>
    );
  }

  let relatedArticles: any[] = [];
  try {
    relatedArticles = await prisma.article.findMany({
      where: {
        NOT: { id: Article.id },
      },
      take: 3,
    });
  } catch (error) {
    console.error("Error fetching related guides:", error);
  }

  if (!Article) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-4">Post Not Found</h1>
          <p className="mb-6">The blog Article you're looking for doesn't exist or has been moved.</p>
          <Button asChild>
            <Link href="/">Return Home</Link>
          </Button>
        </div>
      </div>
    )
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
          <span>{Article.category}</span>
        </div>

        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight mb-6">{Article.title}</h1>

        <div className="flex items-center gap-4 text-sm text-gray-400 mb-8">
          <div className="flex items-center gap-1">
            <Clock className="h-4 w-4" />
            <span>{Article.readTime}</span>
          </div>
          <div>{Article.date.toISOString()}</div>
          <div>By {Article.author}</div>
        </div>

        <div className="relative h-[400px] md:h-[500px] rounded-xl overflow-hidden border border-gray-800 mb-8">
          <Image
            src={Article.image || "/placeholder.svg"}
            alt={`Featured image for ${Article.title}`}
            fill
            className="object-cover"
            priority
          />
        </div>
        <BlogArticleClient Article={{ ...Article, date: Article.date.toDateString() }} />
        <article className="prose prose-invert prose-purple max-w-none">
          <div dangerouslySetInnerHTML={{ __html: Article.content }} />
        </article>

        <div className="border-t border-gray-800 mt-12 pt-8">
          <h3 className="text-xl font-bold mb-6">Related Articles</h3>
          <div className="grid md:grid-cols-2 gap-6">
            {relatedArticles.map((relatedPost, index) => (
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

