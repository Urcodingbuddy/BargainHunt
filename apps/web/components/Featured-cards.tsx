import Link from "next/link";
import Image from "next/image";
import {Clock} from "lucide-react";

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card";


export default function FeaturedCard({
    title,
    description,
    image,
    date,
    category,
    icon,
    slug = "",
  }: any) {
    return (
      <Card className="backdrop-blur-3xl bg-gradient-to-tl from-purple-900/35 via-black/30 to-transparent border-gray-800 overflow-hidden hover:border-purple-500/50 transition-colors rounded-lg">
        <div className="relative h-48 overflow-hidden group">
          <Image
            src={image || "/placeholder.svg"}
            alt={title}
            fill
            className="transition-transform duration-500 ease-in-out group-hover:scale-110 object-cover"
          />
        </div>
        <CardHeader>
          <div className="flex items-center gap-2 text-sm text-purple-500 mb-2">
            {icon}
            <span>{category}</span>
          </div>
          <CardTitle className="text-xl">{title}</CardTitle>
        </CardHeader>
        <CardContent>
          <CardDescription className="text-gray-400">
            {description}
          </CardDescription>
        </CardContent>
        <CardFooter className="flex justify-between text-sm text-gray-500">
          <div className="flex items-center gap-1">
            <Clock className="h-4 w-4" />
            <span>{date}</span>
          </div>
          <Link
            href={`/guides/${slug}`}
            className="text-purple-500 hover:text-white"
          >
            Read more →
          </Link>
        </CardFooter>
      </Card>
    );
  }

