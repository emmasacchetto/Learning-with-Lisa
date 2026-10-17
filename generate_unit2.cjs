const fs = require('fs');
const { DIALOGUES, READING_COMPREHENSION, SENTENCES, VOCABULARY } = require('./build_unit2.cjs');

const quizzes = [];
const gq = (id, cat, q, options, ans, spa, eng, skill="Vocabulary", emoji="🏠") => {
  quizzes.push({
    id: `u2_${id}`, category: cat, type: 'quiz', skill, question: q, options, correctAnswer: ans, emoji, spa, optionsLang: 'en', eng, year: '2026', source: 'I Succeed in English 2 - Unit 2 Home'
  });
};

gq("gq001", "Household Equipment", "¿Cómo se dice \"Ducha eléctrica\" en inglés?", ["Electric shower", "Games console", "Hairdryer"], "Electric shower", "Ducha eléctrica", "Electric shower", "Vocabulary", "🚿");
gq("gq002", "Household Equipment", "¿Cómo se dice \"Consola de videojuegos\" en inglés?", ["Games console", "Hairdryer", "Iron"], "Games console", "Consola de videojuegos", "Games console", "Vocabulary", "🎮");
gq("gq003", "Household Equipment", "¿Cómo se dice \"Secador de pelo\" en inglés?", ["Hairdryer", "Iron", "Laptop"], "Hairdryer", "Secador de pelo", "Hairdryer", "Vocabulary", "💨");
gq("gq004", "Household Equipment", "¿Cómo se dice \"Plancha\" en inglés?", ["Iron", "Laptop", "TV"], "Iron", "Plancha", "Iron", "Vocabulary", "👔");
gq("gq005", "Household Equipment", "¿Cómo se dice \"Computadora portátil\" en inglés?", ["Laptop", "TV", "Electric shower"], "Laptop", "Computadora portátil", "Laptop", "Vocabulary", "💻");
gq("gq006", "Household Equipment", "¿Cómo se dice \"Televisor\" en inglés?", ["TV", "Electric shower", "Games console"], "TV", "Televisor", "TV", "Vocabulary", "📺");

gq("gq007", "Energy Consumption", "¿Qué palabra significa 'consumo de energía'?", ["Energy consumption", "Energy room", "Electric place"], "Energy consumption", "Consumo de energía", "Energy consumption", "Vocabulary", "⚡");
gq("gq008", "Energy Consumption", "¿Qué unidad se usa para expresar potencia eléctrica?", ["Watt", "Litre", "Kilometre"], "Watt", "Vatio", "Watt", "Vocabulary", "⚡");
gq("gq009", "Energy Consumption", "Completa: I ___ how much energy my laptop uses.", ["monitor", "sleep", "cook"], "monitor", "Controlo cuánta energía usa mi computadora.", "I monitor how much energy my laptop uses.", "Vocabulary", "📊");
gq("gq010", "Energy Consumption", "Completa: Energy use ___ hour is 80 watts.", ["per", "on", "between"], "per", "El consumo de energía por hora es de 80 vatios.", "Energy use per hour is 80 watts.", "Vocabulary", "⏱️");
gq("gq011", "Energy Consumption", "Si un aparato usa 40 watts durante 2 horas, el cálculo base es:", ["2 × 40", "40 ÷ 2", "40 − 2"], "2 × 40", "Se multiplican las horas por los watts.", "2 hours × 40 watts.", "Vocabulary", "🧮");
gq("gq012", "Energy Consumption", "¿Cuál de estos aparatos suele usar electricidad?", ["Laptop", "Sofa", "Wardrobe"], "Laptop", "Una computadora portátil usa electricidad.", "A laptop uses electricity.", "Vocabulary", "💻");
gq("gq013", "Energy Consumption", "¿Qué verbo significa 'calcular'?", ["calculate", "decorate", "listen"], "calculate", "Calcular", "calculate", "Vocabulary", "🧮");
gq("gq014", "Energy Consumption", "¿Qué verbo significa 'monitorear/controlar'?", ["monitor", "mirror", "move"], "monitor", "Monitorear / controlar", "monitor", "Vocabulary", "📊");

gq("gq015", "Energy Sources", "Elige la afirmación correcta sobre Solar energy.", ["comes from the sun", "is a piece of furniture", "is a room in a house"], "comes from the sun", "Solar energy: proviene del sol.", "Solar energy comes from the sun.", "Reading", "☀️");
gq("gq016", "Energy Sources", "Elige la afirmación correcta sobre Wind energy.", ["uses moving air", "is a piece of furniture", "is a room in a house"], "uses moving air", "Wind energy: usa el movimiento del aire.", "Wind energy uses moving air.", "Reading", "💨");
gq("gq017", "Energy Sources", "Elige la afirmación correcta sobre Water energy.", ["uses moving water", "is a piece of furniture", "is a room in a house"], "uses moving water", "Water energy: usa el movimiento del agua.", "Water energy uses moving water.", "Reading", "🌊");
gq("gq018", "Energy Sources", "Elige la afirmación correcta sobre Coal.", ["is a fossil fuel", "is a piece of furniture", "is a room in a house"], "is a fossil fuel", "Coal: es un combustible fósil.", "Coal is a fossil fuel.", "Reading", "⬛");
gq("gq019", "Energy Sources", "Elige la afirmación correcta sobre Oil.", ["is a fossil fuel", "is a piece of furniture", "is a room in a house"], "is a fossil fuel", "Oil: es un combustible fósil.", "Oil is a fossil fuel.", "Reading", "🛢️");
gq("gq020", "Energy Sources", "Elige la afirmación correcta sobre Gas.", ["is a fuel", "is a piece of furniture", "is a room in a house"], "is a fuel", "Gas: es un combustible.", "Gas is a fuel.", "Reading", "🔥");

