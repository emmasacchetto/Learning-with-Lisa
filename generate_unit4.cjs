const fs = require('fs');
const { DIALOGUES, READING_COMPREHENSION, SENTENCES, VOCABULARY } = require('./build_unit4.cjs');

const quizzes = [];
const gq = (id, cat, q, options, ans, spa, eng, skill="Vocabulary", emoji="🍽️") => {
  quizzes.push({
    id: `u4_${id}`, category: cat, type: 'quiz', skill, question: q, options, correctAnswer: ans, emoji, spa, optionsLang: 'en', eng, year: '2026', source: 'I Succeed in English 2 - Unit 4 Our food'
  });
};

gq("gq001", "Food Origins", "Pasta is traditionally associated with ___.", ["Italy", "Egypt", "Canada"], "Italy", "La pasta se asocia tradicionalmente con Italia.", "Pasta is traditionally associated with Italy.", "Reading", "🍝");
gq("gq002", "Food Origins", "Fish and chips is a famous dish from ___.", ["Britain", "Brazil", "Japan"], "Britain", "Fish and chips es un plato británico famoso.", "Fish and chips is a famous British dish.", "Reading", "🐟");
gq("gq003", "Food Origins", "Croissants are strongly associated with ___.", ["France", "Mexico", "China"], "France", "Los croissants se asocian con Francia.", "Croissants are associated with France.", "Reading", "🥐");
gq("gq004", "Food Origins", "Doughnuts are very popular in ___.", ["the USA", "Greece", "Morocco"], "the USA", "Las donas son muy populares en Estados Unidos.", "Doughnuts are very popular in the USA.", "Reading", "🍩");
gq("gq005", "Food Origins", "Sandwiches take their name from a place/person connected with ___.", ["England", "Australia", "India"], "England", "El término sandwich tiene origen británico.", "The word sandwich has a British origin.", "Reading", "🥪");
gq("gq006", "Food Origins", "French fries are called 'French', but their exact origin is ___.", ["more complicated than the name suggests", "always France only", "definitely Argentina"], "more complicated than the name suggests", "El origen de las papas fritas es más complejo de lo que su nombre sugiere.", "The origin of French fries is more complicated than the name suggests.", "Reading", "🍟");

const foodMeanings = [
  ["gq007", "Apple", "Manzana", ["Manzana", "Huevo", "Aceite"], "🍎"],
  ["gq008", "Beef", "Carne de vaca", ["Carne de vaca", "Uvas", "Cebolla"], "🥩"],
  ["gq009", "Cheese", "Queso", ["Queso", "Lechuga", "Naranja"], "🧀"],
  ["gq010", "Chicken", "Pollo", ["Pollo", "Hongo / champiñón", "Pasta"], "🍗"],
  ["gq011", "Egg", "Huevo", ["Huevo", "Aceite", "Arvejas / guisantes"], "🥚"],
  ["gq012", "Grapes", "Uvas", ["Uvas", "Cebolla", "Papa"], "🍇"],
  ["gq013", "Lettuce", "Lechuga", ["Lechuga", "Naranja", "Arroz"], "🥬"],
  ["gq014", "Mushroom", "Hongo / champiñón", ["Hongo / champiñón", "Pasta", "Salmón"], "🍄"],
  ["gq015", "Oil", "Aceite", ["Aceite", "Arvejas / guisantes", "Sal y pimienta"], "🫒"],
  ["gq016", "Onion", "Cebolla", ["Cebolla", "Papa", "Frutilla / fresa"], "🧅"],
  ["gq017", "Orange", "Naranja", ["Naranja", "Arroz", "Tomate"], "🍊"],
  ["gq018", "Pasta", "Pasta", ["Pasta", "Salmón", "Atún"], "🍝"],
  ["gq019", "Peas", "Arvejas / guisantes", ["Arvejas / guisantes", "Sal y pimienta", "Manzana"], "🫛"],
  ["gq020", "Potato", "Papa", ["Papa", "Frutilla / fresa", "Carne de vaca"], "🥔"],
  ["gq021", "Rice", "Arroz", ["Arroz", "Tomate", "Queso"], "🍚"],
  ["gq022", "Salmon", "Salmón", ["Salmón", "Atún", "Pollo"], "🐟"],
  ["gq023", "Salt and pepper", "Sal y pimienta", ["Sal y pimienta", "Manzana", "Huevo"], "🧂"],
  ["gq024", "Strawberry", "Frutilla / fresa", ["Frutilla / fresa", "Carne de vaca", "Uvas"], "🍓"],
  ["gq025", "Tomato", "Tomate", ["Tomate", "Queso", "Lechuga"], "🍅"],
  ["gq026", "Tuna", "Atún", ["Atún", "Pollo", "Hongo / champiñón"], "🐟"]
];

foodMeanings.forEach(([id, eng, spa, opts, emoji]) => {
  quizzes.push({
    id: `u4_${id}`, category: "Food", type: 'quiz', skill: "Vocabulary", question: `¿Qué significa "${eng}"?`, options: opts, correctAnswer: spa, emoji, spa, optionsLang: 'es', eng, year: '2026', source: 'I Succeed in English 2 - Unit 4 Our food'
  });
});

const drinkMeanings = [
  ["gq027", "Fruit juice", "Jugo de frutas", ["Jugo de frutas", "Leche", "Batido / licuado"], "🧃"],
  ["gq028", "Milk", "Leche", ["Leche", "Batido / licuado", "Agua"], "🥛"],
  ["gq029", "Milk shake", "Batido / licuado", ["Batido / licuado", "Agua", "Jugo de frutas"], "🥤"],
  ["gq030", "Water", "Agua", ["Agua", "Jugo de frutas", "Leche"], "💧"]
];

drinkMeanings.forEach(([id, eng, spa, opts, emoji]) => {
  quizzes.push({
    id: `u4_${id}`, category: "Drink", type: 'quiz', skill: "Vocabulary", question: `¿Qué significa "${eng}"?`, options: opts, correctAnswer: spa, emoji, spa, optionsLang: 'es', eng, year: '2026', source: 'I Succeed in English 2 - Unit 4 Our food'
  });
});

