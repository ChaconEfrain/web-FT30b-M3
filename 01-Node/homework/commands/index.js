const fs = require("fs");

module.exports = {
  pwd: function () {
    process.stdin.on("data", function (data) {
      var cmd = data.toString().trim();
      process.stdout.write(process.argv[1]);

      process.stdout.write("\nprompt > ");
    });
  },
  date: function () {
    process.stdin.on("data", function (data) {
      var cmd = data.toString().trim();
      process.stdout.write(Date());
      process.stdout.write("\nprompt > ");
    });
  },
  ls: function () {
    fs.readdir(".", function (err, files) {
      if (err) throw err;
      files.forEach(function (file) {
        process.stdout.write(file.toString() + "\n");
      });
      process.stdout.write("\nprompt > ");
    });
  },
};
