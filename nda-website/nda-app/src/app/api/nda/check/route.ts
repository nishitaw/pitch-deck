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
    
    // Check if user has signed NDA
    const user = await User.findOne({ email });
    
    if (!user) {
      return NextResponse.json({ hasSignedNDA: false });
    }
    
    return NextResponse.json({ 
      hasSignedNDA: user.hasSignedNDA,
      user: {
        name: user.name,
        email: user.email,
        company: user.company,
        ndaSignedDate: user.ndaSignedDate
      }
    });
  } catch (error) {
    console.error('Error checking NDA status:', error);
    return NextResponse.json(
      { error: 'Failed to check NDA status' },
      { status: 500 }
    );
  }
}
