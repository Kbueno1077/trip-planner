const fs = require('fs');
const path = require('path');

// Add 'use client' directive to the built files
function addUseClientDirective() {
  const distPath = path.join(__dirname, 'dist');
  
  // Files that need the 'use client' directive
  const files = [
    'index.js',
    'index.mjs',
    'examples/index.js',
    'examples/index.mjs'
  ];

  files.forEach(file => {
    const filePath = path.join(distPath, file);
    if (fs.existsSync(filePath)) {
      let content = fs.readFileSync(filePath, 'utf8');
      
      // Add 'use client' directive if it's not already there
      if (!content.startsWith("'use client'") && !content.startsWith('"use client"')) {
        content = "'use client';\n" + content;
        fs.writeFileSync(filePath, content);
        console.log(`Added 'use client' directive to ${file}`);
      }
    }
  });
}

// Run the script
addUseClientDirective();
