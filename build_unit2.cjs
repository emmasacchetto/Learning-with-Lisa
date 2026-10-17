const fs = require('fs');

const DIALOGUES = [
  {
    "id": "u2_func_activity_centre_1",
    "category": "Asking about location - Activity centre",
    "vars": [],
    "lines": [
      { "speaker": "A", "eng": "Welcome to Green Hill Activity Centre.", "spa": "Bienvenido/a al Centro de Actividades Green Hill.", "emoji": "🏕️" },
      { "speaker": "B", "eng": "Thank you. Where are the bedrooms?", "spa": "Gracias. ¿Dónde están los dormitorios?", "emoji": "🛏️" },
      { "speaker": "A", "eng": "They're upstairs, next to the bathrooms.", "spa": "Están arriba, al lado de los baños.", "emoji": "⬆️" },
      { "speaker": "B", "eng": "Is there a wi-fi code?", "spa": "¿Hay una contraseña de wifi?", "emoji": "📶" },
      { "speaker": "A", "eng": "Yes, there is. It's on the noticeboard.", "spa": "Sí. Está en el tablón de anuncios.", "emoji": "✅" },
      { "speaker": "B", "eng": "Great, thanks!", "spa": "¡Genial, gracias!", "emoji": "😊" }
    ]
  },
  {
    "id": "u2_func_activity_centre_2",
    "category": "Asking about location - Facilities",
    "vars": [],
    "lines": [
      { "speaker": "A", "eng": "Are there any computers here?", "spa": "¿Hay computadoras aquí?", "emoji": "💻" },
      { "speaker": "B", "eng": "Yes, there are. They're in the computer room.", "spa": "Sí. Están en la sala de computación.", "emoji": "🖥️" },
      { "speaker": "A", "eng": "Where's the games room?", "spa": "¿Dónde está la sala de juegos?", "emoji": "🎮" },
      { "speaker": "B", "eng": "It's downstairs, opposite the dining room.", "spa": "Está abajo, enfrente del comedor.", "emoji": "⬇️" },
      { "speaker": "A", "eng": "Are there any games consoles?", "spa": "¿Hay consolas de videojuegos?", "emoji": "🎮" },
      { "speaker": "B", "eng": "Yes, there are two.", "spa": "Sí, hay dos.", "emoji": "2️⃣" }
    ]
  },
  {
    "id": "u2_func_house_tour",
    "category": "Home - House tour",
    "vars": [],
    "lines": [
      { "speaker": "A", "eng": "Welcome to my new house!", "spa": "¡Bienvenido/a a mi casa nueva!", "emoji": "🏠" },
      { "speaker": "B", "eng": "Wow! Is there a garden?", "spa": "¡Guau! ¿Hay jardín?", "emoji": "🌳" },
      { "speaker": "A", "eng": "Yes, there is. It's behind the house.", "spa": "Sí. Está detrás de la casa.", "emoji": "🌿" },
      { "speaker": "B", "eng": "Are there any bedrooms upstairs?", "spa": "¿Hay dormitorios arriba?", "emoji": "🛏️" },
      { "speaker": "A", "eng": "Yes, there are three bedrooms.", "spa": "Sí, hay tres dormitorios.", "emoji": "3️⃣" },
      { "speaker": "B", "eng": "What's your favourite room?", "spa": "¿Cuál es tu habitación favorita?", "emoji": "❓" },
      { "speaker": "A", "eng": "The living room. It's very comfortable.", "spa": "La sala de estar. Es muy cómoda.", "emoji": "🛋️" }
    ]
  },
  {
    "id": "u2_func_birthday_shop",
    "category": "There is/are - Birthday shopping",
    "vars": [],
    "lines": [
      { "speaker": "A", "eng": "We need a cake for the party.", "spa": "Necesitamos una torta para la fiesta.", "emoji": "🎂" },
      { "speaker": "B", "eng": "Is there a chocolate cake in the shop?", "spa": "¿Hay una torta de chocolate en la tienda?", "emoji": "🍫" },
      { "speaker": "A", "eng": "Yes, there is.", "spa": "Sí.", "emoji": "✅" },
      { "speaker": "B", "eng": "Are there any balloons?", "spa": "¿Hay globos?", "emoji": "🎈" },
      { "speaker": "A", "eng": "No, there aren't, but there are some posters.", "spa": "No, pero hay algunos pósteres.", "emoji": "🖼️" },
      { "speaker": "B", "eng": "That's fine. Let's get the cake!", "spa": "Está bien. ¡Compremos la torta!", "emoji": "🛍️" }
    ]
  },
  {
    "id": "u2_func_my_bedroom",
    "category": "Home - Describing a bedroom",
    "vars": [],
    "lines": [
      { "speaker": "A", "eng": "What's in your bedroom?", "spa": "¿Qué hay en tu dormitorio?", "emoji": "🛏️" },
      { "speaker": "B", "eng": "There's a bed, a desk and a wardrobe.", "spa": "Hay una cama, un escritorio y un ropero.", "emoji": "🪑" },
      { "speaker": "A", "eng": "Is there a bookcase?", "spa": "¿Hay una biblioteca?", "emoji": "📚" },
      { "speaker": "B", "eng": "Yes. It's next to the desk.", "spa": "Sí. Está al lado del escritorio.", "emoji": "📖" },
      { "speaker": "A", "eng": "Where's your lamp?", "spa": "¿Dónde está tu lámpara?", "emoji": "💡" },
      { "speaker": "B", "eng": "It's on the desk, under the window.", "spa": "Está sobre el escritorio, debajo de la ventana.", "emoji": "🪟" }
    ]
  },
  {
    "id": "u2_func_holiday_home",
    "category": "Holiday home",
    "vars": [],
    "lines": [
      { "speaker": "A", "eng": "What's your holiday home like?", "spa": "¿Cómo es tu casa de vacaciones?", "emoji": "🏕️" },
      { "speaker": "B", "eng": "It's a small caravan near a lake.", "spa": "Es una casa rodante pequeña cerca de un lago.", "emoji": "🚐" },
      { "speaker": "A", "eng": "How many bedrooms are there?", "spa": "¿Cuántos dormitorios hay?", "emoji": "🛏️" },
      { "speaker": "B", "eng": "There are two small bedrooms.", "spa": "Hay dos dormitorios pequeños.", "emoji": "2️⃣" },
      { "speaker": "A", "eng": "Is there a shower?", "spa": "¿Hay ducha?", "emoji": "🚿" },
      { "speaker": "B", "eng": "Yes, there is, but there isn't a bath.", "spa": "Sí, pero no hay bañera.", "emoji": "🛁" }
    ]
  },
  {
    "id": "u2_func_energy_use",
    "category": "Household equipment and energy",
    "vars": [],
    "lines": [
      { "speaker": "A", "eng": "What appliance do you use every day?", "spa": "¿Qué electrodoméstico usas todos los días?", "emoji": "⚡" },
      { "speaker": "B", "eng": "I use my laptop every day.", "spa": "Uso mi computadora portátil todos los días.", "emoji": "💻" },
      { "speaker": "A", "eng": "How many hours do you use it?", "spa": "¿Cuántas horas la usas?", "emoji": "⏱️" },
      { "speaker": "B", "eng": "About three hours.", "spa": "Unas tres horas.", "emoji": "3️⃣" },
      { "speaker": "A", "eng": "Do you monitor its energy use?", "spa": "¿Controlas su consumo de energía?", "emoji": "📊" },
      { "speaker": "B", "eng": "Yes. I want to save energy.", "spa": "Sí. Quiero ahorrar energía.", "emoji": "🌱" }
    ]
  },
  {
    "id": "u2_func_school_tour",
    "category": "Skills trainer - Showing a place",
    "vars": [],
    "lines": [
      { "speaker": "A", "eng": "Hi, I'm Mia. I'm a new student.", "spa": "Hola, soy Mia. Soy una estudiante nueva.", "emoji": "🎒" },
      { "speaker": "B", "eng": "Hi, Mia. This is our classroom.", "spa": "Hola, Mia. Esta es nuestra aula.", "emoji": "🏫" },
      { "speaker": "A", "eng": "Is this the computer room?", "spa": "¿Esta es la sala de computación?", "emoji": "💻" },
      { "speaker": "B", "eng": "No, it isn't. The computer room is next door.", "spa": "No. La sala de computación está al lado.", "emoji": "🚪" },
      { "speaker": "A", "eng": "Where are the toilets?", "spa": "¿Dónde están los baños?", "emoji": "🚻" },
      { "speaker": "B", "eng": "They're at the end of the hall.", "spa": "Están al final del pasillo.", "emoji": "➡️" }
    ]
  },
  {
    "id": "u2_func_world_time",
    "category": "CLIL Geography - Time zones",
    "vars": [],
    "lines": [
      { "speaker": "A", "eng": "What time is it in London?", "spa": "¿Qué hora es en Londres?", "emoji": "🕛" },
      { "speaker": "B", "eng": "It's midday.", "spa": "Es mediodía.", "emoji": "☀️" },
      { "speaker": "A", "eng": "What time is it in Sydney?", "spa": "¿Qué hora es en Sídney?", "emoji": "🇦🇺" },
      { "speaker": "B", "eng": "It's late in the evening there.", "spa": "Allí es tarde por la noche.", "emoji": "🌙" },
      { "speaker": "A", "eng": "Why is the time different?", "spa": "¿Por qué la hora es diferente?", "emoji": "🌍" },
      { "speaker": "B", "eng": "Because the cities are in different time zones.", "spa": "Porque las ciudades están en zonas horarias diferentes.", "emoji": "🕒" }
    ]
  },
  {
    "id": "u2_func_ideal_room",
    "category": "Mini real-life task - Ideal room",
    "vars": [],
    "lines": [
      { "speaker": "A", "eng": "Tell me about your ideal room.", "spa": "Cuéntame sobre tu habitación ideal.", "emoji": "✨" },
      { "speaker": "B", "eng": "There's a big window and a comfortable sofa.", "spa": "Hay una ventana grande y un sofá cómodo.", "emoji": "🛋️" },
      { "speaker": "A", "eng": "Is there a desk?", "spa": "¿Hay un escritorio?", "emoji": "🪑" },
      { "speaker": "B", "eng": "Yes. It's next to the window.", "spa": "Sí. Está al lado de la ventana.", "emoji": "🪟" },
      { "speaker": "A", "eng": "Why is the room special?", "spa": "¿Por qué la habitación es especial?", "emoji": "💭" },
      { "speaker": "B", "eng": "Because it's bright, quiet and relaxing.", "spa": "Porque es luminosa, tranquila y relajante.", "emoji": "😌" }
    ]
  }
];

