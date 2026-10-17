import { UNITS_DATA } from './units/index';
import { 
  VOCAB_RAW_EXPANDED, 
  MASTER_DATABASE_EXPANDED, 
  GRAMMAR_DATABASE_EXPANDED, 
  READING_COMPREHENSION_DATA_EXPANDED, 
  DIALOGUE_PATTERNS_EXPANDED, 
  GRAMMAR_QUIZZES_EXPANDED,
  MONSTERS_MASTER_DB_RAW,
  MONSTERS_VOCAB_RAW,
  MONSTERS_GRAMMAR_DB_RAW,
  MONSTERS_READING_COMPREHENSION_DATA,
  MONSTERS_GRAMMAR_QUIZZES,
  HOUSE_COUNTRIES_MASTER_DATABASE_RAW,
  HOUSE_COUNTRIES_VOCAB_RAW,
  HOUSE_COUNTRIES_GRAMMAR_DB_RAW,
  HOUSE_COUNTRIES_READING_COMPREHENSION_DATA,
  HOUSE_COUNTRIES_GRAMMAR_QUIZZES,
  STORY_PROGRESSION_DATA_RAW,
  NARRATIVE_PROGRESSION_DATA_RAW
} from './data_expanded';

export const MASTER_DATABASE = [
  "Hello! I'm Ben.|¡Hola! Soy Ben.|Introductions|👋",
  "Hi Ben! I'm Lucy.|¡Hola Ben! Soy Lucy.|Introductions|😊",
  "Nice to meet you.|Mucho gusto.|Introductions|🤝",
  "Where are you from?|¿De dónde eres?|Countries & Nationalities|🌎",
  "She is tall.|Ella es alta.|Physical Description|📏",
  "He is short.|Él es bajo.|Physical Description|📏",
  "The boy is funny.|El niño es divertido.|Physical Description|😂",
  "The girl is happy.|La niña está feliz.|Physical Description|😊",
  "He is sad.|Él está triste.|Physical Description|😢",
  "She is angry.|Ella está enojada.|Physical Description|😠",
  "I am tired.|Estoy cansado.|Physical Description|😴",
  "This is my school bag.|Esta es mi mochila.|School Objects|🎒",
  "That is my notebook.|Ese es mi cuaderno.|School Objects|📓",
  "I have got a pencil case.|Tengo una cartuchera.|School Objects|✏️",
  "She has got a ruler.|Ella tiene una regla.|School Objects|📏",
  "He has got two pencils.|Él tiene dos lápices.|School Objects|✏️",
  "Open your book.|Abre tu libro.|School Objects|📖",
  "I like football.|Me gusta el fútbol.|Hobbies|⚽",
  "She likes dancing.|A ella le gusta bailar.|Hobbies|💃",
  "He likes swimming.|A él le gusta nadar.|Hobbies|🏊",
  "They like reading books.|A ellos les gusta leer libros.|Hobbies|📚",
  "We like listening to music.|Nos gusta escuchar música.|Hobbies|🎵",
  "I play videogames.|Juego videojuegos.|Hobbies|🎮",
  "I can swim.|Yo puedo nadar.|Abilities|🏊",
  "She can dance.|Ella puede bailar.|Abilities|💃",
  "He can run fast.|Él puede correr rápido.|Abilities|🏃",
  "The bird can fly.|El pájaro puede volar.|Abilities|🦅",
  "The snake can't walk.|La serpiente no puede caminar.|Abilities|🐍",
  "I am playing football.|Estoy jugando al fútbol.|Present Continuous|⚽",
  "She is reading a book.|Ella está leyendo un libro.|Present Continuous|📖",
  "He is watching TV.|Él está mirando televisión.|Present Continuous|📺",
  "They are dancing.|Ellos están bailando.|Present Continuous|💃",
  "Today is Monday.|Hoy es lunes.|Days & Time|📅",
  "Tomorrow is Tuesday.|Mañana es martes.|Days & Time|📅",
  "My birthday is in May.|Mi cumpleaños es en mayo.|Days & Time|🎂",
  "It is sunny today.|Hoy está soleado.|Weather|☀️",
  "It is cloudy.|Está nublado.|Weather|☁️",
  "What is the weather like?|¿Cómo está el clima?|Weather|🌤️",
  "I am from Argentina.|Yo soy de Argentina.|Affirmative|🇦🇷",
  "You are from Brazil.|Tú eres de Brasil.|Affirmative|🇧🇷",
  "He is from Mexico.|Él es de México.|Affirmative|🇲🇽",
  "She is from Spain.|Ella es de España.|Affirmative|🇪🇸",
  "We are from France.|Nosotros somos de Francia.|Affirmative|🇫🇷",
  "They are from Germany.|Ellos son de Alemania.|Affirmative|🇩🇪",
  "I am Argentinian.|Yo soy argentino.|Affirmative|🇦🇷",
  "You are Brazilian.|Tú eres brasileño.|Affirmative|🇧🇷",
  "He is Mexican.|Él es mexicano.|Affirmative|🇲🇽",
  "She is Spanish.|Ella es española.|Affirmative|🇪🇸",
  "We are French.|Nosotros somos franceses.|Affirmative|🇫🇷",
  "They are German.|Ellos son alemanes.|Affirmative|🇩🇪",
  "Lisa is Brazilian.|Lisa es brasileña.|Affirmative|👧",
  "Tom is American.|Tom es americano.|Affirmative|👦",
  "Emma is Argentinian.|Emma es argentina.|Affirmative|👧",
  "Martin is Turkish.|Martin es turco.|Affirmative|👦",
  "Lucy is British.|Lucy es británica.|Affirmative|👧",
  "Ben is Polish.|Ben es polaco.|Affirmative|👦",
  "Lisa is from Brazil.|Lisa es de Brasil.|Affirmative|🇧🇷",
  "Tom is from The USA.|Tom es de Estados Unidos.|Affirmative|🇺🇸",
  "Emma is from Argentina.|Emma es de Argentina.|Affirmative|🇦🇷",
  "Martin is from Turkey.|Martin es de Turquía.|Affirmative|🇹🇷",
  "Lucy is from England.|Lucy es de Inglaterra.|Affirmative|🏴",
  "Ben is from Poland.|Ben es de Polonia.|Affirmative|🇵🇱",
  "I am not Brazilian.|Yo no soy brasileño.|Negative|❌",
  "You are not Mexican.|Tú no eres mexicano.|Negative|❌",
  "He is not Spanish.|Él no es español.|Negative|❌",
  "She is not French.|Ella no es francesa.|Negative|❌",
  "We are not German.|Nosotros no somos alemanes.|Negative|❌",
  "They are not Chinese.|Ellos no son chinos.|Negative|❌",
  "I'm not Brazilian.|Yo no soy brasileño.|Negative Contractions|🚫",
  "You aren't Mexican.|Tú no eres mexicano.|Negative Contractions|🚫",
  "He isn't Spanish.|Él no es español.|Negative Contractions|🚫",
  "She isn't French.|Ella no es francesa.|Negative Contractions|🚫",
  "We aren't German.|Nosotros no somos alemanes.|Negative Contractions|🚫",
  "They aren't Chinese.|Ellos no son chinos.|Negative Contractions|🚫",
  "Lisa isn't Mexican.|Lisa no es mexicana.|Negative|👧",
  "Tom isn't Turkish.|Tom no es turco.|Negative|👦",
  "Emma isn't Russian.|Emma no es rusa.|Negative|👧",
  "Martin isn't Egyptian.|Martin no es egipcio.|Negative|👦",
  "Lisa isn't from Mexico.|Lisa no es de México.|Negative|🇲🇽",
  "Tom isn't from Turkey.|Tom no es de Turquía.|Negative|🇹🇷",
  "Emma isn't from Russia.|Emma no es de Rusia.|Negative|🇷🇺",
  "Martin isn't from Egypt.|Martin no es de Egipto.|Negative|🇪🇬",
  "Are you Argentinian?|¿Eres argentino?|Questions|❓",
  "Are you Brazilian?|¿Eres brasileño?|Questions|❓",
  "Is he Mexican?|¿Él es mexicano?|Questions|❓",
  "Is she Spanish?|¿Ella es española?|Questions|❓",
  "Are they French?|¿Ellos son franceses?|Questions|❓",
  "Are we German?|¿Somos alemanes?|Questions|❓",
  "Are you from Argentina?|¿Eres de Argentina?|Questions|🌎",
  "Are you from Brazil?|¿Eres de Brasil?|Questions|🌎",
  "Is he from Mexico?|¿Él es de México?|Questions|🌎",
  "Is she from Spain?|¿Ella es de España?|Questions|🌎",
  "Are they from France?|¿Ellos son de Francia?|Questions|🌎",
  "Are we from Germany?|¿Somos de Alemania?|Questions|🌎",
  "Where is he from?|¿De dónde es él?|Questions|👦",
  "Where is she from?|¿De dónde es ella?|Questions|👧",
  "Where are they from?|¿De dónde son ellos?|Questions|👥",
  "Yes, I am.|Sí, lo soy.|Short Answers|✅",
  "No, I'm not.|No, no lo soy.|Short Answers|❌",
  "Yes, you are.|Sí, lo eres.|Short Answers|✅",
  "No, you aren't.|No, no lo eres.|Short Answers|❌",
  "Yes, he is.|Sí, él lo es.|Short Answers|✅",
  "No, he isn't.|No, él no lo es.|Short Answers|❌",
  "Yes, she is.|Sí, ella lo es.|Short Answers|✅",
  "No, she isn't.|No, ella no lo es.|Short Answers|❌",
  "Yes, we are.|Sí, lo somos.|Short Answers|✅",
  "No, we aren't.|No, no lo somos.|Short Answers|❌",
  "Yes, they are.|Sí, ellos lo son.|Short Answers|✅",
  "No, they aren't.|No, ellos no lo son.|Short Answers|❌",
  "A: Hello!|A: ¡Hola!|Dialogue Line|👋",
  "B: Hi!|B: ¡Hola!|Dialogue Line|😊",
  "A: What is your name?|A: ¿Cuál es tu nombre?|Dialogue Line|📛",
  "B: My name is Lisa.|B: Mi nombre es Lisa.|Dialogue Line|👧",
  "A: Are you Argentinian?|A: ¿Eres argentino?|Dialogue Line|❓",
  "A: Is Tom Brazilian?|A: ¿Tom es brasileño?|Dialogue Line|❓",
  "A: Is Emma from Spain?|A: ¿Emma es de España?|Dialogue Line|❓",
  "Hello, how are you?|Hola, ¿como estas?|Personal Info|👋", "I am fine.|Yo estoy bien.|Personal Info|👍", "What is your name?|¿Cual es tu nombre?|Personal Info|📛", "My name is Lisa.|Mi nombre es Lisa.|Personal Info|👧", "What is your surname?|¿Cual es tu apellido?|Personal Info|📝", "My surname is Sacchetto.|Mi apellido es Sacchetto.|Personal Info|📝", "How old are you?|¿Cuantos años tienes?|Personal Info|🎂", "I am nine years old.|Yo tengo 9 años.|Personal Info|🎂", "When is your birthday?|¿Cuando es tu cumpleaños?|Personal Info|🎈", "My birthday is in February.|Mi cumpleaños es en febrero.|Personal Info|🎈", "Where are you from?|¿De donde eres?|Personal Info|🌎", "I am from Cordoba.|Yo soy de Cordoba.|Personal Info|🌎", "What is your favourite colour?|¿Cual es tu color favorito?|Personal Info|🎨", "My favourite colour is blue.|Mi color favorito es azul.|Personal Info|🔵", "What is your favourite food?|¿Cual es tu comida favorita?|Personal Info|🍕", "My favourite food is hamburger.|Mi comida favorita es hamburguesa.|Personal Info|🍔", "What is your favourite sport?|¿Cual es tu deporte favorito?|Personal Info|⚽", "My favourite sport is gymnastics.|Mi deporte favorito es gimnasia.|Personal Info|🤸‍♀️", "What is your favourite animal?|¿Cual es tu animal favorito?|Personal Info|🐶", "My favourite animal is a panda.|Mi animal favorito es un panda.|Personal Info|🐼", "Who are your friends?|¿Quienes son tus amigas?|Personal Info|👧", "My friends are Constanza and Paz.|Mis amigas son Constanza y Paz.|Personal Info|👭",
  "She is my mom.|Ella es mi mama.|Family & Body|👩", "He is my dad.|El es mi papa.|Family & Body|👨", "She is my grandma.|Ella es mi abuela.|Family & Body|👵", "He is my grandpa.|El es mi abuelo.|Family & Body|👴", "She is my sister.|Ella es mi hermana.|Family & Body|👧", "He is my brother.|El es mi hermano.|Family & Body|👦", "He is my baby brother.|El es mi hermanito bebe.|Family & Body|👶", "She is my aunt.|Ella es mi tia.|Family & Body|👱‍♀️", "He is my uncle.|El es mi tio.|Family & Body|👱‍♂️", "He is my cousin.|El es mi primo.|Family & Body|🧒", "She is my cousin.|Ella es mi prima.|Family & Body|👧",
  "I have got one face.|Yo tengo una cara.|Family & Body|🙂", "I have got one nose.|Yo tengo una nariz.|Family & Body|👃", "I have got one mouth.|Yo tengo una boca.|Family & Body|👄", "I have got two eyes.|Yo tengo dos ojos.|Family & Body|👀", "I have got two ears.|Yo tengo dos orejas.|Family & Body|👂", "I have got two hands.|Yo tengo dos manos.|Family & Body|🖐️", "I have got legs to walk.|Yo tengo piernas para caminar.|Family & Body|🦵", "We have got two hands.|Nosotros tenemos dos manos.|Family & Body|👐", "She has got a small nose.|Ella tiene una nariz pequeña.|Family & Body|👃", "He has got a big mouth.|El tiene una boca grande.|Family & Body|👄", "The monster has got three eyes.|El monstruo tiene tres ojos.|Family & Body|👾", "They have got long legs.|Ellos tienen piernas largas.|Family & Body|🦵",
  "The elephant is big.|El elefante es grande.|Animals & Abilities|🐘", "The elephant can walk.|El elefante puede caminar.|Animals & Abilities|🐘", "The elephant can not jump.|El elefante no puede saltar.|Animals & Abilities|🐘", "The lion can run.|El leon puede correr.|Animals & Abilities|🦁", "The lion can not fly.|El leon no puede volar.|Animals & Abilities|🦁", "The rhino can walk.|El rinoceronte puede caminar.|Animals & Abilities|🦏", "The hippo can swim.|El hipopotamo puede nadar.|Animals & Abilities|🦛", "The leopard can run.|El leopardo puede correr.|Animals & Abilities|🐆", "The monkey can climb.|El mono puede trepar.|Animals & Abilities|🐒", "The monkey can jump.|El mono puede saltar.|Animals & Abilities|🐒", "The tiger can jump.|El tigre puede saltar.|Animals & Abilities|🐅", "The panda can climb.|El panda puede trepar.|Animals & Abilities|🐼", "A snake can not walk.|Una serpiente no puede caminar.|Animals & Abilities|🐍", "The shark can swim.|El tiburon puede nadar.|Animals & Abilities|🦈", "The shark can not walk.|El tiburon no puede caminar.|Animals & Abilities|🦈", "The octopus can swim.|El pulpo puede nadar.|Animals & Abilities|🐙", "The crocodile can swim.|El cocodrilo puede nadar.|Animals & Abilities|🐊", "The rabbit can jump.|El conejo puede saltar.|Animals & Abilities|🐇", "The rabbit can run.|El conejo puede correr.|Animals & Abilities|🐇", "The sheep can walk.|La oveja puede caminar.|Animals & Abilities|🐑", "The bird can fly.|El pajaro puede volar.|Animals & Abilities|🦅", "The bird can not swim.|El pajaro no puede nadar.|Animals & Abilities|❌", "The dolphin can swim.|El delfin puede nadar.|Animals & Abilities|🐬",
  "They are playing football.|Ellos estan jugando al futbol.|Present Continuous|⚽", "They are playing.|Ellos estan jugando.|Present Continuous|🕹️", "They are jumping.|Ellos estan saltando.|Present Continuous|⬆️", "He is climbing.|El esta trepando.|Present Continuous|🧗", "He is running.|El esta corriendo.|Present Continuous|🏃", "He is drinking.|El esta bebiendo.|Present Continuous|🥤", "He is singing.|El esta cantando.|Present Continuous|🎤", "She is reading a book.|Ella esta leyendo un libro.|Present Continuous|📖", "Tom is jumping.|Tom esta saltando.|Present Continuous|👦", "My mum is making a cake for me.|Mi mama esta haciendo una torta para mi.|Present Continuous|🎂", "Martin is playing the guitar.|Martin esta tocando la guitarra.|Present Continuous|🎸", "The chef is cooking.|El chef esta cocinando.|Present Continuous|👨‍🍳", "They are riding a bike in the garden.|Ellos estan andando en bicicleta en el jardin.|Present Continuous|🚴", "The bird is flying.|El pajaro esta volando.|Present Continuous|🦅", "I am not eating a kiwi.|Yo no estoy comiendo un kiwi.|Present Continuous|🥝", "I am drawing a picture.|Yo estoy dibujando un cuadro.|Present Continuous|🖍️", "They are going to school.|Ellos estan yendo a la escuela.|Present Continuous|🏫", "She is watching TV.|Ella esta mirando la tele.|Present Continuous|📺", "I am listening to music.|Yo estoy escuchando musica.|Present Continuous|🎧", "They are dancing.|Ellas estan bailando.|Present Continuous|💃", "The baby is sleeping.|El bebe esta durmiendo.|Present Continuous|😴", "He is swimming in the pool.|El esta nadando en la pileta.|Present Continuous|🏊", "She is writing a letter.|Ella esta escribiendo una carta.|Present Continuous|✉️", "The dog is walking.|El perro esta caminando.|Present Continuous|🐕",
  "Today is Monday.|Hoy es lunes.|Time & Weather|📅", "Tomorrow is Tuesday.|Mañana es martes.|Time & Weather|📅", "It is sunny and hot.|Esta soleado y caluroso.|Time & Weather|☀️", "It is raining and cold.|Esta lloviendo y frio.|Time & Weather|🌧️", "It is cloudy.|Esta nublado.|Time & Weather|☁️", "It is windy.|Esta ventoso.|Time & Weather|💨", "It is warm.|Esta calido.|Time & Weather|😊", "What is the weather like?|¿Como esta el clima?|Time & Weather|🌤️"
].map(item => { const [eng, spa, category, emoji] = item.split('|'); return { eng, spa, category: category, emoji, source: "Indefinido", unit: "Unidad Indefinida", year: "2026" }; });

