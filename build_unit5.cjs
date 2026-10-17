const fs = require('fs');

const DIALOGUES = [
  {
    "id": "u5_func_sports_club",
    "category": "Sports club - Meeting someone",
    "vars": [],
    "lines": [
      { "speaker": "A", "eng": "Hi! What's your favourite sport?", "spa": "¡Hola! ¿Cuál es tu deporte favorito?", "emoji": "👋" },
      { "speaker": "B", "eng": "My favourite sport is basketball.", "spa": "Mi deporte favorito es el básquet.", "emoji": "🏀" },
      { "speaker": "A", "eng": "Can you play well?", "spa": "¿Juegas bien?", "emoji": "❓" },
      { "speaker": "B", "eng": "Yes, I can. I play twice a week.", "spa": "Sí. Juego dos veces por semana.", "emoji": "✅" },
      { "speaker": "A", "eng": "Where do you play?", "spa": "¿Dónde juegas?", "emoji": "📍" },
      { "speaker": "B", "eng": "At the local sports centre.", "spa": "En el centro deportivo local.", "emoji": "🏟️" }
    ]
  },
  {
    "id": "u5_func_can_ability",
    "category": "Can for ability",
    "vars": [],
    "lines": [
      { "speaker": "A", "eng": "Can you swim?", "spa": "¿Sabes nadar?", "emoji": "🏊" },
      { "speaker": "B", "eng": "Yes, I can. I can swim quite fast.", "spa": "Sí. Puedo nadar bastante rápido.", "emoji": "💨" },
      { "speaker": "A", "eng": "Can your sister swim?", "spa": "¿Tu hermana sabe nadar?", "emoji": "👧" },
      { "speaker": "B", "eng": "No, she can't, but she can run very well.", "spa": "No, pero puede correr muy bien.", "emoji": "🏃" },
      { "speaker": "A", "eng": "Can she play tennis?", "spa": "¿Puede jugar al tenis?", "emoji": "🎾" },
      { "speaker": "B", "eng": "Yes, she can.", "spa": "Sí.", "emoji": "✅" }
    ]
  },
  {
    "id": "u5_func_permission",
    "category": "Can for permission",
    "vars": [],
    "lines": [
      { "speaker": "A", "eng": "Can I use your tennis racket?", "spa": "¿Puedo usar tu raqueta de tenis?", "emoji": "🎾" },
      { "speaker": "B", "eng": "Yes, you can.", "spa": "Sí, puedes.", "emoji": "✅" },
      { "speaker": "A", "eng": "Can I open the sports hall door?", "spa": "¿Puedo abrir la puerta del gimnasio?", "emoji": "🚪" },
      { "speaker": "B", "eng": "No, you can't. The coach has the key.", "spa": "No. El entrenador tiene la llave.", "emoji": "🔑" },
      { "speaker": "A", "eng": "Can we play outside?", "spa": "¿Podemos jugar afuera?", "emoji": "🌳" },
      { "speaker": "B", "eng": "Yes, of course.", "spa": "Sí, por supuesto.", "emoji": "😊" }
    ]
  },
  {
    "id": "u5_func_picnic",
    "category": "Likes and dislikes - Picnic",
    "vars": [],
    "lines": [
      { "speaker": "A", "eng": "I love having picnics.", "spa": "Me encanta hacer pícnics.", "emoji": "🧺" },
      { "speaker": "B", "eng": "Me too! Do you like making sandwiches?", "spa": "¡A mí también! ¿Te gusta preparar sándwiches?", "emoji": "🥪" },
      { "speaker": "A", "eng": "Yes, I do, but I can't stand cutting onions.", "spa": "Sí, pero no soporto cortar cebollas.", "emoji": "🧅" },
      { "speaker": "B", "eng": "I hate cutting onions, too.", "spa": "Yo también odio cortar cebollas.", "emoji": "😖" },
      { "speaker": "A", "eng": "What do you like doing after lunch?", "spa": "¿Qué te gusta hacer después de almorzar?", "emoji": "🌳" },
      { "speaker": "B", "eng": "I like taking photos.", "spa": "Me gusta sacar fotos.", "emoji": "📷" }
    ]
  },
  {
    "id": "u5_func_opinions",
    "category": "Asking for and giving opinions",
    "vars": [],
    "lines": [
      { "speaker": "A", "eng": "Do you like skateboarding?", "spa": "¿Te gusta andar en skate?", "emoji": "🛹" },
      { "speaker": "B", "eng": "Yes, I do. I think it's exciting.", "spa": "Sí. Creo que es emocionante.", "emoji": "🤩" },
      { "speaker": "A", "eng": "How do you feel about skiing?", "spa": "¿Qué opinas del esquí?", "emoji": "⛷️" },
      { "speaker": "B", "eng": "To be honest, I think it's a little scary.", "spa": "Para ser sincero/a, creo que da un poco de miedo.", "emoji": "😬" },
      { "speaker": "A", "eng": "What do you think about tennis?", "spa": "¿Qué piensas del tenis?", "emoji": "🎾" },
      { "speaker": "B", "eng": "In my opinion, it's fantastic.", "spa": "En mi opinión, es fantástico.", "emoji": "⭐" }
    ]
  },
  {
    "id": "u5_func_disagree",
    "category": "Giving opinions - Agreeing and disagreeing",
    "vars": [],
    "lines": [
      { "speaker": "A", "eng": "Football is boring.", "spa": "El fútbol es aburrido.", "emoji": "⚽" },
      { "speaker": "B", "eng": "I don't think so. I love it!", "spa": "No lo creo. ¡Me encanta!", "emoji": "❤️" },
      { "speaker": "A", "eng": "Rugby is a very violent sport.", "spa": "El rugby es un deporte muy violento.", "emoji": "🏉" },
      { "speaker": "B", "eng": "That's not always true.", "spa": "Eso no siempre es cierto.", "emoji": "🤔" },
      { "speaker": "A", "eng": "What about cycling?", "spa": "¿Y el ciclismo?", "emoji": "🚴" },
      { "speaker": "B", "eng": "That's great. I think it's fun.", "spa": "Eso está genial. Creo que es divertido.", "emoji": "😊" }
    ]
  },
  {
    "id": "u5_func_skills_trainer",
    "category": "Skills trainer - Sports questions",
    "vars": [],
    "lines": [
      { "speaker": "A", "eng": "What's your favourite sport?", "spa": "¿Cuál es tu deporte favorito?", "emoji": "🏅" },
      { "speaker": "B", "eng": "My favourite sport is swimming.", "spa": "Mi deporte favorito es la natación.", "emoji": "🏊" },
      { "speaker": "A", "eng": "How often do you swim?", "spa": "¿Con qué frecuencia nadas?", "emoji": "🔁" },
      { "speaker": "B", "eng": "Three times a week.", "spa": "Tres veces por semana.", "emoji": "3️⃣" },
      { "speaker": "A", "eng": "Where do you swim?", "spa": "¿Dónde nadas?", "emoji": "📍" },
      { "speaker": "B", "eng": "At the sports centre.", "spa": "En el centro deportivo.", "emoji": "🏟️" },
      { "speaker": "A", "eng": "Do your friends like swimming?", "spa": "¿A tus amigos les gusta nadar?", "emoji": "👥" },
      { "speaker": "B", "eng": "Yes, they do.", "spa": "Sí.", "emoji": "✅" }
    ]
  },
  {
    "id": "u5_func_sports_cafe",
    "category": "Culture and skills - Sports café",
    "vars": [],
    "lines": [
      { "speaker": "A", "eng": "Can we watch the match here?", "spa": "¿Podemos ver el partido aquí?", "emoji": "📺" },
      { "speaker": "B", "eng": "Yes. The sports café shows it at four.", "spa": "Sí. El café deportivo lo transmite a las cuatro.", "emoji": "☕" },
      { "speaker": "A", "eng": "Great! Is there a table free?", "spa": "¡Genial! ¿Hay una mesa libre?", "emoji": "🪑" },
      { "speaker": "B", "eng": "Yes, over there.", "spa": "Sí, allí.", "emoji": "👉" },
      { "speaker": "A", "eng": "Do you think our team can win?", "spa": "¿Crees que nuestro equipo puede ganar?", "emoji": "🏆" },
      { "speaker": "B", "eng": "I hope so!", "spa": "¡Eso espero!", "emoji": "🤞" }
    ]
  },
  {
    "id": "u5_func_sporting_hero",
    "category": "Sporting hero - Fact file",
    "vars": [],
    "lines": [
      { "speaker": "A", "eng": "Who's your sporting hero?", "spa": "¿Quién es tu héroe o heroína deportiva?", "emoji": "🏅" },
      { "speaker": "B", "eng": "My sporting hero is a young swimmer from my country.", "spa": "Mi heroína deportiva es una joven nadadora de mi país.", "emoji": "🏊" },
      { "speaker": "A", "eng": "What can she do well?", "spa": "¿Qué sabe hacer bien?", "emoji": "❓" },
      { "speaker": "B", "eng": "She can swim very fast and she can train carefully.", "spa": "Puede nadar muy rápido y entrenar cuidadosamente.", "emoji": "💨" },
      { "speaker": "A", "eng": "Why do you admire her?", "spa": "¿Por qué la admiras?", "emoji": "⭐" },
      { "speaker": "B", "eng": "Because she works hard and helps young athletes.", "spa": "Porque trabaja mucho y ayuda a deportistas jóvenes.", "emoji": "🤝" }
    ]
  },
  {
    "id": "u5_func_unusual_hobby",
    "category": "Culture and skills - Unusual hobby",
    "vars": [],
    "lines": [
      { "speaker": "A", "eng": "What do you do in your free time?", "spa": "¿Qué haces en tu tiempo libre?", "emoji": "⏰" },
      { "speaker": "B", "eng": "I make small sculptures from soap.", "spa": "Hago pequeñas esculturas de jabón.", "emoji": "🧼" },
      { "speaker": "A", "eng": "Can you make them quickly?", "spa": "¿Puedes hacerlas rápidamente?", "emoji": "⚡" },
      { "speaker": "B", "eng": "No. You need a lot of patience.", "spa": "No. Se necesita mucha paciencia.", "emoji": "🧘" },
      { "speaker": "A", "eng": "Do you enjoy it?", "spa": "¿Lo disfrutas?", "emoji": "😊" },
      { "speaker": "B", "eng": "Yes, I do. I love making unusual things.", "spa": "Sí. Me encanta hacer cosas poco comunes.", "emoji": "✨" }
    ]
  }
];

