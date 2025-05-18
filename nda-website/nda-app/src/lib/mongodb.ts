import mongoose from 'mongoose';

// Default to the connection string we know works
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb+srv://dccdev123:ljIAiR09FxaZJrvv@cluster0.je4ebjs.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';

// Log connection attempt for debugging
console.log('Attempting to connect to MongoDB...');

if (!MONGODB_URI) {
  throw new Error(
    'Please define the MONGODB_URI environment variable inside .env.local'
  );
}

/**
 * Global is used here to maintain a cached connection across hot reloads
 * in development. This prevents connections growing exponentially
 * during API Route usage.
 */
// Define the type for our cached mongoose connection
interface MongooseCache {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
}

// Add mongoose property to NodeJS.Global interface
declare global {
  // eslint-disable-next-line no-var
  var mongoose: MongooseCache | undefined;
}

// Initialize cached with a default value if it doesn't exist
const cached: MongooseCache = global.mongoose || { conn: null, promise: null };

// Set the global mongoose cache
if (!global.mongoose) {
  global.mongoose = cached;
}

async function dbConnect() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
    };

    cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongoose) => {
      console.log('MongoDB connected successfully');
      return mongoose;
    }).catch(err => {
      console.error('MongoDB connection error:', err);
      throw err;
    });
  }
  cached.conn = await cached.promise;
  return cached.conn;
}

export default dbConnect;
