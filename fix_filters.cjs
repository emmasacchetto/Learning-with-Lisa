const fs = require('fs');
let code = fs.readFileSync('src/App.tsx', 'utf8');

// 1. Change useState signatures
code = code.replace(
  "const [customizeYearFilter, setCustomizeYearFilter] = useState<string>('All');",
  "const [customizeYearFilter, setCustomizeYearFilter] = useState<string[]>([]);"
);
code = code.replace(
  "const [customizeSourceFilter, setCustomizeSourceFilter] = useState<string>('All');",
  "const [customizeSourceFilter, setCustomizeSourceFilter] = useState<string[]>([]);"
);
code = code.replace(
  "const [customizeThemeFilter, setCustomizeThemeFilter] = useState<string>('All');",
  "const [customizeThemeFilter, setCustomizeThemeFilter] = useState<string[]>([]);"
);
code = code.replace(
  "const [customizeStatusFilter, setCustomizeStatusFilter] = useState<string>('All');",
  "const [customizeStatusFilter, setCustomizeStatusFilter] = useState<string[]>([]);"
);

// 2. Fix the filtering logic in groupedMap
const groupedMapOld = `        if (customizeYearFilter && customizeYearFilter !== 'All' && (ex.year || "2026") !== customizeYearFilter) return;
        if (customizeSourceFilter && customizeSourceFilter !== 'All' && (ex.source || "Indefinido") !== customizeSourceFilter) return;
        if (customizeThemeFilter && customizeThemeFilter !== 'All' && ex.category !== customizeThemeFilter) return;
        if (customizeSkillsFilter.length > 0 && !customizeSkillsFilter.includes(ex.skill)) return;`;

const groupedMapNew = `        if (customizeYearFilter.length > 0 && !customizeYearFilter.includes(ex.year || "2026")) continue;
        if (customizeSourceFilter.length > 0 && !customizeSourceFilter.includes(ex.source || "Indefinido")) continue;
        if (customizeThemeFilter.length > 0 && !customizeThemeFilter.includes(ex.category)) continue;
        if (customizeSkillsFilter.length > 0 && !customizeSkillsFilter.includes(ex.skill)) continue;`;

code = code.replace(groupedMapOld, groupedMapNew);

// 3. Fix the filtering logic in currentCatExs
const currentCatExsOld = `        if (customizeYearFilter && customizeYearFilter !== 'All' && (ex.year || "2026") !== customizeYearFilter) return false;
        if (customizeSourceFilter && customizeSourceFilter !== 'All' && (ex.source || "Indefinido") !== customizeSourceFilter) return false;
        if (customizeThemeFilter && customizeThemeFilter !== 'All' && ex.category !== customizeThemeFilter) return false;`;

const currentCatExsNew = `        if (customizeYearFilter.length > 0 && !customizeYearFilter.includes(ex.year || "2026")) return false;
        if (customizeSourceFilter.length > 0 && !customizeSourceFilter.includes(ex.source || "Indefinido")) return false;
        if (customizeThemeFilter.length > 0 && !customizeThemeFilter.includes(ex.category)) return false;`;

code = code.replace(currentCatExsOld, currentCatExsNew);

// 4. Fix status filtering in groupedMap (lines 1209-1212)
const statusGroupOld = `        if (customizeStatusFilter === 'Completed' && !isDone) return false;
        if (customizeStatusFilter === 'Pending' && isDone) return false;
        if (customizeStatusFilter === 'Learned' && !isLearned) return false;
        if (customizeStatusFilter === 'NeedsReview' && !needsReview) return false;`;

const statusGroupNew = `        if (customizeStatusFilter.length > 0) {
            const matchesStatus = customizeStatusFilter.some(status => {
                if (status === 'Completed' && isDone) return true;
                if (status === 'Pending' && !isDone) return true;
                if (status === 'Learned' && isLearned) return true;
                if (status === 'NeedsReview' && needsReview) return true;
                return false;
            });
            if (!matchesStatus) return false;
        }`;

code = code.replace(statusGroupOld, statusGroupNew);

// 5. Fix status filtering in currentCatExs (lines 1263-1266)
code = code.replace(statusGroupOld, statusGroupNew); // They match!

// 6. Fix isAnyFilterActive
const anyFilterOld = `      customizeYearFilter !== 'All' ||
      customizeSourceFilter !== 'All' ||
      customizeThemeFilter !== 'All' ||
      customizeStatusFilter !== 'All' ||`;

const anyFilterNew = `      customizeYearFilter.length > 0 ||
      customizeSourceFilter.length > 0 ||
      customizeThemeFilter.length > 0 ||
      customizeStatusFilter.length > 0 ||`;

code = code.replace(anyFilterOld, anyFilterNew);

fs.writeFileSync('src/App.tsx', code);
console.log('Replacements executed.');
