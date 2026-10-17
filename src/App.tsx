import { AlertCircle, ArrowDown, ArrowLeft, ArrowUp, BarChart2, CheckCircle2, ChevronDown, ChevronUp, Flag, Keyboard, Lock, Play, PlayCircle, RefreshCw, Search, Settings, Sparkles, Star, Target, XCircle, Mic, PenTool, Headphones, BookOpen, Sun, Moon, Calendar, FolderOpen, Layers, Square, Grid, Map as MapIcon, Tag, AlignJustify, Download, WifiOff, Sliders, Smartphone, Tablet, Monitor, Maximize, Edit2, Plus, Trash, Info, ZoomIn, ZoomOut, Home } from 'lucide-react';
import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import localforage from 'localforage';
import confetti from 'canvas-confetti';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { AIChatScreen, AIHubScreen, AIStoryScreen } from './components/AIScreens';
import { ExerciseEngine } from './components/ExerciseEngine';
import { StatsScreen } from './components/StatsScreen';
import DatabaseEditor from './components/DatabaseEditor';

import { DEFAULT_SKILL_ORDER, SKILL_COLORS, SKILL_ICONS, SKILL_LABELS, SKILL_TIPS } from './constants';
import { ALL_DATA, EXERCISES_DB, KEYBOARD_OPTIONS } from './data';
import { detectLanguage, getEnglishVoice, playTTS, translateWord } from './utils';

const getCategoryBgColor = (cat: string) => {
  if (!cat) return 'bg-slate-50 dark:bg-slate-950';
  const hash = cat.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  const colors = [
    'bg-indigo-50 dark:bg-slate-950 dark:bg-indigo-950',
    'bg-emerald-50 dark:bg-emerald-950',
    'bg-rose-50 dark:bg-rose-950',
    'bg-amber-50 dark:bg-amber-950',
    'bg-purple-50 dark:bg-purple-950',
    'bg-cyan-50 dark:bg-cyan-950',
    'bg-teal-50 dark:bg-teal-950',
    'bg-pink-50 dark:bg-pink-950',
    'bg-sky-50 dark:bg-sky-950',
    'bg-orange-50 dark:bg-orange-950',
    'bg-fuchsia-50 dark:bg-fuchsia-950'
  ];
  return colors[hash % colors.length];
};


const getSkillButtonColor = (skill: string) => {
  const colorMap: Record<string, string> = {
    'Reading': 'bg-emerald-500 hover:bg-emerald-600 border-emerald-700 text-white',
    'Listening': 'bg-blue-500 hover:bg-blue-600 border-blue-700 text-white',
    'Speaking': 'bg-rose-500 hover:bg-rose-600 border-rose-700 text-white',
    'Translate': 'bg-sky-500 hover:bg-sky-600 border-sky-700 text-white',
    'Writing': 'bg-amber-500 hover:bg-amber-600 border-amber-700 text-white',
    'Flashcards': 'bg-purple-500 hover:bg-purple-600 border-purple-700 text-white',
    'Conversation': 'bg-teal-500 hover:bg-teal-600 border-teal-700 text-white',
    'Match': 'bg-indigo-500 hover:bg-indigo-600 border-indigo-700 text-white',
    'Similar': 'bg-orange-500 hover:bg-orange-600 border-orange-700 text-white',
    'Dictation': 'bg-violet-500 hover:bg-violet-600 border-violet-700 text-white',
    'Visual': 'bg-cyan-500 hover:bg-cyan-600 border-cyan-700 text-white',
    'Grammar': 'bg-lime-500 hover:bg-lime-600 border-lime-700 text-white',
    'Vocabulary': 'bg-fuchsia-500 hover:bg-fuchsia-600 border-fuchsia-700 text-white'
  };
  return colorMap[skill] || 'bg-slate-500 hover:bg-slate-600 border-slate-700 text-white';
};

const getMixCardStyle = (type: 'year' | 'source' | 'theme' | 'skill', category: string = '') => {
  if (type === 'year') {
    return 'bg-gradient-to-r from-amber-400 to-orange-400 border-orange-500 text-white shadow-lg';
  }
  if (type === 'source') {
    return 'bg-gradient-to-r from-emerald-400 to-teal-400 border-teal-500 text-white shadow-lg';
  }
  if (type === 'theme') {
    return 'bg-gradient-to-r from-indigo-400 to-blue-400 border-blue-500 text-white shadow-lg';
  }
  if (type === 'skill') {
    const colorMap: Record<string, string> = {
      'Reading': 'bg-gradient-to-r from-emerald-400 to-emerald-500 border-emerald-600 text-white shadow-lg',
      'Listening': 'bg-gradient-to-r from-blue-400 to-blue-500 border-blue-600 text-white shadow-lg',
      'Speaking': 'bg-gradient-to-r from-rose-400 to-rose-500 border-rose-600 text-white shadow-lg',
      'Translate': 'bg-gradient-to-r from-sky-400 to-sky-500 border-sky-600 text-white shadow-lg',
      'Writing': 'bg-gradient-to-r from-amber-400 to-amber-500 border-amber-600 text-white shadow-lg',
      'Flashcards': 'bg-gradient-to-r from-purple-400 to-purple-500 border-purple-600 text-white shadow-lg',
      'Conversation': 'bg-gradient-to-r from-teal-400 to-teal-500 border-teal-600 text-white shadow-lg',
      'Match': 'bg-gradient-to-r from-indigo-400 to-indigo-500 border-indigo-600 text-white shadow-lg',
      'Similar': 'bg-gradient-to-r from-orange-400 to-orange-500 border-orange-600 text-white shadow-lg',
      'Dictation': 'bg-gradient-to-r from-violet-400 to-violet-500 border-violet-600 text-white shadow-lg',
      'Visual': 'bg-gradient-to-r from-cyan-400 to-cyan-500 border-cyan-600 text-white shadow-lg',
      'Grammar': 'bg-gradient-to-r from-lime-400 to-lime-500 border-lime-600 text-white shadow-lg',
      'Vocabulary': 'bg-gradient-to-r from-fuchsia-400 to-fuchsia-500 border-fuchsia-600 text-white shadow-lg'
    };
    return colorMap[category] || 'bg-gradient-to-r from-slate-400 to-slate-500 border-slate-600 text-white shadow-lg';
  }
  return '';
};

const getCardStyle = (type: 'year' | 'source' | 'theme' | 'skill', category: string = '') => {
  if (type === 'year') {
    return 'bg-gradient-to-br from-amber-50 to-orange-100 border-amber-200 text-amber-950 dark:from-amber-900/40 dark:to-orange-900/40 dark:border-amber-800 dark:text-amber-100';
  }
  if (type === 'source') {
    return 'bg-gradient-to-br from-emerald-50 to-teal-100 border-emerald-200 text-emerald-950 dark:from-emerald-900/40 dark:to-teal-900/40 dark:border-emerald-800 dark:text-emerald-100';
  }
  if (type === 'theme') {
    return 'bg-gradient-to-br from-indigo-50 to-blue-100 border-indigo-200 dark:border-slate-800 text-indigo-950 dark:from-indigo-900/40 dark:to-blue-900/40 dark:border-indigo-800 dark:text-indigo-100';
  }
  if (type === 'skill') {
    const styleMap: Record<string, string> = {
      'Reading': 'bg-gradient-to-br from-emerald-50 to-green-100 border-emerald-200 text-emerald-950 dark:from-emerald-900/40 dark:to-green-900/40 dark:border-emerald-800 dark:text-emerald-100',
      'Listening': 'bg-gradient-to-br from-blue-50 to-indigo-100 border-blue-200 text-blue-950 dark:from-blue-900/40 dark:to-indigo-900/40 dark:border-blue-800 dark:text-blue-100',
      'Speaking': 'bg-gradient-to-br from-rose-50 to-pink-100 border-rose-200 text-rose-950 dark:from-rose-900/40 dark:to-pink-900/40 dark:border-rose-800 dark:text-rose-100',
      'Translate': 'bg-gradient-to-br from-sky-50 to-cyan-100 border-sky-200 text-sky-950 dark:from-sky-900/40 dark:to-cyan-900/40 dark:border-sky-800 dark:text-sky-100',
      'Writing': 'bg-gradient-to-br from-amber-50 to-yellow-100 border-amber-200 text-amber-950 dark:from-amber-900/40 dark:to-yellow-900/40 dark:border-amber-800 dark:text-amber-100',
      'Flashcards': 'bg-gradient-to-br from-purple-50 to-fuchsia-100 border-purple-200 dark:border-purple-800 text-purple-950 dark:from-purple-900/40 dark:to-fuchsia-900/40 dark:border-purple-800 dark:text-purple-100',
      'Conversation': 'bg-gradient-to-br from-teal-50 to-emerald-100 border-teal-200 dark:border-teal-800 text-teal-950 dark:from-teal-900/40 dark:to-emerald-900/40 dark:border-teal-800 dark:text-teal-100',
      'Match': 'bg-gradient-to-br from-indigo-50 to-violet-100 border-indigo-200 text-indigo-950 dark:from-indigo-900/40 dark:to-violet-900/40 dark:border-indigo-800 dark:text-indigo-100',
      'Similar': 'bg-gradient-to-br from-orange-50 to-amber-100 border-orange-200 dark:border-orange-800 text-orange-950 dark:from-orange-900/40 dark:to-amber-900/40 dark:border-orange-800 dark:text-orange-100',
      'Dictation': 'bg-gradient-to-br from-violet-50 to-purple-100 border-violet-200 text-violet-950 dark:from-violet-900/40 dark:to-purple-900/40 dark:border-violet-800 dark:text-violet-100',
      'Visual': 'bg-gradient-to-br from-cyan-50 to-sky-100 border-cyan-200 text-cyan-950 dark:from-cyan-900/40 dark:to-sky-900/40 dark:border-cyan-800 dark:text-cyan-100',
      'Grammar': 'bg-gradient-to-br from-lime-50 to-green-100 border-lime-200 text-lime-950 dark:from-lime-900/40 dark:to-green-900/40 dark:border-lime-800 dark:text-lime-100',
      'Vocabulary': 'bg-gradient-to-br from-fuchsia-50 to-pink-100 border-fuchsia-200 text-fuchsia-950 dark:text-fuchsia-200 dark:from-fuchsia-900/40 dark:to-pink-900/40 dark:border-fuchsia-800 dark:text-fuchsia-100'
    };
    return styleMap[category] || 'bg-slate-50 border-slate-200 text-slate-800 dark:bg-slate-950 dark:border-slate-800 dark:text-slate-200';
  }
  return '';
};

const isKeyboardLayoutType = (type: string) => {
  return ['build_sentence', 'listen_and_write', 'dictation'].includes(type);
};