gq("gq031", "Food Categories", "¿Cuál es un tipo de queso?", ["Cheddar", "Peas", "Tuna"], "Cheddar", "Cheddar es un tipo de queso.", "Cheddar is a type of cheese.", "Vocabulary", "🧀");
gq("gq032", "Food Categories", "¿Cuál es otro tipo de queso?", ["Mozzarella", "Rice", "Lettuce"], "Mozzarella", "Mozzarella es un tipo de queso.", "Mozzarella is a type of cheese.", "Vocabulary", "🧀");
gq("gq033", "Food Categories", "¿Cuál es una fruta cítrica?", ["Orange", "Potato", "Mushroom"], "Orange", "La naranja es una fruta cítrica.", "An orange is a citrus fruit.", "Vocabulary", "🍊");
gq("gq034", "Food Categories", "¿Cuál es una fruta roja?", ["Strawberry", "Peas", "Onion"], "Strawberry", "La frutilla/fresa es una fruta roja.", "A strawberry is a red fruit.", "Vocabulary", "🍓");
gq("gq035", "Food Categories", "¿Cuál es un pescado?", ["Salmon", "Beef", "Chicken"], "Salmon", "El salmón es un pescado.", "Salmon is a fish.", "Vocabulary", "🐟");
gq("gq036", "Food Categories", "¿Cuál es otro pescado?", ["Tuna", "Cheese", "Oil"], "Tuna", "El atún es un pescado.", "Tuna is a fish.", "Vocabulary", "🐟");
gq("gq037", "Food Categories", "¿Cuál suele clasificarse como verdura aunque botánicamente sea un fruto?", ["Tomato", "Rice", "Beef"], "Tomato", "El tomate suele considerarse una verdura en cocina.", "Tomato is often treated as a vegetable in cooking.", "Vocabulary", "🍅");
gq("gq038", "Food Categories", "¿Cuál pertenece a los lácteos?", ["Milk", "Tuna", "Potato"], "Milk", "La leche es un producto lácteo.", "Milk is a dairy product.", "Vocabulary", "🥛");
gq("gq039", "Food Categories", "¿Cuál contiene principalmente carbohidratos?", ["Pasta", "Salmon", "Lettuce"], "Pasta", "La pasta es un alimento rico en carbohidratos.", "Pasta is rich in carbohydrates.", "Vocabulary", "🍝");
gq("gq040", "Food Categories", "¿Cuál es un condimento?", ["Salt and pepper", "Chicken", "Apple"], "Salt and pepper", "La sal y la pimienta son condimentos.", "Salt and pepper are condiments.", "Vocabulary", "🧂");

gq("gq041", "Food Wheel", "¿En qué grupo colocarías pasta?", ["Carbohydrates", "Dairy", "Fruit"], "Carbohydrates", "La pasta pertenece al grupo de carbohidratos.", "Pasta belongs to carbohydrates.", "Vocabulary", "🍝");
gq("gq042", "Food Wheel", "¿En qué grupo colocarías milk?", ["Dairy", "Vegetables", "Meat and fish"], "Dairy", "La leche pertenece a los lácteos.", "Milk belongs to dairy.", "Vocabulary", "🥛");
gq("gq043", "Food Wheel", "¿En qué grupo colocarías lettuce?", ["Vegetables", "Drinks", "Dairy"], "Vegetables", "La lechuga pertenece a las verduras.", "Lettuce belongs to vegetables.", "Vocabulary", "🥬");
gq("gq044", "Food Wheel", "¿En qué grupo colocarías orange?", ["Fruit", "Meat and fish", "Condiments"], "Fruit", "La naranja pertenece a las frutas.", "Orange belongs to fruit.", "Vocabulary", "🍊");
gq("gq045", "Food Wheel", "¿En qué grupo colocarías salmon?", ["Meat and fish", "Dairy", "Carbohydrates"], "Meat and fish", "El salmón pertenece a carnes y pescados.", "Salmon belongs to meat and fish.", "Vocabulary", "🐟");
gq("gq046", "Food Wheel", "¿En qué grupo colocarías oil?", ["Condiments", "Fruit", "Dairy"], "Condiments", "El aceite puede clasificarse como condimento.", "Oil can be used as a condiment.", "Vocabulary", "🫒");
gq("gq047", "Food Wheel", "¿En qué grupo colocarías water?", ["Drinks", "Carbohydrates", "Meat and fish"], "Drinks", "El agua pertenece a las bebidas.", "Water belongs to drinks.", "Vocabulary", "💧");

gq("gq048", "Menu Combinations", "Elige una combinación natural para un sandwich.", ["chicken and tomato", "milk and water", "rice and juice"], "chicken and tomato", "Pollo y tomate es una combinación natural para un sándwich.", "Chicken and tomato is a natural sandwich combination.", "Reading", "🥪");
gq("gq049", "Menu Combinations", "Elige una combinación natural para una pizza.", ["cheese and mushroom", "water and milk", "apple and juice only"], "cheese and mushroom", "Queso y champiñón es una combinación natural para una pizza.", "Cheese and mushroom is a natural pizza combination.", "Reading", "🍕");
gq("gq050", "Menu Combinations", "Elige una combinación natural para pasta.", ["tomato and cheese", "fruit juice and milk", "egg and water only"], "tomato and cheese", "Tomate y queso es una combinación natural para pasta.", "Tomato and cheese is a natural pasta combination.", "Reading", "🍝");
gq("gq051", "Menu Combinations", "Elige una combinación natural para una salad.", ["lettuce and tomato", "milk and cheese only", "rice and water"], "lettuce and tomato", "Lechuga y tomate es una combinación natural para una ensalada.", "Lettuce and tomato is a natural salad combination.", "Reading", "🥗");

gq("gq052", "Pronunciation - Food Words", "¿Qué palabra tiene un sonido vocálico parecido a /æ/ en inglés británico?", ["sandwich", "water", "cheese"], "sandwich", "Sandwich contiene el sonido objetivo de la práctica.", "Sandwich contains the target vowel sound.", "Reading", "🗣️");
gq("gq053", "Pronunciation - Food Words", "¿Qué palabra suele tener el sonido /ʌ/ en inglés británico?", ["mushroom", "cheese", "peas"], "mushroom", "Mushroom contiene el sonido /ʌ/ en su primera sílaba.", "Mushroom contains /ʌ/ in its first syllable.", "Reading", "🗣️");
gq("gq054", "Pronunciation - Food Words", "¿Qué palabra comienza con un sonido consonántico /tʃ/?", ["chicken", "salmon", "rice"], "chicken", "Chicken comienza con /tʃ/.", "Chicken begins with /tʃ/.", "Reading", "🗣️");

