import { NextRequest, NextResponse } from 'next/server';
import prisma from "@repo/db"

export async function POST(req: NextRequest) {
    try {
      const { products } = await req.json();
  
      if (!Array.isArray(products)) {
        return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
      }
  
      await prisma.product.createMany({
        data: products,
        skipDuplicates: true, // Skip duplicates if any
      });
  
      return NextResponse.json({ success: true });
    } catch (error) {
      console.error("Failed to save products", error);
      return NextResponse.json({ error: "Internal error" }, { status: 500 });
    }
  }