import { Skeleton } from "@/components/ui/skeleton";
import { Card } from "@/components/ui/card";

export default function ProductComparisonCardSkeleton() {
  return (
    <Card className="bg-transparent backdrop-blur-3xl border-gray-800 overflow-hidden rounded-lg animate-pulse">
      <div className="p-6">
        <div className="flex flex-col md:flex-row gap-6 w-full">
          <div className="flex flex-col lg:flex-row gap-6 w-full">
            {/* Left Section - Image + Info */}
            <div className="flex flex-col sm:flex-row gap-6 w-full lg:w-5/8">
              {/* Image Placeholder */}
              <div className="relative w-full sm:max-w-[180px] min-h-[200px] sm:h-full flex justify-center items-center border bg-[#fefcfc] rounded-lg">
                <Skeleton className="h-[160px] w-[160px] rounded-md" />
              </div>

              {/* Text Info */}
              <div className="flex flex-col w-full gap-2">
                <Skeleton className="h-5 w-3/4 bg-gray-700" />
                <Skeleton className="h-4 w-1/2 bg-gray-600" />
                <Skeleton className="h-4 w-1/3 bg-gray-600" />
                <Skeleton className="h-4 w-2/3 bg-gray-600" />
              </div>
            </div>

            {/* Right Section - Amazon & Flipkart Prices */}
            <div className="grid grid-cols-2 gap-6 w-full lg:w-3/8">
              {[1, 2].map((_, i) => (
                <div key={i} className="relative">
                  <div className="bg-[#0c0a0a]/60 backdrop-blur-3xl border-2 p-4 rounded-lg h-full flex flex-col justify-evenly">
                    <Skeleton className="h-5 w-3/4 bg-gray-700 mb-2" />
                    <Skeleton className="h-4 w-1/2 bg-gray-600 mb-1" />
                    <Skeleton className="h-7 w-1/2 bg-gray-400 mb-2 rounded-md" />
                    <Skeleton className="h-8 w-full rounded bg-gray-500" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}