const READING_COMPREHENSION = [
  {
    "category": "Sport - Human Sports Day",
    "readingText": "At a special sports day, a group of students and a friendly robot try different sports. The students can run and play ball games, but they can't fly. The robot can do gymnastics and karate, and it can skateboard very well. One student can run fast but can't play tennis. Everyone discovers that people have different abilities.",
    "emoji": "🤖",
    "questions": [
      { "q": "Can the students fly?", "a": "No, they can't.", "options": ["Yes, they can.", "No, they can't."] },
      { "q": "What sports can the robot do?", "a": "Gymnastics, karate and skateboarding", "options": ["Gymnastics, karate and skateboarding", "Only swimming", "Only football"] },
      { "q": "Can one student run fast?", "a": "Yes, he can.", "options": ["Yes, he can.", "No, he can't."] },
      { "q": "What does everyone learn?", "a": "People have different abilities", "options": ["People have different abilities", "Only robots can do sport", "Everyone likes the same sport"] }
    ]
  },
  {
    "category": "Sport - Picnic and Preferences",
    "readingText": "Nina and Theo plan a picnic after a morning at the sports centre. Nina loves making sandwiches, but Theo can't stand cutting tomatoes. Theo likes taking photos and Nina likes cycling in the park. They both hate sitting indoors on sunny days, so they take their food outside and have a picnic.",
    "emoji": "🧺",
    "questions": [
      { "q": "What does Nina love doing?", "a": "Making sandwiches", "options": ["Making sandwiches", "Doing nothing", "Cutting tomatoes"] },
      { "q": "What can't Theo stand?", "a": "Cutting tomatoes", "options": ["Cutting tomatoes", "Taking photos", "Cycling"] },
      { "q": "What does Theo like doing?", "a": "Taking photos", "options": ["Taking photos", "Swimming", "Cooking soup"] },
      { "q": "Why do they go outside?", "a": "It is a sunny day", "options": ["It is a sunny day", "It is midnight", "The sports hall is a kitchen"] }
    ]
  },
  {
    "category": "Sport - A New Friend at the Club",
    "readingText": "Freya meets Jun at a sports club. Freya's favourite sport is basketball, and she can play very well. She plays twice a week at the school sports hall. Jun prefers swimming. He swims on Saturdays at a pool near his school. His brother also likes swimming, so they sometimes practise together.",
    "emoji": "🏀",
    "questions": [
      { "q": "What is Freya's favourite sport?", "a": "Basketball", "options": ["Basketball", "Swimming", "Skiing"] },
      { "q": "How often does Freya play?", "a": "Twice a week", "options": ["Twice a week", "Once a year", "Never"] },
      { "q": "Where does Jun swim?", "a": "At a pool near his school", "options": ["At a pool near his school", "In a kitchen", "On a football field"] },
      { "q": "Who sometimes practises with Jun?", "a": "His brother", "options": ["His brother", "His maths book", "A remote control"] }
    ]
  },
  {
    "category": "Culture and Skills - Sports for All",
    "readingText": "Teenagers can do many sports at school. Indoor activities take place in sports halls, while outdoor sports are often played on fields. Different groups of students may prefer different sports, but everyone should have equal opportunities to take part. Sport is also shown in the media, and balanced coverage can help young people see many different sporting heroes.",
    "emoji": "⚖️",
    "questions": [
      { "q": "Where do indoor sports take place?", "a": "In sports halls", "options": ["In sports halls", "In kitchens", "In bedrooms"] },
      { "q": "Where are many outdoor sports played?", "a": "On playing fields", "options": ["On playing fields", "In wardrobes", "Under tables"] },
      { "q": "What should students have?", "a": "Equal opportunities to take part", "options": ["Equal opportunities to take part", "Only one sport", "No PE"] },
      { "q": "Why is balanced media coverage useful?", "a": "It shows many different sporting heroes", "options": ["It shows many different sporting heroes", "It removes all sport", "It teaches cooking"] }
    ]
  },
  {
    "category": "Sport - Sporting Hero Fact File",
    "readingText": "Camila Torres is a young athlete from South America. Her main event is the long jump. She trains five days a week and can jump very far. She has two national medals and one international medal. Camila also visits schools and talks to students about sport, practice and confidence.",
    "emoji": "🥇",
    "questions": [
      { "q": "What sport does Camila do?", "a": "Athletics", "options": ["Athletics", "Cricket", "Swimming"] },
      { "q": "What is her event?", "a": "The long jump", "options": ["The long jump", "Table tennis", "Skiing"] },
      { "q": "How often does she train?", "a": "Five days a week", "options": ["Five days a week", "Once a year", "Never"] },
      { "q": "What does she do at schools?", "a": "She talks to students about sport and confidence", "options": ["She talks to students about sport and confidence", "She sells furniture", "She cooks every lunch"] }
    ]
  },
  {
    "category": "Culture and Skills - Unusual Free Time",
    "readingText": "Three teenagers have unusual hobbies. Alex makes tiny sculptures from soap. The hobby is inexpensive, but he needs a small tool and a lot of patience. Jess practises parkour. She can run, jump and climb very well, but she says people must understand their limits and be in good physical condition. Ben plays a digital version of a traditional musical instrument because it is easier for him to use.",
    "emoji": "✨",
    "questions": [
      { "q": "What does Alex make?", "a": "Small sculptures from soap", "options": ["Small sculptures from soap", "Football boots", "Sandwiches"] },
      { "q": "What does parkour include?", "a": "Running, jumping and climbing", "options": ["Running, jumping and climbing", "Only swimming", "Only sitting"] },
      { "q": "What does Jess say is important?", "a": "Understanding your limits and being fit", "options": ["Understanding your limits and being fit", "Ignoring safety", "Never practising"] },
      { "q": "What does Ben use?", "a": "A digital version of an instrument", "options": ["A digital version of an instrument", "A swimming pool", "A rugby field"] }
    ]
  },
  {
    "category": "Sport - Opinions",
    "readingText": "Leo and Maya have different opinions about sport. Leo loves football and thinks it is exciting. Maya doesn't agree; she finds football a little boring, but she loves cycling. Leo thinks cycling is difficult, while Maya says it is relaxing and fun. They both like swimming and go to the pool together once a week.",
    "emoji": "💬",
    "questions": [
      { "q": "What sport does Leo love?", "a": "Football", "options": ["Football", "Cycling", "Karate"] },
      { "q": "What does Maya think about football?", "a": "It is a little boring", "options": ["It is a little boring", "It is her favourite", "It is a food"] },
      { "q": "What does Maya love?", "a": "Cycling", "options": ["Cycling", "Cricket", "Doing nothing"] },
      { "q": "What sport do they both like?", "a": "Swimming", "options": ["Swimming", "Rugby", "Skiing"] }
    ]
  },
  {
    "category": "SDG - Sport and Equality",
    "readingText": "A school sports club wants everyone to feel welcome. Boys and girls can join the same training sessions, and students choose sports because they enjoy them, not because a sport is 'for boys' or 'for girls'. The club also puts photos of male and female sporting heroes on its walls. The teachers say respect and equal opportunities make the club stronger.",
    "emoji": "🤝",
    "questions": [
      { "q": "Who can join the training sessions?", "a": "Boys and girls", "options": ["Boys and girls", "Only boys", "Only adults"] },
      { "q": "How should students choose sports?", "a": "Because they enjoy them", "options": ["Because they enjoy them", "Because of stereotypes", "Because of furniture"] },
      { "q": "What photos are on the walls?", "a": "Male and female sporting heroes", "options": ["Male and female sporting heroes", "Only food", "Only rooms"] },
      { "q": "What makes the club stronger?", "a": "Respect and equal opportunities", "options": ["Respect and equal opportunities", "Fewer students", "No practice"] }
    ]
  }
];

