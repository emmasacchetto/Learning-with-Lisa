const fs = require('fs');
const { DIALOGUES, READING_COMPREHENSION, SENTENCES, VOCABULARY } = require('./build_unit5.cjs');

const quizzes = [];
const gq = (id, cat, q, options, ans, spa, eng, skill="Vocabulary", emoji="⚽") => {
  quizzes.push({
    id: `u5_${id}`, category: cat, type: 'quiz', skill, question: q, options, correctAnswer: ans, emoji, spa, optionsLang: 'en', eng, year: '2026', source: 'I Succeed in English 2 - Unit 5 Sport'
  });
};

const sportsMeanings = [
  ["gq001", "Athletics", "Atletismo", ["Atletismo", "Ciclismo", "Karate"], "🏃"],
  ["gq002", "Basketball", "Básquet", ["Básquet", "Fútbol", "Rugby"], "🏀"],
  ["gq003", "Cricket", "Críquet", ["Críquet", "Gimnasia", "Skate / skateboarding"], "🏏"],
  ["gq004", "Cycling", "Ciclismo", ["Ciclismo", "Hockey", "Esquí"], "🚴"],
  ["gq005", "Football", "Fútbol", ["Fútbol", "Karate", "Natación"], "⚽"],
  ["gq006", "Gymnastics", "Gimnasia", ["Gimnasia", "Rugby", "Tenis"], "🤸"],
  ["gq007", "Hockey", "Hockey", ["Hockey", "Skate / skateboarding", "Vóley"], "🏑"],
  ["gq008", "Karate", "Karate", ["Karate", "Esquí", "Atletismo"], "🥋"],
  ["gq009", "Rugby", "Rugby", ["Rugby", "Natación", "Básquet"], "🏉"],
  ["gq010", "Skateboarding", "Skate / skateboarding", ["Skate / skateboarding", "Tenis", "Críquet"], "🛹"],
  ["gq011", "Skiing", "Esquí", ["Esquí", "Vóley", "Ciclismo"], "⛷️"],
  ["gq012", "Swimming", "Natación", ["Natación", "Atletismo", "Fútbol"], "🏊"],
  ["gq013", "Tennis", "Tenis", ["Tenis", "Básquet", "Gimnasia"], "🎾"],
  ["gq014", "Volleyball", "Vóley", ["Vóley", "Críquet", "Hockey"], "🏐"]
];

sportsMeanings.forEach(([id, eng, spa, opts, emoji]) => {
  quizzes.push({
    id: `u5_${id}`, category: "Sports and Free Time", type: 'quiz', skill: "Vocabulary", question: `¿Qué significa "${eng}"?`, options: opts, correctAnswer: spa, emoji, spa, optionsLang: 'es', eng, year: '2026', source: 'I Succeed in English 2 - Unit 5 Sport'
  });
});

const sportsSpanishToEng = [
  ["gq015", "Atletismo", "Athletics", ["Athletics", "Cricket", "Gymnastics"], "🏃"],
  ["gq016", "Básquet", "Basketball", ["Basketball", "Cycling", "Hockey"], "🏀"],
  ["gq017", "Críquet", "Cricket", ["Cricket", "Football", "Karate"], "🏏"],
  ["gq018", "Ciclismo", "Cycling", ["Cycling", "Gymnastics", "Rugby"], "🚴"],
  ["gq019", "Fútbol", "Football", ["Football", "Hockey", "Skateboarding"], "⚽"],
  ["gq020", "Gimnasia", "Gymnastics", ["Gymnastics", "Karate", "Skiing"], "🤸"],
  ["gq021", "Hockey", "Hockey", ["Hockey", "Rugby", "Swimming"], "🏑"],
  ["gq022", "Karate", "Karate", ["Karate", "Skateboarding", "Tennis"], "🥋"],
  ["gq023", "Rugby", "Rugby", ["Rugby", "Skiing", "Volleyball"], "🏉"],
  ["gq024", "Skate / skateboarding", "Skateboarding", ["Skateboarding", "Swimming", "Athletics"], "🛹"],
  ["gq025", "Esquí", "Skiing", ["Skiing", "Tennis", "Basketball"], "⛷️"],
  ["gq026", "Natación", "Swimming", ["Swimming", "Volleyball", "Cricket"], "🏊"],
  ["gq027", "Tenis", "Tennis", ["Tennis", "Athletics", "Cycling"], "🎾"],
  ["gq028", "Vóley", "Volleyball", ["Volleyball", "Basketball", "Football"], "🏐"]
];

sportsSpanishToEng.forEach(([id, spa, eng, opts, emoji]) => {
  gq(id, "Sports and Free Time", `¿Cómo se dice "${spa}" en inglés?`, opts, eng, spa, eng, "Vocabulary", emoji);
});

const collocations = [
  ["gq029", "basketball", "play", "play basketball", "Se dice play basketball."],
  ["gq030", "cricket", "play", "play cricket", "Se dice play cricket."],
  ["gq031", "football", "play", "play football", "Se dice play football."],
  ["gq032", "hockey", "play", "play hockey", "Se dice play hockey."],
  ["gq033", "rugby", "play", "play rugby", "Se dice play rugby."],
  ["gq034", "tennis", "play", "play tennis", "Se dice play tennis."],
  ["gq035", "volleyball", "play", "play volleyball", "Se dice play volleyball."],
  ["gq036", "cycling", "go", "go cycling", "Se dice go cycling."],
  ["gq037", "skateboarding", "go", "go skateboarding", "Se dice go skateboarding."],
  ["gq038", "skiing", "go", "go skiing", "Se dice go skiing."],
  ["gq039", "swimming", "go", "go swimming", "Se dice go swimming."],
  ["gq040", "athletics", "do", "do athletics", "Se dice do athletics."],
  ["gq041", "gymnastics", "do", "do gymnastics", "Se dice do gymnastics."],
  ["gq042", "karate", "do", "do karate", "Se dice do karate."]
];

collocations.forEach(([id, sport, ans, eng, spa]) => {
  const opts = ans === 'play' ? ["play", "go", "do"] : (ans === 'go' ? ["go", "play", "do"] : ["do", "play", "go"]);
  gq(id, "Sports Collocations", `Completa: ___ ${sport}.`, opts, ans, spa, eng, "Vocabulary", "🏅");
});

gq("gq043", "Sports Collocations", "¿Qué regla suele ayudar con deportes de pelota y equipo?", ["Use play", "Use go", "Use do only"], "Use play", "Muchos deportes de pelota usan play.", "Many ball and team sports use play.", "Reading", "⚽");
gq("gq044", "Sports Collocations", "¿Qué regla suele ayudar con deportes terminados en -ing?", ["Use go", "Use play", "Use is"], "Use go", "Muchos deportes terminados en -ing usan go.", "Many -ing sports use go.", "Reading", "🚴");
gq("gq045", "Sports Collocations", "¿Qué verbo suele usarse con athletics y karate?", ["do", "play", "go"], "do", "Se usa do con athletics y karate.", "Use do with athletics and karate.", "Reading", "🥋");

