import { createId } from '@paralleldrive/cuid2';
import {
  detectCategory,
  extractSpecsByCategory,
  isMatchingProduct,
  ProductCategory,
  NormalizedProduct as NormalizedProductUtils,
  normalizeTitle
} from "./utils";

let counter = 1;

export type AmazonProduct = {
  uniqueID: string;
  name: string;
  rating: string;
  reviews: string;
  boughtInPastMonth: string;
  price: string;
  originalPrice: string;
  discount: string;
  availability: string;
  image: string;
  link: string;
};

export type FlipkartProduct = {
  uniqueID: string;
  name: string;
  price: string;
  originalPrice: string;
  image: string;
  link: string;
};

export type NormalizedProduct = {
  uniqueID: string;
  id: string;
  title: string;
  normalizedTitle: string;
  category: ProductCategory | null;
  image: string;
  rating?: number;
  reviews?: number;
  boughtInPastMonth?: string;
  availability?: string;
  source?: "amazon" | "flipkart";
  price?: number;
  originalPrice?: number;
  prices: {
    amazon?: {
      price: string;
      originalPrice?: string;
      numericValue: number;
      discount?: string;
      link?: string;
    };
    flipkart?: {
      price: string;
      originalPrice?: string;
      numericValue: number;
      link?: string;
    };
  };
  specs?: any;
  similarityScore?: number;
  matchedSpecs?: number;
};

