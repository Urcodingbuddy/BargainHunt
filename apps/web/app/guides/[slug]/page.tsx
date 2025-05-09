import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, BrainCircuit, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import GuideGuidesClient from "./client";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
type Params = Promise<{ slug: string }>;
export default async function GuidePage({ params }: { params: Params }) {
  const { slug } = await params;
  let Guides;
  try {
    Guides = await prisma.guide.findUnique({
      where: { slug },
    });
  } catch (error) {
    console.error("Error fetching guide:", error);
    Guides = null;
  }
  if (!Guides) {
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

  let relatedGuides: any[] = [];
  try {
    relatedGuides = await prisma.guide.findMany({
      where: {
        NOT: { id: Guides.id },
      },
      take: 3,
    });
  } catch (error) {
    console.error("Error fetching related guides:", error);
  }
 
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-3xl mx-auto">
        <Link href="/guides" className="inline-flex items-center text-gray-400 hover:text-white mb-8">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to guides
        </Link>

        <div className="flex items-center gap-2 text-sm text-purple-500 mb-4">
          <BrainCircuit className="h-5 w-5" />
          <span>{Guides.category}</span>
        </div>

        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight mb-6">{Guides.title}</h1>

        <div className="flex items-center flex-wrap gap-4 text-xs md:text-sm text-gray-400 mb-8">
          <div className="flex items-center gap-1">
            <Clock className="h-4 w-4" />
            <span>{Guides.readTime}</span>
          </div>
          <div>{Guides.date.toDateString()}</div>
          <div>By {Guides.author}</div>
        </div>

        <div className="relative h-[400px] md:h-[500px] rounded-xl overflow-hidden border border-gray-800 mb-8">
          <Image
            src={Guides.image || "/placeholder.svg"}
            alt={`Featured image for ${Guides.title}`}
            fill
            className="object-cover"
            priority
          />
        </div>

        <GuideGuidesClient Guides={{ ...Guides, date: Guides.date.toDateString() }} />


        <article className="prose prose-invert prose-purple max-w-none">
          <div dangerouslySetInnerHTML={{ __html: Guides.content }} />
        </article>

        <div className="border-t border-gray-800 mt-12 pt-8">
          <h3 className="text-xl font-bold mb-6">Related Guides</h3>
          <div className="grid md:grid-cols-2 gap-6">
          {relatedGuides.map((relatedGuides:any) => (
            <Link
              href={`/guides/${relatedGuides.slug}`}
              key={relatedGuides.id}
              className="group"
            >
              <div className="space-y-3">
                <div className="relative h-48 rounded-lg overflow-hidden border border-gray-800 group-hover:border-purple-500/50 transition-colors">
                  <Image
                    src={relatedGuides.image || "/placeholder.svg"}
                    alt={`${relatedGuides.title} thumbnail`}
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <div className="flex items-center gap-2 text-xs text-purple-500 mb-2">
                    <BrainCircuit className="h-4 w-4" />
                    <span>{relatedGuides.category}</span>
                  </div>
                  <h3 className="font-medium group-hover:text-purple-400 transition-colors">
                    {relatedGuides.title}
                  </h3>
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