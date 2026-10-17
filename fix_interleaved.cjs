const fs = require('fs');
let code = fs.readFileSync('src/App.tsx', 'utf-8');

const oldElse = `      } else {
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

const newElse = `      } else {
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
      }`;

code = code.replace(oldElse, newElse);
fs.writeFileSync('src/App.tsx', code);
