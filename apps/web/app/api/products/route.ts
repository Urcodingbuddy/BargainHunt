import { NextResponse } from "next/server";
import prisma from "@repo/db"

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