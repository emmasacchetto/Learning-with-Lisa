const fs = require('fs');
let content = fs.readFileSync('src/components/ExerciseViews.tsx', 'utf-8');

content = content.replace("const textToSplit = exercise.textToSpeak || || '';", "const textToSplit = exercise.textToSpeak || exercise.eng || '';");
fs.writeFileSync('src/components/ExerciseViews.tsx', content);
