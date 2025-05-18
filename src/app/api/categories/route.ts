// src/app/api/categories/route.ts
import { NextResponse } from 'next/server';
import prisma from '@/lib/db';

export async function GET() {
  try {
    const categories = await prisma.category.findMany({
      where: { isActive: true },
      orderBy: { name: 'asc' }
    });
    return NextResponse.json(categories);
  } 
  catch (error) {
    console.error('Categories error:', error); // Added error logging
    return NextResponse.json(
      { error: 'Failed to fetch categories' },
      { status: 500 }
    );
  }
}