// Improved title normalization for better matching across all product types
function improvedTitleNormalization(title: string): string {
  // Basic normalization
  let normalized = normalizeTitle(title);
  
  // Brand dictionary - common naming patterns across platforms
  const brandPatterns: {[key: string]: RegExp[]} = {
    // Smartphones
    'iphone': [/iphone\s*(\d+)\s*(pro)?\s*(max)?\s*\(?(\d+)?\s*(gb|tb)\)?/i],
    'samsung': [/samsung\s*(galaxy)?\s*([a-z]\d+)(?:\s*[a-z]*)?\s*\(?(\d+)?\s*(gb|tb)\)?/i],
    'oneplus': [/oneplus\s*(\d+)(?:\s*[a-z]*)?\s*\(?(\d+)?\s*(gb|tb)\)?/i],
    'redmi': [/redmi\s*(\d+)(?:\s*[a-z]*)?\s*\(?(\d+)?\s*(gb|tb)\)?/i],
    'vivo': [/vivo\s*([a-z]\d+)(?:\s*[a-z]*)?\s*\(?(\d+)?\s*(gb|tb)\)?/i],
    'oppo': [/oppo\s*([a-z]\d+)(?:\s*[a-z]*)?\s*\(?(\d+)?\s*(gb|tb)\)?/i],
    'realme': [/realme\s*(\d+)(?:\s*[a-z]*)?\s*\(?(\d+)?\s*(gb|tb)\)?/i],
    'poco': [/poco\s*([a-z]\d+)(?:\s*[a-z]*)?\s*\(?(\d+)?\s*(gb|tb)\)?/i],
    'iqoo': [/iqoo\s*(\d+)(?:\s*[a-z]*)?\s*\(?(\d+)?\s*(gb|tb)\)?/i],
    'motorola': [/motorola\s*(moto)?\s*([a-z]\d+)(?:\s*[a-z]*)?\s*\(?(\d+)?\s*(gb|tb)\)?/i],
    
    // Laptops
    'macbook': [/macbook\s*(air|pro)?\s*(\d+)?\s*inch/i],
    'asus': [/asus\s*(rog|tuf|zenbook|vivobook)?\s*([a-z0-9\-]+)/i],
    'lenovo': [/lenovo\s*(ideapad|legion|thinkpad|yoga)?\s*([a-z0-9\-]+)/i],
    'hp': [/hp\s*(pavilion|envy|omen|spectre)?\s*([a-z0-9\-]+)/i],
    'dell': [/dell\s*(xps|inspiron|alienware|g\d+)?\s*(\d+)/i],
    'acer': [/acer\s*(nitro|predator|aspire|swift)?\s*([a-z0-9\-]+)/i],
    
    // TVs
    'lg': [/lg\s*(\d+)?\s*inch\s*([a-z0-9]+)/i],
    'sony': [/sony\s*(\d+)?\s*inch\s*([a-z0-9]+)/i],
    'samsung tv': [/samsung\s*(\d+)?\s*inch\s*([a-z0-9]+)/i],
    'mi': [/mi\s*(\d+)?\s*inch\s*([a-z0-9]+)/i],
    
    // Headphones/TWS
    'airpods': [/airpods\s*(pro|max)?\s*(\d+)?/i],
    'boat': [/boat\s*([a-z0-9\-]+)/i],
    'jbl': [/jbl\s*([a-z0-9\-]+)/i],
    'sony headphones': [/sony\s*([a-z0-9\-]+)\s*(?:headphones|earphones|earbuds)/i],
    
    // Smartwatches
    'apple watch': [/apple\s*watch\s*(series)?\s*(\d+)/i],
    'samsung watch': [/samsung\s*(galaxy)?\s*watch\s*(\d+)/i],
    'mi band': [/mi\s*(?:smart)?\s*band\s*(\d+)/i],
    
    // Refrigerators
    'samsung fridge': [/samsung\s*(\d+)?\s*(?:l|litre)?\s*(?:door)?\s*refrigerator/i],
    'lg fridge': [/lg\s*(\d+)?\s*(?:l|litre)?\s*(?:door)?\s*refrigerator/i],
    'whirlpool': [/whirlpool\s*(\d+)?\s*(?:l|litre)?\s*(?:door)?\s*refrigerator/i],
    
    // Washing Machines
    'samsung washing': [/samsung\s*(\d+)?\s*kg\s*(?:fully|semi)?\s*(?:automatic)?\s*washing\s*machine/i],
    'lg washing': [/lg\s*(\d+)?\s*kg\s*(?:fully|semi)?\s*(?:automatic)?\s*washing\s*machine/i],
    'ifb': [/ifb\s*(\d+)?\s*kg\s*(?:fully|semi)?\s*(?:automatic)?\s*washing\s*machine/i],
  };
  
  // Extract model numbers and key identifiers for specific brands
  let extractedIdentifiers = '';
  
  // Try to extract key identifying information from the title
  Object.entries(brandPatterns).forEach(([brand, patterns]) => {
    patterns.forEach(pattern => {
      const match = normalized.match(pattern);
      if (match) {
        // Extract the core identifying information and add it to the result
        extractedIdentifiers = brand + ' ' + 
          match.slice(1).filter(Boolean).join(' ').toLowerCase();
      }
    });
  });
  
  // If we extracted specific identifiers, use them; otherwise use the normalized title
  normalized = extractedIdentifiers || normalized;
  
  // Remove common marketing phrases and color specifications that differ across platforms
  const removePatterns = [
    // Colors
    /black|white|red|blue|green|yellow|gold|silver|titanium|gray|graphite|midnight|starlight|purple|pink|orange|brown/gi,
    
    // Storage/capacity qualifiers
    /\b(with|rom|internal storage)\b/gi,
    
    // Variant descriptors
    /\b(5g|4g|lte|variant|version|edition)\b/gi,
    
    // Marketing terms 
    /\b(latest|new|2023|2024|special|limited|official|authentic|genuine)\b/gi,
    
    // Features that might be listed differently
    /\b(wifi|wi-fi|bluetooth|fingerprint|face\s*id|camera|selfie|dual\s*sim)\b/gi,
    
    // Remove parentheses content
    /\(([^)]*)\)/g
  ];
  
  removePatterns.forEach(pattern => {
    normalized = normalized.replace(pattern, ' ');
  });
  
  // Clean up the result
  normalized = normalized.replace(/\s+/g, ' ').trim();
  
  return normalized;
}

