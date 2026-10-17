const fs = require('fs');
let code = fs.readFileSync('src/components/ExerciseViews.tsx', 'utf8');

// QuizUI options
code = code.replace(/playTTS\(opt, exercise.optionsLang \|\| 'en', selectedVoiceURI, 0.9, true\);/g, 
                    "playTTS(opt, exercise.optionsLang || 'en', selectedVoiceURI, voiceSpeedPrompt, true);");

// MatchUI options
code = code.replace(/playTTS\(opt, exercise.optionsLang \|\| 'auto', selectedVoiceURI, 0.9, true\);/g, 
                    "playTTS(opt, exercise.optionsLang || 'auto', selectedVoiceURI, voiceSpeedPrompt, true);");

// MatchUI error
code = code.replace(/playTTS\("Try again", 'en', selectedVoiceURI, 1.0, true\);/g, 
                    "playTTS(\"Try again\", 'en', selectedVoiceURI, voiceSpeedPrompt, true);");

// MatchUI items
code = code.replace(/playTTS\(item.eng, 'auto', selectedVoiceURI, 0.9, true\);/g, 
                    "playTTS(item.eng, 'auto', selectedVoiceURI, voiceSpeedPrompt, true);");
code = code.replace(/playTTS\(item.spa, 'auto', selectedVoiceURI, 0.9, true\);/g, 
                    "playTTS(item.spa, 'auto', selectedVoiceURI, voiceSpeedPrompt, true);");

// DialogueUI
code = code.replace(/playTTS\(dialogue\[step\]\.eng, 'en', selectedVoiceURI, 0.9, true\);/g, 
                    "playTTS(dialogue[step].eng, 'en', selectedVoiceURI, voiceSpeedPrompt, true);");

// DictationUI feedback (try again)
code = code.replace(/playTTS\("Try again", 'en', selectedVoiceURI, 1.0, true\);/g,
                    "playTTS(\"Try again\", 'en', selectedVoiceURI, voiceSpeedPrompt, true);");

fs.writeFileSync('src/components/ExerciseViews.tsx', code);
console.log("Fixed views again");
