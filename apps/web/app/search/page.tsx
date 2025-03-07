"use client"
import { useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"
import { CategorySelector, type ProductCategory } from "../components/category-selector"
import {
  extractAmazonSmartphoneAttributes,
  extractFlipkartSmartphoneAttributes,
  extractAmazonLaptopAttributes,
  extractFlipkartLaptopAttributes,
  extractAmazonTelevisionAttributes,
  extractFlipkartTelevisionAttributes,
  extractAmazonApplianceAttributes,
  extractFlipkartApplianceAttributes,
  extractGenericAttributes,
  type ProductAttributes,
} from "../utils/product-extractors"

const ScrapedDataPage = () => {
  const searchParams = useSearchParams()
  const queryFromURL = searchParams.get("query") || ""
  const categoryFromURL = (searchParams.get("category") as ProductCategory) || "smartphones"

  const [searchQuery, setSearchQuery] = useState(queryFromURL)
  const [selectedCategory, setSelectedCategory] = useState<ProductCategory>(categoryFromURL)
  const [scrapedData, setScrapedData] = useState<any>(null)

  // const handleSearch = async (query: string) => {
  //   if (!query) return;
  //   const response = await scrapeAndStoreProduct(query);
  //   if (response) {
  //     console.log("Our Scraped Data:");
  //     setScrapedData(response);
  //   } else {
  //     console.error("No data received from scrapeAndStoreProduct");
  //   }
  // };

  // useEffect(() => {
  //   setSearchQuery(queryFromURL);
  //   handleSearch(queryFromURL);
  // }, [queryFromURL]);

  useEffect(() => {
    setScrapedData(dummyData)
  }, [])

  // Function to extract attributes based on the selected category
  const extractAttributes = (item: any, source: "amazon" | "flipkart"): ProductAttributes => {
    if (!item) return { model: "", displayName: "" }

    switch (selectedCategory) {
      case "smartphones":
        return source === "amazon"
          ? extractAmazonSmartphoneAttributes(item.name)
          : extractFlipkartSmartphoneAttributes(item.name)

      case "laptops":
        return source === "amazon"
          ? extractAmazonLaptopAttributes(item.name)
          : extractFlipkartLaptopAttributes(item.name)

      case "television":
        return source === "amazon"
          ? extractAmazonTelevisionAttributes(item.name)
          : extractFlipkartTelevisionAttributes(item.name)

      case "washing-machine":
      case "refrigerator":
      case "air-conditioner":
        return source === "amazon"
          ? extractAmazonApplianceAttributes(item.name, selectedCategory)
          : extractFlipkartApplianceAttributes(item.name, selectedCategory)

      default:
        return extractGenericAttributes(item.name)
    }
  }

  // Function to create a match key based on the selected category
  const createMatchKey = (attributes: ProductAttributes): string => {
    switch (selectedCategory) {
      case "smartphones":
        const phone = attributes as any
        return `${phone.model}-${phone.color}-${phone.ram}-${phone.storage}`.toLowerCase()

      case "laptops":
        const laptop = attributes as any
        return `${laptop.model}-${laptop.processor}-${laptop.ram}-${laptop.storage}`.toLowerCase()

      case "television":
        const tv = attributes as any
        return `${tv.model}-${tv.size}-${tv.resolution}`.toLowerCase()

      case "washing-machine":
      case "refrigerator":
      case "air-conditioner":
        const appliance = attributes as any
        return `${appliance.modelNumber}-${appliance.capacity}`.toLowerCase()

      default:
        return `${attributes.model}`.toLowerCase()
    }
  }

  // Function to create a partial match key based on the selected category
  const createPartialMatchKey = (attributes: ProductAttributes): string => {
    switch (selectedCategory) {
      case "smartphones":
        const phone = attributes as any
        return `${phone.model}-${phone.color}`.toLowerCase()

      case "laptops":
        const laptop = attributes as any
        return `${laptop.model}-${laptop.processor}`.toLowerCase()

      case "television":
        const tv = attributes as any
        return `${tv.model}-${tv.size}`.toLowerCase()

      case "washing-machine":
      case "refrigerator":
      case "air-conditioner":
        const appliance = attributes as any
        return `${appliance.modelNumber}`.toLowerCase()

      default:
        return `${attributes.model}`.toLowerCase()
    }
  }

  // Function to format display specs based on the selected category
  const formatDisplaySpecs = (attributes: ProductAttributes): string => {
    switch (selectedCategory) {
      case "smartphones":
        const phone = attributes as any
        return `${phone.model} ${phone.color} ${phone.storage}GB${phone.ram ? ` ${phone.ram}GB RAM` : ""}`

      case "laptops":
        const laptop = attributes as any
        return `${laptop.model} ${laptop.processor || ""} ${laptop.ram}GB RAM ${laptop.storage}GB${laptop.screenSize ? ` ${laptop.screenSize}"` : ""}`

      case "television":
        const tv = attributes as any
        return `${tv.model} ${tv.size}" ${tv.resolution} ${tv.smartTv ? "Smart TV" : "TV"}`

      case "washing-machine":
      case "refrigerator":
      case "air-conditioner":
        const appliance = attributes as any
        return `${appliance.model} ${appliance.capacity} ${appliance.modelNumber ? `(${appliance.modelNumber})` : ""}`

      default:
        return `${attributes.model}`
    }
  }

  const mergeProducts = () => {
    const mergedProducts: any = {}

    if (scrapedData) {
      const { amazon, flipkart } = scrapedData

      // Process Amazon products first
      amazon.forEach((item: any) => {
        const attributes = extractAttributes(item, "amazon")

        // Create a composite key for matching
        const matchKey = createMatchKey(attributes)

        if (!mergedProducts[matchKey]) {
          mergedProducts[matchKey] = {
            ...attributes,
            amazon: item,
            flipkart: null,
          }
        } else {
          // If we already have this product, update Amazon data
          mergedProducts[matchKey].amazon = item
        }
      })

      // Then match Flipkart products to existing Amazon products or create new entries
      flipkart.forEach((item: any) => {
        const attributes = extractAttributes(item, "flipkart")

        // Create a composite key for matching
        const matchKey = createMatchKey(attributes)

        // Try exact match first
        if (mergedProducts[matchKey]) {
          mergedProducts[matchKey].flipkart = item
        } else {
          // If no exact match, try matching with partial key
          const partialMatchKey = createPartialMatchKey(attributes)

          let matched = false
          Object.keys(mergedProducts).forEach((key) => {
            // Check if the key starts with the partial match pattern
            if (key.startsWith(partialMatchKey) && !mergedProducts[key].flipkart) {
              mergedProducts[key].flipkart = item
              matched = true
            }
          })

          // If still no match, create a new entry
          if (!matched) {
            mergedProducts[matchKey] = {
              ...attributes,
              amazon: null,
              flipkart: item,
            }
          }
        }
      })
    }

    return mergedProducts
  }

  const handleCategoryChange = (category: ProductCategory) => {
    setSelectedCategory(category)
    // In a real implementation, you might want to update the URL or trigger a new search
    // window.history.pushState({}, '', `?query=${searchQuery}&category=${category}`)
    // handleSearch(searchQuery)
  }

  const mergedProducts = mergeProducts()

  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-4 py-8">
        {/*<HeroSection searchQuery={searchQuery} setSearchQuery={setSearchQuery} handleSearch={handleSearch} />*/}

        <h2 className="text-3xl font-bold mt-8 mb-6 text-white text-center">
          Search Results for: <span className="text-blue-400">{searchQuery}</span>
        </h2>

        <CategorySelector selectedCategory={selectedCategory} onCategoryChange={handleCategoryChange} />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {Object.keys(mergedProducts).map((productKey) => {
            const product = mergedProducts[productKey]

            // Create a descriptive display name
            const displayTitle = product.displayName
            const displaySpecs = formatDisplaySpecs(product)

            return (
              <div
                key={productKey}
                className="backdrop-blur-md bg-white/10 rounded-2xl overflow-hidden border border-white/20 shadow-[0_8px_32px_0_rgba(31,38,135,0.37)] h-full"
              >
                <div className="p-6">
                  <div className="flex flex-col gap-4">
                    <h3 className="text-xl font-bold text-white text-center line-clamp-2">{displayTitle}</h3>
                    <div className="text-sm text-center text-gray-300 -mt-2">{displaySpecs}</div>

                    <div className="flex flex-col md:flex-row gap-6">
                      {/* Product Image */}
                      <div className="md:w-1/3">
                        <div className="flex items-center justify-center h-48 bg-[#f7f7f7] rounded-xl p-2">
                          <img
                            src={
                              product.amazon?.image ||
                              product.flipkart?.image ||
                              "/placeholder.svg?height=200&width=200"
                            }
                            alt={displayTitle}
                            className="h-full w-auto object-contain"
                          />
                        </div>
                      </div>

                      {/* Product Details */}
                      <div className="md:w-2/3">
                        {/* Category-specific details */}
                        <div className="mb-4 text-gray-300">
                          {selectedCategory === "smartphones" && (
                            <div className="grid grid-cols-2 gap-2 mb-3">
                              <div className="text-sm">
                                <span className="text-gray-400">Model:</span> {product.model}
                              </div>
                              <div className="text-sm">
                                <span className="text-gray-400">Color:</span> {product.color}
                              </div>
                              <div className="text-sm">
                                <span className="text-gray-400">RAM:</span> {product.ram}GB
                              </div>
                              <div className="text-sm">
                                <span className="text-gray-400">Storage:</span> {product.storage}GB
                              </div>
                            </div>
                          )}

                          {selectedCategory === "laptops" && (
                            <div className="grid grid-cols-2 gap-2 mb-3">
                              <div className="text-sm">
                                <span className="text-gray-400">Model:</span> {product.model}
                              </div>
                              <div className="text-sm">
                                <span className="text-gray-400">Processor:</span> {product.processor}
                              </div>
                              <div className="text-sm">
                                <span className="text-gray-400">RAM:</span> {product.ram}GB
                              </div>
                              <div className="text-sm">
                                <span className="text-gray-400">Storage:</span> {product.storage}GB
                              </div>
                              {product.screenSize && (
                                <div className="text-sm">
                                  <span className="text-gray-400">Screen:</span> {product.screenSize}"
                                </div>
                              )}
                            </div>
                          )}

                          {selectedCategory === "television" && (
                            <div className="grid grid-cols-2 gap-2 mb-3">
                              <div className="text-sm">
                                <span className="text-gray-400">Model:</span> {product.model}
                              </div>
                              <div className="text-sm">
                                <span className="text-gray-400">Size:</span> {product.size}"
                              </div>
                              <div className="text-sm">
                                <span className="text-gray-400">Resolution:</span> {product.resolution}
                              </div>
                              <div className="text-sm">
                                <span className="text-gray-400">Type:</span>{" "}
                                {product.smartTv ? "Smart TV" : "Regular TV"}
                              </div>
                            </div>
                          )}

                          {(selectedCategory === "washing-machine" ||
                            selectedCategory === "refrigerator" ||
                            selectedCategory === "air-conditioner") && (
                            <div className="grid grid-cols-2 gap-2 mb-3">
                              <div className="text-sm">
                                <span className="text-gray-400">Model:</span> {product.model}
                              </div>
                              {product.modelNumber && (
                                <div className="text-sm">
                                  <span className="text-gray-400">Model Number:</span> {product.modelNumber}
                                </div>
                              )}
                              {product.capacity && (
                                <div className="text-sm">
                                  <span className="text-gray-400">Capacity:</span> {product.capacity}
                                </div>
                              )}
                            </div>
                          )}

                          {/* Product specifications from Amazon if available */}
                          {product.amazon?.specifications && (
                            <div className="grid gap-2">
                              {Object.entries(product.amazon.specifications || {}).map(([key, value]) => (
                                <div key={key} className="text-sm">
                                  <span className="text-gray-400">{key}:</span> {value as string}
                                </div>
                              ))}
                            </div>
                          )}
                        </div>

                        {/* Ratings and Reviews */}
                        {product.amazon && (
                          <div className="flex items-center gap-8 mb-4">
                            <div className="flex items-center gap-2">
                              <span className="text-yellow-400">★</span>
                              <span className="text-gray-300">{product.amazon?.rating}</span>
                              <span className="text-gray-400 text-sm">({product.amazon?.reviews} reviews)</span>
                            </div>
                          </div>
                        )}

                        {/* Prices Comparison */}
                        <div className="grid grid-cols-2 gap-4 mb-4">
                          {/* Amazon Price */}
                          <div className="backdrop-blur-sm bg-black/30 rounded-xl p-4 border border-white/10">
                            <div className="text-gray-300 mb-2">Amazon</div>
                            {product.amazon ? (
                              <>
                                <div className="text-gray-400 text-sm line-through">
                                  {product.amazon?.originalPrice}
                                </div>
                                <div className="text-2xl font-bold text-white">₹{product.amazon?.price}</div>
                              </>
                            ) : (
                              <div className="text-gray-400">Not available</div>
                            )}
                          </div>

                          {/* Flipkart Price */}
                          <div className="backdrop-blur-sm bg-black/30 rounded-xl p-4 border border-white/10">
                            <div className="text-gray-300 mb-2">Flipkart</div>
                            {product.flipkart ? (
                              <>
                                <div className="text-gray-400 text-sm line-through">
                                  {product.flipkart?.orignalPrice}
                                </div>
                                <div className="text-2xl font-bold text-white">{product.flipkart?.price}</div>
                              </>
                            ) : (
                              <div className="text-gray-400">Not available</div>
                            )}
                          </div>
                        </div>

                        {/* Buy Buttons */}
                        <div className="grid grid-cols-2 gap-4">
                          <a
                            href={product.amazon?.link || "#"}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`block w-full ${product.amazon ? "bg-[#FF9900]" : "bg-gray-500"} text-black font-semibold py-2 px-4 rounded-lg text-center hover:bg-[#FF9900]/90 transition-all hover:shadow-lg hover:scale-[1.02] ${!product.amazon && "pointer-events-none opacity-50"}`}
                          >
                            {product.amazon ? "Buy on Amazon" : "Not Available"}
                          </a>
                          <a
                            href={product.flipkart?.link || "#"}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`block w-full ${product.flipkart ? "bg-[#2874F0]" : "bg-gray-500"} text-white font-semibold py-2 px-4 rounded-lg text-center hover:bg-[#2874F0]/90 transition-all hover:shadow-lg hover:scale-[1.02] ${!product.flipkart && "pointer-events-none opacity-50"}`}
                          >
                            {product.flipkart ? "Buy on Flipkart" : "Not Available"}
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default ScrapedDataPage

var dummyData = {
  amazon: [
    {
      name: "realme GT 6T 5G (Fluid Silver,12GB RAM+256GB Storage) | India's 1st 7+ Gen 3 Flagship Chipset | 1.5M + AnTuTu Score | 5500mAh+120W | The World's Brightest Flagship Display",
      rating: "4.3 out of 5 stars",
      reviews: "3,353",
      boughtInPastMonth: "500+ bought in past month",
      price: "30,998",
      originalPrice: "₹30,998",
      discount: "",
      availability: "In Stock",
      image: "https://m.media-amazon.com/images/I/61HyiMlCuTL._AC_UY218_.jpg",
      link: "https://www.amazon.in/realme-Storage-Flagship-Chipset-Brightest/dp/B0D3J8HYDD/ref=sr_1_2?dib=eyJ2IjoiMSJ9.idPca3vooz8z4V5fYJ7HoCMFAwfh-U0oOa5QEEMZqlDz1SF-iYQ2g3trhMiaOTsRQbu5BlLeLR9niahCX42XIc_E_Ye8xmGbRRsxDkk42ddYIaDvpShlnNJpaEd-O53aH7D2pNxjjI12cKf9y1HmgQZWbkx5w3sNqtY1Dp7gedZrRytJv7ejRS4tdjsfeKER_bDfgWpX5DWuYPuFvdVlMWpUeaM-QJWhqNeNutKGvvM.NJrmJ03O1RgrKdlDWsH315XXdYng1-w5ZUUZ7-5N98A&dib_tag=se&keywords=Realme%2BGT%2B6T&nsdOptOutParam=true&qid=1741263112&sr=8-2",
    },
    {
      name: "realme GT 6T 5G (Fluid Silver,8GB RAM+256GB Storage) | India's 1st 7+ Gen 3 Flagship Chipset | 1.5M + AnTuTu Score | 5500mAh+120W | The World's Brightest Flagship Display",
      rating: "4.3 out of 5 stars",
      reviews: "3,353",
      boughtInPastMonth: "500+ bought in past month",
      price: "28,500",
      originalPrice: "₹28,500",
      discount: "",
      availability: "In Stock",
      image: "https://m.media-amazon.com/images/I/61HyiMlCuTL._AC_UY218_.jpg",
      link: "https://www.amazon.in/realme-Storage-Flagship-Chipset-Brightest/dp/B0D3J9FN5C/ref=sr_1_3?dib=eyJ2IjoiMSJ9.idPca3vooz8z4V5fYJ7HoCMFAwfh-U0oOa5QEEMZqlDz1SF-iYQ2g3trhMiaOTsRQbu5BlLeLR9niahCX42XIc_E_Ye8xmGbRRsxDkk42ddYIaDvpShlnNJpaEd-O53aH7D2pNxjjI12cKf9y1HmgQZWbkx5w3sNqtY1Dp7gedZrRytJv7ejRS4tdjsfeKER_bDfgWpX5DWuYPuFvdVlMWpUeaM-QJWhqNeNutKGvvM.NJrmJ03O1RgrKdlDWsH315XXdYng1-w5ZUUZ7-5N98A&dib_tag=se&keywords=Realme%2BGT%2B6T&nsdOptOutParam=true&qid=1741263112&sr=8-3",
    },
    {
      name: "realme GT 6T 5G (Miracle Purple,8GB RAM+256GB Storage) | India's 1st 7+ Gen 3 Flagship Chipset | 1.5M + AnTuTu Score | 5500mAh+120W | The World's Brightest Flagship Display",
      rating: "4.3 out of 5 stars",
      reviews: "3,353",
      boughtInPastMonth: "500+ bought in past month",
      price: "28,500",
      originalPrice: "₹28,500",
      discount: "",
      availability: "In Stock",
      image: "https://m.media-amazon.com/images/I/71B18vpAwSL._AC_UY218_.jpg",
      link: "https://www.amazon.in/realme-Miracle-Storage-Flagship-Brightest/dp/B0D8JM6BHN/ref=sr_1_4?dib=eyJ2IjoiMSJ9.idPca3vooz8z4V5fYJ7HoCMFAwfh-U0oOa5QEEMZqlDz1SF-iYQ2g3trhMiaOTsRQbu5BlLeLR9niahCX42XIc_E_Ye8xmGbRRsxDkk42ddYIaDvpShlnNJpaEd-O53aH7D2pNxjjI12cKf9y1HmgQZWbkx5w3sNqtY1Dp7gedZrRytJv7ejRS4tdjsfeKER_bDfgWpX5DWuYPuFvdVlMWpUeaM-QJWhqNeNutKGvvM.NJrmJ03O1RgrKdlDWsH315XXdYng1-w5ZUUZ7-5N98A&dib_tag=se&keywords=Realme%2BGT%2B6T&nsdOptOutParam=true&qid=1741263112&sr=8-4",
    },
    {
      name: "realme GT 6T 5G (Miracle Purple,12GB RAM+256GB Storage) | India's 1st 7+ Gen 3 Flagship Chipset | 1.5M + AnTuTu Score | 5500mAh+120W | The World's Brightest Flagship Display",
      rating: "4.3 out of 5 stars",
      reviews: "3,353",
      boughtInPastMonth: "300+ bought in past month",
      price: "30,998",
      originalPrice: "₹30,998",
      discount: "",
      availability: "In Stock",
      image: "https://m.media-amazon.com/images/I/71B18vpAwSL._AC_UY218_.jpg",
      link: "https://www.amazon.in/realme-Miracle-Storage-Flagship-Brightest/dp/B0D8JM1G7Z/ref=sr_1_5?dib=eyJ2IjoiMSJ9.idPca3vooz8z4V5fYJ7HoCMFAwfh-U0oOa5QEEMZqlDz1SF-iYQ2g3trhMiaOTsRQbu5BlLeLR9niahCX42XIc_E_Ye8xmGbRRsxDkk42ddYIaDvpShlnNJpaEd-O53aH7D2pNxjjI12cKf9y1HmgQZWbkx5w3sNqtY1Dp7gedZrRytJv7ejRS4tdjsfeKER_bDfgWpX5DWuYPuFvdVlMWpUeaM-QJWhqNeNutKGvvM.NJrmJ03O1RgrKdlDWsH315XXdYng1-w5ZUUZ7-5N98A&dib_tag=se&keywords=Realme%2BGT%2B6T&nsdOptOutParam=true&qid=1741263112&sr=8-5",
    },
    {
      name: "realme GT 6T 5G (Fluid Silver,12GB RAM+512GB Storage) | India's 1st 7+ Gen 3 Flagship Chipset | 1.5M+AnTuTu Score | 5500mAh+120W | The World's Brightest Flagship Display",
      rating: "4.3 out of 5 stars",
      reviews: "3,353",
      boughtInPastMonth: "M.R.P:",
      price: "34,999",
      originalPrice: "₹34,999",
      discount: "",
      availability: "In Stock",
      image: "https://m.media-amazon.com/images/I/61HyiMlCuTL._AC_UY218_.jpg",
      link: "https://www.amazon.in/realme-Storage-Flagship-Chipset-Brightest/dp/B0D3J6NDYS/ref=sr_1_6?dib=eyJ2IjoiMSJ9.idPca3vooz8z4V5fYJ7HoCMFAwfh-U0oOa5QEEMZqlDz1SF-iYQ2g3trhMiaOTsRQbu5BlLeLR9niahCX42XIc_E_Ye8xmGbRRsxDkk42ddYIaDvpShlnNJpaEd-O53aH7D2pNxjjI12cKf9y1HmgQZWbkx5w3sNqtY1Dp7gedZrRytJv7ejRS4tdjsfeKER_bDfgWpX5DWuYPuFvdVlMWpUeaM-QJWhqNeNutKGvvM.NJrmJ03O1RgrKdlDWsH315XXdYng1-w5ZUUZ7-5N98A&dib_tag=se&keywords=Realme%2BGT%2B6T&nsdOptOutParam=true&qid=1741263112&sr=8-6",
    },
    {
      name: "realme GT 6T 5G (Fluid Silver,8GB RAM+256GB Storage) | India's 1st 7+ Gen 3 Flagship Chipset | 1.5M+AnTuTu Score | 5500mAh+120W | The World's Brightest Flagship Display",
      rating: "N/A",
      reviews: "N/A",
      boughtInPastMonth: "M.R.P:",
      price: "26,500",
      originalPrice: "₹26,500",
      discount: "",
      availability: "In Stock",
      image: "https://m.media-amazon.com/images/I/71WgUwCpk1L._AC_UY218_.jpg",
      link: "https://www.amazon.in/realme-Storage-Flagship-Chipset-Brightest/dp/B0DJ673VB3/ref=sr_1_7?dib=eyJ2IjoiMSJ9.idPca3vooz8z4V5fYJ7HoCMFAwfh-U0oOa5QEEMZqlDz1SF-iYQ2g3trhMiaOTsRQbu5BlLeLR9niahCX42XIc_E_Ye8xmGbRRsxDkk42ddYIaDvpShlnNJpaEd-O53aH7D2pNxjjI12cKf9y1HmgQZWbkx5w3sNqtY1Dp7gedZrRytJv7ejRS4tdjsfeKER_bDfgWpX5DWuYPuFvdVlMWpUeaM-QJWhqNeNutKGvvM.NJrmJ03O1RgrKdlDWsH315XXdYng1-w5ZUUZ7-5N98A&dib_tag=se&keywords=Realme%2BGT%2B6T&nsdOptOutParam=true&qid=1741263112&sr=8-7",
    },
    {
      name: "realme GT 6T 5G (Miracle Purple,8GB RAM+256GB Storage) | India's 1st 7+ Gen 3 Flagship Chipset | 1.5M+AnTuTu Score | 5500mAh+120W | The World's Brightest Flagship Display",
      rating: "4.1 out of 5 stars",
      reviews: "55",
      boughtInPastMonth: "M.R.P:",
      price: "26,800",
      originalPrice: "₹26,800",
      discount: "",
      availability: "In Stock",
      image: "https://m.media-amazon.com/images/I/719rGhChFDL._AC_UY218_.jpg",
      link: "https://www.amazon.in/realme-Miracle-Storage-Flagship-Brightest/dp/B0DJ65MXTH/ref=sr_1_8?dib=eyJ2IjoiMSJ9.idPca3vooz8z4V5fYJ7HoCMFAwfh-U0oOa5QEEMZqlDz1SF-iYQ2g3trhMiaOTsRQbu5BlLeLR9niahCX42XIc_E_Ye8xmGbRRsxDkk42ddYIaDvpShlnNJpaEd-O53aH7D2pNxjjI12cKf9y1HmgQZWbkx5w3sNqtY1Dp7gedZrRytJv7ejRS4tdjsfeKER_bDfgWpX5DWuYPuFvdVlMWpUeaM-QJWhqNeNutKGvvM.NJrmJ03O1RgrKdlDWsH315XXdYng1-w5ZUUZ7-5N98A&dib_tag=se&keywords=Realme%2BGT%2B6T&nsdOptOutParam=true&qid=1741263112&sr=8-8",
    },
    {
      name: "realme GT 6T 5G (Fluid Silver,8GB RAM+128GB Storage) | India's 1st 7+ Gen 3 Flagship Chipset | 1.5M+AnTuTu Score | 5500mAh+120W | The World's Brightest Flagship Display",
      rating: "4.3 out of 5 stars",
      reviews: "3,353",
      boughtInPastMonth: "M.R.P:",
      price: "26,999",
      originalPrice: "₹26,999",
      discount: "",
      availability: "In Stock",
      image: "https://m.media-amazon.com/images/I/61HyiMlCuTL._AC_UY218_.jpg",
      link: "https://www.amazon.in/realme-Storage-Flagship-Chipset-Brightest/dp/B0D3J5PTSX/ref=sr_1_9?dib=eyJ2IjoiMSJ9.idPca3vooz8z4V5fYJ7HoCMFAwfh-U0oOa5QEEMZqlDz1SF-iYQ2g3trhMiaOTsRQbu5BlLeLR9niahCX42XIc_E_Ye8xmGbRRsxDkk42ddYIaDvpShlnNJpaEd-O53aH7D2pNxjjI12cKf9y1HmgQZWbkx5w3sNqtY1Dp7gedZrRytJv7ejRS4tdjsfeKER_bDfgWpX5DWuYPuFvdVlMWpUeaM-QJWhqNeNutKGvvM.NJrmJ03O1RgrKdlDWsH315XXdYng1-w5ZUUZ7-5N98A&dib_tag=se&keywords=Realme%2BGT%2B6T&nsdOptOutParam=true&qid=1741263112&sr=8-9",
    },
  ],
  flipkart: [
    {
      name: "realme GT 6T 5G (Fluid Silver, 256 GB)|8 GB RAM",
      price: "₹26,970",
      orignalPrice: "₹35,999",
      link: "https://www.flipkart.com/realme-gt-6t-5g-fluid-silver-256-gb/p/itmfeb5a69f5f153?pid=MOBHFDDQMVGQ6YRC&lid=LSTMOBHFDDQMVGQ6YRCSV2KCM&marketplace=FLIPKART&q=Realme+GT+6T&store=tyy%2F4io&srno=s_1_2&otracker=search&iid=aea864cb-1c96-4c91-a3a2-25d2cb81948f.MOBHFDDQMVGQ6YRC.SEARCH&ssid=fxa8opd0sw0000001741263114417&qH=11cea4229cdb0b96",
    },
    {
      name: "realme GT 6T 5G (Miracle Purple, 256 GB)|8 GB RAM",
      price: "₹28,778",
      orignalPrice: "₹35,999",
      link: "https://www.flipkart.com/realme-gt-6t-5g-miracle-purple-256-gb/p/itmfeb5a69f5f153?pid=MOBH3YBFJFSVAVE4&lid=LSTMOBH3YBFJFSVAVE4UCK2MC&marketplace=FLIPKART&q=Realme+GT+6T&store=tyy%2F4io&srno=s_1_3&otracker=search&iid=aea864cb-1c96-4c91-a3a2-25d2cb81948f.MOBH3YBFJFSVAVE4.SEARCH&ssid=fxa8opd0sw0000001741263114417&qH=11cea4229cdb0b96",
    },
    {
      name: "realme GT 6T 5G (Fluid Silver, 256 GB)|12 GB RAM",
      price: "₹29,930",
      orignalPrice: "₹37,999",
      link: "https://www.flipkart.com/realme-gt-6t-5g-fluid-silver-256-gb/p/itmfeb5a69f5f153?pid=MOBHFDDQFZYMRYG4&lid=LSTMOBHFDDQFZYMRYG4CDMLDX&marketplace=FLIPKART&q=Realme+GT+6T&store=tyy%2F4io&srno=s_1_4&otracker=search&iid=aea864cb-1c96-4c91-a3a2-25d2cb81948f.MOBHFDDQFZYMRYG4.SEARCH&ssid=fxa8opd0sw0000001741263114417&qH=11cea4229cdb0b96",
    },
    {
      name: "realme GT 6T 5G (Fluid Silver, 512 GB)|12 GB RAM",
      price: "₹32,793",
      orignalPrice: "₹41,999",
      link: "https://www.flipkart.com/realme-gt-6t-5g-fluid-silver-512-gb/p/itmfeb5a69f5f153?pid=MOBHFDDTQFUG6ZZT&lid=LSTMOBHFDDTQFUG6ZZTI12IVT&marketplace=FLIPKART&q=Realme+GT+6T&store=tyy%2F4io&srno=s_1_5&otracker=search&iid=aea864cb-1c96-4c91-a3a2-25d2cb81948f.MOBHFDDTQFUG6ZZT.SEARCH&ssid=fxa8opd0sw0000001741263114417&qH=11cea4229cdb0b96",
    },
    {
      name: "realme GT 6T 5G (Razor Green, 256 GB)|8 GB RAM",
      price: "₹27,179",
      orignalPrice: "₹35,999",
      link: "https://www.flipkart.com/realme-gt-6t-5g-razor-green-256-gb/p/itmfeb5a69f5f153?pid=MOBHFDDT3VZ9TKGF&lid=LSTMOBHFDDT3VZ9TKGFVATUVI&marketplace=FLIPKART&q=Realme+GT+6T&store=tyy%2F4io&srno=s_1_6&otracker=search&iid=aea864cb-1c96-4c91-a3a2-25d2cb81948f.MOBHFDDT3VZ9TKGF.SEARCH&ssid=fxa8opd0sw0000001741263114417&qH=11cea4229cdb0b96",
    },
    {
      name: "realme GT 6T 5G (Miracle Purple, 256 GB)|12 GB RAM",
      price: "₹29,989",
      orignalPrice: "₹37,999",
      link: "https://www.flipkart.com/realme-gt-6t-5g-miracle-purple-256-gb/p/itmfeb5a69f5f153?pid=MOBH3YBHV3P8V78Z&lid=LSTMOBH3YBHV3P8V78ZY8MMTG&marketplace=FLIPKART&q=Realme+GT+6T&store=tyy%2F4io&srno=s_1_7&otracker=search&iid=aea864cb-1c96-4c91-a3a2-25d2cb81948f.MOBH3YBHV3P8V78Z.SEARCH&ssid=fxa8opd0sw0000001741263114417&qH=11cea4229cdb0b96",
    },
    {
      name: "realme GT 6T 5G (Razor Green, 256 GB)|12 GB RAM",
      price: "₹30,267",
      orignalPrice: "₹37,999",
      link: "https://www.flipkart.com/realme-gt-6t-5g-razor-green-256-gb/p/itmfeb5a69f5f153?pid=MOBHFDDTGSHPZF4A&lid=LSTMOBHFDDTGSHPZF4ABERXWG&marketplace=FLIPKART&q=Realme+GT+6T&store=tyy%2F4io&srno=s_1_8&otracker=search&iid=aea864cb-1c96-4c91-a3a2-25d2cb81948f.MOBHFDDTGSHPZF4A.SEARCH&ssid=fxa8opd0sw0000001741263114417&qH=11cea4229cdb0b96",
    },
    {
      name: "realme GT Neo 3T (Drifting White, 128 GB)|6 GB RAM",
      price: "₹31,999",
      orignalPrice: "₹36,999",
      link: "https://www.flipkart.com/realme-gt-6t-5g-razor-green-256-gb/p/itmfeb5a69f5f153?pid=MOBHFDDTGSHPZF4A&lid=LSTMOBHFDDTGSHPZF4ABERXWG&marketplace=FLIPKART&q=Realme+GT+6T&store=tyy%2F4io&srno=s_1_8&otracker=search&iid=aea864cb-1c96-4c91-a3a2-25d2cb81948f.MOBHFDDTGSHPZF4A.SEARCH&ssid=fxa8opd0sw0000001741263114417&qH=11cea4229cdb0b96",
    },
    {
      name: "realme GT Neo 3T (Drifting White, 128 GB)|8 GB RAM",
      price: "₹31,999",
      orignalPrice: "₹36,999",
      link: "https://www.flipkart.com/realme-gt-neo-3t-drifting-white-128-gb/p/itmd1b8c6a6c8604?MOBHFDDTGSHPZF4A&lid=LSTMOBHFDDTGSHPZF4ABERXWG&marketplace=FLIPKART&q=Realme+GT+6T&store=tyy%2F4io&srno=s_1_8&otracker=search&iid=aea864cb-1c96-4c91-a3a2-25d2cb81948f.MOBHFDDTGSHPZF4A.SEARCH&ssid=fxa8opd0sw0000001741263114417&qH=11cea4229cdb0b96",
    },
  ],
}

