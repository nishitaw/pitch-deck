// Simple script to set up admin users
const { MongoClient } = require('mongodb');

const uri = "mongodb+srv://dccdev123:ljIAiR09FxaZJrvv@cluster0.je4ebjs.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
const client = new MongoClient(uri);

const adminEmails = [
  'nishitavaghela209@gmail.com',
  'manpreet@dronecleaningcompany.io',
  'info@dronecleaningcompany.io'
];

async function run() {
  try {
    await client.connect();
    console.log("Connected to MongoDB");

    const database = client.db('nda-website');
    const users = database.collection('users');

    for (const email of adminEmails) {
      // Check if user exists
      const user = await users.findOne({ email });

      if (user) {
        // Update existing user to be an admin
        console.log(`Found existing user ${email}, current isAdmin value: ${user.isAdmin}`);
        await users.updateOne(
          { email },
          { $set: { isAdmin: true } }
        );
        console.log(`Updated user ${email} to be an admin`);

        // Verify the update
        const updatedUser = await users.findOne({ email });
        console.log(`Verified user ${email}, new isAdmin value: ${updatedUser.isAdmin}`);
      } else {
        // Create new admin user
        await users.insertOne({
          email,
          name: email.split('@')[0],
          password: '$2a$10$rIC1WGUlKGRKGRJgSAXV8.4/QwHA.3n0ysZMOqO.zK.S7dGdRUeZW', // hashed 'temporaryPassword123'
          isAdmin: true,
          hasSignedNDA: true,
          ndaSignedDate: new Date(),
          createdAt: new Date()
        });
        console.log(`Created new admin user: ${email}`);
      }
    }

    console.log("Admin users setup complete");
  } finally {
    await client.close();
    console.log("MongoDB connection closed");
  }
}

run().catch(console.dir);
