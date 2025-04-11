import { BrainCircuit, Clock } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function ArticleCard({
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