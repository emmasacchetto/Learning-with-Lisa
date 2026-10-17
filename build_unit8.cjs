const fs = require('fs');

const rawNewData = JSON.parse(fs.readFileSync('new_data_1.json', 'utf8'));

const DIALOGUES = [
  ...rawNewData.DIALOGUES,
  {
    "id": "u8_func_cinema_review",
    "category": "Film - Talking about a movie",
    "vars": [],
    "lines": [
      { "speaker": "A", "eng": "Did you go to the cinema at the weekend?", "spa": "¿Fuiste al cine el fin de semana?", "emoji": "🎟️" },
      { "speaker": "B", "eng": "Yes, I did. I watched a new animated film with my friends.", "spa": "Sí. Vi una nueva película animada con mis amigos.", "emoji": "🍿" },
      { "speaker": "A", "eng": "What did you think of it?", "spa": "¿Qué te pareció?", "emoji": "❓" },
      { "speaker": "B", "eng": "In my opinion, it was brilliant! The special effects were amazing.", "spa": "En mi opinión, ¡fue brillante! Los efectos especiales fueron increíbles.", "emoji": "✨" },
      { "speaker": "A", "eng": "Who was your favourite character?", "spa": "¿Quién fue tu personaje favorito?", "emoji": "🦸" },
      { "speaker": "B", "eng": "The brave little robot. He was very funny.", "spa": "El valiente robotito. Era muy divertido.", "emoji": "🤖" }
    ]
  },
  {
    "id": "u8_func_favourite_genres",
    "category": "Film genres and preferences",
    "vars": [],
    "lines": [
      { "speaker": "A", "eng": "What kind of films do you like best?", "spa": "¿Qué tipo de películas te gustan más?", "emoji": "🎬" },
      { "speaker": "B", "eng": "I love sci-fi and fantasy films.", "spa": "Me encantan las películas de ciencia ficción y fantasía.", "emoji": "🚀" },
      { "speaker": "A", "eng": "Do you like horror films?", "spa": "¿Te gustan las películas de terror?", "emoji": "👻" },
      { "speaker": "B", "eng": "No, I can't stand them. They are too scary!", "spa": "No, no las soporto. ¡Dan demasiado miedo!", "emoji": "😱" },
      { "speaker": "A", "eng": "I prefer comedies because they make me laugh.", "spa": "Yo prefiero las comedias porque me hacen reír.", "emoji": "😂" },
      { "speaker": "B", "eng": "Comedies are great to watch with family.", "spa": "Las comedias son geniales para ver en familia.", "emoji": "👨‍👩‍👧" }
    ]
  }
];

