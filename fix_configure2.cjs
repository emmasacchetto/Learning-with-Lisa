const fs = require('fs');
let tsContent = fs.readFileSync('src/App.tsx', 'utf-8');

const replacement = `  const handleConfigureCustomize = (item: { id: string, type: 'year' | 'source' | 'theme' | 'skill' }) => {
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
  };`;

const startIndex = tsContent.indexOf('  const handleConfigureCustomize = (item');
if (startIndex !== -1) {
    const endIndex = tsContent.indexOf('  };', startIndex);
    if (endIndex !== -1) {
        tsContent = tsContent.substring(0, startIndex) + replacement + tsContent.substring(endIndex + 4);
        fs.writeFileSync('src/App.tsx', tsContent, 'utf-8');
        console.log("Fixed handleConfigureCustomize");
    }
}
