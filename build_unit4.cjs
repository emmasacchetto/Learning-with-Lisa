const fs = require('fs');

const DIALOGUES = [
  {
    "id": "u4_func_lunch_habits_1",
    "category": "Asking about habits - Lunch",
    "vars": [],
    "lines": [
      { "speaker": "A", "eng": "What have you got for lunch?", "spa": "¿Qué tienes para almorzar?", "emoji": "🥪" },
      { "speaker": "B", "eng": "I've got a chicken sandwich and an apple.", "spa": "Tengo un sándwich de pollo y una manzana.", "emoji": "🍎" },
      { "speaker": "A", "eng": "How often do you have a sandwich for lunch?", "spa": "¿Con qué frecuencia comes un sándwich en el almuerzo?", "emoji": "🔁" },
      { "speaker": "B", "eng": "Twice a week.", "spa": "Dos veces por semana.", "emoji": "2️⃣" },
      { "speaker": "A", "eng": "What do you usually drink?", "spa": "¿Qué bebes normalmente?", "emoji": "🥤" },
      { "speaker": "B", "eng": "I usually drink water.", "spa": "Normalmente tomo agua.", "emoji": "💧" }
    ]
  },
  {
    "id": "u4_func_lunch_habits_2",
    "category": "Asking about habits - Packed lunch",
    "vars": [],
    "lines": [
      { "speaker": "A", "eng": "When do you make your packed lunch?", "spa": "¿Cuándo preparas tu almuerzo para llevar?", "emoji": "🍱" },
      { "speaker": "B", "eng": "In the morning, before school.", "spa": "Por la mañana, antes de ir a la escuela.", "emoji": "🌅" },
      { "speaker": "A", "eng": "What do you usually put in it?", "spa": "¿Qué le pones normalmente?", "emoji": "🥪" },
      { "speaker": "B", "eng": "A sandwich, some fruit and a bottle of water.", "spa": "Un sándwich, fruta y una botella de agua.", "emoji": "🍎" },
      { "speaker": "A", "eng": "Do you ever take junk food?", "spa": "¿Alguna vez llevas comida chatarra?", "emoji": "🍟" },
      { "speaker": "B", "eng": "No, I don't.", "spa": "No.", "emoji": "❌" }
    ]
  },
  {
    "id": "u4_func_breakfast",
    "category": "Asking about habits - Breakfast",
    "vars": [],
    "lines": [
      { "speaker": "A", "eng": "What do you usually eat for breakfast?", "spa": "¿Qué comes normalmente en el desayuno?", "emoji": "🥣" },
      { "speaker": "B", "eng": "I usually have toast and fruit.", "spa": "Normalmente como tostadas y fruta.", "emoji": "🍞" },
      { "speaker": "A", "eng": "What do you drink?", "spa": "¿Qué bebes?", "emoji": "🥛" },
      { "speaker": "B", "eng": "I drink milk.", "spa": "Tomo leche.", "emoji": "🥛" },
      { "speaker": "A", "eng": "How often do you have eggs?", "spa": "¿Con qué frecuencia comes huevos?", "emoji": "🥚" },
      { "speaker": "B", "eng": "Once a week.", "spa": "Una vez por semana.", "emoji": "1️⃣" }
    ]
  },
  {
    "id": "u4_func_dinner",
    "category": "Asking about habits - Dinner",
    "vars": [],
    "lines": [
      { "speaker": "A", "eng": "What do you usually have for dinner?", "spa": "¿Qué cenas normalmente?", "emoji": "🍽️" },
      { "speaker": "B", "eng": "We usually have rice, vegetables and chicken.", "spa": "Normalmente comemos arroz, verduras y pollo.", "emoji": "🍚" },
      { "speaker": "A", "eng": "Do you cook dinner?", "spa": "¿Cocinas la cena?", "emoji": "👩‍🍳" },
      { "speaker": "B", "eng": "No, I don't. My dad usually cooks.", "spa": "No. Mi papá cocina normalmente.", "emoji": "👨‍🍳" },
      { "speaker": "A", "eng": "Does he cook every day?", "spa": "¿Cocina todos los días?", "emoji": "📅" },
      { "speaker": "B", "eng": "Yes, he does.", "spa": "Sí.", "emoji": "✅" }
    ]
  },
  {
    "id": "u4_func_school_cook_interview",
    "category": "Present simple questions - Interview",
    "vars": [],
    "lines": [
      { "speaker": "A", "eng": "Do you cook at school?", "spa": "¿Cocinas en la escuela?", "emoji": "👨‍🍳" },
      { "speaker": "B", "eng": "Yes, I do. I'm the school cook.", "spa": "Sí. Soy el cocinero de la escuela.", "emoji": "🏫" },
      { "speaker": "A", "eng": "Do you read cookbooks?", "spa": "¿Lees libros de cocina?", "emoji": "📖" },
      { "speaker": "B", "eng": "Yes, I do. I read them for ideas.", "spa": "Sí. Los leo para buscar ideas.", "emoji": "💡" },
      { "speaker": "A", "eng": "What do you cook most often?", "spa": "¿Qué cocinas con más frecuencia?", "emoji": "🍝" },
      { "speaker": "B", "eng": "I often cook pasta and vegetables.", "spa": "A menudo cocino pasta y verduras.", "emoji": "🍝" }
    ]
  },
  {
    "id": "u4_func_takeaway",
    "category": "Culture - Takeaway food",
    "vars": [],
    "lines": [
      { "speaker": "A", "eng": "What's your favourite takeaway food?", "spa": "¿Cuál es tu comida para llevar favorita?", "emoji": "🥡" },
      { "speaker": "B", "eng": "I love vegetable curry.", "spa": "Me encanta el curry de verduras.", "emoji": "🍛" },
      { "speaker": "A", "eng": "How often do you have it?", "spa": "¿Con qué frecuencia lo comes?", "emoji": "🔁" },
      { "speaker": "B", "eng": "About once a month.", "spa": "Aproximadamente una vez al mes.", "emoji": "1️⃣" },
      { "speaker": "A", "eng": "Where do you get it from?", "spa": "¿Dónde lo compras?", "emoji": "🏪" },
      { "speaker": "B", "eng": "From a small restaurant near my house.", "spa": "En un restaurante pequeño cerca de mi casa.", "emoji": "🍽️" }
    ]
  },
  {
    "id": "u4_func_food_origin",
    "category": "Food origins",
    "vars": [],
    "lines": [
      { "speaker": "A", "eng": "Where is pasta from?", "spa": "¿De dónde es la pasta?", "emoji": "🍝" },
      { "speaker": "B", "eng": "It's from Italy.", "spa": "Es de Italia.", "emoji": "🇮🇹" },
      { "speaker": "A", "eng": "What about fish and chips?", "spa": "¿Y el fish and chips?", "emoji": "🐟" },
      { "speaker": "B", "eng": "It's a famous British dish.", "spa": "Es un plato británico famoso.", "emoji": "🇬🇧" },
      { "speaker": "A", "eng": "Are French fries from France?", "spa": "¿Las papas fritas son de Francia?", "emoji": "🍟" },
      { "speaker": "B", "eng": "Not originally. Food names can be surprising!", "spa": "No originalmente. ¡Los nombres de comidas pueden sorprender!", "emoji": "😮" }
    ]
  },
  {
    "id": "u4_func_food_waste",
    "category": "Sustainable food habits",
    "vars": [],
    "lines": [
      { "speaker": "A", "eng": "What do you do with leftover food?", "spa": "¿Qué haces con la comida que sobra?", "emoji": "♻️" },
      { "speaker": "B", "eng": "We keep it in the fridge and eat it the next day.", "spa": "La guardamos en la heladera y la comemos al día siguiente.", "emoji": "🧊" },
      { "speaker": "A", "eng": "Do you throw food away?", "spa": "¿Tiras comida?", "emoji": "🗑️" },
      { "speaker": "B", "eng": "Only when we can't use it safely.", "spa": "Solo cuando no podemos usarla de forma segura.", "emoji": "✅" },
      { "speaker": "A", "eng": "How can we reduce food waste?", "spa": "¿Cómo podemos reducir el desperdicio de alimentos?", "emoji": "🌱" },
      { "speaker": "B", "eng": "We can buy only what we need and use leftovers.", "spa": "Podemos comprar solo lo que necesitamos y aprovechar las sobras.", "emoji": "♻️" }
    ]
  },
  {
    "id": "u4_func_sea_animals",
    "category": "CLIL Biology - Animal habits",
    "vars": [],
    "lines": [
      { "speaker": "A", "eng": "Do dolphins live alone?", "spa": "¿Los delfines viven solos?", "emoji": "🐬" },
      { "speaker": "B", "eng": "No, they don't. They live in groups called pods.", "spa": "No. Viven en grupos llamados manadas o pods.", "emoji": "👥" },
      { "speaker": "A", "eng": "Do sharks sleep like humans?", "spa": "¿Los tiburones duermen como los humanos?", "emoji": "🦈" },
      { "speaker": "B", "eng": "Not exactly. Some sharks rest while they keep moving.", "spa": "No exactamente. Algunos tiburones descansan mientras siguen moviéndose.", "emoji": "🌊" },
      { "speaker": "A", "eng": "What do blue whales eat?", "spa": "¿Qué comen las ballenas azules?", "emoji": "🐋" },
      { "speaker": "B", "eng": "They eat huge amounts of small sea animals.", "spa": "Comen enormes cantidades de pequeños animales marinos.", "emoji": "🦐" }
    ]
  },
  {
    "id": "u4_func_menu",
    "category": "Food and drink - Menu",
    "vars": [],
    "lines": [
      { "speaker": "A", "eng": "What would you like in your sandwich?", "spa": "¿Qué te gustaría en tu sándwich?", "emoji": "🥪" },
      { "speaker": "B", "eng": "Chicken, lettuce and tomato, please.", "spa": "Pollo, lechuga y tomate, por favor.", "emoji": "🍅" },
      { "speaker": "A", "eng": "Would you like a drink?", "spa": "¿Te gustaría algo para beber?", "emoji": "🥤" },
      { "speaker": "B", "eng": "Yes, a fruit juice, please.", "spa": "Sí, un jugo de frutas, por favor.", "emoji": "🧃" },
      { "speaker": "A", "eng": "Anything else?", "spa": "¿Algo más?", "emoji": "❓" },
      { "speaker": "B", "eng": "No, thank you.", "spa": "No, gracias.", "emoji": "😊" }
    ]
  }
];

