import { BrainCircuit, CheckCircle2, Clock, Flag, Heart, SkipForward, XCircle, Settings, HelpCircle, Terminal, Mic, Volume2, RefreshCw, ChevronDown, ChevronUp, AlertCircle, ExternalLink } from 'lucide-react';
import { useEffect, useState, useRef } from 'react';
import { MOTIVATION_RIGHT, MOTIVATION_WRONG } from '../data';
import { playTTS, addDiagLog } from '../utils';
import { BuildSentenceUI, DialogueUI, FlashcardSingleUI, ListenWriteUI, QuizUI, ReadingUI, SpeakUI, MatchUI } from './ExerciseViews';

export function ExerciseEngine({ exercise, onProceed, progress, total, current, skill, onExit, isPermissive, speakPermissive, speakPreview, showSpeakingWord, selectedVoiceURI, enableTimer, timerSeconds, defaultKeyboardMode, onChangeKeyboardMode, allowedKeyboards, onSaveMistake, onRemoveMistake, isMistakeMode, onUpdateStats, strictMistakeLogging, onWordClickGlobal, enableVoiceFeedback, enableMarkAsKnown, flashcardMode, strictTyping, enableMultiModalProgression, enableProgressiveGuidance, enableMicCountdown, randomizeKeyboardsMode }: any) {
  const [status, setStatus] = useState('playing'); 
  const [attemptKey, setAttemptKey] = useState(0);
  const [hasAttempted, setHasAttempted] = useState(false);
  const [timeLeft, setTimeLeft] = useState(timerSeconds);
  const [currentMotivation, setCurrentMotivation] = useState<any>(null);
  const [currentCorrectAnswer, setCurrentCorrectAnswer] = useState('');
  const [randomMode, setRandomMode] = useState('');
  const [imageLoading, setImageLoading] = useState(true);

  // Voice & Microphone Diagnostics State
  const [showDiagnostics, setShowDiagnostics] = useState(false);
  const [diagLogs, setDiagLogs] = useState<string[]>([]);
  const [ttsSupported, setTtsSupported] = useState(false);
  const [sttSupported, setSttSupported] = useState(false);
  const [micPermissionState, setMicPermissionState] = useState('unknown');
  const [voicesCount, setVoicesCount] = useState(0);
  const [isIframe, setIsIframe] = useState(false);

  const [isTestSTTActive, setIsTestSTTActive] = useState(false);
  const [testSTTText, setTestSTTText] = useState('');
  const [testSTTError, setTestSTTError] = useState('');
  const [diagMessage, setDiagMessage] = useState<string | null>(null);

  const logsEndRef = useRef<HTMLDivElement>(null);

  const runVoiceChecks = async () => {
    const isInsideIframe = typeof window !== 'undefined' && window.self !== window.top;
    setIsIframe(isInsideIframe);

    const hasTTS = typeof window !== 'undefined' && !!window.speechSynthesis;
    setTtsSupported(hasTTS);

    if (hasTTS) {
      try {
        const voices = window.speechSynthesis.getVoices();
        setVoicesCount(voices.length);
      } catch (e) {}
    }

    const SR = typeof window !== 'undefined' && ((window as any).SpeechRecognition || (window as any).webkitSpeechRecognition);
    setSttSupported(!!SR);

    if (typeof navigator !== 'undefined' && navigator.permissions && navigator.permissions.query) {
      try {
        const perm = await navigator.permissions.query({ name: 'microphone' as any });
        setMicPermissionState(perm.state);
        perm.onchange = () => {
          setMicPermissionState(perm.state);
        };
      } catch (e) {
        setMicPermissionState('not_supported_query');
      }
    } else {
      setMicPermissionState('not_supported_query');
    }
  };

  useEffect(() => {
    runVoiceChecks();
    
    if (typeof window !== 'undefined') {
      const existing = (window as any)._voiceDiagLogs || [];
      setDiagLogs([...existing]);
      
      (window as any)._onVoiceDiagLog = (formattedLine: string) => {
        setDiagLogs(prev => {
          const updated = [...prev, formattedLine];
          if (updated.length > 100) updated.shift();
          return updated;
        });
        
        if (window.speechSynthesis) {
          try {
            setVoicesCount(window.speechSynthesis.getVoices().length);
          } catch(err){}
        }
      };
    }
    
    return () => {
      if (typeof window !== 'undefined') {
        (window as any)._onVoiceDiagLog = null;
      }
    };
  }, []);

  useEffect(() => {
    if (showDiagnostics && logsEndRef.current) {
      logsEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [diagLogs, showDiagnostics]);

  const testTTSAction = async () => {
    addDiagLog("[Diagnóstico] Iniciando prueba manual de síntesis de voz (TTS)...");
    if (!window.speechSynthesis) {
      addDiagLog("[Diagnóstico ERROR] Tu navegador no tiene soporte para speechSynthesis.");
      setDiagMessage("Lo siento, tu navegador no soporta la síntesis de voz.");
      return;
    }
    try {
      addDiagLog("[Diagnóstico] Enviando texto de prueba a playTTS...");
      await playTTS("Hello and welcome! This is a manual test of Lisa's Quest voice engine. Perfect!", "en", selectedVoiceURI, 1.0, true);
      addDiagLog("[Diagnóstico] Prueba manual de playTTS completada exitosamente.");
    } catch (err: any) {
      addDiagLog(`[Diagnóstico ERROR] Error en prueba de playTTS: ${err?.message || err}`);
    }
  };

  const testSTTAction = () => {
    addDiagLog("[Diagnóstico] Iniciando prueba manual de grabación micrófono (STT)...");
    const SR = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SR) {
      addDiagLog("[Diagnóstico ERROR] El navegador no soporta SpeechRecognition para probar.");
      setDiagMessage("El reconocimiento de voz no está soportado en este navegador.");
      return;
    }

    try {
      setIsTestSTTActive(true);
      setTestSTTText('Escuchando... habla hoy en inglés (por ej. "Hello Lisa")');
      setTestSTTError('');
      
      const rec = new SR();
      rec.lang = 'en-US';
      rec.interimResults = true;
      rec.maxAlternatives = 1;
      
      let heardAny = false;

      rec.onstart = () => {
        addDiagLog("[Diagnóstico STT] Grabación de prueba iniciada con éxito. Habla ahora.");
      };

      rec.onerror = (e: any) => {
        addDiagLog(`[Diagnóstico STT Error] Error reportado: ${e.error}`);
        setTestSTTError(`Error: ${e.error}`);
        setIsTestSTTActive(false);
      };

      rec.onend = () => {
        addDiagLog(`[Diagnóstico STT] Grabación de prueba finalizada. ¿Se escuchó algo?: ${heardAny}`);
        setIsTestSTTActive(false);
        if (!heardAny) {
          setTestSTTText('');
          setTestSTTError('No se detectó voz. Intenta dar permisos o usa pestaña nueva.');
        }
      };

      rec.onresult = (e: any) => {
        heardAny = true;
        const transcript = e.results[0][0].transcript;
        setTestSTTText(`He escuchado: "${transcript}"`);
        addDiagLog(`[Diagnóstico STT] Escuchado: "${transcript}" (isFinal: ${e.results[0].isFinal})`);
        if (e.results[0].isFinal) {
          rec.stop();
        }
      };

      rec.start();
    } catch(err: any) {
      addDiagLog(`[Diagnóstico STT Error Crítico] ${err?.message || err}`);
      setTestSTTError(`Excepción: ${err?.message || err}`);
      setIsTestSTTActive(false);
    }
  };

  const resetVoiceEngineAction = () => {
    addDiagLog("[Diagnóstico] Solicitando reinicio completo de hilos de audio...");
    if (typeof window !== 'undefined' && window.speechSynthesis) {
      try {
        window.speechSynthesis.cancel();
        addDiagLog("[Diagnóstico] Se llamó a window.speechSynthesis.cancel().");
        if (window.speechSynthesis.paused) {
          window.speechSynthesis.resume();
          addDiagLog("[Diagnóstico] El motor estaba pausado; se llamó a .resume().");
        }
        // Priming
        const dummy = new SpeechSynthesisUtterance('');
        dummy.volume = 0;
        window.speechSynthesis.speak(dummy);
        window.speechSynthesis.cancel();
        addDiagLog("[Diagnóstico] Re-alimentado el sintetizador con trigger de silencio completado.");
        setDiagMessage("¡Motor de voz reiniciado! Intenta reproducir el sonido o hablar de nuevo.");
      } catch (err: any) {
        addDiagLog(`[Diagnóstico ERROR] Fallo al reiniciar el motor: ${err?.message || err}`);
      }
    } else {
      addDiagLog("[Diagnóstico ERROR] El sintetizador no está disponible para reiniciar.");
    }
  };

  const clearDiagnosticsLogs = () => {
    if (typeof window !== 'undefined') {
      (window as any)._voiceDiagLogs = [];
      setDiagLogs([]);
      addDiagLog("[Diagnóstico] Consola de logs limpiada.");
    }
  };

  useEffect(() => { 
    setStatus('playing'); 
    setAttemptKey(0);
    setHasAttempted(false); 
    setTimeLeft(timerSeconds); 
    setCurrentMotivation(null);
    setCurrentCorrectAnswer('');
    setImageLoading(true);
    
    if (defaultKeyboardMode === 'random' && allowedKeyboards && allowedKeyboards.length > 0) {
       setRandomMode(allowedKeyboards[Math.floor(Math.random() * allowedKeyboards.length)]);
    } else {
       setRandomMode('');
    }
  }, [exercise, defaultKeyboardMode, allowedKeyboards, timerSeconds]);

  const activeMode = randomMode || defaultKeyboardMode;
  
  useEffect(() => {
    setCurrentCorrectAnswer(exercise.correctAnswer || exercise.correctSentence || exercise.textToSpeak || exercise.textToRead || exercise.eng);
  }, [exercise.id, timerSeconds]);

  useEffect(() => {
    if (enableTimer && status === 'playing' && timeLeft > 0) {
      const t = setTimeout(() => setTimeLeft(timeLeft - 1), 1000); return () => clearTimeout(t);
    } else if (enableTimer && status === 'playing' && timeLeft === 0) {
      handleResult('TIME_OUT_ERROR');
    }
  }, [timeLeft, enableTimer, status]);

  const evaluateAnswer = (user: string, correct: string, isSpeech: boolean) => {
    if (user === 'TIME_OUT_ERROR') return false;
    if (user === 'WRONG_ANSWER_FORCE') return false; 
    
    const cleanSpeech = (s: string) => String(s).toLowerCase().replace(/[.,!¿?¡:;"'()]/g, '').trim();
    
    if (isSpeech) {
       const normalizeSpeech = (text: string) => {
          let rawNormalized = cleanSpeech(text)
            .replace(/[‘’]/g, "'")
            .replace(/\b(i'm|im)\b/g, "i am")
            .replace(/\b(he's|hes)\b/g, "he is")
            .replace(/\b(she's|shes)\b/g, "she is")
            .replace(/\b(it's|its)\b/g, "it is")
            .replace(/\b(we're|were)\b/g, "we are")
            .replace(/\b(they're|theyre)\b/g, "they are")
            .replace(/\b(can't|cant)\b/g, "can not")
            .replace(/\b(cannot)\b/g, "can not")
            .replace(/\b(isn't|isnt)\b/g, "is not")
            .replace(/\b(aren't|arent)\b/g, "are not")
            .replace(/\b(don't|dont)\b/g, "do not");
         let t = rawNormalized;
         const homophones: Record<string, string> = {
           "1": "one", "won": "one", "2": "two", "to": "two", "too": "two", "3": "three", "tree": "three", "4": "four", "for": "four", "5": "five",
           "6": "six", "7": "seven", "8": "eight", "ate": "eight", "9": "nine", "10": "ten", "11": "eleven", "12": "twelve", "13": "thirteen", "14": "fourteen", "15": "fifteen",
           "16": "sixteen", "17": "seventeen", "18": "eighteen", "19": "nineteen", "20": "twenty", "21": "twenty-one", "22": "twenty-two", "23": "twenty-three", "24": "twenty-four", "25": "twenty-five",
           "26": "twenty-six", "27": "twenty-seven", "28": "twenty-eight", "29": "twenty-nine", "30": "thirty", "31": "thirty-one", "32": "thirty-two", "33": "thirty-three", "34": "thirty-four", "35": "thirty-five",
           "36": "thirty-six", "37": "thirty-seven", "38": "thirty-eight", "39": "thirty-nine", "40": "forty", "41": "forty-one", "42": "forty-two", "43": "forty-three", "44": "forty-four", "45": "forty-five",
           "46": "forty-six", "47": "forty-seven", "48": "forty-eight", "49": "forty-nine", "50": "fifty", "eye": "I", "eyes": "I", "no": "know", "know": "no", "a": "ah", "and": "an"
         };
         let words = t.split(/[\s-]+/);
         let mapped = words.map((w: string) => homophones[w] || w);
         return mapped.join(' ');
       };

       const cleanUser = normalizeSpeech(user); 
       const cleanCorrect = normalizeSpeech(correct);

       if (speakPermissive) {
         if (cleanUser === cleanCorrect) return true;
         if (cleanUser.includes(cleanCorrect) || cleanCorrect.includes(cleanUser)) return true;
         const uW = cleanUser.split(' '); const cW = cleanCorrect.split(' ');
         const matchCount = cW.filter((w: string) => uW.includes(w)).length;
         if (cW.length > 2 && matchCount >= cW.length - 1) return true;
         return false;
       }
       return cleanUser === cleanCorrect;
    }

    if (strictTyping) {
       return String(user).trim() === String(correct).trim();
    } else {
       const cleanWriting = (s: string) => {
         let t = String(s).toLowerCase();
         t = t.replace(/[‘’]/g, "'");
         t = t.replace(/\b(i'm|im)\b/g, "i am");
         t = t.replace(/\b(he's|hes)\b/g, "he is");
         t = t.replace(/\b(she's|shes)\b/g, "she is");
         t = t.replace(/\b(it's|its)\b/g, "it is");
         t = t.replace(/\b(we're|were)\b/g, "we are");
         t = t.replace(/\b(they're|theyre)\b/g, "they are");
         t = t.replace(/\b(can't|cant)\b/g, "can not");
         t = t.replace(/\b(cannot)\b/g, "can not");
         t = t.replace(/\b(isn't|isnt)\b/g, "is not");
         t = t.replace(/\b(aren't|arent)\b/g, "are not");
         t = t.replace(/\b(don't|dont)\b/g, "do not");
         t = t.replace(/[.,!¿?¡:;"'()]/g, '');
         t = t.replace(/\s+/g, ' ');
         return t.trim();
       };
       return cleanWriting(user) === cleanWriting(correct);
    }
  };

  const handleResult = (userAnswer = '', overrideCorrect: string | null = null) => {
    if (status !== 'playing') return;
    let isCorrect = false;

    if (userAnswer === 'SPECIAL_CORRECT_FLAG') {
        isCorrect = true;
    } else {
        const finalCorrect = overrideCorrect || currentCorrectAnswer;
        if (overrideCorrect) setCurrentCorrectAnswer(overrideCorrect); 
        isCorrect = evaluateAnswer(userAnswer, finalCorrect, exercise.type === 'speak' || exercise.type === 'dialogue_speak' || exercise.type === 'speed_speak');
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
      setStatus('correct');
      if (isMistakeMode) onRemoveMistake(exercise.id); 
      playFeedback(true, moti, exercise.eng);
      if (onUpdateStats && !isMistakeMode) onUpdateStats(skill, isFirstTry);
    } else {
      setStatus('wrong_try_again');
      playFeedback(false, moti, exercise.eng);
      if (strictMistakeLogging && !isMistakeMode) {
        onSaveMistake(exercise);
      }
    }
  };

  const playFeedback = async (isCorrect: boolean, moti: any, extraEng: string) => {
    if (!enableVoiceFeedback) return;
    await playTTS(moti.spa, 'es', null, 1.0, true);
    await new Promise(r => setTimeout(r, 200)); 
    await playTTS(extraEng || moti.eng, 'en', selectedVoiceURI, 0.9, true); 
  };

  return (
    <div className="flex-1 flex flex-col w-full bg-slate-50 relative pb-16 overflow-y-auto">
      <div className="flex justify-between items-center px-4 pt-4 text-sm text-gray-500 font-bold gap-2">
        <div className="flex items-center gap-1.5 flex-wrap">
          <button onClick={onExit} className="p-2 bg-gray-200 rounded-full hover:bg-gray-300 transition" title="Pausar y salir"><XCircle size={18}/></button>
          
          {status === 'playing' && enableMarkAsKnown && !isMistakeMode && (
            <button 
              onClick={() => onProceed(true, true)} 
              className="px-2.5 py-1.5 bg-fuchsia-100 hover:bg-fuchsia-200 text-fuchsia-700 rounded-lg font-bold text-[10px] flex items-center gap-1 transition border border-fuchsia-200 shadow-sm active:scale-95"
              title="Ya me lo sé"
            >
              <BrainCircuit size={11}/> <span>Ya lo sé</span>
            </button>
          )}
          {status === 'playing' && (
            <button 
              onClick={() => { setStatus('surrendered'); onSaveMistake(exercise); }}
              className="px-2.5 py-1.5 bg-gray-200 hover:bg-gray-300 text-gray-600 rounded-lg font-bold text-[10px] flex items-center gap-1 transition border border-gray-300 shadow-sm active:scale-95"
              title="Saltar ejercicio"
            >
              Obviar 🏳️
            </button>
          )}
        </div>
        
        <span className={`px-2.5 py-1 rounded-full shadow-sm flex items-center gap-1 text-[11px] truncate max-w-[120px] sm:max-w-none ${isMistakeMode ? 'bg-red-500 text-white' : skill === 'Módulo Completo' ? 'bg-cyan-500 text-white' : 'bg-white'}`}>
          {exercise.emoji} {isMistakeMode ? 'Repaso' : skill === 'Módulo Completo' ? exercise.skill : skill}
        </span>
        
        <div className="flex items-center gap-1.5 text-xs flex-shrink-0 font-mono">
          {enableTimer && <span className={`flex items-center gap-0.5 ${timeLeft <= 5 ? 'text-red-500 animate-pulse' : 'text-orange-500'}`}><Clock size={12}/> {timeLeft}s</span>}
          <span>{current}/{total}</span>
        </div>
      </div>
      
      <div className="h-3 bg-gray-200 w-full rounded-full mt-4 mx-4 w-[calc(100%-2rem)] overflow-hidden relative">
        <div className="h-full bg-green-400 transition-all duration-500" style={{ width: `${progress}%` }}></div>
      </div>
      
      <div className="flex-1 p-6 flex flex-col items-center">
        {exercise.emoji && exercise.type !== 'flashcard' && exercise.type !== 'reading' && exercise.type !== 'match' && (
           <div className={`relative ${exercise.isVisual ? 'bg-white p-3 shadow-xl border-2 border-indigo-100 border-b-6 border-b-indigo-200 mt-2 mb-6 w-52 h-52 flex flex-col items-center justify-center rounded-3xl duration-300 hover:scale-[1.02]' : 'text-6xl mb-2 bg-white p-4 rounded-full shadow-sm'}`}>
            {exercise.isVisual ? (
               <>
                 {imageLoading && (
                   <div className="absolute inset-0 flex flex-col items-center justify-center bg-indigo-50/80 rounded-3xl animate-pulse text-indigo-500 gap-2 font-bold text-xs select-none">
                     <span className="text-3xl animate-bounce">🎨</span>
                     <span>Creando ilustración...</span>
                   </div>
                 )}
                 <img 
                   src={`https://image.pollinations.ai/prompt/${encodeURIComponent(exercise.eng + " realistic chibi cute style illustration style illustration, vector, bright colors")}`} 
                   alt={exercise.eng} 
                   className={`w-full h-full object-cover rounded-2xl select-none transition-all duration-500 ${imageLoading ? 'opacity-0 scale-95' : 'opacity-100 scale-100'}`} 
                   crossOrigin="anonymous" 
                   onLoad={() => setImageLoading(false)}
                 />
               </>
            ) : (
               exercise.emoji
            )}
            {enableMultiModalProgression && exercise.targetKeyboardMode && !exercise.isVisual && <span className="absolute -bottom-2 -right-2 bg-indigo-500 text-white text-[10px] px-2 py-0.5 rounded-full font-bold shadow">Nvl {exercise.kbLevel + 1}</span>}
         </div>
        )}
        
        {exercise.type === 'reading' && <ReadingUI key={`${exercise.id}-${attemptKey}`} exercise={exercise} onResult={handleResult} disabled={status !== 'playing'} selectedVoiceURI={selectedVoiceURI} mode={activeMode} onChangeKeyboardMode={onChangeKeyboardMode} allowedKeyboards={allowedKeyboards} strictTyping={strictTyping} enableMultiModalProgression={enableMultiModalProgression} enableProgressiveGuidance={enableProgressiveGuidance} randomizeKeyboardsMode={randomizeKeyboardsMode} />}
        {exercise.type === 'quiz' && <QuizUI key={`${exercise.id}-${attemptKey}`} exercise={exercise} onResult={handleResult} disabled={status !== 'playing'} onWordClick={onWordClickGlobal} selectedVoiceURI={selectedVoiceURI} mode={activeMode} onChangeKeyboardMode={onChangeKeyboardMode} allowedKeyboards={allowedKeyboards} strictTyping={strictTyping} enableMultiModalProgression={enableMultiModalProgression} enableProgressiveGuidance={enableProgressiveGuidance} randomizeKeyboardsMode={randomizeKeyboardsMode} />}
        {exercise.type === 'build_sentence' && <BuildSentenceUI key={`${exercise.id}-${attemptKey}`} exercise={exercise} onResult={handleResult} disabled={status !== 'playing'} selectedVoiceURI={selectedVoiceURI} onWordClick={onWordClickGlobal} mode={activeMode} onChangeKeyboardMode={onChangeKeyboardMode} allowedKeyboards={allowedKeyboards} strictTyping={strictTyping} enableMultiModalProgression={enableMultiModalProgression} enableProgressiveGuidance={enableProgressiveGuidance} randomizeKeyboardsMode={randomizeKeyboardsMode} />}
        {exercise.type === 'listen_and_write' && <ListenWriteUI key={`${exercise.id}-${attemptKey}`} exercise={exercise} onResult={handleResult} disabled={status !== 'playing'} selectedVoiceURI={selectedVoiceURI} onWordClick={onWordClickGlobal} mode={activeMode} onChangeKeyboardMode={onChangeKeyboardMode} allowedKeyboards={allowedKeyboards} strictTyping={strictTyping} enableMultiModalProgression={enableMultiModalProgression} enableProgressiveGuidance={enableProgressiveGuidance} randomizeKeyboardsMode={randomizeKeyboardsMode} />}
        {(exercise.type === 'speak' || exercise.type === 'speed_speak') && <SpeakUI key={`${exercise.id}-${attemptKey}`} exercise={exercise} onResult={handleResult} disabled={status !== 'playing'} speakPreview={speakPreview} showSpeakingWord={showSpeakingWord} selectedVoiceURI={selectedVoiceURI} onWordClick={onWordClickGlobal} enableMicCountdown={enableMicCountdown} />}
        {exercise.type === 'flashcard' && <FlashcardSingleUI key={`${exercise.id}-${attemptKey}`} exercise={exercise} onResult={handleResult} disabled={status !== 'playing'} mode={activeMode} onChangeKeyboardMode={onChangeKeyboardMode} allowedKeyboards={allowedKeyboards} flashcardMode={flashcardMode} selectedVoiceURI={selectedVoiceURI} strictTyping={strictTyping} enableMultiModalProgression={enableMultiModalProgression} enableProgressiveGuidance={enableProgressiveGuidance} randomizeKeyboardsMode={randomizeKeyboardsMode} />}
        {exercise.type === 'dialogue_chat' && <DialogueUI key={`${exercise.id}-${attemptKey}`} exercise={exercise} onResult={handleResult} disabled={status !== 'playing'} selectedVoiceURI={selectedVoiceURI} mode={activeMode} onChangeKeyboardMode={onChangeKeyboardMode} allowedKeyboards={allowedKeyboards} strictTyping={strictTyping} isSpeakMode={false} enableMicCountdown={enableMicCountdown} enableMultiModalProgression={enableMultiModalProgression} enableProgressiveGuidance={enableProgressiveGuidance} />}
        {exercise.type === 'dialogue_speak' && <DialogueUI key={`${exercise.id}-${attemptKey}`} exercise={exercise} onResult={handleResult} disabled={status !== 'playing'} selectedVoiceURI={selectedVoiceURI} mode={activeMode} onChangeKeyboardMode={onChangeKeyboardMode} allowedKeyboards={allowedKeyboards} strictTyping={strictTyping} isSpeakMode={true} enableMicCountdown={enableMicCountdown} enableMultiModalProgression={enableMultiModalProgression} enableProgressiveGuidance={enableProgressiveGuidance} />}
        {exercise.type === 'match' && <MatchUI key={`${exercise.id}-${attemptKey}`} exercise={exercise} onResult={handleResult} disabled={status !== 'playing'} />}
      </div>

      {/* --- PANEL DE DIAGNÓSTICO DE VOZ (TTS & STT) --- */}
      <div id="voice-diagnostics-container" className="mx-6 mb-6 p-4 bg-white rounded-2xl border border-slate-200 shadow-sm">
        <button 
          id="btn-toggle-diagnostics"
          onClick={() => { setShowDiagnostics(!showDiagnostics); runVoiceChecks(); }}
          className="w-full flex items-center justify-between font-bold text-xs text-slate-500 hover:text-slate-800 transition"
        >
          <div className="flex items-center gap-2">
            <Settings size={14} className="text-indigo-500 animate-pulse"/>
            <span>🛠️ Diagnóstico y Solución de Voz (TTS & STT)</span>
          </div>
          <div className="flex items-center gap-1">
            <span className={`px-1.5 py-0.5 rounded text-[10px] ${voicesCount > 0 ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'}`}>
              {voicesCount} voces
            </span>
            {showDiagnostics ? <ChevronUp size={14}/> : <ChevronDown size={14}/>}
          </div>
        </button>

        {showDiagnostics && (
          <div id="diagnostics-expanded-panel" className="mt-4 space-y-4 border-t border-slate-100 pt-3 animate-slide-up">
            {/* Warning Alert if inside iframe */}
            {isIframe && (
              <div id="iframe-warning-banner" className="bg-amber-50 border border-amber-200 rounded-xl p-3 text-[11px] text-amber-800 space-y-1">
                <div className="flex items-start gap-1.5 font-bold">
                  <AlertCircle size={14} className="text-amber-600 flex-shrink-0 mt-0.5"/>
                  <span>¡Previsualización Segura Detectada! (Sandbox Iframe)</span>
                </div>
                <p className="leading-relaxed">
                  Las políticas de seguridad del navegador bloquean o apagan la síntesis de voz (TTS) y el micrófono (STT) dentro de iframes. 
                </p>
                <div className="pt-1.5">
                  <a 
                    id="link-open-new-tab"
                    href={window.location.href} 
                    target="_blank" 
                    rel="noreferrer" 
                    className="inline-flex items-center gap-1 px-2.5 py-1 bg-amber-600 hover:bg-amber-700 text-white rounded-lg font-bold text-[10px] shadow-sm transition active:scale-95"
                  >
                    <span>Abrir en Pestaña Nueva</span>
                    <ExternalLink size={10}/>
                  </a>
                </div>
              </div>
            )}

            {/* Status Checks Grid */}
            <div id="diag-states-grid" className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px]">
              <div className="p-2 border border-slate-100 bg-slate-50/50 rounded-xl flex items-center justify-between">
                <span className="text-slate-500 font-medium">Soporte Síntesis (TTS):</span>
                <span className={`font-bold ${ttsSupported ? 'text-green-600' : 'text-red-500'}`}>
                  {ttsSupported ? '✅ Disponible' : '❌ No disponible'}
                </span>
              </div>
              <div className="p-2 border border-slate-100 bg-slate-50/50 rounded-xl flex items-center justify-between">
                <span className="text-slate-500 font-medium">Soporte Micrófono (STT):</span>
                <span className={`font-bold ${sttSupported ? 'text-green-600' : 'text-red-500'}`}>
                  {sttSupported ? '✅ Disponible' : '❌ No disponible'}
                </span>
              </div>
              <div className="p-2 border border-slate-100 bg-slate-50/50 rounded-xl flex items-center justify-between">
                <span className="text-slate-500 font-medium">Ejecución en Sandbox:</span>
                <span className={`font-bold ${isIframe ? 'text-amber-600' : 'text-green-600'}`}>
                  {isIframe ? '⚠️ Sí (Iframe)' : '✅ Ventana principal'}
                </span>
              </div>
              <div className="p-2 border border-slate-100 bg-slate-50/50 rounded-xl flex items-center justify-between">
                <span className="text-slate-500 font-medium">Permiso Micrófono:</span>
                <span className={`font-bold truncate max-w-[120px] ${
                  micPermissionState === 'granted' ? 'text-green-600' : 
                  micPermissionState === 'denied' ? 'text-red-500' : 'text-slate-600'
                }`}>
                  {micPermissionState === 'granted' ? '✅ Permitido' : 
                   micPermissionState === 'denied' ? '❌ Denegado' : 
                   micPermissionState === 'prompt' ? '❓ Preguntar' : 'Pendiente o Bloqueado'}
                </span>
              </div>
            </div>

            {/* Quick Diagnostic Actions */}
            <div id="diag-actions-toolbar" className="flex flex-wrap gap-2 pt-1">
              <button
                id="btn-test-tts"
                onClick={testTTSAction}
                className="flex-1 min-w-[120px] py-2 px-3 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 rounded-xl font-bold text-[10px] flex items-center justify-center gap-1.5 transition border border-indigo-200 outline-none active:scale-95"
              >
                <Volume2 size={12}/>
                <span>Probar Voz (TTS)</span>
              </button>

              <button
                id="btn-test-stt"
                disabled={isTestSTTActive}
                onClick={testSTTAction}
                className={`flex-1 min-w-[120px] py-2 px-3 ${
                  isTestSTTActive ? 'bg-slate-100 text-slate-400' : 'bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border-emerald-200'
                } rounded-xl font-bold text-[10px] flex items-center justify-center gap-1.5 transition border outline-none active:scale-95`}
              >
                <Mic size={12}/>
                <span>{isTestSTTActive ? 'Escuchando...' : 'Probar Micro (STT)'}</span>
              </button>

              <button
                id="btn-reset-voices"
                onClick={resetVoiceEngineAction}
                className="flex-1 min-w-[120px] py-2 px-3 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl font-bold text-[10px] flex items-center justify-center gap-1.5 transition border border-slate-200 outline-none active:scale-95"
              >
                <RefreshCw size={12}/>
                <span>Reiniciar Motor</span>
              </button>
            </div>

            {/* Diagnostic Message Banner */}
            {diagMessage && (
              <div id="diag-message-banner" className="p-3 bg-indigo-50 border border-indigo-200 text-indigo-800 rounded-xl text-xs font-semibold flex items-center justify-between">
                <span>✨ {diagMessage}</span>
                <button onClick={() => setDiagMessage(null)} className="px-2 font-bold text-indigo-400 hover:text-indigo-600">×</button>
              </div>
            )}

            {/* Test STT results */}
            {(testSTTText || testSTTError) && (
              <div id="stt-live-trial-result" className="p-2 border border-emerald-100 bg-emerald-50/30 rounded-xl text-[11px]">
                {testSTTText && <p className="text-emerald-800 font-medium">{testSTTText}</p>}
                {testSTTError && <p className="text-red-600 font-medium">⚠️ {testSTTError}</p>}
              </div>
            )}

            {/* Real-time Log Viewer */}
            <div id="terminal-log-viewer" className="space-y-1.5">
              <div className="flex justify-between items-center text-[10px] font-bold text-slate-500">
                <div className="flex items-center gap-1">
                  <Terminal size={11}/>
                  <span>CONSOLA DE EVENTOS Y AUDIO (TIEMPO REAL)</span>
                </div>
                <button 
                  id="btn-clear-diag-logs"
                  onClick={clearDiagnosticsLogs} 
                  className="px-2 py-0.5 border border-slate-200 text-slate-400 hover:text-slate-600 bg-white hover:bg-slate-50 rounded transition"
                >
                  Borrar
                </button>
              </div>

              <div 
                id="diag-terminal-body"
                className="w-full bg-slate-950 border border-slate-800 text-lime-400 font-mono text-[10px] p-3 rounded-xl max-h-40 overflow-y-auto space-y-1 select-text"
              >
                {diagLogs.length === 0 ? (
                  <p className="text-slate-500 italic">[No hay eventos registrados aún. Toca reproducir o hablar para interactuar]</p>
                ) : (
                  diagLogs.map((log, idx) => (
                    <div key={idx} className="whitespace-pre-wrap break-all border-b border-slate-900/40 pb-0.5">
                      {log}
                    </div>
                  ))
                )}
                <div ref={logsEndRef} />
              </div>
            </div>
          </div>
        )}
      </div>

      {status === 'wrong_try_again' && (
        <div className="absolute bottom-0 left-0 w-full p-6 animate-slide-up shadow-2xl z-20 bg-orange-50 border-t-4 border-orange-400 rounded-t-3xl">
          <div className="flex items-start gap-3 mb-4">
            <Heart size={32} className="text-orange-500 flex-shrink-0"/> 
            <div><span className="font-bold text-xl text-orange-800">¡Casi casi!</span><p className="text-orange-700 font-medium text-sm mt-1">{currentMotivation?.spa}</p></div>
          </div>
          <div className="flex gap-3 mt-6">
            <button onClick={() => {setStatus('surrendered'); onSaveMistake(exercise);}} className="flex-1 py-4 bg-white border-2 border-orange-200 text-orange-600 rounded-xl font-bold active:scale-95">Me rindo 🏳️</button>
            <button onClick={() => {setTimeLeft(timerSeconds); setStatus('playing'); setAttemptKey(k => k + 1);}} className="flex-1 py-4 bg-orange-500 text-white rounded-xl font-bold shadow active:scale-95">Reintentar 🔄</button>
          </div>
        </div>
      )}

      {(status === 'correct' || status === 'surrendered') && (
        <div className={`absolute bottom-0 left-0 w-full p-6 animate-slide-up shadow-2xl z-20 rounded-t-3xl ${status === 'correct' ? 'bg-green-100 text-green-800 border-t-4 border-green-500' : 'bg-red-100 text-red-800 border-t-4 border-red-500'}`}>
          <div className="flex items-center gap-3 mb-2">
            {status === 'correct' ? <><CheckCircle2 size={32} className="text-green-500"/><span className="font-bold text-2xl">¡Excelente!</span></> : <><Flag size={32} className="text-red-500"/><span className="font-bold text-xl">Respuesta correcta:</span></>}
          </div>
          {status === 'correct' && currentMotivation && <p className="text-green-700 font-medium text-sm mb-2">{currentMotivation.spa}</p>}
          {status === 'surrendered' && <div className="mb-2 text-lg font-bold bg-white p-3 rounded-lg border-2 border-red-200">{currentCorrectAnswer}</div>}
          
          {exercise.spa && <p className={`text-sm mb-4 font-bold ${status === 'correct' ? 'text-green-700 opacity-90' : 'text-red-700 opacity-90'}`}>Significa: {exercise.spa}</p>}
          
          <button onClick={() => onProceed(status === 'correct', false)} className={`w-full py-4 rounded-xl font-bold text-xl text-white shadow active:scale-95 ${status === 'correct' ? 'bg-green-500' : 'bg-red-500'}`}>Continuar</button>
        </div>
      )}
    </div>
  );
}
