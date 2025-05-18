// Script to list all users in the database
const { MongoClient } = require('mongodb');

const uri = "mongodb+srv://dccdev123:ljIAiR09FxaZJrvv@cluster0.je4ebjs.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
const client = new MongoClient(uri);

async function run() {
  try {
    await client.connect();
    console.log("Connected to MongoDB");
    
    const database = client.db('nda-website');
    const users = database.collection('users');
    
    // List all users
    console.log("All users in the database:");
    const allUsers = await users.find({}).toArray();
    
    if (allUsers.length === 0) {
      console.log("No users found in the database");
    } else {
      allUsers.forEach(user => {
        console.log(`Email: ${user.email}`);
        console.log(`  - isAdmin: ${user.isAdmin}`);
        console.log(`  - hasSignedNDA: ${user.hasSignedNDA}`);
        console.log(`  - name: ${user.name}`);
        console.log('---');
      });
    }
    
  } finally {
    await client.close();
    console.log("MongoDB connection closed");
  }
}

run().catch(console.dir);