gq("gq055", "Present Simple Negative", "Completa: I ___ cook.", ["don't", "doesn't", "not"], "don't", "No cocino.", "I don't cook.", "Grammar", "👩‍🍳");
gq("gq056", "Present Simple Negative", "Completa: You ___ eat fish.", ["don't", "doesn't", "isn't"], "don't", "No comes pescado.", "You don't eat fish.", "Grammar", "🐟");
gq("gq057", "Present Simple Negative", "Completa: He ___ cook.", ["doesn't", "don't", "isn't"], "doesn't", "Él no cocina.", "He doesn't cook.", "Grammar", "👨‍🍳");
gq("gq058", "Present Simple Negative", "Completa: She ___ like mushrooms.", ["doesn't", "don't", "aren't"], "doesn't", "A ella no le gustan los hongos.", "She doesn't like mushrooms.", "Grammar", "🍄");
gq("gq059", "Present Simple Negative", "Completa: We ___ eat meat.", ["don't", "doesn't", "isn't"], "don't", "No comemos carne.", "We don't eat meat.", "Grammar", "🥩");
gq("gq060", "Present Simple Negative", "Completa: They ___ drink milk.", ["don't", "doesn't", "aren't"], "don't", "No toman leche.", "They don't drink milk.", "Grammar", "🥛");
gq("gq061", "Present Simple Negative", "Completa: My brother ___ like tuna.", ["doesn't", "don't", "isn't"], "doesn't", "A mi hermano no le gusta el atún.", "My brother doesn't like tuna.", "Grammar", "🐟");
gq("gq062", "Present Simple Negative", "Completa: My parents ___ eat junk food.", ["don't", "doesn't", "aren't"], "don't", "Mis padres no comen comida chatarra.", "My parents don't eat junk food.", "Grammar", "🍟");
gq("gq063", "Present Simple Negative", "Completa: The school cook ___ make pizza every day.", ["doesn't", "don't", "isn't"], "doesn't", "El cocinero escolar no prepara pizza todos los días.", "The school cook doesn't make pizza every day.", "Grammar", "🍕");
gq("gq064", "Present Simple Negative", "Elige la estructura correcta.", ["She doesn't eat fish.", "She don't eat fish.", "She doesn't eats fish."], "She doesn't eat fish.", "Ella no come pescado.", "She doesn't eat fish.", "Grammar", "🐟");
gq("gq065", "Present Simple Negative", "Elige la estructura correcta.", ["They don't drink coffee.", "They doesn't drink coffee.", "They don't drinks coffee."], "They don't drink coffee.", "Ellos no toman café.", "They don't drink coffee.", "Grammar", "☕");
gq("gq066", "Present Simple Negative", "Después de doesn't, el verbo va en:", ["base form", "third person -s", "past tense"], "base form", "Después de doesn't se usa la forma base del verbo.", "After doesn't, use the base form of the verb.", "Grammar", "📘");

gq("gq067", "Present Simple Negative - Word Order", "Elige el orden correcto.", ["I don't have breakfast in the hall.", "I have don't breakfast in the hall.", "Don't I breakfast have in the hall."], "I don't have breakfast in the hall.", "No desayuno en el pasillo.", "I don't have breakfast in the hall.", "Grammar", "🥣");
gq("gq068", "Present Simple Negative - Word Order", "Elige el orden correcto.", ["My aunt and uncle don't eat beef.", "My aunt and uncle doesn't beef eat.", "Don't my aunt beef and uncle eat."], "My aunt and uncle don't eat beef.", "Mi tía y mi tío no comen carne de vaca.", "My aunt and uncle don't eat beef.", "Grammar", "🥩");
gq("gq069", "Present Simple Negative - Word Order", "Elige el orden correcto.", ["Cats don't drink fruit juice.", "Cats doesn't fruit juice drink.", "Don't cats fruit juice."], "Cats don't drink fruit juice.", "Los gatos no toman jugo de frutas.", "Cats don't drink fruit juice.", "Grammar", "🐈");
gq("gq070", "Present Simple Negative - Word Order", "Elige el orden correcto.", ["This café doesn't open on Sundays.", "This café don't opens on Sundays.", "Doesn't this café on Sundays open."], "This café doesn't open on Sundays.", "Este café no abre los domingos.", "This café doesn't open on Sundays.", "Grammar", "☕");

gq("gq071", "Present Simple Negative - Workbook Practice", "Completa con la forma negativa de 'like': Maria ___ peas.", ["doesn't like", "don't like", "doesn't likes"], "doesn't like", "A Maria no le gustan las arvejas.", "Maria doesn't like peas.", "Grammar", "🫛");
gq("gq072", "Present Simple Negative - Workbook Practice", "Completa con la forma negativa de 'get up': My parents ___ early.", ["don't get up", "doesn't get up", "don't gets up"], "don't get up", "Mis padres no se levantan temprano.", "My parents don't get up early.", "Grammar", "🌅");
gq("gq073", "Present Simple Negative - Workbook Practice", "Completa con la forma negativa de 'want': We ___ to go shopping.", ["don't want", "doesn't want", "aren't want"], "don't want", "No queremos ir de compras.", "We don't want to go shopping.", "Grammar", "🛒");
gq("gq074", "Present Simple Negative - Workbook Practice", "Completa con la forma negativa de 'cook': Alice ___.", ["doesn't cook", "don't cook", "doesn't cooks"], "doesn't cook", "Alice no cocina.", "Alice doesn't cook.", "Grammar", "👩‍🍳");
gq("gq075", "Present Simple Negative - Workbook Practice", "Completa con la forma negativa de 'eat': You ___ onions.", ["don't eat", "doesn't eat", "don't eats"], "don't eat", "No comes cebollas.", "You don't eat onions.", "Grammar", "🧅");
gq("gq076", "Present Simple Negative - Workbook Practice", "Completa con la forma negativa de 'play': Harry ___ computer games.", ["doesn't play", "don't play", "doesn't plays"], "doesn't play", "Harry no juega videojuegos.", "Harry doesn't play computer games.", "Grammar", "🎮");

