import { ArrowLeft, MessageCircle, Mic, Send, Sparkles, Volume2 } from 'lucide-react';
import React, { useEffect, useRef, useState } from 'react';
import { playTTS } from '../utils';

// Helper to call Gemini AI (if available through server or client key)
export const callGemini = async (prompt: string, systemInstruction = "", useJson = false) => {
  // If no environment variable is available, try hitting a proxy or return dummy
  const apiKey = (import.meta as any).env.VITE_GEMINI_API_KEY || ""; // Safe fallback
  if (!apiKey) {
      console.warn("No Gemini API key available in client side");
      return useJson ? JSON.stringify({error: "No key"}) : "La IA no está configurada, pero igual puedes practicar con el resto de la app.";
  }
  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`;

  const payload: any = { contents: [{ parts: [{ text: prompt }] }] };
  if (systemInstruction) payload.systemInstruction = { parts: [{ text: systemInstruction }] };
  if (useJson) payload.generationConfig = { responseMimeType: "application/json" };

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    const result = await response.json();
    const text = result.candidates?.[0]?.content?.parts?.[0]?.text;
    return useJson ? JSON.parse(text) : text;
  } catch (error) {
    console.error("Gemini API Error:", error);
    throw error;
  }
};

export function AIHubScreen({ onSelect, onBack }: any) {
  return (
    <div className="flex-1 p-6 flex flex-col items-center overflow-y-auto bg-indigo-50">
      <button onClick={onBack} className="self-start text-indigo-500 font-bold mb-4 flex items-center gap-2 hover:text-indigo-700"><ArrowLeft size={20} /> Volver</button>
      <h2 className="text-3xl font-bold text-indigo-800 flex items-center gap-3 mb-6"><Sparkles size={36} className="text-yellow-500"/> Zona Mágica IA</h2>
      
      <div className="grid gap-4 w-full">
        <button onClick={() => onSelect('ai_story')} className="w-full bg-white p-6 rounded-2xl shadow-md border-b-4 border-purple-200 active:border-b-0 active:translate-y-1 transition text-left flex items-start gap-4 hover:border-purple-400">
           <div className="bg-purple-100 p-3 rounded-xl"><Sparkles size={32} className="text-purple-600"/></div>
           <div>
             <h3 className="text-2xl font-bold text-gray-800">Cuentos Mágicos</h3>
             <p className="text-gray-500 font-medium">Lee y escucha cuentos cortos generados por IA a tu nivel.</p>
           </div>
        </button>
        <button onClick={() => onSelect('ai_chat')} className="w-full bg-white p-6 rounded-2xl shadow-md border-b-4 border-blue-200 active:border-b-0 active:translate-y-1 transition text-left flex items-start gap-4 hover:border-blue-400">
           <div className="bg-blue-100 p-3 rounded-xl"><MessageCircle size={32} className="text-blue-600"/></div>
           <div>
             <h3 className="text-2xl font-bold text-gray-800">Chat Libre</h3>
             <p className="text-gray-500 font-medium">Chatea en inglés con un amigo mágico comprensivo.</p>
           </div>
        </button>
      </div>
    </div>
  );
}

export function AIStoryScreen({ onBack, selectedVoiceURI }: any) {
  const [loading, setLoading] = useState(false);
  const [story, setStory] = useState<{eng: string, spa: string} | null>(null);

  const generateStory = async () => {
    setLoading(true);
    setStory(null);
    try {
        const text = await callGemini(
            "Write a very short, simple 3-sentence children's story for A1 English learners. Return strict JSON with 'eng' (English text) and 'spa' (Spanish translation).", 
            "", true
        );
        if (text && text.eng) setStory(text);
        else setStory({eng: "Once upon a time, there was a happy cat. It loved to play in the garden. The end.", spa: "Había una vez un gato feliz. Le encantaba jugar en el jardín. Fin."});
    } catch(e) {
        setStory({eng: "Once upon a time, there was a happy cat. It loved to play in the garden. The end.", spa: "Había una vez un gato feliz. Le encantaba jugar en el jardín. Fin."});
    }
    setLoading(false);
  };

  return (
    <div className="flex-1 p-6 flex flex-col bg-slate-50 relative">
      <button onClick={onBack} className="self-start text-indigo-500 font-bold mb-4 flex items-center gap-2 hover:text-indigo-700"><ArrowLeft size={20} /> Volver</button>
      <h2 className="text-2xl font-bold text-indigo-800 flex items-center gap-2 mb-6"><Sparkles className="text-yellow-500"/> Cuentos IA</h2>

      {!story && !loading && (
        <div className="flex-1 flex items-center justify-center">
            <button onClick={generateStory} className="px-6 py-4 bg-purple-500 text-white font-bold rounded-2xl shadow border-b-4 border-purple-700 active:border-b-0 active:translate-y-1">¡Generar un Cuento Mágico!</button>
        </div>
      )}

      {loading && <div className="flex-1 flex items-center justify-center font-bold text-gray-500 animate-pulse">Pensando una linda historia...</div>}

      {story && (
        <div className="flex flex-col gap-4 animate-slide-up">
           <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200 relative">
              <button onClick={() => playTTS(story.eng, 'en', selectedVoiceURI, 0.85, true)} className="absolute -top-4 right-4 bg-blue-500 text-white p-3 rounded-full shadow hover:bg-blue-600"><Volume2 size={24}/></button>
              <p className="text-2xl font-bold text-gray-800 leading-relaxed mb-4 mt-2">{story.eng}</p>
           </div>
           <div className="bg-purple-50 p-4 rounded-xl border border-purple-100">
              <p className="text-gray-600 font-medium italic">{story.spa}</p>
           </div>
           <button onClick={generateStory} className="mt-4 px-6 py-4 bg-purple-100 text-purple-700 font-bold rounded-2xl shadow-sm border border-purple-200">Generar otro cuento</button>
        </div>
      )}
    </div>
  );
}

export function AIChatScreen({ onBack, selectedVoiceURI }: any) {
    const [messages, setMessages] = useState<{role: 'user'|'model', text: string}[]>([{role: 'model', text: "Hello! How are you today?"}]);
    const [input, setInput] = useState('');
    const [isThinking, setIsThinking] = useState(false);
    const chatEndRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    const handleSend = async () => {
        if (!input.trim() || isThinking) return;
        const msg = input.trim();
        setInput('');
        setMessages(prev => [...prev, {role: 'user', text: msg}]);
        setIsThinking(true);
        try {
            const prompt = `User said: "${msg}". Reply briefly in very simple A1 English. Be encouraging. Do not use complex words.`;
            const reply = await callGemini(prompt) as string;
            const textResponse = reply || "I didn't understand, but that's okay! Try again!";
            setMessages(prev => [...prev, {role: 'model', text: textResponse}]);
            playTTS(textResponse, 'en', selectedVoiceURI, 0.9, true);
        } catch {
            setMessages(prev => [...prev, {role: 'model', text: "Oops, my magic is resting. Try again later!"}]);
        }
        setIsThinking(false);
    };

    return (
      <div className="flex-1 flex flex-col bg-slate-50 h-full">
        <div className="p-4 bg-white shadow-sm flex items-center gap-3 relative z-10 shrink-0">
           <button onClick={onBack} className="p-2 text-indigo-500 rounded-full hover:bg-gray-100"><ArrowLeft size={24} /></button>
           <h2 className="text-xl font-bold text-indigo-800 flex items-center gap-2"><MessageCircle/> Chat Mágico</h2>
        </div>
        
        <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-4 bg-blue-50/50">
            {messages.map((m, i) => (
                <div key={i} className={`flex ${m.role === 'model' ? 'justify-start' : 'justify-end'} animate-slide-up`}>
                    <div className={`p-4 rounded-2xl max-w-[85%] font-medium ${m.role === 'model' ? 'bg-white text-gray-800 shadow border border-gray-100 rounded-tl-sm' : 'bg-indigo-500 text-white rounded-tr-sm shadow-sm'}`}>
                        {m.text}
                    </div>
                </div>
            ))}
            {isThinking && <div className="text-sm font-bold text-gray-400 animate-pulse ml-2">Pensando...</div>}
            <div ref={chatEndRef}/>
        </div>

        <div className="p-4 bg-white shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)] shrink-0 flex gap-2">
            <input 
                value={input} onChange={e => setInput(e.target.value)} 
                onKeyDown={e => e.key === 'Enter' && handleSend()}
                placeholder="Escribe en inglés..." 
                className="flex-1 p-3 rounded-xl border border-gray-300 focus:outline-none focus:border-indigo-500"
            />
            <button onClick={handleSend} disabled={isThinking || !input.trim()} className="p-3 bg-indigo-500 text-white rounded-xl active:scale-95 disabled:opacity-50"><Send size={24}/></button>
        </div>
      </div>
    );
}
