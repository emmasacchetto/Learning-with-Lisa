const fs = require('fs');
let content = fs.readFileSync('src/components/ExerciseEngine.tsx', 'utf-8');

content = content.replace(/onChangeKeyboardMode=\{onChangeKeyboardMode\}/g, "onChangeKeyboardMode={onChangeKeyboardMode} alwaysAllowFreeKeyboard={alwaysAllowFreeKeyboard}");

fs.writeFileSync('src/components/ExerciseEngine.tsx', content);
