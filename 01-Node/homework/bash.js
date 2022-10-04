console.log(process);
const commands = require("./commands");

// Output un prompt
process.stdout.write("prompt > ");
// El evento stdin 'data' se dispara cuando el user escribe una línea
const cmd = "ls";

commands[cmd]();
