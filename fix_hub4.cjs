const fs = require('fs');
let content = fs.readFileSync('src/App.tsx', 'utf-8');

const oldStartSkill = `  const startSkillPractice = (skill: string, categoryOverride?: string) => {
    const targetCat = categoryOverride || activeCategory;
    if (categoryOverride) setActiveCategory(categoryOverride);
    setActiveSkill(skill);
    setIsMistakeMode(false);

    const sessionKey = \`\${targetCat}_\${skill}\`;
    if (activeSessions[sessionKey] && targetCat !== 'Learned') {
      const data = activeSessions[sessionKey];
      if (data.queue && data.queue.length > 0 && data.currentIndex < data.queue.length) {
        setQueue(data.queue); setCurrentIndex(data.currentIndex); setScore(data.score);
        setCurrentScreen('exercise');
        return;
      }
    } 

    let pool = getCategoryPool(targetCat!);
    const filteredPool = pool.filter(ex => !excludedExerciseIds.includes(ex.baseId || ex.id));
    if (filteredPool.length > 0) {
      pool = filteredPool;
    }
    if (skill !== 'Mix') pool = pool.filter(ex => ex.skill === skill);
    
    let finalQueue: any[] = [];

    const isKeyboardLayoutType = (type: string) => {
      return ['flashcard', 'build_sentence', 'listen_and_write', 'dialogue_chat', 'quiz', 'reading'].includes(type);
    };

    if (enableMultiModalProgression && activeCategory !== 'Learned') {
      const seenBases = new Set<string>();
      const basePool: any[] = [];
      pool.forEach(ex => {
        const baseKey = ex.baseId || ex.id;
        if (!seenBases.has(baseKey)) {
          seenBases.add(baseKey);
          basePool.push(ex);
        }
      });

      const activeModes = keyboardOrder.filter(kb => (Array.isArray(allowedKeyboards) ? allowedKeyboards : []).includes(kb));`;

const newStartSkill = `  const startSkillPractice = (skill: string, categoryOverride?: string, targetKbMode?: string) => {
    const targetCat = categoryOverride || activeCategory;
    if (categoryOverride) setActiveCategory(categoryOverride);
    setActiveSkill(skill);
    setIsMistakeMode(false);

    const sessionKey = targetKbMode ? \`\${targetCat}_\${skill}_\${targetKbMode}\` : \`\${targetCat}_\${skill}\`;
    if (activeSessions[sessionKey] && targetCat !== 'Learned') {
      const data = activeSessions[sessionKey];
      if (data.queue && data.queue.length > 0 && data.currentIndex < data.queue.length) {
        setQueue(data.queue); setCurrentIndex(data.currentIndex); setScore(data.score);
        setCurrentScreen('exercise');
        return;
      }
    } 

    let pool = getCategoryPool(targetCat!);
    const filteredPool = pool.filter(ex => !excludedExerciseIds.includes(ex.baseId || ex.id));
    if (filteredPool.length > 0) {
      pool = filteredPool;
    }
    if (skill !== 'Mix') pool = pool.filter(ex => ex.skill === skill);
    
    let finalQueue: any[] = [];

    const isKeyboardLayoutType = (type: string) => {
      return ['flashcard', 'build_sentence', 'listen_and_write', 'dialogue_chat', 'quiz', 'reading'].includes(type);
    };

    if (enableMultiModalProgression && activeCategory !== 'Learned') {
      const seenBases = new Set<string>();
      const basePool: any[] = [];
      pool.forEach(ex => {
        const baseKey = ex.baseId || ex.id;
        if (!seenBases.has(baseKey)) {
          seenBases.add(baseKey);
          basePool.push(ex);
        }
      });

      const activeModes = targetKbMode ? [targetKbMode] : keyboardOrder.filter(kb => (Array.isArray(allowedKeyboards) ? allowedKeyboards : []).includes(kb));`;

content = content.replace(oldStartSkill, newStartSkill);
fs.writeFileSync('src/App.tsx', content);
