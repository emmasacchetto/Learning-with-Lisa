const fs = require('fs');

const DIALOGUES = [
  {
    "id": "u6_func_getting_dressed",
    "category": "Getting dressed for school",
    "vars": [],
    "lines": [
      { "speaker": "A", "eng": "Hurry up! What are you wearing today?", "spa": "¡Apúrate! ¿Qué te estás poniendo hoy?", "emoji": "⏰" },
      { "speaker": "B", "eng": "I am putting on my school uniform.", "spa": "Me estoy poniendo mi uniforme escolar.", "emoji": "👔" },
      { "speaker": "A", "eng": "Are you wearing your blue jumper?", "spa": "¿Estás usando tu suéter azul?", "emoji": "🧥" },
      { "speaker": "B", "eng": "Yes, I am. And my black shoes.", "spa": "Sí. Y mis zapatos negros.", "emoji": "👞" },
      { "speaker": "A", "eng": "Don't forget your warm jacket.", "spa": "No olvides tu campera abrigada.", "emoji": "🧥" },
      { "speaker": "B", "eng": "Thanks! It is cold outside.", "spa": "¡Gracias! Hace frío afuera.", "emoji": "❄️" }
    ]
  },
  {
    "id": "u6_func_classroom_actions",
    "category": "Classroom - Actions now",
    "vars": [],
    "lines": [
      { "speaker": "A", "eng": "What is the teacher writing on the board?", "spa": "¿Qué está escribiendo la profesora en el pizarrón?", "emoji": "👩‍🏫" },
      { "speaker": "B", "eng": "She is writing the English homework.", "spa": "Está escribiendo la tarea de inglés.", "emoji": "📝" },
      { "speaker": "A", "eng": "Are you copying the sentences?", "spa": "¿Estás copiando las oraciones?", "emoji": "✍️" },
      { "speaker": "B", "eng": "Yes, I am copying them in my notebook.", "spa": "Sí, las estoy copiando en mi cuaderno.", "emoji": "📓" },
      { "speaker": "A", "eng": "Where is Lucas sitting today?", "spa": "¿Dónde está sentado Lucas hoy?", "emoji": "🪑" },
      { "speaker": "B", "eng": "He is sitting next to the window.", "spa": "Está sentado al lado de la ventana.", "emoji": "🪟" }
    ]
  },
  {
    "id": "u6_func_looking_clothes",
    "category": "Looking for missing clothes",
    "vars": [],
    "lines": [
      { "speaker": "A", "eng": "Where is my hoodie?", "spa": "¿Dónde está mi buzo con capucha?", "emoji": "🧥" },
      { "speaker": "B", "eng": "Is your brother wearing it?", "spa": "¿Lo está usando tu hermano?", "emoji": "👦" },
      { "speaker": "A", "eng": "No, he is wearing a red sweatshirt.", "spa": "No, él está usando un buzo rojo.", "emoji": "🔴" },
      { "speaker": "B", "eng": "Look, it is hanging behind the door.", "spa": "Mira, está colgado detrás de la puerta.", "emoji": "🚪" },
      { "speaker": "A", "eng": "Oh, thank you! I need it for PE.", "spa": "¡Ah, gracias! Lo necesito para educación física.", "emoji": "🏃" }
    ]
  },
  {
    "id": "u6_func_shopping_clothes",
    "category": "Shopping for clothes",
    "vars": [],
    "lines": [
      { "speaker": "A", "eng": "Can I help you?", "spa": "¿En qué puedo ayudarte?", "emoji": "🛍️" },
      { "speaker": "B", "eng": "Yes, please. I am looking for a pair of jeans.", "spa": "Sí, por favor. Estoy buscando un par de jeans.", "emoji": "👖" },
      { "speaker": "A", "eng": "What size are you?", "spa": "¿Qué talle tienes?", "emoji": "📏" },
      { "speaker": "B", "eng": "I am a medium. Can I try these on?", "spa": "Soy talle mediano. ¿Me puedo probar estos?", "emoji": "👕" },
      { "speaker": "A", "eng": "Sure. The changing rooms are over there.", "spa": "Claro. Los probadores están por allí.", "emoji": "🚪" },
      { "speaker": "B", "eng": "Thank you very much.", "spa": "Muchas gracias.", "emoji": "😊" }
    ]
  },
  {
    "id": "u6_func_school_chores",
    "category": "School chores and duties",
    "vars": [],
    "lines": [
      { "speaker": "A", "eng": "Are you tidying the science lab?", "spa": "¿Estás ordenando el laboratorio de ciencias?", "emoji": "🔬" },
      { "speaker": "B", "eng": "Yes, I am cleaning the test tubes.", "spa": "Sí, estoy limpiando los tubos de ensayo.", "emoji": "🧽" },
      { "speaker": "A", "eng": "Who is wiping the blackboard?", "spa": "¿Quién está limpiando el pizarrón?", "emoji": "🧹" },
      { "speaker": "B", "eng": "Elena is wiping it with a wet cloth.", "spa": "Elena lo está limpiando con un trapo húmedo.", "emoji": "🧼" },
      { "speaker": "A", "eng": "Let's help her finish quickly.", "spa": "Ayudémosla a terminar rápido.", "emoji": "🤝" }
    ]
  },
  {
    "id": "u6_func_eco_clothes",
    "category": "SDG - Sustainable Fashion",
    "vars": [],
    "lines": [
      { "speaker": "A", "eng": "That's a nice jacket! Is it new?", "spa": "¡Qué linda campera! ¿Es nueva?", "emoji": "🧥" },
      { "speaker": "B", "eng": "No, it's second-hand from a charity shop.", "spa": "No, es de segunda mano de una tienda benéfica.", "emoji": "♻️" },
      { "speaker": "A", "eng": "Really? It looks brand new.", "spa": "¿En serio? Parece a estrenar.", "emoji": "✨" },
      { "speaker": "B", "eng": "Buying second-hand clothes saves water and energy.", "spa": "Comprar ropa de segunda mano ahorra agua y energía.", "emoji": "💧" },
      { "speaker": "A", "eng": "That is great for our planet.", "spa": "Eso es genial para nuestro planeta.", "emoji": "🌍" }
    ]
  }
];