const READING_COMPREHENSION = [
  {
    "category": "Our Food - School Lunch",
    "readingText": "Mia takes a packed lunch to school four days a week. She usually has a chicken and tomato sandwich, an apple and a bottle of water. On Fridays, she buys lunch at school. She likes the vegetable pasta, but she doesn't eat the mushroom soup because she doesn't like mushrooms. Mia prepares her packed lunch in the morning before school.",
    "emoji": "🍱",
    "questions": [
      { "q": "How often does Mia take a packed lunch?", "a": "Four days a week", "options": ["Four days a week", "Once a year", "Never"] },
      { "q": "What does she usually have in her packed lunch?", "a": "A chicken and tomato sandwich, an apple and water", "options": ["A chicken and tomato sandwich, an apple and water", "Only sweets", "Fish and chips every day"] },
      { "q": "Why doesn't she eat the mushroom soup?", "a": "She doesn't like mushrooms", "options": ["She doesn't like mushrooms", "She doesn't like water", "She has no lunch"] },
      { "q": "When does she prepare her lunch?", "a": "In the morning before school", "options": ["In the morning before school", "At midnight", "Once a month"] }
    ]
  },
  {
    "category": "Our Food - A School Cook",
    "readingText": "Mr Green is the cook at River School. He starts work early and makes lunch for hundreds of students. He reads cookbooks and talks to students about their favourite meals. He often cooks pasta, rice, chicken and fresh vegetables. He doesn't serve the same meal every day, and he rarely makes very spicy food. He says the students' favourite meal is macaroni and cheese.",
    "emoji": "👨‍🍳",
    "questions": [
      { "q": "What is Mr Green's job?", "a": "He is a school cook", "options": ["He is a school cook", "He is a football player", "He is a doctor"] },
      { "q": "Does he read cookbooks?", "a": "Yes, he does.", "options": ["Yes, he does.", "No, he doesn't."] },
      { "q": "Does he serve the same meal every day?", "a": "No, he doesn't.", "options": ["Yes, he does.", "No, he doesn't."] },
      { "q": "What meal is very popular with the students?", "a": "Macaroni and cheese", "options": ["Macaroni and cheese", "Raw onions", "Only water"] }
    ]
  },
  {
    "category": "Culture and Skills - Takeaway Food in Britain",
    "readingText": "Takeaway food is very popular in Britain, and many favourite dishes have international influences. People often order Indian, Chinese or Italian-style food, but the British versions are not always exactly the same as dishes from those countries. Some well-known names can be misleading: a dish may have a foreign name but a different history. This shows how food changes when cultures meet.",
    "emoji": "🥡",
    "questions": [
      { "q": "Is takeaway food popular in Britain?", "a": "Yes, it is.", "options": ["Yes, it is.", "No, it isn't."] },
      { "q": "What cuisines are mentioned?", "a": "Indian, Chinese and Italian", "options": ["Indian, Chinese and Italian", "Only British", "Only Mexican"] },
      { "q": "Are British versions always identical to dishes from other countries?", "a": "No, they aren't.", "options": ["Yes, they are.", "No, they aren't."] },
      { "q": "What can happen when cultures meet?", "a": "Food can change", "options": ["Food can change", "Countries disappear", "People stop eating"] }
    ]
  },
  {
    "category": "Our Food - Favourite Dish",
    "readingText": "My favourite dish is a vegetable pancake. It has flour, eggs, milk, onion and a little cheese. I usually eat it for dinner, about twice a month. My family makes it at home, so it is always fresh. I like it because it is simple, warm and delicious.",
    "emoji": "🥞",
    "questions": [
      { "q": "What is the favourite dish?", "a": "A vegetable pancake", "options": ["A vegetable pancake", "Fish and chips", "A milk shake"] },
      { "q": "What ingredients does it have?", "a": "Flour, eggs, milk, onion and cheese", "options": ["Flour, eggs, milk, onion and cheese", "Only water", "Tuna and grapes"] },
      { "q": "How often does the person eat it?", "a": "About twice a month", "options": ["About twice a month", "Every hour", "Once every ten years"] },
      { "q": "Why does the person like it?", "a": "It is simple, warm and delicious", "options": ["It is simple, warm and delicious", "It is cold and dangerous", "It is a school subject"] }
    ]
  },
  {
    "category": "CLIL Biology - Sea Animal Habits",
    "readingText": "Sea animals have very different habits. Dolphins are mammals and often live in groups called pods. They communicate with sounds and can work together. Some sharks do not sleep in the same way humans do; they may rest while they keep moving. Fish often stay in schools because being in a group can give protection. Blue whales are gigantic mammals and need large amounts of food.",
    "emoji": "🌊",
    "questions": [
      { "q": "What kind of animals are dolphins?", "a": "Mammals", "options": ["Mammals", "Plants", "Birds"] },
      { "q": "What is a group of dolphins called?", "a": "A pod", "options": ["A pod", "A cookbook", "A wardrobe"] },
      { "q": "Why do fish stay in schools?", "a": "For protection", "options": ["For protection", "To cook", "To use computers"] },
      { "q": "Are blue whales small animals?", "a": "No, they aren't.", "options": ["Yes, they are.", "No, they aren't."] }
    ]
  },
  {
    "category": "Sustainable Food - Leftovers",
    "readingText": "Leo's family tries not to waste food. Before shopping, they check what is already in the fridge. They buy only what they need. If there is extra cooked food, they keep it safely and use it in another meal. Sometimes they freeze food for later. At restaurants, they ask for a box when they cannot finish their meal.",
    "emoji": "♻️",
    "questions": [
      { "q": "What do they do before shopping?", "a": "They check the fridge", "options": ["They check the fridge", "They throw food away", "They buy everything"] },
      { "q": "Do they buy more than they need?", "a": "No, they don't.", "options": ["Yes, they do.", "No, they don't."] },
      { "q": "What do they sometimes do with extra food?", "a": "They freeze it", "options": ["They freeze it", "They put it in a school bag", "They throw it in the sea"] },
      { "q": "What do they ask for at restaurants?", "a": "A box for leftovers", "options": ["A box for leftovers", "A football", "A bookcase"] }
    ]
  },
  {
    "category": "Review Unit 4 - Daily Food",
    "readingText": "Tom usually has an egg, toast and fruit juice for breakfast. For lunch, he has a sandwich with chicken, lettuce and tomato. He drinks water with lunch. For dinner, he often has rice with vegetables and fish. He doesn't eat junk food every day, but he sometimes has ice cream at the weekend.",
    "emoji": "🍽️",
    "questions": [
      { "q": "What does Tom have for breakfast?", "a": "An egg, toast and fruit juice", "options": ["An egg, toast and fruit juice", "Only fish", "Only milk"] },
      { "q": "What is in his lunch sandwich?", "a": "Chicken, lettuce and tomato", "options": ["Chicken, lettuce and tomato", "Rice and milk", "Tuna and grapes"] },
      { "q": "What does he drink with lunch?", "a": "Water", "options": ["Water", "Oil", "Soup"] },
      { "q": "Does he eat junk food every day?", "a": "No, he doesn't.", "options": ["Yes, he does.", "No, he doesn't."] }
    ]
  }
];

