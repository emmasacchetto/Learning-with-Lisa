const fs = require('fs');

let content = fs.readFileSync('src/data.ts', 'utf-8');

// 1. Add "Fuente Indefinida" and "Unidad Indefinida" to the base maps.
content = content.replace(
    /return \{ eng, spa, category: category, emoji \};/g,
    'return { eng, spa, category: category, emoji, source: "Indefinido", unit: "Indefinido", year: "2026" };'
);

content = content.replace(
    /return \{ eng, spa, category: category \|\| "Vocabulary", emoji \};/g,
    'return { eng, spa, category: category || "Vocabulary", emoji, source: "Indefinido", unit: "Indefinido", year: "2026" };'
);

content = content.replace(
    /export const GRAMMAR_QUIZZES = \[([\s\S]*?)\];\n\nGRAMMAR_QUIZZES\.push/m,
    `const BASE_GRAMMAR_QUIZZES = [$1];\nexport const GRAMMAR_QUIZZES = BASE_GRAMMAR_QUIZZES.map(q => ({...q, source: "Indefinido", unit: "Indefinido", year: "2026"}));\n\nGRAMMAR_QUIZZES.push`
);

content = content.replace(
    /export const READING_COMPREHENSION_DATA = \[([\s\S]*?)\];\n\nREADING_COMPREHENSION_DATA\.push/m,
    `const BASE_READING_COMPREHENSION_DATA = [$1];\nexport const READING_COMPREHENSION_DATA = BASE_READING_COMPREHENSION_DATA.map(r => ({...r, source: "Indefinido", unit: "Indefinido", year: "2026"}));\n\nREADING_COMPREHENSION_DATA.push`
);

content = content.replace(
    /export const DIALOGUE_PATTERNS = \[([\s\S]*?)\];\n\nDIALOGUE_PATTERNS\.push/m,
    `const BASE_DIALOGUE_PATTERNS = [$1];\nexport const DIALOGUE_PATTERNS = BASE_DIALOGUE_PATTERNS.map(d => ({...d, source: "Indefinido", unit: "Indefinido", year: "2026"}));\n\nDIALOGUE_PATTERNS.push`
);

fs.writeFileSync('src/data.ts', content);
console.log('Fixed data.ts structure');
