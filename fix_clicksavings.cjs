const fs = require('fs');
let content = fs.readFileSync('src/components/ExerciseEngine.tsx', 'utf-8');

const oldEffect = `  useEffect(() => {
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

const newEffect = `  useEffect(() => {
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

content = content.replace(oldEffect, newEffect);
fs.writeFileSync('src/components/ExerciseEngine.tsx', content);
console.log('Fixed click savings');
