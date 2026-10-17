import { ArrowUp, Keyboard, Layers, LayoutGrid, PenTool, Type } from 'lucide-react';
import { useEffect, useState } from 'react';
import { KEYBOARD_OPTIONS } from '../data';
import { playTTS } from '../utils';

export function SimpleKeyboard({ targetText, currentInput, onKeyPress, onBackspace, selectedVoiceURI, strictTyping, showHint }: any) {
  const getRemaining = () => {
    const counts: Record<string, number> = {};
    const processChar = (c: string) => strictTyping ? c : c.toLowerCase().replace(/[.,!¿?¡:;"'()\-_–—/\\*#@$%^&[\]{}]/g, '');

    const target = (targetText || '').split('').map(processChar).filter((c: string) => c);
    const input = (currentInput || '').split('').map(processChar).filter((c: string) => c);

    target.forEach((c: string) => { counts[c] = (counts[c] || 0) + 1; });
    input.forEach((c: string) => { if (counts[c]) counts[c]--; });
    
    let nextChar = null;
    let isMatchingSoFar = true;
    for(let i=0; i<input.length; i++) {
       if (input[i] !== target[i]) { isMatchingSoFar = false; break; }
    }
    if (isMatchingSoFar && input.length < target.length) {
       nextChar = target[input.length];
    }
    
    return { counts, nextChar };
  };
  const { counts: remaining, nextChar } = getRemaining();
  const keys = Object.keys(remaining).filter(k => remaining[k] > 0);
  const hasSpace = keys.includes(' ');
  const letterKeys = keys.filter(k => k !== ' ' && k !== '').sort();

  const handleKeyPress = (k: string) => {
    playTTS(k.toUpperCase() + '.', 'en', selectedVoiceURI);
    onKeyPress(strictTyping ? k : k.toLowerCase());
  };

  return (
    <div className="w-full bg-indigo-50 dark:bg-indigo-900/40 p-3 rounded-2xl mt-4 border-2 border-indigo-100 dark:border-indigo-800 flex flex-col gap-2 shadow-inner">
      <div className="flex flex-wrap justify-center gap-2">
        {letterKeys.map(k => {
          const isNext = showHint && nextChar === k;
          return (
            <button key={k} onClick={() => handleKeyPress(k)} className={`relative px-5 py-2 border-b-4 rounded-xl font-black text-xl active:scale-95 active:border-b-0 transition-transform ${isNext ? 'bg-yellow-300 border-yellow-500 text-yellow-900 animate-pulse shadow-md z-10 scale-105' : 'bg-white dark:bg-slate-900 border-gray-300 text-gray-800 dark:text-slate-200'}`}>
              {k}
              {remaining[k] > 1 && <span className={`absolute -top-2 -right-2 text-white text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center border-2 border-white shadow-sm ${isNext ? 'bg-yellow-600' : 'bg-indigo-500'}`}>{remaining[k]}</span>}
            </button>
          );
        })}
      </div>
      <div className="flex justify-center gap-2 mt-1">
         {hasSpace && <button onClick={() => onKeyPress(' ')} className={`flex-1 max-w-[200px] py-2 border-b-4 rounded-xl font-black active:scale-95 active:border-b-0 transition-transform ${showHint && nextChar === ' ' ? 'bg-yellow-300 border-yellow-500 text-yellow-900 animate-pulse shadow-md' : nextChar === ' ' ? 'bg-indigo-500 text-white border-indigo-700' : 'bg-white dark:bg-slate-900 border-gray-300 text-gray-700 dark:text-slate-300'}`}>ESPACIO</button>}
         <button onClick={onBackspace} className="px-6 py-2 bg-red-100 border-b-4 border-red-300 rounded-xl font-black text-red-600 active:scale-95 active:border-b-0 transition-transform">⌫</button>
      </div>
    </div>
  );
}

export function FullQwertyKeyboard({ targetText, currentInput, onKeyPress, onBackspace, selectedVoiceURI, strictTyping, showHint }: any) {
  const [isShifted, setIsShifted] = useState(false);
  const [isSymbol, setIsSymbol] = useState(false);

  const getRemaining = () => {
    const counts: Record<string, number> = {};
    const processChar = (c: string) => strictTyping ? c : c.toLowerCase().replace(/[.,!¿?¡:;"'()\-_–—/\\*#@$%^&[\]{}]/g, '');

    const target = (targetText || '').split('').map(processChar).filter((c: string) => c);
    const input = (currentInput || '').split('').map(processChar).filter((c: string) => c);

    target.forEach((c: string) => { counts[c] = (counts[c] || 0) + 1; });
    input.forEach((c: string) => { if (counts[c]) counts[c]--; });
    
    let nextChar = null;
    let isMatchingSoFar = true;
    for(let i=0; i<input.length; i++) {
       if (input[i] !== target[i]) { isMatchingSoFar = false; break; }
    }
    if (isMatchingSoFar && input.length < target.length) {
       nextChar = target[input.length];
    }
    
    return { counts, nextChar };
  };
  const { counts: remaining, nextChar } = getRemaining();

  const handleKeyPress = (k: string) => {
    if (k === 'shift') { setIsShifted(!isShifted); return; }

    let outputChar = k;
    if (!isSymbol && k.length === 1) {
       outputChar = isShifted ? k.toUpperCase() : k.toLowerCase();
       if (isShifted) setIsShifted(false);
    }

    if(k.length === 1 && /[a-zA-Z]/.test(k)) {
       playTTS(k.toUpperCase() + '.', 'en', selectedVoiceURI);
    }
    onKeyPress(outputChar);
  };

  const rowsAlpha = [
    ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'],
    ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l'],
    ['shift', 'z', 'x', 'c', 'v', 'b', 'n', 'm', 'backspace']
  ];

  const rowsSym = [
    ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'],
    ['@', '#', '$', '_', '&', '-', '+', '(', ')'],
    ['*', '"', "'", ':', ';', '!', '?', ',', '.', 'backspace']
  ];

  const currentRows = isSymbol ? rowsSym : rowsAlpha;

  const isKeyNeeded = (k: string) => {
     if (k === 'shift') {
        const needsShift = Object.keys(remaining).some(r => /[A-Z]/.test(r) && remaining[r] > 0);
        return needsShift && !isShifted;
     }
     if (k === '?123' || k === 'ABC') {
        const needsSymbol = Object.keys(remaining).some(r => /[^a-zA-Z\s]/.test(r) && remaining[r] > 0);
        return isSymbol ? !needsSymbol : needsSymbol; 
     }
     
     if (strictTyping) {
         if (!isSymbol && k.length === 1) {
             const checkChar = isShifted ? k.toUpperCase() : k.toLowerCase();
             return remaining[checkChar] > 0;
         }
         return remaining[k] > 0;
     } else {
         return remaining[k.toLowerCase()] > 0;
     }
  };

  const isNextKey = (k: string) => {
      if (!showHint || !nextChar) return false;
      const targetChar = strictTyping ? nextChar : nextChar.toLowerCase();
      if (k === 'shift') {
         if (/[A-Z]/.test(nextChar) && !isShifted) return true;
         return false;
      }
      if (!isSymbol && k.length === 1) {
          const checkChar = isShifted ? k.toUpperCase() : k.toLowerCase();
          const cleanCheck = strictTyping ? checkChar : checkChar.toLowerCase();
          return cleanCheck === targetChar;
      }
      return k.toLowerCase() === targetChar;
  };

  const getKeyCount = (k: string) => {
     if (['shift', 'backspace', '?123', 'ABC'].includes(k)) return 0;
     if (strictTyping) {
         if (!isSymbol && k.length === 1) {
             const checkChar = isShifted ? k.toUpperCase() : k.toLowerCase();
             return remaining[checkChar] || 0;
         }
         return remaining[k] || 0;
     }
     return remaining[k.toLowerCase()] || 0;
  };

  const renderKey = (k: string) => {
     let displayObj: any = isSymbol ? k : (isShifted ? k.toUpperCase() : k.toLowerCase());
     if (k === 'shift') displayObj = <ArrowUp size={16}/>;
     if (k === 'backspace') displayObj = '⌫';

     const needed = isKeyNeeded(k);
     const count = getKeyCount(k);
     const isNext = isNextKey(k);

     let bgClasses = needed 
        ? (k === 'shift' ? 'bg-yellow-400 text-yellow-900 border-yellow-600 scale-105' : 'bg-indigo-500 text-white border-indigo-700 z-10 scale-105') 
        : 'bg-white dark:bg-slate-900 text-gray-500 border-gray-300 opacity-80 hover:opacity-100';
     
     if (isNext) bgClasses = 'bg-yellow-300 text-yellow-900 border-yellow-500 z-20 scale-110 animate-pulse shadow-md';
     
     if (k === 'backspace') bgClasses = 'bg-red-300 text-white border-red-500 opacity-90';

     return (
       <button
         key={k}
         onClick={() => k === 'backspace' ? onBackspace() : handleKeyPress(k)}
         className={`relative flex-1 ${k === 'shift' || k === 'backspace' ? 'max-w-[50px]' : 'max-w-[40px]'} h-10 sm:h-12 rounded-lg font-black text-sm sm:text-lg transition-all active:scale-95 flex items-center justify-center border-b-4 shadow-sm ${bgClasses}`}
       >
          {displayObj}
          {count > 1 && (
            <span className={`absolute -top-2 -right-2 text-[10px] sm:text-[11px] font-black w-4 h-4 sm:w-5 sm:h-5 rounded-full flex items-center justify-center border-2 border-white shadow-sm ${isNext ? 'bg-indigo-500 text-white' : 'bg-yellow-400 text-yellow-900'}`}>
              {count}
            </span>
          )}
       </button>
     );
  };

  return (
    <div className="w-full bg-slate-200 p-2 sm:p-3 rounded-2xl mt-4 flex flex-col gap-2 shadow-inner border-2 border-slate-300">
       {currentRows.map((row, i) => (
         <div key={i} className="flex justify-center gap-1 sm:gap-1.5">
            {row.map(k => renderKey(k))}
         </div>
       ))}
       <div className="flex justify-center gap-1 sm:gap-1.5 mt-1">
          <button
            onClick={() => setIsSymbol(!isSymbol)}
            className={`flex-1 max-w-[60px] h-10 sm:h-12 rounded-lg font-black text-xs sm:text-sm transition-all active:scale-95 border-b-4 shadow-sm flex items-center justify-center ${isKeyNeeded(isSymbol ? 'ABC' : '?123') ? 'bg-yellow-400 text-yellow-900 border-yellow-600 scale-105' : 'bg-gray-300 text-gray-600 dark:text-slate-400 border-gray-400'}`}
          >
            {isSymbol ? 'ABC' : '?123'}
          </button>
          <button
            onClick={() => handleKeyPress(' ')}
            className={`flex-[3] h-10 sm:h-12 rounded-lg font-black text-xs sm:text-sm transition-all active:scale-95 border-b-4 shadow-sm flex items-center justify-center ${
              showHint && nextChar === ' '
                ? 'bg-yellow-300 text-yellow-900 border-yellow-500 z-20 scale-[1.03] animate-pulse shadow-md font-bold text-sm'
                : nextChar === ' '
                ? 'bg-indigo-500 text-white border-indigo-700 scale-[1.02]'
                : 'bg-white dark:bg-slate-900 text-gray-400 border-gray-300 opacity-80'
            }`}
          >
            ESPACIO
          </button>
       </div>
    </div>
  );
}

export function HybridInputBox({ exercise, mode, alwaysAllowFreeKeyboard, onChangeKeyboardMode, allowedKeyboards, disabled, onResult, selectedVoiceURI, strictTyping, enableMultiModalProgression, enableProgressiveGuidance, randomizeKeyboardsMode, clickSavings }: any) {
  const [inputStr, setInputStr] = useState('');
  const [selectedWords, setSelectedWords] = useState<string[]>([]);
  const [availableWords, setAvailableWords] = useState<string[]>([]);

  const actualMode = mode;
  const hideSwitcher = (enableMultiModalProgression || randomizeKeyboardsMode === 'entry');

  useEffect(() => {
    if (disabled || !alwaysAllowFreeKeyboard || actualMode === 'manual') return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key.length === 1 && !e.ctrlKey && !e.metaKey && !e.altKey) {
        if (onChangeKeyboardMode) {
          onChangeKeyboardMode('manual');
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [disabled, alwaysAllowFreeKeyboard, actualMode, onChangeKeyboardMode]);
  const showHint = enableProgressiveGuidance;

  useEffect(() => {
    if (disabled) return;
    if (clickSavings && inputStr.trim() !== '') {
      const target = (exercise.correctAnswer || exercise.correctSentence || exercise.textToSpeak || exercise.textToRead || exercise.eng || '').trim();
      if (target) {
        const clean = (s: string) => {
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

        if (clean(inputStr) === clean(target)) {
          onResult(inputStr);
        }
      }
    }
  }, [inputStr, exercise, clickSavings, onResult, disabled]);

  useEffect(() => {
    if (disabled) return;
    if (clickSavings && actualMode === 'bubbles' && selectedWords.length > 0) {
      const currentInput = exercise.isSingleWord ? selectedWords.join('') : selectedWords.join(' ');
      const target = (exercise.correctAnswer || exercise.correctSentence || exercise.textToSpeak || exercise.textToRead || exercise.eng || '').trim();
      if (target) {
        const clean = (s: string) => {
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

        if (clean(currentInput) === clean(target)) {
          onResult(currentInput);
        } else if (availableWords.length === 0) {
          onResult(currentInput);
        }
      }
    }
  }, [selectedWords, availableWords, exercise, clickSavings, actualMode, onResult, disabled]);

  const isBubbleMatch = (w1: string, w2: string) => {
    if (!w1 || !w2) return false;
    const clean = (s: string) => s.toLowerCase().replace(/[.,!¿?¡:;"'()\-_–—/\\*#@$%^&[\]{}]/g, '').trim();
    return clean(w1) === clean(w2);
  };

  const cleanWord = (w: string) => {
     if (!w) return '';
     const shouldStrict = strictTyping && !isVirtual;
     const cleaned = shouldStrict ? w : w.toLowerCase().replace(/[.,!¿?¡:;"'()\-_–—/\\*#@$%^&[\]{}]/g, '');
     return cleaned.replace(/\s+/g, ' ').trim();
  };

  const wordsStr = exercise.words ? exercise.words.join(',') : '';

  useEffect(() => {
    let targetWords = [];
    if (exercise.words) {
      targetWords = [...exercise.words];
    } else {
      const cleanTarget = (exercise.correctAnswer || exercise.correctSentence || exercise.textToSpeak || exercise.textToRead || exercise.eng || '').trim().replace(/\s+/g, ' ');
      targetWords = cleanTarget ? cleanTarget.split(exercise.isSingleWord ? '' : ' ') : [];
    }
    setAvailableWords(targetWords.sort(() => Math.random() - 0.5));
    setSelectedWords([]);
    setInputStr('');
  }, [exercise.id, exercise.eng, exercise.correctAnswer, wordsStr, exercise.words, exercise.isSingleWord]);

  const handleInputChange = (newStr: string) => {
    if (disabled) return;
    
    // Normalize spacing to avoid double spaces
    let processedStr = newStr.replace(/ {2,}/g, ' ');
    const isDeleting = processedStr.length < inputStr.length;
    const isWordMode = actualMode === 'virtual_word' || actualMode === 'qwerty_word';

    if (isWordMode && !exercise.isSingleWord && !isDeleting) {
      const targetText = (exercise.correctAnswer || exercise.correctSentence || exercise.textToSpeak || exercise.textToRead || exercise.eng || '').trim().replace(/\s+/g, ' ');
      const targetWords = targetText.split(' ');
      const inputWords = processedStr.split(' ');
      const currentWordIndex = inputWords.length - 1;

      if (currentWordIndex < targetWords.length && !processedStr.endsWith(' ')) {
        const currentTargetW = cleanWord(targetWords[currentWordIndex]);
        const currentInputW = cleanWord(inputWords[currentWordIndex]);
        
        const isMatch = strictTyping ? currentInputW === currentTargetW : currentInputW.toLowerCase() === currentTargetW.toLowerCase();

        if (currentTargetW && isMatch) {
          const originalWord = targetWords[currentWordIndex];
          const punctuationMatch = strictTyping ? null : originalWord.match(/[.,!¿?¡:;"'()\-_–—]+$/);
          const punctuation = punctuationMatch ? punctuationMatch[0] : '';

          let finalStr = strictTyping ? processedStr : (processedStr.trim() + punctuation);
          
          if (currentWordIndex < targetWords.length - 1 && !finalStr.endsWith(' ')) {
             finalStr += ' '; 
          }
          setInputStr(finalStr);
          return;
        }
      }
    }
    
    setInputStr(processedStr);
  };

  const playWordAudio = (word: string) => {
    if (!word) return;
    const cWord = word.replace(/[.,!¿?¡:;"'()\-_–—/\\*#@$%^&[\]{}]/g, '');
    playTTS(exercise.isSingleWord ? cWord.toLowerCase() : cWord, 'en', selectedVoiceURI);
  };

  const selectWord = (w: string, i: number) => { if (disabled) return; playWordAudio(w); setSelectedWords([...selectedWords, w]); setAvailableWords(availableWords.filter((_, idx) => idx !== i)); };
  const removeWord = (w: string, i: number) => { if (disabled) return; playWordAudio(w); setSelectedWords(selectedWords.filter((_, idx) => idx !== i)); setAvailableWords([...availableWords, w]); };

  const handleComprobar = () => {
    if (actualMode === 'bubbles') {
      onResult(exercise.isSingleWord ? selectedWords.join('') : selectedWords.join(' '));
    } else {
      onResult(inputStr);
    }
  };

  const isWordMode = actualMode === 'virtual_word' || actualMode === 'qwerty_word';
  const isQwerty = actualMode.startsWith('qwerty');
  const isVirtual = actualMode.startsWith('virtual');

  let currentTargetWord = '';
  let currentInputWord = '';
  let nextTargetWordBubble = '';
  if (isWordMode) {
     const targetText = (exercise.correctAnswer || exercise.correctSentence || exercise.textToSpeak || exercise.textToRead || exercise.eng || '').trim().replace(/\s+/g, ' ');
     if (!exercise.isSingleWord) {
        const targetWords = targetText.split(' ');
        const inputWords = inputStr.split(' ');
        const currentWordIndex = inputWords.length - 1;
        if (currentWordIndex < targetWords.length) {
           currentTargetWord = cleanWord(targetWords[currentWordIndex]);
           currentInputWord = cleanWord(inputWords[currentWordIndex]) || ''; 
        }
     } else {
        currentTargetWord = cleanWord(targetText);
        currentInputWord = cleanWord(inputStr);
     }
  } else if (actualMode === 'bubbles' && showHint) {
     const targetText = (exercise.correctAnswer || exercise.correctSentence || exercise.textToSpeak || exercise.textToRead || exercise.eng || '').trim().replace(/\s+/g, ' ');
     const tWords = targetText.split(exercise.isSingleWord ? '' : ' ');
     if (selectedWords.length < tWords.length) {
         nextTargetWordBubble = tWords[selectedWords.length];
     }
  }

  const extractText = (s: string) => {
      if (!s) return '';
      const shouldStrict = strictTyping && !isVirtual;
      const cleaned = shouldStrict ? s : s.toLowerCase().replace(/[.,!¿?¡:;"'()\-_–—/\\*#@$%^&[\]{}]/g, '');
      return cleaned.replace(/\s+/g, ' ').trimStart();
  };

  let keyboardTargetText = isWordMode && !exercise.isSingleWord ? currentTargetWord : extractText(exercise.correctAnswer || exercise.correctSentence || exercise.textToSpeak || exercise.textToRead || exercise.eng);
  let keyboardCurrentInput = isWordMode && !exercise.isSingleWord ? currentInputWord : extractText(inputStr);
  
  if (isWordMode && !exercise.isSingleWord && currentTargetWord !== '') {
      const isMatch = strictTyping ? currentInputWord === currentTargetWord : currentInputWord.toLowerCase() === currentTargetWord.toLowerCase();
      if (isMatch) {
          const targetWords = (exercise.correctAnswer || exercise.correctSentence || exercise.textToSpeak || exercise.textToRead || exercise.eng || '').trim().replace(/\s+/g, ' ').split(' ');
          const currentWordIndex = inputStr.split(' ').length - 1;
          if (currentWordIndex < targetWords.length - 1 && !inputStr.endsWith(' ')) {
              keyboardTargetText += ' ';
          }
      }
  }

  let activeOptions = KEYBOARD_OPTIONS.filter(opt => allowedKeyboards && allowedKeyboards.includes(opt.id));
  if (alwaysAllowFreeKeyboard && !activeOptions.find(opt => opt.id === 'manual')) {
    activeOptions.push(KEYBOARD_OPTIONS.find(opt => opt.id === 'manual')!);
  }

  const getIconForMode = (id: string) => {
    switch(id) {
      case 'virtual_word': return <Type size={18}/>;
      case 'virtual': return <Layers size={18}/>;
      case 'qwerty_word': return <div className="flex items-center gap-[2px]"><Keyboard size={18}/><Type size={12}/></div>;
      case 'qwerty': return <div className="flex items-center gap-[2px]"><Keyboard size={18}/><Layers size={12}/></div>;
      case 'bubbles': return <LayoutGrid size={18}/>;
      case 'manual': return <PenTool size={18}/>;
      default: return <Keyboard size={18}/>;
    }
  };

  return (
    <div className="w-full flex flex-col flex-1">
      {activeOptions.length > 1 && !hideSwitcher && !enableMultiModalProgression && (
        <div className="flex gap-2 mb-2 bg-gray-200 p-1 rounded-xl w-full max-w-sm justify-center mx-auto overflow-x-auto shadow-inner">
          {activeOptions.map(opt => (
            <button 
              key={opt.id}
              onClick={() => onChangeKeyboardMode(opt.id)} 
              className={`flex-1 min-w-[40px] py-2 flex justify-center items-center rounded-lg transition-all ${actualMode === opt.id ? 'bg-white dark:bg-slate-900 shadow text-indigo-600 dark:text-indigo-300 scale-105' : 'text-gray-500 hover:text-indigo-500 dark:text-indigo-400 hover:bg-gray-300'}`} 
              title={opt.label}
            >
              {getIconForMode(opt.id)}
            </button>
          ))}
        </div>
      )}

      {showHint && (
         <div className="w-full text-center mb-2 animate-pulse transition-opacity">
            <span className="text-sm font-bold text-indigo-400 bg-indigo-50 dark:bg-indigo-900/40 px-3 py-1 rounded-full border border-indigo-100 dark:border-indigo-800 flex items-center justify-center gap-2 max-w-max mx-auto shadow-sm">
               💡 Copia esto: <span className="tracking-widest">{exercise.correctAnswer || exercise.correctSentence || exercise.textToSpeak || exercise.textToRead || exercise.eng}</span>
            </span>
         </div>
      )}

      {actualMode === 'bubbles' ? (
        <div className="flex-1 flex flex-col w-full">
          <div className="min-h-[80px] p-3 bg-slate-50 dark:bg-slate-800/40 rounded-xl border-dashed border-2 border-slate-200 dark:border-slate-700 flex flex-wrap gap-2 items-start mb-2 relative">
            {selectedWords.length === 0 && <span className="absolute inset-0 flex items-center justify-center text-gray-300 font-bold pointer-events-none">Toca las palabras abajo</span>}
            {selectedWords.map((w, i) => <button key={i} onClick={() => removeWord(w, i)} disabled={disabled} className="px-3 py-2 bg-indigo-500 text-white rounded-lg shadow-sm border-b-2 border-indigo-700 font-bold active:scale-95 z-10">{w}</button>)}
          </div>
          <div className="flex flex-wrap gap-2 justify-center mb-auto">
            {availableWords.map((w, i) => {
              const isNextBubble = showHint && isBubbleMatch(w, nextTargetWordBubble);
              return (
                <button key={i} onClick={() => selectWord(w, i)} disabled={disabled} className={`px-3 py-2 rounded-lg border-2 border-b-4 font-bold active:scale-95 transition-transform ${disabled ? 'border-gray-200 dark:border-slate-700 text-gray-300 bg-slate-50/50 dark:bg-slate-800/30' : isNextBubble ? 'border-yellow-400 border-b-yellow-500 bg-yellow-200 text-yellow-900 animate-pulse shadow-md z-10 scale-110' : 'border-gray-200 dark:border-slate-700 border-b-gray-300 text-gray-800 dark:text-slate-200 bg-white dark:bg-slate-900 hover:bg-gray-50 dark:bg-slate-800'}`}>{w}</button>
              );
            })}
          </div>
        </div>
      ) : (
        <div className="flex-1 flex flex-col w-full">
          <textarea value={inputStr} onChange={(e) => {
             const newVal = e.target.value;
             if (newVal.length > inputStr.length) {
               const added = newVal.slice(-1);
               if (added !== ' ') {
                 playTTS(added.toUpperCase() + '.', 'en', selectedVoiceURI);
               }
             }
             handleInputChange(newVal);
          }} disabled={disabled || isVirtual || isQwerty} placeholder="Escribe aquí..." className={`w-full text-center text-2xl p-2 border-2 border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:border-indigo-500 resize-none shadow-inner mb-2 ${(isVirtual || isQwerty) ? 'bg-slate-100 dark:bg-slate-900/50 cursor-not-allowed' : 'bg-slate-50 dark:bg-slate-800/50'}`} rows={2} spellCheck="false" />
          
          {isVirtual && !disabled && (
            <SimpleKeyboard 
               targetText={keyboardTargetText} 
               currentInput={keyboardCurrentInput} 
               onKeyPress={(char: string) => handleInputChange(inputStr + char)} 
               onBackspace={() => handleInputChange(inputStr.slice(0, -1))} 
               selectedVoiceURI={selectedVoiceURI} 
               strictTyping={false}
               showHint={showHint}
            />
          )}
          {isQwerty && !disabled && (
            <FullQwertyKeyboard 
               targetText={keyboardTargetText} 
               currentInput={keyboardCurrentInput} 
               onKeyPress={(char: string) => handleInputChange(inputStr + char)} 
               onBackspace={() => handleInputChange(inputStr.slice(0, -1))} 
               selectedVoiceURI={selectedVoiceURI}
               strictTyping={strictTyping}
               showHint={showHint}
            />
          )}
        </div>
      )}

      <div className="h-16 mt-4">
        {!disabled && ((actualMode === 'bubbles' && availableWords.length === 0) || (actualMode !== 'bubbles' && inputStr.trim() !== '')) && (
          <button onClick={handleComprobar} className="w-full py-2 bg-indigo-500 text-white rounded-xl font-bold active:scale-95 shadow-md">Comprobar</button>
        )}
      </div>
    </div>
  );
}
