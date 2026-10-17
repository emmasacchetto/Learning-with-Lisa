const fs = require('fs');

let content = fs.readFileSync('src/App.tsx', 'utf-8');

// 1. Add selectedUnit state
content = content.replace(
  "const [selectedSource, setSelectedSource] = useState<string | null>(null);",
  "const [selectedSource, setSelectedSource] = useState<string | null>(null);\n  const [selectedUnit, setSelectedUnit] = useState<string | null>(null);"
);

// 2. Add byYearSourceUnit to dbIndexes
content = content.replace(
  "const byYearSource = new Map<string, any[]>();",
  "const byYearSource = new Map<string, any[]>();\n    const byYearSourceUnit = new Map<string, any[]>();\n    const byYearSourceUnitCategory = new Map<string, any[]>();"
);

content = content.replace(
  "const ys = `${y}::${src}`;",
  "const ys = `${y}::${src}`;\n      const unit = ex.unit || \"Indefinido\";\n      const ysu = `${y}::${src}::${unit}`;\n      const ysuc = `${y}::${src}::${unit}::${cat}`;\n      if (!byYearSourceUnit.has(ysu)) byYearSourceUnit.set(ysu, []);\n      byYearSourceUnit.get(ysu).push(ex);\n      if (!byYearSourceUnitCategory.has(ysuc)) byYearSourceUnitCategory.set(ysuc, []);\n      byYearSourceUnitCategory.get(ysuc).push(ex);"
);

content = content.replace(
  "return { byId, byCategory, byYear, byYearSource, byEng, byBaseId };",
  "return { byId, byCategory, byYear, byYearSource, byYearSourceUnit, byYearSourceUnitCategory, byEng, byBaseId };"
);

// 3. Update breadcrumbs
content = content.replace(
  "onClick={() => { setSelectedYear(null); setSelectedSource(null); }}",
  "onClick={() => { setSelectedYear(null); setSelectedSource(null); setSelectedUnit(null); }}"
);

content = content.replace(
  "onClick={() => { setSelectedSource(null); }}",
  "onClick={() => { setSelectedSource(null); setSelectedUnit(null); }}"
);

content = content.replace(
  /<span className="text-xs sm:text-sm text-purple-600 dark:text-purple-400 font-black flex items-center gap-1.5">[\s\S]*?<\/span>/m,
  `<button onClick={() => setSelectedUnit(null)} className="hover:text-purple-900 dark:text-purple-400 dark:hover:text-white transition flex items-center gap-1.5 text-xs sm:text-sm font-black">
                        📁 {selectedSource === 'Indefinido' ? 'Fuente Indefinida' : selectedSource}
                      </button>`
);

const breadcrumbAddition = `
                  {selectedUnit && (
                    <>
                      <span className="text-indigo-300 dark:text-slate-600 font-normal">/</span>
                      <span className="text-xs sm:text-sm text-pink-600 dark:text-pink-400 font-black flex items-center gap-1.5">
                        📦 {selectedUnit === 'Indefinido' ? 'Unidad Indefinida' : selectedUnit}
                      </span>
                    </>
                  )}
`;
content = content.replace(
  "                </div>\n              )}",
  breadcrumbAddition + "                </div>\n              )}"
);

