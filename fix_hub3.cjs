const fs = require('fs');
let content = fs.readFileSync('src/App.tsx', 'utf-8');

const oldCardInner = `                              <div className="flex items-center gap-2">
                                <span className="font-bold text-lg text-slate-800 leading-tight">{SKILL_LABELS[skill]}</span>
                                {complete && <CheckCircle2 size={16} className="text-green-500" />}
                              </div>
                              {viewMode === 'card' && <p className="text-[11px] text-slate-500 font-medium line-clamp-1">{SKILL_TIPS[skill]}</p>}
                           </div>
                           <div className="flex-shrink-0 text-right flex flex-col items-end gap-1">
                             <span className={\`font-black text-sm \${complete ? 'text-green-600' : 'text-indigo-500 dark:text-indigo-400'}\`}>{completedCount}/{total}</span>
                             {inProgressData && (
                               <span className="text-[9px] bg-amber-100 text-amber-700 px-1.5 py-0.5 rounded-md font-bold text-nowrap">
                                 ⏳ Retomar
                               </span>
                             )}
                           </div>
                         </div>
                         
                         <div className="flex gap-1.5 pt-2 border-t border-slate-100">
                           <button onClick={() => startSkillPractice(skill)} className={\`flex-1 p-2 rounded-lg flex items-center justify-center gap-1 font-bold text-xs transition active:scale-95 \${complete ? 'bg-green-500 hover:bg-green-600 text-white' : getSkillButtonColor(skill)}\`}>
                              <Play size={14} className="fill-current"/> Practicar
                           </button>
                           
                           <button onClick={() => { setStatsCategoryFilter(activeCategory); setStatsSkillFilter(skill); setCurrentScreen('stats'); }} className="p-2 bg-slate-50 dark:bg-slate-950 hover:bg-slate-100 text-slate-600 border border-slate-200 dark:border-slate-700 rounded-lg transition active:scale-95" title="Estadísticas">
                             <BarChart2 size={14} />
                           </button>
                           
                           <button onClick={() => {
                              const ids = skillExs.map(ex => ex.id);
                              setCompletedExIds(prev => [...new Set([...prev, ...ids])]);
                              setToastMsg(\`¡Habilidad "\${SKILL_LABELS[skill]}" completada! 🎉\`);
                           }} className="p-2 bg-green-50 dark:bg-green-950/20 hover:bg-green-100 dark:hover:bg-green-900/40 text-green-600 border border-green-200 dark:border-green-900/50 rounded-lg transition active:scale-95" title="Completar todo" disabled={complete}>
                              <CheckCircle2 size={14} />
                           </button>
                           
                           <button onClick={() => {
                              const ids = skillExs.map(ex => ex.id);
                              const baseIds = skillExs.map(ex => ex.baseId || ex.id);
                              setCompletedExIds(prev => prev.filter(id => !ids.includes(id)));
                              setLearnedExIds(prev => prev.filter(id => !baseIds.includes(id)));
                              const sessionKey = \`\${activeCategory}_\${skill}\`;
                              const updatedSessions = { ...activeSessions };
                              delete updatedSessions[sessionKey];
                              setActiveSessions(updatedSessions);
                              setToastMsg("Progreso reiniciado 🔄");
                           }} className="p-2 bg-red-50 dark:bg-slate-950 hover:bg-red-100 text-red-500 border border-red-200 rounded-lg transition active:scale-95" title="Reiniciar progreso" disabled={completedCount === 0}>
                              <RefreshCw size={14} />
                           </button>`;

