const fs = require('fs');
let code = fs.readFileSync('src/components/ExerciseEngine.tsx', 'utf8');

// 1. Add to props
const enginePropsSearch = "syncAudioAdvance, queue";
const enginePropsReplace = "syncAudioAdvance, voiceSpeedPrompt = 0.9, voiceSpeedAnswer = 0.9, voiceSpeedFeedback = 1.0, queue";
code = code.replace(enginePropsSearch, enginePropsReplace);

// 2. Update playFeedback function
const playFeedbackSpanish = "await playTTS(moti.spa, 'es', null, 1.0, true, null, gender);";
const playFeedbackSpanishReplace = "await playTTS(moti.spa, 'es', null, voiceSpeedFeedback, true, null, gender);";
code = code.replace(playFeedbackSpanish, playFeedbackSpanishReplace);

const playFeedbackEnglish = "await playTTS(extraEng || moti.eng, 'en', selectedVoiceURI, 0.9, true, null, gender);";
const playFeedbackEnglishReplace = "await playTTS(extraEng || moti.eng, 'en', selectedVoiceURI, voiceSpeedAnswer, true, null, gender);";
code = code.replace(playFeedbackEnglish, playFeedbackEnglishReplace);

// 3. Update the play button for repeating audio (line ~694)
const repeatAudio = "playTTS(text, 'en', selectedVoiceURI, 0.9, true);";
const repeatAudioReplace = "playTTS(text, 'en', selectedVoiceURI, voiceSpeedPrompt, true);";
code = code.replace(repeatAudio, repeatAudioReplace);

// 4. Also we need to pass voiceSpeedPrompt to ExerciseViews
const renderSwitchRegex = /<(BuildSentenceUI|DialogueUI|FlashcardSingleUI|ListenWriteUI|QuizUI|ReadingUI|SpeakUI|MatchUI|DictationUI) /g;
// Replace them by adding voiceSpeedPrompt={voiceSpeedPrompt}
code = code.replace(renderSwitchRegex, '<$1 voiceSpeedPrompt={voiceSpeedPrompt} ');


fs.writeFileSync('src/components/ExerciseEngine.tsx', code);
console.log("ExerciseEngine.tsx patched!");