const SENTENCES = [
  { "eng": "Pasta is from Italy.", "spa": "La pasta es de Italia.", "category": "Food Origins", "emoji": "🍝" },
  { "eng": "Fish and chips is a famous British dish.", "spa": "Fish and chips es un plato británico famoso.", "category": "Food Origins", "emoji": "🐟" },
  { "eng": "Croissants are associated with France.", "spa": "Los croissants se asocian con Francia.", "category": "Food Origins", "emoji": "🥐" },
  { "eng": "I like doughnuts.", "spa": "Me gustan las donas.", "category": "Food Origins", "emoji": "🍩" },
  { "eng": "I like chicken and tomato sandwiches.", "spa": "Me gustan los sándwiches de pollo y tomate.", "category": "Food", "emoji": "🥪" },
  { "eng": "Apples are fruit.", "spa": "Las manzanas son frutas.", "category": "Food", "emoji": "🍎" },
  { "eng": "Lettuce is a vegetable.", "spa": "La lechuga es una verdura.", "category": "Food", "emoji": "🥬" },
  { "eng": "Salmon is a fish.", "spa": "El salmón es un pescado.", "category": "Food", "emoji": "🐟" },
  { "eng": "Cheddar is a type of cheese.", "spa": "El cheddar es un tipo de queso.", "category": "Food", "emoji": "🧀" },
  { "eng": "Milk is a dairy product.", "spa": "La leche es un producto lácteo.", "category": "Food", "emoji": "🥛" },
  { "eng": "Pasta is rich in carbohydrates.", "spa": "La pasta es rica en carbohidratos.", "category": "Food", "emoji": "🍝" },
  { "eng": "Water is a drink.", "spa": "El agua es una bebida.", "category": "Drink", "emoji": "💧" },
  { "eng": "I usually drink fruit juice at breakfast.", "spa": "Normalmente tomo jugo de frutas en el desayuno.", "category": "Drink", "emoji": "🧃" },
  { "eng": "She likes strawberry milk shakes.", "spa": "A ella le gustan los batidos de frutilla.", "category": "Drink", "emoji": "🥤" },
  { "eng": "I don't cook.", "spa": "No cocino.", "category": "Present Simple Negative", "emoji": "👩‍🍳" },
  { "eng": "You don't eat fish.", "spa": "No comes pescado.", "category": "Present Simple Negative", "emoji": "🐟" },
  { "eng": "He doesn't cook.", "spa": "Él no cocina.", "category": "Present Simple Negative", "emoji": "👨‍🍳" },
  { "eng": "She doesn't like mushrooms.", "spa": "A ella no le gustan los hongos.", "category": "Present Simple Negative", "emoji": "🍄" },
  { "eng": "We don't eat meat.", "spa": "No comemos carne.", "category": "Present Simple Negative", "emoji": "🥩" },
  { "eng": "They don't drink milk.", "spa": "Ellos no toman leche.", "category": "Present Simple Negative", "emoji": "🥛" },
  { "eng": "My brother doesn't like tuna.", "spa": "A mi hermano no le gusta el atún.", "category": "Present Simple Negative", "emoji": "🐟" },
  { "eng": "Do you cook?", "spa": "¿Cocinas?", "category": "Present Simple Questions", "emoji": "👩‍🍳" },
  { "eng": "Yes, I do.", "spa": "Sí.", "category": "Present Simple Questions", "emoji": "✅" },
  { "eng": "Do you eat meat?", "spa": "¿Comes carne?", "category": "Present Simple Questions", "emoji": "🥩" },
  { "eng": "No, I don't.", "spa": "No.", "category": "Present Simple Questions", "emoji": "❌" },
  { "eng": "Does he cook?", "spa": "¿Él cocina?", "category": "Present Simple Questions", "emoji": "👨‍🍳" },
  { "eng": "Yes, he does.", "spa": "Sí.", "category": "Present Simple Questions", "emoji": "✅" },
  { "eng": "Does she like fish?", "spa": "¿A ella le gusta el pescado?", "category": "Present Simple Questions", "emoji": "🐟" },
  { "eng": "No, she doesn't.", "spa": "No.", "category": "Present Simple Questions", "emoji": "❌" },
  { "eng": "What do you do at the weekend?", "spa": "¿Qué haces el fin de semana?", "category": "Present Simple Questions", "emoji": "📅" },
  { "eng": "When do you play football?", "spa": "¿Cuándo juegas al fútbol?", "category": "Present Simple Questions", "emoji": "⚽" },
  { "eng": "Where do you go to school?", "spa": "¿Dónde vas a la escuela?", "category": "Present Simple Questions", "emoji": "🏫" },
  { "eng": "What does your horse eat?", "spa": "¿Qué come tu caballo?", "category": "Present Simple Questions", "emoji": "🐎" },
  { "eng": "How often do you cook?", "spa": "¿Con qué frecuencia cocinas?", "category": "Frequency", "emoji": "🔁" },
  { "eng": "I cook every day.", "spa": "Cocino todos los días.", "category": "Frequency", "emoji": "📅" },
  { "eng": "I eat takeaway food once a month.", "spa": "Como comida para llevar una vez al mes.", "category": "Frequency", "emoji": "🥡" },
  { "eng": "We play football three times a week.", "spa": "Jugamos al fútbol tres veces por semana.", "category": "Frequency", "emoji": "⚽" },
  { "eng": "We travel twice a year.", "spa": "Viajamos dos veces al año.", "category": "Frequency", "emoji": "✈️" },
  { "eng": "What do you usually eat for lunch?", "spa": "¿Qué comes normalmente en el almuerzo?", "category": "Asking about Habits", "emoji": "🍱" },
  { "eng": "I usually have a salad.", "spa": "Normalmente como una ensalada.", "category": "Asking about Habits", "emoji": "🥗" },
  { "eng": "When do you make your packed lunch?", "spa": "¿Cuándo preparas tu almuerzo para llevar?", "category": "Asking about Habits", "emoji": "🍱" },
  { "eng": "I make it in the morning.", "spa": "Lo preparo por la mañana.", "category": "Asking about Habits", "emoji": "🌅" },
  { "eng": "What time do you get up?", "spa": "¿A qué hora te levantas?", "category": "Asking about Habits", "emoji": "⏰" },
  { "eng": "I get up at six o'clock.", "spa": "Me levanto a las seis.", "category": "Asking about Habits", "emoji": "🕕" },
  { "eng": "Takeaway food is popular in Britain.", "spa": "La comida para llevar es popular en Gran Bretaña.", "category": "Culture and Skills", "emoji": "🥡" },
  { "eng": "Food can change when cultures meet.", "spa": "La comida puede cambiar cuando las culturas se encuentran.", "category": "Culture and Skills", "emoji": "🌍" },
  { "eng": "This dish has fresh ingredients.", "spa": "Este plato tiene ingredientes frescos.", "category": "Culture and Skills", "emoji": "🥬" },
  { "eng": "I love this pancake because it's delicious.", "spa": "Me encanta este panqueque porque es delicioso.", "category": "Culture and Skills", "emoji": "🥞" },
  { "eng": "Leftovers are food from a previous meal.", "spa": "Las sobras son comida que queda de una comida anterior.", "category": "Sustainable Food", "emoji": "♻️" },
  { "eng": "We use leftovers in another meal.", "spa": "Usamos las sobras en otra comida.", "category": "Sustainable Food", "emoji": "♻️" },
  { "eng": "We freeze extra food for later.", "spa": "Congelamos comida extra para más adelante.", "category": "Sustainable Food", "emoji": "❄️" },
  { "eng": "We use reusable bags when we go shopping.", "spa": "Usamos bolsas reutilizables cuando vamos de compras.", "category": "Sustainable Food", "emoji": "🛍️" },
  { "eng": "Dolphins are mammals.", "spa": "Los delfines son mamíferos.", "category": "CLIL Biology", "emoji": "🐬" },
  { "eng": "Crocodiles are reptiles.", "spa": "Los cocodrilos son reptiles.", "category": "CLIL Biology", "emoji": "🐊" },
  { "eng": "Dolphins live in groups called pods.", "spa": "Los delfines viven en grupos llamados pods.", "category": "CLIL Biology", "emoji": "🐬" },
  { "eng": "Fish often live in schools.", "spa": "Los peces suelen vivir en cardúmenes.", "category": "CLIL Biology", "emoji": "🐟" },
  { "eng": "Some sharks rest while they move.", "spa": "Algunos tiburones descansan mientras se mueven.", "category": "CLIL Biology", "emoji": "🦈" },
  { "eng": "Blue whales are gigantic mammals.", "spa": "Las ballenas azules son mamíferos gigantescos.", "category": "CLIL Biology", "emoji": "🐋" },
  { "eng": "A predator hunts prey.", "spa": "Un depredador caza presas.", "category": "CLIL Biology", "emoji": "🦈" },
  { "eng": "Plastic pollution is dangerous for sea animals.", "spa": "La contaminación plástica es peligrosa para los animales marinos.", "category": "CLIL Biology", "emoji": "🧴" },
  { "eng": "Use a reusable bag to reduce plastic.", "spa": "Usa una bolsa reutilizable para reducir el plástico.", "category": "CLIL Biology", "emoji": "🛍️" },
  { "eng": "My favourite meal is pasta with vegetables.", "spa": "Mi comida favorita es pasta con verduras.", "category": "Food and Cooking", "emoji": "🍝" },
  { "eng": "The school cook reads cookbooks.", "spa": "El cocinero escolar lee libros de cocina.", "category": "Food and Cooking", "emoji": "📖" },
  { "eng": "Mac 'n' cheese is a popular dish.", "spa": "Los macarrones con queso son un plato popular.", "category": "Food and Cooking", "emoji": "🧀" },
  { "eng": "A packed lunch is food you take with you.", "spa": "Un almuerzo para llevar es comida que llevas contigo.", "category": "Food and Cooking", "emoji": "🍱" },
  { "eng": "Junk food should not be every meal.", "spa": "La comida chatarra no debería estar en todas las comidas.", "category": "Healthy Lifestyle", "emoji": "🍟" }
];

