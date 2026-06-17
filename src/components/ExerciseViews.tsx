import { Mic, Volume2 } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { playTTS, addDiagLog } from '../utils';
import { HybridInputBox } from './Keyboards';
import { TranslatableText } from './UIComponents';

export function FlashcardSingleUI({ exercise, onResult, disabled, selectedVoiceURI, mode, onChangeKeyboardMode, allowedKeyboards, flashcardMode, strictTyping, enableMultiModalProgression, enableProgressiveGuidance, randomizeKeyboardsMode }: any) {
  const [isFlipped, setIsFlipped] = useState(false);

  const playEng = () => {
    playTTS(exercise.eng, 'en', selectedVoiceURI);
  };

  const handleResult = (val: string) => {
    if (!isFlipped) setIsFlipped(true);
    onResult(val);
  };

  if (flashcardMode === 'classic') {
    return (
      <div className="flex-1 flex flex-col items-center w-full pb-4">
        <h3 className="text-xl font-bold text-center text-gray-700 mb-4">¿Cómo se dice en inglés?</h3>
        
        <div onClick={() => { if(!disabled && !isFlipped) { setIsFlipped(true); playEng(); } }} className={`relative w-full max-w-sm h-56 transition-transform duration-500 transform-style-3d ${disabled ? '' : 'cursor-pointer'} shadow-xl rounded-3xl ${isFlipped || disabled ? 'rotate-y-180' : ''}`}>
          <div className="absolute w-full h-full bg-white rounded-3xl flex flex-col items-center justify-center p-6 text-center border-b-8 border-indigo-200 backface-hidden">
            <div className="text-5xl mb-2">{exercise.emoji}</div>
            <h2 className="text-2xl font-bold text-indigo-900">{exercise.spa}</h2>
            <div className="absolute bottom-4 text-gray-400 font-medium text-sm animate-pulse">Toca para girar</div>
          </div>
          <div className="absolute w-full h-full bg-indigo-500 rounded-3xl flex flex-col items-center justify-center p-6 text-center border-b-8 border-indigo-700 rotate-y-180 backface-hidden">
            <div className="text-5xl mb-2 opacity-50">{exercise.emoji}</div>
            <h2 className="text-3xl font-bold text-white">{exercise.eng}</h2>
          </div>
        </div>

        {!disabled && isFlipped && (
          <div className="flex gap-4 mt-8 w-full max-w-sm">
            <button onClick={() => handleResult('WRONG_ANSWER_FORCE')} className="flex-1 py-4 bg-red-100 border-b-4 border-red-500 text-red-700 font-bold rounded-xl active:scale-95 text-lg">🔴 No la sé</button>
            <button onClick={() => handleResult(exercise.eng)} className="flex-1 py-4 bg-green-500 border-b-4 border-green-700 text-white font-bold rounded-xl active:scale-95 text-lg">🟢 ¡La sé!</button>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col items-center w-full">
      <h3 className="text-xl font-bold text-center text-gray-700 mb-2">¿Cómo se dice en inglés?</h3>
      <div className="text-5xl mb-2 bg-white p-4 rounded-full shadow-sm">{exercise.emoji}</div>
      <h2 className="text-2xl font-bold text-indigo-900 mb-6 text-center">{exercise.spa}</h2>
      
      {!isFlipped ? (
         <>
           <HybridInputBox exercise={exercise} mode={mode} onChangeKeyboardMode={onChangeKeyboardMode} allowedKeyboards={allowedKeyboards} disabled={disabled} onResult={handleResult} selectedVoiceURI={selectedVoiceURI} strictTyping={strictTyping} enableMultiModalProgression={enableMultiModalProgression} enableProgressiveGuidance={enableProgressiveGuidance} randomizeKeyboardsMode={randomizeKeyboardsMode}/>
         </>
      ) : (
         <div className="w-full flex-1 flex flex-col items-center justify-center">
            <div className="text-3xl font-bold text-indigo-600 bg-indigo-50 p-6 rounded-2xl border-2 border-indigo-100 mb-8">{exercise.eng}</div>
         </div>
      )}
    </div>
  );
}

export function ReadingUI({ exercise, onResult, disabled, selectedVoiceURI, mode, onChangeKeyboardMode, allowedKeyboards, strictTyping, enableMultiModalProgression, enableProgressiveGuidance, randomizeKeyboardsMode }: any) {
  const handleOptionClick = (opt: string) => {
    if (disabled) return;
    playTTS(opt, exercise.optionsLang || 'en', selectedVoiceURI, 0.9, true);
    onResult(opt);
  };

  const isKeyboardLayout = enableMultiModalProgression && exercise.targetKeyboardMode !== undefined;

  return (
    <div className="flex-1 flex flex-col w-full">
      <div className="bg-white border-2 border-indigo-200 border-l-8 border-l-indigo-500 p-4 rounded-xl shadow-sm mb-6 text-gray-800 font-medium italic text-lg text-left whitespace-pre-wrap">
        {exercise.readingText}
      </div>
      <h3 className="text-xl font-bold text-center text-indigo-900 mb-6 px-2">
         {exercise.question}
      </h3>
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
        />
      ) : (
        <div className="grid gap-3 mt-auto w-full">
          {exercise.options.map((opt: string, i: number) => (
            <button key={i} disabled={disabled} onClick={() => handleOptionClick(opt)} className={`p-4 rounded-xl border-b-4 border-2 font-bold transition active:scale-95 text-left ${disabled ? 'bg-gray-100 border-gray-200 text-gray-400' : 'bg-white border-indigo-200 border-b-indigo-300 text-indigo-900'}`}>{opt}</button>
          ))}
        </div>
      )}
    </div>
  );
}

export function QuizUI({ exercise, onResult, disabled, onWordClick, selectedVoiceURI, mode, onChangeKeyboardMode, allowedKeyboards, strictTyping, enableMultiModalProgression, enableProgressiveGuidance, randomizeKeyboardsMode }: any) {
  const handleOptionClick = (opt: string) => {
    if (disabled) return;
    playTTS(opt, exercise.optionsLang || 'auto', selectedVoiceURI, 0.9, true);
    onResult(opt);
  };

  const isKeyboardLayout = enableMultiModalProgression && exercise.targetKeyboardMode !== undefined;

  return (
    <div className="flex-1 flex flex-col w-full">
      <h3 className="text-xl font-bold text-center text-gray-800 mb-6">
         <TranslatableText text={exercise.question} onWordClick={onWordClick} defaultLang="es" />
      </h3>
      {exercise.skill === 'Similar' && (
        <div className="mb-4 bg-orange-50 border-2 border-orange-200 rounded-2xl p-4 flex gap-3 text-orange-800 text-xs sm:text-sm shadow-sm animate-pulse">
          <span className="text-xl shrink-0">🔍</span>
          <div>
            <strong className="font-extrabold text-orange-900 block mb-0.5">¡Cuidado! Son súper parecidas</strong>
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
        />
      ) : (
        <div className="grid gap-3 mt-auto w-full">
          {exercise.options.map((opt: string, i: number) => (
            <button key={i} disabled={disabled} onClick={() => handleOptionClick(opt)} className={`p-4 rounded-xl border-b-4 border-2 font-bold transition active:scale-95 text-left ${disabled ? 'bg-gray-100 border-gray-200 text-gray-400' : 'bg-white border-indigo-200 border-b-indigo-300 text-indigo-900 hover:bg-slate-50'}`}>{opt}</button>
          ))}
        </div>
      )}
    </div>
  );
}

export function ListenWriteUI({ exercise, onResult, disabled, selectedVoiceURI, onWordClick, mode, onChangeKeyboardMode, allowedKeyboards, strictTyping, enableMultiModalProgression, enableProgressiveGuidance, randomizeKeyboardsMode }: any) {
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
      <h3 className="text-lg font-bold text-center text-gray-700 mb-4">
        <TranslatableText text={exercise.question} onWordClick={onWordClick} defaultLang="es" />
      </h3>
      <div className="flex gap-4 mb-6 items-end">
        <button onClick={() => playAudio(0.9)} disabled={disabled} className="w-16 h-16 bg-blue-500 text-white rounded-2xl flex items-center justify-center border-b-4 border-blue-700 active:border-b-0" title="Escuchar audio normal"><Volume2 size={32} /></button>
        <button onClick={() => playAudio(0.4)} disabled={disabled} className="w-12 h-12 bg-blue-400 text-white rounded-xl flex items-center justify-center border-b-4 border-blue-600 active:border-b-0" title="Escuchar lento (Tortuga)"><span className="text-xl">🐢</span></button>
      </div>
      
      <HybridInputBox exercise={exercise} mode={mode} onChangeKeyboardMode={onChangeKeyboardMode} allowedKeyboards={allowedKeyboards} disabled={disabled} onResult={onResult} selectedVoiceURI={selectedVoiceURI} strictTyping={strictTyping} enableMultiModalProgression={enableMultiModalProgression} enableProgressiveGuidance={enableProgressiveGuidance} randomizeKeyboardsMode={randomizeKeyboardsMode} />
    </div>
  );
}

