const fs = require('fs');
let content = fs.readFileSync('src/App.tsx', 'utf-8');

const target = `<ExerciseEngine 
                key={currentIndex} exercise={queue[currentIndex]} onProceed={(correct: boolean, isKnown: boolean, action?: string) => {`;

const replacement = `
            {(() => {
             let currentTimer = timerSeconds;
             let currentWords = dictationWordsPerChunk;
             if (progressiveDifficulty) {
                 const hitRate = stats.totalAttempted > 5 ? (stats.correctFirstTry / stats.totalAttempted) : 0.5;
                 if (hitRate >= 0.8) { currentTimer = Math.max(5, timerSeconds - 5); currentWords = Math.min(10, dictationWordsPerChunk + 2); }
                 else if (hitRate <= 0.4) { currentTimer = timerSeconds + 5; currentWords = Math.max(2, dictationWordsPerChunk - 1); }
             }
             return (
               <ExerciseEngine 
                key={currentIndex} 
                timerSeconds={currentTimer} 
                dictationWordsPerChunk={currentWords}
                exercise={queue[currentIndex]} onProceed={(correct: boolean, isKnown: boolean, action?: string) => {`;

content = content.replace(target, replacement);

const endTarget = `setQueue={setQueue}
                currentIndex={currentIndex}
                setCurrentIndex={setCurrentIndex}
                dictationWordsPerChunk={dictationWordsPerChunk}
                dictationPauseMs={dictationPauseMs}
                dictationSpeed={dictationSpeed}
                soundEnabled={soundEnabled}
                dataSaverMode={dataSaverMode}
              />`;

const endReplacement = `setQueue={setQueue}
                currentIndex={currentIndex}
                setCurrentIndex={setCurrentIndex}
                dictationPauseMs={dictationPauseMs}
                dictationSpeed={dictationSpeed}
                soundEnabled={soundEnabled}
                dataSaverMode={dataSaverMode}
              />
             );
            })()}`;

content = content.replace(endTarget, endReplacement);
fs.writeFileSync('src/App.tsx', content);