gq("gq046", "Team and Individual Sports", "Basketball is usually a ___.", ["team sport", "individual sport", "school subject"], "team sport", "El básquet suele ser un deporte de equipo.", "Basketball is usually a team sport.", "Vocabulary", "🏀");
gq("gq047", "Team and Individual Sports", "Football is usually a ___.", ["team sport", "individual sport", "drink"], "team sport", "El fútbol suele ser un deporte de equipo.", "Football is usually a team sport.", "Vocabulary", "⚽");
gq("gq048", "Team and Individual Sports", "Rugby is a ___.", ["team sport", "individual sport", "musical instrument"], "team sport", "El rugby es un deporte de equipo.", "Rugby is a team sport.", "Vocabulary", "🏉");
gq("gq049", "Team and Individual Sports", "Volleyball is a ___.", ["team sport", "individual sport", "room"], "team sport", "El vóley es un deporte de equipo.", "Volleyball is a team sport.", "Vocabulary", "🏐");
gq("gq050", "Team and Individual Sports", "Athletics can include many ___.", ["individual events", "kitchen activities", "food groups"], "individual events", "El atletismo puede incluir pruebas individuales.", "Athletics can include individual events.", "Vocabulary", "🏃");
gq("gq051", "Team and Individual Sports", "Gymnastics is often an ___.", ["individual sport", "team ball sport", "drink"], "individual sport", "La gimnasia suele practicarse como deporte individual.", "Gymnastics is often an individual sport.", "Vocabulary", "🤸");
gq("gq052", "Team and Individual Sports", "Karate is often an ___.", ["individual sport", "team ball sport", "meal"], "individual sport", "El karate suele ser individual.", "Karate is often an individual sport.", "Vocabulary", "🥋");
gq("gq053", "Team and Individual Sports", "Cycling can be an ___.", ["individual sport", "school room", "food"], "individual sport", "El ciclismo puede ser un deporte individual.", "Cycling can be an individual sport.", "Vocabulary", "🚴");

gq("gq054", "Sports Schedule", "Completa: Dan ___ football on Mondays.", ["plays", "does", "goes"], "plays", "Dan juega al fútbol los lunes.", "Dan plays football on Mondays.", "Grammar", "⚽");
gq("gq055", "Sports Schedule", "Completa: On Tuesdays, Dan ___ volleyball.", ["plays", "goes", "does"], "plays", "Los martes, Dan juega al vóley.", "On Tuesdays, Dan plays volleyball.", "Grammar", "🏐");
gq("gq056", "Sports Schedule", "Completa: On Wednesday, Dan ___ rugby.", ["plays", "goes", "does"], "plays", "El miércoles, Dan juega al rugby.", "On Wednesday, Dan plays rugby.", "Grammar", "🏉");
gq("gq057", "Sports Schedule", "Completa: On Thursday, Dan ___ gymnastics.", ["does", "plays", "goes"], "does", "El jueves, Dan hace gimnasia.", "On Thursday, Dan does gymnastics.", "Grammar", "🤸");
gq("gq058", "Sports Schedule", "Completa: On Friday, Dan ___ skiing.", ["goes", "plays", "does"], "goes", "El viernes, Dan esquía.", "On Friday, Dan goes skiing.", "Grammar", "⛷️");
gq("gq059", "Sports Schedule", "Completa: At the weekend, Dan ___ cycling.", ["goes", "plays", "does"], "goes", "El fin de semana, Dan practica ciclismo.", "At the weekend, Dan goes cycling.", "Grammar", "🚴");

gq("gq060", "Can for Ability and Permission", "Completa: I ___ play tennis.", ["can", "can to", "cans"], "can", "Puedo jugar al tenis.", "I can play tennis.", "Grammar", "🎾");
gq("gq061", "Can for Ability and Permission", "Forma negativa: I ___ play tennis.", ["can't", "don't can", "can not to"], "can't", "No puedo jugar al tenis.", "I can't play tennis.", "Grammar", "🎾");
gq("gq062", "Can for Ability and Permission", "Completa: She ___ swim very well.", ["can", "cans", "can to"], "can", "Ella sabe nadar muy bien.", "She can swim very well.", "Grammar", "🏊");
gq("gq063", "Can for Ability and Permission", "Completa: We ___ fly.", ["can't", "doesn't can", "aren't can"], "can't", "No podemos volar.", "We can't fly.", "Grammar", "🪽");
gq("gq064", "Can for Ability and Permission", "Pregunta: ___ you play rugby?", ["Can", "Do can", "Are can"], "Can", "¿Puedes jugar al rugby?", "Can you play rugby?", "Grammar", "🏉");
gq("gq065", "Can for Ability and Permission", "Pregunta: ___ he do gymnastics?", ["Can", "Does can", "Is can"], "Can", "¿Él puede hacer gimnasia?", "Can he do gymnastics?", "Grammar", "🤸");
gq("gq066", "Can for Ability and Permission", "Pregunta: ___ they swim?", ["Can", "Do can", "Are"], "Can", "¿Pueden nadar?", "Can they swim?", "Grammar", "🏊");
gq("gq067", "Can for Ability and Permission", "Respuesta corta: Can you skate?", ["Yes, I can.", "Yes, I do can.", "Yes, I am."], "Yes, I can.", "Sí, puedo.", "Yes, I can.", "Grammar", "🛹");
gq("gq068", "Can for Ability and Permission", "Respuesta corta negativa: Can she ski?", ["No, she can't.", "No, she doesn't.", "No, she isn't."], "No, she can't.", "No, no puede.", "No, she can't.", "Grammar", "⛷️");
gq("gq069", "Can for Ability and Permission", "Respuesta corta: Can they run fast?", ["Yes, they can.", "Yes, they are.", "Yes, they do."], "Yes, they can.", "Sí, pueden.", "Yes, they can.", "Grammar", "🏃");
gq("gq070", "Can for Ability and Permission", "Completa: Can I open the window? Yes, you ___.", ["can", "do", "are"], "can", "¿Puedo abrir la ventana? Sí.", "Can I open the window? Yes, you can.", "Grammar", "🪟");
gq("gq071", "Can for Ability and Permission", "Completa: Can we use the sports hall now? No, you ___.", ["can't", "don't", "aren't"], "can't", "¿Podemos usar el gimnasio ahora? No.", "Can we use the sports hall now? No, you can't.", "Grammar", "🏟️");
gq("gq072", "Can for Ability and Permission", "Para pedir permiso, una pregunta correcta es:", ["Can I use this ball?", "I can this ball?", "Do I can use this ball?"], "Can I use this ball?", "¿Puedo usar esta pelota?", "Can I use this ball?", "Grammar", "⚽");
gq("gq073", "Can for Ability and Permission", "Después de can, el verbo va en:", ["base form", "-ing only", "third-person -s"], "base form", "Después de can se usa la forma base.", "After can, use the base form.", "Grammar", "📘");
gq("gq074", "Can for Ability and Permission", "Can cambia con he/she/it:", ["No, it stays can.", "Yes, it becomes cans.", "It becomes does."], "No, it stays can.", "Can no cambia con he/she/it.", "Can does not change with he/she/it.", "Grammar", "📘");

