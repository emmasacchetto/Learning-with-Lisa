const fs = require('fs');
let content = fs.readFileSync('src/components/ExerciseEngine.tsx', 'utf-8');

const oldEvaluate = `    if (strictTyping) {
       return String(user).trim() === String(correct).trim();
            const cleanWriting = (s: string) => {`;

const newEvaluate = `    if (strictTyping) {
       return String(user).trim() === String(correct).trim();
    }
    const cleanWriting = (s: string) => {`;

content = content.replace(oldEvaluate, newEvaluate);

const oldEvaluateEnd = `       return cleanWriting(user) === cleanWriting(correct);
    }
  };`;

const newEvaluateEnd = `       return cleanWriting(user) === cleanWriting(correct);
  };`;

content = content.replace(oldEvaluateEnd, newEvaluateEnd);

fs.writeFileSync('src/components/ExerciseEngine.tsx', content);
