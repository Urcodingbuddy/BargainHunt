import puppeteer from "puppeteer-core";

export async function scrapeProduct(searchParams: string) {
    if (!searchParams) return;

    // Run both scrapers simultaneously
    const [amazonData, flipkartData] = await Promise.all([
        scrapeAmazon(searchParams),
        scrapeFlipkart(searchParams)
    ]);
    return { amazon: amazonData, flipkart: flipkartData };
}

// Amazon Scraper
// @ts-ignore
async function scrapeAmazon(searchParams: string) {
    const BASE_URL = "https://www.amazon.in/s?k=";
    const searchUrl = `${BASE_URL}${encodeURIComponent(searchParams.trim().replace(/\s+/g, '+'))}`;
    const BROWSER_WS = String(process.env.BRIGHT_DATA_BROWSER_WS_01);

    console.log("Connecting to Bright Data Browser...");
    const browser = await puppeteer.connect({ browserWSEndpoint: BROWSER_WS });
    console.log("Connected to Bright Data Browser...");
    const page = await browser.newPage();
    page.setDefaultNavigationTimeout(2 * 60 * 1000);
    await page.goto(searchUrl, { waitUntil: "domcontentloaded" });

    await page.waitForSelector(".s-card-container", { timeout: 30000 });
    console.log("Products loaded From Amazon");

    // Extracting data directly for Amazon
    const amazonData = await page.evaluate(() => {
        const productSelector = ".s-card-container";
        const nameSelector = ".a-size-medium.a-spacing-none.a-color-base.a-text-normal";
        const ratingSelector = ".a-icon-star-small";
        const reviewsSelector = ".a-size-base.s-underline-text";
        const boughtInPastMonthSelector = ".a-row.a-size-base .a-size-base.a-color-secondary";
        const priceSelector = ".a-price-whole";
        const originalPriceSelector = ".a-offscreen";
        const discountSelector = ".a-size-base.a-color-price";
        const availabilitySelector = ".a-size-medium.a-color-success";
        const imageSelector = ".s-image";


        return Array.from(document.querySelectorAll(productSelector)).map(el => {
            return {
                name: el.querySelector(nameSelector)?.textContent?.trim() || "N/A",
                rating: el.querySelector(ratingSelector)?.textContent?.trim() || "N/A",
                reviews: el.querySelector(reviewsSelector)?.textContent?.trim() || "N/A",
                boughtInPastMonth: el.querySelector(boughtInPastMonthSelector)?.textContent?.trim() || "N/A",
                price: el.querySelector(priceSelector)?.textContent?.trim() || "Out of Stock",
                originalPrice: el.querySelector(originalPriceSelector)?.textContent?.trim() || "N/A",
                discount: el.querySelector(discountSelector)?.textContent?.trim() || "",
                availability: el.querySelector(availabilitySelector)?.textContent?.trim() || "In Stock",
                image: el.querySelector(imageSelector)?.getAttribute("src") || "",
                link: el.querySelector("a")?.getAttribute("href") ? `https://www.amazon.in${el.querySelector("a")?.getAttribute("href")}` : ""
            };
        }).slice(1);
    });
    await browser.close();
    return amazonData;
}

// Flipkart Scraper
// @ts-ignore
async function scrapeFlipkart(searchParams: string) {
    const searchUrl = `https://www.flipkart.com/search?q=${encodeURIComponent(searchParams)}`;
    const BROWSER_WS = String(process.env.BRIGHT_DATA_BROWSER_WS_02);
    console.log("Connecting to Bright Data Browser...");
    const browser = await puppeteer.connect({ browserWSEndpoint: BROWSER_WS });
    console.log("Connected to Bright Data Browser...");
    const page = await browser.newPage();
    page.setDefaultNavigationTimeout(2 * 60 * 1000);
    await page.goto(searchUrl, { waitUntil: "domcontentloaded" });

    await page.waitForSelector("._75nlfW", { timeout: 30000 });
    console.log("Products Loaded From Flipkart");

    const flipkartData = await page.evaluate(() => {
        const productSelector = "._75nlfW";
        const nameSelector = ".KzDlHZ";
        const priceSelector = ".Nx9bqj._4b5DiR";
        const orignalPriceSelector = ".yRaY8j.ZYYwLA";
        const detailsSelector = ".J+igdf";
        const imageSelector = ".DByuf4";


        return Array.from(document.querySelectorAll(productSelector)).map(el => {
            const nameText = el.querySelector(nameSelector)?.textContent?.trim().concat("|") || "";
            const detailsText = el.querySelector(detailsSelector)?.textContent?.trim() || "";
            return {
                name: nameText + detailsText || "N/A",
                price: el.querySelector(priceSelector)?.textContent?.trim() || "N/A",
                orignalPrice: el.querySelector(orignalPriceSelector)?.textContent?.trim() || "N/A",
                image: el.querySelector(imageSelector)?.getAttribute("src") || "",
                link: el.querySelector("a")?.getAttribute("href") ? `https://www.flipkart.com${el.querySelector("a")?.getAttribute("href")}` : ""
            };
        }).slice(1)
    })
    await browser.close();
    return flipkartData;
}
