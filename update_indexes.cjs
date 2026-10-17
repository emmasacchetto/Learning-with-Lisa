const fs = require('fs');
let code = fs.readFileSync('src/App.tsx', 'utf8');

// We need to add "byUnit" mapping or adjust the grouping view.
// Let's first search how "byYearSource" is populated.