// Detect key product identifiers regardless of brand
function extractKeyIdentifiers(title: string, category: ProductCategory | null): string[] {
  const identifiers: string[] = [];
  
  if (!category) return identifiers;
  
  // Extract numeric values which are often significant for product matching
  const nums = title.match(/\d+(?:\.\d+)?/g) || [];
  
  switch(category) {
    case "smartphones":
      // Extract model numbers
      const modelMatch = title.match(/(?:iphone|galaxy|redmi|note|poco|realme|vivo|oppo)\s*([a-z0-9]+)/i);
      if (modelMatch) identifiers.push(modelMatch[0].toLowerCase());
      
      // Extract storage sizes
      const storageMatch = title.match(/(\d+)\s*(gb|tb)/i);
      if (storageMatch) identifiers.push(storageMatch[0].toLowerCase());
      break;
      
    case "laptops":
      // Extract processor info
      const processorMatch = title.match(/(?:i\d|ryzen|celeron|pentium)\s*[a-z0-9\-]+/i);
      if (processorMatch) identifiers.push(processorMatch[0].toLowerCase());
      
      // Extract RAM and storage
      const ramMatch = title.match(/(\d+)\s*gb\s*ram/i);
      if (ramMatch) identifiers.push(ramMatch[0].toLowerCase());
      
      const storageMatchLaptop = title.match(/(\d+)\s*(?:gb|tb)\s*(?:ssd|hdd)/i);
      if (storageMatchLaptop) identifiers.push(storageMatchLaptop[0].toLowerCase());
      break;
      
    case "televisions":
      // Extract screen size
      const screenMatch = title.match(/(\d+)\s*inch/i);
      if (screenMatch) identifiers.push(screenMatch[0].toLowerCase());
      
      // Resolution/display type
      const resolutionMatch = title.match(/(?:full\s*hd|fhd|uhd|4k|qled|oled|led)/i);
      if (resolutionMatch) identifiers.push(resolutionMatch[0].toLowerCase());
      break;
      
    case "headphones":
      // No specific extraction needed beyond brand model
      break;
      
    case "tablets":
      // Extract model and storage
      const tabletModelMatch = title.match(/(?:ipad|galaxy\s*tab|surface|xiaomi\s*pad)\s*[a-z0-9]+/i);
      if (tabletModelMatch) identifiers.push(tabletModelMatch[0].toLowerCase());
      
      const tabletStorageMatch = title.match(/(\d+)\s*(?:gb|tb)/i);
      if (tabletStorageMatch) identifiers.push(tabletStorageMatch[0].toLowerCase());
      break;
      
    case "smartwatches":
      // Extract model and version
      const watchModelMatch = title.match(/(?:watch|band)\s*[a-z0-9]+/i);
      if (watchModelMatch) identifiers.push(watchModelMatch[0].toLowerCase());
      break;
      
    case "refrigerators":
      // Extract capacity
      const capacityMatch = title.match(/(\d+)\s*(?:l|liter|litre)/i);
      if (capacityMatch) identifiers.push(capacityMatch[0].toLowerCase());
      
      // Extract door type
      const doorMatch = title.match(/(?:single|double|triple|multi|french)\s*door/i);
      if (doorMatch) identifiers.push(doorMatch[0].toLowerCase());
      break;
      
    case "washingMachines":
      // Extract capacity
      const loadMatch = title.match(/(\d+(?:\.\d+)?)\s*kg/i);
      if (loadMatch) identifiers.push(loadMatch[0].toLowerCase());
      
      // Extract type
      const typeMatch = title.match(/(?:fully|semi)\s*automatic/i);
      if (typeMatch) identifiers.push(typeMatch[0].toLowerCase());
      
      // Extract load type
      const loadTypeMatch = title.match(/(?:front|top)\s*load/i);
      if (loadTypeMatch) identifiers.push(loadTypeMatch[0].toLowerCase());
      break;
      
    default:
      // For other categories, include all numeric values as potential identifiers
      nums.forEach(num => identifiers.push(num));
  }
  
  // Include numeric values if we don't have enough identifiers
  if (identifiers.length < 2) {
    nums.forEach(num => {
      if (!identifiers.includes(num)) identifiers.push(num);
    });
  }
  
  return identifiers;
}

