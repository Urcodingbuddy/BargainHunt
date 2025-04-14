import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

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