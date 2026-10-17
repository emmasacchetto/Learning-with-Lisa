const fs = require('fs');

const input = fs.readFileSync('prompt.txt', 'utf8');

// I will write a node script to extract all JSON blocks from the prompt (if I had it in a file, but I don't. I'll read it from the environment if possible, or I can just use my LLM memory to write the JSON to a file).
