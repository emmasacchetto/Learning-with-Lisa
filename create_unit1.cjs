const fs = require('fs');

// We will construct Unit 1 using the exact data provided in JSON 3
const unit1 = {
  "unit": "Unid. 1: One World",
  "source": "I Succeed in English 2 Studentsbook and Workbook",
  "year": "2026",
  "DIALOGUES": [
    {
      "id": "u1_func_intro_school",
      "category": "Introductions - New student",
      "vars": [],
      "lines": [
        { "speaker": "A", "eng": "Hi, I'm Alex. I'm new here.", "spa": "Hola, soy Alex. Soy nuevo aquí.", "emoji": "👋" },
        { "speaker": "B", "eng": "Hello, Alex. I'm Maya. Nice to meet you.", "spa": "Hola, Alex. Soy Maya. Mucho gusto.", "emoji": "🙂" },
        { "speaker": "A", "eng": "Nice to meet you, too.", "spa": "Mucho gusto también.", "emoji": "🤝" },
        { "speaker": "B", "eng": "This is Ben. He's in our class.", "spa": "Este es Ben. Está en nuestra clase.", "emoji": "👦" },
        { "speaker": "A", "eng": "Hi, Ben. Great to meet you.", "spa": "Hola, Ben. Encantado de conocerte.", "emoji": "✨" },
        { "speaker": "B", "eng": "Great to meet you, too.", "spa": "Encantado de conocerte también.", "emoji": "😊" }
      ]
    },
    {
      "id": "u1_func_intro_club",
      "category": "Introductions - Club",
      "vars": [],
      "lines": [
        { "speaker": "A", "eng": "Hi, I'm Sofia. Is this the photography club?", "spa": "Hola, soy Sofia. ¿Este es el club de fotografía?", "emoji": "📷" },
        { "speaker": "B", "eng": "Yes, it is. I'm Leo.", "spa": "Sí. Soy Leo.", "emoji": "🙂" },
        { "speaker": "A", "eng": "Nice to meet you, Leo.", "spa": "Mucho gusto, Leo.", "emoji": "🤝" },
        { "speaker": "B", "eng": "Nice to meet you, too. This is Emma, my friend.", "spa": "Mucho gusto también. Esta es Emma, mi amiga.", "emoji": "👧" },
        { "speaker": "A", "eng": "Hi, Emma. Great to meet you.", "spa": "Hola, Emma. Encantada de conocerte.", "emoji": "✨" }
      ]
    },
    {
      "id": "u1_func_personal_info",
      "category": "Personal Information",
      "vars": [],
      "lines": [
        { "speaker": "A", "eng": "Where are you from?", "spa": "¿De dónde eres?", "emoji": "🌍" },
        { "speaker": "B", "eng": "I'm from Argentina. I'm Argentinian.", "spa": "Soy de Argentina. Soy argentino/a.", "emoji": "🇦🇷" },
        { "speaker": "A", "eng": "Is your best friend Argentinian, too?", "spa": "¿Tu mejor amigo/a también es argentino/a?", "emoji": "👯" },
        { "speaker": "B", "eng": "No, she isn't. She's Brazilian.", "spa": "No. Es brasileña.", "emoji": "🇧🇷" },
        { "speaker": "A", "eng": "What's her favourite subject?", "spa": "¿Cuál es su materia favorita?", "emoji": "📚" },
        { "speaker": "B", "eng": "Her favourite subject is art.", "spa": "Su materia favorita es Arte.", "emoji": "🎨" }
      ]
    },
    {
      "id": "u1_func_to_be_questions",
      "category": "To be - Questions and short answers",
      "vars": [],
      "lines": [
        { "speaker": "A", "eng": "Are you worried about the match?", "spa": "¿Estás preocupado/a por el partido?", "emoji": "😟" },
        { "speaker": "B", "eng": "No, I'm not. I'm excited!", "spa": "No. ¡Estoy entusiasmado/a!", "emoji": "😄" },
        { "speaker": "A", "eng": "Is your brother on the team?", "spa": "¿Tu hermano está en el equipo?", "emoji": "🏀" },
        { "speaker": "B", "eng": "Yes, he is.", "spa": "Sí.", "emoji": "✅" },
        { "speaker": "A", "eng": "Are your friends here?", "spa": "¿Tus amigos están aquí?", "emoji": "👥" },
        { "speaker": "B", "eng": "No, they aren't. They're at school.", "spa": "No. Están en la escuela.", "emoji": "🏫" }
      ]
    },
    {
      "id": "u1_func_possessives",
      "category": "Possessive Adjectives",
      "vars": [],
      "lines": [
        { "speaker": "A", "eng": "Is this your laptop?", "spa": "¿Esta es tu computadora portátil?", "emoji": "💻" },
        { "speaker": "B", "eng": "Yes, it's my laptop.", "spa": "Sí, es mi computadora portátil.", "emoji": "✅" },
        { "speaker": "A", "eng": "Whose bag is that?", "spa": "¿De quién es esa mochila?", "emoji": "🎒" },
        { "speaker": "B", "eng": "It's Sara's bag. Her name is on it.", "spa": "Es la mochila de Sara. Su nombre está escrito.", "emoji": "👧" },
        { "speaker": "A", "eng": "And are these your books?", "spa": "¿Y estos son sus libros?", "emoji": "📚" },
        { "speaker": "B", "eng": "No. They're our teacher's books.", "spa": "No. Son los libros de nuestro/a profesor/a.", "emoji": "👩‍🏫" }
      ]
    },
    {
      "id": "u1_func_favourites",
      "category": "Asking about favourites",
      "vars": [],
      "lines": [
        { "speaker": "A", "eng": "What's your favourite colour?", "spa": "¿Cuál es tu color favorito?", "emoji": "🎨" },
        { "speaker": "B", "eng": "My favourite colour is green.", "spa": "Mi color favorito es el verde.", "emoji": "🟢" },
        { "speaker": "A", "eng": "What's your favourite animal?", "spa": "¿Cuál es tu animal favorito?", "emoji": "🐾" },
        { "speaker": "B", "eng": "My favourite animal is the rabbit.", "spa": "Mi animal favorito es el conejo.", "emoji": "🐇" },
        { "speaker": "A", "eng": "What's your favourite day?", "spa": "¿Cuál es tu día favorito?", "emoji": "📅" },
        { "speaker": "B", "eng": "Friday. It's great!", "spa": "El viernes. ¡Es genial!", "emoji": "🎉" }
      ]
    },
    {
      "id": "u1_func_city_guess",
      "category": "Cities and countries",
      "vars": [],
      "lines": [
        { "speaker": "A", "eng": "It's a city in Scotland. It's the capital.", "spa": "Es una ciudad de Escocia. Es la capital.", "emoji": "🏙️" },
        { "speaker": "B", "eng": "Is it Edinburgh?", "spa": "¿Es Edimburgo?", "emoji": "🏰" },
        { "speaker": "A", "eng": "Yes, it is.", "spa": "Sí.", "emoji": "✅" },
        { "speaker": "B", "eng": "Is it a big city?", "spa": "¿Es una ciudad grande?", "emoji": "❓" },
        { "speaker": "A", "eng": "No, it isn't very big, but it's famous for its castle and festivals.", "spa": "No es muy grande, pero es famosa por su castillo y sus festivales.", "emoji": "🎭" }
      ]
    },
    {
      "id": "u1_func_describe_person",
      "category": "Describing people",
      "vars": [],
      "lines": [
        { "speaker": "A", "eng": "Which student is Noah?", "spa": "¿Qué estudiante es Noah?", "emoji": "👤" },
        { "speaker": "B", "eng": "He's the boy with short brown hair and blue eyes.", "spa": "Es el chico de cabello corto y marrón y ojos azules.", "emoji": "👦" },
        { "speaker": "A", "eng": "Is his backpack red?", "spa": "¿Su mochila es roja?", "emoji": "🎒" },
        { "speaker": "B", "eng": "No, it isn't. His backpack is blue.", "spa": "No. Su mochila es azul.", "emoji": "🔵" }
      ]
    }
  ],
  "READING_COMPREHENSION": [
    {
      "category": "One World - Friends from Planet Nova",
      "readingText": "Kai is thirteen and his favourite colour is blue. His pet rabbit, Pip, is grey with yellow eyes. Kai's best friend is Zara. She is twelve, her hair is black and yellow, and she can fly. Their friend Max is thirteen. He is not very tall, but he is very strong. The three friends are from Planet Nova and they are all very different.",
      "emoji": "🪐",
      "questions": [
        { "q": "How old is Kai?", "a": "Thirteen", "options": ["Thirteen", "Twelve", "Ten"] },
        { "q": "What colour is Pip?", "a": "Grey", "options": ["Grey", "Blue", "Black"] },
        { "q": "Who can fly?", "a": "Zara", "options": ["Zara", "Kai", "Max"] },
        { "q": "Is Max very tall?", "a": "No, he isn't.", "options": ["Yes, he is.", "No, he isn't."] }
      ]
    },
    {
      "category": "One World - Basketball Practice",
      "readingText": "Ella meets her friends before school. It is her first basketball practice, so she is a little worried. The practice is at lunchtime, not after school. Later they meet Sam, who has a new laptop. Sam shows them a photo of his favourite basketball player. The player is American and his team is very successful. At the end, Ella discovers that today's practice is cancelled and the next practice is tomorrow.",
      "emoji": "🏀",
      "questions": [
        { "q": "Is it Ella's first basketball practice?", "a": "Yes, it is.", "options": ["Yes, it is.", "No, it isn't."] },
        { "q": "When is the practice?", "a": "At lunchtime", "options": ["At lunchtime", "After school", "At night"] },
        { "q": "What does Sam have?", "a": "A new laptop", "options": ["A new laptop", "A new bike", "A new camera"] },
        { "q": "Where is the basketball player from?", "a": "The USA", "options": ["The USA", "France", "China"] },
        { "q": "When is the next practice?", "a": "Tomorrow", "options": ["Tomorrow", "Today", "Next month"] }
      ]
    },
    {
      "category": "One World - Scottish Cities",
      "readingText": "Scotland is part of the United Kingdom. English, Scots and Scottish Gaelic are official languages, and English is the main language. Edinburgh is the capital and is famous for its castle and festivals. Glasgow is much bigger and is well known for football, art and its port. Inverness is a smaller city in the Highlands. A famous traditional sports event takes place there every year.",
      "emoji": "🏴",
      "questions": [
        { "q": "What is the capital of Scotland?", "a": "Edinburgh", "options": ["Edinburgh", "Glasgow", "Inverness"] },
        { "q": "How many official languages are mentioned?", "a": "Three", "options": ["Three", "One", "Five"] },
        { "q": "Which city is famous for football and its port?", "a": "Glasgow", "options": ["Glasgow", "Edinburgh", "Inverness"] },
        { "q": "Where is Inverness?", "a": "In the Highlands", "options": ["In the Highlands", "In England", "In the USA"] },
        { "q": "What kind of event is connected with Inverness?", "a": "A traditional sports event", "options": ["A traditional sports event", "A film festival", "A science fair"] }
      ]
    },
    {
      "category": "One World - City Profile",
      "readingText": "Harbour City is in the southeast of Australia. It is a large city with more than five million people. There is a famous opera house and a big bridge near the harbour. Every January there is an arts festival with music, theatre and many visitors. The city is busy, colourful and popular with tourists.",
      "emoji": "🌉",
      "questions": [
        { "q": "Where is Harbour City?", "a": "In the southeast of Australia", "options": ["In the southeast of Australia", "In Scotland", "In South America"] },
        { "q": "Is it a small city?", "a": "No, it isn't.", "options": ["Yes, it is.", "No, it isn't."] },
        { "q": "When is the arts festival?", "a": "In January", "options": ["In January", "In June", "In December"] },
        { "q": "What can visitors enjoy at the festival?", "a": "Music and theatre", "options": ["Music and theatre", "Only football", "Only science"] }
      ]
    },
    {
      "category": "One World - New School Email",
      "readingText": "Hi, Mia! How are you? My new school is really nice. I'm in class 2B and I'm on the volleyball team. My parents and I are in our new house now. Our neighbours are friendly and my classmates are fun. My favourite subject is science, but our teacher's favourite subject is history! Write soon, Alex.",
      "emoji": "📧",
      "questions": [
        { "q": "What class is Alex in?", "a": "Class 2B", "options": ["Class 2B", "Class 3A", "Class 1C"] },
        { "q": "Is Alex on a sports team?", "a": "Yes, he is.", "options": ["Yes, he is.", "No, he isn't."] },
        { "q": "What are the neighbours like?", "a": "Friendly", "options": ["Friendly", "Angry", "Boring"] },
        { "q": "What is Alex's favourite subject?", "a": "Science", "options": ["Science", "History", "Art"] }
      ]
    }
  ],
  "SENTENCES": [
    { "eng": "I'm from Argentina.", "spa": "Soy de Argentina.", "category": "Countries and Nationalities", "emoji": "🇦🇷" },
    { "eng": "I'm Argentinian.", "spa": "Soy argentino/a.", "category": "Countries and Nationalities", "emoji": "🇦🇷" },
    { "eng": "She's from Scotland.", "spa": "Ella es de Escocia.", "category": "Countries and Nationalities", "emoji": "🏴" },
    { "eng": "She's Scottish.", "spa": "Ella es escocesa.", "category": "Countries and Nationalities", "emoji": "🏴" },
    { "eng": "He's from the USA.", "spa": "Él es de Estados Unidos.", "category": "Countries and Nationalities", "emoji": "🇺🇸" },
    { "eng": "He's American.", "spa": "Él es estadounidense.", "category": "Countries and Nationalities", "emoji": "🇺🇸" },
    { "eng": "They're from China.", "spa": "Ellos son de China.", "category": "Countries and Nationalities", "emoji": "🇨🇳" },
    { "eng": "They're Chinese.", "spa": "Ellos son chinos.", "category": "Countries and Nationalities", "emoji": "🇨🇳" },
    { "eng": "My friend is Polish.", "spa": "Mi amigo/a es polaco/a.", "category": "Countries and Nationalities", "emoji": "🇵🇱" },
    { "eng": "Her mum is Irish.", "spa": "Su mamá es irlandesa.", "category": "Countries and Nationalities", "emoji": "🇮🇪" },
    { "eng": "He has got short red hair.", "spa": "Él tiene el cabello corto y pelirrojo.", "category": "Describing People", "emoji": "👨‍🦰" },
    { "eng": "She has got green eyes.", "spa": "Ella tiene ojos verdes.", "category": "Describing People", "emoji": "👁️" },
    { "eng": "It's a boy with blonde hair.", "spa": "Es un chico de cabello rubio.", "category": "Describing People", "emoji": "👦" },
    { "eng": "His bag is blue.", "spa": "Su mochila es azul.", "category": "Describing People", "emoji": "🎒" },
    { "eng": "They are all different.", "spa": "Todos son diferentes.", "category": "Describing People", "emoji": "👥" },
    { "eng": "I'm thirteen.", "spa": "Tengo trece años.", "category": "Verb To Be", "emoji": "🎂" },
    { "eng": "My school is in Cork.", "spa": "Mi escuela está en Cork.", "category": "Verb To Be", "emoji": "🏫" },
    { "eng": "It isn't very big.", "spa": "No es muy grande.", "category": "Verb To Be", "emoji": "🏫" },
    { "eng": "My friends are in the same class.", "spa": "Mis amigos están en la misma clase.", "category": "Verb To Be", "emoji": "👥" },
    { "eng": "Maths isn't easy for me.", "spa": "Matemática no es fácil para mí.", "category": "Verb To Be", "emoji": "➗" },
    { "eng": "Are you worried?", "spa": "¿Estás preocupado/a?", "category": "Verb To Be Questions", "emoji": "😟" },
    { "eng": "No, I'm not.", "spa": "No.", "category": "Verb To Be Questions", "emoji": "❌" },
    { "eng": "Is she good at basketball?", "spa": "¿Ella es buena jugando al básquet?", "category": "Verb To Be Questions", "emoji": "🏀" },
    { "eng": "Yes, she is.", "spa": "Sí.", "category": "Verb To Be Questions", "emoji": "✅" },
    { "eng": "Are they basketball fans?", "spa": "¿Son fanáticos del básquet?", "category": "Verb To Be Questions", "emoji": "🏀" },
    { "eng": "No, they aren't.", "spa": "No.", "category": "Verb To Be Questions", "emoji": "❌" },
    { "eng": "Where is he from?", "spa": "¿De dónde es él?", "category": "Verb To Be Questions", "emoji": "🌍" },
    { "eng": "Who are these people?", "spa": "¿Quiénes son estas personas?", "category": "Verb To Be Questions", "emoji": "👥" },
    { "eng": "It's my new laptop.", "spa": "Es mi computadora portátil nueva.", "category": "Possessive Adjectives", "emoji": "💻" },
    { "eng": "Your practice is today.", "spa": "Tu entrenamiento es hoy.", "category": "Possessive Adjectives", "emoji": "🏀" },
    { "eng": "His team is fantastic.", "spa": "Su equipo es fantástico.", "category": "Possessive Adjectives", "emoji": "🏀" },
    { "eng": "Her favourite sport is football.", "spa": "Su deporte favorito es el fútbol.", "category": "Possessive Adjectives", "emoji": "⚽" },
    { "eng": "Our teacher is friendly.", "spa": "Nuestro/a profesor/a es amable.", "category": "Possessive Adjectives", "emoji": "👩‍🏫" },
    { "eng": "Their house is in Paris.", "spa": "Su casa está en París.", "category": "Possessive Adjectives", "emoji": "🏠" },
    { "eng": "The dog is black. Its eyes are brown.", "spa": "El perro es negro. Sus ojos son marrones.", "category": "Possessive Adjectives", "emoji": "🐕" },
    { "eng": "Hi, I'm Alex.", "spa": "Hola, soy Alex.", "category": "Introductions", "emoji": "👋" },
    { "eng": "Nice to meet you.", "spa": "Mucho gusto.", "category": "Introductions", "emoji": "🤝" },
    { "eng": "Nice to meet you, too.", "spa": "Mucho gusto también.", "category": "Introductions", "emoji": "✨" },
    { "eng": "This is my friend, Maya.", "spa": "Esta es mi amiga Maya.", "category": "Introductions", "emoji": "👧" },
    { "eng": "Great to meet you.", "spa": "Encantado/a de conocerte.", "category": "Introductions", "emoji": "😊" },
    { "eng": "What's your favourite colour?", "spa": "¿Cuál es tu color favorito?", "category": "Personal Information", "emoji": "🎨" },
    { "eng": "What's your favourite animal?", "spa": "¿Cuál es tu animal favorito?", "category": "Personal Information", "emoji": "🐾" },
    { "eng": "Who is your best friend?", "spa": "¿Quién es tu mejor amigo/a?", "category": "Personal Information", "emoji": "👯" },
    { "eng": "What are his hobbies?", "spa": "¿Cuáles son sus pasatiempos?", "category": "Personal Information", "emoji": "🎮" },
    { "eng": "Edinburgh is the capital of Scotland.", "spa": "Edimburgo es la capital de Escocia.", "category": "Scottish Cities", "emoji": "🏰" },
    { "eng": "Glasgow is a big city and a port.", "spa": "Glasgow es una ciudad grande y un puerto.", "category": "Scottish Cities", "emoji": "⚓" },
    { "eng": "Inverness is in the Scottish Highlands.", "spa": "Inverness está en las Highlands escocesas.", "category": "Scottish Cities", "emoji": "⛰️" },
    { "eng": "There are three official languages in Scotland.", "spa": "Hay tres idiomas oficiales en Escocia.", "category": "Scottish Cities", "emoji": "🗣️" },
    { "eng": "The thistle is a symbol of Scotland.", "spa": "El cardo es un símbolo de Escocia.", "category": "Scottish Culture", "emoji": "🌸" },
    { "eng": "Bagpipes are a musical instrument.", "spa": "La gaita escocesa es un instrumento musical.", "category": "Scottish Culture", "emoji": "🎶" },
    { "eng": "A kilt can have different family colours.", "spa": "Un kilt puede tener distintos colores familiares.", "category": "Scottish Culture", "emoji": "🏴" },
    { "eng": "Sydney is in the southeast of Australia.", "spa": "Sídney está en el sudeste de Australia.", "category": "City Description", "emoji": "🇦🇺" },
    { "eng": "It's a big city.", "spa": "Es una ciudad grande.", "category": "City Description", "emoji": "🏙️" },
    { "eng": "The population is over five million.", "spa": "La población supera los cinco millones.", "category": "City Description", "emoji": "👥" },
    { "eng": "There is a festival in January.", "spa": "Hay un festival en enero.", "category": "City Description", "emoji": "🎭" },
    { "eng": "Many visitors come to the festival.", "spa": "Muchos visitantes vienen al festival.", "category": "City Description", "emoji": "🧳" },
    { "eng": "People from the same country can look different.", "spa": "Las personas de un mismo país pueden tener apariencias diferentes.", "category": "Global Citizenship", "emoji": "🌍" }
  ],
  "VOCABULARY": [
    { "eng": "Scotland", "spa": "Escocia", "category": "Countries", "emoji": "🏴" },
    { "eng": "England", "spa": "Inglaterra", "category": "Countries", "emoji": "🏴" },
    { "eng": "Ireland", "spa": "Irlanda", "category": "Countries", "emoji": "🇮🇪" },
    { "eng": "Wales", "spa": "Gales", "category": "Countries", "emoji": "🏴" },
    { "eng": "the UK", "spa": "el Reino Unido", "category": "Countries", "emoji": "🇬🇧" },
    { "eng": "Spain", "spa": "España", "category": "Countries", "emoji": "🇪🇸" },
    { "eng": "France", "spa": "Francia", "category": "Countries", "emoji": "🇫🇷" },
    { "eng": "Italy", "spa": "Italia", "category": "Countries", "emoji": "🇮🇹" },
    { "eng": "Germany", "spa": "Alemania", "category": "Countries", "emoji": "🇩🇪" },
    { "eng": "Poland", "spa": "Polonia", "category": "Countries", "emoji": "🇵🇱" },
    { "eng": "Greece", "spa": "Grecia", "category": "Countries", "emoji": "🇬🇷" },
    { "eng": "Morocco", "spa": "Marruecos", "category": "Countries", "emoji": "🇲🇦" },
    { "eng": "Egypt", "spa": "Egipto", "category": "Countries", "emoji": "🇪🇬" },
    { "eng": "the USA", "spa": "Estados Unidos", "category": "Countries", "emoji": "🇺🇸" },
    { "eng": "China", "spa": "China", "category": "Countries", "emoji": "🇨🇳" },
    { "eng": "Argentina", "spa": "Argentina", "category": "Countries", "emoji": "🇦🇷" },
    { "eng": "Brazil", "spa": "Brasil", "category": "Countries", "emoji": "🇧🇷" },
    { "eng": "Russia", "spa": "Rusia", "category": "Countries", "emoji": "🇷🇺" },
    { "eng": "Turkey", "spa": "Turquía", "category": "Countries", "emoji": "🇹🇷" },
    { "eng": "Mexico", "spa": "México", "category": "Countries", "emoji": "🇲🇽" },
    { "eng": "Scottish", "spa": "escocés/escocesa", "category": "Nationalities", "emoji": "🏴" },
    { "eng": "English", "spa": "inglés/inglesa", "category": "Nationalities", "emoji": "🏴" },
    { "eng": "Irish", "spa": "irlandés/irlandesa", "category": "Nationalities", "emoji": "🇮🇪" },
    { "eng": "Welsh", "spa": "galés/galesa", "category": "Nationalities", "emoji": "🏴" },
    { "eng": "British", "spa": "británico/británica", "category": "Nationalities", "emoji": "🇬🇧" },
    { "eng": "Spanish", "spa": "español/española", "category": "Nationalities", "emoji": "🇪🇸" },
    { "eng": "French", "spa": "francés/francesa", "category": "Nationalities", "emoji": "🇫🇷" },
    { "eng": "Italian", "spa": "italiano/italiana", "category": "Nationalities", "emoji": "🇮🇹" },
    { "eng": "German", "spa": "alemán/alemana", "category": "Nationalities", "emoji": "🇩🇪" },
    { "eng": "Polish", "spa": "polaco/polaca", "category": "Nationalities", "emoji": "🇵🇱" },
    { "eng": "Greek", "spa": "griego/griega", "category": "Nationalities", "emoji": "🇬🇷" },
    { "eng": "Moroccan", "spa": "marroquí", "category": "Nationalities", "emoji": "🇲🇦" },
    { "eng": "Egyptian", "spa": "egipcio/egipcia", "category": "Nationalities", "emoji": "🇪🇬" },
    { "eng": "American", "spa": "estadounidense", "category": "Nationalities", "emoji": "🇺🇸" },
    { "eng": "Chinese", "spa": "chino/china", "category": "Nationalities", "emoji": "🇨🇳" },
    { "eng": "Argentinian", "spa": "argentino/argentina", "category": "Nationalities", "emoji": "🇦🇷" },
    { "eng": "Brazilian", "spa": "brasileño/brasileña", "category": "Nationalities", "emoji": "🇧🇷" },
    { "eng": "Russian", "spa": "ruso/rusa", "category": "Nationalities", "emoji": "🇷🇺" },
    { "eng": "Turkish", "spa": "turco/turca", "category": "Nationalities", "emoji": "🇹🇷" },
    { "eng": "Mexican", "spa": "mexicano/mexicana", "category": "Nationalities", "emoji": "🇲🇽" },
    { "eng": "Capital city", "spa": "Capital", "category": "Scottish Cities and Culture", "emoji": "🏙️" },
    { "eng": "Population", "spa": "Población", "category": "Scottish Cities and Culture", "emoji": "👥" },
    { "eng": "Parliament", "spa": "Parlamento", "category": "Scottish Cities and Culture", "emoji": "🏛️" },
    { "eng": "Castle", "spa": "Castillo", "category": "Scottish Cities and Culture", "emoji": "🏰" },
    { "eng": "Cultural festival", "spa": "Festival cultural", "category": "Scottish Cities and Culture", "emoji": "🎭" },
    { "eng": "Visitor", "spa": "Visitante", "category": "Scottish Cities and Culture", "emoji": "🧳" },
    { "eng": "Port", "spa": "Puerto", "category": "Scottish Cities and Culture", "emoji": "⚓" },
    { "eng": "Football team", "spa": "Equipo de fútbol", "category": "Scottish Cities and Culture", "emoji": "⚽" },
    { "eng": "Football stadium", "spa": "Estadio de fútbol", "category": "Scottish Cities and Culture", "emoji": "🏟️" },
    { "eng": "Museum", "spa": "Museo", "category": "Scottish Cities and Culture", "emoji": "🏛️" },
    { "eng": "Gallery", "spa": "Galería", "category": "Scottish Cities and Culture", "emoji": "🖼️" },
    { "eng": "Highlands", "spa": "Tierras Altas", "category": "Scottish Cities and Culture", "emoji": "⛰️" },
    { "eng": "Official language", "spa": "Idioma oficial", "category": "Scottish Cities and Culture", "emoji": "🗣️" },
    { "eng": "Main language", "spa": "Idioma principal", "category": "Scottish Cities and Culture", "emoji": "💬" },
    { "eng": "Law", "spa": "Ley", "category": "Scottish Cities and Culture", "emoji": "⚖️" },
    { "eng": "Banknote", "spa": "Billete", "category": "Scottish Cities and Culture", "emoji": "💷" },
    { "eng": "Celebration", "spa": "Celebración", "category": "Scottish Cities and Culture", "emoji": "🎉" },
    { "eng": "Show", "spa": "Espectáculo", "category": "Scottish Cities and Culture", "emoji": "🎪" },
    { "eng": "Object", "spa": "Objeto", "category": "Scottish Cities and Culture", "emoji": "🧩" },
    { "eng": "Thistle", "spa": "Cardo", "category": "Scottish Cities and Culture", "emoji": "🌸" },
    { "eng": "Kilt", "spa": "Kilt / falda escocesa", "category": "Scottish Cities and Culture", "emoji": "🏴" },
    { "eng": "Bagpipes", "spa": "Gaita escocesa", "category": "Scottish Cities and Culture", "emoji": "🎶" },
    { "eng": "Unicorn", "spa": "Unicornio", "category": "Scottish Cities and Culture", "emoji": "🦄" },
    { "eng": "Best friend", "spa": "Mejor amigo/a", "category": "People and Personal Information", "emoji": "👯" },
    { "eng": "Classmate", "spa": "Compañero/a de clase", "category": "People and Personal Information", "emoji": "🎒" },
    { "eng": "Team", "spa": "Equipo", "category": "People and Personal Information", "emoji": "🏀" },
    { "eng": "Player", "spa": "Jugador/a", "category": "People and Personal Information", "emoji": "⛹️" },
    { "eng": "Practice", "spa": "Entrenamiento / práctica", "category": "People and Personal Information", "emoji": "🏀" },
    { "eng": "Worried", "spa": "Preocupado/a", "category": "People and Personal Information", "emoji": "😟" },
    { "eng": "Strong", "spa": "Fuerte", "category": "People and Personal Information", "emoji": "💪" },
    { "eng": "Funny", "spa": "Divertido/a", "category": "People and Personal Information", "emoji": "😂" },
    { "eng": "Difficult", "spa": "Difícil", "category": "People and Personal Information", "emoji": "🧠" },
    { "eng": "Easy", "spa": "Fácil", "category": "People and Personal Information", "emoji": "✅" }
  ]
};

// Now generate the 204 quizzes for Unit 1 cleanly
const quizzes = [];
const addGQ = (id, cat, q, options, ans, spa, eng, skill="Vocabulary", emoji="🌍") => {
  quizzes.push({
    id: `u1_${id}`, category: cat, type: 'quiz', skill, question: q, options, correctAnswer: ans, emoji, spa, optionsLang: 'en', eng, year: '2026', source: 'I Succeed in English 2 - Unit 1 One world'
  });
};

