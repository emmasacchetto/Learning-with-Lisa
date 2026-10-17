import { ALL_DATA, VOCABULARY_DATABASE } from './data';

export const addDiagLog = (msg: string) => {
  if (typeof window !== 'undefined') {
    (window as any)._voiceDiagLogs = (window as any)._voiceDiagLogs || [];
    const formatted = `[${new Date().toLocaleTimeString()}] ${msg}`;
    (window as any)._voiceDiagLogs.push(formatted);
    // Limit log size to prevent memory leaks
    if ((window as any)._voiceDiagLogs.length > 100) {
      (window as any)._voiceDiagLogs.shift();
    }
    if ((window as any)._onVoiceDiagLog) {
      try { (window as any)._onVoiceDiagLog(formatted); } catch (e) {}
    }
    console.log(`[Voz-Diag] ${msg}`);
  }
};

export const getEnglishVoice = (voices: SpeechSynthesisVoice[], selectedVoiceURI: string | null, gender?: 'male' | 'female' | 'neutral') => {
  const synth = typeof window !== 'undefined' ? window.speechSynthesis : null;
  let vList = voices && voices.length > 0 ? voices : (synth ? synth.getVoices() : []);
  if (!vList || vList.length === 0) {
    addDiagLog("getEnglishVoice: No hay voces cargadas en el navegador.");
    return null;
  }

  let enVoices = vList.filter(v => {
    const lang = (v.lang || '').toLowerCase().replace('_', '-');
    return lang.startsWith('en-') || lang === 'en';
  });

  const femaleNames = ['zira', 'hazel', 'samantha', 'victoria', 'karen', 'moira', 'tessa', 'fiona', 'veena', 'alice', 'amie', 'google us english female', 'female', 'girl', 'woman'];
  const maleNames = ['david', 'mark', 'arthur', 'brian', 'daniel', 'alex', 'fred', 'oliver', 'rishi', 'google us english male', 'male', 'boy', 'man', 'guy'];

  if (gender) {
    const isTargetGender = (name: string) => {
       const n = name.toLowerCase();
       if (gender === 'female') return femaleNames.some(f => n.includes(f));
       if (gender === 'male') return maleNames.some(m => n.includes(m));
       return true;
    };
    
    // Sort enVoices so that voices matching the target gender are at the front
    enVoices.sort((a, b) => {
        const aMatch = isTargetGender(a.name) ? 1 : 0;
        const bMatch = isTargetGender(b.name) ? 1 : 0;
        return bMatch - aMatch;
    });
  }

  addDiagLog(`getEnglishVoice: Se encontraron ${enVoices.length} voces de inglés de un total de ${vList.length}.`);

  const localEn = enVoices.filter(v => 
    v.localService === true || 
    (v.localService !== false && !v.name.toLowerCase().includes('google'))
  );
  
  const remoteEn = enVoices.filter(v => 
    v.localService === false || 
    (v.name.toLowerCase().includes('google') && v.localService !== true)
  );

  const isIframe = typeof window !== 'undefined' && window.self !== window.top;

  let prioritizedEn = enVoices;
  let usingLocalMode = false;
  
  if (localEn.length > 0) {
    prioritizedEn = localEn;
    usingLocalMode = true;
  }

  if (selectedVoiceURI) {
    let v = prioritizedEn.find(v => v.voiceURI === selectedVoiceURI);
    if (v) {
      // If we requested a specific gender, and the saved URI doesn't match it well, we MIGHT want to ignore the URI, but let's respect URI over gender
      return v;
    } else {
      v = enVoices.find(v => v.voiceURI === selectedVoiceURI);
      if (v) return v;
    }
  }
  
  // If we have a gender preference, the list is already sorted to have those matches first.
  // We can just try to pick the first one from prioritizedEn that matches the gender, or fallback to Apple/Microsoft specific ones.
  if (gender) {
     const isTargetGender = (name: string) => {
        const n = name.toLowerCase();
        if (gender === 'female') return femaleNames.some(f => n.includes(f));
        if (gender === 'male') return maleNames.some(m => n.includes(m));
        return true;
     };
     const genderMatch = prioritizedEn.find(v => isTargetGender(v.name));
     if (genderMatch) return genderMatch;
     const fallbackGenderMatch = enVoices.find(v => isTargetGender(v.name));
     if (fallbackGenderMatch) return fallbackGenderMatch;
  }

  const samEn = prioritizedEn.find(v => v.name.toLowerCase().includes('samantha') || v.name.toLowerCase().includes('alex') || v.name.toLowerCase().includes('daniel'));
  if (samEn) {
    return samEn;
  }

  const msEn = prioritizedEn.find(v => v.name.toLowerCase().includes('zira') || v.name.toLowerCase().includes('david') || v.name.toLowerCase().includes('hazel'));
  if (msEn) {
    return msEn;
  }

  const enUsLocal = prioritizedEn.find(v => {
    const l = (v.lang || '').toLowerCase().replace('_', '-');
    return l === 'en-us';
  });
  if (enUsLocal) {
    return enUsLocal;
  }

  if (prioritizedEn.length > 0) {
    return prioritizedEn[0];
  }

  const googleEn = enVoices.find(v => v.name.toLowerCase().includes('google us english'));
  if (googleEn) {
    return googleEn;
  }
  
  const nativeEn = enVoices.find(v => {
    const l = (v.lang || '').toLowerCase().replace('_', '-');
    return l === 'en-us' || l === 'en-gb';
  });
  
  return nativeEn || enVoices[0] || null;
};
export const getSpanishVoice = (voices: SpeechSynthesisVoice[]) => {
  const synth = typeof window !== 'undefined' ? window.speechSynthesis : null;
  let vList = voices && voices.length > 0 ? voices : (synth ? synth.getVoices() : []);
  if (!vList || vList.length === 0) {
    addDiagLog("getSpanishVoice: No hay voces cargadas en el sistema.");
    return null;
  }
  
  let esVoices = vList.filter(v => {
    const lang = (v.lang || '').toLowerCase().replace('_', '-');
    return lang.startsWith('es-') || lang === 'es';
  });

  addDiagLog(`getSpanishVoice: Se encontraron ${esVoices.length} voces de español de un total de ${vList.length}.`);

  const localEs = esVoices.filter(v => 
    v.localService === true || 
    (v.localService !== false && !v.name.toLowerCase().includes('google'))
  );
  
  const remoteEs = esVoices.filter(v => 
    v.localService === false || 
    (v.name.toLowerCase().includes('google') && v.localService !== true)
  );

  const isIframe = typeof window !== 'undefined' && window.self !== window.top;
  addDiagLog(`getSpanishVoice: Análisis de voces -> Locales (offline): ${localEs.length}, Remotas (online): ${remoteEs.length}. Running in iframe: ${isIframe}`);

  let prioritizedEs = esVoices;
  if (localEs.length > 0) {
    prioritizedEs = localEs;
    addDiagLog("getSpanishVoice: Priorizando voces locales (offline) para evitar audios mudos del sandbox.");
  }

  const iosEs = prioritizedEs.find(v => v.name.toLowerCase().includes('monica') || v.name.toLowerCase().includes('paulina') || v.name.toLowerCase().includes('jorge'));
  if (iosEs) {
    addDiagLog(`getSpanishVoice: Seleccionada local de Apple/iOS: ${iosEs.name}`);
    return iosEs;
  }

  const msEs = prioritizedEs.find(v => v.name.toLowerCase().includes('sabina') || v.name.toLowerCase().includes('helena') || v.name.toLowerCase().includes('laura'));
  if (msEs) {
    addDiagLog(`getSpanishVoice: Seleccionada local de Windows/Microsoft: ${msEs.name}`);
    return msEs;
  }
  
  const esLocal = prioritizedEs.find(v => {
    const l = (v.lang || '').toLowerCase().replace('_', '-');
    return l === 'es-es' || l === 'es-mx';
  });
  if (esLocal) {
    addDiagLog(`getSpanishVoice: Seleccionada local de Español genérico: ${esLocal.name}`);
    return esLocal;
  }
  
  if (prioritizedEs.length > 0) {
    const chosen = prioritizedEs[0];
    addDiagLog(`getSpanishVoice: Seleccionada primera de lista priorizada: ${chosen.name} (${chosen.lang})`);
    return chosen;
  }

  const googleEs = esVoices.find(v => v.name.toLowerCase().includes('google español') || v.name.toLowerCase().includes('google spanish'));
  if (googleEs) {
    addDiagLog(`getSpanishVoice: Fallback a voz Google: ${googleEs.name}`);
    return googleEs;
  }
  
  const chosen = esVoices[0] || null;
  if (chosen) {
    addDiagLog(`getSpanishVoice: Fallback final de lista general seleccionada: ${chosen.name} (${chosen.lang})`);
  } else {
    addDiagLog(`getSpanishVoice: No se pudo emparejar una voz de español.`);
  }
  return chosen;
};

