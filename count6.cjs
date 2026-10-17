const fs = require('fs');
const content = fs.readFileSync('src/components/ExerciseEngine.tsx', 'utf-8');
const lines = content.split('\n');
let depth = 0;
for (let i = 0; i < lines.length; i++) {
  const line = lines[i];
  for(let j = 0; j < line.length; j++) {
    if (line[j] === '{') depth++;
    if (line[j] === '}') depth--;
  }
  if (i >= 380 && i <= 405) console.log('Line', i, 'Depth:', depth, line);
}
