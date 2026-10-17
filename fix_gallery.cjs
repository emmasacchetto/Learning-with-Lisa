const fs = require('fs');
let code = fs.readFileSync('src/App.tsx', 'utf-8');

// The second instance of "const isDone = completedCount === totalCount && totalCount > 0;" is in gallery view
let parts = code.split("const isDone = completedCount === totalCount && totalCount > 0;");
if (parts.length > 1) {
    code = parts.join("const isDone = item.isDoneOverride !== undefined ? item.isDoneOverride : (completedCount === totalCount && totalCount > 0);");
    fs.writeFileSync('src/App.tsx', code);
}