export function BuildSentenceUI({ exercise, onResult, disabled, selectedVoiceURI, onWordClick, mode, onChangeKeyboardMode, allowedKeyboards, strictTyping, enableMultiModalProgression, enableProgressiveGuidance, randomizeKeyboardsMode }: any) {
  return (
    <div className="flex-1 flex flex-col items-center pt-2 w-full">
      <h3 className="text-lg font-bold text-center text-gray-700 mb-6">
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
      />
    </div>
  );
}

export function SpeakUI({ exercise, onResult, disabled, speakPreview, showSpeakingWord, selectedVoiceURI, onWordClick, enableMicCountdown }: any) {
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
        addDiagLog(`STT Event: Finalizó sesión de escucha (onend). Se escuchó algo: ${heard}, texto final: "${finalTranscript}"`);
        setIsListening(false); 
        setCountdown(null); 
        if (recRef.current === rec) {
          recRef.current = null;
        }
        if(!heard) { 
            setErrorText("No se detectó voz. ¡Por favor habla fuerte cerca del micrófono!"); 
        } else if (finalTranscript) {
            onResult(finalTranscript);
        }
      };
      
      rec.onresult = (e: any) => { 
          heard = true; 
          for (let i = e.resultIndex; i < e.results.length; ++i) {
              if (e.results[i].isFinal) {
                  finalTranscript += e.results[i][0].transcript;
                  addDiagLog(`STT: Transcripción final fragmento: "${e.results[i][0].transcript}"`);
                  rec.stop();
              } else {
                  addDiagLog(`STT: Transcripción parcial (interim): "${e.results[i][0].transcript}"`);
                  setErrorText(`Escuchando: ${e.results[i][0].transcript}...`);
              }
          }
      };
      
      rec.start();
    } catch (err: any) {
      addDiagLog(`STT Error Crítico al arrancar reconocimiento: ${err?.message || err}`);
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
            className="mt-3 px-3 py-1 bg-indigo-50 hover:bg-indigo-100 text-indigo-600 rounded-lg text-xs font-bold transition active:scale-95 flex items-center gap-1 border border-indigo-200 shadow-sm"
          >
            💡 Ver pista
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
      <h3 className="text-lg font-bold text-gray-700 mb-2">
         <TranslatableText text={exercise.question} onWordClick={onWordClick} defaultLang="es" />
      </h3>
      <div className="bg-white p-4 rounded-2xl border-2 border-gray-200 shadow-sm mb-4 w-full relative min-h-[100px] flex items-center justify-center">
        {speakPreview && (
          <div className="absolute -top-4 -right-2 flex gap-2">
            <button onClick={() => playAudio(0.4)} className="bg-blue-400 text-white p-2 rounded-full shadow-lg hover:bg-blue-500 active:scale-90" title="Escuchar lento (Tortuga)"><span className="text-lg">🐢</span></button>
            <button onClick={() => playAudio(0.9)} className="bg-blue-500 text-white p-2 rounded-full shadow-lg hover:bg-blue-600 active:scale-90" title="Escuchar normal"><Volume2 size={24} /></button>
          </div>
        )}
        <div className="text-2xl font-bold text-gray-800 mt-2">
          {renderTextWithHighlight()}
        </div>
      </div>

      <div className="relative h-28 w-28 mt-2">
        {countdown !== null && countdown > 0 ? (
          <div className="absolute inset-0 bg-yellow-400 rounded-full flex items-center justify-center shadow-inner text-white text-5xl font-bold animate-pulse">{countdown}</div>
        ) : (
          <button onClick={handleStartMic} disabled={disabled || isListening} className={`absolute inset-0 rounded-full flex items-center justify-center transition-all border-b-8 ${isListening ? 'bg-red-500 border-red-700' : disabled ? 'bg-gray-300 border-gray-400' : 'bg-blue-500 border-blue-700'} text-white`} title="Iniciar grabación"><Mic size={48} className={isListening ? 'animate-pulse' : ''} /></button>
        )}
      </div>
      <p className="mt-4 font-bold text-gray-500">{countdown !== null && countdown > 0 ? '¡Prepárate...!' : isListening ? '¡Habla AHORA!' : 'Toca para hablar'}</p>

      {errorText && <p className="mt-2 text-red-500 font-bold">{errorText}</p>}

      {window.self !== window.top && (
        <p className="mt-4 text-xs text-indigo-500 bg-indigo-50 p-3 rounded-xl border border-indigo-100 max-w-md shadow-sm">
          💡 <strong>Nota de Previsualización:</strong> Las políticas de seguridad bloquean SpeechRecognition en iframes de baja confianza. Haz clic en <strong>"Abrir en pestaña nueva"</strong> arribita a la derecha para usar la voz sin problemas.
        </p>
      )}
    </div>
  );
}