gq("gq077", "Present Simple Questions and Short Answers", "Completa: ___ I cook?", ["Do", "Does", "Am"], "Do", "¿Cocino?", "Do I cook?", "Grammar", "👩‍🍳");
gq("gq078", "Present Simple Questions and Short Answers", "Completa: ___ you eat meat?", ["Do", "Does", "Is"], "Do", "¿Comes carne?", "Do you eat meat?", "Grammar", "🥩");
gq("gq079", "Present Simple Questions and Short Answers", "Completa: ___ he cook?", ["Does", "Do", "Is"], "Does", "¿Él cocina?", "Does he cook?", "Grammar", "👨‍🍳");
gq("gq080", "Present Simple Questions and Short Answers", "Completa: ___ she like fish?", ["Does", "Do", "Is"], "Does", "¿A ella le gusta el pescado?", "Does she like fish?", "Grammar", "🐟");
gq("gq081", "Present Simple Questions and Short Answers", "Completa: ___ we cook?", ["Do", "Does", "Are"], "Do", "¿Cocinamos?", "Do we cook?", "Grammar", "🍳");
gq("gq082", "Present Simple Questions and Short Answers", "Completa: ___ they cook?", ["Do", "Does", "Are"], "Do", "¿Ellos cocinan?", "Do they cook?", "Grammar", "👩‍🍳");
gq("gq083", "Present Simple Questions and Short Answers", "Respuesta corta: Do you cook?", ["Yes, I do.", "Yes, I does.", "Yes, I am."], "Yes, I do.", "Sí.", "Yes, I do.", "Grammar", "✅");
gq("gq084", "Present Simple Questions and Short Answers", "Respuesta corta negativa: Do you eat fish?", ["No, I don't.", "No, I doesn't.", "No, I am not."], "No, I don't.", "No.", "No, I don't.", "Grammar", "❌");
gq("gq085", "Present Simple Questions and Short Answers", "Respuesta corta: Does he cook?", ["Yes, he does.", "Yes, he do.", "Yes, he is."], "Yes, he does.", "Sí.", "Yes, he does.", "Grammar", "✅");
gq("gq086", "Present Simple Questions and Short Answers", "Respuesta corta negativa: Does she like onions?", ["No, she doesn't.", "No, she don't.", "No, she isn't."], "No, she doesn't.", "No.", "No, she doesn't.", "Grammar", "🧅");
gq("gq087", "Present Simple Questions and Short Answers", "Respuesta corta: Do they cook?", ["Yes, they do.", "Yes, they does.", "Yes, they are."], "Yes, they do.", "Sí.", "Yes, they do.", "Grammar", "✅");
gq("gq088", "Present Simple Questions and Short Answers", "Después de Does he..., el verbo principal va en:", ["base form", "-s form", "past tense"], "base form", "Después de does se usa el verbo en forma base.", "After does, use the base form.", "Grammar", "📘");

gq("gq089", "Do or Does", "___ your mum eat meat?", ["Does", "Do", "Is"], "Does", "¿Tu mamá come carne?", "Does your mum eat meat?", "Grammar", "👩");
gq("gq090", "Do or Does", "___ you eat fish at school every day?", ["Do", "Does", "Are"], "Do", "¿Comes pescado en la escuela todos los días?", "Do you eat fish at school every day?", "Grammar", "🐟");
gq("gq091", "Do or Does", "___ Alex drink milk in the morning?", ["Does", "Do", "Is"], "Does", "¿Alex toma leche por la mañana?", "Does Alex drink milk in the morning?", "Grammar", "🥛");
gq("gq092", "Do or Does", "___ your friends like school lunch?", ["Do", "Does", "Are"], "Do", "¿A tus amigos les gusta el almuerzo escolar?", "Do your friends like school lunch?", "Grammar", "🍱");
gq("gq093", "Do or Does", "___ Emma have a shower in the morning?", ["Does", "Do", "Is"], "Does", "¿Emma se ducha por la mañana?", "Does Emma have a shower in the morning?", "Grammar", "🚿");

gq("gq094", "Present Simple - Picture Answers", "Question: Does he eat pasta? Picture clue: ✗", ["No, he doesn't.", "Yes, he does."], "No, he doesn't.", "No, no come pasta.", "Does he eat pasta? No, he doesn't.", "Grammar", "🍝");
gq("gq095", "Present Simple - Picture Answers", "Question: Do they play computer games? Picture clue: ✗", ["No, they don't.", "Yes, they do."], "No, they don't.", "No, no juegan videojuegos.", "Do they play computer games? No, they don't.", "Grammar", "🎮");
gq("gq096", "Present Simple - Picture Answers", "Question: Do they have eggs for breakfast? Picture clue: ✓", ["Yes, they do.", "No, they don't."], "Yes, they do.", "Sí, comen huevos en el desayuno.", "Do they have eggs for breakfast? Yes, they do.", "Grammar", "🥚");
gq("gq097", "Present Simple - Picture Answers", "Question: Does he leave home at nine o'clock? Picture clue: ✓", ["Yes, he does.", "No, he doesn't."], "Yes, he does.", "Sí, sale de casa a las nueve.", "Does he leave home at nine o'clock? Yes, he does.", "Grammar", "🏠");

gq("gq098", "Present Simple Questions - Word Order", "Elige la pregunta correcta.", ["What do you do at the weekend?", "What you do at weekend do?", "Do what weekend you?"], "What do you do at the weekend?", "¿Qué haces el fin de semana?", "What do you do at the weekend?", "Grammar", "📅");
gq("gq099", "Present Simple Questions - Word Order", "Elige la pregunta correcta.", ["When do you play football?", "When you do football play?", "Do when football you play?"], "When do you play football?", "¿Cuándo juegas al fútbol?", "When do you play football?", "Grammar", "⚽");
gq("gq100", "Present Simple Questions - Word Order", "Elige la pregunta correcta.", ["Where do you go to school?", "Where you do school go?", "Do where school you?"], "Where do you go to school?", "¿Dónde vas a la escuela?", "Where do you go to school?", "Grammar", "🏫");
gq("gq101", "Present Simple Questions - Word Order", "Elige la pregunta correcta.", ["When does your mum get home?", "When do your mum gets home?", "When your mum does home get?"], "When does your mum get home?", "¿Cuándo llega tu mamá a casa?", "When does your mum get home?", "Grammar", "🏠");
gq("gq102", "Present Simple Questions - Word Order", "Elige la pregunta correcta.", ["What does your horse eat?", "What do your horse eats?", "Does what horse your eat?"], "What does your horse eat?", "¿Qué come tu caballo?", "What does your horse eat?", "Grammar", "🐎");
gq("gq103", "Present Simple Questions - Word Order", "Elige la pregunta correcta.", ["Why do we drink water?", "Why we do water drink?", "Do why water we?"], "Why do we drink water?", "¿Por qué tomamos agua?", "Why do we drink water?", "Grammar", "💧");

