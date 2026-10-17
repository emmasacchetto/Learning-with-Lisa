const fs = require('fs');
let content = fs.readFileSync('src/App.tsx', 'utf-8');

const target = `  const [allowedKeyboards, setAllowedKeyboards] = useState<string[]>(() => {`;

const replacement = `  const [alwaysAllowFreeKeyboard, setAlwaysAllowFreeKeyboard] = useState(() => localStorage.getItem('lisa_alwaysAllowFreeKeyboard') === 'true');
  const [allowedKeyboards, setAllowedKeyboards] = useState<string[]>(() => {`;

content = content.replace(target, replacement);

const target2 = `useEffect(() => { localStorage.setItem('lisa_allowedKeyboards', JSON.stringify(allowedKeyboards)); }, [allowedKeyboards]);`;

const replacement2 = `useEffect(() => { localStorage.setItem('lisa_allowedKeyboards', JSON.stringify(allowedKeyboards)); }, [allowedKeyboards]);
  useEffect(() => { localStorage.setItem('lisa_alwaysAllowFreeKeyboard', alwaysAllowFreeKeyboard.toString()); }, [alwaysAllowFreeKeyboard]);`;

content = content.replace(target2, replacement2);

fs.writeFileSync('src/App.tsx', content);
