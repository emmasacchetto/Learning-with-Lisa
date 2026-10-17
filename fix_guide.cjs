const fs = require('fs');
let content = fs.readFileSync('src/App.tsx', 'utf-8');

const oldGuide = `            <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 w-full max-w-md shadow-2xl relative animate-slide-up" onClick={e => e.stopPropagation()}>
              <h2 className="text-2xl font-black text-indigo-900 dark:text-indigo-200 mb-4 flex items-center gap-2"><span>🧭</span> Guía Rápida</h2>
              <ul className="space-y-4 text-sm font-bold text-slate-700 dark:text-slate-300">`;

const newGuide = `            <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 w-full max-w-md shadow-2xl relative animate-slide-up" onClick={e => e.stopPropagation()}>
              <h2 className="text-2xl font-black text-indigo-900 dark:text-indigo-200 mb-4 flex items-center gap-2"><span>🧭</span> Guía Rápida</h2>
              <div className="flex items-start gap-3 mb-4 bg-indigo-50/50 dark:bg-slate-800/30 p-4 rounded-2xl border border-indigo-100 dark:border-slate-800">
                <img src="/characters/vera_gentle_1.png" alt="Vera" className="w-16 h-16 object-contain drop-shadow-md" />
                <p className="text-sm text-slate-700 dark:text-slate-300 font-bold leading-relaxed flex-1">
                  ¡Hola! Soy Vera. Aquí tienes algunos consejos rápidos para aprovechar al máximo tu experiencia de aprendizaje.
                </p>
              </div>
              <ul className="space-y-4 text-sm font-bold text-slate-700 dark:text-slate-300">`;

content = content.replace(oldGuide, newGuide);

fs.writeFileSync('src/App.tsx', content);
