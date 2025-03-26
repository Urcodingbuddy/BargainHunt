// "use server";
// import { scrapeProduct } from "@/lib/scraper";

// export async function scrapeAndStoreProduct(searchParams: string) {
//     if (!searchParams) return null; // Return null instead of undefined
//     try {
//         const scrapedData = await scrapeProduct(searchParams);
//         if (!scrapedData) {
//             throw new Error("No data received from scrapeProduct");
//         }
//         // Remove else block to simplify flow
//         console.log("Data Scraped Successfully",scrapedData);
//         return scrapedData; // This will definitely return the data
//     } catch (error: any) {
//         console.error("Scraping error:", error); // Log the error
//         throw new Error(`Failed to find product: ${error.message}`);
//     }
// }

"use server";
import { scrapeProduct } from "@/lib/scraper";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get('query');

    if (!query) {
        return NextResponse.json({ error: "No search query provided" }, { status: 400 });
    }

    try {
        const scrapedData = await scrapeProduct(query);
        return NextResponse.json(scrapedData);
    } catch (error: any) {
        console.error("Scraping error:", error);
        return NextResponse.json({ 
            error: `Failed to scrape product: ${error.message}` 
        }, { status: 500 });
    }
}