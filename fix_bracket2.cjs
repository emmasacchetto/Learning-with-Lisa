const fs = require('fs');
let content = fs.readFileSync('src/components/ExerciseEngine.tsx', 'utf-8');
content = content.replace(`       return String(user).trim() === String(correct).trim();\n    }\n    }`, `       return String(user).trim() === String(correct).trim();\n    }`);
fs.writeFileSync('src/components/ExerciseEngine.tsx', content);
