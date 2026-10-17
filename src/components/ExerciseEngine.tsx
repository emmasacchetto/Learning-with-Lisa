import { BrainCircuit, CheckCircle2, Clock, Flag, Heart, SkipForward, XCircle, Settings, HelpCircle, Terminal, Mic, Volume2, RefreshCw, ChevronDown, ChevronUp, AlertCircle, ExternalLink, Pencil, PenTool } from 'lucide-react';
import { useEffect, useState, useRef } from 'react';
import { MOTIVATION_RIGHT, MOTIVATION_WRONG } from '../data';
import { playTTS, addDiagLog } from '../utils';
import { BuildSentenceUI, DialogueUI, FlashcardSingleUI, ListenWriteUI, QuizUI, ReadingUI, SpeakUI, MatchUI, DictationUI } from './ExerciseViews';

export function ExerciseEngine({ exercise, onProceed, progress, total, current, skill, onExit, isPermissive, speakPermissive, speakPreview, showSpeakingWord, selectedVoiceURI, enableTimer, timerSeconds, defaultKeyboardMode, onChangeKeyboardMode, allowedKeyboards, onSaveMistake, onRemoveMistake, isMistakeMode, onUpdateStats, strictMistakeLogging, alwaysAllowFreeKeyboard, onWordClickGlobal, enableVoiceFeedback, enableMarkAsKnown, flashcardMode, strictTyping, enableMultiModalProgression, enableProgressiveGuidance, guidanceCount, guideTrackingCount, enableMicCountdown, randomizeKeyboardsMode, clickSavings, hidePositiveFeedback, syncAudioAdvance, voiceSpeedPrompt = 0.9, voiceSpeedAnswer = 0.9, voiceSpeedFeedback = 1.0, queue, setQueue, currentIndex, setCurrentIndex, dictationWordsPerChunk, dictationPauseMs, dictationSpeed, soundEnabled = true, dataSaverMode = false }: any) {
  const [status, setStatus] = useState('playing'); 
  const [attemptKey, setAttemptKey] = useState(0);
  const [hasAttempted, setHasAttempted] = useState(false);
  const [timeLeft, setTimeLeft] = useState(timerSeconds);
  const [currentMotivation, setCurrentMotivation] = useState<any>(null);
  const [currentCorrectAnswer, setCurrentCorrectAnswer] = useState('');
  const [randomMode, setRandomMode] = useState('');
  const [imageLoading, setImageLoading] = useState(true);

  const POSITIVE_FEEDBACK_IMAGES = [
    '/characters/Hummingbird_saying____Muy_Bien____202607131417.png',
    '/characters/Hummingbird_saying____Muy_Bien____202607131417__1.png',
    '/characters/Hummingbird_saying____Muy_Bien____202607131417__2.png',
    '/characters/Man_saying__Muy_Bien__202607131420.png',
    '/characters/Person_saying__Muy_Bien__gesture_202607131420__1.png',
    '/characters/Person_saying__Muy_Bien__gesture_202607131420__2.png'
  ];

  const NEGATIVE_FEEDBACK_IMAGES = [
    '/characters/Person_with_hopeful_gestures_whi__202607131420.png',
    '/characters/Person_with_hopeful_gestures_whi__202607131420__1.png',
    '/characters/Person_with_hopeful_gestures_whi__202607131420__2.png',
    '/characters/Vera_Colibrí_hopeful_gestures_wh__202607131416.png',
    '/characters/Vera_Colibrí_hopeful_gestures_wh__202607131416__1.png',
    '/characters/Vera_Colibrí_hopeful_gestures_wh__202607131417.png'
  ];

  const [feedbackImage, setFeedbackImage] = useState<string | null>(null);

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

  // Inline Exercise Editing States
  const [isEditingExercise, setIsEditingExercise] = useState(false);
  const [editedEng, setEditedEng] = useState(exercise?.eng || '');
  const [editedSpa, setEditedSpa] = useState(exercise?.spa || '');
  const [editedEmoji, setEditedEmoji] = useState(exercise?.emoji || '');

  // Favorites System
  const [favorites, setFavorites] = useState<string[]>(() => {
    try {
      return JSON.parse(localStorage.getItem('lisa_favorites') || '[]');
    } catch {
      return [];
    }
  });

  const isFavorited = favorites.includes(exercise.id);

  const toggleFavorite = () => {
    setFavorites(prev => {
      const next = prev.includes(exercise.id) ? prev.filter(id => id !== exercise.id) : [...prev, exercise.id];
      localStorage.setItem('lisa_favorites', JSON.stringify(next));
      return next;
    });
  };

  // Streak Badge State
  const [consecutiveCorrect, setConsecutiveCorrect] = useState<number>(() => {
    return parseInt(localStorage.getItem('lisa_session_streak') || '0');
  });

  // Expandable / Prestart view states
  const [isCardExpanded, setIsCardExpanded] = useState(false);
  const [hasStartedActivity, setHasStartedActivity] = useState(true);

  // Queue List & Sort states
  const [showQueueList, setShowQueueList] = useState(false);
  const [showQueueModal, setShowQueueModal] = useState(false);
  const [showInfoModal, setShowInfoModal] = useState(false);
  const [sortBy, setSortBy] = useState('original');
  const [expandedBtn, setExpandedBtn] = useState<'known' | 'skip' | 'queue' | 'info' | null>(null);

  useEffect(() => {
    const handleDocumentClick = () => {
      setExpandedBtn(null);
    };
    document.addEventListener('click', handleDocumentClick);
    return () => document.removeEventListener('click', handleDocumentClick);
  }, []);

  // Sync state when exercise changes
  useEffect(() => {
    setIsCardExpanded(false);
    setHasStartedActivity(true);
  }, [exercise.id]);

  const handleSortChange = (newSortBy: string) => {
    setSortBy(newSortBy);
    if (!queue || queue.length === 0 || currentIndex === undefined || !setQueue) return;
    
    const played = queue.slice(0, currentIndex);
    const upcoming = queue.slice(currentIndex);
    
    let sortedUpcoming = [...upcoming];
    if (newSortBy === 'diff-asc') {
      sortedUpcoming.sort((a, b) => (a.eng || '').length - (b.eng || '').length);
    } else if (newSortBy === 'diff-desc') {
      sortedUpcoming.sort((a, b) => (b.eng || '').length - (a.eng || '').length);
    } else if (newSortBy === 'skill') {
      sortedUpcoming.sort((a, b) => (a.skill || '').localeCompare(b.skill || ''));
    }
    
    setQueue([...played, ...sortedUpcoming]);
  };

  useEffect(() => {
    setEditedEng(exercise?.eng || exercise?.textToSpeak || exercise?.textToRead || '');
    setEditedSpa(exercise?.spa || exercise?.question || '');
    setEditedEmoji(exercise?.emoji || '');
  }, [exercise]);

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
    
    if (randomizeKeyboardsMode === 'entry' && allowedKeyboards && allowedKeyboards.length > 0) {
       setRandomMode(allowedKeyboards[Math.floor(Math.random() * allowedKeyboards.length)]);
    } else if (defaultKeyboardMode === 'random' && allowedKeyboards && allowedKeyboards.length > 0) {
       setRandomMode(allowedKeyboards[Math.floor(Math.random() * allowedKeyboards.length)]);
    } else {
       setRandomMode('');
    }
  }, [exercise, defaultKeyboardMode, allowedKeyboards, timerSeconds]);

  const activeMode = enableMultiModalProgression && exercise.targetKeyboardMode ? exercise.targetKeyboardMode : (randomMode || defaultKeyboardMode);
  
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

  useEffect(() => {
    if (status === 'correct' && clickSavings && !syncAudioAdvance) {
      if (hidePositiveFeedback) {
        onProceed(true, false, undefined, activeMode);
      } else {
        const timer = setTimeout(() => {
          onProceed(true, false, undefined, activeMode);
        }, 1500);
        return () => clearTimeout(timer);
      }
    }
  }, [status, clickSavings, hidePositiveFeedback, activeMode, syncAudioAdvance]);

  const evaluateAnswer = (user: string, correct: string, isSpeech: boolean) => {
    if (user === 'TIME_OUT_ERROR') return false;
    if (user === 'WRONG_ANSWER_FORCE') return false; 
    
    const cleanSpeech = (s: string) => (s ? String(s).toLowerCase() : '').replace(/[.,!¿?¡:;"'()]/g, '').trim();
    
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
    }
    const cleanWriting = (s: string) => {
         let t = (s ? String(s).toLowerCase() : '');
         t = t.replace(/[‘’]/g, "'");
         t = t.replace(/\b(i'm|im)\b/g, "i am");
         t = t.replace(/\b(you're|youre)\b/g, "you are");
         t = t.replace(/\b(he's|hes)\b/g, "he is");
         t = t.replace(/\b(she's|shes)\b/g, "she is");
         t = t.replace(/\b(it's)\b/g, 'it is');
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
       return cleanWriting(user) === cleanWriting(correct);
  };


  const playSoundCue = (type: 'success' | 'mistake') => {
    if (!soundEnabled) return;
    try {
      const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioContext) return;
      const ctx = new AudioContext();
      const osc = ctx.createOscillator();
      const gainNode = ctx.createGain();
      
      osc.connect(gainNode);
      gainNode.connect(ctx.destination);
      
      if (type === 'success') {
        osc.type = 'sine';
        osc.frequency.setValueAtTime(600, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(1200, ctx.currentTime + 0.1);
        gainNode.gain.setValueAtTime(0.1, ctx.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.2);
        osc.start();
        osc.stop(ctx.currentTime + 0.2);
      } else if (type === 'mistake') {
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(300, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(150, ctx.currentTime + 0.2);
        gainNode.gain.setValueAtTime(0.2, ctx.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.2);
        osc.start();
        osc.stop(ctx.currentTime + 0.2);
      }
    } catch(e) { console.warn('Audio not supported', e) }
  };

  const handleResult = async (userAnswer = '', overrideCorrect: string | null = null) => {
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
             onProceed(true, false, undefined, activeMode);
             return;
        } else {
             if (onUpdateStats && !isMistakeMode) onUpdateStats(skill, false);
             onSaveMistake(exercise);
             onProceed(false, false, 'push_to_end', activeMode);
             return;
        }
    }

    const moti = isCorrect ? MOTIVATION_RIGHT[Math.floor(Math.random() * MOTIVATION_RIGHT.length)] : MOTIVATION_WRONG[Math.floor(Math.random() * MOTIVATION_WRONG.length)];
    setCurrentMotivation(moti);

    if (isCorrect) {
      const img = POSITIVE_FEEDBACK_IMAGES[Math.floor(Math.random() * POSITIVE_FEEDBACK_IMAGES.length)];
      setFeedbackImage(img);
      setStatus('correct');
      setConsecutiveCorrect(prev => {
        const next = prev + 1;
        localStorage.setItem('lisa_session_streak', next.toString());
        return next;
      });
      if (isMistakeMode) onRemoveMistake(exercise.id); 
      await playFeedback(true, moti, exercise.eng, img);
      if (clickSavings && syncAudioAdvance) {
          onProceed(true, false, undefined, activeMode);
      }
      if (onUpdateStats && !isMistakeMode) onUpdateStats(skill, isFirstTry);
    } else {
      const img = NEGATIVE_FEEDBACK_IMAGES[Math.floor(Math.random() * NEGATIVE_FEEDBACK_IMAGES.length)];
      setFeedbackImage(img);
      setStatus('wrong_try_again');
      setConsecutiveCorrect(0);
      localStorage.setItem('lisa_session_streak', '0');
      await playFeedback(false, moti, exercise.eng, img);
      if (strictMistakeLogging && !isMistakeMode) {
        onSaveMistake(exercise);
      }
    }
  };

  const playFeedback = async (isCorrect: boolean, moti: any, extraEng: string, imgPath?: string) => {
    if (dataSaverMode && !isCorrect) return; // limit TTS if dataSaverMode

    let gender: 'male' | 'female' | 'neutral' = 'neutral';
    if (imgPath) {
        const lowerImg = imgPath.toLowerCase();
        if (lowerImg.includes('hummingbird') || lowerImg.includes('colibr') || lowerImg.includes('vera')) {
            gender = 'female';
        } else if (lowerImg.includes('man') || lowerImg.includes('person')) {
            gender = 'male';
        }
    }

    if (!enableVoiceFeedback) return;
    await playTTS(moti.spa, 'es', null, voiceSpeedFeedback, true, null, gender);
    await new Promise(r => setTimeout(r, 200)); 
    await playTTS(extraEng || moti.eng, 'en', selectedVoiceURI, voiceSpeedAnswer, true, null, gender); 
  };

  return (
    <div className="flex-1 flex flex-col w-full relative pb-2">
      <div className="flex justify-between items-center px-4 pt-4 text-sm text-gray-500 font-bold gap-2">
        <div className="flex items-center gap-1.5 flex-wrap">
          <button onClick={onExit} className="w-8 h-8 flex items-center justify-center bg-gray-200 rounded-full hover:bg-gray-300 transition" title="Pausar y salir"><XCircle size={18}/></button>
          
          {status === 'playing' && enableMarkAsKnown && !isMistakeMode && (
            <button 
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                if (expandedBtn === 'known') {
                  onProceed(true, true, undefined, activeMode);
                  setExpandedBtn(null);
                } else {
                  setExpandedBtn('known');
                }
              }} 
              className={`h-8 rounded-full font-bold text-xs flex items-center justify-center transition-all duration-300 ease-in-out border shadow-sm active:scale-95 bg-fuchsia-100 hover:bg-fuchsia-200 text-fuchsia-700 dark:bg-fuchsia-950/40 dark:text-fuchsia-300 border-fuchsia-200 dark:border-fuchsia-900/30 overflow-hidden shrink-0 ${expandedBtn === 'known' ? 'px-3' : 'w-8 px-0'}`}
              title="Ya me lo sé"
            >
              <BrainCircuit size={14} className="shrink-0" />
              <span className={`transition-all duration-300 overflow-hidden whitespace-nowrap text-[11px] ${expandedBtn === 'known' ? 'max-w-[80px] opacity-100 ml-1.5' : 'max-w-0 opacity-0'}`}>
                Ya lo sé
              </span>
            </button>
          )}
          {status === 'playing' && (
            <button 
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                if (expandedBtn === 'skip') {
                  setStatus('surrendered');
                  onSaveMistake(exercise);
                  setExpandedBtn(null);
                 
                  setExpandedBtn('skip');
                }
              }}
              className={`h-8 rounded-full font-bold text-xs flex items-center justify-center transition-all duration-300 ease-in-out border shadow-sm active:scale-95 bg-gray-100 dark:bg-slate-800 hover:bg-gray-200 text-gray-700 dark:text-slate-300 dark:bg-slate-800 dark:hover:bg-slate-700 dark:text-slate-300 border-gray-200 dark:border-slate-700 overflow-hidden shrink-0 ${expandedBtn === 'skip' ? 'px-3' : 'w-8 px-0'}`}
              title="Saltar ejercicio"
            >
              <span className="shrink-0 text-xs">🏳️</span>
              <span className={`transition-all duration-300 overflow-hidden whitespace-nowrap text-[11px] ${expandedBtn === 'skip' ? 'max-w-[80px] opacity-100 ml-1.5' : 'max-w-0 opacity-0'}`}>
                Obviar
              </span>
            </button>
          )}
        </div>
        
        <div className="flex items-center gap-1.5 shrink-0 select-none">
          <span className={`px-2.5 py-1 h-8 flex items-center justify-center rounded-full shadow-sm gap-1 text-[11px] truncate max-w-[120px] sm:max-w-none ${isMistakeMode ? 'bg-red-500 text-white' : skill === 'Módulo Completo' ? 'bg-cyan-500 text-white' : 'bg-white dark:bg-slate-900 text-gray-800 dark:text-slate-200 border border-gray-200 dark:border-slate-700'}`}>
            {exercise.emoji} {isMistakeMode ? 'Repaso' : skill === 'Módulo Completo' ? exercise.skill : skill}
          </span>
          
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              if (expandedBtn === 'queue') {
                setShowQueueModal(true);
                setExpandedBtn(null);
               
                setExpandedBtn('queue');
              }
            }}
            className={`h-8 rounded-full flex items-center justify-center transition-all duration-300 ease-in-out bg-white dark:bg-slate-800 hover:bg-indigo-50 dark:bg-indigo-900/40 dark:hover:bg-indigo-950/40 text-indigo-700 dark:text-indigo-300 border border-indigo-100 dark:border-indigo-800/30 dark:border-indigo-900/30 shadow-sm active:scale-95 cursor-pointer text-xs overflow-hidden shrink-0 ${expandedBtn === 'queue' ? 'px-3' : 'w-8 px-0'}`}
            title={`Ver ejercicios de esta sesión (${queue ? queue.length - currentIndex : 0} restantes)`}
          >
            <span className="shrink-0 text-xs">📋</span>
            <span className={`transition-all duration-300 overflow-hidden whitespace-nowrap text-[11px] ${expandedBtn === 'queue' ? 'max-w-[80px] opacity-100 ml-1.5' : 'max-w-0 opacity-0'}`}>
              Ejercicios
            </span>
          </button>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              if (expandedBtn === 'info') {
                setShowInfoModal(true);
                setExpandedBtn(null);
               
                setExpandedBtn('info');
              }
            }}
            className={`h-8 rounded-full flex items-center justify-center transition-all duration-300 ease-in-out bg-white dark:bg-slate-800 hover:bg-amber-50 dark:hover:bg-amber-950/40 text-amber-700 dark:text-amber-300 border border-amber-100/30 dark:border-amber-900/30 shadow-sm active:scale-95 cursor-pointer text-xs overflow-hidden shrink-0 ${expandedBtn === 'info' ? 'px-3' : 'w-8 px-0'}`}
            title="Guía y explicación de la actividad"
          >
            <span className="shrink-0 text-xs">💡</span>
            <span className={`transition-all duration-300 overflow-hidden whitespace-nowrap text-[11px] ${expandedBtn === 'info' ? 'max-w-[80px] opacity-100 ml-1.5' : 'max-w-0 opacity-0'}`}>
              Guía
            </span>
          </button>
        </div>
        
        <div className="flex items-center gap-1.5 text-xs flex-shrink-0 font-mono">
          {enableTimer && <span className={`flex items-center gap-0.5 ${timeLeft <= 5 ? 'text-red-500 animate-pulse' : 'text-orange-500'}`}><Clock size={12}/> {timeLeft}s</span>}
          <span>{current}/{total}</span>
        </div>
      </div>
      
      <div className="h-3 bg-gray-200 w-full rounded-full mt-4 mx-4 w-[calc(100%-2rem)] overflow-hidden relative">
        <div className="h-full bg-green-400 transition-all duration-500" style={{ width: `${progress}%` }}></div>
      </div>
      
      <div className="exercise-card relative p-5 m-4 border-2 border-indigo-100 dark:border-indigo-800 dark:border-slate-800 rounded-3xl flex flex-col items-center shadow-md max-w-full w-[calc(100%-2rem)] transition-colors duration-300">
        {exercise.isGuide && typeof guideTrackingCount === 'number' && typeof guidanceCount === 'number' && (
           <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-amber-100 dark:bg-amber-900/80 text-amber-800 dark:text-amber-200 text-[10px] font-bold px-3 py-1 rounded-full border border-amber-200 dark:border-amber-700 shadow-sm flex items-center gap-1">
              <span>💡 Ayuda Guiada</span>
              <span className="bg-amber-200 dark:bg-amber-800 px-1.5 rounded-full">{guideTrackingCount + 1}/{guidanceCount}</span>
           </div>
        )}
        {/* Floating Play/Edit/Favorite Controls inside the Card */}
        <div className="absolute top-4 right-4 flex gap-1.5 z-10 select-none">
          <button 
            type="button"
            onClick={toggleFavorite}
            className="w-8 h-8 flex items-center justify-center bg-white/95 dark:bg-slate-800/95 hover:bg-red-50 dark:hover:bg-slate-700 rounded-full border border-red-100 dark:border-slate-700 shadow-sm transition active:scale-90"
            title={isFavorited ? "Quitar de favoritos" : "Añadir a favoritos"}
          >
            <Heart size={14} className={isFavorited ? "fill-red-500 text-red-500 animate-pulse" : "text-gray-400"} />
          </button>

          <button 
            type="button"
            onClick={() => {
              const text = exercise.eng || exercise.textToSpeak || exercise.textToRead || '';
              if (text) {
                playTTS(text, 'en', selectedVoiceURI, voiceSpeedPrompt, true);
              }
            }}
            className="w-8 h-8 flex items-center justify-center bg-white/95 dark:bg-slate-800/95 hover:bg-indigo-50 dark:bg-indigo-900/40 dark:hover:bg-slate-700 rounded-full border border-indigo-100 dark:border-indigo-800 dark:border-slate-700 shadow-sm transition active:scale-90"
            title="Escuchar pronunciación"
          >
            <Volume2 size={14} className="text-indigo-600 dark:text-indigo-300" />
          </button>
          
          <button 
            type="button"
            onClick={() => setIsEditingExercise(true)}
            className="w-8 h-8 flex items-center justify-center bg-white/95 dark:bg-slate-800/95 hover:bg-indigo-50 dark:bg-indigo-900/40 dark:hover:bg-slate-700 rounded-full border border-indigo-100 dark:border-indigo-800 dark:border-slate-700 shadow-sm transition active:scale-90"
            title="Editar detalles del ejercicio"
          >
            <Pencil size={14} className="text-indigo-600 dark:text-indigo-300" />
          </button>
        </div>

        {/* Streak Badge */}
        {consecutiveCorrect > 0 && (
          <div className="absolute top-4 left-4 flex items-center gap-1 bg-amber-500 text-white text-xs font-black px-2.5 py-1 rounded-full shadow-md animate-bounce z-10">
            <span>🔥</span>
            <span>Racha: {consecutiveCorrect}</span>
          </div>
        )}

        {/* Inline Exercise Editing Modal */}
        {isEditingExercise && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-[9999] select-none animate-fade-in">
            <div className="bg-white dark:bg-slate-900 border-2 border-indigo-100 dark:border-indigo-800 dark:border-slate-800 rounded-3xl p-4 w-full max-w-sm shadow-2xl flex flex-col gap-4 text-left">
              <h3 className="text-lg font-bold text-indigo-900 dark:text-indigo-200 flex items-center gap-2">
                <Pencil size={18} />
                <span>Editar Ejercicio</span>
              </h3>
              
              <div className="flex flex-col gap-1">
                <label className="text-xs font-bold text-slate-500 dark:text-slate-400">Texto en Inglés</label>
                <input 
                  type="text" 
                  value={editedEng} 
                  onChange={(e) => setEditedEng(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-indigo-500 text-slate-800 dark:text-slate-100"
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-xs font-bold text-slate-500 dark:text-slate-400">Traducción o Instrucción (Español)</label>
                <input 
                  type="text" 
                  value={editedSpa} 
                  onChange={(e) => setEditedSpa(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-indigo-500 text-slate-800 dark:text-slate-100"
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-xs font-bold text-slate-500 dark:text-slate-400">Emoji representativo</label>
                <input 
                  type="text" 
                  value={editedEmoji} 
                  onChange={(e) => setEditedEmoji(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-indigo-500 text-slate-800 dark:text-slate-100"
                />
              </div>

              <div className="flex gap-2 mt-2">
                <button 
                  type="button"
                  onClick={() => setIsEditingExercise(false)}
                  className="flex-1 py-2.5 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 font-bold rounded-xl text-xs active:scale-95 transition"
                >
                  Cancelar
                </button>
                <button 
                  type="button"
                  onClick={() => {
                    if (exercise.eng !== undefined) exercise.eng = editedEng;
                    if (exercise.textToSpeak !== undefined) exercise.textToSpeak = editedEng;
                    if (exercise.textToRead !== undefined) exercise.textToRead = editedEng;
                    if (exercise.correctAnswer !== undefined) exercise.correctAnswer = editedEng;
                    
                    if (exercise.spa !== undefined) exercise.spa = editedSpa;
                    if (exercise.question !== undefined) exercise.question = editedSpa;
                    if (exercise.emoji !== undefined) exercise.emoji = editedEmoji;
                    
                    setAttemptKey(prev => prev + 1);
                    setIsEditingExercise(false);
                  }}
                  className="flex-1 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl text-xs active:scale-95 border-b-4 border-indigo-800 active:border-b-0 active:translate-y-[2px] transition"
                >
                  Guardar
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Actual playing content */}
        {exercise.emoji && exercise.type !== 'flashcard' && exercise.type !== 'reading' && exercise.type !== 'match' && (
               <div className={`relative ${exercise.isVisual ? 'bg-white dark:bg-slate-900 p-3 shadow-xl border-2 border-indigo-100 dark:border-indigo-800 border-b-6 border-b-indigo-200 mt-2 mb-2 w-52 h-52 flex flex-col items-center justify-center rounded-3xl duration-300 hover:scale-[1.02]' : 'text-6xl mb-2 bg-white dark:bg-slate-900 p-4 rounded-full shadow-sm'}`}>
                {exercise.isVisual ? (
                   <>
                     {imageLoading && (
                       <div className="absolute inset-0 flex flex-col items-center justify-center bg-indigo-50/80 rounded-3xl animate-pulse text-indigo-500 dark:text-indigo-400 gap-2 font-bold text-xs select-none">
                         <span className="text-2xl animate-bounce">🎨</span>
                         <span>Creando ilustración...</span>
                       </div>
                     )}
                     {!dataSaverMode && <img 
                       src={`https://image.pollinations.ai/prompt/${encodeURIComponent(exercise.eng + " realistic chibi cute style illustration style illustration, vector, bright colors")}`} 
                       alt={exercise.eng} 
                       className={`w-full h-full object-cover rounded-2xl select-none transition-all duration-500 ${imageLoading ? 'opacity-0 scale-95' : 'opacity-100 scale-100'}`} 
                       crossOrigin="anonymous" 
                       onLoad={() => setImageLoading(false)}
                     />}
                     {dataSaverMode && (
                        <div className="w-full h-full flex flex-col items-center justify-center bg-slate-100 dark:bg-slate-800 rounded-2xl text-slate-400">
                           <span className="text-4xl mb-2">📡</span>
                           <span className="text-xs font-bold px-4 text-center">Modo ahorro de datos: Imagen Oculta</span>
                        </div>
                     )}
                   </>
                ) : (
                   exercise.emoji
                )}
                {enableMultiModalProgression && exercise.targetKeyboardMode && !exercise.isVisual && <span className="absolute -bottom-2 -right-2 bg-indigo-500 text-white text-[10px] px-2 py-0.5 rounded-full font-bold shadow">Nvl {exercise.kbLevel + 1}</span>}
             </div>
            )}
            
            {exercise.type === 'reading' && <ReadingUI voiceSpeedPrompt={voiceSpeedPrompt} key={`${exercise.id}-${attemptKey}`} exercise={exercise} onResult={handleResult} disabled={status !== 'playing'} selectedVoiceURI={selectedVoiceURI} mode={activeMode} onChangeKeyboardMode={onChangeKeyboardMode} alwaysAllowFreeKeyboard={alwaysAllowFreeKeyboard} allowedKeyboards={allowedKeyboards} strictTyping={strictTyping} enableMultiModalProgression={enableMultiModalProgression} enableProgressiveGuidance={enableProgressiveGuidance} randomizeKeyboardsMode={randomizeKeyboardsMode} clickSavings={clickSavings} />}
            {exercise.type === 'quiz' && <QuizUI voiceSpeedPrompt={voiceSpeedPrompt} key={`${exercise.id}-${attemptKey}`} exercise={exercise} onResult={handleResult} disabled={status !== 'playing'} onWordClick={onWordClickGlobal} selectedVoiceURI={selectedVoiceURI} mode={activeMode} onChangeKeyboardMode={onChangeKeyboardMode} alwaysAllowFreeKeyboard={alwaysAllowFreeKeyboard} allowedKeyboards={allowedKeyboards} strictTyping={strictTyping} enableMultiModalProgression={enableMultiModalProgression} enableProgressiveGuidance={enableProgressiveGuidance} randomizeKeyboardsMode={randomizeKeyboardsMode} clickSavings={clickSavings} />}
            {exercise.type === 'build_sentence' && <BuildSentenceUI voiceSpeedPrompt={voiceSpeedPrompt} key={`${exercise.id}-${attemptKey}`} exercise={exercise} onResult={handleResult} disabled={status !== 'playing'} selectedVoiceURI={selectedVoiceURI} onWordClick={onWordClickGlobal} mode={activeMode} onChangeKeyboardMode={onChangeKeyboardMode} alwaysAllowFreeKeyboard={alwaysAllowFreeKeyboard} allowedKeyboards={allowedKeyboards} strictTyping={strictTyping} enableMultiModalProgression={enableMultiModalProgression} enableProgressiveGuidance={enableProgressiveGuidance} randomizeKeyboardsMode={randomizeKeyboardsMode} clickSavings={clickSavings} />}
            {exercise.type === 'listen_and_write' && <ListenWriteUI voiceSpeedPrompt={voiceSpeedPrompt} key={`${exercise.id}-${attemptKey}`} exercise={exercise} onResult={handleResult} disabled={status !== 'playing'} selectedVoiceURI={selectedVoiceURI} onWordClick={onWordClickGlobal} mode={activeMode} onChangeKeyboardMode={onChangeKeyboardMode} alwaysAllowFreeKeyboard={alwaysAllowFreeKeyboard} allowedKeyboards={allowedKeyboards} strictTyping={strictTyping} enableMultiModalProgression={enableMultiModalProgression} enableProgressiveGuidance={enableProgressiveGuidance} randomizeKeyboardsMode={randomizeKeyboardsMode} clickSavings={clickSavings} />}
            {(exercise.type === 'speak' || exercise.type === 'speed_speak') && <SpeakUI voiceSpeedPrompt={voiceSpeedPrompt} key={`${exercise.id}-${attemptKey}`} exercise={exercise} onResult={handleResult} disabled={status !== 'playing'} speakPreview={speakPreview} showSpeakingWord={showSpeakingWord} selectedVoiceURI={selectedVoiceURI} onWordClick={onWordClickGlobal} enableMicCountdown={enableMicCountdown} clickSavings={clickSavings} />}
            {exercise.type === 'flashcard' && <FlashcardSingleUI voiceSpeedPrompt={voiceSpeedPrompt} key={`${exercise.id}-${attemptKey}`} exercise={exercise} onResult={handleResult} disabled={status !== 'playing'} mode={activeMode} onChangeKeyboardMode={onChangeKeyboardMode} alwaysAllowFreeKeyboard={alwaysAllowFreeKeyboard} allowedKeyboards={allowedKeyboards} flashcardMode={flashcardMode} selectedVoiceURI={selectedVoiceURI} strictTyping={strictTyping} enableMultiModalProgression={enableMultiModalProgression} enableProgressiveGuidance={enableProgressiveGuidance} randomizeKeyboardsMode={randomizeKeyboardsMode} clickSavings={clickSavings} />}
            {exercise.type === 'dialogue_chat' && <DialogueUI voiceSpeedPrompt={voiceSpeedPrompt} key={`${exercise.id}-${attemptKey}`} exercise={exercise} onResult={handleResult} disabled={status !== 'playing'} selectedVoiceURI={selectedVoiceURI} mode={activeMode} onChangeKeyboardMode={onChangeKeyboardMode} alwaysAllowFreeKeyboard={alwaysAllowFreeKeyboard} allowedKeyboards={allowedKeyboards} strictTyping={strictTyping} isSpeakMode={false} enableMicCountdown={enableMicCountdown} enableMultiModalProgression={enableMultiModalProgression} enableProgressiveGuidance={enableProgressiveGuidance} clickSavings={clickSavings} />}
            {exercise.type === 'dialogue_speak' && <DialogueUI voiceSpeedPrompt={voiceSpeedPrompt} key={`${exercise.id}-${attemptKey}`} exercise={exercise} onResult={handleResult} disabled={status !== 'playing'} selectedVoiceURI={selectedVoiceURI} mode={activeMode} onChangeKeyboardMode={onChangeKeyboardMode} alwaysAllowFreeKeyboard={alwaysAllowFreeKeyboard} allowedKeyboards={allowedKeyboards} strictTyping={strictTyping} isSpeakMode={true} enableMicCountdown={enableMicCountdown} enableMultiModalProgression={enableMultiModalProgression} enableProgressiveGuidance={enableProgressiveGuidance} clickSavings={clickSavings} />}
            {exercise.type === 'match' && <MatchUI voiceSpeedPrompt={voiceSpeedPrompt} key={`${exercise.id}-${attemptKey}`} exercise={exercise} onResult={handleResult} disabled={status !== 'playing'} selectedVoiceURI={selectedVoiceURI} />}
            {exercise.type === 'dictation' && <DictationUI voiceSpeedPrompt={voiceSpeedPrompt} key={`${exercise.id}-${attemptKey}`} exercise={exercise} onResult={handleResult} disabled={status !== 'playing'} selectedVoiceURI={selectedVoiceURI} onWordClick={onWordClickGlobal} mode={activeMode} onChangeKeyboardMode={onChangeKeyboardMode} alwaysAllowFreeKeyboard={alwaysAllowFreeKeyboard} allowedKeyboards={allowedKeyboards} strictTyping={strictTyping} enableMultiModalProgression={enableMultiModalProgression} enableProgressiveGuidance={enableProgressiveGuidance} randomizeKeyboardsMode={randomizeKeyboardsMode} clickSavings={clickSavings} enableMicCountdown={enableMicCountdown} dictationWordsPerChunk={dictationWordsPerChunk} dictationPauseMs={dictationPauseMs} dictationSpeed={dictationSpeed} />}

        {/* Custom Progress Bar inside the Card */}
        <div className="w-full mt-auto pt-6 flex flex-col gap-1 select-none shrink-0 border-t border-slate-100 dark:border-slate-800/50">
          <div className="flex justify-between items-center text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
            <span>Progreso del tema</span>
            <span>{current} / {total}</span>
          </div>
          <div className="w-full h-1.5 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
            <div className="h-full bg-indigo-500 rounded-full transition-all duration-500 animate-pulse" style={{ width: `${progress}%` }}></div>
          </div>
        </div>
      </div>

      {/* --- PANEL DE DIAGNÓSTICO DE VOZ (TTS & STT) --- */}
      <div id="voice-diagnostics-container" className="mx-6 mb-2 p-4 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm">
        <button 
          id="btn-toggle-diagnostics"
          onClick={() => { setShowDiagnostics(!showDiagnostics); runVoiceChecks(); }}
          className="w-full flex items-center justify-between font-bold text-xs text-slate-500 hover:text-slate-800 transition"
        >
          <div className="flex items-center gap-2">
            <Settings size={14} className="text-indigo-500 dark:text-indigo-400 animate-pulse"/>
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
              <div className="p-2 border border-slate-100 dark:border-slate-700/50 bg-slate-50/50 dark:bg-slate-800/50 rounded-xl flex items-center justify-between">
                <span className="text-slate-500 font-medium">Soporte Síntesis (TTS):</span>
                <span className={`font-bold ${ttsSupported ? 'text-green-600' : 'text-red-500'}`}>
                  {ttsSupported ? '✅ Disponible' : '❌ No disponible'}
                </span>
              </div>
              <div className="p-2 border border-slate-100 dark:border-slate-700/50 bg-slate-50/50 dark:bg-slate-800/50 rounded-xl flex items-center justify-between">
                <span className="text-slate-500 font-medium">Soporte Micrófono (STT):</span>
                <span className={`font-bold ${sttSupported ? 'text-green-600' : 'text-red-500'}`}>
                  {sttSupported ? '✅ Disponible' : '❌ No disponible'}
                </span>
              </div>
              <div className="p-2 border border-slate-100 dark:border-slate-700/50 bg-slate-50/50 dark:bg-slate-800/50 rounded-xl flex items-center justify-between">
                <span className="text-slate-500 font-medium">Ejecución en Sandbox:</span>
                <span className={`font-bold ${isIframe ? 'text-amber-600' : 'text-green-600'}`}>
                  {isIframe ? '⚠️ Sí (Iframe)' : '✅ Ventana principal'}
                </span>
              </div>
              <div className="p-2 border border-slate-100 dark:border-slate-700/50 bg-slate-50/50 dark:bg-slate-800/50 rounded-xl flex items-center justify-between">
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
                className="flex-1 min-w-[120px] py-2 px-3 bg-indigo-50 dark:bg-indigo-900/40 hover:bg-indigo-100 dark:hover:bg-indigo-900/60 text-indigo-700 dark:text-indigo-300 rounded-xl font-bold text-[10px] flex items-center justify-center gap-1.5 transition border border-indigo-200 dark:border-indigo-800 outline-none active:scale-95"
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
                className="flex-1 min-w-[120px] py-2 px-3 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl font-bold text-[10px] flex items-center justify-center gap-1.5 transition border border-slate-200 dark:border-slate-700 outline-none active:scale-95"
              >
                <RefreshCw size={12}/>
                <span>Reiniciar Motor</span>
              </button>
            </div>

            {/* Diagnostic Message Banner */}
            {diagMessage && (
              <div id="diag-message-banner" className="p-3 bg-indigo-50 dark:bg-indigo-900/40 border border-indigo-200 dark:border-indigo-800 text-indigo-800 dark:text-indigo-200 rounded-xl text-xs font-semibold flex items-center justify-between">
                <span>✨ {diagMessage}</span>
                <button onClick={() => setDiagMessage(null)} className="px-2 font-bold text-indigo-400 hover:text-indigo-600 dark:text-indigo-300">×</button>
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
                  className="px-2 py-0.5 border border-slate-200 dark:border-slate-700 text-slate-400 hover:text-slate-600 bg-white dark:bg-slate-900 hover:bg-slate-50 dark:bg-slate-900 rounded transition"
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
        <div className="absolute bottom-0 left-0 w-full p-4 animate-slide-up shadow-2xl z-20 bg-orange-50 border-t-4 border-orange-400 rounded-t-3xl relative">
          {feedbackImage && (
            <div className="absolute -top-[140px] right-2 w-[140px] h-[140px] drop-shadow-xl z-30 pointer-events-none animate-pop-in-rotate origin-bottom">
              <img src={feedbackImage} alt="Feedback Character" className="w-full h-full object-contain drop-shadow-2xl" onError={(e) => { e.currentTarget.style.display="none"; }} />
            </div>
          )}
          <div className="flex items-start gap-2 mb-2">
            <Heart size={32} className="text-orange-500 flex-shrink-0"/> 
            <div><span className="font-bold text-xl text-orange-800">¡Casi casi!</span><p className="text-orange-700 font-medium text-sm mt-1">{currentMotivation?.spa}</p></div>
          </div>
          <div className="flex gap-2 mt-4">
            <button onClick={() => {setStatus('surrendered'); onSaveMistake(exercise);}} className="flex-1 py-2 bg-white dark:bg-slate-900 border-2 border-orange-200 text-orange-600 rounded-xl font-bold active:scale-95">Me rindo 🏳️</button>
            <button onClick={() => {setTimeLeft(timerSeconds); setStatus('playing'); setAttemptKey(k => k + 1); }} className="flex-1 py-2 bg-orange-500 text-white rounded-xl font-bold shadow active:scale-95">Reintentar 🔄</button>
          </div>
        </div>
      )}

      {(status === 'correct' || status === 'surrendered') && (
        <div className={`absolute bottom-0 left-0 w-full p-4 animate-slide-up shadow-2xl z-20 rounded-t-3xl relative ${status === 'correct' ? 'bg-green-100 text-green-800 border-t-4 border-green-500' : 'bg-red-100 text-red-800 border-t-4 border-red-500'}`}>
          {feedbackImage && status === 'correct' && (
            <div className="absolute -top-[150px] right-0 w-[160px] h-[160px] drop-shadow-xl z-30 pointer-events-none animate-pop-in-rotate origin-bottom-right">
              <img src={feedbackImage} alt="Feedback Character" className="w-full h-full object-contain drop-shadow-2xl" onError={(e) => { e.currentTarget.style.display="none"; }} />
            </div>
          )}
          <div className="flex items-center gap-2 mb-2">
            {status === 'correct' ? <><CheckCircle2 size={32} className="text-green-500"/><span className="font-bold text-xl">¡Excelente!</span></> : <><Flag size={32} className="text-red-500"/><span className="font-bold text-xl">Respuesta correcta:</span></>}
          </div>
          {status === 'correct' && currentMotivation && <p className="text-green-700 font-medium text-sm mb-2">{currentMotivation.spa}</p>}
          {status === 'surrendered' && <div className="mb-2 text-lg font-bold bg-white dark:bg-slate-900 p-3 rounded-lg border-2 border-red-200">{currentCorrectAnswer}</div>}
          
          {exercise.spa && <p className={`text-sm mb-2 font-bold ${status === 'correct' ? 'text-green-700 opacity-90' : 'text-red-700 opacity-90'}`}>Significa: {exercise.spa}</p>}
          
          <button onClick={() => onProceed(status === 'correct', false, undefined, activeMode)} className={`w-full py-2 rounded-xl font-bold text-xl text-white shadow active:scale-95 ${status === 'correct' ? 'bg-green-500' : 'bg-red-500'}`}>Continuar</button>
        </div>
      )}

      {/* Modales de Ver Ejercicios y Guía de Actividad */}
      {showQueueModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-[9999] select-none animate-fade-in">
          <div className="bg-white dark:bg-slate-900 border-2 border-indigo-100 dark:border-indigo-800 dark:border-slate-800 rounded-3xl p-4 w-full max-w-md shadow-2xl flex flex-col gap-4 text-left">
            <div className="flex justify-between items-center border-b border-slate-100 dark:border-slate-800 pb-3">
              <h3 className="text-lg font-extrabold text-indigo-900 dark:text-indigo-200 flex items-center gap-2">
                <span>📋 Ejercicios de la Sesión</span>
              </h3>
              <button 
                onClick={() => setShowQueueModal(false)}
                className="p-1.5 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full text-slate-400 hover:text-slate-600 transition"
              >
                <XCircle size={20} />
              </button>
            </div>

            <div className="flex items-center justify-between gap-2 bg-indigo-50/50 dark:bg-indigo-950/20 p-2.5 rounded-xl border border-indigo-100 dark:border-indigo-800/50 dark:border-indigo-900/40">
              <span className="text-xs font-bold text-indigo-950 dark:text-indigo-200">Ordenar lista restante por:</span>
              <select 
                value={sortBy} 
                onChange={(e) => handleSortChange(e.target.value)}
                className="p-1.5 rounded-lg bg-white dark:bg-slate-800 border border-indigo-200 dark:border-indigo-800 dark:border-indigo-900 text-xs font-bold text-indigo-800 dark:text-indigo-200 focus:ring-1 focus:ring-indigo-500"
              >
                <option value="original">Original</option>
                <option value="diff-asc">Dificultad (Corto-Largo)</option>
                <option value="diff-desc">Dificultad (Largo-Corto)</option>
                <option value="skill">Tipo de Habilidad</option>
              </select>
            </div>

            <div className="max-h-64 overflow-y-auto flex flex-col gap-2 pr-1">
              {queue && queue.slice(currentIndex).map((ex: any, idx: number) => {
                const isCurrent = idx === 0;
                const difficultyLabel = (ex.eng || '').length < 15 ? 'Fácil 🟢' : (ex.eng || '').length < 30 ? 'Medio 🟡' : 'Difícil 🔴';
                return (
                  <div 
                    key={ex.id + '-' + idx} 
                    className={`p-3 rounded-2xl border text-xs flex justify-between items-center transition duration-200 ${isCurrent ? 'bg-indigo-50 dark:bg-indigo-900/40 dark:bg-indigo-950/40 border-indigo-200 dark:border-indigo-800 font-extrabold shadow-sm' : 'bg-white dark:bg-slate-900 border-slate-100 dark:border-slate-800 text-slate-600 dark:text-slate-400'}`}
                  >
                    <div className="flex items-center gap-2.5 truncate">
                      <span className="text-lg">{ex.emoji}</span>
                      <div className="flex flex-col truncate">
                        <span className="truncate font-bold text-slate-800 dark:text-slate-200">{ex.spa || ex.eng}</span>
                        {isCurrent && <span className="text-[9px] text-indigo-600 dark:text-indigo-300 dark:text-indigo-400 font-black tracking-wider uppercase mt-0.5">En progreso</span>}
                      </div>
                    </div>
                    <div className="flex gap-2 shrink-0 items-center font-bold">
                      <span className="text-[9px] bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 px-2 py-0.5 rounded-full">{ex.skill}</span>
                      <span className="text-[9px] font-extrabold">{difficultyLabel}</span>
                    </div>
                  </div>
                );
              })}
            </div>

            <button 
              type="button"
              onClick={() => setShowQueueModal(false)}
              className="w-full py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-black rounded-xl border-b-4 border-indigo-800 active:border-b-0 active:translate-y-[2px] transition text-center shadow-md text-xs"
            >
              Entendido
            </button>
          </div>
        </div>
      )}

      {showInfoModal && (
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
                  <img src="/characters/Vera_Colibrí_saying_hello_202607131416__2.png" alt="Vera" className="w-16 h-16 object-contain drop-shadow-md" onError={(e) => { e.currentTarget.style.display="none"; }} />
                  <div className="flex-1 bg-white dark:bg-slate-900 border border-indigo-100 dark:border-slate-700 p-3 rounded-2xl rounded-tl-none shadow-sm relative">
                    <div className="absolute top-0 -left-2 w-3 h-3 bg-white dark:bg-slate-900 border-t border-l border-indigo-100 dark:border-slate-700 transform -skew-x-[30deg]"></div>
                    <p className="text-xs text-slate-700 dark:text-slate-300 font-bold leading-relaxed relative z-10">
                      <span className="text-indigo-600 dark:text-indigo-400 font-black mb-1 block">Vera dice:</span>
                      
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
}