// Calculate similarity between two product titles with category context
function calculateProductSimilarity(
  product1: {title: string, normalizedTitle: string, category: ProductCategory | null, specs: any},
  product2: {title: string, normalizedTitle: string, category: ProductCategory | null, specs: any},
  price1?: number,
  price2?: number
): number {
  // If categories don't match, similarity is very low
  if (product1.category !== product2.category || !product1.category) {
    return 0.1; // Give a small base score in case categories are misdetected
  }
  
  let score = 0.3; // Start with base score for matching category
  
  // Compare normalized titles
  const words1 = product1.normalizedTitle.split(/\s+/);
  const words2 = product2.normalizedTitle.split(/\s+/);
  
  let titleMatches = 0;
  words1.forEach(word => {
    if (words2.includes(word) && word.length > 2) { // Only count meaningful words
      titleMatches++;
    }
  });
  
  const titleScore = words1.length > 0 ? titleMatches / Math.max(words1.length, words2.length) : 0;
  score += titleScore * 0.2; // 20% weight to title word matching
  
  // Extract and compare key identifiers
  const identifiers1 = extractKeyIdentifiers(product1.title, product1.category);
  const identifiers2 = extractKeyIdentifiers(product2.title, product2.category);
  
  let identifierMatches = 0;
  identifiers1.forEach(id => {
    if (identifiers2.includes(id)) {
      identifierMatches++;
    }
  });
  
  const idScore = identifiers1.length > 0 ? 
    identifierMatches / Math.max(identifiers1.length, identifiers2.length) : 0;
  score += idScore * 0.2; // 20% weight to identifier matching
  
  // Compare specs if available
  if (product1.specs && product2.specs && 
      Object.keys(product1.specs).length > 0 && 
      Object.keys(product2.specs).length > 0) {
    
    if (isMatchingProduct(product1.specs, product2.specs)) {
      score += 0.2; // 20% weight to spec matching
    }
  }
  
  // Compare prices if available
  if (price1 && price2 && price1 > 0 && price2 > 0) {
    const priceDiff = Math.abs(price1 - price2);
    const avgPrice = (price1 + price2) / 2;
    const priceVariance = avgPrice > 0 ? priceDiff / avgPrice : 1;
    
    // If prices are within 25% of each other
    if (priceVariance < 0.25) {
      score += 0.1 * (1 - priceVariance); // Up to 10% weight for price similarity
    }
  }
  
  return score;
}