const READING_COMPREHENSION = [
  {
    "category": "Home - Nora's House",
    "readingText": "Nora lives in a large house near a forest. There is a garden in front of the house and there are two fruit trees near the gate. Inside, there is a kitchen, a living room, a bathroom and three bedrooms. Nora's favourite room is the living room because it has a big sofa and two comfortable armchairs. Her bedroom is upstairs. There are some stars above her bed and a small desk next to the window.",
    "emoji": "🏠",
    "questions": [
      { "q": "Where is the garden?", "a": "In front of the house", "options": ["In front of the house", "Under the bed", "Inside the bathroom"] },
      { "q": "How many bedrooms are there?", "a": "Three", "options": ["Three", "One", "Five"] },
      { "q": "What is Nora's favourite room?", "a": "The living room", "options": ["The living room", "The bathroom", "The hall"] },
      { "q": "Where is Nora's desk?", "a": "Next to the window", "options": ["Next to the window", "Behind the sofa", "Under the stairs"] }
    ]
  },
  {
    "category": "Home - Birthday Shopping",
    "readingText": "Ben and Lily are preparing a birthday party for their friend. In the first shop, there are some cards and posters, but there aren't any balloons. There is a chocolate cake, but it is very small. In the second shop, there are balloons, presents and a large cake. They buy the large cake and some balloons, then go to the party.",
    "emoji": "🎂",
    "questions": [
      { "q": "Are there any balloons in the first shop?", "a": "No, there aren't.", "options": ["Yes, there are.", "No, there aren't."] },
      { "q": "Is there a chocolate cake in the first shop?", "a": "Yes, there is.", "options": ["Yes, there is.", "No, there isn't."] },
      { "q": "What do they buy?", "a": "A large cake and some balloons", "options": ["A large cake and some balloons", "A laptop and a mirror", "A bed and a sofa"] },
      { "q": "Where do they go after shopping?", "a": "To the party", "options": ["To the party", "To school", "To a football stadium"] }
    ]
  },
  {
    "category": "Culture and Skills - Small Homes",
    "readingText": "In some British cities, people use unusual spaces as homes. One small flat is made from a recycled shipping container. Another modern home is inside a building that once had a completely different public function. Some companies also change old offices into small flats. These homes can be compact, modern and cheaper than traditional houses, and they can give unused buildings a new purpose.",
    "emoji": "♻️",
    "questions": [
      { "q": "What can a shipping container become?", "a": "A small flat", "options": ["A small flat", "A mountain", "A football team"] },
      { "q": "Are all the homes traditional houses?", "a": "No, they aren't.", "options": ["Yes, they are.", "No, they aren't."] },
      { "q": "What can happen to old offices?", "a": "They can become flats", "options": ["They can become flats", "They become oceans", "They become time zones"] },
      { "q": "Why can these homes be useful?", "a": "They give old spaces a new purpose", "options": ["They give old spaces a new purpose", "They use more rooms than castles", "They move countries"] }
    ]
  },
  {
    "category": "Culture and Skills - Childhood Home",
    "readingText": "A famous musician grew up in a semi-detached house in Liverpool. Downstairs, there was a living room and a kitchen. The kitchen was simple, with a sink and a cooker. Upstairs, there were two bedrooms. One bedroom had a bed, a wardrobe, a desk and some posters on the wall. The house had an unusual feature: the toilet was outside, in the garden.",
    "emoji": "🎸",
    "questions": [
      { "q": "What type of house was it?", "a": "A semi-detached house", "options": ["A semi-detached house", "A caravan", "A castle"] },
      { "q": "What rooms were downstairs?", "a": "A living room and a kitchen", "options": ["A living room and a kitchen", "Three bedrooms", "A classroom and a hall"] },
      { "q": "How many bedrooms were upstairs?", "a": "Two", "options": ["Two", "One", "Five"] },
      { "q": "Where was the toilet?", "a": "In the garden", "options": ["In the garden", "In the kitchen", "Under the bed"] }
    ]
  },
  {
    "category": "Holiday Home - Caravan",
    "readingText": "My holiday home is a caravan near a lake. It is small, but it has everything we need. There are two bedrooms, a tiny kitchen and a sitting area. In the kitchen, there is a fridge, a cooker and a sink. There is also a shower, but there isn't a bath. Outside, there are two chairs and a small table.",
    "emoji": "🚐",
    "questions": [
      { "q": "Where is the caravan?", "a": "Near a lake", "options": ["Near a lake", "Inside a school", "On a mountain"] },
      { "q": "How many bedrooms are there?", "a": "Two", "options": ["Two", "Three", "Five"] },
      { "q": "Is there a bath?", "a": "No, there isn't.", "options": ["Yes, there is.", "No, there isn't."] },
      { "q": "What is outside the caravan?", "a": "Two chairs and a small table", "options": ["Two chairs and a small table", "A wardrobe and a cooker", "Three computers"] }
    ]
  },
  {
    "category": "CLIL Geography - One World",
    "readingText": "The Equator divides Earth into the Northern Hemisphere and the Southern Hemisphere. The world has large continents and oceans. Countries can have natural borders such as rivers and mountain ranges. The planet also has different time zones, so two cities can have very different local times at the same moment. Compass points such as north, south, east and west help us describe location.",
    "emoji": "🌍",
    "questions": [
      { "q": "What divides Earth into two hemispheres?", "a": "The Equator", "options": ["The Equator", "A river", "A wardrobe"] },
      { "q": "What can be a natural border?", "a": "A river or a mountain range", "options": ["A river or a mountain range", "A sofa", "A television"] },
      { "q": "Why can two cities have different local times?", "a": "They are in different time zones", "options": ["They are in different time zones", "They have different furniture", "They speak to sofas"] },
      { "q": "What do compass points help describe?", "a": "Location", "options": ["Location", "Hair colour", "Furniture price"] }
    ]
  },
  {
    "category": "Review Unit 2 - Buckingham Palace",
    "readingText": "Buckingham Palace is a famous royal building in London. It is very large and has hundreds of rooms. There are many bedrooms and bathrooms, and there is also a café for visitors. Some areas are open to tourists at certain times of the year. The building is famous around the world.",
    "emoji": "🏰",
    "questions": [
      { "q": "Where is Buckingham Palace?", "a": "In London", "options": ["In London", "In Sydney", "In Rome"] },
      { "q": "Is it a small building?", "a": "No, it isn't.", "options": ["Yes, it is.", "No, it isn't."] },
      { "q": "Are there many rooms?", "a": "Yes, there are.", "options": ["Yes, there are.", "No, there aren't."] },
      { "q": "Is there a café for visitors?", "a": "Yes, there is.", "options": ["Yes, there is.", "No, there isn't."] }
    ]
  }
];

