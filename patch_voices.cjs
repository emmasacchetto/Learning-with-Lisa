const fs = require('fs');
let code = fs.readFileSync('src/utils.ts', 'utf8');

const getEnglishVoiceStart = code.indexOf('export const getEnglishVoice = ');
const getEnglishVoiceEnd = code.indexOf('export const getSpanishVoice = ');
const getSpanishVoiceStart = getEnglishVoiceEnd;

const oldGetEnglishVoice = code.substring(getEnglishVoiceStart, getSpanishVoiceStart);

const newGetEnglishVoice = `export const getEnglishVoice = (voices: SpeechSynthesisVoice[], selectedVoiceURI: string | null, gender?: 'male' | 'female' | 'neutral') => {
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

  addDiagLog(\`getEnglishVoice: Se encontraron \${enVoices.length} voces de inglés de un total de \${vList.length}.\`);

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
`;

code = code.replace(oldGetEnglishVoice, newGetEnglishVoice);

// Update playTTS signature
const oldPlayTTS = `export const playTTS = (text: string, lang = 'auto', selectedVoiceURI: string | null = null, rate = 0.9, cancelPrevious = true, onBoundary: any = null) => {`;
const newPlayTTS = `export const playTTS = (text: string, lang = 'auto', selectedVoiceURI: string | null = null, rate = 0.9, cancelPrevious = true, onBoundary: any = null, gender?: 'male' | 'female' | 'neutral') => {`;
code = code.replace(oldPlayTTS, newPlayTTS);

// Update getEnglishVoice call in playTTS
const oldCall = `const enVoice = getEnglishVoice(voices, selectedVoiceURI);`;
const newCall = `const enVoice = getEnglishVoice(voices, selectedVoiceURI, gender);`;
code = code.replace(oldCall, newCall);

fs.writeFileSync('src/utils.ts', code);
