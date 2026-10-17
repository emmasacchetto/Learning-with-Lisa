const fs = require('fs');

const DIALOGUES = [
  {
    "id": "u7_func_ask_directions_1",
    "category": "Asking for and giving directions",
    "vars": [],
    "lines": [
      { "speaker": "A", "eng": "Excuse me, is there a post office near here?", "spa": "Disculpe, ¿hay una oficina de correos cerca de aquí?", "emoji": "📮" },
      { "speaker": "B", "eng": "Yes, there is. Go straight on and turn left at the traffic lights.", "spa": "Sí, la hay. Vaya derecho y doble a la izquierda en el semáforo.", "emoji": "🚦" },
      { "speaker": "A", "eng": "Is it far from here?", "spa": "¿Está lejos de aquí?", "emoji": "📍" },
      { "speaker": "B", "eng": "No, it's about five minutes on foot. It's next to the bank.", "spa": "No, está a unos cinco minutos a pie. Está al lado del banco.", "emoji": "🏦" },
      { "speaker": "A", "eng": "Thank you very much!", "spa": "¡Muchas gracias!", "emoji": "😊" },
      { "speaker": "B", "eng": "You're welcome. Have a nice day!", "spa": "De nada. ¡Que tenga un buen día!", "emoji": "👋" }
    ]
  },
  {
    "id": "u7_func_finding_cinema",
    "category": "Finding a place in town",
    "vars": [],
    "lines": [
      { "speaker": "A", "eng": "Where are you going, Leo?", "spa": "¿Adónde vas, Leo?", "emoji": "🚶" },
      { "speaker": "B", "eng": "I am going to the cinema to meet my cousins.", "spa": "Voy al cine a encontrarme con mis primos.", "emoji": "🎬" },
      { "speaker": "A", "eng": "Do you know the way?", "spa": "¿Conoces el camino?", "emoji": "🗺️" },
      { "speaker": "B", "eng": "Yes. Cross the bridge and turn right into High Street.", "spa": "Sí. Cruza el puente y dobla a la derecha en High Street.", "emoji": "🌉" },
      { "speaker": "A", "eng": "The cinema is opposite the park, right?", "spa": "El cine está enfrente del parque, ¿verdad?", "emoji": "🌳" },
      { "speaker": "B", "eng": "Exactly! See you later.", "spa": "¡Exacto! Nos vemos luego.", "emoji": "👋" }
    ]
  },
  {
    "id": "u7_func_clean_park",
    "category": "Taking action - Clean our park",
    "vars": [],
    "lines": [
      { "speaker": "A", "eng": "Look at all this plastic on the grass!", "spa": "¡Mira todo este plástico en el pasto!", "emoji": "🗑️" },
      { "speaker": "B", "eng": "That's terrible. People shouldn't drop litter here.", "spa": "Eso es terrible. La gente no debería tirar basura aquí.", "emoji": "🚯" },
      { "speaker": "A", "eng": "Let's take action. Put on these gloves and take a bag.", "spa": "Tomemos acción. Ponte estos guantes y agarra una bolsa.", "emoji": "🧤" },
      { "speaker": "B", "eng": "Good idea. I can collect the cans and plastic bottles.", "spa": "Buena idea. Puedo juntar las latas y botellas plásticas.", "emoji": "🥫" },
      { "speaker": "A", "eng": "Then we can put them into the recycling bin.", "spa": "Luego podemos ponerlas en el contenedor de reciclaje.", "emoji": "♻️" },
      { "speaker": "B", "eng": "Our park will look beautiful again.", "spa": "Nuestro parque volverá a verse hermoso.", "emoji": "🌳" }
    ]
  },
  {
    "id": "u7_func_library_rules",
    "category": "Rules and Imperatives",
    "vars": [],
    "lines": [
      { "speaker": "A", "eng": "Shh! Don't shout in the library, please.", "spa": "¡Shh! No grites en la biblioteca, por favor.", "emoji": "🤫" },
      { "speaker": "B", "eng": "Sorry! I forgot the rules.", "spa": "¡Perdón! Me olvidé de las reglas.", "emoji": "📚" },
      { "speaker": "A", "eng": "Turn off your mobile phone or put it on silent.", "spa": "Apaga tu teléfono celular o ponlo en silencio.", "emoji": "📵" },
      { "speaker": "B", "eng": "Can we eat our snacks in here?", "spa": "¿Podemos comer nuestros refrigerios aquí adentro?", "emoji": "🥪" },
      { "speaker": "A", "eng": "No, don't eat or drink near the books.", "spa": "No, no comas ni bebas cerca de los libros.", "emoji": "🚫" },
      { "speaker": "B", "eng": "Understood. Let's finish our research quietly.", "spa": "Entendido. Terminemos nuestra investigación en silencio.", "emoji": "📖" }
    ]
  },
  {
    "id": "u7_func_eco_action",
    "category": "SDG - Sustainable Cities",
    "vars": [],
    "lines": [
      { "speaker": "A", "eng": "How do you usually travel to school?", "spa": "¿Cómo sueles viajar a la escuela?", "emoji": "🚲" },
      { "speaker": "B", "eng": "I ride my bicycle every morning.", "spa": "Voy en bicicleta todas las mañanas.", "emoji": "🚴" },
      { "speaker": "A", "eng": "That produces zero air pollution!", "spa": "¡Eso produce cero contaminación del aire!", "emoji": "🌿" },
      { "speaker": "B", "eng": "Yes, and it's great exercise too.", "spa": "Sí, y además es un ejercicio genial.", "emoji": "💪" },
      { "speaker": "A", "eng": "I want to ride my bike with you tomorrow.", "spa": "Quiero ir en bici contigo mañana.", "emoji": "🤝" },
      { "speaker": "B", "eng": "Great! Don't forget your helmet.", "spa": "¡Genial! No te olvides del casco.", "emoji": "⛑️" }
    ]
  }
];

