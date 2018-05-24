const EventEmitter = require('events');
const readline = require('readline');

class MyEmitter extends EventEmitter {}

const myEmitter = new MyEmitter();

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.on('line', (input) => {
  console.log(`Received: ${input}`);
});