export default function App() {
  const [batterySaverMode, setBatterySaverMode] = useState(false);
  const [isMainMenuOpen, setIsMainMenuOpen] = useState(false);

  const [deviceView, setDeviceView] = useState<'fluid' | 'mobile' | 'tablet' | 'pc'>('fluid');
  const [zoomLevel, setZoomLevel] = useState<number>(() => parseFloat(localStorage.getItem('lisa_zoom_level') || '1.0'));

  useEffect(() => {
    localStorage.setItem('lisa_zoom_level', zoomLevel.toString());
  }, [zoomLevel]);
  const [currentScreen, setCurrentScreen] = useState('home'); 
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [activeSkill, setActiveSkill] = useState<string | null>(null);
  const [statsCategoryFilter, setStatsCategoryFilter] = useState<string | string[] | null>(null);
  const [statsSkillFilter, setStatsSkillFilter] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<'card' | 'list' | 'gallery' | 'path'>('path');
  const [themeSearchQuery, setThemeSearchQuery] = useState('');
  const [themeTagsFilter, setThemeTagsFilter] = useState<string[]>([]);
  const [themeOrder, setThemeOrder] = useState<Record<string, number>>(() => JSON.parse(localStorage.getItem('lisa_themeOrder') || '{}'));
  const [isOffline, setIsOffline] = useState(!navigator.onLine);
  const [showWelcome, setShowWelcome] = useState(() => !localStorage.getItem('lisa_welcome_seen'));
  const [showTutorial, setShowTutorial] = useState(() => !localStorage.getItem('lisa_tutorial_seen'));
  const [searchHistory, setSearchHistory] = useState<string[]>(() => JSON.parse(localStorage.getItem('lisa_search_history') || '[]'));
  const [showSearchSuggestions, setShowSearchSuggestions] = useState(false);
  const [progressiveDifficulty, setProgressiveDifficulty] = useState(() => localStorage.getItem('lisa_prog_diff') !== 'false');
  const [lastSyncStatus, setLastSyncStatus] = useState<string | null>(null);

  useEffect(() => {
    localStorage.setItem('lisa_prog_diff', progressiveDifficulty.toString());
  }, [progressiveDifficulty]);


  
  useEffect(() => {
    localStorage.setItem('lisa_themeOrder', JSON.stringify(themeOrder));
  }, [themeOrder]);

  useEffect(() => {
    const handleOnline = () => setIsOffline(false);
    const handleOffline = () => setIsOffline(true);
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const [selectedYear, setSelectedYear] = useState<string | null>(null);
  const [selectedSource, setSelectedSource] = useState<string | null>(null);
  const [selectedUnit, setSelectedUnit] = useState<string | null>(null);
  const [queue, setQueue] = useState<any[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [isMistakeMode, setIsMistakeMode] = useState(false);
  const [custHeaderVis, setCustHeaderVis] = useState(true);
  const [custLastY, setCustLastY] = useState(0);
  const [custUp, setCustUp] = useState(0);

  const [settingsHeaderVis, setSettingsHeaderVis] = useState(true);
  const [settingsLastY, setSettingsLastY] = useState(0);
  const [settingsUp, setSettingsUp] = useState(0);

  const handleCustomizeScroll = (e: any) => {
    const currentScrollY = e.currentTarget.scrollTop;
    const deltaY = currentScrollY - custLastY;
    
    if (deltaY > 0) {
      // Scrolling down: collapse immediately
      if (currentScrollY > 10) {
        setCustHeaderVis(false);
      }
    } else if (deltaY < 0) {
      // Scrolling up: ONLY show when returned back to the absolute top
      if (currentScrollY <= 10) {
        setCustHeaderVis(true);
      }
    }
    
    if (currentScrollY <= 10) {
      setCustHeaderVis(true);
    }
    
    setCustLastY(currentScrollY);

    // Infinite scroll detection: Load more items if scrolling near the bottom of the scroll view
    const scrollHeight = e.currentTarget.scrollHeight;
    const clientHeight = e.currentTarget.clientHeight;
    const totalLength = (window as any).__lastFilteredLength || 0;
    if (scrollHeight - currentScrollY - clientHeight < 350) {
      setVisibleCount(prev => {
        if (prev < totalLength) {
          return prev + 30;
        }
        return prev;
      });
    }
  };

  const handleSettingsScroll = (e: any) => {
    const currentScrollY = e.currentTarget.scrollTop;
    const maxScroll = e.currentTarget.scrollHeight - e.currentTarget.clientHeight;
    const deltaY = currentScrollY - settingsLastY;
    
    if (deltaY > 0) {
      setSettingsUp(0);
      if (deltaY > 2 && currentScrollY > 10) {
        setSettingsHeaderVis(false);
      }
    } else if (deltaY < 0) {
      const newAccumulated = settingsUp + Math.abs(deltaY);
      setSettingsUp(newAccumulated);
      if (newAccumulated > 150) {
        setSettingsHeaderVis(true);
      }
    }
    
    if (currentScrollY < 80 || (maxScroll > 0 && currentScrollY / maxScroll < 0.05)) {
      setSettingsHeaderVis(true);
    }
    
    setSettingsLastY(currentScrollY);
  };

  
  const [phraseSearch, setPhraseSearch] = useState('');
  const [showMistakesWidget, setShowMistakesWidget] = useState(false);
  const [completedExIds, setCompletedExIds] = useState<string[]>(() => JSON.parse(localStorage.getItem('lisa_completed_ex_ids') || '[]'));
  const [learnedExIds, setLearnedExIds] = useState<string[]>(() => JSON.parse(localStorage.getItem('lisa_learned_ex_ids') || '[]'));
  const [mistakes, setMistakes] = useState<any[]>(() => JSON.parse(localStorage.getItem('lisa_mistakes') || '[]'));
  const [activeSessions, setActiveSessions] = useState<Record<string, any>>(() => JSON.parse(localStorage.getItem('lisa_active_sessions') || '{}'));
  const [showSettings, setShowSettings] = useState(false);
  const [showParentalGate, setShowParentalGate] = useState(false);
  const [isParentalUnlocked, setIsParentalUnlocked] = useState(false);
  const [toastMsg, setToastMsg] = useState<string | null>(null);
  
  // Auto-dismiss toast message after 3.5 seconds
  useEffect(() => {
    if (toastMsg) {
      const timer = setTimeout(() => {
        setToastMsg(null);
      }, 3500);
      return () => clearTimeout(timer);
    }
  }, [toastMsg]);
  
  const [enableMultiModalProgression, setEnableMultiModalProgression] = useState(() => JSON.parse(localStorage.getItem('lisa_multiModal') ?? 'true'));
  const [progressionStyle, setProgressionStyle] = useState(() => localStorage.getItem('lisa_progressionStyle') || 'interleaved');
  const [splitNodesByMode, setSplitNodesByMode] = useState(() => localStorage.getItem('lisa_splitNodesByMode') === 'true');
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
  const [dataSaverMode, setDataSaverMode] = useState(() => JSON.parse(localStorage.getItem('lisa_dataSaverMode') ?? 'false'));

  const [enableTimer, setEnableTimer] = useState(() => JSON.parse(localStorage.getItem('lisa_enableTimer') ?? 'true'));
  const [timerSeconds, setTimerSeconds] = useState(() => parseInt(localStorage.getItem('lisa_timerSeconds') ?? '90'));
  const [autoAdjustTimer, setAutoAdjustTimer] = useState(() => JSON.parse(localStorage.getItem('lisa_autoAdjustTimer') ?? 'false'));
  
  const ALL_KEYBOARDS = KEYBOARD_OPTIONS.map(k => k.id);
  const [alwaysAllowFreeKeyboard, setAlwaysAllowFreeKeyboard] = useState(() => localStorage.getItem('lisa_alwaysAllowFreeKeyboard') === 'true');
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
     return (saved && (allowedKeyboards || []).includes(saved)) ? saved : defaultKeyboardMode;
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
  const [enableClickSavings, setEnableClickSavings] = useState(() => JSON.parse(localStorage.getItem('lisa_click_savings') ?? 'true'));
  const [syncAudioAdvance, setSyncAudioAdvance] = useState(() => JSON.parse(localStorage.getItem('lisa_syncAudioAdvance') ?? 'false'));
  const [voiceSpeedPrompt, setVoiceSpeedPrompt] = useState(() => parseFloat(localStorage.getItem('lisa_voice_speed_prompt') ?? '0.9'));
  const [voiceSpeedAnswer, setVoiceSpeedAnswer] = useState(() => parseFloat(localStorage.getItem('lisa_voice_speed_answer') ?? '0.9'));
  const [voiceSpeedFeedback, setVoiceSpeedFeedback] = useState(() => parseFloat(localStorage.getItem('lisa_voice_speed_feedback') ?? '1.0'));
  const [hidePositiveFeedback, setHidePositiveFeedback] = useState(() => JSON.parse(localStorage.getItem('lisa_hide_positive_feedback') ?? 'false'));

  useEffect(() => {
    localStorage.setItem('lisa_click_savings', JSON.stringify(enableClickSavings));
  }, [enableClickSavings]);

  useEffect(() => {
    localStorage.setItem('lisa_syncAudioAdvance', JSON.stringify(syncAudioAdvance));
  }, [syncAudioAdvance]);
  useEffect(() => { localStorage.setItem('lisa_voice_speed_prompt', voiceSpeedPrompt.toString()); }, [voiceSpeedPrompt]);
  useEffect(() => { localStorage.setItem('lisa_voice_speed_answer', voiceSpeedAnswer.toString()); }, [voiceSpeedAnswer]);
  useEffect(() => { localStorage.setItem('lisa_voice_speed_feedback', voiceSpeedFeedback.toString()); }, [voiceSpeedFeedback]);

  useEffect(() => {
    localStorage.setItem('lisa_hide_positive_feedback', JSON.stringify(hidePositiveFeedback));
  }, [hidePositiveFeedback]);

  const [excludedExerciseIds, setExcludedExerciseIds] = useState<string[]>(() => {
    try {
      return JSON.parse(localStorage.getItem('lisa_excluded_exercise_ids') || '[]');
    } catch {
      return [];
    }
  });
  const [exerciseSearchQuery, setExerciseSearchQuery] = useState('');
  const [customizeHeaderCollapsed, setCustomizeHeaderCollapsed] = useState(false);
  const [showFiltersModal, setShowFiltersModal] = useState(false);
  const [customizeTagsFilter, setCustomizeTagsFilter] = useState<string[]>([]);
  const [customizeSortOrder, setCustomizeSortOrder] = useState<'default' | 'eng_asc' | 'eng_desc'>('default');
  
  // Custom interface and states for multi-level sorting and collapsible filter sections
  const [customizeSortRules, setCustomizeSortRules] = useState<Array<{
    id: string;
    field: 'eng' | 'spa' | 'status' | 'skill' | 'category' | 'year' | 'source';
    direction: 'asc' | 'desc';
  }>>([
    { id: 'rule-1', field: 'eng', direction: 'asc' }
  ]);
  const [collapsedFilterSections, setCollapsedFilterSections] = useState<Record<string, boolean>>({
    origin: false,
    themes: false,
    status: false,
    skillsTags: false,
    sorting: false
  });

  const addSortRule = () => {
    const newId = 'rule-' + Date.now();
    setCustomizeSortRules(prev => [...prev, { id: newId, field: 'eng', direction: 'asc' }]);
  };

  const removeSortRule = (id: string) => {
    setCustomizeSortRules(prev => prev.filter(r => r.id !== id));
  };

  const updateSortRuleField = (id: string, field: 'eng' | 'spa' | 'status' | 'skill' | 'category' | 'year' | 'source') => {
    setCustomizeSortRules(prev => prev.map(r => r.id === id ? { ...r, field } : r));
  };

  const updateSortRuleDirection = (id: string, direction: 'asc' | 'desc') => {
    setCustomizeSortRules(prev => prev.map(r => r.id === id ? { ...r, direction } : r));
  };

  const moveSortRule = (index: number, direction: 'up' | 'down') => {
    setCustomizeSortRules(prev => {
      const next = [...prev];
      const targetIndex = direction === 'up' ? index - 1 : index + 1;
      if (targetIndex < 0 || targetIndex >= next.length) return prev;
      const temp = next[index];
      next[index] = next[targetIndex];
      next[targetIndex] = temp;
      return next;
    });
  };

  const [selectedExIds, setSelectedExIds] = useState<string[]>([]);
  const [isGrouped, setIsGrouped] = useState<boolean>(false);
  const [showThemeModal, setShowThemeModal] = useState<boolean>(false);
  const [newThemeName, setNewThemeName] = useState<string>('');
  const [newThemeEmoji, setNewThemeEmoji] = useState<string>('🎯');
  const [showAddExerciseForm, setShowAddExerciseForm] = useState<boolean>(false);
  const [editingEx, setEditingEx] = useState<any | null>(null);
  const [customizeStatusFilter, setCustomizeStatusFilter] = useState<string[]>([]);
  const [tagToModify, setTagToModify] = useState<string>('');
  const [expandedExIds, setExpandedExIds] = useState<string[]>([]);


  const [newExForm, setNewExForm] = useState({
    eng: '',
    spa: '',
    category: 'Introductions',
    skill: 'Translate',
    year: '2026',
    source: 'Manual',
    tags: '',
    emoji: '🎯'
  });

  const [customTags, setCustomTags] = useState<Record<string, string[]>>(() => {
    try {
      return JSON.parse(localStorage.getItem('lisa_custom_tags') || '{}');
    } catch {
      return {};
    }
  });

  const [dbVersion, setDbVersion] = useState(0);
  const [customExercises, setCustomExercises] = useState<any[]>(() => {
    try {
      return JSON.parse(localStorage.getItem('lisa_custom_exercises') || '[]');
    } catch {
      return [];
    }
  });

  const [editedExercises, setEditedExercises] = useState<Record<string, Partial<any>>>(() => {
    try {
      return JSON.parse(localStorage.getItem('lisa_edited_exercises') || '{}');
    } catch {
      return {};
    }
  });

  useEffect(() => {
    localStorage.setItem('lisa_custom_tags', JSON.stringify(customTags));
  }, [customTags]);

  useEffect(() => {
    localStorage.setItem('lisa_custom_exercises', JSON.stringify(customExercises));
  }, [customExercises]);

  useEffect(() => {
    localStorage.setItem('lisa_edited_exercises', JSON.stringify(editedExercises));
  }, [editedExercises]);

  // Synchronize and apply custom & edited exercises to the global EXERCISES_DB
  useEffect(() => {
    // 1. Generate replicas for all custom exercises
    customExercises.forEach(item => {
      const baseId = item.id;
      const eng = item.eng;
      const spa = item.spa;
      const category = item.category || 'Custom';
      const emoji = item.emoji || '🎯';
      const year = item.year || '2026';
      const source = item.source || 'Manual';
      
      const wordsArray = eng.split(' ');
      const isSingleWord = wordsArray.length === 1;

      const replicas = [
        {
          id: `listen_${baseId}`,
          baseId: baseId,
          category: category,
          type: 'listen_and_write',
          skill: 'Listening',
          question: 'Escucha y escribe:',
          textToSpeak: eng,
          correctAnswer: eng,
          emoji: emoji,
          spa: spa,
          eng: eng,
          words: [...wordsArray].sort(() => Math.random() - 0.5),
          isSingleWord: false,
          year,
          source
        },
        {
          id: `write_${baseId}`,
          baseId: baseId,
          category: category,
          type: 'build_sentence',
          skill: 'Writing',
          question: isSingleWord ? `Escribe la palabra: ${spa}` : `Arma la frase: ${spa}`,
          correctSentence: eng,
          words: [...wordsArray].sort(() => Math.random() - 0.5),
          emoji: emoji,
          spa: spa,
          eng: eng,
          year,
          source
        },
        {
          id: `read_${baseId}`,
          baseId: baseId,
          category: category,
          type: 'quiz',
          skill: 'Reading',
          question: `¿Qué significa: "${eng}"?`,
          options: [spa, "Hola", "Adiós", "Gracias"].sort(() => Math.random() - 0.5),
          correctAnswer: spa,
          emoji: emoji,
          spa: spa,
          eng: eng,
          optionsLang: 'es',
          year,
          source
        },
        {
          id: `trans_${baseId}`,
          baseId: baseId,
          category: category,
          type: 'quiz',
          skill: 'Translate',
          question: `¿Cómo se dice en inglés?: "${spa}"`,
          options: [eng, "Hello", "Goodbye", "Thank you"].sort(() => Math.random() - 0.5),
          correctAnswer: eng,
          emoji: emoji,
          spa: spa,
          eng: eng,
          optionsLang: 'en',
          year,
          source
        },
        {
          id: `flash_${baseId}`,
          baseId: baseId,
          category: category,
          type: 'flashcard',
          skill: 'Flashcards',
          question: '¿Cómo se dice en inglés?',
          correctAnswer: eng,
          emoji: emoji,
          spa: spa,
          eng: eng,
          year,
          source
        },
        {
          id: `speak_${baseId}`,
          baseId: baseId,
          category: category,
          type: 'speak',
          skill: 'Speaking',
          question: 'Lee en voz alta:',
          textToRead: eng,
          emoji: emoji,
          spa: spa,
          eng: eng,
          year,
          source
        },
        {
          id: `dict_${baseId}`,
          baseId: baseId,
          category: category,
          type: 'dictation',
          skill: 'Dictation',
          question: 'Escucha y escribe la frase:',
          textToSpeak: eng,
          correctAnswer: eng,
          emoji: emoji,
          spa: spa,
          eng: eng,
          words: [...wordsArray].sort(() => Math.random() - 0.5),
          year,
          source
        }
      ];

      replicas.forEach(rep => {
        if (!EXERCISES_DB.some(e => e.id === rep.id)) {
          EXERCISES_DB.push(rep);
        }
      });
    });

    // 2. Apply all user edits in editedExercises to EXERCISES_DB replicas
    EXERCISES_DB.forEach((ex, idx) => {
      const baseKey = ex.baseId || ex.id;
      const edits = editedExercises[baseKey];
      if (edits) {
        EXERCISES_DB[idx] = {
          ...ex,
          ...edits,
          id: ex.id,
          baseId: ex.baseId,
          type: ex.type,
          skill: ex.skill
        };
      }
    });
    setDbVersion(v => v + 1);
  }, [customExercises, editedExercises]);

  useEffect(() => {
    localStorage.setItem('lisa_excluded_exercise_ids', JSON.stringify(excludedExerciseIds));
  }, [excludedExerciseIds]);


  const dbIndexes = React.useMemo(() => {
    const byId = new Map<string, any>();
    const byCategory = new Map<string, any[]>();
    const byYear = new Map<string, any[]>();
    const byYearSource = new Map<string, any[]>();
    const byYearSourceUnit = new Map<string, any[]>();
    const byYearSourceUnitCategory = new Map<string, any[]>();
    const byEng = new Map<string, any[]>();
    const byBaseId = new Map<string, any[]>();
    
    EXERCISES_DB.forEach(ex => {
      byId.set(ex.id, ex);
      
      const cat = ex.category || "Indefinido";
      if (!byCategory.has(cat)) byCategory.set(cat, []);
      byCategory.get(cat).push(ex);

      const y = ex.year || "2026";
      if (!byYear.has(y)) byYear.set(y, []);
      byYear.get(y).push(ex);

      const src = ex.source || "Indefinido";
      const ys = `${y}::${src}`;
      const unit = (!ex.unit || ex.unit === "Indefinido") ? "Unidad Indefinida" : ex.unit;
      const ysu = `${y}::${src}::${unit}`;
      const ysuc = `${y}::${src}::${unit}::${cat}`;
      if (!byYearSourceUnit.has(ysu)) byYearSourceUnit.set(ysu, []);
      byYearSourceUnit.get(ysu).push(ex);
      if (!byYearSourceUnitCategory.has(ysuc)) byYearSourceUnitCategory.set(ysuc, []);
      byYearSourceUnitCategory.get(ysuc).push(ex);
      if (!byYearSource.has(ys)) byYearSource.set(ys, []);
      byYearSource.get(ys).push(ex);

      if (ex.eng) {
        if (!byEng.has(ex.eng)) byEng.set(ex.eng, []);
        byEng.get(ex.eng)!.push(ex);
      }
      const bId = ex.baseId || ex.id;
      if (!byBaseId.has(bId)) byBaseId.set(bId, []);
      byBaseId.get(bId)!.push(ex);
    });

    return { byId, byCategory, byYear, byYearSource, byYearSourceUnit, byYearSourceUnitCategory, byEng, byBaseId };
  }, [dbVersion]);

  // Create a custom theme from selected or filtered exercises in customize screen
  const handleCreateThemeFromCustomize = () => {
    let baseKeys = selectedExIds;
    if (baseKeys.length === 0) {
      baseKeys = (window as any).__lastFilteredIds || [];
    }

    if (baseKeys.length === 0) {
      setToastMsg("❌ Selecciona o filtra ejercicios antes de crear un tema.");
      return;
    }

    // Get all replicas for the gathered base keys
    const gatheredReplicas = EXERCISES_DB.filter(ex => baseKeys.includes(ex.baseId || ex.id));
    const replicaIds = gatheredReplicas.map(rep => rep.id);

    const themeId = `custom_theme_${Date.now()}`;
    const newTheme = {
      id: themeId,
      name: newThemeName.trim(),
      emoji: newThemeEmoji.trim() || '🎯',
      year: '2026',
      source: 'Personalizados',
      exerciseIds: replicaIds
    };

    setCustomThemes(prev => [...prev, newTheme]);
    setNewThemeName('');
    setNewThemeEmoji('🎯');
    setShowThemeModal(false);
    setSelectedExIds([]);
    setToastMsg(`🎯 Tema "${newTheme.name}" creado con ${replicaIds.length} ejercicios.`);
  };

  // Global Keyboard Shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Esc key
      if (e.key === 'Escape') {
        let closedSomething = false;
        if (showAddExerciseForm) {
          setShowAddExerciseForm(false);
          setEditingEx(null);
          closedSomething = true;
        }
        if (showThemeModal) {
          setShowThemeModal(false);
          closedSomething = true;
        }
        if (showFiltersModal) {
          setShowFiltersModal(false);
          closedSomething = true;
        }
        if (showSettings) {
          setShowSettings(false);
          closedSomething = true;
        }
        if (showParentalGate) {
          setShowParentalGate(false);
          closedSomething = true;
        }
        if (isMainMenuOpen) {
          setIsMainMenuOpen(false);
          closedSomething = true;
        }
        if (closedSomething) {
          e.preventDefault();
        }
      }

      // Ctrl + S key
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 's') {
        e.preventDefault();
        if (showAddExerciseForm) {
          const form = document.querySelector('form');
          if (form) {
            form.requestSubmit();
            setToastMsg("💾 Ejercicio guardado");
          }
        } else if (showThemeModal && newThemeName.trim()) {
          handleCreateThemeFromCustomize();
        } else if (showSettings) {
          setShowSettings(false);
          setToastMsg("💾 Ajustes guardados");
        } else {
          setToastMsg("💾 Todos los datos locales guardados correctamente.");
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [
    showAddExerciseForm,
    showThemeModal,
    showFiltersModal,
    showSettings,
    showParentalGate,
    isMainMenuOpen,
    newThemeName,
    newThemeEmoji,
    selectedExIds,
    newExForm
  ]);

  // Add custom exercise with multiple replica types
  const handleAddCustomExercise = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newExForm.eng.trim() || !newExForm.spa.trim()) {
      setToastMsg("⚠️ Por favor completa los campos requeridos.");
      return;
    }

    const baseId = `manual_custom_${Date.now()}`;
    const tagsArray = newExForm.tags.split(',')
      .map(t => t.trim())
      .filter(t => t.length > 0);

    const newEx = {
      id: baseId,
      eng: newExForm.eng.trim(),
      spa: newExForm.spa.trim(),
      category: newExForm.category,
      skill: newExForm.skill,
      year: newExForm.year.trim() || '2026',
      source: newExForm.source.trim() || 'Manual',
      emoji: newExForm.emoji.trim() || '🎯'
    };

    // Save custom exercise
    setCustomExercises(prev => [...prev, newEx]);

    // Save custom tags
    if (tagsArray.length > 0) {
      setCustomTags(prev => ({
        ...prev,
        [baseId]: tagsArray
      }));
    }

    // Reset Form
    setNewExForm({
      eng: '',
      spa: '',
      category: 'Introductions',
      skill: 'Translate',
      year: '2026',
      source: 'Manual',
      tags: '',
      emoji: '🎯'
    });

    setShowAddExerciseForm(false);
    setToastMsg("✨ Ejercicio personalizado incorporado correctamente.");
  };

  // Save changes to an existing manual custom exercise or a standard one
  const handleSaveEditedExercise = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingEx) return;

    const baseKey = editingEx.baseId || editingEx.id;
    const tagsArray = newExForm.tags.split(',')
      .map(t => t.trim())
      .filter(t => t.length > 0);

    // Save customized fields in editedExercises
    setEditedExercises(prev => ({
      ...prev,
      [baseKey]: {
        eng: newExForm.eng.trim(),
        spa: newExForm.spa.trim(),
        category: newExForm.category,
        year: newExForm.year.trim(),
        source: newExForm.source.trim(),
        emoji: newExForm.emoji.trim()
      }
    }));

    // Update custom tags for this base key
    setCustomTags(prev => ({
      ...prev,
      [baseKey]: tagsArray
    }));

    // If it was a manual custom exercise, also update it in customExercises
    setCustomExercises(prev => prev.map(item => {
      if (item.id === baseKey) {
        return {
          ...item,
          eng: newExForm.eng.trim(),
          spa: newExForm.spa.trim(),
          category: newExForm.category,
          year: newExForm.year.trim(),
          source: newExForm.source.trim(),
          emoji: newExForm.emoji.trim()
        };
      }
      return item;
    }));

    setEditingEx(null);
    setShowAddExerciseForm(false);
    setToastMsg("✏️ Cambios guardados correctamente.");
  };

  // Batch mark selected bases as complete
  const handleMarkSelectedAsDone = () => {
    const replicasToMark = EXERCISES_DB.filter(ex => selectedExIds.includes(ex.baseId || ex.id));
    const replicaIds = replicasToMark.map(ex => ex.id);

    setCompletedExIds(prev => [...new Set([...prev, ...replicaIds])]);
    setSelectedExIds([]);
    setToastMsg("✓ Ejercicios marcados como listos.");
  };

  // Batch mark selected bases as learned
  const handleMarkSelectedAsLearned = () => {
    setLearnedExIds(prev => [...new Set([...prev, ...selectedExIds])]);
    setSelectedExIds([]);
    setToastMsg("🧠 Ejercicios marcados como dominados.");
  };

  // Batch remove selected bases from learned
  const handleUnmarkSelectedAsLearned = () => {
    setLearnedExIds(prev => prev.filter(id => !selectedExIds.includes(id)));
    setSelectedExIds([]);
    setToastMsg("🧠 Ejercicios quitados de dominados.");
  };

  // Batch reset selected progress
  const handleResetSelectedProgress = () => {
    const replicasToReset = EXERCISES_DB.filter(ex => selectedExIds.includes(ex.baseId || ex.id));
    const replicaIds = replicasToReset.map(ex => ex.id);

    setCompletedExIds(prev => prev.filter(id => !replicaIds.includes(id)));
    setLearnedExIds(prev => prev.filter(id => !selectedExIds.includes(id)));
    setSelectedExIds([]);
    setToastMsg("🔄 Progreso de ejercicios reiniciado.");
  };

  // Batch include selected
  const handleIncludeSelected = () => {
    setExcludedExerciseIds(prev => prev.filter(id => !selectedExIds.includes(id)));
    setSelectedExIds([]);
    setToastMsg("👁️ Ejercicios incluidos en las prácticas.");
  };

  // Batch exclude selected
  const handleExcludeSelected = () => {
    setExcludedExerciseIds(prev => [...new Set([...prev, ...selectedExIds])]);
    setSelectedExIds([]);
    setToastMsg("🚫 Ejercicios excluidos de las prácticas.");
  };

  // Batch add custom tag
  const handleAddTagToSelected = () => {
    const tag = tagToModify.trim();
    if (!tag) return;

    setCustomTags(prev => {
      const updated = { ...prev };
      selectedExIds.forEach(id => {
        const current = updated[id] || [];
        if (!current.includes(tag)) {
          updated[id] = [...current, tag];
        }
      });
      return updated;
    });

    setTagToModify('');
    setSelectedExIds([]);
    setToastMsg(`✅ Etiqueta "${tag}" añadida a la selección.`);
  };

  // Batch remove custom tag
  const handleRemoveTagFromSelected = () => {
    const tag = tagToModify.trim();
    if (!tag) return;

    setCustomTags(prev => {
      const updated = { ...prev };
      selectedExIds.forEach(id => {
        const current = updated[id] || [];
        updated[id] = current.filter(t => t !== tag);
      });
      return updated;
    });

    setTagToModify('');
    setSelectedExIds([]);
    setToastMsg(`❌ Etiqueta "${tag}" eliminada de la selección.`);
  };

  const [dictationWordsPerChunk, setDictationWordsPerChunk] = useState<number>(() => {
    return parseInt(localStorage.getItem('lisa_dictationWordsPerChunk') || '3');
  });
  const [dictationPauseMs, setDictationPauseMs] = useState<number>(() => {
    return parseInt(localStorage.getItem('lisa_dictationPauseMs') || '1500');
  });
  const [dictationSpeed, setDictationSpeed] = useState<number>(() => {
    return parseFloat(localStorage.getItem('lisa_dictationSpeed') || '0.8');
  });

  useEffect(() => {
    localStorage.setItem('lisa_dictationWordsPerChunk', dictationWordsPerChunk.toString());
  }, [dictationWordsPerChunk]);

  useEffect(() => {
    localStorage.setItem('lisa_dictationPauseMs', dictationPauseMs.toString());
  }, [dictationPauseMs]);

  useEffect(() => {
    localStorage.setItem('lisa_dictationSpeed', dictationSpeed.toString());
  }, [dictationSpeed]);

  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
  const [selectedVoiceURI, setSelectedVoiceURI] = useState<string | null>(() => localStorage.getItem('lisa_voice') || null);

  const [stats, setStats] = useState(() => {
    const saved = localStorage.getItem('lisa_stats');
    const parsed = saved ? JSON.parse(saved) : { totalCompleted: 0, correctFirstTry: 0, totalAttempted: 0, skills: { Listening: 0, Reading: 0, Speaking: 0, Writing: 0, Flashcards: 0, Translate: 0 }, lastPlayedDate: new Date().toDateString(), streak: 0, history: {}, tagStats: {} };
    if (!parsed.history) parsed.history = {};
    return parsed;
  });

  const [sessionCorrectStreak, setSessionCorrectStreak] = useState(0);

  const [customizeYearFilter, setCustomizeYearFilter] = useState<string[]>([]);
  const [customizeSourceFilter, setCustomizeSourceFilter] = useState<string[]>([]);
  const [customizeThemeFilter, setCustomizeThemeFilter] = useState<string[]>([]);
  const [customizeSkillsFilter, setCustomizeSkillsFilter] = useState<string[]>([]);

  const [visibleCount, setVisibleCount] = useState<number>(30);

  useEffect(() => {
    setVisibleCount(30);
  }, [
    customizeYearFilter,
    customizeSourceFilter,
    customizeThemeFilter,
    customizeSkillsFilter,
    exerciseSearchQuery,
    customizeTagsFilter,
    customizeSortRules,
    currentScreen
  ]);

  const [completedActivities, setCompletedActivities] = useState(() => JSON.parse(localStorage.getItem('lisa_completed_activities') || '{}'));
  const [customThemes, setCustomThemes] = useState<any[]>(() => JSON.parse(localStorage.getItem('lisa_custom_themes') || '[]'));

  const homeThemeEmojis = React.useMemo(() => {
    const emojisFromDb = [];
    for (const ex of Array.from(dbIndexes.byId.values()) as any[]) {
      if (ex.emoji) emojisFromDb.push(ex.emoji);
    }
    return [
      ...new Set([
        '🎯', '👋', '🌎', '👤', '👁️', '🎒', '⚽', '🦸', '🏃', '🏠', '🌤️', '📘', '📅', '📁',
        ...(customThemes || []).map(t => t?.emoji || '🎯'),
        ...emojisFromDb
      ])
    ].filter(Boolean);
  }, [customThemes, dbIndexes]);
  const [darkMode, setDarkMode] = useState<boolean>(() => JSON.parse(localStorage.getItem('lisa_darkMode') || 'false'));
  const [soundEnabled, setSoundEnabled] = useState<boolean>(() => JSON.parse(localStorage.getItem('lisa_soundEnabled') || 'true'));
  const [difficultyLevel, setDifficultyLevel] = useState<string>(() => localStorage.getItem('lisa_difficultyLevel') || 'All');
  const [reminderTime, setReminderTime] = useState<string>(() => localStorage.getItem('lisa_reminderTime') || '20:00');

  const availableYears = React.useMemo(() => {
    const fromDb = Array.from(dbIndexes.byYear.keys());
    const fromCustom = (customThemes || []).map(t => t?.year || "2026");
    return [...new Set([...fromDb, ...fromCustom])].sort();
  }, [dbIndexes, customThemes]);

  const availableSources = React.useMemo(() => {
    const fromDb = Array.from(dbIndexes.byYearSource.keys()).map(ys => (ys as string).split("::")[1]);
    return [...new Set(fromDb)].sort();
  }, [dbIndexes]);

  const availableCategories = React.useMemo(() => {
    const fromDb = Array.from(dbIndexes.byCategory.keys());
    const fromCustom = (customThemes || []).map(t => t?.id);
    return [...new Set([...fromDb, ...fromCustom])].filter(Boolean).sort();
  }, [dbIndexes, customThemes]);

  const availableSkills = ['Listening', 'Speaking', 'Reading', 'Writing', 'Flashcards', 'Translate'];

  // 1. O(N) lookup index of EXERCISES_DB replicas by base ID
  const replicasByBaseId = React.useMemo(() => {
    const map: Record<string, any[]> = {};
    for (const ex of Array.from(dbIndexes.byId.values()) as any[]) {
      const baseKey = ex.baseId || ex.id;
      if (!map[baseKey]) map[baseKey] = [];
      map[baseKey].push(ex);
    }
    return map;
  }, [customExercises, editedExercises]);

  // 2. O(N) lookup index of completion and review status per base ID
  const completionAndReviewStatus = React.useMemo(() => {
    const completedMap: Record<string, boolean> = {};
    const reviewMap: Record<string, boolean> = {};
    
    const mistakesBaseIds = new Set(mistakes.map((m: any) => m.baseId || m.id));

    Object.entries(replicasByBaseId).forEach(([baseKey, repsVal]) => {
      const reps = repsVal as any[];
      const completedCount = reps.filter(item => completedExIds.includes(item.id)).length;
      completedMap[baseKey] = completedCount === reps.length;
      reviewMap[baseKey] = mistakesBaseIds.has(baseKey);
    });

    return { completedMap, reviewMap };
  }, [replicasByBaseId, completedExIds, mistakes]);

  // 3. Pre-filtered and sorted list of exercises for the customize screen
  const customizeFilteredAndSortedList = React.useMemo(() => {
    const { completedMap, reviewMap } = completionAndReviewStatus;
    const learnedSet = new Set(learnedExIds);

    const getStatusWeight = (key: string) => {
      if (learnedSet.has(key)) return 1;
      if (completedMap[key]) return 2;
      if (reviewMap[key]) return 3;
      return 4; // Pending
    };

    const applyMultiSort = (items: any[]) => {
      if (customizeSortRules.length === 0) return items;
      
      const listWithIndex = items.map((item, index) => ({ item, index }));
      listWithIndex.sort((x, y) => {
        const a = x.item;
        const b = y.item;
        const baseKeyA = a.baseId || a.id;
        const baseKeyB = b.baseId || b.id;

        for (const rule of customizeSortRules) {
          let comparison = 0;
          switch (rule.field) {
            case 'eng': {
              const valA = a.eng || "";
              const valB = b.eng || "";
              comparison = valA.localeCompare(valB);
              break;
            }
            case 'spa': {
              const valA = a.spa || "";
              const valB = b.spa || "";
              comparison = valA.localeCompare(valB);
              break;
            }
            case 'category': {
              const valA = a.category || "";
              const valB = b.category || "";
              comparison = valA.localeCompare(valB);
              break;
            }
            case 'year': {
              const valA = a.year || "";
              const valB = b.year || "";
              comparison = valA.localeCompare(valB);
              break;
            }
            case 'source': {
              const valA = a.source || "";
              const valB = b.source || "";
              comparison = valA.localeCompare(valB);
              break;
            }
            case 'skill': {
              const valA = a.skill || (a.skills?.[0]?.skill) || "";
              const valB = b.skill || (b.skills?.[0]?.skill) || "";
              comparison = valA.localeCompare(valB);
              break;
            }
            case 'status': {
              comparison = getStatusWeight(baseKeyA) - getStatusWeight(baseKeyB);
              break;
            }
          }

          if (comparison !== 0) {
            return rule.direction === 'asc' ? comparison : -comparison;
          }
        }
        return x.index - y.index;
      });
      return listWithIndex.map(x => x.item);
    };

    if (isGrouped) {
      // Group/Pivot exercises by base key phrase
      const groupedMap: Record<string, any> = {};
      for (const ex of Array.from(dbIndexes.byId.values()) as any[]) {
        if (customizeYearFilter.length > 0 && !customizeYearFilter.includes(ex.year || "2026")) continue;
        if (customizeSourceFilter.length > 0 && !customizeSourceFilter.includes(ex.source || "Indefinido")) continue;
        if (customizeThemeFilter.length > 0 && !customizeThemeFilter.includes(ex.category)) continue;
        if (customizeSkillsFilter.length > 0 && !customizeSkillsFilter.includes(ex.skill)) continue;

        const baseKey = ex.baseId || ex.id;
        if (!groupedMap[baseKey]) {
          groupedMap[baseKey] = {
            id: ex.id,
            baseId: baseKey,
            eng: ex.eng || ex.question,
            spa: ex.spa || ex.correctAnswer,
            category: ex.category || 'Introductions',
            year: ex.year || '2026',
            source: ex.source || 'Manual',
            emoji: ex.emoji || '🎯',
            skills: []
          };
        }
        groupedMap[baseKey].skills.push(ex);
      }

      let list = Object.values(groupedMap);

      list = list.filter(g => {
        const baseKey = g.baseId;
        const isDone = completedMap[baseKey] || false;
        const isLearned = learnedSet.has(baseKey);
        const needsReview = reviewMap[baseKey] || false;

        if (customizeStatusFilter.length > 0) {
            const matchesStatus = customizeStatusFilter.some(status => {
                if (status === 'Completed' && isDone) return true;
                if (status === 'Pending' && !isDone) return true;
                if (status === 'Learned' && isLearned) return true;
                if (status === 'NeedsReview' && needsReview) return true;
                return false;
            });
            if (!matchesStatus) return false;
        }

        const q = exerciseSearchQuery.toLowerCase();
        const matchesSearch = g.eng.toLowerCase().includes(q) || g.spa.toLowerCase().includes(q);
        if (!matchesSearch) return false;

        // Tags validation
        const computedTags = [];
        const lcat = g.category.toLowerCase();
        const leng = g.eng.toLowerCase();
        if (lcat.includes('grammar') || lcat.includes('verb') || lcat.includes('tense')) computedTags.push('Gramática');
        if (lcat.includes('vocabulary') || lcat.includes('word') || lcat.includes('noun')) computedTags.push('Vocabulario');
        if (lcat.includes('basic') || lcat.includes('level 1') || leng.length < 15) computedTags.push('Básico');
        if (lcat.includes('advanced') || lcat.includes('level 3') || leng.length >= 30) computedTags.push('Avanzado');
        
        const itemCustomTags = customTags[baseKey] || [];
        const allItemTags = [...new Set([...computedTags, ...itemCustomTags])];

        if (customizeTagsFilter.length > 0) {
          return customizeTagsFilter.some(t => allItemTags.includes(t));
        }
        return true;
      });

      return applyMultiSort(list);
    } else {
      // Flattened list
      const currentCatExs = Array.from(dbIndexes.byId.values()).filter((ex: any) => {
        if (customizeYearFilter.length > 0 && !customizeYearFilter.includes(ex.year || "2026")) return false;
        if (customizeSourceFilter.length > 0 && !customizeSourceFilter.includes(ex.source || "Indefinido")) return false;
        if (customizeThemeFilter.length > 0 && !customizeThemeFilter.includes(ex.category)) return false;
        if (customizeSkillsFilter.length > 0 && !customizeSkillsFilter.includes(ex.skill)) return false;
        return true;
      });

      const uniqueExs: any[] = [];
      const seen = new Set<string>();
      currentCatExs.forEach((ex: any) => {
        const baseKey = ex.baseId || ex.id;
        if (!seen.has(baseKey)) {
          seen.add(baseKey);
          uniqueExs.push(ex);
        }
      });

      let filtered = uniqueExs.filter(ex => {
        const baseKey = ex.baseId || ex.id;
        const isDone = completedMap[baseKey] || false;
        const isLearned = learnedSet.has(baseKey);
        const needsReview = reviewMap[baseKey] || false;

        if (customizeStatusFilter.length > 0) {
            const matchesStatus = customizeStatusFilter.some(status => {
                if (status === 'Completed' && isDone) return true;
                if (status === 'Pending' && !isDone) return true;
                if (status === 'Learned' && isLearned) return true;
                if (status === 'NeedsReview' && needsReview) return true;
                return false;
            });
            if (!matchesStatus) return false;
        }

        const q = exerciseSearchQuery.toLowerCase();
        const matchesSearch = (ex.eng || "").toLowerCase().includes(q) || (ex.spa || "").toLowerCase().includes(q);
        if (!matchesSearch) return false;

        // Tags validation
        const computedTags = [];
        const lcat = (ex.category || "").toLowerCase();
        const leng = (ex.eng || "").toLowerCase();
        if (lcat.includes('grammar') || lcat.includes('verb') || lcat.includes('tense')) computedTags.push('Gramática');
        if (lcat.includes('vocabulary') || lcat.includes('word') || lcat.includes('noun')) computedTags.push('Vocabulario');
        if (lcat.includes('basic') || lcat.includes('level 1') || leng.length < 15) computedTags.push('Básico');
        if (lcat.includes('advanced') || lcat.includes('level 3') || leng.length >= 30) computedTags.push('Avanzado');
        
        const itemCustomTags = customTags[baseKey] || [];
        const allItemTags = [...new Set([...computedTags, ...itemCustomTags])];

        if (customizeTagsFilter.length > 0) {
          return customizeTagsFilter.some(t => allItemTags.includes(t));
        }
        return true;
      });

      return applyMultiSort(filtered);
    }
  }, [
    isGrouped,
    customizeYearFilter,
    customizeSourceFilter,
    customizeThemeFilter,
    customizeSkillsFilter,
    completionAndReviewStatus,
    learnedExIds,
    customizeStatusFilter,
    exerciseSearchQuery,
    customTags,
    customizeTagsFilter,
    customizeSortRules,
    customExercises,
    editedExercises
  ]);
  
  // Base phrases without duplicate bases, computed with tags for counting and filters
  const allBasePhrases = React.useMemo(() => {
    const list: any[] = [];
    const seen = new Set<string>();
    for (const ex of Array.from(dbIndexes.byId.values()) as any[]) {
      const baseKey = ex.baseId || ex.id;
      if (!seen.has(baseKey)) {
        seen.add(baseKey);
        
        // Compute tags for this base phrase
        const computedTags = [];
        const lcat = (ex.category || "").toLowerCase();
        const leng = (ex.eng || "").toLowerCase();
        if (lcat.includes('grammar') || lcat.includes('verb') || lcat.includes('tense')) computedTags.push('Gramática');
        if (lcat.includes('vocabulary') || lcat.includes('word') || lcat.includes('noun')) computedTags.push('Vocabulario');
        if (lcat.includes('basic') || lcat.includes('level 1') || leng.length < 15) computedTags.push('Básico');
        if (lcat.includes('advanced') || lcat.includes('level 3') || leng.length >= 30) computedTags.push('Avanzado');
        
        const itemCustomTags = customTags[baseKey] || [];
        const allItemTags = [...new Set([...computedTags, ...itemCustomTags])];

        list.push({
          id: ex.id,
          baseId: baseKey,
          eng: ex.eng || ex.question || "",
          spa: ex.spa || ex.correctAnswer || "",
          category: ex.category || 'Introductions',
          year: ex.year || '2026',
          source: ex.source || 'Manual',
          emoji: ex.emoji || '🎯',
          skills: (replicasByBaseId[baseKey] || []).map((r: any) => r.skill),
          tags: allItemTags
        });
      }
    }
    return list;
  }, [replicasByBaseId, customTags]);

  const filteredBaseIdsSet = React.useMemo(() => {
    const s = new Set<string>();
    customizeFilteredAndSortedList.forEach((item: any) => {
      s.add(item.baseId || item.id);
    });
    return s;
  }, [customizeFilteredAndSortedList]);

  // Faceted search and dynamic counts for filter options
  const filterCounts = React.useMemo(() => {
    const { completedMap, reviewMap } = completionAndReviewStatus;
    const learnedSet = new Set(learnedExIds);

    const total = {
      years: {} as Record<string, number>,
      sources: {} as Record<string, number>,
      categories: {} as Record<string, number>,
      statuses: { Completed: 0, Pending: 0, Learned: 0, NeedsReview: 0 } as Record<string, number>,
      skills: {} as Record<string, number>,
      tags: {} as Record<string, number>,
    };

    const filtered = {
      years: {} as Record<string, number>,
      sources: {} as Record<string, number>,
      categories: {} as Record<string, number>,
      statuses: { Completed: 0, Pending: 0, Learned: 0, NeedsReview: 0 } as Record<string, number>,
      skills: {} as Record<string, number>,
      tags: {} as Record<string, number>,
    };

    allBasePhrases.forEach(bp => {
      const baseKey = bp.baseId;
      const isDone = completedMap[baseKey] || false;
      const isLearned = learnedSet.has(baseKey);
      const needsReview = reviewMap[baseKey] || false;

      // 1. Total counts
      total.years[bp.year] = (total.years[bp.year] || 0) + 1;
      total.sources[bp.source] = (total.sources[bp.source] || 0) + 1;
      total.categories[bp.category] = (total.categories[bp.category] || 0) + 1;
      
      if (isDone) total.statuses.Completed++;
      else total.statuses.Pending++;
      if (isLearned) total.statuses.Learned++;
      if (needsReview) total.statuses.NeedsReview++;

      bp.skills.forEach((sk: string) => {
        total.skills[sk] = (total.skills[sk] || 0) + 1;
      });

      bp.tags.forEach((t: string) => {
        total.tags[t] = (total.tags[t] || 0) + 1;
      });

      // 2. Live counts (if present in the filtered set)
      if (filteredBaseIdsSet.has(baseKey)) {
        filtered.years[bp.year] = (filtered.years[bp.year] || 0) + 1;
        filtered.sources[bp.source] = (filtered.sources[bp.source] || 0) + 1;
        filtered.categories[bp.category] = (filtered.categories[bp.category] || 0) + 1;
        
        if (isDone) filtered.statuses.Completed++;
        else filtered.statuses.Pending++;
        if (isLearned) filtered.statuses.Learned++;
        if (needsReview) filtered.statuses.NeedsReview++;

        bp.skills.forEach((sk: string) => {
          filtered.skills[sk] = (filtered.skills[sk] || 0) + 1;
        });

        bp.tags.forEach((t: string) => {
          filtered.tags[t] = (filtered.tags[t] || 0) + 1;
        });
      }
    });

    return { total, filtered };
  }, [allBasePhrases, completionAndReviewStatus, learnedExIds, filteredBaseIdsSet]);

  const isAnyFilterActive = React.useMemo(() => {
    return (
      customizeYearFilter.length > 0 ||
      customizeSourceFilter.length > 0 ||
      customizeThemeFilter.length > 0 ||
      customizeStatusFilter.length > 0 ||
      customizeSkillsFilter.length > 0 ||
      customizeTagsFilter.length > 0
    );
  }, [
    customizeYearFilter,
    customizeSourceFilter,
    customizeThemeFilter,
    customizeStatusFilter,
    customizeSkillsFilter,
    customizeTagsFilter
  ]);

  // Helpers for count badges in filters modal:
  const getYearBadgeText = (yr: string) => {
    const fCount = filterCounts.filtered.years[yr] || 0;
    const tCount = filterCounts.total.years[yr] || 0;
    return isAnyFilterActive ? `${fCount}/${tCount}` : `${tCount}`;
  };

  const getSourceBadgeText = (src: string) => {
    const fCount = filterCounts.filtered.sources[src] || 0;
    const tCount = filterCounts.total.sources[src] || 0;
    return isAnyFilterActive ? `${fCount}/${tCount}` : `${tCount}`;
  };

  const getCategoryBadgeText = (category: string) => {
    const fCount = filterCounts.filtered.categories[category] || 0;
    const tCount = filterCounts.total.categories[category] || 0;
    return isAnyFilterActive ? `${fCount}/${tCount}` : `${tCount}`;
  };

  const getStatusBadgeText = (status: 'Completed' | 'Pending' | 'Learned' | 'NeedsReview') => {
    const fCount = filterCounts.filtered.statuses[status] || 0;
    const tCount = filterCounts.total.statuses[status] || 0;
    return isAnyFilterActive ? `${fCount}/${tCount}` : `${tCount}`;
  };

  const getSkillBadgeText = (sk: string) => {
    const fCount = filterCounts.filtered.skills[sk] || 0;
    const tCount = filterCounts.total.skills[sk] || 0;
    return isAnyFilterActive ? `${fCount}/${tCount}` : `${tCount}`;
  };

  const getTagBadgeText = (tag: string) => {
    const fCount = filterCounts.filtered.tags[tag] || 0;
    const tCount = filterCounts.total.tags[tag] || 0;
    return isAnyFilterActive ? `${fCount}/${tCount}` : `${tCount}`;
  };

  // Modal States
  const [mathQ, setMathQ] = useState({ a: 0, b: 0, ans: 0 });
  const [gateInputVal, setGateInputVal] = useState('');
  const [gateErrorMsg, setGateErrorMsg] = useState(false);
  const [settingsActiveTab, setSettingsActiveTab] = useState('general');
  const [showResetConfirmModal, setShowResetConfirmModal] = useState(false);
  const [showDeepResetConfirmModal, setShowDeepResetConfirmModal] = useState(false);
  const [deletingThemeId, setDeletingThemeId] = useState<string | null>(null);
  const [showMotivation, setShowMotivation] = useState(false);

  useEffect(() => {
    const today = new Date().toDateString();
    if (stats.lastPlayedDate !== today) {
      setShowMotivation(true);
      setTimeout(() => setShowMotivation(false), 5000);
    }
  }, []);

  const categories = [...new Set(ALL_DATA.map(ex => ex.category))];

  const validMistakes = mistakes.filter((m: any) => {
      if (!enableMultiModalProgression) {
         return m.kbLevel === undefined || m.kbLevel === 0;
      }
      return (!m.targetKeyboardMode || (allowedKeyboards || []).includes(m.targetKeyboardMode));
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
  useEffect(() => { localStorage.setItem('lisa_dataSaverMode', JSON.stringify(dataSaverMode)); }, [dataSaverMode]);
  useEffect(() => { localStorage.setItem('lisa_enableTimer', JSON.stringify(enableTimer)); }, [enableTimer]);
  useEffect(() => { localStorage.setItem('lisa_timerSeconds', timerSeconds.toString()); }, [timerSeconds]);
  useEffect(() => { localStorage.setItem('lisa_autoAdjustTimer', JSON.stringify(autoAdjustTimer)); }, [autoAdjustTimer]);
  useEffect(() => { localStorage.setItem('lisa_allowedKeyboards', JSON.stringify(allowedKeyboards)); }, [allowedKeyboards]);
  useEffect(() => { localStorage.setItem('lisa_alwaysAllowFreeKeyboard', alwaysAllowFreeKeyboard.toString()); }, [alwaysAllowFreeKeyboard]);
  useEffect(() => { localStorage.setItem('lisa_keyboardOrder', JSON.stringify(keyboardOrder)); }, [keyboardOrder]);
  useEffect(() => { localStorage.setItem('lisa_defaultKeyboardMode', defaultKeyboardMode); }, [defaultKeyboardMode]);
  useEffect(() => { localStorage.setItem('lisa_currentKeyboardMode', currentKeyboardMode); }, [currentKeyboardMode]);
  useEffect(() => { localStorage.setItem('lisa_sessionLimit', sessionLimit); }, [sessionLimit]);
  useEffect(() => { localStorage.setItem('lisa_skillOrder', JSON.stringify(skillOrder)); }, [skillOrder]);
  useEffect(() => { if (selectedVoiceURI) localStorage.setItem('lisa_voice', selectedVoiceURI); }, [selectedVoiceURI]);
  useEffect(() => { localStorage.setItem('lisa_stats', JSON.stringify(stats)); }, [stats]);
  useEffect(() => {
    setLastSyncStatus("Sincronizado");
    const t = setTimeout(() => setLastSyncStatus(null), 2500);
    return () => clearTimeout(t);
  }, [stats, activeSessions, completedActivities, mistakes]);

  useEffect(() => { localStorage.setItem('lisa_completed_activities', JSON.stringify(completedActivities)); }, [completedActivities]);
  useEffect(() => { localStorage.setItem('lisa_darkMode', JSON.stringify(darkMode)); }, [darkMode]);
  useEffect(() => { localStorage.setItem('lisa_reminderTime', reminderTime); }, [reminderTime]);
  
  useEffect(() => {
    const checkReminder = () => {
      const lastPlayed = new Date(stats.lastPlayedDate);
      const now = new Date();
      if (lastPlayed.toDateString() !== now.toDateString()) {
        const [hr, min] = reminderTime.split(':').map(Number);
        if (now.getHours() > hr || (now.getHours() === hr && now.getMinutes() >= min)) {
           const lastReminder = localStorage.getItem('lisa_lastReminderDate');
           if (lastReminder !== now.toDateString()) {
              setToastMsg("⏰ ¡Es hora de tu práctica diaria de inglés!");
              setTimeout(() => setToastMsg(null), 8000);
              localStorage.setItem('lisa_lastReminderDate', now.toDateString());
           }
        }
      }
    };
    checkReminder();
    const interval = setInterval(checkReminder, 60000);
    return () => clearInterval(interval);
  }, [stats.lastPlayedDate, reminderTime]);

  useEffect(() => { localStorage.setItem('lisa_multiModal', JSON.stringify(enableMultiModalProgression)); }, [enableMultiModalProgression]);
  useEffect(() => { localStorage.setItem('lisa_progressionStyle', progressionStyle); }, [progressionStyle]);
  useEffect(() => { localStorage.setItem('lisa_splitNodesByMode', splitNodesByMode.toString()); }, [splitNodesByMode]);
  useEffect(() => { localStorage.setItem('lisa_progressiveGuidance', JSON.stringify(enableProgressiveGuidance)); }, [enableProgressiveGuidance]);
  useEffect(() => { localStorage.setItem('lisa_guidanceLevel', guidanceLevel); }, [guidanceLevel]);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);
  useEffect(() => { localStorage.setItem('lisa_guidanceCount', guidanceCount.toString()); }, [guidanceCount]);
  useEffect(() => { localStorage.setItem('lisa_guide_tracking', JSON.stringify(guideTracking)); }, [guideTracking]);
  useEffect(() => {
    if (currentScreen === "summary" && !batterySaverMode) {
      const duration = 3 * 1000;
      const animationEnd = Date.now() + duration;
      const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 9999 };

      const randomInRange = (min: number, max: number) => Math.random() * (max - min) + min;

      const interval: any = setInterval(function() {
        const timeLeft = animationEnd - Date.now();

        if (timeLeft <= 0) {
          return clearInterval(interval);
        }

        const particleCount = 50 * (timeLeft / duration);
        confetti(Object.assign({}, defaults, { particleCount,
          origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 }
        }));
        confetti(Object.assign({}, defaults, { particleCount,
          origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 }
        }));
      }, 250);
      return () => clearInterval(interval);
    }
  }, [currentScreen, batterySaverMode]);

  useEffect(() => { localStorage.setItem('lisa_randomizeKeyboardsMode', randomizeKeyboardsMode); }, [randomizeKeyboardsMode]);

  useEffect(() => {
    if (currentScreen === 'exercise' && queue.length > 0 && activeCategory !== 'Learned') {
      let kbModeStr = '';
      if (!isMistakeMode && activeCategory !== 'ByPhrase' && enableMultiModalProgression && splitNodesByMode) {
          const isKb = (t: string) => ['flashcard', 'build_sentence', 'listen_and_write', 'dialogue_chat', 'quiz', 'reading', 'dictation'].includes(t);
          const firstKb = queue.find(ex => isKb(ex.type));
          if (firstKb && firstKb.targetKeyboardMode) {
              kbModeStr = '_' + firstKb.targetKeyboardMode;
          } else {
              kbModeStr = '_non_kb';
          }
      }
      let sessionKey = isMistakeMode ? 'mistakes' : `${activeCategory}_${activeSkill}${kbModeStr}`;
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
      
      // Update custom tags performance
      if (!newStats.tagStats) newStats.tagStats = {};
      
      // We need the current exercise to get its tags
      // But handleUpdateStats doesn't receive the exercise ID directly, we have queue[currentIndex]
      const currentEx = queue[currentIndex];
      if (currentEx) {
        const baseKey = currentEx.baseId || currentEx.id;
        const cTags = customTags[baseKey] || [];
        cTags.forEach((tag: string) => {
          if (!newStats.tagStats[tag]) newStats.tagStats[tag] = { correct: 0, attempted: 0 };
          newStats.tagStats[tag].attempted += 1;
          if (isCorrectFirstTry) newStats.tagStats[tag].correct += 1;
        });
      }

      const todayIso = new Date().toISOString().split('T')[0];
      if (!newStats.history) newStats.history = {};
      newStats.history[todayIso] = (newStats.history[todayIso] || 0) + 1;

      const today = new Date().toDateString();
      const yesterday = new Date(Date.now() - 86400000).toDateString();
      if (newStats.lastPlayedDate === yesterday) newStats.streak += 1;
      else if (newStats.lastPlayedDate !== today) newStats.streak = 1;
      newStats.lastPlayedDate = today;
      return newStats;
    });

    // Adaptive Timer system based on user success history
    if (isCorrectFirstTry) {
      setSessionCorrectStreak(prev => {
        const next = prev + 1;
        // If they get a streak of 3 or more correct on first try, reduce timer to increase the challenge
        if (next >= 3) {
          setTimerSeconds(current => {
            const updated = Math.max(15, current - 5);
            if (updated < current) {
              showGlobalToast(`🔥 ¡Racha de aciertos! El temporizador se ha adaptado a ${updated}s para más desafío.`);
            }
            return updated;
          });
        }
        return next;
      });
    } else {
      setSessionCorrectStreak(0);
      // If they commit an error, expand timer to allow more reflection
      setTimerSeconds(current => {
        const updated = Math.min(120, current + 10);
        if (updated > current) {
          showGlobalToast(`⏱️ ¡No te preocupes! El temporizador se ha adaptado a ${updated}s para darte más tiempo.`);
        }
        return updated;
      });
    }
  };

  
