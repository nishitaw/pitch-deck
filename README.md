# Drone Cleaning Company NDA Website

A secure web application for managing NDAs and document sharing for Drone Cleaning Company.

## Features

- User authentication system
- Email-first login flow
- NDA signing process for new users
- Document management for admin users
- Secure document sharing

## Tech Stack

- Next.js 15.3
- React 19
- MongoDB
- TailwindCSS
- NextAuth.js for authentication

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn
- MongoDB account

### Installation

1. Clone the repository
   ```
   git clone https://github.com/nishitaw/pitch-deck.git
   cd pitch-deck/nda-website/nda-app
   ```

2. Install dependencies
   ```
   npm install
   ```

3. Create a `.env.local` file in the root directory with the following variables:
   ```
   MONGODB_URI=your_mongodb_connection_string
   NEXTAUTH_URL=http://localhost:3000
   NEXTAUTH_SECRET=your_secret_key_for_jwt_encryption
   ```

4. Seed the database (optional)
   ```
   npm run seed
   ```

5. Start the development server
   ```
   npm run dev
   ```

6. Open [http://localhost:3000](http://localhost:3000) in your browser

## Deployment

This project is configured for easy deployment on Render.

### Deploying to Render

1. Fork this repository to your GitHub account
2. Create a new Web Service on Render
3. Connect your GitHub repository
4. Use the following settings:
   - Build Command: `cd nda-website/nda-app && npm install && npm run build`
   - Start Command: `cd nda-website/nda-app && npm run start`
   - Environment Variables: Add the same variables as in your `.env.local` file

## Project Structure

```
nda-website/nda-app/
├── public/           # Static files
├── src/              # Source code
│   ├── app/          # Next.js app directory
│   ├── components/   # React components
│   ├── lib/          # Utility functions
│   └── models/       # MongoDB models
├── scripts/          # Database scripts
└── ...configuration files
```

## License

This project is proprietary and confidential.

## Contact

For any inquiries, please contact [info@dronecleaningcompany.io](mailto:info@dronecleaningcompany.io).