const READING_COMPREHENSION = [
  {
    "category": "The Magic of Animated Movies",
    "readingText": "Animated movies are loved by people of all ages. Long ago, artists drew every single picture by hand on transparent sheets called cels. It took thousands of drawings to make just one minute of film! Today, animators use powerful computers and 3D software to create lifelike textures, lighting, and expressions. Famous animation studios like Pixar and Studio Ghibli spend up to four years making a single movie. The key to a great animated film is not just fancy technology, but a heartwarming story with relatable characters.",
    "emoji": "🎨",
    "questions": [
      {
        "q": "How did artists make animated movies long ago?",
        "a": "They drew every picture by hand",
        "options": ["They drew every picture by hand", "Using smartphones", "With AI cameras"]
      },
      {
        "q": "What do animators use today?",
        "a": "Computers and 3D software",
        "options": ["Computers and 3D software", "Only chalk and blackboards", "Wooden puppets only"]
      },
      {
        "q": "How long does it take to make a feature movie?",
        "a": "Up to four years",
        "options": ["Up to four years", "One afternoon", "One week"]
      },
      {
        "q": "What is the key to a great animated film?",
        "a": "A heartwarming story and relatable characters",
        "options": ["A heartwarming story and relatable characters", "Having no soundtrack", "Making it as short as possible"]
      }
    ]
  },
  {
    "category": "The Legend of King Arthur",
    "readingText": "One of the most famous stories in English literature is the legend of King Arthur. According to the tale, Britain had no king and the land was in chaos. In a churchyard in London, a magical sword appeared stuck inside a solid stone anvil with golden letters: 'Whoso pulleth out this sword is rightwise King of England'. Many strong knights and nobles pulled with all their strength, but nobody could move it. One day, a young boy named Arthur tried. He pulled the sword out easily and became a wise, just king.",
    "emoji": "⚔️",
    "questions": [
      {
        "q": "Where was the magical sword stuck?",
        "a": "Inside a solid stone anvil",
        "options": ["Inside a solid stone anvil", "At the bottom of the sea", "In a hollow tree"]
      },
      {
        "q": "Could the strong knights pull the sword out?",
        "a": "No, they couldn't.",
        "options": ["Yes, they did easily.", "No, they couldn't.", "They didn't try."]
      },
      {
        "q": "Who pulled the sword out easily?",
        "a": "A young boy named Arthur",
        "options": ["A young boy named Arthur", "A French pirate", "A Roman emperor"]
      },
      {
        "q": "What kind of king did Arthur become?",
        "a": "A wise, just king",
        "options": ["A wise, just king", "A cruel ruler", "A cowardly king"]
      }
    ]
  },
  {
    "category": "Final Project - Clean School Campaign",
    "readingText": "Last Friday, students at Oakwood Secondary School completed their Final Project. During the week, they inspected the streets near their school and recorded the types of litter they found. Most litter consisted of plastic drink bottles, snack packets, and soda cans. On Saturday morning, thirty volunteers gathered at Riverside Park. Equipped with sturdy gloves, bin bags, and safety boots, they collected over fifty bags of rubbish in just three hours. Afterwards, the team created colourful posters to encourage everyone in the neighbourhood to keep the park clean.",
    "emoji": "🧤",
    "questions": [
      {
        "q": "What project did Oakwood students complete?",
        "a": "A Clean School Campaign",
        "options": ["A Clean School Campaign", "A science fiction movie", "A chess tournament"]
      },
      {
        "q": "What was the most common litter?",
        "a": "Plastic bottles, snack packets, and cans",
        "options": ["Plastic bottles, snack packets, and cans", "Old computers", "Car wheels"]
      },
      {
        "q": "How many bags of rubbish did they collect?",
        "a": "Over fifty bags",
        "options": ["Over fifty bags", "Only two small bags", "Zero bags"]
      },
      {
        "q": "What did the team create afterwards?",
        "a": "Colourful posters to keep the park clean",
        "options": ["Colourful posters to keep the park clean", "A new computer game", "A pizza shop"]
      }
    ]
  }
];

