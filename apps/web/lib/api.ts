import { normalizeTitle, calculateSimilarity, detectCategory, type ProductCategory } from "./utils"

let counter = 1

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
  originalPrice: string
  image: string
  link: string
}

export type NormalizedProduct = {
  id: string
  title: string
  normalizedTitle: string
  category: ProductCategory | null
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

export function normalizeProductData(
  amazonProducts: AmazonProduct[] = [],
  flipkartProducts: FlipkartProduct[] = []
): NormalizedProduct[] {
  const normalizedProducts: NormalizedProduct[] = []

  // Process Amazon products first
  amazonProducts.forEach((amazonProduct) => {
    const normalizedTitle = normalizeTitle(amazonProduct.name)
    const category = detectCategory(amazonProduct.name)

    const ratingMatch = amazonProduct.rating?.match(/(\d+(\.\d+)?)/);
    const rating = ratingMatch?.[1] ? Number.parseFloat(ratingMatch[1]) : undefined;

    const reviewsMatch = amazonProduct.reviews?.match(/\d+/);
    const reviews = reviewsMatch ? Number.parseInt(reviewsMatch[0], 10) : undefined;

    const priceStr = amazonProduct.price?.replace(/[₹,]/g, "");
    const numericPrice = priceStr ? Number.parseFloat(priceStr) : 0;

    normalizedProducts.push({
      id: `amazon-${normalizedTitle.replace(/\s+/g, "-")}-${counter++}`,
      title: amazonProduct.name,
      normalizedTitle,
      category,
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

  // Process Flipkart products with stricter matching
  flipkartProducts.forEach((flipkartProduct) => {
    const normalizedFlipkartTitle = normalizeTitle(flipkartProduct.name)
    const category = detectCategory(flipkartProduct.name)

    const priceStr = flipkartProduct.price?.replace(/[₹,]/g, "")
    const numericPrice = priceStr ? Number.parseFloat(priceStr) : 0

    // Try to find a matching Amazon product with high similarity
    let bestMatchIndex: number | null = null
    let highestSimilarity = 0

    normalizedProducts.forEach((product, index) => {
      if (product.prices.amazon) {
        const similarity = calculateSimilarity(normalizedFlipkartTitle, product.normalizedTitle)
        if (similarity > highestSimilarity) {
          highestSimilarity = similarity
          bestMatchIndex = index
        }
      }
    })

    // Only match if similarity is high enough (threshold is now handled in calculateSimilarity)
    if (bestMatchIndex !== null && bestMatchIndex >= 0 && bestMatchIndex < normalizedProducts.length) {
      const matchedProduct = normalizedProducts[bestMatchIndex]
      if (matchedProduct) {
        matchedProduct.prices.flipkart = {
          price: flipkartProduct.price,
          originalPrice: flipkartProduct.originalPrice,
          numericValue: numericPrice,
          link: flipkartProduct.link,
        }
        matchedProduct.similarityScore = highestSimilarity
      }
    } else {
      // Create a new product entry if no match found
      normalizedProducts.push({
        id: `flipkart-${normalizedFlipkartTitle.replace(/\s+/g, "-")}-${counter++}`,
        title: flipkartProduct.name,
        normalizedTitle: normalizedFlipkartTitle,
        category,
        image: flipkartProduct.image,
        prices: {
          flipkart: {
            price: flipkartProduct.price,
            originalPrice: flipkartProduct.originalPrice,
            numericValue: numericPrice,
            link: flipkartProduct.link,
          },
        },
      })
    }
  })

  return normalizedProducts
}

export async function scrapeAndStoreProduct(
  productName: string,
  category?: ProductCategory
): Promise<NormalizedProduct[]> {
  try {
    const queryParams = new URLSearchParams({ query: productName })
    if (category) {
      queryParams.append('category', category)
    }

    const response = await fetch(`/api/scrape?${queryParams}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })

    if (!response.ok) {
      throw new Error(`API request failed with status ${response.status}`)
    }

    const data = await response.json()

    if (data && (data.amazon || data.flipkart)) {
      return normalizeProductData(data.amazon || [], data.flipkart || [])
    }

    return []
  } catch (error) {
    console.error("Error scraping product data:", error)
    return []
  }
}