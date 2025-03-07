// Type definitions for product attributes
export interface ProductAttributes {
    model: string
    displayName: string
    [key: string]: any
  }
  
  export interface SmartphoneAttributes extends ProductAttributes {
    color: string
    ram: number
    storage: number
  }
  
  export interface LaptopAttributes extends ProductAttributes {
    processor: string
    ram: number
    storage: number
    screenSize: string
  }
  
  export interface TelevisionAttributes extends ProductAttributes {
    size: string
    resolution: string
    smartTv: boolean
  }
  
  export interface ApplianceAttributes extends ProductAttributes {
    modelNumber: string
    capacity: string
  }
  
  // Smartphone extractors
  export function extractAmazonSmartphoneAttributes(title: string): SmartphoneAttributes {
    // Get the part before the first "|"
    const parts = title.split("|")
    const mainTitle = parts[0]?.trim() || ""
  
    // Extract model
    const modelMatch = mainTitle.match(/GT\s+\d+T?/i) || mainTitle.match(/(\w+\s+\d+\w*)/i)
    const model = modelMatch?.[0]?.toUpperCase() || ""
  
    // Extract color
    const colorMatch = mainTitle.match(/\((.*?),/)
    const color = colorMatch?.[1]?.trim() || ""
  
    // Extract RAM
    const ramMatch = mainTitle.match(/(\d+)GB\s*RAM/i) || mainTitle.match(/(\d+)GB\+/)
    const ram = ramMatch?.[1] ? Number.parseInt(ramMatch[1]) : 0
  
    // Extract storage
    const storageMatch = mainTitle.match(/(\d+)GB\s*Storage/i) || mainTitle.match(/\+(\d+)GB/)
    const storage = storageMatch?.[1] ? Number.parseInt(storageMatch[1]) : 0
  
    return {
      model,
      color,
      ram,
      storage,
      displayName: mainTitle,
    }
  }
  
  export function extractFlipkartSmartphoneAttributes(title: string): SmartphoneAttributes {
    // Split by "|" to separate main title and RAM info
    const parts = title.split("|")
    const mainTitle = parts[0]?.trim() || ""
  
    // Extract model
    const modelMatch = mainTitle.match(/GT\s+\d+T?/i) || mainTitle.match(/(\w+\s+\d+\w*)/i)
    const model = modelMatch?.[0]?.toUpperCase() || ""
  
    // Extract color
    const colorMatch = mainTitle.match(/\((.*?),/)
    const color = colorMatch?.[1]?.trim() || ""
  
    // Extract storage
    const storageMatch = mainTitle.match(/(\d+)\s*GB\)?$/)
    const storage = storageMatch?.[1] ? Number.parseInt(storageMatch[1]) : 0
  
    // Extract RAM from the second part if available
    let ram = 0
    if (parts.length > 1) {
      const ramMatch = parts[1]?.match(/(\d+)\s*GB\s*RAM/i)
      ram = ramMatch?.[1] ? Number.parseInt(ramMatch[1]) : 0
    }
  
    return {
      model,
      color,
      ram,
      storage,
      displayName: mainTitle,
    }
  }
  
  // Laptop extractors
  export function extractAmazonLaptopAttributes(title: string): LaptopAttributes {
    const parts = title.split("|")
    const mainTitle = parts[0]?.trim() || ""
  
    // Extract model
    const modelMatch = mainTitle.match(/(\w+\s+\d+\w*)/i)
    const model = modelMatch?.[0]?.toUpperCase() || ""
  
    // Extract processor
    const processorMatch = mainTitle.match(/(i\d+-\d+\w+|Ryzen\s+\d+\s+\d+\w+)/i)
    const processor = processorMatch?.[0] || ""
  
    // Extract RAM
    const ramMatch = mainTitle.match(/(\d+)\s*GB\s*RAM/i)
    const ram = ramMatch?.[1] ? Number.parseInt(ramMatch[1]) : 0
  
    // Extract storage
    const storageMatch = mainTitle.match(/(\d+)\s*GB\s*SSD/i) || mainTitle.match(/(\d+)\s*TB\s*SSD/i)
    const storage = storageMatch?.[1]
      ? mainTitle.includes("TB")
        ? Number.parseInt(storageMatch[1]) * 1024
        : Number.parseInt(storageMatch[1])
      : 0
  
    // Extract screen size
    const screenMatch = mainTitle.match(/(\d+\.?\d*)\s*inch/i)
    const screenSize = screenMatch?.[1] || ""
  
    return {
      model,
      processor,
      ram,
      storage,
      screenSize,
      displayName: mainTitle,
    }
  }
  
  export function extractFlipkartLaptopAttributes(title: string): LaptopAttributes {
    const parts = title.split("|")
    const mainTitle = parts[0]?.trim() || ""
  
    // Extract model
    const modelMatch = mainTitle.match(/(\w+\s+\d+\w*)/i)
    const model = modelMatch?.[0]?.toUpperCase() || ""
  
    // Extract processor
    const processorMatch = mainTitle.match(/(i\d+-\d+\w+|Ryzen\s+\d+\s+\d+\w+)/i)
    const processor = processorMatch?.[0] || ""
  
    // Extract RAM
    let ram = 0
    if (parts.length > 1) {
      const ramMatch = parts[1]?.match(/(\d+)\s*GB\s*RAM/i)
      ram = ramMatch?.[1] ? Number.parseInt(ramMatch[1]) : 0
    }
  
    // Extract storage
    const storageMatch = mainTitle.match(/(\d+)\s*GB\s*SSD/i) || mainTitle.match(/(\d+)\s*TB\s*SSD/i)
    const storage = storageMatch?.[1]
      ? mainTitle.includes("TB")
        ? Number.parseInt(storageMatch[1]) * 1024
        : Number.parseInt(storageMatch[1])
      : 0
  
    // Extract screen size
    const screenMatch = mainTitle.match(/(\d+\.?\d*)\s*inch/i)
    const screenSize = screenMatch?.[1] || ""
  
    return {
      model,
      processor,
      ram,
      storage,
      screenSize,
      displayName: mainTitle,
    }
  }
  
  // Television extractors
  export function extractAmazonTelevisionAttributes(title: string): TelevisionAttributes {
    const parts = title.split("|")
    const mainTitle = parts[0]?.trim() || ""
  
    // Extract model
    const modelMatch = mainTitle.match(/(\w+\s+\d+\w*)/i)
    const model = modelMatch?.[0]?.toUpperCase() || ""
  
    // Extract size
    const sizeMatch = mainTitle.match(/(\d+)\s*inch/i)
    const size = sizeMatch?.[1] || ""
  
    // Extract resolution
    const resolutionMatch = mainTitle.match(/(4K|Ultra HD|Full HD|HD Ready)/i)
    const resolution = resolutionMatch?.[0] || ""
  
    // Check if smart TV
    const smartTv = /smart|android|google tv|fire tv/i.test(mainTitle)
  
    return {
      model,
      size,
      resolution,
      smartTv,
      displayName: mainTitle,
    }
  }
  
  export function extractFlipkartTelevisionAttributes(title: string): TelevisionAttributes {
    const parts = title.split("|")
    const mainTitle = parts[0]?.trim() || ""
  
    // Extract model
    const modelMatch = mainTitle.match(/(\w+\s+\d+\w*)/i)
    const model = modelMatch?.[0]?.toUpperCase() || ""
  
    // Extract size
    const sizeMatch = mainTitle.match(/(\d+)\s*inch/i)
    const size = sizeMatch?.[1] || ""
  
    // Extract resolution
    const resolutionMatch = mainTitle.match(/(4K|Ultra HD|Full HD|HD Ready)/i)
    const resolution = resolutionMatch?.[0] || ""
  
    // Check if smart TV
    const smartTv = /smart|android|google tv|fire tv/i.test(mainTitle)
  
    return {
      model,
      size,
      resolution,
      smartTv,
      displayName: mainTitle,
    }
  }
  
  // Appliance extractors (for washing machines, refrigerators, ACs)
  export function extractAmazonApplianceAttributes(title: string, category: string): ApplianceAttributes {
    const parts = title.split("|")
    const mainTitle = parts[0]?.trim() || ""
  
    // Extract model number - this is crucial for appliances
    const modelNumberMatch = mainTitle.match(/([A-Z0-9]{10,})/i) || mainTitle.match(/model\s*[:#]?\s*([A-Z0-9]{5,})/i)
    const modelNumber = modelNumberMatch?.[1] || ""
  
    // Extract capacity based on category
    let capacity = ""
    if (category === "washing-machine") {
      const capacityMatch = mainTitle.match(/(\d+\.?\d*)\s*kg/i)
      capacity = capacityMatch?.[1] ? `${capacityMatch[1]} kg` : ""
    } else if (category === "refrigerator") {
      const capacityMatch = mainTitle.match(/(\d+)\s*L/i)
      capacity = capacityMatch?.[1] ? `${capacityMatch[1]} L` : ""
    } else if (category === "air-conditioner") {
      const capacityMatch = mainTitle.match(/(\d+\.?\d*)\s*ton/i)
      capacity = capacityMatch?.[1] ? `${capacityMatch[1]} ton` : ""
    }
  
    // Extract model for display
    const modelMatch = mainTitle.match(/(\w+\s+\d+\w*)/i)
    const model = modelMatch?.[0]?.toUpperCase() || ""
  
    return {
      model,
      modelNumber,
      capacity,
      displayName: mainTitle,
    }
  }
  
  export function extractFlipkartApplianceAttributes(title: string, category: string): ApplianceAttributes {
    const parts = title.split("|")
    const mainTitle = parts[0]?.trim() || ""
  
    // Extract model number - this is crucial for appliances
    const modelNumberMatch = mainTitle.match(/([A-Z0-9]{10,})/i) || mainTitle.match(/model\s*[:#]?\s*([A-Z0-9]{5,})/i)
    const modelNumber = modelNumberMatch?.[1] || ""
  
    // Extract capacity based on category
    let capacity = ""
    if (category === "washing-machine") {
      const capacityMatch = mainTitle.match(/(\d+\.?\d*)\s*kg/i)
      capacity = capacityMatch?.[1] ? `${capacityMatch[1]} kg` : ""
    } else if (category === "refrigerator") {
      const capacityMatch = mainTitle.match(/(\d+)\s*L/i)
      capacity = capacityMatch?.[1] ? `${capacityMatch[1]} L` : ""
    } else if (category === "air-conditioner") {
      const capacityMatch = mainTitle.match(/(\d+\.?\d*)\s*ton/i)
      capacity = capacityMatch?.[1] ? `${capacityMatch[1]} ton` : ""
    }
  
    // Extract model for display
    const modelMatch = mainTitle.match(/(\w+\s+\d+\w*)/i)
    const model = modelMatch?.[0]?.toUpperCase() || ""
  
    return {
      model,
      modelNumber,
      capacity,
      displayName: mainTitle,
    }
  }
  
  // Generic extractors for other categories
  export function extractGenericAttributes(title: string): ProductAttributes {
    const parts = title.split("|")
    const mainTitle = parts[0]?.trim() || ""
  
    // Extract model
    const modelMatch = mainTitle.match(/(\w+\s+\d+\w*)/i)
    const model = modelMatch?.[0]?.toUpperCase() || ""
  
    return {
      model,
      displayName: mainTitle,
    }
  }
  
  