const fs = require('fs');
let content = fs.readFileSync('src/components/Keyboards.tsx', 'utf-8');
content = content.replace(`if (disabled || !alwaysAllowFreeKeyboard || actualMode === 'free_typing') return;`, `if (disabled || !alwaysAllowFreeKeyboard || actualMode === 'manual') return;`);
fs.writeFileSync('src/components/Keyboards.tsx', content);
