import puppeteer from 'puppeteer-core';

import chromium from '@sparticuz/chromium';
chromium.setGraphicsMode = false;

export async function scrapeProduct(searchParams: string) {
    if (!searchParams) return;
    console.log("Scraping Amazon and Flipkart for:", searchParams);
    try {
        const [amazonData, flipkartData] = await Promise.all([
            scrapeAmazon(searchParams),
            scrapeFlipkart(searchParams)
        ]);
        console.log(amazonData, flipkartData)
        console.log("Scraping End");
        return {
            amazon: amazonData || [],
            flipkart: flipkartData || [],
            timestamp: new Date().toISOString()
        };
    } catch (error) {
        console.error("Error in scrapeProduct:", error);
        return {
            amazon: [],
            flipkart: [],
            timestamp: new Date().toISOString()
        };
    }
}

async function launchBrowser() {
    return await puppeteer.launch({
        args: [...chromium.args,
            "--no-sandbox",
            "--disable-setuid-sandbox",
            "--disable-dev-shm-usage",
            "--disable-accelerated-2d-canvas",
            "--no-first-run",
            "--no-zygote",
            "--disable-gpu"],
        executablePath: process.env.CHROME_EXECUTABLE_PATH || await chromium.executablePath(),
        headless: chromium.headless,
        defaultViewport: chromium.defaultViewport
    });
}


async function scrapeAmazon(searchParams: string) {
    let browser;
    try {
        browser = await launchBrowser();
        const page = await browser.newPage();
        page.setDefaultNavigationTimeout(6000);
        await page.setRequestInterception(true);
        page.on("request", (req) => {
            if (["image", "font", "media", "other"].includes(req.resourceType())) {
                req.abort();
            } else {
                req.continue();
            }
        });
        const BASE_URL = "https://www.amazon.in/s?k=";
        await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36');
        const amazonUrl = `${BASE_URL}${encodeURIComponent(searchParams.trim().replace(/\s+/g, ' '))}`;
        console.log("Navigating to Amazon...");
        // page.screenshot({ "path": "./lib/screenshots/amazon.jpeg" });
        await page.goto(amazonUrl, { waitUntil: "domcontentloaded" });
        // page.screenshot({ "path": "./lib/screenshots/amazon.jpeg" });

const captchaDetected = await page.evaluate(() => {
            return document.body.textContent?.includes("captcha") || 
                   document.body.textContent?.includes("robot") ||
                   document.title.includes("Robot");
        });
        
        if (captchaDetected) {
            console.log("Amazon bot detection triggered - attempting bypass");
            await page.reload({ waitUntil: "networkidle2" });
        }

        try {
            await page.waitForSelector(".s-card-container", { timeout: 30000 });
            // page.screenshot({ "path": "./lib/screenshots/amazon.jpeg" });
        } catch (error) {
            console.log("Timeout or selector not found on Amazon, returning empty results");
            return [];
        }

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

            return Array.from(document.querySelectorAll(productSelector))
                .map(el => {
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
                })
                .filter(item => item.name !== "N/A" && item.name.length > 0)
                .slice(0, 10);
        });
        await page.close();
        return amazonData;
    } catch (error) {
        console.error('An error occurred with Amazon scraping:', error);
        return [];
    } finally {
        if (browser) await browser.close();
    }
}

async function scrapeFlipkart(searchParams: string) {
    let browser;
    try {
        browser = await launchBrowser();
        const page = await browser.newPage();
        await page.setRequestInterception(true);
        page.on("request", (req) => {
            if (["font", "other"].includes(req.resourceType())) {
                req.abort();
            } else {
                req.continue();
            }
        });
        const BASE_URL = "https://www.flipkart.com/search?q=";
        await page.setUserAgent("Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36");
        const flipkartUrl = `${BASE_URL}${encodeURIComponent(searchParams.trim().replace(/\s+/g, ' '))}`;
        console.log("Navigating to Flipkart...");
        await page.goto(flipkartUrl, { waitUntil: "domcontentloaded" });
        // page.screenshot({ "path": "./lib/screenshots/flipkart.jpeg" })

        const isRushPage = await page.evaluate(() => {
            return !!document.querySelector("#retry_btn"); // Retry button exists on "rush page"
        });

        if (isRushPage) {
            console.log("Rush page detected! Waiting for 3 seconds...");
            await new Promise(resolve => setTimeout(resolve, 3000)); // Wait manually
            // page.screenshot({ "path": "./lib/screenshots/flipkart.jpeg" })
            console.log("Clicking 'Try Now' button...");
            await page.locator('button').click();
            page.screenshot({ "path": "./lib/screenshots/flipkart.jpeg" })

            // page.screenshot({ "path": "./lib/screenshots/flipkart.jpeg" })

            await page.waitForNavigation({ waitUntil: "networkidle0", timeout: 30000 });
            console.log("Navigated to the actual product page.");
        }

        try {
            await page.waitForSelector("._75nlfW", { timeout: 5000 });
            // page.screenshot({ "path": "./lib/screenshots/flipkart.jpeg" })
        } catch (error) {
            console.log("Timeout or selector not found on Flipkart, returning empty results");
            return [];
        }

        const flipkartData = await page.evaluate(() => {
            const productSelector = "._75nlfW";
            const nameSelector = ".KzDlHZ";
            const detailsContainerSelector = "div._6NESgJ";
            const detailsListSelector = "ul.G4BRas";
            const detailItemSelector = "li.J\\+igdf"; // Escaping the + character properly
            const priceSelector = ".Nx9bqj._4b5DiR";
            const originalPriceSelector = ".yRaY8j.ZYYwLA";
            const imageSelector = ".DByuf4";
        
            return Array.from(document.querySelectorAll(productSelector)).map(el => {
                const name = el.querySelector(nameSelector)?.textContent?.trim() || "N/A";
                
                // Extract details from the list items
                const detailsContainer = el.querySelector(detailsContainerSelector);
                let details = "";
                
                if (detailsContainer) {
                    const detailsList = detailsContainer.querySelector(detailsListSelector);
                    if (detailsList) {
                        // Only get the first list item
                        const firstItem = detailsList.querySelector(detailItemSelector);
                        if (firstItem) {
                            const text = firstItem.textContent?.trim() || "";
                            details = text.replace(/\|/g, ',');
                        }
                    }
                }
                
                const price = el.querySelector(priceSelector)?.textContent?.trim() || "N/A";
                const originalPrice = el.querySelector(originalPriceSelector)?.textContent?.trim() || "N/A";
                const image = el.querySelector(imageSelector)?.getAttribute("src") || "";
                const link = el.querySelector("a")?.getAttribute("href")
                    ? `https://www.flipkart.com${el.querySelector("a")?.getAttribute("href")}`
                    : "";
        
                return {
                    name:`${name} ${details}`,
                    price,
                    originalPrice,
                    image,
                    link
                };
            }).filter(item => item.name !== "N/A" && item.name.length > 0).slice(0, 10);
        });
        
        

        await page.close();
        return flipkartData;
    } catch (error) {
        console.error('An error occurred with Flipkart scraping:', error);
        return [];
    } finally {
        if (browser) await browser.close();
    }
}
// Remove this line as we're now exporting the function instead of directly calling it
// scrapeProduct("Realme Gt 6T")