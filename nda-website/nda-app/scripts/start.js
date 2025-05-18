// This script starts the Next.js application and seeds the MongoDB Atlas database
const { spawn } = require('child_process');
const path = require('path');
require('dotenv').config({ path: '.env.local' });

// Check if we're using MongoDB Atlas
const isMongoAtlas = () => {
  const mongoUri = process.env.MONGODB_URI || '';
  return mongoUri.includes('mongodb+srv://');
};

// Seed the database
const seedDatabase = () => {
  console.log('Seeding MongoDB Atlas database...');

  const seed = spawn('node', [path.join(__dirname, 'seed-db.js')]);

  seed.stdout.on('data', (data) => {
    console.log(`Seed: ${data}`);
  });

  seed.stderr.on('data', (data) => {
    console.error(`Seed error: ${data}`);
  });

  seed.on('close', (code) => {
    console.log(`Seed process exited with code ${code}`);
    startNextJS();
  });
};

// Start Next.js
const startNextJS = () => {
  console.log('Starting Next.js...');

  const next = spawn('npm', ['run', 'dev'], { stdio: 'inherit' });

  next.on('close', (code) => {
    console.log(`Next.js process exited with code ${code}`);
    process.exit(code);
  });
};

// Start the application
console.log('Using MongoDB Atlas connection');
seedDatabase();
