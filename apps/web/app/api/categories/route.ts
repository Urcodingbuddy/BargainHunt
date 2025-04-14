import { NextResponse } from "next/server";
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export async function GET() {
  const categories = await prisma.product.findMany({
    select: { category: true },
    distinct: ["category"]
  });
  console.log(categories);
  return NextResponse.json(categories.map(c => c.category));
}