gq("gq075", "Can - Story Practice", "Can the robot do gymnastics?", ["Yes, it can.", "No, it can't."], "Yes, it can.", "Sí, puede hacer gimnasia.", "The robot can do gymnastics.", "Grammar", "🤸");
gq("gq076", "Can - Story Practice", "Can the human characters fly?", ["No, they can't.", "Yes, they can."], "No, they can't.", "No, no pueden volar.", "Humans can't fly.", "Grammar", "🪽");
gq("gq077", "Can - Story Practice", "Can Ray play tennis?", ["No, he can't.", "Yes, he can."], "No, he can't.", "No, Ray no puede jugar al tenis.", "Ray can't play tennis.", "Grammar", "🎾");
gq("gq078", "Can - Story Practice", "Can the robot skateboard?", ["Yes, it can.", "No, it can't."], "Yes, it can.", "Sí, puede andar en skate.", "The robot can skateboard.", "Grammar", "🛹");
gq("gq079", "Can - Story Practice", "Elige una frase correcta sobre habilidad.", ["She can do karate.", "She can does karate.", "She cans do karate."], "She can do karate.", "Ella puede hacer karate.", "She can do karate.", "Grammar", "🥋");

const adverbs = [
  ["gq080", "bad", "badly"],
  ["gq081", "careful", "carefully"],
  ["gq082", "easy", "easily"],
  ["gq083", "fast", "fast"],
  ["gq084", "good", "well"],
  ["gq085", "happy", "happily"],
  ["gq086", "slow", "slowly"]
];

adverbs.forEach(([id, adj, adv]) => {
  gq(id, "Adjectives and Adverbs", `¿Cuál es el adverbio relacionado con "${adj}"?`, [adv, adj, `more ${adj}`], adv, `${adj} → ${adv}`, `${adj} → ${adv}`, "Grammar", "📝");
});

gq("gq087", "Adverbs of Manner", "Jamie is a slow runner. Jamie runs ___.", ["slowly", "slow", "slower noun"], "slowly", "Jamie corre lentamente.", "Jamie runs slowly.", "Grammar", "🏃");
gq("gq088", "Adverbs of Manner", "Sally is a good swimmer. Sally swims ___.", ["well", "good", "goodly"], "well", "Sally nada bien.", "Sally swims well.", "Grammar", "🏊");
gq("gq089", "Adverbs of Manner", "Ava is a quick runner. Ava runs ___.", ["quickly", "quick", "quickerly"], "quickly", "Ava corre rápidamente.", "Ava runs quickly.", "Grammar", "🏃");
gq("gq090", "Adverbs of Manner", "Erin is a good swimmer. Erin swims ___.", ["well", "good", "goodly"], "well", "Erin nada bien.", "Erin swims well.", "Grammar", "🏊");
gq("gq091", "Adverbs of Manner", "Dan draws careful pictures. He draws ___.", ["carefully", "careful", "care"], "carefully", "Dibuja cuidadosamente.", "He draws carefully.", "Grammar", "🎨");
gq("gq092", "Adverbs of Manner", "Ali can sing ___.", ["well", "good", "goodly"], "well", "Ali puede cantar bien.", "Ali can sing well.", "Grammar", "🎤");
gq("gq093", "Adverbs of Manner", "I do athletics ___.", ["badly", "bad", "baddly"], "badly", "Hago atletismo mal.", "I do athletics badly.", "Grammar", "🏃");
gq("gq094", "Adverbs of Manner", "Jack can run ___.", ["fast", "fastly", "good"], "fast", "Jack puede correr rápido.", "Jack can run fast.", "Grammar", "🏃");
gq("gq095", "Adverbs of Manner", "Lily walks ___.", ["slowly", "slow", "slowlily"], "slowly", "Lily camina lentamente.", "Lily walks slowly.", "Grammar", "🚶");
gq("gq096", "Adverbs of Manner", "Mia often sings ___.", ["happily", "happy", "happys"], "happily", "Mia suele cantar felizmente.", "Mia often sings happily.", "Grammar", "🎤");
gq("gq097", "Adverbs of Manner", "Alfie can play tennis ___.", ["well", "good", "careful"], "well", "Alfie puede jugar al tenis bien.", "Alfie can play tennis well.", "Grammar", "🎾");

gq("gq098", "Adverbs of Manner - Word Order", "Elige el orden correcto.", ["Aria can swim slowly.", "Aria slowly swim can.", "Can Aria slowly swimming."], "Aria can swim slowly.", "Aria puede nadar lentamente.", "Aria can swim slowly.", "Grammar", "🏊");
gq("gq099", "Adverbs of Manner - Word Order", "Elige el orden correcto.", ["Max can play volleyball well.", "Max well volleyball can play.", "Can Max volleyball plays well."], "Max can play volleyball well.", "Max puede jugar al vóley bien.", "Max can play volleyball well.", "Grammar", "🏐");
gq("gq100", "Adverbs of Manner - Word Order", "Elige el orden correcto.", ["Maria can run carefully between the bushes.", "Maria carefully can runs bushes.", "Can Maria careful run."], "Maria can run carefully between the bushes.", "Maria puede correr cuidadosamente entre los arbustos.", "Maria can run carefully between the bushes.", "Grammar", "🏃");
gq("gq101", "Adverbs of Manner - Word Order", "Elige el orden correcto.", ["Ollie can run fast.", "Ollie fast can runs.", "Can Ollie running fastly."], "Ollie can run fast.", "Ollie puede correr rápido.", "Ollie can run fast.", "Grammar", "🏃");
gq("gq102", "Adverbs of Manner - Word Order", "Elige el orden correcto.", ["Her homework is done happily.", "Her happily homework done is.", "Homework her happily is do."], "Her homework is done happily.", "Su tarea se hace alegremente.", "Her homework is done happily.", "Grammar", "📝");

gq("gq103", "Likes and Dislikes", "Completa: I love ___ football.", ["playing", "play", "plays"], "playing", "Me encanta jugar al fútbol.", "I love playing football.", "Grammar", "⚽");
gq("gq104", "Likes and Dislikes", "Completa: I like ___ pizzas.", ["eating", "eat", "eats"], "eating", "Me gusta comer pizza.", "I like eating pizzas.", "Grammar", "🍕");
gq("gq105", "Likes and Dislikes", "Completa: I can't stand ___ tomatoes.", ["eating", "eat", "eats"], "eating", "No soporto comer tomates.", "I can't stand eating tomatoes.", "Grammar", "🍅");
gq("gq106", "Likes and Dislikes", "Completa: I hate ___ in the rain.", ["jogging", "jog", "jogs"], "jogging", "Odio trotar bajo la lluvia.", "I hate jogging in the rain.", "Grammar", "🌧️");
gq("gq107", "Likes and Dislikes", "Completa: She likes ___.", ["skateboarding", "skateboard", "skateboards after like only"], "skateboarding", "A ella le gusta andar en skate.", "She likes skateboarding.", "Grammar", "🛹");
gq("gq108", "Likes and Dislikes", "Completa: He can't stand ___ homework.", ["doing", "do", "does"], "doing", "Él no soporta hacer la tarea.", "He can't stand doing homework.", "Grammar", "📝");
gq("gq109", "Likes and Dislikes", "Completa: We love ___ new friends.", ["making", "make", "makes"], "making", "Nos encanta hacer nuevos amigos.", "We love making new friends.", "Grammar", "🤝");
gq("gq110", "Likes and Dislikes", "Completa: They hate ___ nothing.", ["doing", "do", "does"], "doing", "Odian no hacer nada.", "They hate doing nothing.", "Grammar", "🛋️");
gq("gq111", "Likes and Dislikes", "Después de love/like/hate/can't stand, para una actividad puede usarse:", ["verb + -ing", "can + infinitive only", "past simple only"], "verb + -ing", "Se puede usar verbo + -ing.", "Use verb + -ing after love/like/hate/can't stand for activities.", "Grammar", "📘");
gq("gq112", "Likes and Dislikes", "Elige la frase correcta.", ["I like tennis.", "I like tennising.", "I like to tennis ball."], "I like tennis.", "Me gusta el tenis.", "I like tennis.", "Grammar", "🎾");
gq("gq113", "Likes and Dislikes", "Elige la frase correcta.", ["I love swimming.", "I love swimingg.", "I loves swimming."], "I love swimming.", "Me encanta nadar.", "I love swimming.", "Grammar", "🏊");
gq("gq114", "Likes and Dislikes", "Elige la frase correcta.", ["She hates cycling.", "She hate cycling.", "She hates cycle."], "She hates cycling.", "Ella odia andar en bicicleta.", "She hates cycling.", "Grammar", "🚴");