MASTER_DATABASE.push(...MASTER_DATABASE_EXPANDED.map(item => ({ ...item, source: "I Succeed in English 2 Studentsbook and Workbook", unit: "Unid. 3: Habits", year: "2026" })));

const mappedMonstersMaster = MONSTERS_MASTER_DB_RAW.map(item => {
  const [eng, spa, category, emoji] = item.split('|');
  return { eng, spa, category: category, emoji, source: "Indefinido", unit: "Unidad Indefinida", year: "2026" };
});
const mappedHouseMaster = HOUSE_COUNTRIES_MASTER_DATABASE_RAW.map(item => {
  const [eng, spa, category, emoji] = item.split('|');
  return { eng, spa, category: category, emoji, source: "Indefinido", unit: "Unidad Indefinida", year: "2026" };
});
MASTER_DATABASE.push(...mappedMonstersMaster, ...mappedHouseMaster);

export const MONSTERS_INC_BOOK_RAW = [
  // --- Introducción y Contexto ---
  "Monstropolis is a city of monsters.|Monstruópolis es una ciudad de monstruos.|Context|🏙️",
  "The monsters work at Monsters, Inc.|Los monstruos trabajan en Monsters, Inc.|Context|🏢",
  "They send power to the city.|Ellos envían energía a la ciudad.|Context|⚡",

  // --- Descripciones de Personajes ---
  "Sulley is a big, blue, furry monster.|Sulley es un monstruo grande, azul y peludo.|Description|👹",
  "Mike is his friend.|Mike es su amigo.|Description|👁️",
  "Mike is short and green with one big eye.|Mike es bajo y verde con un ojo grande.|Description|🟢",
  "Randall works at Monsters, Inc.|Randall trabaja en Monsters, Inc.|Description|🦎",
  "He can change color.|Él puede cambiar de color.|Abilities|🎨",
  "He does not like Sulley.|A él no le agrada Sulley.|Relationships|😠",
  "Sulley is the number one monster.|Sulley es el monstruo número uno.|Description|🏆",
  "Mr. Waternoose is a big, gray monster.|El Sr. Waternoose es un monstruo grande y gris.|Description|🦀",
  "He is very important.|Él es muy importante.|Description|👑",
  "He has five small eyes on his face.|Él tiene cinco ojos pequeños en su cara.|Description|👀",

  // --- La labor de asustar ---
  "Every night the monsters scare children in their beds.|Cada noche los monstruos asustan a los niños en sus camas.|Action|🌙",
  "\"Grrrr!\" the monsters roar.|\"¡Grrrr!\" rugen los monstruos.|Action|🦁",
  "The children scream, \"Ahhh!\"|Los niños gritan, \"¡Ahhh!\".|Action|😱",
  "The children scream.|Los niños gritan.|Action|🗣️",
  "Their screams make power for the city.|Sus gritos generan energía para la ciudad.|Context|⚡",
  "But the monsters are scared of the children.|Pero los monstruos están asustados de los niños.|Emotions|😨",

  // --- Conflicto y Desarrollo ---
  "One day, Sulley opens a door.|Un día, Sulley abre una puerta.|Action|🚪",
  "He meets a girl, Boo.|Él conoce a una niña, Boo.|Action|👧",
  "She likes Sulley, but he is scared of her.|A ella le agrada Sulley, pero él le tiene miedo a ella.|Emotions|🥺",
  "Now Sulley likes Boo.|Ahora a Sulley le agrada Boo.|Emotions|❤️",
  "He is not scared.|Él no está asustado.|Emotions|💪",
  "He laughs and plays with Boo.|Él se ríe y juega con Boo.|Action|🧸",
  "She is nice.|Ella es agradable.|Description|✨",
  "And Mike likes Boo.|Y a Mike le agrada Boo.|Emotions|🍏",
  "Mike and Sulley want to help her.|Mike y Sulley quieren ayudarla.|Action|🤝",
  "They do not want the monsters to see her.|Ellos no quieren que los monstruos la vean.|Action|🙈",
  "But Randall is angry.|Pero Randall está enojado.|Emotions|😡",
  "He wants to catch Mike and Sulley with Boo.|Él quiere atrapar a Mike y Sulley con Boo.|Action|🕸️",
  "Children cannot come to Monstropolis.|Los niños no pueden venir a Monstruópolis.|Rules|🚫",

  // --- Clímax y Desenlace ---
  "Mr. Waternoose sees them.|El Sr. Waternoose los ve.|Action|👁️\u200D\u200D\u200D\u200D\u200D\u200D\u200D\u200D\u200D\u200D\u200D\u200D\u200D\u200D\u200D\u200D\u200D\u200D\u200D\u200D\u200D\u200D\u200D\u200D\u200D\u200D\u200D\u200D\u200D\u200D\u200D\u200D\u200D\u200D\u200D\u200D\u200D\u200D\u200D\u200D\u200D\u200D\u200D\u200D\u200D\u200D\u200D\u200D\u200D\u200D\u200D\u200D🛡️",
  "He and Randall take Boo.|Él y Randall se llevan a Boo.|Action|🎒",
  "They throw the monsters out of a door.|Ellos arrojan a los monstruos fuera de una puerta.|Action|❄️",
  "\"No!\" Sulley screams.|\"¡No!\" grita Sulley.|Action|🔊",
  "Sulley and Mike find their way home.|Sulley y Mike encuentran su camino a casa.|Action|🏠",
  "They find Boo.|Ellos encuentran a Boo.|Action|🔍",
  "They tell the monster police about the two bad monsters.|Ellos le cuentan a la policía de monstruos sobre los dos monstruos malos.|Action|👮",
  "Sulley and Mike take Boo to her home.|Sulley y Mike llevan a Boo a su hogar.|Action|🏡",
  "Sulley puts Boo in her bed.|Sulley pone a Boo en su cama.|Action|🛏️",
  "They are very happy.|Ellos están muy felices.|Emotions|😊",
  "Goodnight, Boo!|¡Buenas noches, Boo!|Expressions|👋",

  // --- Nuevo Comienzo ---
  "There is a new Monsters, Inc.|Hay un nuevo Monsters, Inc.|Context|🌟",
  "The monsters are funny.|Los monstruos son divertidos.|Description|🤡",
  "The children laugh.|Los niños se ríen.|Action|😂",
  "Laughs make power for Monstropolis now.|Las risas generan energía para Monstruópolis ahora.|Context|⚡"
];

