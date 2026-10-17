const fs = require('fs');
let ts = fs.readFileSync('src/data.ts', 'utf-8');

const regex2 = /\.\.\.VOCAB_RAW_EXPANDED\.map\(item => \(\{ \.\.\.item, source: "Unid\. 3: Habits", year: "2026" \}\)\)/;

const fix2 = `...VOCAB_RAW_EXPANDED.map(item => {
    const [eng, spa, category, emoji] = item.split('|');
    return { eng, spa, category: category || "Vocabulary", emoji, source: "Unid. 3: Habits", year: "2026" };
  })`;

ts = ts.replace(regex2, fix2);

fs.writeFileSync('src/data.ts', ts, 'utf-8');
console.log("Fixed TS errors third time");
