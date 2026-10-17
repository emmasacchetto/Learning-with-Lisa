const fs = require('fs');
let content = fs.readFileSync('src/App.tsx', 'utf-8');

const target = `                allowedKeyboards={allowedKeyboards} flashcardMode={flashcardMode} strictTyping={strictTyping}`;

const replacement = `                allowedKeyboards={allowedKeyboards} alwaysAllowFreeKeyboard={alwaysAllowFreeKeyboard} flashcardMode={flashcardMode} strictTyping={strictTyping}`;

content = content.replace(target, replacement);
fs.writeFileSync('src/App.tsx', content);
