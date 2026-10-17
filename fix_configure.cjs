const fs = require('fs');
let tsContent = fs.readFileSync('src/App.tsx', 'utf-8');

const target = `  const handleConfigureCustomize = (item: { id: string, type: 'year' | 'source' | 'theme' | 'skill' }) => {
    if (item.type === 'year') {
      setCustomizeYearFilter(item.id.split('::')[1]);
      setCustomizeSourceFilter('All');
      setCustomizeThemeFilter('All');
      setCustomizeSkillsFilter([]);
    } else if (item.type === 'source') {
      setCustomizeYearFilter(item.id.split('::')[1]);
      setCustomizeSourceFilter(item.id.split('::')[2]);
      setCustomizeThemeFilter('All');
      setCustomizeSkillsFilter([]);
    } else if (item.type === 'theme') {
      const matchEx = (dbIndexes.byCategory.get(item.id) || [])[0];
      setCustomizeYearFilter(matchEx?.year || 'All');
      setCustomizeSourceFilter(matchEx?.source || 'All');
      setCustomizeThemeFilter(item.id);
      setCustomizeSkillsFilter([]);
    } else if (item.type === 'skill') {
      setCustomizeYearFilter('All');
      setCustomizeSourceFilter('All');
      setCustomizeThemeFilter('All');
      setCustomizeSkillsFilter([item.id.split('::')[0]]);
    }
    setCurrentScreen('customize');
  };`;

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

// need to handle whitespace carefully
// We'll just regex replace it
const regex = /const handleConfigureCustomize[^;]+setCurrentScreen\('customize'\);\s*\};\s*/s;
const match = tsContent.match(regex);
if (match) {
    tsContent = tsContent.replace(match[0], replacement + '\n');
    fs.writeFileSync('src/App.tsx', tsContent, 'utf-8');
    console.log("Fixed handleConfigureCustomize");
} else {
    console.log("Could not find handleConfigureCustomize");
}
