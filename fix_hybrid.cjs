const fs = require('fs');
let content = fs.readFileSync('src/components/Keyboards.tsx', 'utf-8');

const target = `  const hideSwitcher = (enableMultiModalProgression || randomizeKeyboardsMode === 'entry') && exercise.targetKeyboardMode !== undefined;`;

const replacement = `  const hideSwitcher = (enableMultiModalProgression || randomizeKeyboardsMode === 'entry') && exercise.targetKeyboardMode !== undefined;

  useEffect(() => {
    if (disabled || !alwaysAllowFreeKeyboard || actualMode === 'free_typing') return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key.length === 1 && !e.ctrlKey && !e.metaKey && !e.altKey) {
        if (onChangeKeyboardMode) {
          onChangeKeyboardMode('free_typing');
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [disabled, alwaysAllowFreeKeyboard, actualMode, onChangeKeyboardMode]);`;

content = content.replace(target, replacement);

fs.writeFileSync('src/components/Keyboards.tsx', content);
