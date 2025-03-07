"use server";
import { scrapeProduct } from "../scraper";

export async function scrapeAndStoreProduct(searchParams: string) {
    if (!searchParams) return null; // Return null instead of undefined
    try {
        const scrapedData = await scrapeProduct(searchParams);
        if (!scrapedData) {
            throw new Error("No data received from scrapeProduct");
        }
        // Remove else block to simplify flow
        // console.log("Data Scraped Successfully",scrapedData);
        return scrapedData; // This will definitely return the data
    } catch (error: any) {
        console.error("Scraping error:", error); // Log the error
        throw new Error(`Failed to find product: ${error.message}`);
    }
}
