import mongoose from 'mongoose';
import User from '../src/models/User';
import dbConnect from '../src/lib/mongodb';

const adminEmails = [
  'nishitavghela209@gmail.com',
  'manpreet@dronecleaningcompany.io',
  'info@dronecleaningcompany.io'
];

async function setAdminUsers() {
  try {
    await dbConnect();
    console.log('Connected to MongoDB');

    // Update each user to be an admin
    for (const email of adminEmails) {
      // Check if user exists
      const user = await User.findOne({ email });

      if (user) {
        // Update existing user to be an admin
        user.isAdmin = true;
        await user.save();
        console.log(`Updated user ${email} to be an admin`);
      } else {
        // Create new admin user with a temporary password
        // In a real-world scenario, you might want to generate a random password
        // and send it to the user via email
        const newUser = new User({
          email,
          name: email.split('@')[0], // Use part of email as name
          password: 'temporaryPassword123', // This should be changed by the user
          isAdmin: true,
          hasSignedNDA: true, // Admins automatically have access
          ndaSignedDate: new Date()
        });
        await newUser.save();
        console.log(`Created new admin user: ${email}`);
      }
    }

    console.log('Admin users setup complete');
  } catch (error) {
    console.error('Error setting admin users:', error);
  } finally {
    // Close the MongoDB connection
    await mongoose.connection.close();
    console.log('MongoDB connection closed');
  }
}

// Run the function
setAdminUsers();
