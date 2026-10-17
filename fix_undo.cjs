const fs = require('fs');
let content = fs.readFileSync('src/App.tsx', 'utf-8');

content = content.replace(/<\/>\n                  \);\n                \}\)\(\)/g, '</>');

fs.writeFileSync('src/App.tsx', content);
