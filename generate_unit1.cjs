const fs = require('fs');

const { DIALOGUES, READING_COMPREHENSION, SENTENCES, VOCABULARY } = require('./build_unit1.cjs');

// We have the exact 204 quizzes in the prompt. Let's write them cleanly.
const quizzes = [];

const gq = (id, cat, q, options, ans, spa, eng, skill="Vocabulary", emoji="🌍") => {
  quizzes.push({
    id: `u1_${id}`, category: cat, type: 'quiz', skill, question: q, options, correctAnswer: ans, emoji, spa, optionsLang: 'en', eng, year: '2026', source: 'I Succeed in English 2 - Unit 1 One world'
  });
};

const cList = [
  ["Scotland", "Scottish", "🏴", "Escocia", "escocés/escocesa", "Welsh", "Italian", "the UK", "Germany"],
  ["England", "English", "🏴", "Inglaterra", "inglés/inglesa", "British", "German", "Spain", "Poland"],
  ["Ireland", "Irish", "🇮🇪", "Irlanda", "irlandés/irlandesa", "Spanish", "Polish", "France", "Greece"],
  ["Wales", "Welsh", "🏴", "Gales", "galés/galesa", "French", "Greek", "Italy", "Morocco"],
  ["the UK", "British", "🇬🇧", "el Reino Unido", "británico/británica", "Italian", "Moroccan", "Germany", "Egypt"],
  ["Spain", "Spanish", "🇪🇸", "España", "español/española", "German", "Egyptian", "Poland", "the USA"],
  ["France", "French", "🇫🇷", "Francia", "francés/francesa", "Polish", "American", "Greece", "China"],
  ["Italy", "Italian", "🇮🇹", "Italia", "italiano/italiana", "Greek", "Chinese", "Morocco", "Argentina"],
  ["Germany", "German", "🇩🇪", "Alemania", "alemán/alemana", "Moroccan", "Argentinian", "Egypt", "Brazil"],
  ["Poland", "Polish", "🇵🇱", "Polonia", "polaco/polaca", "Egyptian", "Brazilian", "the USA", "Russia"],
  ["Greece", "Greek", "🇬🇷", "Grecia", "griego/griega", "American", "Russian", "China", "Turkey"],
  ["Morocco", "Moroccan", "🇲🇦", "Marruecos", "marroquí", "Chinese", "Turkish", "Argentina", "Mexico"],
  ["Egypt", "Egyptian", "🇪🇬", "Egipto", "egipcio/egipcia", "Argentinian", "Mexican", "Brazil", "Scotland"],
  ["the USA", "American", "🇺🇸", "Estados Unidos", "estadounidense", "Brazilian", "Scottish", "Russia", "England"],
  ["China", "Chinese", "🇨🇳", "China", "chino/china", "Russian", "English", "Turkey", "Ireland"],
  ["Argentina", "Argentinian", "🇦🇷", "Argentina", "argentino/argentina", "Turkish", "Irish", "Mexico", "Wales"],
  ["Brazil", "Brazilian", "🇧🇷", "Brasil", "brasileño/brasileña", "Mexican", "Welsh", "Scotland", "the UK"],
  ["Russia", "Russian", "🇷🇺", "Rusia", "ruso/rusa", "Scottish", "British", "England", "Spain"],
  ["Turkey", "Turkish", "🇹🇷", "Turquía", "turco/turca", "English", "Spanish", "Ireland", "France"],
  ["Mexico", "Mexican", "🇲🇽", "México", "mexicano/mexicana", "Irish", "French", "Wales", "Italy"]
];

let idx = 1;
cList.forEach(([country, nat, emoji, spaC, spaN, o1, o2, o3, o4]) => {
  const pad = String(idx++).padStart(3, '0');
  gq(`gq${pad}`, "Countries and Nationalities", `People from ${country} are ___.`, [nat, o1, o2], nat, `Las personas de ${spaC} son ${spaN}.`, `People from ${country} are ${nat}.`, "Vocabulary", emoji);
  const pad2 = String(idx++).padStart(3, '0');
  gq(`gq${pad2}`, "Countries and Nationalities", `Someone who is ${nat} is from ___.`, [country, o3, o4], country, `Una persona ${spaN} es de ${spaC}.`, `Someone who is ${nat} is from ${country}.`, "Vocabulary", emoji);
});

gq("gq041", "Countries and Nationalities", "Elige el país.", ["Italy", "Italian", "British"], "Italy", "Italia es un país.", "Italy is a country.", "Vocabulary", "🇮🇹");
gq("gq042", "Countries and Nationalities", "Elige la nacionalidad.", ["Italian", "Italy", "France"], "Italian", "Italian es una nacionalidad.", "Italian is a nationality.", "Vocabulary", "🇮🇹");
gq("gq043", "Countries and Nationalities", "Completa: My friend is from Greece. She's ___.", ["Greek", "Greece", "German"], "Greek", "Mi amiga es de Grecia. Es griega.", "My friend is from Greece. She's Greek.", "Vocabulary", "🇬🇷");
gq("gq044", "Countries and Nationalities", "Completa: He's Brazilian. He's from ___.", ["Brazil", "Argentina", "Spain"], "Brazil", "Él es brasileño. Es de Brasil.", "He's Brazilian. He's from Brazil.", "Vocabulary", "🇧🇷");
gq("gq045", "Countries and Nationalities", "Completa: Marta is from Poland. She is ___.", ["Polish", "Poland", "Polandish"], "Polish", "Marta es de Polonia. Es polaca.", "Marta is from Poland. She is Polish.", "Vocabulary", "🇵🇱");
gq("gq046", "Countries and Nationalities", "Completa: Yusuf is Turkish. He's from ___.", ["Turkey", "Turkish", "Greece"], "Turkey", "Yusuf es turco. Es de Turquía.", "Yusuf is Turkish. He's from Turkey.", "Vocabulary", "🇹🇷");
gq("gq047", "Countries and Nationalities", "Completa: Wei is from China. He's ___.", ["Chinese", "China", "Chinian"], "Chinese", "Wei es de China. Es chino.", "Wei is from China. He's Chinese.", "Vocabulary", "🇨🇳");
gq("gq048", "Countries and Nationalities", "Completa: Emma is Welsh. She's from ___.", ["Wales", "the USA", "Ireland"], "Wales", "Emma es galesa. Es de Gales.", "Emma is Welsh. She's from Wales.", "Vocabulary", "🏴");

