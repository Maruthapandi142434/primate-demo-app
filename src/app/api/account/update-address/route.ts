// src/app/api/account/update-address/route.ts
import { NextResponse } from 'next/server';
import prisma from '@/lib/db';
import { getCurrentUser } from '@/lib/auth';

export async function POST(request: Request) {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { phoneNumber, address, city, state, country, postalCode } = await request.json();

    const updatedUser = await prisma.user.update({
      where: { id: user.id },
      data: {
        phoneNumber,
        address,
        city,
        state,
        country,
        postalCode,
      },
    });

    return NextResponse.json(updatedUser);
  } catch (error) {
    console.error('Error updating address:', error);
    return NextResponse.json(
      { error: 'Failed to update address' },
      { status: 500 }
    );
  }
}