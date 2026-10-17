const fs = require('fs');
let content = fs.readFileSync('src/App.tsx', 'utf-8');

const oldSaveSession = `    if (currentScreen === 'exercise' && queue.length > 0 && activeCategory !== 'Learned') {
      let sessionKey = isMistakeMode ? 'mistakes' : \`\${activeCategory}_\${activeSkill}\`;
      if (activeCategory === 'ByPhrase') sessionKey = \`ByPhrase_\${queue[0]?.eng || 'unknown'}\`;`;

const newSaveSession = `    if (currentScreen === 'exercise' && queue.length > 0 && activeCategory !== 'Learned') {
      let kbModeStr = '';
      if (!isMistakeMode && activeCategory !== 'ByPhrase' && enableMultiModalProgression && splitNodesByMode) {
          const isKb = (t: string) => ['flashcard', 'build_sentence', 'listen_and_write', 'dialogue_chat', 'quiz', 'reading'].includes(t);
          const firstKb = queue.find(ex => isKb(ex.type));
          if (firstKb && firstKb.targetKeyboardMode) kbModeStr = '_' + firstKb.targetKeyboardMode;
      }
      let sessionKey = isMistakeMode ? 'mistakes' : \`\${activeCategory}_\${activeSkill}\${kbModeStr}\`;
      if (activeCategory === 'ByPhrase') sessionKey = \`ByPhrase_\${queue[0]?.eng || 'unknown'}\`;`;

content = content.replace(oldSaveSession, newSaveSession);

const oldDelSession = `                     let sessionKey = isMistakeMode ? 'mistakes' : \`\${activeCategory}_\${activeSkill}\`;
                     if (activeCategory === 'ByPhrase') sessionKey = \`ByPhrase_\${queue[0]?.eng || 'unknown'}\`;
                     
                     setActiveSessions(prev => {`;

const newDelSession = `                     let kbModeStr = '';
                     if (!isMistakeMode && activeCategory !== 'ByPhrase' && enableMultiModalProgression && splitNodesByMode) {
                         const isKb = (t: string) => ['flashcard', 'build_sentence', 'listen_and_write', 'dialogue_chat', 'quiz', 'reading'].includes(t);
                         const firstKb = queue.find(ex => isKb(ex.type));
                         if (firstKb && firstKb.targetKeyboardMode) kbModeStr = '_' + firstKb.targetKeyboardMode;
                     }
                     let sessionKey = isMistakeMode ? 'mistakes' : \`\${activeCategory}_\${activeSkill}\${kbModeStr}\`;
                     if (activeCategory === 'ByPhrase') sessionKey = \`ByPhrase_\${queue[0]?.eng || 'unknown'}\`;
                     
                     setActiveSessions(prev => {`;

content = content.replace(oldDelSession, newDelSession);

fs.writeFileSync('src/App.tsx', content);
