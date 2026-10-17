const fs = require('fs');

const dbs = ['dialogues.json', 'grammar_quizzes.json', 'reading_comprehension.json', 'sentences.json', 'vocabulary.json'];
const srcPath = 'src/databases/';

for (const db of dbs) {
    const filePath = srcPath + db;
    let data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    
    let isArray = Array.isArray(data);
    
    // If it's an object with multiple arrays (like the provided JSONs), we need to iterate differently, 
    // but the actual DB files are arrays. Let's check:
    
    if (isArray) {
        data = data.map(item => {
            // Unid. 3: Habits -> Move to unit "Unit 3: Habits" and source "I Succeed in English 2 Studentsbook and Workbook"
            if (item.category === 'Unid. 3: Habits') {
                item.source = "I Succeed in English 2 Studentsbook and Workbook";
                item.unit = "Unit 3: Habits";
                item.category = "Unit 3: Habits"; // Wait, "Unid. 3: Habits" has no topics inside it currently? I will set unit to Unit 3 and category to General or leave it. 
                // Ah, the user says "Los temas que están en 'Fuente Indefinida', idéntalos en 'Unidad Indefinida'."
                // This means we need a "unit" field.
            }
            
            // Check if source is Indefinido
            if (item.source === 'Indefinido') {
                item.unit = "Unidad Indefinida";
            } else if (item.source) {
                // If it has a source but no unit, what should we do? 
                // The new data has sources like "I Succeed in English 2 - Unit 8 Weather"
                // We will handle the new data next. For now let's just make sure unit exists.
                if (!item.unit) {
                    item.unit = "Unidad Indefinida";
                }
            } else {
                item.source = 'Indefinido';
                item.unit = 'Unidad Indefinida';
            }
            return item;
        });
        fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
    }
}
console.log("DBs prepared for units");
