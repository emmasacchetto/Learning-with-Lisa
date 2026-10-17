const fs = require('fs');

function fixFile(file) {
    let content = fs.readFileSync(file, 'utf-8');
    content = content.replace(/t = t\.replace\(\/\\b\(he'll\|hell\)\\b\/g, "he will"\);/g, "t = t.replace(/\\b(he'll)\\b/g, 'he will');");
    content = content.replace(/t = t\.replace\(\/\\b\(she'll\|shell\)\\b\/g, "she will"\);/g, "t = t.replace(/\\b(she'll)\\b/g, 'she will');");
    content = content.replace(/t = t\.replace\(\/\\b\(we'll\|well\)\\b\/g, "we will"\);/g, "t = t.replace(/\\b(we'll)\\b/g, 'we will');");
    content = content.replace(/t = t\.replace\(\/\\b\(i'll\|ill\)\\b\/g, "i will"\);/g, "t = t.replace(/\\b(i'll)\\b/g, 'i will');");
    content = content.replace(/t = t\.replace\(\/\\b\(i'd\|id\)\\b\/g, "i would"\);/g, "t = t.replace(/\\b(i'd)\\b/g, 'i would');");
    content = content.replace(/t = t\.replace\(\/\\b\(let's\|lets\)\\b\/g, "let us"\);/g, "t = t.replace(/\\b(let's)\\b/g, 'let us');");
    content = content.replace(/t = t\.replace\(\/\\b\(it's\|its\)\\b\/g, "it is"\);/g, "t = t.replace(/\\b(it's)\\b/g, 'it is');");
    fs.writeFileSync(file, content);
}

fixFile('src/components/ExerciseEngine.tsx');
fixFile('src/components/ExerciseViews.tsx');