gq("gq049", "Nationality Word Formation", "¿Qué nacionalidad termina en -ish?", ["Polish", "Italian", "Chinese"], "Polish", "Polish termina en -ish.", "Polish ends in -ish.", "Vocabulary", "🇵🇱");
gq("gq050", "Nationality Word Formation", "¿Qué nacionalidad termina en -ese?", ["Chinese", "German", "Mexican"], "Chinese", "Chinese termina en -ese.", "Chinese ends in -ese.", "Vocabulary", "🇨🇳");
gq("gq051", "Nationality Word Formation", "¿Qué nacionalidad termina en -ian?", ["Brazilian", "French", "Greek"], "Brazilian", "Brazilian termina en -ian.", "Brazilian ends in -ian.", "Vocabulary", "🇧🇷");
gq("gq052", "Nationality Word Formation", "¿Qué nacionalidad termina en -an?", ["American", "British", "Chinese"], "American", "American termina en -an.", "American ends in -an.", "Vocabulary", "🇺🇸");
gq("gq053", "Nationality Word Formation", "¿Cuál pertenece al grupo irregular 'other'?", ["French", "Italian", "Brazilian"], "French", "French no sigue -ish, -ian, -an o -ese.", "French is in the irregular group.", "Vocabulary", "🇫🇷");
gq("gq054", "Nationality Word Formation", "¿Cuál pertenece al grupo -ish?", ["Scottish", "Russian", "Mexican"], "Scottish", "Scottish termina en -ish.", "Scottish ends in -ish.", "Vocabulary", "🏴");
gq("gq055", "Nationality Word Formation", "¿Cuál pertenece al grupo -ian?", ["Argentinian", "Spanish", "Turkish"], "Argentinian", "Argentinian termina en -ian.", "Argentinian ends in -ian.", "Vocabulary", "🇦🇷");
gq("gq056", "Nationality Word Formation", "¿Cuál pertenece al grupo -an?", ["Mexican", "Polish", "Chinese"], "Mexican", "Mexican termina en -an.", "Mexican ends in -an.", "Vocabulary", "🇲🇽");

gq("gq057", "Pronunciation /ʃ/", "¿En cuál palabra aparece el sonido /ʃ/?", ["Scottish", "German", "Italian"], "Scottish", "Scottish contiene el sonido /ʃ/.", "Scottish contains the /ʃ/ sound.", "Reading", "🗣️");
gq("gq058", "Pronunciation /ʃ/", "¿En cuál palabra aparece el sonido /ʃ/?", ["Spanish", "Greek", "Brazilian"], "Spanish", "Spanish contiene el sonido /ʃ/.", "Spanish contains the /ʃ/ sound.", "Reading", "🗣️");
gq("gq059", "Pronunciation /ʃ/", "¿En cuál palabra aparece el sonido /ʃ/?", ["Russian", "Mexican", "Irish"], "Russian", "Russian contiene el sonido /ʃ/.", "Russian contains the /ʃ/ sound.", "Reading", "🗣️");
gq("gq060", "Pronunciation /ʃ/", "¿Cuál de estas palabras NO suele llevar el sonido /ʃ/?", ["German", "British", "Polish"], "German", "German no usa el sonido /ʃ/ de esas opciones.", "German does not contain the target /ʃ/ sound.", "Reading", "🗣️");

gq("gq061", "Describing People", "Completa: He has got short ___ hair.", ["red", "tall", "young"], "red", "Él tiene el cabello corto y pelirrojo.", "He has got short red hair.", "Grammar", "👨‍🦰");
gq("gq062", "Describing People", "Completa: She has got ___ eyes.", ["green", "long", "old"], "green", "Ella tiene ojos verdes.", "She has got green eyes.", "Grammar", "👁️");
gq("gq063", "Describing People", "Elige la descripción correcta.", ["a boy with blonde hair", "a boy with blue hair", "a girl with blonde hair"], "a boy with blonde hair", "un chico de cabello rubio", "a boy with blonde hair", "Grammar", "👦");
gq("gq064", "Describing People", "Completa: His bag ___ blue.", ["is", "are", "am"], "is", "Su mochila es azul.", "His bag is blue.", "Grammar", "🎒");
gq("gq065", "Describing People", "Completa: Her eyes ___ brown.", ["are", "is", "am"], "are", "Sus ojos son marrones.", "Her eyes are brown.", "Grammar", "👁️");
gq("gq066", "Describing People", "¿Qué frase sirve para identificar a una persona?", ["He's the boy with short black hair.", "He's from Tuesday.", "His nationality is a bag."], "He's the boy with short black hair.", "Es el chico de cabello corto y negro.", "He's the boy with short black hair.", "Grammar", "👤");
gq("gq067", "Describing People", "Completa: The girl with long hair ___ my classmate.", ["is", "are", "am"], "is", "La chica de cabello largo es mi compañera de clase.", "The girl with long hair is my classmate.", "Grammar", "👧");
gq("gq068", "Describing People", "Completa: They ___ all different.", ["are", "is", "am"], "are", "Todos son diferentes.", "They are all different.", "Grammar", "👥");