gq("gq104", "Expressions of Frequency", "How often do you cook? ___", ["Every day.", "In the kitchen.", "At six o'clock."], "Every day.", "¿Con qué frecuencia cocinas? Todos los días.", "How often do you cook? Every day.", "Grammar", "📅");
gq("gq105", "Expressions of Frequency", "How often do you eat takeaway food? ___", ["Once a month.", "At home.", "A pizza."], "Once a month.", "¿Con qué frecuencia comes comida para llevar? Una vez al mes.", "How often do you eat takeaway food? Once a month.", "Grammar", "1️⃣");
gq("gq106", "Expressions of Frequency", "How often do you play football? ___", ["Three times a week.", "On the table.", "Rice."], "Three times a week.", "¿Con qué frecuencia juegas al fútbol? Tres veces por semana.", "How often do you play football? Three times a week.", "Grammar", "3️⃣");
gq("gq107", "Expressions of Frequency", "How often do you travel abroad? ___", ["Twice a year.", "A salad.", "In the morning."], "Twice a year.", "¿Con qué frecuencia viajas al extranjero? Dos veces al año.", "How often do you travel abroad? Twice a year.", "Grammar", "2️⃣");
gq("gq108", "Expressions of Frequency", "¿Qué pregunta pide frecuencia?", ["How often...?", "Where...?", "Who...?"], "How often...?", "How often pregunta con qué frecuencia.", "How often asks about frequency.", "Grammar", "🔁");
gq("gq109", "Expressions of Frequency", "¿Qué significa 'once a month'?", ["Una vez al mes", "Dos veces por semana", "Todos los días"], "Una vez al mes", "Una vez al mes", "Once a month", "Grammar", "1️⃣");
gq("gq110", "Expressions of Frequency", "¿Qué significa 'three times a week'?", ["Tres veces por semana", "Tres veces al mes", "Una vez por año"], "Tres veces por semana", "Tres veces por semana", "Three times a week", "Grammar", "3️⃣");
gq("gq111", "Expressions of Frequency", "¿Qué significa 'twice a year'?", ["Dos veces al año", "Dos veces por día", "Una vez por semana"], "Dos veces al año", "Dos veces al año", "Twice a year", "Grammar", "2️⃣");

gq("gq112", "Question Words and Frequency", "Luke eats pizza every day. ¿Qué pregunta corresponde?", ["How often does Luke eat pizza?", "Where does Luke eat pizza?", "Who is pizza?"], "How often does Luke eat pizza?", "¿Con qué frecuencia Luke come pizza?", "How often does Luke eat pizza?", "Functions", "🍕");
gq("gq113", "Question Words and Frequency", "Joe and Sam do their homework in the bedroom. ¿Qué pregunta corresponde?", ["Where do Joe and Sam do their homework?", "How often do they eat?", "Who is homework?"], "Where do Joe and Sam do their homework?", "¿Dónde hacen la tarea Joe y Sam?", "Where do Joe and Sam do their homework?", "Functions", "📝");
gq("gq114", "Question Words and Frequency", "Sarah and Eliza go for a bike ride at the weekend. ¿Qué pregunta corresponde?", ["When do Sarah and Eliza go for a bike ride?", "What food do they eat?", "How many tomatoes?"], "When do Sarah and Eliza go for a bike ride?", "¿Cuándo salen en bicicleta Sarah y Eliza?", "When do Sarah and Eliza go for a bike ride?", "Functions", "🚲");
gq("gq115", "Question Words and Frequency", "I have bread and orange juice for breakfast. ¿Qué pregunta corresponde?", ["What do you have for breakfast?", "Where is your school?", "How old is bread?"], "What do you have for breakfast?", "¿Qué desayunas?", "What do you have for breakfast?", "Functions", "🍞");

gq("gq116", "Asking about Habits", "Pregunta para saber qué come alguien en el almuerzo.", ["What do you usually eat for lunch?", "Where is lunch?", "How old is your lunch?"], "What do you usually eat for lunch?", "¿Qué comes normalmente en el almuerzo?", "What do you usually eat for lunch?", "Functions", "🍱");
gq("gq117", "Asking about Habits", "Pregunta para saber cuándo prepara el almuerzo.", ["When do you make your packed lunch?", "What lunch is your?", "Do packed when lunch?"], "When do you make your packed lunch?", "¿Cuándo preparas tu almuerzo para llevar?", "When do you make your packed lunch?", "Functions", "🍱");
gq("gq118", "Asking about Habits", "Pregunta para saber la hora de levantarse.", ["What time do you get up?", "How often is time?", "Where time do?"], "What time do you get up?", "¿A qué hora te levantas?", "What time do you get up?", "Functions", "⏰");
gq("gq119", "Asking about Habits", "Respuesta natural: What do you usually eat for lunch?", ["A salad.", "Twice a week.", "At six o'clock."], "A salad.", "Una ensalada.", "A salad.", "Functions", "🥗");
gq("gq120", "Asking about Habits", "Respuesta natural: When do you make your packed lunch?", ["In the morning.", "A burger.", "Three times a week."], "In the morning.", "Por la mañana.", "In the morning.", "Functions", "🌅");
gq("gq121", "Asking about Habits", "Respuesta natural: What time do you get up?", ["At 6.00.", "A sandwich.", "Every day food."], "At 6.00.", "A las seis.", "At 6.00.", "Functions", "🕕");
gq("gq122", "Asking about Habits", "Respuesta natural: How often do you have a burger for lunch?", ["Twice a week.", "A burger.", "In my bag."], "Twice a week.", "Dos veces por semana.", "Twice a week.", "Functions", "🍔");

gq("gq123", "Food and Drink - Workbook Practice", "Completa: A sandwich ___ cheese and tomato.", ["has", "have", "is"], "has", "Un sándwich tiene queso y tomate.", "A sandwich has cheese and tomato.", "Vocabulary", "🥪");
gq("gq124", "Food and Drink - Workbook Practice", "Completa: French fries need ___ and pepper.", ["salt", "milk", "grapes"], "salt", "Las papas fritas llevan sal y pimienta.", "French fries need salt and pepper.", "Vocabulary", "🍟");
gq("gq125", "Food and Drink - Workbook Practice", "Completa: A milk shake can have milk and ___.", ["strawberry", "onion", "tuna"], "strawberry", "Un batido puede tener leche y frutilla.", "A milk shake can have milk and strawberry.", "Vocabulary", "🥤");
gq("gq126", "Food and Drink - Workbook Practice", "¿Cuál es una bebida?", ["Fruit juice", "Lettuce", "Mushroom"], "Fruit juice", "El jugo de frutas es una bebida.", "Fruit juice is a drink.", "Vocabulary", "🧃");
gq("gq127", "Food and Drink - Workbook Practice", "¿Cuál es un alimento?", ["Cheese", "Water", "Fruit juice"], "Cheese", "El queso es un alimento.", "Cheese is food.", "Vocabulary", "🧀");
gq("gq128", "Food and Drink - Workbook Practice", "Completa: People usually ___ breakfast in the morning.", ["have", "has", "having"], "have", "La gente normalmente desayuna por la mañana.", "People usually have breakfast in the morning.", "Vocabulary", "🥣");

