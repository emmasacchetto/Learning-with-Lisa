const fs = require('fs');
let code = fs.readFileSync('src/App.tsx', 'utf-8');
const lines = code.split('\n');
for (let i = 4529; i <= 4539; i++) {
   console.log(i + 1, lines[i]);
}