export const detectLanguage = (text: string) => {
  if (!text) return 'en';
  if (/[áéíóúñÁÉÍÓÚÑ¿¡]/.test(text)) return 'es';
  const clean = text.toLowerCase().replace(/[.,!¿?¡:;"'()]/g, '').trim();
  
  if (ALL_DATA) {
    if (ALL_DATA.find((d: any) => d.spa && d.spa.toLowerCase().replace(/[.,!¿?¡:;"'()]/g, '').trim() === clean)) return 'es';
    if (ALL_DATA.find((d: any) => d.eng && d.eng.toLowerCase().replace(/[.,!¿?¡:;"'()]/g, '').trim() === clean)) return 'en';
  }
  
  const spaWords = ['el', 'la', 'los', 'las', 'una', 'ella', 'nosotros', 'hola', 'bien', 'muy', 'sujeto', 'verbo', 'borro', 'agrego', 'poder', 'para', 'decir', 'hacer', 'tengo', 'tiene', 'estoy', 'esta', 'estan'];
  const words = clean.split(/\s+/);
  const spaMatchCount = words.filter(w => spaWords.includes(w)).length;
  if (spaMatchCount > 0) return 'es';
  return 'en'; 
};

export interface TTSRequest {
  text: string;
  lang: string;
  selectedVoiceURI: string | null;
  rate: number;
  onBoundary: any;
  resolve: () => void;
}

let ttsQueue: TTSRequest[] = [];
let isProcessingTTS = false;

const speakUtterance = (req: TTSRequest): Promise<void> => {
  return new Promise<void>((resolve) => {
    const synth = typeof window !== 'undefined' ? window.speechSynthesis : null;
    if (!synth) {
      resolve();
      req.resolve();
      return;
    }

    let hasResolved = false;
    let fallbackTimeout: any = null;

    const complete = (evtName: string, extraLog = '') => {
      if (hasResolved) return;
      hasResolved = true;
      if (fallbackTimeout) {
        clearTimeout(fallbackTimeout);
      }
      if ((window as any)._tts_keepalive_interval) {
        clearInterval((window as any)._tts_keepalive_interval);
        (window as any)._tts_keepalive_interval = null;
      }
      (window as any)._tts_keepalive = null;
      resolve();
      req.resolve();
    };

    try {
      const freshVoices = synth.getVoices();
      
      const utt = new SpeechSynthesisUtterance(req.text);

      let finalLang = req.lang;
      if (req.lang === 'auto') {
        finalLang = detectLanguage(req.text);
      }

      let voice = null;
      if (finalLang === 'en') {
        voice = getEnglishVoice(freshVoices, req.selectedVoiceURI);
      } else {
        voice = getSpanishVoice(freshVoices);
      }

      if (voice) {
        utt.voice = voice;
        utt.lang = voice.lang;
      } else {
        utt.lang = finalLang === 'en' ? 'en-US' : 'es-ES';
      }

      utt.rate = req.rate;
      if (req.onBoundary) {
        utt.onboundary = req.onBoundary;
      }

      utt.onend = () => {
        complete('onend');
      };

      utt.onerror = (e: any) => {
        complete('onerror', `Error: ${e.error || 'sin error'}`);
      };

      (window as any)._tts_keepalive = utt;

      const durationSeconds = Math.max(5, req.text.length * 0.12);
      fallbackTimeout = setTimeout(() => {
        complete('timeout');
      }, durationSeconds * 1000);

      if (synth.paused) {
        synth.resume();
      }

      synth.speak(utt);

      const kInterval = setInterval(() => {
        if (synth.speaking) {
          synth.resume();
        } else {
          clearInterval(kInterval);
          if ((window as any)._tts_keepalive_interval === kInterval) {
            (window as any)._tts_keepalive_interval = null;
          }
        }
      }, 3000);
      (window as any)._tts_keepalive_interval = kInterval;

    } catch (e: any) {
      complete('catch');
    }
  });
};

const processTTSQueue = async () => {
  if (isProcessingTTS || ttsQueue.length === 0) return;
  isProcessingTTS = true;

  while (ttsQueue.length > 0) {
    const current = ttsQueue[0];
    try {
      await speakUtterance(current);
    } catch (e) {
    }
    
    if (ttsQueue.length > 0 && ttsQueue[0] === current) {
      ttsQueue.shift();
    } else {
      break;
    }
  }

  isProcessingTTS = false;
};


const inferGender = (text: string): 'male' | 'female' | 'neutral' => {
  if (!text) return 'neutral';
  const t = text.toLowerCase();
  
  // Female indicators
  if (t.includes('she is') || t.includes('she\'s') || t.includes('her ') || t.match(/\b(lisa|anna|samantha|maria|lucy|adela|tilly|agnes|emma)\b/)) {
     return 'female';
  }
  
  // Male indicators
  if (t.includes('he is') || t.includes('he\'s') || t.includes('his ') || t.match(/\b(tom|martin|raul|jeremy|david|mark|john)\b/)) {
     return 'male';
  }
  
  return 'neutral';
};
export const playTTS = (text: string, lang = 'auto', selectedVoiceURI: string | null = null, rate = 0.9, cancelPrevious = true, onBoundary: any = null, gender?: 'male' | 'female' | 'neutral') => {
  return new Promise<void>((resolve) => {
    if (!text) { 
      resolve(); 
      return; 
    }

    const synth = typeof window !== 'undefined' ? window.speechSynthesis : null;
    if (!synth) {
      resolve();
      return;
    }

    if (cancelPrevious) {
      ttsQueue = [];
      isProcessingTTS = false;
      try {
        if (synth.speaking || synth.pending) {
          synth.cancel();
        }
      } catch (err: any) {
      }
    }

    const req: TTSRequest = {
      text,
      lang,
      selectedVoiceURI,
      rate,
      onBoundary,
      resolve
    };

    ttsQueue.push(req);

    setTimeout(() => {
      processTTSQueue();
    }, cancelPrevious ? 100 : 10);
  });
};

export const translateWord = (word: string) => { if (!word) return null;
  const clean = word.toLowerCase().replace(/[.,!¿?¡:;"'()]/g, '');
  let match = VOCABULARY_DATABASE.find((v: any) => v.eng.toLowerCase() === clean);
  if (match) return { sourceLang: 'en', eng: match.eng, spa: match.spa };
  match = VOCABULARY_DATABASE.find((v: any) => v.spa.toLowerCase().replace(/[.,!¿?¡:;"'()]/g, '') === clean);
  if (match) return { sourceLang: 'es', eng: match.eng, spa: match.spa };
  return null;
};
