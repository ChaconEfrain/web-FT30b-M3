const fs = require("fs");
const request = require("request");

module.exports = {
  pwd: (args, done) => done(process.cwd()),
  date: (args, done) => done(Date()),
  ls: (args, done) =>
    fs.readdir(".", function (err, files) {
      if (err) throw err;
      let output = "";
      files.forEach((file) => {
        output += `${file}\n`;
      });
      done(output);
    }),
  echo: (args, done) => done(args.join(" ")),
  cat: (args, done) =>
    fs.readFile(args[0], "utf-8", (err, data) => {
      if (err) throw err;
      done(data);
    }),
  head: (args, done) =>
    fs.readFile(args[0], "utf-8", (err, data) => {
      if (err) throw err;
      done(data.split("\n").slice(0, 10).join("\n"));
    }),
  tail: (args, done) =>
    fs.readFile(args[0], "utf-8", (err, data) => {
      if (err) throw err;
      done(data.split("\n").slice(-10).join("\n"));
    }),
  curl: (url, done) =>
    request(url[0], "utf-8", (err, response, body) => {
      if (err) throw err;
      done(body);
    }),
};