export function DialogueUI({ exercise, onResult, disabled, selectedVoiceURI, mode, onChangeKeyboardMode, allowedKeyboards, strictTyping, isSpeakMode, enableMicCountdown, enableMultiModalProgression, enableProgressiveGuidance }: any) {
  const [step, setStep] = useState(0);
  const [localError, setLocalError] = useState(false);
  const [isAdvancing, setIsAdvancing] = useState(false);
  const dialogue = exercise.dialogue;
  const chatRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setLocalError(false);
    if (step < dialogue.length && dialogue[step].speaker !== 'B') {
       playTTS(dialogue[step].eng, 'en', selectedVoiceURI, 0.9, true);
    }
    if (chatRef.current) {
       setTimeout(() => { chatRef.current!.scrollTop = chatRef.current!.scrollHeight; }, 100);
    }
  }, [step, dialogue, selectedVoiceURI]);

  const handleBotNext = () => setStep(s => s + 1);

  const handleUserAttempt = (val: string) => {
      const currentLine = dialogue[step];
      const cleanUser = val.toLowerCase().replace(/[.,!¿?¡:;"'()]/g, '').trim();
      const cleanCorrect = currentLine.eng.toLowerCase().replace(/[.,!¿?¡:;"'()]/g, '').trim();
      let isMatch = false;

      if (isSpeakMode) {
          isMatch = cleanUser === cleanCorrect || cleanUser.includes(cleanCorrect) || cleanCorrect.includes(cleanUser);
      } else {
          isMatch = strictTyping ? val.trim() === currentLine.eng.trim() : cleanUser === cleanCorrect;
      }

      if (isMatch) {
          setLocalError(false);
          setIsAdvancing(true);
          playTTS(currentLine.eng, 'en', selectedVoiceURI, 0.9, true);
          if (step === dialogue.length - 1) {
              setTimeout(() => onResult('SPECIAL_CORRECT_FLAG'), 1200);
          } else {
              setTimeout(() => {
                  setStep(s => s + 1);
                  setIsAdvancing(false);
              }, 1200);
          }
      } else {
          setLocalError(true);
          playTTS("Try again", 'en', selectedVoiceURI, 1.0, true);
      }
  };

  return (
    <div className="w-full flex flex-col gap-4 h-full max-w-lg mx-auto">
       <div ref={chatRef} className="flex flex-col gap-3 mb-4 max-h-[50vh] overflow-y-auto p-2 scroll-smooth">
         {dialogue.slice(0, step + 1).map((line: any, i: number) => (
            <div key={i} className={`flex gap-2 w-full ${line.speaker === 'B' ? 'justify-end' : 'justify-start'} animate-slide-up`}>
               {line.speaker !== 'B' && <div className="text-3xl pt-1">{line.emoji || '💬'}</div>}
               <div className={`p-4 rounded-2xl max-w-[85%] shadow-sm ${line.speaker === 'B' ? 'bg-indigo-500 text-white rounded-tr-none' : 'bg-white border-2 border-gray-100 rounded-tl-none'}`}>
                  {i < step || (i === step && line.speaker === 'B' && isSpeakMode)
                     ? (
                       <>
                         <p className={`font-bold ${line.speaker === 'B' ? 'text-white' : 'text-gray-800'}`}>{line.eng}</p>
                         <p className={`text-xs mt-1 ${line.speaker === 'B' ? 'text-indigo-200' : 'text-gray-500'}`}>{line.spa}</p>
                       </>
                     )
                     : (
                       line.speaker !== 'B' ? (
                         <>
                           <p className="font-bold text-gray-800">{line.eng}</p>
                           <p className="text-xs mt-1 text-gray-500">{line.spa}</p>
                           <button onClick={handleBotNext} className="mt-3 px-4 py-2 bg-indigo-100 text-indigo-700 font-bold rounded-lg text-sm w-full hover:bg-indigo-200 shadow-sm active:scale-95 transition-transform">Continuar ⬇️</button>
                         </>
                       ) : (
                         <div className="flex flex-col gap-2 min-w-[200px]">
                           <p className="text-sm font-bold text-indigo-100 mb-1 flex items-center gap-1">🗣️ Tu turno: <span className="text-white">{line.spa}</span></p>
                         </div>
                       )
                     )
                  }
               </div>
               {line.speaker === 'B' && <div className="text-3xl pt-1">🧑‍💻</div>}
            </div>
         ))}
       </div>

       {dialogue[step]?.speaker === 'B' && (
          <div className="w-full bg-white p-4 rounded-2xl border-2 border-indigo-100 shadow-sm animate-slide-up">
             {isSpeakMode ? (
                <SpeakUI key={`speak_${step}`} exercise={{ id: `${exercise.id}_speak_${step}`, textToRead: dialogue[step].eng, question: "Habla para responder:" }} onResult={handleUserAttempt} disabled={disabled || isAdvancing} speakPreview={false} showSpeakingWord={true} selectedVoiceURI={selectedVoiceURI} onWordClick={() => {}} enableMicCountdown={enableMicCountdown} />
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
                />
             )}
              {localError && <p className="text-red-500 font-bold text-sm text-center mt-2 animate-pulse">¡Intenta de nuevo!</p>}
           </div>
        )}
    </div>
  );
}

export function MatchUI({ exercise, onResult, disabled }: any) {
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

  return (
    <div className="flex-1 flex flex-col items-center pt-2 w-full max-w-sm mx-auto">
      <h3 className="text-lg font-extrabold text-center text-indigo-900 mb-6 font-sans">{exercise.question}</h3>
      <div className="flex gap-4 w-full">
         <div className="flex-1 flex flex-col gap-3">
            {leftItems.map((item: any) => {
               const isMatched = matchedIds.includes(item.id);
               const isSelected = selectedLeft === item.id;
               const isError = errorPair?.split('-')[0] === item.id;
               
               let cardStyle = "bg-white border-slate-200 border-b-slate-300 text-slate-800 hover:bg-slate-50 hover:border-slate-300";
               if (isMatched) {
                 cardStyle = "bg-green-100 border-green-300 border-b-green-400 text-green-700 opacity-90 cursor-default line-through";
               } else if (isError) {
                 cardStyle = "bg-red-100 border-red-300 border-b-red-400 text-red-700 animate-pulse";
               } else if (isSelected) {
                 cardStyle = "bg-indigo-100 border-indigo-300 border-b-indigo-400 text-indigo-900 scale-[1.03] shadow-md z-10";
               }

               return (
                  <button 
                    key={`l_${item.id}`} 
                    disabled={isMatched || disabled} 
                    onClick={() => setSelectedLeft(item.id)} 
                    className={`p-3.5 h-16 rounded-2xl font-bold border-2 border-b-4 transition-all active:scale-95 flex items-center justify-between px-4 text-sm sm:text-base ${cardStyle}`}
                  >
                     <span>{item.eng}</span>
                     {isMatched && <span className="bg-green-500 text-white text-[10px] w-4.5 h-4.5 rounded-full flex items-center justify-center font-black animate-scale-up select-none">✓</span>}
                  </button>
               )
            })}
         </div>
         <div className="flex-1 flex flex-col gap-3">
            {rightItems.map((item: any) => {
               const isMatched = matchedIds.includes(item.id);
               const isSelected = selectedRight === item.id;
               const isError = errorPair?.split('-')[1] === item.id;

               let cardStyle = "bg-white border-slate-200 border-b-slate-300 text-slate-800 hover:bg-slate-50 hover:border-slate-300";
               if (isMatched) {
                 cardStyle = "bg-green-100 border-green-300 border-b-green-400 text-green-700 opacity-90 cursor-default line-through";
               } else if (isError) {
                 cardStyle = "bg-red-100 border-red-300 border-b-red-400 text-red-700 animate-pulse";
               } else if (isSelected) {
                 cardStyle = "bg-indigo-100 border-indigo-300 border-b-indigo-400 text-indigo-900 scale-[1.03] shadow-md z-10";
               }

               return (
                  <button 
                    key={`r_${item.id}`} 
                    disabled={isMatched || disabled} 
                    onClick={() => setSelectedRight(item.id)} 
                    className={`p-3.5 h-16 rounded-2xl font-bold border-2 border-b-4 transition-all active:scale-95 flex items-center justify-between px-4 text-sm sm:text-base ${cardStyle}`}
                  >
                     <span>{item.spa}</span>
                     {isMatched && <span className="bg-green-500 text-white text-[10px] w-4.5 h-4.5 rounded-full flex items-center justify-center font-black animate-scale-up select-none">✓</span>}
                  </button>
               )
            })}
         </div>
      </div>
    </div>
  );
}