gq("gq021", "Rooms", "¿Cómo se dice \"Baño\" en inglés?", ["Bathroom", "Bedroom", "Dining room"], "Bathroom", "Baño", "Bathroom", "Vocabulary", "🚿");
gq("gq022", "Rooms", "¿Cómo se dice \"Dormitorio\" en inglés?", ["Bedroom", "Dining room", "Hall"], "Bedroom", "Dormitorio", "Bedroom", "Vocabulary", "🛏️");
gq("gq023", "Rooms", "¿Cómo se dice \"Comedor\" en inglés?", ["Dining room", "Hall", "Kitchen"], "Dining room", "Comedor", "Dining room", "Vocabulary", "🍽️");
gq("gq024", "Rooms", "¿Cómo se dice \"Pasillo / recibidor\" en inglés?", ["Hall", "Kitchen", "Living room"], "Hall", "Pasillo / recibidor", "Hall", "Vocabulary", "🚪");
gq("gq025", "Rooms", "¿Cómo se dice \"Cocina\" en inglés?", ["Kitchen", "Living room", "Stairs"], "Kitchen", "Cocina", "Kitchen", "Vocabulary", "🍳");
gq("gq026", "Rooms", "¿Cómo se dice \"Sala de estar\" en inglés?", ["Living room", "Stairs", "Bathroom"], "Living room", "Sala de estar", "Living room", "Vocabulary", "🛋️");
gq("gq027", "Rooms", "¿Cómo se dice \"Escaleras\" en inglés?", ["Stairs", "Bathroom", "Bedroom"], "Stairs", "Escaleras", "Stairs", "Vocabulary", "🪜");
gq("gq028", "Rooms", "¿En qué habitación normalmente cocinas?", ["Kitchen", "Bedroom", "Hall"], "Kitchen", "Normalmente cocinas en la cocina.", "You usually cook in the kitchen.", "Reading", "🍳");
gq("gq029", "Rooms", "¿En qué habitación normalmente duermes?", ["Bedroom", "Dining room", "Bathroom"], "Bedroom", "Normalmente duermes en el dormitorio.", "You usually sleep in the bedroom.", "Reading", "🛏️");
gq("gq030", "Rooms", "¿En qué habitación normalmente comes en familia?", ["Dining room", "Bathroom", "Stairs"], "Dining room", "Normalmente comes en el comedor.", "You usually eat in the dining room.", "Reading", "🍽️");
gq("gq031", "Rooms", "¿Dónde suele estar la ducha?", ["Bathroom", "Living room", "Hall"], "Bathroom", "La ducha suele estar en el baño.", "The shower is usually in the bathroom.", "Reading", "🚿");
gq("gq032", "Rooms", "¿Dónde suele estar un sofá?", ["Living room", "Bathroom", "Stairs"], "Living room", "Un sofá suele estar en la sala de estar.", "A sofa is usually in the living room.", "Reading", "🛋️");
gq("gq033", "Rooms", "¿Qué palabra significa 'escaleras'?", ["Stairs", "Shelves", "Stadium"], "Stairs", "Escaleras", "Stairs", "Reading", "🪜");

const furn = [
  ["gq034", "Armchair", "Sillón", ["Sillón", "Biblioteca / estantería", "Mesa ratona"], "🪑"],
  ["gq035", "Bath", "Bañera", ["Bañera", "Silla", "Cocina / artefacto para cocinar"], "🛁"],
  ["gq036", "Bed", "Cama", ["Cama", "Cómoda / cajonera", "Alacena / armario"], "🛏️"],
  ["gq037", "Bookcase", "Biblioteca / estantería", ["Biblioteca / estantería", "Mesa ratona", "Heladera"], "📚"],
  ["gq038", "Chair", "Silla", ["Silla", "Cocina / artefacto para cocinar", "Espejo"], "🪑"],
  ["gq039", "Chest of drawers", "Cómoda / cajonera", ["Cómoda / cajonera", "Alacena / armario", "Ducha"], "🗄️"],
  ["gq040", "Coffee table", "Mesa ratona", ["Mesa ratona", "Heladera", "Pileta / fregadero"], "🪵"],
  ["gq041", "Cooker", "Cocina / artefacto para cocinar", ["Cocina / artefacto para cocinar", "Espejo", "Sofá"], "🍳"],
  ["gq042", "Cupboard", "Alacena / armario", ["Alacena / armario", "Ducha", "Mesa"], "🗄️"],
  ["gq043", "Fridge", "Heladera", ["Heladera", "Pileta / fregadero", "Inodoro / baño"], "🧊"],
  ["gq044", "Mirror", "Espejo", ["Espejo", "Sofá", "Ropero / armario"], "🪞"],
  ["gq045", "Shower", "Ducha", ["Ducha", "Mesa", "Lavabo"], "🚿"],
  ["gq046", "Sink", "Pileta / fregadero", ["Pileta / fregadero", "Inodoro / baño", "Ventana"], "🚰"],
  ["gq047", "Sofa", "Sofá", ["Sofá", "Ropero / armario", "Sillón"], "🛋️"],
  ["gq048", "Table", "Mesa", ["Mesa", "Lavabo", "Bañera"], "🪵"],
  ["gq049", "Toilet", "Inodoro / baño", ["Inodoro / baño", "Ventana", "Cama"], "🚽"],
  ["gq050", "Wardrobe", "Ropero / armario", ["Ropero / armario", "Sillón", "Biblioteca / estantería"], "👕"],
  ["gq051", "Washbasin", "Lavabo", ["Lavabo", "Bañera", "Silla"], "🚰"],
  ["gq052", "Window", "Ventana", ["Ventana", "Cama", "Cómoda / cajonera"], "🪟"]
];

furn.forEach(([id, eng, spa, opts, emoji]) => {
  quizzes.push({
    id: `u2_${id}`, category: "Furniture", type: 'quiz', skill: "Vocabulary", question: `¿Qué significa "${eng}"?`, options: opts, correctAnswer: spa, emoji, spa, optionsLang: 'es', eng, year: '2026', source: 'I Succeed in English 2 - Unit 2 Home'
  });
});

const furnRooms = [
  ["gq053", "Fridge", "Kitchen", "🧊"],
  ["gq054", "Cooker", "Kitchen", "🍳"],
  ["gq055", "Sink", "Kitchen", "🚰"],
  ["gq056", "Bath", "Bathroom", "🛁"],
  ["gq057", "Washbasin", "Bathroom", "🚰"],
  ["gq058", "Toilet", "Bathroom", "🚽"],
  ["gq059", "Bed", "Bedroom", "🛏️"],
  ["gq060", "Wardrobe", "Bedroom", "👕"],
  ["gq061", "Chest of drawers", "Bedroom", "🗄️"],
  ["gq062", "Sofa", "Living room", "🛋️"],
  ["gq063", "Armchair", "Living room", "🪑"],
  ["gq064", "Coffee table", "Living room", "🪵"],
  ["gq065", "Table", "Dining room", "🪵"],
  ["gq066", "Chair", "Dining room", "🪑"]
];

