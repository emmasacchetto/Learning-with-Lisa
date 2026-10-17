const fs = require('fs');
let content = fs.readFileSync('src/components/ExerciseEngine.tsx', 'utf-8');

const target = `<img src="/characters/vera_gentle_1.png" alt="Vera" className="w-16 h-16 object-contain drop-shadow-md" />
                  <p className="text-xs text-slate-700 dark:text-slate-300 font-bold leading-relaxed flex-1">`;

const replacement = `<img src="/characters/vera_gentle_1.png" alt="Vera" className="w-16 h-16 object-contain drop-shadow-md" />
                  <div className="flex-1 bg-white dark:bg-slate-900 border border-indigo-100 dark:border-slate-700 p-3 rounded-2xl rounded-tl-none shadow-sm relative">
                    <div className="absolute top-0 -left-2 w-3 h-3 bg-white dark:bg-slate-900 border-t border-l border-indigo-100 dark:border-slate-700 transform -skew-x-[30deg]"></div>
                    <p className="text-xs text-slate-700 dark:text-slate-300 font-bold leading-relaxed relative z-10">
                      <span className="text-indigo-600 dark:text-indigo-400 font-black mb-1 block">Vera dice:</span>
                      `;

content = content.replace(target, replacement);

const endTarget = `</p>
                </div>`;

const endReplacement = `</p>
                  </div>
                </div>`;

content = content.replace(endTarget, endReplacement);

fs.writeFileSync('src/components/ExerciseEngine.tsx', content);