const READING_COMPREHENSION = [
  {
    "category": "School Uniforms Around the World",
    "readingText": "In the UK, most secondary school students wear a uniform every day. A typical uniform consists of a white shirt, a striped tie, a dark jumper, and grey trousers or a skirt. In Australia, students also wear wide hats to protect their skin from the strong sun. In many other countries, like Spain or the United States, students in state schools do not wear a uniform. They usually wear comfortable everyday clothes like T-shirts, hoodies, and jeans. Many students like uniforms because they don't have to decide what to wear every morning.",
    "emoji": "🏫",
    "questions": [
      {
        "q": "What do most British secondary students wear?",
        "a": "A school uniform",
        "options": ["A school uniform", "Sports clothes only", "Any casual clothes"]
      },
      {
        "q": "Why do Australian students wear wide hats?",
        "a": "To protect from the sun",
        "options": ["To protect from the sun", "Because it is very cold", "To play cricket"]
      },
      {
        "q": "Do students in state schools in Spain usually wear a uniform?",
        "a": "No, they don't.",
        "options": ["Yes, they do.", "No, they don't."]
      },
      {
        "q": "What is one reason students like uniforms?",
        "a": "They don't have to choose clothes each morning",
        "options": ["They don't have to choose clothes each morning", "Uniforms are made of gold", "Uniforms are always free"]
      }
    ]
  },
  {
    "category": "What Are They Doing Right Now?",
    "readingText": "It is ten past eleven on a sunny Tuesday morning at Greenhill School. Right now, Class 2B is having a break in the school courtyard. Marco and Diego are playing football near the goalposts. Sophie is sitting on a wooden bench and reading a comic book. Mr Anderson, the history teacher, is drinking coffee in the staffroom. Some students are standing in line at the canteen because they are buying fresh sandwiches and apples. Nobody is sleeping!",
    "emoji": "☀️",
    "questions": [
      {
        "q": "What is Class 2B doing right now?",
        "a": "Having a break in the courtyard",
        "options": ["Having a break in the courtyard", "Writing a math test", "Running a marathon"]
      },
      {
        "q": "What are Marco and Diego doing?",
        "a": "Playing football",
        "options": ["Playing football", "Drinking tea", "Singing songs"]
      },
      {
        "q": "Where is Sophie sitting?",
        "a": "On a wooden bench",
        "options": ["On a wooden bench", "In the staffroom", "In the goalposts"]
      },
      {
        "q": "What is Mr Anderson doing?",
        "a": "Drinking coffee in the staffroom",
        "options": ["Drinking coffee in the staffroom", "Playing football", "Buying a comic"]
      }
    ]
  },
  {
    "category": "SDG - Give Your Clothes a Second Life",
    "readingText": "Did you know that producing one single cotton T-shirt takes about 2,700 litres of water? Fast fashion creates millions of tonnes of waste each year when people throw old clothes in the rubbish bin. Today, our school eco-club is organising a clothes swap event. Students bring clean clothes that they no longer wear and trade them for other clothes. If clothes have holes, members learn how to sew and repair them. Small actions like this protect rivers, reduce pollution, and help families save money.",
    "emoji": "♻️",
    "questions": [
      {
        "q": "How much water does one cotton T-shirt take to produce?",
        "a": "About 2,700 litres",
        "options": ["About 2,700 litres", "Ten litres", "One hundred litres"]
      },
      {
        "q": "What is the school eco-club organising?",
        "a": "A clothes swap event",
        "options": ["A clothes swap event", "A football match", "A pizza party"]
      },
      {
        "q": "What do students do with clothes that have holes?",
        "a": "They learn to sew and repair them",
        "options": ["They learn to sew and repair them", "They throw them in the river", "They burn them"]
      },
      {
        "q": "How does swapping clothes help?",
        "a": "It reduces pollution and saves money",
        "options": ["It reduces pollution and saves money", "It wastes more water", "It creates more rubbish"]
      }
    ]
  }
];

