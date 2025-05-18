# NDA Document Portal

A web application that requires users to sign an NDA before accessing confidential documents. User information and NDA signatures are stored in MongoDB.

## Features

- NDA signing form with user information collection
- Protected document access
- MongoDB integration for data storage
- Minimalistic design with brand colors
- Responsive layout for all devices

## Prerequisites

- Node.js (v14 or higher)
- MongoDB (local or Atlas)

## Getting Started

1. Install dependencies:
   ```bash
   npm install
   ```

2. Configure environment variables:
   - Create a `.env.local` file in the root directory
   - Add the following variables:
     ```
     MONGODB_URI=mongodb://localhost:27017/nda-website
     NEXTAUTH_URL=http://localhost:3000
     NEXTAUTH_SECRET=your-secret-key-for-jwt-encryption
     ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Seed the database with sample documents:
   ```bash
   node scripts/seed-db.js
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

## Project Structure

- `/src/app` - Next.js pages and API routes
- `/src/components` - React components
- `/src/models` - MongoDB models
- `/src/lib` - Utility functions and database connection
- `/public` - Static assets including logo
- `/scripts` - Database seeding scripts

## MongoDB Models

- **User** - Stores user information and NDA signing status
- **NDA** - Stores NDA content and signature details
- **Document** - Stores document information and links

## Deployment

This application can be deployed to Vercel, Netlify, or any other Next.js-compatible hosting service. Make sure to set up the environment variables in your hosting provider's dashboard.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.
