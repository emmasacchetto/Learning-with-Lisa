const fs = require('fs');
let content = fs.readFileSync('src/App.tsx', 'utf-8');

const target = `if (skill && skill !== 'Mix' && skill !== 'Repaso General' && skill !== 'Módulo Completo') newStats.skills[skill] = (newStats.skills[skill] || 0) + 1;`;
const replacement = `if (skill && skill !== 'Mix' && skill !== 'Repaso General' && skill !== 'Módulo Completo') newStats.skills[skill] = (newStats.skills[skill] || 0) + 1;
      
      // Update custom tags performance
      if (!newStats.tagStats) newStats.tagStats = {};
      
      // We need the current exercise to get its tags
      // But handleUpdateStats doesn't receive the exercise ID directly, we have queue[currentIndex]
      const currentEx = queue[currentIndex];
      if (currentEx) {
        const baseKey = currentEx.baseId || currentEx.id;
        const cTags = customTags[baseKey] || [];
        cTags.forEach((tag: string) => {
          if (!newStats.tagStats[tag]) newStats.tagStats[tag] = { correct: 0, attempted: 0 };
          newStats.tagStats[tag].attempted += 1;
          if (isCorrectFirstTry) newStats.tagStats[tag].correct += 1;
        });
      }`;

content = content.replace(target, replacement);

const initialStatsTarget = `skills: { Listening: 0, Reading: 0, Speaking: 0, Writing: 0, Flashcards: 0, Translate: 0 }, lastPlayedDate: new Date().toDateString(), streak: 0, history: {} };`;
const initialStatsReplacement = `skills: { Listening: 0, Reading: 0, Speaking: 0, Writing: 0, Flashcards: 0, Translate: 0 }, lastPlayedDate: new Date().toDateString(), streak: 0, history: {}, tagStats: {} };`;

content = content.replace(initialStatsTarget, initialStatsReplacement);

const resetTarget = `skills: { Listening: 0, Reading: 0, Speaking: 0, Writing: 0, Flashcards: 0, Translate: 0 }, lastPlayedDate: new Date().toDateString(), streak: 0 }`;
const resetReplacement = `skills: { Listening: 0, Reading: 0, Speaking: 0, Writing: 0, Flashcards: 0, Translate: 0 }, lastPlayedDate: new Date().toDateString(), streak: 0, history: {}, tagStats: {} }`;

content = content.replace(resetTarget, resetReplacement);

fs.writeFileSync('src/App.tsx', content);
