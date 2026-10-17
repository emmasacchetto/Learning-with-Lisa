const fs = require('fs');
let content = fs.readFileSync('src/App.tsx', 'utf-8');

const target1 = `  const [showResetConfirmModal, setShowResetConfirmModal] = useState(false);`;
const replacement1 = `  const [showResetConfirmModal, setShowResetConfirmModal] = useState(false);
  const [showDeepResetConfirmModal, setShowDeepResetConfirmModal] = useState(false);`;

content = content.replace(target1, replacement1);

const target2 = `                    <button onClick={() => {
                        setShowResetConfirmModal(true);
                    }} className="w-full py-3 bg-red-500 text-white hover:bg-red-600 rounded-xl font-bold text-sm active:scale-95 flex items-center justify-center gap-2">
                      <RefreshCw size={16}/> Borrar todo el progreso
                    </button>`;

const replacement2 = `                    <button onClick={() => {
                        setShowResetConfirmModal(true);
                    }} className="w-full py-3 bg-red-500 text-white hover:bg-red-600 rounded-xl font-bold text-sm active:scale-95 flex items-center justify-center gap-2 mb-2">
                      <RefreshCw size={16}/> Borrar todo el progreso
                    </button>
                    <button onClick={() => {
                        setShowDeepResetConfirmModal(true);
                    }} className="w-full py-3 bg-red-900 text-white hover:bg-red-950 rounded-xl font-bold text-sm active:scale-95 flex items-center justify-center gap-2 shadow-lg">
                      <RefreshCw size={16}/> Reinicio de Fábrica Profundo
                    </button>`;

content = content.replace(target2, replacement2);

const target3 = `  const renderResetConfirmModal = () => {`;

const replacement3 = `  const renderDeepResetConfirmModal = () => {
    return (
      <div className="fixed inset-0 bg-black/80 backdrop-blur-md z-[10000] flex items-center justify-center p-4">
        <div className="bg-red-950/90 rounded-3xl border-4 border-red-500 max-w-sm w-full p-6 shadow-2xl animate-scale-up text-center">
          <div className="bg-red-600 text-white rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4 text-4xl shadow-inner animate-pulse">
            💥
          </div>
          <h3 className="text-2xl font-extrabold text-red-100 mb-2">Reinicio Profundo</h3>
          <p className="text-sm text-red-200 mb-6 font-medium leading-relaxed">
            Esta acción borrará todas las cookies, caché, almacenamiento local y recargará la aplicación por completo. Olvidará absolutamente todo sobre el usuario y volverá a mostrar la bienvenida. ¿Continuar?
          </p>
          <div className="flex flex-col gap-2.5">
            <button 
              onClick={() => {
                localStorage.clear();
                sessionStorage.clear();
                document.cookie.split(";").forEach((c) => {
                  document.cookie = c
                    .replace(/^ +/, "")
                    .replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/");
                });
                window.location.reload();
              }} 
              className="w-full py-4 bg-red-600 text-white hover:bg-red-500 active:scale-95 text-base font-extrabold rounded-2xl shadow-lg border-b-4 border-red-800 transition"
            >
              Sí, Borrar y Reiniciar App
            </button>
            <button 
              onClick={() => setShowDeepResetConfirmModal(false)} 
              className="w-full py-3 bg-slate-800 hover:bg-slate-700 text-white active:scale-95 text-sm font-bold rounded-xl transition"
            >
              Cancelar
            </button>
          </div>
        </div>
      </div>
    );
  };

  const renderResetConfirmModal = () => {`;

content = content.replace(target3, replacement3);

const target4 = `        {showResetConfirmModal && renderResetConfirmModal()}`;
const replacement4 = `        {showResetConfirmModal && renderResetConfirmModal()}
        {showDeepResetConfirmModal && renderDeepResetConfirmModal()}`;

content = content.replace(target4, replacement4);

fs.writeFileSync('src/App.tsx', content);
