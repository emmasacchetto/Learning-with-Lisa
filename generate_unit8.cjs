const fs = require('fs');
const { DIALOGUES, READING_COMPREHENSION, SENTENCES, VOCABULARY } = require('./build_unit8.cjs');

const quizzes = [];
const gq = (id, cat, q, options, ans, spa, eng, skill="Vocabulary", emoji="🎬") => {
  quizzes.push({
    id: `u8_${id}`,
    category: cat,
    type: 'quiz',
    skill,
    question: q,
    options,
    correctAnswer: ans,
    emoji,
    spa,
    optionsLang: 'en',
    eng,
    year: '2026',
    source: 'I Succeed in English 2 Studentsbook and Workbook'
  });
};

// 1. Film Genres & Cinema Vocabulary
const filmVocab = [
  ["fq001", "Action film", "Película de acción", ["Película de acción", "Comedia", "Documental"], "💥"],
  ["fq002", "Animated film", "Película animada / de animación", ["Película animada / de animación", "Película de terror", "Musical"], "🎨"],
  ["fq003", "Comedy", "Comedia", ["Comedia", "Drama", "Película de acción"], "😂"],
  ["fq004", "Documentary", "Documental", ["Documental", "Comedia", "Musical"], "📹"],
  ["fq005", "Fantasy film", "Película fantástica / de fantasía", ["Película fantástica / de fantasía", "Película de ciencia ficción", "Western"], "🧙"],
  ["fq006", "Horror film", "Película de terror", ["Película de terror", "Comedia", "Película animada"], "👻"],
  ["fq007", "Musical", "Musical", ["Musical", "Documental", "Acción"], "🎵"],
  ["fq008", "Sci-fi film", "Película de ciencia ficción", ["Película de ciencia ficción", "Película de terror", "Comedia"], "🚀"],
  ["fq009", "Actor / Actress", "Actor / Actriz", ["Actor / Actriz", "Director", "Guionista"], "🎭"],
  ["fq010", "Character", "Personaje", ["Personaje", "Actor", "Director"], "🦸"],
  ["fq011", "Director", "Director / Directora", ["Director / Directora", "Personaje", "Cámara"], "🎬"],
  ["fq012", "Soundtrack", "Banda sonora", ["Banda sonora", "Efectos de sonido", "Subtítulos"], "🎶"],
  ["fq013", "Special effects", "Efectos especiales", ["Efectos especiales", "Banda sonora", "Vestuario"], "✨"]
];

filmVocab.forEach(([id, eng, spa, opts, emoji]) => {
  quizzes.push({
    id: `u8_${id}`,
    category: "Film and Fiction",
    type: 'quiz',
    skill: "Vocabulary",
    question: `¿Qué significa "${eng}"?`,
    options: opts,
    correctAnswer: spa,
    emoji,
    spa,
    optionsLang: 'es',
    eng,
    year: '2026',
    source: 'I Succeed in English 2 Studentsbook and Workbook'
  });
});

// Spanish to English
filmVocab.forEach(([id, eng, spa, opts, emoji], idx) => {
  const otherEngs = filmVocab.filter(x => x[1] !== eng).map(x => x[1]);
  const sampleOpts = [eng, otherEngs[idx % otherEngs.length], otherEngs[(idx + 3) % otherEngs.length]].sort();
  gq(`feng_${id}`, "Film and Fiction", `¿Cómo se dice "${spa}" en inglés?`, sampleOpts, eng, spa, eng, "Vocabulary", emoji);
});