gq("gq129", "Culture and Skills - Britain's Favourite Food", "Según el texto cultural, el takeaway food en Gran Bretaña es:", ["popular", "unknown", "illegal"], "popular", "La comida para llevar es popular.", "Takeaway food is popular in Britain.", "Reading", "🥡");
gq("gq130", "Culture and Skills - Britain's Favourite Food", "¿Qué tipo de restaurantes se mencionan como comunes?", ["Indian, Chinese and Italian", "only British", "only Mexican"], "Indian, Chinese and Italian", "Se mencionan restaurantes indios, chinos e italianos.", "Indian, Chinese and Italian restaurants are common.", "Reading", "🌍");
gq("gq131", "Culture and Skills - Britain's Favourite Food", "¿Qué idea corrige el texto sobre chop suey?", ["It isn't originally Chinese in the way many people think.", "It is always a traditional Beijing dish.", "It is a British dessert."], "It isn't originally Chinese in the way many people think.", "El texto cuestiona la idea de que el chop suey sea un plato chino tradicional.", "The text questions the idea that chop suey is a traditional Chinese dish.", "Reading", "🥡");
gq("gq132", "Culture and Skills - Britain's Favourite Food", "¿Qué idea corrige el texto sobre spaghetti bolognese?", ["It is not a typical dish from Bologna in the form popular in Britain.", "It is the national dish of Scotland.", "It is a drink."], "It is not a typical dish from Bologna in the form popular in Britain.", "El texto explica que el spaghetti bolognese británico no coincide con un plato típico boloñés.", "British spaghetti bolognese is not a typical Bologna dish in that form.", "Reading", "🍝");
gq("gq133", "Culture and Skills - Britain's Favourite Food", "¿Qué explica el texto sobre curry?", ["Curry is a broad British term for many dishes with sauce.", "Curry is one exact Indian recipe only.", "Curry means bread."], "Curry is a broad British term for many dishes with sauce.", "El texto explica que curry es un término amplio para distintos platos con salsa.", "Curry is a broad term for different dishes with sauce.", "Reading", "🍛");
gq("gq134", "Culture and Skills - Britain's Favourite Food", "¿Cuál es una comida takeaway?", ["A meal you buy and eat away from the restaurant", "A school subject", "A bedroom"], "A meal you buy and eat away from the restaurant", "Una comida que compras para llevar.", "Takeaway food is food you buy to eat elsewhere.", "Reading", "🥡");
gq("gq135", "Culture and Skills - Britain's Favourite Food", "¿Qué significa leftovers?", ["Food that remains after a meal", "A type of animal", "A drink"], "Food that remains after a meal", "Comida que sobra después de una comida.", "Leftovers are food that remains after a meal.", "Reading", "♻️");
gq("gq136", "Culture and Skills - Britain's Favourite Food", "¿Qué significa ingredient?", ["One item used to make a dish", "A restaurant customer", "A school bag"], "One item used to make a dish", "Un ingrediente es un elemento usado para preparar un plato.", "An ingredient is one item used to make a dish.", "Reading", "🥕");

gq("gq137", "Writing - Favourite Dish", "Para describir un plato, ¿qué información es útil?", ["name, ingredients, origin and opinion", "only your age", "only the time"], "name, ingredients, origin and opinion", "Nombre, ingredientes, origen y opinión.", "A food description can include name, ingredients, origin and opinion.", "Reading", "✍️");
gq("gq138", "Writing - Favourite Dish", "Completa: It's a dish ___ flour, eggs and milk.", ["with", "at", "under"], "with", "Es un plato con harina, huevos y leche.", "It's a dish with flour, eggs and milk.", "Reading", "🥞");
gq("gq139", "Writing - Favourite Dish", "Completa: It's ___ Argentina.", ["from", "under", "between"], "from", "Es de Argentina.", "It's from Argentina.", "Reading", "🇦🇷");
gq("gq140", "Writing - Favourite Dish", "Completa: It ___ really delicious.", ["is", "are", "do"], "is", "Es realmente delicioso.", "It is really delicious.", "Reading", "😋");
gq("gq141", "Writing - Favourite Dish", "Elige una opinión adecuada para comida.", ["I love it.", "It's in the wardrobe.", "It is twelve o'clock."], "I love it.", "Me encanta.", "I love it.", "Reading", "❤️");

gq("gq142", "CLIL Biology - Animal Habits", "¿Qué tipo de animal es un delfín?", ["mammal", "reptile", "plant"], "mammal", "El delfín es un mamífero.", "A dolphin is a mammal.", "Reading", "🐬");
gq("gq143", "CLIL Biology - Animal Habits", "¿Qué tipo de animal es un cocodrilo?", ["reptile", "mammal", "fish school"], "reptile", "El cocodrilo es un reptil.", "A crocodile is a reptile.", "Reading", "🐊");
gq("gq144", "CLIL Biology - Animal Habits", "¿Qué animal es gigantesco?", ["blue whale", "mouse", "hamster"], "blue whale", "La ballena azul es gigantesca.", "A blue whale is gigantic.", "Reading", "🐋");
gq("gq145", "CLIL Biology - Animal Habits", "¿Cómo se llama un grupo de delfines?", ["pod", "school of desks", "pack lunch"], "pod", "Un grupo de delfines puede llamarse pod.", "A group of dolphins is called a pod.", "Reading", "🐬");
gq("gq146", "CLIL Biology - Animal Habits", "¿Cómo se llama un grupo de peces?", ["school of fish", "pod of tables", "team of fruit"], "school of fish", "Un grupo de peces es un cardumen.", "A group of fish is a school of fish.", "Reading", "🐟");
gq("gq147", "CLIL Biology - Animal Habits", "¿Qué es un predator?", ["An animal that hunts other animals", "An animal's breakfast table", "A type of drink"], "An animal that hunts other animals", "Un depredador caza otros animales.", "A predator hunts other animals.", "Reading", "🦈");
gq("gq148", "CLIL Biology - Animal Habits", "¿Qué es prey?", ["An animal hunted by another animal", "A reusable bag", "A food shop"], "An animal hunted by another animal", "Una presa es un animal cazado por otro.", "Prey is an animal hunted by another animal.", "Reading", "🐟");
gq("gq149", "CLIL Biology - Animal Habits", "¿Qué significa in danger?", ["At risk", "At breakfast", "At school"], "At risk", "En riesgo / en peligro.", "In danger means at risk.", "Reading", "⚠️");
gq("gq150", "CLIL Biology - Animal Habits", "¿Qué problema ambiental menciona la unidad?", ["plastic pollution", "too many books", "school uniforms"], "plastic pollution", "Contaminación plástica.", "Plastic pollution.", "Reading", "🧴");
gq("gq151", "CLIL Biology - Animal Habits", "¿Qué acción ayuda a reducir plástico?", ["Use a reusable bag", "Use more disposable bags", "Throw plastic into the sea"], "Use a reusable bag", "Usar una bolsa reutilizable.", "Use a reusable bag.", "Reading", "🛍️");
gq("gq152", "CLIL Biology - Animal Habits", "¿Por qué algunos peces viven en grupos?", ["For protection", "To use laptops", "To cook dinner"], "For protection", "Vivir en grupos puede dar protección.", "Fish can live in groups for protection.", "Reading", "🐟");
gq("gq153", "CLIL Biology - Animal Habits", "¿Qué hacen algunos tiburones en vez de dormir como humanos?", ["They rest while moving or keeping alert.", "They cook dinner.", "They live in classrooms."], "They rest while moving or keeping alert.", "Algunos tiburones descansan manteniéndose activos o alertas.", "Some sharks rest while staying active or alert.", "Reading", "🦈");
gq("gq154", "CLIL Biology - Animal Habits", "¿Qué usan los delfines para comunicarse?", ["Sounds", "Cookbooks", "Furniture"], "Sounds", "Los delfines se comunican mediante sonidos.", "Dolphins communicate with sounds.", "Reading", "🐬");
gq("gq155", "CLIL Biology - Animal Habits", "¿Qué significa keep eyes open?", ["Mantener los ojos abiertos", "Cerrar los ojos", "Comer rápido"], "Mantener los ojos abiertos", "Mantener los ojos abiertos", "Keep eyes open", "Reading", "👀");
gq("gq156", "CLIL Biology - Animal Habits", "¿Qué significa tear food apart?", ["Desgarrar la comida", "Cocinar arroz", "Beber agua"], "Desgarrar la comida", "Desgarrar la comida", "Tear food apart", "Reading", "🦷");

