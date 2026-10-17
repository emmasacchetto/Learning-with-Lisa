const fs = require('fs');
let content = fs.readFileSync('src/App.tsx', 'utf-8');

content = content.replace(
  /dictationSpeed=\{dictationSpeed\}\s*\/>\s*\)\s*:\s*\(/,
  `dictationSpeed={dictationSpeed}
              />
             )
            })() : (`
);

fs.writeFileSync('src/App.tsx', content);