const READING_COMPREHENSION = [
  {
    "category": "Curitiba - The Greenest City",
    "readingText": "Curitiba is a famous city in southern Brazil. Decades ago, the city decided to take action to protect the environment and make life better for its citizens. Instead of building expensive underground trains, they designed a fast bus system that millions of people use every day. Curitiba also has more than thirty public parks with lakes and trees. In poor neighbourhoods, the city started a special programme: residents collect rubbish from the streets and trade it for fresh fruits, vegetables, and bus tickets. Today, Curitiba is an inspiring example of a sustainable city.",
    "emoji": "🇧🇷",
    "questions": [
      {
        "q": "Where is Curitiba located?",
        "a": "In southern Brazil",
        "options": ["In southern Brazil", "In the north of Spain", "In Australia"]
      },
      {
        "q": "What transport system does Curitiba have?",
        "a": "A fast bus system",
        "options": ["A fast bus system", "Only horse carriages", "Helicopters for everyone"]
      },
      {
        "q": "What can residents trade street rubbish for?",
        "a": "Fruits, vegetables, and bus tickets",
        "options": ["Fruits, vegetables, and bus tickets", "Gold and diamonds", "Video games"]
      },
      {
        "q": "How many public parks does Curitiba have?",
        "a": "More than thirty",
        "options": ["More than thirty", "Only one small park", "Zero parks"]
      }
    ]
  },
  {
    "category": "Getting to the City Museum",
    "readingText": "To get to the City Museum from the central train station, exit through the main doors onto Station Road. Walk straight on for two hundred metres until you reach the clock tower. Turn right into King Street. Walk past the baker's and the chemist's. On your left, you will see a big park with a fountain. Cross the pedestrian crossing carefully. The museum is a grand stone building located directly opposite the fountain, between the library and the art gallery. Admission is free for school students.",
    "emoji": "🏛️",
    "questions": [
      {
        "q": "What should you do at the clock tower?",
        "a": "Turn right into King Street",
        "options": ["Turn right into King Street", "Turn left into Queen Street", "Stop and sleep"]
      },
      {
        "q": "What shops do you walk past on King Street?",
        "a": "The baker's and the chemist's",
        "options": ["The baker's and the chemist's", "A car repair shop", "An airport"]
      },
      {
        "q": "Where is the museum situated?",
        "a": "Opposite the fountain, between the library and art gallery",
        "options": ["Opposite the fountain, between the library and art gallery", "Inside the train station", "Under the bridge"]
      },
      {
        "q": "How much is admission for school students?",
        "a": "It is free",
        "options": ["It is free", "Twenty pounds", "Fifty euros"]
      }
    ]
  },
  {
    "category": "Taking Action for Stray Animals",
    "readingText": "Lucas and his sister Sofia noticed several stray cats and dogs near their neighbourhood park. Instead of ignoring the problem, they decided to take action. First, they spoke to a local animal rescue charity. Then, they organised a weekend car wash at their school to raise money. With the money they raised, they bought pet food, blankets, and medicine. Volunteers helped take the animals to the vet for vaccinations. Now, three puppies already have loving new homes. Lucas says: 'When young people work together, we can change our community.'",
    "emoji": "🐶",
    "questions": [
      {
        "q": "What problem did Lucas and Sofia notice?",
        "a": "Stray animals near the park",
        "options": ["Stray animals near the park", "Broken traffic lights", "A dry swimming pool"]
      },
      {
        "q": "How did they raise money?",
        "a": "A weekend car wash at school",
        "options": ["A weekend car wash at school", "Selling video games", "Asking the bank for a loan"]
      },
      {
        "q": "What did they buy with the money?",
        "a": "Pet food, blankets, and medicine",
        "options": ["Pet food, blankets, and medicine", "Candies and soda", "New smartphones"]
      },
      {
        "q": "What is Lucas's message?",
        "a": "Young people working together can change their community",
        "options": ["Young people working together can change their community", "Animals don't need help", "Only adults can help"]
      }
    ]
  }
];

