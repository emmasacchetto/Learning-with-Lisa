const fs = require('fs');
let content = fs.readFileSync('src/components/ExerciseEngine.tsx', 'utf-8');

const modalRegex = /\{showInfoModal && \([\s\S]*?\}\s*<\/div>\s*\)\s*\}\s*<\/div>\s*\)\s*;\s*\}/m;
// Let's just find exactly `{showInfoModal && (` and replace everything to the end of the file.

const endIndex = content.indexOf('{showInfoModal && (');
if (endIndex !== -1) {
  content = content.substring(0, endIndex) + `{showInfoModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-[9999] select-none animate-fade-in">
          <div className="bg-white dark:bg-slate-900 border-2 border-indigo-100 dark:border-indigo-800 dark:border-slate-800 rounded-3xl p-4 w-full max-w-md shadow-2xl flex flex-col gap-4 text-left">
            <div className="flex justify-between items-center border-b border-slate-100 dark:border-slate-800 pb-3">
              <h3 className="text-lg font-extrabold text-indigo-900 dark:text-indigo-200 flex items-center gap-2">
                <span>💡 Guía del Ejercicio</span>
              </h3>
              <button 
                onClick={() => setShowInfoModal(false)}
                className="p-1.5 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full text-slate-400 hover:text-slate-600 transition"
              >
                <XCircle size={20} />
              </button>
            </div>

            <div className="flex items-center gap-2 bg-indigo-50/40 dark:bg-indigo-950/10 p-3 rounded-2xl border border-indigo-100 dark:border-indigo-800/30 dark:border-indigo-900/20">
              <span className="text-4xl animate-bounce">{exercise.emoji || '✨'}</span>
              <div>
                <h4 className="font-extrabold text-indigo-950 dark:text-indigo-200">
                  {skill === 'Módulo Completo' ? exercise.skill : skill}
                </h4>
                <span className="text-[10px] bg-amber-100 dark:bg-amber-950/40 text-amber-800 dark:text-amber-300 px-2 py-0.5 rounded-full font-bold">
                  ⏱️ ~1.5 min por frase
                </span>
              </div>
            </div>

            <div className="space-y-3">
              <div>
                <h5 className="text-xs font-black text-slate-400 uppercase tracking-wider">¿En qué consiste?</h5>
                <div className="flex items-start gap-3 mt-2 bg-indigo-50/50 dark:bg-slate-800/30 p-3 rounded-2xl border border-indigo-100 dark:border-slate-800">
                  <img src="/characters/vera_gentle_1.png" alt="Vera" className="w-16 h-16 object-contain drop-shadow-md" />
                  <p className="text-xs text-slate-700 dark:text-slate-300 font-bold leading-relaxed flex-1">
                  {exercise.type === 'dictation' && "Escucha el dictado fragmentado o completo y escribe exactamente lo que oyes en inglés. ¡Usa los controles de velocidad a tu gusto!"}
                  {exercise.type === 'reading' && "Lee el fragmento en inglés para familiarizarte con su significado y pulsa la palabra para escuchar su pronunciación."}
                  {exercise.type === 'quiz' && "Responde a la pregunta de traducción o de opción múltiple seleccionando la alternativa correcta en inglés o español."}
                  {exercise.type === 'build_sentence' && "Ordena de manera lógica los bloques interactivos de palabras para reconstruir la frase correcta en inglés."}
                  {exercise.type === 'listen_and_write' && "Escucha la pronunciación en inglés y escribe la frase correspondiente utilizando el teclado en pantalla o físico."}
                  {exercise.type === 'speak' && "Activa tu micrófono para leer o traducir la frase en voz alta en inglés. El sistema evaluará tu pronunciación automáticamente."}
                  {exercise.type === 'match' && "Une los pares de tarjetas relacionando cada término o frase en inglés con su traducción equivalente en español."}
                  {exercise.type === 'flashcard' && "Observa la tarjeta de traducción en español y reconstruye la respuesta en inglés ordenando sus letras o palabras."}
                  {(!exercise.type || !['dictation', 'reading', 'quiz', 'build_sentence', 'listen_and_write', 'speak', 'match', 'flashcard'].includes(exercise.type)) && "Practica y consolida tus conocimientos interactivos con esta actividad de aprendizaje guiada."}
                  </p>
                </div>
              </div>

              <div className="border-t border-slate-100 dark:border-slate-800 pt-3">
                <h5 className="text-xs font-black text-slate-400 uppercase tracking-wider mb-2">Vista Previa (Revelar):</h5>
                <div className="flex items-center gap-2 bg-slate-50 dark:bg-slate-800/40 p-3 rounded-xl border border-slate-100 dark:border-slate-800/60 font-semibold text-slate-700 dark:text-slate-300">
                  <span className="text-xl">{exercise.emoji}</span>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-bold text-slate-500">{exercise.spa}</p>
                    <p className="text-sm font-black text-indigo-600 dark:text-indigo-300 mt-0.5 select-none blur-[4px] hover:blur-0 transition duration-300 cursor-pointer" title="Pasa el mouse o mantén presionado para revelar">
                      {exercise.eng}
                    </p>
                    <p className="text-[9px] text-gray-400 mt-0.5">(Pasa el cursor o presiona para revelar la respuesta)</p>
                  </div>
                </div>
              </div>
            </div>

            <button 
              type="button"
              onClick={() => setShowInfoModal(false)}
              className="w-full py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-black rounded-xl border-b-4 border-indigo-800 active:border-b-0 active:translate-y-[2px] transition text-center shadow-md text-xs mt-2"
            >
              Entendido, Continuar Práctica
            </button>
          </div>
        </div>
      )}
    </div>
  );
}`;
}

fs.writeFileSync('src/components/ExerciseEngine.tsx', content);
