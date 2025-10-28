#!/usr/bin/env node

/**
 * Script to convert workspace:* protocol to file: protocol for npm compatibility
 */

const fs = require('fs');
const path = require('path');

console.log('🔧 Converting workspace: protocol to file: protocol...\n');

// Convert apps/example/package.json
const examplePkgPath = path.join(__dirname, 'apps/example/package.json');
const examplePkg = JSON.parse(fs.readFileSync(examplePkgPath, 'utf8'));

let conversions = 0;

// Convert dependencies
if (examplePkg.dependencies) {
  Object.keys(examplePkg.dependencies).forEach(dep => {
    if (examplePkg.dependencies[dep] === 'workspace:*') {
      if (dep === 'ai-sdk-tools') {
        // ai-sdk-tools is in packages/ai-sdk-tools
        examplePkg.dependencies[dep] = 'file:../../packages/ai-sdk-tools';
        console.log(`✅ Converted: ${dep}: workspace:* → file:../../packages/ai-sdk-tools`);
        conversions++;
      }
    }
  });
}

// Write back the modified package.json
fs.writeFileSync(examplePkgPath, JSON.stringify(examplePkg, null, 2) + '\n');

console.log(`\n✅ Total conversions: ${conversions}`);
console.log('✅ package.json updated successfully!\n');
console.log('📦 Ready for npm install --legacy-peer-deps');
