const fs = require('fs');

const data = JSON.parse(fs.readFileSync('new_data_1.json', 'utf8'));

// Format and append to data_expanded.ts
let content = fs.readFileSync('src/data_expanded.ts', 'utf8');

const formatDialogues = (dialogues) => {
    return dialogues.map(d => JSON.stringify(d, null, 2)).join(',\n');
};

const formatGrammarQuizzes = (quizzes) => {
    return quizzes.map(q => JSON.stringify(q, null, 2)).join(',\n');
};

const formatReading = (reading) => {
    return reading.map(r => JSON.stringify(r, null, 2)).join(',\n');
};

const formatSentences = (sentences) => {
    return sentences.map(s => `  "${s.eng}|${s.spa}|${s.category}|${s.emoji}"`).join(',\n');
};

const formatVocab = (vocab) => {
    return vocab.map(v => `  "${v.eng}|${v.spa}|${v.category}|${v.emoji}"`).join(',\n');
};

if (data.DIALOGUES && data.DIALOGUES.length > 0) {
    content = content.replace(
        /export const DIALOGUE_PATTERNS_EXPANDED = \[/,
        `export const DIALOGUE_PATTERNS_EXPANDED = [\n${formatDialogues(data.DIALOGUES)},`
    );
}

// Write it back
fs.writeFileSync('src/data_expanded.ts', content);
console.log('Appended first JSON dialogues successfully');
