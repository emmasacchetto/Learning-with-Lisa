const fs = require('fs');
let content = fs.readFileSync('src/components/ExerciseViews.tsx', 'utf-8');

content = content.replace("playTTS(exercise.textToSpeak ||, 'en', selectedVoiceURI, customSpeed, true);", "playTTS(exercise.textToSpeak || exercise.eng, 'en', selectedVoiceURI, customSpeed, true);");
fs.writeFileSync('src/components/ExerciseViews.tsx', content);