const SENTENCES = [
  { "eng": "I play basketball.", "spa": "Juego al básquet.", "category": "Sports Collocations", "emoji": "🏀" },
  { "eng": "We play football after school.", "spa": "Jugamos al fútbol después de la escuela.", "category": "Sports Collocations", "emoji": "⚽" },
  { "eng": "They play volleyball on Fridays.", "spa": "Juegan al vóley los viernes.", "category": "Sports Collocations", "emoji": "🏐" },
  { "eng": "I go cycling at the weekend.", "spa": "Practico ciclismo el fin de semana.", "category": "Sports Collocations", "emoji": "🚴" },
  { "eng": "She goes skiing in winter.", "spa": "Ella esquía en invierno.", "category": "Sports Collocations", "emoji": "⛷️" },
  { "eng": "We go swimming twice a week.", "spa": "Vamos a nadar dos veces por semana.", "category": "Sports Collocations", "emoji": "🏊" },
  { "eng": "He does karate.", "spa": "Él hace karate.", "category": "Sports Collocations", "emoji": "🥋" },
  { "eng": "I do athletics at school.", "spa": "Hago atletismo en la escuela.", "category": "Sports Collocations", "emoji": "🏃" },
  { "eng": "She does gymnastics very well.", "spa": "Ella hace gimnasia muy bien.", "category": "Sports Collocations", "emoji": "🤸" },
  { "eng": "Basketball is a team sport.", "spa": "El básquet es un deporte de equipo.", "category": "Team and Individual Sports", "emoji": "🏀" },
  { "eng": "Gymnastics is often an individual sport.", "spa": "La gimnasia suele ser un deporte individual.", "category": "Team and Individual Sports", "emoji": "🤸" },
  { "eng": "Can you play tennis?", "spa": "¿Puedes jugar al tenis?", "category": "Can for Ability", "emoji": "🎾" },
  { "eng": "Yes, I can.", "spa": "Sí, puedo.", "category": "Can for Ability", "emoji": "✅" },
  { "eng": "No, I can't.", "spa": "No, no puedo.", "category": "Can for Ability", "emoji": "❌" },
  { "eng": "She can swim very well.", "spa": "Ella puede nadar muy bien.", "category": "Can for Ability", "emoji": "🏊" },
  { "eng": "He can't play tennis.", "spa": "Él no puede jugar al tenis.", "category": "Can for Ability", "emoji": "🎾" },
  { "eng": "Can I use your racket?", "spa": "¿Puedo usar tu raqueta?", "category": "Can for Permission", "emoji": "🎾" },
  { "eng": "Yes, you can.", "spa": "Sí, puedes.", "category": "Can for Permission", "emoji": "✅" },
  { "eng": "No, you can't.", "spa": "No, no puedes.", "category": "Can for Permission", "emoji": "❌" },
  { "eng": "Jamie runs slowly.", "spa": "Jamie corre lentamente.", "category": "Adverbs of Manner", "emoji": "🏃" },
  { "eng": "Sally swims well.", "spa": "Sally nada bien.", "category": "Adverbs of Manner", "emoji": "🏊" },
  { "eng": "Ava runs quickly.", "spa": "Ava corre rápidamente.", "category": "Adverbs of Manner", "emoji": "🏃" },
  { "eng": "Jack can run fast.", "spa": "Jack puede correr rápido.", "category": "Adverbs of Manner", "emoji": "💨" },
  { "eng": "Mia sings happily.", "spa": "Mia canta felizmente.", "category": "Adverbs of Manner", "emoji": "🎤" },
  { "eng": "Please do it carefully.", "spa": "Por favor, hazlo cuidadosamente.", "category": "Adverbs of Manner", "emoji": "⚠️" },
  { "eng": "I love playing football.", "spa": "Me encanta jugar al fútbol.", "category": "Likes and Dislikes", "emoji": "⚽" },
  { "eng": "I like skateboarding.", "spa": "Me gusta andar en skate.", "category": "Likes and Dislikes", "emoji": "🛹" },
  { "eng": "I can't stand eating tomatoes.", "spa": "No soporto comer tomates.", "category": "Likes and Dislikes", "emoji": "🍅" },
  { "eng": "I hate jogging in the rain.", "spa": "Odio trotar bajo la lluvia.", "category": "Likes and Dislikes", "emoji": "🌧️" },
  { "eng": "We love making new friends.", "spa": "Nos encanta hacer nuevos amigos.", "category": "Likes and Dislikes", "emoji": "🤝" },
  { "eng": "They like taking photos.", "spa": "Les gusta sacar fotos.", "category": "Likes and Dislikes", "emoji": "📷" },
  { "eng": "Look at me.", "spa": "Mírame.", "category": "Object Pronouns", "emoji": "👀" },
  { "eng": "I can't find him.", "spa": "No puedo encontrarlo.", "category": "Object Pronouns", "emoji": "👦" },
  { "eng": "Give the ball to her.", "spa": "Dale la pelota a ella.", "category": "Object Pronouns", "emoji": "⚽" },
  { "eng": "They play with us.", "spa": "Juegan con nosotros.", "category": "Object Pronouns", "emoji": "👥" },
  { "eng": "I know them.", "spa": "Los conozco.", "category": "Object Pronouns", "emoji": "👥" },
  { "eng": "I love it.", "spa": "Me encanta.", "category": "Object Pronouns", "emoji": "❤️" },
  { "eng": "Do you like basketball?", "spa": "¿Te gusta el básquet?", "category": "Opinions", "emoji": "🏀" },
  { "eng": "How do you feel about basketball?", "spa": "¿Qué opinas del básquet?", "category": "Opinions", "emoji": "💭" },
  { "eng": "To be honest, I don't like it.", "spa": "Para ser sincero/a, no me gusta.", "category": "Opinions", "emoji": "💬" },
  { "eng": "I think it's boring.", "spa": "Creo que es aburrido.", "category": "Opinions", "emoji": "🥱" },
  { "eng": "What do you think about tennis?", "spa": "¿Qué piensas del tenis?", "category": "Opinions", "emoji": "🎾" },
  { "eng": "In my opinion, it's fantastic.", "spa": "En mi opinión, es fantástico.", "category": "Opinions", "emoji": "🌟" },
  { "eng": "Are you joking?", "spa": "¿Estás bromeando?", "category": "Opinion Language", "emoji": "😮" },
  { "eng": "That's so true.", "spa": "Es totalmente cierto.", "category": "Opinion Language", "emoji": "✅" },
  { "eng": "Of course not!", "spa": "¡Por supuesto que no!", "category": "Opinion Language", "emoji": "🙅" },
  { "eng": "What's your favourite sport?", "spa": "¿Cuál es tu deporte favorito?", "category": "Skills Trainer", "emoji": "🏅" },
  { "eng": "How often do you play?", "spa": "¿Con qué frecuencia juegas?", "category": "Skills Trainer", "emoji": "🔁" },
  { "eng": "Where do you play?", "spa": "¿Dónde juegas?", "category": "Skills Trainer", "emoji": "📍" },
  { "eng": "Do your friends like playing tennis?", "spa": "¿A tus amigos les gusta jugar al tenis?", "category": "Skills Trainer", "emoji": "🎾" },
  { "eng": "Indoor sports take place in a sports hall.", "spa": "Los deportes de interior se practican en un gimnasio.", "category": "Culture and Skills", "emoji": "🏟️" },
  { "eng": "Outdoor sports can take place on a playing field.", "spa": "Los deportes al aire libre pueden practicarse en un campo de juego.", "category": "Culture and Skills", "emoji": "🌳" },
  { "eng": "Everyone should have equal opportunities in sport.", "spa": "Todos deberían tener las mismas oportunidades en el deporte.", "category": "Culture and Skills", "emoji": "⚖️" },
  { "eng": "A sporting hero can inspire young people.", "spa": "Un héroe o heroína deportiva puede inspirar a los jóvenes.", "category": "Culture and Skills", "emoji": "🏅" },
  { "eng": "She is a gold medallist.", "spa": "Ella es medallista de oro.", "category": "Sporting Hero", "emoji": "🥇" },
  { "eng": "He wears a helmet when he cycles.", "spa": "Él usa casco cuando anda en bicicleta.", "category": "Sports Equipment", "emoji": "⛑️" },
  { "eng": "The match starts at four o'clock.", "spa": "El partido empieza a las cuatro.", "category": "Sports Places", "emoji": "🏆" },
  { "eng": "We meet at the sports café.", "spa": "Nos encontramos en el café deportivo.", "category": "Sports Places", "emoji": "☕" },
  { "eng": "The swimming pool is next to the sports hall.", "spa": "La piscina está al lado del gimnasio.", "category": "Sports Places", "emoji": "🏊" },
  { "eng": "Parkour is very acrobatic.", "spa": "El parkour es muy acrobático.", "category": "Unusual Free Time", "emoji": "🤸" },
  { "eng": "You need patience for this hobby.", "spa": "Necesitas paciencia para este pasatiempo.", "category": "Unusual Free Time", "emoji": "🧘" },
  { "eng": "Good physical condition is important for some activities.", "spa": "Un buen estado físico es importante para algunas actividades.", "category": "Unusual Free Time", "emoji": "💪" },
  { "eng": "He uses a digital version of the instrument.", "spa": "Él usa una versión digital del instrumento.", "category": "Unusual Free Time", "emoji": "💻" },
  { "eng": "Boys and girls can enjoy the same sports.", "spa": "Los chicos y las chicas pueden disfrutar de los mismos deportes.", "category": "Gender Equality", "emoji": "⚖️" },
  { "eng": "Men and women can be sporting heroes.", "spa": "Hombres y mujeres pueden ser héroes deportivos.", "category": "Gender Equality", "emoji": "🏅" },
  { "eng": "Children can choose the sports they enjoy.", "spa": "Los niños pueden elegir los deportes que disfrutan.", "category": "Gender Equality", "emoji": "🧒" },
  { "eng": "Sport is for everyone.", "spa": "El deporte es para todos.", "category": "Gender Equality", "emoji": "🤝" }
];

