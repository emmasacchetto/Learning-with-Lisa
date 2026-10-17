const fs = require('fs');
let content = fs.readFileSync('src/App.tsx', 'utf-8');

// Replace all instances of `(Array.isArray(X) ? X : []).map` with `(X || []).map` to see if the error changes.
content = content.replace(/\(Array\.isArray\((.*?)\) \? \1 : \[\]\)/g, "($1 || [])");

fs.writeFileSync('src/App.tsx', content);
