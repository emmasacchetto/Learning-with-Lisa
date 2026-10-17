const fs = require('fs');
let code = fs.readFileSync('src/App.tsx', 'utf-8');
let lines = code.split('\n');

const badLines = [2543, 2717, 3197, 3944, 4029, 4155, 4214, 4317, 4709, 4746, 4804, 4942, 4969, 5835, 5871, 5905];

for (let i = 0; i < lines.length; i++) {
    // line numbers are 1-based, i is 0-based
    let lineNum = i + 1;
    // We allow +/- 2 variance because line numbers might have shifted slightly 
    // due to previous sed edits (like fixing 4535)
    for (let badLine of badLines) {
        if (Math.abs(lineNum - badLine) <= 5 && lines[i].includes('})()}')) {
            lines[i] = lines[i].replace('})()}', '})}');
        }
    }
}

fs.writeFileSync('src/App.tsx', lines.join('\n'));
