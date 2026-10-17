import React, { useState, useEffect } from 'react';
import { 
  Database, Edit3, FileJson, Plus, Trash2, Copy, Check, Download, 
  Save, RefreshCw, AlertTriangle, Search, Sparkles, FileText, ChevronDown, ChevronUp, XCircle
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { rebuildDatabase } from '../data';

interface DatabaseFile {
  id: string;
  name: string;
  desc: string;
  type: string;
}

interface DatabaseEditorProps {
  onNotify: (msg: string) => void;
  darkMode?: boolean;
  onScroll?: (e: any) => void;
}

export default function DatabaseEditor({ onNotify, darkMode, onScroll }: DatabaseEditorProps) {
  const [files, setFiles] = useState<DatabaseFile[]>([]);
  const [selectedFile, setSelectedFile] = useState<string>('sentences.json');
  const [editMode, setEditMode] = useState<'form' | 'json'>('form');
  const [loading, setLoading] = useState<boolean>(false);
  const [saving, setSaving] = useState<boolean>(false);

  const detectExerciseType = (item: any): string => {
    if (!item) return selectedFile;
    if (item.readingText !== undefined || (item.questions !== undefined && Array.isArray(item.questions))) {
      return 'reading_comprehension.json';
    }
    if (item.dialogue !== undefined && Array.isArray(item.dialogue)) {
      return 'dialogues.json';
    }
    if (item.question !== undefined || (item.options !== undefined && Array.isArray(item.options) && item.correctAnswer !== undefined)) {
      return 'grammar_quizzes.json';
    }
    if (typeof item.eng === 'string') {
      if (selectedFile === 'vocabulary.json') {
        return 'vocabulary.json';
      }
      return 'sentences.json';
    }
    return selectedFile;
  };
  
  // JSON data representation
  const [jsonString, setJsonString] = useState<string>('[]');
  const [parsedData, setParsedData] = useState<any[]>([]);
  const [jsonError, setJsonError] = useState<string | null>(null);
  
  // Form view search
  const [searchTerm, setSearchTerm] = useState<string>('');
  
  // Copy feedback states
  const [promptCopied, setPromptCopied] = useState<boolean>(false);
  
  // For collapsibles or expanded items in the form editor
  const [expandedItems, setExpandedItems] = useState<Record<number, boolean>>({});

  // Collapsible Database Editor Header
  const [dbHeaderCollapsed, setDbHeaderCollapsed] = useState<boolean>(false);
  const [lastScrollY, setLastScrollY] = useState<number>(0);

  const handleEditorScroll = (e: any) => {
    if (onScroll) {
      onScroll(e);
    }

    const currentScrollY = e.currentTarget.scrollTop;
    const deltaY = currentScrollY - lastScrollY;
    
    if (deltaY > 0) {
      // Scrolling down: collapse immediately
      if (currentScrollY > 10) {
        setDbHeaderCollapsed(true);
      }
    } else if (deltaY < 0) {
      // Scrolling up: ONLY show when scrolled all the way to the top
      if (currentScrollY <= 10) {
        setDbHeaderCollapsed(false);
      }
    }
    
    if (currentScrollY <= 10) {
      setDbHeaderCollapsed(false);
    }
    
    setLastScrollY(currentScrollY);
  };

  // States for floating window/modal editor
  const [editingItemIndex, setEditingItemIndex] = useState<number | null>(null);
  const [editingItem, setEditingItem] = useState<any | null>(null);

  // AI Assistant and Advanced Templates Modal States
  const [showAiAssistant, setShowAiAssistant] = useState<boolean>(false);
  const [aiAssistantTab, setAiAssistantTab] = useState<'generate' | 'templates'>('generate');
  
  // Tab 1: AI Generation States
  const [aiSelectedType, setAiSelectedType] = useState<string>('sentences.json');
  const [aiTopic, setAiTopic] = useState<string>('');
  const [aiLevel, setAiLevel] = useState<string>('Principiante');
  const [aiLoading, setAiLoading] = useState<boolean>(false);
  const [aiGeneratedItems, setAiGeneratedItems] = useState<any[] | null>(null);
  const [aiGenerationError, setAiGenerationError] = useState<string | null>(null);

  // Tab 2: Manual Prompts and Templates States
  const [templateSelectedType, setTemplateSelectedType] = useState<string>('sentences.json');
  const [templatePromptCopied, setTemplatePromptCopied] = useState<boolean>(false);

  // Prompt Viewer & Editor Modal States
  const [showPromptEditorModal, setShowPromptEditorModal] = useState<boolean>(false);
  const [editedPromptText, setEditedPromptText] = useState<string>('');
  const [promptEditorSource, setPromptEditorSource] = useState<string>('general');

  // Fetch the list of editable files on load
  useEffect(() => {
    async function loadFiles() {
      setLoading(true);
      try {
        const res = await fetch('/api/database/files');
        if (res.ok) {
          const data = await res.json();
          setFiles(data);
        } else {
          // Fallback if API fails
          setFiles([
            { id: "sentences.json", name: "Base de Datos Principal (Sentences)", desc: "Frases principales, traducciones, categorías y emojis.", type: "sentences" },
            { id: "vocabulary.json", name: "Vocabulario (Vocabulary)", desc: "Palabras sueltas con traducciones, categorías y emojis.", type: "vocabulary" },
            { id: "grammar_quizzes.json", name: "Quizzes de Gramática (Grammar)", desc: "Preguntas de opción múltiple de gramática con opciones, respuesta correcta y explicación.", type: "grammar" },
            { id: "dialogues.json", name: "Diálogos y Conversaciones (Dialogues)", desc: "Conversaciones interactivas por turnos entre hablante A y B.", type: "dialogues" },
            { id: "reading_comprehension.json", name: "Comprensión Lectora (Reading)", desc: "Textos de lectura con preguntas de comprensión asociadas.", type: "reading" }
          ]);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    loadFiles();
  }, []);

  // Load selected file content
  const loadFileContent = async (fileId: string) => {
    setLoading(true);
    setJsonError(null);
    setSearchTerm('');
    setExpandedItems({});
    try {
      const res = await fetch(`/api/database/read?file=${fileId}`);
      if (res.ok) {
        const data = await res.json();
        const formattedJson = JSON.stringify(data.content, null, 2);
        setJsonString(formattedJson);
        setParsedData(data.content);
      } else {
        onNotify("No se pudo cargar el archivo desde el servidor.");
      }
    } catch (err: any) {
      onNotify("Error de conexión al cargar la base de datos.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (selectedFile) {
      loadFileContent(selectedFile);
    }
  }, [selectedFile]);

  // Handle manual JSON string edits
  const handleJsonStringChange = (val: string) => {
    setJsonString(val);
    try {
      const parsed = JSON.parse(val);
      if (Array.isArray(parsed)) {
        setParsedData(parsed);
        setJsonError(null);
      } else {
        setJsonError("El JSON debe ser un arreglo [ ... ]");
      }
    } catch (err: any) {
      setJsonError(err.message);
    }
  };

  // Synchronize parsed changes back to JSON string for saving
  const updateJsonFromParsed = (newData: any[]) => {
    setParsedData(newData);
    setJsonString(JSON.stringify(newData, null, 2));
    setJsonError(null);
  };

  // Saving the database
  const handleSave = async () => {
    // Make sure JSON is currently valid
    try {
      JSON.parse(jsonString);
    } catch (err: any) {
      onNotify(`No se puede guardar. Corrige el error en el JSON primero: ${err.message}`);
      return;
    }

    setSaving(true);
    try {
      const res = await fetch('/api/database/save', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ file: selectedFile, content: jsonString })
      });

      if (res.ok) {
        // Now trigger the rebuild in client memory so changes are instant!
        // We load all 5 databases from the server to completely sync client state.
        onNotify("¡Cambios guardados en el disco con éxito! Sincronizando con el juego...");
        
        // Fetch all files in parallel
        const fileNames = ['sentences.json', 'vocabulary.json', 'grammar_quizzes.json', 'dialogues.json', 'reading_comprehension.json'];
        const fetches = fileNames.map(f => fetch(`/api/database/read?file=${f}`).then(r => r.ok ? r.json() : { content: null }));
        
        const [sentencesRes, vocabRes, quizzesRes, dialoguesRes, readingRes] = await Promise.all(fetches);
        
        rebuildDatabase(
          sentencesRes.content,
          vocabRes.content,
          quizzesRes.content,
          dialoguesRes.content,
          readingRes.content
        );

        onNotify("¡Base de datos del juego actualizada! ✅");
      } else {
        const errorData = await res.json();
        onNotify(`Error al guardar: ${errorData.error}`);
      }
    } catch (err: any) {
      onNotify(`Error al conectar con el servidor: ${err.message}`);
    } finally {
      setSaving(false);
    }
  };

  // Form Editor actions
  const handleDeleteItem = (index: number) => {
    const confirmDelete = window.confirm("¿Seguro que deseas eliminar este elemento de la base de datos?");
    if (!confirmDelete) return;

    const updated = parsedData.filter((_, i) => i !== index);
    updateJsonFromParsed(updated);
    onNotify("Elemento eliminado de la lista local. Recuerda presionar 'Guardar Base de Datos'.");
  };

  const handleUpdateItemField = (index: number, field: string, value: any) => {
    const updated = [...parsedData];
    updated[index] = { ...updated[index], [field]: value };
    updateJsonFromParsed(updated);
  };

  const handleOpenEditModal = (index: number) => {
    setEditingItemIndex(index);
    setEditingItem(JSON.parse(JSON.stringify(parsedData[index])));
  };

  const handleUpdateEditingItemField = (field: string, value: any) => {
    setEditingItem((prev: any) => ({ ...prev, [field]: value }));
  };

  const handleAddItem = () => {
    let newItem: any = {};
    if (selectedFile === 'sentences.json' || selectedFile === 'vocabulary.json') {
      newItem = { id: `ex_${Date.now()}`, eng: "", spa: "", category: "General", emoji: "✨", year: "2026", source: "Manual", type: "Data", skill: "Vocabulary" };
    } else if (selectedFile === 'grammar_quizzes.json') {
      newItem = { id: `quiz_${Date.now()}`, eng: "", spa: "", question: "", options: ["", "", "", ""], correctAnswer: "", explanation: "", category: "Grammar", emoji: "📝", year: "2026", source: "Manual", type: "quiz", skill: "Grammar" };
    } else if (selectedFile === 'dialogues.json') {
      newItem = { id: `dialogue_${Date.now()}`, eng: "", spa: "", category: "", emoji: "💬", year: "2026", source: "Manual", type: "dialogue", skill: "Conversation", dialogue: [{ speaker: "A", eng: "", spa: "", emoji: "💬" }] };
    } else if (selectedFile === 'reading_comprehension.json') {
      newItem = { id: `read_${Date.now()}`, eng: "", spa: "", category: "General", emoji: "📖", year: "2026", source: "Manual", type: "reading", skill: "Reading", readingText: "", questions: [{ q: "", options: ["", "", ""], a: "" }] };
    }

    setEditingItem(newItem);
    setEditingItemIndex(-1); // -1 is code for a new item
    onNotify("Ingresa los detalles del nuevo ejercicio en la ventana.");
  };

  // Prompt Generator
  const getPromptForLLM = () => {
    const schemaDesc = {
      'sentences.json': `[
  {
    "eng": "English phrase",
    "spa": "Spanish translation",
    "category": "CategoryName (e.g. Introductions, School Objects, etc.)",
    "emoji": "One descriptive emoji"
  }
]`,
      'vocabulary.json': `[
  {
    "eng": "English word",
    "spa": "Spanish translation",
    "category": "CategoryName (e.g. Places, Hobbies, etc.)",
    "emoji": "One descriptive emoji"
  }
]`,
      'grammar_quizzes.json': `[
  {
    "question": "Question in English or Spanish asking to select correct option",
    "options": ["Correct option", "Wrong option 1", "Wrong option 2", "Wrong option 3"],
    "correctAnswer": "Correct option",
    "explanation": "Brief explanation in Spanish about why this is the correct answer",
    "category": "Grammar topic",
    "emoji": "One descriptive emoji"
  }
]`,
      'dialogues.json': `[
  {
    "id": "dialogue_126",
    "eng": "",
    "spa": "",
    "category": "Dialogue Topic Name",
    "emoji": "💬",
    "year": "2026",
    "source": "AI Generated",
    "type": "dialogue",
    "skill": "Conversation",
    "dialogue": [
      {
        "speaker": "A",
        "eng": "English text line",
        "spa": "Spanish translation line",
        "emoji": "One descriptive emoji"
      },
      {
        "speaker": "B",
        "eng": "English reply",
        "spa": "Spanish translation",
        "emoji": "One descriptive emoji"
      }
    ]
  }
]`,
      'reading_comprehension.json': `[
  {
    "id": "read_127",
    "eng": "",
    "spa": "",
    "category": "Reading Topic Name",
    "readingText": "Short story or informative paragraph in English (3-5 sentences)",
    "emoji": "One descriptive emoji",
    "year": "2026",
    "source": "AI Generated",
    "type": "reading",
    "skill": "Reading",
    "questions": [
      {
        "q": "English question about the text",
        "options": ["Correct answer", "Distractor 1", "Distractor 2", "Distractor 3"],
        "a": "Correct answer"
      }
    ]
  }
]`
    };

    return `Actúa como un profesor nativo de inglés experto en pedagogía. Necesito que generes nuevos contenidos de práctica para mi aplicación de inglés Lisa's Quest. 
Por favor, genera exactamente 5 nuevos elementos que sigan de manera estricta y perfecta el siguiente esquema de base de datos JSON para el archivo "${selectedFile}":

\`\`\`json
${schemaDesc[selectedFile as keyof typeof schemaDesc] || '[]'}
\`\`\`

Instrucciones pedagógicas:
- El contenido debe ser divertido, apto para niveles principiante a intermedio de inglés escolar.
- Las traducciones al español deben ser naturales, precisas y contextuales.
- El formato JSON final debe ser absolutamente válido y estar contenido en un bloque de código \`\`\`json para que pueda copiarlo y pegarlo directamente en mi base de datos sin errores de sintaxis.`;
  };

  const handleCopyPrompt = () => {
    navigator.clipboard.writeText(getPromptForLLM());
    setPromptCopied(true);
    onNotify("¡Prompt copiado al portapapeles! Pégalo en Gemini, Claude o ChatGPT.");
    setTimeout(() => setPromptCopied(false), 3000);
  };

  // Download sample template JSON file
  const handleDownloadTemplate = () => {
    const templates = {
      'sentences.json': [{ id: "ex_1", eng: "Please close the window.", spa: "Por favor cierra la ventana.", category: "Classroom", emoji: "🪟", year: "2026", source: "Template", type: "Data", skill: "Vocabulary" }],
      'vocabulary.json': [{ id: "ex_2", eng: "Library", spa: "Biblioteca", category: "Places", emoji: "📚", year: "2026", source: "Template", type: "Data", skill: "Vocabulary" }],
      'grammar_quizzes.json': [{ id: "quiz_1", eng: "", spa: "", question: "Choose the correct verb: They ___ soccer every Friday.", options: ["play", "plays", "playing", "played"], correctAnswer: "play", explanation: "Se usa el verbo en infinitivo sin 's' para pronombres plurales como 'They'.", category: "Present Simple", emoji: "⚽", year: "2026", source: "Template", type: "quiz", skill: "Grammar" }],
      'dialogues.json': [{ id: "greeting_sample", eng: "", spa: "", category: "First Meeting", emoji: "💬", year: "2026", source: "Template", type: "dialogue", skill: "Conversation", dialogue: [{ speaker: "A", eng: "Hi, I am Mark.", spa: "Hola, soy Mark.", emoji: "👋" }, { speaker: "B", eng: "Nice to meet you Mark, I am Lisa.", spa: "Mucho gusto Mark, soy Lisa.", emoji: "😊" }] }],
      'reading_comprehension.json': [{ id: "read_1", eng: "", spa: "", category: "Tom's Dog", readingText: "Tom has a little golden retriever. His name is Sparky and he loves chasing red tennis balls.", emoji: "🐕", year: "2026", source: "Template", type: "reading", skill: "Reading", questions: [{ q: "What is the name of Tom's dog?", options: ["Sparky", "Max", "Rex", "Buddy"], a: "Sparky" }] }]
    };

    const data = templates[selectedFile as keyof typeof templates] || [];
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `plantilla_${selectedFile}`;
    a.click();
    URL.revokeObjectURL(url);
    onNotify("¡Plantilla JSON descargada! Úsala como guía para tus propios ejercicios.");
  };

  // Download template for specific type
  const handleDownloadTemplateForType = (fileId: string) => {
    const templates = {
      'sentences.json': [{ id: "ex_1", eng: "Please close the window.", spa: "Por favor cierra la ventana.", category: "Classroom", emoji: "🪟", year: "2026", source: "Template", type: "Data", skill: "Vocabulary" }],
      'vocabulary.json': [{ id: "ex_2", eng: "Library", spa: "Biblioteca", category: "Places", emoji: "📚", year: "2026", source: "Template", type: "Data", skill: "Vocabulary" }],
      'grammar_quizzes.json': [{ id: "quiz_1", eng: "", spa: "", question: "Choose the correct verb: They ___ soccer every Friday.", options: ["play", "plays", "playing", "played"], correctAnswer: "play", explanation: "Se usa el verbo en infinitivo sin 's' para pronombres plurales como 'They'.", category: "Present Simple", emoji: "⚽", year: "2026", source: "Template", type: "quiz", skill: "Grammar" }],
      'dialogues.json': [{ id: "greeting_sample", eng: "", spa: "", category: "First Meeting", emoji: "💬", year: "2026", source: "Template", type: "dialogue", skill: "Conversation", dialogue: [{ speaker: "A", eng: "Hi, I am Mark.", spa: "Hola, soy Mark.", emoji: "👋" }, { speaker: "B", eng: "Nice to meet you Mark, I am Lisa.", spa: "Mucho gusto Mark, soy Lisa.", emoji: "😊" }] }],
      'reading_comprehension.json': [{ id: "read_1", eng: "", spa: "", category: "Tom's Dog", readingText: "Tom has a little golden retriever. His name is Sparky and he loves chasing red tennis balls.", emoji: "🐕", year: "2026", source: "Template", type: "reading", skill: "Reading", questions: [{ q: "What is the name of Tom's dog?", options: ["Sparky", "Max", "Rex", "Buddy"], a: "Sparky" }] }]
    };

    const data = templates[fileId as keyof typeof templates] || [];
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `plantilla_${fileId}`;
    a.click();
    URL.revokeObjectURL(url);
    onNotify(`¡Plantilla JSON para ${fileId} descargada!`);
  };

  // Get dynamic prompt text for specific type
  const getPromptForType = (fileId: string) => {
    const schemaDesc = {
      'sentences.json': `[
  {
    "eng": "English phrase",
    "spa": "Spanish translation",
    "category": "CategoryName (e.g. Introductions, School Objects, etc.)",
    "emoji": "One descriptive emoji"
  }
]`,
      'vocabulary.json': `[
  {
    "eng": "English word",
    "spa": "Spanish translation",
    "category": "CategoryName (e.g. Places, Hobbies, etc.)",
    "emoji": "One descriptive emoji"
  }
]`,
      'grammar_quizzes.json': `[
  {
    "question": "Question in English or Spanish asking to select correct option",
    "options": ["Correct option", "Wrong option 1", "Wrong option 2", "Wrong option 3"],
    "correctAnswer": "Correct option",
    "explanation": "Brief explanation in Spanish about why this is the correct answer",
    "category": "Grammar topic",
    "emoji": "One descriptive emoji"
  }
]`,
      'dialogues.json': `[
  {
    "id": "dialogue_126",
    "eng": "",
    "spa": "",
    "category": "Dialogue Topic Name",
    "emoji": "💬",
    "year": "2026",
    "source": "AI Generated",
    "type": "dialogue",
    "skill": "Conversation",
    "dialogue": [
      {
        "speaker": "A",
        "eng": "English text line",
        "spa": "Spanish translation line",
        "emoji": "One descriptive emoji"
      },
      {
        "speaker": "B",
        "eng": "English reply",
        "spa": "Spanish translation",
        "emoji": "One descriptive emoji"
      }
    ]
  }
]`,
      'reading_comprehension.json': `[
  {
    "id": "read_127",
    "eng": "",
    "spa": "",
    "category": "Reading Topic Name",
    "readingText": "Short story or informative paragraph in English (3-5 sentences)",
    "emoji": "One descriptive emoji",
    "year": "2026",
    "source": "AI Generated",
    "type": "reading",
    "skill": "Reading",
    "questions": [
      {
        "q": "English question about the text",
        "options": ["Correct answer", "Distractor 1", "Distractor 2", "Distractor 3"],
        "a": "Correct answer"
      }
    ]
  }
]`
    };

    return `Actúa como un profesor nativo de inglés experto en pedagogía. Necesito que generes nuevos contenidos de práctica para mi aplicación de inglés Lisa's Quest. 
Por favor, genera exactamente 5 nuevos elementos que sigan de manera estricta y perfecta el siguiente esquema de base de datos JSON para el archivo "${fileId}":

\`\`\`json
${schemaDesc[fileId as keyof typeof schemaDesc] || '[]'}
\`\`\`

Instrucciones pedagógicas:
- El contenido debe ser divertido, apto para niveles principiante a intermedio de inglés escolar.
- Las traducciones al español deben ser naturales, precisas y contextuales.
- El formato JSON final debe ser absolutamente válido y estar contenido en un bloque de código \`\`\`json para que pueda copiarlo y pegarlo directamente en mi base de datos sin errores de sintaxis.`;
  };

  const handleCopyPromptForType = (fileId: string) => {
    navigator.clipboard.writeText(getPromptForType(fileId));
    setTemplatePromptCopied(true);
    onNotify(`¡Prompt de ${fileId} copiado al portapapeles!`);
    setTimeout(() => setTemplatePromptCopied(false), 3000);
  };

  // Generate 5 exercises automatically via Gemini
  const handleGenerateAIExercises = async () => {
    setAiLoading(true);
    setAiGenerationError(null);
    setAiGeneratedItems(null);
    
    // Get schema structure for prompt
    const schemaDesc = {
      'sentences.json': `[
  {
    "eng": "English phrase (appropriate for level: ${aiLevel})",
    "spa": "Natural Spanish translation",
    "category": "${aiTopic || 'General'}",
    "emoji": "One descriptive emoji representing the phrase"
  }
]`,
      'vocabulary.json': `[
  {
    "eng": "English word or expression (appropriate for level: ${aiLevel})",
    "spa": "Natural Spanish translation",
    "category": "${aiTopic || 'General'}",
    "emoji": "One descriptive emoji representing the word"
  }
]`,
      'grammar_quizzes.json': `[
  {
    "question": "A fill-in-the-blank or multiple choice question in English focusing on a grammar point appropriate for level: ${aiLevel}",
    "options": ["Correct answer", "Incorrect distractor 1", "Incorrect distractor 2", "Incorrect distractor 3"],
    "correctAnswer": "Correct answer (MUST match the first item in the options array exactly)",
    "explanation": "A clear, helpful, short explanation in Spanish about the grammatical rule tested",
    "category": "${aiTopic || 'Grammar'}",
    "emoji": "One descriptive emoji"
  }
]`,
      'dialogues.json': `[
  {
    "id": "conversation_${aiTopic.toLowerCase().replace(/[^a-z0-9]/g, '_') || Date.now()}",
    category: "${aiTopic || 'Conversación Cotidiana'}",
    "dialogue": [
      {
        "speaker": "A",
        "eng": "First line of dialogue in English appropriate for level: ${aiLevel}",
        "spa": "Spanish translation",
        "emoji": "Descriptive emoji"
      },
      {
        "speaker": "B",
        "eng": "Second line / reply of dialogue in English",
        "spa": "Spanish translation",
        "emoji": "Descriptive emoji"
      },
      {
        "speaker": "A",
        "eng": "Third line of dialogue in English",
        "spa": "Spanish translation",
        "emoji": "Descriptive emoji"
      },
      {
        "speaker": "B",
        "eng": "Fourth line of dialogue in English",
        "spa": "Spanish translation",
        "emoji": "Descriptive emoji"
      }
    ]
  }
]`,
      'reading_comprehension.json': `[
  {
    "category": "${aiTopic || 'Práctica de Lectura'}",
    "readingText": "A short, engaging paragraph of reading text in English (3-5 sentences, vocabulary appropriate for level: ${aiLevel})",
    "emoji": "One descriptive emoji",
    "questions": [
      {
        "q": "Comprehension question in English about the reading text",
        "options": ["Correct answer", "Incorrect distractor 1", "Incorrect distractor 2", "Incorrect distractor 3"],
        "a": "Correct answer (MUST match the first item in the options array exactly)"
      }
    ]
  }
]`
    };

    const typeLabels = {
      'sentences.json': 'frases de práctica',
      'vocabulary.json': 'vocabulario y palabras',
      'grammar_quizzes.json': 'desafíos de quiz de gramática',
      'dialogues.json': 'conversaciones y diálogos interactivos',
      'reading_comprehension.json': 'historias de comprensión lectora'
    };

    const typeLabel = typeLabels[aiSelectedType as keyof typeof typeLabels] || 'ejercicios';
    const topicConstraint = aiTopic ? `centrados exclusivamente en el tema/vocabulario: "${aiTopic}"` : "con temas variados e interesantes cotidianos";

    const promptText = `Actúa como un profesor nativo de inglés experto en pedagogía y currículum escolar.
Necesito que generes contenido de práctica de inglés de nivel "${aiLevel}" para el archivo "${aiSelectedType}".

Por favor, genera exactamente 5 nuevos elementos pedagógicos de tipo ${typeLabel}, ${topicConstraint}, de nivel de dificultad "${aiLevel}" (adecuado para alumnos de primaria/secundaria aprendiendo inglés).

IMPORTANTE: El resultado debe ser un arreglo de JSON de exactamente 5 elementos, que siga estricta e impecablemente la siguiente estructura de esquema:
${schemaDesc[aiSelectedType as keyof typeof schemaDesc]}

REGLAS DE FORMATO CRÍTICAS:
1. Debes retornar EXCLUSIVAMENTE un bloque de datos JSON válido. Ningún texto de saludo, despedida, ni explicaciones fuera del JSON.
2. Cada campo debe completarse con contenido de alta calidad y traducciones naturales al español.
3. El formato JSON final debe poder ser analizado directamente con JSON.parse(). Asegúrate de escapar las comillas internas si fuera necesario y de no dejar comas de más.`;

    try {
      const response = await fetch('/api/gemini', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: promptText,
          systemInstruction: 'Eres un sistema de generación de datos estructurados para una app educativa de inglés. Retorna únicamente el código JSON estructurado como un arreglo sin rodeos de texto.',
          useJson: true
        })
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const resData = await response.json();
      let parsed;
      try {
        parsed = JSON.parse(resData.text);
      } catch (jsonErr) {
        // Fallback: strip markdown wrappers if present
        const cleanedText = resData.text.replace(/```json/g, '').replace(/```/g, '').trim();
        parsed = JSON.parse(cleanedText);
      }

      if (Array.isArray(parsed)) {
        setAiGeneratedItems(parsed);
      } else if (parsed && parsed.data && Array.isArray(parsed.data)) {
        setAiGeneratedItems(parsed.data);
      } else if (typeof parsed === 'object' && parsed !== null) {
        // Find any array inside the object
        const firstArray = Object.values(parsed).find(v => Array.isArray(v)) as any[];
        if (firstArray) {
          setAiGeneratedItems(firstArray);
        } else {
          setAiGeneratedItems([parsed]);
        }
      } else {
        throw new Error("El modelo no retornó un arreglo de objetos JSON.");
      }
    } catch (err: any) {
      console.error("Error al generar ejercicios con IA:", err);
      setAiGenerationError(err.message || "No se pudo obtener una respuesta estructurada de Gemini. Por favor, intenta de nuevo.");
    } finally {
      setAiLoading(false);
    }
  };

  // Filter items in structured form editor
  const filteredData = parsedData.filter((item: any) => {
    if (!searchTerm) return true;
    const term = searchTerm.toLowerCase();
    
    // Check main text fields
    const engStr = (item.eng || item.question || item.category || item.readingText || '').toLowerCase();
    const spaStr = (item.spa || item.explanation || item.category || '').toLowerCase();
    
    return engStr.includes(term) || spaStr.includes(term);
  });

  const toggleItemExpanded = (idx: number) => {
    setExpandedItems(prev => ({
      ...prev,
      [idx]: !prev[idx]
    }));
  };

  return (
    <div className="flex flex-col h-full bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 p-1 md:p-3 space-y-4 rounded-xl">
      {/* Collapsible Header Container */}
      <AnimatePresence initial={false}>
        {!dbHeaderCollapsed && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="overflow-hidden shrink-0 mb-4"
          >
            {/* DB Selection Rail */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 border-b border-slate-200 dark:border-slate-800 pb-3 shrink-0">
              <div className="flex items-center gap-2">
                <Database className="text-indigo-600 dark:text-indigo-400" size={24} />
                <div>
                  <h3 className="font-extrabold text-base md:text-lg">Editor de Contenidos</h3>
                  <p className="text-[10px] md:text-xs text-slate-500">Agrega, modifica o elimina ejercicios de la plataforma en tiempo real.</p>
                </div>
              </div>

              {/* Database selector drop down */}
              <div className="flex flex-wrap gap-2 items-center">
                <span className="text-xs font-bold text-slate-600 dark:text-slate-400">Base de Datos:</span>
                <select 
                  value={selectedFile} 
                  onChange={(e) => setSelectedFile(e.target.value)}
                  className="p-2 text-xs md:text-sm rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 font-bold focus:ring-2 focus:ring-indigo-500"
                >
                  {files.map(f => (
                    <option key={f.id} value={f.id}>{f.name}</option>
                  ))}
                </select>
                <button 
                  onClick={() => setDbHeaderCollapsed(true)} 
                  className="p-1.5 hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-500 hover:text-indigo-600 rounded-lg transition"
                  title="Ocultar Selector de Base de Datos"
                >
                  <ChevronUp size={18} />
                </button>
              </div>
            </div>

            {/* Mode Switches & Quick Tools bar */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-slate-100 dark:bg-slate-900/60 p-2.5 rounded-xl border border-slate-200/60 dark:border-slate-800 shrink-0 mt-3">
              {/* Toggle form/json */}
              <div className="flex bg-slate-200/80 dark:bg-slate-800 p-0.5 rounded-lg w-fit">
                <button 
                  onClick={() => setEditMode('form')}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-extrabold transition-all ${editMode === 'form' ? 'bg-white dark:bg-slate-900 shadow-sm text-indigo-700 dark:text-indigo-300' : 'text-slate-500'}`}
                >
                  <Edit3 size={14} /> Formulario
                </button>
                <button 
                  onClick={() => setEditMode('json')}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-extrabold transition-all ${editMode === 'json' ? 'bg-white dark:bg-slate-900 shadow-sm text-indigo-700 dark:text-indigo-300' : 'text-slate-500'}`}
                >
                  <FileJson size={14} /> Código JSON
                </button>
              </div>

              {/* Action Tools */}
              <div className="flex flex-wrap gap-2">
                <button 
                  onClick={() => {
                    setAiSelectedType(selectedFile);
                    setTemplateSelectedType(selectedFile);
                    setAiGeneratedItems(null);
                    setAiGenerationError(null);
                    setShowAiAssistant(true);
                  }}
                  className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white text-xs font-extrabold shadow-md hover:shadow-indigo-500/10 transition active:scale-95 border border-indigo-500/20 cursor-pointer"
                  title="Abrir generador inteligente con IA de Gemini o ver y descargar plantillas de todos los tipos"
                >
                  <Sparkles size={14} className="animate-pulse" /> Asistente IA y Plantillas
                </button>
                <button 
                  onClick={handleDownloadTemplate}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-indigo-50 dark:bg-indigo-950/40 text-indigo-700 dark:text-indigo-300 text-xs font-bold border border-indigo-100 dark:border-indigo-900 hover:bg-indigo-100/50 transition cursor-pointer"
                  title="Descargar una plantilla JSON para este formato"
                >
                  <Download size={14} /> Plantilla
                </button>
                <div className="flex items-center rounded-lg border border-emerald-200 dark:border-emerald-800 bg-emerald-50 dark:bg-emerald-950/40 divide-x divide-emerald-200 dark:divide-emerald-800">
                  <button 
                    onClick={handleCopyPrompt}
                    className="flex items-center gap-1.5 px-3 py-1.5 text-emerald-700 dark:text-emerald-300 text-xs font-bold hover:bg-emerald-100/50 dark:hover:bg-emerald-900/20 transition cursor-pointer"
                    title="Copiar prompt pedagógico directamente para pedirle nuevos ejercicios a Gemini o ChatGPT"
                  >
                    <Sparkles size={14} /> {promptCopied ? "¡Copiado!" : "Copiar Prompt"}
                  </button>
                  <button
                    onClick={() => {
                      setPromptEditorSource('general');
                      setEditedPromptText(getPromptForLLM());
                      setShowPromptEditorModal(true);
                    }}
                    className="flex items-center gap-1 px-2.5 py-1.5 text-emerald-700 dark:text-emerald-300 text-xs font-bold hover:bg-emerald-100/50 dark:hover:bg-emerald-900/20 transition cursor-pointer"
                    title="Visualizar y Editar Prompt antes de copiarlo"
                  >
                    <Edit3 size={14} /> Ver/Editar
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Button to expand DB header when collapsed */}
      {dbHeaderCollapsed && (
        <div className="flex justify-center shrink-0">
          <button 
            onClick={() => setDbHeaderCollapsed(false)}
            className="flex items-center gap-1.5 px-4 py-1.5 bg-slate-150 dark:bg-slate-900 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-800 font-extrabold text-xs rounded-full border border-slate-300 dark:border-slate-800 shadow-sm transition-all active:scale-95"
          >
            <ChevronDown size={14} /> Mostrar Selector y Herramientas de Base de Datos
          </button>
        </div>
      )}

      {/* Main workspace container */}
      <div className="flex-1 min-h-0 flex flex-col relative">
        {loading ? (
          <div className="absolute inset-0 bg-slate-50/80 dark:bg-slate-950/80 z-10 flex flex-col items-center justify-center gap-3">
            <RefreshCw size={36} className="animate-spin text-indigo-600" />
            <p className="text-sm font-bold text-slate-500">Cargando datos de archivo...</p>
          </div>
        ) : null}

        {/* Code JSON Mode */}
        {editMode === 'json' && (
          <div className="flex-1 flex flex-col min-h-0 space-y-2">
            <div className="flex items-center justify-between text-xs font-semibold px-1">
              <span className="text-slate-500">Edita directamente la estructura JSON:</span>
              {jsonError ? (
                <span className="text-red-500 flex items-center gap-1 font-bold">
                  <AlertTriangle size={12} /> JSON Inválido: {jsonError.slice(0, 40)}...
                </span>
              ) : (
                <span className="text-emerald-500 flex items-center gap-1 font-bold">
                  <Check size={12} /> JSON Válido
                </span>
              )}
            </div>
            
            <textarea
              value={jsonString}
              onChange={(e) => handleJsonStringChange(e.target.value)}
              onScroll={handleEditorScroll}
              className="flex-1 w-full p-3 font-mono text-xs rounded-xl bg-slate-900 text-slate-100 border border-slate-800 focus:ring-2 focus:ring-indigo-500 resize-none overflow-y-auto"
              placeholder="[{ ... }]"
              spellCheck={false}
            />
          </div>
        )}

        {/* Structured Form Mode */}
        {editMode === 'form' && (
          <div className="flex-1 flex flex-col min-h-0 space-y-3">
            {/* Search and Add tool */}
            <div className="flex items-center gap-2 shrink-0">
              <div className="relative flex-1">
                <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input 
                  type="text"
                  placeholder="Buscar ejercicios..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-9 pr-4 py-2 text-xs md:text-sm rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <button
                onClick={handleAddItem}
                className="flex items-center justify-center gap-1.5 px-4 py-2.5 bg-indigo-600 hover:bg-indigo-700 active:scale-95 text-white rounded-xl text-xs font-extrabold shadow-md transition-all shrink-0 cursor-pointer"
              >
                <Plus size={14} /> Nuevo
              </button>
            </div>

            {/* List with scroll */}
            <div onScroll={handleEditorScroll} className="flex-1 overflow-y-auto pr-1 space-y-2 min-h-0">
              {filteredData.length === 0 ? (
                <div className="text-center p-8 border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-2xl">
                  <FileText className="mx-auto text-slate-300 dark:text-slate-700 mb-2" size={32} />
                  <p className="text-sm font-bold text-slate-500">No se encontraron elementos</p>
                  <p className="text-xs text-slate-400">Intenta buscar otra palabra o agrega uno nuevo.</p>
                </div>
              ) : (
                filteredData.map((item: any, idx: number) => {
                  const realIndex = parsedData.indexOf(item);
                  
                  return (
                    <div 
                      key={idx} 
                      onClick={() => handleOpenEditModal(realIndex)}
                      className="bg-white dark:bg-slate-900/60 rounded-xl border border-slate-200/80 dark:border-slate-800 shadow-sm overflow-hidden hover:border-indigo-300 dark:hover:border-slate-750 hover:shadow transition-all duration-200 cursor-pointer flex items-center justify-between p-3"
                    >
                      <div className="flex items-center gap-2.5 min-w-0 flex-1">
                        <span className="text-lg shrink-0">{item.emoji || '✨'}</span>
                        <div className="min-w-0 flex-1">
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className="px-1.5 py-0.5 rounded text-[8px] font-extrabold uppercase bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 border border-indigo-100 dark:border-indigo-900">
                              {item.category || item.category || "General"}
                            </span>
                            {selectedFile === 'dialogues.json' && item.dialogue && (
                              <span className="px-1.5 py-0.5 rounded text-[8px] font-extrabold uppercase bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 border border-emerald-100 dark:border-emerald-900">
                                {item.dialogue.length} líneas
                              </span>
                            )}
                            {selectedFile === 'reading_comprehension.json' && item.questions && (
                              <span className="px-1.5 py-0.5 rounded text-[8px] font-extrabold uppercase bg-amber-50 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400 border border-amber-100 dark:border-amber-900">
                                {item.questions.length} preguntas
                              </span>
                            )}
                          </div>
                          <p className="text-xs md:text-sm font-extrabold truncate mt-1 text-indigo-950 dark:text-indigo-100">
                            {item.eng || item.question || item.category || item.readingText || '(Sin título)'}
                          </p>
                          {(item.spa || item.correctAnswer) && (
                            <p className="text-[11px] text-slate-500 dark:text-slate-400 truncate mt-0.5 font-medium">
                              {item.spa || `Correcta: ${item.correctAnswer}`}
                            </p>
                          )}
                        </div>
                      </div>

                      <div className="flex items-center gap-1 shrink-0 ml-2" onClick={(e) => e.stopPropagation()}>
                        <button 
                          onClick={() => handleOpenEditModal(realIndex)}
                          className="p-2 hover:bg-indigo-50 hover:text-indigo-600 dark:hover:bg-slate-800 text-slate-400 rounded-lg transition-colors cursor-pointer"
                          title="Editar elemento"
                        >
                          <Edit3 size={14} />
                        </button>
                        <button 
                          onClick={() => handleDeleteItem(realIndex)}
                          className="p-2 hover:bg-red-50 hover:text-red-600 dark:hover:bg-slate-800 text-slate-400 rounded-lg transition-colors cursor-pointer"
                          title="Eliminar elemento"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>
        )}
      </div>

      {/* Persistent Save Button footer */}
      <div className="pt-2 border-t border-slate-200 dark:border-slate-850 flex items-center justify-between bg-slate-50 dark:bg-slate-950 shrink-0">
        <span className="text-[10px] md:text-xs text-slate-500 font-medium">
          Elementos totales: <b className="text-slate-700 dark:text-slate-300">{parsedData.length}</b> {filteredData.length !== parsedData.length && `(Filtrados: ${filteredData.length})`}
        </span>

        <button
          onClick={handleSave}
          disabled={saving}
          className="flex items-center gap-2 px-6 py-3 bg-indigo-600 hover:bg-indigo-700 disabled:bg-slate-400 text-white rounded-xl text-xs md:text-sm font-extrabold shadow-lg hover:shadow-indigo-500/20 active:scale-95 transition-all cursor-pointer"
        >
          {saving ? (
            <>
              <RefreshCw className="animate-spin" size={16} /> Guardando...
            </>
          ) : (
            <>
              <Save size={16} /> Guardar Base de Datos
            </>
          )}
        </button>
      </div>

      {/* Floating Window Modal Editor */}
      <AnimatePresence>
        {editingItem !== null && (() => {
          const detectedType = detectExerciseType(editingItem);
          return (
            <motion.div
              key="edit-modal-wrapper"
              className="fixed inset-0 z-[2000] flex items-center justify-center p-2 md:p-4"
            >
              <motion.div
                key="edit-modal-backdrop"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => { setEditingItem(null); setEditingItemIndex(null); }}
                className="absolute inset-0 bg-slate-950/60 backdrop-blur-sm"
              />
              <motion.div
                key="edit-modal-content"
                initial={{ opacity: 0, scale: 0.95, y: 15 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 15 }}
                transition={{ type: "spring", duration: 0.4 }}
                className="bg-white dark:bg-slate-900 rounded-2xl w-full max-w-2xl max-h-[90vh] flex flex-col shadow-2xl overflow-hidden border border-slate-200 dark:border-slate-800 relative z-10"
              >
                {/* Modal Header */}
                <div className="px-5 py-4 border-b border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 flex items-center justify-between shrink-0">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl p-1.5 bg-indigo-50 dark:bg-indigo-950/50 rounded-xl">{editingItem.emoji || '📝'}</span>
                    <div>
                      <h4 className="font-extrabold text-sm md:text-base text-slate-900 dark:text-slate-100">
                        {editingItemIndex === -1 ? 'Crear Nuevo Ejercicio' : 'Editar Ejercicio'}
                      </h4>
                      <p className="text-[10px] md:text-xs text-slate-500 font-medium flex items-center gap-1.5 mt-0.5">
                        <span>Estructura:</span>
                        <span className="px-1.5 py-0.5 rounded-full text-[9px] font-bold bg-indigo-50 dark:bg-indigo-900 text-indigo-700 dark:text-indigo-300 border border-indigo-200">
                          {detectedType === 'sentences.json' ? '💬 Frases de Práctica' :
                           detectedType === 'vocabulary.json' ? '📚 Vocabulario' :
                           detectedType === 'grammar_quizzes.json' ? '📝 Desafío de Gramática' :
                           detectedType === 'dialogues.json' ? '🗣️ Diálogos y Conversaciones' :
                           '📖 Lectura de Comprensión'}
                        </span>
                      </p>
                    </div>
                  </div>
              <button 
                onClick={() => { setEditingItem(null); setEditingItemIndex(null); }} 
                className="p-1.5 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 hover:text-slate-600 dark:text-slate-500 dark:hover:text-slate-300 rounded-lg transition cursor-pointer"
                title="Cerrar ventana"
              >
                <span className="text-base font-extrabold">✕</span>
              </button>
            </div>

            {/* Modal Body */}
            <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-4">
              {/* Common Fields: sentences & vocabulary */}
              {(detectedType === 'sentences.json' || detectedType === 'vocabulary.json') && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-[10px] uppercase font-extrabold text-indigo-600 dark:text-indigo-400 mb-1">Frase o Vocablo en Inglés</label>
                    <input 
                      type="text"
                      value={editingItem.eng || ''}
                      onChange={(e) => handleUpdateEditingItemField('eng', e.target.value)}
                      className="w-full p-2.5 bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl text-xs md:text-sm font-bold text-indigo-950 dark:text-indigo-50 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                      placeholder="Ej: Good morning, how are you?"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] uppercase font-extrabold text-indigo-600 dark:text-indigo-400 mb-1">Traducción al Español</label>
                    <input 
                      type="text"
                      value={editingItem.spa || ''}
                      onChange={(e) => handleUpdateEditingItemField('spa', e.target.value)}
                      className="w-full p-2.5 bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl text-xs md:text-sm font-bold text-slate-800 dark:text-slate-100 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                      placeholder="Ej: Buenos días, ¿cómo estás?"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[10px] uppercase font-extrabold text-indigo-600 dark:text-indigo-400 mb-1">Categoría</label>
                      <input 
                        type="text"
                        value={editingItem.category || ''}
                        onChange={(e) => handleUpdateEditingItemField('category', e.target.value)}
                        className="w-full p-2.5 bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl text-xs md:text-sm font-semibold focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                        placeholder="Ej: Saludos"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] uppercase font-extrabold text-indigo-600 dark:text-indigo-400 mb-1">Emoji Ilustrativo</label>
                      <input 
                        type="text"
                        value={editingItem.emoji || ''}
                        onChange={(e) => handleUpdateEditingItemField('emoji', e.target.value)}
                        className="w-full p-2.5 bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl text-xs md:text-sm font-semibold focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                        placeholder="Ej: 👋"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Grammar Quizzes */}
              {detectedType === 'grammar_quizzes.json' && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-[10px] uppercase font-extrabold text-indigo-600 dark:text-indigo-400 mb-1">Pregunta del Quiz (Question)</label>
                    <input 
                      type="text"
                      value={editingItem.question || ''}
                      onChange={(e) => handleUpdateEditingItemField('question', e.target.value)}
                      className="w-full p-2.5 bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl text-xs md:text-sm font-bold text-indigo-950 dark:text-indigo-50 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                      placeholder="Ej: I _____ a teacher."
                    />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[10px] uppercase font-extrabold text-indigo-600 dark:text-indigo-400 mb-1">Opción Correcta (Opción 1)</label>
                      <input 
                        type="text"
                        value={editingItem.correctAnswer || ''}
                        onChange={(e) => {
                          const val = e.target.value;
                          setEditingItem((prev: any) => {
                            const opts = [...(prev.options || [])];
                            opts[0] = val;
                            return { ...prev, correctAnswer: val, options: opts };
                          });
                        }}
                        className="w-full p-2.5 bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-850 rounded-xl text-xs md:text-sm font-extrabold text-emerald-700 dark:text-emerald-450 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                        placeholder="Respuesta correcta"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] uppercase font-extrabold text-indigo-600 dark:text-indigo-400 mb-1">Opción Incorrecta 1</label>
                      <input 
                        type="text"
                        value={editingItem.options?.[1] || ''}
                        onChange={(e) => {
                          const val = e.target.value;
                          setEditingItem((prev: any) => {
                            const opts = [...(prev.options || [])];
                            opts[1] = val;
                            return { ...prev, options: opts };
                          });
                        }}
                        className="w-full p-2.5 bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl text-xs md:text-sm font-semibold focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                        placeholder="Distractor 1"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] uppercase font-extrabold text-indigo-600 dark:text-indigo-400 mb-1">Opción Incorrecta 2</label>
                      <input 
                        type="text"
                        value={editingItem.options?.[2] || ''}
                        onChange={(e) => {
                          const val = e.target.value;
                          setEditingItem((prev: any) => {
                            const opts = [...(prev.options || [])];
                            opts[2] = val;
                            return { ...prev, options: opts };
                          });
                        }}
                        className="w-full p-2.5 bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl text-xs md:text-sm font-semibold focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                        placeholder="Distractor 2"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] uppercase font-extrabold text-indigo-600 dark:text-indigo-400 mb-1">Opción Incorrecta 3</label>
                      <input 
                        type="text"
                        value={editingItem.options?.[3] || ''}
                        onChange={(e) => {
                          const val = e.target.value;
                          setEditingItem((prev: any) => {
                            const opts = [...(prev.options || [])];
                            opts[3] = val;
                            return { ...prev, options: opts };
                          });
                        }}
                        className="w-full p-2.5 bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl text-xs md:text-sm font-semibold focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                        placeholder="Distractor 3"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-[10px] uppercase font-extrabold text-indigo-600 dark:text-indigo-400 mb-1">Explicación del Acertijo</label>
                    <textarea 
                      value={editingItem.explanation || ''}
                      onChange={(e) => handleUpdateEditingItemField('explanation', e.target.value)}
                      className="w-full p-2.5 bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl text-xs md:text-sm h-20 resize-none font-medium leading-normal focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                      placeholder="Describe por qué es correcta o explica la regla gramatical..."
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[10px] uppercase font-extrabold text-indigo-600 dark:text-indigo-400 mb-1">Tema / Categoría</label>
                      <input 
                        type="text"
                        value={editingItem.category || ''}
                        onChange={(e) => handleUpdateEditingItemField('category', e.target.value)}
                        className="w-full p-2.5 bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl text-xs md:text-sm font-semibold focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                        placeholder="Ej: Verbo To Be"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] uppercase font-extrabold text-indigo-600 dark:text-indigo-400 mb-1">Emoji Ilustrativo</label>
                      <input 
                        type="text"
                        value={editingItem.emoji || ''}
                        onChange={(e) => handleUpdateEditingItemField('emoji', e.target.value)}
                        className="w-full p-2.5 bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl text-xs md:text-sm font-semibold focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                        placeholder="Ej: 📝"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Dialogues */}
              {detectedType === 'dialogues.json' && (
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[10px] uppercase font-extrabold text-indigo-600 dark:text-indigo-400 mb-1">ID Único</label>
                      <input 
                        type="text"
                        value={editingItem.id || ''}
                        onChange={(e) => handleUpdateEditingItemField('id', e.target.value)}
                        className="w-full p-2.5 bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl text-xs md:text-sm font-mono focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                        placeholder="Ej: dialogue_hotel_checkin"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] uppercase font-extrabold text-indigo-600 dark:text-indigo-400 mb-1">Tema del Diálogo</label>
                      <input 
                        type="text"
                        value={editingItem.category || ''}
                        onChange={(e) => handleUpdateEditingItemField('category', e.target.value)}
                        className="w-full p-2.5 bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl text-xs md:text-sm font-bold text-indigo-950 dark:text-indigo-50 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                        placeholder="Ej: Registrarse en el Hotel"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <label className="text-[10px] uppercase font-extrabold text-indigo-600 dark:text-indigo-400">Mensajes de Conversación</label>
                      <button
                        onClick={() => {
                          const dialogueLines = [...(editingItem.dialogue || [])];
                          dialogueLines.push({ speaker: "A", eng: "", spa: "", emoji: "💬" });
                          handleUpdateEditingItemField('dialogue', dialogueLines);
                        }}
                        className="px-2.5 py-1 text-[10px] font-bold text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/50 hover:bg-indigo-100 rounded-lg transition"
                      >
                        + Agregar Mensaje
                      </button>
                    </div>
                    
                    <div className="space-y-3 max-h-60 overflow-y-auto p-2 border border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/40 rounded-xl">
                      {(editingItem.dialogue || []).length === 0 ? (
                        <p className="text-center p-4 text-xs font-semibold text-slate-400">No hay diálogos en este ejercicio.</p>
                      ) : (
                        (editingItem.dialogue || []).map((line: any, lIdx: number) => (
                          <div key={lIdx} className="bg-white dark:bg-slate-900 p-2.5 rounded-lg border border-slate-150 dark:border-slate-800 shadow-sm flex gap-2 items-start relative">
                            <select 
                              value={line.speaker || 'A'} 
                              onChange={(e) => {
                                const dialogueLines = [...editingItem.dialogue];
                                dialogueLines[lIdx] = { ...line, speaker: e.target.value };
                                handleUpdateEditingItemField('dialogue', dialogueLines);
                              }}
                              className="p-1.5 text-[10px] font-extrabold rounded-md bg-slate-100 dark:bg-slate-800 border-none text-slate-700 dark:text-slate-300 focus:ring-2 focus:ring-indigo-500"
                            >
                              <option value="A">Hab. A</option>
                              <option value="B">Hab. B</option>
                              <option value="Narrator">Narrador</option>
                            </select>
                            
                            <div className="flex-1 space-y-1.5">
                              <input 
                                type="text" 
                                value={line.eng || ''} 
                                onChange={(e) => {
                                  const dialogueLines = [...editingItem.dialogue];
                                  dialogueLines[lIdx] = { ...line, eng: e.target.value };
                                  handleUpdateEditingItemField('dialogue', dialogueLines);
                                }}
                                placeholder="Frase en Inglés" 
                                className="w-full p-1.5 border border-slate-200 dark:border-slate-800 rounded-lg text-xs font-semibold" 
                              />
                              <input 
                                type="text" 
                                value={line.spa || ''} 
                                onChange={(e) => {
                                  const dialogueLines = [...editingItem.dialogue];
                                  dialogueLines[lIdx] = { ...line, spa: e.target.value };
                                  handleUpdateEditingItemField('dialogue', dialogueLines);
                                }}
                                placeholder="Traducción al Español" 
                                className="w-full p-1.5 border border-slate-200 dark:border-slate-800 rounded-lg text-xs" 
                              />
                            </div>

                            <div className="flex flex-col gap-1.5 shrink-0 items-center">
                              <input 
                                type="text" 
                                value={line.emoji || ''} 
                                onChange={(e) => {
                                  const dialogueLines = [...editingItem.dialogue];
                                  dialogueLines[lIdx] = { ...line, emoji: e.target.value };
                                  handleUpdateEditingItemField('dialogue', dialogueLines);
                                }}
                                placeholder="Emoji" 
                                className="w-8 p-1 text-[11px] text-center border border-slate-200 dark:border-slate-800 rounded" 
                              />
                              <button 
                                onClick={() => {
                                  const dialogueLines = editingItem.dialogue.filter((_: any, i: number) => i !== lIdx);
                                  handleUpdateEditingItemField('dialogue', dialogueLines);
                                }}
                                className="p-1 hover:bg-red-50 hover:text-red-500 text-slate-400 rounded transition"
                                title="Eliminar mensaje"
                              >
                                <Trash2 size={12} />
                              </button>
                            </div>
                          </div>
                        ))
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* Reading Comprehension */}
              {detectedType === 'reading_comprehension.json' && (
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[10px] uppercase font-extrabold text-indigo-600 dark:text-indigo-400 mb-1">Categoría / Tema de Lectura</label>
                      <input 
                        type="text"
                        value={editingItem.category || ''}
                        onChange={(e) => handleUpdateEditingItemField('category', e.target.value)}
                        className="w-full p-2.5 bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl text-xs md:text-sm font-bold text-indigo-950 dark:text-indigo-50 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                        placeholder="Ej: Science & Nature"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] uppercase font-extrabold text-indigo-600 dark:text-indigo-400 mb-1">Emoji Ilustrativo</label>
                      <input 
                        type="text"
                        value={editingItem.emoji || ''}
                        onChange={(e) => handleUpdateEditingItemField('emoji', e.target.value)}
                        className="w-full p-2.5 bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl text-xs md:text-sm font-semibold focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                        placeholder="Ej: 🌋"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-[10px] uppercase font-extrabold text-indigo-600 dark:text-indigo-400 mb-1">Texto de Lectura en Inglés</label>
                    <textarea 
                      value={editingItem.readingText || ''}
                      onChange={(e) => handleUpdateEditingItemField('readingText', e.target.value)}
                      className="w-full p-3 bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl text-xs md:text-sm h-28 resize-none font-medium leading-relaxed focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                      placeholder="Escribe el artículo o historia para que el alumno lea..."
                    />
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <label className="text-[10px] uppercase font-extrabold text-indigo-600 dark:text-indigo-400">Preguntas de Comprensión</label>
                      <button
                        onClick={() => {
                          const qs = [...(editingItem.questions || [])];
                          qs.push({ q: "", options: ["", "", ""], a: "" });
                          handleUpdateEditingItemField('questions', qs);
                        }}
                        className="px-2.5 py-1 text-[10px] font-bold text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/50 hover:bg-indigo-100 rounded-lg transition"
                      >
                        + Agregar Pregunta
                      </button>
                    </div>

                    <div className="space-y-4 max-h-60 overflow-y-auto p-2 border border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/40 rounded-xl">
                      {(editingItem.questions || []).length === 0 ? (
                        <p className="text-center p-4 text-xs font-semibold text-slate-400">No hay preguntas de comprensión aún.</p>
                      ) : (
                        (editingItem.questions || []).map((qObj: any, qIdx: number) => (
                          <div key={qIdx} className="bg-white dark:bg-slate-900 p-3 rounded-lg border border-slate-150 dark:border-slate-800 shadow-sm space-y-2.5 relative pr-8">
                            <button 
                              onClick={() => {
                                const qs = editingItem.questions.filter((_: any, i: number) => i !== qIdx);
                                handleUpdateEditingItemField('questions', qs);
                              }}
                              className="absolute right-2 top-2 p-1 text-slate-400 hover:text-red-500 rounded transition"
                              title="Eliminar pregunta"
                            >
                              <Trash2 size={14} />
                            </button>
                            
                            <div>
                              <label className="text-[9px] uppercase font-bold text-slate-500">Pregunta {qIdx + 1}</label>
                              <input 
                                type="text" 
                                value={qObj.q || ''} 
                                onChange={(e) => {
                                  const qs = [...editingItem.questions];
                                  qs[qIdx] = { ...qObj, q: e.target.value };
                                  handleUpdateEditingItemField('questions', qs);
                                }}
                                placeholder="Escribe la pregunta" 
                                className="w-full p-2 border border-slate-200 dark:border-slate-800 rounded-lg text-xs font-bold" 
                              />
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                              <div>
                                <label className="text-[8px] uppercase text-emerald-600 font-bold">Opción Correcta (Opción 1)</label>
                                <input 
                                  type="text" 
                                  value={qObj.a || ''} 
                                  onChange={(e) => {
                                    const val = e.target.value;
                                    const qs = [...editingItem.questions];
                                    const updatedQ = { ...qObj, a: val };
                                    const opts = [...(qObj.options || [])];
                                    opts[0] = val;
                                    updatedQ.options = opts;
                                    qs[qIdx] = updatedQ;
                                    handleUpdateEditingItemField('questions', qs);
                                  }}
                                  placeholder="Respuesta correcta" 
                                  className="w-full p-1.5 border-2 border-emerald-350 dark:border-emerald-950 rounded-lg text-xs font-bold text-emerald-700 dark:text-emerald-400" 
                                />
                              </div>
                              <div>
                                <label className="text-[8px] uppercase text-slate-500 font-bold">Opción Incorrecta 1 (Opción 2)</label>
                                <input 
                                  type="text" 
                                  value={qObj.options?.[1] || ''} 
                                  onChange={(e) => {
                                    const qs = [...editingItem.questions];
                                    const opts = [...(qObj.options || [])];
                                    opts[1] = e.target.value;
                                    qs[qIdx] = { ...qObj, options: opts };
                                    handleUpdateEditingItemField('questions', qs);
                                  }}
                                  placeholder="Incorrecta" 
                                  className="w-full p-1.5 border border-slate-200 dark:border-slate-800 rounded-lg text-xs" 
                                />
                              </div>
                              <div>
                                <label className="text-[8px] uppercase text-slate-500 font-bold">Opción Incorrecta 2 (Opción 3)</label>
                                <input 
                                  type="text" 
                                  value={qObj.options?.[2] || ''} 
                                  onChange={(e) => {
                                    const qs = [...editingItem.questions];
                                    const opts = [...(qObj.options || [])];
                                    opts[2] = e.target.value;
                                    qs[qIdx] = { ...qObj, options: opts };
                                    handleUpdateEditingItemField('questions', qs);
                                  }}
                                  placeholder="Incorrecta" 
                                  className="w-full p-1.5 border border-slate-200 dark:border-slate-800 rounded-lg text-xs" 
                                />
                              </div>
                              <div>
                                <label className="text-[8px] uppercase text-slate-500 font-bold">Opción Incorrecta 3 (Opción 4)</label>
                                <input 
                                  type="text" 
                                  value={qObj.options?.[3] || ''} 
                                  onChange={(e) => {
                                    const qs = [...editingItem.questions];
                                    const opts = [...(qObj.options || [])];
                                    opts[3] = e.target.value;
                                    qs[qIdx] = { ...qObj, options: opts };
                                    handleUpdateEditingItemField('questions', qs);
                                  }}
                                  placeholder="Incorrecta" 
                                  className="w-full p-1.5 border border-slate-200 dark:border-slate-800 rounded-lg text-xs" 
                                />
                              </div>
                            </div>
                          </div>
                        ))
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="px-5 py-3 border-t border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 flex justify-end gap-3 shrink-0">
              <button 
                onClick={() => { setEditingItem(null); setEditingItemIndex(null); }}
                className="px-4 py-2 bg-slate-200 hover:bg-slate-300 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 font-bold rounded-xl text-xs transition cursor-pointer"
              >
                Cancelar
              </button>
              <button 
                onClick={() => {
                  if (editingItemIndex === -1) {
                    const updated = [editingItem, ...parsedData];
                    updateJsonFromParsed(updated);
                    onNotify("¡Nuevo elemento agregado localmente! Recuerda presionar 'Guardar Base de Datos' para persistir.");
                  } else if (editingItemIndex !== null) {
                    const updated = [...parsedData];
                    updated[editingItemIndex] = editingItem;
                    updateJsonFromParsed(updated);
                    onNotify("¡Elemento modificado localmente! Recuerda presionar 'Guardar Base de Datos' para persistir.");
                  }
                  setEditingItem(null);
                  setEditingItemIndex(null);
                }}
                className="px-5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold rounded-xl text-xs shadow-md active:scale-95 transition cursor-pointer"
              >
                Aplicar Cambios
              </button>
            </div>
          </motion.div>
        </motion.div>
          );
        })()}
      </AnimatePresence>

      {/* Floating AI Assistant & Template Manager Modal */}
      {showAiAssistant && (
        <div className="fixed inset-0 bg-slate-950/70 backdrop-blur-sm z-[2000] flex items-center justify-center p-2 md:p-4">
          <div className="bg-white dark:bg-slate-900 rounded-3xl w-full max-w-4xl max-h-[92vh] flex flex-col shadow-2xl overflow-hidden border border-slate-200 dark:border-slate-850 animate-slide-up">
            {/* Modal Header */}
            <div className="px-6 py-4 bg-gradient-to-r from-purple-900 to-indigo-900 text-white flex items-center justify-between shrink-0">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-white/10 rounded-xl">
                  <Sparkles size={24} className="text-yellow-300 animate-pulse" />
                </div>
                <div>
                  <h4 className="font-extrabold text-base md:text-lg">Asistente de IA y Plantillas</h4>
                  <p className="text-[10px] md:text-xs text-indigo-200">
                    Genera ejercicios de todos los tipos automáticamente con Gemini o administra plantillas estructuradas.
                  </p>
                </div>
              </div>
              <button 
                onClick={() => setShowAiAssistant(false)} 
                className="p-1.5 hover:bg-white/10 text-indigo-200 hover:text-white rounded-lg transition cursor-pointer"
                title="Cerrar asistente"
              >
                <span className="text-base font-extrabold">✕</span>
              </button>
            </div>

            {/* Tab Toggles */}
            <div className="flex border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 shrink-0">
              <button
                onClick={() => setAiAssistantTab('generate')}
                className={`flex-1 py-3 px-4 font-extrabold text-xs md:text-sm border-b-2 transition-all flex items-center justify-center gap-2 ${aiAssistantTab === 'generate' ? 'border-purple-600 text-purple-700 dark:text-purple-400 bg-white dark:bg-slate-900' : 'border-transparent text-slate-500 hover:text-slate-700 hover:bg-slate-100/50'}`}
              >
                ✨ Generar con IA (Gemini)
              </button>
              <button
                onClick={() => setAiAssistantTab('templates')}
                className={`flex-1 py-3 px-4 font-extrabold text-xs md:text-sm border-b-2 transition-all flex items-center justify-center gap-2 ${aiAssistantTab === 'templates' ? 'border-purple-600 text-purple-700 dark:text-purple-400 bg-white dark:bg-slate-900' : 'border-transparent text-slate-500 hover:text-slate-700 hover:bg-slate-100/50'}`}
              >
                📋 Guía de Plantillas y Prompts por Tipo
              </button>
            </div>

            {/* Modal Scrollable Body */}
            <div className="flex-1 overflow-y-auto p-4 md:p-6 bg-slate-50/50 dark:bg-slate-950/20 min-h-0">
              
              {/* Tab 1: AI Generation */}
              {aiAssistantTab === 'generate' && (
                <div className="space-y-6">
                  {/* Generation Controls */}
                  <div className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-sm grid grid-cols-1 md:grid-cols-3 gap-4">
                    {/* Select Type */}
                    <div>
                      <label className="block text-[10px] uppercase font-extrabold text-purple-600 dark:text-purple-400 mb-1">Tipo de Ejercicio</label>
                      <select 
                        value={aiSelectedType}
                        onChange={(e) => {
                          setAiSelectedType(e.target.value);
                          setAiGeneratedItems(null);
                        }}
                        className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-750 bg-slate-50/50 dark:bg-slate-950 text-xs md:text-sm font-bold focus:ring-2 focus:ring-purple-500"
                      >
                        <option value="sentences.json">💬 Frases de Práctica (Sentences)</option>
                        <option value="vocabulary.json">📚 Vocabulario (Vocabulary)</option>
                        <option value="grammar_quizzes.json">📝 Quizzes de Gramática (Grammar)</option>
                        <option value="dialogues.json">🗣️ Diálogos y Conversaciones (Dialogues)</option>
                        <option value="reading_comprehension.json">📖 Comprensión Lectora (Reading)</option>
                      </select>
                    </div>

                    {/* Topic Input */}
                    <div>
                      <label className="block text-[10px] uppercase font-extrabold text-purple-600 dark:text-purple-400 mb-1">Tema / Vocabulario Clave (Opcional)</label>
                      <input 
                        type="text"
                        value={aiTopic}
                        onChange={(e) => setAiTopic(e.target.value)}
                        placeholder="Ej: En el aeropuerto, Present Simple, Hobbies"
                        className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-750 bg-slate-50/50 dark:bg-slate-950 text-xs md:text-sm font-semibold focus:ring-2 focus:ring-purple-500"
                      />
                    </div>

                    {/* Level Select & Button */}
                    <div>
                      <label className="block text-[10px] uppercase font-extrabold text-purple-600 dark:text-purple-400 mb-1">Nivel de Dificultad</label>
                      <div className="flex gap-2">
                        <select 
                          value={aiLevel}
                          onChange={(e) => setAiLevel(e.target.value)}
                          className="flex-1 p-2.5 rounded-xl border border-slate-200 dark:border-slate-750 bg-slate-50/50 dark:bg-slate-950 text-xs md:text-sm font-bold focus:ring-2 focus:ring-purple-500"
                        >
                          <option value="Principiante">Principiante (A1-A2)</option>
                          <option value="Intermedio">Intermedio (B1-B2)</option>
                          <option value="Avanzado">Avanzado (C1)</option>
                        </select>
                        <button
                          onClick={handleGenerateAIExercises}
                          disabled={aiLoading}
                          className="px-4 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white rounded-xl text-xs font-extrabold shadow active:scale-95 disabled:bg-slate-400 transition flex items-center gap-1.5 shrink-0 cursor-pointer"
                        >
                          {aiLoading ? <RefreshCw className="animate-spin" size={14} /> : <Sparkles size={14} />}
                          {aiLoading ? 'Generando...' : 'Generar (5)'}
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Error Display */}
                  {aiGenerationError && (
                    <div className="p-4 bg-red-50 dark:bg-red-950/20 text-red-600 dark:text-red-400 rounded-2xl border border-red-100 dark:border-red-900 flex items-start gap-3 text-xs">
                      <AlertTriangle size={18} className="shrink-0 mt-0.5" />
                      <div>
                        <p className="font-extrabold mb-1">Error al Generar con IA</p>
                        <p className="font-medium">{aiGenerationError}</p>
                      </div>
                    </div>
                  )}

                  {/* Loading State Animation */}
                  {aiLoading && (
                    <div className="py-12 flex flex-col items-center justify-center gap-4 text-center">
                      <div className="relative">
                        <div className="w-16 h-16 border-4 border-purple-200 border-t-purple-600 rounded-full animate-spin"></div>
                        <Sparkles size={24} className="absolute inset-0 m-auto text-purple-600 animate-pulse" />
                      </div>
                      <div>
                        <h5 className="font-extrabold text-sm text-slate-800 dark:text-slate-200">Gemini está creando los mejores ejercicios...</h5>
                        <p className="text-xs text-slate-500 mt-1 max-w-md">Diseñando contenido pedagógico adaptado a nivel {aiLevel} {aiTopic ? `para el tema "${aiTopic}"` : ''}...</p>
                      </div>
                    </div>
                  )}

                  {/* Idle/Welcome State */}
                  {!aiGeneratedItems && !aiLoading && !aiGenerationError && (
                    <div className="py-12 text-center border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-3xl bg-white dark:bg-slate-900 p-8">
                      <Sparkles className="mx-auto text-purple-300 dark:text-purple-700 mb-3 animate-bounce" size={40} />
                      <h5 className="font-extrabold text-slate-800 dark:text-slate-200 text-base">Generador Escolar de Contenidos por IA</h5>
                      <p className="text-xs text-slate-500 max-w-lg mx-auto mt-2 leading-relaxed">
                        Selecciona el tipo de ejercicio que deseas añadir, define un tema o área de gramática opcional y haz clic en <b>Generar</b>. Gemini creará 5 ejercicios perfectamente estructurados y validados de acuerdo al JSON correspondiente.
                      </p>
                    </div>
                  )}

                  {/* Output Preview */}
                  {aiGeneratedItems && !aiLoading && (
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <h5 className="text-xs font-extrabold uppercase text-purple-600 dark:text-purple-400 tracking-wider">
                          Vista Previa de Ejercicios Generados por IA
                        </h5>
                        <span className="text-[10px] font-bold bg-purple-100 dark:bg-purple-950/50 text-purple-700 dark:text-purple-300 px-2 py-1 rounded-full">
                          5 elementos listos
                        </span>
                      </div>

                      {/* Preview List */}
                      <div className="space-y-3 max-h-[350px] overflow-y-auto pr-1">
                        {aiGeneratedItems.map((item, idx) => (
                          <div key={idx} className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-4 rounded-2xl flex items-start gap-3 shadow-sm hover:border-purple-300 transition-colors">
                            <span className="text-xl p-1.5 bg-slate-50 dark:bg-slate-950 rounded-xl shrink-0">{item.emoji || '✨'}</span>
                            <div className="flex-1 min-w-0 text-xs">
                              {/* Sentences / Vocabulary */}
                              {(aiSelectedType === 'sentences.json' || aiSelectedType === 'vocabulary.json') && (
                                <div className="space-y-1">
                                  <p className="font-extrabold text-indigo-950 dark:text-indigo-200 text-sm">{item.eng}</p>
                                  <p className="font-medium text-slate-600 dark:text-slate-400">{item.spa}</p>
                                  <span className="inline-block mt-1 px-2 py-0.5 bg-slate-100 dark:bg-slate-800 text-[9px] font-bold text-slate-500 rounded-md">Categoría: {item.category || 'General'}</span>
                                </div>
                              )}

                              {/* Grammar Quizzes */}
                              {aiSelectedType === 'grammar_quizzes.json' && (
                                <div className="space-y-2">
                                  <p className="font-extrabold text-indigo-950 dark:text-indigo-200 text-sm">{item.question}</p>
                                  <div className="grid grid-cols-2 gap-1.5 mt-1.5">
                                    {Array.isArray(item.options) && item.options.map((opt: string, oIdx: number) => (
                                      <span key={oIdx} className={`p-1.5 rounded-lg border text-[10px] font-bold ${opt === item.correctAnswer ? 'bg-emerald-50 dark:bg-emerald-950/20 border-emerald-200 text-emerald-700 dark:text-emerald-350' : 'bg-slate-50 dark:bg-slate-950/50 border-slate-150 text-slate-500'}`}>
                                        {oIdx + 1}. {opt}
                                      </span>
                                    ))}
                                  </div>
                                  <p className="text-[10px] italic text-slate-500 mt-1">💡 <b>Explicación:</b> {item.explanation}</p>
                                  <span className="inline-block px-2 py-0.5 bg-slate-100 dark:bg-slate-800 text-[9px] font-bold text-slate-500 rounded-md">Categoría: {item.category || 'Grammar'}</span>
                                </div>
                              )}

                              {/* Dialogues */}
                              {aiSelectedType === 'dialogues.json' && (
                                <div className="space-y-2">
                                  <p className="font-extrabold text-indigo-950 dark:text-indigo-200 text-sm">Tema: {item.category}</p>
                                  <p className="text-[10px] font-mono text-slate-400">ID: {item.id}</p>
                                  <div className="space-y-1.5 border-l-2 border-indigo-200 dark:border-indigo-900 pl-3 mt-1.5">
                                    {Array.isArray(item.dialogue) && item.dialogue.map((line: any, lIdx: number) => (
                                      <div key={lIdx} className="text-[10px]">
                                        <b className="text-indigo-600 dark:text-indigo-400 uppercase">Hablante {line.speaker}:</b> {line.eng} <span className="text-slate-400 dark:text-slate-500">({line.spa})</span>
                                      </div>
                                    ))}
                                  </div>
                                </div>
                              )}

                              {/* Reading Comprehension */}
                              {aiSelectedType === 'reading_comprehension.json' && (
                                <div className="space-y-2">
                                  <span className="inline-block px-2 py-0.5 bg-slate-100 dark:bg-slate-800 text-[9px] font-bold text-slate-500 rounded-md mb-1">{item.category}</span>
                                  <p className="font-medium text-slate-700 dark:text-slate-300 leading-relaxed bg-slate-50 dark:bg-slate-950 p-2.5 rounded-xl border border-slate-100 dark:border-slate-850">{item.readingText}</p>
                                  
                                  {Array.isArray(item.questions) && item.questions.map((qObj: any, qIdx: number) => (
                                    <div key={qIdx} className="mt-2 pt-2 border-t border-slate-100 dark:border-slate-850">
                                      <p className="font-bold text-indigo-900 dark:text-indigo-300">P: {qObj.q}</p>
                                      <div className="grid grid-cols-2 gap-1.5 mt-1.5">
                                        {Array.isArray(qObj.options) && qObj.options.map((opt: string, oIdx: number) => (
                                          <span key={oIdx} className={`p-1.5 rounded-lg border text-[10px] font-bold ${opt === qObj.a ? 'bg-emerald-50 dark:bg-emerald-950/20 border-emerald-200 text-emerald-700' : 'bg-slate-50 dark:bg-slate-950/50 border-slate-150 text-slate-500'}`}>
                                            {opt}
                                          </span>
                                        ))}
                                      </div>
                                    </div>
                                  ))}
                                </div>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* Insert and Actions Block */}
                      <div className="p-4 bg-slate-100 dark:bg-slate-900 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-3 border border-slate-200 dark:border-slate-800">
                        <div className="text-xs text-slate-600 dark:text-slate-400 text-center sm:text-left">
                          {aiSelectedType === selectedFile ? (
                            <p className="font-bold text-emerald-600 dark:text-emerald-450 flex items-center gap-1.5 justify-center sm:justify-start">
                              ✓ El formato coincide con tu archivo activo ({selectedFile}).
                            </p>
                          ) : (
                            <div className="space-y-1">
                              <p className="font-extrabold text-amber-600 dark:text-amber-450">
                                ⚠ Estás editando "{selectedFile}", pero generaste para "{aiSelectedType}".
                              </p>
                              <p className="text-[10px] text-slate-500">
                                Cambia el archivo activo en el editor o haz clic abajo para sincronizarlo.
                              </p>
                            </div>
                          )}
                        </div>

                        <div className="flex gap-2">
                          <button
                            onClick={() => {
                              navigator.clipboard.writeText(JSON.stringify(aiGeneratedItems, null, 2));
                              onNotify("¡JSON de ejercicios copiado al portapapeles!");
                            }}
                            className="px-4 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 rounded-xl text-xs font-bold hover:bg-slate-50 transition cursor-pointer"
                          >
                            Copiar JSON
                          </button>

                          {aiSelectedType === selectedFile ? (
                            <button
                              onClick={() => {
                                const updated = [...parsedData, ...aiGeneratedItems];
                                updateJsonFromParsed(updated);
                                setAiGeneratedItems(null);
                                setShowAiAssistant(false);
                                onNotify(`¡5 nuevos ejercicios agregados a ${selectedFile}! Recuerda Guardar Base de Datos.`);
                              }}
                              className="px-5 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-xl text-xs font-extrabold shadow active:scale-95 transition cursor-pointer"
                            >
                              Insertar en Base de Datos Activa
                            </button>
                          ) : (
                            <button
                              onClick={() => {
                                setSelectedFile(aiSelectedType);
                                onNotify(`Cargando ${aiSelectedType}... Sincronización en curso.`);
                              }}
                              className="px-5 py-2 bg-amber-500 hover:bg-amber-600 text-white rounded-xl text-xs font-extrabold shadow active:scale-95 transition cursor-pointer"
                            >
                              Sincronizar y Cambiar a {aiSelectedType}
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Tab 2: Templates & Prompts Guide */}
              {aiAssistantTab === 'templates' && (
                <div className="space-y-6">
                  {/* Select file type */}
                  <div className="flex items-center gap-3 bg-white dark:bg-slate-900 p-3.5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm shrink-0">
                    <span className="text-xs font-bold text-slate-600 dark:text-slate-400 shrink-0">Seleccionar Formato de Destino:</span>
                    <select 
                      value={templateSelectedType} 
                      onChange={(e) => setTemplateSelectedType(e.target.value)}
                      className="flex-1 p-2 text-xs md:text-sm rounded-lg bg-slate-50 dark:bg-slate-950 border border-slate-250 dark:border-slate-750 font-bold focus:ring-2 focus:ring-indigo-500"
                    >
                      <option value="sentences.json">💬 Frases de Práctica (sentences.json)</option>
                      <option value="vocabulary.json">📚 Vocabulario (vocabulary.json)</option>
                      <option value="grammar_quizzes.json">📝 Quizzes de Gramática (grammar_quizzes.json)</option>
                      <option value="dialogues.json">🗣️ Diálogos y Conversaciones (dialogues.json)</option>
                      <option value="reading_comprehension.json">📖 Comprensión Lectora (reading_comprehension.json)</option>
                    </select>
                  </div>

                  {/* Schema breakdown and guide */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Structure details */}
                    <div className="space-y-4">
                      <div>
                        <h5 className="text-xs font-extrabold uppercase text-indigo-600 dark:text-indigo-400 tracking-wider mb-2">
                          Esquema Técnico del JSON ({templateSelectedType})
                        </h5>
                        <p className="text-xs text-slate-500 leading-relaxed mb-3">
                          Todos los archivos de la base de datos de Lisa's Quest son arreglos de JSON. Asegúrate de respetar los tipos y nombres de llaves exactamente.
                        </p>
                      </div>

                      <div className="bg-slate-900 text-slate-100 p-4 rounded-2xl border border-slate-800 font-mono text-[10px] md:text-xs overflow-x-auto max-h-[300px]">
                        <pre>{
                          templateSelectedType === 'sentences.json' ? `// sentences.json (Frases para dictado y orden de palabras)
[
  {
    "id": "ex_123",
    "eng": "English sentence string",
    "spa": "Spanish translation string",
    "category": "Category/Unit label (e.g. Greetings)",
    "emoji": "Single illustrated emoji string",
    "year": "2026",
    "source": "AI Generated",
    "type": "Data",
    "skill": "Vocabulary"
  }
]` : templateSelectedType === 'vocabulary.json' ? `// vocabulary.json (Vocabulario para flashcards y deletreo)
[
  {
    "id": "ex_124",
    "eng": "English vocabulary word",
    "spa": "Spanish translation string",
    "category": "Category/Unit label (e.g. Colors)",
    "emoji": "Single illustrated emoji string",
    "year": "2026",
    "source": "AI Generated",
    "type": "Data",
    "skill": "Vocabulary"
  }
]` : templateSelectedType === 'grammar_quizzes.json' ? `// grammar_quizzes.json (Desafíos múltiples de gramática)
[
  {
    "id": "quiz_125",
    "eng": "",
    "spa": "",
    "question": "Question text or fill-in-the-blank",
    "options": [
      "Correct Option (First item MUST be correct)",
      "Incorrect Option 1",
      "Incorrect Option 2",
      "Incorrect Option 3"
    ],
    "correctAnswer": "Correct Option (Must match option[0] exactly)",
    "explanation": "Short pedagogical tip/rule explained in Spanish",
    "category": "Grammar topic (e.g. Pronouns)",
    "emoji": "Descriptive emoji",
    "year": "2026",
    "source": "AI Generated",
    "type": "quiz",
    "skill": "Grammar"
  }
]` : templateSelectedType === 'dialogues.json' ? `// dialogues.json (Conversaciones por turnos)
[
  {
    "id": "unique_id_string (lowercase, underscores)",
    category: "Dialogue Topic Name (e.g. Asking for Directions)",
    "dialogue": [
      {
        "speaker": "A", // Or "B"
        "eng": "English line of speech",
        "spa": "Spanish line of speech",
        "emoji": "Illustrated emoji for this speech turn"
      }
    ]
  }
]` : `// reading_comprehension.json (Comprensión lectora avanzada)
[
  {
    "category": "Story or Topic name (e.g. At the Zoo)",
    "readingText": "Short paragraph of reading text in English",
    "emoji": "Main descriptive emoji",
    "questions": [
      {
        "q": "Comprehension question in English",
        "options": [
          "Correct answer (First option MUST be correct)",
          "Wrong option 1",
          "Wrong option 2",
          "Wrong option 3"
        ],
        "a": "Correct answer (Must match options[0] exactly)"
      }
    ]
  }
]`
                        }</pre>
                      </div>

                      <div className="flex gap-2">
                        <button
                          onClick={() => handleDownloadTemplateForType(templateSelectedType)}
                          className="flex-1 py-3 px-4 rounded-xl bg-indigo-50 hover:bg-indigo-100 text-indigo-700 dark:bg-indigo-950/40 dark:text-indigo-300 dark:hover:bg-indigo-900/30 border border-indigo-100 dark:border-indigo-900 font-extrabold text-xs flex items-center justify-center gap-2 cursor-pointer transition-colors"
                        >
                          <Download size={14} /> Descargar Plantilla JSON
                        </button>
                      </div>
                    </div>

                    {/* Prompt details */}
                    <div className="space-y-4">
                      <div>
                        <h5 className="text-xs font-extrabold uppercase text-emerald-600 dark:text-emerald-450 tracking-wider mb-2">
                          Prompt Pedagógico para este Tipo
                        </h5>
                        <p className="text-xs text-slate-500 leading-relaxed mb-3">
                          Copia este prompt de nivel experto para pegarlo en Gemini o ChatGPT y obtener el formato ideal con 5 ejercicios del tipo seleccionado.
                        </p>
                      </div>

                      <div className="bg-slate-100 dark:bg-slate-900/80 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 text-xs text-slate-700 dark:text-slate-300 max-h-[300px] overflow-y-auto leading-relaxed whitespace-pre-wrap select-all font-medium">
                        {getPromptForType(templateSelectedType)}
                      </div>

                      <div className="flex gap-2">
                        <button
                          onClick={() => handleCopyPromptForType(templateSelectedType)}
                          className="flex-1 py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs flex items-center justify-center gap-2 cursor-pointer transition-colors shadow-md shadow-emerald-600/10 active:scale-95"
                          title="Copiar directamente al portapapeles"
                        >
                          <Sparkles size={14} /> {templatePromptCopied ? "¡Copiado!" : "Copiar Directo"}
                        </button>
                        <button
                          onClick={() => {
                            setPromptEditorSource(templateSelectedType);
                            setEditedPromptText(getPromptForType(templateSelectedType));
                            setShowPromptEditorModal(true);
                          }}
                          className="flex-1 py-3 px-4 rounded-xl bg-indigo-50 hover:bg-indigo-100 text-indigo-700 dark:bg-indigo-950/40 dark:text-indigo-300 dark:hover:bg-indigo-900/30 border border-indigo-100 dark:border-indigo-900 font-extrabold text-xs flex items-center justify-center gap-2 cursor-pointer transition-colors"
                          title="Ver y editar este prompt antes de copiarlo"
                        >
                          <Edit3 size={14} /> Ver y Editar
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}

            </div>

            {/* Modal Footer */}
            <div className="px-6 py-4 border-t border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 flex justify-end shrink-0">
              <button 
                onClick={() => setShowAiAssistant(false)}
                className="px-5 py-2.5 bg-slate-200 hover:bg-slate-300 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 font-extrabold rounded-xl text-xs transition cursor-pointer"
              >
                Cerrar Asistente
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Prompt Viewer & Editor Modal */}
      {showPromptEditorModal && (
        <div className="fixed inset-0 bg-slate-950/70 backdrop-blur-sm z-[2010] flex items-center justify-center p-4">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white dark:bg-slate-900 rounded-3xl w-full max-w-2xl flex flex-col shadow-2xl overflow-hidden border border-slate-200 dark:border-slate-850"
          >
            {/* Header */}
            <div className="px-6 py-4 bg-emerald-600 dark:bg-emerald-800 text-white flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Sparkles size={20} className="text-yellow-300 animate-pulse" />
                <h3 className="font-extrabold text-base md:text-lg">Visualizar y Editar Prompt para LLM</h3>
              </div>
              <button 
                onClick={() => setShowPromptEditorModal(false)}
                className="text-white hover:text-emerald-200 transition"
              >
                <XCircle size={20} />
              </button>
            </div>

            {/* Body */}
            <div className="p-6 space-y-4 flex-1 flex flex-col min-h-0">
              <p className="text-xs text-slate-500 leading-relaxed">
                Aquí puedes visualizar, editar y luego copiar el prompt de nivel experto. Esto te permite adaptar las instrucciones pedagógicas antes de pegarlas en Gemini, ChatGPT o Claude.
              </p>
              
              <textarea
                value={editedPromptText}
                onChange={(e) => setEditedPromptText(e.target.value)}
                className="flex-1 w-full p-4 font-mono text-xs rounded-xl bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-100 border border-slate-200 dark:border-slate-800 focus:ring-2 focus:ring-emerald-500 resize-none min-h-[300px] overflow-y-auto outline-none"
                spellCheck={false}
              />
            </div>

            {/* Footer */}
            <div className="px-6 py-4 border-t border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 flex justify-between items-center shrink-0">
              <button 
                onClick={() => {
                  if (promptEditorSource === 'general') {
                    setEditedPromptText(getPromptForLLM());
                  } else {
                    setEditedPromptText(getPromptForType(promptEditorSource));
                  }
                  onNotify("Se ha restablecido el prompt original.");
                }}
                className="px-4 py-2 bg-slate-200 hover:bg-slate-300 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 font-bold rounded-xl text-xs transition cursor-pointer"
              >
                Restablecer Original
              </button>
              
              <div className="flex gap-2">
                <button 
                  onClick={() => setShowPromptEditorModal(false)}
                  className="px-4 py-2 bg-slate-200 hover:bg-slate-300 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 font-bold rounded-xl text-xs transition cursor-pointer"
                >
                  Cancelar
                </button>
                <button 
                  onClick={() => {
                    navigator.clipboard.writeText(editedPromptText);
                    onNotify("¡Prompt copiado al portapapeles con tus ediciones!");
                    setShowPromptEditorModal(false);
                  }}
                  className="px-5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold rounded-xl text-xs shadow-md active:scale-95 transition cursor-pointer flex items-center gap-1.5"
                >
                  <Sparkles size={14} /> Copiar Prompt Editado
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}
