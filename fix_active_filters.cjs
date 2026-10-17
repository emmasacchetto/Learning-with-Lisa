const fs = require('fs');
let code = fs.readFileSync('src/App.tsx', 'utf8');

// Replace Year filter
code = code.replace(/customizeYearFilter !== 'All'/g, "customizeYearFilter.length > 0");
code = code.replace(/Año: \{customizeYearFilter\}/g, "Año: {customizeYearFilter.join(', ')}");

// Replace Source filter
code = code.replace(/customizeSourceFilter !== 'All'/g, "customizeSourceFilter.length > 0");
code = code.replace(/Fuente: \{customizeSourceFilter\}/g, "Fuente: {customizeSourceFilter.join(', ')}");

// Replace Theme filter
code = code.replace(/customizeThemeFilter !== 'All'/g, "customizeThemeFilter.length > 0");
code = code.replace(/Tema: \{getCategoryDisplayName\(customizeThemeFilter\)\}/g, "Tema: {customizeThemeFilter.map(t => getCategoryDisplayName(t)).join(', ')}");

// Replace Status filter
code = code.replace(/customizeStatusFilter !== 'All'/g, "customizeStatusFilter.length > 0");

const oldStatusRenderer = `Estado: {
                          customizeStatusFilter === 'Completed' ? '✓ Completados' :
                          customizeStatusFilter === 'Pending' ? '⏳ Pendientes' :
                          customizeStatusFilter === 'Learned' ? '🧠 Dominados' : '⚠️ Repaso'
                        }`;

const newStatusRenderer = `Estado: {customizeStatusFilter.map(s => 
                          s === 'Completed' ? '✓ Completados' :
                          s === 'Pending' ? '⏳ Pendientes' :
                          s === 'Learned' ? '🧠 Dominados' : '⚠️ Repaso'
                        ).join(', ')}`;

code = code.replace(oldStatusRenderer, newStatusRenderer);

fs.writeFileSync('src/App.tsx', code);
console.log('Fixed active filters!');
