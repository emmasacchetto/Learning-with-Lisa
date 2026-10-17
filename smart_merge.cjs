const fs = require('fs');

const j1 = JSON.parse(fs.readFileSync('json1.json', 'utf-8'));
const j2 = JSON.parse(fs.readFileSync('json2.json', 'utf-8'));

let tsContent = fs.readFileSync('src/data_expanded.ts', 'utf-8');

function appendToExportedArray(arrayName, newData, formatter, isDuplicate) {
  if (!newData || newData.length === 0) return;
  
  const searchString = `export const ${arrayName}`;
  const startIndex = tsContent.indexOf(searchString);
  if (startIndex === -1) {
    console.error(`Could not find ${searchString} in src/data_expanded.ts`);
    return;
  }
  
  const bracketIndex = tsContent.indexOf('[', startIndex);
  if (bracketIndex === -1) return;
  
  const toAdd = newData.filter(item => !isDuplicate(item));
  if (toAdd.length === 0) {
    console.log(`No new items to add for ${arrayName}`);
    return;
  }
  
  const dataString = '\n' + toAdd.map(formatter).join(',\n') + ',\n';
  tsContent = tsContent.slice(0, bracketIndex + 1) + dataString + tsContent.slice(bracketIndex + 1);
  console.log(`Added ${toAdd.length} items to ${arrayName}`);
}

const objectFormatter = item => JSON.stringify(item, null, 2);
const stringFormatter = item => `  "${item.eng}|${item.spa}|${item.category}|${item.emoji || ''}"`;

const dialogues = (j1.DIALOGUES || []).concat(j2.DIALOGUES || []);
const grammarQuizzes = (j1.GRAMMAR_QUIZZES || []).concat(j2.GRAMMAR_QUIZZES || []);
const readingComp = (j1.READING_COMPREHENSION || []).concat(j2.READING_COMPREHENSION || []);
const sentences = (j1.SENTENCES || []).concat(j2.SENTENCES || []);
const vocabulary = (j1.VOCABULARY || []).concat(j2.VOCABULARY || []);

appendToExportedArray('DIALOGUE_PATTERNS_EXPANDED', dialogues, objectFormatter, item => tsContent.includes(item.id));
appendToExportedArray('GRAMMAR_QUIZZES_EXPANDED', grammarQuizzes, objectFormatter, item => tsContent.includes(item.id));
appendToExportedArray('READING_COMPREHENSION_DATA_EXPANDED', readingComp, objectFormatter, item => tsContent.includes(item.readingText.substring(0, 30)));
appendToExportedArray('MASTER_DATABASE_EXPANDED', sentences, stringFormatter, item => tsContent.includes(item.eng));
appendToExportedArray('VOCAB_RAW_EXPANDED', vocabulary, stringFormatter, item => tsContent.includes(item.eng));

fs.writeFileSync('src/data_expanded.ts', tsContent, 'utf-8');
console.log('Merged successfully!');
