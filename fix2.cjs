const fs = require('fs');
let code = fs.readFileSync('src/App.tsx', 'utf8');

const badPart = `                  {(viewMode === 'path' || viewMode === 'block' || viewMode === 'gallery') ? (() => {
                     const currentPool = getCategoryPool(activeCategory!); text-xl shadow-lg border-b-4 border-orange-700 active:border-b-0 active:translate-y-1 flex items-center justify-between">
                     <div className="flex items-center gap-3">
                        <span className="text-3xl">🌪️</span>
                        <div className="text-left">
                           <div>Práctica General (Mix)</div>
                           <div className="text-xs text-orange-100 font-medium">Todos los ejercicios mezclados</div>
                        </div>
                     </div>
                     <PlayCircle size={28} />
                  </button>
                  
`;

if (code.includes(badPart)) {
  code = code.replace(badPart, '');
  fs.writeFileSync('src/App.tsx', code);
  console.log('Fixed again!');
} else {
  console.log('Not found');
}