const SENTENCES = [
  { "eng": "I use my laptop every day.", "spa": "Uso mi computadora portátil todos los días.", "category": "Household Equipment", "emoji": "💻" },
  { "eng": "The hairdryer uses electricity.", "spa": "El secador de pelo usa electricidad.", "category": "Household Equipment", "emoji": "💨" },
  { "eng": "We monitor our energy consumption.", "spa": "Controlamos nuestro consumo de energía.", "category": "Energy", "emoji": "📊" },
  { "eng": "Energy use is measured in watts.", "spa": "El uso de energía se mide en vatios.", "category": "Energy", "emoji": "⚡" },
  { "eng": "Solar energy comes from the sun.", "spa": "La energía solar proviene del sol.", "category": "Energy", "emoji": "☀️" },
  { "eng": "Wind energy uses moving air.", "spa": "La energía eólica utiliza el movimiento del aire.", "category": "Energy", "emoji": "💨" },
  { "eng": "There is a bathroom upstairs.", "spa": "Hay un baño arriba.", "category": "Rooms", "emoji": "🚿" },
  { "eng": "There are two bedrooms in the house.", "spa": "Hay dos dormitorios en la casa.", "category": "Rooms", "emoji": "🛏️" },
  { "eng": "The kitchen is downstairs.", "spa": "La cocina está abajo.", "category": "Rooms", "emoji": "🍳" },
  { "eng": "The living room is next to the dining room.", "spa": "La sala de estar está al lado del comedor.", "category": "Rooms", "emoji": "🛋️" },
  { "eng": "There is a sofa in the living room.", "spa": "Hay un sofá en la sala de estar.", "category": "Furniture", "emoji": "🛋️" },
  { "eng": "There is a fridge in the kitchen.", "spa": "Hay una heladera en la cocina.", "category": "Furniture", "emoji": "🧊" },
  { "eng": "There is a wardrobe in my bedroom.", "spa": "Hay un ropero en mi dormitorio.", "category": "Furniture", "emoji": "👕" },
  { "eng": "There are four chairs in the dining room.", "spa": "Hay cuatro sillas en el comedor.", "category": "Furniture", "emoji": "🪑" },
  { "eng": "The mirror is above the washbasin.", "spa": "El espejo está encima del lavabo.", "category": "Prepositions of Place", "emoji": "🪞" },
  { "eng": "The shoes are under the bed.", "spa": "Los zapatos están debajo de la cama.", "category": "Prepositions of Place", "emoji": "👟" },
  { "eng": "The lamp is next to the sofa.", "spa": "La lámpara está al lado del sofá.", "category": "Prepositions of Place", "emoji": "💡" },
  { "eng": "The garden is behind the house.", "spa": "El jardín está detrás de la casa.", "category": "Prepositions of Place", "emoji": "🌳" },
  { "eng": "The chair is between the table and the window.", "spa": "La silla está entre la mesa y la ventana.", "category": "Prepositions of Place", "emoji": "🪑" },
  { "eng": "The sofa is opposite the TV.", "spa": "El sofá está enfrente del televisor.", "category": "Prepositions of Place", "emoji": "📺" },
  { "eng": "There isn't a bath in the bathroom.", "spa": "No hay bañera en el baño.", "category": "There is/are", "emoji": "🛁" },
  { "eng": "There aren't any flowers in the room.", "spa": "No hay flores en la habitación.", "category": "There is/are", "emoji": "🌸" },
  { "eng": "Is there a cake in the shop?", "spa": "¿Hay una torta en la tienda?", "category": "There is/are", "emoji": "🎂" },
  { "eng": "Are there any balloons?", "spa": "¿Hay globos?", "category": "There is/are", "emoji": "🎈" },
  { "eng": "Yes, there is.", "spa": "Sí, hay.", "category": "There is/are", "emoji": "✅" },
  { "eng": "No, there isn't.", "spa": "No, no hay.", "category": "There is/are", "emoji": "❌" },
  { "eng": "Yes, there are.", "spa": "Sí, hay.", "category": "There is/are", "emoji": "✅" },
  { "eng": "No, there aren't.", "spa": "No, no hay.", "category": "There is/are", "emoji": "❌" },
  { "eng": "There are some books on the shelf.", "spa": "Hay algunos libros en el estante.", "category": "Quantifiers", "emoji": "📚" },
  { "eng": "There aren't any computers here.", "spa": "No hay computadoras aquí.", "category": "Quantifiers", "emoji": "💻" },
  { "eng": "Where's the kitchen?", "spa": "¿Dónde está la cocina?", "category": "Asking about Location", "emoji": "🍳" },
  { "eng": "It's downstairs.", "spa": "Está abajo.", "category": "Asking about Location", "emoji": "⬇️" },
  { "eng": "Is there a wi-fi code?", "spa": "¿Hay una contraseña de wifi?", "category": "Asking about Location", "emoji": "📶" },
  { "eng": "It's on the wall.", "spa": "Está en la pared.", "category": "Asking about Location", "emoji": "🧱" },
  { "eng": "Are there any games consoles?", "spa": "¿Hay consolas de videojuegos?", "category": "Asking about Location", "emoji": "🎮" },
  { "eng": "They're in the games room.", "spa": "Están en la sala de juegos.", "category": "Asking about Location", "emoji": "🎮" },
  { "eng": "No problem. Enjoy your stay.", "spa": "No hay problema. Disfruta tu estadía.", "category": "Asking about Location", "emoji": "✨" },
  { "eng": "This is our classroom.", "spa": "Esta es nuestra aula.", "category": "Skills Trainer", "emoji": "🏫" },
  { "eng": "Is this the computer room?", "spa": "¿Esta es la sala de computación?", "category": "Skills Trainer", "emoji": "💻" },
  { "eng": "Where are the toilets?", "spa": "¿Dónde están los baños?", "category": "Skills Trainer", "emoji": "🚻" },
  { "eng": "A cottage is a small traditional house.", "spa": "Una cottage es una casa tradicional pequeña.", "category": "Types of Homes", "emoji": "🏡" },
  { "eng": "A flat is an apartment.", "spa": "Un flat es un departamento.", "category": "Types of Homes", "emoji": "🏢" },
  { "eng": "A caravan can be a holiday home.", "spa": "Una casa rodante puede ser una casa de vacaciones.", "category": "Types of Homes", "emoji": "🚐" },
  { "eng": "A shipping container can become a small home.", "spa": "Un contenedor marítimo puede convertirse en una casa pequeña.", "category": "Small Spaces", "emoji": "📦" },
  { "eng": "Some old offices become flats.", "spa": "Algunas oficinas antiguas se convierten en departamentos.", "category": "Small Spaces", "emoji": "🏢" },
  { "eng": "Recycling can give old materials a new use.", "spa": "El reciclaje puede dar un nuevo uso a materiales antiguos.", "category": "Small Spaces", "emoji": "♻️" },
  { "eng": "My holiday home is near a lake.", "spa": "Mi casa de vacaciones está cerca de un lago.", "category": "Holiday Home", "emoji": "🏞️" },
  { "eng": "There are two bedrooms in the caravan.", "spa": "Hay dos dormitorios en la casa rodante.", "category": "Holiday Home", "emoji": "🚐" },
  { "eng": "There's a fridge, a cooker and a sink.", "spa": "Hay una heladera, una cocina y una pileta.", "category": "Holiday Home", "emoji": "🍳" },
  { "eng": "There's a shower, but there isn't a bath.", "spa": "Hay ducha, pero no hay bañera.", "category": "Holiday Home", "emoji": "🚿" },
  { "eng": "The Equator divides Earth into two hemispheres.", "spa": "El ecuador divide la Tierra en dos hemisferios.", "category": "CLIL Geography", "emoji": "🌐" },
  { "eng": "Europe is in the Northern Hemisphere.", "spa": "Europa está en el hemisferio norte.", "category": "CLIL Geography", "emoji": "🌍" },
  { "eng": "Australia is in the Southern Hemisphere.", "spa": "Australia está en el hemisferio sur.", "category": "CLIL Geography", "emoji": "🇦🇺" },
  { "eng": "A river can be a natural border.", "spa": "Un río puede ser una frontera natural.", "category": "CLIL Geography", "emoji": "🏞️" },
  { "eng": "A mountain range can separate two countries.", "spa": "Una cordillera puede separar dos países.", "category": "CLIL Geography", "emoji": "🏔️" },
  { "eng": "Cities can be in different time zones.", "spa": "Las ciudades pueden estar en diferentes zonas horarias.", "category": "CLIL Geography", "emoji": "🕒" },
  { "eng": "North is opposite south.", "spa": "El norte es opuesto al sur.", "category": "Compass Points", "emoji": "🧭" },
  { "eng": "East is opposite west.", "spa": "El este es opuesto al oeste.", "category": "Compass Points", "emoji": "🧭" },
  { "eng": "It is midday in London.", "spa": "Es mediodía en Londres.", "category": "Time Zones", "emoji": "☀️" },
  { "eng": "It is midnight in another time zone.", "spa": "Es medianoche en otra zona horaria.", "category": "Time Zones", "emoji": "🌙" },
  { "eng": "There are hundreds of rooms in the palace.", "spa": "Hay cientos de habitaciones en el palacio.", "category": "Review Unit 2", "emoji": "🏰" },
  { "eng": "There are many bedrooms and bathrooms.", "spa": "Hay muchos dormitorios y baños.", "category": "Review Unit 2", "emoji": "🛏️" },
  { "eng": "There is a café for visitors.", "spa": "Hay una cafetería para visitantes.", "category": "Review Unit 2", "emoji": "☕" },
  { "eng": "My ideal room has a big window.", "spa": "Mi habitación ideal tiene una ventana grande.", "category": "Mini Real-life Task", "emoji": "🪟" },
  { "eng": "The desk is next to the window.", "spa": "El escritorio está al lado de la ventana.", "category": "Mini Real-life Task", "emoji": "🪑" },
  { "eng": "My ideal place is bright and relaxing.", "spa": "Mi lugar ideal es luminoso y relajante.", "category": "Mini Real-life Task", "emoji": "😌" }
];

