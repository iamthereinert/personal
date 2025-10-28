#!/usr/bin/env node

/**
 * Script to convert ALL workspace:* protocols to file: protocol for npm compatibility
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

console.log('🔧 Converting ALL workspace: protocols to file: protocol...\n');

// Find all package.json files with workspace:*
const packageFiles = [
  'apps/example/package.json',
  'apps/website/package.json',
  'packages/agents/package.json',
  'packages/ai-sdk-tools/package.json',
  'packages/artifacts/package.json',
  'packages/cache/package.json',
  'packages/devtools/package.json',
  'packages/memory/package.json',
];

let totalConversions = 0;

// Mapping of package names to their relative paths
const packagePaths = {
  '@ai-sdk-tools/agents': 'packages/agents',
  '@ai-sdk-tools/artifacts': 'packages/artifacts',
  '@ai-sdk-tools/cache': 'packages/cache',
  '@ai-sdk-tools/debug': 'packages/debug',
  '@ai-sdk-tools/devtools': 'packages/devtools',
  '@ai-sdk-tools/memory': 'packages/memory',
  '@ai-sdk-tools/store': 'packages/store',
  'ai-sdk-tools': 'packages/ai-sdk-tools',
};

packageFiles.forEach(pkgPath => {
  const fullPath = path.join(__dirname, pkgPath);

  if (!fs.existsSync(fullPath)) {
    console.log(`⚠️  Skipping ${pkgPath} (not found)`);
    return;
  }

  const pkg = JSON.parse(fs.readFileSync(fullPath, 'utf8'));
  let changed = false;

  // Convert dependencies
  ['dependencies', 'devDependencies', 'peerDependencies'].forEach(depType => {
    if (pkg[depType]) {
      Object.keys(pkg[depType]).forEach(dep => {
        if (pkg[depType][dep] === 'workspace:*' && packagePaths[dep]) {
          // Calculate relative path from current package to dependency
          const currentDir = path.dirname(pkgPath);
          const targetDir = packagePaths[dep];
          const relativePath = path.relative(currentDir, targetDir).replace(/\\/g, '/');

          pkg[depType][dep] = `file:${relativePath}`;
          console.log(`✅ ${pkgPath}: ${dep} → file:${relativePath}`);
          changed = true;
          totalConversions++;
        }
      });
    }
  });

  if (changed) {
    fs.writeFileSync(fullPath, JSON.stringify(pkg, null, 2) + '\n');
  }
});

console.log(`\n✅ Total conversions: ${totalConversions}`);
console.log('✅ All package.json files updated successfully!\n');
console.log('📦 Ready for npm install --legacy-peer-deps');
