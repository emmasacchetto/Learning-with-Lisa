const fs = require('fs');
let code = fs.readFileSync('src/App.tsx', 'utf8');

// Fix SVG container and dimensions
code = code.replace(
  /<div className="flex flex-col items-center gap-6 py-6 w-full max-w-\[400px\] mx-auto relative col-span-full">/,
  '<div className="flex flex-col items-center py-6 w-full max-w-[400px] mx-auto relative col-span-full">'
);

code = code.replace(
  /<svg className="absolute inset-0 pointer-events-none drop-shadow-sm" style={{ width: '100%', height: totalHeight, zIndex: 0 }}>/,
  '<svg className="absolute top-0 left-1/2 -translate-x-1/2 pointer-events-none drop-shadow-sm" style={{ width: "400px", height: "100%", minHeight: totalHeight, zIndex: 0 }}>'
);

// Add height 160px to the node container to fix the stride
code = code.replace(
  /className="relative z-10 flex items-center transition-transform duration-700 ease-in-out hover:scale-105"/,
  'className="relative z-10 flex flex-col items-center transition-transform duration-700 ease-in-out hover:scale-105 h-[160px] justify-start"'
);

fs.writeFileSync('src/App.tsx', code);
console.log("Done");