const mappedMonstersBook = MONSTERS_INC_BOOK_RAW.map((item, index) => {
  const [eng, spa, subcategory, emoji] = item.split('|');
  return { eng, spa, category: "Monster Inc - Book", emoji, sentenceIndex: index, source: "Indefinido", unit: "Unidad Indefinida", year: "2026" };
});

MASTER_DATABASE.push(...mappedMonstersBook);

export const VOCAB_RAW = [
  "England|Inglaterra|Countries|🏴", "Scotland|Escocia|Countries|🏴", "France|Francia|Countries|🇫🇷",
  "Germany|Alemania|Countries|🇩🇪", "China|China|Countries|🇨🇳", "Mexico|México|Countries|🇲🇽",
  "Brazil|Brasil|Countries|🇧🇷", "Argentina|Argentina|Countries|🇦🇷", "Spain|España|Countries|🇪🇸",
  "Turkey|Turquía|Countries|🇹🇷", "Russia|Rusia|Countries|🇷🇺", "Poland|Polonia|Countries|🇵🇱",
  "Greece|Grecia|Countries|🇬🇷", "Egypt|Egipto|Countries|🇪🇬", "Ireland|Irlanda|Countries|☘️",
  "Wales|Gales|Countries|🏴", "The USA|Estados Unidos|Countries|🇺🇸", "Morocco|Marruecos|Countries|🇲🇦",
  "British|Británico|Nationalities|🏴", "French|Francés|Nationalities|🇫🇷", "German|Alemán|Nationalities|🇩🇪",
  "Chinese|Chino|Nationalities|🇨🇳", "Mexican|Mexicano|Nationalities|🇲🇽", "Brazilian|Brasileño|Nationalities|🇧🇷",
  "Argentinian|Argentino|Nationalities|🇦🇷", "Spanish|Español|Nationalities|🇪🇸", "Turkish|Turco|Nationalities|🇹🇷",
  "Russian|Ruso|Nationalities|🇷🇺", "Polish|Polaco|Nationalities|🇵🇱", "Greek|Griego|Nationalities|🇬🇷",
  "Egyptian|Egipcio|Nationalities|🇪🇬", "Irish|Irlandés|Nationalities|☘️", "Scottish|Escocés|Nationalities|🏴",
  "Welsh|Galés|Nationalities|🏴", "American|Americano|Nationalities|🇺🇸", "Moroccan|Marroquí|Nationalities|🇲🇦",
  "Tall|Alto|Adjectives|📏", "Short|Bajo|Adjectives|📏", "Funny|Divertido|Adjectives|😂",
  "Happy|Feliz|Adjectives|😊", "Sad|Triste|Adjectives|😢", "Angry|Enojado|Adjectives|😠",
  "Hungry|Hambriento|Adjectives|🍔", "Thirsty|Sediento|Adjectives|🥤", "Tired|Cansado|Adjectives|😴",
  "Beautiful|Hermosa|Adjectives|✨", "Handsome|Guapo|Adjectives|😎",
  "Curly hair|Pelo rizado|Physical Description|🌀", "Straight hair|Pelo lacio|Physical Description|➖",
  "Blond hair|Pelo rubio|Physical Description|👱", "Brown hair|Pelo castaño|Physical Description|🤎",
  "Black hair|Pelo negro|Physical Description|🖤", "Blue eyes|Ojos azules|Physical Description|💙",
  "Green eyes|Ojos verdes|Physical Description|💚", "Brown eyes|Ojos marrones|Physical Description|🤎",
  "I|Yo|Pronouns|👤", "You|Tú|Pronouns|👉", "He|Él|Pronouns|👦", "She|Ella|Pronouns|👧",
  "We|Nosotros|Pronouns|👥", "They|Ellos|Pronouns|👨‍👩‍👧‍👦"
];

export const NEW_VOCAB_RAW = [
  "January|Enero|❄️", "February|Febrero|💘", "March|Marzo|🌷", "April|Abril|🌧️", "May|Mayo|🌺", "June|Junio|☀️", "July|Julio|🧣", "August|Agosto|🪁", "September|Septiembre|🎒", "October|Octubre|🎃", "November|Noviembre|🍂", "December|Diciembre|🎄",
  "Monday|Lunes|📅", "Tuesday|Martes|📅", "Wednesday|Miercoles|📅", "Thursday|Jueves|📅", "Friday|Viernes|📅", "Saturday|Sabado|🎉", "Sunday|Domingo|🛋️",
  "Weather|Clima|🌤️", "Sunny|Soleado|☀️", "Cloudy|Nublado|☁️", "Raining|Lloviendo|🌧️", "Windy|Ventoso|💨", "Hot|Caluroso|🥵", "Warm|Calido|😊", "Cold|Frio|🥶",
  "Mom|Mama|👩", "Dad|Papa|👨", "Grandma|Abuela|👵", "Grandpa|Abuelo|👴", "Brother|Hermano|👦", "Sister|Hermana|👧", "Aunt|Tia|👱‍♀️", "Uncle|Tio|👱‍♂️", "Cousin|Primo|🧒",
  "Face|Cara|🙂", "Nose|Nariz|👃", "Mouth|Boca|👄", "Eyes|Ojos|👀", "Ears|Orejas|👂", "Hand|Mano|🖐️", "Legs|Piernas|🦵",
  "Lion|Leon|🦁", "Elephant|Elefante|🐘", "Rhino|Rinoceronte|🦏", "Hippo|Hipopotamo|🦛", "Leopard|Leopardo|🐆", "Monkey|Mono|🐒", "Tiger|Tigre|🐅", "Panda|Panda|🐼", "Snake|Serpiente|🐍", "Shark|Tiburon|🦈", "Octopus|Pulpo|🐙", "Crocodile|Cocodrilo|🐊", "Rabbit|Conejo|🐇", "Sheep|Oveja|🐑", "Bird|Pajaro|🦅", "Dolphin|Delfin|🐬",
  "Listen|Escuchar|👂", "Watch|Mirar|📺", "Cook|Cocinar|🍳", "Run|Correr|🏃", "Swim|Nadar|🏊", "Go|Ir|🚶", "Play|Jugar|🕹️", "Sleep|Dormir|😴", "Eat|Comer|🍽️", "Write|Escribir|✍️", "Read|Leer|📚", "Climb|Trepar|🧗", "Drink|Beber|🥤", "Jump|Saltar|⬆️", "Walk|Caminar|🚶‍♂️", "Sing|Cantar|🎤", "Dance|Bailar|💃", "Make|Hacer|🛠️", "Ride|Montar|🚴", "Draw|Dibujar|🖍️", "Fly|Volar|🦅",
  "Listening|Escuchando|🎧", "Watching|Mirando|👀", "Singing|Cantando|🎤", "Dancing|Bailando|💃", "Cooking|Cocinando|🍳", "Running|Corriendo|🏃", "Swimming|Nadando|🏊", "Playing|Jugando|🕹️", "Sleeping|Durmiendo|😴", "Eating|Comiendo|🍽️", "Writing|Escribiendo|✍️", "Reading|Leyendo|📖", "Climbing|Trepando|🧗", "Drinking|Bebiendo|🥤", "Jumping|Saltando|⬆️", "Going|Yendo|🚶", "Making|Haciendo|🛠️", "Drawing|Dibujando|🖍️", "Riding|Montando|🚴",
  "One|Uno|1️⃣", "Two|Dos|2️⃣", "Three|Tres|3️⃣", "Four|Cuatro|4️⃣", "Five|Cinco|5️⃣", "Six|Seis|6️⃣", "Seven|Siete|7️⃣", "Eight|Ocho|8️⃣", "Nine|Nueve|9️⃣", "Ten|Diez|🔟", "Eleven|Once|1️⃣1️⃣", "Twelve|Doce|1️⃣2️⃣", "Thirteen|Trece|1️⃣3️⃣", "Fourteen|Catorce|1️⃣4️⃣", "Fifteen|Quince|1️⃣5️⃣", "Sixteen|Dieciseis|1️⃣6️⃣", "Seventeen|Diecisiete|1️⃣7️⃣", "Eighteen|Dieciocho|1️⃣8️⃣", "Nineteen|Diecinueve|1️⃣9️⃣", "Twenty|Veinte|2️⃣0️⃣",
  "Twenty-one|Veintiuno|🔢", "Twenty-two|Veintidos|🔢", "Twenty-three|Veintitres|🔢", "Twenty-four|Veinticuatro|🔢", "Twenty-five|Veinticinco|2️⃣5️⃣", "Twenty-six|Veintiseis|🔢", "Twenty-seven|Veintisiete|🔢", "Twenty-eight|Veintiocho|🔢", "Twenty-nine|Veintinueve|🔢", "Thirty|Treinta|3️⃣0️⃣", "Thirty-one|Treinta y uno|🔢", "Thirty-two|Treinta y dos|🔢", "Thirty-three|Treinta y tres|🔢", "Thirty-four|Treinta y cuatro|🔢", "Thirty-five|Treinta y cinco|3️⃣5️⃣", "Thirty-six|Treinta y seis|🔢", "Thirty-seven|Treinta y siete|🔢", "Thirty-eight|Treinta y ocho|🔢", "Thirty-nine|Treinta y nueve|🔢", "Forty|Cuarenta|4️⃣0️⃣", "Forty-one|Cuarenta y uno|🔢", "Forty-two|Cuarenta y dos|4️⃣2️⃣", "Forty-three|Cuarenta y tres|🔢", "Forty-four|Cuarenta y cuatro|🔢", "Forty-five|Cuarenta y cinco|🔢", "Forty-six|Cuarenta y seis|🔢", "Forty-seven|Cuarenta y siete|🔢", "Forty-eight|Cuarenta y ocho|🔢", "Forty-nine|Cuarenta y nueve|🔢", "Fifty|Cincuenta|5️⃣0️⃣",
  "I|Yo|👤", "You|Tú|👉", "He|Él|👦", "She|Ella|👧", "It|Eso|🐶", "We|Nosotros|👥", "They|Ellos|👨‍👩‍👧‍👦", "Am|Estoy|✨", "Is|Está|✨", "Are|Están|✨", "I'm|Yo soy|👤", "He's|Él es|👦", "She's|Ella es|👧", "It's|Eso es|🐶", "They're|Ellos son|👥", "Can't|No poder|❌", "What|Qué|❓", "Who|Quién|❓", "Where|Dónde|❓", "When|Cuándo|❓", "How|Cómo|❓", "Hello|Hola|👋", "Fine|Bien|👍", "Favourite|Favorito|⭐", "Colour|Color|🎨", "Blue|Azul|🔵", "Food|Comida|🍔", "Sport|Deporte|⚽", "Gymnastics|Gimnasia|🤸‍♀️", "Animal|Animal|🐶", "Friend|Amiga|🤝", "Name|Nombre|📛", "Surname|Apellido|📝", "Birthday|Cumpleaños|🎂", "Years|Años|📅", "Old|Edad|👴", "Football|Fútbol|⚽", "Book|Libro|📖", "Cake|Torta|🎂", "Guitar|Guitarra|🎸", "Chef|Cocinero|👨‍🍳", "Bike|Bicicleta|🚲", "Garden|Jardín|🏡", "Picture|Cuadro|🖼️", "School|Escuela|🏫", "TV|Televisión|📺", "Music|Música|🎵", "Letter|Carta|✉️", "Dog|Perro|🐕", "Pool|Pileta|🏊", "Water|Agua|💧", "Juice|Jugo|🧃", "Orange|Naranja|🍊", "Apple|Manzana|🍎", "Hamburger|Hamburguesa|🍔", "Kiwi|Kiwi|🥝", "Small|Pequeño|🤏", "Big|Grande|🐘", "Long|Largo|📏", "Can|Poder|✅", "Cannot|No poder|❌", "Have|Tener|🤲", "Has|Tiene|🤲", "Got|Tener|🤲", "Today|Hoy|📅", "Tomorrow|Mañana|📅", "Like|Gustar|👍", "The|El|🔤", "A|Un|🔤", "An|Un|🔤", "In|En|📦", "To|A|➡️", "For|Para|🎁", "And|Y|➕", "Not|No|🚫", "Me|Mí|🙋‍♀️"
];


