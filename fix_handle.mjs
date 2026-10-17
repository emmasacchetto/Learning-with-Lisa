import fs from 'fs';
let code = fs.readFileSync('src/components/ExerciseViews.tsx', 'utf8');

const oldCode = `         return t.trim();
      };
          } else {
              setTimeout(() => {
                  setStep(s => s + 1);
                  setIsAdvancing(false);
              }, 1200);
          }
      } else {
          setLocalError(true);`;

const newCode = `         return t.trim();
      };
      const cleanUser = cleanText(val === 'SPECIAL_CORRECT_FLAG' ? currentLine.eng : val);
      const cleanCorrect = cleanText(currentLine.eng);
      
      let isMatch = false;
      if (val === 'SPECIAL_CORRECT_FLAG') {
          isMatch = true;
      } else if (isSpeakMode) {
          isMatch = cleanUser === cleanCorrect || cleanUser.includes(cleanCorrect) || cleanCorrect.includes(cleanUser);
      } else {
          isMatch = strictTyping ? val.trim() === currentLine.eng.trim() : cleanUser === cleanCorrect;
      }

      if (isMatch) {
          setLocalError(false);
          setIsAdvancing(true);
          
          if (step >= dialogue.length - 1) {
              setTimeout(() => {
                  onResult(val);
              }, 1200);
          } else {
              setTimeout(() => {
                  setStep(s => s + 1);
                  setIsAdvancing(false);
              }, 1200);
          }
      } else {
          setLocalError(true);`;

code = code.replace(oldCode, newCode);
fs.writeFileSync('src/components/ExerciseViews.tsx', code);
