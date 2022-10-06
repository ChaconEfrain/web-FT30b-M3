var http = require("http");
var fs = require("fs");
const { decode } = require("punycode");

var beatles = [
  {
    name: "John Lennon",
    birthdate: "09/10/1940",
    profilePic:
      "https://blogs.correiobraziliense.com.br/trilhasonora/wp-content/uploads/sites/39/2020/10/CBNFOT081020100047-550x549.jpg",
  },
  {
    name: "Paul McCartney",
    birthdate: "18/06/1942",
    profilePic:
      "http://gazettereview.com/wp-content/uploads/2016/06/paul-mccartney.jpg",
  },
  {
    name: "George Harrison",
    birthdate: "25/02/1946",
    profilePic:
      "https://canaldosbeatles.files.wordpress.com/2012/02/george-george-harrison-8321345-438-600.jpg",
  },
  {
    name: "Richard Starkey",
    birthdate: "07/08/1940",
    profilePic:
      "http://cp91279.biography.com/BIO_Bio-Shorts_0_Ringo-Starr_SF_HD_768x432-16x9.jpg",
  },
];

http
  .createServer((req, res) => {
    if (req.url === "/api") {
      res.writeHead(200, { "Content-type": "application/json" });
      res.end(JSON.stringify(beatles));
    }
    if (req.url.substring(0, 5) === "/api/") {
      const nombreBeatle = req.url.split("/").pop();
      const beatle = beatles.find(
        (beatle) => beatle.name === decodeURI(nombreBeatle)
      );
      if (beatle) {
        res.writeHead(200, { "Content-type": "application/json" });
        res.end(JSON.stringify(beatle));
      } else {
        res.writeHead(404, { "Content-type": "text/plain" });
        res.end("Beatle not found");
      }
    }
    if (req.url === "/") {
      fs.readFile("./index.html", (err, data) => {
        if (err) {
          res.writeHead(404, { "Content-type": "text/plain" });
          res.end("File not found");
        } else {
          res.writeHead(200, { "Content-type": "text/HTML" });
          res.end(data);
        }
      });
    }
    if (req.url.length > 1 && !req.url.includes("api")) {
      const nombreBeatle = req.url.split("/").pop();
      const beatle = beatles.find(
        (beatle) => beatle.name === decodeURI(nombreBeatle)
      );
      if (beatle) {
        fs.readFile("./beatle.html", "utf-8", (err, data) => {
          if (err) {
            res.writeHead(404, { "Content-type": "text/plain" });
            res.end("File not found");
          } else {
            data = data.replace("{name}", beatle.name);
            data = data.replace("{birthdate}", beatle.birthdate);
            data = data.replace("{profilePic}", beatle.profilePic);
            res.writeHead(200, { "Content-type": "text/HTML" });
            res.end(data);
          }
        });
      } else {
        res.writeHead(404, { "Content-type": "text/plain" });
        res.end("Beatle not found");
      }
    }

    // const loadInfo = (data) => {
    //   res.writeHead(200, { "Content-type": "application/json" });
    //   res.end(JSON.stringify(data));
    // };
    // const beatleReq = "Paul%20McCartney";
    // switch (req.url) {
    //   case "/":
    //     loadInfo(beatles);
    //     break;

    //   case `/api/${beatleReq}`:
    //     const beatleObj = beatles.find(
    //       (beatle) => beatle.name.split(" ")[0] === beatleReq.split("%20")[0]
    //     );
    //     loadInfo(beatleObj);
    //     break;

    //   default:
    //     res.writeHead(404);
    //     res.end("Beatle not found");
    //     break;
    // }
  })
  .listen(1337, "127.0.0.1");
