import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import User from '@/models/User';
import mongoose from 'mongoose';

export async function GET(req: NextRequest) {
  try {
    console.log('check-user API: Connecting to MongoDB...');

    // Try to connect to MongoDB
    await dbConnect();

    // Log connection state for debugging
    const connectionState = mongoose.connection.readyState;
    const stateMap = {
      0: 'disconnected',
      1: 'connected',
      2: 'connecting',
      3: 'disconnecting',
      99: 'uninitialized'
    };
    const connectionStatus = stateMap[connectionState as keyof typeof stateMap] || 'unknown';
    console.log(`check-user API: MongoDB connection state: ${connectionStatus} (${connectionState})`);

    const email = req.nextUrl.searchParams.get('email');
    console.log(`check-user API: Checking email: ${email}`);

    if (!email) {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      );
    }

    // Check if user exists
    console.log(`check-user API: Finding user with email: ${email}`);
    const user = await User.findOne({ email });

    if (!user) {
      console.log(`check-user API: User not found for email: ${email}`);
      return NextResponse.json({ exists: false });
    }

    console.log(`check-user API: User found for email: ${email}, hasSignedNDA: ${user.hasSignedNDA}`);
    return NextResponse.json({
      exists: true,
      hasSignedNDA: user.hasSignedNDA
    });
  } catch (error) {
    console.error('Error checking user:', error);

    // Return more detailed error information
    return NextResponse.json(
      {
        error: 'Failed to check user',
        message: error instanceof Error ? error.message : 'Unknown error',
        mongoState: mongoose.connection.readyState
      },
      { status: 500 }
    );
  }
}