const VOCABULARY = [
  { "eng": "Electric shower", "spa": "Ducha eléctrica", "category": "Household Equipment", "emoji": "🚿" },
  { "eng": "Games console", "spa": "Consola de videojuegos", "category": "Household Equipment", "emoji": "🎮" },
  { "eng": "Hairdryer", "spa": "Secador de pelo", "category": "Household Equipment", "emoji": "💨" },
  { "eng": "Iron", "spa": "Plancha", "category": "Household Equipment", "emoji": "👔" },
  { "eng": "Laptop", "spa": "Computadora portátil", "category": "Household Equipment", "emoji": "💻" },
  { "eng": "TV", "spa": "Televisor", "category": "Household Equipment", "emoji": "📺" },
  { "eng": "Energy consumption", "spa": "Consumo de energía", "category": "Energy", "emoji": "⚡" },
  { "eng": "Calculate", "spa": "Calcular", "category": "Energy", "emoji": "🧮" },
  { "eng": "Monitor", "spa": "Controlar / monitorear", "category": "Energy", "emoji": "📊" },
  { "eng": "Per hour", "spa": "Por hora", "category": "Energy", "emoji": "⏱️" },
  { "eng": "Watt", "spa": "Vatio", "category": "Energy", "emoji": "⚡" },
  { "eng": "Coal", "spa": "Carbón", "category": "Energy", "emoji": "⬛" },
  { "eng": "Gas", "spa": "Gas", "category": "Energy", "emoji": "🔥" },
  { "eng": "Oil", "spa": "Petróleo", "category": "Energy", "emoji": "🛢️" },
  { "eng": "Solar energy", "spa": "Energía solar", "category": "Energy", "emoji": "☀️" },
  { "eng": "Water energy", "spa": "Energía hidráulica", "category": "Energy", "emoji": "🌊" },
  { "eng": "Wind energy", "spa": "Energía eólica", "category": "Energy", "emoji": "💨" },
  { "eng": "Bathroom", "spa": "Baño", "category": "Rooms", "emoji": "🚿" },
  { "eng": "Bedroom", "spa": "Dormitorio", "category": "Rooms", "emoji": "🛏️" },
  { "eng": "Dining room", "spa": "Comedor", "category": "Rooms", "emoji": "🍽️" },
  { "eng": "Hall", "spa": "Pasillo / recibidor", "category": "Rooms", "emoji": "🚪" },
  { "eng": "Kitchen", "spa": "Cocina", "category": "Rooms", "emoji": "🍳" },
  { "eng": "Living room", "spa": "Sala de estar", "category": "Rooms", "emoji": "🛋️" },
  { "eng": "Stairs", "spa": "Escaleras", "category": "Rooms", "emoji": "🪜" },
  { "eng": "Garden", "spa": "Jardín", "category": "Rooms", "emoji": "🌳" },
  { "eng": "Computer room", "spa": "Sala de computación", "category": "Rooms", "emoji": "💻" },
  { "eng": "Games room", "spa": "Sala de juegos", "category": "Rooms", "emoji": "🎮" },
  { "eng": "Armchair", "spa": "Sillón", "category": "Furniture and Home Objects", "emoji": "🪑" },
  { "eng": "Bath", "spa": "Bañera", "category": "Furniture and Home Objects", "emoji": "🛁" },
  { "eng": "Bed", "spa": "Cama", "category": "Furniture and Home Objects", "emoji": "🛏️" },
  { "eng": "Bookcase", "spa": "Biblioteca / estantería", "category": "Furniture and Home Objects", "emoji": "📚" },
  { "eng": "Chair", "spa": "Silla", "category": "Furniture and Home Objects", "emoji": "🪑" },
  { "eng": "Chest of drawers", "spa": "Cómoda / cajonera", "category": "Furniture and Home Objects", "emoji": "🗄️" },
  { "eng": "Coffee table", "spa": "Mesa ratona", "category": "Furniture and Home Objects", "emoji": "🪵" },
  { "eng": "Cooker", "spa": "Cocina / artefacto para cocinar", "category": "Furniture and Home Objects", "emoji": "🍳" },
  { "eng": "Cupboard", "spa": "Alacena / armario", "category": "Furniture and Home Objects", "emoji": "🗄️" },
  { "eng": "Fridge", "spa": "Heladera", "category": "Furniture and Home Objects", "emoji": "🧊" },
  { "eng": "Mirror", "spa": "Espejo", "category": "Furniture and Home Objects", "emoji": "🪞" },
  { "eng": "Shower", "spa": "Ducha", "category": "Furniture and Home Objects", "emoji": "🚿" },
  { "eng": "Sink", "spa": "Pileta / fregadero", "category": "Furniture and Home Objects", "emoji": "🚰" },
  { "eng": "Sofa", "spa": "Sofá", "category": "Furniture and Home Objects", "emoji": "🛋️" },
  { "eng": "Table", "spa": "Mesa", "category": "Furniture and Home Objects", "emoji": "🪵" },
  { "eng": "Toilet", "spa": "Inodoro / baño", "category": "Furniture and Home Objects", "emoji": "🚽" },
  { "eng": "Wardrobe", "spa": "Ropero / armario", "category": "Furniture and Home Objects", "emoji": "👕" },
  { "eng": "Washbasin", "spa": "Lavabo", "category": "Furniture and Home Objects", "emoji": "🚰" },
  { "eng": "Window", "spa": "Ventana", "category": "Furniture and Home Objects", "emoji": "🪟" },
  { "eng": "Door", "spa": "Puerta", "category": "Furniture and Home Objects", "emoji": "🚪" },
  { "eng": "Clock", "spa": "Reloj", "category": "Furniture and Home Objects", "emoji": "🕒" },
  { "eng": "Above", "spa": "Encima de", "category": "Prepositions of Place", "emoji": "⬆️" },
  { "eng": "Behind", "spa": "Detrás de", "category": "Prepositions of Place", "emoji": "↩️" },
  { "eng": "Between", "spa": "Entre", "category": "Prepositions of Place", "emoji": "↔️" },
  { "eng": "In front of", "spa": "Delante de", "category": "Prepositions of Place", "emoji": "➡️" },
  { "eng": "Near", "spa": "Cerca de", "category": "Prepositions of Place", "emoji": "📍" },
  { "eng": "Next to", "spa": "Al lado de", "category": "Prepositions of Place", "emoji": "↔️" },
  { "eng": "On", "spa": "Sobre / encima de", "category": "Prepositions of Place", "emoji": "🔝" },
  { "eng": "Opposite", "spa": "Enfrente de", "category": "Prepositions of Place", "emoji": "↔️" },
  { "eng": "Under", "spa": "Debajo de", "category": "Prepositions of Place", "emoji": "⬇️" },
  { "eng": "In", "spa": "En / dentro de", "category": "Prepositions of Place", "emoji": "📦" },
  { "eng": "Balloon", "spa": "Globo", "category": "Celebrations and Objects", "emoji": "🎈" },
  { "eng": "Birthday", "spa": "Cumpleaños", "category": "Celebrations and Objects", "emoji": "🎂" },
  { "eng": "Chocolate birthday cake", "spa": "Torta de cumpleaños de chocolate", "category": "Celebrations and Objects", "emoji": "🍫" },
  { "eng": "Present", "spa": "Regalo", "category": "Celebrations and Objects", "emoji": "🎁" },
  { "eng": "Poster", "spa": "Póster", "category": "Celebrations and Objects", "emoji": "🖼️" },
  { "eng": "Ready", "spa": "Listo/a", "category": "Celebrations and Objects", "emoji": "✅" },
  { "eng": "Shop", "spa": "Tienda", "category": "Celebrations and Objects", "emoji": "🛍️" },
  { "eng": "Bush", "spa": "Arbusto", "category": "Celebrations and Objects", "emoji": "🌿" },
  { "eng": "Activity centre", "spa": "Centro de actividades", "category": "Functions - Location", "emoji": "🏕️" },
  { "eng": "Downstairs", "spa": "Abajo / en la planta baja", "category": "Functions - Location", "emoji": "⬇️" },
  { "eng": "Upstairs", "spa": "Arriba / en la planta alta", "category": "Functions - Location", "emoji": "⬆️" },
  { "eng": "Wi-fi code", "spa": "Contraseña de wifi", "category": "Functions - Location", "emoji": "📶" },
  { "eng": "Comfortable", "spa": "Cómodo/a", "category": "Functions - Location", "emoji": "😌" },
  { "eng": "No problem", "spa": "No hay problema", "category": "Functions - Location", "emoji": "👌" },
  { "eng": "Enjoy your stay", "spa": "Disfruta tu estadía", "category": "Functions - Location", "emoji": "✨" },
  { "eng": "Cottage", "spa": "Casa de campo / cabaña", "category": "Types of Homes", "emoji": "🏡" },
  { "eng": "Flat", "spa": "Departamento", "category": "Types of Homes", "emoji": "🏢" },
  { "eng": "Holiday home", "spa": "Casa de vacaciones", "category": "Types of Homes", "emoji": "🏖️" },
  { "eng": "Semi-detached house", "spa": "Casa pareada / adosada por un lado", "category": "Types of Homes", "emoji": "🏠" },
  { "eng": "Villa", "spa": "Villa / casa grande", "category": "Types of Homes", "emoji": "🏡" },
  { "eng": "Caravan", "spa": "Casa rodante", "category": "Types of Homes", "emoji": "🚐" },
  { "eng": "Shipping container", "spa": "Contenedor marítimo", "category": "Types of Homes", "emoji": "📦" },
  { "eng": "Cheap", "spa": "Barato/a", "category": "Small Spaces", "emoji": "💰" },
  { "eng": "Expensive", "spa": "Caro/a", "category": "Small Spaces", "emoji": "💸" },
  { "eng": "Company", "spa": "Empresa", "category": "Small Spaces", "emoji": "🏢" },
  { "eng": "Recycling", "spa": "Reciclaje", "category": "Small Spaces", "emoji": "♻️" },
  { "eng": "Recycled", "spa": "Reciclado/a", "category": "Small Spaces", "emoji": "♻️" },
  { "eng": "Modern", "spa": "Moderno/a", "category": "Small Spaces", "emoji": "✨" },
  { "eng": "Office", "spa": "Oficina", "category": "Small Spaces", "emoji": "🏢" },
  { "eng": "Public toilet", "spa": "Baño público", "category": "Small Spaces", "emoji": "🚻" },
  { "eng": "Safe", "spa": "Seguro/a", "category": "Small Spaces", "emoji": "🛡️" },
  { "eng": "Shelf", "spa": "Estante", "category": "Small Spaces", "emoji": "📚" },
  { "eng": "Shelves", "spa": "Estantes", "category": "Small Spaces", "emoji": "📚" },
  { "eng": "Space", "spa": "Espacio", "category": "Small Spaces", "emoji": "📐" },
  { "eng": "Homeless people", "spa": "Personas sin hogar", "category": "Small Spaces", "emoji": "🏠" },
  { "eng": "Place", "spa": "Lugar", "category": "Small Spaces", "emoji": "📍" },
  { "eng": "Price", "spa": "Precio", "category": "Small Spaces", "emoji": "💷" },
  { "eng": "Border", "spa": "Frontera", "category": "Geography", "emoji": "🗺️" },
  { "eng": "Continent", "spa": "Continente", "category": "Geography", "emoji": "🌍" },
  { "eng": "Equator", "spa": "Ecuador", "category": "Geography", "emoji": "🌐" },
  { "eng": "Hemisphere", "spa": "Hemisferio", "category": "Geography", "emoji": "🌎" },
  { "eng": "Northern Hemisphere", "spa": "Hemisferio norte", "category": "Geography", "emoji": "⬆️" },
  { "eng": "Southern Hemisphere", "spa": "Hemisferio sur", "category": "Geography", "emoji": "⬇️" },
  { "eng": "Lake", "spa": "Lago", "category": "Geography", "emoji": "🏞️" },
  { "eng": "Mountain", "spa": "Montaña", "category": "Geography", "emoji": "⛰️" },
  { "eng": "Mountain range", "spa": "Cordillera", "category": "Geography", "emoji": "🏔️" },
  { "eng": "Ocean", "spa": "Océano", "category": "Geography", "emoji": "🌊" },
  { "eng": "Ocean current", "spa": "Corriente oceánica", "category": "Geography", "emoji": "🌊" },
  { "eng": "River", "spa": "Río", "category": "Geography", "emoji": "🏞️" },
  { "eng": "Valley", "spa": "Valle", "category": "Geography", "emoji": "🏞️" },
  { "eng": "Time zone", "spa": "Zona horaria", "category": "Geography", "emoji": "🕒" },
  { "eng": "Midday", "spa": "Mediodía", "category": "Geography", "emoji": "☀️" },
  { "eng": "Midnight", "spa": "Medianoche", "category": "Geography", "emoji": "🌙" },
  { "eng": "North", "spa": "Norte", "category": "Compass Points", "emoji": "⬆️" },
  { "eng": "Northeast", "spa": "Noreste", "category": "Compass Points", "emoji": "↗️" },
  { "eng": "East", "spa": "Este", "category": "Compass Points", "emoji": "➡️" },
  { "eng": "Southeast", "spa": "Sudeste", "category": "Compass Points", "emoji": "↘️" },
  { "eng": "South", "spa": "Sur", "category": "Compass Points", "emoji": "⬇️" },
  { "eng": "Southwest", "spa": "Sudoeste", "category": "Compass Points", "emoji": "↙️" },
  { "eng": "West", "spa": "Oeste", "category": "Compass Points", "emoji": "⬅️" },
  { "eng": "Northwest", "spa": "Noroeste", "category": "Compass Points", "emoji": "↖️" }
];

module.exports = { DIALOGUES, READING_COMPREHENSION, SENTENCES, VOCABULARY };
