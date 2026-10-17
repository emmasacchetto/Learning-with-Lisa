const fs = require('fs');
let content = fs.readFileSync('src/components/StatsScreen.tsx', 'utf-8');

// Badges wording update
content = content.replace(/{ id: 'centurion', name: 'Plata: Constante', desc: 'Completa 100 ejercicios', icon: '🥈', threshold: 100, type: 'exercises' }/g, 
  `{ id: 'centurion', name: 'Primeros 100 puntos', desc: 'Completa 100 ejercicios', icon: '🥈', threshold: 100, type: 'exercises' }`);
  
content = content.replace(/{ id: 'streak_7', name: 'Racha Plata', desc: 'Racha de 7 días', icon: '🚀', threshold: 7, type: 'streak' }/g,
  `{ id: 'streak_7', name: 'Racha de 7 días', desc: 'Practica por 7 días seguidos', icon: '🚀', threshold: 7, type: 'streak' }`);

// Add custom tags performance section
const tagsTarget = `</div>
        </div>

        <div className="p-6">`;
        
const tagsReplacement = `</div>
        </div>

        <div className="p-6">
          {activeTab === 'overview' && stats.tagStats && Object.keys(stats.tagStats).length > 0 && (
            <div className="bg-white dark:bg-slate-900 border border-indigo-100 dark:border-slate-800 rounded-3xl p-6 shadow-sm mb-6">
              <h3 className="text-lg font-black text-indigo-900 dark:text-indigo-200 mb-4 flex items-center gap-2"><span>🏷️</span> Rendimiento por Etiquetas Personalizadas</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {Object.entries(stats.tagStats).map(([tag, data]: any) => {
                  const tagAcc = data.attempted > 0 ? Math.round((data.correct / data.attempted) * 100) : 0;
                  return (
                    <div key={tag} className="flex justify-between items-center bg-indigo-50/50 dark:bg-slate-800/40 p-4 rounded-2xl border border-indigo-100/50 dark:border-slate-700/50">
                      <div>
                        <div className="font-bold text-slate-800 dark:text-slate-200 text-sm">{tag}</div>
                        <div className="text-[10px] font-bold text-slate-500 mt-0.5">{data.correct} aciertos / {data.attempted} fallos</div>
                      </div>
                      <div className="flex flex-col items-end">
                        <div className={\`font-black text-lg \${tagAcc >= 80 ? 'text-green-600 dark:text-green-400' : tagAcc >= 50 ? 'text-amber-500 dark:text-amber-400' : 'text-red-500 dark:text-red-400'}\`}>
                          {tagAcc}%
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}`;
          
content = content.replace(tagsTarget, tagsReplacement);

fs.writeFileSync('src/components/StatsScreen.tsx', content);
