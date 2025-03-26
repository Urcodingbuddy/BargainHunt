import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatPrice(price: number | string): string {
  const numPrice = typeof price === "string" ? Number.parseFloat(price) : price

  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(numPrice)
}

export function calculateDiscount(originalPrice: number, salePrice: number): number {
  if (originalPrice <= 0 || salePrice <= 0) return 0
  return Math.round(((originalPrice - salePrice) / originalPrice) * 100)
}

export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text
  return text.slice(0, maxLength) + "..."
}

export function normalizeTitle(title: string): string {
  // Convert to lowercase
  let normalized = title.toLowerCase()

  // Remove common marketing phrases
  const marketingPhrases = [
    "best selling",
    "top rated",
    "limited time",
    "special offer",
    "new arrival",
    "exclusive",
    "premium",
    "official",
    "authentic",
    "with",
    "featuring",
    "includes",
    "for",
  ]

  marketingPhrases.forEach((phrase) => {
    normalized = normalized.replace(new RegExp(`\\b${phrase}\\b`, "gi"), "")
  })

  // Remove extra spaces, special characters, and trim
  normalized = normalized
    .replace(/[^\w\s]/g, " ")
    .replace(/\s+/g, " ")
    .trim()

  return normalized
}

export function calculateSimilarity(str1: string, str2: string): number {
  // Simple word overlap score
  const words1 = new Set(str1.split(" "))
  const words2 = new Set(str2.split(" "))

  let matchCount = 0
  for (const word of words1) {
    if (words2.has(word)) matchCount++
  }

  return matchCount / Math.max(words1.size, words2.size)
}

