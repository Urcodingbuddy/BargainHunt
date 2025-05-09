import { NextResponse } from "next/server";
import prisma from "@repo/db"

export async function GET() {
  try {
    const products = await prisma.product.findMany({
      select: { uniqueId: true },
    });

    return NextResponse.json(products);
  } catch (error) {
    console.error("Error fetching saved products:", error);
    return NextResponse.json({ error: "Failed to fetch saved products" }, { status: 500 });
  }
}