gq("gq069", "Verb To Be - Affirmative and Negative", "Completa: I ___ 13 years old.", ["am", "is", "are"], "am", "Tengo 13 años.", "I am 13 years old.", "Grammar", "🎂");
gq("gq070", "Verb To Be - Affirmative and Negative", "Completa: You ___ my friend.", ["are", "is", "am"], "are", "Eres mi amigo/a.", "You are my friend.", "Grammar", "🤝");
gq("gq071", "Verb To Be - Affirmative and Negative", "Completa: She ___ 12.", ["is", "are", "am"], "is", "Ella tiene 12 años.", "She is 12.", "Grammar", "🎂");
gq("gq072", "Verb To Be - Affirmative and Negative", "Completa: We ___ in the same class.", ["are", "is", "am"], "are", "Estamos en la misma clase.", "We are in the same class.", "Grammar", "🏫");
gq("gq073", "Verb To Be - Affirmative and Negative", "Completa: They ___ from planet Nova.", ["are", "is", "am"], "are", "Ellos son del planeta Nova.", "They are from planet Nova.", "Grammar", "🪐");
gq("gq074", "Verb To Be - Affirmative and Negative", "Forma negativa: I ___ Irish.", ["am not", "isn't", "aren't"], "am not", "No soy irlandés/irlandesa.", "I am not Irish.", "Grammar", "🇮🇪");
gq("gq075", "Verb To Be - Affirmative and Negative", "Forma negativa: He ___ hungry.", ["isn't", "aren't", "am not"], "isn't", "Él no tiene hambre.", "He isn't hungry.", "Grammar", "🍽️");
gq("gq076", "Verb To Be - Affirmative and Negative", "Forma negativa: We ___ angry.", ["aren't", "isn't", "am not"], "aren't", "No estamos enojados.", "We aren't angry.", "Grammar", "😠");
gq("gq077", "Verb To Be - Affirmative and Negative", "Forma negativa: The school ___ very big.", ["isn't", "aren't", "am not"], "isn't", "La escuela no es muy grande.", "The school isn't very big.", "Grammar", "🏫");
gq("gq078", "Verb To Be - Affirmative and Negative", "Completa: My friends ___ funny.", ["are", "is", "am"], "are", "Mis amigos son divertidos.", "My friends are funny.", "Grammar", "😂");
gq("gq079", "Verb To Be - Affirmative and Negative", "Completa: Maths ___ easy for me.", ["is", "are", "am"], "is", "Matemática es fácil para mí.", "Maths is easy for me.", "Grammar", "➗");
gq("gq080", "Verb To Be - Affirmative and Negative", "Forma negativa: Maths ___ my favourite subject.", ["isn't", "aren't", "am not"], "isn't", "Matemática no es mi materia favorita.", "Maths isn't my favourite subject.", "Grammar", "📚");
gq("gq081", "Verb To Be - Affirmative and Negative", "Elige la contracción de 'I am'.", ["I'm", "I're", "I's"], "I'm", "La contracción de I am es I'm.", "I am = I'm.", "Grammar", "✍️");
gq("gq082", "Verb To Be - Affirmative and Negative", "Elige la contracción de 'she is'.", ["she's", "she're", "she'm"], "she's", "La contracción de she is es she's.", "she is = she's.", "Grammar", "✍️");
gq("gq083", "Verb To Be - Affirmative and Negative", "Elige la contracción de 'we are'.", ["we're", "we's", "we'm"], "we're", "La contracción de we are es we're.", "we are = we're.", "Grammar", "✍️");
gq("gq084", "Verb To Be - Affirmative and Negative", "Elige la contracción negativa de 'is not'.", ["isn't", "aren't", "amn't"], "isn't", "La contracción de is not es isn't.", "is not = isn't.", "Grammar", "✍️");
gq("gq085", "Verb To Be - Affirmative and Negative", "Elige la contracción negativa de 'are not'.", ["aren't", "isn't", "amn't"], "aren't", "La contracción de are not es aren't.", "are not = aren't.", "Grammar", "✍️");

gq("gq086", "Verb To Be - Correcting Sentences", "Mia es argentina. Corrige: 'Mia is English.'", ["Mia isn't English. She's Argentinian.", "Mia aren't English.", "Mia is English."], "Mia isn't English. She's Argentinian.", "Mia no es inglesa. Es argentina.", "Mia isn't English. She's Argentinian.", "Grammar", "🇦🇷");
gq("gq087", "Verb To Be - Correcting Sentences", "Los libros son verdes. Corrige: 'They're red books.'", ["They aren't red. They're green.", "They isn't red.", "They're red."], "They aren't red. They're green.", "No son rojos. Son verdes.", "They aren't red. They're green.", "Grammar", "📚");
gq("gq088", "Verb To Be - Correcting Sentences", "Los estudiantes están en EE. UU. Corrige: 'We're in France.'", ["We aren't in France. We're in the USA.", "We isn't in France.", "We're in France."], "We aren't in France. We're in the USA.", "No estamos en Francia. Estamos en Estados Unidos.", "We aren't in France. We're in the USA.", "Grammar", "🇺🇸");
gq("gq089", "Verb To Be - Correcting Sentences", "Es verano. Corrige: 'It's winter.'", ["It isn't winter. It's summer.", "It aren't winter.", "It's winter."], "It isn't winter. It's summer.", "No es invierno. Es verano.", "It isn't winter. It's summer.", "Grammar", "☀️");
gq("gq090", "Verb To Be - Correcting Sentences", "Son chinos. Corrige: 'They're Spanish.'", ["They aren't Spanish. They're Chinese.", "They isn't Spanish.", "They're Spanish."], "They aren't Spanish. They're Chinese.", "No son españoles. Son chinos.", "They aren't Spanish. They're Chinese.", "Grammar", "🇨🇳");