furnRooms.forEach(([id, item, room, emoji]) => {
  gq(id, "Furniture and Rooms", `¿En qué habitación es más normal encontrar un/a ${item}?`, [room, "Stairs", "Garden"], room, `${item}: normalmente en ${room}.`, `The ${item.toLowerCase()} is usually in the ${room.toLowerCase()}.`, "Vocabulary", emoji);
});

gq("gq067", "There is/are - Affirmative", "Completa: ___ a sofa in the living room.", ["There is", "There are", "Are there"], "There is", "Hay un sofá en la sala de estar.", "There is a sofa in the living room.", "Grammar", "🛋️");
gq("gq068", "There is/are - Affirmative", "Completa: ___ two chairs in the dining room.", ["There are", "There is", "Is there"], "There are", "Hay dos sillas en el comedor.", "There are two chairs in the dining room.", "Grammar", "🪑");
gq("gq069", "There is/are - Affirmative", "Completa: ___ a garden behind the house.", ["There is", "There are", "Are there"], "There is", "Hay un jardín detrás de la casa.", "There is a garden behind the house.", "Grammar", "🌳");
gq("gq070", "There is/are - Affirmative", "Completa: ___ three bedrooms upstairs.", ["There are", "There is", "Is there"], "There are", "Hay tres dormitorios arriba.", "There are three bedrooms upstairs.", "Grammar", "🛏️");
gq("gq071", "There is/are - Affirmative", "Completa: ___ a big table in the kitchen.", ["There is", "There are", "Are there"], "There is", "Hay una mesa grande en la cocina.", "There is a big table in the kitchen.", "Grammar", "🪵");
gq("gq072", "There is/are - Affirmative", "Completa: ___ ten cupboards in the kitchen.", ["There are", "There is", "Is there"], "There are", "Hay diez alacenas en la cocina.", "There are ten cupboards in the kitchen.", "Grammar", "🗄️");
gq("gq073", "There is/are - Affirmative", "Elige la forma correcta para singular.", ["There is", "There are", "There"], "There is", "There is se usa normalmente con singular.", "There is is used with singular nouns.", "Grammar", "1️⃣");
gq("gq074", "There is/are - Affirmative", "Elige la forma correcta para plural.", ["There are", "There is", "There am"], "There are", "There are se usa normalmente con plural.", "There are is used with plural nouns.", "Grammar", "2️⃣");

gq("gq075", "Prepositions of Place", "Completa: The picture is ___ the bed.", ["above", "under", "between"], "above", "El cuadro está encima de la cama.", "The picture is above the bed.", "Grammar", "🖼️");
gq("gq076", "Prepositions of Place", "Completa: The shoes are ___ the bed.", ["under", "on", "above"], "under", "Los zapatos están debajo de la cama.", "The shoes are under the bed.", "Grammar", "👟");
gq("gq077", "Prepositions of Place", "Completa: The lamp is ___ the sofa.", ["next to", "between", "in"], "next to", "La lámpara está al lado del sofá.", "The lamp is next to the sofa.", "Grammar", "💡");
gq("gq078", "Prepositions of Place", "Completa: The cat is ___ the box.", ["behind", "on", "between"], "behind", "El gato está detrás de la caja.", "The cat is behind the box.", "Grammar", "🐈");
gq("gq079", "Prepositions of Place", "Completa: The chair is ___ the table and the window.", ["between", "above", "opposite"], "between", "La silla está entre la mesa y la ventana.", "The chair is between the table and the window.", "Grammar", "🪑");
gq("gq080", "Prepositions of Place", "Completa: The sofa is ___ the TV.", ["opposite", "under", "in"], "opposite", "El sofá está enfrente del televisor.", "The sofa is opposite the TV.", "Grammar", "🛋️");
gq("gq081", "Prepositions of Place", "Completa: The desk is ___ the window.", ["near", "between", "above"], "near", "El escritorio está cerca de la ventana.", "The desk is near the window.", "Grammar", "🪟");
gq("gq082", "Prepositions of Place", "Completa: The clock is ___ the door.", ["behind", "under", "between"], "behind", "El reloj está detrás de la puerta.", "The clock is behind the door.", "Grammar", "🕒");
gq("gq083", "Prepositions of Place", "Completa: The book is ___ the table.", ["on", "in front of", "near"], "on", "El libro está sobre la mesa.", "The book is on the table.", "Grammar", "📘");
gq("gq084", "Prepositions of Place", "Completa: The chair is ___ the desk.", ["in front of", "above", "behind"], "in front of", "La silla está delante del escritorio.", "The chair is in front of the desk.", "Grammar", "🪑");

const prepMeaning = [
  ["gq085", "Above", "Encima de", "⬆️"],
  ["gq086", "Behind", "Detrás de", "↩️"],
  ["gq087", "Between", "Entre", "↔️"],
  ["gq088", "In front of", "Delante de", "➡️"],
  ["gq089", "Near", "Cerca de", "📍"],
  ["gq090", "Next to", "Al lado de", "↔️"],
  ["gq091", "On", "Sobre / encima de", "🔝"],
  ["gq092", "Opposite", "Enfrente de", "↔️"],
  ["gq093", "Under", "Debajo de", "⬇️"]
];
prepMeaning.forEach(([id, eng, spa, emoji]) => {
  quizzes.push({
    id: `u2_${id}`, category: "Prepositions of Place", type: 'quiz', skill: "Reading", question: `¿Qué significa "${eng}"?`, options: [spa, "Ayer", "Rápidamente"], correctAnswer: spa, emoji, spa, optionsLang: 'es', eng, year: '2026', source: 'I Succeed in English 2 - Unit 2 Home'
  });
});

