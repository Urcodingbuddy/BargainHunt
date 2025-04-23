import { Skeleton } from "@/components/ui/skeleton";

export default function ArticleCardSkeleton() {
  return (
    <div className="space-y-3">
      <div className="relative h-48 rounded-lg overflow-hidden border border-gray-800">
        <Skeleton className="w-full h-full object-cover" />
      </div>

      <div>
        <div className="flex items-center gap-2 text-xs text-purple-500 mb-2">
          <Skeleton className="h-3 w-16 bg-purple-500/40" />
        </div>

        <Skeleton className="h-4 w-3/4 bg-neutral-700 mb-2" />
        <div className="space-y-1">
          <Skeleton className="h-3 w-full bg-neutral-800" />
          <Skeleton className="h-3 w-5/6 bg-neutral-800" />
        </div>

        <div className="flex items-center gap-1 mt-3 text-xs text-gray-500">
          <Skeleton className="h-3 w-16 bg-gray-700" />
        </div>
      </div>
    </div>
  );
}
