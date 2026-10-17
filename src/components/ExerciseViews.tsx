import { Mic, Volume2, Play, Pause, ArrowRight, Check } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { playTTS, addDiagLog } from '../utils';
import { HybridInputBox } from './Keyboards';
import { TranslatableText } from './UIComponents';

export function FlashcardSingleUI({ exercise, onResult, disabled, selectedVoiceURI, voiceSpeedPrompt, mode, onChangeKeyboardMode, allowedKeyboards, flashcardMode, strictTyping, enableMultiModalProgression, enableProgressiveGuidance, randomizeKeyboardsMode, clickSavings }: any) {
  const [isFlipped, setIsFlipped] = useState(false);

  const playEng = () => {
    playTTS(exercise.eng, 'en', selectedVoiceURI, voiceSpeedPrompt);
  };

  const handleResult = (val: string) => {
    if (!isFlipped) setIsFlipped(true);
    onResult(val);
  };

  if (flashcardMode === 'classic') {
    return (
      <div className="flex-1 flex flex-col items-center w-full pb-1">
        <h3 className="text-xl font-bold text-center text-gray-700 dark:text-slate-300 mb-2">¿Cómo se dice en inglés?</h3>
        
        <div onClick={() => { if(!disabled && !isFlipped) { setIsFlipped(true); playEng(); } }} className={`relative w-full max-w-sm h-36 transition-transform duration-500 transform-style-3d ${disabled ? '' : 'cursor-pointer'} shadow-xl rounded-3xl ${isFlipped || disabled ? 'rotate-y-180' : ''}`}>
          <div className="absolute w-full h-full bg-white dark:bg-slate-900 rounded-3xl flex flex-col items-center justify-center p-3 text-center border-b-8 border-indigo-200 dark:border-indigo-800 backface-hidden">
            <div className="text-xl mb-2">{exercise.emoji}</div>
            <h2 className="text-xl font-bold text-indigo-900 dark:text-indigo-200">{exercise.spa}</h2>
            <div className="absolute bottom-4 text-gray-400 font-medium text-sm animate-pulse">Toca para girar</div>
          </div>
          <div className="absolute w-full h-full bg-indigo-500 rounded-3xl flex flex-col items-center justify-center p-3 text-center border-b-8 border-indigo-700 rotate-y-180 backface-hidden">
            <div className="text-xl mb-2 opacity-50">{exercise.emoji}</div>
            <h2 className="text-xl font-bold text-white">{exercise.eng}</h2>
          </div>
        </div>

        {!disabled && isFlipped && (
          <div className="flex gap-2 mt-4 w-full max-w-sm">
            <button onClick={() => handleResult('WRONG_ANSWER_FORCE')} className="flex-1 py-2 bg-red-100 border-b-4 border-red-500 text-red-700 font-bold rounded-xl active:scale-95 text-lg"> No la s</button>
            <button onClick={() => handleResult('SPECIAL_CORRECT_FLAG')} className="flex-1 py-2 bg-green-500 border-b-4 border-green-700 text-white font-bold rounded-xl active:scale-95 text-lg"> La s!</button>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col items-center w-full">
      <h3 className="text-xl font-bold text-center text-gray-700 dark:text-slate-300 mb-2">¿Cómo se dice en inglés?</h3>
      <div className="text-xl mb-2 bg-white dark:bg-slate-900 p-3 rounded-full shadow-sm">{exercise.emoji}</div>
      <h2 className="text-xl font-bold text-indigo-900 dark:text-indigo-200 mb-3 text-center">{exercise.spa}</h2>
      
      {!isFlipped ? (
         <>
            <HybridInputBox exercise={exercise} mode={mode} onChangeKeyboardMode={onChangeKeyboardMode} allowedKeyboards={allowedKeyboards} disabled={disabled} onResult={handleResult} selectedVoiceURI={selectedVoiceURI} strictTyping={strictTyping} enableMultiModalProgression={enableMultiModalProgression} enableProgressiveGuidance={enableProgressiveGuidance} randomizeKeyboardsMode={randomizeKeyboardsMode} clickSavings={clickSavings}/>
         </>
      ) : (
         <div className="w-full flex-1 flex flex-col items-center justify-center">
            <div className="text-xl font-bold text-indigo-600 dark:text-indigo-300 bg-indigo-50 dark:bg-indigo-900/40 p-3 rounded-2xl border-2 border-indigo-100 dark:border-indigo-800 mb-2">{exercise.eng}</div>
         </div>
      )}
    </div>
  );
}

export function ReadingUI({ exercise, onResult, disabled, selectedVoiceURI, voiceSpeedPrompt, mode, onChangeKeyboardMode, allowedKeyboards, strictTyping, enableMultiModalProgression, enableProgressiveGuidance, randomizeKeyboardsMode, clickSavings }: any) {
  const handleOptionClick = (opt: string) => {
    if (disabled) return;
    playTTS(opt, exercise.optionsLang || 'en', selectedVoiceURI, voiceSpeedPrompt, true);
    onResult(opt);
  };

  const showHint = enableProgressiveGuidance;

  return (
    <div className="flex-1 flex flex-col w-full">
      <div className="bg-slate-100/50 dark:bg-slate-900/40 border-2 border-indigo-200 dark:border-indigo-800 dark:border-slate-800 border-l-8 border-l-indigo-500 p-3 rounded-xl shadow-sm mb-3 text-gray-800 dark:text-gray-200 font-medium italic text-lg text-left whitespace-pre-wrap">
        {exercise.readingText}
      </div>
      <h3 className="text-xl font-bold text-center text-indigo-900 dark:text-indigo-200 mb-3 px-2">
         {exercise.question}
      </h3>
      <div className="grid gap-2 mt-auto w-full">
        {exercise.options.map((opt: string, i: number) => {
          const isCorrectOpt = showHint && (opt === exercise.correctAnswer || (typeof opt === 'string' && typeof exercise.correctAnswer === 'string' && opt.trim().toLowerCase() === exercise.correctAnswer.trim().toLowerCase()));
          return (
            <button 
              key={i} 
              disabled={disabled} 
              onClick={() => handleOptionClick(opt)} 
              className={`p-3 rounded-xl border-b-4 border-2 font-bold transition active:scale-95 text-left ${
                disabled 
                  ? 'bg-gray-100 dark:bg-slate-800 border-gray-200 dark:border-slate-700 text-gray-400' 
                  : isCorrectOpt
                    ? 'bg-yellow-100 border-yellow-400 border-b-yellow-500 text-yellow-900 dark:bg-yellow-950/60 dark:text-yellow-100 dark:border-yellow-700 animate-pulse shadow-md scale-[1.01] z-10 font-extrabold'
                    : 'bg-white dark:bg-slate-900 border-indigo-200 dark:border-indigo-800 border-b-indigo-300 text-indigo-900 dark:text-indigo-200'
              }`}
            >
              {opt}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export function QuizUI({ exercise, onResult, disabled, onWordClick, selectedVoiceURI, voiceSpeedPrompt, mode, onChangeKeyboardMode, allowedKeyboards, strictTyping, enableMultiModalProgression, enableProgressiveGuidance, randomizeKeyboardsMode, clickSavings }: any) {
  const handleOptionClick = (opt: string) => {
    if (disabled) return;
    playTTS(opt, exercise.optionsLang || 'auto', selectedVoiceURI, voiceSpeedPrompt, true);
    onResult(opt);
  };

  const isKeyboardLayout = false;
  const showHint = enableProgressiveGuidance;

  return (
    <div className="flex-1 flex flex-col w-full">
      <h3 className="text-xl font-bold text-center text-gray-800 dark:text-slate-200 mb-3">
         <TranslatableText text={exercise.question} onWordClick={onWordClick} defaultLang="es" />
      </h3>
      {exercise.skill === 'Similar' && (
        <div className="mb-2 bg-orange-50 border-2 border-orange-200 rounded-2xl p-3 flex gap-2 text-orange-800 text-xs sm:text-sm shadow-sm animate-pulse">
          <span className="text-xl shrink-0"></span>
          <div>
            <strong className="font-extrabold text-orange-900 block mb-0.5">Cuidado! Son sper parecidas</strong>
            <span className="text-orange-700">Las respuestas de esta tarjeta se escriben muy parecido. ¡Observa cada letra con mucha atención!</span>
          </div>
        </div>
      )}
      {isKeyboardLayout ? (
        <HybridInputBox 
          exercise={exercise} 
          mode={mode} 
          onChangeKeyboardMode={onChangeKeyboardMode} 
          allowedKeyboards={allowedKeyboards} 
          disabled={disabled} 
          onResult={onResult} 
          selectedVoiceURI={selectedVoiceURI} 
          strictTyping={strictTyping} 
          enableMultiModalProgression={enableMultiModalProgression} 
          enableProgressiveGuidance={enableProgressiveGuidance} 
          randomizeKeyboardsMode={randomizeKeyboardsMode}
          clickSavings={clickSavings}
        />
      ) : (
        <div className="grid gap-2 mt-auto w-full">
          {exercise.options.map((opt: string, i: number) => {
            const isCorrectOpt = showHint && (opt === exercise.correctAnswer || (typeof opt === 'string' && typeof exercise.correctAnswer === 'string' && opt.trim().toLowerCase() === exercise.correctAnswer.trim().toLowerCase()));
            return (
              <button 
                key={i} 
                disabled={disabled} 
                onClick={() => handleOptionClick(opt)} 
                className={`p-3 rounded-xl border-b-4 border-2 font-bold transition active:scale-95 text-left ${
                  disabled 
                    ? 'bg-gray-100 dark:bg-slate-800 border-gray-200 dark:border-slate-700 text-gray-400' 
                    : isCorrectOpt
                      ? 'bg-yellow-100 border-yellow-400 border-b-yellow-500 text-yellow-900 dark:bg-yellow-950/60 dark:text-yellow-100 dark:border-yellow-700 animate-pulse shadow-md scale-[1.01] z-10 font-extrabold'
                      : 'bg-white dark:bg-slate-900 border-indigo-200 dark:border-indigo-800 border-b-indigo-300 text-indigo-900 dark:text-indigo-200 hover:bg-slate-50 dark:bg-slate-900'
                }`}
              >
                {opt}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}

export function ListenWriteUI({ exercise, onResult, disabled, selectedVoiceURI, voiceSpeedPrompt, onWordClick, mode, onChangeKeyboardMode, allowedKeyboards, strictTyping, enableMultiModalProgression, enableProgressiveGuidance, randomizeKeyboardsMode, clickSavings }: any) {
  const playAudio = (speed = 1.0) => {
    playTTS(exercise.textToSpeak, 'en', selectedVoiceURI, speed, true);
  };
  
  const [hasAutoPlayed, setHasAutoPlayed] = useState(false);
  useEffect(() => { setHasAutoPlayed(false); }, [exercise]);

  useEffect(() => {
    if (!hasAutoPlayed) {
      const timer = setTimeout(() => {
        playAudio(0.9);
        setHasAutoPlayed(true);
      }, 500); 
      return () => clearTimeout(timer);
    }
  }, [exercise, hasAutoPlayed]);

  return (
    <div className="flex-1 flex flex-col items-center pt-2 w-full">
      <h3 className="text-lg font-bold text-center text-gray-700 dark:text-slate-300 mb-2">
        <TranslatableText text={exercise.question} onWordClick={onWordClick} defaultLang="es" />
      </h3>
      <div className="flex gap-2 mb-3 items-end">
        <button onClick={() => playAudio(0.9)} disabled={disabled} className="w-16 h-16 bg-blue-500 text-white rounded-2xl flex items-center justify-center border-b-4 border-blue-700 active:border-b-0" title="Escuchar audio normal"><Volume2 size={32} /></button>
        <button onClick={() => playAudio(0.4)} disabled={disabled} className="w-12 h-12 bg-blue-400 text-white rounded-xl flex items-center justify-center border-b-4 border-blue-600 active:border-b-0" title="Escuchar lento (Tortuga)"><span className="text-xl">{"\u{1F422}"}</span></button>
      </div>
      
      <HybridInputBox exercise={exercise} mode={mode} onChangeKeyboardMode={onChangeKeyboardMode} allowedKeyboards={allowedKeyboards} disabled={disabled} onResult={onResult} selectedVoiceURI={selectedVoiceURI} strictTyping={strictTyping} enableMultiModalProgression={enableMultiModalProgression} enableProgressiveGuidance={enableProgressiveGuidance} randomizeKeyboardsMode={randomizeKeyboardsMode} clickSavings={clickSavings} />
    </div>
  );
}

export function BuildSentenceUI({ exercise, onResult, disabled, selectedVoiceURI, voiceSpeedPrompt, onWordClick, mode, onChangeKeyboardMode, allowedKeyboards, strictTyping, enableMultiModalProgression, enableProgressiveGuidance, randomizeKeyboardsMode, clickSavings }: any) {
  return (
    <div className="flex-1 flex flex-col items-center pt-2 w-full">
      <h3 className="text-lg font-bold text-center text-gray-700 dark:text-slate-300 mb-3">
        <TranslatableText text={exercise.question} onWordClick={onWordClick} defaultLang="es" />
      </h3>
      <HybridInputBox 
         exercise={exercise} 
         mode={mode} 
         onChangeKeyboardMode={onChangeKeyboardMode} 
         allowedKeyboards={allowedKeyboards} 
         disabled={disabled} 
         onResult={onResult} 
         selectedVoiceURI={selectedVoiceURI} 
         strictTyping={strictTyping} 
         enableMultiModalProgression={enableMultiModalProgression} 
         enableProgressiveGuidance={enableProgressiveGuidance}
         randomizeKeyboardsMode={randomizeKeyboardsMode}
         clickSavings={clickSavings}
      />
    </div>
  );
}

export function SpeakUI({ exercise, onResult, disabled, speakPreview, showSpeakingWord, selectedVoiceURI, voiceSpeedPrompt, onWordClick, enableMicCountdown, clickSavings }: any) {
  const [isListening, setIsListening] = useState(false);
  const [countdown, setCountdown] = useState<number | null>(null);
  const [errorText, setErrorText] = useState('');
  const [activeCharIndex, setActiveCharIndex] = useState(-1);
  const [showHelp, setShowHelp] = useState(false);
  const recRef = useRef<any>(null);

  useEffect(() => {
    setShowHelp(false);
    setErrorText('');
    setCountdown(null);
    setIsListening(false);
    setActiveCharIndex(-1);

    // Abort active recording on exercise change to prevent microphone locks
    if (recRef.current) {
      addDiagLog("SpeakUI: Abortando SpeechRecognition activo anterior por cambio de ejercicio...");
      try {
        recRef.current.abort();
      } catch (e) {}
      recRef.current = null;
    }
  }, [exercise.id]);

  useEffect(() => {
    if (clickSavings && !disabled) {
      const timer = setTimeout(() => {
        handleStartMic();
      }, 400);
      return () => clearTimeout(timer);
    }
  }, [exercise.id, clickSavings, disabled]);

  useEffect(() => {
    if (countdown === null) return;
    if (countdown > 0) { const t = setTimeout(() => setCountdown(countdown - 1), 1000); return () => clearTimeout(t); } 
    else if (countdown === 0) startListeningApi();
  }, [countdown]);

  // Clean up component on unmount
  useEffect(() => {
    return () => {
      if (recRef.current) {
        addDiagLog("SpeakUI Cleanup: Deteniendo instancia activa de SpeechRecognition por unmount...");
        try {
          recRef.current.abort();
        } catch (e) {}
        recRef.current = null;
      }
    };
  }, []);

  const startListeningApi = () => {
    try {
      addDiagLog("STT: Iniciando SpeechRecognition...");
      const SR = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      if (!SR) { 
          addDiagLog("STT Error: El navegador no soporta el reconocimiento de voz (SpeechRecognition).");
          setErrorText("Tu navegador no soporta el micrófono. Usa el botón 'Saltar' o prueba con Chrome."); 
          setCountdown(null); 
          return; 
      }
      
      // If there's an existing active session, abort it first
      if (recRef.current) {
        try {
          recRef.current.abort();
        } catch (e) {}
      }

      const rec = new SR(); 
      recRef.current = rec;
      rec.lang = 'en-US'; 
      rec.interimResults = true; 
      rec.maxAlternatives = 1;
      
      let heard = false;
      let finalTranscript = '';
      
      rec.onstart = () => { 
          addDiagLog("STT Event: Comenzado a escuchar activamente (onstart)...");
          setIsListening(true); 
          setErrorText(''); 
      };
      
      rec.onerror = (e: any) => { 
        addDiagLog(`STT Event ERROR: Error de entrada micrófono -> ${e.error}`);
        setIsListening(false); 
        setCountdown(null); 
        if (recRef.current === rec) {
          recRef.current = null;
        }
        if (e.error === 'not-allowed') {
            setErrorText("Permiso de micrófono denegado en este contexto. Si estás en la previsualización de AI Studio, por favor haz clic en 'Abrir en pestaña nueva' (arriba a la derecha) para dar permisos al micrófono.");
        } else {
            setErrorText(`Error de micrófono: ${e.error}. Inténtalo de nuevo.`); 
        }
      };
      
      rec.onend = () => { 
        addDiagLog(`STT Event: Finaliz sesin de escucha (onend). Se escuch algo: ${heard}, texto final: "${finalTranscript}"`);
        setIsListening(false); 
        setCountdown(null); 
        if (recRef.current === rec) {
          recRef.current = null;
        }
        if(!heard) { 
            setErrorText("No se detectó voz. Por favor habla fuerte cerca del micrófono!"); 
        } else if (finalTranscript) {
            onResult(finalTranscript);
        }
      };
      
      rec.onresult = (e: any) => { 
          heard = true; 
          for (let i = e.resultIndex; i < e.results.length; ++i) {
              if (e.results[i].isFinal) {
                  finalTranscript += e.results[i][0].transcript;
                  addDiagLog(`STT: Transcripcin final fragmento: "${e.results[i][0].transcript}"`);
                  rec.stop();
              } else {
                  addDiagLog(`STT: Transcripcin parcial (interim): "${e.results[i][0].transcript}"`);
                  setErrorText(`Escuchando: ${e.results[i][0].transcript}...`);
              }
          }
      };
      
      rec.start();
    } catch (err: any) {
      addDiagLog(`STT Error Crtico al arrancar reconocimiento: ${err?.message || err}`);
      console.error("Speech Recognition Error:", err);
      setIsListening(false);
      setCountdown(null);
      setErrorText("Error al iniciar el micrófono. Si estás usando la previsualización de AI Studio (iframe), la política de seguridad del navegador requiere que hagas clic en 'Abrir en pestaña nueva' arriba a la derecha para habilitar el micrófono.");
    }
  };

  const handleStartMic = () => {
    if (disabled || isListening || countdown !== null) return;
    setErrorText('');
    if (enableMicCountdown) {
        setCountdown(3);
    } else {
        startListeningApi();
    }
  };

  const handleToggleMic = () => {
    if (disabled) return;
    if (isListening || countdown !== null) {
      setCountdown(null);
      if (recRef.current) {
        try {
          recRef.current.abort();
        } catch (e) {}
        recRef.current = null;
      }
      setIsListening(false);
    } else {
      handleStartMic();
    }
  };

  const playAudio = (speed = 0.9) => {
    if (exercise.isOralTranslation) {
      setShowHelp(true);
    }
    const onBoundary = showSpeakingWord ? (e: any) => {
      if (e.name === 'word') setActiveCharIndex(e.charIndex);
    } : null;
    
    playTTS(exercise.textToRead, 'en', selectedVoiceURI, speed, true, onBoundary).then(() => {
      if (showSpeakingWord) setActiveCharIndex(-1);
    });
  };

  useEffect(() => {
    if (exercise.autoPlayTTS && speakPreview) {
      const timer = setTimeout(() => {
        playAudio(0.9);
      }, 600);
      return () => clearTimeout(timer);
    }
  }, [exercise.id]);

  const renderTextWithHighlight = () => {
    if (exercise.isOralTranslation && !showHelp) {
      return (
        <div className="flex flex-col items-center gap-2">
          <span className="text-gray-500 text-xs font-semibold uppercase tracking-wider mb-1">Traduce oralmente al inglés:</span>
          <TranslatableText text={`"${exercise.spa}"`} onWordClick={onWordClick} defaultLang="es" />
          <button 
            type="button"
            onClick={(e) => { e.stopPropagation(); setShowHelp(true); }}
            className="mt-3 px-3 py-1 bg-indigo-50 dark:bg-indigo-900/40 hover:bg-indigo-100 dark:hover:bg-indigo-900/60 text-indigo-600 dark:text-indigo-300 rounded-lg text-xs font-bold transition active:scale-95 flex items-center gap-1 border border-indigo-200 dark:border-indigo-800 shadow-sm"
          >
             Ver pista
          </button>
        </div>
      );
    }

    if (!showSpeakingWord || activeCharIndex === -1) {
      return <TranslatableText text={`"${exercise.textToRead}"`} onWordClick={onWordClick} defaultLang="en" />;
    }
    const text = `"${exercise.textToRead}"`;
    return (
      <span>
        {text.split('').map((char, i) => (
          <span key={i} className={i >= activeCharIndex && i < activeCharIndex + 7 ? 'text-blue-500 bg-blue-100 rounded' : ''}>
            {char}
          </span>
        ))}
      </span>
    );
  };

  return (
    <div className="flex-1 flex flex-col items-center pt-2 text-center w-full">
      <h3 className="text-lg font-bold text-gray-700 dark:text-slate-300 mb-2">
         <TranslatableText text={exercise.question} onWordClick={onWordClick} defaultLang="es" />
      </h3>
      <div className="bg-slate-100/60 dark:bg-slate-900/40 p-3 rounded-2xl border-2 border-slate-200 dark:border-slate-800 shadow-sm mb-2 w-full relative min-h-[100px] flex items-center justify-center">
        {speakPreview && (
          <div className="absolute -top-3 -right-2 flex gap-2">
            <button onClick={() => playAudio(0.4)} className="bg-blue-400 text-white p-2 rounded-full shadow-lg hover:bg-blue-500 active:scale-90" title="Escuchar lento (Tortuga)"><span className="text-lg">{"\u{1F422}"}</span></button>
            <button onClick={() => playAudio(0.9)} className="bg-blue-500 text-white p-2 rounded-full shadow-lg hover:bg-blue-600 active:scale-90" title="Escuchar normal"><Volume2 size={24} /></button>
          </div>
        )}
        <div className="text-xl font-bold text-gray-800 dark:text-slate-200 mt-2">
          {renderTextWithHighlight()}
        </div>
      </div>

      <div className="relative h-28 w-28 mt-2">
        {countdown !== null && countdown > 0 ? (
          <div className="absolute inset-0 bg-yellow-400 rounded-full flex items-center justify-center shadow-inner text-white text-xl font-bold animate-pulse" onClick={handleToggleMic} title="Cancelar conteo">{countdown}</div>
        ) : (
          <button onClick={handleToggleMic} disabled={disabled} className={`absolute inset-0 rounded-full flex items-center justify-center transition-all border-b-8 ${isListening ? 'bg-red-500 border-red-700 hover:bg-red-600' : disabled ? 'bg-gray-300 border-gray-400' : 'bg-blue-500 border-blue-700 hover:bg-blue-600'} text-white`} title={isListening ? "Detener grabacin" : "Iniciar grabacin"}><Mic size={48} className={isListening ? 'animate-pulse' : ''} /></button>
        )}
      </div>
      <p className="mt-4 font-bold text-gray-500">{countdown !== null && countdown > 0 ? 'Preprate...!' : isListening ? 'Habla AHORA!' : 'Toca para hablar'}</p>

      {errorText && <p className="mt-2 text-red-500 font-bold">{errorText}</p>}

      {window.self !== window.top && (
        <p className="mt-4 text-xs text-indigo-500 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-900/40 p-3 rounded-xl border border-indigo-100 dark:border-indigo-800 max-w-md shadow-sm">
           <strong>Nota de Previsualización:</strong> Las políticas de seguridad bloquean SpeechRecognition en iframes de baja confianza. Haz clic en <strong>"Abrir en pestaña nueva"</strong> arribita a la derecha para usar la voz sin problemas.
        </p>
      )}
    </div>
  );
}

export function DialogueUI({ exercise, onResult, disabled, selectedVoiceURI, voiceSpeedPrompt, mode, onChangeKeyboardMode, allowedKeyboards, strictTyping, isSpeakMode, enableMicCountdown, enableMultiModalProgression, enableProgressiveGuidance, clickSavings }: any) {
  const [step, setStep] = useState(0);
  const [localError, setLocalError] = useState(false);
  const [isAdvancing, setIsAdvancing] = useState(false);
  const dialogue = exercise.dialogue;
  const chatRef = useRef<HTMLDivElement>(null);

  const handleBotNext = () => {
    if (step >= dialogue.length - 1) {
      onResult('SPECIAL_CORRECT_FLAG');
    } else {
      setStep(s => s + 1);
    }
  };

  useEffect(() => {
    setLocalError(false);
    if (step < dialogue.length && dialogue[step].speaker !== 'B') {
       playTTS(dialogue[step].eng, 'en', selectedVoiceURI, voiceSpeedPrompt, true);
       if (clickSavings) {
         const t = setTimeout(() => {
           handleBotNext();
         }, 2200);
         return () => clearTimeout(t);
       }
    }
    if (chatRef.current) {
       setTimeout(() => { chatRef.current!.scrollTop = chatRef.current!.scrollHeight; }, 100);
    }
  }, [step, dialogue, selectedVoiceURI, voiceSpeedPrompt, clickSavings]);

  const handleUserAttempt = (val: string) => {
      const currentLine = dialogue[step];
      const cleanText = (s: string) => {
         let t = (s ? String(s).toLowerCase() : '');
         t = t.replace(/[‘’]/g, "'");
         t = t.replace(/\b(i'm|im)\b/g, "i am");
         t = t.replace(/\b(you're|youre)\b/g, "you are");
         t = t.replace(/\b(he's|hes)\b/g, "he is");
         t = t.replace(/\b(she's|shes)\b/g, "she is");
         t = t.replace(/\b(it's|its)\b/g, "it is");
         t = t.replace(/\b(we're|were)\b/g, "we are");
         t = t.replace(/\b(they're|theyre)\b/g, "they are");
         t = t.replace(/\b(that's|thats)\b/g, "that is");
         t = t.replace(/\b(who's|whos)\b/g, "who is");
         t = t.replace(/\b(what's|whats)\b/g, "what is");
         t = t.replace(/\b(where's|wheres)\b/g, "where is");
         t = t.replace(/\b(can't|cant)\b/g, "can not");
         t = t.replace(/\b(cannot)\b/g, "can not");
         t = t.replace(/\b(isn't|isnt)\b/g, "is not");
         t = t.replace(/\b(aren't|arent)\b/g, "are not");
         t = t.replace(/\b(don't|dont)\b/g, "do not");
         t = t.replace(/\b(doesn't|doesnt)\b/g, "does not");
         t = t.replace(/\b(didn't|didnt)\b/g, "did not");
         t = t.replace(/\b(won't|wont)\b/g, "will not");
         t = t.replace(/\b(wouldn't|wouldnt)\b/g, "would not");
         t = t.replace(/\b(couldn't|couldnt)\b/g, "could not");
         t = t.replace(/\b(shouldn't|shouldnt)\b/g, "should not");
         t = t.replace(/\b(hasn't|hasnt)\b/g, "has not");
         t = t.replace(/\b(haven't|havent)\b/g, "have not");
         t = t.replace(/\b(wasn't|wasnt)\b/g, "was not");
         t = t.replace(/\b(weren't|werent)\b/g, "were not");
         t = t.replace(/\b(i've|ive)\b/g, "i have");
         t = t.replace(/\b(you've|youve)\b/g, "you have");
         t = t.replace(/\b(we've|weve)\b/g, "we have");
         t = t.replace(/\b(they've|theyve)\b/g, "they have");
         t = t.replace(/\b(i'll)\b/g, 'i will');
         t = t.replace(/\b(you'll|youll)\b/g, "you will");
         t = t.replace(/\b(he'll)\b/g, 'he will');
         t = t.replace(/\b(she'll)\b/g, 'she will');
         t = t.replace(/\b(it'll|itll)\b/g, "it will");
         t = t.replace(/\b(we'll)\b/g, 'we will');
         t = t.replace(/\b(they'll|theyll)\b/g, "they will");
         t = t.replace(/\b(i'd)\b/g, 'i would');
         t = t.replace(/\b(let's)\b/g, 'let us');
         t = t.replace(/[.,!¿?¡:;"'()]/g, '');
         t = t.replace(/\s+/g, ' ');
         return t.trim();
      };
      const cleanUser = cleanText(val === 'SPECIAL_CORRECT_FLAG' ? currentLine.eng : val);
      const cleanCorrect = cleanText(currentLine.eng);
      
      let isMatch = false;
      if (val === 'SPECIAL_CORRECT_FLAG') {
          isMatch = true;
      } else if (isSpeakMode) {
          isMatch = cleanUser === cleanCorrect || cleanUser.includes(cleanCorrect) || cleanCorrect.includes(cleanUser);
      } else {
          isMatch = strictTyping ? val.trim() === currentLine.eng.trim() : cleanUser === cleanCorrect;
      }

      if (isMatch) {
          setLocalError(false);
          setIsAdvancing(true);
          
          if (step >= dialogue.length - 1) {
              setTimeout(() => {
                  onResult(val);
              }, 1200);
          } else {
              setTimeout(() => {
                  setStep(s => s + 1);
                  setIsAdvancing(false);
              }, 1200);
          }
      } else {
          setLocalError(true);
          playTTS("Try again", 'en', selectedVoiceURI, voiceSpeedPrompt, true);
      }
  };

  return (
    <div className="w-full flex flex-col gap-2 h-full max-w-lg mx-auto">
       <div ref={chatRef} className="flex flex-col gap-2 mb-2 max-h-[50vh] overflow-y-auto p-2 scroll-smooth">
         {dialogue.slice(0, step + 1).map((line: any, i: number) => (
            <div key={i} className={`flex gap-2 w-full ${line.speaker === 'B' ? 'justify-end' : 'justify-start'} animate-slide-up`}>
               {line.speaker !== 'B' && <div className="text-xl pt-1">{line.emoji || ''}</div>}
               <div className={`p-3 rounded-2xl max-w-[85%] shadow-sm ${line.speaker === 'B' ? 'bg-indigo-500 text-white rounded-tr-none' : 'bg-white dark:bg-slate-900 border-2 border-gray-100 rounded-tl-none'}`}>
                  {i < step || (i === step && line.speaker === 'B' && isSpeakMode)
                     ? (
                       <>
                         <p className={`font-bold ${line.speaker === 'B' ? 'text-white' : 'text-gray-800 dark:text-slate-200'}`}>{line.eng}</p>
                         <p className={`text-xs mt-1 ${line.speaker === 'B' ? 'text-indigo-200' : 'text-gray-500'}`}>{line.spa}</p>
                       </>
                     )
                     : (
                       line.speaker !== 'B' ? (
                         <>
                           <p className="font-bold text-gray-800 dark:text-slate-200">{line.eng}</p>
                           <p className="text-xs mt-1 text-gray-500">{line.spa}</p>
                           <button onClick={handleBotNext} className="mt-3 px-4 py-2 bg-indigo-100 text-indigo-700 dark:text-indigo-300 font-bold rounded-lg text-sm w-full hover:bg-indigo-200 shadow-sm active:scale-95 transition-transform">Continuar </button>
                         </>
                       ) : (
                         <div className="flex flex-col gap-2 min-w-[200px]">
                           <p className="text-sm font-bold text-indigo-100 mb-1 flex items-center gap-1"> Tu turno: <span className="text-white">{line.spa}</span></p>
                         </div>
                       )
                     )
                  }
               </div>
               {line.speaker === 'B' && <div className="text-xl pt-1"></div>}
            </div>
         ))}
       </div>

       {dialogue[step]?.speaker === 'B' && (
          <div className="w-full bg-white dark:bg-slate-900 p-3 rounded-2xl border-2 border-indigo-100 dark:border-indigo-800 shadow-sm animate-slide-up">
             {isSpeakMode ? (
                <SpeakUI key={`speak_${step}`} exercise={{ id: `${exercise.id}_speak_${step}`, textToRead: dialogue[step].eng, question: "Habla para responder:" }} onResult={handleUserAttempt} disabled={disabled || isAdvancing} speakPreview={false} showSpeakingWord={true} selectedVoiceURI={selectedVoiceURI} onWordClick={() => {}} enableMicCountdown={enableMicCountdown} clickSavings={clickSavings} />
             ) : (
                <HybridInputBox 
                   key={`write_${step}`} 
                   exercise={{ 
                      id: `${exercise.id}_write_${step}`, 
                      eng: dialogue[step].eng, 
                      spa: dialogue[step].spa, 
                      correctAnswer: dialogue[step].eng,
                      isSingleWord: false 
                   }} 
                   mode={mode} 
                   onChangeKeyboardMode={onChangeKeyboardMode} 
                   allowedKeyboards={allowedKeyboards} 
                   disabled={disabled || isAdvancing} 
                   onResult={handleUserAttempt} 
                   selectedVoiceURI={selectedVoiceURI} 
                   strictTyping={strictTyping} 
                   enableMultiModalProgression={false} 
                   enableProgressiveGuidance={false} 
                   clickSavings={clickSavings}
                />
             )}
              {localError && <p className="text-red-500 font-bold text-sm text-center mt-2 animate-pulse">Intenta de nuevo!</p>}
           </div>
       )}
    </div>
  );
}

export function MatchUI({ exercise, onResult, disabled, selectedVoiceURI, voiceSpeedPrompt = 0.9 }: any) {
  const [leftItems, setLeftItems] = useState<any[]>([]);
  const [rightItems, setRightItems] = useState<any[]>([]);
  const [selectedLeft, setSelectedLeft] = useState<string | null>(null);
  const [selectedRight, setSelectedRight] = useState<string | null>(null);
  const [matchedIds, setMatchedIds] = useState<string[]>([]);
  const [errorPair, setErrorPair] = useState<string | null>(null);

  useEffect(() => {
     setLeftItems([...exercise.pairs].sort(() => Math.random() - 0.5));
     setRightItems([...exercise.pairs].sort(() => Math.random() - 0.5));
  }, [exercise.pairs]);

  useEffect(() => {
     if (selectedLeft && selectedRight) {
        if (selectedLeft === selectedRight) {
            setMatchedIds(prev => {
                const updated = [...prev, selectedLeft];
                if (updated.length === exercise.pairs.length) {
                    setTimeout(() => onResult('SPECIAL_CORRECT_FLAG'), 800);
                }
                return updated;
            });
            setSelectedLeft(null);
            setSelectedRight(null);
        } else {
            setErrorPair(`${selectedLeft}-${selectedRight}`);
            setTimeout(() => {
                setErrorPair(null);
                setSelectedLeft(null);
                setSelectedRight(null);
            }, 600);
        }
     }
  }, [selectedLeft, selectedRight, exercise.pairs, onResult]);

  const truncateText = (text: string) => {
    if (!text) return "";
    if (text.length > 45) {
      return text.slice(0, 42) + "...";
    }
    return text;
  };

  const getFontSize = (text: string) => {
    if (!text) return "text-xs sm:text-sm";
    if (text.length > 28) return "text-[10px] sm:text-xs leading-tight";
    return "text-xs sm:text-sm leading-snug";
  };

  return (
    <div className="flex-1 flex flex-col items-center pt-2 w-full max-w-2xl px-2 mx-auto">
      <h3 className="text-base sm:text-lg font-extrabold text-center text-indigo-900 dark:text-indigo-200 mb-3 font-sans">{exercise.question}</h3>
      <div className="flex gap-2.5 sm:gap-2 w-full">
         <div className="flex-1 flex flex-col gap-2">
            {leftItems.map((item: any) => {
               const isMatched = matchedIds.includes(item.id);
               const isSelected = selectedLeft === item.id;
               const isError = errorPair?.split('-')[0] === item.id;
               
               let cardStyle = "bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-700 border-b-slate-300 text-slate-800 hover:bg-slate-50 dark:bg-slate-900 hover:border-slate-300";
               if (isMatched) {
                 cardStyle = "bg-green-100 border-green-300 border-b-green-400 text-green-700 opacity-90 cursor-default line-through";
               } else if (isError) {
                 cardStyle = "bg-red-100 border-red-300 border-b-red-400 text-red-700 animate-pulse";
               } else if (isSelected) {
                 cardStyle = "bg-indigo-100 border-indigo-300 border-b-indigo-400 text-indigo-900 dark:text-indigo-200 scale-[1.03] shadow-md z-10";
               }

               return (
                  <button 
                    key={`l_${item.id}`} 
                    disabled={isMatched || disabled} 
                    onClick={() => {
                       playTTS(item.eng, 'auto', selectedVoiceURI, voiceSpeedPrompt, true);
                       setSelectedLeft(item.id);
                    }} 
                    className={`p-2.5 min-h-[4rem] h-auto rounded-2xl font-bold border-2 border-b-4 transition-all active:scale-95 flex items-center justify-between px-3 ${getFontSize(item.eng)} ${cardStyle}`}
                  >
                     <span className="text-left break-words pr-1 flex-1">{truncateText(item.eng)}</span>
                     {isMatched && <span className="bg-green-500 text-white text-[9px] w-4.5 h-4.5 rounded-full flex-shrink-0 flex items-center justify-center font-black animate-scale-up select-none"></span>}
                  </button>
               )
            })}
         </div>
         <div className="flex-1 flex flex-col gap-2">
            {rightItems.map((item: any) => {
               const isMatched = matchedIds.includes(item.id);
               const isSelected = selectedRight === item.id;
               const isError = errorPair?.split('-')[1] === item.id;

               let cardStyle = "bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-700 border-b-slate-300 text-slate-800 hover:bg-slate-50 dark:bg-slate-900 hover:border-slate-300";
               if (isMatched) {
                 cardStyle = "bg-green-100 border-green-300 border-b-green-400 text-green-700 opacity-90 cursor-default line-through";
               } else if (isError) {
                 cardStyle = "bg-red-100 border-red-300 border-b-red-400 text-red-700 animate-pulse";
               } else if (isSelected) {
                 cardStyle = "bg-indigo-100 border-indigo-300 border-b-indigo-400 text-indigo-900 dark:text-indigo-200 scale-[1.03] shadow-md z-10";
               }

               return (
                  <button 
                    key={`r_${item.id}`} 
                    disabled={isMatched || disabled} 
                    onClick={() => {
                       playTTS(item.spa, 'auto', selectedVoiceURI, voiceSpeedPrompt, true);
                       setSelectedRight(item.id);
                    }} 
                    className={`p-2.5 min-h-[4rem] h-auto rounded-2xl font-bold border-2 border-b-4 transition-all active:scale-95 flex items-center justify-between px-3 ${getFontSize(item.spa)} ${cardStyle}`}
                  >
                     <span className="text-left break-words pr-1 flex-1">{truncateText(item.spa)}</span>
                     {isMatched && <span className="bg-green-500 text-white text-[9px] w-4.5 h-4.5 rounded-full flex-shrink-0 flex items-center justify-center font-black animate-scale-up select-none"></span>}
                  </button>
               )
            })}
         </div>
      </div>
    </div>
  );
}

export function DictationUI({ 
  exercise, 
  onResult, 
  disabled, 
  selectedVoiceURI, voiceSpeedPrompt, 
  onWordClick, 
  mode, 
  onChangeKeyboardMode, 
  allowedKeyboards, 
  strictTyping, 
  enableMultiModalProgression, 
  enableProgressiveGuidance, 
  randomizeKeyboardsMode, 
  clickSavings, 
  enableMicCountdown,
  dictationWordsPerChunk = 3,
  dictationPauseMs = 1500,
  dictationSpeed = 0.8
}: any) {
  const [phase, setPhase] = useState<'writing' | 'speaking'>('writing');
  const [speed, setSpeed] = useState(() => dictationSpeed || 0.8);
  const [isPlayingPausado, setIsPlayingPausado] = useState(false);
  const [activeChunkIndex, setActiveChunkIndex] = useState(-1);
  const [localError, setLocalError] = useState('');
  
  const isPlayingRef = useRef(false);

  // Split words and chunks reactively
  const textToSplit = exercise.textToSpeak || exercise.eng || '';
  const words = textToSplit.split(/\s+/).filter(Boolean);
  const chunks: string[] = [];
  for (let i = 0; i < words.length; i += dictationWordsPerChunk) {
    chunks.push(words.slice(i, i + dictationWordsPerChunk).join(' '));
  }

  // Synchronize speed with settings default if prop changes
  useEffect(() => {
    if (dictationSpeed) {
      setSpeed(dictationSpeed);
    }
  }, [dictationSpeed]);

  // Speaking states
  const [isListening, setIsListening] = useState(false);
  const [countdown, setCountdown] = useState<number | null>(null);
  const [sttError, setSttError] = useState('');
  const recRef = useRef<any>(null);

  useEffect(() => {
    setPhase('writing');
    setLocalError('');
    setSttError('');
    setCountdown(null);
    setIsListening(false);
    setIsPlayingPausado(false);
    isPlayingRef.current = false;
    setActiveChunkIndex(-1);
    if (recRef.current) {
      try { recRef.current.abort(); } catch (e) {}
      recRef.current = null;
    }
  }, [exercise.id]);

  useEffect(() => {
    return () => {
      isPlayingRef.current = false;
      if (recRef.current) {
        try { recRef.current.abort(); } catch (e) {}
        recRef.current = null;
      }
    };
  }, []);

  const playNormal = (customSpeed = speed) => {
    setIsPlayingPausado(false);
    isPlayingRef.current = false;
    setActiveChunkIndex(-1);
    playTTS(exercise.textToSpeak || exercise.eng, 'en', selectedVoiceURI, customSpeed, true);
  };

  const playWithPauses = async (customSpeed = speed) => {
    isPlayingRef.current = true;
    setIsPlayingPausado(true);
    setActiveChunkIndex(0);

    for (let idx = 0; idx < chunks.length; idx++) {
      if (!isPlayingRef.current) break;
      setActiveChunkIndex(idx);
      
      // Dictate the specific chunk
      await playTTS(chunks[idx], 'en', selectedVoiceURI, customSpeed, true);
      
      // Wait with sub-intervals so we can stop immediately if canceled
      const pauseStart = Date.now();
      while (Date.now() - pauseStart < dictationPauseMs) {
        if (!isPlayingRef.current) break;
        await new Promise(r => setTimeout(r, 50));
      }
    }
    
    setIsPlayingPausado(false);
    isPlayingRef.current = false;
    setActiveChunkIndex(-1);
  };

  // Autoplay dictation on start
  useEffect(() => {
    if (phase === 'writing' && !disabled) {
      const t = setTimeout(() => {
        playNormal(speed);
      }, 700);
      return () => clearTimeout(t);
    }
  }, [exercise.id, phase]);

  const evaluateWriting = (userAttempt: string) => {
    const target = (exercise.correctAnswer || exercise.eng || '').trim();
    const clean = (s: string) => {
      let t = String(s).toLowerCase();
      t = t.replace(/[‘’]/g, "'");
      t = t.replace(/\b(i'm|im)\b/g, "i am");
      t = t.replace(/\b(you're|youre)\b/g, "you are");
      t = t.replace(/\b(he's|hes)\b/g, "he is");
      t = t.replace(/\b(she's|shes)\b/g, "she is");
      t = t.replace(/\b(it's|its)\b/g, "it is");
      t = t.replace(/\b(we're|were)\b/g, "we are");
      t = t.replace(/\b(they're|theyre)\b/g, "they are");
      t = t.replace(/\b(that's|thats)\b/g, "that is");
      t = t.replace(/\b(who's|whos)\b/g, "who is");
      t = t.replace(/\b(what's|whats)\b/g, "what is");
      t = t.replace(/\b(where's|wheres)\b/g, "where is");
      t = t.replace(/\b(can't|cant)\b/g, "can not");
      t = t.replace(/\b(cannot)\b/g, "can not");
      t = t.replace(/\b(isn't|isnt)\b/g, "is not");
      t = t.replace(/\b(aren't|arent)\b/g, "are not");
      t = t.replace(/\b(don't|dont)\b/g, "do not");
      t = t.replace(/\b(doesn't|doesnt)\b/g, "does not");
      t = t.replace(/\b(didn't|didnt)\b/g, "did not");
      t = t.replace(/\b(won't|wont)\b/g, "will not");
      t = t.replace(/\b(wouldn't|wouldnt)\b/g, "would not");
      t = t.replace(/\b(couldn't|couldnt)\b/g, "could not");
      t = t.replace(/\b(shouldn't|shouldnt)\b/g, "should not");
      t = t.replace(/\b(hasn't|hasnt)\b/g, "has not");
      t = t.replace(/\b(haven't|havent)\b/g, "have not");
      t = t.replace(/\b(wasn't|wasnt)\b/g, "was not");
      t = t.replace(/\b(weren't|werent)\b/g, "were not");
      t = t.replace(/\b(i've|ive)\b/g, "i have");
      t = t.replace(/\b(you've|youve)\b/g, "you have");
      t = t.replace(/\b(we've|weve)\b/g, "we have");
      t = t.replace(/\b(they've|theyve)\b/g, "they have");
      t = t.replace(/\b(he'll)\b/g, 'he will');
      t = t.replace(/\b(she'll)\b/g, 'she will');
      t = t.replace(/\b(we'll)\b/g, 'we will');
      t = t.replace(/\b(i'll)\b/g, 'i will');
      t = t.replace(/\b(i'd)\b/g, 'i would');
      t = t.replace(/\b(let's)\b/g, 'let us');
      t = t.replace(/[.,!¿?¡:;"'()]/g, '');
      t = t.replace(/\s+/g, ' ');
      return t.trim();
    };
    return clean(userAttempt) === clean(target);
  };

  const handleWritingResult = (userAttempt: string) => {
    if (evaluateWriting(userAttempt)) {
      setLocalError('');
      setPhase('speaking');
      playTTS("¡Excelente! Ahora dictame tú en voz alta.", 'es', null, 1.0, true);
    } else {
      setLocalError("No coincide con el dictado. ¡Escucha de nuevo con atención!");
      playTTS("Try again", 'en', selectedVoiceURI, voiceSpeedPrompt, true);
    }
  };

  // STT Api
  useEffect(() => {
    if (countdown === null) return;
    if (countdown > 0) { const t = setTimeout(() => setCountdown(countdown - 1), 1000); return () => clearTimeout(t); } 
    else if (countdown === 0) startListeningApi();
  }, [countdown]);

  const startListeningApi = () => {
    try {
      addDiagLog("Dictado STT: Iniciando SpeechRecognition...");
      const SR = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      if (!SR) { 
          setSttError("Tu navegador no soporta el micrófono. Usa el botón 'Saltar' o prueba con Chrome."); 
          setCountdown(null); 
          return; 
      }
      
      if (recRef.current) {
        try { recRef.current.abort(); } catch (e) {}
      }

      const rec = new SR(); 
      recRef.current = rec;
      rec.lang = 'en-US'; 
      rec.interimResults = true; 
      rec.maxAlternatives = 1;
      
      let heard = false;
      let finalTranscript = '';
      
      rec.onstart = () => { 
          setIsListening(true); 
          setSttError(''); 
      };
      
      rec.onerror = (e: any) => { 
        setIsListening(false); 
        setCountdown(null); 
        if (recRef.current === rec) { recRef.current = null; }
        if (e.error === 'not-allowed') {
            setSttError("Permiso de micrófono denegado en este contexto.");
        } else {
            setSttError(`Error de micrófono: ${e.error}. Inténtalo de nuevo.`); 
        }
      };
      
      rec.onend = () => { 
        setIsListening(false); 
        setCountdown(null); 
        if (recRef.current === rec) { recRef.current = null; }
        if(!heard) { 
            setSttError("No se detectó voz. Habla fuerte cerca del micrófono!"); 
        } else if (finalTranscript) {
            onResult(finalTranscript);
        }
      };
      
      rec.onresult = (e: any) => { 
          heard = true; 
          for (let i = e.resultIndex; i < e.results.length; ++i) {
              if (e.results[i].isFinal) {
                  finalTranscript += e.results[i][0].transcript;
                  rec.stop();
              } else {
                  setSttError(`Escuchando: ${e.results[i][0].transcript}...`);
              }
          }
      };
      
      rec.start();
    } catch (err: any) {
      setIsListening(false);
      setCountdown(null);
      setSttError("Error al iniciar el micrófono.");
    }
  };

  const handleStartMic = () => {
    if (disabled || isListening || countdown !== null) return;
    setSttError('');
    if (enableMicCountdown) {
        setCountdown(3);
    } else {
        startListeningApi();
    }
  };

  const handleToggleMic = () => {
    if (disabled) return;
    if (isListening || countdown !== null) {
      setCountdown(null);
      if (recRef.current) {
        try { recRef.current.abort(); } catch (e) {}
        recRef.current = null;
      }
      setIsListening(false);
    } else {
      handleStartMic();
    }
  };

  return (
    <div className="flex-1 flex flex-col items-center pt-2 w-full">
      {phase === 'writing' ? (
        <div className="w-full flex-1 flex flex-col">
          {/* Header  */}
          <div className="bg-slate-100/60 dark:bg-slate-800/60 border-l-4 border-l-violet-500 border border-slate-200 dark:border-slate-800 p-3 rounded-2xl flex items-center gap-2 mb-2 shadow-sm shrink-0 text-left">
            <span className="text-xl">👩‍🏫</span>
            <div className="flex-1 min-w-0">
              <h4 className="font-black text-slate-800 dark:text-slate-100 text-sm">Paso 1: Escribe lo que dicta la profesora</h4>
              <p className="text-xs text-slate-500 dark:text-slate-400 font-medium leading-relaxed">Lisa te dictará una frase. Escucha con atención y escríbela en inglés.</p>
            </div>
          </div>

          {/* Controls Panel */}
          <div className="bg-slate-100/80 dark:bg-slate-800/60 border-2 border-indigo-200 dark:border-indigo-800 dark:border-slate-800 rounded-2xl p-3 mb-2 flex flex-col gap-2 shadow-sm shrink-0">
            {/* Speed Control */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 border-b border-indigo-100 dark:border-indigo-800/30 dark:border-slate-700/60">
              <span className="text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1">⚡ Velocidad de voz:</span>
              <div className="flex gap-1">
                {[0.6, 0.8, 1.0, 1.2].map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => { setSpeed(s); playNormal(s); }}
                    className={`px-3 py-1 text-xs font-black rounded-lg border transition active:scale-95 ${speed === s ? 'bg-violet-500 border-violet-600 text-white shadow-sm' : 'bg-slate-200/50 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 border-indigo-200 dark:border-indigo-800 dark:border-slate-700 text-indigo-700 dark:text-indigo-300'}`}
                  >
                    {s === 1.0 ? '1.0x (Normal)' : `${s}x`}
                  </button>
                ))}
              </div>
            </div>

            {/* Play Buttons */}
            <div className="flex flex-col sm:flex-row gap-2">
              <button
                type="button"
                onClick={() => playNormal(speed)}
                className="flex-1 p-3 bg-indigo-500 hover:bg-indigo-600 text-white font-bold rounded-xl border-b-4 border-indigo-700 active:border-b-0 active:translate-y-[2px] transition flex items-center justify-center gap-2 shadow-sm text-sm"
              >
                <Volume2 size={18} />
                <span>🔊 Escuchar corrido</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  if (isPlayingPausado) {
                    setIsPlayingPausado(false);
                  } else {
                    playWithPauses(speed);
                  }
                }}
                className={`flex-1 p-3 font-bold rounded-xl border-b-4 active:border-b-0 active:translate-y-[2px] transition flex items-center justify-center gap-2 shadow-sm text-sm ${isPlayingPausado ? 'bg-amber-500 hover:bg-amber-600 border-amber-700 text-white shadow-none border-b-0 translate-y-[2px]' : 'bg-amber-50 hover:bg-amber-100 dark:bg-amber-950/20 dark:hover:bg-amber-950/40 border-amber-200 dark:border-amber-900 text-amber-700 dark:text-amber-300'}`}
              >
                {isPlayingPausado ? <Pause size={18} /> : <Play size={18} />}
                <span>{isPlayingPausado ? 'Detener dictado' : '💬 Dictar con pausas'}</span>
              </button>
            </div>

            {isPlayingPausado && chunks.length > 0 && (
              <div className="flex flex-wrap gap-1.5 justify-center py-2 border-t border-indigo-100 dark:border-indigo-800/50 mt-1">
                {chunks.map((_c, idx) => (
                  <span 
                    key={idx}
                    className={`px-2.5 py-1 text-[10px] font-bold rounded-lg transition-all duration-300 ${
                      idx === activeChunkIndex 
                        ? 'bg-amber-500 text-white scale-105 shadow-sm animate-pulse' 
                        : idx < activeChunkIndex 
                          ? 'bg-indigo-100 text-indigo-700 dark:text-indigo-300 opacity-60' 
                          : 'bg-indigo-50 dark:bg-indigo-900/40 text-indigo-400'
                    }`}
                  >
                    Bloque {idx + 1}
                  </span>
                ))}
              </div>
            )}
          </div>

          {localError && (
            <div className="mb-3 px-4 py-2 bg-red-50 border border-red-200 text-red-600 rounded-xl text-xs font-semibold text-center animate-shake">
              ⚠️ {localError}
            </div>
          )}

          {/* HybridInputBox for Phase 1 */}
          <div className="flex-1 flex flex-col justify-end">
            <HybridInputBox
              exercise={exercise}
              mode={mode}
              onChangeKeyboardMode={onChangeKeyboardMode}
              allowedKeyboards={allowedKeyboards}
              disabled={disabled}
              onResult={handleWritingResult}
              selectedVoiceURI={selectedVoiceURI}
              strictTyping={strictTyping}
              enableMultiModalProgression={enableMultiModalProgression}
              enableProgressiveGuidance={enableProgressiveGuidance}
              randomizeKeyboardsMode={randomizeKeyboardsMode}
              clickSavings={clickSavings}
            />
          </div>
        </div>
      ) : (
        <div className="w-full flex-1 flex flex-col items-center">
          {/* Header Paso 2 */}
          <div className="bg-slate-100/60 dark:bg-slate-800/60 border-l-4 border-l-emerald-500 border border-slate-200 dark:border-slate-800 p-3 rounded-2xl flex items-center gap-2 mb-3 shadow-sm w-full text-left">
            <span className="text-xl">👩‍🏫</span>
            <div className="flex-1 min-w-0">
              <h4 className="font-black text-slate-800 dark:text-slate-100 text-sm">Paso 2: Dicta tú a la Profesora Lisa</h4>
              <p className="text-xs text-slate-500 dark:text-slate-400 font-medium leading-relaxed">✨ ¡Excelente escritura! Ahora léele la frase a Lisa en voz alta para evaluar tu pronunciación.</p>
            </div>
          </div>

          {/* Target Text Box */}
          <div className="bg-slate-100/50 dark:bg-slate-900/40 border-2 border-indigo-100 dark:border-indigo-800 dark:border-slate-800 rounded-2xl p-3 w-full text-center mb-3 shadow-inner relative overflow-hidden flex flex-col items-center justify-center min-h-[8rem]">
            {/* Play Answer button for reference */}
            <button
              onClick={() => playNormal(1.0)}
              className="absolute top-2 right-2 p-2 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 border border-indigo-200 dark:border-indigo-800 dark:border-slate-700 rounded-full shadow-sm text-indigo-500 dark:text-indigo-400 active:scale-95 transition"
              title="Escuchar pronunciación correcta"
            >
              <Volume2 size={16} />
            </button>
            <p className="text-xs font-bold text-slate-400 dark:text-slate-500 mb-2 select-none uppercase tracking-wider">Lee esta frase:</p>
            <p className="text-xl sm:text-xl font-black text-indigo-900 dark:text-indigo-200 leading-normal tracking-wide">{exercise.eng}</p>
            <p className="text-sm font-medium text-slate-500 dark:text-slate-400 mt-2">({exercise.spa})</p>
          </div>

          {/* Recording Microphone Panel */}
          <div className="flex flex-col items-center gap-2 w-full mt-auto mb-3">
            {countdown !== null && (
              <div className="text-center animate-ping text-xl font-black text-rose-500 mb-2">
                {countdown}
              </div>
            )}

            {sttError && (
              <p className="text-xs font-bold text-rose-600 bg-rose-50 border border-rose-200 rounded-xl px-4 py-2.5 max-w-md text-center shadow-sm leading-relaxed">
                {sttError}
              </p>
            )}

            <button
              type="button"
              onClick={handleToggleMic}
              disabled={disabled}
              className={`w-24 h-24 rounded-full flex flex-col items-center justify-center border-b-8 transition-all relative ${isListening ? 'bg-rose-500 border-rose-700 animate-pulse text-white scale-[1.05]' : 'bg-indigo-600 hover:bg-indigo-500 border-indigo-800 text-white active:border-b-0 active:translate-y-2'}`}
            >
              <Mic size={36} />
              <span className="text-[10px] font-black uppercase mt-1 tracking-wider">{isListening ? 'Escuchando' : 'Grabar'}</span>
            </button>

            <p className="text-xs text-slate-400 font-bold tracking-wide select-none">
              {isListening ? '🎙️ ¡Habla ahora!' : 'Haz clic en el micrófono para hablar.'}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