const VOCABULARY = [
  { eng: "Baker's / Bakery", spa: "Panadería", category: "Places in Town", emoji: "🥖" },
  { eng: "Bank", spa: "Banco", category: "Places in Town", emoji: "🏦" },
  { eng: "Bookshop", spa: "Librería", category: "Places in Town", emoji: "📚" },
  { eng: "Bus station", spa: "Terminal de colectivos", category: "Places in Town", emoji: "🚌" },
  { eng: "Café", spa: "Cafetería / Café", category: "Places in Town", emoji: "☕" },
  { eng: "Chemist's / Pharmacy", spa: "Farmacia", category: "Places in Town", emoji: "💊" },
  { eng: "Cinema", spa: "Cine", category: "Places in Town", emoji: "🎬" },
  { eng: "Hospital", spa: "Hospital", category: "Places in Town", emoji: "🏥" },
  { eng: "Library", spa: "Biblioteca", category: "Places in Town", emoji: "📖" },
  { eng: "Museum", spa: "Museo", category: "Places in Town", emoji: "🏛️" },
  { eng: "Park", spa: "Parque", category: "Places in Town", emoji: "🌳" },
  { eng: "Police station", spa: "Comisaría", category: "Places in Town", emoji: "👮" },
  { eng: "Post office", spa: "Oficina de correos", category: "Places in Town", emoji: "📮" },
  { eng: "Restaurant", spa: "Restaurante", category: "Places in Town", emoji: "🍽️" },
  { eng: "Shopping centre", spa: "Centro comercial / Shopping", category: "Places in Town", emoji: "🛍️" },
  { eng: "Sports centre", spa: "Centro deportivo", category: "Places in Town", emoji: "🏟️" },
  { eng: "Supermarket", spa: "Supermercado", category: "Places in Town", emoji: "🛒" },
  { eng: "Train station", spa: "Estación de tren", category: "Places in Town", emoji: "🚆" },

  { eng: "Cross the street", spa: "Cruzar la calle", category: "Giving Directions", emoji: "🚸" },
  { eng: "Go past the...", spa: "Pasar por delante de...", category: "Giving Directions", emoji: "🚶" },
  { eng: "Go straight on", spa: "Seguir derecho", category: "Giving Directions", emoji: "⬆️" },
  { eng: "On the corner", spa: "En la esquina", category: "Giving Directions", emoji: "📍" },
  { eng: "Opposite", spa: "Enfrente de", category: "Giving Directions", emoji: "↔️" },
  { eng: "Next to", spa: "Al lado de", category: "Giving Directions", emoji: "➡️" },
  { eng: "Between", spa: "Entre (dos cosas)", category: "Giving Directions", emoji: "↔️" },
  { eng: "Turn left", spa: "Doblar a la izquierda", category: "Giving Directions", emoji: "⬅️" },
  { eng: "Turn right", spa: "Doblar a la derecha", category: "Giving Directions", emoji: "➡️" },
  { eng: "Traffic lights", spa: "Semáforo", category: "Giving Directions", emoji: "🚦" },

  { eng: "Collect litter", spa: "Juntar basura", category: "Taking Action & Community", emoji: "🗑️" },
  { eng: "Don't drop rubbish", spa: "No tires basura", category: "Taking Action & Community", emoji: "🚯" },
  { eng: "Help neighbours", spa: "Ayudar a los vecinos", category: "Taking Action & Community", emoji: "🤝" },
  { eng: "Plant a tree", spa: "Plantar un árbol", category: "Taking Action & Community", emoji: "🌱" },
  { eng: "Recycle plastic", spa: "Reciclar plástico", category: "Taking Action & Community", emoji: "♻️" },
  { eng: "Ride a bicycle", spa: "Andar en bicicleta", category: "Taking Action & Community", emoji: "🚲" },
  { eng: "Save energy", spa: "Ahorrar energía", category: "Taking Action & Community", emoji: "💡" },
  { eng: "Volunteer", spa: "Hacer voluntariado", category: "Taking Action & Community", emoji: "🙋" }
];

