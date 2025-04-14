import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export async function POST(request: Request) {
    try {
        const data = await request.json();

    const savedProduct = await prisma.product.create({
        data,
    })
    return NextResponse.json(savedProduct, { status: 201 });
    } catch (error) {
        console.error('Error saving product:', error);
        return NextResponse.json({ error: 'Failed to save product' }, { status: 500 });
    }
}