gq("gq115", "Pronunciation and -ing Forms", "¿Qué terminación aparece en 'swimming'?", ["-ing", "-ed", "-s only"], "-ing", "Swimming termina en -ing.", "Swimming ends in -ing.", "Reading", "🗣️");
gq("gq116", "Pronunciation and -ing Forms", "¿Cuál tiene la misma terminación sonora que 'running'?", ["cycling", "run", "sport"], "cycling", "Cycling también termina en -ing.", "Cycling also ends in -ing.", "Reading", "🗣️");
gq("gq117", "Pronunciation and -ing Forms", "¿Cuál es una forma -ing correcta?", ["jogging", "joging", "jogges"], "jogging", "Jogging lleva doble g.", "jogging", "Reading", "🏃");
gq("gq118", "Pronunciation and -ing Forms", "¿Cuál es una forma -ing correcta?", ["swimming", "swiming", "swimsing"], "swimming", "Swimming lleva doble m.", "swimming", "Reading", "🏊");

const objPronouns = [
  ["gq119", "I", "me", "my", "mine", "👤"],
  ["gq120", "you", "you", "your", "yours", "👤"],
  ["gq121", "he", "him", "his", "he", "👦"],
  ["gq122", "she", "her", "hers", "she", "👧"],
  ["gq123", "it", "it", "its", "itself only", "📦"],
  ["gq124", "we", "us", "our", "ours", "👥"],
  ["gq125", "they", "them", "their", "theirs", "👥"]
];
objPronouns.forEach(([id, sub, ans, o1, o2, emoji]) => {
  gq(id, "Object Pronouns", `${sub} → ___`, [ans, o1, o2], ans, `${sub} corresponde a ${ans} como pronombre objeto.`, `${sub} → ${ans}`, "Grammar", emoji);
});

gq("gq126", "Object Pronouns", "Completa: Look at ___. (yo)", ["me", "my", "I"], "me", "Mírame.", "Look at me.", "Grammar", "👀");
gq("gq127", "Object Pronouns", "Completa: I can't find ___. (él)", ["him", "he", "his"], "him", "No puedo encontrarlo.", "I can't find him.", "Grammar", "👦");
gq("gq128", "Object Pronouns", "Completa: Give these tomatoes to ___. (ella)", ["her", "she", "hers"], "her", "Dale estos tomates a ella.", "Give these tomatoes to her.", "Grammar", "🍅");
gq("gq129", "Object Pronouns", "Completa: They play tennis with ___. (nosotros)", ["us", "we", "our"], "us", "Juegan al tenis con nosotros.", "They play tennis with us.", "Grammar", "🎾");
gq("gq130", "Object Pronouns", "Completa: I know ___. (ellos)", ["them", "they", "their"], "them", "Los conozco.", "I know them.", "Grammar", "👥");
gq("gq131", "Object Pronouns", "Completa: I hate watching ___. (eso)", ["it", "its", "he"], "it", "Odio verlo.", "I hate watching it.", "Grammar", "📺");

gq("gq132", "Object Pronouns - Context", "Jack and Harry are my best friends. I see ___ every day.", ["them", "they", "their"], "them", "Veo a Jack y Harry todos los días.", "I see them every day.", "Grammar", "👥");
gq("gq133", "Object Pronouns - Context", "Lucas is my maths teacher. I see ___ on Mondays.", ["him", "he", "his"], "him", "Lo veo los lunes.", "I see him on Mondays.", "Grammar", "👨‍🏫");
gq("gq134", "Object Pronouns - Context", "Anna's best friend is a girl. She invites ___ after school.", ["her", "she", "hers"], "her", "La invita después de la escuela.", "She invites her after school.", "Grammar", "👧");
gq("gq135", "Object Pronouns - Context", "My aunt teaches me karate. I really like ___.", ["her", "she", "hers"], "her", "Me cae muy bien / me gusta ella.", "I really like her.", "Grammar", "🥋");
gq("gq136", "Object Pronouns - Context", "Joe, can I see ___ after class?", ["you", "your", "yours"], "you", "Joe, ¿puedo verte después de clase?", "Joe, can I see you after class?", "Grammar", "👤");
gq("gq137", "Object Pronouns - Context", "Pizza is my favourite food. I love ___.", ["it", "its", "them"], "it", "Me encanta.", "I love it.", "Grammar", "🍕");

gq("gq138", "Likes and Dislikes - Family", "Completa: My family ___ food.", ["likes", "like", "liking only"], "likes", "A mi familia le gusta la comida.", "My family likes food.", "Grammar", "🍽️");
gq("gq139", "Likes and Dislikes - Family", "Completa: My mum can't stand ___.", ["cooking", "cook", "cooks"], "cooking", "Mi mamá no soporta cocinar.", "My mum can't stand cooking.", "Grammar", "👩‍🍳");
gq("gq140", "Likes and Dislikes - Family", "Completa: My brother loves ___ for him.", ["cooking", "cook", "cooked"], "cooking", "A mi hermano le encanta que cocinen para él / cocinar para él, según contexto.", "My brother loves cooking.", "Grammar", "🍳");
gq("gq141", "Likes and Dislikes - Family", "Completa: My aunt loves ___.", ["cooking", "cook", "cooks"], "cooking", "A mi tía le encanta cocinar.", "My aunt loves cooking.", "Grammar", "👩‍🍳");
gq("gq142", "Likes and Dislikes - Family", "Elige una frase natural.", ["My sister doesn't like washing dishes.", "My sister doesn't likes washing dishes.", "My sister don't like wash dishes."], "My sister doesn't like washing dishes.", "A mi hermana no le gusta lavar los platos.", "My sister doesn't like washing dishes.", "Grammar", "🍽️");

