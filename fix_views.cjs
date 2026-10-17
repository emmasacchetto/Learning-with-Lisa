const fs = require('fs');
let code = fs.readFileSync('src/components/ExerciseViews.tsx', 'utf8');

// The messed up line was something like:
// playTTS(opt, exercise.optionsLang || 'en', selectedVoiceURI, voiceSpeedPrompt = 0.9, voiceSpeedPrompt, true);
// Let's just fix it manually.
// Actually, it's easier to fetch from file and fix.

// 1. Revert `selectedVoiceURI, voiceSpeedPrompt = 0.9,` to `selectedVoiceURI,` ONLY inside playTTS calls.
code = code.replace(/playTTS\(([^;]+)selectedVoiceURI, voiceSpeedPrompt = 0.9,/g, "playTTS($1selectedVoiceURI,");

// Also, let's fix the other messes that might have happened. 
// "playTTS(item.eng, 'auto', selectedVoiceURI, voiceSpeedPrompt = 0.9, voiceSpeedPrompt, true);"
code = code.replace(/voiceSpeedPrompt = 0\.9, voiceSpeedPrompt, true/g, "voiceSpeedPrompt, true");
code = code.replace(/voiceSpeedPrompt = 0\.9, 0\.9, true/g, "voiceSpeedPrompt, true");
code = code.replace(/voiceSpeedPrompt = 0\.9, 1\.0, true/g, "voiceSpeedPrompt, true");
code = code.replace(/voiceSpeedPrompt = 0\.9, speed, true/g, "speed, true");


fs.writeFileSync('src/components/ExerciseViews.tsx', code);
console.log("Fixed views tentatively");
