const fs = require('fs');
let code = fs.readFileSync('src/App.tsx', 'utf8');

const startStr = `setToastMsg("Progreso rein`;
const endStr = `{(viewMode === 'path' || viewMode === 'block' || viewMode === 'gallery') ? (() => {\n                     const currentPool = getCategoryPool(activeCategory!);`;

const startIdx = code.indexOf(startStr);
const endIdx = code.indexOf(endStr, startIdx);

if (startIdx !== -1 && endIdx !== -1) {
  const badPart = code.substring(startIdx, endIdx);
  
  const replaceStr = `setToastMsg("Progreso reiniciado 🔄");
                            }} className="p-2 bg-red-50 dark:bg-slate-950 hover:bg-red-100 text-red-500 border border-red-200 rounded-lg transition" title="Reiniciar progreso" disabled={completedCount === 0}>
                               <RefreshCw size={14} />
                            </button>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                  {ALL_DATA.filter((item: any) => (item.eng || "").toLowerCase().includes(phraseSearch.toLowerCase()) || (item.spa || "").toLowerCase().includes(phraseSearch.toLowerCase())).length === 0 && (
                    <p className="text-center text-gray-500 mt-4">No se encontraron resultados.</p>
                  )}
                </div>
              ) : (
                <>
                  `;
                  
  code = code.substring(0, startIdx) + replaceStr + code.substring(endIdx);
  fs.writeFileSync('src/App.tsx', code);
  console.log('Fixed using indexOf!');
} else {
  console.log('Not found:', { startIdx, endIdx });
}