gq("gq094", "There is/are - Negative and Questions", "Forma negativa: ___ a bookcase in the room.", ["There isn't", "There aren't", "Isn't there"], "There isn't", "No hay una biblioteca en la habitación.", "There isn't a bookcase in the room.", "Grammar", "📚");
gq("gq095", "There is/are - Negative and Questions", "Forma negativa: ___ two sofas in the room.", ["There aren't", "There isn't", "Aren't there"], "There aren't", "No hay dos sofás en la habitación.", "There aren't two sofas in the room.", "Grammar", "🛋️");
gq("gq096", "There is/are - Negative and Questions", "Forma negativa: ___ a horse in the garden.", ["There isn't", "There aren't", "Is there"], "There isn't", "No hay un caballo en el jardín.", "There isn't a horse in the garden.", "Grammar", "🐎");
gq("gq097", "There is/are - Negative and Questions", "Forma negativa: ___ any chairs in the kitchen.", ["There aren't", "There isn't", "Are there"], "There aren't", "No hay sillas en la cocina.", "There aren't any chairs in the kitchen.", "Grammar", "🪑");
gq("gq098", "There is/are - Negative and Questions", "Pregunta: ___ a cake in the kitchen?", ["Is there", "Are there", "There is"], "Is there", "¿Hay una torta en la cocina?", "Is there a cake in the kitchen?", "Grammar", "🎂");
gq("gq099", "There is/are - Negative and Questions", "Pregunta: ___ any apples on the table?", ["Are there", "Is there", "There are"], "Are there", "¿Hay manzanas sobre la mesa?", "Are there any apples on the table?", "Grammar", "🍎");
gq("gq100", "There is/are - Negative and Questions", "Pregunta: ___ a wardrobe next to the bed?", ["Is there", "Are there", "There isn't"], "Is there", "¿Hay un ropero al lado de la cama?", "Is there a wardrobe next to the bed?", "Grammar", "👕");
gq("gq101", "There is/are - Negative and Questions", "Pregunta: ___ two mirrors in the bathroom?", ["Are there", "Is there", "There are"], "Are there", "¿Hay dos espejos en el baño?", "Are there two mirrors in the bathroom?", "Grammar", "🪞");
gq("gq102", "There is/are - Negative and Questions", "Respuesta corta: Is there a fridge?", ["Yes, there is.", "Yes, there are.", "Yes, it is."], "Yes, there is.", "Sí, hay.", "Yes, there is.", "Grammar", "🧊");
gq("gq103", "There is/are - Negative and Questions", "Respuesta corta negativa: Is there a bath?", ["No, there isn't.", "No, there aren't.", "No, it isn't."], "No, there isn't.", "No, no hay.", "No, there isn't.", "Grammar", "🛁");
gq("gq104", "There is/are - Negative and Questions", "Respuesta corta: Are there any books?", ["Yes, there are.", "Yes, there is.", "Yes, they is."], "Yes, there are.", "Sí, hay.", "Yes, there are.", "Grammar", "📚");
gq("gq105", "There is/are - Negative and Questions", "Respuesta corta negativa: Are there any cupboards?", ["No, there aren't.", "No, there isn't.", "No, they isn't."], "No, there aren't.", "No, no hay.", "No, there aren't.", "Grammar", "🗄️");

gq("gq106", "Quantifiers - Some and Any", "Completa: There are ___ books on the shelf.", ["some", "any", "a"], "some", "Hay algunos libros en el estante.", "There are some books on the shelf.", "Grammar", "📚");
gq("gq107", "Quantifiers - Some and Any", "Completa: There aren't ___ flowers here.", ["any", "some", "a"], "any", "No hay flores aquí.", "There aren't any flowers here.", "Grammar", "🌸");
gq("gq108", "Quantifiers - Some and Any", "Completa: Are there ___ computers in the room?", ["any", "some", "an"], "any", "¿Hay computadoras en la habitación?", "Are there any computers in the room?", "Grammar", "💻");
gq("gq109", "Quantifiers - Some and Any", "Completa: There are ___ pictures on the wall.", ["some", "any", "a"], "some", "Hay algunos cuadros en la pared.", "There are some pictures on the wall.", "Grammar", "🖼️");
gq("gq110", "Quantifiers - Some and Any", "Completa: There isn't ___ mirror in this room.", ["a", "some", "any"], "a", "No hay un espejo en esta habitación.", "There isn't a mirror in this room.", "Grammar", "🪞");
gq("gq111", "Quantifiers - Some and Any", "Completa: Is there ___ sofa in your living room?", ["a", "any", "some"], "a", "¿Hay un sofá en tu sala de estar?", "Is there a sofa in your living room?", "Grammar", "🛋️");
gq("gq112", "Quantifiers - Some and Any", "Completa: There are ___ toys under the bed.", ["some", "any", "an"], "some", "Hay algunos juguetes debajo de la cama.", "There are some toys under the bed.", "Grammar", "🧸");
gq("gq113", "Quantifiers - Some and Any", "Completa: There aren't ___ chairs in the hall.", ["any", "some", "a"], "any", "No hay sillas en el recibidor.", "There aren't any chairs in the hall.", "Grammar", "🪑");

gq("gq114", "There is/are - Birthday Context", "¿Qué pregunta sirve para saber si hay una torta?", ["Is there a cake?", "Are there a cake?", "There is a cake?"], "Is there a cake?", "¿Hay una torta?", "Is there a cake?", "Grammar", "🎂");
gq("gq115", "There is/are - Birthday Context", "Completa: There ___ any flowers.", ["aren't", "isn't", "is"], "aren't", "No hay flores.", "There aren't any flowers.", "Grammar", "🌸");
gq("gq116", "There is/are - Birthday Context", "Completa: There ___ a birthday card.", ["is", "are", "aren't"], "is", "Hay una tarjeta de cumpleaños.", "There is a birthday card.", "Grammar", "🎁");
gq("gq117", "There is/are - Birthday Context", "Completa: Are there any birthday balloons? Yes, there ___.", ["are", "is", "aren't"], "are", "¿Hay globos de cumpleaños? Sí.", "Are there any birthday balloons? Yes, there are.", "Grammar", "🎈");
gq("gq118", "There is/are - Birthday Context", "Completa: Is there a chocolate birthday cake? No, there ___.", ["isn't", "aren't", "is"], "isn't", "¿Hay una torta de chocolate? No.", "Is there a chocolate birthday cake? No, there isn't.", "Grammar", "🍫");
gq("gq119", "There is/are - Birthday Context", "Completa: There are ___ presents on the table.", ["some", "any", "a"], "some", "Hay algunos regalos sobre la mesa.", "There are some presents on the table.", "Grammar", "🎁");