const VOCABULARY = [
  { "eng": "Athletics", "spa": "Atletismo", "category": "Sports and Free Time", "emoji": "🏃" },
  { "eng": "Basketball", "spa": "Básquet", "category": "Sports and Free Time", "emoji": "🏀" },
  { "eng": "Cricket", "spa": "Críquet", "category": "Sports and Free Time", "emoji": "🏏" },
  { "eng": "Cycling", "spa": "Ciclismo", "category": "Sports and Free Time", "emoji": "🚴" },
  { "eng": "Football", "spa": "Fútbol", "category": "Sports and Free Time", "emoji": "⚽" },
  { "eng": "Gymnastics", "spa": "Gimnasia", "category": "Sports and Free Time", "emoji": "🤸" },
  { "eng": "Hockey", "spa": "Hockey", "category": "Sports and Free Time", "emoji": "🏑" },
  { "eng": "Karate", "spa": "Karate", "category": "Sports and Free Time", "emoji": "🥋" },
  { "eng": "Rugby", "spa": "Rugby", "category": "Sports and Free Time", "emoji": "🏉" },
  { "eng": "Skateboarding", "spa": "Skate / skateboarding", "category": "Sports and Free Time", "emoji": "🛹" },
  { "eng": "Skiing", "spa": "Esquí", "category": "Sports and Free Time", "emoji": "⛷️" },
  { "eng": "Swimming", "spa": "Natación", "category": "Sports and Free Time", "emoji": "🏊" },
  { "eng": "Tennis", "spa": "Tenis", "category": "Sports and Free Time", "emoji": "🎾" },
  { "eng": "Volleyball", "spa": "Vóley", "category": "Sports and Free Time", "emoji": "🏐" },
  { "eng": "Individual sport", "spa": "Deporte individual", "category": "Sports and Free Time", "emoji": "👤" },
  { "eng": "Team sport", "spa": "Deporte de equipo", "category": "Sports and Free Time", "emoji": "👥" },
  { "eng": "Female", "spa": "Femenino / mujer", "category": "People in Sport", "emoji": "♀️" },
  { "eng": "Male", "spa": "Masculino / varón", "category": "People in Sport", "emoji": "♂️" },
  { "eng": "Sports star", "spa": "Estrella deportiva", "category": "People in Sport", "emoji": "⭐" },
  { "eng": "Runner", "spa": "Corredor/a", "category": "People in Sport", "emoji": "🏃" },
  { "eng": "Swimmer", "spa": "Nadador/a", "category": "People in Sport", "emoji": "🏊" },
  { "eng": "Sporting hero", "spa": "Héroe / heroína deportiva", "category": "People in Sport", "emoji": "🏅" },
  { "eng": "Gold medallist", "spa": "Medallista de oro", "category": "People in Sport", "emoji": "🥇" },
  { "eng": "Instructor", "spa": "Instructor/a", "category": "People in Sport", "emoji": "🧑‍🏫" },
  { "eng": "Adult", "spa": "Adulto/a", "category": "People in Sport", "emoji": "🧑" },
  { "eng": "Audience", "spa": "Audiencia / público", "category": "People in Sport", "emoji": "👥" },
  { "eng": "Bad", "spa": "Malo/a", "category": "Adjectives and Adverbs", "emoji": "👎" },
  { "eng": "Badly", "spa": "Mal", "category": "Adjectives and Adverbs", "emoji": "👎" },
  { "eng": "Careful", "spa": "Cuidadoso/a", "category": "Adjectives and Adverbs", "emoji": "⚠️" },
  { "eng": "Carefully", "spa": "Cuidadosamente", "category": "Adjectives and Adverbs", "emoji": "🧐" },
  { "eng": "Easy", "spa": "Fácil", "category": "Adjectives and Adverbs", "emoji": "✅" },
  { "eng": "Easily", "spa": "Fácilmente", "category": "Adjectives and Adverbs", "emoji": "✨" },
  { "eng": "Fast", "spa": "Rápido / rápidamente", "category": "Adjectives and Adverbs", "emoji": "💨" },
  { "eng": "Good", "spa": "Bueno/a", "category": "Adjectives and Adverbs", "emoji": "👍" },
  { "eng": "Well", "spa": "Bien", "category": "Adjectives and Adverbs", "emoji": "🌟" },
  { "eng": "Happy", "spa": "Feliz", "category": "Adjectives and Adverbs", "emoji": "😊" },
  { "eng": "Happily", "spa": "Felizmente", "category": "Adjectives and Adverbs", "emoji": "😄" },
  { "eng": "Slow", "spa": "Lento/a", "category": "Adjectives and Adverbs", "emoji": "🐢" },
  { "eng": "Slowly", "spa": "Lentamente", "category": "Adjectives and Adverbs", "emoji": "🐢" },
  { "eng": "Outside", "spa": "Afuera", "category": "Ability and Activities", "emoji": "🌳" },
  { "eng": "Run", "spa": "Correr", "category": "Ability and Activities", "emoji": "🏃" },
  { "eng": "Superpower", "spa": "Superpoder", "category": "Ability and Activities", "emoji": "⚡" },
  { "eng": "Swim", "spa": "Nadar", "category": "Ability and Activities", "emoji": "🏊" },
  { "eng": "Try", "spa": "Intentar", "category": "Ability and Activities", "emoji": "💪" },
  { "eng": "Can", "spa": "Poder / saber hacer", "category": "Ability and Activities", "emoji": "✅" },
  { "eng": "Can't", "spa": "No poder / no saber hacer", "category": "Ability and Activities", "emoji": "❌" },
  { "eng": "Can't stand", "spa": "No soportar", "category": "Likes and Dislikes", "emoji": "😖" },
  { "eng": "Disco dancing", "spa": "Bailar música disco", "category": "Likes and Dislikes", "emoji": "🕺" },
  { "eng": "Do nothing", "spa": "No hacer nada", "category": "Likes and Dislikes", "emoji": "🛋️" },
  { "eng": "Jogging", "spa": "Trotar", "category": "Likes and Dislikes", "emoji": "🏃" },
  { "eng": "Make a salad", "spa": "Preparar una ensalada", "category": "Likes and Dislikes", "emoji": "🥗" },
  { "eng": "Make a sandwich", "spa": "Preparar un sándwich", "category": "Likes and Dislikes", "emoji": "🥪" },
  { "eng": "Make new friends", "spa": "Hacer nuevos amigos", "category": "Likes and Dislikes", "emoji": "🤝" },
  { "eng": "Picnic", "spa": "Pícnic", "category": "Likes and Dislikes", "emoji": "🧺" },
  { "eng": "Rain", "spa": "Lluvia", "category": "Likes and Dislikes", "emoji": "🌧️" },
  { "eng": "Remote", "spa": "Control remoto", "category": "Likes and Dislikes", "emoji": "📺" },
  { "eng": "Ski", "spa": "Esquiar", "category": "Likes and Dislikes", "emoji": "⛷️" },
  { "eng": "Take photos", "spa": "Sacar fotos", "category": "Likes and Dislikes", "emoji": "📷" },
  { "eng": "Love", "spa": "Encantar / amar", "category": "Likes and Dislikes", "emoji": "❤️" },
  { "eng": "Like", "spa": "Gustar", "category": "Likes and Dislikes", "emoji": "👍" },
  { "eng": "Hate", "spa": "Odiar", "category": "Likes and Dislikes", "emoji": "😠" },
  { "eng": "Are you joking?", "spa": "¿Estás bromeando?", "category": "Opinion Language", "emoji": "😮" },
  { "eng": "Brilliant", "spa": "Brillante / genial", "category": "Opinion Language", "emoji": "✨" },
  { "eng": "Exciting", "spa": "Emocionante", "category": "Opinion Language", "emoji": "🤩" },
  { "eng": "Of course not!", "spa": "¡Por supuesto que no!", "category": "Opinion Language", "emoji": "🙅" },
  { "eng": "Scary", "spa": "Aterrador/a / da miedo", "category": "Opinion Language", "emoji": "😨" },
  { "eng": "That's so true.", "spa": "Es totalmente cierto.", "category": "Opinion Language", "emoji": "✅" },
  { "eng": "Violent", "spa": "Violento/a", "category": "Opinion Language", "emoji": "⚠️" },
  { "eng": "Boring", "spa": "Aburrido/a", "category": "Opinion Language", "emoji": "🥱" },
  { "eng": "Fantastic", "spa": "Fantástico/a", "category": "Opinion Language", "emoji": "🌟" },
  { "eng": "In my opinion", "spa": "En mi opinión", "category": "Opinion Language", "emoji": "💭" },
  { "eng": "To be honest", "spa": "Para ser sincero/a", "category": "Opinion Language", "emoji": "💬" },
  { "eng": "Badminton", "spa": "Bádminton", "category": "Sports Places and Equipment", "emoji": "🏸" },
  { "eng": "Table tennis", "spa": "Tenis de mesa", "category": "Sports Places and Equipment", "emoji": "🏓" },
  { "eng": "Helmet", "spa": "Casco", "category": "Sports Places and Equipment", "emoji": "⛑️" },
  { "eng": "Indoor sports", "spa": "Deportes de interior", "category": "Sports Places and Equipment", "emoji": "🏟️" },
  { "eng": "Outdoor sports", "spa": "Deportes al aire libre", "category": "Sports Places and Equipment", "emoji": "🌳" },
  { "eng": "PE kit", "spa": "Equipo / ropa de Educación Física", "category": "Sports Places and Equipment", "emoji": "🎽" },
  { "eng": "Playing field", "spa": "Campo de juego", "category": "Sports Places and Equipment", "emoji": "🏟️" },
  { "eng": "Ride a bike", "spa": "Andar en bicicleta", "category": "Sports Places and Equipment", "emoji": "🚲" },
  { "eng": "Sports café", "spa": "Café deportivo", "category": "Sports Places and Equipment", "emoji": "☕" },
  { "eng": "Sports hall", "spa": "Gimnasio / pabellón deportivo", "category": "Sports Places and Equipment", "emoji": "🏟️" },
  { "eng": "Swimming pool", "spa": "Piscina", "category": "Sports Places and Equipment", "emoji": "🏊" },
  { "eng": "Match", "spa": "Partido", "category": "Sports Places and Equipment", "emoji": "🏆" },
  { "eng": "Letter", "spa": "Carta", "category": "Sports Places and Equipment", "emoji": "✉️" },
  { "eng": "Life skill", "spa": "Habilidad para la vida", "category": "Sports Places and Equipment", "emoji": "🧠" },
  { "eng": "Acrobatic", "spa": "Acrobático/a", "category": "Unusual Free Time", "emoji": "🤸" },
  { "eng": "Digital version", "spa": "Versión digital", "category": "Unusual Free Time", "emoji": "💻" },
  { "eng": "Knife", "spa": "Cuchillo", "category": "Unusual Free Time", "emoji": "🔪" },
  { "eng": "Limit", "spa": "Límite", "category": "Unusual Free Time", "emoji": "🚧" },
  { "eng": "Patience", "spa": "Paciencia", "category": "Unusual Free Time", "emoji": "🧘" },
  { "eng": "Physical condition", "spa": "Estado físico", "category": "Unusual Free Time", "emoji": "💪" },
  { "eng": "Soap", "spa": "Jabón", "category": "Unusual Free Time", "emoji": "🧼" },
  { "eng": "Parkour", "spa": "Parkour", "category": "Unusual Free Time", "emoji": "🤸" },
  { "eng": "Bagpipes", "spa": "Gaita escocesa", "category": "Unusual Free Time", "emoji": "🎶" },
  { "eng": "Boy", "spa": "Niño / chico", "category": "Gender Equality and Plurals", "emoji": "👦" },
  { "eng": "Boys", "spa": "Niños / chicos", "category": "Gender Equality and Plurals", "emoji": "👦" },
  { "eng": "Girl", "spa": "Niña / chica", "category": "Gender Equality and Plurals", "emoji": "👧" },
  { "eng": "Girls", "spa": "Niñas / chicas", "category": "Gender Equality and Plurals", "emoji": "👧" },
  { "eng": "Child", "spa": "Niño/a", "category": "Gender Equality and Plurals", "emoji": "🧒" },
  { "eng": "Children", "spa": "Niños/as", "category": "Gender Equality and Plurals", "emoji": "🧒" },
  { "eng": "Man", "spa": "Hombre", "category": "Gender Equality and Plurals", "emoji": "👨" },
  { "eng": "Men", "spa": "Hombres", "category": "Gender Equality and Plurals", "emoji": "👨" },
  { "eng": "Woman", "spa": "Mujer", "category": "Gender Equality and Plurals", "emoji": "👩" },
  { "eng": "Women", "spa": "Mujeres", "category": "Gender Equality and Plurals", "emoji": "👩" },
  { "eng": "Person", "spa": "Persona", "category": "Gender Equality and Plurals", "emoji": "🧑" },
  { "eng": "People", "spa": "Personas", "category": "Gender Equality and Plurals", "emoji": "👥" },
  { "eng": "Human", "spa": "Ser humano", "category": "Gender Equality and Plurals", "emoji": "🧑" },
  { "eng": "Humans", "spa": "Seres humanos", "category": "Gender Equality and Plurals", "emoji": "👥" }
];

module.exports = { DIALOGUES, READING_COMPREHENSION, SENTENCES, VOCABULARY };
