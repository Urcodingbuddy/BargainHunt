import { NextResponse } from "next/server";
import prisma from "@repo/db";

export async function GET() {
  try {
    const articles = await prisma.article.findMany({
      orderBy: { date: "desc" },
      take: 3,
    });
    return NextResponse.json(articles);
  } catch (error) {
    console.error("Error fetching articles:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}