gq("gq091", "Verb To Be - Questions and Short Answers", "Completa: ___ you worried?", ["Are", "Is", "Am"], "Are", "¿Estás preocupado/a?", "Are you worried?", "Grammar", "😟");
gq("gq092", "Verb To Be - Questions and Short Answers", "Completa: ___ she good at basketball?", ["Is", "Are", "Am"], "Is", "¿Ella es buena jugando al básquet?", "Is she good at basketball?", "Grammar", "🏀");
gq("gq093", "Verb To Be - Questions and Short Answers", "Completa: ___ they basketball fans?", ["Are", "Is", "Am"], "Are", "¿Son fanáticos del básquet?", "Are they basketball fans?", "Grammar", "🏀");
gq("gq094", "Verb To Be - Questions and Short Answers", "Completa: ___ his laptop new?", ["Is", "Are", "Am"], "Is", "¿Su computadora portátil es nueva?", "Is his laptop new?", "Grammar", "💻");
gq("gq095", "Verb To Be - Questions and Short Answers", "Completa: ___ we in the same school?", ["Are", "Is", "Am"], "Are", "¿Estamos en la misma escuela?", "Are we in the same school?", "Grammar", "🏫");
gq("gq096", "Verb To Be - Questions and Short Answers", "Respuesta corta: 'Are you OK?'", ["Yes, I am.", "Yes, I is.", "Yes, I are."], "Yes, I am.", "Sí, estoy bien.", "Yes, I am.", "Grammar", "✅");
gq("gq097", "Verb To Be - Questions and Short Answers", "Respuesta corta negativa: 'Is he American?'", ["No, he isn't.", "No, he aren't.", "No, he am not."], "No, he isn't.", "No, no lo es.", "No, he isn't.", "Grammar", "🇺🇸");
gq("gq098", "Verb To Be - Questions and Short Answers", "Respuesta corta: 'Are they friends?'", ["Yes, they are.", "Yes, they is.", "Yes, they am."], "Yes, they are.", "Sí, lo son.", "Yes, they are.", "Grammar", "👥");
gq("gq099", "Verb To Be - Questions and Short Answers", "Respuesta corta negativa: 'Are we late?'", ["No, we aren't.", "No, we isn't.", "No, we am not."], "No, we aren't.", "No, no llegamos tarde.", "No, we aren't.", "Grammar", "⏰");
gq("gq100", "Verb To Be - Questions and Short Answers", "Completa: Where ___ he from?", ["is", "are", "am"], "is", "¿De dónde es él?", "Where is he from?", "Grammar", "🌍");
gq("gq101", "Verb To Be - Questions and Short Answers", "Completa: Who ___ these people?", ["are", "is", "am"], "are", "¿Quiénes son estas personas?", "Who are these people?", "Grammar", "👥");
gq("gq102", "Verb To Be - Questions and Short Answers", "Forma la pregunta: 'your hair / purple?'", ["Is your hair purple?", "Are your hair purple?", "Your hair is purple?"], "Is your hair purple?", "¿Tu cabello es violeta?", "Is your hair purple?", "Grammar", "💇");
gq("gq103", "Verb To Be - Questions and Short Answers", "Forma la pregunta: 'your friends / Mexican?'", ["Are your friends Mexican?", "Is your friends Mexican?", "Your friends are Mexican?"], "Are your friends Mexican?", "¿Tus amigos son mexicanos?", "Are your friends Mexican?", "Grammar", "🇲🇽");
gq("gq104", "Verb To Be - Questions and Short Answers", "Forma la pregunta: 'you / a good student?'", ["Are you a good student?", "Is you a good student?", "You are a good student?"], "Are you a good student?", "¿Eres un/a buen/a estudiante?", "Are you a good student?", "Grammar", "🎓");
gq("gq105", "Verb To Be - Questions and Short Answers", "Forma la pregunta: 'your classmates / happy?'", ["Are your classmates happy?", "Is your classmates happy?", "Your classmates are happy?"], "Are your classmates happy?", "¿Tus compañeros están felices?", "Are your classmates happy?", "Grammar", "😊");

gq("gq106", "Possessive Adjectives", "I → ___", ["my", "your", "his"], "my", "I corresponde a my.", "I → my", "Grammar", "👤");
gq("gq107", "Possessive Adjectives", "you → ___", ["your", "my", "her"], "your", "You corresponde a your.", "you → your", "Grammar", "👤");
gq("gq108", "Possessive Adjectives", "he → ___", ["his", "her", "our"], "his", "He corresponde a his.", "he → his", "Grammar", "👦");
gq("gq109", "Possessive Adjectives", "she → ___", ["her", "his", "their"], "her", "She corresponde a her.", "she → her", "Grammar", "👧");
gq("gq110", "Possessive Adjectives", "it → ___", ["its", "his", "our"], "its", "It corresponde a its.", "it → its", "Grammar", "🐾");
gq("gq111", "Possessive Adjectives", "we → ___", ["our", "your", "their"], "our", "We corresponde a our.", "we → our", "Grammar", "👥");
gq("gq112", "Possessive Adjectives", "they → ___", ["their", "our", "his"], "their", "They corresponde a their.", "they → their", "Grammar", "👥");
gq("gq113", "Possessive Adjectives", "Completa: This is ___ new laptop. (yo)", ["my", "his", "their"], "my", "Esta es mi computadora portátil nueva.", "This is my new laptop.", "Grammar", "💻");
gq("gq114", "Possessive Adjectives", "Completa: ___ practice is today. (tú)", ["Your", "My", "Her"], "Your", "Tu entrenamiento es hoy.", "Your practice is today.", "Grammar", "🏀");
gq("gq115", "Possessive Adjectives", "Completa: ___ team is fantastic. (él)", ["His", "Her", "Our"], "His", "Su equipo es fantástico.", "His team is fantastic.", "Grammar", "🏀");
gq("gq116", "Possessive Adjectives", "Completa: Sara is in my class. ___ favourite sport is football.", ["Her", "His", "Their"], "Her", "Sara está en mi clase. Su deporte favorito es el fútbol.", "Sara is in my class. Her favourite sport is football.", "Grammar", "⚽");
gq("gq117", "Possessive Adjectives", "Completa: Luke and Ben are brothers. This is ___ house.", ["their", "our", "his"], "their", "Luke y Ben son hermanos. Esta es su casa.", "Luke and Ben are brothers. This is their house.", "Grammar", "🏠");
gq("gq118", "Possessive Adjectives", "Completa: We are students. ___ teacher is Ms Clark.", ["Our", "Their", "His"], "Our", "Somos estudiantes. Nuestra profesora es la Sra. Clark.", "We are students. Our teacher is Ms Clark.", "Grammar", "👩‍🏫");
gq("gq119", "Possessive Adjectives", "Completa: The dog is black. ___ eyes are brown.", ["Its", "His", "Her"], "Its", "El perro es negro. Sus ojos son marrones.", "The dog is black. Its eyes are brown.", "Grammar", "🐕");
gq("gq120", "Possessive Adjectives", "Elige: My friend Nina is Italian, but ___ mum is Irish.", ["her", "she", "our"], "her", "Mi amiga Nina es italiana, pero su mamá es irlandesa.", "My friend Nina is Italian, but her mum is Irish.", "Grammar", "👩");
gq("gq121", "Possessive Adjectives", "Elige: Mr Brown is American. ___ is from Boston.", ["He", "His", "Her"], "He", "El Sr. Brown es estadounidense. Él es de Boston.", "Mr Brown is American. He is from Boston.", "Grammar", "🇺🇸");
gq("gq122", "Possessive Adjectives", "Elige: Mia and I are in the same class. ___ teacher is cool.", ["Our", "We", "Their"], "Our", "Mia y yo estamos en la misma clase. Nuestro profesor es genial.", "Mia and I are in the same class. Our teacher is cool.", "Grammar", "🏫");
gq("gq123", "Possessive Adjectives", "Elige: My grandparents are French. ___ house is in Lyon.", ["Their", "They", "Our"], "Their", "Mis abuelos son franceses. Su casa está en Lyon.", "My grandparents are French. Their house is in Lyon.", "Grammar", "🏠");

