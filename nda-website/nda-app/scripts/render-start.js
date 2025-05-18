// This script is used by Render to start the application
const { spawn } = require('child_process');
const path = require('path');
const fs = require('fs');
const os = require('os');

// Print environment information for debugging
console.log('=== RENDER STARTUP DIAGNOSTICS ===');
console.log('Node version:', process.version);
console.log('Current directory:', process.cwd());
console.log('Files in current directory:', fs.readdirSync('.').join(', '));

// Print system information
console.log('=== SYSTEM INFORMATION ===');
console.log('Platform:', os.platform());
console.log('Architecture:', os.arch());
console.log('Total memory:', Math.round(os.totalmem() / (1024 * 1024)) + 'MB');
console.log('Free memory:', Math.round(os.freemem() / (1024 * 1024)) + 'MB');
console.log('CPU count:', os.cpus().length);

// Get the port from environment variables or use 3000 as default
const PORT = process.env.PORT || 3000;

// Set the port in the environment
process.env.PORT = PORT;

// Log important environment variables (without sensitive values)
console.log('=== ENVIRONMENT VARIABLES ===');
console.log('- NODE_ENV:', process.env.NODE_ENV);
console.log('- PORT:', PORT);
console.log('- NEXTAUTH_URL:', process.env.NEXTAUTH_URL || 'Not set');
console.log('- MONGODB_URI:', process.env.MONGODB_URI ? 'Set (value hidden)' : 'Not set');

// Check for .next directory
const nextDirExists = fs.existsSync('.next');
console.log('.next directory exists:', nextDirExists);
if (nextDirExists) {
  console.log('.next directory contents:', fs.readdirSync('.next').join(', '));
}

// Check for logo file in various locations
console.log('=== LOGO FILE CHECKS ===');
const logoLocations = [
  './public/logo.png',
  './.next/static/logo.png',
  './.next/logo.png',
  './logo.png'
];

logoLocations.forEach(location => {
  const exists = fs.existsSync(location);
  console.log(`Logo at ${location}: ${exists ? 'EXISTS' : 'MISSING'}`);
  if (exists) {
    const stats = fs.statSync(location);
    console.log(`  - Size: ${stats.size} bytes`);
    console.log(`  - Last modified: ${stats.mtime}`);
  }
});

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
