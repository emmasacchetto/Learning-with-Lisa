const fs = require('fs');
let content = fs.readFileSync('src/components/ExerciseViews.tsx', 'utf-8');

const target = `      const currentLine = dialogue[step];
      const cleanUser = (val || '').toLowerCase().replace(/[.,!¿?¡:;"'()]/g, '').trim();
      const cleanCorrect = currentLine.eng.toLowerCase().replace(/[.,!¿?¡:;"'()]/g, '').trim();`;

const replacement = `      const currentLine = dialogue[step];
      const cleanText = (s: string) => {
         let t = (s ? String(s).toLowerCase() : '');
         t = t.replace(/[‘’]/g, "'");
         t = t.replace(/\b(i'm|im)\b/g, "i am");
         t = t.replace(/\b(he's|hes)\b/g, "he is");
         t = t.replace(/\b(she's|shes)\b/g, "she is");
         t = t.replace(/\b(it's|its)\b/g, "it is");
         t = t.replace(/\b(we're|were)\b/g, "we are");
         t = t.replace(/\b(they're|theyre)\b/g, "they are");
         t = t.replace(/\b(can't|cant)\b/g, "can not");
         t = t.replace(/\b(cannot)\b/g, "can not");
         t = t.replace(/\b(isn't|isnt)\b/g, "is not");
         t = t.replace(/\b(aren't|arent)\b/g, "are not");
         t = t.replace(/\b(don't|dont)\b/g, "do not");
         t = t.replace(/[.,!¿?¡:;"'()]/g, '');
         t = t.replace(/\\s+/g, ' ');
         return t.trim();
      };
      const cleanUser = cleanText(val);
      const cleanCorrect = cleanText(currentLine.eng);`;

content = content.replace(target, replacement);

fs.writeFileSync('src/components/ExerciseViews.tsx', content);
