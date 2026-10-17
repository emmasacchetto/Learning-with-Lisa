const fs = require('fs');
let code = fs.readFileSync('src/utils.ts', 'utf8');

const inferCode = `
const inferGender = (text: string): 'male' | 'female' | 'neutral' => {
  if (!text) return 'neutral';
  const t = text.toLowerCase();
  
  // Female indicators
  if (t.includes('she is') || t.includes('she\\\'s') || t.includes('her ') || t.match(/\\b(lisa|anna|samantha|maria|lucy|adela|tilly|agnes|emma)\\b/)) {
     return 'female';
  }
  
  // Male indicators
  if (t.includes('he is') || t.includes('he\\\'s') || t.includes('his ') || t.match(/\\b(tom|martin|raul|jeremy|david|mark|john)\\b/)) {
     return 'male';
  }
  
  return 'neutral';
};
`;

const playTTSStart = code.indexOf(`export const playTTS = (text: string, lang = 'auto', selectedVoiceURI: string | null = null, rate = 0.9, cancelPrevious = true, onBoundary: any = null, gender?: 'male' | 'female' | 'neutral') => {`);

if (playTTSStart === -1) {
    console.error("Could not find playTTS function");
    process.exit(1);
}

code = code.substring(0, playTTSStart) + inferCode + code.substring(playTTSStart);

const oldCall = `const enVoice = getEnglishVoice(voices, selectedVoiceURI, gender);`;
const newCall = `const inferredGender = gender || inferGender(text);
    const enVoice = getEnglishVoice(voices, selectedVoiceURI, inferredGender);`;

code = code.replace(oldCall, newCall);

fs.writeFileSync('src/utils.ts', code);
