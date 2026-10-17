const fs = require('fs');
let code = fs.readFileSync('src/App.tsx', 'utf8');

const oldCopyPrompt = `  const handleCopyPrompt = (themeName: string) => {
    const prompt = \`Actúa como mi compañero de práctica de inglés. 
Vamos a conversar (hablando o por escrito) estrictamente sobre el siguiente tema: "\${themeName}".
Por favor, apégate de forma rigurosa a este tema. No introduzcas vocabulario avanzado ni te salgas de este contexto para asegurar que solo practique lo que he aprendido en esta unidad.
Hazme preguntas cortas, sencillas y de a una por vez para que yo pueda responder. 
Mi nivel es básico/principiante.
Si cometo un error en mis respuestas, corrígeme de forma amable, corta y concisa, y luego hazme la siguiente pregunta relacionada con el tema.
¡Empecemos! Hazme la primera pregunta.\`;
    navigator.clipboard.writeText(prompt).then(() => {
      setToastMsg(\`¡Prompt de \${themeName} copiado al portapapeles! 📋 (Pégalo en Gemini)\`);
    }).catch(err => {
      console.error('Error al copiar: ', err);
      setToastMsg('Error al copiar el prompt.');
    });
  };`;

const newCopyPrompt = `  const handleCopyPrompt = (themeName: string) => {
    const pool = getCategoryPool(themeName);
    const vocabList = pool.filter(ex => ex.type === 'flashcard_single').map(ex => \`- \${ex.eng} (\${ex.spa})\`).join('\\n');
    const sentenceList = pool.filter(ex => ex.type === 'sentence_builder' || ex.type === 'speak' || ex.type === 'listen_write').map(ex => \`- \${ex.eng} (\${ex.spa})\`).join('\\n');
    
    const contextSection = (vocabList || sentenceList) ? \`
Para que sepas exactamente qué vocabulario y estructuras estoy aprendiendo, este es el contenido exacto de mi unidad:
\` + (vocabList ? \`\\nVOCABULARIO:\\n\${vocabList}\\n\` : '') + (sentenceList ? \`\\nFRASES Y ESTRUCTURAS:\\n\${sentenceList}\\n\` : '') : '';

    const prompt = \`Actúa como mi compañero de práctica de inglés. 
Vamos a conversar (hablando o por escrito) estrictamente sobre el siguiente tema: "\${themeName}".
Por favor, apégate de forma rigurosa a este tema. No introduzcas vocabulario avanzado ni te salgas de este contexto para asegurar que solo practique lo que he aprendido en esta unidad.
\${contextSection}
INSTRUCCIONES PARA TI:
1. Limita tu vocabulario estrictamente a las palabras y frases de la unidad provistas arriba (o vocabulario extremadamente básico de soporte).
2. Hazme preguntas cortas, sencillas y de a una por vez para que yo pueda responder usando el vocabulario de la unidad. 
3. Mi nivel es básico/principiante.
4. Si cometo un error en mis respuestas, corrígeme de forma amable, corta y concisa, y luego hazme la siguiente pregunta relacionada con el tema.
5. NO asumas ningún rol raro, solo sé mi compañero de práctica.
¡Empecemos! Hazme la primera pregunta.\`;

    navigator.clipboard.writeText(prompt).then(() => {
      setToastMsg(\`¡Prompt de \${themeName} copiado al portapapeles! 📋 (Pégalo en Gemini)\`);
    }).catch(err => {
      console.error('Error al copiar: ', err);
      setToastMsg('Error al copiar el prompt.');
    });
  };`;

// replace spaces since indentation might differ
code = code.replace(/const handleCopyPrompt = \(themeName: string\) => \{[\s\S]*?setToastMsg\('Error al copiar el prompt\.'\);\s+\}\);\s+\};/, newCopyPrompt);

fs.writeFileSync('src/App.tsx', code);
console.log("App.tsx prompt patched!");
