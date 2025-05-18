// This script seeds the database with sample documents
const { MongoClient } = require('mongodb');
require('dotenv').config({ path: '.env.local' });

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/nda-website';

async function seedDatabase() {
  const client = new MongoClient(MONGODB_URI);
  
  try {
    await client.connect();
    console.log('Connected to MongoDB');
    
    const db = client.db();
    const documentsCollection = db.collection('documents');
    
    // Check if documents already exist
    const count = await documentsCollection.countDocuments();
    
    if (count > 0) {
      console.log(`Database already has ${count} documents. Skipping seed.`);
      return;
    }
    
    // Sample documents
    const sampleDocuments = [
      {
        title: 'Confidential Business Plan',
        description: 'Strategic business plan for 2025-2026',
        url: 'https://example.com/business-plan.pdf',
        createdAt: new Date()
      },
      {
        title: 'Product Roadmap',
        description: 'Upcoming product features and release timeline',
        url: 'https://example.com/roadmap.pdf',
        createdAt: new Date()
      },
      {
        title: 'Financial Projections',
        description: 'Revenue and expense forecasts for next fiscal year',
        url: 'https://example.com/financials.xlsx',
        createdAt: new Date()
      },
      {
        title: 'Partnership Agreement',
        description: 'Legal agreement for strategic partnership',
        url: 'https://example.com/partnership.pdf',
        createdAt: new Date()
      },
      {
        title: 'Market Research Report',
        description: 'Comprehensive analysis of target market',
        url: 'https://example.com/research.pdf',
        createdAt: new Date()
      }
    ];
    
    // Insert documents
    const result = await documentsCollection.insertMany(sampleDocuments);
    console.log(`${result.insertedCount} documents inserted successfully`);
    
  } catch (error) {
    console.error('Error seeding database:', error);
  } finally {
    await client.close();
    console.log('Database connection closed');
  }
}

// Run the seed function
seedDatabase()
  .then(() => console.log('Seed completed'))
  .catch(err => console.error('Seed failed:', err));
