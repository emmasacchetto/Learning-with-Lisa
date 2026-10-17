const fs = require('fs');
let code = fs.readFileSync('src/components/ExerciseEngine.tsx', 'utf-8');

const oldCode = `  useEffect(() => {
    if (status === 'correct' && clickSavings) {
      if (hidePositiveFeedback) {
        onProceed(true, false);
       
        const timer = setTimeout(() => {
          onProceed(true, false);
        }, 1200);
        return () => clearTimeout(timer);
      }
    }
  }, [status, clickSavings, hidePositiveFeedback]);`;

const newCode = `  useEffect(() => {
    if (status === 'correct' && clickSavings) {
      if (hidePositiveFeedback) {
        onProceed(true, false);
      } else {
        const timer = setTimeout(() => {
          onProceed(true, false);
        }, 1500);
        return () => clearTimeout(timer);
      }
    }
  }, [status, clickSavings, hidePositiveFeedback]);`;

code = code.replace(oldCode, newCode);
fs.writeFileSync('src/components/ExerciseEngine.tsx', code);
