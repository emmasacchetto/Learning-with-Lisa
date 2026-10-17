const fs = require('fs');

let ts = fs.readFileSync('src/data.ts', 'utf-8');

// The line is:
// export const VOCABULARY_DATABASE = [
//   ...VOCAB_RAW.map(item => {
const target = `export const VOCABULARY_DATABASE = [
  ...VOCAB_RAW.map(item => {`;

const fix = `export const VOCABULARY_DATABASE = [
  ...VOCAB_RAW_EXPANDED.map(item => {
    if (typeof item === 'string') {
      const [eng, spa, category, emoji] = item.split('|');
      return { eng, spa, category: category || "Vocabulary", emoji, source: "Unid. 3: Habits", year: "2026" };
    }
    return { ...item, source: "Unid. 3: Habits", year: "2026" };
  }),
  ...VOCAB_RAW.map(item => {`;

ts = ts.replace(target, fix);

fs.writeFileSync('src/data.ts', ts, 'utf-8');
console.log("Patched VOCABULARY_DATABASE");
