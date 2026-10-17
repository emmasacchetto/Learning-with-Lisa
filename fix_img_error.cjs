const fs = require('fs');

function fixFile(file) {
    let content = fs.readFileSync(file, 'utf-8');
    content = content.replace(/\/\s*onError=/g, 'onError=');
    fs.writeFileSync(file, content);
}

fixFile('src/App.tsx');
fixFile('src/components/ExerciseEngine.tsx');