gq("gq124", "Personal Information", "¿Qué pregunta sirve para conocer la edad de una escuela?", ["How old is your school?", "Where is your school?", "What is your school?"], "How old is your school?", "¿Cuántos años tiene tu escuela?", "How old is your school?", "Functions", "🏫");
gq("gq125", "Personal Information", "¿Qué pregunta sirve para saber el color favorito?", ["What's your favourite colour?", "Where's your colour?", "Are you colour?"], "What's your favourite colour?", "¿Cuál es tu color favorito?", "What's your favourite colour?", "Functions", "🎨");
gq("gq126", "Personal Information", "¿Qué pregunta sirve para saber el animal favorito?", ["What's your favourite animal?", "Is your animal old?", "Where is your animal?"], "What's your favourite animal?", "¿Cuál es tu animal favorito?", "What's your favourite animal?", "Functions", "🐾");
gq("gq127", "Personal Information", "¿Qué pregunta sirve para saber quién es el mejor amigo?", ["Who is your best friend?", "Where is your best friend?", "Is your best friend blue?"], "Who is your best friend?", "¿Quién es tu mejor amigo/a?", "Who is your best friend?", "Functions", "👯");
gq("gq128", "Personal Information", "¿Qué pregunta sirve para preguntar por pasatiempos?", ["What are her hobbies?", "Where is her hobby?", "Is hobbies her?"], "What are her hobbies?", "¿Cuáles son sus pasatiempos?", "What are her hobbies?", "Functions", "🎮");
gq("gq129", "Personal Information", "Completa: What's ___ favourite subject?", ["your", "you", "yours"], "your", "¿Cuál es tu materia favorita?", "What's your favourite subject?", "Functions", "📚");
gq("gq130", "Personal Information", "Completa: Who is ___ best friend? (ella)", ["her", "she", "his"], "her", "¿Quién es su mejor amiga/o?", "Who is her best friend?", "Functions", "👧");
gq("gq131", "Personal Information", "Completa: What are ___ hobbies? (él)", ["his", "he", "her"], "his", "¿Cuáles son sus pasatiempos?", "What are his hobbies?", "Functions", "🎮");

gq("gq132", "Introductions", "Elige el saludo apropiado.", ["Hi, I'm Mia.", "Goodbye, I'm Mia.", "Where Mia?"], "Hi, I'm Mia.", "Hola, soy Mia.", "Hi, I'm Mia.", "Functions", "👋");
gq("gq133", "Introductions", "Respuesta a 'Nice to meet you.'", ["Nice to meet you, too.", "I'm from Monday.", "No, I aren't."], "Nice to meet you, too.", "Mucho gusto también.", "Nice to meet you, too.", "Functions", "🤝");
gq("gq134", "Introductions", "Completa: ___, Ben. I'm Alex.", ["Hello", "Where", "Who"], "Hello", "Hola, Ben. Soy Alex.", "Hello, Ben. I'm Alex.", "Functions", "👋");
gq("gq135", "Introductions", "Completa: This ___ Sara. She's my best friend.", ["is", "are", "am"], "is", "Esta es Sara. Es mi mejor amiga.", "This is Sara. She's my best friend.", "Functions", "👧");
gq("gq136", "Introductions", "Completa: Leo, ___ Maya.", ["meet", "is meet", "meeting"], "meet", "Leo, te presento a Maya.", "Leo, meet Maya.", "Functions", "🤝");
gq("gq137", "Introductions", "Respuesta a 'Great to meet you.'", ["Great to meet you, too.", "My name are Sam.", "It's at lunchtime."], "Great to meet you, too.", "Encantado/a de conocerte también.", "Great to meet you, too.", "Functions", "✨");
gq("gq138", "Introductions", "¿Qué frase va primero al conocer a alguien?", ["Hi, I'm Clara.", "Nice to meet you, too.", "Great to meet you, too."], "Hi, I'm Clara.", "Hola, soy Clara.", "Hi, I'm Clara.", "Functions", "👋");
gq("gq139", "Introductions", "¿Qué frase puede usarse para presentar a otra persona?", ["This is my friend, Leo.", "Are you hungry?", "It's a big city."], "This is my friend, Leo.", "Este es mi amigo Leo.", "This is my friend, Leo.", "Functions", "👥");

