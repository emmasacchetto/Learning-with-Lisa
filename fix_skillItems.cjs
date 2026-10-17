const fs = require('fs');
let code = fs.readFileSync('src/App.tsx', 'utf-8');

const oldCode = `                  {(viewMode === 'path' || viewMode === 'block' || viewMode === 'gallery') ? (() => {
                     const currentPool = getCategoryPool(activeCategory!);
                     const skillItems = skillOrder.filter(skill => {
                        const hasSkill = currentPool.some(ex => ex.skill === skill);
                        if (!hasSkill) return false;
                        const complete = isSkillCompleted(activeCategory!, skill);
                        if (!showCompleted && complete && activeCategory !== 'Learned') return false;
                        return true;
                     }).map(skill => {
                        const skillExs = currentPool.filter(ex => ex.skill === skill);
                        return {
                           id: skill,
                           name: SKILL_LABELS[skill] || skill,
                           emoji: SKILL_ICONS[skill] || '📖',
                           type: 'skill',
                           exerciseIds: skillExs.map(ex => ex.id)
                        };
                     });
                     return renderCategoryCards(skillItems as any, (id) => startSkillPractice(id));
                  })() : (`;

const newCode = `                  {(viewMode === 'path' || viewMode === 'block' || viewMode === 'gallery') ? (() => {
                     const currentPool = getCategoryPool(activeCategory!);
                     const skillItems: any[] = [];
                     
                     skillOrder.forEach(skill => {
                        const hasSkill = currentPool.some(ex => ex.skill === skill);
                        if (!hasSkill) return;
                        
                        const skillExs = currentPool.filter(ex => ex.skill === skill);
                        const isKeyboardLayoutType = (type: string) => ['flashcard', 'build_sentence', 'listen_and_write', 'dialogue_chat', 'quiz', 'reading'].includes(type);
                        const supportsKeyboard = skillExs.some(ex => isKeyboardLayoutType(ex.type));
                        const activeModes = keyboardOrder.filter(kb => (allowedKeyboards || []).includes(kb));
                        
                        if (enableMultiModalProgression && splitNodesByMode && supportsKeyboard) {
                           activeModes.forEach((kbMode) => {
                              const opt = KEYBOARD_OPTIONS.find(o => o.id === kbMode);
                              const stat = getKbCompletionStats(skillExs, kbMode);
                              const complete = stat.completed === stat.total && stat.total > 0;
                              
                              if (!showCompleted && complete && activeCategory !== 'Learned') return;
                              
                              skillItems.push({
                                 id: \`\${skill}::\${kbMode}\`,
                                 name: \`\${SKILL_LABELS[skill] || skill} - \${opt ? opt.label : kbMode}\`,
                                 emoji: SKILL_ICONS[skill] || '📖',
                                 type: 'skill',
                                 exerciseIds: skillExs.map(ex => ex.id),
                                 isDoneOverride: complete
                              });
                           });
                        } else {
                           const complete = isSkillCompleted(activeCategory!, skill);
                           if (!showCompleted && complete && activeCategory !== 'Learned') return;
                           
                           skillItems.push({
                              id: skill,
                              name: SKILL_LABELS[skill] || skill,
                              emoji: SKILL_ICONS[skill] || '📖',
                              type: 'skill',
                              exerciseIds: skillExs.map(ex => ex.id),
                              isDoneOverride: complete
                           });
                        }
                     });
                     
                     return renderCategoryCards(skillItems as any, (id) => {
                        if (id.includes('::')) {
                           const [sk, kb] = id.split('::');
                           startSkillPractice(sk, undefined, kb);
                        } else {
                           startSkillPractice(id);
                        }
                     });
                  })() : (`;

code = code.replace(oldCode, newCode);
fs.writeFileSync('src/App.tsx', code);
