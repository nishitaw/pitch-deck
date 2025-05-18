// This script ensures that static assets are copied to the correct location
const fs = require('fs');
const path = require('path');

console.log('Starting asset copy process...');

// Define paths
const publicDir = path.join(process.cwd(), 'public');
const buildDir = path.join(process.cwd(), '.next', 'static');
const logoSource = path.join(publicDir, 'logo.png');

// Ensure build directory exists
if (!fs.existsSync(buildDir)) {
  console.log(`Creating build directory: ${buildDir}`);
  fs.mkdirSync(buildDir, { recursive: true });
}

// Copy logo to build directory
const logoDest = path.join(buildDir, 'logo.png');
try {
  console.log(`Copying logo from ${logoSource} to ${logoDest}`);
  fs.copyFileSync(logoSource, logoDest);
  console.log('Logo copied successfully');
} catch (error) {
  console.error('Error copying logo:', error);
}

// Also ensure logo is in the root of .next
const logoNextDest = path.join(process.cwd(), '.next', 'logo.png');
try {
  console.log(`Copying logo from ${logoSource} to ${logoNextDest}`);
  fs.copyFileSync(logoSource, logoNextDest);
  console.log('Logo copied to .next root successfully');
} catch (error) {
  console.error('Error copying logo to .next root:', error);
}

console.log('Asset copy process completed');
