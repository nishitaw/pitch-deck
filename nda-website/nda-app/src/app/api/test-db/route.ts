import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import mongoose from 'mongoose';

export async function GET(req: NextRequest) {
  try {
    console.log('Testing MongoDB connection...');
    
    // Try to connect to MongoDB
    await dbConnect();
    
    // Check connection state
    const connectionState = mongoose.connection.readyState;
    const stateMap = {
      0: 'disconnected',
      1: 'connected',
      2: 'connecting',
      3: 'disconnecting',
      99: 'uninitialized'
    };
    
    const connectionStatus = stateMap[connectionState as keyof typeof stateMap] || 'unknown';
    
    console.log(`MongoDB connection state: ${connectionStatus} (${connectionState})`);
    
    // Return connection status
    return NextResponse.json({
      success: true,
      connectionState: connectionState,
      connectionStatus: connectionStatus,
      dbName: mongoose.connection.db?.databaseName || 'unknown',
      host: mongoose.connection.host || 'unknown',
      message: `MongoDB is ${connectionStatus}`
    });
  } catch (error) {
    console.error('Error testing MongoDB connection:', error);
    
    // Return error details
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
      stack: error instanceof Error ? error.stack : undefined
    }, { status: 500 });
  }
}