const VOCABULARY = [
  { eng: "Belt", spa: "Cinturón", category: "Clothes and Accessories", emoji: "🥋" },
  { eng: "Boots", spa: "Botas", category: "Clothes and Accessories", emoji: "🥾" },
  { eng: "Cap", spa: "Gorra", category: "Clothes and Accessories", emoji: "🧢" },
  { eng: "Coat", spa: "Abrigo", category: "Clothes and Accessories", emoji: "🧥" },
  { eng: "Dress", spa: "Vestido", category: "Clothes and Accessories", emoji: "👗" },
  { eng: "Hoodie", spa: "Buzo con capucha", category: "Clothes and Accessories", emoji: "🧥" },
  { eng: "Jacket", spa: "Campera / Chaqueta", category: "Clothes and Accessories", emoji: "🧥" },
  { eng: "Jeans", spa: "Jeans / Vaqueros", category: "Clothes and Accessories", emoji: "👖" },
  { eng: "Jumper", spa: "Suéter / Jersey", category: "Clothes and Accessories", emoji: "🧶" },
  { eng: "Scarf", spa: "Bufanda", category: "Clothes and Accessories", emoji: "🧣" },
  { eng: "Shirt", spa: "Camisa", category: "Clothes and Accessories", emoji: "👔" },
  { eng: "Shoes", spa: "Zapatos", category: "Clothes and Accessories", emoji: "👞" },
  { eng: "Skirt", spa: "Falda / Pollera", category: "Clothes and Accessories", emoji: "👗" },
  { eng: "Socks", spa: "Medias / Calcetines", category: "Clothes and Accessories", emoji: "🧦" },
  { eng: "Sunglasses", spa: "Anteojos de sol", category: "Clothes and Accessories", emoji: "🕶️" },
  { eng: "Sweatshirt", spa: "Buzo deportivo", category: "Clothes and Accessories", emoji: "👕" },
  { eng: "Tie", spa: "Corbata", category: "Clothes and Accessories", emoji: "👔" },
  { eng: "Trainers", spa: "Zapatillas deportivas", category: "Clothes and Accessories", emoji: "👟" },
  { eng: "Trousers", spa: "Pantalones", category: "Clothes and Accessories", emoji: "👖" },
  { eng: "T-shirt", spa: "Remera / Camiseta", category: "Clothes and Accessories", emoji: "👕" },
  { eng: "Uniform", spa: "Uniforme", category: "Clothes and Accessories", emoji: "🏫" },
  
  { eng: "Clean the board", spa: "Limpiar el pizarrón", category: "School Chores and Activities", emoji: "🧹" },
  { eng: "Copy the notes", spa: "Copiar los apuntes", category: "School Chores and Activities", emoji: "✍️" },
  { eng: "Do homework", spa: "Hacer la tarea", category: "School Chores and Activities", emoji: "📚" },
  { eng: "Pack the schoolbag", spa: "Armar la mochila", category: "School Chores and Activities", emoji: "🎒" },
  { eng: "Read a textbook", spa: "Leer un libro de texto", category: "School Chores and Activities", emoji: "📖" },
  { eng: "Sit at the desk", spa: "Sentarse en el banco", category: "School Chores and Activities", emoji: "🪑" },
  { eng: "Stand up", spa: "Ponerse de pie", category: "School Chores and Activities", emoji: "🧍" },
  { eng: "Tidy the classroom", spa: "Ordenar el aula", category: "School Chores and Activities", emoji: "📦" },
  { eng: "Wear a uniform", spa: "Llevar uniforme", category: "School Chores and Activities", emoji: "👔" },

  { eng: "Cotton", spa: "Algodón", category: "SDG - Sustainable Fashion", emoji: "🌱" },
  { eng: "Fast fashion", spa: "Moda rápida / desechable", category: "SDG - Sustainable Fashion", emoji: "🏭" },
  { eng: "Recycle clothes", spa: "Reciclar ropa", category: "SDG - Sustainable Fashion", emoji: "♻️" },
  { eng: "Repair with needle and thread", spa: "Reparar con aguja e hilo", category: "SDG - Sustainable Fashion", emoji: "🪡" },
  { eng: "Second-hand shop", spa: "Tienda de segunda mano", category: "SDG - Sustainable Fashion", emoji: "🏪" },
  { eng: "Swap clothes", spa: "Intercambiar ropa", category: "SDG - Sustainable Fashion", emoji: "🔄" }
];