gq("gq140", "Story Comprehension", "True or False: Ava's first basketball practice is today.", ["True (T)", "False (F)"], "True (T)", "Verdadero: hoy es su primer entrenamiento de básquet.", "Ava's first basketball practice is today.", "Reading", "🏀");
gq("gq141", "Story Comprehension", "True or False: The practice is after school.", ["True (T)", "False (F)"], "False (F)", "Falso: el entrenamiento es a la hora del almuerzo.", "The practice is at lunchtime, not after school.", "Reading", "🕛");
gq("gq142", "Story Comprehension", "True or False: Noah's laptop is new.", ["True (T)", "False (F)"], "True (T)", "Verdadero: la computadora portátil de Noah es nueva.", "Noah's laptop is new.", "Reading", "💻");
gq("gq143", "Story Comprehension", "Completa: The basketball player is ___.", ["American", "a laptop", "a city"], "American", "El jugador de básquet es estadounidense.", "The basketball player is American.", "Reading", "🇺🇸");
gq("gq144", "Story Comprehension", "Completa: The team ___ fantastic.", ["is", "are", "am"], "is", "El equipo es fantástico.", "The team is fantastic.", "Reading", "🏀");
gq("gq145", "Story Comprehension", "Completa: The practice ___ tomorrow.", ["is", "are", "am"], "is", "El entrenamiento es mañana.", "The practice is tomorrow.", "Reading", "📅");

gq("gq146", "Scottish Cities - Reading", "¿Cuál es la capital de Escocia?", ["Edinburgh", "Glasgow", "Inverness"], "Edinburgh", "Edimburgo es la capital de Escocia.", "Edinburgh is the capital city of Scotland.", "Reading", "🏰");
gq("gq147", "Scottish Cities - Reading", "Según el texto de la unidad, la población de Escocia es aproximadamente:", ["5.5 million", "500", "70 million"], "5.5 million", "La población indicada es de 5,5 millones.", "The population of Scotland is 5.5 million.", "Reading", "👥");
gq("gq148", "Scottish Cities - Reading", "¿Cuántos idiomas oficiales se mencionan para Escocia?", ["3", "1", "7"], "3", "Se mencionan tres idiomas oficiales.", "There are three official languages in Scotland.", "Reading", "🗣️");
gq("gq149", "Scottish Cities - Reading", "¿Qué ciudad tiene el Parlamento escocés?", ["Edinburgh", "Glasgow", "Inverness"], "Edinburgh", "El Parlamento escocés está en Edimburgo.", "The Scottish parliament is in Edinburgh.", "Reading", "🏛️");
gq("gq150", "Scottish Cities - Reading", "¿Qué ciudad se describe como un gran puerto?", ["Glasgow", "Edinburgh", "Inverness"], "Glasgow", "Glasgow se describe como una ciudad portuaria.", "Glasgow is a port city.", "Reading", "⚓");
gq("gq151", "Scottish Cities - Reading", "¿Qué ciudad está en las Highlands?", ["Inverness", "Glasgow", "Edinburgh"], "Inverness", "Inverness está en las Highlands escocesas.", "Inverness is in the Scottish Highlands.", "Reading", "⛰️");
gq("gq152", "Scottish Cities - Reading", "¿Qué evento se asocia con Inverness?", ["Highland Games", "Sydney Festival", "Venice Carnival"], "Highland Games", "Los Highland Games se asocian con Inverness.", "The Highland Games are associated with Inverness.", "Reading", "🎉");
gq("gq153", "Scottish Cities - Reading", "¿Cuál es el animal nacional que menciona el fact box?", ["unicorn", "lion", "eagle"], "unicorn", "El animal nacional indicado es el unicornio.", "The national animal is the unicorn.", "Reading", "🦄");
gq("gq154", "Scottish Cities - Reading", "¿Qué ciudad es famosa por Celtic y Rangers?", ["Glasgow", "Inverness", "Edinburgh"], "Glasgow", "Glasgow es famosa por Celtic y Rangers.", "Glasgow is famous for Celtic and Rangers.", "Reading", "⚽");
gq("gq155", "Scottish Cities - Reading", "¿Qué edificio famoso se encuentra en Edimburgo?", ["Edinburgh Castle", "Sydney Opera House", "Buckingham Palace"], "Edinburgh Castle", "El Castillo de Edimburgo está en Edimburgo.", "Edinburgh Castle is in Edinburgh.", "Reading", "🏰");

gq("gq156", "Reading Strategy - Scanning", "Relaciona 5.5 million con el dato correcto.", ["population of Scotland", "number of official languages", "age of a castle"], "population of Scotland", "5,5 millones corresponde a la población de Escocia.", "5.5 million = the population of Scotland.", "Reading", "🔎");
gq("gq157", "Reading Strategy - Scanning", "Relaciona 3 con el dato correcto.", ["official languages of Scotland", "visitors to the Highland Games", "population of Glasgow"], "official languages of Scotland", "3 corresponde a los idiomas oficiales.", "3 = official languages of Scotland.", "Reading", "🔎");
gq("gq158", "Reading Strategy - Scanning", "Relaciona 7,000 con el dato correcto.", ["visitors to the Highland Games", "population of Edinburgh", "number of islands"], "visitors to the Highland Games", "7.000 corresponde a visitantes de los Highland Games.", "7,000 = visitors to the Highland Games.", "Reading", "🔎");
gq("gq159", "Reading Strategy - Scanning", "Según el texto, Edinburgh Castle tiene alrededor de:", ["900 years", "90 years", "9 years"], "900 years", "El castillo tiene alrededor de 900 años.", "Edinburgh Castle is around 900 years old.", "Reading", "🏰");
gq("gq160", "Reading Strategy - Scanning", "La población de Inverness es aproximadamente:", ["70,000", "700", "7 million"], "70,000", "La población indicada es de unas 70.000 personas.", "The population of Inverness is about 70,000.", "Reading", "👥");

