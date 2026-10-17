const fs = require('fs');
let content = fs.readFileSync('src/components/ExerciseEngine.tsx', 'utf-8');

const target = `    if (strictTyping) {
       return String(user).trim() === String(correct).trim();
     
       const cleanWriting = (s: string) => {`;

const replacement = `    if (strictTyping) {
       return String(user).trim() === String(correct).trim();
    }
    const cleanWriting = (s: string) => {`;

content = content.replace(target, replacement);

fs.writeFileSync('src/components/ExerciseEngine.tsx', content);