const VOCABULARY = [
  { "eng": "Apple", "spa": "Manzana", "category": "Food", "emoji": "🍎" },
  { "eng": "Beef", "spa": "Carne de vaca", "category": "Food", "emoji": "🥩" },
  { "eng": "Cheese", "spa": "Queso", "category": "Food", "emoji": "🧀" },
  { "eng": "Chicken", "spa": "Pollo", "category": "Food", "emoji": "🍗" },
  { "eng": "Egg", "spa": "Huevo", "category": "Food", "emoji": "🥚" },
  { "eng": "Grapes", "spa": "Uvas", "category": "Food", "emoji": "🍇" },
  { "eng": "Lettuce", "spa": "Lechuga", "category": "Food", "emoji": "🥬" },
  { "eng": "Mushroom", "spa": "Hongo / champiñón", "category": "Food", "emoji": "🍄" },
  { "eng": "Oil", "spa": "Aceite", "category": "Food", "emoji": "🫒" },
  { "eng": "Onion", "spa": "Cebolla", "category": "Food", "emoji": "🧅" },
  { "eng": "Orange", "spa": "Naranja", "category": "Food", "emoji": "🍊" },
  { "eng": "Pasta", "spa": "Pasta", "category": "Food", "emoji": "🍝" },
  { "eng": "Peas", "spa": "Arvejas / guisantes", "category": "Food", "emoji": "🫛" },
  { "eng": "Potato", "spa": "Papa", "category": "Food", "emoji": "🥔" },
  { "eng": "Rice", "spa": "Arroz", "category": "Food", "emoji": "🍚" },
  { "eng": "Salmon", "spa": "Salmón", "category": "Food", "emoji": "🐟" },
  { "eng": "Salt and pepper", "spa": "Sal y pimienta", "category": "Food", "emoji": "🧂" },
  { "eng": "Strawberry", "spa": "Frutilla / fresa", "category": "Food", "emoji": "🍓" },
  { "eng": "Tomato", "spa": "Tomate", "category": "Food", "emoji": "🍅" },
  { "eng": "Tuna", "spa": "Atún", "category": "Food", "emoji": "🐟" },
  { "eng": "Fruit juice", "spa": "Jugo de frutas", "category": "Drink", "emoji": "🧃" },
  { "eng": "Milk", "spa": "Leche", "category": "Drink", "emoji": "🥛" },
  { "eng": "Milk shake", "spa": "Batido / licuado", "category": "Drink", "emoji": "🥤" },
  { "eng": "Water", "spa": "Agua", "category": "Drink", "emoji": "💧" },
  { "eng": "Carbohydrates", "spa": "Carbohidratos", "category": "Food Types and Ingredients", "emoji": "🍞" },
  { "eng": "Cheddar", "spa": "Queso cheddar", "category": "Food Types and Ingredients", "emoji": "🧀" },
  { "eng": "Condiments", "spa": "Condimentos", "category": "Food Types and Ingredients", "emoji": "🧂" },
  { "eng": "Cooking", "spa": "Cocina / cocinar", "category": "Food Types and Ingredients", "emoji": "👩‍🍳" },
  { "eng": "Dairy", "spa": "Lácteos", "category": "Food Types and Ingredients", "emoji": "🥛" },
  { "eng": "Feta", "spa": "Queso feta", "category": "Food Types and Ingredients", "emoji": "🧀" },
  { "eng": "Fruit", "spa": "Fruta", "category": "Food Types and Ingredients", "emoji": "🍎" },
  { "eng": "Hot", "spa": "Picante / caliente", "category": "Food Types and Ingredients", "emoji": "🌶️" },
  { "eng": "Meat", "spa": "Carne", "category": "Food Types and Ingredients", "emoji": "🥩" },
  { "eng": "Mozzarella", "spa": "Mozzarella", "category": "Food Types and Ingredients", "emoji": "🧀" },
  { "eng": "Salad", "spa": "Ensalada", "category": "Food Types and Ingredients", "emoji": "🥗" },
  { "eng": "Type", "spa": "Tipo", "category": "Food Types and Ingredients", "emoji": "🏷️" },
  { "eng": "Vegetable", "spa": "Verdura / vegetal", "category": "Food Types and Ingredients", "emoji": "🥕" },
  { "eng": "Doughnut", "spa": "Dona / rosquilla", "category": "Food Origins and Dishes", "emoji": "🍩" },
  { "eng": "Fish and chips", "spa": "Pescado con papas fritas", "category": "Food Origins and Dishes", "emoji": "🐟" },
  { "eng": "French fries", "spa": "Papas fritas", "category": "Food Origins and Dishes", "emoji": "🍟" },
  { "eng": "Sandwich", "spa": "Sándwich", "category": "Food Origins and Dishes", "emoji": "🥪" },
  { "eng": "Vegetarian", "spa": "Vegetariano/a", "category": "Food Origins and Dishes", "emoji": "🥗" },
  { "eng": "Make dinner", "spa": "Preparar la cena", "category": "Food Origins and Dishes", "emoji": "🍽️" },
  { "eng": "Go shopping", "spa": "Ir de compras", "category": "Food Origins and Dishes", "emoji": "🛒" },
  { "eng": "Without", "spa": "Sin", "category": "Food Origins and Dishes", "emoji": "🚫" },
  { "eng": "Grass", "spa": "Pasto / hierba", "category": "Food Origins and Dishes", "emoji": "🌿" },
  { "eng": "Every day", "spa": "Todos los días", "category": "Frequency", "emoji": "📅" },
  { "eng": "How often?", "spa": "¿Con qué frecuencia?", "category": "Frequency", "emoji": "🔁" },
  { "eng": "Once a month", "spa": "Una vez al mes", "category": "Frequency", "emoji": "1️⃣" },
  { "eng": "Three times a week", "spa": "Tres veces por semana", "category": "Frequency", "emoji": "3️⃣" },
  { "eng": "Twice a year", "spa": "Dos veces al año", "category": "Frequency", "emoji": "2️⃣" },
  { "eng": "Cookbook", "spa": "Libro de cocina / recetario", "category": "Food and Cooking Context", "emoji": "📖" },
  { "eng": "Interview", "spa": "Entrevista", "category": "Food and Cooking Context", "emoji": "🎤" },
  { "eng": "Mac 'n' cheese", "spa": "Macarrones con queso", "category": "Food and Cooking Context", "emoji": "🧀" },
  { "eng": "Peanut butter and jelly sandwich", "spa": "Sándwich de mantequilla de maní y mermelada", "category": "Food and Cooking Context", "emoji": "🥪" },
  { "eng": "School cook", "spa": "Cocinero/a escolar", "category": "Food and Cooking Context", "emoji": "👨‍🍳" },
  { "eng": "Delicious", "spa": "Delicioso/a", "category": "Food and Cooking Context", "emoji": "😋" },
  { "eng": "Junk food", "spa": "Comida chatarra", "category": "Food and Cooking Context", "emoji": "🍟" },
  { "eng": "Packed lunch", "spa": "Almuerzo para llevar", "category": "Food and Cooking Context", "emoji": "🍱" },
  { "eng": "Adventurous", "spa": "Aventurero/a", "category": "Culture - Food", "emoji": "🧭" },
  { "eng": "Complicated", "spa": "Complicado/a", "category": "Culture - Food", "emoji": "🧩" },
  { "eng": "Curry", "spa": "Curry", "category": "Culture - Food", "emoji": "🍛" },
  { "eng": "Dish", "spa": "Plato / preparación", "category": "Culture - Food", "emoji": "🍽️" },
  { "eng": "Exist", "spa": "Existir", "category": "Culture - Food", "emoji": "✨" },
  { "eng": "Fresh", "spa": "Fresco/a", "category": "Culture - Food", "emoji": "🥬" },
  { "eng": "Ingredient", "spa": "Ingrediente", "category": "Culture - Food", "emoji": "🥕" },
  { "eng": "Instead of", "spa": "En lugar de", "category": "Culture - Food", "emoji": "🔄" },
  { "eng": "International", "spa": "Internacional", "category": "Culture - Food", "emoji": "🌍" },
  { "eng": "Leftovers", "spa": "Sobras", "category": "Culture - Food", "emoji": "♻️" },
  { "eng": "Meal", "spa": "Comida", "category": "Culture - Food", "emoji": "🍽️" },
  { "eng": "Modern trend", "spa": "Tendencia moderna", "category": "Culture - Food", "emoji": "📈" },
  { "eng": "Order", "spa": "Pedir / ordenar", "category": "Culture - Food", "emoji": "📝" },
  { "eng": "Originally", "spa": "Originalmente", "category": "Culture - Food", "emoji": "🕰️" },
  { "eng": "Pancake", "spa": "Panqueque", "category": "Culture - Food", "emoji": "🥞" },
  { "eng": "Roast dinner", "spa": "Cena asada / asado al horno", "category": "Culture - Food", "emoji": "🍖" },
  { "eng": "Similar to", "spa": "Similar a", "category": "Culture - Food", "emoji": "≈" },
  { "eng": "Takeaway food", "spa": "Comida para llevar", "category": "Culture - Food", "emoji": "🥡" },
  { "eng": "Thick sauce", "spa": "Salsa espesa", "category": "Culture - Food", "emoji": "🥣" },
  { "eng": "Treat", "spa": "Darse un gusto / premio", "category": "Culture - Food", "emoji": "🍰" },
  { "eng": "Blue whale", "spa": "Ballena azul", "category": "CLIL Biology - Sea Animals", "emoji": "🐋" },
  { "eng": "Cold-blooded animal", "spa": "Animal de sangre fría", "category": "CLIL Biology - Sea Animals", "emoji": "🦎" },
  { "eng": "Crocodile", "spa": "Cocodrilo", "category": "CLIL Biology - Sea Animals", "emoji": "🐊" },
  { "eng": "Dolphin", "spa": "Delfín", "category": "CLIL Biology - Sea Animals", "emoji": "🐬" },
  { "eng": "Mammal", "spa": "Mamífero", "category": "CLIL Biology - Sea Animals", "emoji": "🐋" },
  { "eng": "Orca", "spa": "Orca", "category": "CLIL Biology - Sea Animals", "emoji": "🐋" },
  { "eng": "Reptile", "spa": "Reptil", "category": "CLIL Biology - Sea Animals", "emoji": "🐊" },
  { "eng": "Sea animal", "spa": "Animal marino", "category": "CLIL Biology - Sea Animals", "emoji": "🌊" },
  { "eng": "Shark", "spa": "Tiburón", "category": "CLIL Biology - Sea Animals", "emoji": "🦈" },
  { "eng": "School of fish", "spa": "Cardumen", "category": "CLIL Biology - Sea Animals", "emoji": "🐟" },
  { "eng": "Pod", "spa": "Grupo de cetáceos / pod", "category": "CLIL Biology - Sea Animals", "emoji": "🐬" },
  { "eng": "Predator", "spa": "Depredador", "category": "CLIL Biology - Sea Animals", "emoji": "🦈" },
  { "eng": "Prey", "spa": "Presa", "category": "CLIL Biology - Sea Animals", "emoji": "🐟" },
  { "eng": "Species", "spa": "Especie", "category": "CLIL Biology - Sea Animals", "emoji": "🧬" },
  { "eng": "All the time", "spa": "Todo el tiempo", "category": "CLIL Biology - Animal Actions", "emoji": "⏱️" },
  { "eng": "Attack", "spa": "Atacar", "category": "CLIL Biology - Animal Actions", "emoji": "⚡" },
  { "eng": "Belong to", "spa": "Pertenecer a", "category": "CLIL Biology - Animal Actions", "emoji": "🔗" },
  { "eng": "Boat", "spa": "Bote", "category": "CLIL Biology - Animal Actions", "emoji": "🚤" },
  { "eng": "Chemical reaction", "spa": "Reacción química", "category": "CLIL Biology - Animal Actions", "emoji": "🧪" },
  { "eng": "Chew", "spa": "Masticar", "category": "CLIL Biology - Animal Actions", "emoji": "🦷" },
  { "eng": "Communicate", "spa": "Comunicarse", "category": "CLIL Biology - Animal Actions", "emoji": "💬" },
  { "eng": "Cry", "spa": "Llorar", "category": "CLIL Biology - Animal Actions", "emoji": "😭" },
  { "eng": "Dangerous", "spa": "Peligroso/a", "category": "CLIL Biology - Animal Actions", "emoji": "⚠️" },
  { "eng": "Dinosaur", "spa": "Dinosaurio", "category": "CLIL Biology - Animal Actions", "emoji": "🦖" },
  { "eng": "Enjoy", "spa": "Disfrutar", "category": "CLIL Biology - Animal Actions", "emoji": "😊" },
  { "eng": "Friendly", "spa": "Amistoso/a", "category": "CLIL Biology - Animal Actions", "emoji": "🙂" },
  { "eng": "Gigantic", "spa": "Gigantesco/a", "category": "CLIL Biology - Animal Actions", "emoji": "🐋" },
  { "eng": "Human", "spa": "Humano/a", "category": "CLIL Biology - Animal Actions", "emoji": "🧑" },
  { "eng": "In danger", "spa": "En peligro", "category": "CLIL Biology - Animal Actions", "emoji": "⚠️" },
  { "eng": "Jump", "spa": "Saltar", "category": "CLIL Biology - Animal Actions", "emoji": "⬆️" },
  { "eng": "Keep eyes open", "spa": "Mantener los ojos abiertos", "category": "CLIL Biology - Animal Actions", "emoji": "👀" },
  { "eng": "Kill", "spa": "Matar", "category": "CLIL Biology - Animal Actions", "emoji": "⚠️" },
  { "eng": "Live", "spa": "Vivir", "category": "CLIL Biology - Animal Actions", "emoji": "🏠" },
  { "eng": "Living relative", "spa": "Pariente vivo", "category": "CLIL Biology - Animal Actions", "emoji": "🧬" },
  { "eng": "Lonely", "spa": "Solo/a", "category": "CLIL Biology - Animal Actions", "emoji": "😔" },
  { "eng": "Own", "spa": "Propio/a", "category": "CLIL Biology - Animal Actions", "emoji": "🔑" },
  { "eng": "Plastic pollution", "spa": "Contaminación plástica", "category": "CLIL Biology - Animal Actions", "emoji": "🧴" },
  { "eng": "Portion", "spa": "Porción", "category": "CLIL Biology - Animal Actions", "emoji": "🍽️" },
  { "eng": "Produce", "spa": "Producir", "category": "CLIL Biology - Animal Actions", "emoji": "⚙️" },
  { "eng": "Protection", "spa": "Protección", "category": "CLIL Biology - Animal Actions", "emoji": "🛡️" },
  { "eng": "Reduce the amount", "spa": "Reducir la cantidad", "category": "CLIL Biology - Animal Actions", "emoji": "📉" },
  { "eng": "Rest", "spa": "Descansar", "category": "CLIL Biology - Animal Actions", "emoji": "😴" },
  { "eng": "Reusable bag", "spa": "Bolsa reutilizable", "category": "CLIL Biology - Animal Actions", "emoji": "🛍️" },
  { "eng": "Sharp", "spa": "Afilado/a", "category": "CLIL Biology - Animal Actions", "emoji": "🔪" },
  { "eng": "Silly", "spa": "Tonto/a", "category": "CLIL Biology - Animal Actions", "emoji": "😜" },
  { "eng": "Swallow air", "spa": "Tragar aire", "category": "CLIL Biology - Animal Actions", "emoji": "💨" },
  { "eng": "Tear food apart", "spa": "Desgarrar la comida", "category": "CLIL Biology - Animal Actions", "emoji": "🦷" }
];

module.exports = { DIALOGUES, READING_COMPREHENSION, SENTENCES, VOCABULARY };