gq("gq120", "Asking about Location", "Elige la pregunta para preguntar por la cocina.", ["Where's the kitchen?", "What's the kitchen?", "Is kitchen who?"], "Where's the kitchen?", "¿Dónde está la cocina?", "Where's the kitchen?", "Functions", "🍳");
gq("gq121", "Asking about Location", "Respuesta natural: Where's the kitchen?", ["It's downstairs.", "There are two.", "Yes, they are."], "It's downstairs.", "Está abajo.", "It's downstairs.", "Functions", "⬇️");
gq("gq122", "Asking about Location", "Elige la pregunta para preguntar por una contraseña de wifi.", ["Is there a wi-fi code?", "Are there wi-fi codes a?", "Where code is?"], "Is there a wi-fi code?", "¿Hay una contraseña de wifi?", "Is there a wi-fi code?", "Functions", "📶");
gq("gq123", "Asking about Location", "Respuesta natural: Is there a wi-fi code?", ["Yes, there is. It's on the wall.", "Yes, there are two beds.", "It's a kitchen."], "Yes, there is. It's on the wall.", "Sí. Está en la pared.", "Yes, there is. It's on the wall.", "Functions", "📶");
gq("gq124", "Asking about Location", "Pregunta: ___ there any computers?", ["Are", "Is", "Am"], "Are", "¿Hay computadoras?", "Are there any computers?", "Functions", "💻");
gq("gq125", "Asking about Location", "Respuesta natural: Are there any games consoles?", ["Yes, there are two.", "Yes, there is a bed.", "It's upstairs."], "Yes, there are two.", "Sí, hay dos.", "Yes, there are two.", "Functions", "🎮");
gq("gq126", "Asking about Location", "Completa: Where ___ the toilets?", ["are", "is", "am"], "are", "¿Dónde están los baños?", "Where are the toilets?", "Functions", "🚻");
gq("gq127", "Asking about Location", "Completa: Where ___ your bedroom?", ["is", "are", "am"], "is", "¿Dónde está tu dormitorio?", "Where is your bedroom?", "Functions", "🛏️");
gq("gq128", "Asking about Location", "Completa: ___ there a computer in your living room?", ["Is", "Are", "Am"], "Is", "¿Hay una computadora en tu sala de estar?", "Is there a computer in your living room?", "Functions", "💻");
gq("gq129", "Asking about Location", "Respuesta amable después de ayudar.", ["No problem.", "There isn't.", "Between."], "No problem.", "No hay problema.", "No problem.", "Functions", "👌");
gq("gq130", "Asking about Location", "Frase adecuada al recibir a un huésped.", ["Enjoy your stay.", "Close your country.", "Are you a sofa?"], "Enjoy your stay.", "Disfruta tu estadía.", "Enjoy your stay.", "Functions", "✨");

gq("gq131", "Skills Trainer - Places", "¿Qué frase es más adecuada al mostrar una escuela?", ["This is our classroom.", "There is a cake.", "My hair is brown."], "This is our classroom.", "Esta es nuestra aula.", "This is our classroom.", "Reading", "🏫");
gq("gq132", "Skills Trainer - Places", "¿Qué frase sirve para presentar a una persona?", ["Josh, meet my friend Maya.", "The sofa is green.", "There are two sinks."], "Josh, meet my friend Maya.", "Josh, te presento a mi amiga Maya.", "Josh, meet my friend Maya.", "Reading", "🤝");
gq("gq133", "Skills Trainer - Places", "¿Qué pregunta sirve para identificar una sala?", ["Is this the computer room?", "Who is the computer?", "Are room computer?"], "Is this the computer room?", "¿Esta es la sala de computación?", "Is this the computer room?", "Reading", "💻");
gq("gq134", "Skills Trainer - Places", "¿Qué pregunta sirve para localizar los baños?", ["Where are the toilets?", "What are the toilets colour?", "Is there toilets who?"], "Where are the toilets?", "¿Dónde están los baños?", "Where are the toilets?", "Reading", "🚻");
gq("gq135", "Skills Trainer - Places", "Completa: There's a pen ___ your desk.", ["on", "under", "between"], "on", "Hay una lapicera sobre tu escritorio.", "There's a pen on your desk.", "Reading", "🖊️");
gq("gq136", "Skills Trainer - Places", "Completa: There are three books ___ the desk.", ["on", "behind", "opposite"], "on", "Hay tres libros sobre el escritorio.", "There are three books on the desk.", "Reading", "📚");

gq("gq137", "Culture and Skills - Small Spaces", "¿Qué tipo de vivienda puede construirse con un contenedor reciclado?", ["A small flat", "A football stadium", "A mountain"], "A small flat", "Un departamento pequeño puede construirse con un contenedor reciclado.", "A small flat can be made from a recycled shipping container.", "Reading", "📦");
gq("gq138", "Culture and Skills - Small Spaces", "¿Qué palabra significa 'barato'?", ["cheap", "expensive", "modern"], "cheap", "Barato", "cheap", "Reading", "💰");
gq("gq139", "Culture and Skills - Small Spaces", "¿Qué palabra significa 'caro'?", ["expensive", "cheap", "safe"], "expensive", "Caro", "expensive", "Reading", "💸");
gq("gq140", "Culture and Skills - Small Spaces", "¿Qué palabra significa 'reciclado'?", ["recycled", "modern", "public"], "recycled", "Reciclado", "recycled", "Reading", "♻️");
gq("gq141", "Culture and Skills - Small Spaces", "¿Qué palabra significa 'baño público'?", ["public toilet", "holiday home", "office"], "public toilet", "Baño público", "public toilet", "Reading", "🚻");
gq("gq142", "Culture and Skills - Small Spaces", "Una vivienda en una antigua oficina es un ejemplo de:", ["a new function for an old space", "a time zone", "a school subject"], "a new function for an old space", "Un uso nuevo para un espacio antiguo.", "a new function for an old space", "Reading", "🏢");
gq("gq143", "Culture and Skills - Small Spaces", "¿Qué tipo de casa suele ser pequeña y tradicional?", ["cottage", "stadium", "computer room"], "cottage", "Una cottage suele ser una casa pequeña y tradicional.", "A cottage is usually a small traditional house.", "Reading", "🏡");
gq("gq144", "Culture and Skills - Small Spaces", "¿Qué palabra significa 'casa pareada'?", ["semi-detached house", "flat", "caravan"], "semi-detached house", "Casa pareada / adosada por un lado", "semi-detached house", "Reading", "🏠");