const getThemeEmoji = (cat: string) => {
  let emoji = "📘";
  if(cat.includes('Introductions')) emoji = "👋";
  else if(cat.includes('Countries')) emoji = "🌎";
  else if(cat.includes('Verb To Be')) emoji = "👤";
  else if(cat.includes('Adjectives') || cat.includes('Physical')) emoji = "👁️";
  else if(cat.includes('School')) emoji = "🎒";
  else if(cat.includes('Hobbies')) emoji = "⚽";
  else if(cat.includes('Abilities')) emoji = "🦸";
  else if(cat.includes('Present Continuous')) emoji = "🏃";
  else if(cat.includes('House')) emoji = "🏠";
  else if(cat.includes('Weather')) emoji = "🌤️";
  return emoji;
};

  const getCategoryDisplayName = (cat: string) => {
    if (cat.startsWith('Year::')) return `Año ${cat.split('::')[1]}`;
    if (cat.startsWith('Source::')) return `Fuente ${cat.split('::')[2]}`;
    if (cat === 'All') return 'Todos';
    if (cat === 'Learned') return 'Aprendidos';
    if (cat === 'ByPhrase') return 'Por Palabra';
    return cat;
  };
  const getCategoryPool = (cat: string) => {
    if (cat === 'All') return EXERCISES_DB;
    if (cat === 'Learned') return EXERCISES_DB.filter(ex => completedExIds.includes(ex.baseId || ex.id) || learnedExIds.includes(ex.baseId || ex.id));
    if (cat.startsWith('Year::')) {
      const yr = cat.split('::')[1];
      return dbIndexes.byYear.get(yr) || [];
    }
    if (cat.startsWith('Source::')) {
      const parts = cat.split('::');
      return dbIndexes.byYearSource.get(`${parts[1]}::${parts[2]}`) || [];
    }
    if (cat.startsWith('Unit::')) {
      const parts = cat.split('::');
      return dbIndexes.byYearSourceUnit.get(`${parts[1]}::${parts[2]}::${parts[3]}`) || [];
    }
    const customTheme = customThemes.find(ct => ct.id === cat);
    if (customTheme) return customTheme.exerciseIds.map((id) => dbIndexes.byId.get(id)).filter(Boolean);
    if (selectedYear && selectedSource && selectedUnit) {
      const key = `${selectedYear}::${selectedSource}::${selectedUnit}::${cat}`;
      const filtered = dbIndexes.byYearSourceUnitCategory.get(key);
      if (filtered && filtered.length > 0) return filtered;
    }
    return dbIndexes.byCategory.get(cat) || [];
  };

  const getCompletionStats = (exercisePool: any[]) => {
    if (exercisePool.length === 0) return { completed: 0, total: 0 };

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

      const activeModes = keyboardOrder.filter(kb => (allowedKeyboards || []).includes(kb));
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

  const getKbCompletionStats = (pool: any[], targetKbMode?: string) => {
    let completed = 0;
    let totalCount = 0;
    const seenBases = new Set<string>();
    const baseExs: any[] = [];
    pool.forEach(ex => {
        const baseKey = ex.baseId || ex.id;
        if (!seenBases.has(baseKey)) { seenBases.add(baseKey); baseExs.push(ex); }
    });
    
    const activeModes = keyboardOrder.filter(kb => (allowedKeyboards || []).includes(kb));
    
    baseExs.forEach(ex => {
        const baseKey = ex.baseId || ex.id;
        if (targetKbMode === 'non_kb') {
            if (!isKeyboardLayoutType(ex.type)) {
                totalCount++;
                if (learnedExIds.includes(baseKey) || completedExIds.includes(ex.id)) completed++;
            }
            return;
        }

        if (learnedExIds.includes(baseKey)) {
            if (isKeyboardLayoutType(ex.type)) {
                if (targetKbMode) { totalCount++; completed++; }
                else { totalCount += activeModes.length; completed += activeModes.length; }
            } else if (!targetKbMode) {
                totalCount++; completed++;
            }
        } else if (isKeyboardLayoutType(ex.type)) {
            if (targetKbMode) {
                totalCount++;
                if (completedExIds.includes(`${baseKey}_${targetKbMode}`)) completed++;
            } else {
                activeModes.forEach(mode => {
                    totalCount++;
                    if (completedExIds.includes(`${baseKey}_${mode}`)) completed++;
                });
            }
        } else if (!targetKbMode) {
            totalCount++;
            if (completedExIds.includes(ex.id)) completed++;
        }
    });
    return { completed, total: totalCount };
  };

  const getAdjustedTimerSeconds = (stats: any, baseTimer: number, style: string) => {
    if (!autoAdjustTimer) return baseTimer;
    if (stats.totalAttempted <= 5) return baseTimer;
    const hitRate = stats.correctFirstTry / stats.totalAttempted;
    let adjustment = 0;
    if (style === 'relaxed') {
        if (hitRate >= 0.9) adjustment = -5;
        else if (hitRate <= 0.6) adjustment = 10;
    } else if (style === 'aggressive') {
        if (hitRate >= 0.7) adjustment = -10;
        else if (hitRate <= 0.4) adjustment = 5;
    } else {
        if (hitRate >= 0.8) adjustment = -5;
        else if (hitRate <= 0.5) adjustment = 5;
    }
    return Math.max(5, baseTimer + adjustment);
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

  
    const handleCopyPrompt = (themeName: string) => {
    const pool = getCategoryPool(themeName);
    const vocabList = pool.filter(ex => ex.type === 'flashcard_single').map(ex => `- ${ex.eng} (${ex.spa})`).join('\n');
    const sentenceList = pool.filter(ex => ex.type === 'sentence_builder' || ex.type === 'speak' || ex.type === 'listen_write').map(ex => `- ${ex.eng} (${ex.spa})`).join('\n');
    
    const contextSection = (vocabList || sentenceList) ? `
Para que sepas exactamente qué vocabulario y estructuras estoy aprendiendo, este es el contenido exacto de mi unidad:
` + (vocabList ? `\nVOCABULARIO:\n${vocabList}\n` : '') + (sentenceList ? `\nFRASES Y ESTRUCTURAS:\n${sentenceList}\n` : '') : '';

    const prompt = `Actúa como mi compañero de práctica de inglés. 
Vamos a conversar (hablando o por escrito) estrictamente sobre el siguiente tema: "${themeName}".
Por favor, apégate de forma rigurosa a este tema. No introduzcas vocabulario avanzado ni te salgas de este contexto para asegurar que solo practique lo que he aprendido en esta unidad.
${contextSection}
INSTRUCCIONES PARA TI:
1. Limita tu vocabulario estrictamente a las palabras y frases de la unidad provistas arriba (o vocabulario extremadamente básico de soporte).
2. Hazme preguntas cortas, sencillas y de a una por vez para que yo pueda responder usando el vocabulario de la unidad. 
3. Mi nivel es básico/principiante.
4. Si cometo un error en mis respuestas, corrígeme de forma amable, corta y concisa, y luego hazme la siguiente pregunta relacionada con el tema.
5. NO asumas ningún rol raro, solo sé mi compañero de práctica.
¡Empecemos! Hazme la primera pregunta.`;

    navigator.clipboard.writeText(prompt).then(() => {
      setToastMsg(`¡Prompt de ${themeName} copiado al portapapeles! 📋 (Pégalo en Gemini)`);
    }).catch(err => {
      console.error('Error al copiar: ', err);
      setToastMsg('Error al copiar el prompt.');
    });
  };

  const handleConfigureCustomize = (item: { id: string, type: 'year' | 'source' | 'theme' | 'skill' }) => {
    if (item.type === 'year') {
      setCustomizeYearFilter([item.id.split('::')[1]]);
      setCustomizeSourceFilter([]);
      setCustomizeThemeFilter([]);
      setCustomizeSkillsFilter([]);
    } else if (item.type === 'source') {
      setCustomizeYearFilter([item.id.split('::')[1]]);
      setCustomizeSourceFilter([item.id.split('::')[2]]);
      setCustomizeThemeFilter([]);
      setCustomizeSkillsFilter([]);
    } else if (item.type === 'theme') {
      const matchEx = (dbIndexes.byCategory.get(item.id) || [])[0];
      setCustomizeYearFilter(matchEx?.year ? [matchEx.year] : []);
      setCustomizeSourceFilter(matchEx?.source ? [matchEx.source] : []);
      setCustomizeThemeFilter([item.id]);
      setCustomizeSkillsFilter([]);
    } else if (item.type === 'skill') {
      setCustomizeYearFilter([]);
      setCustomizeSourceFilter([]);
      setCustomizeThemeFilter([]);
      setCustomizeSkillsFilter([item.id.split('::')[0]]);
    }
    setCurrentScreen('customize');
  };

  const getKbRank = (mode: string) => {
       let idx = keyboardOrder.indexOf(mode);
       return idx === -1 ? 999 : idx;
  };

  const startSkillPractice = (skill: string, categoryOverride?: string, targetKbMode?: string) => {
    const targetCat = categoryOverride || activeCategory;
    if (categoryOverride) setActiveCategory(categoryOverride);
    setActiveSkill(skill);
    setIsMistakeMode(false);

    const sessionKey = targetKbMode ? `${targetCat}_${skill}_${targetKbMode}` : `${targetCat}_${skill}`;
    if (activeSessions[sessionKey] && targetCat !== 'Learned') {
      const data = activeSessions[sessionKey];
      if (data.queue && data.queue.length > 0 && data.currentIndex < data.queue.length) {
        setQueue(data.queue); setCurrentIndex(data.currentIndex); setScore(data.score);
        setCurrentScreen('exercise');
        return;
      }
    } 

    let pool = getCategoryPool(targetCat!);
    const filteredPool = pool.filter(ex => !excludedExerciseIds.includes(ex.baseId || ex.id));
    if (filteredPool.length > 0) {
      pool = filteredPool;
    }
    if (skill !== 'Mix') pool = pool.filter(ex => ex.skill === skill);
    
    let finalQueue: any[] = [];

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

      const fullActiveModes = keyboardOrder.filter(kb => (allowedKeyboards || []).includes(kb));
      const activeModes = targetKbMode ? [targetKbMode] : fullActiveModes;
      
      let uncompletedBases = basePool.filter(ex => {
        const baseKey = ex.baseId || ex.id;
        if (learnedExIds.includes(baseKey)) return false;
        
        if (targetKbMode === 'non_kb') {
            if (isKeyboardLayoutType(ex.type)) return false;
            return !completedExIds.includes(ex.id);
        }

        if (!isKeyboardLayoutType(ex.type)) {
          if (targetKbMode && targetKbMode !== 'non_kb') return false;
          return !completedExIds.includes(ex.id);
        }

        return !activeModes.every(kbMode => completedExIds.includes(`${baseKey}_${kbMode}`));
      });

      if (uncompletedBases.length === 0) {
        let fallbackBases = basePool.filter(ex => !learnedExIds.includes(ex.baseId || ex.id));
        if (fallbackBases.length === 0) fallbackBases = basePool;
        
        if (targetKbMode === 'non_kb') {
            uncompletedBases = fallbackBases.filter(ex => !isKeyboardLayoutType(ex.type));
        } else if (targetKbMode) {
            uncompletedBases = fallbackBases.filter(ex => isKeyboardLayoutType(ex.type));
        } else {
            uncompletedBases = fallbackBases;
        }
      }

      const guideExercises: any[] = [];
      if (enableProgressiveGuidance) {
        const kbBases = uncompletedBases.filter(ex => isKeyboardLayoutType(ex.type));
        if (kbBases.length > 0) {
            if (guidanceLevel === 'mode') {
                const modesToGuide = targetKbMode && targetKbMode !== 'non_kb' ? [targetKbMode] : activeModes;
                modesToGuide.forEach((kbMode) => {
                    const kbIndex = fullActiveModes.indexOf(kbMode);
                    const trackKey = `mode_${kbMode}`;
                    const count = guideTracking[trackKey] || 0;
                    const remainingGuides = Math.max(0, guidanceCount - count);
                    for (let i = 0; i < remainingGuides; i++) {
                        const baseEx = kbBases[(Math.max(0, kbIndex) + i) % kbBases.length];
                        if (baseEx) {
                           guideExercises.push({
                              ...baseEx,
                              id: `guide_${baseEx.baseId || baseEx.id}_${kbMode}_${count + i}`,
                              baseId: baseEx.baseId || baseEx.id,
                              targetKeyboardMode: kbMode,
                              kbLevel: Math.max(0, kbIndex),
                              isGuide: true,
                              trackKey
                           });
                        }
                    }
                });
            } else if (guidanceLevel === 'type') {
                 const modesToGuide = targetKbMode && targetKbMode !== 'non_kb' ? [targetKbMode] : activeModes;
                 kbBases.forEach(baseEx => {
                     modesToGuide.forEach(kbMode => {
                         const trackKey = `ex_${baseEx.baseId || baseEx.id}_${kbMode}`;
                         const count = guideTracking[trackKey] || 0;
                         const remainingGuides = Math.max(0, guidanceCount - count);
                         for (let i = 0; i < remainingGuides; i++) {
                             guideExercises.push({
                                ...baseEx,
                                id: `guide_${baseEx.baseId || baseEx.id}_${kbMode}_${count + i}`,
                                baseId: baseEx.baseId || baseEx.id,
                                targetKeyboardMode: kbMode,
                                kbLevel: Math.max(0, fullActiveModes.indexOf(kbMode)),
                                isGuide: true,
                                trackKey
                             });
                         }
                     });
                 });
            } else if (guidanceLevel === 'theme') {
                 const cat = activeCategory;
                 const kbModeStr = targetKbMode ? `_${targetKbMode}` : '';
                 if (cat !== 'All' && cat !== 'Learned' && cat !== 'ByPhrase') {
                     const trackKey = `theme_${cat}${kbModeStr}`;
                     const count = guideTracking[trackKey] || 0;
                     const remainingGuides = Math.max(0, guidanceCount - count);
                     for (let i = 0; i < remainingGuides; i++) {
                         const baseEx = kbBases[Math.floor(Math.random() * kbBases.length)];
                         if (baseEx) {
                             guideExercises.push({
                                ...baseEx,
                                id: `guide_${baseEx.baseId || baseEx.id}_theme_${count + i}`,
                                baseId: baseEx.baseId || baseEx.id,
                                targetKeyboardMode: targetKbMode && targetKbMode !== 'non_kb' ? targetKbMode : (activeModes[0] || 'virtual_word'),
                                kbLevel: Math.max(0, fullActiveModes.indexOf(targetKbMode && targetKbMode !== 'non_kb' ? targetKbMode : (activeModes[0] || 'virtual_word'))),
                                isGuide: true,
                                trackKey
                            });
                         }
                     }
                 } else if (cat === 'All') {
                     const uncompletedCats = [...new Set(kbBases.map(ex => ex.category))];
                     uncompletedCats.forEach(c => {
                         const trackKey = `theme_${c}${kbModeStr}`;
                         const count = guideTracking[trackKey] || 0;
                         const remainingGuides = Math.max(0, guidanceCount - count);
                         for (let i = 0; i < remainingGuides; i++) {
                             const catBases = kbBases.filter(ex => ex.category === c);
                             const baseEx = catBases[Math.floor(Math.random() * catBases.length)];
                             if (baseEx) {
                                 guideExercises.push({
                                    ...baseEx,
                                    id: `guide_${baseEx.baseId || baseEx.id}_theme_${count + i}`,
                                    baseId: baseEx.baseId || baseEx.id,
                                    targetKeyboardMode: targetKbMode && targetKbMode !== 'non_kb' ? targetKbMode : (activeModes[0] || 'virtual_word'),
                                    kbLevel: Math.max(0, fullActiveModes.indexOf(targetKbMode && targetKbMode !== 'non_kb' ? targetKbMode : (activeModes[0] || 'virtual_word'))),
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
          if (targetKbMode !== 'non_kb') {
            const modesToPush = targetKbMode ? [targetKbMode] : activeModes;
            modesToPush.forEach((kbMode) => {
              const kbIndex = fullActiveModes.indexOf(kbMode);
              mainReplicated.push({
                ...baseEx,
                id: `${baseKey}_${kbMode}`,
                baseId: baseKey,
                targetKeyboardMode: kbMode,
                kbLevel: kbIndex > -1 ? kbIndex : 0,
                isGuide: false
              });
            });
          }
        } else {
          if (!targetKbMode || targetKbMode === 'non_kb') {
            nonKeyboardExs.push({
              ...baseEx,
              isGuide: false
            });
          }
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

        // Find the maximum number of modes any baseId has
        let maxModes = 0;
        Object.values(groups).forEach(exs => {
            if (exs.length > maxModes) maxModes = exs.length;
        });

        const baseIdsInOrder = Object.keys(groups).sort(() => Math.random() - 0.5);

        for (let i = 0; i < maxModes; i++) {
            baseIdsInOrder.forEach(baseId => {
                if (groups[baseId][i]) {
                    sequencedReplicated.push(groups[baseId][i]);
                }
            });
        }
      }

      const shuffledNonKeyboard = nonKeyboardExs.sort(() => Math.random() - 0.5);
      finalQueue = [...guideExercises, ...sequencedReplicated, ...shuffledNonKeyboard];

    } else {
      if (!enableMultiModalProgression) {
         pool = pool.filter(ex => ex.kbLevel === undefined || ex.kbLevel === 0);
      } else {
         pool = pool.filter(ex => ex.kbLevel === undefined || (allowedKeyboards || []).includes(ex.targetKeyboardMode));
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

  const startSingleExercisePractice = (baseEx: any, targetKbMode?: string) => {
    setActiveSkill(baseEx.skill || 'Individual');
    setIsMistakeMode(false);
    
    let finalQueue: any[] = [];
    
    if (enableMultiModalProgression && activeCategory !== 'Learned' && isKeyboardLayoutType(baseEx.type)) {
      const activeModes = keyboardOrder.filter(kb => (allowedKeyboards || []).includes(kb));
      const baseKey = baseEx.baseId || baseEx.id;
      const modesToPush = targetKbMode && targetKbMode !== 'non_kb' ? [targetKbMode] : activeModes;
      modesToPush.forEach((kbMode) => {
        const kbIndex = activeModes.indexOf(kbMode);
        if (enableProgressiveGuidance) {
          finalQueue.push({
            ...baseEx,
            id: `guide_${baseKey}_${kbMode}`,
            baseId: baseKey,
            targetKeyboardMode: kbMode,
            kbLevel: Math.max(0, kbIndex),
            isGuide: true
          });
        }
        finalQueue.push({
          ...baseEx,
          id: `${baseKey}_${kbMode}`,
          baseId: baseKey,
          targetKeyboardMode: kbMode,
          kbLevel: Math.max(0, kbIndex),
          isGuide: false
        });
      });
    } else {
      if (enableProgressiveGuidance && isKeyboardLayoutType(baseEx.type)) {
          finalQueue.push({
            ...baseEx,
            isGuide: true
          });
      }
      finalQueue.push({
        ...baseEx,
        isGuide: false
      });
    }
    
    setQueue(finalQueue);
    setCurrentIndex(0);
    setScore(0);
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

    const pool = (dbIndexes.byEng.get(engText) || []);
    let finalQueue: any[] = [];

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

      const activeModes = keyboardOrder.filter(kb => (allowedKeyboards || []).includes(kb));
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

      const idealOrder = ['Listening', 'Speaking', 'Reading', 'Translate', 'Writing', 'Flashcards', 'Dictation', 'Conversation'];
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
      const idealOrder = ['Listening', 'Speaking', 'Reading', 'Translate', 'Writing', 'Flashcards', 'Dictation', 'Conversation'];
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
    if (isParentalUnlocked) {
      setShowSettings(true);
      return;
    }
    const a = Math.floor(Math.random() * 10) + 5; 
    const b = Math.floor(Math.random() * 8) + 3;  
    setMathQ({ a, b, ans: a * b });
    setGateInputVal('');
    setGateErrorMsg(false);
    setShowParentalGate(true);
  };

  const renderParentalGateModal = () => {
    const checkGate = () => {
      if (parseInt(gateInputVal) === mathQ.ans || gateInputVal === '190618' || gateInputVal === '220618') { 
        if (gateInputVal === '220618') {
          setIsParentalUnlocked(true);
          setSyncAudioAdvance(true);
          setEnableClickSavings(true);
          setVoiceSpeedPrompt(0.9);
          setVoiceSpeedAnswer(0.9);
          setVoiceSpeedFeedback(1.0);
        }
        setShowParentalGate(false); 
        setShowSettings(true); 
      } 
      else { setGateErrorMsg(true); setGateInputVal(''); }
    };

    return (
      <div className="absolute inset-0 bg-slate-50 dark:bg-slate-950 z-[999] flex flex-col animate-slide-down items-center justify-center p-4">
        <button onClick={() => setShowParentalGate(false)} className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 dark:text-slate-300 p-2" title="Cerrar"><XCircle size={32}/></button>
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-8 w-full max-w-sm shadow-xl border border-indigo-100 dark:border-slate-800 text-center">
          <div className="flex justify-center mb-6 text-indigo-500 dark:text-indigo-400 bg-indigo-50 dark:bg-slate-800 w-20 h-20 mx-auto rounded-full items-center"><Lock size={40}/></div>
          <h2 className="text-2xl font-black text-slate-800 dark:text-slate-200 mb-2">Ajustes y Control</h2>
          <p className="text-slate-500 dark:text-slate-400 mb-8 font-medium text-sm">Resuelve esta operación matemática para acceder.</p>
          <div className="text-4xl font-black text-indigo-800 dark:text-indigo-300 mb-6 tracking-widest">{mathQ.a} x {mathQ.b}</div>
          <input type="number" value={gateInputVal} onChange={e => setGateInputVal(e.target.value)} className="w-full p-4 rounded-xl border-2 border-indigo-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-200 text-center text-2xl font-bold mb-2 focus:outline-none focus:border-indigo-500 transition-colors placeholder:text-slate-300 dark:placeholder:text-slate-600" placeholder="?"/>
          {gateErrorMsg && <p className="text-red-500 text-sm font-bold mb-4">Incorrecto. Intenta de nuevo.</p>}
          <button onClick={checkGate} className="w-full mt-4 py-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-bold text-lg active:scale-95 shadow-md transition-all">Acceder</button>
        </div>
      </div>
    );
  };

  const renderSettingsModal = () => { try {
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
      if ((allowedKeyboards || []).includes(id)) {
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
      <div className="absolute inset-0 bg-slate-50 dark:bg-slate-950 z-[999] flex flex-col animate-slide-down overflow-hidden">
        {/* Collapsible Header and Tabs */}
        <div className={`transition-all duration-300 ease-in-out shrink-0 ${settingsHeaderVis ? 'max-h-40 opacity-100' : 'max-h-0 overflow-hidden opacity-0 pointer-events-none'}`}>
          <div className="flex justify-between items-center p-4 border-b border-gray-100 dark:border-slate-700">
            <h2 className="text-xl font-bold text-indigo-800 dark:text-indigo-200 dark:text-indigo-300 flex items-center gap-2"><Settings/> Ajustes y Control</h2>
            <button onClick={() => setShowSettings(false)} className="text-gray-400 hover:text-gray-700 dark:text-slate-300" title="Cerrar Ajustes"><XCircle size={28}/></button>
          </div>

          <div className="p-4 pb-2">
            <div className="flex bg-gray-100 dark:bg-slate-900 p-1 rounded-xl">
              <button onClick={() => setSettingsActiveTab('general')} className={`flex-1 py-2 font-bold rounded-lg ${settingsActiveTab === 'general' ? 'bg-indigo-50/30 dark:bg-slate-900/80 shadow text-indigo-700 dark:text-indigo-300' : 'text-gray-500 dark:text-slate-400'}`}>General</button>
              <button onClick={() => setSettingsActiveTab('advanced')} className={`flex-1 py-2 font-bold rounded-lg ${settingsActiveTab === 'advanced' ? 'bg-indigo-50/30 dark:bg-slate-900/80 shadow text-indigo-700 dark:text-indigo-300' : 'text-gray-500 dark:text-slate-400'}`}>Avanzadas</button>
              <button onClick={() => setSettingsActiveTab('database')} className={`flex-1 py-2 font-bold rounded-lg ${settingsActiveTab === 'database' ? 'bg-indigo-50/30 dark:bg-slate-900/80 shadow text-indigo-700 dark:text-indigo-300' : 'text-gray-500 dark:text-slate-400'}`}>Bases de Datos</button>
            </div>
          </div>
        </div>
        
        <div onScroll={handleSettingsScroll} className="flex-1 overflow-y-auto px-4 pb-4">
          {settingsActiveTab === 'general' && (
              <div className="space-y-4">

                <div className="bg-slate-50 dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-700">
                  <div className="flex justify-between items-center mb-3">
                    <span className="font-bold text-gray-800 dark:text-slate-200">Modo Noche (Oscuro)</span>
                    <input type="checkbox" checked={darkMode} onChange={(e) => setDarkMode(e.target.checked)} className="w-5 h-5 text-slate-600 rounded" />
                  </div>
                  <div className="flex justify-between items-center mt-3 pt-3 border-t border-slate-200 dark:border-slate-700">
                    <span className="font-bold text-gray-800 dark:text-slate-200">Efectos de Sonido</span>
                    <input type="checkbox" checked={soundEnabled} onChange={(e) => setSoundEnabled(e.target.checked)} className="w-5 h-5 text-slate-600 rounded" />
                  </div>
                  <div className="flex justify-between items-center mt-3 pt-3 border-t border-slate-200 dark:border-slate-700">
                    <span className="font-bold text-gray-800 dark:text-slate-200">Nivel de Dificultad</span>
                    <select value={difficultyLevel} onChange={(e) => setDifficultyLevel(e.target.value)} className="p-1.5 rounded bg-indigo-50/30 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-600 text-xs font-bold text-gray-900 dark:text-slate-200">
                      <option value="All">Todos</option>
                      <option value="Principiante">Principiante</option>
                      <option value="Intermedio">Intermedio</option>
                      <option value="Avanzado">Avanzado</option>
                    </select>
                  </div>
                  <div className="flex justify-between items-center mt-3 pt-3 border-t border-slate-200 dark:border-slate-700">
                    <span className="font-bold text-gray-800 dark:text-slate-200">Recordatorio Diario</span>
                    <input type="time" value={reminderTime} onChange={(e) => setReminderTime(e.target.value)} className="p-1 border border-slate-300 dark:border-slate-600 rounded font-medium text-sm dark:bg-slate-700 dark:text-slate-200" />
                  </div>
                  <p className="text-xs text-gray-500 dark:text-slate-400 mt-2">Recibirás una notificación en pantalla si no has practicado a esta hora.</p>
                </div>
                
                <div className="bg-sky-50 dark:bg-sky-900/20 p-4 rounded-xl border border-sky-100 dark:border-sky-800">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-bold text-gray-800 dark:text-slate-200">Ejercicios por Sesión</span>
                  </div>
                  <select value={sessionLimit} onChange={(e) => setSessionLimit(e.target.value)} className="w-full p-2 rounded-lg border-2 border-sky-200 dark:border-sky-800 bg-indigo-50/30 dark:bg-slate-900/80 text-sm font-bold text-sky-900 dark:text-sky-300">
                    <option value="10">10 ejercicios (Corto)</option>
                    <option value="15">15 ejercicios (Medio)</option>
                    <option value="20">20 ejercicios (Largo)</option>
                    <option value="Todos">Todos los del tema (Completo)</option>
                  </select>
                </div>

                <div className="bg-indigo-50 dark:bg-indigo-950/20 p-4 rounded-xl border border-indigo-100 dark:border-slate-800">
                  <h3 className="font-bold text-lg text-indigo-800 dark:text-indigo-200 dark:text-indigo-300 mb-2 flex items-center gap-1"><Keyboard size={20}/> Evolución Automática</h3>
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-bold text-gray-800 dark:text-slate-200 text-sm">Activar Evolución</span>
                    <input type="checkbox" checked={enableMultiModalProgression} onChange={(e) => setEnableMultiModalProgression(e.target.checked)} className="w-5 h-5 text-indigo-600 dark:text-indigo-300 rounded" />
                  </div>
                  <p className="text-xs text-gray-600 dark:text-slate-300 mb-3">Si está activo, aprenderás cada palabra pasando progresivamente por todos los modos permitidos.</p>
                   <div className="flex justify-between items-center mt-4 mb-2 border-t border-indigo-200 dark:border-slate-800 pt-3">
                    <span className="font-bold text-gray-800 dark:text-slate-200 text-sm">Dificultad Progresiva de Contenido (Dictado)</span>
                    <input type="checkbox" checked={progressiveDifficulty} onChange={(e) => setProgressiveDifficulty(e.target.checked)} className="w-5 h-5 text-indigo-600 dark:text-indigo-300 rounded" />
                  </div>
                  <p className="text-xs text-gray-600 dark:text-slate-300 mb-2">Ajusta dinámicamente la longitud de los fragmentos de audio en el dictado según tus aciertos.</p>
                  
                  <div className="bg-indigo-100/30 dark:bg-slate-900/40 p-2.5 rounded-lg border border-indigo-100/50 dark:border-slate-800 text-[11px] text-gray-600 dark:text-slate-300 mb-3 leading-relaxed">
                    <strong className="font-bold text-indigo-950 dark:text-indigo-200 block mb-0.5">⚙️ Dificultad Progresiva de Contenido:</strong>
                    Si tienes un porcentaje de aciertos superior al 80%, la app aumentará el tamaño de los fragmentos de dictado para exigir mayor retención de audio. Si baja del 40%, fragmentará más la frase para que te resulte más sencillo escribirla. <strong>(No altera el reloj, solo cambia la dificultad de retención de voz)</strong>.
                  </div>

                  {enableMultiModalProgression && (<>
                    <div className="flex justify-between items-center mb-3 border-t border-indigo-200 dark:border-slate-800 pt-3">
                      <span className="font-bold text-gray-800 dark:text-slate-200 text-sm">Estilo de Progresión</span>
                      <select value={progressionStyle} onChange={(e) => setProgressionStyle(e.target.value)} className="p-1.5 rounded bg-indigo-50/30 dark:bg-slate-900/80 border border-indigo-200 dark:border-slate-800 text-xs font-bold text-indigo-900 dark:text-indigo-300">
                         <option value="consecutive">🔁 Por Ejercicio (Consecutivo por frase)</option>
                         <option value="interleaved">🌎 Por Tema/Grupo (Aleatorio nivel a nivel)</option>
                      </select>
                    </div>
                    
                    <div className="flex justify-between items-center mb-3 border-t border-indigo-200 dark:border-slate-800 pt-3">
                      <span className="font-bold text-gray-800 dark:text-slate-200 text-sm">Dividir Nodos por Modo (Hub)</span>
                      <input type="checkbox" checked={splitNodesByMode} onChange={(e) => setSplitNodesByMode(e.target.checked)} className="w-5 h-5 text-indigo-600 dark:text-indigo-300 rounded" />
                    </div>
                    <p className="text-xs text-gray-600 dark:text-slate-300 mb-3">Si está activo, verás un nodo separado para cada modo de entrada en la pantalla principal.</p>
                    <div className="flex justify-between items-center mb-3 mt-3">
                      <span className="font-bold text-gray-800 dark:text-slate-200 text-sm">Aleatoriedad de Entrada</span>
                      <select value={randomizeKeyboardsMode} onChange={(e) => setRandomizeKeyboardsMode(e.target.value)} className="p-1.5 rounded bg-indigo-50/30 dark:bg-slate-900/80 border border-indigo-200 dark:border-slate-800 text-xs font-bold text-indigo-900 dark:text-indigo-300">
                         <option value="none">📋 Jerarquía Ordenada (Fija)</option>
                         <option value="entry">⚡ Entrada de Datos (Completo Azar)</option>
                         <option value="exercise">🧩 Por Ejercicio (Orden Azar por frase)</option>
                         <option value="session">🎒 Por Tema/Conjunto (Orden Azar global)</option>
                      </select>
                    </div>
                    <div className="text-[10px] text-gray-500 dark:text-slate-400 mb-2 leading-snug">
                      {randomizeKeyboardsMode === 'none' && "Utiliza el orden secuencial de tu lista de modos jerarquizados."}
                      {randomizeKeyboardsMode === 'entry' && "Cada entrada de teclado se elige al azar en cada intento, ignorando la jerarquía."}
                      {randomizeKeyboardsMode === 'exercise' && "Cada frase/ejercicio baraja sus niveles para completarlos en orden aleatorio."}
                      {randomizeKeyboardsMode === 'session' && "La sesión adopta una jerarquía barajada al azar para todo el conjunto."}
                    </div>
                  </>)}

                  <div className="flex justify-between items-center mb-2 border-t border-indigo-200 dark:border-slate-800 pt-3">
                    <span className="font-bold text-gray-800 dark:text-slate-200 text-sm">Guía de Ayuda (En todos los niveles)</span>
                    <input type="checkbox" checked={enableProgressiveGuidance} onChange={(e) => setEnableProgressiveGuidance(e.target.checked)} className="w-5 h-5 text-indigo-600 dark:text-indigo-300 rounded" />
                  </div>
                  <p className="text-xs text-gray-600 dark:text-slate-300 mb-3">Muestra la palabra correcta tenuemente para guiarte paso a paso por todos los teclados habilitados.</p>

                  <div className="bg-amber-50/60 dark:bg-amber-950/10 p-2.5 rounded-lg border border-amber-100 dark:border-amber-900/30 text-[11px] text-amber-900 dark:text-amber-200 mb-3 leading-relaxed">
                    <strong className="font-extrabold block mb-0.5">💡 ¿Cómo funciona la Guía de Ayuda?</strong>
                    Al introducir un nuevo ejercicio, la app genera tarjetas de <span className="font-extrabold text-amber-700 dark:text-amber-300">"Ayuda Guiada"</span>. En ellas se resalta la respuesta correcta (coloreando en amarillo las teclas correctas o la respuesta correcta en opción múltiple) para que interiorices la respuesta sin frustración. Tras completar las repeticiones indicadas, la ayuda se retira para evaluarte sin pistas y consolidar tu memoria. Puedes desactivar esta casilla si prefieres practicar de memoria desde el inicio.
                  </div>

                  {enableProgressiveGuidance && (
                     <div className="bg-indigo-50/30 dark:bg-slate-900/80 p-3 rounded-lg border border-indigo-100 dark:border-slate-800 flex flex-col gap-3 mb-4">
                        <div className="flex flex-col gap-1">
                          <span className="font-bold text-gray-800 dark:text-slate-200 text-xs">Nivel de Aparición</span>
                          <select value={guidanceLevel} onChange={(e) => setGuidanceLevel(e.target.value)} className="w-full p-1.5 rounded-lg border-2 border-indigo-200 dark:border-slate-800 bg-gray-50 dark:bg-slate-900 text-xs font-bold text-indigo-900 dark:text-indigo-300 focus:outline-none">
                            <option value="theme">Por Tema (repetir X veces por tema completo)</option>
                            <option value="type">Por Ejercicio (repetir X veces por cada ejercicio individual)</option>
                            <option value="mode">Por Modo (repetir X veces por modo de teclado: burbujas, bloques)</option>
                          </select>
                        </div>
                        <div className="flex items-center justify-between gap-2">
                           <span className="font-bold text-gray-800 dark:text-slate-200 text-xs">Veces que se repite la ayuda:</span>
                           <input type="number" min="1" max="100" value={guidanceCount} onChange={(e) => {
                             const val = parseInt(e.target.value);
                             if (!isNaN(val) && val > 0) setGuidanceCount(val);
                           }} className="w-16 p-1.5 border-2 border-indigo-200 dark:border-slate-800 rounded text-center text-xs font-bold dark:bg-slate-900 dark:text-slate-200" />
                        </div>
                     </div>
                  )}

                  <div className="border-t border-indigo-200 dark:border-slate-800 pt-3 mb-4">
                    <span className="font-bold text-gray-800 dark:text-slate-200 text-sm block mb-2">Modos Permitidos y Jerarquía</span>
                    <div className="flex justify-between items-center bg-indigo-50 dark:bg-slate-900/60 p-3 rounded-xl border border-indigo-100 dark:border-slate-800 mb-3 shadow-sm">
                      <span className="font-bold text-gray-800 dark:text-slate-200 text-sm">Escritura Libre Siempre Activa</span>
                      <input type="checkbox" checked={alwaysAllowFreeKeyboard} onChange={(e) => setAlwaysAllowFreeKeyboard(e.target.checked)} className="w-5 h-5 text-indigo-600 dark:text-indigo-400 rounded shrink-0" />
                    </div>
                    <p className="text-[10px] text-gray-500 dark:text-slate-400 mb-3 -mt-2 leading-tight">Si está activado, el modo "Teclado Libre" estará siempre disponible. Se activará automáticamente si comienzas a escribir con un teclado físico.</p>
                    <p className="text-xs text-gray-600 dark:text-slate-400 mb-2">Ordena la jerarquía (de de arriba hacia abajo) y activa los modos a utilizar.</p>
                    <div className="space-y-2">
                       {(keyboardOrder || []).map((kid: string, idx: number) => {
                         const opt = KEYBOARD_OPTIONS.find(o => o.id === kid);
                         if (!opt) return null;
                         return (
                           <div key={opt.id} className="flex justify-between items-center bg-indigo-50/30 dark:bg-slate-900/80 p-2 rounded-lg border border-indigo-100 dark:border-slate-800 shadow-sm">
                             <label className="flex items-center gap-2 text-sm font-medium text-indigo-900 dark:text-indigo-200 cursor-pointer flex-1">
                               <input type="checkbox" checked={(allowedKeyboards || []).includes(opt.id)} onChange={() => toggleKeyboardAllowed(opt.id)} className="w-5 h-5 text-indigo-600 dark:text-indigo-300 rounded shrink-0" />
                               <span className="truncate">{idx + 1}. {opt.label}</span>
                             </label>
                             <div className="flex gap-1 shrink-0">
                                <button disabled={idx === 0} onClick={() => moveKeyboardOrder(idx, 'up')} className="p-1 text-indigo-500 dark:text-indigo-400 disabled:opacity-30 hover:bg-indigo-50 dark:hover:bg-indigo-900/40 rounded"><ArrowUp size={18}/></button>
                                <button disabled={idx === keyboardOrder.length - 1} onClick={() => moveKeyboardOrder(idx, 'down')} className="p-1 text-indigo-500 dark:text-indigo-400 disabled:opacity-30 hover:bg-indigo-50 dark:bg-slate-950 rounded"><ArrowDown size={18}/></button>
                             </div>
                           </div>
                         );
                       })}
                    </div>
                  </div>

                  {!enableMultiModalProgression && (
                    <div className="border-t border-indigo-200 dark:border-slate-800 pt-3">
                      <span className="font-bold text-gray-800 dark:text-slate-200 text-sm block mb-2">Teclado por Defecto (Fijo)</span>
                      <select value={defaultKeyboardMode} onChange={(e) => {
                           setDefaultKeyboardMode(e.target.value);
                           setCurrentKeyboardMode(e.target.value);
                      }} className="w-full p-2 rounded-lg border-2 border-indigo-200 dark:border-slate-800 bg-indigo-50/30 dark:bg-slate-900/80 text-sm font-bold text-indigo-900 dark:text-indigo-200">
                        <option value="random">🎲 Aleatorio (por ejercicio)</option>
                        {KEYBOARD_OPTIONS.filter((opt: any) => (allowedKeyboards || []).includes(opt.id)).map((opt: any) => (
                          <option key={opt.id} value={opt.id}>{opt.label}</option>
                        ))}
                      </select>
                    </div>
                  )}
                  
                  <div className="flex justify-between items-center border-t border-indigo-200 dark:border-slate-800 pt-3 mt-3">
                    <span className="font-bold text-gray-800 dark:text-slate-200 text-sm">Ortografía Estricta</span>
                    <input type="checkbox" checked={strictTyping} onChange={(e) => setStrictTyping(e.target.checked)} className="w-5 h-5 text-indigo-600 dark:text-indigo-300 rounded" title="Requerir mayúsculas y signos de puntuación exactos" />
                  </div>
                  <p className="text-xs text-gray-500 dark:text-slate-400 mt-1 italic">{strictTyping ? "🔴 Exige mayúsculas y signos al escribir." : "🟢 Ignora mayúsculas y signos de puntuación."}</p>
                </div>

                <div className="bg-fuchsia-50 dark:bg-fuchsia-950/20 p-4 rounded-xl border border-fuchsia-100 dark:border-fuchsia-900/50">
                  <div className="flex justify-between items-center mb-1">
                    <span className="font-bold text-gray-800 dark:text-slate-200">Botón "Ya lo estudié"</span>
                    <input type="checkbox" checked={enableMarkAsKnown} onChange={(e) => setEnableMarkAsKnown(e.target.checked)} className="w-6 h-6 text-fuchsia-600 rounded" title="Añade botón 'Ya lo sé' para quitar ejercicios y llevarlos a repaso" />
                  </div>
                  <p className="text-xs text-gray-600 dark:text-slate-400 mb-3">{enableMarkAsKnown ? "🟢 Puedes marcar ejercicios aprendidos en el juego y estadísticas." : "🔴 Desactivado."}</p>
                </div>

                <div className="bg-teal-50 dark:bg-slate-950 p-4 rounded-xl border border-teal-100 dark:border-slate-800">
                   <h3 className="font-bold text-lg text-teal-800 mb-1">Orden de los Módulos</h3>
                   <p className="text-xs text-gray-600 dark:text-slate-400 mb-3">Ordena los botones de los ejercicios:</p>
                   <div className="space-y-2">
                     {(skillOrder || []).map((skill: string, index: number) => (
                        <div key={skill} className="flex justify-between items-center bg-indigo-50/30 dark:bg-slate-900/80 p-2 rounded-lg border border-teal-200 dark:border-teal-800 shadow-sm">
                           <span className="font-bold text-teal-900 dark:text-teal-200 text-sm flex items-center gap-2">{SKILL_ICONS[skill]} {SKILL_LABELS[skill]}</span>
                           <div className="flex gap-1">
                              <button disabled={index === 0} onClick={() => moveSkillOrder(index, 'up')} className="p-1 text-teal-600 dark:text-teal-400 disabled:opacity-30 hover:bg-teal-100 dark:hover:bg-teal-900/40 rounded"><ArrowUp size={18}/></button>
                              <button disabled={index === skillOrder.length - 1} onClick={() => moveSkillOrder(index, 'down')} className="p-1 text-teal-600 dark:text-teal-400 disabled:opacity-30 hover:bg-teal-100 dark:hover:bg-teal-900/40 rounded"><ArrowDown size={18}/></button>
                           </div>
                        </div>
                     ))}
                   </div>
                </div>

                <div className="bg-blue-50 dark:bg-slate-950 p-4 rounded-xl border border-blue-100 dark:border-slate-800">
                  <div className="flex justify-between items-center mb-1">
                    <span className="font-bold text-gray-800 dark:text-slate-200">Clic para Traducir</span>
                    <input type="checkbox" checked={enableClickToTranslate} onChange={(e) => setEnableClickToTranslate(e.target.checked)} className="w-6 h-6 text-blue-600 rounded" title="Activa o desactiva la traducción al tocar palabras" />
                  </div>
                  <p className="text-xs text-gray-600 dark:text-slate-400 mb-3">{enableClickToTranslate ? "🟢 Al tocar palabras se traducen y pronuncian." : "🔴 Desactivado."}</p>
                </div>

                <div className="bg-orange-50 dark:bg-orange-950/20 p-4 rounded-xl border border-orange-100 dark:border-orange-900/50">
                  <div className="flex justify-between items-center mb-1">
                    <span className="font-bold text-gray-800 dark:text-slate-200">Flexibilidad al Hablar</span>
                    <input type="checkbox" checked={speakPermissive} onChange={(e) => setSpeakPermissive(e.target.checked)} className="w-6 h-6 text-orange-600" />
                  </div>
                  <p className="text-xs text-gray-600 dark:text-slate-400 mb-3">{speakPermissive ? "🟢 Permite pequeños errores o fragmentos." : "🔴 Exactitud estricta."}</p>
                  
                  <div className="flex justify-between items-center mb-1 border-t border-orange-200 dark:border-orange-800 pt-3">
                    <span className="font-bold text-gray-800 dark:text-slate-200">Escuchar antes de Hablar</span>
                    <input type="checkbox" checked={speakPreview} onChange={(e) => setSpeakPreview(e.target.checked)} className="w-6 h-6 text-orange-600" />
                  </div>

                  <div className="flex justify-between items-center mb-1 border-t border-orange-200 dark:border-orange-800 pt-3">
                    <span className="font-bold text-gray-800 dark:text-slate-200">Karaoke (Resaltar Palabra)</span>
                    <input type="checkbox" checked={showSpeakingWord} onChange={(e) => setShowSpeakingWord(e.target.checked)} className="w-6 h-6 text-orange-600" />
                  </div>
                </div>

                <div className="bg-yellow-50 dark:bg-yellow-950/20 p-4 rounded-xl border border-yellow-100 dark:border-yellow-900/50">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-bold text-gray-800 dark:text-slate-200">Temporizador (Urgencia)</span>
                    <input type="checkbox" checked={enableTimer} onChange={(e) => setEnableTimer(e.target.checked)} className="w-6 h-6 text-yellow-600" />
                  </div>
                  {enableTimer && (
                    <div className="space-y-3 mt-2">
                      <select value={timerSeconds} onChange={(e) => setTimerSeconds(parseInt(e.target.value))} className="w-full p-2 rounded-lg border-2 border-yellow-200 dark:border-yellow-800 bg-indigo-50/30 dark:bg-slate-900/80 text-sm font-bold text-yellow-900 dark:text-yellow-300">
                        <option value={15}>15 Segundos (Difícil)</option>
                        <option value={30}>30 Segundos (Medio)</option>
                        <option value={60}>60 Segundos (Fácil)</option>
                        <option value={90}>1:30 Minutos (Recomendado)</option>
                        <option value={120}>2:00 Minutos (Largo)</option>
                      </select>
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input type="checkbox" checked={autoAdjustTimer} onChange={(e) => setAutoAdjustTimer(e.target.checked)} className="w-4 h-4 text-yellow-600" />
                        <span className="text-sm font-bold text-gray-700 dark:text-slate-300">Reajuste Automático del Temporizador</span>
                      </label>
                      <div className="bg-yellow-100/40 dark:bg-yellow-950/10 p-2.5 rounded-lg border border-yellow-100 dark:border-yellow-900/30 text-[11px] text-gray-600 dark:text-slate-300 leading-relaxed mt-2">
                        <strong className="font-bold text-yellow-950 dark:text-yellow-200 block mb-0.5">⏱️ Reajuste Automático de Tiempo (Urgencia):</strong>
                        Si respondes de forma rápida y correcta, reduce los segundos disponibles en cada ejercicio para entrenar tu agilidad mental. Si tienes dificultades, te dará más tiempo para resolverlos sin prisa. <strong>(No altera el contenido de las tarjetas, solo cambia la presión del reloj)</strong>.
                      </div>
                    </div>
                  )}
                  
                  <div className="flex justify-between items-center mb-2 border-t border-yellow-200 dark:border-yellow-800 pt-3 mt-3">
                    <span className="font-bold text-gray-800 dark:text-slate-200">Feedback Animador (Voz)</span>
                    <input type="checkbox" checked={enableVoiceFeedback} onChange={(e) => setEnableVoiceFeedback(e.target.checked)} className="w-6 h-6 text-yellow-600" />
                  </div>
                </div>

                <div className="bg-purple-50 dark:bg-purple-950/20 p-4 rounded-xl border border-purple-100 dark:border-purple-900/50">
                  <label className="font-bold text-gray-800 dark:text-slate-200 block mb-2">Modo Tarjetas (Flashcards)</label>
                  <select value={flashcardMode} onChange={(e) => setFlashcardMode(e.target.value)} className="w-full p-2 rounded-lg border-2 border-purple-200 dark:border-purple-800 bg-indigo-50/30 dark:bg-slate-900/80 text-sm font-bold text-purple-900 dark:text-purple-300">
                    <option value="interactive">⭐ Interactivo (Teclado/Microfono)</option>
                    <option value="classic">📖 Clásico ("Lo sé/No lo sé")</option>
                  </select>
                </div>

                <div className="bg-fuchsia-50 dark:bg-fuchsia-950/20 p-4 rounded-xl border border-fuchsia-100 dark:border-fuchsia-900/50 space-y-4">
                  <h3 className="font-bold text-lg text-fuchsia-800 dark:text-fuchsia-300 flex items-center gap-2">✍️ Configuración de Dictado</h3>
                  
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-bold text-gray-700 dark:text-slate-300">Palabras por Bloque</label>
                    <select 
                      value={dictationWordsPerChunk} 
                      onChange={(e) => setDictationWordsPerChunk(parseInt(e.target.value))} 
                      className="w-full p-2 rounded-lg border-2 border-fuchsia-200 dark:border-fuchsia-700 bg-indigo-50/30 dark:bg-slate-900/80 text-sm font-bold text-fuchsia-950 dark:text-fuchsia-200"
                    >
                      <option value="1">1 Palabra (Muy Fácil)</option>
                      <option value="2">2 Palabras (Fácil)</option>
                      <option value="3">3 Palabras (Recomendado)</option>
                      <option value="4">4 Palabras (Medio)</option>
                      <option value="5">5 Palabras (Largo)</option>
                      <option value="9999">Frase Completa (Sin fragmentar)</option>
                    </select>
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-bold text-gray-700 dark:text-slate-300">Pausa entre Bloques (Milisegundos)</label>
                    <select 
                      value={dictationPauseMs} 
                      onChange={(e) => setDictationPauseMs(parseInt(e.target.value))} 
                      className="w-full p-2 rounded-lg border-2 border-fuchsia-200 dark:border-fuchsia-700 bg-indigo-50/30 dark:bg-slate-900/80 text-sm font-bold text-fuchsia-950 dark:text-fuchsia-200"
                    >
                      <option value="500">0.5 Segundos (Muy Rápido)</option>
                      <option value="1000">1.0 Segundo (Rápido)</option>
                      <option value="1500">1.5 Segundos (Recomendado)</option>
                      <option value="2000">2.0 Segundos (Lento)</option>
                      <option value="3000">3.0 Segundos (Muy Lento)</option>
                    </select>
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-bold text-gray-700 dark:text-slate-300">Velocidad del Dictado (0.1 - 1.5)</label>
                    <div className="flex items-center gap-3">
                      <input 
                        type="range" 
                        min="0.4" 
                        max="1.2" 
                        step="0.1" 
                        value={dictationSpeed} 
                        onChange={(e) => setDictationSpeed(parseFloat(e.target.value))} 
                        className="flex-1 accent-fuchsia-600"
                      />
                      <span className="font-mono text-sm font-bold text-fuchsia-900 dark:text-fuchsia-100 bg-indigo-50/30 dark:bg-slate-900/80 border border-fuchsia-200 dark:border-fuchsia-700 px-2.5 py-1 rounded-md min-w-[50px] text-center">
                        {dictationSpeed}x
                      </span>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-100 dark:bg-slate-900 p-4 rounded-xl border border-gray-200 dark:border-slate-700">
                  <label className="font-bold text-gray-800 dark:text-slate-200 block mb-2">Voz del Sistema (Inglés)</label>
                  <select value={selectedVoiceURI || ''} onChange={(e) => {
                      const uri = e.target.value; setSelectedVoiceURI(uri);
                      if (uri) {
                        playTTS("Hello! I am ready to learn English with Lisa.", 'en', uri, 0.9, true);
                      }
                    }} className="w-full p-2 rounded-lg border-2 border-gray-300 dark:border-slate-700 bg-indigo-50/30 dark:bg-slate-900/80 text-sm truncate">
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

                <div className="bg-emerald-50 dark:bg-emerald-950/20 p-4 rounded-xl border border-emerald-100 dark:border-emerald-900/50">
                  <div className="flex justify-between items-center mb-1">
                    <span className="font-bold text-gray-800 dark:text-slate-200">Mostrar Completados</span>
                    <input type="checkbox" checked={showCompleted} onChange={(e) => setShowCompleted(e.target.checked)} className="w-6 h-6 text-emerald-600 rounded" />
                  </div>
                  <p className="text-xs text-gray-600 dark:text-slate-400">{showCompleted ? "🟢 Muestra todo en el menú." : "🔴 Oculta los temas terminados."}</p>
                </div>
              </div>
            )}

            {settingsActiveTab === 'advanced' && (
              <div className="space-y-4">
                 <div className="bg-indigo-50 dark:bg-slate-950 p-4 rounded-xl border border-indigo-200 dark:border-slate-800">
                    <h3 className="font-bold text-lg text-indigo-800 dark:text-indigo-200 mb-2 flex items-center gap-1.5">⚡ Reducción de Clics</h3>
                    <div className="flex justify-between items-center mb-1">
                      <span className="font-bold text-gray-800 dark:text-slate-200 text-sm">Ahorro de Clics (Auto-continuar)</span>
                      <input type="checkbox" checked={enableClickSavings} onChange={(e) => setEnableClickSavings(e.target.checked)} className="w-6 h-6 text-indigo-600 dark:text-indigo-300 rounded" />
                    </div>
                    <p className="text-xs text-gray-600 dark:text-slate-400 mb-3">Pasa automáticamente al siguiente ejercicio al responder correctamente, sin clics adicionales de confirmación.</p>

                    <div className="flex justify-between items-center mb-1 border-t border-indigo-100 dark:border-slate-800 pt-3">
                      <span className="font-bold text-gray-800 dark:text-slate-200 text-sm">Esperar al audio para avanzar</span>
                      <input type="checkbox" checked={syncAudioAdvance} onChange={(e) => setSyncAudioAdvance(e.target.checked)} className="w-6 h-6 text-indigo-600 dark:text-indigo-300 rounded" />
                    </div>
                    <p className="text-xs text-gray-600 dark:text-slate-400 mb-3">Si está activado, el avance automático esperará a que termine la reproducción de voz antes de continuar al siguiente ejercicio.</p>
                    
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

<div className="flex justify-between items-center mb-1 border-t border-indigo-100 dark:border-slate-800 pt-3">
                      <span className="font-bold text-gray-800 dark:text-slate-200 text-sm">Ocultar feedback positivo</span>
                      <input type="checkbox" checked={hidePositiveFeedback} onChange={(e) => setHidePositiveFeedback(e.target.checked)} className="w-6 h-6 text-indigo-600 dark:text-indigo-300 rounded" />
                    </div>
                    <p className="text-xs text-gray-600 dark:text-slate-400">Oculta la pantalla de felicitación verde tras un acierto para avanzar aún más rápido.</p>
                 </div>

                 <div className="bg-indigo-50 dark:bg-slate-950 p-4 rounded-xl border border-indigo-200 dark:border-slate-800 mt-4">
                    <h3 className="font-bold text-lg text-indigo-800 dark:text-indigo-200 mb-2 flex items-center gap-1.5"><Download size={18}/> Uso sin conexión</h3>
                    <p className="text-xs text-gray-600 dark:text-slate-400 mb-3">Guarda la base de datos de ejercicios localmente para practicar sin conexión a internet.</p>
                    <button onClick={async () => {
                      setToastMsg('Descargando sesiones...');
                      try {
                        await localforage.setItem('lisa_offline_db', EXERCISES_DB);
                        await localforage.setItem('lisa_offline_metadata', ALL_DATA);
                        setTimeout(() => setToastMsg('¡Sesiones guardadas para uso offline! ✅'), 1000);
                      } catch (e) {
                        setToastMsg('Error al guardar datos.');
                      }
                      setTimeout(() => setToastMsg(null), 3000);
                    }} className="w-full p-2 bg-indigo-600 text-white rounded-lg font-bold hover:bg-indigo-700 active:scale-95 transition">
                      Descargar Base de Datos
                    </button>
                 </div>

                 <div className="bg-indigo-50 dark:bg-slate-950 p-4 rounded-xl border border-indigo-200 dark:border-slate-800 mt-4">
                    <h3 className="font-bold text-lg text-indigo-800 dark:text-indigo-200 mb-2">Micrófono</h3>
                    <div className="flex justify-between items-center mb-1">
                      <span className="font-bold text-gray-800 dark:text-slate-200 text-sm">Conteo 3, 2, 1 al hablar</span>
                      <input type="checkbox" checked={enableMicCountdown} onChange={(e) => setEnableMicCountdown(e.target.checked)} className="w-6 h-6 text-indigo-600 dark:text-indigo-300 rounded" />
                    </div>
                    <p className="text-xs text-gray-600 dark:text-slate-400">Si está activo, habrá un conteo antes de grabar. Si está apagado, grabará inmediatamente al tocar el micrófono.</p>
                 </div>

                 <div className="bg-red-50 dark:bg-slate-950 p-4 rounded-xl border border-red-200 dark:border-slate-800 mt-4">
                    <h3 className="font-bold text-lg text-red-800 dark:text-red-400 mb-2">Zona de Peligro</h3>
                    <p className="text-sm text-red-600 dark:text-red-300 mb-4">Esto eliminará las estadísticas, los errores, temas dominados y las marcas de nivel completado.</p>
                    <button onClick={() => {
                        setShowResetConfirmModal(true);
                    }} className="w-full py-3 bg-red-500 text-white hover:bg-red-600 rounded-xl font-bold text-sm active:scale-95 flex items-center justify-center gap-2 mb-2">
                      <RefreshCw size={16}/> Borrar todo el progreso
                    </button>
                    <button onClick={() => {
                        setShowDeepResetConfirmModal(true);
                    }} className="w-full py-3 bg-red-900 text-white hover:bg-red-950 rounded-xl font-bold text-sm active:scale-95 flex items-center justify-center gap-2 shadow-lg">
                      <RefreshCw size={16}/> Reinicio de Fábrica Profundo
                    </button>
                 </div>
              
                <div className="bg-teal-50 dark:bg-slate-950 p-4 rounded-xl border border-teal-100 dark:border-slate-800 mt-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-bold text-gray-800 dark:text-slate-200">Ahorro de Datos</span>
                    <input type="checkbox" checked={dataSaverMode} onChange={(e) => setDataSaverMode(e.target.checked)} className="w-5 h-5 text-teal-600 dark:text-teal-400 rounded" />
                  </div>
                  <p className="text-xs text-gray-500 dark:text-slate-400">Desactiva precarga de imágenes y uso de voces remotas (TTS).</p>
                </div>
                <div className="bg-green-50 dark:bg-slate-950 p-4 rounded-xl border border-green-100 dark:border-slate-800 mt-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-bold text-gray-800 dark:text-slate-200">Ahorro de Batería</span>
                    <input type="checkbox" checked={batterySaverMode} onChange={(e) => setBatterySaverMode(e.target.checked)} className="w-5 h-5 text-green-600 dark:text-green-400 rounded" />
                  </div>
                  <p className="text-xs text-gray-500 dark:text-slate-400">Reduce animaciones y deshabilita efectos visuales pesados.</p>
                </div>
                <div className="bg-blue-50 dark:bg-slate-950 p-4 rounded-xl border border-blue-100 dark:border-slate-800 mt-4">
                  <span className="font-bold text-gray-800 dark:text-slate-200 block mb-2">Exportar / Respaldo</span>
                  <button onClick={() => {
                    const data = { 
                      stats: JSON.parse(localStorage.getItem('lisa_stats')||'{}'),
                      settings: JSON.parse(localStorage.getItem('lisa_settings')||'{}'),
                      completed: JSON.parse(localStorage.getItem('lisa_completed_ex')||'[]'),
                      learned: JSON.parse(localStorage.getItem('lisa_learned_ex')||'[]'),
                      history: JSON.parse(localStorage.getItem('lisa_history')||'[]')
                    };
                    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
                    const url = URL.createObjectURL(blob);
                    const a = document.createElement('a');
                    a.href = url;
                    a.download = 'lisas_quest_backup.json';
                    a.click();
                    URL.revokeObjectURL(url);
                    setToastMsg("Datos exportados exitosamente");
                    setTimeout(() => setToastMsg(null), 3000);
                  }} className="w-full py-2 bg-blue-600 text-white rounded-lg font-bold text-sm shadow hover:bg-blue-700">Descargar Progreso (JSON)</button>
                </div>
                </div>
            )}

            {settingsActiveTab === 'database' && (
              <div className={`space-y-4 transition-all duration-300 ${settingsHeaderVis ? 'h-[calc(100vh-230px)]' : 'h-[calc(100vh-70px)]'} min-h-[400px]`}>
                <DatabaseEditor onNotify={(msg) => showGlobalToast(msg)} darkMode={darkMode} onScroll={handleSettingsScroll} />
              </div>
            )}
          </div>
          
          <div className="p-4 shrink-0 border-t bg-gray-50 dark:bg-slate-900">
            <button onClick={() => setShowSettings(false)} className="w-full py-4 bg-indigo-600 text-white rounded-xl font-bold text-lg active:scale-95 shadow-lg border-b-4 border-indigo-800">
              Guardar y Cerrar
            </button>
          </div>
      </div>
    ); } catch (e) { console.error(e); return <div className="absolute inset-0 z-[9999] bg-white text-black p-10 overflow-auto">{e.message}<br/>{e.stack}</div>; }
  };

  const renderDeepResetConfirmModal = () => {
    return (
      <div className="fixed inset-0 bg-black/80 backdrop-blur-md z-[10000] flex items-center justify-center p-4">
        <div className="bg-red-950/90 rounded-3xl border-4 border-red-500 max-w-sm w-full p-6 shadow-2xl animate-scale-up text-center">
          <div className="bg-red-600 text-white rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4 text-4xl shadow-inner animate-pulse">
            💥
          </div>
          <h3 className="text-2xl font-extrabold text-red-100 mb-2">Reinicio Profundo</h3>
          <p className="text-sm text-red-200 mb-6 font-medium leading-relaxed">
            Esta acción borrará todas las cookies, caché, almacenamiento local y recargará la aplicación por completo. Olvidará absolutamente todo sobre el usuario y volverá a mostrar la bienvenida. ¿Continuar?
          </p>
          <div className="flex flex-col gap-2.5">
            <button 
              onClick={() => {
                localStorage.clear();
                sessionStorage.clear();
                document.cookie.split(";").forEach((c) => {
                  document.cookie = c
                    .replace(/^ +/, "")
                    .replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/");
                });
                window.location.reload();
              }} 
              className="w-full py-4 bg-red-600 text-white hover:bg-red-500 active:scale-95 text-base font-extrabold rounded-2xl shadow-lg border-b-4 border-red-800 transition"
            >
              Sí, Borrar y Reiniciar App
            </button>
            <button 
              onClick={() => setShowDeepResetConfirmModal(false)} 
              className="w-full py-3 bg-slate-800 hover:bg-slate-700 text-white active:scale-95 text-sm font-bold rounded-xl transition"
            >
              Cancelar
            </button>
          </div>
        </div>
      </div>
    );
  };

  const renderResetConfirmModal = () => {
    return (
      <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[10000] flex items-center justify-center p-4">
        <div className="bg-indigo-50/30 dark:bg-slate-900/80 rounded-3xl border-4 border-red-500 max-w-sm w-full p-6 shadow-2xl animate-scale-up text-center">
          <div className="bg-red-100 text-red-500 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 text-3xl shadow-inner">
            ⚠️
          </div>
          <h3 className="text-xl font-extrabold text-red-600 dark:text-red-300 mb-2">¡Cuidado! Acción Permanente</h3>
          <p className="text-sm text-gray-600 dark:text-slate-300 mb-6 font-medium leading-relaxed">
            ¿Estás seguro de que quieres borrar todo tu progreso, estadísticas y temas en Lisa's Quest? Esto volverá la app a su estado de fábrica y no se puede deshacer.
          </p>
          <div className="flex flex-col gap-2.5">
            <button 
              onClick={() => {
                setCompletedExIds([]);
                setLearnedExIds([]);
                setCustomThemes([]);
                setStats({ totalCompleted: 0, correctFirstTry: 0, totalAttempted: 0, skills: { Listening: 0, Reading: 0, Speaking: 0, Writing: 0, Flashcards: 0, Translate: 0 }, lastPlayedDate: new Date().toDateString(), streak: 0, history: {}, tagStats: {} });
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
              className="w-full py-3 bg-gray-100 dark:bg-slate-900 hover:bg-gray-200 text-gray-700 dark:text-slate-300 active:scale-95 text-sm font-bold rounded-xl transition"
            >
              Cancelar
            </button>
          </div>
        </div>
      </div>
    );
  };

  const getPathNodeColor = (type: string, id: string) => {
    if (type === 'year') return 'bg-[#ff9600] border-[#cc7800] text-white';
    if (type === 'source') return 'bg-[#00c39d] border-[#009c7d] text-white';
    if (type === 'theme') return 'bg-[#ce82ff] border-[#a568cc] text-white';
    if (type === 'skill') {
      const baseId = id.includes('::') ? id.split('::')[0] : id;
      const colorMap: Record<string, string> = {
        'Reading': 'bg-emerald-500 border-emerald-700 text-white',
        'Listening': 'bg-blue-500 border-blue-700 text-white',
        'Speaking': 'bg-rose-500 border-rose-700 text-white',
        'Translate': 'bg-sky-500 border-sky-700 text-white',
        'Writing': 'bg-amber-500 border-amber-700 text-white',
        'Flashcards': 'bg-purple-500 border-purple-700 text-white',
        'Conversation': 'bg-teal-500 border-teal-700 text-white',
        'Match': 'bg-indigo-500 border-indigo-700 text-white',
        'Similar': 'bg-orange-500 border-orange-700 text-white',
        'Dictation': 'bg-violet-500 border-violet-700 text-white',
        'Visual': 'bg-cyan-500 border-cyan-700 text-white',
        'Grammar': 'bg-lime-500 border-lime-700 text-white',
        'Vocabulary': 'bg-fuchsia-500 border-fuchsia-700 text-white'
      };
      return colorMap[baseId] || 'bg-[#58cc02] border-[#58a700] text-white';
    }
    return 'bg-[#58cc02] border-[#58a700] text-white';
  };

  const renderCategoryCards = (items: { id: string, name: string, emoji: string, type: 'year' | 'source' | 'theme' | 'skill', exerciseIds: string[], isDoneOverride?: boolean }[], onClick: (id: string) => void) => {
    if (viewMode === 'path') {
      const totalHeight = 48 + items.length * 160;
      let pathD = "";
      let activePathD = "";
      let lastCompletedIdx = -1;
      items.forEach((item, i) => {
        const isDone = item.isDoneOverride !== undefined ? item.isDoneOverride : (item.exerciseIds.length > 0 && item.exerciseIds.every(id => completedExIds.includes(id) || learnedExIds.includes(id)));
        if (isDone) lastCompletedIdx = i;
      });
      const maxActiveIdx = Math.min(items.length - 1, lastCompletedIdx + 1);

      items.forEach((_, i) => {
        const x = 200 + Math.sin((i / items.length) * Math.PI * 4) * 60;
        const y = 72 + i * 160;
        if (i === 0) {
           pathD += `M ${x} ${y} `;
           if (i <= maxActiveIdx) activePathD += `M ${x} ${y} `;
        }
        else {
          const prevX = 200 + Math.sin(((i - 1) / items.length) * Math.PI * 4) * 60;
          const prevY = 72 + (i - 1) * 160;
          const midY = (y + prevY) / 2;
          const curve = `C ${prevX} ${midY}, ${x} ${midY}, ${x} ${y} `;
          pathD += curve;
          if (i <= maxActiveIdx) activePathD += curve;
        }
      });
      return (
        <div className="flex flex-col items-center py-6 w-full max-w-[400px] mx-auto relative col-span-full">
          <svg viewBox={`0 0 400 ${totalHeight}`} width="400" height={totalHeight} className="absolute top-0 left-1/2 -translate-x-1/2 pointer-events-none drop-shadow-sm" style={{ zIndex: 0 }}>
            <style>
              {`
                @keyframes drawPath {
                  0% { stroke-dashoffset: 100; }
                  100% { stroke-dashoffset: 0; }
                }
                .animate-draw-path {
                  animation: drawPath 1.5s ease-out forwards;
                }
              `}
            </style>
            {/* Pista base (inactiva) */}
            <path d={pathD} className="stroke-slate-200 dark:stroke-slate-800" strokeWidth="50" strokeLinejoin="round" strokeLinecap="round" fill="none" />
            <path d={pathD} className="stroke-slate-100 dark:stroke-slate-900" strokeWidth="40" strokeLinejoin="round" strokeLinecap="round" fill="none" />
            
            {/* Pista activa (completada o en curso) */}
            {activePathD && (
              <>
                <path d={activePathD} pathLength="100" className="stroke-yellow-500/30 dark:stroke-yellow-500/20 animate-draw-path" strokeWidth="50" strokeLinejoin="round" strokeLinecap="round" fill="none" strokeDasharray="100" strokeDashoffset="100" />
                <path d={activePathD} pathLength="100" className="stroke-[#ffc800] dark:stroke-[#e5b400] animate-draw-path" strokeWidth="40" strokeLinejoin="round" strokeLinecap="round" fill="none" strokeDasharray="100" strokeDashoffset="100" />
                {/* Highlight central para la pista activa */}
                <path d={activePathD} pathLength="100" className="stroke-yellow-300 dark:stroke-yellow-400 opacity-60 animate-draw-path" strokeWidth="12" strokeLinejoin="round" strokeLinecap="round" fill="none" strokeDasharray="100" strokeDashoffset="100" />
              </>
            )}
          </svg>
          {items.map((item, index) => {
            const isDone = item.isDoneOverride !== undefined ? item.isDoneOverride : (item.exerciseIds.length > 0 && item.exerciseIds.every(id => completedExIds.includes(id) || learnedExIds.includes(id)));
            const xOffset = Math.sin((index / items.length) * Math.PI * 4) * 60;
            return (
              <div key={item.id} className="relative z-10 flex flex-col items-center h-[160px] min-h-[160px] max-h-[160px] shrink-0 justify-start" style={{ transform: `translateX(${xOffset}px)` }}>
                <div className="flex flex-col items-center transition-transform duration-700 ease-in-out hover:scale-105 group">
                  <button 
                    onClick={() => onClick(item.id)}
                    className={`relative w-[96px] h-[96px] rounded-full border-b-[8px] flex flex-col items-center justify-center transition-all duration-200 active:border-b-0 active:translate-y-[8px] shadow-lg hover:brightness-110 ${isDone ? 'bg-[#ffc800] border-[#e5b400] text-white' : getPathNodeColor(item.type, item.id)}`}
                  >
                     <span className="text-4xl drop-shadow-sm">{item.emoji}</span>
                     {isDone && <CheckCircle2 size={26} className="absolute -bottom-2 -right-2 text-white bg-[#58cc02] rounded-full border-4 border-white dark:border-slate-900"/>}
                  </button>
                  <div className="flex items-center gap-1.5 mt-4">
                    <span className="px-3 py-1 bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-700 rounded-xl text-xs font-black text-slate-700 dark:text-slate-200 shadow-sm text-center whitespace-nowrap w-fit">{item.name}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      );
    }

    
    if (viewMode === 'block') {
      return (
        <div className="flex flex-col gap-3 w-full col-span-full">
          {items.map(item => {
            const totalCount = item.exerciseIds.length;
            const completedCount = item.exerciseIds.filter(id => completedExIds.includes(id) || learnedExIds.includes(id)).length;
            const isDone = item.isDoneOverride !== undefined ? item.isDoneOverride : (completedCount === totalCount && totalCount > 0);
            const estSeconds = totalCount * 15;
            const estDurationStr = estSeconds < 60 ? `${estSeconds}s` : `${Math.ceil(estSeconds / 60)} min`;
                      
            const hasPausedSession = Object.keys(activeSessions).some(key => key.startsWith(`${item.id}_`));

            return (
              <div key={item.id} className="flex gap-2 items-stretch w-full">
                <button 
                  onClick={() => onClick(item.id)} 
                  className={`flex-1 p-4 rounded-xl border-2 border-b-4 font-bold text-lg active:translate-y-1 active:border-b-0 flex items-center justify-between transition-all ${isDone ? 'bg-green-500 border-green-700 text-white shadow-lg' : getMixCardStyle(item.type, item.id)}`}
                >
                  <div className="flex flex-col items-start text-left">
                    <div className="flex items-center gap-2">
                      <span className="leading-tight text-base sm:text-lg">{item.name}</span>
                      {isDone && <CheckCircle2 className="text-white" size={20} />}
                    </div>
                    <div className="flex flex-wrap items-center gap-2 mt-1">
                      <span className="text-xs opacity-90 font-medium bg-white/20 px-2 py-0.5 rounded-md">{totalCount} ejercicios</span>
                      <span className="text-xs opacity-90 font-medium bg-black/10 px-2 py-0.5 rounded-md text-white">⏱️ {estDurationStr}</span>
                      {hasPausedSession && <span className="text-xs font-bold bg-white/30 text-white px-2 py-0.5 rounded-md">⏳ En pausa</span>}
                    </div>
                  </div>
                  <span className="text-2xl ml-2">{item.emoji}</span>
                </button>
                <button
                  onClick={() => handleConfigureCustomize(item)}
                  className="px-4 bg-orange-100 hover:bg-orange-200 text-orange-700 dark:bg-orange-950/40 dark:text-orange-300 dark:hover:bg-orange-900/30 border-2 border-b-4 border-orange-200 dark:border-orange-900/50 rounded-xl flex items-center justify-center transition-all cursor-pointer active:translate-y-1 active:border-b-0"
                  title="Personalizar ejercicios de este nivel"
                >
                  <Sliders size={20} />
                </button>
              </div>
            );
          })}
        </div>
      );
    }

    
    if (viewMode === 'gallery') {
      return (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 w-full col-span-full">
          {items.map((item) => {
            const totalCount = item.exerciseIds.length;
            const completedCount = item.exerciseIds.filter(id => completedExIds.includes(id) || learnedExIds.includes(id)).length;
            const isDone = item.isDoneOverride !== undefined ? item.isDoneOverride : (completedCount === totalCount && totalCount > 0);
            const estSeconds = totalCount * 15;
            const estDurationStr = estSeconds < 60 ? `${estSeconds}s` : `${Math.ceil(estSeconds / 60)} min`;
            
            const hasPausedSession = Object.keys(activeSessions).some(key => key.startsWith(`${item.id}_`));

            return (
              <div key={item.id} className="relative group">
                <button
                  onClick={() => onClick(item.id)}
                  className={`w-full aspect-square p-4 rounded-2xl border-2 border-b-[6px] flex flex-col items-center justify-center gap-3 shadow-md hover:shadow-xl transition-all duration-200 active:border-b-0 active:translate-y-[6px] ${isDone ? 'bg-green-500 border-green-700 text-white' : getMixCardStyle(item.type, item.id)}`}
                >
                  <span className="text-5xl drop-shadow-md">{item.emoji}</span>
                  <div className="flex flex-col items-center text-center">
                    <span className="font-extrabold text-sm leading-tight line-clamp-2">{item.name}</span>
                    <div className="flex items-center gap-1.5 mt-2 opacity-90 text-[10px] font-bold bg-black/10 px-2 py-0.5 rounded-full">
                      <span>{totalCount} ej</span>
                      <span>•</span>
                      <span>⏱️ {estDurationStr}</span>
                    </div>
                  </div>
                  {isDone && <CheckCircle2 size={24} className="absolute top-2 right-2 text-white bg-green-600 rounded-full border-2 border-green-400" />}
                  {hasPausedSession && !isDone && <span className="absolute top-2 right-2 text-[10px] bg-amber-500 text-white font-bold px-1.5 py-0.5 rounded-md shadow-sm">⏳</span>}
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleConfigureCustomize(item);
                  }}
                  className="absolute bottom-2 right-2 p-1.5 bg-orange-500 hover:bg-orange-600 text-white rounded-lg shadow-md transition-all active:scale-95 cursor-pointer flex items-center justify-center z-10"
                  title="Personalizar ejercicios de este nivel"
                >
                  <Sliders size={14} />
                </button>
              </div>
            );
          })}
        </div>
      );
    }

    return (
      <div className="w-full flex flex-col gap-4 col-span-full">
        {items.map(item => {
          const totalCount = item.exerciseIds.length;
          const completedCount = item.exerciseIds.filter(id => completedExIds.includes(id) || learnedExIds.includes(id)).length;
          const isDone = item.isDoneOverride !== undefined ? item.isDoneOverride : (completedCount === totalCount && totalCount > 0);
          const estSeconds = totalCount * 15;
const estDurationStr = estSeconds < 60 ? `${estSeconds}s` : `${Math.ceil(estSeconds / 60)} min`;
          
          
          const pool = item.exerciseIds.map(id => dbIndexes.byId.get(id) || { skill: 'Individual' });
          const hasPausedSession = Object.keys(activeSessions).some(key => key.startsWith(`${item.id}_`));

          return (
            <div key={item.id} className={`p-4 rounded-2xl border-2 border-b-4 flex flex-col justify-between shadow-sm hover:shadow-lg transition ${isDone ? 'border-green-300 bg-green-50/50 text-green-900 dark:border-green-700/60 dark:bg-green-950/20 dark:text-green-200' : getCardStyle(item.type)}`}>
              <div className="flex items-start justify-between w-full cursor-pointer" onClick={() => onClick(item.id)}>
                <div className="flex flex-col items-start text-left">
                  <div className="flex items-center gap-2">
                    <span className="leading-tight text-base font-extrabold sm:text-lg">{item.name}</span> 
                    {isDone && <CheckCircle2 className="text-green-500 flex-shrink-0" size={18} />}
                  </div>
                  {viewMode === 'card' ? (
                    <div className="flex flex-wrap items-center gap-2 mt-1.5">
                      <span className="text-[11px] px-2 py-0.5 rounded-md bg-indigo-100/60 dark:bg-slate-700 text-indigo-800 dark:text-indigo-200 font-bold">{totalCount} ejercicios</span>
                      <span className="text-[11px] px-2 py-0.5 rounded-md bg-amber-100/60 dark:bg-slate-700 text-amber-800 dark:text-amber-200 font-bold">⏱️ {estDurationStr}</span>
                      {hasPausedSession && <span className="text-[11px] px-2 py-0.5 rounded-md bg-green-100 dark:bg-green-950/20 text-green-800 dark:text-green-300 font-bold">⏳ En pausa</span>}
                    </div>
                  ) : (
                    <div className="flex items-center gap-2 mt-1">
                       <span className="text-[10px] font-bold opacity-70">⏱️ {estDurationStr}</span>
                       {hasPausedSession && <span className="text-[10px] text-green-600 font-bold">⏳ Pausa</span>}
                    </div>
                  )}
                </div>
                {viewMode === 'card' && <span className="text-3xl flex-shrink-0 ml-2">{item.emoji}</span>}
              </div>

              {viewMode === 'card' && (
                <div className="flex gap-1.5 mt-3 text-xs opacity-80 flex-wrap w-full">
                  {[...new Set(pool.map(ex => ex.skill || 'Individual'))].map(sk => {
                    const count = pool.filter(ex => (ex.skill || 'Individual') === sk).length;
                    if (count === 0) return null;
                    const icon = SKILL_ICONS[sk] || <BookOpen size={11} />;
                    const label = SKILL_LABELS[sk] || sk;
                    const clonedIcon = React.isValidElement(icon) ? React.cloneElement(icon as any, { size: 11, className: "shrink-0" }) : icon;
                    return (
                      <span key={sk} className="flex items-center gap-1 px-1.5 py-0.5 bg-indigo-50/70 dark:bg-black/20 rounded-md font-bold text-[10px] shadow-sm text-indigo-950 dark:text-indigo-200 border border-indigo-100 dark:border-slate-800/30" title={`${label}: ${count} ejercicios`}>
                        {clonedIcon}
                        <span>{count}</span>
                      </span>
                    );
                  })}

                  {selectedUnit && (
                    <>
                      <span className="text-indigo-300 dark:text-slate-600 font-normal">/</span>
                      <span className="text-xs sm:text-sm text-pink-600 dark:text-pink-400 font-black flex items-center gap-1.5">
                        📦 {selectedUnit === 'Indefinido' ? 'Unidad Indefinida' : selectedUnit}
                      </span>
                    </>
                  )}
                </div>
              )}

              <div className="flex items-center gap-1.5 mt-4 pt-3 border-t border-indigo-100 dark:border-slate-800/30 dark:border-slate-700/50 w-full animate-fadeIn">
                <button 
                  onClick={() => onClick(item.id)}
                  className={`flex-1 py-2 px-2.5 rounded-xl font-bold text-xs flex items-center justify-center gap-1 border-b-2 transition active:scale-95 ${isDone ? 'bg-green-500 hover:bg-green-600 text-white border-green-700' : 'bg-indigo-600 hover:bg-indigo-700 text-white border-indigo-800'}`}
                >
                  <Play size={11} className="fill-current" /> Explorar
                </button>
                <button 
                  onClick={() => startCategory(item.id)}
                  className="p-2 bg-indigo-50/30 dark:bg-slate-900 hover:bg-cyan-50 dark:hover:bg-slate-700 border border-cyan-200 dark:border-cyan-700 dark:border-slate-700 text-cyan-700 dark:text-cyan-300 dark:text-cyan-300 rounded-xl transition active:scale-95"
                  title="Practicar todo"
                >
                  <PlayCircle size={14} />
                </button>
                <button 
                  onClick={() => handleConfigureCustomize(item)}
                  className="p-2 bg-indigo-50/30 dark:bg-slate-900 hover:bg-orange-50 dark:hover:bg-slate-700 border border-orange-200 dark:border-orange-800 dark:border-slate-700 text-orange-700 dark:text-orange-450 rounded-xl transition active:scale-95 flex items-center justify-center"
                  title="Personalizar ejercicios de este nivel"
                >
                  <Sliders size={14} />
                </button>
                <button 
                  onClick={() => {
                    setStatsCategoryFilter(item.id);
                    setCurrentScreen('stats');
                  }}
                  className="p-2 bg-indigo-50/30 dark:bg-slate-900 hover:bg-teal-50 dark:hover:bg-slate-700 border border-teal-200 dark:border-teal-800 dark:border-slate-700 text-teal-700 dark:text-teal-300 rounded-xl transition active:scale-95"
                  title="Ver estadísticas"
                >
                  <BarChart2 size={14} />
                </button>
                <button 
                  onClick={() => {
                    setCompletedExIds(prev => [...new Set([...prev, ...item.exerciseIds])]);
                    setToastMsg(`¡${item.name} completado! 🎉`);
                  }}
                  className="p-2 bg-indigo-50/30 dark:bg-slate-900 hover:bg-green-50 dark:bg-green-950/20 dark:hover:bg-slate-700 border border-green-200 dark:border-green-900/50 dark:border-slate-700 text-green-700 dark:text-green-300 rounded-xl transition active:scale-95"
                  title="Marcar todo como completado"
                >
                  <CheckCircle2 size={14} />
                </button>
                <button 
                  onClick={() => {
                    setCompletedExIds(prev => prev.filter(id => !item.exerciseIds.includes(id)));
                    const baseIds = item.exerciseIds.map(id => {
                      const ex = dbIndexes.byId.get(id);
                      return ex?.baseId || ex?.id || id;
                    });
                    setLearnedExIds(prev => prev.filter(id => !baseIds.includes(id)));
                    const updatedSessions = { ...activeSessions };
                    Object.keys(updatedSessions).forEach(key => {
                      if (key.startsWith(`${item.id}_`)) delete updatedSessions[key];
                    });
                    setActiveSessions(updatedSessions);
                    setToastMsg(`¡${item.name} reiniciado!`);
                  }}
                  className="p-2 bg-indigo-50/30 dark:bg-slate-900 hover:bg-rose-50 dark:hover:bg-slate-700 border border-rose-200 dark:border-slate-700 text-rose-700 dark:text-rose-300 rounded-xl transition active:scale-95"
                  title="Reiniciar progreso"
                >
                  <RefreshCw size={14} />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  let containerClasses = "bg-slate-50 dark:bg-slate-950 shadow-2xl h-full flex flex-col overflow-hidden relative mx-auto transition-all duration-300";
  if (deviceView === 'mobile') {
    containerClasses += " w-[375px] max-h-[812px] my-auto rounded-[2rem] border-[12px] border-slate-800 dark:border-slate-700";
  } else if (deviceView === 'tablet') {
    containerClasses += " w-[768px] max-h-[1024px] my-auto rounded-[2rem] border-[12px] border-slate-800 dark:border-slate-700";
  } else if (deviceView === 'pc') {
    containerClasses += " w-[1280px] max-h-[800px] my-auto rounded-[1rem] border-8 border-slate-800 dark:border-slate-700";
  } else {
    containerClasses += " w-[clamp(320px,100vw,100vw)] md:w-[clamp(320px,98vw,1600px)]";
  }

  return (
    <div className={`h-[100dvh] w-[100dvw] ${batterySaverMode ? "battery-saver" : ""}  bg-slate-200 dark:bg-black font-sans text-gray-800 dark:text-slate-200 flex justify-center overflow-hidden`}>
      <div className={containerClasses} style={{ zoom: zoomLevel }}>
        {showParentalGate && renderParentalGateModal()}
        {showWelcome && (
          <div className="fixed inset-0 bg-black/60 z-[10000] flex items-center justify-center p-4">
            <div className="bg-white dark:bg-slate-900 border-4 border-indigo-200 dark:border-slate-800 rounded-3xl p-8 w-full max-w-sm shadow-2xl relative animate-slide-up flex flex-col items-center text-center">
              <img src="/characters/Vera_Colibrí_saying_hello_202607131416.png" alt="Vera" className="w-40 h-40 object-contain drop-shadow-2xl mb-4 animate-bounce" onError={(e) => { e.currentTarget.style.display="none"; }} />
              <h2 className="text-3xl font-black text-indigo-900 dark:text-indigo-200 mb-2">¡Hola Lisa!</h2>
              <p className="text-lg text-slate-700 dark:text-slate-300 font-bold mb-6">Soy Vera, tu guía en esta aventura de aprendizaje. ¡Vamos a descubrir juntas!</p>
              <button onClick={() => { setShowWelcome(false); localStorage.setItem('lisa_welcome_seen', 'true'); }} className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-lg py-3 rounded-2xl shadow-lg transition transform active:scale-95">¡Empezar!</button>
            </div>
          </div>
        )}
        {showTutorial && !showWelcome && (
          <div className="fixed inset-0 bg-indigo-900/80 z-[9900] flex items-center justify-center p-4" onClick={() => { setShowTutorial(false); localStorage.setItem('lisa_tutorial_seen', 'true'); }}>
            <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 w-full max-w-md shadow-2xl relative animate-slide-up" onClick={e => e.stopPropagation()}>
              <h2 className="text-2xl font-black text-indigo-900 dark:text-indigo-200 mb-4 flex items-center gap-2"><span>🧭</span> Guía Rápida</h2>
              <div className="flex items-start gap-3 mb-4 bg-indigo-50/50 dark:bg-slate-800/30 p-4 rounded-2xl border border-indigo-100 dark:border-slate-800">
                <img src="/characters/Vera_Colibrí_saying_hello_202607131416__1.png" alt="Vera" className="w-16 h-16 object-contain drop-shadow-md" onError={(e) => { e.currentTarget.style.display="none"; }} />
                <p className="text-sm text-slate-700 dark:text-slate-300 font-bold leading-relaxed flex-1">
                  ¡Hola! Soy Vera. Aquí tienes algunos consejos rápidos para aprovechar al máximo tu experiencia de aprendizaje.
                </p>
              </div>
              <ul className="space-y-4 text-sm font-bold text-slate-700 dark:text-slate-300">
                <li className="flex items-start gap-3"><span className="text-2xl">🔍</span> <p>Usa el <strong>Buscador</strong> para encontrar temas rápidos.</p></li>
                <li className="flex items-start gap-3"><span className="text-2xl">☰</span> <p>El <strong>Menú Principal</strong> (arriba a la derecha) te permite navegar entre Estadísticas, Ajustes y Temas.</p></li>
                <li className="flex items-start gap-3"><span className="text-2xl">⚙️</span> <p>Personaliza tus ejercicios creando tus propios temas en el creador.</p></li>
                <li className="flex items-start gap-3"><span className="text-2xl">📈</span> <p>Revisa tu evolución en la pantalla de Estadísticas.</p></li>
              </ul>
              <button onClick={() => { setShowTutorial(false); localStorage.setItem('lisa_tutorial_seen', 'true'); }} className="w-full mt-6 bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 rounded-2xl shadow-md transition">¡Entendido!</button>
            </div>
          </div>
        )}
        {showSettings && renderSettingsModal()}
        {showResetConfirmModal && renderResetConfirmModal()}
        {showDeepResetConfirmModal && renderDeepResetConfirmModal()}
        
        {showMotivation && (
          <div className="fixed top-24 left-1/2 transform -translate-x-1/2 z-[9000] bg-gradient-to-r from-amber-400 to-orange-500 text-white px-6 py-4 rounded-3xl font-extrabold shadow-2xl animate-bounce text-center border-4 border-white dark:border-slate-800 max-w-[90%] w-max flex items-center gap-3">
            <span className="text-3xl">🔥</span>
            <span>¡Mantén tu racha viva! Practica un poco hoy.</span>
          </div>
        )}

        {toastMsg && (
          <div 
            onClick={() => setToastMsg(null)}
            className="fixed top-8 left-1/2 transform -translate-x-1/2 z-[99999] bg-slate-900/95 dark:bg-slate-950/95 text-white px-5 py-3.5 rounded-2xl font-bold shadow-2xl animate-slide-down-toast text-center border-2 border-slate-700/80 dark:border-indigo-500/50 max-w-[90%] w-max flex items-center gap-3 cursor-pointer hover:scale-105 active:scale-95 transition-all select-none"
          >
            <span className="text-lg">✨</span>
            <span className="text-xs sm:text-sm font-black tracking-tight">{toastMsg}</span>
            <span className="ml-1 bg-slate-800/80 hover:bg-slate-700/80 rounded-full w-5 h-5 flex items-center justify-center text-[10px] font-black text-slate-300 transition-colors shrink-0">
              ✕
            </span>
          </div>
        )}

        <header className="bg-gradient-to-r from-purple-500 to-pink-500 p-4 shrink-0 text-white flex justify-between items-center shadow-md z-40 w-full relative">
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-bold flex items-center gap-2"><Star className="text-yellow-300 fill-current size-5" /> Lisa's Quest</h1>
            {isOffline && <span className="bg-red-500/80 text-white text-[10px] px-1.5 py-0.5 rounded-md font-bold flex items-center gap-1"><WifiOff size={10} /> Sin Conexión</span>}
            {!isOffline && lastSyncStatus && <span className="bg-green-500/80 text-white text-[10px] px-1.5 py-0.5 rounded-md font-bold flex items-center gap-1 animate-pulse"><CheckCircle2 size={10} /> {lastSyncStatus}</span>}
          </div>
          <div className="flex gap-2 items-center">
            {/* Zoom Controls */}
            <div className="flex items-center gap-1 bg-white/15 px-2.5 py-1 rounded-full text-white text-xs font-bold shrink-0">
              <button 
                onClick={() => setZoomLevel(prev => Math.max(0.7, prev - 0.1))} 
                className="hover:bg-white/20 p-1 rounded-full transition-colors"
                title="Reducir zoom (Zoom Out)"
              >
                <ZoomOut size={15} strokeWidth={2.5} />
              </button>
              <button 
                onClick={() => setZoomLevel(1.0)} 
                className="px-1 hover:underline min-w-[34px] text-center" 
                title="Restablecer zoom a 100%"
              >
                {Math.round(zoomLevel * 100)}%
              </button>
              <button 
                onClick={() => setZoomLevel(prev => Math.min(1.5, prev + 0.1))} 
                className="hover:bg-white/20 p-1 rounded-full transition-colors"
                title="Aumentar zoom (Zoom In)"
              >
                <ZoomIn size={15} strokeWidth={2.5} />
              </button>
            </div>

            {/* Dark Mode Toggle */}
            <button 
              onClick={() => setDarkMode(!darkMode)} 
              className="flex items-center justify-center w-10 h-10 bg-white/15 rounded-full hover:bg-white/35 transition-colors" 
              title={darkMode ? "Modo Claro" : "Modo Oscuro"}
            >
              {darkMode ? <Sun size={20} strokeWidth={2.5} /> : <Moon size={20} strokeWidth={2.5} />}
            </button>

            {/* Unified Main Menu Dropdown */}
            <div className="relative">
              <button 
                onClick={() => setIsMainMenuOpen(!isMainMenuOpen)} 
                className="flex items-center justify-center w-10 h-10 bg-white/15 rounded-full hover:bg-white/35 transition-colors text-white" 
                title="Menú Principal"
              >
                <AlignJustify size={20} strokeWidth={2.5} />
              </button>
              
              <AnimatePresence>
                {isMainMenuOpen && (
                  <>
                    {/* Background overlay to close menu when clicking outside */}
                    <div 
                      className="fixed inset-0 z-45" 
                      onClick={() => setIsMainMenuOpen(false)} 
                    />
                    
                    <motion.div 
                      initial={{ opacity: 0, y: -10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -10, scale: 0.95 }}
                      className="absolute right-0 mt-2 bg-white dark:bg-slate-900 text-gray-800 dark:text-slate-100 p-3 rounded-3xl shadow-2xl flex flex-col gap-3.5 border border-slate-200 dark:border-slate-800 origin-top-right z-50 w-72 max-h-[80vh] overflow-y-auto"
                    >
                      {/* Section 1: Navigation Screens */}
                      <div>
                        <div className="px-2 pb-1 text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider text-left border-b border-slate-100 dark:border-slate-800 mb-1.5">
                          Secciones
                        </div>
                        <div className="flex flex-col gap-1">
                          <button 
                            onClick={() => { setCurrentScreen('home'); setIsMainMenuOpen(false); }}
                            className={`p-2 rounded-xl transition flex items-center gap-3 w-full text-left ${currentScreen === 'home' ? 'bg-indigo-500 text-white shadow-md' : 'hover:bg-slate-100 dark:hover:bg-slate-850 text-gray-700 dark:text-slate-300'}`}
                          >
                            <Home size={16} />
                            <span className="text-xs font-bold">Inicio / Aventuras</span>
                          </button>
                          
                          <button 
                            onClick={() => { 
                              setCustomizeYearFilter([]);
                              setCustomizeSourceFilter([]);
                              setCustomizeThemeFilter([]);
                              setCustomizeSkillsFilter([]);
                              setCurrentScreen('customize'); 
                              setIsMainMenuOpen(false);
                            }}
                            className={`p-2 rounded-xl transition flex items-center gap-3 w-full text-left ${currentScreen === 'customize' ? 'bg-indigo-500 text-white shadow-md' : 'hover:bg-slate-100 dark:hover:bg-slate-850 text-gray-700 dark:text-slate-300'}`}
                          >
                            <Sliders size={16} />
                            <span className="text-xs font-bold">Personalizar Ejercicios</span>
                          </button>
                          
                          <button 
                            onClick={() => { setStatsCategoryFilter(null); setCurrentScreen('stats'); setIsMainMenuOpen(false); }}
                            className={`p-2 rounded-xl transition flex items-center gap-3 w-full text-left ${currentScreen === 'stats' ? 'bg-indigo-500 text-white shadow-md' : 'hover:bg-slate-100 dark:hover:bg-slate-850 text-gray-700 dark:text-slate-300'}`}
                          >
                            <BarChart2 size={16} />
                            <span className="text-xs font-bold">Estadísticas y Progreso</span>
                          </button>
                          
                          <button 
                            onClick={() => { openParentalGate(); setIsMainMenuOpen(false); }}
                            className="p-2 rounded-xl transition flex items-center gap-3 w-full text-left hover:bg-slate-100 dark:hover:bg-slate-850 text-gray-700 dark:text-slate-300"
                          >
                            <Settings size={16} />
                            <span className="text-xs font-bold">Ajustes de Padres (Seguridad)</span>
                          </button>
                        </div>
                      </div>

                      {/* Section 2: View Modes (as a dedicated submenu/section inside) */}
                      <div>
                        <div className="px-2 pb-1 text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider text-left border-b border-slate-100 dark:border-slate-800 mb-1.5">
                          Modos de Vista
                        </div>
                        <div className="grid grid-cols-1 gap-1">
                          <button 
                            onClick={() => { setViewMode('path'); setIsMainMenuOpen(false); }}
                            className={`p-2 rounded-xl transition flex items-center gap-3 w-full text-left ${viewMode === 'path' ? 'bg-purple-600 text-white shadow-md' : 'hover:bg-slate-100 dark:hover:bg-slate-850 text-gray-700 dark:text-slate-300'}`}
                          >
                            <MapIcon size={16} />
                            <span className="text-xs font-bold">Ruta de Aprendizaje</span>
                          </button>
                          <button 
                            onClick={() => { setViewMode('list'); setIsMainMenuOpen(false); }}
                            className={`p-2 rounded-xl transition flex items-center gap-3 w-full text-left ${viewMode === 'list' ? 'bg-purple-600 text-white shadow-md' : 'hover:bg-slate-100 dark:hover:bg-slate-850 text-gray-700 dark:text-slate-300'}`}
                          >
                            <Layers size={16} />
                            <span className="text-xs font-bold">Lista Detallada</span>
                          </button>
                          <button 
                            onClick={() => { setViewMode('card'); setIsMainMenuOpen(false); }}
                            className={`p-2 rounded-xl transition flex items-center gap-3 w-full text-left ${viewMode === 'card' ? 'bg-purple-600 text-white shadow-md' : 'hover:bg-slate-100 dark:hover:bg-slate-850 text-gray-700 dark:text-slate-300'}`}
                          >
                            <Square size={16} />
                            <span className="text-xs font-bold">Tarjeta de Aprendizaje</span>
                          </button>
                          <button 
                            onClick={() => { setViewMode('gallery'); setIsMainMenuOpen(false); }}
                            className={`p-2 rounded-xl transition flex items-center gap-3 w-full text-left ${viewMode === 'gallery' ? 'bg-purple-600 text-white shadow-md' : 'hover:bg-slate-100 dark:hover:bg-slate-850 text-gray-700 dark:text-slate-300'}`}
                          >
                            <Grid size={16} />
                            <span className="text-xs font-bold">Galería Compacta</span>
                          </button>
                          <button 
                            onClick={() => { setViewMode('block'); setIsMainMenuOpen(false); }}
                            className={`p-2 rounded-xl transition flex items-center gap-3 w-full text-left ${viewMode === 'block' ? 'bg-purple-600 text-white shadow-md' : 'hover:bg-slate-100 dark:hover:bg-slate-850 text-gray-700 dark:text-slate-300'}`}
                          >
                            <AlignJustify size={16} />
                            <span className="text-xs font-bold">Bloques Mix</span>
                          </button>
                        </div>
                      </div>

                      {/* Section 3: Device view simulation */}
                      <div>
                        <div className="px-2 pb-1 text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider text-left border-b border-slate-100 dark:border-slate-800 mb-1.5">
                          Simular Pantalla
                        </div>
                        <div className="grid grid-cols-2 gap-1">
                          <button 
                            onClick={() => { setDeviceView('fluid'); setIsMainMenuOpen(false); }}
                            className={`p-2 rounded-xl transition flex flex-col items-center justify-center gap-1.5 text-center ${deviceView === 'fluid' ? 'bg-emerald-600 text-white shadow-md' : 'hover:bg-slate-100 dark:hover:bg-slate-850 text-gray-700 dark:text-slate-300'}`}
                          >
                            <Maximize size={16} />
                            <span className="text-[10px] font-bold">Fluida</span>
                          </button>
                          <button 
                            onClick={() => { setDeviceView('mobile'); setIsMainMenuOpen(false); }}
                            className={`p-2 rounded-xl transition flex flex-col items-center justify-center gap-1.5 text-center ${deviceView === 'mobile' ? 'bg-emerald-600 text-white shadow-md' : 'hover:bg-slate-100 dark:hover:bg-slate-850 text-gray-700 dark:text-slate-300'}`}
                          >
                            <Smartphone size={16} />
                            <span className="text-[10px] font-bold">Celular</span>
                          </button>
                          <button 
                            onClick={() => { setDeviceView('tablet'); setIsMainMenuOpen(false); }}
                            className={`p-2 rounded-xl transition flex flex-col items-center justify-center gap-1.5 text-center ${deviceView === 'tablet' ? 'bg-emerald-600 text-white shadow-md' : 'hover:bg-slate-100 dark:hover:bg-slate-850 text-gray-700 dark:text-slate-300'}`}
                          >
                            <Tablet size={16} />
                            <span className="text-[10px] font-bold">Tablet</span>
                          </button>
                          <button 
                            onClick={() => { setDeviceView('pc'); setIsMainMenuOpen(false); }}
                            className={`p-2 rounded-xl transition flex flex-col items-center justify-center gap-1.5 text-center ${deviceView === 'pc' ? 'bg-emerald-600 text-white shadow-md' : 'hover:bg-slate-100 dark:hover:bg-slate-850 text-gray-700 dark:text-slate-300'}`}
                          >
                            <Monitor size={16} />
                            <span className="text-[10px] font-bold">PC</span>
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  </>
                )}
              </AnimatePresence>
            </div>
          </div>
        </header>

        {currentScreen === 'home' && (
          <div className="flex-1 p-[clamp(1rem,3vw,2rem)] flex flex-col items-center overflow-y-auto w-full max-w-[clamp(320px,95vw,1400px)] mx-auto">
            
             {/* Streak Milestone Widget */}
            {stats.streak > 0 && (
              <motion.div 
                initial={{ opacity: 0, y: -20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                className="w-full mb-6 relative overflow-hidden rounded-3xl border border-indigo-100 dark:border-slate-850 shadow-lg bg-gradient-to-r from-amber-500 via-orange-500 to-red-500 text-white p-6 shrink-0"
              >
                {/* Decorative glowing particles background */}
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.15),transparent_50%)] pointer-events-none" />
                <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-white/5 rounded-full blur-2xl pointer-events-none animate-pulse" />

                {/* Magical floating particles for milestones */}
                {stats.streak >= 7 && (
                  <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    {[...Array(6)].map((_, i) => (
                      <motion.span
                        key={i}
                        className="absolute text-lg select-none"
                        style={{
                          left: `${15 + i * 15}%`,
                          bottom: `-20px`,
                        }}
                        animate={{
                          y: [-20, -150],
                          opacity: [0, 1, 0],
                          scale: [0.6, 1.3, 0.6],
                          rotate: [0, 360]
                        }}
                        transition={{
                          duration: 4 + i,
                          repeat: Infinity,
                          delay: i * 0.7,
                          ease: "easeOut"
                        }}
                      >
                        {stats.streak >= 30 ? "👑" : "⭐"}
                      </motion.span>
                    ))}
                  </div>
                )}

                <div className="relative z-10 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="flex items-center gap-4 text-center sm:text-left flex-col sm:flex-row">
                    {/* Animated Streak Fire Icon */}
                    <motion.div 
                      animate={{ 
                        scale: [1, 1.12, 1],
                        rotate: [0, 4, -4, 0]
                      }}
                      transition={{ 
                        repeat: Infinity, 
                        duration: stats.streak >= 30 ? 1 : (stats.streak >= 7 ? 1.8 : 2.5),
                        ease: "easeInOut" 
                      }}
                      className="p-3 bg-white/20 backdrop-blur-md rounded-2xl relative shadow-inner"
                    >
                      <span className="text-4xl filter drop-shadow-[0_2px_8px_rgba(0,0,0,0.2)] select-none">🔥</span>
                      {stats.streak >= 30 ? (
                        <span className="absolute -top-2 -right-2 text-xl select-none">👑</span>
                      ) : stats.streak >= 7 ? (
                        <span className="absolute -top-2 -right-2 text-xl select-none">⭐</span>
                      ) : null}
                    </motion.div>
                    
                    <div>
                      <div className="flex items-baseline justify-center sm:justify-start gap-1.5">
                        <span className="text-3xl font-black tracking-tight">{stats.streak}</span>
                        <span className="text-xs font-bold text-orange-100">
                          {stats.streak === 1 ? 'DÍA CONSECUTIVO' : 'DÍAS CONSECUTIVOS'}
                        </span>
                      </div>
                      <p className="text-xs md:text-sm text-orange-50 font-medium mt-1 leading-relaxed">
                        {stats.streak >= 30 ? (
                          <span className="font-extrabold text-yellow-200">👑 ¡Hito de 30 días alcanzado! ¡Eres una leyenda absoluta de la práctica diaria!</span>
                        ) : stats.streak >= 7 ? (
                          <span className="font-extrabold text-yellow-100">⭐ ¡Hito de 7 días alcanzado! Sigue así, estás construyendo un hábito extraordinario.</span>
                        ) : (
                          <span>¡Continúa practicando todos los días para mantener viva tu racha de aprendizaje!</span>
                        )}
                      </p>
                    </div>
                  </div>

                  {/* Special milestone badge with pulse */}
                  {(stats.streak >= 7 || stats.streak >= 30) && (
                    <motion.div 
                      animate={{ 
                        boxShadow: ["0 0 0 0px rgba(255,255,255,0.4)", "0 0 0 12px rgba(255,255,255,0)"]
                      }}
                      transition={{ repeat: Infinity, duration: 2.0 }}
                      className="px-4 py-2 bg-white/25 backdrop-blur-md rounded-full border border-white/30 text-[10px] font-black tracking-wider uppercase flex items-center gap-1.5 shadow-md shrink-0"
                    >
                      <span>🏆</span> {stats.streak >= 30 ? "Leyenda (30 Días)" : "Hito de 7 Días"}
                    </motion.div>
                  )}
                </div>
              </motion.div>
            )}

            

            <h2 className="text-2xl font-bold mb-4 text-indigo-800 dark:text-indigo-200 text-center w-full">
              {!selectedYear ? 'Elige un Año 📅' : (!selectedSource ? 'Elige una Fuente 📁' : 'Elige un Tema 📚')}
            </h2>

            <div className="flex flex-col gap-3 w-full pb-8">

              
              

              <button onClick={() => { startCategory('ByPhrase'); setPhraseSearch(''); }} className="p-4 mb-2 rounded-xl border-2 border-b-4 border-cyan-300 dark:border-cyan-800 bg-gradient-to-r from-cyan-50 to-blue-50 dark:from-cyan-900/40 dark:to-blue-900/40 font-bold text-lg active:translate-y-1 active:border-b-0 flex items-center justify-between shadow-sm">
                 <div className="flex flex-col items-start">
                   <span className="text-cyan-900 dark:text-cyan-100">🔤 Modo: Palabra por Palabra</span>
                   <span className="text-xs text-cyan-700 dark:text-cyan-300 bg-indigo-50/50 dark:bg-slate-900/80 px-2 py-1 rounded-full mt-1 border border-cyan-200 dark:border-cyan-700">Domina una frase con todos sus ejercicios</span>
                 </div>
                 <span className="text-3xl">🔍</span>
              </button>

              {validMistakes.length > 0 && (
              <div className="w-full bg-indigo-50/30 dark:bg-red-900/20 border-2 border-red-200 dark:border-red-800 border-b-4 rounded-2xl p-5 mb-6 relative overflow-hidden shadow-sm shrink-0 flex flex-col">
                <button 
                  onClick={() => setShowMistakesWidget(!showMistakesWidget)} 
                  className="relative z-10 flex items-center justify-between w-full text-left focus:outline-none"
                >
                  <div className="flex flex-col">
                    <h3 className="text-lg font-bold text-red-800 dark:text-red-400 flex items-center gap-2">
                      <span className="text-xl">🚨</span> Errores por repasar ({validMistakes.length})
                    </h3>
                    <p className="text-sm text-red-600 dark:text-red-300 font-medium mt-1">
                      Practica lo que fallaste para dominarlo.
                    </p>
                  </div>
                  <div className="bg-red-100 dark:bg-red-900/50 p-2 rounded-full text-red-600 dark:text-red-400 shrink-0">
                    {showMistakesWidget ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                  </div>
                </button>
                {showMistakesWidget && (
                  <div className="mt-4 animate-slide-up">
                    <button 
                      onClick={startMistakesReview} 
                      className="w-full py-3 bg-red-500 hover:bg-red-600 text-white rounded-xl font-bold active:scale-95 border-b-4 border-red-700 active:border-b-0 active:translate-y-1 flex items-center justify-center gap-2 transition"
                    >
                      {activeSessions['mistakes'] ? (
                        <><Play size={18} className="fill-current"/> Continuar Repaso ({activeSessions['mistakes'].currentIndex + 1}/{activeSessions['mistakes'].queue.length})</>
                      ) : (
                        <><AlertCircle size={18} /> Repasar Ahora</>
                      )}
                    </button>
                  </div>
                )}
              </div>
            )}
              {(() => {
                const learnedPoolSize = getCategoryPool('Learned').length;
                if (learnedPoolSize === 0) return null;
                return (
                  <button onClick={() => startCategory('Learned')} className="p-4 mb-2 rounded-xl border-2 border-b-4 border-fuchsia-300 dark:border-fuchsia-800 bg-gradient-to-r from-fuchsia-50 to-pink-50 dark:from-fuchsia-900/40 dark:to-pink-900/40 font-bold text-lg active:translate-y-1 active:border-b-0 flex items-center justify-between shadow-sm mt-4">
                     <div className="flex flex-col items-start">
                       <span className="text-fuchsia-900 dark:text-fuchsia-100">🧠 Repaso de Aprendidos</span>
                       <span className="text-xs text-fuchsia-700 dark:text-fuchsia-300 bg-indigo-50/50 dark:bg-slate-900/80 px-2 py-1 rounded-full mt-1 border border-fuchsia-200 dark:border-fuchsia-700">{learnedPoolSize} ejercicios dominados</span>
                     </div>
                     <span className="text-3xl">🎓</span>
                  </button>
                );
              })()}

              {(showCompleted || !isCatCompleted('All')) && (
                <button onClick={() => startCategory('All')} className={`p-4 rounded-xl border-2 border-b-4 font-bold text-lg active:translate-y-1 active:border-b-0 flex items-center justify-between ${isCatCompleted('All') ? 'bg-green-500 border-green-700 text-white shadow-lg' : 'bg-gradient-to-r from-yellow-400 to-orange-400 border-orange-500 text-white shadow-lg'}`} title="Practicar todo mezclado">
                  <div className="flex flex-col items-start">
                    <div className="flex items-center gap-2">
                      <span>Toda la carpeta (Mix)</span>
                      {isCatCompleted('All') && <CheckCircle2 className="text-white" size={20} />}
                    </div>
                    {Object.keys(activeSessions).some(k => k.startsWith('All_')) && <span className="text-xs bg-indigo-50/30 px-2 py-1 rounded-full mt-1">⏳ Tienes pausas aquí</span>}
                  </div>
                  <span className="text-2xl">🌪️</span>
                </button>
              )}

              {/* Breadcrumbs for Tree Navigation */}
              {(selectedYear || selectedSource || selectedUnit) && (
                <div className="w-full flex items-center flex-wrap gap-2 mb-6 bg-indigo-50/50 dark:bg-slate-850/40 p-3.5 rounded-2xl border border-indigo-100 dark:border-slate-800/50 dark:border-slate-700/50 text-sm font-bold text-indigo-700 dark:text-indigo-300 shadow-sm">
                  <button 
                    onClick={() => { setSelectedYear(null); setSelectedSource(null); setSelectedUnit(null); }}
                    className="hover:text-indigo-900 dark:text-indigo-200 dark:hover:text-white transition flex items-center gap-1.5 text-xs sm:text-sm font-black"
                  >
                    🏠 Inicio
                  </button>
                  {selectedYear && (
                    <>
                      <span className="text-indigo-300 dark:text-slate-600 font-normal">/</span>
                      <button 
                        onClick={() => { setSelectedSource(null); setSelectedUnit(null); }}
                        className="hover:text-indigo-900 dark:text-indigo-200 dark:hover:text-white transition flex items-center gap-1.5 text-xs sm:text-sm text-indigo-600 dark:text-indigo-300 dark:text-indigo-400 font-extrabold"
                      >
                        📅 Año {selectedYear}
                      </button>
                    </>
                  )}
                  {selectedSource && (
                    <>
                      <span className="text-indigo-300 dark:text-slate-600 font-normal">/</span>
                      <button onClick={() => setSelectedUnit(null)} className="hover:text-purple-900 dark:text-purple-400 dark:hover:text-white transition flex items-center gap-1.5 text-xs sm:text-sm font-black">
                        📁 {selectedSource === 'Indefinido' ? 'Fuente Indefinida' : selectedSource}
                      </button>
                    </>
                  )}
                  {selectedUnit && (
                    <>
                      <span className="text-indigo-300 dark:text-slate-600 font-normal">/</span>
                      <span className="flex items-center gap-1.5 text-xs sm:text-sm font-black text-indigo-900 dark:text-white">
                        📖 {selectedUnit === 'Indefinido' || selectedUnit === 'Unidad Indefinida' ? 'Unidad Indefinida' : selectedUnit}
                      </span>
                    </>
                  )}
                </div>
              )}

              {/* LEVEL 1: Select Year */}
              {!selectedYear && (
                <div className="w-full flex flex-col gap-4">
                  <div className="w-full">
                    {(() => {
                      const years = [...new Set([
                        ...ALL_DATA.map(item => item.year || "2026"),
                        ...customThemes.map(t => t.year || "2026")
                      ])].sort();
                      const items = years.map(yr => {
                        const exIds = (dbIndexes.byYear.get(yr) || []).map(ex => ex.id);
                        return { id: `Year::${yr}`, name: `Año ${yr}`, emoji: '📅', type: 'year', exerciseIds: exIds };
                      });
                      return renderCategoryCards(items as any, (id) => setSelectedYear(id.split('::')[1]));
                    })()}
                  </div>
                </div>
              )}

              {/* LEVEL 2: Select Source */}
              {selectedYear && !selectedSource && (
                <div className="w-full flex flex-col gap-4">
                  <div className="w-full">
                    {(() => {
                      const sources = [...new Set([
                        ...ALL_DATA.filter(item => (item.year || "2026") === selectedYear).map(item => item.source || "Indefinido"),
                        ...customThemes.filter(t => (t.year || "2026") === selectedYear).map(t => t.source || "Personalizados")
                      ])].sort();
                      const items = sources.map(src => {
                        const exIds = (dbIndexes.byYearSource.get(`${selectedYear}::${src}`) || []).map(ex => ex.id);
                        return { id: `Source::${selectedYear}::${src}`, name: src === 'Indefinido' ? 'Fuente Indefinida' : src, emoji: '📁', type: 'source', exerciseIds: exIds };
                      });
                      return renderCategoryCards(items as any, (id) => {
                        const parts = id.split('::');
                        setSelectedSource(parts.slice(2).join('::'));
                      });
                    })()}
                  </div>
                </div>
              )}

              {/* LEVEL 3: Select Unit */}
              {selectedYear && selectedSource && !selectedUnit && (
                <div className="w-full flex flex-col gap-4">
                  <div className="w-full">
                    {(() => {
                      const units = [...new Set([
                        ...ALL_DATA.filter(item => (item.year || "2026") === selectedYear && (item.source || "Indefinido") === selectedSource).map(item => (!item.unit || item.unit === 'Indefinido') ? 'Unidad Indefinida' : item.unit),
                        ...customThemes.filter(t => (t.year || "2026") === selectedYear && (t.source || "Personalizados") === selectedSource).map(t => (!t.unit || t.unit === 'Indefinido') ? 'Unidad Indefinida' : t.unit)
                      ])].sort();
                      const items = units.map(u => {
                        const key = `${selectedYear}::${selectedSource}::${u}`;
                        const exIds = (dbIndexes.byYearSourceUnit.get(key) || []).map(ex => ex.id);
                        return { id: `Unit::${selectedYear}::${selectedSource}::${u}`, name: (u === 'Indefinido' || u === 'Unidad Indefinida') ? 'Unidad Indefinida' : u, emoji: '📖', type: 'unit', exerciseIds: exIds };
                      });
                      return renderCategoryCards(items as any, (id) => {
                        const parts = id.split('::');
                        setSelectedUnit(parts.slice(3).join('::'));
                      });
                    })()}
                  </div>
                </div>
              )}

              {/* LEVEL 4: Select Theme (Inside Selected Year, Source & Unit) */}
              {selectedYear && selectedSource && selectedUnit && (
                <div className="w-full flex flex-col gap-4">
                  <div className="flex flex-col gap-2">
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Search size={18} className="text-gray-400" />
                      </div>
                      <input 
                        type="text" 
                        placeholder="Buscar tema (ej. verbo to be, pasado)..." 
                        value={themeSearchQuery}
                        onChange={(e) => setThemeSearchQuery(e.target.value)}
                        className="w-full pl-10 pr-4 py-3 bg-indigo-50/30 dark:bg-slate-900 border-2 border-indigo-100 dark:border-slate-800 dark:border-slate-700 rounded-xl font-medium focus:border-indigo-400 dark:focus:border-indigo-500 outline-none transition shadow-sm text-sm"
                      />
                    </div>
                    <div className="flex gap-2 overflow-x-auto pb-2 hide-scrollbar">
                      {['Gramática', 'Vocabulario', 'Tiempos Verbales', 'Básico', 'Avanzado'].map(tag => (
                        <button
                          key={tag}
                          onClick={() => setThemeTagsFilter(prev => prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag])}
                          className={`px-3 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition border ${themeTagsFilter.includes(tag) ? 'bg-indigo-600 text-white border-indigo-700 shadow-sm' : 'bg-indigo-50/30 dark:bg-slate-900 text-gray-600 dark:text-gray-300 border-gray-200 dark:border-slate-700 hover:bg-gray-50 dark:bg-slate-900 dark:hover:bg-slate-700'}`}
                        >
                          {tag}
                        </button>
                      ))}
                    </div>
                  </div>
                  {(() => {
                    const unitCategories = [...new Set<string>(
                      (dbIndexes.byYearSourceUnit.get(`${selectedYear}::${selectedSource}::${selectedUnit}`) || [])
                        .map((ex: any) => ex.category as string)
                        .filter(Boolean)
                    )].sort();

                    return (
                      <>
                        {(viewMode === 'path' || viewMode === 'block' || viewMode === 'gallery') ? (() => {
                          const filteredCustom = customThemes
                            .map(theme => ({ ...theme, year: theme.year || "2026", source: theme.source || "Personalizados", isCustom: true }))
                            .filter(theme => theme.year === selectedYear && theme.source === selectedSource && (theme.unit === selectedUnit || (!theme.unit && selectedUnit === 'Unidad Indefinida')))
                            .filter(theme => theme.name.toLowerCase().includes(themeSearchQuery.toLowerCase()));
                          
                          const filteredStd = unitCategories
                            .filter(cat => cat.toLowerCase().includes(themeSearchQuery.toLowerCase()))
                            .map(cat => ({ id: cat, name: cat, isCustom: false }));

                          const combined = [...filteredCustom, ...filteredStd].filter(item => {
                             if (themeTagsFilter.length === 0) return true;
                             if (item.isCustom) return true;
                             const tags = [];
                             const lcat = item.name.toLowerCase();
                             if (lcat.includes('grammar') || lcat.includes('verb') || lcat.includes('tense')) tags.push('Gramática', 'Tiempos Verbales');
                             if (lcat.includes('vocabulary') || lcat.includes('word') || lcat.includes('noun')) tags.push('Vocabulario');
                             if (lcat.includes('basic') || lcat.includes('level 1')) tags.push('Básico');
                             if (lcat.includes('advanced') || lcat.includes('level 3')) tags.push('Avanzado');
                             return themeTagsFilter.some(t => tags.includes(t));
                          });

                          combined.forEach((item, index) => {
                            if (themeOrder[item.id] === undefined) {
                              themeOrder[item.id] = index;
                            }
                          });
                          combined.sort((a, b) => (themeOrder[a.id] ?? 9999) - (themeOrder[b.id] ?? 9999));

                          const items = combined.map(item => {
                             const exIds = item.isCustom
                               ? (item as any).exerciseIds
                               : (dbIndexes.byYearSourceUnitCategory.get(`${selectedYear}::${selectedSource}::${selectedUnit}::${item.id}`) || []).map(ex => ex.id);
                             return { id: item.id, name: item.name, emoji: item.isCustom ? (item.emoji || '🎯') : getThemeEmoji(item.id), type: 'theme', exerciseIds: exIds };
                          });
                          return renderCategoryCards(items as any, (id) => startCategory(id));
                        })() : (
                    <div className={`grid ${viewMode === 'list' ? 'grid-cols-1' : viewMode === 'gallery' ? 'grid-cols-2 md:grid-cols-3' : 'grid-cols-1'} gap-4 w-full`}>
                      {/* Render matching custom themes */}
                      {customThemes
                        .map(theme => ({ ...theme, year: theme.year || "2026", source: theme.source || "Personalizados" }))
                        .filter(theme => theme.year === selectedYear && theme.source === selectedSource && (theme.unit === selectedUnit || (!theme.unit && selectedUnit === 'Unidad Indefinida')))
                        .filter(theme => theme.name.toLowerCase().includes(themeSearchQuery.toLowerCase()))
                        .filter(theme => {
                          if (themeTagsFilter.length === 0) return true;
                          return true;
                        })
                      .map((theme) => {
                        const catComplete = isCatCompleted(theme.id);
                        if (!showCompleted && catComplete) return null;
                        const hasPausedSession = Object.keys(activeSessions).some(k => k.startsWith(`${theme.id}_`));
                        const themeExercises = theme.exerciseIds.map((id: string) => dbIndexes.byId.get(id)).filter(Boolean);
                        const totalThemeCount = theme.exerciseIds.length;
                        const completedThemeCount = themeExercises.filter(ex => completedExIds.includes(ex.id) || learnedExIds.includes(ex.baseId || ex.id)).length;
                        const isThemeDone = completedThemeCount === totalThemeCount && totalThemeCount > 0;
                        const estSeconds = totalThemeCount * 15;
const estDurationStr = estSeconds < 60 ? `${estSeconds}s` : `${Math.ceil(estSeconds / 60)} min`;
                                                                        
                        
                        if (viewMode === 'gallery') {
                          return (
                            <div key={theme.id} className="relative group">
                              <button
                                onClick={() => startCategory(theme.id)}
                                className={`w-full aspect-square p-4 rounded-2xl border-2 border-b-[6px] flex flex-col items-center justify-center gap-3 shadow-md hover:shadow-xl transition-all duration-200 active:border-b-0 active:translate-y-[6px] ${isThemeDone ? 'bg-green-500 border-green-700 text-white' : getMixCardStyle('theme', theme.id)}`}
                              >
                                <span className="text-5xl drop-shadow-md">{theme.emoji || '🎯'}</span>
                                <div className="flex flex-col items-center text-center">
                                  <span className="font-extrabold text-sm leading-tight line-clamp-2">{theme.name}</span>
                                  <div className="flex items-center gap-1.5 mt-2 opacity-90 text-[10px] font-bold bg-black/10 px-2 py-0.5 rounded-full">
                                    <span>{totalThemeCount} ej</span>
                                    <span>•</span>
                                    <span>⏱️ {estDurationStr}</span>
                                  </div>
                                </div>
                                {isThemeDone && <CheckCircle2 size={24} className="absolute top-2 right-2 text-white bg-green-600 rounded-full border-2 border-green-400" />}
                                {hasPausedSession && !isThemeDone && <span className="absolute top-2 right-2 text-[10px] bg-amber-500 text-white font-bold px-1.5 py-0.5 rounded-md shadow-sm">⏳</span>}
                              </button>
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleConfigureCustomize(theme);
                                }}
                                className="absolute bottom-2 right-2 p-1.5 bg-orange-500 hover:bg-orange-600 text-white rounded-lg shadow-md transition-all active:scale-95 cursor-pointer flex items-center justify-center z-10"
                                title="Personalizar ejercicios de este nivel"
                              >
                                <Sliders size={14} />
                              </button>
                            </div>
                          );
                        }


                        return (
                          <div key={theme.id} className={`p-4 rounded-2xl border-2 border-b-4 flex flex-col justify-between shadow-sm hover:shadow-lg transition ${isThemeDone ? 'border-green-300 bg-green-50/50 text-green-900 dark:border-green-700/60 dark:bg-green-950/20 dark:text-green-200' : getCardStyle('theme')}`}>
                            {/* Top Row: Info and Emoji */}
                            <div className="flex items-start justify-between w-full">
                              <div className="flex flex-col items-start text-left">
                                <div className="flex items-center gap-2">
                                  <span className="leading-tight text-base font-extrabold sm:text-lg">{theme.name}</span> 
                                  {isThemeDone && <CheckCircle2 className="text-green-500 flex-shrink-0" size={18} />}
                                </div>
                                {viewMode === 'card' ? (
                                  <div className="flex flex-wrap items-center gap-2 mt-1.5">
                                    <span className="text-[11px] px-2 py-0.5 rounded-md bg-teal-100/60 dark:bg-slate-700 text-teal-850 dark:text-teal-200 font-bold">{totalThemeCount} ejercicios</span>
                                    <span className="text-[11px] px-2 py-0.5 rounded-md bg-amber-100/60 dark:bg-slate-700 text-amber-800 dark:text-amber-200 font-bold">⏱️ {estDurationStr}</span>
                                    {hasPausedSession && <span className="text-[11px] px-2 py-0.5 rounded-md bg-green-100 dark:bg-green-950/20 text-green-850 dark:text-green-300 font-bold">⏳ En pausa</span>}
                                  </div>
                                ) : (
                                  <div className="flex items-center gap-2 mt-1">
                                     <span className="text-[10px] font-bold opacity-70">⏱️ {estDurationStr}</span>
                                     {hasPausedSession && <span className="text-[10px] text-green-600 font-bold">⏳ Pausa</span>}
                                  </div>
                                )}
                              </div>
                              {viewMode === 'card' && <span className="text-3xl flex-shrink-0 ml-2">{theme.emoji || '🎯'}</span>}
                            </div>

                            {/* Skill Tags */}
                            {viewMode === 'card' && (
                              <div className="flex gap-1.5 mt-3 text-xs opacity-80 flex-wrap w-full">
                                {[...new Set(themeExercises.map((ex: any) => ex.skill || 'Individual'))].map((sk: any) => {
                                  const count = themeExercises.filter(ex => (ex.skill || 'Individual') === sk).length;
                                  if (count === 0) return null;
                                  const icon = SKILL_ICONS[sk] || <BookOpen size={11} />;
                                  const label = SKILL_LABELS[sk] || sk;
                                  const clonedIcon = React.isValidElement(icon) ? React.cloneElement(icon as any, { size: 11, className: "shrink-0" }) : icon;
                                  return (
                                    <span key={sk} className="flex items-center gap-1 px-1.5 py-0.5 bg-indigo-50/70 dark:bg-black/20 rounded-md font-bold text-[10px] shadow-sm text-teal-950 dark:text-teal-200 border border-teal-100/30" title={`${label}: ${count} ejercicios`}>
                                      {clonedIcon}
                                      <span>{count}</span>
                                    </span>
                                  );
                                })}
                              </div>
                            )}

                            {/* Action Bar */}
                            <div className="flex items-center gap-1.5 mt-4 pt-3 border-t border-teal-100/30 dark:border-slate-700/50 w-full animate-fadeIn">
                              <button 
                                onClick={() => startCategory(theme.id)} 
                                className={`flex-1 py-2 px-2.5 rounded-xl font-bold text-xs flex items-center justify-center gap-1 border-b-2 transition active:scale-95 ${isThemeDone ? 'bg-green-500 hover:bg-green-600 text-white border-green-700' : 'bg-teal-600 hover:bg-teal-700 text-white border-teal-800'}`}
                              >
                                <Play size={11} className="fill-current" /> Practicar
                              </button>

                              <button 
                                onClick={() => {
                                  setStatsCategoryFilter(theme.id);
                                  setCurrentScreen('stats');
                                }}
                                className="p-2 bg-indigo-50/30 dark:bg-slate-900 hover:bg-teal-50 dark:hover:bg-slate-700 border border-teal-200 dark:border-teal-800 dark:border-slate-700 text-teal-700 dark:text-teal-300 rounded-xl transition active:scale-95"
                                title="Ver estadísticas de este tema"
                              >
                                <BarChart2 size={14} />
                              </button>
                              <button
                                onClick={() => handleCopyPrompt(theme.name)}
                                className="p-2 bg-indigo-50/30 dark:bg-slate-900 hover:bg-blue-50 dark:hover:bg-slate-700 border border-blue-200 dark:border-blue-800 dark:border-slate-700 text-blue-700 dark:text-blue-450 rounded-xl transition active:scale-95 flex items-center justify-center mr-2"
                                title="Copiar Prompt de Conversación AI"
                              >
                                📋
                              </button>
                              <button
                                onClick={() => handleConfigureCustomize(theme)}
                                className="p-2 bg-indigo-50/30 dark:bg-slate-900 hover:bg-orange-50 dark:hover:bg-slate-700 border border-orange-200 dark:border-orange-800 dark:border-slate-700 text-orange-700 dark:text-orange-450 rounded-xl transition active:scale-95 flex items-center justify-center"
                                title="Personalizar ejercicios de este nivel"
                              >
                                <Sliders size={14} />
                              </button>

                              <button 
                                onClick={() => {
                                  setCompletedExIds(prev => [...new Set([...prev, ...theme.exerciseIds])]);
                                  setToastMsg(`¡Tema "${theme.name}" completado! 🎉`);
                                }}
                                className="p-2 bg-indigo-50/30 dark:bg-slate-900 hover:bg-green-50 dark:bg-green-950/20 dark:hover:bg-slate-700 border border-green-200 dark:border-green-900/50 dark:border-slate-700 text-green-700 dark:text-green-300 rounded-xl transition active:scale-95"
                                title="Marcar todo el tema como completado"
                              >
                                <CheckCircle2 size={14} />
                              </button>

                              <button 
                                onClick={() => {
                                  setCompletedExIds(prev => prev.filter(id => !theme.exerciseIds.includes(id)));
                                  const themeBaseIds = themeExercises.map(ex => ex.baseId || ex.id);
                                  setLearnedExIds(prev => prev.filter(id => !themeBaseIds.includes(id)));
                                  const updatedSessions = { ...activeSessions };
                                  Object.keys(updatedSessions).forEach(key => {
                                    if (key.startsWith(`${theme.id}_`)) {
                                      delete updatedSessions[key];
                                    }
                                  });
                                  setActiveSessions(updatedSessions);
                                  setToastMsg(`Progreso del tema "${theme.name}" reiniciado 🔄`);
                                }}
                                className="p-2 bg-indigo-50/30 dark:bg-slate-900 hover:bg-red-50 dark:bg-slate-950 dark:hover:bg-slate-700 border border-red-200 dark:border-slate-700 text-red-600 dark:text-red-300 dark:text-red-300 rounded-xl transition active:scale-95"
                                title="Reiniciar progreso de este tema"
                              >
                                <RefreshCw size={14} />
                              </button>

                              {deletingThemeId === theme.id ? (
                                <div className="flex gap-1 bg-red-50 dark:bg-slate-950 dark:bg-red-950/20 border border-red-200 dark:border-red-800 rounded-xl p-1 items-center flex-shrink-0">
                                  <button 
                                    onClick={() => {
                                      setCustomThemes(customThemes.filter(t => t.id !== theme.id));
                                      setDeletingThemeId(null);
                                    }} 
                                    className="px-2 py-1 bg-red-500 hover:bg-red-600 text-white font-bold text-[10px] rounded-lg shadow-sm"
                                  >
                                    Sí
                                  </button>
                                  <button 
                                    onClick={() => setDeletingThemeId(null)} 
                                    className="px-2 py-1 bg-gray-200 dark:bg-slate-700 text-gray-700 dark:text-gray-300 font-bold text-[10px] rounded-lg border border-gray-300 dark:border-slate-700 dark:border-slate-600"
                                  >
                                    No
                                  </button>
                                </div>
                              ) : (
                                <button 
                                  onClick={() => setDeletingThemeId(theme.id)} 
                                  className="p-2 bg-red-50 dark:bg-slate-950 hover:bg-red-100 dark:bg-red-950/25 border border-red-200 dark:border-red-900 text-red-500 rounded-xl transition active:scale-95"
                                  title="Eliminar tema personalizado"
                                >
                                  <XCircle size={14}/>
                                </button>
                              )}
                            </div>
                          </div>
                        )
                      })}

                    {/* Render matching standard categories */}
                    {unitCategories
                      .filter(cat => cat.toLowerCase().includes(themeSearchQuery.toLowerCase()))
                      .filter(cat => {
                         if (themeTagsFilter.length === 0) return true;
                         // A simple mock for tags mapping based on category names
                         const tags = [];
                         const lcat = cat.toLowerCase();
                         if (lcat.includes('grammar') || lcat.includes('verb') || lcat.includes('tense')) tags.push('Gramática', 'Tiempos Verbales');
                         if (lcat.includes('vocabulary') || lcat.includes('word') || lcat.includes('noun')) tags.push('Vocabulario');
                         if (lcat.includes('basic') || lcat.includes('level 1')) tags.push('Básico');
                         if (lcat.includes('advanced') || lcat.includes('level 3')) tags.push('Avanzado');
                         return themeTagsFilter.some(t => tags.includes(t));
                      })
                      .filter(cat => showCompleted || !isCatCompleted(cat))
                      .map((cat, i) => {
                        let catEmoji = "📘";
                        if(cat.includes('Introductions')) catEmoji = "👋";
                        if(cat.includes('Countries')) catEmoji = "🌎";
                        if(cat.includes('Verb To Be')) catEmoji = "👤";
                        if(cat.includes('Adjectives') || cat.includes('Physical')) catEmoji = "👁️";
                        if(cat.includes('School')) catEmoji = "🎒";
                        if(cat.includes('Hobbies')) catEmoji = "⚽";
                        if(cat.includes('Abilities')) catEmoji = "🦸";
                        if(cat.includes('Present Continuous')) catEmoji = "🏃";
                        if(cat.includes('House')) catEmoji = "🏠";
                        if(cat.includes('Weather')) catEmoji = "🌤️";
                        if(cat.includes('Time') || cat.includes('Days')) catEmoji = "📅";
                        if(cat.includes('Dialogues') || cat.includes('Dialogue')) catEmoji = "💬";
                        if(cat.includes('Affirmative')) catEmoji = "✅";
                        if(cat.includes('Negative Contractions') || cat.includes('Contractions')) catEmoji = "🚫";
                        else if(cat.includes('Negative')) catEmoji = "❌";
                        if(cat.includes('Questions')) catEmoji = "❓";
                        if(cat.includes('Answers') || cat.includes('Short Answers')) catEmoji = "💡";
                        if(cat.includes('Personal Info')) catEmoji = "📛";
                        if(cat.includes('Family') || cat.includes('Body')) catEmoji = "👨‍👩‍👧‍👦";
                        if(cat.includes('Animals')) catEmoji = "🦁";
                        if(cat === 'Monster Inc - Book') catEmoji = "👹";
                        if(cat.includes('Gramaticales') || cat.includes('Grammar') || cat.includes('Estructuras')) catEmoji = "🧩";
                        
                        // Smart defaults for custom topics
                        const lowerCat = (cat || '').toLowerCase();
                        if(catEmoji === "📘") {
                          if(lowerCat.includes('food') || lowerCat.includes('drink') || lowerCat.includes('comida') || lowerCat.includes('restaurant') || lowerCat.includes('frase')) catEmoji = "🍕";
                          else if(lowerCat.includes('fruit') || lowerCat.includes('fruta') || lowerCat.includes('vegetable')) catEmoji = "🍎";
                          else if(lowerCat.includes('travel') || lowerCat.includes('viaje') || lowerCat.includes('airport') || lowerCat.includes('vacation')) catEmoji = "✈️";
                          else if(lowerCat.includes('color')) catEmoji = "🎨";
                          else if(lowerCat.includes('job') || lowerCat.includes('work') || lowerCat.includes('profession') || lowerCat.includes('trabajo') || lowerCat.includes('profesión')) catEmoji = "💼";
                          else if(lowerCat.includes('number') || lowerCat.includes('número')) catEmoji = "🔢";
                          else if(lowerCat.includes('cloth') || lowerCat.includes('ropa') || lowerCat.includes('fashion') || lowerCat.includes('vestir')) catEmoji = "👕";
                          else if(lowerCat.includes('routine') || lowerCat.includes('rutina')) catEmoji = "⏰";
                          else if(lowerCat.includes('tech') || lowerCat.includes('comput') || lowerCat.includes('internet')) catEmoji = "💻";
                          else if(lowerCat.includes('music') || lowerCat.includes('música') || lowerCat.includes('art') || lowerCat.includes('arte')) catEmoji = "🎵";
                          else if(lowerCat.includes('health') || lowerCat.includes('salud') || lowerCat.includes('med')) catEmoji = "🏥";
                          else if(lowerCat.includes('science') || lowerCat.includes('ciencia') || lowerCat.includes('space') || lowerCat.includes('espacio')) catEmoji = "🚀";
                          else if(lowerCat.includes('basic') || lowerCat.includes('básico')) catEmoji = "🌱";
                        }

                        const pool = (dbIndexes.byYearSourceUnitCategory.get(`${selectedYear}::${selectedSource}::${selectedUnit}::${cat}`) || dbIndexes.byCategory.get(cat) || []);
                        const hasVisited = pool.some(ex => completedExIds.includes(ex.id) || learnedExIds.includes(ex.baseId || ex.id));
                        const hasPausedSession = Object.keys(activeSessions).some(k => k.startsWith(`${cat}_`));
                        const catComplete = isCatCompleted(cat);
                        const totalCount = pool.length;
                        const estSeconds = totalCount * 15;
const estDurationStr = estSeconds < 60 ? `${estSeconds}s` : `${Math.ceil(estSeconds / 60)} min`;
                        
                        
                        const uniqueSkillsInPool = [...new Set(pool.map(ex => ex.skill))].filter(Boolean) as string[];
                        uniqueSkillsInPool.sort((a, b) => {
                          const idxA = DEFAULT_SKILL_ORDER.indexOf(a);
                          const idxB = DEFAULT_SKILL_ORDER.indexOf(b);
                          if (idxA === -1 && idxB === -1) return 0;
                          if (idxA === -1) return 1;
                          if (idxB === -1) return -1;
                          return idxA - idxB;
                        });

                        return (
                          <div key={i} className={`p-4 rounded-2xl border-2 border-b-4 flex flex-col justify-between shadow-sm hover:shadow-lg transition ${catComplete ? 'border-green-300 bg-green-50/50 text-green-900 dark:border-green-700/60 dark:bg-green-950/20 dark:text-green-200' : getCardStyle('theme')}`}>
                            {/* Top Row: Info and Emoji */}
                            <div className="flex items-start justify-between w-full">
                              <div className="flex flex-col items-start text-left">
                                <div className="flex items-center gap-2">
                                  <span className="leading-tight text-base font-extrabold sm:text-lg">{cat}</span> 
                                  {catComplete && <CheckCircle2 className="text-green-500 flex-shrink-0" size={18} />}
                                </div>
                                {viewMode === 'card' ? (
                                  <div className="flex flex-wrap items-center gap-2 mt-1.5">
                                    <span className="text-[11px] px-2 py-0.5 rounded-md bg-indigo-100/60 dark:bg-slate-700 text-indigo-800 dark:text-indigo-200 font-bold">{totalCount} ejercicios</span>
                                    <span className="text-[11px] px-2 py-0.5 rounded-md bg-amber-100/60 dark:bg-slate-700 text-amber-800 dark:text-amber-200 font-bold">⏱️ {estDurationStr}</span>
                                    {hasPausedSession && <span className="text-[11px] px-2 py-0.5 rounded-md bg-green-100 dark:bg-green-950/20 text-green-800 dark:text-green-300 font-bold">⏳ En pausa</span>}
                                  </div>
                                ) : (
                                  <div className="flex items-center gap-2 mt-1">
                                     <span className="text-[10px] font-bold opacity-70">⏱️ {estDurationStr}</span>
                                     {hasPausedSession && <span className="text-[10px] text-green-600 font-bold">⏳ Pausa</span>}
                                  </div>
                                )}
                              </div>
                              {viewMode === 'card' && <span className="text-3xl flex-shrink-0 ml-2">{catEmoji}</span>}
                            </div>

                            {/* Skill Tags */}
                            {viewMode === 'card' && (
                              <div className="flex gap-1.5 mt-3 text-xs opacity-80 flex-wrap w-full">
                                {uniqueSkillsInPool.map(sk => {
                                  const count = pool.filter(ex => ex.skill === sk).length;
                                  if (count === 0) return null;
                                  const icon = SKILL_ICONS[sk] || <BookOpen size={11} />;
                                  const label = SKILL_LABELS[sk] || sk;
                                  const clonedIcon = React.isValidElement(icon) ? React.cloneElement(icon as any, { size: 11, className: "shrink-0" }) : icon;
                                  return (
                                    <span key={sk} className="flex items-center gap-1 px-1.5 py-0.5 bg-indigo-50/70 dark:bg-black/20 rounded-md font-bold text-[10px] shadow-sm text-indigo-950 dark:text-indigo-200 border border-indigo-100 dark:border-slate-800/30" title={`${label}: ${count} ejercicios`}>
                                      {clonedIcon}
                                      <span>{count}</span>
                                    </span>
                                  );
                                })}
                              </div>
                            )}

                            {/* Action Bar */}
                            <div className="flex items-center gap-2 mt-4 pt-3 border-t border-indigo-100 dark:border-slate-800/30 dark:border-slate-700/50 w-full animate-fadeIn">
                              <button 
                                onClick={() => startCategory(cat)} 
                                className={`flex-1 py-2 px-3 rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 border-b-2 transition active:scale-95 ${catComplete ? 'bg-green-500 hover:bg-green-600 text-white border-green-700' : 'bg-indigo-600 hover:bg-indigo-700 text-white border-indigo-800'}`}
                              >
                                <Play size={12} className="fill-current" /> Practicar
                              </button>

                              <button 
                                onClick={() => {
                                  setStatsCategoryFilter(cat);
                                  setCurrentScreen('stats');
                                }}
                                className="p-2 bg-indigo-50/30 dark:bg-slate-900 hover:bg-indigo-50 dark:bg-slate-950 dark:hover:bg-slate-700 border border-indigo-200 dark:border-slate-800 dark:border-slate-700 text-indigo-700 dark:text-indigo-300 rounded-xl transition active:scale-95"
                                title="Ver estadísticas de este tema"
                              >
                                <BarChart2 size={16} />
                              </button>
                              <button
                                onClick={() => handleCopyPrompt(cat)}
                                className="p-2 bg-indigo-50/30 dark:bg-slate-900 hover:bg-blue-50 dark:hover:bg-slate-700 border border-blue-200 dark:border-blue-800 dark:border-slate-700 text-blue-700 dark:text-blue-450 rounded-xl transition active:scale-95 flex items-center justify-center mr-2"
                                title="Copiar Prompt de Conversación AI"
                              >
                                📋
                              </button>
                              <button
                                onClick={() => handleConfigureCustomize({ id: cat, name: cat, emoji: catEmoji, type: 'theme', exerciseIds: pool.map((ex: any) => ex.id) } as any)}
                                className="p-2 bg-indigo-50/30 dark:bg-slate-900 hover:bg-orange-50 dark:hover:bg-slate-700 border border-orange-200 dark:border-orange-800 dark:border-slate-700 text-orange-700 dark:text-orange-450 rounded-xl transition active:scale-95 flex items-center justify-center"
                                title="Personalizar ejercicios de este nivel"
                              >
                                <Sliders size={16} />
                              </button>

                              <button 
                                onClick={() => {
                                  const poolIds = pool.map(ex => ex.id);
                                  setCompletedExIds(prev => [...new Set([...prev, ...poolIds])]);
                                  setToastMsg(`¡Tema "${cat}" completado! 🎉`);
                                }}
                                className="p-2 bg-indigo-50/30 dark:bg-slate-900 hover:bg-green-50 dark:bg-green-950/20 dark:hover:bg-slate-700 border border-green-200 dark:border-green-900/50 dark:border-slate-700 text-green-700 dark:text-green-300 rounded-xl transition active:scale-95"
                                title="Marcar todo el tema como completado"
                              >
                                <CheckCircle2 size={16} />
                              </button>

                              <button 
                                onClick={() => {
                                  const poolIds = pool.map(ex => ex.id);
                                  const poolBaseIds = pool.map(ex => ex.baseId || ex.id);
                                  setCompletedExIds(prev => prev.filter(id => !poolIds.includes(id)));
                                  setLearnedExIds(prev => prev.filter(id => !poolBaseIds.includes(id)));
                                  const updatedSessions = { ...activeSessions };
                                  Object.keys(updatedSessions).forEach(key => {
                                    if (key.startsWith(`${cat}_`)) {
                                      delete updatedSessions[key];
                                    }
                                  });
                                  setActiveSessions(updatedSessions);
                                  setToastMsg(`Progreso del tema "${cat}" reiniciado 🔄`);
                                }}
                                className="p-2 bg-indigo-50/30 dark:bg-slate-900 hover:bg-red-50 dark:bg-slate-950 dark:hover:bg-slate-700 border border-red-200 dark:border-slate-700 text-red-600 dark:text-red-300 dark:text-red-300 rounded-xl transition active:scale-95"
                                title="Reiniciar progreso de este tema"
                              >
                                <RefreshCw size={16} />
                              </button>
                            </div>
                          </div>
                        )
                      })}
                  </div>
                  )}

                  {unitCategories.filter(cat => showCompleted || !isCatCompleted(cat)).length === 0 && (
                    <div className="w-full bg-green-50 dark:bg-green-950/20 dark:bg-green-950/20 border-2 border-green-200 dark:border-green-900/50 dark:border-green-800 p-6 rounded-2xl text-center shadow-sm mt-4 animate-fadeIn">
                      <p className="text-green-800 dark:text-green-300 font-black text-lg">¡Completaste todos los temas de esta sección! 🎉</p>
                      <p className="text-green-600 dark:text-green-400 text-sm mt-1 font-bold">Activa "Mostrar Completados" en Ajustes ⚙️ para repasar.</p>
                    </div>
                  )}
                </>
              );
            })()}
          </div>
        )}
            </div>
          </div>
        )}

        {currentScreen === 'skill_select' && (
          <div className="flex-1 p-[clamp(1rem,3vw,2rem)] flex flex-col items-center overflow-y-auto bg-slate-50 dark:bg-slate-950 w-full max-w-[clamp(320px,95vw,1400px)] mx-auto">
            <button onClick={() => setCurrentScreen('home')} className="self-start text-indigo-500 dark:text-indigo-400 font-bold mb-4 flex items-center gap-2 hover:text-indigo-700 dark:text-indigo-300" title="Volver atrás"><ArrowLeft size={20} /> Volver a Temas</button>
            <div className="w-full flex justify-end mb-4">
              <button onClick={() => setCurrentScreen('customize')} className="flex items-center gap-2 px-3 py-1.5 bg-indigo-100 dark:bg-slate-800 text-indigo-600 dark:text-indigo-300 font-bold text-sm rounded-lg active:scale-95 shadow-sm border border-indigo-200 dark:border-slate-700">
                <span>⚙️</span> Personalizar Ejercicios
              </button>
            </div>
            <h2 className="text-2xl font-bold mb-2 text-indigo-800 dark:text-indigo-200 text-center">¿Qué quieres hacer?</h2>
            
            {activeCategory === 'Learned' ? (
               <p className="text-gray-500 mb-6 font-medium text-center">Tema: <span className="text-fuchsia-600 bg-fuchsia-100 px-3 py-1 rounded-full">🧠 Repaso de Aprendidos</span></p>
            ) : activeCategory === 'ByPhrase' ? (
               <p className="text-gray-500 mb-6 font-medium text-center">Modo: <span className="text-cyan-600 bg-cyan-100 px-3 py-1 rounded-full">🔤 Palabra por Palabra</span></p>
            ) : (
               <p className="text-gray-500 mb-6 font-medium text-center">Tema: <span className="text-purple-600">{activeCategory}</span></p>
            )}



            <div className={`grid ${viewMode === 'list' ? 'grid-cols-1' : viewMode === 'gallery' ? 'grid-cols-2 md:grid-cols-3' : 'grid-cols-1'} gap-4 w-full`}>
              
              {activeCategory === 'ByPhrase' ? (
                <div className="w-full flex flex-col gap-3 col-span-full">
                  <div className="relative">
                     <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-cyan-500" size={20} />
                     <input 
                       type="text" 
                       placeholder="Buscar palabra o frase..." 
                       value={phraseSearch} 
                       onChange={e => setPhraseSearch(e.target.value)} 
                       className="w-full p-4 pl-12 rounded-xl border-2 border-cyan-200 dark:border-cyan-700 mb-2 focus:outline-none focus:border-cyan-500 text-lg font-medium shadow-sm"
                     />
                  </div>
                  <div className={`grid ${viewMode === 'list' ? 'grid-cols-1' : viewMode === 'gallery' ? 'grid-cols-2 lg:grid-cols-3' : 'grid-cols-1'} gap-3 w-full`}>
                    {ALL_DATA.filter((item: any) => 
                      (item.eng || "").toLowerCase().includes(phraseSearch.toLowerCase()) || 
                      (item.spa || "").toLowerCase().includes(phraseSearch.toLowerCase())
                    ).slice(0, 300).map((item: any, idx: number) => {
                      let pool = (dbIndexes.byEng.get(item.eng) || []);
                      const { completed: completedCount, total } = getCompletionStats(pool);
                      if (total === 0) return null;
                      const isAllCompleted = completedCount === total;
                      
                      return (
                        <div key={idx} className={`p-4 rounded-xl border-2 flex flex-col justify-between transition ${isAllCompleted ? 'bg-indigo-50/30 dark:bg-slate-900/80 border-green-200 dark:border-green-900/50 shadow-sm' : 'bg-gray-50 dark:bg-slate-900 border-gray-200 dark:border-slate-700'}`}>
                          <div className="flex items-center gap-3 w-full mb-3">
                            {viewMode === 'card' && <div className="text-4xl flex-shrink-0">{item.emoji}</div>}
                            <div className="flex-1 min-w-0 text-left">
                               {viewMode === 'card' && <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-gray-200 text-gray-600 dark:text-slate-400 truncate max-w-[50%] mb-1 inline-block">{item.category}</span>}
                               <p className="font-bold text-base text-gray-800 dark:text-slate-200 leading-tight">{item.eng}</p>
                               {viewMode === 'card' && <p className="text-sm text-gray-500 font-medium">{item.spa}</p>}
                            </div>
                            <div className="flex-shrink-0 text-right flex flex-col items-end gap-1">
                              <span className={`font-black text-lg ${isAllCompleted ? 'text-green-500' : 'text-cyan-600'}`}>{completedCount}/{total}</span>
                              {isAllCompleted && <span className="text-[10px] bg-green-100 text-green-700 px-2 py-1 rounded-md font-bold flex items-center gap-1"><CheckCircle2 size={12}/> Listo</span>}
                            </div>
                          </div>
                          <div className="flex gap-2">
                            <button onClick={() => startPhrasePractice(item.eng)} className="flex-1 p-2 bg-cyan-100 hover:bg-cyan-200 text-cyan-700 dark:text-cyan-300 rounded-lg flex items-center justify-center gap-1 font-bold text-xs transition">
                               <Play size={14} className="fill-current"/> Practicar
                            </button>
                            <button onClick={() => {
                               const ids = pool.map(ex => ex.id);
                               setCompletedExIds(prev => [...new Set([...prev, ...ids])]);
                               setToastMsg("¡Frase completada! 🎉");
                            }} className="p-2 bg-green-50 dark:bg-green-950/20 hover:bg-green-100 dark:hover:bg-green-900/40 text-green-600 border border-green-200 dark:border-green-900/50 rounded-lg transition" title="Marcar como listo" disabled={isAllCompleted}>
                               <CheckCircle2 size={14} />
                            </button>
                            <button onClick={() => {
                               const ids = pool.map(ex => ex.id);
                               const baseIds = pool.map(ex => ex.baseId || ex.id);
                               setCompletedExIds(prev => prev.filter(id => !ids.includes(id)));
                               setLearnedExIds(prev => prev.filter(id => !baseIds.includes(id)));
                               setToastMsg("Progreso reiniciado 🔄");
                            }} className="p-2 bg-red-50 dark:bg-slate-950 hover:bg-red-100 text-red-500 border border-red-200 rounded-lg transition" title="Reiniciar progreso" disabled={completedCount === 0}>
                               <RefreshCw size={14} />
                            </button>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                  {ALL_DATA.filter((item: any) => (item.eng || "").toLowerCase().includes(phraseSearch.toLowerCase()) || (item.spa || "").toLowerCase().includes(phraseSearch.toLowerCase())).length === 0 && (
                    <p className="text-center text-gray-500 mt-4">No se encontraron resultados.</p>
                  )}
                </div>
              ) : (
                <>

                  
                  {(viewMode === 'path' || viewMode === 'block' || viewMode === 'gallery') ? (() => {
                     const currentPool = getCategoryPool(activeCategory!);
                     const skillItems: any[] = [];
                     
                     skillOrder.forEach(skill => {
                        const hasSkill = currentPool.some(ex => ex.skill === skill);
                        if (!hasSkill) return;
                        
                        const skillExs = currentPool.filter(ex => ex.skill === skill);
                        
                        const supportsKeyboard = skillExs.some(ex => isKeyboardLayoutType(ex.type));
                        const activeModes = keyboardOrder.filter(kb => (allowedKeyboards || []).includes(kb));
                        
                        if (enableMultiModalProgression && splitNodesByMode && supportsKeyboard) {
                           activeModes.forEach((kbMode) => {
                              const opt = KEYBOARD_OPTIONS.find(o => o.id === kbMode);
                              const stat = getKbCompletionStats(skillExs, kbMode);
                              const complete = stat.completed === stat.total && stat.total > 0;
                              
                              if (!showCompleted && complete && activeCategory !== 'Learned') return;
                              
                              skillItems.push({
                                 id: `${skill}::${kbMode}`,
                                 name: `${SKILL_LABELS[skill] || skill} - ${opt ? opt.label : kbMode}`,
                                 emoji: <div className="flex items-center gap-1">{SKILL_ICONS[skill] || '📖'} {opt ? <span className="text-sm font-bold bg-black/10 dark:bg-white/10 px-1.5 py-0.5 rounded-md">{Array.from(opt.label)[0]}</span> : null}</div>,
                                 type: 'skill',
                                 exerciseIds: skillExs.map(ex => ex.id),
                                 isDoneOverride: complete
                              });
                           });
                        } else {
                           const complete = isSkillCompleted(activeCategory!, skill);
                           if (!showCompleted && complete && activeCategory !== 'Learned') return;
                           
                           skillItems.push({
                              id: skill,
                              name: SKILL_LABELS[skill] || skill,
                              emoji: SKILL_ICONS[skill] || '📖',
                              type: 'skill',
                              exerciseIds: skillExs.map(ex => ex.id),
                              isDoneOverride: complete
                           });
                        }
                     });
                     
                     if (currentPool.length > 0) {
                        const isMixDone = currentPool.every(ex => completedExIds.includes(ex.id) || learnedExIds.includes(ex.baseId || ex.id));
                        if (showCompleted || !isMixDone || activeCategory === 'Learned') {
                           skillItems.push({
                              id: 'Mix',
                              name: 'Práctica General (Mix)',
                              emoji: '🌪️',
                              type: 'skill',
                              exerciseIds: currentPool.map(ex => ex.id),
                              isDoneOverride: isMixDone
                           });
                        }
                     }
                     
                     return renderCategoryCards(skillItems as any, (id) => {
                        if (id.includes('::')) {
                           const [sk, kb] = id.split('::');
                           startSkillPractice(sk, undefined, kb);
                        } else {
                           startSkillPractice(id);
                        }
                     });
                  })() : (
                     <div className={`grid ${viewMode === 'list' ? 'grid-cols-1' : viewMode === 'gallery' ? 'grid-cols-2 md:grid-cols-3' : 'grid-cols-1'} gap-4 w-full`}>
                        {(() => {
                           const nodes: any[] = [];
                           const activeModes = keyboardOrder.filter(kb => (allowedKeyboards || []).includes(kb));
                           
                           (skillOrder || []).forEach(skill => {
                              const currentPool = getCategoryPool(activeCategory!);
                              const skillExs = currentPool.filter(ex => ex.skill === skill);
                              if (skillExs.length === 0) return;
                              
                              const supportsKeyboard = skillExs.some(ex => isKeyboardLayoutType(ex.type));
                              
                              if (enableMultiModalProgression && splitNodesByMode && supportsKeyboard) {
                                  activeModes.forEach((kbMode, idx) => {
                                      nodes.push({ skill, kbMode, idx, skillExs });
                                  });
                                  const nonKbExs = skillExs.filter(ex => !isKeyboardLayoutType(ex.type));
                                  if (nonKbExs.length > 0) {
                                      nodes.push({ skill, kbMode: 'non_kb', idx: 99, skillExs: nonKbExs });
                                  }
                              } else {
                                  nodes.push({ skill, skillExs });
                              }
                           });
                           
                           const currentPool = getCategoryPool(activeCategory!);
                           if (currentPool.length > 0) {
                               nodes.push({ skill: 'Mix', kbMode: undefined, idx: 0, skillExs: currentPool });
                           }
                           
                           return nodes.map((node, i) => {
                              const { skill, kbMode, idx, skillExs } = node;
                              
                              const stats = enableMultiModalProgression ? getKbCompletionStats(skillExs, kbMode) : getCompletionStats(skillExs);
                              const total = stats.total;
                              const completedCount = stats.completed;
                              const complete = total > 0 && completedCount === total;
                              
                              if (!showCompleted && complete && activeCategory !== 'Learned') return null;
                              
                              const sessionKey = kbMode ? `${activeCategory}_${skill}_${kbMode}` : `${activeCategory}_${skill}`;
                              const inProgressData = activeSessions[sessionKey];
                              
                              let kbLabel = '';
                              if (kbMode === 'non_kb') {
                                  kbLabel = 'Otros (Audio / Quiz)';
                              } else if (kbMode) {
                                  const opt = KEYBOARD_OPTIONS.find(o => o.id === kbMode);
                                  kbLabel = opt ? opt.label : kbMode;
                              }
                              
                              const baseStyle = complete ? 'bg-green-50 dark:bg-green-950/20 border-green-200 dark:border-green-900/50' : getCardStyle('skill', skill);
                              let cardStyle = baseStyle;
                              if (kbMode && !complete) {
                                  // Apply a slight opacity to indicate subdivision
                                  const opacityValues = ['opacity-100', 'opacity-90', 'opacity-80', 'opacity-70', 'opacity-60', 'opacity-50'];
                                  const opacityClass = opacityValues[Math.min(idx, opacityValues.length - 1)];
                                  cardStyle = `${baseStyle} ${opacityClass}`;
                              }

                              return (


                       <div key={`${skill}_${kbMode || 'all'}`} className={`p-4 rounded-2xl border-2 flex flex-col justify-between shadow-sm transition hover:shadow-md ${cardStyle}`}>
                         <div className="flex items-center gap-3 w-full mb-3">
                           {viewMode === 'card' && (
                             <div className={`p-2.5 flex-shrink-0 rounded-xl ${complete ? 'bg-green-100 text-green-600' : 'bg-white/50 text-slate-700 dark:bg-slate-900/50 dark:text-slate-300'}`}>
                               {skill === 'Mix' ? <span className="text-2xl">🌪️</span> : React.cloneElement(SKILL_ICONS[skill] as any || <BookOpen />, { size: 24 })}
                             </div>
                           )}
                           <div className="flex-1 min-w-0 text-left">
                              <div className="flex flex-col">
                                <div className="flex items-center gap-2">
                                  <span className="font-bold text-lg text-slate-800 leading-tight">{skill === 'Mix' ? 'Práctica General (Mix)' : SKILL_LABELS[skill]}</span>
                                  {complete && <CheckCircle2 size={16} className="text-green-500" />}
                                </div>
                                {kbLabel && <span className="text-[10px] uppercase font-black tracking-wider opacity-70 mt-0.5">{kbLabel}</span>}
                              </div>
                              {viewMode === 'card' && <p className="text-[11px] text-slate-500 font-medium line-clamp-1 mt-1">{skill === 'Mix' ? 'Todos los ejercicios mezclados' : SKILL_TIPS[skill]}</p>}
                           </div>
                           <div className="flex-shrink-0 text-right flex flex-col items-end gap-1">
                             <span className={`font-black text-sm ${complete ? 'text-green-600' : 'text-indigo-500 dark:text-indigo-400'}`}>{completedCount}/{total}</span>
                             {inProgressData && (
                               <span className="text-[9px] bg-amber-100 text-amber-700 px-1.5 py-0.5 rounded-md font-bold text-nowrap">
                                 ⏳ Retomar
                               </span>
                             )}
                           </div>
                         </div>
                         
                         <div className="flex gap-1.5 pt-2 border-t border-slate-100">
                           <button onClick={() => startSkillPractice(skill, activeCategory, kbMode)} className={`flex-1 p-2 rounded-lg flex items-center justify-center gap-1 font-bold text-xs transition active:scale-95 ${complete ? 'bg-green-500 hover:bg-green-600 text-white' : getSkillButtonColor(skill)}`}>
                              <Play size={14} className="fill-current"/> Practicar
                           </button>
                           
                           <button onClick={() => { setStatsCategoryFilter(activeCategory); setStatsSkillFilter(skill); setCurrentScreen('stats'); }} className="p-2 bg-slate-50 dark:bg-slate-950 hover:bg-slate-100 text-slate-600 border border-slate-200 dark:border-slate-700 rounded-lg transition active:scale-95" title="Estadísticas">
                             <BarChart2 size={14} />
                           </button>
                           
                           <button onClick={() => {
                              
                              let ids: string[] = [];
                              skillExs.forEach(ex => {
                                  if (isKeyboardLayoutType(ex.type) && enableMultiModalProgression) {
                                      if (kbMode) {
                                          ids.push(`${ex.baseId || ex.id}_${kbMode}`);
                                      } else {
                                          activeModes.forEach(mode => ids.push(`${ex.baseId || ex.id}_${mode}`));
                                      }
                                  } else {
                                      ids.push(ex.id);
                                  }
                              });
                              setCompletedExIds(prev => [...new Set([...prev, ...ids])]);
                              setToastMsg(`¡Habilidad "${SKILL_LABELS[skill]}" completada! 🎉`);
                           }} className="p-2 bg-green-50 dark:bg-green-950/20 hover:bg-green-100 dark:hover:bg-green-900/40 text-green-600 border border-green-200 dark:border-green-900/50 rounded-lg transition active:scale-95" title="Completar todo" disabled={complete}>
                              <CheckCircle2 size={14} />
                           </button>
                           
                           <button onClick={() => {
                              
                              let ids: string[] = [];
                              const baseIds = skillExs.map(ex => ex.baseId || ex.id);
                              skillExs.forEach(ex => {
                                  if (isKeyboardLayoutType(ex.type) && enableMultiModalProgression) {
                                      if (kbMode) {
                                          ids.push(`${ex.baseId || ex.id}_${kbMode}`);
                                      } else {
                                          activeModes.forEach(mode => ids.push(`${ex.baseId || ex.id}_${mode}`));
                                      }
                                  } else {
                                      ids.push(ex.id);
                                  }
                              });
                              setCompletedExIds(prev => prev.filter(id => !ids.includes(id)));
                              if (!kbMode) {
                                  setLearnedExIds(prev => prev.filter(id => !baseIds.includes(id)));
                              }
                              const sKey = kbMode ? `${activeCategory}_${skill}_${kbMode}` : `${activeCategory}_${skill}`;
                              const updatedSessions = { ...activeSessions };
                              delete updatedSessions[sKey];
                              setActiveSessions(updatedSessions);
                              setToastMsg("Progreso reiniciado 🔄");
                           }} className="p-2 bg-red-50 dark:bg-slate-950 hover:bg-red-100 text-red-500 border border-red-200 rounded-lg transition active:scale-95" title="Reiniciar progreso" disabled={completedCount === 0}>
                              <RefreshCw size={14} />
                           </button>
                         </div>
                       </div>
                     );
                  });
                  })()}
                  </div>
                  )}

                  {!showCompleted && activeCategory && isCatCompleted(activeCategory) && activeCategory !== 'Learned' && (
                    <div className="col-span-full bg-green-100 border-2 border-green-300 p-4 rounded-2xl text-center mt-4">
                      <p className="text-green-800 font-bold text-lg">¡Tema completado! 🏆</p>
                      <p className="text-green-600 text-sm mt-1">Vuelve a Temas o activa "Mostrar Completados".</p>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        )}

        {currentScreen === 'customize' && (
          <div className="w-full max-w-[clamp(320px,95vw,1400px)] mx-auto flex flex-col h-full overflow-hidden" id="customize-screen-container">
            {/* Theme Creator Modal */}
            {showThemeModal && (
              <div className="fixed inset-0 bg-black/60 z-[9999] flex items-center justify-center p-4">
                <div className="bg-white dark:bg-slate-900 border-2 border-indigo-100 dark:border-slate-800 rounded-3xl p-6 w-full max-w-md shadow-2xl relative animate-slide-up">
                  <h3 className="text-xl font-bold text-slate-800 dark:text-slate-200 mb-2 flex items-center gap-2">🎯 Crear Tema Personalizado</h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">
                    Se creará un nuevo tema en el menú principal con <strong className="text-indigo-600 dark:text-indigo-400">{selectedExIds.length > 0 ? selectedExIds.length : (window as any).__lastFilteredLength || 0} ejercicios</strong>.
                  </p>
                  <input 
                    type="text" 
                    value={newThemeName} 
                    onChange={e => setNewThemeName(e.target.value)} 
                    placeholder="Ej: Repaso de Verbos, Mis Frases..." 
                    className="w-full p-3.5 border-2 border-indigo-200 dark:border-slate-700 rounded-xl mb-4 font-bold focus:outline-none focus:border-indigo-500 bg-transparent text-slate-900 dark:text-slate-100"
                  />
                  <div className="mb-4">
                    <label className="block text-xs font-bold text-slate-500 mb-1.5 text-left">Emoji del Tema</label>
                    <div className="flex gap-2">
                      <input 
                        type="text" 
                        value={newThemeEmoji} 
                        onChange={e => setNewThemeEmoji(e.target.value)} 
                        className="w-14 p-3 border-2 border-indigo-200 dark:border-slate-700 rounded-xl font-bold text-center bg-transparent text-slate-900 dark:text-slate-100 text-lg focus:outline-none focus:border-indigo-500"
                      />
                      <div className="flex-1 flex flex-wrap gap-1 items-center max-h-[50px] overflow-y-auto border border-slate-100 dark:border-slate-800 p-1.5 rounded-xl bg-slate-50 dark:bg-slate-950">
                        {homeThemeEmojis.slice(0, 14).map(emo => (
                          <button 
                            key={emo}
                            type="button"
                            onClick={() => setNewThemeEmoji(emo)}
                            className={`w-7 h-7 flex items-center justify-center rounded-lg text-sm hover:bg-indigo-150 dark:hover:bg-indigo-950 transition-colors ${newThemeEmoji === emo ? 'bg-indigo-100 dark:bg-indigo-900 border border-indigo-300' : ''}`}
                          >
                            {emo}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <button onClick={() => setShowThemeModal(false)} className="flex-1 py-3 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 font-bold rounded-xl active:scale-95 transition-transform">Cancelar</button>
                    <button onClick={handleCreateThemeFromCustomize} disabled={!newThemeName.trim()} className="flex-1 py-3 bg-indigo-600 text-white font-bold rounded-xl active:scale-95 disabled:opacity-50 transition-transform">Guardar Tema</button>
                  </div>
                </div>
              </div>
            )}

            {/* Advanced Filters Full-Screen Modal */}
            {showFiltersModal && (
              <div className="fixed inset-0 bg-black/70 z-[99999] flex items-center justify-center p-2 sm:p-4 backdrop-blur-sm">
                <div className="bg-white dark:bg-slate-900 border-2 border-indigo-100 dark:border-slate-800 rounded-3xl w-full max-w-4xl max-h-[92vh] flex flex-col shadow-2xl relative overflow-hidden animate-slide-up">
                  
                  {/* Modal Header */}
                  <div className="p-4 sm:p-6 border-b border-slate-100 dark:border-slate-800 shrink-0 bg-gradient-to-r from-indigo-50/50 to-transparent dark:from-slate-900/40">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-2xl">⚙️</span>
                          <h3 className="text-lg sm:text-xl font-black text-slate-800 dark:text-slate-200">
                            Filtros Avanzados y Ordenación
                          </h3>
                        </div>
                        <p className="text-[11px] sm:text-xs font-semibold text-slate-500 dark:text-slate-400 mt-1">
                          Selecciona parámetros y obtén feedback inmediato del volumen de coincidencia.
                        </p>
                      </div>
                      <button 
                        onClick={() => setShowFiltersModal(false)}
                        className="p-1.5 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg text-slate-500 hover:text-slate-700 transition font-bold"
                        title="Cerrar ventana"
                      >
                        ✕
                      </button>
                    </div>

                    {/* Dynamic Real-time Count Feedback */}
                    <div className="mt-4 p-3 bg-indigo-600 text-white rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-2 shadow-md shadow-indigo-600/20">
                      <div className="flex items-center gap-2.5">
                        <span className="bg-white text-indigo-600 rounded-full w-5 h-5 flex items-center justify-center text-xs font-black leading-none">
                          i
                        </span>
                        <span className="text-xs sm:text-sm font-bold">
                          {customizeFilteredAndSortedList.length} de {allBasePhrases.length} frases base coinciden actualmente.
                        </span>
                      </div>
                      <div className="flex gap-2">
                        <button 
                          onClick={() => {
                            setCustomizeYearFilter([]);
                            setCustomizeSourceFilter([]);
                            setCustomizeThemeFilter([]);
                            setCustomizeStatusFilter('All');
                            setCustomizeSkillsFilter([]);
                            setCustomizeTagsFilter([]);
                          }}
                          className="px-2.5 py-1 text-[10px] font-bold bg-indigo-750 hover:bg-indigo-800 rounded-lg transition"
                        >
                          Limpiar Todos
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Modal Body (Scrollable content) */}
                  <div className="flex-1 p-4 sm:p-6 overflow-y-auto space-y-6">
                    
                    {/* SECTION 1: Origen de los Datos */}
                    <div>
                      <button
                        type="button"
                        onClick={() => setCollapsedFilterSections(prev => ({ ...prev, origin: !prev.origin }))}
                        className="w-full text-left flex items-center justify-between py-2 border-b border-indigo-100 dark:border-slate-800"
                      >
                        <h4 className="text-[10px] font-black text-indigo-500 dark:text-indigo-400 uppercase tracking-widest flex items-center gap-1.5">
                          <Calendar size={13}/> Origen de los Datos (Año y Fuente)
                        </h4>
                        <span className="text-slate-400 dark:text-slate-500 text-xs font-extrabold">
                          {collapsedFilterSections.origin ? '▶ Mostrar' : '▼ Colapsar'}
                        </span>
                      </button>
                      
                      {!collapsedFilterSections.origin && (
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-3 animate-fade-in">
                          {/* Año filter */}
                          <div className="bg-slate-50 dark:bg-slate-950 p-3 rounded-2xl border border-slate-100 dark:border-slate-800">
                            <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 mb-2">Año de Publicación</label>
                            <div className="flex flex-wrap gap-1.5">
                              <button
                                type="button"
                                onClick={() => setCustomizeYearFilter([])}
                                className={`px-2.5 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 border ${
                                  customizeYearFilter.length === 0 
                                    ? 'bg-indigo-600 text-white border-indigo-700' 
                                    : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-800 hover:bg-slate-50'
                                }`}
                              >
                                <span>Todos</span>
                                <span className="text-[10px] opacity-70">({allBasePhrases.length})</span>
                              </button>
                              {availableYears.map(yr => {
                                const badgeText = getYearBadgeText(yr);
                                return (
                                  <button
                                    type="button"
                                    key={yr}
                                    onClick={() => setCustomizeYearFilter(prev => prev.includes(yr) ? prev.filter(y => y !== yr) : [...prev, yr])}
                                    className={`px-2.5 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 border ${
                                      customizeYearFilter.includes(yr) 
                                        ? 'bg-indigo-600 text-white border-indigo-700' 
                                        : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-800 hover:bg-slate-50'
                                    }`}
                                  >
                                    <span>{yr}</span>
                                    <span className="text-[10px] opacity-70">({badgeText})</span>
                                  </button>
                                );
                              })}
                            </div>
                          </div>

                          {/* Fuente filter */}
                          <div className="bg-slate-50 dark:bg-slate-950 p-3 rounded-2xl border border-slate-100 dark:border-slate-800">
                            <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 mb-2">Fuente / Origen</label>
                            <div className="flex flex-wrap gap-1.5">
                              <button
                                type="button"
                                onClick={() => setCustomizeSourceFilter([])}
                                className={`px-2.5 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 border ${
                                  customizeSourceFilter.length === 0 
                                    ? 'bg-indigo-600 text-white border-indigo-700' 
                                    : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-800 hover:bg-slate-50'
                                }`}
                              >
                                <span>Todas</span>
                                <span className="text-[10px] opacity-70">({allBasePhrases.length})</span>
                              </button>
                              {availableSources.map(src => {
                                const badgeText = getSourceBadgeText(src);
                                return (
                                  <button
                                    type="button"
                                    key={src}
                                    onClick={() => setCustomizeSourceFilter(prev => prev.includes(src) ? prev.filter(s => s !== src) : [...prev, src])}
                                    className={`px-2.5 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 border ${
                                      customizeSourceFilter.includes(src) 
                                        ? 'bg-indigo-600 text-white border-indigo-700' 
                                        : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-800 hover:bg-slate-50'
                                    }`}
                                  >
                                    <span>{src === 'Indefinido' ? 'Indefinida' : src}</span>
                                    <span className="text-[10px] opacity-70">({badgeText})</span>
                                  </button>
                                );
                              })}
                            </div>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* SECTION 2: Temas / Categorías */}
                    <div>
                      <button
                        type="button"
                        onClick={() => setCollapsedFilterSections(prev => ({ ...prev, themes: !prev.themes }))}
                        className="w-full text-left flex items-center justify-between py-2 border-b border-indigo-100 dark:border-slate-800"
                      >
                        <h4 className="text-[10px] font-black text-indigo-500 dark:text-indigo-400 uppercase tracking-widest flex items-center gap-1.5">
                          <Tag size={13}/> Temas / Categorías de Aprendizaje
                        </h4>
                        <span className="text-slate-400 dark:text-slate-500 text-xs font-extrabold">
                          {collapsedFilterSections.themes ? '▶ Mostrar' : '▼ Colapsar'}
                        </span>
                      </button>
                      
                      {!collapsedFilterSections.themes && (
                        <div className="bg-slate-50 dark:bg-slate-950 p-4 rounded-2xl border border-slate-100 dark:border-slate-800 mt-3 animate-fade-in">
                          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
                            <button
                              type="button"
                              onClick={() => setCustomizeThemeFilter([])}
                              className={`p-2.5 rounded-xl text-xs font-bold transition flex flex-col items-center justify-center gap-1 border text-center ${
                                customizeThemeFilter.length === 0 
                                  ? 'bg-indigo-600 text-white border-indigo-700 shadow-sm' 
                                  : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-800 hover:bg-slate-50'
                              }`}
                            >
                              <span className="text-lg">📚</span>
                              <span className="font-extrabold truncate w-full">Todos los Temas</span>
                              <span className="text-[10px] opacity-70">({allBasePhrases.length})</span>
                            </button>
                            {availableCategories.map(cat => {
                              const badgeText = getCategoryBadgeText(cat);
                              return (
                                <button
                                  type="button"
                                  key={cat}
                                  onClick={() => setCustomizeThemeFilter(prev => prev.includes(cat) ? prev.filter(c => c !== cat) : [...prev, cat])}
                                  className={`p-2.5 rounded-xl text-xs font-bold transition flex flex-col items-center justify-center gap-1 border text-center ${
                                    customizeThemeFilter.includes(cat) 
                                      ? 'bg-indigo-600 text-white border-indigo-700 shadow-sm' 
                                      : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-800 hover:bg-slate-50'
                                  }`}
                                >
                                  <span className="text-lg">{getThemeEmoji(cat)}</span>
                                  <span className="font-extrabold truncate w-full" title={getCategoryDisplayName(cat)}>
                                    {getCategoryDisplayName(cat)}
                                  </span>
                                  <span className="text-[10px] opacity-70">({badgeText})</span>
                                </button>
                              );
                            })}
                          </div>
                        </div>
                      )}
                    </div>

                    {/* SECTION 3: Estado de Progreso */}
                    <div>
                      <button
                        type="button"
                        onClick={() => setCollapsedFilterSections(prev => ({ ...prev, status: !prev.status }))}
                        className="w-full text-left flex items-center justify-between py-2 border-b border-indigo-100 dark:border-slate-800"
                      >
                        <h4 className="text-[10px] font-black text-indigo-500 dark:text-indigo-400 uppercase tracking-widest flex items-center gap-1.5">
                          <CheckCircle2 size={13}/> Estado del Aprendizaje (Granularidad)
                        </h4>
                        <span className="text-slate-400 dark:text-slate-500 text-xs font-extrabold">
                          {collapsedFilterSections.status ? '▶ Mostrar' : '▼ Colapsar'}
                        </span>
                      </button>
                      
                      {!collapsedFilterSections.status && (
                        <div className="bg-slate-50 dark:bg-slate-950 p-4 rounded-2xl border border-slate-100 dark:border-slate-800 mt-3 animate-fade-in">
                          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2">
                            <button
                              type="button"
                              onClick={() => setCustomizeStatusFilter([])}
                              className={`p-2 rounded-xl text-xs font-bold transition flex flex-col items-center justify-center gap-1 border text-center ${
                                customizeStatusFilter.length === 0 
                                  ? 'bg-indigo-600 text-white border-indigo-700' 
                                  : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-800 hover:bg-slate-50'
                              }`}
                            >
                              <span className="text-base">📋</span>
                              <span className="font-extrabold">Todos</span>
                              <span className="text-[10px] opacity-70">({allBasePhrases.length})</span>
                            </button>

                            <button
                              type="button"
                              onClick={() => setCustomizeStatusFilter(prev => prev.includes('Completed') ? prev.filter(s => s !== 'Completed') : [...prev, 'Completed'])}
                              className={`p-2 rounded-xl text-xs font-bold transition flex flex-col items-center justify-center gap-1 border text-center ${
                                customizeStatusFilter.includes('Completed') 
                                  ? 'bg-indigo-600 text-white border-indigo-700' 
                                  : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-800 hover:bg-slate-50'
                              }`}
                            >
                              <span className="text-base">✓</span>
                              <span className="font-extrabold">Completados</span>
                              <span className="text-[10px] opacity-70">({getStatusBadgeText('Completed')})</span>
                            </button>

                            <button
                              type="button"
                              onClick={() => setCustomizeStatusFilter(prev => prev.includes('Pending') ? prev.filter(s => s !== 'Pending') : [...prev, 'Pending'])}
                              className={`p-2 rounded-xl text-xs font-bold transition flex flex-col items-center justify-center gap-1 border text-center ${
                                customizeStatusFilter.includes('Pending') 
                                  ? 'bg-indigo-600 text-white border-indigo-700' 
                                  : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-800 hover:bg-slate-50'
                              }`}
                            >
                              <span className="text-base">⏳</span>
                              <span className="font-extrabold">Pendientes</span>
                              <span className="text-[10px] opacity-70">({getStatusBadgeText('Pending')})</span>
                            </button>

                            <button
                              type="button"
                              onClick={() => setCustomizeStatusFilter(prev => prev.includes('Learned') ? prev.filter(s => s !== 'Learned') : [...prev, 'Learned'])}
                              className={`p-2 rounded-xl text-xs font-bold transition flex flex-col items-center justify-center gap-1 border text-center ${
                                customizeStatusFilter.includes('Learned') 
                                  ? 'bg-indigo-600 text-white border-indigo-700' 
                                  : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-800 hover:bg-slate-50'
                              }`}
                            >
                              <span className="text-base">🧠</span>
                              <span className="font-extrabold">Dominados</span>
                              <span className="text-[10px] opacity-70">({getStatusBadgeText('Learned')})</span>
                            </button>

                            <button
                              type="button"
                              onClick={() => setCustomizeStatusFilter(prev => prev.includes('NeedsReview') ? prev.filter(s => s !== 'NeedsReview') : [...prev, 'NeedsReview'])}
                              className={`p-2 rounded-xl text-xs font-bold transition flex flex-col items-center justify-center gap-1 border text-center ${
                                customizeStatusFilter.includes('NeedsReview') 
                                  ? 'bg-indigo-600 text-white border-indigo-700' 
                                  : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-800 hover:bg-slate-50'
                              }`}
                            >
                              <span className="text-base">⚠️</span>
                              <span className="font-extrabold">Repasar</span>
                              <span className="text-[10px] opacity-70">({getStatusBadgeText('NeedsReview')})</span>
                            </button>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* SECTION 4: Habilidades y Etiquetas */}
                    <div>
                      <button
                        type="button"
                        onClick={() => setCollapsedFilterSections(prev => ({ ...prev, skillsTags: !prev.skillsTags }))}
                        className="w-full text-left flex items-center justify-between py-2 border-b border-indigo-100 dark:border-slate-800"
                      >
                        <h4 className="text-[10px] font-black text-indigo-500 dark:text-indigo-400 uppercase tracking-widest flex items-center gap-1.5">
                          🏷️ Habilidades y Etiquetas
                        </h4>
                        <span className="text-slate-400 dark:text-slate-500 text-xs font-extrabold">
                          {collapsedFilterSections.skillsTags ? '▶ Mostrar' : '▼ Colapsar'}
                        </span>
                      </button>
                      
                      {!collapsedFilterSections.skillsTags && (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-3 animate-fade-in">
                          {/* Skills */}
                          <div className="bg-slate-50 dark:bg-slate-950 p-4 rounded-2xl border border-slate-100 dark:border-slate-800">
                            <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 mb-2">Habilidades Principales</label>
                            <div className="flex flex-wrap gap-1.5">
                              {DEFAULT_SKILL_ORDER.map(sk => {
                                const isSelected = customizeSkillsFilter.includes(sk);
                                const badgeText = getSkillBadgeText(sk);
                                return (
                                  <button
                                    type="button"
                                    key={sk}
                                    onClick={() => {
                                      setCustomizeSkillsFilter(prev => isSelected ? prev.filter(item => item !== sk) : [...prev, sk]);
                                    }}
                                    className={`px-2.5 py-1.5 rounded-xl text-xs font-bold border transition ${
                                      isSelected 
                                        ? 'bg-indigo-600 text-white border-indigo-700' 
                                        : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-800 hover:bg-slate-50'
                                    }`}
                                  >
                                    {SKILL_LABELS[sk] || sk} ({badgeText})
                                  </button>
                                );
                              })}
                            </div>
                          </div>

                          {/* Tags */}
                          <div className="bg-slate-50 dark:bg-slate-950 p-4 rounded-2xl border border-slate-100 dark:border-slate-800">
                            <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 mb-2">Filtro por Etiquetas</label>
                            <div className="flex flex-wrap gap-1.5">
                              {['Gramática', 'Vocabulario', 'Básico', 'Avanzado', 'Frases'].map(tag => {
                                const isSelected = customizeTagsFilter.includes(tag);
                                const badgeText = getTagBadgeText(tag);
                                return (
                                  <button
                                    type="button"
                                    key={tag}
                                    onClick={() => {
                                      setCustomizeTagsFilter(prev => isSelected ? prev.filter(t => t !== tag) : [...prev, tag]);
                                    }}
                                    className={`px-2.5 py-1.5 rounded-xl text-xs font-bold border transition ${
                                      isSelected 
                                        ? 'bg-indigo-600 text-white border-indigo-700' 
                                        : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-800 hover:bg-slate-50'
                                    }`}
                                  >
                                    #{tag} ({badgeText})
                                  </button>
                                );
                              })}
                            </div>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* SECTION 5: Orden de Visualización Avanzado (Tipo Excel/Notion) */}
                    <div>
                      <button
                        type="button"
                        onClick={() => setCollapsedFilterSections(prev => ({ ...prev, sorting: !prev.sorting }))}
                        className="w-full text-left flex items-center justify-between py-2 border-b border-indigo-100 dark:border-slate-800"
                      >
                        <h4 className="text-[10px] font-black text-indigo-500 dark:text-indigo-400 uppercase tracking-widest flex items-center gap-1.5">
                          ↕️ Criterio de Ordenación Jerárquica (Estilo Excel/Notion)
                        </h4>
                        <span className="text-slate-400 dark:text-slate-500 text-xs font-extrabold">
                          {collapsedFilterSections.sorting ? '▶ Mostrar' : '▼ Colapsar'}
                        </span>
                      </button>
                      
                      {!collapsedFilterSections.sorting && (
                        <div className="bg-slate-50 dark:bg-slate-950 p-4 rounded-2xl border border-slate-100 dark:border-slate-800 mt-3 space-y-4 animate-fade-in">
                          <p className="text-[11px] font-semibold text-slate-500 dark:text-slate-400">
                            Define la jerarquía de ordenación de los ejercicios. Las reglas se aplican en orden descendente de prioridad.
                          </p>

                          <div className="space-y-2.5">
                            {customizeSortRules.map((rule, idx) => (
                              <div 
                                key={rule.id} 
                                className="flex flex-col sm:flex-row sm:items-center gap-2 p-3 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm transition hover:shadow-md"
                              >
                                <div className="flex items-center gap-2 shrink-0">
                                  <span className="text-xs font-black text-indigo-500 dark:text-indigo-400 w-5 text-center">
                                    {idx + 1}.
                                  </span>
                                  <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                                    {idx === 0 ? 'Ordenar por' : 'Luego por'}
                                  </span>
                                </div>

                                <div className="flex-1 grid grid-cols-2 gap-2">
                                  <select
                                    value={rule.field}
                                    onChange={(e) => updateSortRuleField(rule.id, e.target.value as any)}
                                    className="p-2 rounded-lg text-xs font-bold bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                  >
                                    <option value="eng">Inglés (Frase)</option>
                                    <option value="spa">Español (Frase)</option>
                                    <option value="status">Estado de Aprendizaje</option>
                                    <option value="skill">Habilidad</option>
                                    <option value="category">Tema / Categoría</option>
                                    <option value="year">Año</option>
                                    <option value="source">Fuente</option>
                                  </select>

                                  <select
                                    value={rule.direction}
                                    onChange={(e) => updateSortRuleDirection(rule.id, e.target.value as any)}
                                    className="p-2 rounded-lg text-xs font-bold bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                  >
                                    <option value="asc">Ascendente (A-Z)</option>
                                    <option value="desc">Descendente (Z-A)</option>
                                  </select>
                                </div>

                                <div className="flex items-center justify-end gap-1 shrink-0">
                                  <button
                                    type="button"
                                    onClick={() => moveSortRule(idx, 'up')}
                                    disabled={idx === 0}
                                    className="p-1.5 bg-slate-50 dark:bg-slate-950 hover:bg-slate-100 dark:hover:bg-slate-850 rounded-lg text-slate-500 disabled:opacity-30 disabled:hover:bg-slate-50 font-bold transition"
                                    title="Subir prioridad"
                                  >
                                    ▲
                                  </button>
                                  <button
                                    type="button"
                                    onClick={() => moveSortRule(idx, 'down')}
                                    disabled={idx === customizeSortRules.length - 1}
                                    className="p-1.5 bg-slate-50 dark:bg-slate-950 hover:bg-slate-100 dark:hover:bg-slate-850 rounded-lg text-slate-500 disabled:opacity-30 disabled:hover:bg-slate-50 font-bold transition"
                                    title="Bajar prioridad"
                                  >
                                    ▼
                                  </button>
                                  <button
                                    type="button"
                                    onClick={() => removeSortRule(rule.id)}
                                    className="p-1.5 hover:bg-red-50 dark:hover:bg-red-950/30 rounded-lg text-red-500 font-bold transition"
                                    title="Eliminar regla"
                                  >
                                    ✕
                                  </button>
                                </div>
                              </div>
                            ))}

                            {customizeSortRules.length === 0 && (
                              <div className="text-center py-6 border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-2xl text-slate-400 dark:text-slate-500 font-bold text-xs">
                                No hay reglas de ordenación activas. Se usará el orden original.
                              </div>
                            )}
                          </div>

                          <div className="flex flex-wrap gap-2 pt-2 border-t border-slate-200/50 dark:border-slate-800/50">
                            <button
                              type="button"
                              onClick={addSortRule}
                              className="px-3.5 py-2 bg-indigo-50 dark:bg-slate-900 hover:bg-indigo-100 dark:hover:bg-slate-850 text-indigo-600 dark:text-indigo-400 font-bold text-xs rounded-xl flex items-center gap-1.5 transition active:scale-95"
                            >
                              ＋ Agregar Nivel de Ordenación
                            </button>
                            <button
                              type="button"
                              onClick={() => setCustomizeSortRules([{ id: 'rule-1', field: 'eng', direction: 'asc' }])}
                              className="px-3.5 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-850 text-slate-500 font-bold text-xs rounded-xl transition active:scale-95"
                            >
                              Restablecer Orden
                            </button>
                          </div>
                        </div>
                      )}
                    </div>

                  </div>

                  {/* Modal Footer */}
                  <div className="p-4 sm:p-6 border-t border-slate-100 dark:border-slate-800 shrink-0 bg-slate-50 dark:bg-slate-950 flex flex-col sm:flex-row gap-3">
                    <button 
                      type="button"
                      onClick={() => {
                        setCustomizeYearFilter([]);
                        setCustomizeSourceFilter([]);
                        setCustomizeThemeFilter([]);
                        setCustomizeStatusFilter('All');
                        setCustomizeSkillsFilter([]);
                        setCustomizeTagsFilter([]);
                        setToastMsg("🔄 Filtros reiniciados correctamente.");
                      }}
                      className="w-full sm:w-auto px-6 py-3 bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-800 font-bold text-xs rounded-2xl active:scale-95 transition-transform"
                    >
                      Limpiar Filtros
                    </button>
                    <button 
                      type="button"
                      onClick={() => setShowFiltersModal(false)}
                      className="flex-1 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-2xl active:scale-95 transition-transform shadow-md shadow-indigo-600/10"
                    >
                      Aplicar Filtros y Ver {customizeFilteredAndSortedList.length} Ejercicios
                    </button>
                  </div>

                </div>
              </div>
            )}

            {/* Add/Edit Custom Exercise Modal/Panel */}
            {showAddExerciseForm && (
              <div className="fixed inset-0 bg-black/60 z-[9999] flex items-center justify-center p-4">
                <form 
                  onSubmit={editingEx ? handleSaveEditedExercise : handleAddCustomExercise}
                  className="bg-white dark:bg-slate-900 border-2 border-indigo-100 dark:border-slate-800 rounded-3xl p-6 w-full max-w-lg shadow-2xl relative animate-slide-up max-h-[90vh] overflow-y-auto"
                >
                  <h3 className="text-xl font-bold text-slate-800 dark:text-slate-200 mb-4 flex items-center gap-2">
                    {editingEx ? '✏️ Editar Ejercicio' : '✨ Agregar Nuevo Ejercicio'}
                  </h3>
                  
                  <div className="space-y-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-500 mb-1">Frase en Inglés *</label>
                      <textarea 
                        required
                        value={newExForm.eng}
                        onChange={e => setNewExForm(prev => ({ ...prev, eng: e.target.value }))}
                        placeholder="E.g. She likes reading books."
                        rows={2}
                        className="w-full p-3 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-indigo-500 bg-transparent font-medium text-slate-900 dark:text-slate-100"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-500 mb-1">Traducción al Español *</label>
                      <textarea 
                        required
                        value={newExForm.spa}
                        onChange={e => setNewExForm(prev => ({ ...prev, spa: e.target.value }))}
                        placeholder="Ej: A ella le gusta leer libros."
                        rows={2}
                        className="w-full p-3 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-indigo-500 bg-transparent font-medium text-slate-900 dark:text-slate-100"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-bold text-slate-500 mb-1">Tema / Categoría</label>
                        <select
                          value={newExForm.category}
                          onChange={e => {
                            const selectedCat = e.target.value;
                            const customTheme = customThemes.find(ct => ct.id === selectedCat);
                            const catEmoji = customTheme ? (customTheme.emoji || '🎯') : getThemeEmoji(selectedCat);
                            setNewExForm(prev => ({ 
                              ...prev, 
                              category: selectedCat, 
                              emoji: catEmoji || prev.emoji 
                            }));
                          }}
                          className="w-full p-3 border border-slate-200 dark:border-slate-700 rounded-xl bg-white dark:bg-slate-900 focus:ring-2 focus:ring-indigo-500 text-xs font-bold text-slate-800 dark:text-slate-200"
                        >
                          {availableCategories.map(cat => (
                            <option key={cat} value={cat}>{getCategoryDisplayName(cat)}</option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-500 mb-1">Habilidad Principal</label>
                        <select
                          value={newExForm.skill}
                          onChange={e => setNewExForm(prev => ({ ...prev, skill: e.target.value }))}
                          className="w-full p-3 border border-slate-200 dark:border-slate-700 rounded-xl bg-white dark:bg-slate-900 focus:ring-2 focus:ring-indigo-500 text-xs font-bold text-slate-800 dark:text-slate-200"
                        >
                          {DEFAULT_SKILL_ORDER.map(sk => (
                            <option key={sk} value={sk}>{SKILL_LABELS[sk] || sk}</option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-3">
                      <div>
                        <label className="block text-xs font-bold text-slate-500 mb-1">Año</label>
                        <input 
                          type="text"
                          value={newExForm.year}
                          onChange={e => setNewExForm(prev => ({ ...prev, year: e.target.value }))}
                          className="w-full p-3 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-indigo-500 bg-transparent text-xs font-bold text-slate-800 dark:text-slate-200"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-500 mb-1">Fuente</label>
                        <input 
                          type="text"
                          value={newExForm.source}
                          onChange={e => setNewExForm(prev => ({ ...prev, source: e.target.value }))}
                          className="w-full p-3 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-indigo-500 bg-transparent text-xs font-bold text-slate-800 dark:text-slate-200"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-500 mb-1">Emoji</label>
                        <div className="flex gap-2">
                          <input 
                            type="text"
                            value={newExForm.emoji}
                            onChange={e => setNewExForm(prev => ({ ...prev, emoji: e.target.value }))}
                            className="w-12 p-3 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-indigo-500 bg-transparent text-center font-bold text-base focus:outline-none"
                          />
                          <div className="flex-1 flex flex-wrap gap-1 items-center max-h-[46px] overflow-y-auto border border-slate-100 dark:border-slate-800 p-1.5 rounded-xl bg-slate-50 dark:bg-slate-950">
                            {homeThemeEmojis.slice(0, 14).map(emo => (
                              <button 
                                key={emo}
                                type="button"
                                onClick={() => setNewExForm(prev => ({ ...prev, emoji: emo }))}
                                className={`w-7 h-7 flex items-center justify-center rounded-lg text-sm hover:bg-indigo-150 dark:hover:bg-indigo-950 transition-colors ${newExForm.emoji === emo ? 'bg-indigo-100 dark:bg-indigo-900 border border-indigo-300' : ''}`}
                              >
                                {emo}
                              </button>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-500 mb-1">Etiquetas (separadas por comas)</label>
                      <input 
                        type="text"
                        value={newExForm.tags}
                        onChange={e => setNewExForm(prev => ({ ...prev, tags: e.target.value }))}
                        placeholder="Gramática, Verbos, Básico..."
                        className="w-full p-3 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-indigo-500 bg-transparent text-xs font-semibold text-slate-800 dark:text-slate-200"
                      />
                    </div>
                  </div>

                  <div className="flex gap-3 mt-6">
                    <button 
                      type="button" 
                      onClick={() => {
                        setEditingEx(null);
                        setShowAddExerciseForm(false);
                        setNewExForm({
                          eng: '',
                          spa: '',
                          category: 'Introductions',
                          skill: 'Translate',
                          year: '2026',
                          source: 'Manual',
                          tags: '',
                          emoji: '🎯'
                        });
                      }} 
                      className="flex-1 py-3 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 font-bold rounded-xl active:scale-95 transition-transform"
                    >
                      Cancelar
                    </button>
                    <button 
                      type="submit" 
                      className="flex-1 py-3 bg-indigo-600 text-white font-bold rounded-xl active:scale-95 transition-transform"
                    >
                      {editingEx ? 'Guardar Cambios' : 'Agregar'}
                    </button>
                  </div>
                </form>
              </div>
            )}

            {/* Customize Screen Header */}
            <div className={`w-full flex items-center justify-between transition-all duration-300 ease-in-out shrink-0 ${custHeaderVis ? 'max-h-24 opacity-100 mb-4' : 'max-h-0 overflow-hidden opacity-0 mb-0 pointer-events-none'}`}>
              <button onClick={() => setCurrentScreen(activeCategory ? 'skill_select' : 'home')} className="self-start text-indigo-500 dark:text-indigo-400 font-bold flex items-center gap-2 hover:text-indigo-700 dark:text-indigo-300" title="Volver">
                <ArrowLeft size={20} /> Volver
              </button>
              
              <div className="flex items-center gap-2">
                <button 
                  onClick={() => {
                    setEditingEx(null);
                    setNewExForm({
                      eng: '',
                      spa: '',
                      category: 'Introductions',
                      skill: 'Translate',
                      year: '2026',
                      source: 'Manual',
                      tags: '',
                      emoji: '🎯'
                    });
                    setShowAddExerciseForm(true);
                  }}
                  className="px-3 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold rounded-xl flex items-center gap-1.5 shadow-md shadow-indigo-600/10 transition"
                  title="Incorporar Nuevo Ejercicio"
                >
                  <Plus size={14}/> Agregar Ejercicio
                </button>

                <button 
                  onClick={() => setShowThemeModal(true)}
                  className="px-3 py-2 bg-slate-100 dark:bg-slate-800 hover:bg-indigo-50 dark:hover:bg-slate-700 text-indigo-600 dark:text-indigo-400 border border-slate-200 dark:border-slate-700 text-xs font-bold rounded-xl flex items-center gap-1.5 transition"
                  title="Crear un tema con la selección actual"
                >
                  <Star size={14}/> Crear Tema
                </button>
                

              </div>
            </div>

            {/* Main Workspace Frame */}
            <div className="bg-indigo-50/30 dark:bg-slate-900/80 rounded-3xl p-4 sm:p-6 shadow-xl border border-indigo-100 dark:border-slate-800/50 flex-1 flex flex-col overflow-hidden">
              {/* Clean Inline Header / Controls */}
              <div className="flex flex-col gap-4 mb-4 shrink-0">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 bg-white dark:bg-slate-950 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
                  <div className="flex items-center gap-3">
                    <span className="text-3xl">⚙️</span>
                    <div>
                      <h2 className="text-lg sm:text-xl font-black text-slate-800 dark:text-slate-200">Personalizar Ejercicios</h2>
                      <p className="text-slate-500 font-medium text-[11px] sm:text-xs flex items-center gap-2 flex-wrap">
                        <span>{customizeFilteredAndSortedList.length} ejercicios encontrados</span>
                        <span>•</span>
                        <span className="text-indigo-600 dark:text-indigo-400 font-bold">{isGrouped ? 'Agrupados por Frase Base' : 'Lista Desglosada'}</span>
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-2">
                    {/* Pivot/Group switch */}
                    <label className="flex items-center gap-2 text-[10px] sm:text-xs font-black text-slate-500 dark:text-slate-400 uppercase select-none cursor-pointer bg-slate-50 dark:bg-slate-900 px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
                      <input 
                        type="checkbox" 
                        checked={isGrouped} 
                        onChange={e => {
                          setIsGrouped(e.target.checked);
                          setSelectedExIds([]);
                        }}
                        className="w-4 h-4 rounded text-indigo-600 focus:ring-indigo-500 cursor-pointer"
                      />
                      <span>Agrupar por Frase Base</span>
                    </label>

                    {/* Open Filters Modal Button */}
                    <button
                      onClick={() => setShowFiltersModal(true)}
                      className={`px-3.5 py-2 rounded-xl text-[11px] sm:text-xs font-bold border flex items-center gap-2 transition cursor-pointer shadow-sm ${
                        isAnyFilterActive 
                          ? 'bg-indigo-600 text-white border-indigo-700 hover:bg-indigo-700' 
                          : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800'
                      }`}
                    >
                      <Sliders size={14} />
                      <span>Filtros y Ordenación</span>
                      {isAnyFilterActive && (
                        <span className="bg-red-500 text-white rounded-full px-1.5 py-0.5 text-[8px] font-black leading-none">
                          Activo
                        </span>
                      )}
                    </button>
                  </div>
                </div>

                {/* Search Bar and Batch Actions on the main page */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-center">
                  <div className="relative md:col-span-6">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" size={14} />
                    <input 
                      type="text"
                      placeholder="Buscar rápidamente por frase o traducción..." 
                      value={exerciseSearchQuery}
                      onChange={e => setExerciseSearchQuery(e.target.value)}
                      className="w-full p-2.5 pl-9 rounded-xl border border-slate-200 dark:border-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 font-medium bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 text-xs shadow-sm"
                    />
                    {exerciseSearchQuery && (
                      <button 
                        onClick={() => setExerciseSearchQuery('')} 
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-600 font-bold"
                      >
                        ✕
                      </button>
                    )}
                  </div>

                  <div className="flex gap-2 md:col-span-6 justify-end">
                    <button 
                      onClick={() => {
                        const ids = customizeFilteredAndSortedList.map(g => g.baseId || g.id);
                        setExcludedExerciseIds(prev => prev.filter(id => !ids.includes(id)));
                        setToastMsg("✅ Todos los ejercicios filtrados han sido incluidos.");
                      }}
                      className="px-3 py-2 bg-white dark:bg-slate-950 hover:bg-slate-50 dark:hover:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 font-bold text-xs rounded-xl transition flex-1 text-center shadow-sm"
                    >
                      Incluir Filtrados ({customizeFilteredAndSortedList.length})
                    </button>
                    <button 
                      onClick={() => {
                        const ids = customizeFilteredAndSortedList.map(g => g.baseId || g.id);
                        setExcludedExerciseIds(prev => {
                          const filtered = prev.filter(id => !ids.includes(id));
                          return [...filtered, ...ids];
                        });
                        setToastMsg("🚫 Todos los ejercicios filtrados han sido excluidos.");
                      }}
                      className="px-3 py-2 bg-red-50 dark:bg-red-950/20 hover:bg-red-100 dark:hover:bg-red-900/40 text-red-600 dark:text-red-400 font-bold text-xs rounded-xl border border-red-200/50 dark:border-red-900/50 transition flex-1 text-center shadow-sm"
                    >
                      Excluir Filtrados ({customizeFilteredAndSortedList.length})
                    </button>
                  </div>
                </div>

                {/* Active Filters Indicators Row */}
                {isAnyFilterActive && (
                  <div className="flex flex-wrap items-center gap-1.5 p-2 bg-indigo-50/50 dark:bg-slate-950/40 rounded-xl border border-indigo-100/50 dark:border-slate-800/50 text-[11px]">
                    <span className="font-bold text-slate-500 uppercase text-[9px] tracking-wider mr-1">Filtros Activos:</span>
                    
                    {customizeYearFilter.length > 0 && (
                      <span className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 px-2 py-0.5 rounded-lg flex items-center gap-1 font-bold shadow-sm">
                        Año: {customizeYearFilter.join(', ')}
                        <button onClick={() => setCustomizeYearFilter([])} className="text-red-500 font-black hover:scale-110 ml-0.5">✕</button>
                      </span>
                    )}

                    {customizeSourceFilter.length > 0 && (
                      <span className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 px-2 py-0.5 rounded-lg flex items-center gap-1 font-bold shadow-sm">
                        Fuente: {customizeSourceFilter.join(', ')}
                        <button onClick={() => setCustomizeSourceFilter([])} className="text-red-500 font-black hover:scale-110 ml-0.5">✕</button>
                      </span>
                    )}

                    {customizeThemeFilter.length > 0 && (
                      <span className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 px-2 py-0.5 rounded-lg flex items-center gap-1 font-bold shadow-sm">
                        Tema: {customizeThemeFilter.map(t => getCategoryDisplayName(t)).join(', ')}
                        <button onClick={() => setCustomizeThemeFilter([])} className="text-red-500 font-black hover:scale-110 ml-0.5">✕</button>
                      </span>
                    )}

                    {customizeStatusFilter.length > 0 && (
                      <span className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 px-2 py-0.5 rounded-lg flex items-center gap-1 font-bold shadow-sm">
                        Estado: {
                          customizeStatusFilter.includes('Completed') ? '✓ Completados' :
                          customizeStatusFilter.includes('Pending') ? '⏳ Pendientes' :
                          customizeStatusFilter.includes('Learned') ? '🧠 Dominados' : '⚠️ Repaso'
                        }
                        <button onClick={() => setCustomizeStatusFilter([])} className="text-red-500 font-black hover:scale-110 ml-0.5">✕</button>
                      </span>
                    )}

                    {customizeSkillsFilter.map(sk => (
                      <span key={sk} className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 px-2 py-0.5 rounded-lg flex items-center gap-1 font-bold shadow-sm">
                        {SKILL_LABELS[sk] || sk}
                        <button onClick={() => setCustomizeSkillsFilter(prev => prev.filter(x => x !== sk))} className="text-red-500 font-black hover:scale-110 ml-0.5">✕</button>
                      </span>
                    ))}

                    {customizeTagsFilter.map(tag => (
                      <span key={tag} className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 px-2 py-0.5 rounded-lg flex items-center gap-1 font-bold shadow-sm">
                        #{tag}
                        <button onClick={() => setCustomizeTagsFilter(prev => prev.filter(x => x !== tag))} className="text-red-500 font-black hover:scale-110 ml-0.5">✕</button>
                      </span>
                    ))}

                    <button 
                      onClick={() => {
                        setCustomizeYearFilter([]);
                        setCustomizeSourceFilter([]);
                        setCustomizeThemeFilter([]);
                        setCustomizeStatusFilter('All');
                        setCustomizeSkillsFilter([]);
                        setCustomizeTagsFilter([]);
                      }} 
                      className="text-red-500 font-black hover:underline cursor-pointer ml-auto pl-2 pr-1 py-0.5"
                    >
                      Limpiar Todo
                    </button>
                  </div>
                )}
              </div>

              {/* Batch Operations Bar */}
              {selectedExIds.length > 0 && (
                <div className="mb-4 bg-gradient-to-r from-indigo-900 to-slate-900 text-white p-4 rounded-2xl shadow-xl flex flex-col md:flex-row gap-3 items-center justify-between border-2 border-indigo-700 animate-slide-up shrink-0">
                  <div className="flex items-center gap-2">
                    <span className="bg-indigo-500 text-white text-xs font-black px-2.5 py-1 rounded-full">{selectedExIds.length}</span>
                    <span className="text-sm font-bold">Ejercicios seleccionados</span>
                  </div>
                  <div className="flex flex-wrap gap-1.5 justify-center md:justify-end">
                    <button 
                      onClick={handleMarkSelectedAsDone} 
                      className="px-2.5 py-1.5 bg-green-600 hover:bg-green-500 font-bold text-xs rounded-lg shadow transition"
                      title="Marcar todo el progreso como completado"
                    >
                      ✓ Marcar Listos
                    </button>
                    <button 
                      onClick={handleMarkSelectedAsLearned} 
                      className="px-2.5 py-1.5 bg-purple-600 hover:bg-purple-500 font-bold text-xs rounded-lg shadow transition"
                      title="Marcar como Ya lo sé"
                    >
                      🧠 Ya lo sé
                    </button>
                    <button 
                      onClick={handleUnmarkSelectedAsLearned} 
                      className="px-2.5 py-1.5 bg-slate-700 hover:bg-slate-600 border border-slate-600 font-bold text-xs rounded-lg shadow transition"
                      title="Quitar de Ya lo sé"
                    >
                      🧠 Desmarcar
                    </button>
                    <button 
                      onClick={handleResetSelectedProgress} 
                      className="px-2.5 py-1.5 bg-amber-600 hover:bg-amber-500 font-bold text-xs rounded-lg shadow transition"
                      title="Iniciar progreso de cero"
                    >
                      🔄 Resetear
                    </button>
                    <button 
                      onClick={handleIncludeSelected} 
                      className="px-2.5 py-1.5 bg-indigo-600 hover:bg-indigo-500 font-bold text-xs rounded-lg shadow transition"
                      title="Incluir en las prácticas"
                    >
                      👁️ Incluir
                    </button>
                    <button 
                      onClick={handleExcludeSelected} 
                      className="px-2.5 py-1.5 bg-red-600 hover:bg-red-500 font-bold text-xs rounded-lg shadow transition"
                      title="Ocultar de las prácticas"
                    >
                      🚫 Excluir
                    </button>
                    <button 
                      onClick={() => setShowThemeModal(true)} 
                      className="px-2.5 py-1.5 bg-pink-600 hover:bg-pink-500 font-bold text-xs rounded-lg shadow transition"
                      title="Crear un tema con la selección"
                    >
                      🎯 Crear Tema
                    </button>
                  </div>
                  
                  {/* Dynamic Tag Modifier Row in Batch Bar */}
                  <div className="w-full border-t border-slate-800 pt-3 flex flex-col sm:flex-row gap-2 items-center">
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-wider">Etiquetas por Lote:</span>
                    <div className="flex gap-1.5 w-full sm:w-auto flex-1">
                      <input 
                        type="text" 
                        placeholder="Ej: Verbos, Difícil, Repaso" 
                        value={tagToModify}
                        onChange={e => setTagToModify(e.target.value)}
                        className="bg-slate-950/80 border border-slate-800 rounded-xl px-3 py-1.5 text-xs text-white font-semibold flex-1 focus:outline-none focus:border-indigo-500 placeholder:text-slate-600"
                      />
                      <button 
                        onClick={handleAddTagToSelected} 
                        className="px-3 py-1.5 bg-green-700 hover:bg-green-600 rounded-xl text-xs font-bold shadow transition"
                        title="Añadir etiqueta a los seleccionados"
                      >
                        Añadir
                      </button>
                      <button 
                        onClick={handleRemoveTagFromSelected} 
                        className="px-3 py-1.5 bg-red-800 hover:bg-red-700 rounded-xl text-xs font-bold shadow transition"
                        title="Remover etiqueta de los seleccionados"
                      >
                        Eliminar
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Exercises Listing Block */}
              <div onScroll={handleCustomizeScroll} className="flex-1 overflow-y-auto pr-1 flex flex-col gap-3">
                {(() => {
                  const filteredCount = customizeFilteredAndSortedList.length;
                  
                  // Set globally for custom themes
                  (window as any).__lastFilteredIds = customizeFilteredAndSortedList.map(g => g.baseId || g.id);
                  (window as any).__lastFilteredLength = filteredCount;

                  if (filteredCount === 0) {
                    return <p className="text-center text-slate-400 py-10 font-medium col-span-full w-full">No se encontraron ejercicios</p>;
                  }

                  // Dynamic virtualization parameters based on viewMode
                  const cols = viewMode === 'list' ? 1 : viewMode === 'gallery' ? 3 : 2;
                  const itemHeight = viewMode === 'list' ? 120 : 200;
                  const totalRows = Math.ceil(filteredCount / cols);

                  // Keep a buffer of rows before and after the viewport
                  const startRow = Math.max(0, Math.floor(custLastY / itemHeight) - 3);
                  const endRow = Math.min(totalRows, Math.ceil((800 + custLastY) / itemHeight) + 4);

                  const startIndex = startRow * cols;
                  const endIndex = Math.min(filteredCount, endRow * cols);

                  const topSpacerHeight = startRow * itemHeight;
                  const bottomSpacerHeight = Math.max(0, (totalRows - endRow) * itemHeight);

                  const visibleExsToMap = customizeFilteredAndSortedList.slice(startIndex, endIndex);

                  return (
                    <>
                      {topSpacerHeight > 0 && <div style={{ height: topSpacerHeight }} className="w-full shrink-0" />}

                      <div className={`grid ${viewMode === 'list' ? 'grid-cols-1' : viewMode === 'gallery' ? 'grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' : 'grid-cols-1 md:grid-cols-2'} gap-3`}>
                        {visibleExsToMap.map((ex, index) => {
                          const realIndex = startIndex + index;
                          const baseKey = ex.baseId || ex.id;
                          const isExcluded = excludedExerciseIds.includes(baseKey);
                          const isSelected = selectedExIds.includes(baseKey);
                          const isExpanded = expandedExIds.includes(baseKey);
                          
                          const replicas = replicasByBaseId[baseKey] || [];
                          const isDone = completionAndReviewStatus.completedMap[baseKey] || false;
                          const isLearned = learnedExIds.includes(baseKey);
                          const isReviewNeeded = completionAndReviewStatus.reviewMap[baseKey] || false;
                          
                          const totalCount = replicas.length;
                          const completedCount = replicas.filter(item => completedExIds.includes(item.id)).length;

                          // Computed Tags
                          const computedTags = [];
                          const lcat = (ex.category || "").toLowerCase();
                          const leng = (ex.eng || "").toLowerCase();
                          if (lcat.includes('grammar') || lcat.includes('verb') || lcat.includes('tense')) computedTags.push('Gramática');
                          if (lcat.includes('vocabulary') || lcat.includes('word') || lcat.includes('noun')) computedTags.push('Vocabulario');
                          if (lcat.includes('basic') || lcat.includes('level 1') || leng.length < 15) computedTags.push('Básico');
                          if (lcat.includes('advanced') || lcat.includes('level 3') || leng.length >= 30) computedTags.push('Avanzado');
                          
                          const itemCustomTags = customTags[baseKey] || [];
                          const allItemTags = [...new Set([...computedTags, ...itemCustomTags])];
                          const difficulty = leng.length < 15 ? 'Básico' : leng.length < 30 ? 'Intermedio' : 'Avanzado';

                          return (
                            <div 
                              key={baseKey} 
                              className={`flex flex-col justify-between p-4 rounded-2xl border-2 transition-all duration-200 ${
                                isExcluded 
                                  ? 'bg-red-50/20 dark:bg-red-950/5 border-red-100/50 dark:border-red-950/20 opacity-70' 
                                  : isSelected
                                    ? 'bg-indigo-50/80 dark:bg-indigo-950/40 border-indigo-500 shadow'
                                    : 'bg-white dark:bg-slate-900 border-slate-100 hover:border-indigo-100 dark:border-slate-800 shadow-sm'
                              }`}
                            >
                              <div className="flex items-start gap-3 flex-1 min-w-0">
                                {/* Checklist selection check */}
                                <input 
                                  type="checkbox" 
                                  checked={isSelected} 
                                  onChange={() => {
                                    setSelectedExIds(prev => isSelected ? prev.filter(id => id !== baseKey) : [...prev, baseKey]);
                                  }}
                                  className="w-5 h-5 mt-1 text-indigo-600 dark:text-indigo-400 rounded-lg border-slate-300 dark:border-slate-700 focus:ring-indigo-500 cursor-pointer flex-shrink-0"
                                />

                                <div className="flex-1 min-w-0 text-left">
                                  {/* Badges / Header section */}
                                  <div className="flex items-center gap-2 flex-wrap mb-2">
                                    <span className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase">#{realIndex + 1}</span>
                                    
                                    <span className="text-[9px] font-bold px-1.5 py-0.5 rounded-md bg-indigo-50 dark:bg-slate-800 text-indigo-600 dark:text-indigo-400">
                                      {getCategoryDisplayName(ex.category)}
                                    </span>

                                    {isDone && <span className="text-[9px] bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400 px-1.5 py-0.5 rounded-md font-black flex items-center gap-1">✓ Listo</span>}
                                    {isLearned && <span className="text-[9px] bg-purple-100 dark:bg-purple-950/60 text-purple-700 dark:text-purple-400 px-1.5 py-0.5 rounded-md font-black flex items-center gap-1">🧠 Dominado</span>}
                                    {isReviewNeeded && <span className="text-[9px] bg-amber-100 dark:bg-amber-950/60 text-amber-700 dark:text-amber-400 px-1.5 py-0.5 rounded-md font-black flex items-center gap-1">⚠️ Repasar</span>}
                                    {isExcluded && <span className="text-[9px] bg-red-100 dark:bg-red-950/60 text-red-700 dark:text-red-400 px-1.5 py-0.5 rounded-md font-black">Oculto</span>}
                                  </div>

                                  {/* Text lines */}
                                  <div className="flex items-center justify-between gap-1">
                                    <p className={`font-black text-sm sm:text-base text-slate-800 dark:text-slate-200 leading-snug ${isExcluded ? 'line-through text-slate-400' : ''}`}>
                                      {ex.eng}
                                    </p>
                                    <button 
                                      onClick={() => playTTS(ex.eng, selectedVoiceURI, soundEnabled)}
                                      className="p-1 text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors shrink-0"
                                      title="Escuchar pronunciación"
                                    >
                                      <Headphones size={14}/>
                                    </button>
                                  </div>
                                  
                                  {viewMode !== 'list' && (
                                    <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 font-semibold mt-1">
                                      {ex.spa}
                                    </p>
                                  )}

                                  {/* Tags layout */}
                                  <div className="flex flex-wrap gap-1 mt-2">
                                    {allItemTags.map(tag => (
                                      <span key={tag} className="text-[8px] font-bold uppercase tracking-wider px-1.5 py-0.5 bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 rounded">
                                        {tag}
                                      </span>
                                    ))}
                                  </div>
                                </div>
                              </div>

                              {/* Action details expander & primary row */}
                              <div className="flex items-center justify-between gap-2 pt-3 border-t border-slate-100 dark:border-slate-800 mt-3 shrink-0">
                                <button 
                                  onClick={() => setExpandedExIds(prev => isExpanded ? prev.filter(id => id !== baseKey) : [...prev, baseKey])}
                                  className="p-1.5 bg-slate-50 dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-500 dark:text-slate-400 rounded-xl transition flex items-center gap-1 text-[10px] font-extrabold"
                                  title="Ver información de base de datos"
                                >
                                  <Info size={14} className="text-indigo-500"/>
                                  <span>{isExpanded ? 'Ocultar info' : 'Ver info'}</span>
                                </button>

                                <div className="flex gap-1">
                                  <button 
                                    onClick={() => startSingleExercisePractice(ex)}
                                    className="px-2.5 py-1.5 bg-indigo-600 hover:bg-indigo-700 active:scale-95 text-white font-extrabold text-[11px] rounded-xl flex items-center gap-1 transition"
                                    title="Practicar solo este ejercicio"
                                  >
                                    <Play size={10} className="fill-current"/> Practicar
                                  </button>
                                  
                                  <button 
                                    onClick={() => {
                                      if (isDone) {
                                        const ids = replicas.map(r => r.id);
                                        setCompletedExIds(prev => prev.filter(id => !ids.includes(id)));
                                      } else {
                                        const ids = replicas.map(r => r.id);
                                        setCompletedExIds(prev => [...new Set([...prev, ...ids])]);
                                      }
                                    }} 
                                    className={`p-1.5 rounded-xl border transition active:scale-95 flex-shrink-0 ${isDone ? 'bg-green-100 dark:bg-green-950/40 text-green-600 border-green-200 dark:border-green-900/40' : 'bg-slate-50 dark:bg-slate-800 text-slate-500 border-slate-200 dark:border-slate-700'}`} 
                                    title={isDone ? "Reiniciar progreso" : "Marcar como listo"}
                                  >
                                    <CheckCircle2 size={14} />
                                  </button>

                                  <button 
                                    onClick={() => {
                                      if (isLearned) {
                                        setLearnedExIds(prev => prev.filter(id => id !== baseKey));
                                      } else {
                                        setLearnedExIds(prev => [...new Set([...prev, baseKey])]);
                                      }
                                    }} 
                                    className={`p-1.5 rounded-xl border transition active:scale-95 flex-shrink-0 ${isLearned ? 'bg-purple-100 dark:bg-purple-950/40 text-purple-600 border-purple-200 dark:border-purple-900/40' : 'bg-slate-50 dark:bg-slate-800 text-slate-500 border-slate-200 dark:border-slate-700'}`} 
                                    title="Alternar estado 'Ya lo sé / Dominado'"
                                  >
                                    <Sparkles size={14} />
                                  </button>

                                  <button 
                                    onClick={() => {
                                      setEditingEx(ex);
                                      setNewExForm({
                                        eng: ex.eng || ex.question || '',
                                        spa: ex.spa || ex.correctAnswer || '',
                                        category: ex.category || 'Introductions',
                                        skill: ex.skill || 'Translate',
                                        year: ex.year || '2026',
                                        source: ex.source || 'Manual',
                                        tags: itemCustomTags.join(', '),
                                        emoji: ex.emoji || '🎯'
                                      });
                                      setShowAddExerciseForm(true);
                                    }}
                                    className="p-1.5 bg-slate-50 dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-500 dark:text-slate-400 border border-slate-200 dark:border-slate-700 rounded-xl transition active:scale-95 flex-shrink-0"
                                    title="Editar este ejercicio"
                                  >
                                    <Edit2 size={14} />
                                  </button>
                                </div>
                              </div>

                              {/* EXPANDED DATABASE DETAIL PANEL */}
                              <AnimatePresence>
                                {isExpanded && (
                                  <motion.div
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: "auto" }}
                                    exit={{ opacity: 0, height: 0 }}
                                    className="overflow-hidden border-t border-slate-100 dark:border-slate-800/80 mt-3 pt-3 text-left space-y-2.5 text-xs font-semibold text-slate-600 dark:text-slate-400"
                                  >
                                    <div className="grid grid-cols-2 gap-2">
                                      <div><span className="text-slate-400 dark:text-slate-500 font-bold block text-[10px] uppercase">ID DE BASE DE DATOS</span><code className="text-slate-700 dark:text-slate-300 font-mono text-[10px]">{baseKey}</code></div>
                                      <div><span className="text-slate-400 dark:text-slate-500 font-bold block text-[10px] uppercase">DIFICULTAD</span><span className={`inline-block px-2 py-0.5 rounded text-[10px] font-black ${difficulty === 'Básico' ? 'bg-green-50 text-green-700 dark:bg-green-950/20' : difficulty === 'Intermedio' ? 'bg-amber-50 text-amber-700 dark:bg-amber-950/20' : 'bg-red-50 text-red-700 dark:bg-red-950/20'}`}>{difficulty}</span></div>
                                    </div>

                                    <div className="grid grid-cols-3 gap-2">
                                      <div><span className="text-slate-400 dark:text-slate-500 font-bold block text-[10px] uppercase">TEMA</span><span className="text-slate-700 dark:text-slate-300 text-[10px]">{getCategoryDisplayName(ex.category)}</span></div>
                                      <div><span className="text-slate-400 dark:text-slate-500 font-bold block text-[10px] uppercase">FUENTE</span><span className="text-slate-700 dark:text-slate-300 text-[10px]">{ex.source || 'Indefinido'}</span></div>
                                      <div><span className="text-slate-400 dark:text-slate-500 font-bold block text-[10px] uppercase">AÑO</span><span className="text-slate-700 dark:text-slate-300 text-[10px]">{ex.year || '2026'}</span></div>
                                    </div>

                                    <div>
                                      <span className="text-slate-400 dark:text-slate-500 font-bold block text-[10px] uppercase mb-1">CONTEO DE COMPLETADOS Y FALTANTES ({completedCount} / {totalCount})</span>
                                      <div className="w-full bg-slate-100 dark:bg-slate-800 h-2 rounded-full overflow-hidden flex">
                                        <div className="bg-emerald-500 h-full transition-all duration-300" style={{ width: `${(completedCount / totalCount) * 100}%` }} />
                                      </div>
                                    </div>

                                    <div>
                                      <span className="text-slate-400 dark:text-slate-500 font-bold block text-[10px] uppercase mb-1">HABILIDADES REPLICADAS</span>
                                      <div className="flex flex-wrap gap-1.5">
                                        {replicas.map(rep => {
                                          const done = completedExIds.includes(rep.id);
                                          return (
                                            <span 
                                              key={rep.id} 
                                              className={`text-[9px] px-2 py-0.5 rounded-full font-bold border ${
                                                done 
                                                  ? 'bg-emerald-50 border-emerald-200 text-emerald-700 dark:bg-emerald-950/20 dark:border-emerald-900/30' 
                                                  : 'bg-slate-50 border-slate-200 text-slate-500 dark:bg-slate-800 dark:border-slate-700'
                                              }`}
                                            >
                                              {SKILL_LABELS[rep.skill] || rep.skill} {done ? '✓' : '⏳'}
                                            </span>
                                          );
                                        })}
                                      </div>
                                    </div>

                                    {/* Tag incorporation & deletion panel inside detail */}
                                    <div>
                                      <span className="text-slate-400 dark:text-slate-500 font-bold block text-[10px] uppercase mb-1.5">ADMINISTRAR ETIQUETAS</span>
                                      <div className="flex flex-wrap gap-1.5 items-center mb-2">
                                        {allItemTags.map(tag => {
                                          const isCustom = itemCustomTags.includes(tag);
                                          return (
                                            <span 
                                              key={tag} 
                                              className="inline-flex items-center gap-1 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 px-2 py-1 rounded-xl text-[10px] font-bold"
                                            >
                                              <span>{tag}</span>
                                              {isCustom && (
                                                <button 
                                                  onClick={() => {
                                                    setCustomTags(prev => {
                                                      const current = prev[baseKey] || [];
                                                      return {
                                                        ...prev,
                                                        [baseKey]: current.filter(t => t !== tag)
                                                      };
                                                    });
                                                    setToastMsg(`❌ Etiqueta "${tag}" eliminada.`);
                                                  }}
                                                  className="hover:bg-red-200 dark:hover:bg-red-900/40 hover:text-red-600 text-slate-400 rounded-full p-0.5 transition-colors"
                                                  title="Eliminar esta etiqueta"
                                                >
                                                  <XCircle size={10}/>
                                                </button>
                                              )}
                                            </span>
                                          );
                                        })}
                                      </div>
                                      
                                      {/* Quick add custom tag field */}
                                      <div className="flex gap-2 items-center">
                                        <input 
                                          type="text" 
                                          placeholder="Añadir etiqueta (e.g. Verbos)"
                                          onKeyDown={e => {
                                            if (e.key === 'Enter') {
                                              const targetVal = (e.target as HTMLInputElement).value.trim();
                                              if (targetVal) {
                                                setCustomTags(prev => {
                                                  const current = prev[baseKey] || [];
                                                  if (!current.includes(targetVal)) {
                                                    return { ...prev, [baseKey]: [...current, targetVal] };
                                                  }
                                                  return prev;
                                                });
                                                (e.target as HTMLInputElement).value = '';
                                                setToastMsg(`✅ Etiqueta "${targetVal}" añadida.`);
                                              }
                                            }
                                          }}
                                          className="bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-2.5 py-1 text-[10px] text-slate-700 dark:text-slate-300 font-bold focus:outline-none focus:border-indigo-500 placeholder:text-slate-400 w-full"
                                        />
                                        <span className="text-[9px] text-slate-400 dark:text-slate-500 italic shrink-0">Presiona Enter para añadir</span>
                                      </div>
                                    </div>
                                  </motion.div>
                                )}
                              </AnimatePresence>
                            </div>
                          );
                        })}
                      </div>

                      {bottomSpacerHeight > 0 && <div style={{ height: bottomSpacerHeight }} className="w-full shrink-0" />}
                    </>
                  );
                })()}
              </div>
            </div>
          </div>
        )}

        {currentScreen === 'stats' && <StatsScreen stats={stats} onBack={() => setCurrentScreen('home')} completedExIds={completedExIds} exercises={EXERCISES_DB} learnedExIds={learnedExIds} />}
        {currentScreen === 'ai_hub' && <AIHubScreen onSelect={(screen: string) => setCurrentScreen(screen)} onBack={() => setCurrentScreen('home')} />}
        {currentScreen === 'ai_story' && <AIStoryScreen onBack={() => setCurrentScreen('ai_hub')} selectedVoiceURI={selectedVoiceURI} />}
        {currentScreen === 'ai_chat' && <AIChatScreen onBack={() => setCurrentScreen('ai_hub')} selectedVoiceURI={selectedVoiceURI} />}

        {currentScreen === 'exercise' && (
          <div className={`flex-1 flex flex-col overflow-y-auto w-full transition-colors duration-500 ${queue.length > 0 && queue[currentIndex] ? getCategoryBgColor(queue[currentIndex].category || queue[currentIndex].category) : 'bg-slate-50 dark:bg-slate-950'}`}>
            {queue.length > 0 && queue[currentIndex] ? (() => {
             let currentTimer = enableTimer ? getAdjustedTimerSeconds(stats, timerSeconds, progressionStyle) : 90;
             let currentWords = dictationWordsPerChunk;
             if (progressiveDifficulty) {
                 const hitRate = stats.totalAttempted > 5 ? (stats.correctFirstTry / stats.totalAttempted) : 0.5;
                 if (hitRate >= 0.8) { currentWords = Math.min(10, dictationWordsPerChunk + 2); }
                 else if (hitRate <= 0.4) { currentWords = Math.max(2, dictationWordsPerChunk - 1); }
             }
             return (
               <ExerciseEngine 
                key={currentIndex}
                 timerSeconds={currentTimer}
                 guidanceCount={guidanceCount}
                 guideTrackingCount={queue[currentIndex].trackKey ? (guideTracking[queue[currentIndex].trackKey] || 0) : undefined}
                 dictationWordsPerChunk={currentWords} exercise={queue[currentIndex]} onProceed={(correct: boolean, isKnown: boolean, action?: string) => {
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
                     
                     let kbModeStr = '';
                     if (!isMistakeMode && activeCategory !== 'ByPhrase' && enableMultiModalProgression && splitNodesByMode) {
                         const isKb = (t: string) => ['flashcard', 'build_sentence', 'listen_and_write', 'dialogue_chat', 'quiz', 'reading', 'dictation'].includes(t);
                         const firstKb = queue.find(ex => isKb(ex.type));
                         if (firstKb && firstKb.targetKeyboardMode) {
                             kbModeStr = '_' + firstKb.targetKeyboardMode;
                         } else {
                             // If there are no keyboard exercises, it must be a non_kb session
                             kbModeStr = '_non_kb';
                         }
                     }
                     let sessionKey = isMistakeMode ? 'mistakes' : `${activeCategory}_${activeSkill}${kbModeStr}`;
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
                enableTimer={enableTimer} 
                defaultKeyboardMode={currentKeyboardMode} onChangeKeyboardMode={setCurrentKeyboardMode}
                allowedKeyboards={allowedKeyboards} alwaysAllowFreeKeyboard={alwaysAllowFreeKeyboard} flashcardMode={flashcardMode} strictTyping={strictTyping}
                enableMultiModalProgression={enableMultiModalProgression} enableProgressiveGuidance={enableProgressiveGuidance}
                randomizeKeyboardsMode={randomizeKeyboardsMode}
                enableMicCountdown={enableMicCountdown}
                clickSavings={enableClickSavings}
                syncAudioAdvance={syncAudioAdvance}
                voiceSpeedPrompt={voiceSpeedPrompt}
                voiceSpeedAnswer={voiceSpeedAnswer}
                voiceSpeedFeedback={voiceSpeedFeedback}
                hidePositiveFeedback={hidePositiveFeedback}
                onSaveMistake={(ex: any) => {if(!mistakes.find(m=>m.id===ex.id)) setMistakes([...mistakes, ex]);}} 
                onRemoveMistake={(id: string) => setMistakes(mistakes.filter(m=>m.id!==id))} isMistakeMode={isMistakeMode} onUpdateStats={handleUpdateStats}
                strictMistakeLogging={strictMistakeLogging}
                onWordClickGlobal={handleWordClickGlobal}
                enableMarkAsKnown={enableMarkAsKnown}
                queue={queue}
                setQueue={setQueue}
                currentIndex={currentIndex}
                setCurrentIndex={setCurrentIndex}
                
                dictationPauseMs={dictationPauseMs}
                dictationSpeed={dictationSpeed}
              />
             )
            })() : (
              <div className="flex-1 flex items-center justify-center bg-slate-50 dark:bg-slate-950 flex-col gap-4">
                 <span className="text-4xl">🔄</span>
                 <p className="text-indigo-600 dark:text-indigo-300 font-bold text-center px-6">Cargando...</p>
                 <button onClick={() => setCurrentScreen('home')} className="mt-4 px-6 py-3 bg-indigo-500 text-white rounded-xl font-bold shadow active:scale-95 flex items-center gap-2">
                   <ArrowLeft size={20}/> Volver al Inicio
                 </button>
              </div>
            )}
          </div>
        )}

        {currentScreen === 'summary' && (
          <div className="flex-1 p-[clamp(1rem,3vw,2rem)] flex flex-col items-center justify-center text-center bg-indigo-50 dark:bg-slate-950 w-full max-w-[clamp(320px,95vw,1400px)] mx-auto">
            <div className="text-8xl mb-6">🏆</div>
            <h2 className="text-4xl font-bold text-purple-600 mb-2">¡Misión Cumplida!</h2>
            <p className="text-2xl text-gray-600 dark:text-slate-400 mb-10 bg-indigo-50/30 dark:bg-slate-900/80 p-4 rounded-2xl shadow">Puntaje: <span className="font-bold text-green-500">{score}</span> / {queue.length}</p>
            <div className="w-full flex flex-col gap-4">
               <button onClick={() => setCurrentScreen(isMistakeMode ? 'home' : 'skill_select')} className="px-8 py-4 bg-purple-500 text-white rounded-2xl font-bold text-2xl shadow-lg hover:bg-purple-600 flex items-center gap-2 w-full justify-center active:scale-95"><ArrowLeft /> Volver a Temas</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
