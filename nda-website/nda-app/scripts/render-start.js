// This script is used by Render to start the application
const { spawn } = require('child_process');
const path = require('path');

// Get the port from environment variables or use 3000 as default
const PORT = process.env.PORT || 3000;

// Set the port in the environment
process.env.PORT = PORT;

console.log(`Starting server on port ${PORT}`);

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
