import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function FeaturedCardSkeleton() {
  return (
    <Card className="backdrop-blur-3xl bg-gradient-to-tl from-purple-900/35 via-black/30 to-transparent border-gray-800 overflow-hidden rounded-lg animate-pulse">
      <div className="relative h-48 w-full overflow-hidden">
        <Skeleton className="absolute inset-0 w-full h-full" />
      </div>

      <CardHeader className="space-y-2">
        <div className="flex items-center gap-2 text-sm text-purple-500">
          <Skeleton className="h-4 w-20 bg-purple-700/30 rounded-md" />
        </div>
        <CardTitle>
          <Skeleton className="h-5 w-3/4 bg-gray-600/40 rounded" />
        </CardTitle>
      </CardHeader>

      <CardContent>
        
          <Skeleton className="h-4 w-full mb-2 bg-gray-700/30" />
          <Skeleton className="h-4 w-5/6 mb-2 bg-gray-700/30" />
          <Skeleton className="h-4 w-3/6 mb-2 bg-gray-700/30" />
        
      </CardContent>

      <CardFooter className="flex justify-between text-sm text-gray-500">
        <div className="flex items-center gap-1">
          <Skeleton className="h-3 w-16 bg-gray-700/30 rounded" />
        </div>
        <Skeleton className="h-3 w-20 bg-purple-700/30 rounded" />
      </CardFooter>
    </Card>
  );
}
