const fs = require('fs');
const { DIALOGUES, READING_COMPREHENSION, SENTENCES, VOCABULARY } = require('./build_unit7.cjs');

const quizzes = [];
const gq = (id, cat, q, options, ans, spa, eng, skill="Vocabulary", emoji="📍") => {
  quizzes.push({
    id: `u7_${id}`,
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

// 1. Places in Town Vocabulary
const places = [
  ["pl001", "Baker's", "Panadería", ["Panadería", "Librería", "Farmacia"], "🥖"],
  ["pl002", "Bank", "Banco", ["Banco", "Hospital", "Parque"], "🏦"],
  ["pl003", "Bookshop", "Librería", ["Librería", "Biblioteca", "Panadería"], "📚"],
  ["pl004", "Bus station", "Terminal de colectivos", ["Terminal de colectivos", "Estación de tren", "Aeropuerto"], "🚌"],
  ["pl005", "Café", "Cafetería / Café", ["Cafetería / Café", "Restaurante", "Cine"], "☕"],
  ["pl006", "Chemist's", "Farmacia", ["Farmacia", "Hospital", "Banco"], "💊"],
  ["pl007", "Cinema", "Cine", ["Cine", "Museo", "Teatro"], "🎬"],
  ["pl008", "Hospital", "Hospital", ["Hospital", "Farmacia", "Policía"], "🏥"],
  ["pl009", "Library", "Biblioteca", ["Biblioteca", "Librería", "Escuela"], "📖"],
  ["pl010", "Museum", "Museo", ["Museo", "Cine", "Centro comercial"], "🏛️"],
  ["pl011", "Park", "Parque", ["Parque", "Plaza", "Estadio"], "🌳"],
  ["pl012", "Police station", "Comisaría", ["Comisaría", "Estación de bomberos", "Hospital"], "👮"],
  ["pl013", "Post office", "Oficina de correos", ["Oficina de correos", "Banco", "Biblioteca"], "📮"],
  ["pl014", "Restaurant", "Restaurante", ["Restaurante", "Cafetería", "Supermercado"], "🍽️"],
  ["pl015", "Shopping centre", "Centro comercial / Shopping", ["Centro comercial / Shopping", "Supermercado", "Mercado"], "🛍️"],
  ["pl016", "Sports centre", "Centro deportivo", ["Centro deportivo", "Estadio", "Gimnasio"], "🏟️"],
  ["pl017", "Supermarket", "Supermercado", ["Supermercado", "Panadería", "Almacén"], "🛒"],
  ["pl018", "Train station", "Estación de tren", ["Estación de tren", "Terminal de micros", "Puerto"], "🚆"]
];

places.forEach(([id, eng, spa, opts, emoji]) => {
  quizzes.push({
    id: `u7_${id}`,
    category: "Places in Town",
    type: 'quiz',
    skill: "Vocabulary",
    question: `¿Qué lugar es "${eng}"?`,
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

// Spanish to English Places
places.forEach(([id, eng, spa, opts, emoji], idx) => {
  const otherEngs = places.filter(x => x[1] !== eng).map(x => x[1]);
  const sampleOpts = [eng, otherEngs[idx % otherEngs.length], otherEngs[(idx + 4) % otherEngs.length]].sort();
  gq(`peng_${id}`, "Places in Town", `¿Cómo se dice "${spa}" en inglés?`, sampleOpts, eng, spa, eng, "Vocabulary", emoji);
});

// 2. Prepositions of Place and Directions
const directions = [
  ["dir01", "¿Cómo se dice 'doblar a la izquierda'?", ["Turn left", "Turn right", "Go straight on"], "Turn left", "Doblar a la izquierda.", "turn left", "Vocabulary", "⬅️"],
  ["dir02", "¿Cómo se dice 'doblar a la derecha'?", ["Turn right", "Turn left", "Cross the street"], "Turn right", "Doblar a la derecha.", "turn right", "Vocabulary", "➡️"],
  ["dir03", "¿Cómo se dice 'seguir derecho'?", ["Go straight on", "Turn around", "Go back"], "Go straight on", "Seguir derecho.", "go straight on", "Vocabulary", "⬆️"],
  ["dir04", "The museum is ___ the park. (enfrente)", ["opposite", "behind", "under"], "opposite", "El museo está enfrente del parque.", "The museum is opposite the park.", "Vocabulary", "↔️"],
  ["dir05", "The bank is ___ the café and the bakery. (entre dos cosas)", ["between", "next to", "in front of"], "between", "El banco está entre la cafetería y la panadería.", "The bank is between the café and the bakery.", "Vocabulary", "↔️"],
  ["dir06", "The chemist's is ___ the hospital. (al lado)", ["next to", "opposite", "behind"], "next to", "La farmacia está al lado del hospital.", "The chemist's is next to the hospital.", "Vocabulary", "➡️"],
  ["dir07", "The newsagent is on the ___ of the street. (esquina)", ["corner", "middle", "roof"], "corner", "El puesto de diarios está en la esquina.", "The newsagent is on the corner.", "Vocabulary", "📍"],
  ["dir08", "Wait for the green light at the ___.", ["traffic lights", "roundabout", "bridge"], "traffic lights", "Espera la luz verde en el semáforo.", "traffic lights", "Vocabulary", "🚦"],
  ["dir09", "Walk across the river using the ___.", ["bridge", "tunnel", "traffic light"], "bridge", "Cruza el río usando el puente.", "bridge", "Vocabulary", "🌉"],
  ["dir10", "To give directions, use: '___ the second street on your right.'", ["Take", "Make", "Do"], "Take", "Toma la segunda calle a tu derecha.", "Take the second street on your right.", "Vocabulary", "🗺️"]
];

directions.forEach(([id, q, opts, ans, spa, eng, skill, emoji]) => {
  quizzes.push({
    id: `u7_${id}`,
    category: "Giving Directions",
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

// 3. Imperatives for Rules & Directions
const imperatives = [
  ["imp01", "Don't ___ litter on the grass!", ["drop", "dropping", "drops"], "drop", "¡No tires basura en el pasto!", "Don't drop litter on the grass!", "Grammar", "🚯"],
  ["imp02", "Please ___ quiet in the library.", ["be", "is", "are"], "be", "Por favor guarda silencio en la biblioteca.", "Please be quiet in the library.", "Grammar", "🤫"],
  ["imp03", "___ left at the roundabout.", ["Turn", "Turning", "Turns"], "Turn", "Gira a la izquierda en la rotonda.", "Turn left at the roundabout.", "Grammar", "🔄"],
  ["imp04", "Don't ___ your phone during the lesson.", ["use", "using", "uses"], "use", "No uses tu teléfono durante la clase.", "Don't use your phone during the lesson.", "Grammar", "📵"],
  ["imp05", "___ your plastic bottles and glass jars.", ["Recycle", "Recycling", "Recycles"], "Recycle", "Recicla tus botellas de plástico y frascos.", "Recycle your plastic bottles.", "Grammar", "♻️"],
  ["imp06", "___ off the lights when leaving.", ["Turn", "Turning", "Turns"], "Turn", "Apaga las luces al salir.", "Turn off the lights when leaving.", "Grammar", "💡"],
  ["imp07", "Don't ___ in the school corridors!", ["run", "running", "runs"], "run", "¡No corras en los pasillos de la escuela!", "Don't run in the school corridors!", "Grammar", "🏃"],
  ["imp08", "___ your seatbelt in the car.", ["Fasten", "Fastening", "Fastens"], "Fasten", "Abróchate el cinturón de seguridad en el auto.", "Fasten your seatbelt.", "Grammar", "🚗"],
  ["imp09", "Don't ___ water while brushing your teeth.", ["waste", "wasting", "wastes"], "waste", "No derroches agua mientras te cepillas los dientes.", "Don't waste water.", "Grammar", "💧"],
  ["imp10", "___ your hands before eating.", ["Wash", "Washing", "Washes"], "Wash", "Lávate las manos antes de comer.", "Wash your hands before eating.", "Grammar", "🧼"]
];

imperatives.forEach(([id, q, opts, ans, spa, eng, skill, emoji]) => {
  gq(id, "Imperatives and Rules", q, opts, ans, spa, eng, skill, emoji);
});

// 4. Taking Action and Community
const communityQuizzes = [
  ["act01", "How can students help the environment?", ["Pick up litter and recycle", "Drop plastic in rivers", "Buy more single-use plastic"], "Pick up litter and recycle", "Juntar basura y reciclar.", "Pick up litter and recycle", "Vocabulary", "🌍"],
  ["act02", "Why is Curitiba called a sustainable city?", ["It has fast buses and many parks", "It has no parks", "Nobody lives there"], "It has fast buses and many parks", "Tiene colectivos rápidos y muchos parques.", "It has fast buses and many parks", "Reading", "🌳"],
  ["act03", "Riding a bicycle produces ___ greenhouse gas emissions.", ["zero", "100%", "many"], "zero", "Andar en bicicleta produce cero emisiones.", "zero", "Vocabulary", "🚲"],
  ["act04", "¿Qué significa 'volunteer'?", ["Trabajar como voluntario", "Ganar mucho dinero", "Comprar un auto"], "Trabajar como voluntario", "Trabajar como voluntario.", "volunteer", "Vocabulary", "🙋"],
  ["act05", "In Curitiba, citizens can trade rubbish for ___.", ["fresh food and bus tickets", "smartphones", "gold coins"], "fresh food and bus tickets", "Alimentos frescos y boletos de colectivo.", "fresh food and bus tickets", "Reading", "🥦"],
  ["act06", "Lucas and Sofia helped stray animals by organising a ___.", ["car wash to raise money", "football tournament", "video game match"], "car wash to raise money", "Un lavado de autos para recaudar fondos.", "car wash to raise money", "Reading", "🚗"],
  ["act07", "When you see an elderly neighbour carrying heavy bags, you can ___.", ["offer to help them", "run away", "laugh"], "offer to help them", "Ofrecerte a ayudarlos.", "offer to help them", "Vocabulary", "🤝"],
  ["act08", "¿Cómo se dice 'ahorrar energía' en inglés?", ["Save energy", "Spend energy", "Waste electricity"], "Save energy", "Ahorrar energía.", "save energy", "Vocabulary", "💡"]
];

communityQuizzes.forEach(([id, q, opts, ans, spa, eng, skill, emoji]) => {
  quizzes.push({
    id: `u7_${id}`,
    category: "Taking Action & Community",
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

const unit7 = {
  unit: "Unid. 7: Take Action",
  source: "I Succeed in English 2 Studentsbook and Workbook",
  year: "2026",
  DIALOGUES,
  GRAMMAR_QUIZZES: quizzes,
  READING_COMPREHENSION,
  SENTENCES,
  VOCABULARY
};

fs.writeFileSync('src/units/unit7.json', JSON.stringify(unit7, null, 2), 'utf8');
console.log('Unit 7 built successfully. Quizzes:', quizzes.length);
