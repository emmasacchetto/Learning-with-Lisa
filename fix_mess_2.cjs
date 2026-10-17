const fs = require('fs');
let content = fs.readFileSync('src/App.tsx', 'utf-8');

const target = `{bottomSpacerHeight > 0 && <div style={{ height: bottomSpacerHeight }} className="w-full shrink-0" />}
                    </div>
            })()
              </div>
            </div>
          </div>
        )}`;

const replacement = `{bottomSpacerHeight > 0 && <div style={{ height: bottomSpacerHeight }} className="w-full shrink-0" />}
                    </div>
                  </div>
                </div>
              </div>
            </div>
        )}`;

content = content.replace(target, replacement);

fs.writeFileSync('src/App.tsx', content);
