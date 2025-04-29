"use client";
import { useToast } from "@/components/ui/use-toast";
import { useEffect } from "react";
import { Share2, Twitter, Facebook, Linkedin } from "lucide-react";
import { Button } from "@/components/ui/button";

// Define the Guide type
type Guide = {
  title: string;
  category: string;
  date: string;
  author: string;
  readTime: string;
  image: string;
  content: string;
};

export default function GuideGuideClient({ Guides }: { Guides: Guide }) {
  const { toast } = useToast();

  useEffect(() => {
    if (!Guides) {
      toast({
        title: "Guide not found",
        description: "The requested guide could not be found.",
        variant: "destructive",
      });
    }
  }, [Guides, toast]);

  const handleShare = (platform: string) => {
    const url = window.location.href;
    const text = `Check out this guide: ${Guides.title}`;

    let shareUrl = "";

    switch (platform) {
      case "twitter":
        shareUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`;
        break;
      case "facebook":
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
        break;
      case "linkedin":
        shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`;
        break;
      default:
        // Copy to clipboard
        navigator.clipboard.writeText(url);
        toast({
          title: "Link copied",
          description: "The guide link has been copied to your clipboard.",
        });
        return;
    }

    if (shareUrl) {
      window.open(shareUrl, "_blank");
    }
  };

  return (
    <div className="grid sm:flex sm:justify-between sm:items-center gap-4 mb-8">
      {/* Left Group (First 3 Buttons) */}
      <div className="grid grid-cols-2 gap-2 sm:flex sm:gap-4 w-full sm:w-auto">
        <Button
          variant="outline"
          size="sm"
          className="h-8 px-3 w-full border-gray-800 hover:bg-gray-900 rounded-md"
          onClick={() => handleShare("twitter")}
        >
          <Twitter className="h-4 w-4 mr-1" />
          Share
        </Button>
        <Button
          variant="outline"
          size="sm"
          className="h-8 px-3 w-full border-gray-800 hover:bg-gray-900 rounded-md"
          onClick={() => handleShare("facebook")}
        >
          <Facebook className="h-4 w-4 mr-1" />
          Share
        </Button>
        <Button
          variant="outline"
          size="sm"
          className="h-8 px-3 w-full border-gray-800 hover:bg-gray-900 rounded-md col-span-2 sm:col-span-1"
          onClick={() => handleShare("linkedin")}
        >
          <Linkedin className="h-4 w-4 mr-1" />
          Share
        </Button>
      </div>

      {/* Right Group (Clipboard Button) */}
      <div className="w-full sm:w-auto">
        <Button
          variant="outline"
          size="sm"
          className="h-8 px-3 w-full sm:w-auto border-gray-800 hover:bg-gray-900 rounded-md"
          onClick={() => handleShare("clipboard")}
        >
          <Share2 className="h-4 w-4 mr-1" />
          Share
        </Button>
      </div>
    </div>
  );
}
