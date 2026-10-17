const fs = require('fs');
let code = fs.readFileSync('src/App.tsx', 'utf-8');

code = code.replace(
  "items: { id: string, name: string, emoji: string, type: 'year' | 'source' | 'theme' | 'skill', exerciseIds: string[] }[], onClick: (id: string) => void) => {",
  "items: { id: string, name: string, emoji: string, type: 'year' | 'source' | 'theme' | 'skill', exerciseIds: string[], isDoneOverride?: boolean }[], onClick: (id: string) => void) => {"
);

code = code.replace(
  "const isDone = item.exerciseIds.length > 0 && item.exerciseIds.every(id => completedExIds.includes(id) || learnedExIds.includes(id));",
  "const isDone = item.isDoneOverride !== undefined ? item.isDoneOverride : (item.exerciseIds.length > 0 && item.exerciseIds.every(id => completedExIds.includes(id) || learnedExIds.includes(id)));"
);

code = code.replace(
  "const isDone = completedCount === totalCount && totalCount > 0;",
  "const isDone = item.isDoneOverride !== undefined ? item.isDoneOverride : (completedCount === totalCount && totalCount > 0);"
);

fs.writeFileSync('src/App.tsx', code);
