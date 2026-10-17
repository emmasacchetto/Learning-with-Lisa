const fs = require('fs');
let content = fs.readFileSync('src/App.tsx', 'utf-8');

const oldSyntax = `                       </div>
                     );
                  })()}
                  </div>
                  )}`;

const newSyntax = `                       </div>
                     );
                  });
                  })()}
                  </div>
                  )}`;

content = content.replace(oldSyntax, newSyntax);
fs.writeFileSync('src/App.tsx', content);
