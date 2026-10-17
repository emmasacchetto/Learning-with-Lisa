const fs = require('fs');
let content = fs.readFileSync('src/components/StatsScreen.tsx', 'utf-8');

content = content.replace(/{data.correct} aciertos \/ {data.attempted} fallos/g, 
  `{data.correct} aciertos / {data.attempted - data.correct} fallos`);

fs.writeFileSync('src/components/StatsScreen.tsx', content);
