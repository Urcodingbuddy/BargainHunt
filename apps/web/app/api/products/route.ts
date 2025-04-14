import { NextResponse } from "next/server";
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const search = searchParams.get("q") || "";
  const category = searchParams.get("category") || undefined;
  const brand = searchParams.get("brand") || undefined;

  const products = await prisma.product.findMany({
    where: {
      title: { contains: search, mode: "insensitive" },
      category,
      brand,
    },
    orderBy: { LastUpdated: "desc" }
  });

  return NextResponse.json(products);
}