// 2. Past Simple: to be (was / were)
const wasWereQuizzes = [
  ["ww01", "The film ___ very exciting.", ["was", "were", "is"], "was", "La película fue muy emocionante.", "The film was very exciting.", "Grammar", "🎬"],
  ["ww02", "The special effects ___ fantastic!", ["were", "was", "are"], "were", "¡Los efectos especiales fueron fantásticos!", "The special effects were fantastic!", "Grammar", "✨"],
  ["ww03", "I ___ at the cinema last night.", ["was", "were", "am"], "was", "Estuve en el cine anoche.", "I was at the cinema last night.", "Grammar", "🍿"],
  ["ww04", "They ___ not scared during the movie.", ["were", "was", "did"], "were", "Ellos no tuvieron miedo durante la película.", "They were not scared during the movie.", "Grammar", "👻"],
  ["ww05", "___ the tickets expensive?", ["Were", "Was", "Did"], "Were", "¿Las entradas fueron caras?", "Were the tickets expensive?", "Grammar", "🎟️"],
  ["ww06", "Arthur ___ a young boy when he found the sword.", ["was", "were", "is"], "was", "Arthur era un niño cuando encontró la espada.", "Arthur was a young boy.", "Grammar", "⚔️"],
  ["ww07", "We ___ at home all weekend.", ["were", "was", "are"], "were", "Estuvimos en casa todo el fin de semana.", "We were at home all weekend.", "Grammar", "🏠"],
  ["ww08", "Wednesday ___ sunny and warm.", ["was", "were", "did"], "was", "El miércoles estuvo soleado y templado.", "Wednesday was sunny and warm.", "Grammar", "☀️"]
];

wasWereQuizzes.forEach(([id, q, opts, ans, spa, eng, skill, emoji]) => {
  gq(id, "Past Simple - Was and Were", q, opts, ans, spa, eng, skill, emoji);
});

// 3. Past Simple: Regular and Irregular verbs
const pastVerbs = [
  ["pv01", "We ___ an animated movie on Saturday. (watch)", ["watched", "watches", "watching"], "watched", "Vimos una película animada el sábado.", "We watched an animated movie on Saturday.", "Grammar", "🍿"],
  ["pv02", "They ___ to the cinema by bus. (go)", ["went", "goed", "gone"], "went", "Fueron al cine en colectivo.", "They went to the cinema by bus.", "Grammar", "🚌"],
  ["pv03", "Arthur ___ the sword from the stone. (pull)", ["pulled", "pulls", "pulling"], "pulled", "Arthur sacó la espada de la piedra.", "Arthur pulled the sword from the stone.", "Grammar", "⚔️"],
  ["pv04", "I ___ pop-corn and a drink. (buy)", ["bought", "buyed", "buys"], "bought", "Compré pochoclos y una bebida.", "I bought popcorn and a drink.", "Grammar", "🍿"],
  ["pv05", "She ___ the ending of the story. (love)", ["loved", "loveed", "loves"], "loved", "Le encantó el final de la historia.", "She loved the ending of the story.", "Grammar", "❤️"],
  ["pv06", "We ___ fifty bags of litter in the park. (collect)", ["collected", "collects", "collecting"], "collected", "Juntamos cincuenta bolsas de basura en el parque.", "We collected fifty bags of litter.", "Grammar", "🧤"],
  ["pv07", "He ___ a great review online. (write)", ["wrote", "writed", "written"], "wrote", "Escribió una gran reseña en internet.", "He wrote a great review online.", "Grammar", "📝"],
  ["pv08", "The knights ___ very hard. (try)", ["tried", "tryed", "trying"], "tried", "Los caballeros lo intentaron con fuerza.", "The knights tried very hard.", "Grammar", "💪"]
];

pastVerbs.forEach(([id, q, opts, ans, spa, eng, skill, emoji]) => {
  gq(id, "Past Simple - Affirmative Verbs", q, opts, ans, spa, eng, skill, emoji);
});

