// This script is used by Render to start the application
const { spawn } = require('child_process');
const path = require('path');
const fs = require('fs');

// Print environment information for debugging
console.log('Node version:', process.version);
console.log('Current directory:', process.cwd());
console.log('Files in current directory:', fs.readdirSync('.').join(', '));

// Get the port from environment variables or use 3000 as default
const PORT = process.env.PORT || 3000;

// Set the port in the environment
process.env.PORT = PORT;

// Log important environment variables (without sensitive values)
console.log('Environment variables:');
console.log('- NODE_ENV:', process.env.NODE_ENV);
console.log('- PORT:', PORT);
console.log('- NEXTAUTH_URL:', process.env.NEXTAUTH_URL || 'Not set');
console.log('- MONGODB_URI:', process.env.MONGODB_URI ? 'Set (value hidden)' : 'Not set');

console.log(`Starting server on port ${PORT}`);

// Add a small delay to ensure environment is fully set up
setTimeout(() => {
  // Start the Next.js server
  const nextStart = spawn('npm', ['run', 'start'], {
    stdio: 'inherit',
    env: {
      ...process.env,
      PORT: PORT
    }
  });

  // Handle process exit
  nextStart.on('close', (code) => {
    console.log(`Next.js server exited with code ${code}`);
    process.exit(code);
  });

  // Handle process errors
  nextStart.on('error', (err) => {
    console.error('Failed to start Next.js server:', err);
    process.exit(1);
  });
}, 1000);
