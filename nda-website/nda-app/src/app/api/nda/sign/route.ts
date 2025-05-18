import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import User from '@/models/User';
import NDA from '@/models/NDA';

export async function POST(req: NextRequest) {
  try {
    await dbConnect();

    const body = await req.json();
    const { name, email, company, password, ndaContent } = body;

    if (!name || !email || !password || !ndaContent) {
      return NextResponse.json(
        { error: 'Name, email, password, and NDA content are required' },
        { status: 400 }
      );
    }

    // Check if user already exists
    let user = await User.findOne({ email });

    if (!user) {
      // Create new user
      user = await User.create({
        name,
        email,
        company,
        password,
        hasSignedNDA: true,
        ndaSignedDate: new Date()
      });
    } else {
      // Update existing user
      user.hasSignedNDA = true;
      user.ndaSignedDate = new Date();
      if (company) user.company = company;
      await user.save();
    }

    // Create NDA record
    const nda = await NDA.create({
      userId: user._id,
      content: ndaContent,
      ipAddress: req.headers.get('x-forwarded-for') || 'unknown'
    });

    return NextResponse.json({ success: true, user: { id: user._id, name, email } });
  } catch (error) {
    console.error('Error signing NDA:', error);
    return NextResponse.json(
      { error: 'Failed to sign NDA' },
      { status: 500 }
    );
  }
}
