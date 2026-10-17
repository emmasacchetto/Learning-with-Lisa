const fs = require('fs');
let content = fs.readFileSync('src/App.tsx', 'utf-8');

const oldMap = `                     <div className={\`grid \${viewMode === 'list' ? 'grid-cols-1' : viewMode === 'gallery' ? 'grid-cols-2 md:grid-cols-3' : 'grid-cols-1'} gap-4 w-full\`}>
                        {(Array.isArray(skillOrder) ? skillOrder : []).map(skill => {
                           const currentPool = getCategoryPool(activeCategory!);
                           const hasSkill = currentPool.some(ex => ex.skill === skill);
                           if (!hasSkill) return null;
                           const complete = isSkillCompleted(activeCategory!, skill);
                           if (!showCompleted && complete && activeCategory !== 'Learned') return null;
                           
                           const inProgressData = activeSessions[\`\${activeCategory}_\${skill}\`];
                           const skillExs = currentPool.filter(ex => ex.skill === skill);
                           const total = skillExs.length;
                           const completedCount = skillExs.filter(ex => completedExIds.includes(ex.id) || learnedExIds.includes(ex.baseId || ex.id)).length;
                           
                           return (


                       <div key={skill} className={\`p-4 rounded-2xl border-2 flex flex-col justify-between shadow-sm transition hover:shadow-md \${complete ? 'bg-green-50 dark:bg-green-950/20 border-green-200 dark:border-green-900/50' : getCardStyle('skill', skill)}\`}>
                         <div className="flex items-center gap-3 w-full mb-3">`;

const newMap = `                     <div className={\`grid \${viewMode === 'list' ? 'grid-cols-1' : viewMode === 'gallery' ? 'grid-cols-2 md:grid-cols-3' : 'grid-cols-1'} gap-4 w-full\`}>
                        {(() => {
                           const nodes: any[] = [];
                           const activeModes = keyboardOrder.filter(kb => (Array.isArray(allowedKeyboards) ? allowedKeyboards : []).includes(kb));
                           
                           (Array.isArray(skillOrder) ? skillOrder : []).forEach(skill => {
                              const currentPool = getCategoryPool(activeCategory!);
                              const skillExs = currentPool.filter(ex => ex.skill === skill);
                              if (skillExs.length === 0) return;
                              
                              const isKeyboardLayoutType = (type: string) => ['flashcard', 'build_sentence', 'listen_and_write', 'dialogue_chat', 'quiz', 'reading'].includes(type);
                              const supportsKeyboard = skillExs.some(ex => isKeyboardLayoutType(ex.type));
                              
                              if (enableMultiModalProgression && splitNodesByMode && supportsKeyboard) {
                                  activeModes.forEach((kbMode, idx) => {
                                      nodes.push({ skill, kbMode, idx, skillExs });
                                  });
                              } else {
                                  nodes.push({ skill, skillExs });
                              }
                           });
                           
                           return nodes.map((node, i) => {
                              const { skill, kbMode, idx, skillExs } = node;
                              
                              const getKbCompletionStats = (pool: any[], targetKbMode?: string) => {
                                  let completed = 0;
                                  let totalCount = 0;
                                  const seenBases = new Set<string>();
                                  const baseExs: any[] = [];
                                  pool.forEach(ex => {
                                      const baseKey = ex.baseId || ex.id;
                                      if (!seenBases.has(baseKey)) { seenBases.add(baseKey); baseExs.push(ex); }
                                  });
                                  
                                  const isKeyboardLayoutType = (type: string) => ['flashcard', 'build_sentence', 'listen_and_write', 'dialogue_chat', 'quiz', 'reading'].includes(type);
                                  
                                  baseExs.forEach(ex => {
                                      const baseKey = ex.baseId || ex.id;
                                      if (learnedExIds.includes(baseKey)) {
                                          if (isKeyboardLayoutType(ex.type)) {
                                              if (targetKbMode) { totalCount++; completed++; }
                                              else { totalCount += activeModes.length; completed += activeModes.length; }
                                          } else {
                                              totalCount++; completed++;
                                          }
                                      } else if (isKeyboardLayoutType(ex.type)) {
                                          if (targetKbMode) {
                                              totalCount++;
                                              if (completedExIds.includes(\`\${baseKey}_\${targetKbMode}\`)) completed++;
                                          } else {
                                              activeModes.forEach(mode => {
                                                  totalCount++;
                                                  if (completedExIds.includes(\`\${baseKey}_\${mode}\`)) completed++;
                                              });
                                          }
                                      } else {
                                          totalCount++;
                                          if (completedExIds.includes(ex.id)) completed++;
                                      }
                                  });
                                  return { completed, total: totalCount };
                              };

                              const stats = enableMultiModalProgression ? getKbCompletionStats(skillExs, kbMode) : getCompletionStats(skillExs);
                              const total = stats.total;
                              const completedCount = stats.completed;
                              const complete = total > 0 && completedCount === total;
                              
                              if (!showCompleted && complete && activeCategory !== 'Learned') return null;
                              
                              const sessionKey = kbMode ? \`\${activeCategory}_\${skill}_\${kbMode}\` : \`\${activeCategory}_\${skill}\`;
                              const inProgressData = activeSessions[sessionKey];
                              
                              let kbLabel = '';
                              if (kbMode) {
                                  const opt = KEYBOARD_OPTIONS.find(o => o.id === kbMode);
                                  kbLabel = opt ? opt.label : kbMode;
                              }
                              
                              const baseStyle = complete ? 'bg-green-50 dark:bg-green-950/20 border-green-200 dark:border-green-900/50' : getCardStyle('skill', skill);
                              let cardStyle = baseStyle;
                              if (kbMode && !complete) {
                                  // Apply a slight opacity to indicate subdivision
                                  const opacityValues = ['opacity-100', 'opacity-90', 'opacity-80', 'opacity-70', 'opacity-60', 'opacity-50'];
                                  const opacityClass = opacityValues[Math.min(idx, opacityValues.length - 1)];
                                  cardStyle = \`\${baseStyle} \${opacityClass}\`;
                              }

                              return (


                       <div key={\`\${skill}_\${kbMode || 'all'}\`} className={\`p-4 rounded-2xl border-2 flex flex-col justify-between shadow-sm transition hover:shadow-md \${cardStyle}\`}>
                         <div className="flex items-center gap-3 w-full mb-3">`;

content = content.replace(oldMap, newMap);
fs.writeFileSync('src/App.tsx', content);