VOCAB_RAW.push(...MONSTERS_VOCAB_RAW);
VOCAB_RAW.push(...HOUSE_COUNTRIES_VOCAB_RAW);

export const VOCABULARY_DATABASE = [
  ...VOCAB_RAW_EXPANDED.map(item => {
    const [eng, spa, category, emoji] = item.split('|');
    return { eng, spa, category: category || "Vocabulary", emoji, source: "I Succeed in English 2 Studentsbook and Workbook", unit: "Unid. 3: Habits", year: "2026" };
  }),
  ...VOCAB_RAW.map(item => {
    const [eng, spa, category, emoji] = item.split('|');
    return { eng, spa, category: category || "Vocabulary", emoji, source: "Indefinido", unit: "Unidad Indefinida", year: "2026" };
  }),
  ...NEW_VOCAB_RAW.map(item => {
    const [eng, spa, emoji] = item.split('|');
    let cat = "Vocabulario Aislado";
    if (eng.match(/^(One|Two|Three|Four|Five|Six|Seven|Eight|Nine|Ten|Eleven|Twelve|Thirteen|Fourteen|Fifteen|Sixteen|Seventeen|Eighteen|Nineteen|Twenty)$/)) cat = "Numbers (1-20)";
    else if (eng.match(/^(Twenty-|Thirty|Forty|Fifty)/)) cat = "Numbers (21-50)";
    return { eng, spa, category: cat, emoji };
  })
];

export const GRAMMAR_DATABASE = [
  "I am|Yo soy / estoy|Verb To Be|👤",
  "You are|Tú eres / estás|Verb To Be|👉",
  "He is|Él es / está|Verb To Be|👦",
  "She is|Ella es / está|Verb To Be|👧",
  "We are|Nosotros somos / estamos|Verb To Be|👥",
  "They are|Ellos son / están|Verb To Be|👨‍👩‍👧‍👦",
  "I am not|Yo no soy / estoy|Verb To Be|❌",
  "You are not|Tú no eres / estás|Verb To Be|❌",
  "He isn't|Él no es / está|Verb To Be|❌",
  "She isn't|Ella no es / está|Verb To Be|❌",
  "We aren't|Nosotros no somos / estamos|Verb To Be|❌",
  "They aren't|Ellos no son / están|Verb To Be|❌",
  "Am I?|¿Soy yo?|Verb To Be|❓",
  "Are you?|¿Eres tú?|Verb To Be|❓",
  "Is he?|¿Es él?|Verb To Be|❓",
  "Is she?|¿Es ella?|Verb To Be|❓",
  "Are we?|¿Somos nosotros?|Verb To Be|❓",
  "Are they?|¿Son ellos?|Verb To Be|❓",
  "Can|Poder|Abilities|✅",
  "Can't|No poder|Abilities|❌",
  "Subject + am is are + verb-ing|Sujeto + am is are + verbo-ing|Estructuras Gramaticales|🏗️",
  "I am|Yo soy o estoy|Estructuras Gramaticales|👤",
  "He is|El es o esta|Estructuras Gramaticales|👦",
  "She is|Ella es o esta|Estructuras Gramaticales|👧",
  "It is|Eso es o esta|Estructuras Gramaticales|🐶",
  "They are|Ellos son o estan|Estructuras Gramaticales|👥",
  "I have got|Yo tengo|Estructuras Gramaticales|🤲",
  "Can|Poder|Estructuras Gramaticales|✅",
  "Can not|No poder|Estructuras Gramaticales|❌"
].map(item => { const [eng, spa, category, emoji] = item.split('|'); return { eng, spa, category: category, emoji, source: "Indefinido", unit: "Unidad Indefinida", year: "2026" }; });

GRAMMAR_DATABASE.push(...GRAMMAR_DATABASE_EXPANDED.map(g => ({ ...g, source: (g as any).source || "I Succeed in English 2 Studentsbook and Workbook", unit: (g as any).unit || "Unid. 3: Habits", year: (g as any).year || "2026" })));

const mappedMonstersGrammar = MONSTERS_GRAMMAR_DB_RAW.map(item => {
  const [eng, spa, category, emoji] = item.split('|');
  return { eng, spa, category: category, emoji, source: "Indefinido", unit: "Unidad Indefinida", year: "2026" };
});
const mappedHouseGrammar = HOUSE_COUNTRIES_GRAMMAR_DB_RAW.map(item => {
  const [eng, spa, category, emoji] = item.split('|');
  return { eng, spa, category: category, emoji, source: "Indefinido", unit: "Unidad Indefinida", year: "2026" };
});
GRAMMAR_DATABASE.push(...mappedMonstersGrammar, ...mappedHouseGrammar);

const BASE_GRAMMAR_QUIZZES = [
  ...[
    { id: 'iq1', category: 'Countries & Nationalities', type: 'quiz', skill: 'Reading', question: '¿Cómo se dice "argentino"?', options: ['Argentinian', 'Argentina', 'Brazilian'], correctAnswer: 'Argentinian', emoji: '🇦🇷', spa: 'Argentino', optionsLang: 'en', eng: 'Argentinian' },
    { id: 'iq2', category: 'Verb To Be', type: 'quiz', skill: 'Grammar', question: 'Completa: She ___ happy.', options: ['is', 'are', 'am'], correctAnswer: 'is', emoji: '😊', spa: 'Ella está feliz', optionsLang: 'en', eng: 'She is happy' },
    { id: 'iq3', category: 'Present Continuous', type: 'quiz', skill: 'Grammar', question: 'Completa: They are ___ football.', options: ['playing', 'play', 'plays'], correctAnswer: 'playing', emoji: '⚽', spa: 'Ellos están jugando al fútbol', optionsLang: 'en', eng: 'They are playing football' },
    { id: 'iq4', category: 'Abilities', type: 'quiz', skill: 'Reading', question: '¿Qué animal puede volar?', options: ['Bird', 'Elephant', 'Snake'], correctAnswer: 'Bird', emoji: '🦅', spa: 'Pájaro', optionsLang: 'en', eng: 'Bird' },
    { id: 'iq6', category: 'Physical Description', type: 'quiz', skill: 'Vocabulary', question: '¿Cómo se dice "feliz"?', options: ['Happy', 'Sad', 'Angry'], correctAnswer: 'Happy', emoji: '😊', spa: 'Feliz', optionsLang: 'en', eng: 'Happy' },
    { id: 'iq7', category: 'Weather', type: 'quiz', skill: 'Reading', question: '¿Qué significa "cloudy"?', options: ['Nublado', 'Soleado', 'Lluvioso'], correctAnswer: 'Nublado', emoji: '☁️', spa: 'Nublado', optionsLang: 'es', eng: 'Cloudy' },
    { id: 'nq1', category: 'Countries & Nationalities', type: 'quiz', skill: 'Vocabulary', question: '¿Cómo se dice "Alemania"?', options: ['Germany', 'Greece', 'France'], correctAnswer: 'Germany', emoji: '🇩🇪', spa: 'Alemania', optionsLang: 'en', eng: 'Germany' },
    { id: 'nq2', category: 'Countries & Nationalities', type: 'quiz', skill: 'Vocabulary', question: '¿Cómo se dice "mexicano"?', options: ['Mexican', 'Mexico', 'Spanish'], correctAnswer: 'Mexican', emoji: '🇲🇽', spa: 'Mexicano', optionsLang: 'en', eng: 'Mexican' },
    { id: 'nq3', category: 'Verb To Be', type: 'quiz', skill: 'Grammar', question: 'Completa: She ___ Brazilian.', options: ['is', 'are', 'am'], correctAnswer: 'is', emoji: '👧', spa: 'Ella es brasileña', optionsLang: 'en', eng: 'She is Brazilian' },
    { id: 'nq4', category: 'Verb To Be', type: 'quiz', skill: 'Grammar', question: 'Completa: They ___ from Spain.', options: ['are', 'is', 'am'], correctAnswer: 'are', emoji: '👥', spa: 'Ellos son de España', optionsLang: 'en', eng: 'They are from Spain' },
    { id: 'nq5', category: 'Negative', type: 'quiz', skill: 'Grammar', question: 'Forma negativa correcta:', options: ["He isn't Mexican", "He not Mexican", "He aren't Mexican"], correctAnswer: "He isn't Mexican", emoji: '❌', spa: 'Él no es mexicano', optionsLang: 'en', eng: "He isn't Mexican" },
    { id: 'nq6', category: 'Questions', type: 'quiz', skill: 'Grammar', question: 'Pregunta correcta:', options: ["Are you Brazilian?", "You are Brazilian?", "Is you Brazilian?"], correctAnswer: "Are you Brazilian?", emoji: '❓', spa: '¿Eres brasileño?', optionsLang: 'en', eng: "Are you Brazilian?" }
  ],
  ...[
    { id: 'g1', category: 'Estructuras Gramaticales', type: 'quiz', skill: 'Reading', question: 'Estructura Presente Continuo:', options: ['Sujeto + am/is/are + verbo-ing', 'Sujeto + verbo-ing', 'Sujeto + can + verbo', 'Sujeto + have got'], correctAnswer: 'Sujeto + am/is/are + verbo-ing', emoji: "📐", spa: "Regla del Presente Continuo", optionsLang: 'es', eng: 'Subject + am/is/are + verb-ing' },
    { id: 'g2', category: 'Estructuras Gramaticales', type: 'quiz', skill: 'Reading', question: 'Para la mayoría de los verbos, agregamos:', options: ['-ing al final', '-ed al final', '-s al final'], correctAnswer: '-ing al final', emoji: "➕", spa: "Agregamos -ing al final", optionsLang: 'es', eng: 'Add -ing' },
    { id: 'g3', category: 'Estructuras Gramaticales', type: 'quiz', skill: 'Reading', question: 'Si el verbo termina en E (como MAKE), para agregar -ing:', options: ['Borro la E y agrego -ing (Making)', 'Agrego -ing directamente (Makeing)', 'Duplico la E (Makeeing)'], correctAnswer: 'Borro la E y agrego -ing (Making)', emoji: "✂️", spa: "Borro la E y agrego -ing", optionsLang: 'es', eng: 'Drop E and add -ing' },
    { id: 'g4', category: 'Estructuras Gramaticales', type: 'quiz', skill: 'Reading', question: 'Para decir que NO puedo hacer algo (Ej: volar), uso:', options: ['Can not / Can\'t', 'Am not', 'Have not'], correctAnswer: 'Can not / Can\'t', emoji: "🛑", spa: "No poder", optionsLang: 'es', eng: 'Cannot' }
  ]
];
export const GRAMMAR_QUIZZES = BASE_GRAMMAR_QUIZZES.map(q => ({...q, source: "Indefinido", unit: "Unidad Indefinida", year: "2026"}));

GRAMMAR_QUIZZES.push(...GRAMMAR_QUIZZES_EXPANDED.map(q => ({ ...q, source: "I Succeed in English 2 Studentsbook and Workbook", unit: "Unid. 3: Habits", year: "2026" })));
GRAMMAR_QUIZZES.push(...MONSTERS_GRAMMAR_QUIZZES.map(q => ({ ...q, source: "Indefinido", unit: "Unidad Indefinida", year: "2026" })));
GRAMMAR_QUIZZES.push(...HOUSE_COUNTRIES_GRAMMAR_QUIZZES.map(q => ({ ...q, source: "Indefinido", unit: "Unidad Indefinida", year: "2026" })));

