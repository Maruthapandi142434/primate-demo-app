// src/app/api/auth/register/route.ts
import { NextResponse } from 'next/server';
import prisma from '@/lib/db';
import bcrypt from 'bcryptjs';
import { generateToken } from '@/lib/auth';

export async function POST(request: Request) {
  try {
    const { 
      firstName,
      lastName,
      email,
      password,
      phoneNumber,
      address,
      city,
      state,
      country,
      postalCode
    } = await request.json();

    // Validate required fields
    if (!email || !password || !firstName) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      );
    }

    // Validate password strength
    if (password.length < 6) {
      return NextResponse.json(
        { error: 'Password must be at least 6 characters' },
        { status: 400 }
      );
    }

    // Check if user exists
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return NextResponse.json(
        { error: 'User already exists' },
        { status: 400 }
      );
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const user = await prisma.user.create({
      data: {
        username: email.split('@')[0], // Generate username from email
        email,
        password_hash: hashedPassword,
        firstName: firstName || '',
        lastName: lastName || '',
        phoneNumber: phoneNumber || null,
        address: address || null,
        city: city || null,
        state: state || null,
        country: country || null,
        postalCode: postalCode || null,
        isActive: true
      },
    });

    // Generate token
    const token = generateToken(user.id);

    // Set cookie
    const response = NextResponse.json({
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        phoneNumber: user.phoneNumber,
        address: user.address,
        city: user.city,
        state: user.state,
        country: user.country,
        postalCode: user.postalCode
      },
    });

    response.cookies.set('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60 * 24, // 1 day
      path: '/',
    });

    return response;
  } catch (error) {
    console.error('Registration error:', error);
    return NextResponse.json(
      { error: 'Registration failed. Please try again.' },
      { status: 500 }
    );
  }
}