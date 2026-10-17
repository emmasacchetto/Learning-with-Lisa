const fs = require('fs');
let code = fs.readFileSync('src/components/ExerciseViews.tsx', 'utf8');

// The props definition for all of these usually start with `({ exercise...` 
// I can just replace `selectedVoiceURI,` with `selectedVoiceURI, voiceSpeedPrompt = 0.9,` for all of them.
code = code.replace(/selectedVoiceURI,/g, 'selectedVoiceURI, voiceSpeedPrompt = 0.9,');

// Replace playTTS hardcoded 0.9 and 1.0 values with voiceSpeedPrompt where appropriate in ExerciseViews.tsx.

// BuildSentenceUI
code = code.replace(/playTTS\(exercise.eng, 'en', selectedVoiceURI\);/, "playTTS(exercise.eng, 'en', selectedVoiceURI, voiceSpeedPrompt);");

// QuizUI
code = code.replace(/playTTS\(opt, exercise.optionsLang \|\| 'en', selectedVoiceURI, 0.9, true\);/g, "playTTS(opt, exercise.optionsLang || 'en', selectedVoiceURI, voiceSpeedPrompt, true);");

// MatchUI
code = code.replace(/playTTS\(opt, exercise.optionsLang \|\| 'auto', selectedVoiceURI, 0.9, true\);/g, "playTTS(opt, exercise.optionsLang || 'auto', selectedVoiceURI, voiceSpeedPrompt, true);");
code = code.replace(/playTTS\("Try again", 'en', selectedVoiceURI, 1.0, true\);/g, "playTTS(\"Try again\", 'en', selectedVoiceURI, voiceSpeedPrompt, true);");
code = code.replace(/playTTS\(item.eng, 'auto', selectedVoiceURI, 0.9, true\);/g, "playTTS(item.eng, 'auto', selectedVoiceURI, voiceSpeedPrompt, true);");
code = code.replace(/playTTS\(item.spa, 'auto', selectedVoiceURI, 0.9, true\);/g, "playTTS(item.spa, 'auto', selectedVoiceURI, voiceSpeedPrompt, true);");

// DialogueUI
code = code.replace(/playTTS\(dialogue\[step\]\.eng, 'en', selectedVoiceURI, 0.9, true\);/g, "playTTS(dialogue[step].eng, 'en', selectedVoiceURI, voiceSpeedPrompt, true);");

fs.writeFileSync('src/components/ExerciseViews.tsx', code);
console.log("ExerciseViews.tsx patched!");
