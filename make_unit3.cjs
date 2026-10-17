const fs = require('fs');

const j1 = JSON.parse(fs.readFileSync('json1.json', 'utf8'));
const j2 = JSON.parse(fs.readFileSync('json2.json', 'utf8'));

const unit3 = {
  unit: "Unid. 3: Habits",
  source: "I Succeed in English 2 Studentsbook and Workbook",
  year: "2026",
  DIALOGUES: [...(j1.DIALOGUES || []), ...(j2.DIALOGUES || [])],
  GRAMMAR_QUIZZES: [...(j1.GRAMMAR_QUIZZES || []), ...(j2.GRAMMAR_QUIZZES || [])],
  READING_COMPREHENSION: [...(j1.READING_COMPREHENSION || []), ...(j2.READING_COMPREHENSION || [])],
  SENTENCES: [...(j1.SENTENCES || []), ...(j2.SENTENCES || [])],
  VOCABULARY: [...(j1.VOCABULARY || []), ...(j2.VOCABULARY || [])]
};

fs.writeFileSync('src/units/unit3.json', JSON.stringify(unit3, null, 2), 'utf8');
console.log('Unit 3 saved. Dialogues:', unit3.DIALOGUES.length, 'Quizzes:', unit3.GRAMMAR_QUIZZES.length, 'Sentences:', unit3.SENTENCES.length, 'Vocab:', unit3.VOCABULARY.length);