const BASE_READING_COMPREHENSION_DATA = [
  {
    category: "Countries & Nationalities",
    readingText: "Tom and Peter are friends and they are from England. Tom is 25 years old and Peter is 23 years old. They are musicians.",
    emoji: "📖",
    questions: [
      { q: "Are they friends?", a: "Yes, they are.", options: ["Yes, they are.", "No, they aren't."] },
      { q: "Are Peter and Tom from Brazil?", a: "No, they aren't.", options: ["Yes, they are.", "No, they aren't."] },
      { q: "Is Tom 26 years old?", a: "No, he isn't.", options: ["Yes, he is.", "No, he isn't."] },
      { q: "Is Peter 23 years old?", a: "Yes, he is.", options: ["Yes, he is.", "No, he isn't."] },
      { q: "Are they musicians?", a: "Yes, they are.", options: ["Yes, they are.", "No, they aren't."] }
    ]
  },
  {
    category: "Introductions",
    readingText: "Hello! I'm Laura from Italy. I'm 38 years old. I'm a secretary and I work in an office. My favourite sport is tennis.",
    emoji: "📖",
    questions: [
      { q: "Is Laura from Poland?", a: "No, she isn't.", options: ["Yes, she is.", "No, she isn't."] },
      { q: "Is she 38 years old?", a: "Yes, she is.", options: ["Yes, she is.", "No, she isn't."] },
      { q: "Is she a student?", a: "No, she isn't.", options: ["Yes, she is.", "No, she isn't."] },
      { q: "Is tennis her favourite sport?", a: "Yes, it is.", options: ["Yes, it is.", "No, it isn't."] }
    ]
  },
  {
    category: "Physical Description",
    readingText: "My name is Lucas. I am tall and I have got brown hair. I have got green eyes. I am very happy today!",
    emoji: "📖",
    questions: [
      { q: "Is Lucas short?", a: "No, he isn't.", options: ["Yes, he is.", "No, he isn't."] },
      { q: "Is he happy?", a: "Yes, he is.", options: ["Yes, he is.", "No, he isn't."] }
    ]
  },
  {
    category: "Hobbies",
    readingText: "Emma and Lucy are sisters. They like reading books and dancing. They don't like playing videogames.",
    emoji: "📖",
    questions: [
      { q: "Do they like reading?", a: "Yes, they do.", options: ["Yes, they do.", "No, they don't."] },
      { q: "Do they like playing videogames?", a: "No, they don't.", options: ["Yes, they do.", "No, they don't."] }
    ]
  },
  {
    category: "Abilities",
    readingText: "Look at the monkey! It can climb trees and it can jump. But it can't fly. The bird can fly in the sky.",
    emoji: "📖",
    questions: [
      { q: "Can the monkey climb?", a: "Yes, it can.", options: ["Yes, it can.", "No, it can't."] },
      { q: "Can the monkey fly?", a: "No, it can't.", options: ["Yes, it can.", "No, it can't."] }
    ]
  },
  {
    category: "Present Continuous",
    readingText: "It is Saturday. Martin is playing football in the garden. His mum is cooking in the kitchen.",
    emoji: "📖",
    questions: [
      { q: "Is Martin sleeping?", a: "No, he isn't.", options: ["Yes, he is.", "No, he isn't."] },
      { q: "Is his mum cooking?", a: "Yes, she is.", options: ["Yes, she is.", "No, she isn't."] }
    ]
  },
  {
    category: "House",
    readingText: "This is my house. There is a big living room with a comfortable sofa. There are two bedrooms upstairs. The kitchen is next to the living room.",
    emoji: "📖",
    questions: [
      { q: "Is there a sofa in the living room?", a: "Yes, there is.", options: ["Yes, there is.", "No, there isn't."] },
      { q: "Are there three bedrooms?", a: "No, there aren't.", options: ["Yes, there are.", "No, there aren't."] }
    ]
  },
  {
    category: "School Objects",
    readingText: "I am at school. This is my school bag. I have got a red notebook, two pencils and a ruler. My pencil case is blue.",
    emoji: "📖",
    questions: [
      { q: "Has he got two pencils?", a: "Yes, he has.", options: ["Yes, he has.", "No, he hasn't."] },
      { q: "Is the pencil case green?", a: "No, it isn't.", options: ["Yes, it is.", "No, it isn't."] }
    ]
  },
  {
    category: "Weather",
    readingText: "Today is Monday and it is very cold. It is raining and cloudy. We are inside the house.",
    emoji: "📖",
    questions: [
      { q: "Is it hot today?", a: "No, it isn't.", options: ["Yes, it is.", "No, it isn't."] },
      { q: "Is it raining?", a: "Yes, it is.", options: ["Yes, it is.", "No, it isn't."] }
    ]
  },
  {
    category: "Dialogues",
    readingText: "A: Hi, I'm Ben. Where are you from?\nB: Hello! I'm Lucy and I am from Brazil. And you?\nA: I am from England.",
    emoji: "💬",
    questions: [
      { q: "Is Lucy from England?", a: "No, she isn't.", options: ["Yes, she is.", "No, she isn't."] },
      { q: "Is Ben from England?", a: "Yes, he is.", options: ["Yes, he is.", "No, he isn't."] }
    ]
  }
];
export const READING_COMPREHENSION_DATA = BASE_READING_COMPREHENSION_DATA.map(r => ({...r, source: "Indefinido", unit: "Unidad Indefinida", year: "2026"}));

READING_COMPREHENSION_DATA.push(...READING_COMPREHENSION_DATA_EXPANDED.map(r => ({ ...r, source: "I Succeed in English 2 Studentsbook and Workbook", unit: "Unid. 3: Habits", year: "2026" })));
READING_COMPREHENSION_DATA.push(...MONSTERS_READING_COMPREHENSION_DATA.map(r => ({ ...r, source: "Indefinido", unit: "Unidad Indefinida", year: "2026" })));
READING_COMPREHENSION_DATA.push(...HOUSE_COUNTRIES_READING_COMPREHENSION_DATA.map(r => ({ ...r, source: "Indefinido", unit: "Unidad Indefinida", year: "2026" })));

export const VAR_MAP: Record<string, {e: string, s: string}[]> = {
  name: [{e:"Lisa", s:"Lisa"}, {e:"Tom", s:"Tom"}, {e:"Lucy", s:"Lucy"}, {e:"Ben", s:"Ben"}, {e:"Emma", s:"Emma"}],
  name2: [{e:"Martin", s:"Martin"}, {e:"Anna", s:"Anna"}, {e:"Lucas", s:"Lucas"}, {e:"Mia", s:"Mia"}],
  country: [{e:"Argentina", s:"Argentina"}, {e:"Brazil", s:"Brasil"}, {e:"Spain", s:"España"}, {e:"Mexico", s:"México"}, {e:"France", s:"Francia"}],
  nationality: [{e:"Argentinian", s:"argentino"}, {e:"Brazilian", s:"brasileño"}, {e:"Spanish", s:"español"}, {e:"Mexican", s:"mexicano"}, {e:"French", s:"francés"}],
  adjective: [{e:"happy", s:"feliz"}, {e:"sad", s:"triste"}, {e:"tired", s:"cansado"}, {e:"funny", s:"divertido"}, {e:"hungry", s:"hambriento"}],
  hairType: [{e:"curly hair", s:"pelo rizado"}, {e:"straight hair", s:"pelo lacio"}, {e:"blond hair", s:"pelo rubio"}],
  eyeColor: [{e:"green eyes", s:"ojos verdes"}, {e:"blue eyes", s:"ojos azules"}, {e:"brown eyes", s:"ojos marrones"}],
  hobby: [{e:"football", s:"el fútbol"}, {e:"reading", s:"leer"}, {e:"dancing", s:"bailar"}],
  animal: [{e:"bird", s:"pájaro"}, {e:"dog", s:"perro"}, {e:"fish", s:"pez"}],
  ability: [{e:"fly", s:"volar"}, {e:"run", s:"correr"}, {e:"swim", s:"nadar"}],
  verbIng: [{e:"playing", s:"jugando"}, {e:"running", s:"corriendo"}, {e:"swimming", s:"nadando"}],
  schoolObject: [{e:"book", s:"libro"}, {e:"pencil", s:"lápiz"}, {e:"ruler", s:"regla"}],
  weather: [{e:"sunny", s:"soleado"}, {e:"cloudy", s:"nublado"}, {e:"raining", s:"lloviendo"}],
  day: [{e:"Monday", s:"lunes"}, {e:"Tuesday", s:"martes"}],
  room: [{e:"kitchen", s:"cocina"}, {e:"bedroom", s:"dormitorio"}],
  furniture: [{e:"sofa", s:"sofá"}, {e:"bed", s:"cama"}]
};

export const DYNAMIC_TEMPLATES = [
  { category: "Introductions", eng: "Hello! I am {name}.", spa: "¡Hola! Soy {name}.", vars: ["name"], emoji: "👋" },
  { category: "Introductions", eng: "My name is {name}.", spa: "Mi nombre es {name}.", vars: ["name"], emoji: "📛" },
  { category: "Countries & Nationalities", eng: "She is from {country}.", spa: "Ella es de {country}.", vars: ["country"], emoji: "🌎" },
  { category: "Countries & Nationalities", eng: "He is {nationality}.", spa: "Él es {nationality}.", vars: ["nationality"], emoji: "👦" },
  { category: "Verb To Be", eng: "I am {adjective}.", spa: "Yo estoy {adjective}.", vars: ["adjective"], emoji: "😊" },
  { category: "Physical Description", eng: "She has got {hairType}.", spa: "Ella tiene {hairType}.", vars: ["hairType"], emoji: "💇‍♀️" },
  { category: "Hobbies", eng: "I like {hobby}.", spa: "Me gusta {hobby}.", vars: ["hobby"], emoji: "⭐" },
  { category: "Abilities", eng: "The {animal} can {ability}.", spa: "El {animal} puede {ability}.", vars: ["animal", "ability"], emoji: "🦸" },
  { category: "Present Continuous", eng: "{name} is {verbIng}.", spa: "{name} está {verbIng}.", vars: ["name", "verbIng"], emoji: "🏃" },
  { category: "School Objects", eng: "I have got a {schoolObject}.", spa: "Yo tengo un {schoolObject}.", vars: ["schoolObject"], emoji: "🎒" },
  { category: "House", eng: "The {furniture} is in the {room}.", spa: "El {furniture} está en la {room}.", vars: ["furniture", "room"], emoji: "🏠" },
  { category: "Weather", eng: "It is {weather}.", spa: "Está {weather}.", vars: ["weather"], emoji: "🌤️" },
  { category: "Days & Time", eng: "Today is {day}.", spa: "Hoy es {day}.", vars: ["day"], emoji: "📅" }
];

const BASE_DIALOGUE_PATTERNS = [
  {
    id: "dyn_intro", category: "Introductions", vars: ["name", "name2"],
    lines: [
      { speaker: "A", eng: "Hello! My name is {name}.", spa: "¡Hola! Mi nombre es {name}.", emoji: "👋" },
      { speaker: "B", eng: "Hi! I am {name2}.", spa: "¡Hola! Yo soy {name2}.", emoji: "😊" },
      { speaker: "A", eng: "Nice to meet you.", spa: "Mucho gusto.", emoji: "🤝" }
    ]
  },
  {
    id: "dyn_country", category: "Countries & Nationalities", vars: ["country", "nationality"],
    lines: [
      { speaker: "A", eng: "Where are you from?", spa: "¿De dónde eres?", emoji: "🌎" },
      { speaker: "B", eng: "I am from {country}.", spa: "Soy de {country}.", emoji: "✈️" },
      { speaker: "A", eng: "Are you {nationality}?", spa: "¿Eres {nationality}?", emoji: "❓" },
      { speaker: "B", eng: "Yes, I am.", spa: "Sí, lo soy.", emoji: "✅" }
    ]
  },
  {
    id: "dyn_hobby", category: "Hobbies", vars: ["hobby"],
    lines: [
      { speaker: "A", eng: "What is your favourite hobby?", spa: "¿Cuál es tu pasatiempo favorito?", emoji: "🎯" },
      { speaker: "B", eng: "I like {hobby}.", spa: "Me gusta {hobby}.", emoji: "⭐" }
    ]
  },
  {
    id: "dyn_weather", category: "Weather", vars: ["weather"],
    lines: [
      { speaker: "A", eng: "What is the weather like today?", spa: "¿Cómo está el clima hoy?", emoji: "☁️" },
      { speaker: "B", eng: "It is {weather}.", spa: "Está {weather}.", emoji: "🌤️" }
    ]
  },
  {
    id: "manual_d1", category: "Basic Chat", vars: [],
    lines: [
      { speaker: "A", eng: "Hello!", spa: "¡Hola!", emoji: "👋" },
      { speaker: "B", eng: "Hi!", spa: "¡Hola!", emoji: "💬" },
      { speaker: "A", eng: "What is your name?", spa: "¿Cuál es tu nombre?", emoji: "📛" },
      { speaker: "B", eng: "My name is Lisa.", spa: "Mi nombre es Lisa.", emoji: "👧" },
      { speaker: "A", eng: "Nice to meet you.", spa: "Mucho gusto.", emoji: "🤝" },
      { speaker: "B", eng: "Nice to meet you too.", spa: "Mucho gusto también.", emoji: "😊" }
    ]
  },
  {
    id: "manual_d2", category: "Brazil Origin", vars: [],
    lines: [
      { speaker: "A", eng: "Where are you from?", spa: "¿De dónde eres?", emoji: "🌍" },
      { speaker: "B", eng: "I am from Brazil.", spa: "Soy de Brasil.", emoji: "🇧🇷" },
      { speaker: "A", eng: "Are you Brazilian?", spa: "¿Eres brasileño?", emoji: "❓" },
      { speaker: "B", eng: "Yes, I am.", spa: "Sí, lo soy.", emoji: "✅" }
    ]
  },
  {
    id: "manual_d3", category: "Tom's Nationality", vars: [],
    lines: [
      { speaker: "A", eng: "Is Tom Mexican?", spa: "¿Tom es mexicano?", emoji: "❓" },
      { speaker: "B", eng: "No, he isn't.", spa: "No, no lo es.", emoji: "❌" },
      { speaker: "A", eng: "Is he American?", spa: "¿Es americano?", emoji: "❓" },
      { speaker: "B", eng: "Yes, he is.", spa: "Sí, lo es.", emoji: "✅" }
    ]
  },
  {
    id: "manual_d4", category: "Where are they from?", vars: [],
    lines: [
      { speaker: "A", eng: "Are they from Spain?", spa: "¿Ellos son de España?", emoji: "❓" },
      { speaker: "B", eng: "No, they aren't.", spa: "No, no lo son.", emoji: "❌" },
      { speaker: "A", eng: "Where are they from?", spa: "¿De dónde son?", emoji: "🌍" },
      { speaker: "B", eng: "They are from France.", spa: "Son de Francia.", emoji: "🇫🇷" }
    ]
  },
  {
    id: "manual_d5", category: "Emma's Nationality", vars: [],
    lines: [
      { speaker: "A", eng: "Is Emma Russian?", spa: "¿Emma es rusa?", emoji: "❓" },
      { speaker: "B", eng: "No, she isn't.", spa: "No, no lo es.", emoji: "❌" },
      { speaker: "A", eng: "Is she Polish?", spa: "¿Es polaca?", emoji: "❓" },
      { speaker: "B", eng: "Yes, she is.", spa: "Sí, lo es.", emoji: "✅" }
    ]
  }
];
export const DIALOGUE_PATTERNS = BASE_DIALOGUE_PATTERNS.map(d => ({...d, source: "Indefinido", unit: "Unidad Indefinida", year: "2026"}));