gq("gq157", "Sustainable Development - Food Waste", "¿Qué acción ayuda a evitar desperdicio?", ["Freeze food you can't eat now", "Throw good food away immediately", "Buy much more than you need"], "Freeze food you can't eat now", "Congelar comida que no puedes comer ahora ayuda a evitar desperdicio.", "Freeze food you can't eat now.", "Reading", "❄️");
gq("gq158", "Sustainable Development - Food Waste", "¿Qué acción ayuda a evitar desperdicio?", ["Give extra food to someone who can use it", "Throw it away while fresh", "Ignore leftovers"], "Give extra food to someone who can use it", "Dar comida extra a quien pueda usarla ayuda a evitar desperdicio.", "Give extra food to someone who can use it.", "Reading", "🤝");
gq("gq159", "Sustainable Development - Food Waste", "¿Qué acción ayuda a evitar desperdicio?", ["Try food before rejecting it", "Throw away unopened food", "Never check what you have"], "Try food before rejecting it", "Probar la comida antes de descartarla puede reducir desperdicio.", "Try food before rejecting it.", "Reading", "🍽️");
gq("gq160", "Sustainable Development - Food Waste", "¿Qué acción ayuda a evitar desperdicio?", ["Use recipes for leftovers", "Always cook too much", "Throw leftovers away"], "Use recipes for leftovers", "Usar recetas para aprovechar sobras reduce desperdicio.", "Use recipes for leftovers.", "Reading", "♻️");
gq("gq161", "Sustainable Development - Food Waste", "¿Qué acción ayuda en un restaurante?", ["Ask for a box for leftovers", "Leave all extra food", "Order too much on purpose"], "Ask for a box for leftovers", "Pedir un recipiente para llevar las sobras puede evitar desperdicio.", "Ask for a box for leftovers.", "Reading", "🥡");

gq("gq162", "Fast Finishers - Unit 4", "Shopping list: lettuce belongs to ___.", ["vegetables", "drinks", "dairy"], "vegetables", "La lechuga es una verdura.", "Lettuce is a vegetable.", "Grammar", "🥬");
gq("gq163", "Fast Finishers - Unit 4", "Shopping list: onion belongs to ___.", ["vegetables", "drinks", "dairy"], "vegetables", "La cebolla es una verdura.", "Onion is a vegetable.", "Grammar", "🧅");
gq("gq164", "Fast Finishers - Unit 4", "Shopping list: milk belongs to ___.", ["dairy", "meat", "fruit"], "dairy", "La leche pertenece a los lácteos.", "Milk is dairy.", "Grammar", "🥛");
gq("gq165", "Fast Finishers - Unit 4", "Shopping list: apple belongs to ___.", ["fruit", "meat", "dairy"], "fruit", "La manzana es una fruta.", "Apple is fruit.", "Grammar", "🍎");
gq("gq166", "Fast Finishers - Unit 4", "Completa: Mr Barr ___ to school.", ["goes", "go", "don't go"], "goes", "El Sr. Barr va a la escuela.", "Mr Barr goes to school.", "Grammar", "🏫");
gq("gq167", "Fast Finishers - Unit 4", "Completa negativo: Mr Barr ___ TV.", ["doesn't watch", "don't watches", "doesn't watches"], "doesn't watch", "El Sr. Barr no mira televisión.", "Mr Barr doesn't watch TV.", "Grammar", "📺");
gq("gq168", "Fast Finishers - Unit 4", "Completa: Pip ___ a bike.", ["rides", "ride", "does ride not"], "rides", "Pip anda en bicicleta.", "Pip rides a bike.", "Grammar", "🚲");
gq("gq169", "Fast Finishers - Unit 4", "Completa: Pip ___ a shower.", ["has", "have", "don't have"], "has", "Pip se ducha.", "Pip has a shower.", "Grammar", "🚿");
gq("gq170", "Fast Finishers - Unit 4", "Entrevista: How often ___ your blog?", ["do you write", "does you write", "you write do"], "do you write", "¿Con qué frecuencia escribes en tu blog?", "How often do you write your blog?", "Grammar", "💻");
gq("gq171", "Fast Finishers - Unit 4", "Entrevista: What ___ your husband ___ social media?", ["does / use", "do / uses", "does / uses"], "does / use", "¿Qué redes sociales usa tu esposo?", "What social media does your husband use?", "Grammar", "📱");

gq("gq172", "Fun Time - Healthy Lifestyle", "Healthy habit: How often do you eat junk food?", ["Not very often", "Every meal", "All the time"], "Not very often", "No muy seguido.", "Not very often.", "Reading", "🍟");
gq("gq173", "Fun Time - Healthy Lifestyle", "Healthy habit: How often do you walk to school?", ["Sometimes or often", "Never if possible", "Only once a year"], "Sometimes or often", "Caminar con cierta frecuencia es una opción saludable.", "Walking regularly is a healthy habit.", "Reading", "🚶");
gq("gq174", "Fun Time - Healthy Lifestyle", "Healthy habit: Do you like vegetables?", ["Yes, I do.", "No, never.", "Only as decoration."], "Yes, I do.", "Sí, me gustan las verduras.", "Yes, I do.", "Reading", "🥕");
gq("gq175", "Fun Time - Healthy Lifestyle", "Healthy habit: Do you play any sport?", ["Yes, I do.", "No, I never move.", "Only once every ten years."], "Yes, I do.", "Sí, practico algún deporte.", "Yes, I do.", "Reading", "⚽");

