const fs = require('fs');
let content = fs.readFileSync('src/components/Keyboards.tsx', 'utf-8');

const regex = /exercise\.correctAnswer \|\| exercise\.eng/g;
content = content.replace(regex, "exercise.correctAnswer || exercise.correctSentence || exercise.textToSpeak || exercise.textToRead || exercise.eng");

fs.writeFileSync('src/components/Keyboards.tsx', content);