DIALOGUE_PATTERNS.push(...DIALOGUE_PATTERNS_EXPANDED.map(d => ({ ...d, source: "I Succeed in English 2 Studentsbook and Workbook", unit: "Unid. 3: Habits", year: "2026" })));

export const KEYBOARD_HIERARCHY = ['bubbles', 'virtual_word', 'qwerty_word', 'virtual', 'qwerty', 'manual'];

export const KEYBOARD_OPTIONS = [
  { id: 'bubbles', label: '🧩 Burbujas' },
  { id: 'virtual_word', label: '🔤 Bloques (Palabra)' },
  { id: 'qwerty_word', label: '⌨️ QWERTY (Palabra)' },
  { id: 'virtual', label: '🔠 Bloques (Frase)' },
  { id: 'qwerty', label: '⌨️ QWERTY (Frase)' },
  { id: 'manual', label: '✍️ Libre' }
];

export const MOTIVATION_RIGHT = [
  { spa: "¡Sigue así, lo haces muy bien!", eng: "Keep it up, you are doing great!" },
  { spa: "¡Excelente trabajo!", eng: "Excellent work!" },
  { spa: "¡Eres fantástica!", eng: "You are fantastic!" },
  { spa: "¡Muy bien hecho!", eng: "Very well done!" }
];

export const MOTIVATION_WRONG = [
  { spa: "¡Tú puedes, Lisa!", eng: "You can do it, Lisa!" },
  { spa: "¡No te rindas, eres genial!", eng: "Don't give up, you are great!" },
  { spa: "¡Un error es una oportunidad para aprender!", eng: "A mistake is an opportunity to learn!" },
  { spa: "¡Casi lo tienes, campeona!", eng: "You almost got it, champion!" }
];

// Generar combinaciones deterministas a partir de las plantillas
export const GENERATED_DATA: any[] = [];
DYNAMIC_TEMPLATES.forEach((tmpl) => {
   [0, 1].forEach(variantIdx => {
       let engStr = tmpl.eng;
       let spaStr = tmpl.spa;
       tmpl.vars.forEach(v => {
          const pair = VAR_MAP[v] ? VAR_MAP[v][variantIdx % VAR_MAP[v].length] : {e: v, s: v};
          engStr = engStr.replace(`{${v}}`, pair.e);
          spaStr = spaStr.replace(`{${v}}`, pair.s);
       });
       GENERATED_DATA.push({ eng: engStr, spa: spaStr, category: tmpl.category, emoji: tmpl.emoji || "✨" });
   });
});

export const DIALOGUES_RAW: any[] = [];
DIALOGUE_PATTERNS.forEach((pattern) => {
    const iterations = pattern.vars && pattern.vars.length > 0 ? [0, 1] : [0];
    iterations.forEach(variantIdx => {
       const expandedLines = pattern.lines.map(line => {
           let engStr = line.eng;
           let spaStr = line.spa;
           if (pattern.vars) {
             pattern.vars.forEach(v => {
                 const pair = VAR_MAP[v] ? VAR_MAP[v][variantIdx % VAR_MAP[v].length] : {e: v, s: v};
                 engStr = engStr.replace(`{${v}}`, pair.e);
                 spaStr = spaStr.replace(`{${v}}`, pair.s);
             });
           }
           return { speaker: line.speaker, eng: engStr, spa: spaStr, emoji: line.emoji || '💬' };
       });
       DIALOGUES_RAW.push({
           id: `${pattern.id}_v${variantIdx}`,
           category: pattern.category,
           dialogue: expandedLines
       });
    });
});

STORY_PROGRESSION_DATA_RAW.forEach((chap, cIdx) => {
    const formattedLines = chap.lines.map((line, lIdx) => {
        const speaker = (line.speaker === 'Sulley' || line.speaker === 'Children' || lIdx % 2 === 1) ? 'B' : line.speaker;
        return {
            speaker: speaker,
            eng: line.eng,
            spa: line.spa,
            emoji: line.emoji || chap.emoji || '👾'
        };
    });
    DIALOGUES_RAW.push({
        id: `story_monsters_c${cIdx}`,
        category: `Monsters, Inc. - ${chap.chapter}`,
        dialogue: formattedLines
    });
});

NARRATIVE_PROGRESSION_DATA_RAW.forEach((story, sIdx) => {
    const formattedLines = story.steps.map((step, lIdx) => {
        const speaker = lIdx % 2 === 1 ? 'B' : (step.element || 'Narrator');
        return {
            speaker: speaker,
            eng: step.eng,
            spa: step.spa,
            emoji: step.emoji || story.emoji || '📖'
        };
    });
    DIALOGUES_RAW.push({
        id: `story_narrative_s${sIdx}`,
        category: `Story - ${story.storyTitle}`,
        dialogue: formattedLines
    });
});

export const ALL_DATA: any[] = [];
export const EXERCISES_DB: any[] = [];

