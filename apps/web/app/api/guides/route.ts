import { NextResponse } from "next/server";
import prisma from "@repo/db"

export async function GET() {
  try {
    const guides = await prisma.guide.findMany({
      orderBy: { date: "desc" },
      take: 3,
    });
    return NextResponse.json(guides);
  } catch (error) {
    console.error("Error fetching guides:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
