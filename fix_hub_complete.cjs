const fs = require('fs');
let content = fs.readFileSync('src/App.tsx', 'utf-8');

const oldComplete = `                           <button onClick={() => {
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
                           }} className="p-2 bg-green-50 dark:bg-green-950/20 hover:bg-green-100 dark:hover:bg-green-900/40 text-green-600 border border-green-200 dark:border-green-900/50 rounded-lg transition active:scale-95" title="Completar todo" disabled={complete}>`;

const newComplete = `                           <button onClick={() => {
                              const isKeyboardLayoutType = (type: string) => ['flashcard', 'build_sentence', 'listen_and_write', 'dialogue_chat', 'quiz', 'reading'].includes(type);
                              let ids: string[] = [];
                              skillExs.forEach(ex => {
                                  if (isKeyboardLayoutType(ex.type) && enableMultiModalProgression) {
                                      if (kbMode) {
                                          ids.push(\`\${ex.baseId || ex.id}_\${kbMode}\`);
                                      } else {
                                          activeModes.forEach(mode => ids.push(\`\${ex.baseId || ex.id}_\${mode}\`));
                                      }
                                  } else {
                                      ids.push(ex.id);
                                  }
                              });
                              setCompletedExIds(prev => [...new Set([...prev, ...ids])]);
                              setToastMsg(\`¡Habilidad "\${SKILL_LABELS[skill]}" completada! 🎉\`);
                           }} className="p-2 bg-green-50 dark:bg-green-950/20 hover:bg-green-100 dark:hover:bg-green-900/40 text-green-600 border border-green-200 dark:border-green-900/50 rounded-lg transition active:scale-95" title="Completar todo" disabled={complete}>`;

content = content.replace(oldComplete, newComplete);

const oldReset = `                           <button onClick={() => {
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
                           }} className="p-2 bg-red-50 dark:bg-slate-950 hover:bg-red-100 text-red-500 border border-red-200 rounded-lg transition active:scale-95" title="Reiniciar progreso" disabled={completedCount === 0}>`;

const newReset = `                           <button onClick={() => {
                              const isKeyboardLayoutType = (type: string) => ['flashcard', 'build_sentence', 'listen_and_write', 'dialogue_chat', 'quiz', 'reading'].includes(type);
                              let ids: string[] = [];
                              const baseIds = skillExs.map(ex => ex.baseId || ex.id);
                              skillExs.forEach(ex => {
                                  if (isKeyboardLayoutType(ex.type) && enableMultiModalProgression) {
                                      if (kbMode) {
                                          ids.push(\`\${ex.baseId || ex.id}_\${kbMode}\`);
                                      } else {
                                          activeModes.forEach(mode => ids.push(\`\${ex.baseId || ex.id}_\${mode}\`));
                                      }
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
                           }} className="p-2 bg-red-50 dark:bg-slate-950 hover:bg-red-100 text-red-500 border border-red-200 rounded-lg transition active:scale-95" title="Reiniciar progreso" disabled={completedCount === 0}>`;

content = content.replace(oldReset, newReset);

fs.writeFileSync('src/App.tsx', content);
