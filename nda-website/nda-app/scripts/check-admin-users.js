// Script to check if admin users are properly set up
const { MongoClient } = require('mongodb');

const uri = "mongodb+srv://dccdev123:ljIAiR09FxaZJrvv@cluster0.je4ebjs.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
const client = new MongoClient(uri);

const adminEmails = [
  'nishitavghela209@gmail.com',
  'manpreet@dronecleaningcompany.io',
  'info@dronecleaningcompany.io'
];

async function run() {
  try {
    await client.connect();
    console.log("Connected to MongoDB");
    
    const database = client.db('nda-website');
    const users = database.collection('users');
    
    // List all collections
    const collections = await database.listCollections().toArray();
    console.log("Collections in database:", collections.map(c => c.name));
    
    // Check if users collection exists
    if (!collections.some(c => c.name === 'users')) {
      console.log("Users collection does not exist!");
      return;
    }
    
    // Check each admin email
    for (const email of adminEmails) {
      const user = await users.findOne({ email });
      
      if (user) {
        console.log(`User ${email} exists with the following properties:`);
        console.log(`  - isAdmin: ${user.isAdmin}`);
        console.log(`  - hasSignedNDA: ${user.hasSignedNDA}`);
        console.log(`  - name: ${user.name}`);
      } else {
        console.log(`User ${email} does not exist in the database`);
      }
    }
    
    // List all users
    console.log("\nAll users in the database:");
    const allUsers = await users.find({}).toArray();
    allUsers.forEach(user => {
      console.log(`${user.email} (isAdmin: ${user.isAdmin}, hasSignedNDA: ${user.hasSignedNDA})`);
    });
    
  } finally {
    await client.close();
    console.log("MongoDB connection closed");
  }
}

run().catch(console.dir);
