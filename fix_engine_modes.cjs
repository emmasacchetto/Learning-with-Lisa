const fs = require('fs');
let code = fs.readFileSync('src/components/ExerciseEngine.tsx', 'utf-8');

const oldRandomBlock = `    if (defaultKeyboardMode === 'random' && allowedKeyboards && allowedKeyboards.length > 0) {
       setRandomMode(allowedKeyboards[Math.floor(Math.random() * allowedKeyboards.length)]);
     
       setRandomMode('');
    }`;
    
const newRandomBlock = `    if (randomizeKeyboardsMode === 'entry' && allowedKeyboards && allowedKeyboards.length > 0) {
       setRandomMode(allowedKeyboards[Math.floor(Math.random() * allowedKeyboards.length)]);
    } else if (defaultKeyboardMode === 'random' && allowedKeyboards && allowedKeyboards.length > 0) {
       setRandomMode(allowedKeyboards[Math.floor(Math.random() * allowedKeyboards.length)]);
    } else {
       setRandomMode('');
    }`;

code = code.replace(oldRandomBlock, newRandomBlock);

const oldActiveMode = `const activeMode = randomMode || defaultKeyboardMode;`;
const newActiveMode = `const activeMode = enableMultiModalProgression && exercise.targetKeyboardMode ? (randomizeKeyboardsMode === 'entry' && randomMode ? randomMode : exercise.targetKeyboardMode) : (randomMode || defaultKeyboardMode);`;

code = code.replace(oldActiveMode, newActiveMode);

fs.writeFileSync('src/components/ExerciseEngine.tsx', code);
