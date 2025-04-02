import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const PRODUCT_CATEGORIES = {
  smartphones: ["phone", "smartphone", "mobile", "iphone", "galaxy", "redmi", "oneplus", "apple", "samsung", "realme", "oppo", "vivo", "iqoo", "nokia", "jio", "honor", "huawei"],
  laptops: ["laptop", "notebook", "macbook", "thinkpad", "chromebook"],
  tablets: ["tablet", "ipad", "galaxy tab", "surface"],
  Television: ["tv", "television", "smart tv", "led tv", "oled"],
  headphones: ["headphone", "earphone", "earbud", "airpod", "tws"],
  smartwatches: ["watch", "smartwatch", "fitness tracker", "band"],
  cameras: ["camera", "dslr", "mirrorless", "gopro"],
  gaming: ["ps5", "xbox", "nintendo", "gaming", "console"],
  appliances: ["refrigerator", "washing machine", "dishwasher", "microwave", "ac", "air conditioner"],
  accessories: ["charger", "cable", "case", "cover", "screen guard"]
} as const

export type ProductCategory = keyof typeof PRODUCT_CATEGORIES

export function detectCategory(title: string): ProductCategory | null {
  const normalizedTitle = title.toLowerCase()
  
  for (const [category, keywords] of Object.entries(PRODUCT_CATEGORIES)) {
    if (keywords.some(keyword => normalizedTitle.includes(keyword))) {
      return category as ProductCategory
    }
  }
  
  return null
}

export function formatPrice(price: number | string): string {
  const numPrice = typeof price === "string" ? Number.parseFloat(price) : price
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(numPrice)
}

export function normalizeTitle(title: string): string {
  let normalized = title.toLowerCase()

  const marketingPhrases = [
    "best selling", "top rated", "limited time", "special offer",
    "new arrival", "exclusive", "premium", "official", "authentic",
    "with", "featuring", "includes", "for",
  ]
  
  marketingPhrases.forEach((phrase) => {
    normalized = normalized.replace(new RegExp(`\\b${phrase}\\b`, "gi"), "")
  })

  normalized = normalized.replace(/[^a-zA-Z0-9\s\+\-\/]/g, " ")
  return normalized.replace(/\s+/g, " ").trim()
}

export function calculateSimilarity(str1: string, str2: string): number {
  if (!str1 || !str2) return 0
  
  const words1 = new Set(str1.split(/\s+/))
  const words2 = new Set(str2.split(/\s+/))
  
  const intersection = [...words1].filter(word => words2.has(word)).length
  return intersection / Math.max(words1.size, words2.size)
}