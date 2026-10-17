const fs = require('fs');
let code = fs.readFileSync('src/components/ExerciseEngine.tsx', 'utf8');

// 1. Add syncAudioAdvance to props
code = code.replace(/hidePositiveFeedback, queue/g, 'hidePositiveFeedback, syncAudioAdvance, queue');

// 2. Make handleAnswer async
code = code.replace(/const handleAnswer = \(isCorrect: boolean, isFirstTry: boolean, kbModeStr\?: string\) => \{/, "const handleAnswer = async (isCorrect: boolean, isFirstTry: boolean, kbModeStr?: string) => {");

// 3. await playFeedback and conditionally onProceed if syncAudioAdvance is true
const playFeedbackCall = /playFeedback\(true, moti, exercise\.eng, img\);/g;
code = code.replace(playFeedbackCall, `await playFeedback(true, moti, exercise.eng, img);
      if (clickSavings && !hidePositiveFeedback && syncAudioAdvance) {
          onProceed(true, false, undefined, activeMode);
      }`);

const playFeedbackFalseCall = /playFeedback\(false, moti, exercise\.eng, img\);/g;
code = code.replace(playFeedbackFalseCall, `await playFeedback(false, moti, exercise.eng, img);`);


// 4. Update the clickSavings useEffect
const clickSavingsEffect = `  useEffect(() => {
    if (status === 'correct' && clickSavings) {
      if (hidePositiveFeedback) {
        onProceed(true, false, undefined, activeMode);
      } else {
        const timer = setTimeout(() => {
          onProceed(true, false, undefined, activeMode);
        }, 1500);
        return () => clearTimeout(timer);
      }
    }
  }, [status, clickSavings, hidePositiveFeedback, activeMode]);`;

const clickSavingsEffectRepl = `  useEffect(() => {
    if (status === 'correct' && clickSavings) {
      if (hidePositiveFeedback) {
        onProceed(true, false, undefined, activeMode);
      } else if (!syncAudioAdvance) {
        const timer = setTimeout(() => {
          onProceed(true, false, undefined, activeMode);
        }, 1500);
        return () => clearTimeout(timer);
      }
    }
  }, [status, clickSavings, hidePositiveFeedback, activeMode, syncAudioAdvance]);`;

code = code.replace(clickSavingsEffect, clickSavingsEffectRepl);

fs.writeFileSync('src/components/ExerciseEngine.tsx', code);
console.log("ExerciseEngine.tsx patched!");