const SENTENCES = [
  { eng: "I am wearing a blue T-shirt today.", spa: "Estoy usando una remera azul hoy.", category: "Present Continuous", emoji: "👕" },
  { eng: "She is wearing comfortable trainers.", spa: "Ella está usando zapatillas cómodas.", category: "Present Continuous", emoji: "👟" },
  { eng: "They are wearing their school uniforms.", spa: "Ellos están usando sus uniformes escolares.", category: "Present Continuous", emoji: "🏫" },
  { eng: "He is putting on his warm jacket.", spa: "Él se está poniendo su campera abrigada.", category: "Present Continuous", emoji: "🧥" },
  { eng: "We are not wearing coats because it is hot.", spa: "No estamos usando abrigos porque hace calor.", category: "Present Continuous", emoji: "☀️" },
  { eng: "The students are copying notes from the board.", spa: "Los alumnos están copiando apuntes del pizarrón.", category: "Present Continuous", emoji: "✍️" },
  { eng: "The teacher is explaining the grammar rule.", spa: "La profesora está explicando la regla de gramática.", category: "Present Continuous", emoji: "👩‍🏫" },
  { eng: "Are you listening to the English audio?", spa: "¿Estás escuchando el audio de inglés?", category: "Present Continuous", emoji: "🎧" },
  { eng: "Yes, I am listening carefully.", spa: "Sí, estoy escuchando atentamente.", category: "Present Continuous", emoji: "✅" },
  { eng: "What are you doing right now?", spa: "¿Qué estás haciendo ahora mismo?", category: "Present Continuous", emoji: "❓" },
  { eng: "I usually wear jeans, but today I am wearing trousers.", spa: "Normalmente uso jeans, pero hoy estoy usando pantalones de vestir.", category: "Present Simple vs Continuous", emoji: "👖" },
  { eng: "She walks to school every day, but today she is taking the bus.", spa: "Ella camina a la escuela todos los días, pero hoy se toma el colectivo.", category: "Present Simple vs Continuous", emoji: "🚌" },
  { eng: "We always recycle old clothes to protect the planet.", spa: "Siempre reciclamos ropa vieja para proteger el planeta.", category: "SDG - Sustainable Fashion", emoji: "🌍" },
  { eng: "Buying second-hand clothes saves water and money.", spa: "Comprar ropa de segunda mano ahorra agua y dinero.", category: "SDG - Sustainable Fashion", emoji: "💧" }
];

module.exports = { DIALOGUES, READING_COMPREHENSION, VOCABULARY, SENTENCES };