gq("gq145", "Holiday Home - Writing", "Elige la pregunta correcta.", ["What's your holiday home like?", "What holiday home are?", "Is your holiday home where like?"], "What's your holiday home like?", "¿Cómo es tu casa de vacaciones?", "What's your holiday home like?", "Reading", "🏖️");
gq("gq146", "Holiday Home - Writing", "Completa: There are two bedrooms ___ the caravan.", ["in", "on", "above"], "in", "Hay dos dormitorios en la casa rodante.", "There are two bedrooms in the caravan.", "Reading", "🚐");
gq("gq147", "Holiday Home - Writing", "Completa: There's a fridge ___ a sink.", ["and", "but", "any"], "and", "Hay una heladera y una pileta.", "There's a fridge and a sink.", "Reading", "🧊");
gq("gq148", "Holiday Home - Writing", "Completa: There's a shower, ___ there isn't a bath.", ["but", "and", "some"], "but", "Hay ducha, pero no hay bañera.", "There's a shower, but there isn't a bath.", "Reading", "🚿");
gq("gq149", "Holiday Home - Writing", "¿Qué signo se usa normalmente para separar dos elementos en una lista antes de 'and'?", ["comma", "question mark", "apostrophe"], "comma", "Coma", "comma", "Reading", "✍️");
gq("gq150", "Holiday Home - Writing", "Elige la descripción más natural.", ["It's a small caravan near a lake.", "It's a small near lake caravan.", "Near lake it caravan."], "It's a small caravan near a lake.", "Es una casa rodante pequeña cerca de un lago.", "It's a small caravan near a lake.", "Reading", "🚐");

gq("gq151", "Culture and Skills - Semi-detached House", "¿Qué tipo de vivienda es una semi-detached house?", ["A house joined to one other house", "A boat", "A tent"], "A house joined to one other house", "Una casa unida a otra vivienda por un lado.", "A semi-detached house is joined to one other house.", "Reading", "🏠");
gq("gq152", "Culture and Skills - Semi-detached House", "Completa: Downstairs, there ___ a living room and a kitchen.", ["is", "are", "aren't"], "is", "Abajo hay una sala de estar y una cocina.", "Downstairs, there is a living room and a kitchen.", "Reading", "🏠");
gq("gq153", "Culture and Skills - Semi-detached House", "Completa: There ___ two bedrooms upstairs.", ["are", "is", "isn't"], "are", "Arriba hay dos dormitorios.", "There are two bedrooms upstairs.", "Reading", "🛏️");
gq("gq154", "Culture and Skills - Semi-detached House", "Forma negativa: There ___ a shower in the bathroom.", ["isn't", "aren't", "are"], "isn't", "No hay ducha en el baño.", "There isn't a shower in the bathroom.", "Reading", "🚿");
gq("gq155", "Culture and Skills - Semi-detached House", "Completa: There are some posters ___ the wall.", ["on", "under", "between"], "on", "Hay algunos pósteres en la pared.", "There are some posters on the wall.", "Reading", "🖼️");
gq("gq156", "Culture and Skills - Semi-detached House", "¿Dónde está normalmente un outdoor toilet en una casa antigua?", ["Outside the house", "On the bed", "Inside the wardrobe"], "Outside the house", "Un baño exterior está fuera de la casa.", "An outdoor toilet is outside the house.", "Reading", "🚻");

gq("gq157", "CLIL Geography", "La Tierra se divide en dos grandes hemisferios por:", ["the Equator", "a wardrobe", "a motorway"], "the Equator", "El ecuador divide la Tierra en hemisferio norte y sur.", "The Equator divides Earth into the Northern and Southern Hemispheres.", "Reading", "🌐");
gq("gq158", "CLIL Geography", "¿En qué hemisferio está gran parte de Europa?", ["Northern Hemisphere", "Southern Hemisphere", "No hemisphere"], "Northern Hemisphere", "Europa está en el hemisferio norte.", "Europe is in the Northern Hemisphere.", "Reading", "🌍");
gq("gq159", "CLIL Geography", "¿En qué hemisferio está Australia?", ["Southern Hemisphere", "Northern Hemisphere", "Both only"], "Southern Hemisphere", "Australia está en el hemisferio sur.", "Australia is in the Southern Hemisphere.", "Reading", "🇦🇺");
gq("gq160", "CLIL Geography", "¿Cuál es un continente?", ["Africa", "Atlantic Ocean", "The Equator"], "Africa", "África es un continente.", "Africa is a continent.", "Reading", "🌍");
gq("gq161", "CLIL Geography", "¿Cuál es un océano?", ["Atlantic Ocean", "Europe", "Brazil"], "Atlantic Ocean", "El Atlántico es un océano.", "The Atlantic Ocean is an ocean.", "Reading", "🌊");
gq("gq162", "CLIL Geography", "¿Qué es una frontera natural?", ["A natural feature separating areas", "A sofa in a room", "A school timetable"], "A natural feature separating areas", "Una frontera natural es un elemento natural que separa territorios.", "A natural border is a natural feature separating areas.", "Reading", "🗺️");
gq("gq163", "CLIL Geography", "¿Cuál puede funcionar como frontera natural?", ["A mountain range", "A laptop", "A wardrobe"], "A mountain range", "Una cordillera puede funcionar como frontera natural.", "A mountain range can form a natural border.", "Reading", "🏔️");
gq("gq164", "CLIL Geography", "¿Cuál puede funcionar como frontera natural?", ["A river", "A cooker", "A poster"], "A river", "Un río puede funcionar como frontera natural.", "A river can form a natural border.", "Reading", "🏞️");
gq("gq165", "CLIL Geography", "¿Qué palabra significa 'cordillera'?", ["mountain range", "time zone", "ocean current"], "mountain range", "Cordillera", "mountain range", "Reading", "🏔️");
gq("gq166", "CLIL Geography", "¿Qué palabra significa 'corriente oceánica'?", ["ocean current", "mountain range", "time zone"], "ocean current", "Corriente oceánica", "ocean current", "Reading", "🌊");
gq("gq167", "CLIL Geography", "¿Por qué la hora puede ser distinta entre Londres y Sídney?", ["They are in different time zones.", "They use different sofas.", "They have different colours."], "They are in different time zones.", "Porque están en zonas horarias diferentes.", "They are in different time zones.", "Reading", "🕒");
gq("gq168", "CLIL Geography", "¿Qué significa midday?", ["Mediodía", "Medianoche", "Atardecer"], "Mediodía", "Mediodía", "Midday", "Reading", "☀️");
gq("gq169", "CLIL Geography", "¿Qué significa midnight?", ["Medianoche", "Mediodía", "Mañana"], "Medianoche", "Medianoche", "Midnight", "Reading", "🌙");
gq("gq170", "CLIL Geography", "Completa: North America is ___ of South America.", ["north", "south", "west"], "north", "Norteamérica está al norte de Sudamérica.", "North America is north of South America.", "Reading", "⬆️");
gq("gq171", "CLIL Geography", "Completa: Australia is ___ of Asia.", ["southeast", "northwest", "north"], "southeast", "Australia está al sudeste de Asia.", "Australia is southeast of Asia.", "Reading", "↘️");
gq("gq172", "CLIL Geography", "Completa: The Atlantic Ocean is ___ of Europe.", ["west", "east", "south"], "west", "El océano Atlántico está al oeste de Europa.", "The Atlantic Ocean is west of Europe.", "Reading", "⬅️");
gq("gq173", "CLIL Geography", "Completa: Africa is ___ of Europe.", ["south", "north", "west"], "south", "África está al sur de Europa.", "Africa is south of Europe.", "Reading", "⬇️");

