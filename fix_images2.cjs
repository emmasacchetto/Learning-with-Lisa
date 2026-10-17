const fs = require('fs');

function fixApp() {
    let content = fs.readFileSync('src/App.tsx', 'utf-8');
    content = content.replace(/vera_waving_1\.png/g, 'Vera_Colibrí_saying_hello_202607131416.png');
    content = content.replace(/vera_gentle_1\.png/g, 'Vera_Colibrí_saying_hello_202607131416__1.png');
    fs.writeFileSync('src/App.tsx', content);
}

function fixEngine() {
    let content = fs.readFileSync('src/components/ExerciseEngine.tsx', 'utf-8');
    
    // Replace guide image
    content = content.replace(/vera_gentle_1\.png/g, 'Vera_Colibrí_saying_hello_202607131416__2.png');
    
    // Replace arrays using regex since we don't know the exact indentation format
    const oldPosRegex = /const POSITIVE_FEEDBACK_IMAGES = \[[\s\S]*?\];/;
    const newPos = `const POSITIVE_FEEDBACK_IMAGES = [
    '/characters/Hummingbird_saying____Muy_Bien____202607131417.png',
    '/characters/Hummingbird_saying____Muy_Bien____202607131417__1.png',
    '/characters/Hummingbird_saying____Muy_Bien____202607131417__2.png',
    '/characters/Man_saying__Muy_Bien__202607131420.png',
    '/characters/Person_saying__Muy_Bien__gesture_202607131420__1.png',
    '/characters/Person_saying__Muy_Bien__gesture_202607131420__2.png'
  ];`;
    
    const oldNegRegex = /const NEGATIVE_FEEDBACK_IMAGES = \[[\s\S]*?\];/;
    const newNeg = `const NEGATIVE_FEEDBACK_IMAGES = [
    '/characters/Person_with_hopeful_gestures_whi__202607131420.png',
    '/characters/Person_with_hopeful_gestures_whi__202607131420__1.png',
    '/characters/Person_with_hopeful_gestures_whi__202607131420__2.png',
    '/characters/Vera_Colibrí_hopeful_gestures_wh__202607131416.png',
    '/characters/Vera_Colibrí_hopeful_gestures_wh__202607131416__1.png',
    '/characters/Vera_Colibrí_hopeful_gestures_wh__202607131417.png'
  ];`;

    content = content.replace(oldPosRegex, newPos);
    content = content.replace(oldNegRegex, newNeg);
    fs.writeFileSync('src/components/ExerciseEngine.tsx', content);
}

fixApp();
fixEngine();
console.log('Fixed characters!');
