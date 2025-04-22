import { NextResponse } from "next/server";
import prisma from "@repo/db"

export async function GET() {
  const categories = await prisma.product.findMany({
    select: { category: true },
    distinct: ["category"]
  });
  console.log(categories);
  return NextResponse.json(categories.map(c => c.category));
}