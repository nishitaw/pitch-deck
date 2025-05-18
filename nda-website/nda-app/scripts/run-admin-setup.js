// This script compiles and runs the TypeScript admin setup script

const { exec } = require('child_process');
const path = require('path');

// Path to the TypeScript script
const scriptPath = path.join(__dirname, 'set-admin-users.ts');

console.log('Compiling and running admin setup script...');

// Use ts-node to run the TypeScript script directly
exec(`npx ts-node ${scriptPath}`, (error, stdout, stderr) => {
  if (error) {
    console.error(`Error: ${error.message}`);
    return;
  }
  
  if (stderr) {
    console.error(`stderr: ${stderr}`);
    return;
  }
  
  console.log(stdout);
});
