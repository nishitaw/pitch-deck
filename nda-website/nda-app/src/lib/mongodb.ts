import mongoose from 'mongoose';

// Default to the connection string we know works
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb+srv://dccdev123:ljIAiR09FxaZJrvv@cluster0.je4ebjs.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';

// Log connection string (without password) for debugging
const sanitizedUri = MONGODB_URI.replace(
  /mongodb(\+srv)?:\/\/[^:]+:[^@]+@/,
  'mongodb$1://username:password@'
);
console.log('MongoDB connection string (sanitized):', sanitizedUri);
console.log('Environment:', process.env.NODE_ENV);

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

// Maximum number of connection attempts
const MAX_RETRIES = 3;
let retryCount = 0;

async function dbConnect() {
  if (cached.conn) {
    console.log('Using existing MongoDB connection');
    return cached.conn;
  }

  if (!cached.promise) {
    console.log(`MongoDB connection attempt ${retryCount + 1}/${MAX_RETRIES}`);

    const opts = {
      bufferCommands: false,
      // Add these options for better reliability on Render
      connectTimeoutMS: 30000, // 30 seconds
      socketTimeoutMS: 45000, // 45 seconds
      serverSelectionTimeoutMS: 60000, // 60 seconds
      maxPoolSize: 10, // Maintain up to 10 socket connections
      minPoolSize: 5, // Maintain at least 5 socket connections
      maxIdleTimeMS: 30000, // Close sockets after 30 seconds of inactivity
      retryWrites: true,
      retryReads: true,
    };

    const connectWithRetry = async (): Promise<typeof mongoose> => {
      try {
        console.log('Attempting to connect to MongoDB...');
        const mongooseInstance = await mongoose.connect(MONGODB_URI, opts);
        console.log('MongoDB connected successfully');
        retryCount = 0; // Reset retry count on successful connection
        return mongoose; // Return mongoose, not the instance
      } catch (err) {
        console.error('MongoDB connection error:', err);

        if (retryCount < MAX_RETRIES) {
          retryCount++;
          const retryDelay = 5000 * retryCount; // Exponential backoff
          console.log(`Retrying connection in ${retryDelay}ms... (Attempt ${retryCount}/${MAX_RETRIES})`);

          return new Promise<typeof mongoose>((resolve) => {
            setTimeout(() => {
              connectWithRetry().then(resolve).catch((error) => {
                console.error('Error in retry:', error);
                throw error;
              });
            }, retryDelay);
          });
        }

        console.error('Max retries reached. Could not connect to MongoDB.');
        throw err;
      }
    };

    cached.promise = connectWithRetry();
  } else {
    console.log('Using existing connection promise');
  }

  try {
    cached.conn = await cached.promise;
    return cached.conn;
  } catch (err) {
    console.error('Error awaiting MongoDB connection:', err);
    cached.promise = null; // Reset the promise so we can try again
    throw err;
  }
}

export default dbConnect;
