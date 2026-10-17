const fs = require('fs');

const inputFile = process.argv[2];
if (!inputFile) {
  console.error("No input file provided.");
  process.exit(1);
}

const data = JSON.parse(fs.readFileSync(inputFile, 'utf-8'));
let tsContent = fs.readFileSync('src/data_expanded.ts', 'utf-8');

// The file has several arrays exported:
// export const DIALOGUES_EXPANDED: Dialogue[] = [
// export const GRAMMAR_QUIZZES_EXPANDED: GrammarQuiz[] = [
// export const READING_COMPREHENSION_EXPANDED: ReadingComprehension[] = [
// export const SENTENCES_EXPANDED: Sentence[] = [
// export const VOCAB_RAW_EXPANDED: {eng: string, spa: string, category: string, emoji?: string, type?: "vocabulary"}[] = [

function appendToExportedArray(ts, arrayName, newData) {
  if (!newData || newData.length === 0) return ts;
  
  const searchString = `export const ${arrayName}`;
  const startIndex = ts.indexOf(searchString);
  if (startIndex === -1) {
    console.error(`Could not find ${searchString} in src/data_expanded.ts`);
    return ts;
  }
  
  // Find the opening bracket of the array
  const bracketIndex = ts.indexOf('[', startIndex);
  if (bracketIndex === -1) return ts;
  
  // We will insert the new data right after the opening bracket
  // First, map the data to string representations
  const dataString = newData.map(item => JSON.stringify(item, null, 2)).join(',\n') + ',\n';
  
  return ts.slice(0, bracketIndex + 1) + '\n' + dataString + ts.slice(bracketIndex + 1);
}

tsContent = appendToExportedArray(tsContent, 'DIALOGUES_EXPANDED', data.DIALOGUES);
tsContent = appendToExportedArray(tsContent, 'GRAMMAR_QUIZZES_EXPANDED', data.GRAMMAR_QUIZZES);
tsContent = appendToExportedArray(tsContent, 'READING_COMPREHENSION_EXPANDED', data.READING_COMPREHENSION);
tsContent = appendToExportedArray(tsContent, 'SENTENCES_EXPANDED', data.SENTENCES);
tsContent = appendToExportedArray(tsContent, 'VOCAB_RAW_EXPANDED', data.VOCABULARY);

fs.writeFileSync('src/data_expanded.ts', tsContent, 'utf-8');
console.log(`Merged ${inputFile} into src/data_expanded.ts`);
