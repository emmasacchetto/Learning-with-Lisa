const fs = require('fs');
let content = fs.readFileSync('src/components/ExerciseEngine.tsx', 'utf-8');

content = content.replace(/<img src=\{feedbackImage\} alt="Feedback Character" className="w-full h-full object-contain"(?: onError=\{\(e\) => \(e\.currentTarget\.style\.display = "none"\)\})? \/>/g, 
  `<img src={feedbackImage} alt="Feedback Character" className="w-full h-full object-contain drop-shadow-2xl" />`);

fs.writeFileSync('src/components/ExerciseEngine.tsx', content);
