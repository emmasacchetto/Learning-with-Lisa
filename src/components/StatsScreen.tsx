import { ArrowLeft, Award, Flame, Target, TrendingUp, CalendarDays, Star } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, CartesianGrid } from 'recharts';

export function StatsScreen({ stats, onBack, completedExIds, exercises, learnedExIds }: any) {
  const [activeTab, setActiveTab] = useState('overview');
  const [newlyUnlocked, setNewlyUnlocked] = useState<string[]>([]);
  const [isHeaderVisible, setIsHeaderVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    // Check for newly unlocked badges
    const allBadges = [
      { id: 'first_blood', threshold: 10, type: 'exercises' },
      { id: 'centurion', threshold: 100, type: 'exercises' },
      { id: 'master', threshold: 500, type: 'exercises' },
      { id: 'streak_3', threshold: 3, type: 'streak' },
      { id: 'streak_7', threshold: 7, type: 'streak' },
      { id: 'streak_30', threshold: 30, type: 'streak' },
      { id: 'early_bird', threshold: 1, type: 'early_bird' },
      { id: 'polyglot', threshold: 1000, type: 'exercises' },
      { id: 'words_100', threshold: 100, type: 'learned' },
      { id: 'year_1_complete', threshold: 1, type: 'year_complete' },
      { id: 'year_2_complete', threshold: 2, type: 'year_complete' },
    ];
    const prevUnlockedStr = localStorage.getItem('lisa_unlocked_badges');
    const prevUnlocked = prevUnlockedStr ? JSON.parse(prevUnlockedStr) : [];
    
    let currentUnlocked: string[] = [];
    allBadges.forEach(b => {
      let unlocked = false;
      if (b.type === 'exercises') unlocked = stats.totalCompleted >= b.threshold;
      if (b.type === 'streak') unlocked = stats.streak >= b.threshold;
      if (b.type === 'early_bird') unlocked = new Date().getHours() < 8 && stats.totalCompleted > 0;
      if (b.type === 'learned') unlocked = (learnedExIds?.length || 0) >= b.threshold;
      if (b.type === 'year_complete') {
        const yearName = b.threshold === 1 ? "1st Year" : b.threshold === 2 ? "2nd Year" : "";
        const yearExs = exercises.filter((ex: any) => ex.category === yearName);
        if (yearExs.length > 0) {
          unlocked = yearExs.every((ex: any) => (completedExIds || []).includes(ex.id));
        }
      }
      if (unlocked) currentUnlocked.push(b.id);
    });
    
    const newUnlocks = currentUnlocked.filter(id => !prevUnlocked.includes(id));
    if (newUnlocks.length > 0) {
      setNewlyUnlocked(newUnlocks);
      localStorage.setItem('lisa_unlocked_badges', JSON.stringify(currentUnlocked));
      setTimeout(() => setNewlyUnlocked([]), 5000); // clear after 5s
    } else if (prevUnlocked.length === 0 && currentUnlocked.length > 0) {
      localStorage.setItem('lisa_unlocked_badges', JSON.stringify(currentUnlocked));
    }
  }, [stats, learnedExIds, completedExIds, exercises]);

  const handleScroll = (e: any) => {
    const currentScrollY = e.currentTarget.scrollTop;
    const deltaY = currentScrollY - lastScrollY;
    
    if (deltaY > 0) {
      if (currentScrollY > 10) {
        setIsHeaderVisible(false);
      }
    } else if (deltaY < 0) {
      if (currentScrollY <= 10) {
        setIsHeaderVisible(true);
      }
    }
    
    if (currentScrollY <= 10) {
      setIsHeaderVisible(true);
    }
    
    setLastScrollY(currentScrollY);
  };

  const acc = stats.totalAttempted > 0 ? Math.round((stats.correctFirstTry / stats.totalAttempted) * 100) : 0;

  // Calculate comparative practice volume data (current week vs previous week)
  const lineChartData = (() => {
    const daysOfWeek = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'];
    const today = new Date();
    const currentDayIndex = today.getDay(); // 0 is Sunday, 1 is Monday...
    const mondayOffset = currentDayIndex === 0 ? -6 : 1 - currentDayIndex;
    const mondayThisWeek = new Date(today.getTime() + mondayOffset * 86400000);
    const mondayLastWeek = new Date(mondayThisWeek.getTime() - 7 * 86400000);
    
    const data = [];
    for (let i = 0; i < 7; i++) {
      const dateThisWeek = new Date(mondayThisWeek.getTime() + i * 86400000);
      const dateLastWeek = new Date(mondayLastWeek.getTime() + i * 86400000);
      
      const isoThisWeek = dateThisWeek.toISOString().split('T')[0];
      const isoLastWeek = dateLastWeek.toISOString().split('T')[0];
      
      data.push({
        name: daysOfWeek[i],
        'Esta Semana': stats.history?.[isoThisWeek] || 0,
        'Semana Anterior': stats.history?.[isoLastWeek] || 0
      });
    }
    return data;
  })();

  const renderCalendar = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth();
    
    const firstDay = new Date(year, month, 1).getDay(); // 0 is Sunday
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    
    const days = [];
    for (let i = 0; i < firstDay; i++) {
      days.push(null);
    }
    for (let i = 1; i <= daysInMonth; i++) {
      const d = new Date(year, month, i);
      const iso = `${year}-${String(month + 1).padStart(2, '0')}-${String(i).padStart(2, '0')}`;
      days.push({ day: i, iso, date: d });
    }
    
    const weekDays = ['D', 'L', 'M', 'X', 'J', 'V', 'S'];
    const monthNames = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
    
    return (
      <div className="w-full mt-6" id="stats-calendar">
          <h4 className="font-bold text-gray-700 dark:text-slate-300 mb-4 text-center">{monthNames[month]} {year}</h4>
          <div className="grid grid-cols-7 gap-1 text-center mb-2">
              {weekDays.map(wd => <span key={wd} className="text-xs font-bold text-gray-500 dark:text-slate-400">{wd}</span>)}
          </div>
          <div className="grid grid-cols-7 gap-1 sm:gap-2">
              {days.map((d, i) => {
                  if (!d) return <div key={i} className="aspect-square"></div>;
                  const isPracticed = stats.history && stats.history[d.iso] && stats.history[d.iso] > 0;
                  const isToday = d.iso === today.toISOString().split('T')[0];
                  return (
                      <div key={i} className={`aspect-square rounded-xl flex items-center justify-center font-bold text-sm sm:text-base ${isPracticed ? 'bg-gradient-to-br from-orange-400 to-orange-500 text-white shadow-md transform hover:scale-110 transition' : 'bg-gray-100 dark:bg-slate-700/50 text-gray-400 dark:text-slate-500'} ${isToday && !isPracticed ? 'border-2 border-orange-300 dark:border-orange-700' : ''}`}>
                          {d.day}
                      </div>
                  );
              })}
          </div>
      </div>
    );
  };

  return (
    <div className="flex-1 flex flex-col bg-slate-50 dark:bg-slate-900 w-full max-w-[clamp(320px,95vw,1400px)] mx-auto overflow-hidden relative" id="stats-screen">
      {newlyUnlocked.length > 0 && (
        <div className="absolute top-20 left-1/2 transform -translate-x-1/2 z-50 bg-gradient-to-r from-amber-500 to-orange-500 text-white px-6 py-4 rounded-3xl font-black shadow-2xl border-4 border-amber-300 animate-bounce text-center max-w-[90%]">
          🏆 ¡NUEVO LOGRO DESBLOQUEADO! 🏆
          <p className="text-xs mt-1 font-bold">Revisa la pestaña de logros para ver tus medallas.</p>
        </div>
      )}

      <div className="flex-1 overflow-y-auto relative" onScroll={handleScroll}>
        <div className={`sticky top-0 z-30 bg-indigo-50/90 dark:bg-slate-800/90 backdrop-blur-md border-b border-indigo-100 dark:border-slate-700 shadow-sm transition-transform duration-300 ease-in-out ${isHeaderVisible ? 'translate-y-0' : '-translate-y-full'}`} id="stats-header">
          <div className="p-6 pb-4">
            <button onClick={onBack} className="self-start text-indigo-500 font-bold mb-4 flex items-center gap-2 hover:text-indigo-700" id="stats-back-btn">
              <ArrowLeft size={20} /> Volver
            </button>
            <h2 className="text-3xl font-bold text-indigo-800 dark:text-indigo-300 flex items-center gap-3">
              <Award size={36}/> Estadísticas
            </h2>
            <div className="flex bg-white dark:bg-slate-900/50 dark:bg-slate-800/50 p-1 rounded-xl mt-6 border border-indigo-100 dark:border-slate-700/50 dark:border-slate-700">
              <button onClick={() => setActiveTab('overview')} className={`flex-1 py-2 font-bold rounded-lg transition ${activeTab === 'overview' ? 'bg-indigo-600 shadow text-white' : 'text-indigo-600 dark:text-indigo-400/70 hover:text-indigo-600 dark:text-indigo-400'}`} id="stats-tab-overview">Resumen</button>
              <button onClick={() => setActiveTab('badges')} className={`flex-1 py-2 font-bold rounded-lg transition ${activeTab === 'badges' ? 'bg-indigo-600 shadow text-white' : 'text-indigo-600 dark:text-indigo-400/70 hover:text-indigo-600 dark:text-indigo-400'}`} id="stats-tab-badges">Logros</button>
            </div>
          </div>
        </div>

        <div className="p-6">
          {activeTab === 'overview' && stats.tagStats && Object.keys(stats.tagStats).length > 0 && (
            <div className="bg-white dark:bg-slate-900 border border-indigo-100 dark:border-slate-800 rounded-3xl p-6 shadow-sm mb-6">
              <h3 className="text-lg font-black text-indigo-900 dark:text-indigo-200 mb-4 flex items-center gap-2"><span>🏷️</span> Rendimiento por Etiquetas Personalizadas</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {Object.entries(stats.tagStats).map(([tag, data]: any) => {
                  const tagAcc = data.attempted > 0 ? Math.round((data.correct / data.attempted) * 100) : 0;
                  return (
                    <div key={tag} className="flex justify-between items-center bg-indigo-50/50 dark:bg-slate-800/40 p-4 rounded-2xl border border-indigo-100/50 dark:border-slate-700/50">
                      <div>
                        <div className="font-bold text-slate-800 dark:text-slate-200 text-sm">{tag}</div>
                        <div className="text-[10px] font-bold text-slate-500 mt-0.5">{data.correct} aciertos / {data.attempted - data.correct} fallos</div>
                      </div>
                      <div className="flex flex-col items-end">
                        <div className={`font-black text-lg ${tagAcc >= 80 ? 'text-green-600 dark:text-green-400' : tagAcc >= 50 ? 'text-amber-500 dark:text-amber-400' : 'text-red-500 dark:text-red-400'}`}>
                          {tagAcc}%
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
          {activeTab === 'badges' ? (
            <div className="w-full" id="stats-badges-container">
              <div className="bg-gradient-to-br from-amber-100 to-orange-100 dark:from-amber-900/40 dark:to-orange-900/40 rounded-3xl p-6 border border-amber-200 dark:border-amber-900/50 shadow-sm mb-6">
                <h3 className="text-xl font-black text-amber-900 dark:text-amber-200 mb-2 flex items-center gap-2"><Award size={24}/> Tus Medallas y Logros</h3>
                <p className="text-amber-800 dark:text-amber-300/80 text-sm font-medium mb-6">Sigue practicando para desbloquear todas las medallas.</p>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                  {[
                    { id: 'first_blood', name: 'Bronce: Iniciado', desc: 'Completa 10 ejercicios', icon: '🥉', threshold: 10, type: 'exercises' },
                    { id: 'centurion', name: 'Primeros 100 puntos', desc: 'Completa 100 ejercicios', icon: '🥈', threshold: 100, type: 'exercises' },
                    { id: 'master', name: 'Oro: Maestro', desc: 'Completa 500 ejercicios', icon: '🥇', threshold: 500, type: 'exercises' },
                    { id: 'streak_3', name: 'Racha Bronce', desc: 'Racha de 3 días', icon: '🔥', threshold: 3, type: 'streak' },
                    { id: 'streak_7', name: 'Racha de 7 días', desc: 'Practica por 7 días seguidos', icon: '🚀', threshold: 7, type: 'streak' },
                    { id: 'streak_30', name: 'Racha Oro', desc: 'Racha de 30 días', icon: '💎', threshold: 30, type: 'streak' },
                    { id: 'early_bird', name: 'Madrugador', desc: 'Practica antes de las 8 AM', icon: '🌅', threshold: 1, type: 'early_bird' },
                    { id: 'polyglot', name: 'Platino: Leyenda', desc: 'Completa 1000 ejercicios', icon: '🏆', threshold: 1000, type: 'exercises' },
                    { id: 'words_100', name: 'Erudito', desc: 'Aprende 100 palabras', icon: '🧠', threshold: 100, type: 'learned' },
                    { id: 'year_1_complete', name: 'Primer Año', desc: 'Completa todo el 1er Año', icon: '🎓', threshold: 1, type: 'year_complete' },
                    { id: 'year_2_complete', name: 'Segundo Año', desc: 'Completa todo el 2do Año', icon: '🏫', threshold: 2, type: 'year_complete' },
                  ].map(badge => {
                    let unlocked = false;
                    if (badge.type === 'exercises') unlocked = stats.totalCompleted >= badge.threshold;
                    if (badge.type === 'streak') unlocked = stats.streak >= badge.threshold;
                    if (badge.type === 'early_bird') unlocked = new Date().getHours() < 8 && stats.totalCompleted > 0;
                    if (badge.type === 'learned') unlocked = (learnedExIds?.length || 0) >= badge.threshold;
                    if (badge.type === 'year_complete') {
                      const yearName = badge.threshold === 1 ? "1st Year" : badge.threshold === 2 ? "2nd Year" : "";
                      const yearExs = exercises.filter((ex: any) => ex.category === yearName);
                      if (yearExs.length > 0) {
                        unlocked = yearExs.every((ex: any) => (completedExIds || []).includes(ex.id));
                      }
                    }

                    return (
                      <div key={badge.id} className={`flex flex-col items-center justify-center p-4 rounded-2xl border-2 transition-all ${unlocked ? 'bg-indigo-50 dark:bg-slate-800/40 dark:bg-slate-800/80 border-indigo-100 dark:border-slate-700 border-amber-300 shadow-md transform hover:scale-105' : 'bg-indigo-50 dark:bg-slate-800/40 dark:bg-slate-800/80 border-indigo-100 dark:border-slate-700/50 dark:border-slate-700 border-gray-200 dark:border-slate-700 opacity-60 grayscale'}`}>
                        <span className="text-4xl mb-2">{badge.icon}</span>
                        <h4 className="font-bold text-center text-sm text-gray-800 dark:text-slate-200">{badge.name}</h4>
                        <p className="text-[10px] text-center text-gray-500 dark:text-slate-400 mt-1">{badge.desc}</p>
                        {unlocked && <div className="mt-2 bg-amber-100 dark:bg-amber-900/40 text-amber-700 dark:text-amber-400 text-[10px] font-bold px-2 py-1 rounded-full uppercase tracking-wider">Desbloqueado</div>}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center w-full" id="stats-overview-container">
              <div className="w-full bg-indigo-50 dark:bg-slate-800/40 dark:bg-slate-800/80 border-indigo-100 dark:border-slate-700 p-6 rounded-3xl shadow-sm border-2 border-indigo-100 dark:border-slate-700 mb-6 flex gap-4">
                <div className="flex-1 flex flex-col items-center justify-center border-r-2 border-gray-100 dark:border-slate-800"><Flame size={48} className="text-orange-500 mb-2"/><span className="text-3xl font-black text-gray-800 dark:text-slate-200">{stats.streak}</span><span className="text-sm text-gray-500 dark:text-slate-400 font-bold">Días seguidos</span></div>
                <div className="flex-1 flex flex-col items-center justify-center"><Target size={48} className="text-green-500 mb-2"/><span className="text-3xl font-black text-gray-800 dark:text-slate-200">{acc}%</span><span className="text-sm text-gray-500 dark:text-slate-400 font-bold">Precisión</span></div>
              </div>
              
              <div className="w-full bg-indigo-50 dark:bg-slate-800/40 dark:bg-slate-800/80 border-indigo-100 dark:border-slate-700 p-6 rounded-3xl shadow-sm border-2 border-indigo-100 dark:border-slate-700 mb-6">
                <h3 className="font-bold text-xl text-gray-800 dark:text-slate-200 mb-4 flex items-center gap-2"><CalendarDays size={24} className="text-indigo-500"/> Historial de Rachas</h3>
                <p className="text-sm text-gray-500 dark:text-slate-400 mb-4 font-medium">Ejercicios completados por día (último mes).</p>
                <div className="w-full h-48">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={(() => {
                      const data = [];
                      for(let i=29; i>=0; i--) {
                        const d = new Date(Date.now() - i * 86400000);
                        const iso = d.toISOString().split('T')[0];
                        data.push({
                          day: d.getDate(),
                          ejercicios: stats.history?.[iso] || 0
                        });
                      }
                      return data;
                    })()}>
                      <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{fontSize: 10, fill: '#6b7280'}} interval="preserveStartEnd" minTickGap={10} />
                      <Tooltip cursor={{fill: '#eef2ff'}} contentStyle={{borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'}}/>
                      <Bar dataKey="ejercicios" fill="#6366f1" radius={[6, 6, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
                {renderCalendar()}
              </div>

              {/* Comparative Weekly Progress Line Chart */}
              <div className="w-full bg-indigo-50 dark:bg-slate-800/40 dark:bg-slate-800/80 border-indigo-100 dark:border-slate-700 p-6 rounded-3xl shadow-sm border-2 border-indigo-100 dark:border-slate-700 mb-6">
                <h3 className="font-bold text-xl text-gray-800 dark:text-slate-200 mb-4 flex items-center gap-2">
                  <TrendingUp size={24} className="text-indigo-500"/> Comparación de Progreso Semanal
                </h3>
                <p className="text-sm text-gray-500 dark:text-slate-400 mb-4 font-medium">
                  Volumen de práctica de la semana actual frente a la semana anterior.
                </p>
                <div className="w-full h-56">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={lineChartData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" className="dark:stroke-slate-800" />
                      <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fontSize: 10, fill: '#6b7280'}} />
                      <YAxis axisLine={false} tickLine={false} tick={{fontSize: 10, fill: '#6b7280'}} />
                      <Tooltip contentStyle={{borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'}}/>
                      <Legend wrapperStyle={{ fontSize: 11, fontWeight: 'bold' }} />
                      <Line type="monotone" dataKey="Esta Semana" stroke="#6366f1" strokeWidth={3} activeDot={{ r: 8 }} name="Esta Semana" />
                      <Line type="monotone" dataKey="Semana Anterior" stroke="#94a3b8" strokeWidth={2} strokeDasharray="4 4" name="Semana Anterior" />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>

              <div className="w-full bg-indigo-50 dark:bg-slate-800/40 dark:bg-slate-800/80 border-indigo-100 dark:border-slate-700 p-6 rounded-3xl shadow-sm border-2 border-indigo-100 dark:border-slate-700 mb-6">
                <h3 className="font-bold text-xl text-gray-800 dark:text-slate-200 mb-4 flex items-center gap-2"><TrendingUp size={24} className="text-indigo-500"/> Ejercicios Resueltos</h3>
                <div className="flex items-center justify-between bg-indigo-50 dark:bg-slate-800 p-4 rounded-xl">
                  <span className="text-lg font-medium text-gray-600 dark:text-slate-300">Total completados:</span>
                  <span className="text-2xl font-black text-indigo-600 dark:text-indigo-400">{stats.totalCompleted}</span>
                </div>
              </div>
              
              <div className="w-full bg-indigo-50 dark:bg-slate-800/40 dark:bg-slate-800/80 border-indigo-100 dark:border-slate-700 p-6 rounded-3xl shadow-sm border-2 border-indigo-100 dark:border-slate-700">
                <h3 className="font-bold text-xl text-gray-800 dark:text-slate-200 mb-4 flex items-center gap-2"><Star size={24} className="text-yellow-500"/> Habilidades (Top)</h3>
                <div className="space-y-3">
                  {Object.keys(stats.skills || {}).map(sk => (
                    <div key={sk} className="flex justify-between items-center">
                      <span className="font-medium text-gray-600 dark:text-slate-300">{sk}</span>
                      <span className="font-bold text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-slate-800 px-3 py-1 rounded-full">{stats.skills[sk]}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