const newCardInner = `                              <div className="flex flex-col">
                                <div className="flex items-center gap-2">
                                  <span className="font-bold text-lg text-slate-800 leading-tight">{SKILL_LABELS[skill]}</span>
                                  {complete && <CheckCircle2 size={16} className="text-green-500" />}
                                </div>
                                {kbLabel && <span className="text-[10px] uppercase font-black tracking-wider opacity-70 mt-0.5">{kbLabel}</span>}
                              </div>
                              {viewMode === 'card' && <p className="text-[11px] text-slate-500 font-medium line-clamp-1 mt-1">{SKILL_TIPS[skill]}</p>}
                           </div>
                           <div className="flex-shrink-0 text-right flex flex-col items-end gap-1">
                             <span className={\`font-black text-sm \${complete ? 'text-green-600' : 'text-indigo-500 dark:text-indigo-400'}\`}>{completedCount}/{total}</span>
                             {inProgressData && (
                               <span className="text-[9px] bg-amber-100 text-amber-700 px-1.5 py-0.5 rounded-md font-bold text-nowrap">
                                 ⏳ Retomar
                               </span>
                             )}
                           </div>
                         </div>
                         
                         <div className="flex gap-1.5 pt-2 border-t border-slate-100">
                           <button onClick={() => startSkillPractice(skill, activeCategory, kbMode)} className={\`flex-1 p-2 rounded-lg flex items-center justify-center gap-1 font-bold text-xs transition active:scale-95 \${complete ? 'bg-green-500 hover:bg-green-600 text-white' : getSkillButtonColor(skill)}\`}>
                              <Play size={14} className="fill-current"/> Practicar
                           </button>
                           
                           <button onClick={() => { setStatsCategoryFilter(activeCategory); setStatsSkillFilter(skill); setCurrentScreen('stats'); }} className="p-2 bg-slate-50 dark:bg-slate-950 hover:bg-slate-100 text-slate-600 border border-slate-200 dark:border-slate-700 rounded-lg transition active:scale-95" title="Estadísticas">
                             <BarChart2 size={14} />
                           </button>
                           
                           <button onClick={() => {
                              const isKeyboardLayoutType = (type) => ['flashcard', 'build_sentence', 'listen_and_write', 'dialogue_chat', 'quiz', 'reading'].includes(type);
                              let ids = [];
                              skillExs.forEach(ex => {
                                  if (kbMode && isKeyboardLayoutType(ex.type)) {
                                      ids.push(\`\${ex.baseId || ex.id}_\${kbMode}\`);
                                  } else {
                                      ids.push(ex.id);
                                  }
                              });
                              setCompletedExIds(prev => [...new Set([...prev, ...ids])]);
                              setToastMsg(\`¡Habilidad "\${SKILL_LABELS[skill]}" completada! 🎉\`);
                           }} className="p-2 bg-green-50 dark:bg-green-950/20 hover:bg-green-100 dark:hover:bg-green-900/40 text-green-600 border border-green-200 dark:border-green-900/50 rounded-lg transition active:scale-95" title="Completar todo" disabled={complete}>
                              <CheckCircle2 size={14} />
                           </button>
                           
                           <button onClick={() => {
                              const isKeyboardLayoutType = (type) => ['flashcard', 'build_sentence', 'listen_and_write', 'dialogue_chat', 'quiz', 'reading'].includes(type);
                              let ids = [];
                              const baseIds = skillExs.map(ex => ex.baseId || ex.id);
                              skillExs.forEach(ex => {
                                  if (kbMode && isKeyboardLayoutType(ex.type)) {
                                      ids.push(\`\${ex.baseId || ex.id}_\${kbMode}\`);
                                  } else {
                                      ids.push(ex.id);
                                  }
                              });
                              setCompletedExIds(prev => prev.filter(id => !ids.includes(id)));
                              if (!kbMode) {
                                  setLearnedExIds(prev => prev.filter(id => !baseIds.includes(id)));
                              }
                              const sKey = kbMode ? \`\${activeCategory}_\${skill}_\${kbMode}\` : \`\${activeCategory}_\${skill}\`;
                              const updatedSessions = { ...activeSessions };
                              delete updatedSessions[sKey];
                              setActiveSessions(updatedSessions);
                              setToastMsg("Progreso reiniciado 🔄");
                           }} className="p-2 bg-red-50 dark:bg-slate-950 hover:bg-red-100 text-red-500 border border-red-200 rounded-lg transition active:scale-95" title="Reiniciar progreso" disabled={completedCount === 0}>
                              <RefreshCw size={14} />
                           </button>`;

content = content.replace(oldCardInner, newCardInner);
fs.writeFileSync('src/App.tsx', content);
