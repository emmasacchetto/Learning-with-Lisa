const fs = require('fs');
let content = fs.readFileSync('src/components/Keyboards.tsx', 'utf-8');

const target = `  const activeOptions = KEYBOARD_OPTIONS.filter(opt => allowedKeyboards && allowedKeyboards.includes(opt.id));`;

const replacement = `  let activeOptions = KEYBOARD_OPTIONS.filter(opt => allowedKeyboards && allowedKeyboards.includes(opt.id));
  if (alwaysAllowFreeKeyboard && !activeOptions.find(opt => opt.id === 'manual')) {
    activeOptions.push(KEYBOARD_OPTIONS.find(opt => opt.id === 'manual')!);
  }`;

content = content.replace(target, replacement);

const target2 = `        if (onChangeKeyboardMode) {
          onChangeKeyboardMode('free_typing');
        }`;

const replacement2 = `        if (onChangeKeyboardMode) {
          onChangeKeyboardMode('manual');
        }`;

content = content.replace(target2, replacement2);

fs.writeFileSync('src/components/Keyboards.tsx', content);