export function normalizeProductData(
  amazonProducts: AmazonProduct[] = [],
  flipkartProducts: FlipkartProduct[] = []
): NormalizedProduct[] {
  const normalizedProducts: NormalizedProduct[] = [];

  // First, process all Amazon products
  const amazonNormalized = amazonProducts.map((amazonProduct) => {
    const normalizedTitle = improvedTitleNormalization(amazonProduct.name);
    const category = detectCategory(amazonProduct.name);
    
    // Extract specs if we have a category
    const specs = category ? extractSpecsByCategory(amazonProduct.name, category) : {};

    const ratingMatch = amazonProduct.rating?.match(/(\d+(\.\d+)?)/);
    const rating = ratingMatch?.[1] ? Number.parseFloat(ratingMatch[1]) : undefined;

    const reviewsMatch = amazonProduct.reviews?.match(/\d+/);
    const reviews = reviewsMatch ? Number.parseInt(reviewsMatch[0], 10) : undefined;

    const priceStr = amazonProduct.price?.replace(/[₹,]/g, "");
    const numericPrice = priceStr ? Number.parseFloat(priceStr) : 0;
    
    const originalPriceStr = amazonProduct.originalPrice?.replace(/[₹,]/g, "");
    const numericOriginalPrice = originalPriceStr ? Number.parseFloat(originalPriceStr) : 0;

    return {
      uniqueID: amazonProduct.uniqueID,
      id: createId(),
      title: amazonProduct.name,
      normalizedTitle,
      category,
      image: amazonProduct.image,
      rating,
      reviews,
      boughtInPastMonth: amazonProduct.boughtInPastMonth,
      availability: amazonProduct.availability,
      source: "amazon" as const,
      price: numericPrice,
      originalPrice: numericOriginalPrice,
      prices: {
      amazon: {
        price: amazonProduct.price,
        originalPrice: amazonProduct.originalPrice,
        numericValue: numericPrice,
        discount: amazonProduct.discount,
        link: amazonProduct.link,
      },
      },
      specs,
    };
  });

  // Then, process all Flipkart products
  const flipkartNormalized = flipkartProducts.map((flipkartProduct) => {
    const normalizedTitle = improvedTitleNormalization(flipkartProduct.name);
    const category = detectCategory(flipkartProduct.name);
    
    // Extract specs if we have a category
    const specs = category ? extractSpecsByCategory(flipkartProduct.name, category) : {};

    const priceStr = flipkartProduct.price?.replace(/[₹,]/g, "");
    const numericPrice = priceStr ? Number.parseFloat(priceStr) : 0;
    
    const originalPriceStr = flipkartProduct.originalPrice?.replace(/[₹,]/g, "");
    const numericOriginalPrice = originalPriceStr ? Number.parseFloat(originalPriceStr) : 0;

    return {
      uniqueID: flipkartProduct.uniqueID,
      id: `flipkart-${normalizedTitle.replace(/\s+/g, "-")}-${counter++}`,
      title: flipkartProduct.name,
      normalizedTitle,
      category,
      image: flipkartProduct.image,
      source: "flipkart" as const,
      price: numericPrice,
      originalPrice: numericOriginalPrice,
      prices: {
        flipkart: {
          price: flipkartProduct.price,
          originalPrice: flipkartProduct.originalPrice,
          numericValue: numericPrice,
          link: flipkartProduct.link,
        },
      },
      specs,
    };
  });

  // Create a map to track which products have been matched
  const matchedAmazonProducts = new Set<string>();
  const matchedFlipkartProducts = new Set<string>();
  
  // First pass: Find high-confidence matches
  flipkartNormalized.forEach(flipkartProduct => {
    // Skip if this Flipkart product has no category
    if (!flipkartProduct.category) return;
    
    let bestMatch: NormalizedProduct | null = null;
    let bestMatchScore = 0;
    
    amazonNormalized.forEach(amazonProduct => {
      // Skip if already matched or no category
      if (matchedAmazonProducts.has(amazonProduct.uniqueID) || !amazonProduct.category) return;
      
      // Calculate similarity score
      const similarity = calculateProductSimilarity(
        amazonProduct as { title: string; normalizedTitle: string; category: ProductCategory | null; specs: any },
        flipkartProduct as { title: string; normalizedTitle: string; category: ProductCategory | null; specs: any },
        amazonProduct.price,
        flipkartProduct.price
      );
      
      if (similarity > bestMatchScore) {
        bestMatchScore = similarity;
        bestMatch = amazonProduct;
      }
    });
    
    // Use a higher threshold for first pass to get confident matches
    const HIGH_CONFIDENCE_THRESHOLD = 0.7;
    
    if (bestMatch && bestMatchScore >= HIGH_CONFIDENCE_THRESHOLD) {
      // Create a merged product with both Amazon and Flipkart data
      const mergedProduct: NormalizedProduct = {
        ...(bestMatch as NormalizedProduct),
        prices: {
          amazon: (bestMatch as NormalizedProduct).prices.amazon,
          flipkart: flipkartProduct.prices.flipkart
        },
        similarityScore: bestMatchScore,
        matchedSpecs: Math.round(bestMatchScore * 100)
      };
      
      normalizedProducts.push(mergedProduct);
      
      // Mark both products as matched
      matchedAmazonProducts.add((bestMatch as NormalizedProduct).uniqueID);
      matchedFlipkartProducts.add(flipkartProduct.uniqueID);
    }
  });
  
  // Second pass: Find medium-confidence matches for remaining products
  flipkartNormalized.forEach(flipkartProduct => {
    // Skip if already matched or no category
    if (matchedFlipkartProducts.has(flipkartProduct.uniqueID) || !flipkartProduct.category) return;
    
    let bestMatch: NormalizedProduct | null = null;
    let bestMatchScore = 0;
    
    amazonNormalized.forEach(amazonProduct => {
      // Skip if already matched or no category
      if (matchedAmazonProducts.has(amazonProduct.uniqueID) || !amazonProduct.category) return;
      
      // Calculate similarity score
      const similarity = calculateProductSimilarity(
        amazonProduct, 
        { ...flipkartProduct, specs: flipkartProduct.specs || {} },
        amazonProduct.price,
        flipkartProduct.price
      );
      
      if (similarity > bestMatchScore) {
        bestMatchScore = similarity;
        bestMatch = amazonProduct;
      }
    });
    
    // Medium confidence threshold
    const MEDIUM_CONFIDENCE_THRESHOLD = 0.5;
    
    if (bestMatch && bestMatchScore >= MEDIUM_CONFIDENCE_THRESHOLD) {
      // Create a merged product with both Amazon and Flipkart data
      const mergedProduct: NormalizedProduct = {
        ...(bestMatch as NormalizedProduct),
        prices: {
          amazon: (bestMatch as NormalizedProduct).prices?.amazon,
          flipkart: flipkartProduct.prices.flipkart
        },
        similarityScore: bestMatchScore,
        matchedSpecs: Math.round(bestMatchScore * 100)
      };
      
      normalizedProducts.push(mergedProduct);
      
      // Mark both products as matched
      matchedAmazonProducts.add((bestMatch as NormalizedProduct).uniqueID);
      matchedFlipkartProducts.add(flipkartProduct.uniqueID);
    }
  });
  
  // Add remaining unmatched products
  amazonNormalized.forEach(product => {
    if (!matchedAmazonProducts.has(product.uniqueID)) {
      normalizedProducts.push(product);
    }
  });
  
  flipkartNormalized.forEach(product => {
    if (!matchedFlipkartProducts.has(product.uniqueID)) {
      normalizedProducts.push(product);
    }
  });

  return normalizedProducts;
}

