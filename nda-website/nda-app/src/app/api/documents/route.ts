import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Document from '@/models/Document';
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

    if (!user || !user.hasSignedNDA) {
      return NextResponse.json(
        { error: 'User has not signed the NDA' },
        { status: 403 }
      );
    }

    // Get all documents
    const documents = await Document.find({}).sort({ createdAt: -1 });

    return NextResponse.json({ documents });
  } catch (error) {
    console.error('Error fetching documents:', error);
    return NextResponse.json(
      { error: 'Failed to fetch documents' },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    await dbConnect();

    const body = await req.json();
    const { title, description, url, email } = body;

    if (!title || !url || !email) {
      return NextResponse.json(
        { error: 'Title, URL, and email are required' },
        { status: 400 }
      );
    }

    // For direct admin access, we'll bypass the admin check
    // This is just for demonstration purposes
    const isDirectAccess = req.headers.get('referer')?.includes('/direct-admin');

    // Hardcoded admin emails for testing
    const adminEmails = [
      'nishitavaghela209@gmail.com',
      'manpreet@dronecleaningcompany.io',
      'info@dronecleaningcompany.io'
    ];

    // Check if the email is in the admin list
    const isAdminUser = adminEmails.includes(email);

    if (!isDirectAccess && !isAdminUser) {
      return NextResponse.json(
        { error: 'Unauthorized. Only admin users can upload documents' },
        { status: 403 }
      );
    }

    // Create new document
    const document = await Document.create({
      title,
      description,
      url
    });

    return NextResponse.json({ success: true, document });
  } catch (error) {
    console.error('Error creating document:', error);
    return NextResponse.json(
      { error: 'Failed to create document' },
      { status: 500 }
    );
  }
}