gq("gq143", "Asking for and Giving Opinions", "Pregunta: ___ you like basketball?", ["Do", "Can opinion", "Are"], "Do", "¿Te gusta el básquet?", "Do you like basketball?", "Functions", "🏀");
gq("gq144", "Asking for and Giving Opinions", "Respuesta posible: Do you like basketball?", ["Yes, I do.", "Yes, I can only.", "It is at six."], "Yes, I do.", "Sí.", "Yes, I do.", "Functions", "✅");
gq("gq145", "Asking for and Giving Opinions", "Pregunta para pedir una opinión:", ["How do you feel about basketball?", "Where is basketball?", "Can basketball room?"], "How do you feel about basketball?", "¿Qué opinas del básquet?", "How do you feel about basketball?", "Functions", "🏀");
gq("gq146", "Asking for and Giving Opinions", "Frase para introducir una opinión sincera:", ["To be honest, ...", "Under the table, ...", "How often room..."], "To be honest, ...", "Para ser sincero/a...", "To be honest, ...", "Functions", "💬");
gq("gq147", "Asking for and Giving Opinions", "Frase para dar opinión:", ["I think it's boring.", "I think at Tuesday.", "I think there are."], "I think it's boring.", "Creo que es aburrido.", "I think it's boring.", "Functions", "🥱");
gq("gq148", "Asking for and Giving Opinions", "Pregunta para pedir una opinión:", ["What do you think about tennis?", "What tennis is room?", "Do tennis can?"], "What do you think about tennis?", "¿Qué piensas del tenis?", "What do you think about tennis?", "Functions", "🎾");
gq("gq149", "Asking for and Giving Opinions", "Frase para dar una opinión personal:", ["In my opinion, it's fantastic.", "My opinion in table.", "Opinion can tennis."], "In my opinion, it's fantastic.", "En mi opinión, es fantástico.", "In my opinion, it's fantastic.", "Functions", "🌟");
gq("gq150", "Asking for and Giving Opinions", "¿Qué significa 'That's so true.'?", ["Es totalmente cierto.", "No lo sé.", "Es una piscina."], "Es totalmente cierto.", "Es totalmente cierto.", "That's so true.", "Functions", "✅");
gq("gq151", "Asking for and Giving Opinions", "¿Qué significa 'Are you joking?'", ["¿Estás bromeando?", "¿Estás nadando?", "¿Estás en la escuela?"], "¿Estás bromeando?", "¿Estás bromeando?", "Are you joking?", "Functions", "😮");
gq("gq152", "Asking for and Giving Opinions", "¿Qué significa 'Of course not!'?", ["¡Por supuesto que no!", "¡Por supuesto que sí!", "A veces."], "¡Por supuesto que no!", "¡Por supuesto que no!", "Of course not!", "Functions", "🙅");

gq("gq153", "Opinions - Word Order", "Elige el orden correcto.", ["Do you like skateboarding?", "Skateboarding do like you?", "You like do skateboarding?"], "Do you like skateboarding?", "¿Te gusta andar en skate?", "Do you like skateboarding?", "Functions", "🛹");
gq("gq154", "Opinions - Word Order", "Elige el orden correcto.", ["How do you feel about cricket?", "How cricket feel you do?", "Do about cricket you feel how?"], "How do you feel about cricket?", "¿Qué opinas del críquet?", "How do you feel about cricket?", "Functions", "🏏");
gq("gq155", "Opinions - Word Order", "Elige el orden correcto.", ["Do you like rugby?", "Rugby like do you?", "You rugby do like?"], "Do you like rugby?", "¿Te gusta el rugby?", "Do you like rugby?", "Functions", "🏉");
gq("gq156", "Opinions - Word Order", "Elige el orden correcto.", ["What do you think about swimming?", "What swimming do you think about?", "Do think swimming what?"], "What do you think about swimming?", "¿Qué piensas de la natación?", "What do you think about swimming?", "Functions", "🏊");
gq("gq157", "Opinions - Word Order", "Elige el orden correcto.", ["In my opinion, basketball is exciting.", "Basketball in exciting opinion my.", "Opinion basketball my exciting."], "In my opinion, basketball is exciting.", "En mi opinión, el básquet es emocionante.", "In my opinion, basketball is exciting.", "Functions", "🏀");

gq("gq158", "Opinions - Responses", "Do you like gymnastics?", ["Yes, I do. I love it.", "At half past six.", "Three sandwiches."], "Yes, I do. I love it.", "Sí. Me encanta.", "Yes, I do. I love it.", "Functions", "🤸");
gq("gq159", "Opinions - Responses", "How do you feel about cycling?", ["To be honest, I don't like riding a bike.", "I am from Spain.", "It's under the table."], "To be honest, I don't like riding a bike.", "Para ser sincero/a, no me gusta andar en bicicleta.", "To be honest, I don't like riding a bike.", "Functions", "🚴");
gq("gq160", "Opinions - Responses", "What do you think about swimming?", ["In my opinion, it's fantastic!", "No, I don't swim table.", "There are some."], "In my opinion, it's fantastic!", "En mi opinión, ¡es fantástico!", "In my opinion, it's fantastic!", "Functions", "🏊");
gq("gq161", "Opinions - Responses", "Do you like team sports?", ["No, I don't. I can't stand team sports.", "It's on Monday at table.", "I am thirteen."], "No, I don't. I can't stand team sports.", "No. No soporto los deportes de equipo.", "No, I don't. I can't stand team sports.", "Functions", "👥");

gq("gq162", "Skills Trainer - Sports Questions", "Respuesta: My favourite sport is tennis. Pregunta:", ["What's your favourite sport?", "Where do you play?", "How old is tennis?"], "What's your favourite sport?", "¿Cuál es tu deporte favorito?", "What's your favourite sport?", "Functions", "🎾");
gq("gq163", "Skills Trainer - Sports Questions", "Respuesta: I play tennis twice a week. Pregunta:", ["How often do you play tennis?", "Where is tennis?", "Can tennis talk?"], "How often do you play tennis?", "¿Con qué frecuencia juegas al tenis?", "How often do you play tennis?", "Functions", "🔁");
gq("gq164", "Skills Trainer - Sports Questions", "Respuesta: I play it at the park. Pregunta:", ["Where do you play it?", "How often park?", "Who is tennis?"], "Where do you play it?", "¿Dónde lo juegas?", "Where do you play it?", "Functions", "📍");
gq("gq165", "Skills Trainer - Sports Questions", "Respuesta: Yes, my friends like playing tennis. Pregunta:", ["Do your friends like playing tennis?", "Can friends are tennis?", "Where friends tennis?"], "Do your friends like playing tennis?", "¿A tus amigos les gusta jugar al tenis?", "Do your friends like playing tennis?", "Functions", "👥");
gq("gq166", "Skills Trainer - Sports Questions", "Pregunta adecuada para una nueva amiga en un club:", ["Can you swim?", "Is your fridge blue?", "How many onions?"], "Can you swim?", "¿Sabes nadar?", "Can you swim?", "Functions", "🏊");
gq("gq167", "Skills Trainer - Sports Questions", "Pregunta adecuada:", ["Where do you swim?", "Where swim you are?", "Is swim where?"], "Where do you swim?", "¿Dónde nadas?", "Where do you swim?", "Functions", "🏊");

