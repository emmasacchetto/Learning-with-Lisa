const fs = require('fs');
let content = fs.readFileSync('src/App.tsx', 'utf-8');

content = content.replace(
  /{queue.length > 0 && queue\[currentIndex\] \? \(\s*\{(\(\) => \{)/m,
  `{queue.length > 0 && queue[currentIndex] ? (
              $1`
);

content = content.replace(
  /\s*\/\>\s*\);\s*\}\)\(\)\}/m,
  `
              />
             )
            })()`
);

fs.writeFileSync('src/App.tsx', content);