gq("gq174", "Compass Points", "¿Cómo se dice \"Norte\" en inglés?", ["North", "East", "South"], "North", "Norte", "North", "Vocabulary", "⬆️");
gq("gq175", "Compass Points", "¿Cómo se dice \"Noreste\" en inglés?", ["Northeast", "Southeast", "Southwest"], "Northeast", "Noreste", "Northeast", "Vocabulary", "↗️");
gq("gq176", "Compass Points", "¿Cómo se dice \"Este\" en inglés?", ["East", "South", "West"], "East", "Este", "East", "Vocabulary", "➡️");
gq("gq177", "Compass Points", "¿Cómo se dice \"Sudeste\" en inglés?", ["Southeast", "Southwest", "Northwest"], "Southeast", "Sudeste", "Southeast", "Vocabulary", "↘️");
gq("gq178", "Compass Points", "¿Cómo se dice \"Sur\" en inglés?", ["South", "West", "North"], "South", "Sur", "South", "Vocabulary", "⬇️");
gq("gq179", "Compass Points", "¿Cómo se dice \"Sudoeste\" en inglés?", ["Southwest", "Northwest", "Northeast"], "Southwest", "Sudoeste", "Southwest", "Vocabulary", "↙️");
gq("gq180", "Compass Points", "¿Cómo se dice \"Oeste\" en inglés?", ["West", "North", "East"], "West", "Oeste", "West", "Vocabulary", "⬅️");
gq("gq181", "Compass Points", "¿Cómo se dice \"Noroeste\" en inglés?", ["Northwest", "Northeast", "Southeast"], "Northwest", "Noroeste", "Northwest", "Vocabulary", "↖️");

gq("gq182", "Time Zones", "Si es mediodía en una ciudad, son:", ["12:00", "00:00", "06:00"], "12:00", "Mediodía corresponde a las 12:00.", "Midday is 12:00.", "Reading", "🕛");
gq("gq183", "Time Zones", "Si es medianoche, son:", ["00:00", "12:00", "18:00"], "00:00", "Medianoche corresponde a las 00:00.", "Midnight is 00:00.", "Reading", "🌙");
gq("gq184", "Time Zones", "Completa: It's 9 ___ in London.", ["a.m.", "p.m. only at midnight", "north"], "a.m.", "Son las 9 a. m. en Londres.", "It's 9 a.m. in London.", "Reading", "🕘");
gq("gq185", "Time Zones", "Completa: The two cities are in different ___.", ["time zones", "bookcases", "gardens"], "time zones", "Las dos ciudades están en zonas horarias diferentes.", "The two cities are in different time zones.", "Reading", "🕒");

gq("gq186", "Review Unit 2", "¿Qué palabra pertenece a 'kitchen'?", ["cooker", "bed", "bath"], "cooker", "Cooker pertenece a la cocina.", "A cooker belongs in the kitchen.", "Grammar", "🍳");
gq("gq187", "Review Unit 2", "¿Qué palabra pertenece a 'bathroom'?", ["shower", "sofa", "bookcase"], "shower", "Shower pertenece al baño.", "A shower belongs in the bathroom.", "Grammar", "🚿");
gq("gq188", "Review Unit 2", "¿Qué palabra pertenece a 'bedroom'?", ["wardrobe", "cooker", "sink"], "wardrobe", "Wardrobe pertenece al dormitorio.", "A wardrobe belongs in the bedroom.", "Grammar", "👕");
gq("gq189", "Review Unit 2", "¿Qué palabra pertenece a 'living room'?", ["armchair", "bath", "fridge"], "armchair", "Armchair pertenece a la sala de estar.", "An armchair belongs in the living room.", "Grammar", "🪑");
gq("gq190", "Review Unit 2", "Completa: There's a fridge ___ the cooker.", ["next to", "under", "between"], "next to", "Hay una heladera al lado de la cocina.", "There's a fridge next to the cooker.", "Grammar", "🧊");
gq("gq191", "Review Unit 2", "Completa: I've got a smartphone ___ my bag.", ["in", "between", "opposite"], "in", "Tengo un teléfono en mi bolso.", "I've got a smartphone in my bag.", "Grammar", "📱");
gq("gq192", "Review Unit 2", "Completa: My desk is in front ___ the window.", ["of", "to", "at"], "of", "Mi escritorio está delante de la ventana.", "My desk is in front of the window.", "Grammar", "🪟");
gq("gq193", "Review Unit 2", "Completa: The bed is ___ the door.", ["opposite", "any", "there"], "opposite", "La cama está enfrente de la puerta.", "The bed is opposite the door.", "Grammar", "🛏️");
gq("gq194", "Review Unit 2", "Completa: The mirror is ___ the washbasin.", ["above", "any", "are"], "above", "El espejo está encima del lavabo.", "The mirror is above the washbasin.", "Grammar", "🪞");
gq("gq195", "Review Unit 2", "Completa: There ___ 240 bedrooms in Buckingham Palace.", ["are", "is", "isn't"], "are", "Hay 240 dormitorios en el Palacio de Buckingham.", "There are 240 bedrooms in Buckingham Palace.", "Grammar", "🏰");
gq("gq196", "Review Unit 2", "Completa: ___ there a bathroom for visitors?", ["Is", "Are", "Am"], "Is", "¿Hay un baño para visitantes?", "Is there a bathroom for visitors?", "Grammar", "🚿");
gq("gq197", "Review Unit 2", "Completa: There ___ 78 bathrooms in total.", ["are", "is", "isn't"], "are", "Hay 78 baños en total.", "There are 78 bathrooms in total.", "Grammar", "🚽");
gq("gq198", "Review Unit 2", "Forma negativa: There ___ a restaurant.", ["isn't", "aren't", "are"], "isn't", "No hay un restaurante.", "There isn't a restaurant.", "Grammar", "🍽️");
gq("gq199", "Review Unit 2", "Completa: There ___ a café.", ["is", "are", "aren't"], "is", "Hay una cafetería.", "There is a café.", "Grammar", "☕");
gq("gq200", "Review Unit 2", "Respuesta: Are there any computers?", ["Yes, there are.", "Yes, there is.", "No, it isn't."], "Yes, there are.", "Sí, hay.", "Yes, there are.", "Grammar", "💻");