const SENTENCES = [
  { eng: "Excuse me, where is the nearest bank?", spa: "Disculpe, ¿dónde está el banco más cercano?", category: "Giving Directions", emoji: "🏦" },
  { eng: "Go straight on and turn right at the traffic lights.", spa: "Siga derecho y doble a la derecha en el semáforo.", category: "Giving Directions", emoji: "🚦" },
  { eng: "The library is between the museum and the café.", spa: "La biblioteca está entre el museo y la cafetería.", category: "Giving Directions", emoji: "📖" },
  { eng: "The post office is opposite the supermarket.", spa: "La oficina de correos está enfrente del supermercado.", category: "Giving Directions", emoji: "📮" },
  { eng: "Don't drop litter in the park!", spa: "¡No tires basura en el parque!", category: "Imperatives & Rules", emoji: "🚯" },
  { eng: "Turn off the lights when you leave the room.", spa: "Apaga las luces cuando salgas de la habitación.", category: "Imperatives & Rules", emoji: "💡" },
  { eng: "Please be quiet in the library.", spa: "Por favor guarda silencio en la biblioteca.", category: "Imperatives & Rules", emoji: "🤫" },
  { eng: "Recycle your plastic bottles and cans.", spa: "Recicla tus botellas de plástico y latas.", category: "Imperatives & Rules", emoji: "♻️" },
  { eng: "We can take action to protect our neighbourhood.", spa: "Podemos tomar acción para proteger nuestro barrio.", category: "Taking Action & Community", emoji: "🤝" },
  { eng: "Riding a bicycle produces zero emissions.", spa: "Andar en bicicleta produce cero emisiones.", category: "Taking Action & Community", emoji: "🚲" }
];

module.exports = { DIALOGUES, READING_COMPREHENSION, VOCABULARY, SENTENCES };
