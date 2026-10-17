const fs = require('fs');
let tsContent = fs.readFileSync('src/data_expanded.ts', 'utf-8');
console.log('original length:', tsContent.length);

// Let's just find and replace the new additions if we know what they are.
// Actually, since I appended right after the `[`, we can just remove the JSON string I inserted!
// My script did:
// ts.slice(0, bracketIndex + 1) + '\n' + dataString + ts.slice(bracketIndex + 1)
// where dataString was newData.map(item => JSON.stringify(item, null, 2)).join(',\n') + ',\n';

const j1 = JSON.parse(fs.readFileSync('json1.json', 'utf-8'));
const j2 = JSON.parse(fs.readFileSync('json2.json', 'utf-8'));

function removeInserted(ts, newData) {
    if (!newData || newData.length === 0) return ts;
    const dataString = '\n' + newData.map(item => JSON.stringify(item, null, 2)).join(',\n') + ',\n';
    return ts.replace(dataString, '');
}

tsContent = removeInserted(tsContent, j1.GRAMMAR_QUIZZES);
tsContent = removeInserted(tsContent, j1.VOCABULARY);
tsContent = removeInserted(tsContent, j2.GRAMMAR_QUIZZES);
tsContent = removeInserted(tsContent, j2.VOCABULARY);

fs.writeFileSync('src/data_expanded.ts', tsContent, 'utf-8');
console.log('fixed length:', tsContent.length);
