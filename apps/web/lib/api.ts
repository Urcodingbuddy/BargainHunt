import { v4 as uuidv4 } from 'uuid';
import { normalizeTitle, calculateSimilarity } from "./utils"
let counter = 1;
// Types for Amazon and Flipkart products
export type AmazonProduct = {
  name: string
  rating: string
  reviews: string
  boughtInPastMonth: string
  price: string
  originalPrice: string
  discount: string
  availability: string
  image: string
  link: string
}

export type FlipkartProduct = {
  name: string
  price: string
  orignalPrice: string
  image: string
  link: string
}

// Normalized product type that works with both Amazon and Flipkart data
export type NormalizedProduct = {
  id: string
  title: string
  normalizedTitle: string
  image: string
  rating?: number
  reviews?: number
  boughtInPastMonth?: string
  availability?: string
  prices: {
    amazon?: {
      price: string
      originalPrice?: string
      numericValue: number
      discount?: string
      link?: string
    }
    flipkart?: {
      price: string
      originalPrice?: string
      numericValue: number
      link?: string
    }
  }
  similarityScore?: number
}

// Function to normalize product data from both sources
export function normalizeProductData(
  amazonProducts: AmazonProduct[] = [],
  flipkartProducts: FlipkartProduct[] = [],
): NormalizedProduct[] {
  const normalizedProducts: NormalizedProduct[] = []

  // Process Amazon products
  amazonProducts.forEach((amazonProduct) => {
    // Create a normalized title for better matching with Flipkart
    const normalizedTitle = normalizeTitle(amazonProduct.name)

    // Extract numeric rating
    const ratingMatch = amazonProduct.rating?.match(/(\d+(\.\d+)?)/)
    const rating = ratingMatch && ratingMatch[1] ? Number.parseFloat(ratingMatch[1]) : undefined

    // Extract numeric reviews
    const reviewsMatch = amazonProduct.reviews?.match(/\d+/)
    const reviews = reviewsMatch ? Number.parseInt(reviewsMatch[0], 10) : undefined

    // Extract price as number
    const priceStr = amazonProduct.price?.replace(/[₹,]/g, "")
    const numericPrice = priceStr ? Number.parseFloat(priceStr) : 0

    normalizedProducts.push({
      id: `amazon-${normalizedTitle.replace(/\s+/g, "-")}-${counter++}`,
      title: amazonProduct.name,
      normalizedTitle,
      image: amazonProduct.image,
      rating,
      reviews,
      boughtInPastMonth: amazonProduct.boughtInPastMonth,
      availability: amazonProduct.availability,
      prices: {
        amazon: {
          price: `₹${amazonProduct.price}`,
          originalPrice: amazonProduct.originalPrice,
          numericValue: numericPrice,
          discount: amazonProduct.discount,
          link: amazonProduct.link,
        },
      },
    })
  })

  // Process Flipkart products and try to match with Amazon products
  flipkartProducts.forEach((flipkartProduct) => {
    const normalizedFlipkartTitle = normalizeTitle(flipkartProduct.name)

    // Extract price as number
    const priceStr = flipkartProduct.price?.replace(/[₹,]/g, "")
    const numericPrice = priceStr ? Number.parseFloat(priceStr) : 0

    // Try to find a matching Amazon product by calculating similarity scores
    let bestMatch = -1
    let highestSimilarity = 0.5 // Threshold for considering a match

    normalizedProducts.forEach((product, index) => {
      if (product.prices.amazon) {
        // Calculate similarity between titles
        const similarity = calculateSimilarity(normalizedFlipkartTitle, product.normalizedTitle)

        if (similarity > highestSimilarity) {
          highestSimilarity = similarity
          bestMatch = index
        }
      }
    })

    let bestMatchIndex: number | null = null
    if (bestMatchIndex !== null) {
      // Add Flipkart data to the existing product
      if (bestMatchIndex !== null && normalizedProducts[bestMatchIndex]?.prices) {
        normalizedProducts[bestMatchIndex].prices.flipkart = {
          price: flipkartProduct.price,
          originalPrice: flipkartProduct.orignalPrice,
          numericValue: numericPrice,
          link: flipkartProduct.link,
        }
      }
      if (bestMatch !== -1 && normalizedProducts[bestMatch]) {
        if (normalizedProducts[bestMatchIndex]) {
          normalizedProducts[bestMatchIndex].similarityScore = highestSimilarity;
        }
      }
    } else {
      // Create a new product entry for Flipkart
      normalizedProducts.push({
        id: `flipkart-${normalizedFlipkartTitle.replace(/\s+/g, "-")}-${counter++}`,
        title: flipkartProduct.name,
        normalizedTitle: normalizedFlipkartTitle,
        image: flipkartProduct.image,
        prices: {
          flipkart: {
            price: flipkartProduct.price,
            originalPrice: flipkartProduct.orignalPrice,
            numericValue: numericPrice,
            link: flipkartProduct.link,
          },
        },
      })
    }
  })

  return normalizedProducts
}

// Function to scrape and store product data
export async function scrapeAndStoreProduct(productName: string) {
  try {
    const response = await fetch(`/api/scrape?query=${encodeURIComponent(productName)}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`API request failed with status ${response.status}`);
    }

    const data = await response.json();

    // Normalize the data
    if (data && (data.amazon || data.flipkart)) {
      return normalizeProductData(data.amazon || [], data.flipkart || []);
    }

    return [];
  } catch (error) {
    console.error("Error scraping product data:", error);
    return [];
  }
}