gq("gq168", "Culture and Skills - Sports for All", "¿Dónde pueden hacer deportes al aire libre los estudiantes?", ["On playing fields", "Only in kitchens", "Only in bedrooms"], "On playing fields", "Pueden hacer deportes al aire libre en campos de juego.", "Students can do outdoor sports on playing fields.", "Reading", "🏟️");
gq("gq169", "Culture and Skills - Sports for All", "¿Qué lugar se usa para deportes de interior?", ["Sports hall", "Playing field only", "Café kitchen"], "Sports hall", "El gimnasio/pabellón se usa para deportes de interior.", "A sports hall is used for indoor sports.", "Reading", "🏟️");
gq("gq170", "Culture and Skills - Sports for All", "¿Qué palabra significa 'equipo de Educación Física'?", ["PE kit", "picnic", "remote"], "PE kit", "Equipo / ropa de Educación Física.", "PE kit", "Reading", "🎽");
gq("gq171", "Culture and Skills - Sports for All", "¿Qué deporte aparece como muy popular entre chicos en el texto?", ["football", "soap carving", "cooking"], "football", "El fútbol aparece como muy popular.", "Football is described as very popular.", "Reading", "⚽");
gq("gq172", "Culture and Skills - Sports for All", "¿Qué deporte aparece como muy popular entre chicas en el texto?", ["swimming", "cricket only", "knife skills"], "swimming", "La natación aparece como muy popular.", "Swimming is described as very popular.", "Reading", "🏊");
gq("gq173", "Culture and Skills - Sports for All", "¿Qué idea central plantea la sección 'Sports for all'?", ["Sport should be available to everyone.", "Only adults should do sport.", "Only team sports matter."], "Sport should be available to everyone.", "El deporte debería ser accesible para todos.", "Sport should be available to everyone.", "Reading", "🤝");
gq("gq174", "Culture and Skills - Sports for All", "¿Qué tema de igualdad aparece en la lectura?", ["Differences in opportunities and media attention", "Furniture prices", "Food origins"], "Differences in opportunities and media attention", "Se comparan oportunidades y visibilidad deportiva.", "The text discusses differences in opportunities and media attention.", "Reading", "⚖️");
gq("gq175", "Culture and Skills - Sports for All", "¿Qué es an audience?", ["The people watching an event", "A sports shoe", "A type of ball"], "The people watching an event", "El público que observa un evento.", "An audience is the people watching an event.", "Reading", "👥");
gq("gq176", "Culture and Skills - Sports for All", "¿Qué significa indoor sports?", ["Deportes de interior", "Deportes acuáticos solamente", "Viajes"], "Deportes de interior", "Deportes de interior", "Indoor sports", "Reading", "🏟️");
gq("gq177", "Culture and Skills - Sports for All", "¿Qué significa outdoor sports?", ["Deportes al aire libre", "Deportes de mesa solamente", "Tareas escolares"], "Deportes al aire libre", "Deportes al aire libre", "Outdoor sports", "Reading", "🌳");

gq("gq178", "Listening Strategy - Relationships", "Dos personas de edad similar hablan de su equipo favorito. Relación probable:", ["two friends", "parent and child", "instructor and adult only"], "two friends", "Dos amigos.", "two friends", "Listening", "👥");
gq("gq179", "Listening Strategy - Relationships", "Una persona adulta explica a un joven cómo practicar. Relación probable:", ["instructor and learner", "two toddlers", "two kitchen objects"], "instructor and learner", "Instructor/a y alumno/a.", "instructor and learner", "Listening", "🧑‍🏫");
gq("gq180", "Listening Strategy - Relationships", "Un adulto pregunta a un menor por una actividad escolar. Relación probable:", ["parent and child", "two sports balls", "two tables"], "parent and child", "Padre/madre e hijo/a.", "parent and child", "Listening", "👨‍👧");
gq("gq181", "Listening Strategy - Relationships", "Pista de escucha: tono informal entre personas de la misma edad suele sugerir:", ["friends", "a formal interview only", "objects"], "friends", "Amigos.", "friends", "Listening", "🎧");

gq("gq182", "Writing - Sporting Hero Fact File", "¿Qué dato pertenece a un fact file deportivo?", ["sport", "wardrobe colour only", "breakfast room"], "sport", "El deporte es un dato pertinente.", "sport", "Reading", "🏅");
gq("gq183", "Writing - Sporting Hero Fact File", "¿Qué dato puede aparecer?", ["birthplace", "number of sofas", "type of kitchen"], "birthplace", "Lugar de nacimiento.", "birthplace", "Reading", "🌍");
gq("gq184", "Writing - Sporting Hero Fact File", "¿Qué dato puede aparecer?", ["medals", "number of cupboards", "favourite sink"], "medals", "Medallas.", "medals", "Reading", "🥇");
gq("gq185", "Writing - Sporting Hero Fact File", "¿Qué dato puede aparecer?", ["personal best", "Wi-Fi code", "school lunch only"], "personal best", "Marca personal.", "personal best", "Reading", "🏆");
gq("gq186", "Writing - Sporting Hero Fact File", "Completa: She can jump very ___.", ["far", "goodly", "careful adjective"], "far", "Puede saltar muy lejos.", "She can jump very far.", "Reading", "🏃");
gq("gq187", "Writing - Sporting Hero Fact File", "Completa: She is a gold ___.", ["medallist", "audience", "helmet"], "medallist", "Es medallista de oro.", "She is a gold medallist.", "Reading", "🥇");

gq("gq188", "Culture and Skills - Unusual Free Time", "¿Qué material usa una persona para crear pequeñas figuras en la lectura?", ["soap", "football grass", "milk"], "soap", "Usa jabón.", "The hobby uses soap.", "Reading", "🧼");
gq("gq189", "Culture and Skills - Unusual Free Time", "¿Qué herramienta puede necesitar para tallar jabón?", ["a special knife", "a tennis ball", "a swimming pool"], "a special knife", "Puede necesitar un cuchillo especial.", "A special knife can be used.", "Reading", "🔪");
gq("gq190", "Culture and Skills - Unusual Free Time", "¿Qué cualidad necesita este hobby?", ["patience", "speed only", "anger"], "patience", "Necesita paciencia.", "The hobby needs patience.", "Reading", "🧘");
gq("gq191", "Culture and Skills - Unusual Free Time", "Parkour incluye:", ["running, jumping and climbing", "only sitting", "only swimming"], "running, jumping and climbing", "Incluye correr, saltar y trepar.", "Parkour includes running, jumping and climbing.", "Reading", "🤸");
gq("gq192", "Culture and Skills - Unusual Free Time", "¿Qué es importante para hacer parkour con seguridad?", ["understanding your limits and good physical condition", "ignoring all limits", "no practice"], "understanding your limits and good physical condition", "Es importante conocer los límites y tener buen estado físico.", "It is important to understand your limits and be in good physical condition.", "Reading", "💪");
gq("gq193", "Culture and Skills - Unusual Free Time", "Una versión electrónica de un instrumento es una:", ["digital version", "physical condition", "sports hall"], "digital version", "Versión digital.", "digital version", "Reading", "💻");
gq("gq194", "Culture and Skills - Unusual Free Time", "¿Qué significa acrobatic?", ["Acrobático/a", "Aburrido/a", "Comestible"], "Acrobático/a", "Acrobático/a", "Acrobatic", "Reading", "🤸");
gq("gq195", "Culture and Skills - Unusual Free Time", "¿Qué significa physical condition?", ["Estado físico", "Opinión personal", "Material escolar"], "Estado físico", "Estado físico", "Physical condition", "Reading", "💪");
gq("gq196", "Culture and Skills - Unusual Free Time", "¿Qué significa limit?", ["Límite", "Piscina", "Medalla"], "Límite", "Límite", "Limit", "Reading", "🚧");
gq("gq197", "Culture and Skills - Unusual Free Time", "¿Qué significa patience?", ["Paciencia", "Velocidad", "Violencia"], "Paciencia", "Paciencia", "Patience", "Reading", "🧘");

