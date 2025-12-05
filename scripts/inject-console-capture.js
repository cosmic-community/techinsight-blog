const fs = require('fs');
const path = require('path');

const consoleScript = `<script src="/dashboard-console-capture.js"></script>`;

function injectScript(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  
  if (content.includes('dashboard-console-capture.js')) {
    return;
  }
  
  if (content.includes('</head>')) {
    content = content.replace('</head>', `  ${consoleScript}\n  </head>`);
  } else if (content.includes('<head>')) {
    content = content.replace('<head>', `<head>\n    ${consoleScript}`);
  }
  
  fs.writeFileSync(filePath, content, 'utf8');
  console.log(`✓ Injected console capture script into ${filePath}`);
}

function walkDir(dir) {
  const files = fs.readdirSync(dir);
  
  files.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    
    if (stat.isDirectory() && !filePath.includes('node_modules')) {
      walkDir(filePath);
    } else if (file.endsWith('.html')) {
      injectScript(filePath);
    }
  });
}

const outputDir = path.join(process.cwd(), '.next');
if (fs.existsSync(outputDir)) {
  walkDir(outputDir);
  console.log('Console capture script injection complete!');
} else {
  console.log('No .next directory found. Build the project first.');
}