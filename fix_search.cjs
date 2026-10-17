const fs = require('fs');
let content = fs.readFileSync('src/App.tsx', 'utf-8');

const target = `<div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-indigo-400 dark:text-indigo-500" size={18} />
                      <input 
                        type="text" 
                        placeholder="Buscar tema (ej. verbo to be, pasado)..." 
                        value={themeSearchQuery}
                        onChange={(e) => setThemeSearchQuery(e.target.value)}
                        className="w-full pl-10 pr-4 py-3 bg-indigo-50/30 dark:bg-slate-900 border-2 border-indigo-100 dark:border-slate-800 dark:border-slate-700 rounded-xl font-medium focus:border-indigo-400 dark:focus:border-indigo-500 outline-none transition shadow-sm text-sm"
                      />
                    </div>`;

const replacement = `<div className="relative z-20">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-indigo-400 dark:text-indigo-500" size={18} />
                      <input 
                        type="text" 
                        placeholder="Buscar tema (ej. verbo to be, pasado)..." 
                        value={themeSearchQuery}
                        onFocus={() => setShowSearchSuggestions(true)}
                        onBlur={() => setTimeout(() => setShowSearchSuggestions(false), 200)}
                        onChange={(e) => setThemeSearchQuery(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter' && themeSearchQuery.trim()) {
                            const newHist = [themeSearchQuery.trim(), ...searchHistory.filter(h => h !== themeSearchQuery.trim())].slice(0, 5);
                            setSearchHistory(newHist);
                            localStorage.setItem('lisa_search_history', JSON.stringify(newHist));
                            setShowSearchSuggestions(false);
                          }
                        }}
                        className="w-full pl-10 pr-4 py-3 bg-indigo-50/30 dark:bg-slate-900 border-2 border-indigo-100 dark:border-slate-800 dark:border-slate-700 rounded-xl font-medium focus:border-indigo-400 dark:focus:border-indigo-500 outline-none transition shadow-sm text-sm"
                      />
                      {showSearchSuggestions && searchHistory.length > 0 && (
                        <div className="absolute top-full left-0 w-full mt-1 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-xl overflow-hidden z-30">
                          {searchHistory.map((hist, idx) => (
                            <button
                              key={idx}
                              className="w-full text-left px-4 py-2 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 text-sm flex items-center gap-2"
                              onMouseDown={(e) => {
                                e.preventDefault();
                                setThemeSearchQuery(hist);
                                setShowSearchSuggestions(false);
                              }}
                            >
                              <History size={14} className="text-slate-400" /> {hist}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>`;

content = content.replace(target, replacement);

// Make sure History icon is imported
if (!content.includes('History,')) {
  content = content.replace('Home,', 'History, Home,');
}

fs.writeFileSync('src/App.tsx', content);