gq("gq161", "Scottish Culture", "¿Cuál es un instrumento musical?", ["bagpipes", "kilt", "thistle"], "bagpipes", "La gaita escocesa es un instrumento musical.", "Bagpipes are a musical instrument.", "Vocabulary", "🎶");
gq("gq162", "Scottish Culture", "¿Cuál es una planta violeta y verde?", ["thistle", "kilt", "bagpipes"], "thistle", "El cardo es una planta violeta y verde.", "A thistle is a purple and green plant.", "Vocabulary", "🌸");
gq("gq163", "Scottish Culture", "¿Cuál tiene diferentes colores para distintas familias?", ["kilt", "thistle", "bagpipes"], "kilt", "Los kilts pueden tener distintos diseños y colores familiares.", "Kilts can have different family colours.", "Vocabulary", "🏴");
gq("gq164", "Scottish Culture", "¿Cuál es un símbolo de Escocia?", ["thistle", "laptop", "basketball"], "thistle", "El cardo es un símbolo de Escocia.", "The thistle is a symbol of Scotland.", "Vocabulary", "🏴");
gq("gq165", "Scottish Culture", "¿Cuál se relaciona con las Highlands?", ["bagpipes", "calculator", "rucksack"], "bagpipes", "La gaita se asocia con las Highlands.", "Bagpipes are associated with the Highlands.", "Vocabulary", "⛰️");

gq("gq166", "Writing Model - City Description", "Completa: Sydney is in the southeast of ___.", ["Australia", "Scotland", "Brazil"], "Australia", "Sídney está en el sudeste de Australia.", "Sydney is in the southeast of Australia.", "Reading", "🇦🇺");
gq("gq167", "Writing Model - City Description", "Completa: Sydney is a ___ city.", ["big", "nationality", "purple"], "big", "Sídney es una ciudad grande.", "Sydney is a big city.", "Reading", "🏙️");
gq("gq168", "Writing Model - City Description", "Según el ejercicio modelo, la población de Sydney es 5.3 ___.", ["million", "January", "visitors"], "million", "La población se expresa en millones.", "The population is 5.3 million.", "Reading", "👥");
gq("gq169", "Writing Model - City Description", "Completa: There is a big festival in ___.", ["January", "million", "Australia city"], "January", "Hay un gran festival en enero.", "There is a big festival in January.", "Reading", "📅");
gq("gq170", "Writing Model - City Description", "Completa: There is art, ___ and drama.", ["music", "population", "country"], "music", "Hay arte, música y teatro.", "There is art, music and drama.", "Reading", "🎵");
gq("gq171", "Writing Model - City Description", "Completa: About 500,000 ___ come to the festival.", ["visitors", "countries", "teachers"], "visitors", "Alrededor de 500.000 visitantes van al festival.", "About 500,000 visitors come to the festival.", "Reading", "🧳");

gq("gq172", "Countries and Nationalities - Workbook Practice", "Completa: This croissant is from France. It's ___.", ["French", "France", "British"], "French", "Este croissant es de Francia. Es francés.", "It's French.", "Vocabulary", "🥐");
gq("gq173", "Countries and Nationalities - Workbook Practice", "Completa: This tea is from the UK. It's ___.", ["British", "Britain", "Brazilian"], "British", "Este té es del Reino Unido. Es británico.", "It's British.", "Vocabulary", "🫖");
gq("gq174", "Countries and Nationalities - Workbook Practice", "Completa: This shamrock is from Ireland. It's ___.", ["Irish", "Ireland", "Italian"], "Irish", "Este trébol es de Irlanda. Es irlandés.", "It's Irish.", "Vocabulary", "☘️");
gq("gq175", "Countries and Nationalities - Workbook Practice", "Completa: This drink is from Turkey. It's ___.", ["Turkish", "Turkey", "Greek"], "Turkish", "Esta bebida es de Turquía. Es turca.", "It's Turkish.", "Vocabulary", "🥤");
gq("gq176", "Countries and Nationalities - Workbook Practice", "Completa: This dish is from Italy. It's ___.", ["Italian", "Italy", "Spanish"], "Italian", "Este plato es de Italia. Es italiano.", "It's Italian.", "Vocabulary", "🍝");
gq("gq177", "Countries and Nationalities - Workbook Practice", "Completa: This building is in Greece. It's ___.", ["Greek", "Greece", "German"], "Greek", "Este edificio está en Grecia. Es griego.", "It's Greek.", "Vocabulary", "🏛️");
gq("gq178", "Countries and Nationalities - Workbook Practice", "Completa: This food is from the USA. It's ___.", ["American", "America", "Mexican"], "American", "Esta comida es de Estados Unidos. Es estadounidense.", "It's American.", "Vocabulary", "🍩");

