const fs = require('fs');

let dataTs = fs.readFileSync('src/data.ts', 'utf-8');

// The user wants Fuente Indefinida to have Unidad Indefinida
dataTs = dataTs.replace(
    /category: category \|\| "Vocabulary", emoji \};/g,
    'category: category || "Vocabulary", emoji, source: "Fuente Indefinida", unit: "Unidad Indefinida", year: "2026" };'
);
dataTs = dataTs.replace(
    /return \{ eng, spa, category: category, emoji \};/g,
    'return { eng, spa, category: category, emoji, source: "Fuente Indefinida", unit: "Unidad Indefinida", year: "2026" };'
);

dataTs = dataTs.replace(
    /export const MASTER_DATABASE = \[\n  "Hello! I'm Ben./,
    'export const MASTER_DATABASE_RAW = [\n  "Hello! I\'m Ben.'
);

dataTs = dataTs.replace(
    /\]\.map\(item => \{ const \[eng, spa, category, emoji\] = item\.split\('\|'\); return \{ eng, spa, category: category, emoji \}; \}\);/g,
    '].map(item => { const [eng, spa, category, emoji] = item.split(\'|\'); return { eng, spa, category: category, emoji, source: "Fuente Indefinida", unit: "Unidad Indefinida", year: "2026" }; });\n\nexport const MASTER_DATABASE = [...MASTER_DATABASE_RAW];'
);

// Do similar replacements for VOCAB_RAW, GRAMMAR_QUIZZES, READING_COMPREHENSION_DATA, DIALOGUE_PATTERNS to add Fuente Indefinida and Unidad Indefinida.
// Actually, let's just write a script that parses the AST or does robust regex to add source and unit to the legacy items.

