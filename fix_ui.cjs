const fs = require('fs');
let code = fs.readFileSync('src/App.tsx', 'utf8');

// ==== Year ====
code = code.replace(/onClick=\{.*?setCustomizeYearFilter\('All'\)\}/g, "onClick={() => setCustomizeYearFilter([])}");
code = code.replace(/customizeYearFilter === 'All'/g, "customizeYearFilter.length === 0");
code = code.replace(/onClick=\{.*?setCustomizeYearFilter\(yr\)\}/g, "onClick={() => setCustomizeYearFilter(prev => prev.includes(yr) ? prev.filter(y => y !== yr) : [...prev, yr])}");
code = code.replace(/customizeYearFilter === yr/g, "customizeYearFilter.includes(yr)");

// ==== Source ====
code = code.replace(/onClick=\{.*?setCustomizeSourceFilter\('All'\)\}/g, "onClick={() => setCustomizeSourceFilter([])}");
code = code.replace(/customizeSourceFilter === 'All'/g, "customizeSourceFilter.length === 0");
code = code.replace(/onClick=\{.*?setCustomizeSourceFilter\(src\)\}/g, "onClick={() => setCustomizeSourceFilter(prev => prev.includes(src) ? prev.filter(s => s !== src) : [...prev, src])}");
code = code.replace(/customizeSourceFilter === src/g, "customizeSourceFilter.includes(src)");

// ==== Theme ====
code = code.replace(/onClick=\{.*?setCustomizeThemeFilter\('All'\)\}/g, "onClick={() => setCustomizeThemeFilter([])}");
code = code.replace(/customizeThemeFilter === 'All'/g, "customizeThemeFilter.length === 0");
code = code.replace(/onClick=\{.*?setCustomizeThemeFilter\(cat\)\}/g, "onClick={() => setCustomizeThemeFilter(prev => prev.includes(cat) ? prev.filter(c => c !== cat) : [...prev, cat])}");
code = code.replace(/customizeThemeFilter === cat/g, "customizeThemeFilter.includes(cat)");

// ==== Status ====
code = code.replace(/onClick=\{.*?setCustomizeStatusFilter\('All'\)\}/g, "onClick={() => setCustomizeStatusFilter([])}");
code = code.replace(/customizeStatusFilter === 'All'/g, "customizeStatusFilter.length === 0");
code = code.replace(/onClick=\{.*?setCustomizeStatusFilter\('Completed'\)\}/g, "onClick={() => setCustomizeStatusFilter(prev => prev.includes('Completed') ? prev.filter(s => s !== 'Completed') : [...prev, 'Completed'])}");
code = code.replace(/customizeStatusFilter === 'Completed'/g, "customizeStatusFilter.includes('Completed')");

code = code.replace(/onClick=\{.*?setCustomizeStatusFilter\('Pending'\)\}/g, "onClick={() => setCustomizeStatusFilter(prev => prev.includes('Pending') ? prev.filter(s => s !== 'Pending') : [...prev, 'Pending'])}");
code = code.replace(/customizeStatusFilter === 'Pending'/g, "customizeStatusFilter.includes('Pending')");

code = code.replace(/onClick=\{.*?setCustomizeStatusFilter\('Learned'\)\}/g, "onClick={() => setCustomizeStatusFilter(prev => prev.includes('Learned') ? prev.filter(s => s !== 'Learned') : [...prev, 'Learned'])}");
code = code.replace(/customizeStatusFilter === 'Learned'/g, "customizeStatusFilter.includes('Learned')");

code = code.replace(/onClick=\{.*?setCustomizeStatusFilter\('NeedsReview'\)\}/g, "onClick={() => setCustomizeStatusFilter(prev => prev.includes('NeedsReview') ? prev.filter(s => s !== 'NeedsReview') : [...prev, 'NeedsReview'])}");
code = code.replace(/customizeStatusFilter === 'NeedsReview'/g, "customizeStatusFilter.includes('NeedsReview')");

fs.writeFileSync('src/App.tsx', code);
console.log('UI Replacements executed.');
