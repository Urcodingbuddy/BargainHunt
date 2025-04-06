"use client"

import { useToast } from "@/components/ui/use-toast"
import { useEffect } from "react"
import { Share2, Twitter, Facebook, Linkedin } from "lucide-react"
import { Button } from "@/components/ui/button"

// Define the post type
type Post = {
  title: string
  category: string
  date: string
  author: string
  readTime: string
  image: string
  content: string
  relatedPosts: Array<{
    title: string
    category: string
    image: string
    slug: string
  }>
}

export default function GuidePostClient({ post }: { post: Post }) {
  const { toast } = useToast()

  useEffect(() => {
    if (!post) {
      toast({
        title: "Guide not found",
        description: "The requested guide could not be found.",
        variant: "destructive",
      })
    }
  }, [post, toast])

  const handleShare = (platform: string) => {
    const url = window.location.href
    const text = `Check out this guide: ${post.title}`

    let shareUrl = ""

    switch (platform) {
      case "twitter":
        shareUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`
        break
      case "facebook":
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`
        break
      case "linkedin":
        shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`
        break
      default:
        // Copy to clipboard
        navigator.clipboard.writeText(url)
        toast({
          title: "Link copied",
          description: "The guide link has been copied to your clipboard.",
        })
        return
    }

    if (shareUrl) {
      window.open(shareUrl, "_blank")
    }
  }

  return (
    <div className="flex flex-wrap gap-2 justify-between items-center mb-8">
      <div className="flex gap-2 ">
        <Button
          variant="outline"
          size="sm"
          className="h-8 cursor-pointer px-3 border-gray-800 hover:bg-gray-900 rounded-md"
          onClick={() => handleShare("twitter")}
        >
          <Twitter className="h-4 w-4 mr-1" />
          Share
        </Button>
        <Button
          variant="outline"
          size="sm"
          className="h-8 cursor-pointer  px-3 border-gray-800 hover:bg-gray-900 rounded-md"
          onClick={() => handleShare("facebook")}
        >
          <Facebook className="h-4 w-4 mr-1" />
          Share
        </Button>
        <Button
          variant="outline"
          size="sm"
          className="h-8 cursor-pointer  px-3 border-gray-800 hover:bg-gray-900 rounded-md"
          onClick={() => handleShare("linkedin")}
        >
          <Linkedin className="h-4 w-4 mr-1" />
          Share
        </Button>
      </div>
      <Button
        variant="outline"
        size="sm"
        className="h-8 cursor-pointer px-3 border-gray-800 hover:bg-gray-900 rounded-md"
        onClick={() => handleShare("clipboard")}
      >
        <Share2 className="h-4 w-4 mr-1" />
        Share
      </Button>
    </div>
  )
}

