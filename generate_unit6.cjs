const fs = require('fs');
const { DIALOGUES, READING_COMPREHENSION, SENTENCES, VOCABULARY } = require('./build_unit6.cjs');

const quizzes = [];
const gq = (id, cat, q, options, ans, spa, eng, skill="Grammar", emoji="👕") => {
  quizzes.push({
    id: `u6_${id}`,
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

// 1. Clothes Vocabulary Quizzes (meaning en español)
const clothesVocab = [
  ["cq001", "Belt", "Cinturón", ["Cinturón", "Bufanda", "Zapatillas"], "🥋"],
  ["cq002", "Boots", "Botas", ["Botas", "Zapatos", "Medias"], "🥾"],
  ["cq003", "Cap", "Gorra", ["Gorra", "Sombrero", "Bufanda"], "🧢"],
  ["cq004", "Coat", "Abrigo", ["Abrigo", "Camisa", "Falda"], "🧥"],
  ["cq005", "Dress", "Vestido", ["Vestido", "Pollera", "Pantalones"], "👗"],
  ["cq006", "Hoodie", "Buzo con capucha", ["Buzo con capucha", "Campera", "Chaleco"], "🧥"],
  ["cq007", "Jacket", "Campera / Chaqueta", ["Campera / Chaqueta", "Suéter", "Remera"], "🧥"],
  ["cq008", "Jeans", "Jeans / Vaqueros", ["Jeans / Vaqueros", "Pantalón corto", "Medias"], "👖"],
  ["cq009", "Jumper", "Suéter / Jersey", ["Suéter / Jersey", "Camisa", "Corbata"], "🧶"],
  ["cq010", "Scarf", "Bufanda", ["Bufanda", "Gorra", "Cinturón"], "🧣"],
  ["cq011", "Shirt", "Camisa", ["Camisa", "Remera", "Abrigo"], "👔"],
  ["cq012", "Shoes", "Zapatos", ["Zapatos", "Botas", "Zapatillas"], "👞"],
  ["cq013", "Skirt", "Falda / Pollera", ["Falda / Pollera", "Vestido", "Camisa"], "👗"],
  ["cq014", "Socks", "Medias / Calcetines", ["Medias / Calcetines", "Zapatos", "Guantes"], "🧦"],
  ["cq015", "Sunglasses", "Anteojos de sol", ["Anteojos de sol", "Gorra", "Bufanda"], "🕶️"],
  ["cq016", "Sweatshirt", "Buzo deportivo", ["Buzo deportivo", "Campera", "Chaleco"], "👕"],
  ["cq017", "Tie", "Corbata", ["Corbata", "Cinturón", "Bufanda"], "👔"],
  ["cq018", "Trainers", "Zapatillas deportivas", ["Zapatillas deportivas", "Botas", "Zapatos"], "👟"],
  ["cq019", "Trousers", "Pantalones", ["Pantalones", "Jeans", "Medias"], "👖"],
  ["cq020", "T-shirt", "Remera / Camiseta", ["Remera / Camiseta", "Camisa", "Suéter"], "👕"],
  ["cq021", "Uniform", "Uniforme", ["Uniforme", "Disfraz", "Ropa casual"], "🏫"]
];

clothesVocab.forEach(([id, eng, spa, opts, emoji]) => {
  quizzes.push({
    id: `u6_${id}`,
    category: "Clothes and Accessories",
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
clothesVocab.forEach(([id, eng, spa, opts, emoji], idx) => {
  const otherEngs = clothesVocab.filter(x => x[1] !== eng).map(x => x[1]);
  const sampleOpts = [eng, otherEngs[idx % otherEngs.length], otherEngs[(idx + 3) % otherEngs.length]].sort();
  gq(`ceng_${id}`, "Clothes and Accessories", `¿Cómo se dice "${spa}" en inglés?`, sampleOpts, eng, spa, eng, "Vocabulary", emoji);
});

// 2. Present Continuous Form (-ing spelling rules)
const spellingQuizzes = [
  ["sp01", "wear", "wearing", ["wearing", "wearring", "weares"], "wear → wearing", "wear → wearing"],
  ["sp02", "sit", "sitting", ["sitting", "siting", "sited"], "sit → sitting (dobla consonante)", "sit → sitting"],
  ["sp03", "dance", "dancing", ["dancing", "danceing", "dances"], "dance → dancing (quita 'e')", "dance → dancing"],
  ["sp04", "swim", "swimming", ["swimming", "swiming", "swims"], "swim → swimming (dobla 'm')", "swim → swimming"],
  ["sp05", "run", "running", ["running", "runing", "runs"], "run → running (dobla 'n')", "run → running"],
  ["sp06", "write", "writing", ["writing", "writeing", "writes"], "write → writing (quita 'e')", "write → writing"],
  ["sp07", "tidy", "tidying", ["tidying", "tiding", "tidies"], "tidy → tidying", "tidy → tidying"],
  ["sp08", "play", "playing", ["playing", "plaing", "plaies"], "play → playing", "play → playing"],
  ["sp09", "put", "putting", ["putting", "puting", "puts"], "put → putting (dobla 't')", "put → putting"],
  ["sp10", "make", "making", ["making", "makeing", "makes"], "make → making (quita 'e')", "make → making"]
];

spellingQuizzes.forEach(([id, base, ans, opts, spa, eng]) => {
  gq(id, "Present Continuous - Spelling Rules", `Forma en -ing del verbo "${base}":`, opts, ans, spa, eng, "Grammar", "✍️");
});

// 3. Present Continuous Affirmative & Negative
const pcAffNeg = [
  ["an01", "I ___ a green hoodie today.", ["am wearing", "is wearing", "are wearing"], "am wearing", "Estoy usando un buzo verde hoy.", "I am wearing a green hoodie today."],
  ["an02", "She ___ her homework right now.", ["is doing", "are doing", "am doing"], "is doing", "Ella está haciendo su tarea ahora.", "She is doing her homework right now."],
  ["an03", "They ___ football in the schoolyard.", ["are playing", "is playing", "am playing"], "are playing", "Ellos están jugando al fútbol en el patio.", "They are playing football in the schoolyard."],
  ["an04", "We ___ our classroom together.", ["are cleaning", "is cleaning", "am cleaning"], "are cleaning", "Estamos limpiando nuestra aula juntos.", "We are cleaning our classroom together."],
  ["an05", "He ___ a coat because it is warm.", ["isn't wearing", "aren't wearing", "am not wearing"], "isn't wearing", "Él no lleva abrigo porque está templado.", "He isn't wearing a coat because it is warm."],
  ["an06", "You ___ to the teacher!", ["aren't listening", "isn't listening", "doesn't listening"], "aren't listening", "¡No estás prestando atención a la profesora!", "You aren't listening to the teacher!"],
  ["an07", "I ___ TV, I am reading.", ["am not watching", "isn't watching", "aren't watching"], "am not watching", "No estoy viendo la tele, estoy leyendo.", "I am not watching TV, I am reading."],
  ["an08", "The dog ___ under the desk.", ["is sleeping", "are sleeping", "am sleeping"], "is sleeping", "El perro está durmiendo debajo del banco.", "The dog is sleeping under the desk."],
  ["an09", "Lucas and Emma ___ to school now.", ["are walking", "is walking", "walks"], "are walking", "Lucas y Emma están caminando a la escuela ahora.", "Lucas and Emma are walking to school now."],
  ["an10", "Look! It ___ outside.", ["is snowing", "are snowing", "snow"], "is snowing", "¡Mira! Está nevando afuera.", "Look! It is snowing outside."]
];

pcAffNeg.forEach(([id, q, opts, ans, spa, eng]) => {
  gq(id, "Present Continuous - Affirmative and Negative", q, opts, ans, spa, eng, "Grammar", "👔");
});

// 4. Present Continuous Questions & Short Answers
const pcQuestions = [
  ["pq01", "___ you wearing your new trainers?", ["Are", "Is", "Do"], "Are", "¿Estás usando tus zapatillas nuevas?", "Are you wearing your new trainers?"],
  ["pq02", "___ your brother doing his homework?", ["Is", "Are", "Does"], "Is", "¿Tu hermano está haciendo su tarea?", "Is your brother doing his homework?"],
  ["pq03", "Are they studying English? - Yes, they ___.", ["are", "do", "is"], "are", "Sí, están estudiando.", "Yes, they are."],
  ["pq04", "Is she wearing a scarf? - No, she ___.", ["isn't", "aren't", "doesn't"], "isn't", "No, no lleva bufanda.", "No, she isn't."],
  ["pq05", "Are you listening? - Yes, I ___.", ["am", "do", "are"], "am", "Sí, estoy escuchando.", "Yes, I am."],
  ["pq06", "What ___ you doing right now?", ["are", "is", "do"], "are", "¿Qué estás haciendo ahora mismo?", "What are you doing right now?"],
  ["pq07", "Where ___ he going?", ["is", "are", "am"], "is", "¿Adónde va él?", "Where is he going?"],
  ["pq08", "Why ___ they wearing jackets indoors?", ["are", "is", "do"], "are", "¿Por qué llevan camperas adentro?", "Why are they wearing jackets indoors?"],
  ["pq09", "Who ___ sitting next to Maya?", ["is", "are", "do"], "is", "¿Quién está sentado al lado de Maya?", "Who is sitting next to Maya?"],
  ["pq10", "Is it raining outside? - Yes, it ___.", ["is", "are", "does"], "is", "Sí, está lloviendo.", "Yes, it is."]
];

pcQuestions.forEach(([id, q, opts, ans, spa, eng]) => {
  gq(id, "Present Continuous - Questions and Answers", q, opts, ans, spa, eng, "Grammar", "❓");
});

// 5. Present Simple vs Present Continuous
const simpleVsCont = [
  ["svc01", "I usually ___ a uniform, but today I ___ jeans.", ["wear / am wearing", "am wearing / wear", "wears / is wearing"], "wear / am wearing", "Normalmente uso uniforme, pero hoy llevo jeans.", "I usually wear a uniform, but today I am wearing jeans."],
  ["svc02", "Listen! The baby ___.", ["is crying", "cries", "cry"], "is crying", "¡Escucha! El bebé está llorando.", "Listen! The baby is crying."],
  ["svc03", "Tom ___ to school by bike every morning.", ["rides", "is riding", "riding"], "rides", "Tom va en bicicleta a la escuela todas las mañanas.", "Tom rides to school by bike every morning."],
  ["svc04", "Right now, we ___ for our exam.", ["are studying", "study", "studies"], "are studying", "Ahora mismo estamos estudiando para nuestro examen.", "Right now, we are studying for our exam."],
  ["svc05", "She ___ coffee every day.", ["drinks", "is drinking", "drink"], "drinks", "Ella toma café todos los días.", "She drinks coffee every day."],
  ["svc06", "Look! Diego ___ a red sweatshirt today.", ["is wearing", "wears", "wear"], "is wearing", "¡Mira! Diego lleva un buzo rojo hoy.", "Look! Diego is wearing a red sweatshirt today."],
  ["svc07", "They never ___ trainers to formal events.", ["wear", "are wearing", "wears"], "wear", "Nunca usan zapatillas para eventos formales.", "They never wear trainers to formal events."],
  ["svc08", "What ___ at the moment?", ["are you reading", "do you read", "you read"], "are you reading", "¿Qué estás leyendo en este momento?", "What are you reading at the moment?"],
  ["svc09", "He ___ his teeth twice a day.", ["brushes", "is brushing", "brush"], "brushes", "Él se cepilla los dientes dos veces al día.", "He brushes his teeth twice a day."],
  ["svc10", "Quiet, please! The teacher ___.", ["is talking", "talks", "talk"], "is talking", "¡Silencio, por favor! La profesora está hablando.", "Quiet, please! The teacher is talking."]
];

simpleVsCont.forEach(([id, q, opts, ans, spa, eng]) => {
  gq(id, "Present Simple vs Continuous", q, opts, ans, spa, eng, "Grammar", "⚖️");
});

// 6. SDG - Sustainable Fashion & Environment Quizzes
const sdgClothes = [
  ["sdg01", "¿Cuánta agua se necesita para fabricar una sola remera de algodón?", ["Unos 2.700 litros", "10 litros", "100 litros"], "Unos 2.700 litros", "Unos 2.700 litros de agua.", "About 2,700 litres", "Reading", "💧"],
  ["sdg02", "Buying ___ clothes saves money and protects the planet.", ["second-hand", "new plastic", "expensive"], "second-hand", "Comprar ropa de segunda mano ahorra dinero y protege el planeta.", "Buying second-hand clothes saves money.", "Vocabulary", "♻️"],
  ["sdg03", "¿Qué significa 'swap clothes'?", ["Intercambiar ropa", "Tirar la ropa", "Comprar ropa de lujo"], "Intercambiar ropa", "Intercambiar ropa.", "swap clothes", "Vocabulary", "🔄"],
  ["sdg04", "Fast fashion creates a lot of ___.", ["waste and pollution", "clean rivers", "free shoes"], "waste and pollution", "La moda rápida genera muchos residuos y contaminación.", "waste and pollution", "Vocabulary", "🏭"],
  ["sdg05", "If your jumper has a small hole, you can ___ it.", ["repair", "destroy", "burn"], "repair", "Si tu suéter tiene un agujerito, puedes repararlo.", "repair", "Vocabulary", "🪡"]
];

sdgClothes.forEach(([id, q, opts, ans, spa, eng, skill, emoji]) => {
  quizzes.push({
    id: `u6_${id}`,
    category: "SDG - Sustainable Fashion",
    type: 'quiz',
    skill,
    question: q,
    options: opts,
    correctAnswer: ans,
    emoji,
    spa,
    optionsLang: 'es',
    eng,
    year: '2026',
    source: 'I Succeed in English 2 Studentsbook and Workbook'
  });
});

const unit6 = {
  unit: "Unid. 6: School Life",
  source: "I Succeed in English 2 Studentsbook and Workbook",
  year: "2026",
  DIALOGUES,
  GRAMMAR_QUIZZES: quizzes,
  READING_COMPREHENSION,
  SENTENCES,
  VOCABULARY
};

fs.writeFileSync('src/units/unit6.json', JSON.stringify(unit6, null, 2), 'utf8');
console.log('Unit 6 built successfully. Quizzes:', quizzes.length);
