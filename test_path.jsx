const items = Array.from({length: 5}).map((_,i) => ({id: i, emoji: 'A', name: 'Test'}));
const totalHeight = 100 + items.length * 160;
// node at: x = 200 + offset, y = 80 + i * 160
