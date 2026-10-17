const fs = require('fs');
let content = fs.readFileSync('src/components/ExerciseViews.tsx', 'utf-8');
const badStr = "exercise.correctAnswer || exercise.correctSentence || exercise.textToSpeak || exercise.textToRead || exercise.eng";
content = content.split(badStr).join('');
fs.writeFileSync('src/components/ExerciseViews.tsx', content);
