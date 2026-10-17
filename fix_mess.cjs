const fs = require('fs');
let content = fs.readFileSync('src/App.tsx', 'utf-8');

content = content.replace(
  /<              \/>\s*\)\s*\n\s*\w*\(\)\(\)/,
  `</div>`
);
content = content.replace(
  /<              \/>\s*\)\s*\}\)\(\)/g,
  `</div>`
);

fs.writeFileSync('src/App.tsx', content);
