import puppeteer from 'puppeteer';

export async function scrapeProduct(searchParams: string) {
    if (!searchParams) return;
    console.log("Scraping Amazon and Flipkart for:", searchParams);
    const [amazonData, flipkartData] = await Promise.all([
        scrapeAmazon(searchParams),
        scrapeFlipkart(searchParams)
    ]);
    return { amazon: amazonData, flipkart: flipkartData };
}

async function scrapeAmazon(searchParams: string) {

    let browser: any;
    try {
        browser = await puppeteer.launch(
            {
                headless: true,
                args: ["--no-sandbox", "--disable-setuid-sandbox"]
            });
        const page = await browser.newPage();
        const BASE_URL = "https://www.amazon.in/s?k=";
        await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36');
        const amazonUrl = `${BASE_URL}${encodeURIComponent(searchParams.trim().replace(/\s+/g, '+'))}`;
        console.log("Navigating to Amazon...");
        await page.goto(amazonUrl, { waitUntil: "domcontentloaded" });
        await page.waitForSelector(".s-card-container", { timeout: 30000 });

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
        return amazonData;
    } catch (error) {
        console.error('An error occurred:', error);
    } finally {
        if (browser) {
            await browser.close();
        }
    }

}

async function scrapeFlipkart(searchParams: string) {

    let browser: any;
    try {
        browser = await puppeteer.launch({
            headless: true,
            args: ["--no-sandbox", "--disable-setuid-sandbox"],
        });
        const page = await browser.newPage();
        page.setDefaultNavigationTimeout(2 * 60 * 1000);
        const BASE_URL = "https://www.flipkart.com/search?q=";
        await page.setUserAgent("Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36");
        const flipkartUrl = `${BASE_URL}${encodeURIComponent(searchParams.trim().replace(/\s+/g, '+'))}`;
        console.log("Navigating to Flipkart...");
        await page.goto(flipkartUrl, { waitUntil: "domcontentloaded" });
        await page.waitForSelector("._75nlfW", { timeout: 30000 });

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
        return flipkartData;
    } catch (error) {
        console.error('An error occurred:', error);
    } finally {
        if (browser) {
            await browser.close();
        }
    }
}
