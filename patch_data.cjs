const fs = require('fs');

let ts = fs.readFileSync('src/data.ts', 'utf-8');

// Fix MASTER_DATABASE_EXPANDED push
const pushMaster = "MASTER_DATABASE.push(...MASTER_DATABASE_EXPANDED);";
const pushMasterFix = `MASTER_DATABASE.push(...MASTER_DATABASE_EXPANDED.map(item => {
  if (typeof item === 'string') {
    const [eng, spa, category, emoji] = item.split('|');
    return { eng, spa, category, emoji, source: "Unid. 3: Habits", year: "2026" };
  }
  return { ...item, source: "Unid. 3: Habits", year: "2026" };
}));`;
ts = ts.replace(pushMaster, pushMasterFix);

// Fix VOCAB_RAW_EXPANDED push. Wait, VOCAB_RAW is an array of strings. 
// If we map it to objects, it will crash later. Let's just remove it from VOCAB_RAW 
// and push directly to VOCABULARY_DATABASE. Or we can just push to VOCABULARY_DATABASE!
const pushVocab = "VOCAB_RAW.push(...VOCAB_RAW_EXPANDED);";
ts = ts.replace(pushVocab, ""); // Remove the push to VOCAB_RAW

const vocabDbRegex = /export const VOCABULARY_DATABASE = \[\s*\.\.\.VOCAB_RAW\.map\([^\]]+\),\s*\.\.\.NEW_VOCAB_RAW\.map\([^\]]+\),/s;
const match = ts.match(vocabDbRegex);
if (match) {
    const replacement = match[0] + `
  ...VOCAB_RAW_EXPANDED.map(item => {
    if (typeof item === 'string') {
      const [eng, spa, category, emoji] = item.split('|');
      return { eng, spa, category: category || "Vocabulary", emoji, source: "Unid. 3: Habits", year: "2026" };
    }
    return { ...item, source: "Unid. 3: Habits", year: "2026" };
  }),`;
    ts = ts.replace(match[0], replacement);
} else {
    console.log("Could not find VOCABULARY_DATABASE array in data.ts");
}

// Fix GRAMMAR_QUIZZES_EXPANDED push
const pushGrammarQuizzes = "GRAMMAR_QUIZZES.push(...GRAMMAR_QUIZZES_EXPANDED);";
const pushGrammarQuizzesFix = `GRAMMAR_QUIZZES.push(...GRAMMAR_QUIZZES_EXPANDED.map(q => ({ ...q, source: "Unid. 3: Habits", year: "2026" })));`;
ts = ts.replace(pushGrammarQuizzes, pushGrammarQuizzesFix);

// Fix READING_COMPREHENSION_DATA_EXPANDED push
const pushReading = "READING_COMPREHENSION_DATA.push(...READING_COMPREHENSION_DATA_EXPANDED);";
const pushReadingFix = `READING_COMPREHENSION_DATA.push(...READING_COMPREHENSION_DATA_EXPANDED.map(r => ({ ...r, source: "Unid. 3: Habits", year: "2026" })));`;
ts = ts.replace(pushReading, pushReadingFix);

// Fix DIALOGUE_PATTERNS_EXPANDED push
const pushDialogue = "DIALOGUE_PATTERNS.push(...DIALOGUE_PATTERNS_EXPANDED);";
const pushDialogueFix = `DIALOGUE_PATTERNS.push(...DIALOGUE_PATTERNS_EXPANDED.map(d => ({ ...d, source: "Unid. 3: Habits", year: "2026" })));`;
ts = ts.replace(pushDialogue, pushDialogueFix);

fs.writeFileSync('src/data.ts', ts, 'utf-8');
console.log("Patched data.ts");
