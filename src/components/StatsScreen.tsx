import { ArrowLeft, Award, BrainCircuit, CheckCircle2, CheckSquare, ChevronDown, ChevronUp, Clock, Filter, Flame, Layers, Search, Square, Star, Target, TrendingUp } from 'lucide-react';
import { useEffect, useState } from 'react';

export function StatsScreen({ stats, onBack, completedExIds, exercises, categories, skills, customThemes, setCustomThemes, learnedExIds, setLearnedExIds, allowedKeyboards, enableMultiModalProgression }: any) {
  const [activeTab, setActiveTab] = useState('overview');
  const [filterCats, setFilterCats] = useState<string[]>([]);
  const [filterSkills, setFilterSkills] = useState<string[]>([]);
  const [filterStatus, setFilterStatus] = useState('All');
  const [searchText, setSearchText] = useState('');
  const [isGrouped, setIsGrouped] = useState(true); 
  const [showFilters, setShowFilters] = useState(false);
  const [selectedExIds, setSelectedExIds] = useState<string[]>([]);
  const [showThemeModal, setShowThemeModal] = useState(false);
  const [newThemeName, setNewThemeName] = useState('');
  const [displayLimit, setDisplayLimit] = useState(100);

  const acc = stats.totalAttempted > 0 ? Math.round((stats.correctFirstTry / stats.totalAttempted) * 100) : 0;

  useEffect(() => { setSelectedExIds([]); setDisplayLimit(100); }, [filterCats, filterSkills, filterStatus, searchText, isGrouped, allowedKeyboards]);

  const filteredExercises = exercises.filter((ex: any) => {
    if (enableMultiModalProgression) {
       if (ex.targetKeyboardMode && !allowedKeyboards.includes(ex.targetKeyboardMode)) {
          return false;
       }
    } else {
       if (ex.kbLevel !== undefined && ex.kbLevel !== 0) return false;
    }

    if (filterCats.length > 0 && !filterCats.includes(ex.category)) return false;
    if (filterSkills.length > 0 && !filterSkills.includes(ex.skill)) return false;
    
    const isCompleted = completedExIds.includes(ex.id) || learnedExIds.includes(ex.baseId || ex.id);
    const isLearned = learnedExIds.includes(ex.baseId || ex.id);
    if (filterStatus === 'Completed' && !isCompleted) return false;
    if (filterStatus === 'Pending' && isCompleted) return false;
    if (filterStatus === 'Learned' && !isLearned) return false;
    
    if (searchText.trim() !== '') {
      const q = searchText.toLowerCase();
      if (!(ex.eng || '').toLowerCase().includes(q) && !(ex.spa || '').toLowerCase().includes(q) && !(ex.question || '').toLowerCase().includes(q)) {
        return false;
      }
    }
    return true;
  });

  const completedCount = filteredExercises.filter((ex: any) => completedExIds.includes(ex.id) || learnedExIds.includes(ex.baseId || ex.id)).length;
  const totalCount = filteredExercises.length;
  const percentage = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;

  const groupedDataObj = filteredExercises.reduce((acc: any, ex: any) => {
    const key = ex.baseId || ex.eng || ex.question;
    if (!acc[key]) acc[key] = { baseId: key, eng: ex.eng || ex.question, spa: ex.spa || ex.correctAnswer, category: ex.category, emoji: ex.emoji || '📘', skills: [], allIds: [] };
    
    let subLabel = ex.skill;
    if (ex.targetKeyboardMode) {
       subLabel += ' (Var)';
    }

    acc[key].skills.push({ 
        skill: subLabel, 
        id: ex.id, 
        kbLevel: ex.kbLevel || 0,
        completed: completedExIds.includes(ex.id) || learnedExIds.includes(ex.baseId || ex.id), 
        learned: learnedExIds.includes(ex.baseId || ex.id) 
    });
    acc[key].allIds.push(ex.id);
    return acc;
  }, {});
  
  const groupedData: any[] = Object.values(groupedDataObj);

  groupedData.forEach(g => {
     g.skills.sort((a: any, b: any) => a.kbLevel - b.kbLevel);
  });

  const toggleExerciseSelection = (id: string) => {
    setSelectedExIds(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);
  };

  const toggleGroupSelection = (groupIds: string[]) => {
    const allSelected = groupIds.every(id => selectedExIds.includes(id));
    if (allSelected) {
      setSelectedExIds(prev => prev.filter(id => !groupIds.includes(id)));
    } else {
      setSelectedExIds(prev => [...new Set([...prev, ...groupIds])]);
    }
  };

  const handleCreateTheme = () => {
    if (!newThemeName.trim()) return;
    const idsToUse = selectedExIds.length > 0 ? selectedExIds : filteredExercises.map((ex: any) => ex.id);
    const newTheme = {
      id: 'custom_' + Date.now(),
      name: newThemeName.trim(),
      exerciseIds: idsToUse
    };
    setCustomThemes([...customThemes, newTheme]);
    setShowThemeModal(false);
    setNewThemeName('');
    setSelectedExIds([]);
  };

  const toggleCatFilter = (cat: string) => { setFilterCats(prev => prev.includes(cat) ? prev.filter(c => c !== cat) : [...prev, cat]); };
  const toggleSkillFilter = (skill: string) => { setFilterSkills(prev => prev.includes(skill) ? prev.filter(s => s !== skill) : [...prev, skill]); };

  return (
    <div className="flex-1 flex flex-col bg-slate-50 w-full overflow-hidden relative">
      {showThemeModal && (
        <div className="absolute inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 w-full max-w-sm shadow-2xl relative animate-slide-up">
            <h3 className="text-xl font-bold text-gray-800 mb-2">Crear Tema Personalizado 🎯</h3>
            <p className="text-sm text-gray-600 mb-4">Se creará un nuevo tema en el menú principal con <strong className="text-indigo-600">{selectedExIds.length > 0 ? selectedExIds.length : filteredExercises.length} ejercicios</strong> que has filtrado.</p>
            <input type="text" value={newThemeName} onChange={e => setNewThemeName(e.target.value)} placeholder="Ej: Repaso Difícil..." className="w-full p-4 border-2 border-indigo-200 rounded-xl mb-4 font-bold focus:outline-none focus:border-indigo-500"/>
            <div className="flex gap-3">
              <button onClick={() => setShowThemeModal(false)} className="flex-1 py-3 bg-gray-100 text-gray-600 font-bold rounded-xl active:scale-95">Cancelar</button>
              <button onClick={handleCreateTheme} disabled={!newThemeName.trim()} className="flex-1 py-3 bg-indigo-500 text-white font-bold rounded-xl active:scale-95 disabled:opacity-50">Guardar</button>
            </div>
          </div>
        </div>
      )}

      <div className="p-6 bg-white shadow-sm z-10 shrink-0">
        <button onClick={onBack} className="self-start text-indigo-500 font-bold mb-4 flex items-center gap-2 hover:text-indigo-700"><ArrowLeft size={20} /> Volver</button>
        <h2 className="text-3xl font-bold text-indigo-800 flex items-center gap-3"><Award size={36}/> Estadísticas</h2>
        
        <div className="flex bg-gray-100 p-1 rounded-xl mt-6">
          <button onClick={() => setActiveTab('overview')} className={`flex-1 py-2 font-bold rounded-lg transition ${activeTab === 'overview' ? 'bg-white shadow text-indigo-700' : 'text-gray-500'}`}>Resumen</button>
          <button onClick={() => setActiveTab('details')} className={`flex-1 py-2 font-bold rounded-lg transition ${activeTab === 'details' ? 'bg-white shadow text-indigo-700' : 'text-gray-500'}`}>Detalle Granular</button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-6">
        {activeTab === 'overview' ? (
          <div className="flex flex-col items-center w-full">
            <div className="w-full bg-white p-6 rounded-3xl shadow-sm border-2 border-indigo-100 mb-6 flex gap-4">
              <div className="flex-1 flex flex-col items-center justify-center border-r-2 border-gray-100"><Flame size={48} className="text-orange-500 mb-2"/><span className="text-3xl font-black text-gray-800">{stats.streak}</span><span className="text-sm text-gray-500 font-bold">Días seguidos</span></div>
              <div className="flex-1 flex flex-col items-center justify-center"><Target size={48} className="text-green-500 mb-2"/><span className="text-3xl font-black text-gray-800">{acc}%</span><span className="text-sm text-gray-500 font-bold">Precisión</span></div>
            </div>
            <div className="w-full bg-white p-6 rounded-3xl shadow-sm border-2 border-indigo-100 mb-6"><h3 className="font-bold text-xl text-gray-800 mb-4 flex items-center gap-2"><TrendingUp size={24} className="text-indigo-500"/> Ejercicios Resueltos</h3><div className="flex items-center justify-between bg-indigo-50 p-4 rounded-xl"><span className="text-lg font-medium text-gray-600">Total completados:</span><span className="text-2xl font-black text-indigo-600">{stats.totalCompleted}</span></div></div>
            <div className="w-full bg-white p-6 rounded-3xl shadow-sm border-2 border-indigo-100"><h3 className="font-bold text-xl text-gray-800 mb-4 flex items-center gap-2"><Star size={24} className="text-yellow-500"/> Habilidades (Top)</h3><div className="space-y-3">{Object.keys(stats.skills).map(sk => (<div key={sk} className="flex justify-between items-center"><span className="font-medium text-gray-600">{sk}</span><span className="font-bold text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full">{stats.skills[sk]}</span></div>))}</div></div>
          </div>
        ) : (
          <div className="space-y-4 w-full">
            <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 space-y-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input type="text" placeholder="Buscar palabra (ej: dog)..." value={searchText} onChange={e => setSearchText(e.target.value)} className="w-full p-3 pl-10 border-2 border-gray-200 rounded-xl font-medium focus:border-indigo-500 outline-none bg-gray-50" />
              </div>
              
              <button onClick={() => setShowFilters(!showFilters)} className="w-full py-2 flex items-center justify-between text-indigo-600 font-bold bg-indigo-50 rounded-lg px-4">
                <span className="flex items-center gap-2"><Filter size={18}/> Filtros Avanzados {(filterCats.length > 0 || filterSkills.length > 0) && `(${filterCats.length + filterSkills.length})`}</span>
                {showFilters ? <ChevronUp size={20}/> : <ChevronDown size={20}/>}
              </button>

              {showFilters && (
                <div className="space-y-4 pt-2 border-t border-gray-100">
                  <div>
                    <p className="text-xs font-bold text-gray-500 uppercase mb-2">Categorías (Múltiple)</p>
                    <div className="flex flex-wrap gap-2 max-h-32 overflow-y-auto p-1">
                       {categories.map((c: string) => (
                         <button key={c} onClick={() => toggleCatFilter(c)} className={`px-3 py-1 rounded-full text-xs font-bold transition ${filterCats.includes(c) ? 'bg-indigo-500 text-white shadow-md' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>{c}</button>
                       ))}
                    </div>
                  </div>
                  <div>
                    <p className="text-xs font-bold text-gray-500 uppercase mb-2">Módulos (Múltiple)</p>
                    <div className="flex flex-wrap gap-2">
                       {skills.map((s: string) => (
                         <button key={s} onClick={() => toggleSkillFilter(s)} className={`px-3 py-1 rounded-full text-xs font-bold transition ${filterSkills.includes(s) ? 'bg-indigo-500 text-white shadow-md' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>{s}</button>
                       ))}
                    </div>
                  </div>
                  <div>
                    <p className="text-xs font-bold text-gray-500 uppercase mb-2">Estado</p>
                    <select value={filterStatus} onChange={e => setFilterStatus(e.target.value)} className="w-full p-2 border-2 border-gray-200 rounded-lg text-sm font-medium text-gray-700 outline-none">
                      <option value="All">Todos los Estados</option>
                      <option value="Completed">✅ Completados (Cualquier vía)</option>
                      <option value="Pending">⏳ Pendientes</option>
                      <option value="Learned">🧠 Dominados (Ya lo sé)</option>
                    </select>
                  </div>
                  <button onClick={() => {setFilterCats([]); setFilterSkills([]); setFilterStatus('All'); setSearchText('');}} className="w-full py-2 text-red-500 text-sm font-bold underline">Limpiar todos los filtros</button>
                </div>
              )}
            </div>

            <div className="flex justify-between items-center bg-indigo-50 p-4 rounded-2xl border border-indigo-100 shadow-sm">
              <div>
                <span className="font-bold text-indigo-900 block">Agrupar por Frase (Pivot)</span>
                <span className="text-xs text-indigo-600">Junta la progresión multimodal</span>
              </div>
              <label className="relative inline-flex items-center cursor-pointer shrink-0">
                <input type="checkbox" className="sr-only peer" checked={isGrouped} onChange={(e) => { setIsGrouped(e.target.checked); setSelectedExIds([]); }} />
                <div className="w-11 h-6 bg-gray-300 rounded-full peer peer-checked:bg-indigo-600 peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all"></div>
              </label>
            </div>

            {filteredExercises.length > 0 && (
              <div className="flex flex-col gap-2 bg-indigo-900/5 p-4 rounded-2xl border border-indigo-100">
                <div className="flex justify-between items-center mb-2">
                   <span className="font-bold text-sm text-indigo-900">
                      {selectedExIds.length > 0 ? `${selectedExIds.length} ejercicios marcados` : `${filteredExercises.length} resultados filtrados`}
                   </span>
                   {selectedExIds.length > 0 && <button onClick={() => setSelectedExIds([])} className="text-xs text-red-500 font-bold bg-white px-2 py-1 rounded shadow-sm">Deseleccionar</button>}
                </div>
                <button onClick={() => setShowThemeModal(true)} className="w-full py-3 bg-gradient-to-r from-purple-500 to-indigo-500 text-white rounded-xl font-bold shadow-md active:scale-95 transition flex items-center justify-center gap-2">
                  <Layers size={20}/> Crear Tema Personalizado
                </button>
                <button onClick={() => {
                  const idsToLearn = selectedExIds.length > 0 ? selectedExIds : filteredExercises.map((ex: any) => ex.id);
                  setLearnedExIds((prev: any) => [...new Set([...prev, ...idsToLearn])]);
                  setSelectedExIds([]);
                }} className="w-full py-3 bg-fuchsia-100 text-fuchsia-700 rounded-xl font-bold shadow-sm border border-fuchsia-200 hover:bg-fuchsia-200 active:scale-95 transition flex items-center justify-center gap-2">
                  <BrainCircuit size={20}/> Marcar como Aprendidos
                </button>
              </div>
            )}

            <div className="bg-indigo-50 p-4 rounded-2xl border border-indigo-100">
              <div className="flex justify-between items-end mb-2">
                <span className="font-bold text-indigo-800 text-sm">Progreso de la selección</span>
                <span className="font-black text-indigo-600">{completedCount} / {totalCount}</span>
              </div>
              <div className="h-3 bg-indigo-200 rounded-full overflow-hidden">
                <div className="h-full bg-indigo-500 transition-all" style={{width: `${percentage}%`}}></div>
              </div>
            </div>

            <div className="space-y-3 pb-8">
              {!isGrouped ? (
                filteredExercises.slice(0, displayLimit).map((ex: any) => {
                  const isCompleted = completedExIds.includes(ex.id) || learnedExIds.includes(ex.baseId || ex.id);
                  const isLearned = learnedExIds.includes(ex.baseId || ex.id);
                  const isSelected = selectedExIds.includes(ex.id);
                  return (
                    <div key={ex.id} className={`p-3 rounded-xl border-2 flex items-center gap-3 transition-colors ${isSelected ? 'bg-indigo-50 border-indigo-300' : isLearned ? 'bg-fuchsia-50 border-fuchsia-200' : isCompleted ? 'bg-white border-green-200' : 'bg-gray-50 border-gray-200'}`}>
                      <button onClick={() => toggleExerciseSelection(ex.id)} className="flex-shrink-0 p-1">
                         {isSelected ? <CheckSquare className="text-indigo-600" size={24}/> : <Square className="text-gray-300 hover:text-indigo-400" size={24}/>}
                      </button>
                      <div className="text-3xl flex-shrink-0">{ex.emoji || '📘'}</div>
                      <div className="flex-1 min-w-0">
                        <div className="flex gap-1 mb-1">
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-gray-200 text-gray-600 truncate max-w-[50%]" title={ex.category}>{ex.category}</span>
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-100 text-blue-700 truncate" title={ex.skill}>{ex.skill}</span>
                          {ex.targetKeyboardMode && <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-indigo-100 text-indigo-700">Nivel {ex.kbLevel + 1}</span>}
                        </div>
                        <p className="font-bold text-sm text-gray-800 truncate" title={ex.eng || ex.question}>{ex.eng || ex.question}</p>
                        <p className="text-xs text-gray-500 truncate" title={ex.spa || ex.correctAnswer}>{ex.spa || ex.correctAnswer}</p>
                      </div>
                      <div className="flex-shrink-0 flex gap-1">
                        <button onClick={() => setLearnedExIds((prev: any) => isLearned ? prev.filter((id: string) => id !== (ex.baseId || ex.id)) : [...prev, (ex.baseId || ex.id)])} className={`p-2 rounded-lg transition-colors ${isLearned ? 'bg-fuchsia-200 text-fuchsia-700' : 'bg-gray-200 text-gray-400 hover:bg-fuchsia-100 hover:text-fuchsia-600'}`} title={isLearned ? "Quitar de aprendidos" : "Marcar como aprendido (Ya lo sé)"}>
                          <BrainCircuit size={20}/>
                        </button>
                        <div className="w-10 flex items-center justify-center">
                          {isCompleted && !isLearned ? <CheckCircle2 className="text-green-500" size={24}/> : !isLearned && <Clock className="text-gray-300" size={24}/>}
                        </div>
                      </div>
                    </div>
                  )
                })
              ) : (
                groupedData.slice(0, displayLimit).map((group: any, idx: number) => {
                  const completedInGroup = group.skills.filter((s:any) => s.completed).length;
                  const isAllCompleted = completedInGroup === group.skills.length;
                  const learnedInGroup = group.skills.filter((s:any) => s.learned).length;
                  const isAllLearned = learnedInGroup === group.skills.length;
                  const isAllSelected = group.allIds.every((id:string) => selectedExIds.includes(id));
                  
                  return (
                    <div key={idx} className={`p-3 rounded-xl border-2 flex flex-col gap-2 transition-colors ${isAllSelected ? 'bg-indigo-50 border-indigo-300' : isAllLearned ? 'bg-fuchsia-50 border-fuchsia-200' : isAllCompleted ? 'bg-white border-green-200' : 'bg-gray-50 border-gray-200 shadow-sm'}`}>
                      <div className="flex items-center gap-3">
                        <button onClick={() => toggleGroupSelection(group.allIds)} className="flex-shrink-0 p-1">
                           {isAllSelected ? <CheckSquare className="text-indigo-600" size={24}/> : <Square className="text-gray-300 hover:text-indigo-400" size={24}/>}
                        </button>
                        <div className="text-4xl flex-shrink-0">{group.emoji}</div>
                        <div className="flex-1 min-w-0">
                           <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-gray-200 text-gray-600 truncate max-w-[50%] mb-1 inline-block">{group.category}</span>
                           <p className="font-bold text-base text-gray-800 leading-tight">{group.eng}</p>
                           <p className="text-sm text-gray-500 font-medium">{group.spa}</p>
                        </div>
                        <div className="flex-shrink-0 text-right flex flex-col items-end gap-2">
                          <span className={`font-black text-lg ${isAllLearned ? 'text-fuchsia-500' : isAllCompleted ? 'text-green-500' : 'text-indigo-500'}`}>{completedInGroup}/{group.skills.length}</span>
                          <button onClick={() => {
                              if (isAllLearned) { setLearnedExIds((prev:any) => prev.filter((id:string) => id !== group.baseId)); } 
                              else { setLearnedExIds((prev:any) => [...new Set([...prev, group.baseId])]); }
                          }} className={`px-2 py-1 rounded-md text-xs font-bold transition flex items-center gap-1 ${isAllLearned ? 'bg-fuchsia-200 text-fuchsia-700' : 'bg-gray-200 text-gray-500 hover:bg-fuchsia-100 hover:text-fuchsia-600'}`}>
                            <BrainCircuit size={14}/> {isAllLearned ? 'Desmarcar' : 'Ya lo sé'}
                          </button>
                        </div>
                      </div>
                      <div className="flex flex-wrap gap-1 mt-2 pt-2 border-t border-gray-200/50">
                        {group.skills.map((s:any) => {
                           const isSel = selectedExIds.includes(s.id);
                           return (
                             <button key={s.id} onClick={() => toggleExerciseSelection(s.id)} className={`text-[10px] font-bold px-2 py-1 rounded border flex items-center gap-1 transition ${isSel ? 'bg-indigo-500 text-white border-indigo-700' : s.learned ? 'bg-fuchsia-100 text-fuchsia-700 border-fuchsia-200' : s.completed ? 'bg-green-100 text-green-700 border-green-200' : 'bg-white text-gray-500 border-gray-200 hover:bg-gray-100'}`} title={s.skill}>
                                {isSel ? <CheckSquare size={10}/> : s.completed && !s.learned ? <CheckCircle2 size={10} className={isSel?'text-white':'text-green-500'}/> : s.learned ? <BrainCircuit size={10} className={isSel?'text-white':'text-fuchsia-500'}/> : <Square size={10}/>}
                                {s.skill}
                             </button>
                           )
                        })}
                      </div>
                    </div>
                  );
                })
              )}

              {(isGrouped ? groupedData.length : filteredExercises.length) > displayLimit && (
                <div className="flex flex-col items-center mt-4 gap-2">
                  <p className="text-center text-gray-500 text-sm font-medium">Mostrando {displayLimit} de {isGrouped ? groupedData.length : filteredExercises.length} resultados.</p>
                  <div className="flex gap-2">
                    <button 
                      onClick={() => setDisplayLimit((l: number) => l + 100)}
                      className="py-2 px-4 bg-indigo-100 hover:bg-indigo-200 text-indigo-700 font-bold rounded-xl active:scale-95 transition text-sm"
                    >
                      Cargar más (+100)
                    </button>
                    <button 
                      onClick={() => setDisplayLimit(isGrouped ? groupedData.length : filteredExercises.length)}
                      className="py-2 px-4 bg-indigo-505 hover:bg-indigo-600 bg-indigo-600 text-white font-bold rounded-xl active:scale-95 transition text-sm shadow-sm"
                    >
                      Mostrar todo
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
