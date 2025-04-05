import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export interface NormalizedProduct {
  title: string;
  price: number;
  originalPrice: number;
  rating: number;
  reviews: number;
  availability: string;
  source: "amazon" | "flipkart";
}

export interface ExtractedSpecs {
  modelNumber?: string;
  processor?: string;
  processorGen?: string;
  ram?: string;
  storage?: string;
  screenSize?: string;
  battery?: string;
}

export function normalizeTitle(title: string): string {
  let normalized = title.toLowerCase();

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
  ];

  marketingPhrases.forEach((phrase) => {
    normalized = normalized.replace(new RegExp(`\\b${phrase}\\b`, "gi"), "");
  });

  normalized = normalized.replace(/[^a-zA-Z0-9\s\+\-\/]/g, " ");

  // Replace multiple spaces with a single space and trim
  return normalized.replace(/\s+/g, " ").trim();
}

export const PRODUCT_CATEGORIES = {
  smartphones: [
    "phone",
    "smartphone",
    "mobile",
    "iphone",
    "galaxy",
    "redmi",
    "oneplus",
    "apple",
    "samsung",
    "realme",
    "oppo",
    "vivo",
    "iqoo",
    "nokia",
    "jio",
    "honor",
    "huawei",
  ],
  laptops: ["laptop", "notebook", "macbook", "thinkpad", "chromebook"],
  tablets: ["tablet", "ipad", "galaxy tab", "surface"],
  televisions: ["tv", "television", "smart tv", "led tv", "oled"],
  headphones: ["headphone", "earphone", "earbud", "airpod", "tws"],
  smartwatches: ["watch", "smartwatch", "fitness tracker", "band"],
  cameras: ["camera", "dslr", "mirrorless", "gopro"],
  gaming: ["ps5", "xbox", "nintendo", "gaming", "console"],
  refrigerators: [
    "refrigerator",
    "fridge",
    "double door",
    "single door",
    "convertible",
    "smart inverter",
    "multi air flow",
  ],
  washingMachines: [
    "washing machine",
    "top load",
    "front load",
    "eco bubble",
    "digital inverter",
    "wifi",
    "soft closing door",
  ],
  accessories: ["charger", "cable", "case", "cover", "screen guard"],
} as const;

export type ProductCategory = keyof typeof PRODUCT_CATEGORIES;
console.log(PRODUCT_CATEGORIES);
export function detectCategory(title: string): ProductCategory | null {
  const normalizedTitle = title.toLowerCase();
  for (const [category, keywords] of Object.entries(PRODUCT_CATEGORIES)) {
    if (keywords.some((keyword) => normalizedTitle.includes(keyword))) {
      return category as ProductCategory;
    }
  }
  return null;
}
export function extractSpecsByCategory(title: string, category: ProductCategory): ExtractedSpecs {
  const lower = title.toLowerCase()
  const specs: ExtractedSpecs = {}

  switch (category) {
    case "smartphones": {
      console.log("SMARTPHONES")
      specs.ram = lower.match(/(\d{2}|\d{1}) ?gb ram/)?.[0]
      specs.storage = lower.match(/(\d{3,4}|\d{2,3}) ?gb(?! ram)/)?.[0]
      specs.screenSize = lower.match(/(\d{1,2}\.?\d{0,2}) ?("|inch|inches)/)?.[1]
      specs.battery = lower.match(/(\d{4,5}) ?mah/)?.[1]
      break
    }

    case "laptops": {
      console.log("LAPTOPS")
      specs.processor = lower.match(/i[3579]-\d{4,5}[a-z]*/)?.[0] || lower.match(/ryzen \d \d{4}[a-z]*/)?.[0]
      specs.processorGen = lower.match(/(\d{1,2})(st|nd|rd|th) gen/)?.[1]
      specs.ram = lower.match(/(\d{1,2}) ?gb ram/)?.[1]
      specs.storage = lower.match(/(\d{3,4}) ?gb ssd/)?.[1]
      specs.screenSize = lower.match(/(\d{1,2}\.?\d{0,2}) ?("|inch|inches)/)?.[1]
      specs.battery = lower.match(/(\d{2,3}) ?whr/)?.[1]
      break
    }

    case "tablets": {
      specs.screenSize = lower.match(/(\d{1,2}\.?\d{0,2}) ?("|inch|inches)/)?.[1]
      specs.storage = lower.match(/(\d{3,4}|\d{2,3}) ?gb(?! ram)/)?.[0]
      specs.ram = lower.match(/(\d{2}|\d{1}) ?gb ram/)?.[0]
      specs.processor = lower.match(/i[3579]-\d{4,5}[a-z]*/)?.[0] || lower.match(/ryzen \d \d{4}[a-z]*/)?.[0]
      specs.processorGen = lower.match(/(\d{1,2})(st|nd|rd|th) gen/)?.[1]
      specs.battery = lower.match(/(\d{2,3}) ?whr/)?.[1]
      break
    }

    case "televisions": {
      specs.screenSize = lower.match(/(\d{1,2}) ?("|inch|inches)/)?.[1]
      specs.modelNumber = lower.match(/(model|series)[^\s]+/)?.[0]
      break
    }

    case "refrigerators": {
      specs.storage = lower.match(/(\d{2,3}) ?l/)?.[1]
      specs.modelNumber = lower.match(/([a-z0-9\-]+)(?=\s+double|single|door)/)?.[0]
      break
    }

    case "washingMachines": {
      specs.modelNumber = lower.match(/([a-z0-9\-]+)(?=\s+kg)/)?.[0]
      specs.storage = lower.match(/(\d{1,2}) ?kg/)?.[1]
      break
    }
  }

  return specs
}

// Step 3: Match 2 products by comparing key specs
export function isMatchingProduct(a: ExtractedSpecs, b: ExtractedSpecs): boolean {
  let matchScore = 0
  let totalCriteria = 0

  const keys: (keyof ExtractedSpecs)[] = ["modelNumber", "processor", "processorGen", "ram", "storage", "screenSize", "battery"]

  keys.forEach(key => {
    if (a[key] && b[key]) {
      totalCriteria++
      if (a[key]?.toLowerCase() === b[key]?.toLowerCase()) {
        matchScore++
      }
    }
  })

  // You can adjust match threshold here (e.g., 60% or more fields matched)
  return totalCriteria > 0 && matchScore / totalCriteria >= 0.6
}

