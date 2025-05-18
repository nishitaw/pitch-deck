import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import User from '@/models/User';

export async function GET(req: NextRequest) {
  try {
    await dbConnect();

    const email = req.nextUrl.searchParams.get('email');

    if (!email) {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      );
    }

    // Check if user exists and is an admin
    const user = await User.findOne({ email });

    if (!user) {
      console.log(`User not found: ${email}`);
      return NextResponse.json({ isAdmin: false });
    }

    // Force isAdmin to true for specific emails (for testing)
    const adminEmails = [
      'nishitavaghela209@gmail.com',
      'manpreet@dronecleaningcompany.io',
      'info@dronecleaningcompany.io'
    ];

    const isAdmin = adminEmails.includes(email) ? true : !!user.isAdmin;

    console.log(`User found: ${email}, isAdmin: ${isAdmin}`);

    return NextResponse.json({
      isAdmin: isAdmin,
      user: {
        name: user.name,
        email: user.email
      }
    });
  } catch (error) {
    console.error('Error checking admin status:', error);
    return NextResponse.json(
      { error: 'Failed to check admin status' },
      { status: 500 }
    );
  }
}
