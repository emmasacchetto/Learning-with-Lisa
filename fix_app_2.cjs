const fs = require('fs');
let content = fs.readFileSync('src/App.tsx', 'utf-8');

content = content.replace(
  /{queue\.length > 0 && queue\[currentIndex\] \? \([\s\S]*?\{\(\(\) => \{/m,
  `{queue.length > 0 && queue[currentIndex] ? (() => {`
);

content = content.replace(
  /dataSaverMode=\{dataSaverMode\}\s*\/>\s*\);\s*\}\)\(\)\}/m,
  `dataSaverMode={dataSaverMode}
              />
             )
            })() : (`
);

fs.writeFileSync('src/App.tsx', content);
