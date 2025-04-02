"use server";
import { scrapeProduct } from "@/lib/scraper";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get("query");

  if (!query) {
    return NextResponse.json(
      { error: "No search query provided" },
      { status: 400 }
    );
  }

  try {
    const scrapedData = await scrapeProduct(query);
    return NextResponse.json(scrapedData);
  } catch (error: any) {
    console.error("Scraping error:", error);
    return NextResponse.json(
      {
        error: `Failed to scrape product: ${error.message}`,
      },
      { status: 500 }
    );
  }
}