gq("gq198", "Writing - Friend or Family Member", "Completa: My friend is 13 years ___.", ["old", "good", "time"], "old", "Mi amiga tiene 13 años.", "My friend is 13 years old.", "Reading", "🎂");
gq("gq199", "Writing - Friend or Family Member", "Completa: In her free ___, she plays the guitar.", ["time", "well", "good"], "time", "En su tiempo libre, toca la guitarra.", "In her free time, she plays the guitar.", "Reading", "🎸");
gq("gq200", "Writing - Friend or Family Member", "Completa: She ___ the guitar.", ["plays", "play", "playing only"], "plays", "Ella toca la guitarra.", "She plays the guitar.", "Reading", "🎸");
gq("gq201", "Writing - Friend or Family Member", "Completa: She can play really ___.", ["well", "good", "goodly"], "well", "Puede tocar muy bien.", "She can play really well.", "Reading", "🎸");
gq("gq202", "Writing - Friend or Family Member", "Completa: She ___ cook at all.", ["can't", "doesn't can", "can not to"], "can't", "No sabe cocinar en absoluto.", "She can't cook at all.", "Reading", "👩‍🍳");
gq("gq203", "Writing - Friend or Family Member", "Para describir a una persona puedes incluir:", ["name, age, free-time activities and abilities", "only furniture", "only food prices"], "name, age, free-time activities and abilities", "Nombre, edad, actividades y habilidades.", "Include name, age, free-time activities and abilities.", "Reading", "✍️");

gq("gq204", "Fast Finishers - Unit 5", "Completa la palabra: volley___", ["ball", "sport", "ing"], "ball", "Volleyball.", "volleyball", "Grammar", "🏐");
gq("gq205", "Fast Finishers - Unit 5", "Completa la palabra: basket___", ["ball", "run", "ski"], "ball", "Basketball.", "basketball", "Grammar", "🏀");
gq("gq206", "Fast Finishers - Unit 5", "Elige el intruso.", ["volleyball", "football", "cycling"], "cycling", "Cycling no usa play como los otros dos.", "Cycling is the odd one out.", "Grammar", "🚴");
gq("gq207", "Fast Finishers - Unit 5", "Elige el intruso.", ["cycling", "skiing", "football"], "football", "Football no usa go como cycling y skiing.", "Football is the odd one out.", "Grammar", "⚽");
gq("gq208", "Fast Finishers - Unit 5", "Elige el intruso.", ["athletics", "karate", "basketball"], "basketball", "Basketball usa play, no do.", "Basketball is the odd one out.", "Grammar", "🏀");
gq("gq209", "Fast Finishers - Unit 5", "Completa: My friend ___ run fast.", ["can", "cans", "can to"], "can", "Mi amigo/a puede correr rápido.", "My friend can run fast.", "Grammar", "🏃");
gq("gq210", "Fast Finishers - Unit 5", "Completa: My parents ___ dance well.", ["can", "cans", "does can"], "can", "Mis padres pueden bailar bien.", "My parents can dance well.", "Grammar", "💃");
gq("gq211", "Fast Finishers - Unit 5", "Completa negativo: My teacher ___ fly.", ["can't", "doesn't can", "isn't can"], "can't", "Mi profesor/a no puede volar.", "My teacher can't fly.", "Grammar", "🪽");
gq("gq212", "Fast Finishers - Unit 5", "Completa: My teacher can speak ___.", ["clearly", "clear", "clears"], "clearly", "Mi profesor/a puede hablar claramente.", "My teacher can speak clearly.", "Grammar", "🗣️");
gq("gq213", "Fast Finishers - Unit 5", "Completa: My friend can run ___.", ["quickly", "quick", "quicker adjective only"], "quickly", "Mi amigo/a puede correr rápidamente.", "My friend can run quickly.", "Grammar", "🏃");

gq("gq214", "Fun Time - Unit 5", "Coloca en 'go':", ["cycling", "football", "athletics"], "cycling", "Se dice go cycling.", "go cycling", "Grammar", "🚴");
gq("gq215", "Fun Time - Unit 5", "Coloca en 'play':", ["football", "skiing", "gymnastics"], "football", "Se dice play football.", "play football", "Grammar", "⚽");
gq("gq216", "Fun Time - Unit 5", "Coloca en 'do':", ["gymnastics", "volleyball", "cycling"], "gymnastics", "Se dice do gymnastics.", "do gymnastics", "Grammar", "🤸");
gq("gq217", "Fun Time - Unit 5", "Coloca en 'play':", ["tennis", "athletics", "skiing"], "tennis", "Se dice play tennis.", "play tennis", "Grammar", "🎾");
gq("gq218", "Fun Time - Unit 5", "Coloca en 'go':", ["swimming", "basketball", "karate"], "swimming", "Se dice go swimming.", "go swimming", "Grammar", "🏊");
gq("gq219", "Fun Time - Unit 5", "Coloca en 'do':", ["karate", "cricket", "hockey"], "karate", "Se dice do karate.", "do karate", "Grammar", "🥋");
gq("gq220", "Fun Time - Unit 5", "Forma una frase posible con can.", ["I can run fast.", "I can fast runs.", "Can I running fast."], "I can run fast.", "Puedo correr rápido.", "I can run fast.", "Grammar", "🏃");
gq("gq221", "Fun Time - Unit 5", "Forma una frase posible.", ["You can cook well.", "You can well cooking.", "You cooks can well."], "You can cook well.", "Puedes cocinar bien.", "You can cook well.", "Grammar", "👩‍🍳");
gq("gq222", "Fun Time - Unit 5", "Forma una frase posible.", ["I love doing sport.", "I love do sport.", "I loves doing sport."], "I love doing sport.", "Me encanta hacer deporte.", "I love doing sport.", "Grammar", "❤️");

const plurals = [
  ["gq223", "boy", "boys", ["boys", "men", "people"], "Boy → boys.", "boy → boys", "👦"],
  ["gq224", "child", "children", ["children", "childs", "people"], "Child → children.", "child → children", "🧒"],
  ["gq225", "girl", "girls", ["girls", "women", "child"], "Girl → girls.", "girl → girls", "👧"],
  ["gq226", "human", "humans", ["humans", "humanes", "people only"], "Human → humans.", "human → humans", "🧑"],
  ["gq227", "man", "men", ["men", "mans", "males"], "Man → men.", "man → men", "👨"],
  ["gq228", "person", "people", ["people", "persons only in this exercise", "peoples"], "Person → people.", "person → people", "👥"],
  ["gq229", "woman", "women", ["women", "womans", "girls"], "Woman → women.", "woman → women", "👩"]
];

