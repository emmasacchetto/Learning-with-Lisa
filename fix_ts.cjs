const fs = require('fs');
let ts = fs.readFileSync('src/data.ts', 'utf-8');

const regex1 = /MASTER_DATABASE_EXPANDED\.map\(item => {\s*if \(typeof item === 'string'\) {\s*const \[eng, spa, category, emoji\] = item\.split\('\|'\);\s*return \{ eng, spa, category, emoji, source: "Unid\. 3: Habits", year: "2026" \};\s*}\s*return \{ \.\.\.item, source: "Unid\. 3: Habits", year: "2026" \};\s*}\)/;

ts = ts.replace(regex1, `MASTER_DATABASE_EXPANDED.map(item => {
  const [eng, spa, category, emoji] = item.split('|');
  return { eng, spa, category, emoji, source: "Unid. 3: Habits", year: "2026" };
})`);

const regex2 = /VOCAB_RAW_EXPANDED\.map\(item => {\s*if \(typeof item === 'string'\) {\s*const \[eng, spa, category, emoji\] = item\.split\('\|'\);\s*return \{ eng, spa, category: category \|\| "Vocabulary", emoji, source: "Unid\. 3: Habits", year: "2026" \};\s*}\s*return \{ \.\.\.item, source: "Unid\. 3: Habits", year: "2026" \};\s*}\)/;

ts = ts.replace(regex2, `VOCAB_RAW_EXPANDED.map(item => {
  const [eng, spa, category, emoji] = item.split('|');
  return { eng, spa, category: category || "Vocabulary", emoji, source: "Unid. 3: Habits", year: "2026" };
})`);

fs.writeFileSync('src/data.ts', ts, 'utf-8');
console.log("Fixed TS errors");