// 4. Update the "Select Theme" to be "Select Unit" and "Select Theme"
content = content.replace(
  /{selectedYear && selectedSource && \([\s\S]*?{!\(themeSearchQuery[\s\S]*?<\/div>\n              \)}/m,
  `{selectedYear && selectedSource && !selectedUnit && (
                <div className="w-full flex flex-col gap-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4">
                    {(() => {
                      const units = [...new Set([
                        ...ALL_DATA.filter(item => (item.year || "2026") === selectedYear && (item.source || "Indefinido") === selectedSource).map(item => item.unit || "Indefinido"),
                        ...customThemes.filter(t => (t.year || "2026") === selectedYear && (t.source || "Personalizados") === selectedSource).map(t => t.unit || "Indefinido")
                      ])].sort();
                      const items = units.map(u => {
                        const exIds = (dbIndexes.byYearSourceUnit.get(\`\${selectedYear}::\${selectedSource}::\${u}\`) || []).map(ex => ex.id);
                        return { id: \`Unit::\${selectedYear}::\${selectedSource}::\${u}\`, name: u === 'Indefinido' ? 'Unidad Indefinida' : u, emoji: '📦', type: 'source', exerciseIds: exIds };
                      });
                      return renderCategoryCards(items as any, (id) => setSelectedUnit(id.split('::')[3]));
                    })()}
                  </div>
                </div>
              )}

              {/* LEVEL 4: Select Theme (Inside Selected Year, Source & Unit) */}
              {selectedYear && selectedSource && selectedUnit && (
                <div className="w-full flex flex-col gap-4">
                  <div className="flex flex-col gap-2">
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Search size={18} className="text-gray-400" />
                      </div>
                      <input 
                        type="text" 
                        placeholder="Buscar tema (ej. verbo to be, pasado)..." 
                        value={themeSearchQuery}
                        onChange={(e) => setThemeSearchQuery(e.target.value)}
                        className="w-full pl-10 pr-4 py-3 bg-indigo-50/30 dark:bg-slate-900 border-2 border-indigo-100 dark:border-slate-800 dark:border-slate-700 rounded-xl font-medium focus:border-indigo-400 dark:focus:border-indigo-500 outline-none transition shadow-sm text-sm"
                      />
                    </div>
                  </div>
                  {!themeSearchQuery && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4">
                      {(() => {
                        const themes = [...new Set([
                          ...ALL_DATA.filter(item => (item.year || "2026") === selectedYear && (item.source || "Indefinido") === selectedSource && (item.unit || "Indefinido") === selectedUnit).map(item => item.category || "Indefinido"),
                          ...customThemes.filter(t => (t.year || "2026") === selectedYear && (t.source || "Personalizados") === selectedSource && (t.unit || "Indefinido") === selectedUnit).map(t => t.name)
                        ])].sort();
                        const items = themes.map(thm => {
                          const customThm = customThemes.find(t => t.name === thm && (t.year || "2026") === selectedYear && (t.source || "Personalizados") === selectedSource && (t.unit || "Indefinido") === selectedUnit);
                          let exIds = [];
                          let emoji = '📚';
                          if (customThm) {
                            exIds = customThm.items.map((ex: any) => ex.id);
                            emoji = customThm.emoji;
                          } else {
                            const entries = dbIndexes.byYearSourceUnitCategory.get(\`\${selectedYear}::\${selectedSource}::\${selectedUnit}::\${thm}\`) || [];
                            exIds = entries.map(ex => ex.id);
                            const mainEntry = entries.find(e => e.emoji);
                            emoji = mainEntry ? mainEntry.emoji : '📚';
                          }
                          return { id: \`Theme::\${thm}\`, name: thm, emoji, type: 'theme', exerciseIds: exIds };
                        });
                        return renderCategoryCards(items as any, (id) => handleCategoryClick(id.replace('Theme::', '')));
                      })()}
                    </div>
                  )}
                  
                  {themeSearchQuery && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4">
                      {(() => {
                        const q = themeSearchQuery.toLowerCase();
                        const themes = [...new Set([
                          ...ALL_DATA.filter(item => (item.year || "2026") === selectedYear && (item.source || "Indefinido") === selectedSource && (item.unit || "Indefinido") === selectedUnit).map(item => item.category || "Indefinido"),
                          ...customThemes.filter(t => (t.year || "2026") === selectedYear && (t.source || "Personalizados") === selectedSource && (t.unit || "Indefinido") === selectedUnit).map(t => t.name)
                        ])].filter(t => t.toLowerCase().includes(q)).sort();
                        
                        if (themes.length === 0) return <div className="p-4 text-gray-500 text-sm">No se encontraron temas</div>;

                        const items = themes.map(thm => {
                          const customThm = customThemes.find(t => t.name === thm && (t.year || "2026") === selectedYear && (t.source || "Personalizados") === selectedSource && (t.unit || "Indefinido") === selectedUnit);
                          let exIds = [];
                          let emoji = '📚';
                          if (customThm) {
                            exIds = customThm.items.map((ex: any) => ex.id);
                            emoji = customThm.emoji;
                          } else {
                            const entries = dbIndexes.byYearSourceUnitCategory.get(\`\${selectedYear}::\${selectedSource}::\${selectedUnit}::\${thm}\`) || [];
                            exIds = entries.map(ex => ex.id);
                            const mainEntry = entries.find(e => e.emoji);
                            emoji = mainEntry ? mainEntry.emoji : '📚';
                          }
                          return { id: \`Theme::\${thm}\`, name: thm, emoji, type: 'theme', exerciseIds: exIds };
                        });
                        return renderCategoryCards(items as any, (id) => handleCategoryClick(id.replace('Theme::', '')));
                      })()}
                    </div>
                  )}
                </div>
              )}`
);

fs.writeFileSync('src/App.tsx', content);
console.log('App.tsx patched successfully.');
