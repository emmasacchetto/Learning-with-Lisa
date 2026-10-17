const fs = require('fs');
const content = fs.readFileSync('src/components/ExerciseEngine.tsx', 'utf-8');

const newContent = content.replace(/const handleResult = \([\s\S]*?  const playFeedback =/m, `const handleResult = (userAnswer = '', overrideCorrect: string | null = null) => {
    if (status !== 'playing') return;
    let isCorrect = false;

    if (userAnswer === 'SPECIAL_CORRECT_FLAG') {
        isCorrect = true;
    } else {
        const finalCorrect = overrideCorrect || currentCorrectAnswer;
        if (overrideCorrect) setCurrentCorrectAnswer(overrideCorrect); 
        isCorrect = evaluateAnswer(userAnswer, finalCorrect, exercise.type === 'speak' || exercise.type === 'dialogue_speak' || exercise.type === 'speed_speak' || exercise.type === 'dictation');
    }

    const isFirstTry = !hasAttempted; setHasAttempted(true);
    
    if (exercise.type === 'speed_speak') {
        if (isCorrect) {
             if (onUpdateStats && !isMistakeMode) onUpdateStats(skill, isFirstTry);
             if (isMistakeMode) onRemoveMistake(exercise.id);
             onProceed(true, false);
             return;
        } else {
             if (onUpdateStats && !isMistakeMode) onUpdateStats(skill, false);
             onSaveMistake(exercise);
             onProceed(false, false, 'push_to_end');
             return;
        }
    }

    const moti = isCorrect ? MOTIVATION_RIGHT[Math.floor(Math.random() * MOTIVATION_RIGHT.length)] : MOTIVATION_WRONG[Math.floor(Math.random() * MOTIVATION_WRONG.length)];
    setCurrentMotivation(moti);

    if (isCorrect) {
      setFeedbackImage(POSITIVE_FEEDBACK_IMAGES[Math.floor(Math.random() * POSITIVE_FEEDBACK_IMAGES.length)]);
      setStatus('correct');
      setConsecutiveCorrect(prev => {
        const next = prev + 1;
        localStorage.setItem('lisa_session_streak', next.toString());
        return next;
      });
      if (isMistakeMode) onRemoveMistake(exercise.id); 
      playFeedback(true, moti, exercise.eng);
      if (onUpdateStats && !isMistakeMode) onUpdateStats(skill, isFirstTry);
    } else {
      setFeedbackImage(NEGATIVE_FEEDBACK_IMAGES[Math.floor(Math.random() * NEGATIVE_FEEDBACK_IMAGES.length)]);
      setStatus('wrong_try_again');
      setConsecutiveCorrect(0);
      localStorage.setItem('lisa_session_streak', '0');
      playFeedback(false, moti, exercise.eng);
      if (strictMistakeLogging && !isMistakeMode) {
        onSaveMistake(exercise);
      }
    }
  };

  const playFeedback =`);

fs.writeFileSync('src/components/ExerciseEngine.tsx', newContent);