export function rebuildDatabase(
  customSentences?: any[],
  customVocabulary?: any[],
  customQuizzes?: any[],
  customDialogues?: any[],
  customReadingComprehension?: any[]
) {
  // Clear lists
  ALL_DATA.length = 0;
  EXERCISES_DB.length = 0;

  // 1. Build deduplication sets from UNITS_DATA
  const unitEngSet = new Set<string>();
  const unitQuizSet = new Set<string>();

  UNITS_DATA.forEach(u => {
    u.SENTENCES?.forEach(s => s.eng && unitEngSet.add(s.eng.trim().toLowerCase()));
    u.VOCABULARY?.forEach(v => v.eng && unitEngSet.add(v.eng.trim().toLowerCase()));
    u.GRAMMAR_QUIZZES?.forEach(q => {
      if (q.question) unitQuizSet.add(q.question.trim().toLowerCase());
      if (q.eng) unitEngSet.add(q.eng.trim().toLowerCase());
    });
    u.DIALOGUES?.forEach(d => {
      (d.lines || d.dialogue || []).forEach((l: any) => l.eng && unitEngSet.add(l.eng.trim().toLowerCase()));
    });
  });

  // 2. Add content from UNITS_DATA ("I Succeed in English 2 Studentsbook and Workbook")
  UNITS_DATA.forEach(u => {
    const uYear = u.year || '2026';
    const uSource = u.source || 'I Succeed in English 2 Studentsbook and Workbook';
    const uUnit = u.unit;

    // Sentences
    u.SENTENCES?.forEach(s => {
      ALL_DATA.push({
        ...s,
        year: uYear,
        source: uSource,
        unit: uUnit
      });
    });

    // Vocabulary
    u.VOCABULARY?.forEach(v => {
      ALL_DATA.push({
        ...v,
        year: uYear,
        source: uSource,
        unit: uUnit
      });
    });

    // Grammar Quizzes
    u.GRAMMAR_QUIZZES?.forEach(q => {
      EXERCISES_DB.push({
        ...q,
        year: uYear,
        source: uSource,
        unit: uUnit
      });
      if (q.eng && q.spa) {
        ALL_DATA.push({
          category: q.category,
          eng: q.eng,
          spa: q.spa,
          emoji: q.emoji || '❓',
          year: uYear,
          source: uSource,
          unit: uUnit
        });
      }
    });

    // Reading Comprehension
    u.READING_COMPREHENSION?.forEach((block, bIdx) => {
      block.questions.forEach((qObj: any, qIdx: number) => {
        EXERCISES_DB.push({
          id: `readcomp_u_${uUnit.replace(/[^a-zA-Z0-9]/g, '_')}_${bIdx}_${qIdx}`,
          baseId: `readcomp_u_${uUnit.replace(/[^a-zA-Z0-9]/g, '_')}_${bIdx}`,
          category: block.category,
          type: 'reading',
          skill: 'Reading',
          question: qObj.q,
          readingText: block.readingText,
          options: [...qObj.options].sort(() => Math.random() - 0.5),
          correctAnswer: qObj.a,
          emoji: block.emoji || '📖',
          spa: qObj.a,
          eng: qObj.q,
          optionsLang: 'en',
          year: uYear,
          source: uSource,
          unit: uUnit
        });
      });
    });

    // Dialogues
    u.DIALOGUES?.forEach(d => {
      const lines = d.lines || d.dialogue || [];
      EXERCISES_DB.push({
        id: `dchat_${d.id}`,
        category: d.category || 'Dialogues',
        type: 'dialogue_chat',
        skill: 'Conversation',
        dialogue: lines,
        emoji: lines[0]?.emoji || '💬',
        eng: lines.map((l: any) => l.eng).join(' '),
        spa: lines.map((l: any) => l.spa).join(' '),
        year: uYear,
        source: uSource,
        unit: uUnit
      });
      EXERCISES_DB.push({
        id: `dspeak_${d.id}`,
        category: d.category || 'Dialogues',
        type: 'dialogue_speak',
        skill: 'Conversation',
        dialogue: lines,
        emoji: '🗣️',
        eng: lines.map((l: any) => l.eng).join(' '),
        spa: lines.map((l: any) => l.spa).join(' '),
        year: uYear,
        source: uSource,
        unit: uUnit
      });

      lines.forEach((line: any, lineIdx: number) => {
        ALL_DATA.push({
          category: d.category || 'Dialogues',
          eng: line.eng,
          spa: line.spa,
          emoji: line.emoji || '💬',
          dialogueId: d.id,
          lineIdx,
          year: uYear,
          source: uSource,
          unit: uUnit
        });
      });
    });
  });

  // 3. Process baseline quizzes (deduplicating items found in UNITS_DATA)
  const quizzesSource = customQuizzes || GRAMMAR_QUIZZES;
  quizzesSource.forEach(q => {
    const isIndef = !q.source || q.source === 'Indefinido';
    if (isIndef) {
      if (unitQuizSet.has((q.question || '').trim().toLowerCase()) || (q.eng && unitEngSet.has(q.eng.trim().toLowerCase()))) {
        // Exclude duplicate from Fuente Indefinida
        return;
      }
    }
    const qYear = q.year || '2026';
    const qSource = isIndef ? 'Indefinido' : q.source;
    const qUnit = isIndef ? 'Unidad Indefinida' : (q.unit || 'Unidad Indefinida');

    EXERCISES_DB.push({ ...q, year: qYear, source: qSource, unit: qUnit });
    if (q.eng && q.spa) {
      ALL_DATA.push({
        category: q.category,
        eng: q.eng,
        spa: q.spa,
        emoji: q.emoji || '❓',
        year: qYear,
        source: qSource,
        unit: qUnit
      });
    }
  });

  // 4. Process baseline reading comprehension
  const readingSource = customReadingComprehension || READING_COMPREHENSION_DATA;
  readingSource.forEach((block, bIdx) => {
    const isIndef = !block.source || block.source === 'Indefinido';
    const rYear = block.year || '2026';
    const rSource = isIndef ? 'Indefinido' : block.source;
    const rUnit = isIndef ? 'Unidad Indefinida' : (block.unit || 'Unidad Indefinida');

    block.questions.forEach((qObj: any, qIdx: number) => {
      EXERCISES_DB.push({
        id: `readcomp_${bIdx}_${qIdx}`,
        baseId: `readcomp_${bIdx}`,
        category: block.category,
        type: 'reading',
        skill: 'Reading',
        question: qObj.q,
        readingText: block.readingText,
        options: [...qObj.options].sort(() => Math.random() - 0.5),
        correctAnswer: qObj.a,
        emoji: block.emoji,
        spa: qObj.a,
        eng: qObj.q,
        optionsLang: 'en',
        year: rYear,
        source: rSource,
        unit: rUnit
      });
    });
  });

  // 5. Process baseline sentences, vocabulary, grammar database (deduplicating items found in UNITS_DATA)
  const sentencesSource = customSentences || MASTER_DATABASE;
  const vocabSource = customVocabulary || VOCABULARY_DATABASE;

  const uniqueStrings = new Set();
  ALL_DATA.forEach(item => {
    const catStr = item.category || '';
    const engStr = item.eng || '';
    uniqueStrings.add(`${catStr.toLowerCase()}|||${engStr.toLowerCase()}`);
  });

  [...sentencesSource, ...vocabSource, ...GRAMMAR_DATABASE, ...GENERATED_DATA].forEach(item => {
    const isIndef = !item.source || item.source === 'Indefinido';
    if (isIndef && item.eng && unitEngSet.has(item.eng.trim().toLowerCase())) {
      // Exclude duplicate from Fuente Indefinida
      return;
    }
    const catStr = item.category || '';
    const engStr = item.eng || '';
    const uniqueKey = `${catStr.toLowerCase()}|||${engStr.toLowerCase()}`;
    if (!uniqueStrings.has(uniqueKey)) {
      uniqueStrings.add(uniqueKey);
      ALL_DATA.push({
        ...item,
        year: item.year || '2026',
        source: isIndef ? 'Indefinido' : item.source,
        unit: isIndef ? 'Unidad Indefinida' : (item.unit || 'Unidad Indefinida')
      });
    }
  });

  // 6. Process baseline dialogues
  const dialoguesSource = customDialogues || DIALOGUES_RAW;
  const getTopicCategory = (category: string): string | null => {
    const t = category.toLowerCase();
    if (t.includes('introductions') || t.includes('basic chat') || t.includes('presentarse') || t.includes('name')) return 'Introductions';
    if (t.includes('countries') || t.includes('nationalities') || t.includes('brazil') || t.includes("tom's") || t.includes('origin') || t.includes('where are you from') || t.includes('nationality')) return 'Countries & Nationalities';
    if (t.includes('hobbies') || t.includes('hobby')) return 'Hobbies';
    if (t.includes('weather') || t.includes('clima')) return 'Weather';
    if (t.includes('location') || t.includes('place') || t.includes('centre') || t.includes('activity')) return 'Places';
    if (t.includes('personal') || t.includes('info')) return 'Personal Info';
    if (t.includes('monsters') || t.includes('story')) return 'Monster Inc - Book';
    return null;
  };

  dialoguesSource.forEach((d) => {
    const isIndef = !d.source || d.source === 'Indefinido';
    const dYear = d.year || '2026';
    const dSource = isIndef ? 'Indefinido' : d.source;
    const dUnit = isIndef ? 'Unidad Indefinida' : (d.unit || 'Unidad Indefinida');
    const mappedCat = getTopicCategory(d.category);

    d.dialogue.forEach((line: any, lineIdx: number) => {
      if (isIndef && line.eng && unitEngSet.has(line.eng.trim().toLowerCase())) {
        return;
      }
      const dialoguesKey = `dialogues|||${line.eng.toLowerCase()}`;
      if (!uniqueStrings.has(dialoguesKey)) {
        uniqueStrings.add(dialoguesKey);
        ALL_DATA.push({
          category: 'Dialogues',
          eng: line.eng,
          spa: line.spa,
          emoji: line.emoji || '💬',
          dialogueId: d.id,
          lineIdx,
          year: dYear,
          source: dSource,
          unit: dUnit
        });
      }

      if (mappedCat && mappedCat !== 'Dialogues') {
        const themeKey = `${mappedCat.toLowerCase()}|||${line.eng.toLowerCase()}`;
        if (!uniqueStrings.has(themeKey)) {
          uniqueStrings.add(themeKey);
          ALL_DATA.push({
            category: mappedCat,
            eng: line.eng,
            spa: line.spa,
            emoji: line.emoji || '💬',
            dialogueId: d.id,
            lineIdx,
            year: dYear,
            source: dSource,
            unit: dUnit
          });
        }
      }
    });
  });

// Cargar Ejercicios Multimodales (Escritura, Escucha, Habla, etc.)
ALL_DATA.forEach((item, index) => {
  if (item.category === 'Monster Inc - Book') {
    const pool = ALL_DATA.filter(d => d.category === 'Monster Inc - Book');
    const sentenceIndex = item.sentenceIndex ?? index;

    let wordsArray = item.eng.split(' ');
    let isSingleWord = wordsArray.length === 1;
    let lettersArray = item.eng.split('');

    // --- 1. Tarjetas / Flashcards (skillIndex = 0) ---
    EXERCISES_DB.push({
      id: `flashcard_monsterincbook_base_${sentenceIndex}`,
      category: item.category,
      type: 'flashcard',
      skill: 'Flashcards',
      question: `¿Cómo se dice en inglés?`,
      correctAnswer: item.eng,
      emoji: item.emoji,
      spa: item.spa,
      eng: item.eng,
      words: (isSingleWord ? lettersArray : wordsArray).sort(() => Math.random() - 0.5),
      isSingleWord,
      sentenceIndex,
      skillIndex: 0
    });

    // --- 2. Speaking / Hablar (skillIndex = 1) ---
    EXERCISES_DB.push({
      id: `speak_monsterincbook_${sentenceIndex}`,
      category: item.category,
      type: 'speak',
      skill: 'Speaking',
      question: `Lee en voz alta:`,
      textToRead: item.eng,
      emoji: item.emoji,
      spa: item.spa,
      eng: item.eng,
      sentenceIndex,
      skillIndex: 1
    });

    // --- 3. Reading / Leer (skillIndex = 2) ---
    let wrongSpaOptions = pool.filter(other => other.spa !== item.spa).sort(() => 0.5 - Math.random()).slice(0, 3).map(other => other.spa);
    while (wrongSpaOptions.length < 3) {
      wrongSpaOptions.push("Opción extra");
    }
    let readOptions = [item.spa, ...wrongSpaOptions].sort(() => 0.5 - Math.random());
    EXERCISES_DB.push({
      id: `quiz_read_monsterincbook_${sentenceIndex}`,
      category: item.category,
      type: 'quiz',
      skill: 'Reading',
      question: `¿Qué significa: "${item.eng}"?`,
      options: readOptions,
      correctAnswer: item.spa,
      emoji: item.emoji,
      spa: item.spa,
      eng: item.eng,
      optionsLang: 'es',
      sentenceIndex,
      skillIndex: 2
    });

    // --- 4. Writing / Escribir (skillIndex = 3) ---
    KEYBOARD_HIERARCHY.forEach((kbMode, kbIndex) => {
      EXERCISES_DB.push({ 
          id: `build_monsterincbook_${sentenceIndex}_${kbMode}`, 
          baseId: `build_monsterincbook_${sentenceIndex}`,
          category: item.category,
          type: 'build_sentence',
          skill: 'Writing', 
          question: isSingleWord ? `Escribe la palabra: ${item.spa}` : `Arma la frase: ${item.spa}`, 
          words: (isSingleWord ? lettersArray : wordsArray).sort(() => Math.random() - 0.5), 
          correctSentence: item.eng,
          emoji: item.emoji,
          spa: item.spa,
          eng: item.eng, 
          isSingleWord,
          targetKeyboardMode: kbMode,
          kbLevel: kbIndex,
          sentenceIndex,
          skillIndex: 3
      });
    });

    // --- 5. Listening / Escuchar (skillIndex = 4) ---
    KEYBOARD_HIERARCHY.forEach((kbMode, kbIndex) => {
      EXERCISES_DB.push({ 
          id: `listen_monsterincbook_${sentenceIndex}_${kbMode}`, 
          baseId: `listen_monsterincbook_${sentenceIndex}`,
          category: item.category,
          type: 'listen_and_write',
          skill: 'Listening', 
          question: `Escucha y escribe:`,
          textToSpeak: item.eng,
          correctAnswer: item.eng, 
          emoji: item.emoji,
          spa: item.spa,
          eng: item.eng, 
          words: (isSingleWord ? lettersArray : wordsArray).sort(() => Math.random() - 0.5), 
          isSingleWord,
          targetKeyboardMode: kbMode,
          kbLevel: kbIndex,
          sentenceIndex,
          skillIndex: 4
      });
    });

    // --- 6. Translate / Traducir (skillIndex = 5) ---
    let wrongEngOptions = pool.filter(other => other.eng !== item.eng).sort(() => 0.5 - Math.random()).slice(0, 3).map(other => other.eng);
    while (wrongEngOptions.length < 3) {
      wrongEngOptions.push("Extra option");
    }
    let transOptions = [item.eng, ...wrongEngOptions].sort(() => 0.5 - Math.random());
    EXERCISES_DB.push({
      id: `trans_monsterincbook_${sentenceIndex}`,
      category: item.category,
      type: 'quiz',
      skill: 'Translate',
      question: `¿Cómo se dice en inglés?: "${item.spa}"`,
      options: transOptions,
      correctAnswer: item.eng,
      emoji: item.emoji,
      spa: item.spa,
      eng: item.eng,
      optionsLang: 'en',
      sentenceIndex,
      skillIndex: 5
    });

    // --- 7. Dictation / Dictado (skillIndex = 6) ---
    EXERCISES_DB.push({
      id: `dictation_monsterincbook_${sentenceIndex}`,
      category: item.category,
      type: 'dictation',
      skill: 'Dictation',
      question: `Escucha a la profesora y escribe la frase:`,
      textToSpeak: item.eng,
      correctAnswer: item.eng,
      emoji: item.emoji,
      spa: item.spa,
      eng: item.eng,
      words: (isSingleWord ? lettersArray : wordsArray).sort(() => Math.random() - 0.5),
      isSingleWord,
      sentenceIndex,
      skillIndex: 6
    });

    // --- 8. Tarjetas / Flashcards (skillIndex = 7) ---
    EXERCISES_DB.push({
      id: `flashcard_monsterincbook_${sentenceIndex}`,
      category: item.category,
      type: 'flashcard',
      skill: 'Flashcards',
      question: `¿Cómo se dice en inglés?`,
      correctAnswer: item.eng,
      emoji: item.emoji,
      spa: item.spa,
      eng: item.eng,
      words: (isSingleWord ? lettersArray : wordsArray).sort(() => Math.random() - 0.5),
      isSingleWord,
      sentenceIndex,
      skillIndex: 7
    });

    // --- 9. Imagen / Visual Context (skillIndex = 8) ---
    EXERCISES_DB.push({
      id: `vis_speak_monsterincbook_${sentenceIndex}`,
      category: item.category,
      type: 'speak',
      skill: 'Visual',
      question: `Describe la imagen (Habla):`,
      textToRead: item.eng,
      emoji: item.emoji,
      spa: item.spa,
      eng: item.eng,
      isVisual: true,
      sentenceIndex,
      skillIndex: 8
    });
    EXERCISES_DB.push({
      id: `vis_listen_monsterincbook_${sentenceIndex}`,
      category: item.category,
      type: 'listen_and_write',
      skill: 'Visual',
      question: `Reconoce y escribe:`,
      textToSpeak: item.eng,
      correctAnswer: item.eng,
      emoji: item.emoji,
      spa: item.spa,
      eng: item.eng,
      isVisual: true,
      words: (isSingleWord ? lettersArray : wordsArray).sort(() => Math.random() - 0.5),
      isSingleWord,
      targetKeyboardMode: 'virtual_word',
      sentenceIndex,
      skillIndex: 8
    });
    EXERCISES_DB.push({
      id: `vis_quiz_monsterincbook_${sentenceIndex}`,
      category: item.category,
      type: 'quiz',
      skill: 'Visual',
      question: `¿Qué representa la imagen?`,
      options: transOptions,
      correctAnswer: item.eng,
      emoji: item.emoji,
      spa: item.spa,
      eng: item.eng,
      optionsLang: 'en',
      isVisual: true,
      sentenceIndex,
      skillIndex: 8
    });

    return;
  }

  const isNumber = item.category.includes('Number');
  const pool = isNumber ? ALL_DATA.filter(d => d.category.includes('Number')) : ALL_DATA;

  // Spacing custom attributes for dialog lines or normal items
  const exProps = { year: item.year || '2026', source: item.source || 'Indefinido', unit: item.unit || (item.source === 'Indefinido' ? 'Unidad Indefinida' : 'Unidad Indefinida'), ...(item.dialogueId ? { dialogueId: item.dialogueId, lineIdx: item.lineIdx } : {}) };

  EXERCISES_DB.push({ id: `speak_${index}`, category: item.category, type: 'speak', skill: 'Speaking', question: `Lee en voz alta:`, textToRead: item.eng, emoji: item.emoji, spa: item.spa, eng: item.eng, ...exProps });
  EXERCISES_DB.push({ id: `listen_repeat_${index}`, category: item.category, type: 'speak', skill: 'Speaking', question: `Escucha y repite (Listen & Repeat):`, textToRead: item.eng, emoji: item.emoji, spa: item.spa, eng: item.eng, autoPlayTTS: true, ...exProps });
  EXERCISES_DB.push({ id: `speak_trans_${index}`, category: item.category, type: 'speak', skill: 'Speaking', question: `Traduce al inglés (Hablando):`, textToRead: item.eng, emoji: item.emoji, spa: item.spa, eng: item.eng, isOralTranslation: true, ...exProps });
  
  let wordsArray = item.eng.split(' ');
  let isSingleWord = wordsArray.length === 1;
  let lettersArray = item.eng.split('');
  
  KEYBOARD_HIERARCHY.forEach((kbMode, kbIndex) => {
      EXERCISES_DB.push({ 
          id: `listen_${index}_${kbMode}`, 
          baseId: `listen_${index}`,
          category: item.category, type: 'listen_and_write', skill: 'Listening', 
          question: `Escucha y escribe:`, textToSpeak: item.eng, correctAnswer: item.eng, 
          emoji: item.emoji, spa: item.spa, eng: item.eng, 
          words: (isSingleWord ? lettersArray : wordsArray).sort(() => Math.random() - 0.5), 
          isSingleWord,
          targetKeyboardMode: kbMode,
          kbLevel: kbIndex,
          ...exProps
      });
      EXERCISES_DB.push({ 
          id: `build_${index}_${kbMode}`, 
          baseId: `build_${index}`,
          category: item.category, type: 'build_sentence', skill: 'Writing', 
          question: isSingleWord ? `Escribe la palabra: ${item.spa}` : `Arma la frase: ${item.spa}`, 
          words: (isSingleWord ? lettersArray : wordsArray).sort(() => Math.random() - 0.5), 
          correctSentence: item.eng, emoji: item.emoji, spa: item.spa, eng: item.eng, 
          isSingleWord,
          targetKeyboardMode: kbMode,
          kbLevel: kbIndex,
          ...exProps
      });
  });

  let wrongSpaOptions = pool.filter(other => other.spa !== item.spa).sort(() => 0.5 - Math.random()).slice(0, 3).map(other => other.spa);
  let readOptions = [item.spa, ...wrongSpaOptions].sort(() => 0.5 - Math.random());
  EXERCISES_DB.push({ id: `quiz_read_${index}`, category: item.category, type: 'quiz', skill: 'Reading', question: `¿Qué significa: "${item.eng}"?`, options: readOptions, correctAnswer: item.spa, emoji: item.emoji, spa: item.spa, eng: item.eng, optionsLang: 'es', ...exProps });

  let wrongEngOptions = pool.filter(other => other.eng !== item.eng).sort(() => 0.5 - Math.random()).slice(0, 3).map(other => other.eng);
  let transOptions = [item.eng, ...wrongEngOptions].sort(() => 0.5 - Math.random());
  EXERCISES_DB.push({ id: `trans_${index}`, category: item.category, type: 'quiz', skill: 'Translate', question: `¿Cómo se dice en inglés?: "${item.spa}"`, options: transOptions, correctAnswer: item.eng, emoji: item.emoji, spa: item.spa, eng: item.eng, optionsLang: 'en', ...exProps });
  EXERCISES_DB.push({ id: `flashcard_${index}`, category: item.category, type: 'flashcard', skill: 'Flashcards', question: `¿Cómo se dice en inglés?`, correctAnswer: item.eng, emoji: item.emoji, spa: item.spa, eng: item.eng, words: (isSingleWord ? lettersArray : wordsArray).sort(() => Math.random() - 0.5), isSingleWord, ...exProps });

  // Speed Speaking merged into Speaking
  if (isSingleWord || wordsArray.length < 6) {
      EXERCISES_DB.push({ id: `speedspeak_${index}`, category: item.category, type: 'speak', skill: 'Speaking', question: `¡Ráfaga! Lee rápido:`, textToRead: item.eng, emoji: item.emoji, spa: item.spa, eng: item.eng, ...exProps });
  }

  // Dictado / Dictation
  EXERCISES_DB.push({
      id: `dictation_${index}`,
      category: item.category,
      type: 'dictation',
      skill: 'Dictation',
      question: `Escucha a la profesora y escribe la frase:`,
      textToSpeak: item.eng,
      correctAnswer: item.eng,
      emoji: item.emoji,
      spa: item.spa,
      eng: item.eng,
      words: (isSingleWord ? lettersArray : wordsArray).sort(() => Math.random() - 0.5),
      isSingleWord,
      ...exProps
  });

  // Visual Context
  EXERCISES_DB.push({ id: `vis_speak_${index}`, category: item.category, type: 'speak', skill: 'Visual', question: `Describe la imagen (Habla):`, textToRead: item.eng, emoji: item.emoji, spa: item.spa, eng: item.eng, isVisual: true, ...exProps });
  EXERCISES_DB.push({ id: `vis_listen_${index}`, category: item.category, type: 'listen_and_write', skill: 'Visual', question: `Reconoce y escribe:`, textToSpeak: item.eng, correctAnswer: item.eng, emoji: item.emoji, spa: item.spa, eng: item.eng, isVisual: true, words: (isSingleWord ? lettersArray : wordsArray).sort(() => Math.random() - 0.5), isSingleWord, targetKeyboardMode: 'virtual_word', ...exProps });
  EXERCISES_DB.push({ id: `vis_quiz_${index}`, category: item.category, type: 'quiz', skill: 'Visual', question: `¿Qué representa la imagen?`, options: transOptions, correctAnswer: item.eng, emoji: item.emoji, spa: item.spa, eng: item.eng, optionsLang: 'en', isVisual: true, ...exProps });

  // Similar Choice
  let similarPool = pool.filter(other => other.eng !== item.eng && (other.eng.length === item.eng.length || other.eng.charAt(0) === item.eng.charAt(0))).sort(() => 0.5 - Math.random());
  if (similarPool.length < 3) similarPool = pool.filter(other => other.eng !== item.eng).sort(() => 0.5 - Math.random()); // fallback
  let confuseOptions = [item.eng, ...similarPool.slice(0, 3).map(other => other.eng)].sort(() => 0.5 - Math.random());
  EXERCISES_DB.push({ id: `sim_choice_${index}`, category: item.category, type: 'quiz', skill: 'Similar', question: `Encuentra la correcta (Cuidado, son similares):`, options: confuseOptions, correctAnswer: item.eng, emoji: item.emoji, spa: item.spa, eng: item.eng, optionsLang: 'en', ...exProps });
});

// Generar ejercicios de Match por categoría
const catMap: Record<string, any[]> = {};
ALL_DATA.forEach(item => {
    // Included Monster Inc - Book so that it also gets Match exercises
    if (!catMap[item.category]) catMap[item.category] = [];
    catMap[item.category].push(item);
});
Object.keys(catMap).forEach((category, catIdx) => {
    const items = catMap[category];
    for (let i = 0; i < items.length || (items.length > 0 && i === 0); i += 4) {
        let chunk = items.slice(i, i + 4);
        if (chunk.length < 3 && items.length > 0) {
            const fillers = ALL_DATA.filter(other => other.category !== category).sort(() => Math.random() - 0.5);
            chunk = [...chunk, ...fillers.slice(0, 4 - chunk.length)];
        }
        if (chunk.length < 3) continue;
        const pairs = chunk.map(c => ({ eng: c.eng, spa: c.spa, id: c.eng }));
        EXERCISES_DB.push({
            id: `match_${catIdx}_${i}`,
            category: category,
            type: 'match',
            skill: 'Match',
            question: 'Une correctamente:',
            pairs: pairs,
            emoji: chunk[0]?.emoji || '🔮',
            year: chunk[0]?.year || '2026',
            source: chunk[0]?.source || 'Indefinido',
            unit: chunk[0]?.unit || (chunk[0]?.source === 'Indefinido' ? 'Unidad Indefinida' : 'Unidad Indefinida')
        });
    }
});

// Cargar Ejercicios de Diálogos (Chats y Speaking unified containers)
dialoguesSource.forEach((d) => {
  EXERCISES_DB.push({
    id: `dchat_${d.id}`, category: d.category || 'Dialogues', type: 'dialogue_chat', skill: 'Conversation', dialogue: d.dialogue, emoji: d.dialogue[0]?.emoji || '💬',
    eng: d.dialogue.map((l: any) => l.eng).join(' '), spa: d.dialogue.map((l: any) => l.spa).join(' '),
    year: d.year || '2026', source: d.source || 'Indefinido', unit: d.unit || (d.source === 'Indefinido' ? 'Unidad Indefinida' : 'Unidad Indefinida')
  });
  EXERCISES_DB.push({
    id: `dspeak_${d.id}`, category: d.category || 'Dialogues', type: 'dialogue_speak', skill: 'Conversation', dialogue: d.dialogue, emoji: '🗣️',
    eng: d.dialogue.map((l: any) => l.eng).join(' '), spa: d.dialogue.map((l: any) => l.spa).join(' '),
    year: d.year || '2026', source: d.source || 'Indefinido', unit: d.unit || (d.source === 'Indefinido' ? 'Unidad Indefinida' : 'Unidad Indefinida')
  });
});


// Asignar propiedades a todos para alinearlas
let adCounter = 0;
ALL_DATA.forEach(item => {
  if (!item.id) { item.id = 'ad_' + adCounter++; }
  if (!item.eng) item.eng = '';
  if (!item.spa) item.spa = '';
  if (!item.category) item.category = 'General';
  if (!item.emoji) item.emoji = '✨';
  if (!item.year) item.year = '2026';
  if (!item.source) item.source = 'Indefinido';
  if (!item.unit) item.unit = item.source === 'Indefinido' ? 'Unidad Indefinida' : 'Unidad Indefinida';
  if (!item.type) item.type = 'Data';
  if (!item.skill) item.skill = 'Vocabulary';
});

let exCounter = 0;
EXERCISES_DB.forEach(ex => {
  if (!ex.id) { ex.id = 'ex_' + exCounter++; }
  if (!ex.eng) ex.eng = '';
  if (!ex.spa) ex.spa = '';
  if (!ex.category) ex.category = 'General';
  if (!ex.emoji) ex.emoji = '✨';
  if (!ex.year) ex.year = '2026';
  if (!ex.source) ex.source = 'Indefinido';
  if (!ex.unit) ex.unit = ex.source === 'Indefinido' ? 'Unidad Indefinida' : 'Unidad Indefinida';
  if (!ex.type) ex.type = 'Exercise';
  if (!ex.skill) ex.skill = 'Practice';
});


}

// Initial database load
rebuildDatabase();