// 4. Past Simple Negatives and Questions
const pastNegQ = [
  ["pn01", "I ___ like the horror movie. It was too scary.", ["didn't", "don't", "wasn't"], "didn't", "No me gustó la película de terror.", "I didn't like the horror movie.", "Grammar", "😱"],
  ["pn02", "___ you go to the cinema yesterday?", ["Did", "Do", "Were"], "Did", "¿Fuiste al cine ayer?", "Did you go to the cinema yesterday?", "Grammar", "❓"],
  ["pn03", "Did you enjoy the film? - Yes, I ___.", ["did", "do", "enjoyed"], "did", "Sí, lo disfruté.", "Yes, I did.", "Grammar", "✅"],
  ["pn04", "Did she cry at the end? - No, she ___.", ["didn't", "doesn't", "wasn't"], "didn't", "No, no lloró.", "No, she didn't.", "Grammar", "❌"],
  ["pn05", "They ___ see the ending because they left early.", ["didn't", "weren't", "don't"], "didn't", "No vieron el final porque se fueron temprano.", "They didn't see the ending.", "Grammar", "🚪"],
  ["pn06", "What film ___ you watch last weekend?", ["did", "do", "were"], "did", "¿Qué película viste el fin de semana pasado?", "What film did you watch last weekend?", "Grammar", "🎬"],
  ["pn07", "Where ___ Arthur find the sword?", ["did", "was", "does"], "did", "¿Dónde encontró Arthur la espada?", "Where did Arthur find the sword?", "Grammar", "⚔️"]
];

pastNegQ.forEach(([id, q, opts, ans, spa, eng, skill, emoji]) => {
  gq(id, "Past Simple - Questions and Negatives", q, opts, ans, spa, eng, skill, emoji);
});

// 5. Weather, Nature & Final Project Quizzes
const natureProject = [
  ["np01", "Wednesday is ___ and windy. (soleado)", ["sunny", "foggy", "stormy"], "sunny", "El miércoles está soleado y ventoso.", "sunny", "Vocabulary", "☀️"],
  ["np02", "When land is very dry for years, it can become a ___.", ["desert", "river", "mountain"], "desert", "Se puede convertir en un desierto.", "desert", "Vocabulary", "🏜️"],
  ["np03", "Everest and K2 are famous ___.", ["mountains", "oceans", "lakes"], "mountains", "Son famosas montañas.", "mountains", "Vocabulary", "⛰️"],
  ["np04", "Rivers carry water to the ___.", ["oceans", "deserts", "trees"], "oceans", "Los ríos llevan agua a los océanos.", "oceans", "Vocabulary", "🌊"],
  ["np05", "What equipment do students need for a litter pick?", ["Bags, gloves and boots", "Books and pencils", "Tennis rackets"], "Bags, gloves and boots", "Bolsas, guantes y botas.", "Bags, gloves and boots", "Vocabulary", "🧤"],
  ["np06", "What should be on the campaign poster?", ["Date, time, place and equipment", "Only pictures of cars", "Nothing"], "Date, time, place and equipment", "Fecha, hora, lugar y equipo.", "Date, time, place and equipment", "Vocabulary", "🖼️"],
  ["np07", "¿Qué significa 'litter pick'?", ["Jornada de recolección de basura", "Elegir un postre", "Jugar al fútbol"], "Jornada de recolección de basura", "Jornada de recolección de basura.", "litter pick", "Vocabulary", "🚯"]
];

natureProject.forEach(([id, q, opts, ans, spa, eng, skill, emoji]) => {
  quizzes.push({
    id: `u8_${id}`,
    category: "Weather, Nature & Final Project",
    type: 'quiz',
    skill,
    question: q,
    options: opts,
    correctAnswer: ans,
    emoji,
    spa,
    optionsLang: 'en',
    eng,
    year: '2026',
    source: 'I Succeed in English 2 Studentsbook and Workbook'
  });
});

const unit8 = {
  unit: "Unid. 8: Film and Fiction",
  source: "I Succeed in English 2 Studentsbook and Workbook",
  year: "2026",
  DIALOGUES,
  GRAMMAR_QUIZZES: quizzes,
  READING_COMPREHENSION,
  SENTENCES,
  VOCABULARY
};

fs.writeFileSync('src/units/unit8.json', JSON.stringify(unit8, null, 2), 'utf8');
console.log('Unit 8 built successfully. Quizzes:', quizzes.length);
