const fs = require('fs');
let code = fs.readFileSync('src/App.tsx', 'utf8');

// Fix the w-full w-full
code = code.replace(/<div className="w-full w-full bg-slate-50 dark:bg-slate-950 shadow-2xl h-full flex flex-col overflow-hidden relative">/, 
  '<div className="w-[clamp(320px,100vw,100vw)] md:w-[clamp(320px,98vw,1600px)] bg-slate-50 dark:bg-slate-950 shadow-2xl h-full flex flex-col overflow-hidden relative mx-auto">');

// Fix the outer container to use dvh and dvw
code = code.replace(/<div className="h-screen max-h-screen bg-slate-100 dark:bg-black font-sans text-gray-800 dark:text-slate-200 flex justify-center overflow-hidden">/,
  '<div className="h-[100dvh] w-[100dvw] bg-slate-100 dark:bg-black font-sans text-gray-800 dark:text-slate-200 flex justify-center overflow-hidden">');

// Make home screen responsive
code = code.replace(
  /<div className="flex-1 p-6 flex flex-col items-center overflow-y-auto">/g,
  '<div className="flex-1 p-[clamp(1rem,3vw,2rem)] flex flex-col items-center overflow-y-auto w-full max-w-[clamp(320px,95vw,1400px)] mx-auto">'
);

// Make skill_select responsive
code = code.replace(
  /<div className="flex-1 p-6 flex flex-col items-center overflow-y-auto bg-slate-50 dark:bg-slate-950">/g,
  '<div className="flex-1 p-[clamp(1rem,3vw,2rem)] flex flex-col items-center overflow-y-auto bg-slate-50 dark:bg-slate-950 w-full max-w-[clamp(320px,95vw,1400px)] mx-auto">'
);

// Make customize screen wrapper use clamp
code = code.replace(
  /<div className="w-full max-w-7xl mx-auto flex flex-col h-full">/g,
  '<div className="w-full max-w-[clamp(320px,95vw,1400px)] mx-auto flex flex-col h-full">'
);

fs.writeFileSync('src/App.tsx', code);
console.log('Done responsive wrapper');
