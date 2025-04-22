import { NextRequest, NextResponse } from "next/server";
import prisma from "@repo/db"

export async function GET(req: NextRequest) {
  const category = req.nextUrl.searchParams.get("category");
  if (!category) return NextResponse.json([]);

  const brands = await prisma.product.findMany({
    where: { category },
    select: { brand: true },
    distinct: ["brand"]
  });
  console.log(brands);
  return NextResponse.json(brands.map(b => b.brand));
}