const fs = require('fs');
let content = fs.readFileSync('src/components/ExerciseEngine.tsx', 'utf-8');

const oldImages = `  const POSITIVE_FEEDBACK_IMAGES = [
    '/characters/vera_happy_1.png',
    '/characters/vera_happy_2.png',
    '/characters/vera_happy_3.png',
    '/characters/vera_happy_4.png',
    '/characters/vera_gentle_1.png',
    '/characters/vera_waving_1.png',
    '/characters/vera_waving_2.png',
    '/characters/vera_flying_1.png',
    '/characters/man_happy_1.png',
    '/characters/man_happy_2.png',
    '/characters/man_happy_3.png',
    '/characters/man_happy_4.png',
    '/characters/man_gentle_1.png',
    '/characters/man_gentle_2.png',
    '/characters/man_vera_1.png',
    '/characters/man_vera_2.png',
    '/characters/man_vera_3.png'
  ];`;

const newImages = `  const POSITIVE_FEEDBACK_IMAGES = [
    '/characters/vera_happy_1.png',
    '/characters/vera_happy_2.png',
    '/characters/vera_happy_3.png',
    '/characters/vera_happy_4.png',
    '/characters/vera_gentle_1.png',
    '/characters/vera_waving_1.png',
    '/characters/vera_waving_2.png',
    '/characters/vera_flying_1.png'
  ];`;

content = content.replace(oldImages, newImages);

fs.writeFileSync('src/components/ExerciseEngine.tsx', content);
