const fs = require('fs');
let code = fs.readFileSync('src/App.tsx', 'utf8');

// 1. Add State hooks
const syncAudioAdvanceHook = "const [syncAudioAdvance, setSyncAudioAdvance] = useState(() => JSON.parse(localStorage.getItem('lisa_syncAudioAdvance') ?? 'false'));";
const voiceSpeedsHooks = `
  const [voiceSpeedPrompt, setVoiceSpeedPrompt] = useState(() => parseFloat(localStorage.getItem('lisa_voice_speed_prompt') ?? '0.9'));
  const [voiceSpeedAnswer, setVoiceSpeedAnswer] = useState(() => parseFloat(localStorage.getItem('lisa_voice_speed_answer') ?? '0.9'));
  const [voiceSpeedFeedback, setVoiceSpeedFeedback] = useState(() => parseFloat(localStorage.getItem('lisa_voice_speed_feedback') ?? '1.0'));`;
code = code.replace(syncAudioAdvanceHook, syncAudioAdvanceHook + voiceSpeedsHooks);

// 2. Add useEffects for the hooks
const syncAudioAdvanceEffect = "  useEffect(() => {\n    localStorage.setItem('lisa_syncAudioAdvance', JSON.stringify(syncAudioAdvance));\n  }, [syncAudioAdvance]);";
const voiceSpeedsEffects = `
  useEffect(() => { localStorage.setItem('lisa_voice_speed_prompt', voiceSpeedPrompt.toString()); }, [voiceSpeedPrompt]);
  useEffect(() => { localStorage.setItem('lisa_voice_speed_answer', voiceSpeedAnswer.toString()); }, [voiceSpeedAnswer]);
  useEffect(() => { localStorage.setItem('lisa_voice_speed_feedback', voiceSpeedFeedback.toString()); }, [voiceSpeedFeedback]);`;
code = code.replace(syncAudioAdvanceEffect, syncAudioAdvanceEffect + voiceSpeedsEffects);

// 3. Add to ExerciseEngine props in both places it's rendered
const enginePropsSearch = "syncAudioAdvance={syncAudioAdvance}";
const enginePropsReplace = "syncAudioAdvance={syncAudioAdvance}\n                voiceSpeedPrompt={voiceSpeedPrompt}\n                voiceSpeedAnswer={voiceSpeedAnswer}\n                voiceSpeedFeedback={voiceSpeedFeedback}";
code = code.replace(new RegExp(enginePropsSearch, 'g'), enginePropsReplace);

// 4. Update Parental Gate logic for '220618'
const gateCheckStr = `        if (gateInputVal === '220618') setIsParentalUnlocked(true);`;
const gateCheckRepl = `        if (gateInputVal === '220618') {
          setIsParentalUnlocked(true);
          setSyncAudioAdvance(true);
          setEnableClickSavings(true);
          setVoiceSpeedPrompt(0.9);
          setVoiceSpeedAnswer(0.9);
          setVoiceSpeedFeedback(1.0);
        }`;
code = code.replace(gateCheckStr, gateCheckRepl);

// 5. Add UI sliders in the config modal
const clickSavingsUI = `<p className="text-xs text-gray-600 dark:text-slate-400 mb-3">Si está activado, el avance automático esperará a que termine la reproducción de voz antes de continuar al siguiente ejercicio.</p>
                    </div>`;

// Wait, the UI block for `hidePositiveFeedback` is right after that. Let's find exactly where to inject.
// In the previous step I did:
// const syncAudioUI = `<div className="flex justify-between items-center mb-1 border-t border-indigo-100 dark:border-slate-800 pt-3">...<p...</p>\n                    `;
// code = code.replace(hidePositiveFeedbackUI, syncAudioUI + hidePositiveFeedbackUI);
// So I will inject right before `Ocultar feedback positivo` (hidePositiveFeedback) or at the end of the `⚡ Reducción de Clics` section.
const hidePosFeedbackStr = `<div className="flex justify-between items-center mb-1 border-t border-indigo-100 dark:border-slate-800 pt-3">\n                      <span className="font-bold text-gray-800 dark:text-slate-200 text-sm">Ocultar feedback positivo</span>`;

const speedSlidersUI = `
                    <div className="border-t border-indigo-100 dark:border-slate-800 pt-3 mt-3">
                      <h4 className="font-bold text-gray-800 dark:text-slate-200 text-sm mb-2">Velocidades de Reproducción de Voz</h4>
                      
                      <div className="mb-2">
                        <div className="flex justify-between text-xs font-bold text-slate-500 mb-1">
                          <span>Consigna / Opciones: {voiceSpeedPrompt.toFixed(1)}x</span>
                        </div>
                        <input type="range" min="0.5" max="1.5" step="0.1" value={voiceSpeedPrompt} onChange={e => setVoiceSpeedPrompt(parseFloat(e.target.value))} className="w-full accent-indigo-600" />
                      </div>

                      <div className="mb-2">
                        <div className="flex justify-between text-xs font-bold text-slate-500 mb-1">
                          <span>Respuesta en Inglés: {voiceSpeedAnswer.toFixed(1)}x</span>
                        </div>
                        <input type="range" min="0.5" max="1.5" step="0.1" value={voiceSpeedAnswer} onChange={e => setVoiceSpeedAnswer(parseFloat(e.target.value))} className="w-full accent-indigo-600" />
                      </div>

                      <div className="mb-2">
                        <div className="flex justify-between text-xs font-bold text-slate-500 mb-1">
                          <span>Feedback en Español: {voiceSpeedFeedback.toFixed(1)}x</span>
                        </div>
                        <input type="range" min="0.5" max="1.5" step="0.1" value={voiceSpeedFeedback} onChange={e => setVoiceSpeedFeedback(parseFloat(e.target.value))} className="w-full accent-indigo-600" />
                      </div>
                    </div>
`;
code = code.replace(hidePosFeedbackStr, speedSlidersUI + "\n" + hidePosFeedbackStr);

fs.writeFileSync('src/App.tsx', code);
console.log("App.tsx patched for speeds!");