plurals.forEach(([id, sing, ans, opts, spa, eng, emoji]) => {
  gq(id, "SDG - Gender Equality and Plurals", `Plural de ${sing}:`, opts, ans, spa, eng, "Vocabulary", emoji);
});

gq("gq230", "SDG - Gender Equality and Plurals", "¿Qué par es irregular?", ["man → men", "boy → boys", "girl → girls"], "man → men", "Man → men es irregular.", "man → men", "Vocabulary", "📝");
gq("gq231", "SDG - Gender Equality and Plurals", "¿Qué par es irregular?", ["person → people", "human → humans", "boy → boys"], "person → people", "Person → people es irregular.", "person → people", "Vocabulary", "📝");
gq("gq232", "SDG - Gender Equality and Plurals", "¿Qué tema conecta esta actividad con la unidad?", ["gender equality", "furniture", "food waste"], "gender equality", "Igualdad de género.", "gender equality", "Vocabulary", "⚖️");

gq("gq233", "Review Unit 5", "Completa: Harry ___ rugby at school.", ["plays", "does", "goes"], "plays", "Harry juega al rugby en la escuela.", "Harry plays rugby at school.", "Grammar", "🏉");
gq("gq234", "Review Unit 5", "Completa: Katie ___ skiing on holidays.", ["goes", "plays", "does"], "goes", "Katie esquía en vacaciones.", "Katie goes skiing on holidays.", "Grammar", "⛷️");
gq("gq235", "Review Unit 5", "Completa: Danny ___ athletics every weekend.", ["does", "plays", "goes"], "does", "Danny hace atletismo cada fin de semana.", "Danny does athletics every weekend.", "Grammar", "🏃");
gq("gq236", "Review Unit 5", "Completa: Sarah ___ gymnastics.", ["does", "plays", "goes"], "does", "Sarah hace gimnasia.", "Sarah does gymnastics.", "Grammar", "🤸");
gq("gq237", "Review Unit 5", "Completa: Timothy ___ tennis every day.", ["plays", "goes", "does"], "plays", "Timothy juega al tenis todos los días.", "Timothy plays tennis every day.", "Grammar", "🎾");
gq("gq238", "Review Unit 5", "Completa: Mia ___ cycling after school.", ["goes", "plays", "does"], "goes", "Mia practica ciclismo después de la escuela.", "Mia goes cycling after school.", "Grammar", "🚴");
gq("gq239", "Review Unit 5", "Elige: I don't like ___.", ["going athletics", "doing athletics", "playing athletics"], "doing athletics", "No me gusta hacer atletismo.", "I don't like doing athletics.", "Grammar", "🏃");
gq("gq240", "Review Unit 5", "Elige: We sometimes ___ rugby at school.", ["play", "go", "do"], "play", "A veces jugamos al rugby en la escuela.", "We sometimes play rugby at school.", "Grammar", "🏉");
gq("gq241", "Review Unit 5", "Elige: I usually ___ volleyball every day.", ["play", "go", "do"], "play", "Normalmente juego al vóley todos los días.", "I usually play volleyball every day.", "Grammar", "🏐");
gq("gq242", "Review Unit 5", "Elige: We never ___ skateboarding at school.", ["go", "play", "do"], "go", "Nunca andamos en skate en la escuela.", "We never go skateboarding at school.", "Grammar", "🛹");
gq("gq243", "Review Unit 5", "Elige: Where do you ___ tennis?", ["play", "go", "do"], "play", "¿Dónde juegas al tenis?", "Where do you play tennis?", "Grammar", "🎾");
gq("gq244", "Review Unit 5", "Elige: I ___ gymnastics at the sports centre.", ["do", "play", "go"], "do", "Hago gimnasia en el centro deportivo.", "I do gymnastics at the sports centre.", "Grammar", "🤸");

gq("gq245", "Review Unit 5", "Completa: My friend can do gymnastics ___.", ["well", "good", "goodly"], "well", "Mi amigo/a puede hacer gimnasia bien.", "My friend can do gymnastics well.", "Grammar", "🤸");
gq("gq246", "Review Unit 5", "Completa: Can your mum play football ___?", ["well", "good", "goodly"], "well", "¿Tu mamá puede jugar bien al fútbol?", "Can your mum play football well?", "Grammar", "⚽");
gq("gq247", "Review Unit 5", "Completa: Can you and your best friend run ___?", ["fast", "fastly", "good"], "fast", "¿Tú y tu mejor amigo/a pueden correr rápido?", "Can you and your best friend run fast?", "Grammar", "🏃");
gq("gq248", "Review Unit 5", "Completa: I can skateboard ___.", ["slowly", "slow", "slows"], "slowly", "Puedo andar en skate lentamente.", "I can skateboard slowly.", "Grammar", "🛹");
gq("gq249", "Review Unit 5", "Elige: Eddie loves ___.", ["doing sport", "do sport", "does sport"], "doing sport", "A Eddie le encanta hacer deporte.", "Eddie loves doing sport.", "Grammar", "🏅");
gq("gq250", "Review Unit 5", "Completa: I hate watching cricket on TV. I don't like ___.", ["it", "him", "them"], "it", "Odio ver críquet por TV. No me gusta.", "I don't like it.", "Grammar", "🏏");
gq("gq251", "Review Unit 5", "Completa: My friend is nice. I like ___.", ["him", "he", "his"], "him", "Me cae bien / me gusta él.", "I like him.", "Grammar", "👦");
gq("gq252", "Review Unit 5", "Completa: My friends are funny. I like ___.", ["them", "they", "their"], "them", "Me gustan ellos / me caen bien.", "I like them.", "Grammar", "👥");
gq("gq253", "Review Unit 5", "Respuesta: Do you like swimming?", ["Yes, I do.", "Yes, I can only.", "At the pool."], "Yes, I do.", "Sí.", "Yes, I do.", "Grammar", "🏊");
gq("gq254", "Review Unit 5", "Pregunta adecuada para 'In my opinion, it's fantastic.'", ["How do you feel about skiing?", "Where is your PE kit?", "Can you cook?"], "How do you feel about skiing?", "¿Qué opinas del esquí?", "How do you feel about skiing?", "Grammar", "⛷️");
gq("gq255", "Review Unit 5", "Respuesta adecuada: What do you think about football?", ["I think it's great.", "No, I can't swim.", "At six o'clock."], "I think it's great.", "Creo que es genial.", "I think it's great.", "Grammar", "⚽");

const unit5 = {
  unit: "Unid. 5: Sport",
  source: "I Succeed in English 2 Studentsbook and Workbook",
  year: "2026",
  DIALOGUES,
  GRAMMAR_QUIZZES: quizzes,
  READING_COMPREHENSION,
  SENTENCES,
  VOCABULARY
};

fs.writeFileSync('src/units/unit5.json', JSON.stringify(unit5, null, 2), 'utf8');
console.log('Unit 5 saved successfully. Quizzes:', quizzes.length);
