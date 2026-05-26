const fs = require('fs');
const path = require('path');

function ensureDir(dir) {
  try {
    fs.mkdirSync(dir, { recursive: true });
  } catch (err) {
    console.error('Failed to create', dir, err);
    process.exitCode = 1;
  }
}

const repoRoot = path.resolve(__dirname, '..');
const target = path.join(repoRoot, '.next', 'static', 'development');
ensureDir(target);
console.log('Ensured directory:', target);
