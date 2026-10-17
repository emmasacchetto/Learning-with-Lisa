const fs = require('fs');
let content = fs.readFileSync('src/App.tsx', 'utf-8');

const target = `                  );
                })()}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}`;

const replacement = `                  );
                })()}
              </div>
            </div>
          </div>
        )}`;

content = content.replace(target, replacement);
fs.writeFileSync('src/App.tsx', content);