gq("gq176", "Review Unit 4", "Encuentra el intruso.", ["apple", "orange", "strawberry", "egg"], "egg", "Egg no es una fruta.", "Egg is not a fruit.", "Grammar", "🥚");
gq("gq177", "Review Unit 4", "Encuentra el intruso.", ["tuna", "beef", "rice", "chicken"], "rice", "Rice no es carne ni pescado.", "Rice is not meat or fish.", "Grammar", "🍚");
gq("gq178", "Review Unit 4", "Encuentra el intruso.", ["onion", "salt", "lettuce", "peas"], "salt", "Salt no es una verdura.", "Salt is not a vegetable.", "Grammar", "🧂");
gq("gq179", "Review Unit 4", "Encuentra el intruso.", ["cheese", "tomato", "grapes", "apple"], "cheese", "Cheese no es fruta ni verdura.", "Cheese is not fruit or vegetables.", "Grammar", "🧀");
gq("gq180", "Review Unit 4", "Encuentra el intruso.", ["milk", "pasta", "water", "fruit juice"], "pasta", "Pasta no es una bebida.", "Pasta is not a drink.", "Grammar", "🍝");
gq("gq181", "Review Unit 4", "Completa: For breakfast, Tom ___ an egg and fruit juice.", ["has", "have", "having"], "has", "Tom desayuna un huevo y jugo de frutas.", "For breakfast, Tom has an egg and fruit juice.", "Grammar", "🥚");
gq("gq182", "Review Unit 4", "Completa: For lunch, Tom ___ a sandwich.", ["has", "have", "does"], "has", "Tom come un sándwich en el almuerzo.", "For lunch, Tom has a sandwich.", "Grammar", "🥪");
gq("gq183", "Review Unit 4", "Completa: For dinner, he ___ rice with chicken.", ["has", "have", "do"], "has", "Para cenar, come arroz con pollo.", "For dinner, he has rice with chicken.", "Grammar", "🍚");
gq("gq184", "Review Unit 4", "Reescribe en negativo: I work in a school.", ["I don't work in a school.", "I doesn't work in a school.", "I not work school."], "I don't work in a school.", "No trabajo en una escuela.", "I don't work in a school.", "Grammar", "🏫");
gq("gq185", "Review Unit 4", "Reescribe en negativo: My sister has a shower once a month.", ["My sister doesn't have a shower once a month.", "My sister don't has a shower.", "My sister doesn't has a shower."], "My sister doesn't have a shower once a month.", "Mi hermana no se ducha una vez al mes.", "My sister doesn't have a shower once a month.", "Grammar", "🚿");
gq("gq186", "Review Unit 4", "Reescribe en negativo: I run to school twice a day.", ["I don't run to school twice a day.", "I doesn't run to school.", "I don't runs school."], "I don't run to school twice a day.", "No corro a la escuela dos veces al día.", "I don't run to school twice a day.", "Grammar", "🏃");
gq("gq187", "Review Unit 4", "Pregunta: ___ you phone your friends?", ["Do", "Does", "Are"], "Do", "¿Llamas a tus amigos?", "Do you phone your friends?", "Grammar", "📱");
gq("gq188", "Review Unit 4", "Pregunta: ___ your parents work at the weekend?", ["Do", "Does", "Are"], "Do", "¿Tus padres trabajan el fin de semana?", "Do your parents work at the weekend?", "Grammar", "💼");
gq("gq189", "Review Unit 4", "Pregunta: ___ your teacher speak English at home?", ["Does", "Do", "Is"], "Does", "¿Tu profesor/a habla inglés en casa?", "Does your teacher speak English at home?", "Grammar", "🗣️");
gq("gq190", "Review Unit 4", "Pregunta: ___ your friends have lunch at school?", ["Do", "Does", "Are"], "Do", "¿Tus amigos almuerzan en la escuela?", "Do your friends have lunch at school?", "Grammar", "🍱");
gq("gq191", "Review Unit 4", "Pregunta: ___ your best friend text you?", ["Does", "Do", "Is"], "Does", "¿Tu mejor amigo/a te manda mensajes?", "Does your best friend text you?", "Grammar", "📱");
gq("gq192", "Review Unit 4", "Completa el diálogo: How often do you eat sandwiches for lunch? ___", ["Every morning.", "A sandwich.", "At school building."], "Every morning.", "Todas las mañanas.", "How often do you eat sandwiches for lunch? Every morning.", "Grammar", "🥪");
gq("gq193", "Review Unit 4", "Completa: ___ do you make your packed lunch?", ["When", "How often only", "Who food"], "When", "¿Cuándo preparas tu almuerzo para llevar?", "When do you make your packed lunch?", "Grammar", "🍱");
gq("gq194", "Review Unit 4", "Completa: What time do you get up? ___", ["At half past six.", "A salad.", "Twice a week food."], "At half past six.", "A las seis y media.", "At half past six.", "Grammar", "⏰");

gq("gq195", "Mini Real-life Task - Study Habits", "¿Qué consejo ayuda a concentrarte?", ["Start your homework when you're not hungry.", "Skip all meals.", "Never take breaks."], "Start your homework when you're not hungry.", "Empezar la tarea sin hambre puede ayudar a concentrarse.", "Start your homework when you're not hungry.", "Reading", "🧠");
gq("gq196", "Mini Real-life Task - Study Habits", "¿Qué hábito puede ayudar durante el estudio?", ["Have water nearby.", "Drink nothing all day.", "Eat only junk food."], "Have water nearby.", "Tener agua cerca puede ser útil.", "Have water nearby.", "Reading", "💧");
gq("gq197", "Mini Real-life Task - Study Habits", "¿Qué hábito puede ayudar a descansar durante el estudio?", ["Take short breaks.", "Study without stopping for ten hours.", "Never move."], "Take short breaks.", "Tomar descansos cortos puede ayudar.", "Take short breaks.", "Reading", "⏱️");

const unit4 = {
  unit: "Unid. 4: Our Food",
  source: "I Succeed in English 2 Studentsbook and Workbook",
  year: "2026",
  DIALOGUES,
  GRAMMAR_QUIZZES: quizzes,
  READING_COMPREHENSION,
  SENTENCES,
  VOCABULARY
};

fs.writeFileSync('src/units/unit4.json', JSON.stringify(unit4, null, 2), 'utf8');
console.log('Unit 4 saved successfully. Quizzes:', quizzes.length);