export async function scrapeAndStoreProduct(
  productName: string,
  category?: ProductCategory,
): Promise<NormalizedProduct[]> {
  try {
    const queryParams = new URLSearchParams({ query: productName });
    if (category) {
      queryParams.append('category', category);
    }
    const response = await fetch(`/api/scrape?${queryParams}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`API request failed with status ${response.status}`);
    }

    const data = await response.json();

    if (data && (data.amazon || data.flipkart)) {
      // Use the new improved product matching logic
      const normalizedProducts = normalizeProductData(data.amazon || [], data.flipkart || []);
      
      // Apply additional processing if we have a specific category
      if (category) {
        // Extract specs from the query for better matching
        const querySpecs = extractSpecsByCategory(productName, category);
        
        // Enhance matching with query specs
        return normalizedProducts.map(product => {
          if (product.specs && querySpecs) {
            // Check if this product matches the query specs
            const matchScore = isMatchingProduct(product.specs, querySpecs) ? 1 : 0;
            return {
              ...product,
              similarityScore: Math.max(product.similarityScore || 0, matchScore)
            };
          }
          return product;
        });
      }
      
      return normalizedProducts;
    }

    return [];
  } catch (error) {
    console.error("Error scraping product data:", error);
    return [];
  }
}

// Improved function to find matching products between Amazon and Flipkart
export function findBestMatches(
  amazonProducts: NormalizedProduct[],
  flipkartProducts: NormalizedProduct[]
): Array<{ amazon: NormalizedProductUtils, flipkart: NormalizedProductUtils }> {
  if (amazonProducts.length === 0 || flipkartProducts.length === 0) {
    return [];
  }
  
  const matches: Array<{ amazon: NormalizedProductUtils, flipkart: NormalizedProductUtils }> = [];
  const matchedFlipkartProducts = new Set<string>();
  
  // For each Amazon product, find best Flipkart match
  amazonProducts.forEach(amazonProduct => {
    // Skip if no category
    if (!amazonProduct.category) return;
    
    let bestMatch: NormalizedProduct | null = null;
    let bestMatchScore = 0;
    
    flipkartProducts.forEach(flipkartProduct => {
      // Skip if already matched or no category
      if (matchedFlipkartProducts.has(flipkartProduct.uniqueID) || !flipkartProduct.category) return;
      
      // Calculate similarity score
      const similarity = calculateProductSimilarity(
        amazonProduct as { title: string; normalizedTitle: string; category: ProductCategory | null; specs: any },
        { ...flipkartProduct, specs: flipkartProduct.specs || {} },
        amazonProduct.price,
        flipkartProduct.price
      );
      
      if (similarity > bestMatchScore) {
        bestMatchScore = similarity;
        bestMatch = flipkartProduct;
      }
    });
    
    // Use threshold for matching
    const MATCH_THRESHOLD = 0.5;
    
    if (bestMatch && bestMatchScore >= MATCH_THRESHOLD) {
      matches.push({
        amazon: {
          title: amazonProduct.title,
          price: amazonProduct.price || 0,
          originalPrice: amazonProduct.originalPrice || 0,
          rating: amazonProduct.rating || 0,
          reviews: amazonProduct.reviews || 0,
          availability: amazonProduct.availability || "",
          source: "amazon" as const
        },
        flipkart: {
          title: (bestMatch as NormalizedProduct).title,
          price: (bestMatch as NormalizedProduct).price || 0,
          originalPrice: (bestMatch as NormalizedProduct).originalPrice || 0,
          rating: (bestMatch as NormalizedProduct).rating || 0,
          reviews: (bestMatch as NormalizedProduct).reviews || 0,
          availability: (bestMatch as NormalizedProduct).availability || "",
          source: "flipkart" as const
        }
      });
      
      // Mark Flipkart product as matched
      // @ts-ignore
      matchedFlipkartProducts.add(bestMatch.uniqueID);
    }
  });
  
  return matches;
}