const VOCABULARY = [
  { eng: "Action film", spa: "Película de acción", category: "Film and Fiction", emoji: "💥" },
  { eng: "Animated film", spa: "Película animada / de animación", category: "Film and Fiction", emoji: "🎨" },
  { eng: "Comedy", spa: "Comedia", category: "Film and Fiction", emoji: "😂" },
  { eng: "Documentary", spa: "Documental", category: "Film and Fiction", emoji: "📹" },
  { eng: "Fantasy film", spa: "Película fantástica / de fantasía", category: "Film and Fiction", emoji: "🧙" },
  { eng: "Horror film", spa: "Película de terror", category: "Film and Fiction", emoji: "👻" },
  { eng: "Musical", spa: "Musical", category: "Film and Fiction", emoji: "🎵" },
  { eng: "Sci-fi film", spa: "Película de ciencia ficción", category: "Film and Fiction", emoji: "🚀" },
  { eng: "Actor / Actress", spa: "Actor / Actriz", category: "Film and Fiction", emoji: "🎭" },
  { eng: "Character", spa: "Personaje", category: "Film and Fiction", emoji: "🦸" },
  { eng: "Director", spa: "Director / Directora", category: "Film and Fiction", emoji: "🎬" },
  { eng: "Plot", spa: "Trama / Argumento", category: "Film and Fiction", emoji: "📜" },
  { eng: "Scene", spa: "Escena", category: "Film and Fiction", emoji: "🎥" },
  { eng: "Soundtrack", spa: "Banda sonora", category: "Film and Fiction", emoji: "🎶" },
  { eng: "Special effects", spa: "Efectos especiales", category: "Film and Fiction", emoji: "✨" },

  { eng: "Yesterday", spa: "Ayer", category: "Past Time Expressions", emoji: "📅" },
  { eng: "Last night", spa: "Anoche", category: "Past Time Expressions", emoji: "🌙" },
  { eng: "Last weekend", spa: "El fin de semana pasado", category: "Past Time Expressions", emoji: "🏖️" },
  { eng: "Two days ago", spa: "Hace dos días", category: "Past Time Expressions", emoji: "⏪" },

  { eng: "Sunny", spa: "Soleado", category: "Weather and Nature", emoji: "☀️" },
  { eng: "Rainy", spa: "Lluvioso", category: "Weather and Nature", emoji: "🌧️" },
  { eng: "Windy", spa: "Ventoso", category: "Weather and Nature", emoji: "💨" },
  { eng: "Stormy", spa: "Tormentoso", category: "Weather and Nature", emoji: "⛈️" },
  { eng: "Foggy", spa: "Con niebla", category: "Weather and Nature", emoji: "🌫️" },
  { eng: "Snowy", spa: "Nevado / Con nieve", category: "Weather and Nature", emoji: "❄️" },
  { eng: "Mountain", spa: "Montaña", category: "Weather and Nature", emoji: "⛰️" },
  { eng: "River", spa: "Río", category: "Weather and Nature", emoji: "🏞️" },
  { eng: "Desert", spa: "Desierto", category: "Weather and Nature", emoji: "🏜️" },
  { eng: "Ocean", spa: "Océano", category: "Weather and Nature", emoji: "🌊" },

  { eng: "Litter", spa: "Basura", category: "Final Project - Environmental Action", emoji: "🗑️" },
  { eng: "Gloves", spa: "Guantes", category: "Final Project - Environmental Action", emoji: "🧤" },
  { eng: "Rubbish bags", spa: "Bolsas de basura", category: "Final Project - Environmental Action", emoji: "🛍️" },
  { eng: "Equipment", spa: "Equipo / Materiales", category: "Final Project - Environmental Action", emoji: "🎒" },
  { eng: "Poster", spa: "Póster / Cartel", category: "Final Project - Environmental Action", emoji: "🖼️" },
  { eng: "Litter pick", spa: "Jornada de recolección de basura", category: "Final Project - Environmental Action", emoji: "🚯" }
];

const SENTENCES = [
  { eng: "I watched an exciting sci-fi movie yesterday.", spa: "Ayer vi una película emocionante de ciencia ficción.", category: "Past Simple", emoji: "🚀" },
  { eng: "We went to the cinema last Saturday.", spa: "Fuimos al cine el sábado pasado.", category: "Past Simple", emoji: "🎬" },
  { eng: "The actors were brilliant and the soundtrack was great.", spa: "Los actores fueron brillantes y la banda sonora fue genial.", category: "Past Simple", emoji: "🎵" },
  { eng: "She didn't like the horror film because it was too scary.", spa: "No le gustó la película de terror porque daba demasiado miedo.", category: "Past Simple", emoji: "👻" },
  { eng: "Did you enjoy the film? - Yes, I did.", spa: "¿Disfrutaste la película? - Sí, la disfruté.", category: "Past Simple", emoji: "🍿" },
  { eng: "Arthur pulled the magic sword out of the stone.", spa: "Arthur sacó la espada mágica de la piedra.", category: "Past Simple", emoji: "⚔️" },
  { eng: "Wednesday was sunny and windy.", spa: "El miércoles estuvo soleado y ventoso.", category: "Weather and Nature", emoji: "💨" },
  { eng: "Volunteers collected fifty bags of litter in the park.", spa: "Los voluntarios juntaron cincuenta bolsas de basura en el parque.", category: "Final Project - Environmental Action", emoji: "🧤" },
  { eng: "Our group designed an eye-catching poster.", spa: "Nuestro grupo diseñó un cartel muy llamativo.", category: "Final Project - Environmental Action", emoji: "🖼️" }
];

module.exports = { DIALOGUES, READING_COMPREHENSION, VOCABULARY, SENTENCES };