gq("gq201", "Fast Finishers - Unit 2", "¿Qué objeto es típico de una cocina?", ["cooker", "sofa", "wardrobe"], "cooker", "Una cocina suele tener un cooker.", "A kitchen usually has a cooker.", "Grammar", "🍳");
gq("gq202", "Fast Finishers - Unit 2", "¿Qué objeto es típico de una sala de estar?", ["sofa", "bath", "fridge"], "sofa", "Una sala de estar suele tener un sofá.", "A living room usually has a sofa.", "Grammar", "🛋️");
gq("gq203", "Fast Finishers - Unit 2", "Completa una descripción posible: There ___ two windows in my bedroom.", ["are", "is", "isn't"], "are", "Hay dos ventanas en mi dormitorio.", "There are two windows in my bedroom.", "Grammar", "🪟");
gq("gq204", "Fast Finishers - Unit 2", "Pregunta correcta: ___ there a computer in your room?", ["Is", "Are", "Am"], "Is", "¿Hay una computadora en tu habitación?", "Is there a computer in your room?", "Grammar", "💻");
gq("gq205", "Fast Finishers - Unit 2", "Pregunta correcta: ___ there any spiders in the kitchen?", ["Are", "Is", "Am"], "Are", "¿Hay arañas en la cocina?", "Are there any spiders in the kitchen?", "Grammar", "🕷️");
gq("gq206", "Fast Finishers - Unit 2", "Pregunta correcta: ___ there a bed in your dining room?", ["Is", "Are", "Am"], "Is", "¿Hay una cama en tu comedor?", "Is there a bed in your dining room?", "Grammar", "🛏️");
gq("gq207", "Fast Finishers - Unit 2", "Pregunta correcta: ___ there any cats in your classroom?", ["Are", "Is", "Am"], "Are", "¿Hay gatos en tu aula?", "Are there any cats in your classroom?", "Grammar", "🐈");

gq("gq208", "Fun Time - Unit 2", "Una imagen muestra una cama y un ropero. ¿Qué habitación es?", ["Bedroom", "Kitchen", "Bathroom"], "Bedroom", "Es un dormitorio.", "It's a bedroom.", "Reading", "🛏️");
gq("gq209", "Fun Time - Unit 2", "Una imagen muestra cocina, heladera y alacenas. ¿Qué habitación es?", ["Kitchen", "Bedroom", "Hall"], "Kitchen", "Es una cocina.", "It's a kitchen.", "Reading", "🍳");
gq("gq210", "Fun Time - Unit 2", "Una imagen muestra mesa y sillas. ¿Qué habitación es?", ["Dining room", "Bathroom", "Bedroom"], "Dining room", "Es un comedor.", "It's a dining room.", "Reading", "🍽️");
gq("gq211", "Fun Time - Unit 2", "Una imagen muestra inodoro y lavabo. ¿Qué habitación es?", ["Bathroom", "Living room", "Kitchen"], "Bathroom", "Es un baño.", "It's a bathroom.", "Reading", "🚽");
gq("gq212", "Fun Time - Unit 2", "Memoria: completa: There isn't a bookcase ___ the sofa.", ["behind", "on", "between"], "behind", "No hay una biblioteca detrás del sofá.", "There isn't a bookcase behind the sofa.", "Reading", "📚");
gq("gq213", "Fun Time - Unit 2", "Memoria: completa: There are some pictures ___ the wall.", ["on", "under", "between"], "on", "Hay algunos cuadros en la pared.", "There are some pictures on the wall.", "Reading", "🖼️");
gq("gq214", "Fun Time - Unit 2", "Memoria: completa: There is a red sofa ___ the room.", ["in", "above", "next to"], "in", "Hay un sofá rojo en la habitación.", "There is a red sofa in the room.", "Reading", "🛋️");
gq("gq215", "Fun Time - Unit 2", "Memoria: completa: There are two teenagers ___ the room.", ["in", "under", "between"], "in", "Hay dos adolescentes en la habitación.", "There are two teenagers in the room.", "Reading", "👥");

gq("gq216", "Mini Real-life Task - Ideal Place", "¿Qué frase describe mejor un lugar ideal?", ["It's bright and comfortable.", "It's nationality blue.", "There are midnight."], "It's bright and comfortable.", "Es luminoso y cómodo.", "It's bright and comfortable.", "Functions", "✨");
gq("gq217", "Mini Real-life Task - Ideal Place", "Completa: My ideal room has a big window ___ a comfortable chair.", ["and", "any", "there"], "and", "Mi habitación ideal tiene una ventana grande y una silla cómoda.", "My ideal room has a big window and a comfortable chair.", "Functions", "🪟");
gq("gq218", "Mini Real-life Task - Ideal Place", "Elige una razón natural: My ideal place is special because ___.", ["it's relaxing", "it are a sofa", "there any"], "it's relaxing", "Mi lugar ideal es especial porque es relajante.", "My ideal place is special because it's relaxing.", "Functions", "😌");

const unit2 = {
  unit: "Unid. 2: Home",
  source: "I Succeed in English 2 Studentsbook and Workbook",
  year: "2026",
  DIALOGUES,
  GRAMMAR_QUIZZES: quizzes,
  READING_COMPREHENSION,
  SENTENCES,
  VOCABULARY
};

fs.writeFileSync('src/units/unit2.json', JSON.stringify(unit2, null, 2), 'utf8');
console.log('Unit 2 saved successfully. Quizzes:', quizzes.length);
