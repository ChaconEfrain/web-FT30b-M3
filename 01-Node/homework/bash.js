const commands = require("./commands");

const done = (output) => {
  process.stdout.write(output);
  process.stdout.write("prompt > ");
};

// Output un prompt
process.stdout.write("\nprompt > ");
process.stdin.on("data", function (data) {
  var [cmd, ...args] = data.toString().trim().split(" ");
  if (commands[cmd]) commands[cmd](args, done);
  else process.stdout.write("Command not found");
  process.stdout.write("\nprompt > ");
});
