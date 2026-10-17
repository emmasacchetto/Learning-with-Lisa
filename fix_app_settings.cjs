const fs = require('fs');
let content = fs.readFileSync('src/App.tsx', 'utf-8');

const target = `                  <div className="border-t border-indigo-200 dark:border-slate-800 pt-3 mb-4">
                    <span className="font-bold text-gray-800 dark:text-slate-200 text-sm block mb-2">Modos Permitidos y Jerarquía</span>`;

const replacement = `                  <div className="border-t border-indigo-200 dark:border-slate-800 pt-3 mb-4">
                    <span className="font-bold text-gray-800 dark:text-slate-200 text-sm block mb-2">Modos Permitidos y Jerarquía</span>
                    <div className="flex justify-between items-center bg-indigo-50 dark:bg-slate-900/60 p-3 rounded-xl border border-indigo-100 dark:border-slate-800 mb-3 shadow-sm">
                      <span className="font-bold text-gray-800 dark:text-slate-200 text-sm">Escritura Libre Siempre Activa</span>
                      <input type="checkbox" checked={alwaysAllowFreeKeyboard} onChange={(e) => setAlwaysAllowFreeKeyboard(e.target.checked)} className="w-5 h-5 text-indigo-600 dark:text-indigo-400 rounded shrink-0" />
                    </div>
                    <p className="text-[10px] text-gray-500 dark:text-slate-400 mb-3 -mt-2 leading-tight">Si está activado, el modo "Teclado Libre" estará siempre disponible. Se activará automáticamente si comienzas a escribir con un teclado físico.</p>`;

content = content.replace(target, replacement);

fs.writeFileSync('src/App.tsx', content);
