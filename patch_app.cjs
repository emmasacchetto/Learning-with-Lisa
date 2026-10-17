const fs = require('fs');
let code = fs.readFileSync('src/App.tsx', 'utf8');

// 1. Add state for syncAudioAdvance
const enableClickSavingsHook = "const [enableClickSavings, setEnableClickSavings] = useState(() => JSON.parse(localStorage.getItem('lisa_click_savings') ?? 'true'));";
const enableClickSavingsHookRepl = enableClickSavingsHook + "\n  const [syncAudioAdvance, setSyncAudioAdvance] = useState(() => JSON.parse(localStorage.getItem('lisa_syncAudioAdvance') ?? 'false'));";
code = code.replace(enableClickSavingsHook, enableClickSavingsHookRepl);

// 2. Add useEffect for syncAudioAdvance
const enableClickSavingsEffect = "useEffect(() => {\n    localStorage.setItem('lisa_click_savings', JSON.stringify(enableClickSavings));\n  }, [enableClickSavings]);";
const enableClickSavingsEffectRepl = enableClickSavingsEffect + "\n\n  useEffect(() => {\n    localStorage.setItem('lisa_syncAudioAdvance', JSON.stringify(syncAudioAdvance));\n  }, [syncAudioAdvance]);";
code = code.replace(enableClickSavingsEffect, enableClickSavingsEffectRepl);

// 3. Add UI toggle
const hidePositiveFeedbackUI = `<div className="flex justify-between items-center mb-1 border-t border-indigo-100 dark:border-slate-800 pt-3">\n                      <span className="font-bold text-gray-800 dark:text-slate-200 text-sm">Ocultar feedback positivo</span>`;
const syncAudioUI = `<div className="flex justify-between items-center mb-1 border-t border-indigo-100 dark:border-slate-800 pt-3">
                      <span className="font-bold text-gray-800 dark:text-slate-200 text-sm">Esperar al audio para avanzar</span>
                      <input type="checkbox" checked={syncAudioAdvance} onChange={(e) => setSyncAudioAdvance(e.target.checked)} className="w-6 h-6 text-indigo-600 dark:text-indigo-300 rounded" />
                    </div>
                    <p className="text-xs text-gray-600 dark:text-slate-400 mb-3">Si está activado, el avance automático esperará a que termine la reproducción de voz antes de continuar al siguiente ejercicio.</p>
                    `;
code = code.replace(hidePositiveFeedbackUI, syncAudioUI + hidePositiveFeedbackUI);

// 4. Pass prop to ExerciseEngine
const clickSavingsProp = "clickSavings={enableClickSavings}";
const clickSavingsPropRepl = clickSavingsProp + "\n                syncAudioAdvance={syncAudioAdvance}";
code = code.replace(clickSavingsProp, clickSavingsPropRepl);

// 5. Add handleCopyPrompt function
const handleConfigureCustomizeDef = "const handleConfigureCustomize = (item: { id: string, type: 'year' | 'source' | 'theme' | 'skill' }) => {";
const handleCopyPromptFunc = `
  const handleCopyPrompt = (themeName: string) => {
    const prompt = \`Actúa como mi compañero de práctica de inglés. 
Vamos a conversar (hablando o por escrito) estrictamente sobre el siguiente tema: "\${themeName}".
Por favor, apégate de forma rigurosa a este tema. No introduzcas vocabulario avanzado ni te salgas de este contexto para asegurar que solo practique lo que he aprendido en esta unidad.
Hazme preguntas cortas, sencillas y de a una por vez para que yo pueda responder. 
Mi nivel es básico/principiante.
Si cometo un error en mis respuestas, corrígeme de forma amable, corta y concisa, y luego hazme la siguiente pregunta relacionada con el tema.
¡Empecemos! Hazme la primera pregunta.\`;
    navigator.clipboard.writeText(prompt).then(() => {
      setToastMsg(\`¡Prompt de \${themeName} copiado al portapapeles! 📋 (Pégalo en Gemini)\`);
    }).catch(err => {
      console.error('Error al copiar: ', err);
      setToastMsg('Error al copiar el prompt.');
    });
  };
`;
code = code.replace(handleConfigureCustomizeDef, handleCopyPromptFunc + "\n  " + handleConfigureCustomizeDef);

// 6. Add "Copy Prompt" buttons (where handleConfigureCustomize is used for themes)
// Search for: onClick={() => handleConfigureCustomize(theme)}
const customizeBtn1 = `onClick={() => handleConfigureCustomize(theme)}`;
const newBtns1 = `onClick={() => handleCopyPrompt(theme.name)}
                                className="p-2 bg-indigo-50/30 dark:bg-slate-900 hover:bg-blue-50 dark:hover:bg-slate-700 border border-blue-200 dark:border-blue-800 dark:border-slate-700 text-blue-700 dark:text-blue-450 rounded-xl transition active:scale-95 flex items-center justify-center mr-2"
                                title="Copiar Prompt de Conversación AI"
                              >
                                📋
                              </button>
                              <button
                                ` + customizeBtn1;
// Replace only the ones that use `theme` (since `item` could be a skill in `handleConfigureCustomize(item)`)
code = code.replace(/onClick=\{\(\) => handleConfigureCustomize\(theme\)\}/g, newBtns1);

// Let's also check for the customized ones that use `cat` like handleConfigureCustomize({ id: cat, name: cat, emoji: catEmoji, type: 'theme', exerciseIds: pool.map((ex: any) => ex.id) } as any)
const customizeBtn2Str = `onClick={() => handleConfigureCustomize({ id: cat, name: cat, emoji: catEmoji, type: 'theme', exerciseIds: pool.map((ex: any) => ex.id) } as any)}`;
const newBtns2 = `onClick={() => handleCopyPrompt(cat)}
                                className="p-2 bg-indigo-50/30 dark:bg-slate-900 hover:bg-blue-50 dark:hover:bg-slate-700 border border-blue-200 dark:border-blue-800 dark:border-slate-700 text-blue-700 dark:text-blue-450 rounded-xl transition active:scale-95 flex items-center justify-center mr-2"
                                title="Copiar Prompt de Conversación AI"
                              >
                                📋
                              </button>
                              <button
                                ` + customizeBtn2Str;
code = code.replace(customizeBtn2Str, newBtns2);


fs.writeFileSync('src/App.tsx', code);
console.log("App.tsx patched!");
