const fs = require('fs');
let content = fs.readFileSync('src/App.tsx', 'utf-8');

// 1. Add isParentalUnlocked to state
if (!content.includes('const [isParentalUnlocked, setIsParentalUnlocked] = useState(false);')) {
    content = content.replace(
        'const [showParentalGate, setShowParentalGate] = useState(false);',
        'const [showParentalGate, setShowParentalGate] = useState(false);\n  const [isParentalUnlocked, setIsParentalUnlocked] = useState(false);'
    );
}

// 2. Fix parental gate check
const oldGateCheck = `    const checkGate = () => {
      if (parseInt(gateInputVal) === mathQ.ans || gateInputVal === '190618') { setShowParentalGate(false); setShowSettings(true); } 
      else { setGateErrorMsg(true); setGateInputVal(''); }
    };`;
const newGateCheck = `    const checkGate = () => {
      if (parseInt(gateInputVal) === mathQ.ans || gateInputVal === '190618' || gateInputVal === '220618') { 
        if (gateInputVal === '220618') setIsParentalUnlocked(true);
        setShowParentalGate(false); 
        setShowSettings(true); 
      } 
      else { setGateErrorMsg(true); setGateInputVal(''); }
    };`;
content = content.replace(oldGateCheck, newGateCheck);

// 3. Fix openParentalGate to skip if unlocked
const oldOpenGate = `  const openParentalGate = () => {
    const a = Math.floor(Math.random() * 10) + 5; 
    const b = Math.floor(Math.random() * 8) + 3;  
    setMathQ({ a, b, ans: a * b });
    setGateInputVal('');
    setGateErrorMsg(false);
    setShowParentalGate(true);
  };`;
const newOpenGate = `  const openParentalGate = () => {
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
  };`;
content = content.replace(oldOpenGate, newOpenGate);

// 4. Update interleaved to keep the same order for exercises
const oldInterleaved = `      } else {
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
      }`;

const newInterleaved = `      } else {
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

        // Shuffle baseIds once to keep the same exercise order across all ranks
        const baseIdsInOrder = mainReplicated
            .map(ex => ex.baseId)
            .filter((v, i, a) => a.indexOf(v) === i)
            .sort(() => Math.random() - 0.5);

        sortedRanks.forEach(r => {
            const levelExs = groupsByRank[r].sort((a, b) => baseIdsInOrder.indexOf(a.baseId) - baseIdsInOrder.indexOf(b.baseId));
            sequencedReplicated.push(...levelExs);
        });
      }`;
content = content.replace(oldInterleaved, newInterleaved);


fs.writeFileSync('src/App.tsx', content);
console.log('Done modifying App.tsx');
