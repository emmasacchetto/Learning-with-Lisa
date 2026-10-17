const fs = require('fs');
let content = fs.readFileSync('src/App.tsx', 'utf-8');

// Add splitNodesByMode state
if (!content.includes('const [splitNodesByMode, setSplitNodesByMode]')) {
    content = content.replace(
        'const [progressionStyle, setProgressionStyle] = useState(() => localStorage.getItem(\'lisa_progressionStyle\') || \'interleaved\');',
        'const [progressionStyle, setProgressionStyle] = useState(() => localStorage.getItem(\'lisa_progressionStyle\') || \'interleaved\');\n  const [splitNodesByMode, setSplitNodesByMode] = useState(() => localStorage.getItem(\'lisa_splitNodesByMode\') === \'true\');'
    );
    content = content.replace(
        'useEffect(() => { localStorage.setItem(\'lisa_progressionStyle\', progressionStyle); }, [progressionStyle]);',
        'useEffect(() => { localStorage.setItem(\'lisa_progressionStyle\', progressionStyle); }, [progressionStyle]);\n  useEffect(() => { localStorage.setItem(\'lisa_splitNodesByMode\', splitNodesByMode.toString()); }, [splitNodesByMode]);'
    );
}

// Update the checkbox in Settings
const settingsBlock = `                  {enableMultiModalProgression && (<>
                    <div className="flex justify-between items-center mb-3 border-t border-indigo-200 dark:border-slate-800 pt-3">
                      <span className="font-bold text-gray-800 dark:text-slate-200 text-sm">Estilo de Progresión</span>
                      <select value={progressionStyle} onChange={(e) => setProgressionStyle(e.target.value)} className="p-1.5 rounded bg-indigo-50/30 dark:bg-slate-900/80 border border-indigo-200 dark:border-slate-800 text-xs font-bold text-indigo-900 dark:text-indigo-300">
                         <option value="consecutive">🔁 Por Ejercicio (Consecutivo por frase)</option>
                         <option value="interleaved">🌎 Por Tema/Grupo (Aleatorio nivel a nivel)</option>
                      </select>
                    </div>`;
                    
const newSettingsBlock = `                  {enableMultiModalProgression && (<>
                    <div className="flex justify-between items-center mb-3 border-t border-indigo-200 dark:border-slate-800 pt-3">
                      <span className="font-bold text-gray-800 dark:text-slate-200 text-sm">Estilo de Progresión</span>
                      <select value={progressionStyle} onChange={(e) => setProgressionStyle(e.target.value)} className="p-1.5 rounded bg-indigo-50/30 dark:bg-slate-900/80 border border-indigo-200 dark:border-slate-800 text-xs font-bold text-indigo-900 dark:text-indigo-300">
                         <option value="consecutive">🔁 Por Ejercicio (Consecutivo por frase)</option>
                         <option value="interleaved">🌎 Por Tema/Grupo (Aleatorio nivel a nivel)</option>
                      </select>
                    </div>
                    
                    <div className="flex justify-between items-center mb-3 border-t border-indigo-200 dark:border-slate-800 pt-3">
                      <span className="font-bold text-gray-800 dark:text-slate-200 text-sm">Dividir Nodos por Modo (Hub)</span>
                      <input type="checkbox" checked={splitNodesByMode} onChange={(e) => setSplitNodesByMode(e.target.checked)} className="w-5 h-5 text-indigo-600 dark:text-indigo-300 rounded" />
                    </div>
                    <p className="text-xs text-gray-600 dark:text-slate-300 mb-3">Si está activo, verás un nodo separado para cada modo de entrada en la pantalla principal.</p>`;
content = content.replace(settingsBlock, newSettingsBlock);

fs.writeFileSync('src/App.tsx', content);
