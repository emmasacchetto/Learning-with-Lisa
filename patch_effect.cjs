const fs = require('fs');
let code = fs.readFileSync('src/components/ExerciseEngine.tsx', 'utf8');

const clickSavingsEffect = `  useEffect(() => {
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

const clickSavingsEffectRepl = `  useEffect(() => {
    if (status === 'correct' && clickSavings && !syncAudioAdvance) {
      if (hidePositiveFeedback) {
        onProceed(true, false, undefined, activeMode);
      } else {
        const timer = setTimeout(() => {
          onProceed(true, false, undefined, activeMode);
        }, 1500);
        return () => clearTimeout(timer);
      }
    }
  }, [status, clickSavings, hidePositiveFeedback, activeMode, syncAudioAdvance]);`;

code = code.replace(clickSavingsEffect, clickSavingsEffectRepl);

// Also we need to make sure handleResult triggers onProceed even if hidePositiveFeedback is true, IF syncAudioAdvance is true.
const handleAnswerSync = `if (clickSavings && !hidePositiveFeedback && syncAudioAdvance) {`;
const handleAnswerSyncRepl = `if (clickSavings && syncAudioAdvance) {`;
code = code.replace(handleAnswerSync, handleAnswerSyncRepl);

fs.writeFileSync('src/components/ExerciseEngine.tsx', code);
console.log("Effect patched!");
