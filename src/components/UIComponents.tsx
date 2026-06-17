import { CheckCircle2 } from 'lucide-react';

export function TranslatableText({ text, onWordClick, defaultLang = 'es' }: { text: string, onWordClick: (w: string, lang: string) => void, defaultLang?: string }) {
  if (!text) return null;
  return (
    <span className="flex flex-wrap justify-center gap-1">
      {text.split(' ').map((word, i) => (
        <span 
          key={i} 
          onClick={() => onWordClick(word, defaultLang)} 
          className="cursor-pointer hover:text-indigo-500 transition-colors border-b-2 border-transparent hover:border-indigo-300"
          title="Toca para traducir y escuchar"
        >
          {word}{' '}
        </span>
      ))}
    </span>
  );
}

export function SkillBtn({ onClick, icon, title, color, isCompleted, inProgressData, tooltip }: any) {
  const colorMap: Record<string, string> = {
    purple: "bg-gradient-to-r from-purple-500 to-purple-600 text-white border-purple-700",
    blue: "bg-gradient-to-r from-blue-400 to-blue-500 text-white border-blue-600",
    green: "bg-gradient-to-r from-emerald-400 to-emerald-500 text-white border-emerald-600",
    orange: "bg-gradient-to-r from-orange-400 to-orange-500 text-white border-orange-600",
    red: "bg-gradient-to-r from-rose-400 to-rose-500 text-white border-rose-600",
    teal: "bg-gradient-to-r from-teal-400 to-teal-500 text-white border-teal-600",
    indigo: "bg-gradient-to-r from-indigo-500 to-indigo-600 text-white border-indigo-700",
    rose: "bg-gradient-to-r from-rose-500 to-pink-500 text-white border-rose-600",
    cyan: "bg-gradient-to-r from-cyan-500 to-teal-500 text-white border-cyan-600"
  };
  return (
    <button onClick={onClick} title={tooltip} className={`p-5 rounded-2xl border-2 border-b-4 font-bold text-lg shadow-md flex items-center justify-between transition-transform hover:scale-[1.02] active:scale-95 active:translate-y-1 active:border-b-2 ${colorMap[color]}`}>
      <div className="flex flex-col items-start gap-1">
        <div className="flex items-center gap-3 drop-shadow-sm">{icon} {title}</div>
        {inProgressData && (
          <span className="text-xs font-bold px-2 py-1 rounded-full bg-white/30 text-white shadow-sm">
            ▶️ Retomar ({inProgressData.currentIndex + 1}/{inProgressData.queue.length})
          </span>
        )}
      </div>
      {isCompleted && <CheckCircle2 size={28} className="text-white drop-shadow-md" />}
    </button>
  );
}
