import { AlertCircle, ArrowDown, ArrowLeft, ArrowUp, BarChart2, CheckCircle2, ChevronDown, ChevronUp, Flag, Keyboard, Lock, Play, PlayCircle, RefreshCw, Search, Settings, Sparkles, Star, Target, XCircle } from 'lucide-react';
import React, { useEffect, useRef, useState } from 'react';
import { AIChatScreen, AIHubScreen, AIStoryScreen } from './components/AIScreens';
import { ExerciseEngine } from './components/ExerciseEngine';
import { StatsScreen } from './components/StatsScreen';
import { SkillBtn } from './components/UIComponents';
import { DEFAULT_SKILL_ORDER, SKILL_COLORS, SKILL_ICONS, SKILL_LABELS, SKILL_TIPS } from './constants';
import { ALL_DATA, EXERCISES_DB, KEYBOARD_OPTIONS } from './data';
import { detectLanguage, getEnglishVoice, playTTS, translateWord } from './utils';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState('home'); 
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [activeSkill, setActiveSkill] = useState<string | null>(null);
  const [queue, setQueue] = useState<any[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [isMistakeMode, setIsMistakeMode] = useState(false);
  
  const [phraseSearch, setPhraseSearch] = useState('');
  
  const [completedExIds, setCompletedExIds] = useState<string[]>(() => JSON.parse(localStorage.getItem('lisa_completed_ex_ids') || '[]'));
  const [learnedExIds, setLearnedExIds] = useState<string[]>(() => JSON.parse(localStorage.getItem('lisa_learned_ex_ids') || '[]'));
  const [mistakes, setMistakes] = useState<any[]>(() => JSON.parse(localStorage.getItem('lisa_mistakes') || '[]'));
  const [activeSessions, setActiveSessions] = useState<Record<string, any>>(() => JSON.parse(localStorage.getItem('lisa_active_sessions') || '{}'));
  const [showSettings, setShowSettings] = useState(false);
  const [showParentalGate, setShowParentalGate] = useState(false);
  const [toastMsg, setToastMsg] = useState<string | null>(null);
  
  const [enableMultiModalProgression, setEnableMultiModalProgression] = useState(() => JSON.parse(localStorage.getItem('lisa_multiModal') ?? 'true'));
  const [progressionStyle, setProgressionStyle] = useState(() => localStorage.getItem('lisa_progressionStyle') || 'interleaved');
  const [enableProgressiveGuidance, setEnableProgressiveGuidance] = useState(() => JSON.parse(localStorage.getItem('lisa_progressiveGuidance') ?? 'true'));
  const [guidanceLevel, setGuidanceLevel] = useState(() => localStorage.getItem('lisa_guidanceLevel') || 'mode');
  const [guidanceCount, setGuidanceCount] = useState(() => parseInt(localStorage.getItem('lisa_guidanceCount') ?? '1'));
  const [guideTracking, setGuideTracking] = useState<Record<string, number>>(() => JSON.parse(localStorage.getItem('lisa_guide_tracking') || '{}'));
  const [randomizeKeyboardsMode, setRandomizeKeyboardsMode] = useState(() => localStorage.getItem('lisa_randomizeKeyboardsMode') || 'none');

  const [isPermissive, setIsPermissive] = useState(() => JSON.parse(localStorage.getItem('lisa_permissive') ?? 'true'));
  const [speakPermissive, setSpeakPermissive] = useState(() => JSON.parse(localStorage.getItem('lisa_speakPermissive') ?? 'true'));
  const [speakPreview, setSpeakPreview] = useState(() => JSON.parse(localStorage.getItem('lisa_speakPreview') ?? 'true'));
  const [showSpeakingWord, setShowSpeakingWord] = useState(() => JSON.parse(localStorage.getItem('lisa_showSpeakingWord') ?? 'true'));
  const [enableMicCountdown, setEnableMicCountdown] = useState(() => JSON.parse(localStorage.getItem('lisa_micCountdown') ?? 'false'));
  const [flashcardMode, setFlashcardMode] = useState(() => localStorage.getItem('lisa_flashcardMode') ?? 'interactive');
  const [showCompleted, setShowCompleted] = useState(() => JSON.parse(localStorage.getItem('lisa_showCompleted') ?? 'false'));
  const [enableClickToTranslate, setEnableClickToTranslate] = useState(() => JSON.parse(localStorage.getItem('lisa_clickToTranslate') ?? 'true'));
  const [strictMistakeLogging, setStrictMistakeLogging] = useState(() => JSON.parse(localStorage.getItem('lisa_strictMistakes') ?? 'true'));
  const [allowHelpInMistakes, setAllowHelpInMistakes] = useState(() => JSON.parse(localStorage.getItem('lisa_allowHelpInMistakes') ?? 'true'));
  const [enableVoiceFeedback, setEnableVoiceFeedback] = useState(() => JSON.parse(localStorage.getItem('lisa_voiceFeedback') ?? 'true'));
  const [strictTyping, setStrictTyping] = useState(() => JSON.parse(localStorage.getItem('lisa_strictTyping') ?? 'false'));

  const [enableTimer, setEnableTimer] = useState(() => JSON.parse(localStorage.getItem('lisa_enableTimer') ?? 'true'));
  const [timerSeconds, setTimerSeconds] = useState(() => parseInt(localStorage.getItem('lisa_timerSeconds') ?? '90'));
  
  const ALL_KEYBOARDS = KEYBOARD_OPTIONS.map(k => k.id);
  const [allowedKeyboards, setAllowedKeyboards] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('lisa_allowedKeyboards');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) {
          const missing = ALL_KEYBOARDS.filter(k => !parsed.includes(k));
          if (missing.length > 0) {
            const healed = [...parsed, ...missing];
            localStorage.setItem('lisa_allowedKeyboards', JSON.stringify(healed));
            return healed;
          }
          return parsed;
        }
      }
    } catch (e) {}
    return ALL_KEYBOARDS;
  });

  const [keyboardOrder, setKeyboardOrder] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('lisa_keyboardOrder');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) {
          const missing = ALL_KEYBOARDS.filter(k => !parsed.includes(k));
          if (missing.length > 0) {
            const healed = [...parsed, ...missing];
            localStorage.setItem('lisa_keyboardOrder', JSON.stringify(healed));
            return healed;
          }
          return parsed;
        }
      }
    } catch (e) {}
    return ALL_KEYBOARDS;
  });

  const [defaultKeyboardMode, setDefaultKeyboardMode] = useState(() => localStorage.getItem('lisa_defaultKeyboardMode') || 'virtual_word'); 
  const [currentKeyboardMode, setCurrentKeyboardMode] = useState(() => {
     const saved = localStorage.getItem('lisa_currentKeyboardMode');
     return (saved && allowedKeyboards.includes(saved)) ? saved : defaultKeyboardMode;
  });

  const [sessionLimit, setSessionLimit] = useState(() => localStorage.getItem('lisa_sessionLimit') || 'Todos');
  
  const [skillOrder, setSkillOrder] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('lisa_skillOrder');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) {
          const missing = DEFAULT_SKILL_ORDER.filter(s => !parsed.includes(s));
          if (missing.length > 0) {
            const healed = [...parsed, ...missing];
            localStorage.setItem('lisa_skillOrder', JSON.stringify(healed));
            return healed;
          }
          return parsed;
        }
      }
    } catch(e) {}
    return DEFAULT_SKILL_ORDER;
  });

  const [enableMarkAsKnown, setEnableMarkAsKnown] = useState(() => JSON.parse(localStorage.getItem('lisa_markAsKnown') ?? 'true'));

  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
  const [selectedVoiceURI, setSelectedVoiceURI] = useState<string | null>(() => localStorage.getItem('lisa_voice') || null);

  const [stats, setStats] = useState(() => {
    const saved = localStorage.getItem('lisa_stats');
    return saved ? JSON.parse(saved) : { totalCompleted: 0, correctFirstTry: 0, totalAttempted: 0, skills: { Listening: 0, Reading: 0, Speaking: 0, Writing: 0, Flashcards: 0, Translate: 0 }, lastPlayedDate: new Date().toDateString(), streak: 0 };
  });
  
  const [completedActivities, setCompletedActivities] = useState(() => JSON.parse(localStorage.getItem('lisa_completed_activities') || '{}'));
  const [customThemes, setCustomThemes] = useState<any[]>(() => JSON.parse(localStorage.getItem('lisa_custom_themes') || '[]'));

  // Modal States
  const [mathQ, setMathQ] = useState({ a: 0, b: 0, ans: 0 });
  const [gateInputVal, setGateInputVal] = useState('');
  const [gateErrorMsg, setGateErrorMsg] = useState(false);
  const [settingsActiveTab, setSettingsActiveTab] = useState('general');
  const [showResetConfirmModal, setShowResetConfirmModal] = useState(false);
  const [deletingThemeId, setDeletingThemeId] = useState<string | null>(null);

  const categories = [...new Set(ALL_DATA.map(ex => ex.cat))];

  const validMistakes = mistakes.filter((m: any) => {
      if (!enableMultiModalProgression) {
         return m.kbLevel === undefined || m.kbLevel === 0;
      }
      return (!m.targetKeyboardMode || allowedKeyboards.includes(m.targetKeyboardMode));
  });

  useEffect(() => {
    let retryCount = 0;
    const synth = typeof window !== 'undefined' ? window.speechSynthesis : null;
    
    const loadVoices = () => { 
      if (!synth) return;
      try {
        let availableVoices = synth.getVoices(); 
        if (availableVoices.length > 0) {
          setVoices([...availableVoices]); 
          if (!localStorage.getItem('lisa_voice')) {
              const defaultEn = getEnglishVoice(availableVoices, null);
              if (defaultEn) setSelectedVoiceURI(defaultEn.voiceURI);
          }
        } else if (retryCount < 40) {
          retryCount++;
          setTimeout(loadVoices, 250);
        }
      } catch (e) {
        console.warn("Error getting speech synthesis voices:", e);
      }
    };
    
    if (synth) {
       try {
         if (synth.getVoices().length === 0) {
            let dummy = new SpeechSynthesisUtterance('');
            dummy.volume = 0;
            synth.speak(dummy);
            synth.cancel();
         }
       } catch (e) {
         console.warn("SpeechSynthesis startup priming fell back:", e);
       }
       
       loadVoices();
       try {
         synth.onvoiceschanged = loadVoices;
       } catch (e) {
         console.warn("Could not bind onvoiceschanged event:", e);
       }
    }
  }, []);

  useEffect(() => { localStorage.setItem('lisa_completed_ex_ids', JSON.stringify(completedExIds)); }, [completedExIds]);
  useEffect(() => { localStorage.setItem('lisa_learned_ex_ids', JSON.stringify(learnedExIds)); }, [learnedExIds]);
  useEffect(() => { localStorage.setItem('lisa_markAsKnown', JSON.stringify(enableMarkAsKnown)); }, [enableMarkAsKnown]);
  useEffect(() => { localStorage.setItem('lisa_custom_themes', JSON.stringify(customThemes)); }, [customThemes]);
  useEffect(() => { localStorage.setItem('lisa_mistakes', JSON.stringify(mistakes)); }, [mistakes]);
  useEffect(() => { localStorage.setItem('lisa_permissive', JSON.stringify(isPermissive)); }, [isPermissive]);
  useEffect(() => { localStorage.setItem('lisa_speakPermissive', JSON.stringify(speakPermissive)); }, [speakPermissive]);
  useEffect(() => { localStorage.setItem('lisa_speakPreview', JSON.stringify(speakPreview)); }, [speakPreview]);
  useEffect(() => { localStorage.setItem('lisa_showSpeakingWord', JSON.stringify(showSpeakingWord)); }, [showSpeakingWord]);
  useEffect(() => { localStorage.setItem('lisa_micCountdown', JSON.stringify(enableMicCountdown)); }, [enableMicCountdown]);
  useEffect(() => { localStorage.setItem('lisa_flashcardMode', flashcardMode); }, [flashcardMode]);
  useEffect(() => { localStorage.setItem('lisa_showCompleted', JSON.stringify(showCompleted)); }, [showCompleted]);
  useEffect(() => { localStorage.setItem('lisa_clickToTranslate', JSON.stringify(enableClickToTranslate)); }, [enableClickToTranslate]);
  useEffect(() => { localStorage.setItem('lisa_strictMistakes', JSON.stringify(strictMistakeLogging)); }, [strictMistakeLogging]);
  useEffect(() => { localStorage.setItem('lisa_allowHelpInMistakes', JSON.stringify(allowHelpInMistakes)); }, [allowHelpInMistakes]);
  useEffect(() => { localStorage.setItem('lisa_voiceFeedback', JSON.stringify(enableVoiceFeedback)); }, [enableVoiceFeedback]);
  useEffect(() => { localStorage.setItem('lisa_strictTyping', JSON.stringify(strictTyping)); }, [strictTyping]);
  useEffect(() => { localStorage.setItem('lisa_enableTimer', JSON.stringify(enableTimer)); }, [enableTimer]);
  useEffect(() => { localStorage.setItem('lisa_timerSeconds', timerSeconds.toString()); }, [timerSeconds]);
  useEffect(() => { localStorage.setItem('lisa_allowedKeyboards', JSON.stringify(allowedKeyboards)); }, [allowedKeyboards]);
  useEffect(() => { localStorage.setItem('lisa_keyboardOrder', JSON.stringify(keyboardOrder)); }, [keyboardOrder]);
  useEffect(() => { localStorage.setItem('lisa_defaultKeyboardMode', defaultKeyboardMode); }, [defaultKeyboardMode]);
  useEffect(() => { localStorage.setItem('lisa_currentKeyboardMode', currentKeyboardMode); }, [currentKeyboardMode]);
  useEffect(() => { localStorage.setItem('lisa_sessionLimit', sessionLimit); }, [sessionLimit]);
  useEffect(() => { localStorage.setItem('lisa_skillOrder', JSON.stringify(skillOrder)); }, [skillOrder]);
  useEffect(() => { if (selectedVoiceURI) localStorage.setItem('lisa_voice', selectedVoiceURI); }, [selectedVoiceURI]);
  useEffect(() => { localStorage.setItem('lisa_stats', JSON.stringify(stats)); }, [stats]);
  useEffect(() => { localStorage.setItem('lisa_completed_activities', JSON.stringify(completedActivities)); }, [completedActivities]);
  
  useEffect(() => { localStorage.setItem('lisa_multiModal', JSON.stringify(enableMultiModalProgression)); }, [enableMultiModalProgression]);
  useEffect(() => { localStorage.setItem('lisa_progressionStyle', progressionStyle); }, [progressionStyle]);
  useEffect(() => { localStorage.setItem('lisa_progressiveGuidance', JSON.stringify(enableProgressiveGuidance)); }, [enableProgressiveGuidance]);
  useEffect(() => { localStorage.setItem('lisa_guidanceLevel', guidanceLevel); }, [guidanceLevel]);
  useEffect(() => { localStorage.setItem('lisa_guidanceCount', guidanceCount.toString()); }, [guidanceCount]);
  useEffect(() => { localStorage.setItem('lisa_guide_tracking', JSON.stringify(guideTracking)); }, [guideTracking]);
  useEffect(() => { localStorage.setItem('lisa_randomizeKeyboardsMode', randomizeKeyboardsMode); }, [randomizeKeyboardsMode]);

  useEffect(() => {
    if (currentScreen === 'exercise' && queue.length > 0 && activeCategory !== 'Learned') {
      let sessionKey = isMistakeMode ? 'mistakes' : `${activeCategory}_${activeSkill}`;
      if (activeCategory === 'ByPhrase') sessionKey = `ByPhrase_${queue[0]?.eng || 'unknown'}`;
      
      const sessionData = { queue, currentIndex, score, activeCategory, activeSkill, isMistakeMode };
      setActiveSessions(prev => {
        const updated = { ...prev, [sessionKey]: sessionData };
        localStorage.setItem('lisa_active_sessions', JSON.stringify(updated));
        return updated;
      });
    }
  }, [currentIndex, score, queue, currentScreen, activeCategory, activeSkill, isMistakeMode]);

  useEffect(() => {
    if (currentScreen === 'exercise' && (!queue || queue.length === 0 || !queue[currentIndex])) {
      setCurrentScreen('home');
    }
  }, [currentScreen, queue, currentIndex]);

  const showGlobalToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 3000);
  };

  const handleWordClickGlobal = async (word: string, defaultLang = 'auto') => {
    if (!enableClickToTranslate) return;
    if (isMistakeMode && !allowHelpInMistakes) {
      showGlobalToast("❌ Ayuda desactivada en repaso de errores.");
      return;
    }
    
    const clean = word.toLowerCase().replace(/[.,!¿?¡:;"'()]/g, '');
    const matchInfo: any = translateWord(clean);

    let sourceLang = matchInfo ? matchInfo.sourceLang : 'auto';
    let text1 = clean;
    let text2: string | null = null;
    let targetLang = sourceLang === 'en' ? 'es' : 'en';

    if (matchInfo) {
      text1 = sourceLang === 'en' ? matchInfo.eng : matchInfo.spa;
      text2 = sourceLang === 'en' ? matchInfo.spa : matchInfo.eng;
    } else {
      if (sourceLang === 'auto') {
         sourceLang = defaultLang !== 'auto' ? defaultLang : detectLanguage(word);
         targetLang = sourceLang === 'en' ? 'es' : 'en';
      }
    }

    showGlobalToast(text2 ? `📖 ${text1} ➡️ ${text2}` : `📖 ${text1}`);

    await playTTS(text1, sourceLang, selectedVoiceURI, 0.9, true);
    if (text2) {
      await playTTS(text2, targetLang, selectedVoiceURI, 0.9, false);
    }
  };

  const handleUpdateStats = (skill: string, isCorrectFirstTry: boolean) => {
    setStats((prev: any) => {
      const newStats = { ...prev };
      newStats.totalAttempted += 1;
      if (isCorrectFirstTry) newStats.correctFirstTry += 1;
      newStats.totalCompleted += 1;
      if (skill && skill !== 'Mix' && skill !== 'Repaso General' && skill !== 'Módulo Completo') newStats.skills[skill] = (newStats.skills[skill] || 0) + 1;

      const today = new Date().toDateString();
      const yesterday = new Date(Date.now() - 86400000).toDateString();
      if (newStats.lastPlayedDate === yesterday) newStats.streak += 1;
      else if (newStats.lastPlayedDate !== today) newStats.streak = 1;
      newStats.lastPlayedDate = today;
      return newStats;
    });
  };

  const getCategoryPool = (cat: string) => {
    if (cat === 'All') return EXERCISES_DB;
    if (cat === 'Learned') return EXERCISES_DB.filter(ex => learnedExIds.includes(ex.baseId || ex.id));
    const customTheme = customThemes.find(ct => ct.id === cat);
    if (customTheme) return EXERCISES_DB.filter(ex => customTheme.exerciseIds.includes(ex.id));
    return EXERCISES_DB.filter(ex => ex.category === cat);
  };

  const getCompletionStats = (exercisePool: any[]) => {
    if (exercisePool.length === 0) return { completed: 0, total: 0 };
    
    const isKeyboardLayoutType = (type: string) => {
      return ['flashcard', 'build_sentence', 'listen_and_write', 'dialogue_chat', 'quiz', 'reading'].includes(type);
    };

    if (!enableMultiModalProgression) {
      const singlePool = exercisePool.filter(ex => ex.kbLevel === undefined || ex.kbLevel === 0);
      const completed = singlePool.filter(ex => completedExIds.includes(ex.id) || learnedExIds.includes(ex.baseId || ex.id)).length;
      return { completed, total: singlePool.length };
    } else {
      const seenBases = new Set<string>();
      const baseExercises: any[] = [];
      exercisePool.forEach(ex => {
        const baseKey = ex.baseId || ex.id;
        if (!seenBases.has(baseKey)) {
          seenBases.add(baseKey);
          baseExercises.push(ex);
        }
      });

      const activeModes = keyboardOrder.filter(kb => allowedKeyboards.includes(kb));
      let completedCount = 0;
      let totalCount = 0;

      baseExercises.forEach(ex => {
        const baseKey = ex.baseId || ex.id;
        if (learnedExIds.includes(baseKey)) {
          if (isKeyboardLayoutType(ex.type)) {
            completedCount += activeModes.length;
            totalCount += activeModes.length;
          } else {
            completedCount += 1;
            totalCount += 1;
          }
        } else if (isKeyboardLayoutType(ex.type)) {
          activeModes.forEach(kbMode => {
            totalCount += 1;
            if (completedExIds.includes(`${baseKey}_${kbMode}`)) {
              completedCount += 1;
            }
          });
        } else {
          totalCount += 1;
          if (completedExIds.includes(ex.id)) {
            completedCount += 1;
          }
        }
      });

      return { completed: completedCount, total: totalCount };
    }
  };

  const isCatCompleted = (cat: string) => {
     const pool = getCategoryPool(cat);
     const { completed, total } = getCompletionStats(pool);
     return total > 0 && completed === total;
  };

  const isSkillCompleted = (cat: string, skill: string) => {
     const pool = getCategoryPool(cat).filter(ex => skill === 'Mix' ? true : ex.skill === skill);
     const { completed, total } = getCompletionStats(pool);
     return total > 0 && completed === total;
  };

  const startCategory = (category: string) => { setActiveCategory(category); setCurrentScreen('skill_select'); };

  const getKbRank = (mode: string) => {
       let idx = keyboardOrder.indexOf(mode);
       return idx === -1 ? 999 : idx;
  };

  const startSkillPractice = (skill: string) => {
    setActiveSkill(skill);
    setIsMistakeMode(false);

    const sessionKey = `${activeCategory}_${skill}`;
    if (activeSessions[sessionKey] && activeCategory !== 'Learned') {
      const data = activeSessions[sessionKey];
      if (data.queue && data.queue.length > 0 && data.currentIndex < data.queue.length) {
        setQueue(data.queue); setCurrentIndex(data.currentIndex); setScore(data.score);
        setCurrentScreen('exercise');
        return;
      }
    } 

    let pool = getCategoryPool(activeCategory!);
    if (skill !== 'Mix') pool = pool.filter(ex => ex.skill === skill);
    
    let finalQueue: any[] = [];

    const isKeyboardLayoutType = (type: string) => {
      return ['flashcard', 'build_sentence', 'listen_and_write', 'dialogue_chat', 'quiz', 'reading'].includes(type);
    };

    if (enableMultiModalProgression && activeCategory !== 'Learned') {
      const seenBases = new Set<string>();
      const basePool: any[] = [];
      pool.forEach(ex => {
        const baseKey = ex.baseId || ex.id;
        if (!seenBases.has(baseKey)) {
          seenBases.add(baseKey);
          basePool.push(ex);
        }
      });

      const activeModes = keyboardOrder.filter(kb => allowedKeyboards.includes(kb));
      
      let uncompletedBases = basePool.filter(ex => {
        const baseKey = ex.baseId || ex.id;
        if (learnedExIds.includes(baseKey)) return false;
        
        if (!isKeyboardLayoutType(ex.type)) {
          return !completedExIds.includes(ex.id);
        }

        return !activeModes.every(kbMode => completedExIds.includes(`${baseKey}_${kbMode}`));
      });

      if (uncompletedBases.length === 0) {
        uncompletedBases = basePool.filter(ex => !learnedExIds.includes(ex.baseId || ex.id));
        if (uncompletedBases.length === 0) uncompletedBases = basePool;
      }

      const guideExercises: any[] = [];
      if (enableProgressiveGuidance) {
        const kbBases = uncompletedBases.filter(ex => isKeyboardLayoutType(ex.type));
        if (kbBases.length > 0) {
            if (guidanceLevel === 'mode') {
                activeModes.forEach((kbMode, kbIndex) => {
                    const trackKey = `mode_${kbMode}`;
                    const count = guideTracking[trackKey] || 0;
                    if (count < guidanceCount) {
                        const baseEx = kbBases[kbIndex % kbBases.length];
                        if (baseEx) {
                           guideExercises.push({
                              ...baseEx,
                              id: `guide_${baseEx.baseId || baseEx.id}_${kbMode}_${count}`,
                              baseId: baseEx.baseId || baseEx.id,
                              targetKeyboardMode: kbMode,
                              kbLevel: kbIndex,
                              isGuide: true,
                              trackKey
                           });
                        }
                    }
                });
            } else if (guidanceLevel === 'type') {
                 const types = [...new Set(kbBases.map(ex => ex.type))];
                 types.forEach(t => {
                     const trackKey = `type_${t}`;
                     const count = guideTracking[trackKey] || 0;
                     if (count < guidanceCount) {
                         const typeBases = kbBases.filter(ex => ex.type === t);
                         const baseEx = typeBases[Math.floor(Math.random() * typeBases.length)];
                         if (baseEx) {
                             guideExercises.push({
                                ...baseEx,
                                id: `guide_${baseEx.baseId || baseEx.id}_${t}_${count}`,
                                baseId: baseEx.baseId || baseEx.id,
                                targetKeyboardMode: activeModes[0] || 'virtual_word',
                                kbLevel: 0,
                                isGuide: true,
                                trackKey
                            });
                         }
                     }
                 });
            } else if (guidanceLevel === 'theme') {
                 const cat = activeCategory;
                 if (cat !== 'All' && cat !== 'Learned' && cat !== 'ByPhrase') {
                     const trackKey = `theme_${cat}`;
                     const count = guideTracking[trackKey] || 0;
                     if (count < guidanceCount) {
                         const baseEx = kbBases[Math.floor(Math.random() * kbBases.length)];
                         if (baseEx) {
                             guideExercises.push({
                                ...baseEx,
                                id: `guide_${baseEx.baseId || baseEx.id}_theme_${count}`,
                                baseId: baseEx.baseId || baseEx.id,
                                targetKeyboardMode: activeModes[0] || 'virtual_word',
                                kbLevel: 0,
                                isGuide: true,
                                trackKey
                            });
                         }
                     }
                 } else if (cat === 'All') {
                     const uncompletedCats = [...new Set(kbBases.map(ex => ex.cat))];
                     uncompletedCats.forEach(c => {
                         const trackKey = `theme_${c}`;
                         const count = guideTracking[trackKey] || 0;
                         if (count < guidanceCount) {
                             const catBases = kbBases.filter(ex => ex.cat === c);
                             const baseEx = catBases[Math.floor(Math.random() * catBases.length)];
                             if (baseEx) {
                                 guideExercises.push({
                                    ...baseEx,
                                    id: `guide_${baseEx.baseId || baseEx.id}_theme_${count}`,
                                    baseId: baseEx.baseId || baseEx.id,
                                    targetKeyboardMode: activeModes[0] || 'virtual_word',
                                    kbLevel: 0,
                                    isGuide: true,
                                    trackKey
                                });
                             }
                         }
                     });
                 }
            }
        }
      }

      const mainReplicated: any[] = [];
      const nonKeyboardExs: any[] = [];

      uncompletedBases.forEach(baseEx => {
        const baseKey = baseEx.baseId || baseEx.id;
        if (isKeyboardLayoutType(baseEx.type)) {
          activeModes.forEach((kbMode, kbIndex) => {
            mainReplicated.push({
              ...baseEx,
              id: `${baseKey}_${kbMode}`,
              baseId: baseKey,
              targetKeyboardMode: kbMode,
              kbLevel: kbIndex,
              isGuide: false
            });
          });
        } else {
          nonKeyboardExs.push({
            ...baseEx,
            isGuide: false
          });
        }
      });

      let sequencedReplicated: any[] = [];

      if (progressionStyle === 'consecutive') {
        const groups: Record<string, any[]> = {};
        mainReplicated.forEach(ex => {
          if (!groups[ex.baseId]) groups[ex.baseId] = [];
          groups[ex.baseId].push(ex);
        });

        const sessionHierarchy = randomizeKeyboardsMode === 'session' 
            ? [...allowedKeyboards].sort(() => Math.random() - 0.5)
            : null;

        const getSessionKbRank = (mode: string) => {
            if (sessionHierarchy) {
                const idx = sessionHierarchy.indexOf(mode);
                return idx === -1 ? 999 : idx;
            }
            return getKbRank(mode);
        };

        Object.keys(groups).forEach(baseId => {
            if (randomizeKeyboardsMode === 'exercise') {
                groups[baseId].sort(() => Math.random() - 0.5);
            } else {
                groups[baseId].sort((a, b) => getSessionKbRank(a.targetKeyboardMode) - getSessionKbRank(b.targetKeyboardMode));
            }
        });

        const shuffledBaseIds = Object.keys(groups).sort(() => Math.random() - 0.5);
        shuffledBaseIds.forEach(baseId => {
            sequencedReplicated.push(...groups[baseId]);
        });

      } else {
        const sessionHierarchy = randomizeKeyboardsMode === 'session' 
            ? [...allowedKeyboards].sort(() => Math.random() - 0.5)
            : null;

        const getSessionKbRank = (mode: string) => {
            if (sessionHierarchy) {
                const idx = sessionHierarchy.indexOf(mode);
                return idx === -1 ? 999 : idx;
            }
            return getKbRank(mode);
        };

        const groupsByRank: Record<number, any[]> = {};
        mainReplicated.forEach(ex => {
            const r = getSessionKbRank(ex.targetKeyboardMode);
            if (!groupsByRank[r]) groupsByRank[r] = [];
            groupsByRank[r].push(ex);
        });

        const sortedRanks = Object.keys(groupsByRank)
            .map(Number)
            .sort((a, b) => a - b);

        sortedRanks.forEach(r => {
            const levelExs = groupsByRank[r].sort(() => Math.random() - 0.5);
            sequencedReplicated.push(...levelExs);
        });
      }

      const shuffledNonKeyboard = nonKeyboardExs.sort(() => Math.random() - 0.5);
      finalQueue = [...guideExercises, ...sequencedReplicated, ...shuffledNonKeyboard];

    } else {
      if (!enableMultiModalProgression) {
         pool = pool.filter(ex => ex.kbLevel === undefined || ex.kbLevel === 0);
      } else {
         pool = pool.filter(ex => ex.kbLevel === undefined || allowedKeyboards.includes(ex.targetKeyboardMode));
      }

      let uncompleted = activeCategory === 'Learned' 
         ? pool 
         : pool.filter(ex => !completedExIds.includes(ex.id) && !learnedExIds.includes(ex.baseId || ex.id));

      if (uncompleted.length === 0 && activeCategory !== 'Learned') {
         uncompleted = pool.filter(ex => !learnedExIds.includes(ex.baseId || ex.id));
         if (uncompleted.length === 0) uncompleted = pool; 
      }

      if (activeCategory === 'Monster Inc - Book') {
          uncompleted.sort((a, b) => {
              const aSent = a.sentenceIndex !== undefined ? a.sentenceIndex : 99999;
              const bSent = b.sentenceIndex !== undefined ? b.sentenceIndex : 99999;
              if (aSent !== bSent) return aSent - bSent;
              const aSkill = a.skillIndex !== undefined ? a.skillIndex : 99999;
              const bSkill = b.skillIndex !== undefined ? b.skillIndex : 99999;
              if (aSkill !== bSkill) return aSkill - bSkill;
              return (a.kbLevel ?? 0) - (b.kbLevel ?? 0);
          });
          finalQueue = [...uncompleted];
      } else if (activeCategory && activeCategory.startsWith('Numbers') && skill !== 'Mix' && activeCategory !== 'Learned') {
          uncompleted.sort((a, b) => {
              const getNum = (id: string) => parseInt(id.split('_')[1] || "0");
              return getNum(a.id) - getNum(b.id);
          });
          finalQueue = [...uncompleted];
      } else {
          finalQueue = uncompleted.sort(() => Math.random() - 0.5);
      }
    }

    if (activeCategory === 'Monster Inc - Book') {
      finalQueue.sort((a, b) => {
        const aSent = a.sentenceIndex !== undefined ? a.sentenceIndex : 99999;
        const bSent = b.sentenceIndex !== undefined ? b.sentenceIndex : 99999;
        if (aSent !== bSent) return aSent - bSent;
        const aSkill = a.skillIndex !== undefined ? a.skillIndex : 99999;
        const bSkill = b.skillIndex !== undefined ? b.skillIndex : 99999;
        if (aSkill !== bSkill) return aSkill - bSkill;
        return (a.kbLevel ?? 0) - (b.kbLevel ?? 0);
      });
    }

    setQueue(sessionLimit === 'Todos' ? finalQueue : finalQueue.slice(0, parseInt(sessionLimit)));

    setCurrentIndex(0); setScore(0); 
    setCurrentScreen('exercise');
  };

  const startPhrasePractice = (engText: string) => {
    setActiveCategory('ByPhrase');
    setActiveSkill('Módulo Completo');
    setIsMistakeMode(false);

    const sessionKey = `ByPhrase_${engText}`;
    if (activeSessions[sessionKey]) {
      const data = activeSessions[sessionKey];
      if (data.queue && data.queue.length > 0 && data.currentIndex < data.queue.length) {
        setQueue(data.queue); setCurrentIndex(data.currentIndex); setScore(data.score);
        setCurrentScreen('exercise');
        return;
      }
    }

    const pool = EXERCISES_DB.filter(ex => ex.eng === engText);
    let finalQueue: any[] = [];

    const isKeyboardLayoutType = (type: string) => {
      return ['flashcard', 'build_sentence', 'listen_and_write', 'dialogue_chat', 'quiz', 'reading'].includes(type);
    };

    if (enableMultiModalProgression) {
      const seenBases = new Set<string>();
      const basePool: any[] = [];
      pool.forEach(ex => {
        const baseKey = ex.baseId || ex.id;
        if (!seenBases.has(baseKey)) {
          seenBases.add(baseKey);
          basePool.push(ex);
        }
      });

      const activeModes = keyboardOrder.filter(kb => allowedKeyboards.includes(kb));
      const mainReplicated: any[] = [];
      const nonKeyboardExs: any[] = [];

      basePool.forEach(baseEx => {
        const baseKey = baseEx.baseId || baseEx.id;
        if (isKeyboardLayoutType(baseEx.type)) {
          activeModes.forEach((kbMode, kbIndex) => {
            mainReplicated.push({
              ...baseEx,
              id: `${baseKey}_${kbMode}`,
              baseId: baseKey,
              targetKeyboardMode: kbMode,
              kbLevel: kbIndex,
              isGuide: false
            });
          });
        } else {
          nonKeyboardExs.push({
            ...baseEx,
            isGuide: false
          });
        }
      });

      const idealOrder = ['Listening', 'Speaking', 'Reading', 'Translate', 'Writing', 'Flashcards', 'Conversation'];
      const combined = [...mainReplicated, ...nonKeyboardExs];
      combined.sort((a, b) => {
          if (a.skill === b.skill && a.targetKeyboardMode && b.targetKeyboardMode) {
              return getKbRank(a.targetKeyboardMode) - getKbRank(b.targetKeyboardMode);
          }
          return idealOrder.indexOf(a.skill) - idealOrder.indexOf(b.skill);
      });
      finalQueue = combined;

    } else {
      let filteredPool = pool.filter(ex => ex.kbLevel === undefined || ex.kbLevel === 0);
      const idealOrder = ['Listening', 'Speaking', 'Reading', 'Translate', 'Writing', 'Flashcards', 'Conversation'];
      filteredPool.sort((a, b) => {
          if (a.skill === b.skill && a.targetKeyboardMode && b.targetKeyboardMode) {
              return getKbRank(a.targetKeyboardMode) - getKbRank(b.targetKeyboardMode);
          }
          return idealOrder.indexOf(a.skill) - idealOrder.indexOf(b.skill);
      });
      finalQueue = filteredPool;
    }

    setQueue(finalQueue);
    setCurrentIndex(0); setScore(0);
    setCurrentScreen('exercise');
  };

  const startMistakesReview = () => {
    setIsMistakeMode(true);
    setActiveSkill('Repaso General');
    if (activeSessions['mistakes']) {
      const data = activeSessions['mistakes'];
      if (data.queue && data.queue.length > 0 && data.currentIndex < data.queue.length) {
        setQueue(data.queue); setCurrentIndex(data.currentIndex); setScore(data.score);
        setCurrentScreen('exercise');
        return;
      }
    }
    setQueue([...validMistakes]); setCurrentIndex(0); setScore(0); 
    setCurrentScreen('exercise');
  };

  const openParentalGate = () => {
    const a = Math.floor(Math.random() * 10) + 5; 
    const b = Math.floor(Math.random() * 8) + 3;  
    setMathQ({ a, b, ans: a * b });
    setGateInputVal('');
    setGateErrorMsg(false);
    setShowParentalGate(true);
  };

  const renderParentalGateModal = () => {
    const checkGate = () => {
      if (parseInt(gateInputVal) === mathQ.ans || gateInputVal === '190618') { setShowParentalGate(false); setShowSettings(true); } 
      else { setGateErrorMsg(true); setGateInputVal(''); }
    };

    return (
      <div className="absolute inset-0 bg-black bg-opacity-75 z-[999] flex items-start justify-center p-4 pt-10">
        <div className="bg-white rounded-3xl p-6 w-full max-w-sm shadow-2xl relative animate-slide-down text-center">
          <button onClick={() => setShowParentalGate(false)} className="absolute top-4 right-4 text-gray-400 hover:text-gray-700" title="Cerrar"><XCircle size={28}/></button>
          <div className="flex justify-center mb-4 text-indigo-500"><Lock size={48}/></div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Solo para Adultos</h2>
          <p className="text-gray-600 mb-6 font-medium">Resuelve la operación para configurar la app.</p>
          <div className="text-3xl font-black text-indigo-800 mb-6 tracking-wider">{mathQ.a} x {mathQ.b} = ?</div>
          <input type="number" value={gateInputVal} onChange={e => setGateInputVal(e.target.value)} className="w-full p-4 rounded-xl border-2 border-indigo-200 text-center text-2xl font-bold mb-2 focus:outline-none focus:border-indigo-500" placeholder="Resultado"/>
          {gateErrorMsg && <p className="text-red-500 text-sm font-bold mb-4">Incorrecto. Intenta de nuevo.</p>}
          <button onClick={checkGate} className="w-full mt-4 py-4 bg-indigo-600 text-white rounded-xl font-bold text-lg active:scale-95" title="Verificar respuesta">Verificar</button>
        </div>
      </div>
    );
  };

  const renderSettingsModal = () => {
    const moveSkillOrder = (idx: number, dir: string) => {
      const newO = [...skillOrder];
      if (dir === 'up' && idx > 0) { [newO[idx], newO[idx-1]] = [newO[idx-1], newO[idx]]; }
      else if (dir === 'down' && idx < newO.length - 1) { [newO[idx], newO[idx+1]] = [newO[idx+1], newO[idx]]; }
      setSkillOrder(newO);
    };

    const moveKeyboardOrder = (idx: number, dir: string) => {
      const newO = [...keyboardOrder];
      if (dir === 'up' && idx > 0) { [newO[idx], newO[idx-1]] = [newO[idx-1], newO[idx]]; }
      else if (dir === 'down' && idx < newO.length - 1) { [newO[idx], newO[idx+1]] = [newO[idx+1], newO[idx]]; }
      setKeyboardOrder(newO);
    };

    const toggleKeyboardAllowed = (id: string) => {
      let newAllowed;
      if (allowedKeyboards.includes(id)) {
        newAllowed = allowedKeyboards.filter((k: string) => k !== id);
        if (newAllowed.length === 0) return; 
      } else {
        newAllowed = [...allowedKeyboards, id];
      }
      setAllowedKeyboards(newAllowed);
      
      if (!newAllowed.includes(defaultKeyboardMode)) {
        setDefaultKeyboardMode(newAllowed[0]);
      }
    };

    return (
      <div className="absolute inset-0 bg-white z-[999] flex flex-col animate-slide-down">
        <div className="flex justify-between items-center p-4 border-b border-gray-100 shrink-0">
          <h2 className="text-xl font-bold text-indigo-800 flex items-center gap-2"><Settings/> Ajustes y Control</h2>
          <button onClick={() => setShowSettings(false)} className="text-gray-400 hover:text-gray-700" title="Cerrar Ajustes"><XCircle size={28}/></button>
        </div>

        <div className="p-4 shrink-0">
          <div className="flex bg-gray-100 p-1 rounded-xl">
            <button onClick={() => setSettingsActiveTab('general')} className={`flex-1 py-2 font-bold rounded-lg ${settingsActiveTab === 'general' ? 'bg-white shadow text-indigo-700' : 'text-gray-500'}`}>General</button>
            <button onClick={() => setSettingsActiveTab('advanced')} className={`flex-1 py-2 font-bold rounded-lg ${settingsActiveTab === 'advanced' ? 'bg-white shadow text-indigo-700' : 'text-gray-500'}`}>Avanzadas</button>
          </div>
        </div>
        
        <div className="flex-1 overflow-y-auto px-4 pb-4">
          {settingsActiveTab === 'general' && (
              <div className="space-y-4">
                
                <div className="bg-sky-50 p-4 rounded-xl border border-sky-100">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-bold text-gray-800">Ejercicios por Sesión</span>
                  </div>
                  <select value={sessionLimit} onChange={(e) => setSessionLimit(e.target.value)} className="w-full p-2 rounded-lg border-2 border-sky-200 bg-white text-sm font-bold text-sky-900">
                    <option value="10">10 ejercicios (Corto)</option>
                    <option value="15">15 ejercicios (Medio)</option>
                    <option value="20">20 ejercicios (Largo)</option>
                    <option value="Todos">Todos los del tema (Completo)</option>
                  </select>
                </div>

                <div className="bg-indigo-50 p-4 rounded-xl border border-indigo-100">
                  <h3 className="font-bold text-lg text-indigo-800 mb-2 flex items-center gap-1"><Keyboard size={20}/> Evolución Automática</h3>
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-bold text-gray-800 text-sm">Activar Evolución</span>
                    <input type="checkbox" checked={enableMultiModalProgression} onChange={(e) => setEnableMultiModalProgression(e.target.checked)} className="w-5 h-5 text-indigo-600 rounded" />
                  </div>
                  <p className="text-xs text-gray-600 mb-3">Si está activo, aprenderás cada palabra pasando progresivamente por todos los modos permitidos.</p>

                  {enableMultiModalProgression && (<>
                    <div className="flex justify-between items-center mb-3 border-t border-indigo-200 pt-3">
                      <span className="font-bold text-gray-800 text-sm">Estilo de Progresión</span>
                      <select value={progressionStyle} onChange={(e) => setProgressionStyle(e.target.value)} className="p-1.5 rounded bg-white border border-indigo-200 text-xs font-bold text-indigo-900">
                         <option value="consecutive">🔁 Por Ejercicio (Consecutivo por frase)</option>
                         <option value="interleaved">🌎 Por Tema/Grupo (Aleatorio nivel a nivel)</option>
                      </select>
                    </div>
                    <div className="flex justify-between items-center mb-3 mt-3">
                      <span className="font-bold text-gray-800 text-sm">Aleatoriedad de Entrada</span>
                      <select value={randomizeKeyboardsMode} onChange={(e) => setRandomizeKeyboardsMode(e.target.value)} className="p-1.5 rounded bg-white border border-indigo-200 text-xs font-bold text-indigo-900">
                         <option value="none">📋 Jerarquía Ordenada (Fija)</option>
                         <option value="entry">⚡ Entrada de Datos (Completo Azar)</option>
                         <option value="exercise">🧩 Por Ejercicio (Orden Azar por frase)</option>
                         <option value="session">🎒 Por Tema/Conjunto (Orden Azar global)</option>
                      </select>
                    </div>
                    <div className="text-[10px] text-gray-500 mb-2 leading-snug">
                      {randomizeKeyboardsMode === 'none' && "Utiliza el orden secuencial de tu lista de modos jerarquizados."}
                      {randomizeKeyboardsMode === 'entry' && "Cada entrada de teclado se elige al azar en cada intento, ignorando la jerarquía."}
                      {randomizeKeyboardsMode === 'exercise' && "Cada frase/ejercicio baraja sus niveles para completarlos en orden aleatorio."}
                      {randomizeKeyboardsMode === 'session' && "La sesión adopta una jerarquía barajada al azar para todo el conjunto."}
                    </div>
                  </>)}

                  <div className="flex justify-between items-center mb-2 border-t border-indigo-200 pt-3">
                    <span className="font-bold text-gray-800 text-sm">Guía de Ayuda (En todos los niveles)</span>
                    <input type="checkbox" checked={enableProgressiveGuidance} onChange={(e) => setEnableProgressiveGuidance(e.target.checked)} className="w-5 h-5 text-indigo-600 rounded" />
                  </div>
                  <p className="text-xs text-gray-600 mb-3">Muestra la palabra correcta tenuemente para guiarte paso a paso por todos los teclados habilitados.</p>

                  {enableProgressiveGuidance && (
                     <div className="bg-white p-3 rounded-lg border border-indigo-100 flex flex-col gap-3 mb-4">
                        <div className="flex flex-col gap-1">
                          <span className="font-bold text-gray-800 text-xs">Nivel de Aparición</span>
                          <select value={guidanceLevel} onChange={(e) => setGuidanceLevel(e.target.value)} className="w-full p-1.5 rounded-lg border-2 border-indigo-200 bg-gray-50 text-xs font-bold text-indigo-900 focus:outline-none">
                            <option value="theme">Por Tema (repetir X veces por tema completo)</option>
                            <option value="type">Por Ejercicio (repetir X veces por tipo: flashcard, etc)</option>
                            <option value="mode">Por Modo (repetir X veces por modo de teclado: burbujas, bloques)</option>
                          </select>
                        </div>
                        <div className="flex items-center justify-between gap-2">
                           <span className="font-bold text-gray-800 text-xs">Veces que se repite la ayuda:</span>
                           <input type="number" min="1" max="100" value={guidanceCount} onChange={(e) => {
                             const val = parseInt(e.target.value);
                             if (!isNaN(val) && val > 0) setGuidanceCount(val);
                           }} className="w-16 p-1.5 border-2 border-indigo-200 rounded text-center text-xs font-bold" />
                        </div>
                     </div>
                  )}

                  <div className="border-t border-indigo-200 pt-3 mb-4">
                    <span className="font-bold text-gray-800 text-sm block mb-2">Modos Permitidos y Jerarquía</span>
                    <p className="text-xs text-gray-600 mb-2">Ordena la jerarquía (de de arriba hacia abajo) y activa los modos a utilizar.</p>
                    <div className="space-y-2">
                       {keyboardOrder.map((kid: string, idx: number) => {
                         const opt = KEYBOARD_OPTIONS.find(o => o.id === kid);
                         if (!opt) return null;
                         return (
                           <div key={opt.id} className="flex justify-between items-center bg-white p-2 rounded-lg border border-indigo-100 shadow-sm">
                             <label className="flex items-center gap-2 text-sm font-medium text-indigo-900 cursor-pointer flex-1">
                               <input type="checkbox" checked={allowedKeyboards.includes(opt.id)} onChange={() => toggleKeyboardAllowed(opt.id)} className="w-5 h-5 text-indigo-600 rounded shrink-0" />
                               <span className="truncate">{idx + 1}. {opt.label}</span>
                             </label>
                             <div className="flex gap-1 shrink-0">
                                <button disabled={idx === 0} onClick={() => moveKeyboardOrder(idx, 'up')} className="p-1 text-indigo-500 disabled:opacity-30 hover:bg-indigo-50 rounded"><ArrowUp size={18}/></button>
                                <button disabled={idx === keyboardOrder.length - 1} onClick={() => moveKeyboardOrder(idx, 'down')} className="p-1 text-indigo-500 disabled:opacity-30 hover:bg-indigo-50 rounded"><ArrowDown size={18}/></button>
                             </div>
                           </div>
                         );
                       })}
                    </div>
                  </div>

                  {!enableMultiModalProgression && (
                    <div className="border-t border-indigo-200 pt-3">
                      <span className="font-bold text-gray-800 text-sm block mb-2">Teclado por Defecto (Fijo)</span>
                      <select value={defaultKeyboardMode} onChange={(e) => {
                           setDefaultKeyboardMode(e.target.value);
                           setCurrentKeyboardMode(e.target.value);
                      }} className="w-full p-2 rounded-lg border-2 border-indigo-200 bg-white text-sm font-bold text-indigo-900">
                        <option value="random">🎲 Aleatorio (por ejercicio)</option>
                        {KEYBOARD_OPTIONS.filter((opt: any) => allowedKeyboards.includes(opt.id)).map((opt: any) => (
                          <option key={opt.id} value={opt.id}>{opt.label}</option>
                        ))}
                      </select>
                    </div>
                  )}
                  
                  <div className="flex justify-between items-center border-t border-indigo-200 pt-3 mt-3">
                    <span className="font-bold text-gray-800 text-sm">Ortografía Estricta</span>
                    <input type="checkbox" checked={strictTyping} onChange={(e) => setStrictTyping(e.target.checked)} className="w-5 h-5 text-indigo-600 rounded" title="Requerir mayúsculas y signos de puntuación exactos" />
                  </div>
                  <p className="text-xs text-gray-500 mt-1 italic">{strictTyping ? "🔴 Exige mayúsculas y signos al escribir." : "🟢 Ignora mayúsculas y signos de puntuación."}</p>
                </div>

                <div className="bg-fuchsia-50 p-4 rounded-xl border border-fuchsia-100">
                  <div className="flex justify-between items-center mb-1">
                    <span className="font-bold text-gray-800">Botón "Ya lo estudié"</span>
                    <input type="checkbox" checked={enableMarkAsKnown} onChange={(e) => setEnableMarkAsKnown(e.target.checked)} className="w-6 h-6 text-fuchsia-600 rounded" title="Añade botón 'Ya lo sé' para quitar ejercicios y llevarlos a repaso" />
                  </div>
                  <p className="text-xs text-gray-600 mb-3">{enableMarkAsKnown ? "🟢 Puedes marcar ejercicios aprendidos en el juego y estadísticas." : "🔴 Desactivado."}</p>
                </div>

                <div className="bg-teal-50 p-4 rounded-xl border border-teal-100">
                   <h3 className="font-bold text-lg text-teal-800 mb-1">Orden de los Módulos</h3>
                   <p className="text-xs text-gray-600 mb-3">Ordena los botones de los ejercicios:</p>
                   <div className="space-y-2">
                     {skillOrder.map((skill: string, index: number) => (
                        <div key={skill} className="flex justify-between items-center bg-white p-2 rounded-lg border border-teal-200 shadow-sm">
                           <span className="font-bold text-teal-900 text-sm flex items-center gap-2">{SKILL_ICONS[skill]} {SKILL_LABELS[skill]}</span>
                           <div className="flex gap-1">
                              <button disabled={index === 0} onClick={() => moveSkillOrder(index, 'up')} className="p-1 text-teal-600 disabled:opacity-30 hover:bg-teal-100 rounded"><ArrowUp size={18}/></button>
                              <button disabled={index === skillOrder.length - 1} onClick={() => moveSkillOrder(index, 'down')} className="p-1 text-teal-600 disabled:opacity-30 hover:bg-teal-100 rounded"><ArrowDown size={18}/></button>
                           </div>
                        </div>
                     ))}
                   </div>
                </div>

                <div className="bg-blue-50 p-4 rounded-xl border border-blue-100">
                  <div className="flex justify-between items-center mb-1">
                    <span className="font-bold text-gray-800">Clic para Traducir</span>
                    <input type="checkbox" checked={enableClickToTranslate} onChange={(e) => setEnableClickToTranslate(e.target.checked)} className="w-6 h-6 text-blue-600 rounded" title="Activa o desactiva la traducción al tocar palabras" />
                  </div>
                  <p className="text-xs text-gray-600 mb-3">{enableClickToTranslate ? "🟢 Al tocar palabras se traducen y pronuncian." : "🔴 Desactivado."}</p>
                </div>

                <div className="bg-orange-50 p-4 rounded-xl border border-orange-100">
                  <div className="flex justify-between items-center mb-1">
                    <span className="font-bold text-gray-800">Flexibilidad al Hablar</span>
                    <input type="checkbox" checked={speakPermissive} onChange={(e) => setSpeakPermissive(e.target.checked)} className="w-6 h-6 text-orange-600" />
                  </div>
                  <p className="text-xs text-gray-600 mb-3">{speakPermissive ? "🟢 Permite pequeños errores o fragmentos." : "🔴 Exactitud estricta."}</p>
                  
                  <div className="flex justify-between items-center mb-1 border-t border-orange-200 pt-3">
                    <span className="font-bold text-gray-800">Escuchar antes de Hablar</span>
                    <input type="checkbox" checked={speakPreview} onChange={(e) => setSpeakPreview(e.target.checked)} className="w-6 h-6 text-orange-600" />
                  </div>

                  <div className="flex justify-between items-center mb-1 border-t border-orange-200 pt-3">
                    <span className="font-bold text-gray-800">Karaoke (Resaltar Palabra)</span>
                    <input type="checkbox" checked={showSpeakingWord} onChange={(e) => setShowSpeakingWord(e.target.checked)} className="w-6 h-6 text-orange-600" />
                  </div>
                </div>

                <div className="bg-yellow-50 p-4 rounded-xl border border-yellow-100">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-bold text-gray-800">Temporizador (Urgencia)</span>
                    <input type="checkbox" checked={enableTimer} onChange={(e) => setEnableTimer(e.target.checked)} className="w-6 h-6 text-yellow-600" />
                  </div>
                  {enableTimer && (
                    <select value={timerSeconds} onChange={(e) => setTimerSeconds(parseInt(e.target.value))} className="w-full p-2 rounded-lg border-2 border-yellow-200 bg-white text-sm font-bold text-yellow-900 mt-2">
                      <option value={15}>15 Segundos (Difícil)</option>
                      <option value={30}>30 Segundos (Medio)</option>
                      <option value={60}>60 Segundos (Fácil)</option>
                      <option value={90}>1:30 Minutos (Recomendado)</option>
                      <option value={120}>2:00 Minutos (Largo)</option>
                    </select>
                  )}
                  
                  <div className="flex justify-between items-center mb-2 border-t border-yellow-200 pt-3 mt-3">
                    <span className="font-bold text-gray-800">Feedback Animador (Voz)</span>
                    <input type="checkbox" checked={enableVoiceFeedback} onChange={(e) => setEnableVoiceFeedback(e.target.checked)} className="w-6 h-6 text-yellow-600" />
                  </div>
                </div>

                <div className="bg-purple-50 p-4 rounded-xl border border-purple-100">
                  <label className="font-bold text-gray-800 block mb-2">Modo Tarjetas (Flashcards)</label>
                  <select value={flashcardMode} onChange={(e) => setFlashcardMode(e.target.value)} className="w-full p-2 rounded-lg border-2 border-purple-200 bg-white text-sm font-bold text-purple-900">
                    <option value="interactive">⭐ Interactivo (Teclado/Microfono)</option>
                    <option value="classic">📖 Clásico ("Lo sé/No lo sé")</option>
                  </select>
                </div>

                <div className="bg-gray-100 p-4 rounded-xl border border-gray-200">
                  <label className="font-bold text-gray-800 block mb-2">Voz del Sistema (Inglés)</label>
                  <select value={selectedVoiceURI || ''} onChange={(e) => {
                      const uri = e.target.value; setSelectedVoiceURI(uri);
                      if (uri) {
                        playTTS("Hello! I am ready to learn English with Lisa.", 'en', uri, 0.9, true);
                      }
                    }} className="w-full p-2 rounded-lg border-2 border-gray-300 bg-white text-sm truncate">
                    <option value="">Selección automática</option>
                    {voices.filter(v => (v.lang || '').toLowerCase().startsWith('en-') || (v.lang || '').toLowerCase() === 'en').map(v => {
                      const isLocal = v.localService === true || (v.localService !== false && !v.name.toLowerCase().includes('google'));
                      return (
                        <option key={v.voiceURI} value={v.voiceURI}>
                          {v.name} {isLocal ? "🔊 (Recomendada - Local)" : "🌐 (Remota - Puede ser silenciada)"}
                        </option>
                      );
                    })}
                  </select>
                </div>

                <div className="bg-emerald-50 p-4 rounded-xl border border-emerald-100">
                  <div className="flex justify-between items-center mb-1">
                    <span className="font-bold text-gray-800">Mostrar Completados</span>
                    <input type="checkbox" checked={showCompleted} onChange={(e) => setShowCompleted(e.target.checked)} className="w-6 h-6 text-emerald-600 rounded" />
                  </div>
                  <p className="text-xs text-gray-600">{showCompleted ? "🟢 Muestra todo en el menú." : "🔴 Oculta los temas terminados."}</p>
                </div>
              </div>
            )}

            {settingsActiveTab === 'advanced' && (
              <div className="space-y-4">
                 <div className="bg-indigo-50 p-4 rounded-xl border border-indigo-200">
                    <h3 className="font-bold text-lg text-indigo-800 mb-2">Micrófono</h3>
                    <div className="flex justify-between items-center mb-1">
                      <span className="font-bold text-gray-800 text-sm">Conteo 3, 2, 1 al hablar</span>
                      <input type="checkbox" checked={enableMicCountdown} onChange={(e) => setEnableMicCountdown(e.target.checked)} className="w-6 h-6 text-indigo-600 rounded" />
                    </div>
                    <p className="text-xs text-gray-600">Si está activo, habrá un conteo antes de grabar. Si está apagado, grabará inmediatamente al tocar el micrófono.</p>
                 </div>

                 <div className="bg-red-50 p-4 rounded-xl border border-red-200 mt-4">
                    <h3 className="font-bold text-lg text-red-800 mb-2">Zona de Peligro</h3>
                    <p className="text-sm text-red-600 mb-4">Esto eliminará las estadísticas, los errores, temas dominados y las marcas de nivel completado.</p>
                    <button onClick={() => {
                        setShowResetConfirmModal(true);
                    }} className="w-full py-3 bg-red-500 text-white hover:bg-red-600 rounded-xl font-bold text-sm active:scale-95 flex items-center justify-center gap-2">
                      <RefreshCw size={16}/> Borrar todo el progreso
                    </button>
                 </div>
              </div>
            )}
          </div>
          
          <div className="p-4 shrink-0 border-t bg-gray-50">
            <button onClick={() => setShowSettings(false)} className="w-full py-4 bg-indigo-600 text-white rounded-xl font-bold text-lg active:scale-95 shadow-lg border-b-4 border-indigo-800">
              Guardar y Cerrar
            </button>
          </div>
      </div>
    );
  };

  const renderResetConfirmModal = () => {
    return (
      <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[10000] flex items-center justify-center p-4">
        <div className="bg-white rounded-3xl border-4 border-red-500 max-w-sm w-full p-6 shadow-2xl animate-scale-up text-center">
          <div className="bg-red-100 text-red-500 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 text-3xl shadow-inner">
            ⚠️
          </div>
          <h3 className="text-xl font-extrabold text-red-600 mb-2">¡Cuidado! Acción Permanente</h3>
          <p className="text-sm text-gray-600 mb-6 font-medium leading-relaxed">
            ¿Estás seguro de que quieres borrar todo tu progreso, estadísticas y temas en Lisa's Quest? Esto volverá la app a su estado de fábrica y no se puede deshacer.
          </p>
          <div className="flex flex-col gap-2.5">
            <button 
              onClick={() => {
                setCompletedExIds([]);
                setLearnedExIds([]);
                setCustomThemes([]);
                setStats({ totalCompleted: 0, correctFirstTry: 0, totalAttempted: 0, skills: { Listening: 0, Reading: 0, Speaking: 0, Writing: 0, Flashcards: 0, Translate: 0 }, lastPlayedDate: new Date().toDateString(), streak: 0 });
                setMistakes([]); 
                setActiveSessions({});
                setCompletedActivities({});
                setGuideTracking({});
                setSkillOrder(DEFAULT_SKILL_ORDER);
                setAllowedKeyboards(KEYBOARD_OPTIONS.map(k => k.id));
                setKeyboardOrder(KEYBOARD_OPTIONS.map(k => k.id));
                
                localStorage.clear();

                setCurrentScreen('home');
                setCurrentIndex(0);
                setQueue([]);
                setActiveSkill(null);
                setActiveCategory(null);
                setShowSettings(false);
                setShowResetConfirmModal(false);
                
                showGlobalToast("¡Tu progreso ha sido borrado con éxito! 😊");
              }} 
              className="w-full py-4 bg-red-500 text-white hover:bg-red-600 active:scale-95 text-base font-extrabold rounded-2xl shadow-lg border-b-4 border-red-700 transition"
            >
              Sí, Borrar todo el progreso
            </button>
            <button 
              onClick={() => setShowResetConfirmModal(false)} 
              className="w-full py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 active:scale-95 text-sm font-bold rounded-xl transition"
            >
              Cancelar
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="h-screen max-h-screen bg-slate-100 font-sans text-gray-800 flex justify-center overflow-hidden">
      <div className="w-full max-w-md bg-white shadow-2xl h-full flex flex-col overflow-hidden relative">
        {showParentalGate && renderParentalGateModal()}
        {showSettings && renderSettingsModal()}
        {showResetConfirmModal && renderResetConfirmModal()}
        
        {toastMsg && (
          <div className="fixed top-8 left-1/2 transform -translate-x-1/2 z-[9999] bg-indigo-900 text-white px-6 py-4 rounded-2xl font-bold shadow-2xl animate-slide-down-toast text-center border-2 border-indigo-700 max-w-[90%] w-max">
            {toastMsg}
          </div>
        )}

        <header className="bg-gradient-to-r from-purple-500 to-pink-500 p-4 shrink-0 text-white flex justify-between items-center shadow-md z-10 w-full relative">
          <h1 className="text-xl font-bold flex items-center gap-2"><Star className="text-yellow-300 fill-current size-5" /> Lisa's Quest</h1>
          <div className="flex gap-2">
            <button onClick={() => setCurrentScreen('stats')} className="flex items-center justify-center w-10 h-10 bg-white/20 rounded-full hover:bg-white/30 transition-colors" title="Ver Estadísticas"><BarChart2 size={20} strokeWidth={2.5} /></button>
            <button onClick={openParentalGate} className="flex items-center justify-center w-10 h-10 bg-white/20 rounded-full hover:bg-white/30 transition-colors" title="Ajustes (Padres)"><Settings size={20} strokeWidth={2.5} /></button>
          </div>
        </header>

        {currentScreen === 'home' && (
          <div className="flex-1 p-6 flex flex-col items-center overflow-y-auto">
            
            {validMistakes.length > 0 && (
              <div className="w-full bg-white border-2 border-red-200 border-b-4 rounded-2xl p-5 mb-6 relative overflow-visible shadow-sm shrink-0 flex flex-col min-h-[160px]">
                <div className="absolute -right-2 -bottom-2 text-red-50 pointer-events-none transform rotate-12 z-0"><AlertCircle size={80}/></div>
                <div className="relative z-10 flex flex-col mb-4">
                  <h3 className="text-lg font-bold text-red-800 flex items-center gap-2">
                    <span className="text-xl">🚨</span> Errores por repasar ({validMistakes.length})
                  </h3>
                  <p className="text-sm text-red-600 font-medium mt-1">
                    Practica lo que fallaste para dominarlo.
                  </p>
                </div>
                <button 
                  onClick={startMistakesReview} 
                  className="w-full py-3 bg-red-500 hover:bg-red-600 text-white rounded-xl font-bold active:scale-95 border-b-4 border-red-700 active:border-b-0 active:translate-y-1 flex items-center justify-center gap-2 transition"
                >
                  {activeSessions['mistakes'] ? (
                    <><Play size={18} className="fill-current"/> Continuar Repaso ({activeSessions['mistakes'].currentIndex + 1}/{activeSessions['mistakes'].queue.length})</>
                  ) : (
                    <>Repasar Ahora</>
                  )}
                </button>
              </div>
            )}

            <button onClick={() => setCurrentScreen('ai_hub')} className="w-full mb-6 p-5 rounded-2xl bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-bold text-xl shadow-lg border-b-4 border-purple-800 active:translate-y-1 active:border-b-0 flex items-center justify-between" title="Juegos especiales con Inteligencia Artificial">
              <div className="flex items-center gap-3"><Sparkles className="text-yellow-300" size={28}/> <span>Zona Mágica IA</span></div>
              <span className="text-2xl">🪄</span>
            </button>

            <h2 className="text-2xl font-bold mb-4 text-indigo-800 text-center w-full">Elige un Tema 📚</h2>
            <div className="grid grid-cols-1 gap-3 w-full pb-8">
              
              {learnedExIds.length > 0 && (
                <button onClick={() => startCategory('Learned')} className="p-4 mb-2 rounded-xl border-2 border-b-4 border-fuchsia-300 bg-gradient-to-r from-fuchsia-50 to-pink-50 font-bold text-lg active:translate-y-1 active:border-b-0 flex items-center justify-between shadow-sm">
                   <div className="flex flex-col items-start">
                     <span className="text-fuchsia-900">🧠 Repaso de Aprendidos</span>
                     <span className="text-xs text-fuchsia-700 bg-white/50 px-2 py-1 rounded-full mt-1 border border-fuchsia-200">{learnedExIds.length} ejercicios dominados</span>
                   </div>
                   <span className="text-3xl">🎓</span>
                </button>
              )}

              <button onClick={() => { startCategory('ByPhrase'); setPhraseSearch(''); }} className="p-4 mb-2 rounded-xl border-2 border-b-4 border-cyan-300 bg-gradient-to-r from-cyan-50 to-blue-50 font-bold text-lg active:translate-y-1 active:border-b-0 flex items-center justify-between shadow-sm">
                 <div className="flex flex-col items-start">
                   <span className="text-cyan-900">🔤 Modo: Palabra por Palabra</span>
                   <span className="text-xs text-cyan-700 bg-white/50 px-2 py-1 rounded-full mt-1 border border-cyan-200">Domina una frase con todos sus ejercicios</span>
                 </div>
                 <span className="text-3xl">🔍</span>
              </button>

              {(showCompleted || !isCatCompleted('All')) && (
                <button onClick={() => startCategory('All')} className={`p-4 rounded-xl border-2 border-b-4 font-bold text-lg active:translate-y-1 active:border-b-0 flex items-center justify-between ${isCatCompleted('All') ? 'bg-green-500 border-green-700 text-white shadow-lg' : 'bg-gradient-to-r from-yellow-400 to-orange-400 border-orange-500 text-white shadow-lg'}`} title="Practicar todo mezclado">
                  <div className="flex flex-col items-start">
                    <div className="flex items-center gap-2">
                      <span>Toda la carpeta (Mix)</span>
                      {isCatCompleted('All') && <CheckCircle2 className="text-white" size={20} />}
                    </div>
                    {Object.keys(activeSessions).some(k => k.startsWith('All_')) && <span className="text-xs bg-white/30 px-2 py-1 rounded-full mt-1">⏳ Tienes pausas aquí</span>}
                  </div>
                  <span className="text-2xl">🌪️</span>
                </button>
              )}

              {customThemes.map((theme) => {
                const catComplete = isCatCompleted(theme.id);
                if (!showCompleted && catComplete) return null;
                const hasPausedSession = Object.keys(activeSessions).some(k => k.startsWith(`${theme.id}_`));
                return (
                  <div key={theme.id} className="relative flex gap-2">
                    <button onClick={() => startCategory(theme.id)} className={`flex-1 p-4 rounded-xl border-2 border-b-4 font-bold text-lg hover:bg-teal-100 transition active:translate-y-1 active:border-b-0 flex items-center justify-between ${catComplete ? 'border-green-300 bg-green-50 text-green-800' : 'border-teal-300 bg-teal-50 text-teal-900'}`} title={`Practicar tema personalizado: ${theme.name}`}>
                      <div className="flex flex-col items-start">
                        <div className="flex items-center gap-2">
                          <span className="text-left leading-tight">{theme.name}</span> 
                          {catComplete && <CheckCircle2 className="text-green-500 flex-shrink-0" size={20} />}
                        </div>
                        <span className="text-xs px-2 py-1 rounded-full mt-1 bg-white/50">{theme.exerciseIds.length} ejercicios</span>
                      </div>
                      <span className="text-2xl flex-shrink-0 ml-2">🎯</span>
                    </button>
                    {deletingThemeId === theme.id ? (
                      <div className="flex gap-2 bg-red-50 border-2 border-red-300 rounded-xl p-2 items-center flex-shrink-0">
                        <span className="text-xs font-extrabold text-red-700 px-1">¿Borrar?</span>
                        <button 
                          onClick={() => {
                            setCustomThemes(customThemes.filter(t => t.id !== theme.id));
                            setDeletingThemeId(null);
                          }} 
                          className="px-3 py-2 bg-red-500 hover:bg-red-600 text-white font-bold text-xs rounded-lg shadow-md active:scale-95 transition"
                          title="Confirmar eliminación"
                        >
                          Sí
                        </button>
                        <button 
                          onClick={() => setDeletingThemeId(null)} 
                          className="px-3 py-2 bg-gray-200 hover:bg-gray-300 text-gray-700 font-bold text-xs rounded-lg shadow-sm active:scale-95 transition"
                          title="Cancelar"
                        >
                          No
                        </button>
                      </div>
                    ) : (
                      <button onClick={() => setDeletingThemeId(theme.id)} className="px-4 bg-red-100 text-red-500 rounded-xl border-2 border-b-4 border-red-200 active:translate-y-1 active:border-b-0 hover:bg-red-200 transition flex items-center justify-center" title="Eliminar tema">
                        <XCircle size={24}/>
                      </button>
                    )}
                  </div>
                )
              })}

              {categories.filter(cat => showCompleted || !isCatCompleted(cat)).map((cat, i) => {
                let catEmoji = "📘";
                if(cat.includes('Introductions')) catEmoji = "👋";
                if(cat.includes('Countries')) catEmoji = "🌎";
                if(cat.includes('Verb To Be')) catEmoji = "👤";
                if(cat.includes('Adjectives') || cat.includes('Physical')) catEmoji = "👁️";
                if(cat.includes('Hobbies')) catEmoji = "🎮";
                if(cat.includes('Abilities')) catEmoji = "🦸";
                if(cat.includes('Present Continuous')) catEmoji = "🏃";
                if(cat.includes('School')) catEmoji = "🎒";
                if(cat.includes('House')) catEmoji = "🏠";
                if(cat.includes('Weather') || cat.includes('Time')) catEmoji = "🌤️";
                if(cat.includes('Dialogues')) catEmoji = "💬";
                if(cat.includes('Affirmative')) catEmoji = "✅";
                if(cat.includes('Negative')) catEmoji = "❌";
                if(cat.includes('Questions')) catEmoji = "❓";
                if(cat.includes('Answers')) catEmoji = "💬";
                if(cat === 'Monster Inc - Book') catEmoji = "👹";

                const pool = EXERCISES_DB.filter(ex => ex.category === cat);
                const hasVisited = pool.some(ex => completedExIds.includes(ex.id) || learnedExIds.includes(ex.baseId || ex.id));
                const hasPausedSession = Object.keys(activeSessions).some(k => k.startsWith(`${cat}_`));
                const catComplete = isCatCompleted(cat);

                return (
                  <button key={i} onClick={() => startCategory(cat)} className={`p-4 rounded-xl border-2 border-b-4 font-bold text-lg hover:bg-indigo-100 transition active:translate-y-1 active:border-b-0 flex items-center justify-between ${catComplete ? 'border-green-300 bg-green-50 text-green-800' : 'border-indigo-200 bg-indigo-50 text-indigo-800'}`} title={`Practicar el tema: ${cat}`}>
                    <div className="flex flex-col items-start">
                      <div className="flex items-center gap-2">
                        <span className="text-left leading-tight">{cat}</span> 
                        {catComplete && <CheckCircle2 className="text-green-500 flex-shrink-0" size={20} />}
                      </div>
                      {hasPausedSession && <span className={`text-xs px-2 py-1 rounded-full mt-1 ${hasVisited ? 'bg-green-200 text-green-900' : 'bg-indigo-200 text-indigo-900'}`}>⏳ En pausa</span>}
                    </div>
                    <span className="text-2xl flex-shrink-0 ml-2">{catEmoji}</span>
                  </button>
                )
              })}

              {categories.filter(cat => showCompleted || !isCatCompleted(cat)).length === 0 && (
                <div className="bg-green-100 border-2 border-green-300 p-4 rounded-2xl text-center shadow-sm mt-4">
                  <p className="text-green-800 font-bold text-lg">¡Completaste todo! 🎉</p>
                  <p className="text-green-600 text-sm mt-1 font-medium">Ve a Ajustes ⚙️ y activa "Mostrar Completados" para repasar.</p>
                </div>
              )}
            </div>
          </div>
        )}

        {currentScreen === 'skill_select' && (
          <div className="flex-1 p-6 flex flex-col items-center overflow-y-auto bg-slate-50">
            <button onClick={() => setCurrentScreen('home')} className="self-start text-indigo-500 font-bold mb-4 flex items-center gap-2 hover:text-indigo-700" title="Volver atrás"><ArrowLeft size={20} /> Volver a Temas</button>
            <h2 className="text-2xl font-bold mb-2 text-indigo-800 text-center">¿Qué quieres hacer?</h2>
            
            {activeCategory === 'Learned' ? (
               <p className="text-gray-500 mb-6 font-medium text-center">Tema: <span className="text-fuchsia-600 bg-fuchsia-100 px-3 py-1 rounded-full">🧠 Repaso de Aprendidos</span></p>
            ) : activeCategory === 'ByPhrase' ? (
               <p className="text-gray-500 mb-6 font-medium text-center">Modo: <span className="text-cyan-600 bg-cyan-100 px-3 py-1 rounded-full">🔤 Palabra por Palabra</span></p>
            ) : (
               <p className="text-gray-500 mb-6 font-medium text-center">Tema: <span className="text-purple-600">{activeCategory}</span></p>
            )}

            <div className="grid grid-cols-1 gap-4 w-full">
              
              {activeCategory === 'ByPhrase' ? (
                <div className="w-full flex flex-col gap-3">
                  <div className="relative">
                     <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-cyan-500" size={20} />
                     <input 
                       type="text" 
                       placeholder="Buscar palabra o frase..." 
                       value={phraseSearch} 
                       onChange={e => setPhraseSearch(e.target.value)} 
                       className="w-full p-4 pl-12 rounded-xl border-2 border-cyan-200 mb-2 focus:outline-none focus:border-cyan-500 text-lg font-medium shadow-sm"
                     />
                  </div>
                  {ALL_DATA.filter((item: any) => 
                    item.eng.toLowerCase().includes(phraseSearch.toLowerCase()) || 
                    item.spa.toLowerCase().includes(phraseSearch.toLowerCase())
                  ).slice(0, 300).map((item: any, idx: number) => {
                    let pool = EXERCISES_DB.filter(ex => ex.eng === item.eng);
                    const { completed: completedCount, total } = getCompletionStats(pool);
                    if (total === 0) return null;
                    const isAllCompleted = completedCount === total;
                    
                    return (
                      <button key={idx} onClick={() => startPhrasePractice(item.eng)} className={`p-4 rounded-xl border-2 flex flex-col gap-2 transition active:scale-95 text-left ${isAllCompleted ? 'bg-white border-green-200 shadow-sm' : 'bg-gray-50 border-gray-200 hover:border-cyan-300'}`}>
                        <div className="flex items-center gap-3 w-full">
                          <div className="text-4xl flex-shrink-0">{item.emoji}</div>
                          <div className="flex-1 min-w-0 text-left">
                             <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-gray-200 text-gray-600 truncate max-w-[50%] mb-1 inline-block">{item.cat}</span>
                             <p className="font-bold text-base text-gray-800 leading-tight">{item.eng}</p>
                             <p className="text-sm text-gray-500 font-medium">{item.spa}</p>
                          </div>
                          <div className="flex-shrink-0 text-right flex flex-col items-end gap-1">
                            <span className={`font-black text-lg ${isAllCompleted ? 'text-green-500' : 'text-cyan-600'}`}>{completedCount}/{total}</span>
                            {isAllCompleted && <span className="text-[10px] bg-green-100 text-green-700 px-2 py-1 rounded-md font-bold flex items-center gap-1"><CheckCircle2 size={12}/> Listo</span>}
                          </div>
                        </div>
                      </button>
                    )
                  })}
                  {ALL_DATA.filter((item: any) => item.eng.toLowerCase().includes(phraseSearch.toLowerCase()) || item.spa.toLowerCase().includes(phraseSearch.toLowerCase())).length === 0 && (
                    <p className="text-center text-gray-500 mt-4">No se encontraron resultados.</p>
                  )}
                </div>
              ) : (
                <>
                  <button onClick={() => startSkillPractice('Mix')} className="w-full p-4 mb-2 rounded-2xl bg-gradient-to-r from-yellow-400 to-orange-500 text-white font-bold text-xl shadow-lg border-b-4 border-orange-700 active:border-b-0 active:translate-y-1 flex items-center justify-between">
                     <div className="flex items-center gap-3">
                        <span className="text-3xl">🌪️</span>
                        <div className="text-left">
                           <div>Práctica General (Mix)</div>
                           <div className="text-xs text-orange-100 font-medium">Todos los ejercicios mezclados</div>
                        </div>
                     </div>
                     <PlayCircle size={28} />
                  </button>

                  {skillOrder.map(skill => {
                     const currentPool = getCategoryPool(activeCategory!);
                     const hasSkill = currentPool.some(ex => ex.skill === skill);
                     if (!hasSkill) return null;

                     const complete = isSkillCompleted(activeCategory!, skill);
                     if (!showCompleted && complete && activeCategory !== 'Learned') return null;
                     return (
                       <SkillBtn 
                         key={skill} 
                         onClick={() => startSkillPractice(skill)} 
                         icon={SKILL_ICONS[skill]} 
                         title={SKILL_LABELS[skill]} 
                         color={SKILL_COLORS[skill]} 
                         isCompleted={complete} 
                         inProgressData={activeSessions[`${activeCategory}_${skill}`]} 
                         tooltip={SKILL_TIPS[skill]} 
                       />
                     );
                  })}

                  {!showCompleted && activeCategory && isCatCompleted(activeCategory) && activeCategory !== 'Learned' && (
                    <div className="bg-green-100 border-2 border-green-300 p-4 rounded-2xl text-center mt-4">
                      <p className="text-green-800 font-bold text-lg">¡Tema completado! 🏆</p>
                      <p className="text-green-600 text-sm mt-1">Vuelve a Temas o activa "Mostrar Completados".</p>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        )}

        {currentScreen === 'stats' && <StatsScreen stats={stats} onBack={() => setCurrentScreen('home')} completedExIds={completedExIds} exercises={EXERCISES_DB} categories={categories} skills={DEFAULT_SKILL_ORDER} customThemes={customThemes} setCustomThemes={setCustomThemes} learnedExIds={learnedExIds} setLearnedExIds={setLearnedExIds} allowedKeyboards={allowedKeyboards} enableMultiModalProgression={enableMultiModalProgression} />}
        {currentScreen === 'ai_hub' && <AIHubScreen onSelect={(screen: string) => setCurrentScreen(screen)} onBack={() => setCurrentScreen('home')} />}
        {currentScreen === 'ai_story' && <AIStoryScreen onBack={() => setCurrentScreen('ai_hub')} selectedVoiceURI={selectedVoiceURI} />}
        {currentScreen === 'ai_chat' && <AIChatScreen onBack={() => setCurrentScreen('ai_hub')} selectedVoiceURI={selectedVoiceURI} />}

        {currentScreen === 'exercise' && (
          queue.length > 0 && queue[currentIndex] ? (
            <ExerciseEngine 
              key={currentIndex} exercise={queue[currentIndex]} onProceed={(correct: boolean, isKnown: boolean, action?: string) => {
                if (action === 'push_to_end') {
                    setQueue(prev => [...prev, prev[currentIndex]]);
                    setCurrentIndex(i => i + 1);
                    return;
                }
                if (isKnown && !learnedExIds.includes(queue[currentIndex].baseId || queue[currentIndex].id)) {
                    setLearnedExIds(prev => [...prev, queue[currentIndex].baseId || queue[currentIndex].id]);
                }
                if(correct && !completedExIds.includes(queue[currentIndex].id)) {
                    setCompletedExIds(prev => [...prev, queue[currentIndex].id]);
                    
                    if (enableProgressiveGuidance && queue[currentIndex].isGuide && queue[currentIndex].trackKey) {
                        setGuideTracking(prev => ({
                            ...prev,
                            [queue[currentIndex].trackKey]: (prev[queue[currentIndex].trackKey] || 0) + 1
                        }));
                    }
                }
                if(correct || isKnown) setScore(s => s+1);
                if(currentIndex + 1 < queue.length) {
                    setCurrentIndex(i => i+1); 
                } else {
                   setCurrentScreen('summary');
                   
                   let sessionKey = isMistakeMode ? 'mistakes' : `${activeCategory}_${activeSkill}`;
                   if (activeCategory === 'ByPhrase') sessionKey = `ByPhrase_${queue[0]?.eng || 'unknown'}`;
                   
                   setActiveSessions(prev => {
                     const updated = { ...prev };
                     delete updated[sessionKey];
                     localStorage.setItem('lisa_active_sessions', JSON.stringify(updated));
                     return updated;
                   });
                }
              }} 
              progress={(currentIndex) / queue.length * 100} total={queue.length} current={currentIndex + 1}
              skill={activeSkill} onExit={() => setCurrentScreen(isMistakeMode ? 'home' : 'skill_select')} isPermissive={isPermissive} 
              speakPermissive={speakPermissive} speakPreview={speakPreview} showSpeakingWord={showSpeakingWord}
              selectedVoiceURI={selectedVoiceURI} enableVoiceFeedback={enableVoiceFeedback}
              enableTimer={enableTimer} timerSeconds={timerSeconds} 
              defaultKeyboardMode={currentKeyboardMode} onChangeKeyboardMode={setCurrentKeyboardMode}
              allowedKeyboards={allowedKeyboards} flashcardMode={flashcardMode} strictTyping={strictTyping}
              enableMultiModalProgression={enableMultiModalProgression} enableProgressiveGuidance={enableProgressiveGuidance}
              randomizeKeyboardsMode={randomizeKeyboardsMode}
              enableMicCountdown={enableMicCountdown}
              onSaveMistake={(ex: any) => {if(!mistakes.find(m=>m.id===ex.id)) setMistakes([...mistakes, ex]);}} 
              onRemoveMistake={(id: string) => setMistakes(mistakes.filter(m=>m.id!==id))} isMistakeMode={isMistakeMode} onUpdateStats={handleUpdateStats}
              strictMistakeLogging={strictMistakeLogging}
              onWordClickGlobal={handleWordClickGlobal}
              enableMarkAsKnown={enableMarkAsKnown}
            />
          ) : (
            <div className="flex-1 flex items-center justify-center bg-slate-50 flex-col gap-4">
               <span className="text-4xl">🔄</span>
               <p className="text-indigo-600 font-bold text-center px-6">Cargando...</p>
               <button onClick={() => setCurrentScreen('home')} className="mt-4 px-6 py-3 bg-indigo-500 text-white rounded-xl font-bold shadow active:scale-95 flex items-center gap-2">
                 <ArrowLeft size={20}/> Volver al Inicio
               </button>
            </div>
          )
        )}

        {currentScreen === 'summary' && (
          <div className="flex-1 p-6 flex flex-col items-center justify-center text-center bg-indigo-50">
            <div className="text-8xl mb-6">🏆</div>
            <h2 className="text-4xl font-bold text-purple-600 mb-2">¡Misión Cumplida!</h2>
            <p className="text-2xl text-gray-600 mb-10 bg-white p-4 rounded-2xl shadow">Puntaje: <span className="font-bold text-green-500">{score}</span> / {queue.length}</p>
            <div className="w-full flex flex-col gap-4">
               <button onClick={() => setCurrentScreen(isMistakeMode ? 'home' : 'skill_select')} className="px-8 py-4 bg-purple-500 text-white rounded-2xl font-bold text-2xl shadow-lg hover:bg-purple-600 flex items-center gap-2 w-full justify-center active:scale-95"><ArrowLeft /> Volver a Temas</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
