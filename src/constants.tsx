import { BookOpen, Headphones, Layers, MessageSquare, Mic, PenTool, Languages, Volume2, GraduationCap, Bookmark, Eye, Link, HelpCircle } from 'lucide-react';
import React from 'react';

export const DEFAULT_SKILL_ORDER = ['Reading', 'Listening', 'Speaking', 'Writing', 'Translate', 'Flashcards', 'Dictation', 'Conversation', 'Match', 'Similar', 'Visual', 'Grammar', 'Vocabulary'];
export const SKILL_LABELS: Record<string, string> = { 
  'Reading': 'Leer (Reading)', 
  'Listening': 'Escuchar (Listening)', 
  'Speaking': 'Hablar (Speaking)', 
  'Translate': 'Traducir (Translate)', 
  'Writing': 'Escribir (Writing)', 
  'Flashcards': 'Tarjetas (Flashcards)', 
  'Conversation': 'Diálogos (Conversation)', 
  'Match': 'Unir (Match)', 
  'Similar': 'Confusas (Similar)', 
  'Dictation': 'Dictado (Dictation)', 
  'Visual': 'Con Imagen (Visual)',
  'Grammar': 'Gramática (Grammar)',
  'Vocabulary': 'Vocabulario (Vocabulary)'
};
export const SKILL_ICONS: Record<string, React.ReactNode> = { 
  'Reading': <BookOpen/>, 
  'Listening': <Headphones/>, 
  'Speaking': <Mic/>, 
  'Translate': <Languages/>, 
  'Writing': <PenTool/>, 
  'Flashcards': <Layers/>, 
  'Conversation': <MessageSquare/>, 
  'Match': <Link/>, 
  'Similar': <HelpCircle/>, 
  'Dictation': <Volume2/>, 
  'Visual': <Eye/>,
  'Grammar': <GraduationCap/>,
  'Vocabulary': <Bookmark/>
};
export const SKILL_COLORS: Record<string, string> = { 
  'Reading': 'green', 
  'Listening': 'blue', 
  'Speaking': 'red', 
  'Translate': 'blue', 
  'Writing': 'orange', 
  'Flashcards': 'purple', 
  'Conversation': 'teal', 
  'Match': 'indigo', 
  'Similar': 'rose', 
  'Dictation': 'violet', 
  'Visual': 'cyan',
  'Grammar': 'emerald',
  'Vocabulary': 'fuchsia'
};
export const SKILL_TIPS: Record<string, string> = { 
  'Reading': 'Comprensión lectora y opción correcta', 
  'Listening': 'Oír en inglés y escribir la respuesta', 
  'Speaking': 'Leer y pronunciar por micrófono', 
  'Translate': 'Traducir del español al inglés', 
  'Writing': 'Ordenar letras/palabras para armar', 
  'Flashcards': 'Repasar tarjetas de memoria', 
  'Conversation': 'Simula una conversación real interactiva', 
  'Match': 'Unir opciones correctas', 
  'Similar': 'Diferenciar opciones parecidas', 
  'Dictation': 'La app te dicta la frase para escribirla y luego tú dictas a la app', 
  'Visual': 'Adivinar con contexto de imagen',
  'Grammar': 'Aprender reglas y estructura de oraciones',
  'Vocabulary': 'Aprender vocabulario nuevo y palabras clave'
};
