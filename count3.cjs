const fs = require('fs');
const content = fs.readFileSync('src/components/ExerciseEngine.tsx', 'utf-8');
const lines = content.split('\n');
let depth = 0;
for (let i = 0; i < lines.length; i++) {
  const line = lines[i];
  // ignore braces inside strings/JSX? This is a naive counter.
  // Actually let's just print naive depth.
  for(let j = 0; j < line.length; j++) {
    if (line[j] === '{') depth++;
    if (line[j] === '}') depth--;
  }
  if (i >= 1100) console.log('Line', i, 'Depth:', depth, line);
}
console.log('Final depth:', depth);
