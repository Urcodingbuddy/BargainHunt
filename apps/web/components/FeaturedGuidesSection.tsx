"use client";

import FeaturedCard from "@/components/Featured-cards";
import useGuides from "../lib/hooks/useGuides";
import { Eye, BrainCircuit, Cpu, CalendarSearch } from "lucide-react";
import { JSX } from "react";
import FeaturedGuidedCardSkeleton from "./skeletons/FeaturedGuidedCardSkeleton";

const iconMap: Record<string, JSX.Element> = {
  "Shopping Tips": <BrainCircuit className="h-5 w-5" />,
  "Price Comparison": <Cpu className="h-5 w-5" />,
  "Shopping Calendar": <CalendarSearch className="h-5 w-5" />,
};

export default function FeaturedGuidesSection() {
  const { guides, loading } = useGuides();

  if (loading)
    return (
      <div className="grid md:grid-cols-3 gap-6">
        <FeaturedGuidedCardSkeleton/>
        <FeaturedGuidedCardSkeleton/>
        <FeaturedGuidedCardSkeleton/>
      </div>
    );

  return (
    <div className="grid md:grid-cols-3 gap-6">
      {guides.map((guide: any) => (
        <FeaturedCard
          key={guide.id}
          title={guide.title}
          description={guide.description}
          image={guide.image}
          date={new Date(guide.date).toDateString()}
          category={guide.category}
          icon={iconMap[guide.category] || <Eye className="h-5 w-5" />}
          slug={guide.slug}
        />
      ))}
    </div>
  );
}