gq("gq179", "Question Words and To Be", "Une la pregunta con la respuesta: 'Am I late?'", ["Yes, you are.", "Yes, I am.", "No, she isn't."], "Yes, you are.", "¿Llego tarde? Sí.", "Am I late? Yes, you are.", "Grammar", "⏰");
gq("gq180", "Question Words and To Be", "Une: 'Are his parents tall?'", ["No, they aren't.", "No, she isn't.", "Yes, it is."], "No, they aren't.", "¿Sus padres son altos? No.", "Are his parents tall? No, they aren't.", "Grammar", "👨‍👩‍👦");
gq("gq181", "Question Words and To Be", "Une: 'Is this your cat?'", ["Yes, it is.", "Yes, they are.", "No, you aren't."], "Yes, it is.", "¿Este es tu gato? Sí.", "Is this your cat? Yes, it is.", "Grammar", "🐈");
gq("gq182", "Question Words and To Be", "Une: 'Are you and Luka friends?'", ["Yes, we are.", "Yes, you are.", "No, she isn't."], "Yes, we are.", "¿Luka y tú son amigos? Sí.", "Are you and Luka friends? Yes, we are.", "Grammar", "🤝");
gq("gq183", "Question Words and To Be", "Une: 'Is your dad very old?'", ["No, he isn't.", "No, they aren't.", "Yes, we are."], "No, he isn't.", "¿Tu papá es muy mayor? No.", "Is your dad very old? No, he isn't.", "Grammar", "👨");
gq("gq184", "Question Words and To Be", "Forma la pregunta para 'Rio de Janeiro'.", ["Where is Rio de Janeiro?", "Who is Rio de Janeiro?", "Is Rio de Janeiro old?"], "Where is Rio de Janeiro?", "¿Dónde está Río de Janeiro?", "Where is Rio de Janeiro?", "Grammar", "🌎");
gq("gq185", "Question Words and To Be", "Forma la pregunta para 'Brad Pitt is an American actor.'", ["Who is an American actor?", "Where is American?", "Are Brad Pitt actor?"], "Who is an American actor?", "¿Quién es un actor estadounidense?", "Who is an American actor?", "Grammar", "🎬");
gq("gq186", "Question Words and To Be", "Forma la pregunta para 'Romie is 2,800 years old.'", ["How old is Rome?", "Where old is Rome?", "Who is Rome old?"], "How old is Rome?", "¿Cuántos años tiene Roma?", "How old is Rome?", "Grammar", "🏛️");
gq("gq187", "Question Words and To Be", "Forma la pregunta para 'The capital of Greece is Athens.'", ["What is the capital of Greece?", "Who Greece is capital?", "Are Athens Greek?"], "What is the capital of Greece?", "¿Cuál es la capital de Grecia?", "What is the capital of Greece?", "Grammar", "🇬🇷");
gq("gq188", "Question Words and To Be", "Forma la pregunta para 'Venice Carnival is in February.'", ["When is Venice Carnival?", "Where is February?", "Who is Carnival?"], "When is Venice Carnival?", "¿Cuándo es el Carnaval de Venecia?", "When is Venice Carnival?", "Grammar", "🎭");

gq("gq189", "Introductions - Dialogue Completion", "Completa: Hello, ___ Martin.", ["I'm", "is", "are"], "I'm", "Hola, soy Martin.", "Hello, I'm Martin.", "Functions", "👋");
gq("gq190", "Introductions - Dialogue Completion", "Completa: Nice to ___ you.", ["meet", "meeting", "meets"], "meet", "Mucho gusto.", "Nice to meet you.", "Functions", "🤝");
gq("gq191", "Introductions - Dialogue Completion", "Completa: Great to meet you, ___.", ["too", "to", "two"], "too", "Encantado/a de conocerte también.", "Great to meet you, too.", "Functions", "✨");
gq("gq192", "Introductions - Dialogue Completion", "Completa: ___ is my friend, Sara.", ["This", "These", "Those"], "This", "Esta es mi amiga Sara.", "This is my friend, Sara.", "Functions", "👧");
gq("gq193", "Introductions - Dialogue Completion", "Completa: ___, Jack. He's in the football team.", ["This is", "Are", "Where"], "This is", "Este es Jack. Está en el equipo de fútbol.", "This is Jack.", "Functions", "⚽");
gq("gq194", "Introductions - Dialogue Completion", "Completa: Hi, Gavin. ___ meet you.", ["Nice to", "Nice is", "Are to"], "Nice to", "Hola, Gavin. Mucho gusto.", "Nice to meet you.", "Functions", "🤝");

gq("gq195", "Review Unit 1", "Completa: How ___ you?", ["are", "is", "am"], "are", "¿Cómo estás?", "How are you?", "Grammar", "📧");
gq("gq196", "Review Unit 1", "Completa: ___ your new school nice?", ["Is", "Are", "Am"], "Is", "¿Tu nueva escuela es linda?", "Is your new school nice?", "Grammar", "🏫");
gq("gq197", "Review Unit 1", "Completa: ___ you on the football team?", ["Are", "Is", "Am"], "Are", "¿Estás en el equipo de fútbol?", "Are you on the football team?", "Grammar", "⚽");
gq("gq198", "Review Unit 1", "Completa: I ___ in England.", ["am", "is", "are"], "am", "Estoy en Inglaterra.", "I am in England.", "Grammar", "🏴");
gq("gq199", "Review Unit 1", "Completa: ___ parents and I are really happy.", ["My", "I", "Me"], "My", "Mis padres y yo estamos muy felices.", "My parents and I are really happy.", "Grammar", "👨‍👩‍👧");
gq("gq200", "Review Unit 1", "Completa: ___ new house is fantastic.", ["Our", "We", "Us"], "Our", "Nuestra casa nueva es fantástica.", "Our new house is fantastic.", "Grammar", "🏠");
gq("gq201", "Review Unit 1", "Completa: My new classmates ___ friendly.", ["are", "is", "am"], "are", "Mis nuevos compañeros son amistosos.", "My new classmates are friendly.", "Grammar", "😊");
gq("gq202", "Review Unit 1", "Completa: Our teacher ___ fun.", ["is", "are", "am"], "is", "Nuestro/a profesor/a es divertido/a.", "Our teacher is fun.", "Grammar", "👩‍🏫");

gq("gq203", "Global Citizenship - Diversity", "Elige la idea que mejor refleja la unidad.", ["People from the same country can look very different.", "Everyone from one country looks the same.", "Nationality decides someone's hair colour."], "People from the same country can look very different.", "Las personas de un mismo país pueden tener apariencias muy diferentes.", "People from the same country can look very different.", "Reading", "🌍");
gq("gq204", "Global Citizenship - Diversity", "Completa: There ___ one 'typical' appearance for a nationality.", ["isn't", "aren't", "am not"], "isn't", "No existe una única apariencia 'típica' para una nacionalidad.", "There isn't one typical appearance for a nationality.", "Reading", "🤝");

const unit1 = {
  unit: "Unid. 1: One World",
  source: "I Succeed in English 2 Studentsbook and Workbook",
  year: "2026",
  DIALOGUES,
  GRAMMAR_QUIZZES: quizzes,
  READING_COMPREHENSION,
  SENTENCES,
  VOCABULARY
};

fs.writeFileSync('src/units/unit1.json', JSON.stringify(unit1, null, 2), 'utf8');
console.log('Unit 1 saved successfully. Quizzes:', quizzes.length);
