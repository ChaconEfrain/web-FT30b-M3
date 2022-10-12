const session = require("supertest-session");
const app = require("../index.js"); // Importo el archivo de entrada del server de express.

const agent = session(app);

describe("Test de APIS", () => {
  describe("GET /", () => {
    it("responds with 200", () => agent.get("/").expect(200));
    it("responds with and object with message `hola`", () =>
      agent.get("/").then((res) => {
        expect(res.body.message).toEqual("hola");
      }));
  });

  describe("GET /test", () => {
    it("responds with 200", () => agent.get("/test").expect(200));
    it("responds with and object with message `test`", () =>
      agent.get("/test").then((res) => {
        expect(res.body.message).toEqual("test");
      }));
  });

  describe("POST /sum", () => {
    it("responds with 200", () => agent.post("/sum").expect(200));
    it("responds with the sum of 2 and 3", () =>
      agent
        .post("/sum")
        .send({ a: 2, b: 3 })
        .then((res) => {
          expect(res.body.result).toEqual(5);
        }));
  });

  describe("POST /producto", () => {
    it("responds with 200", () => agent.post("/product").expect(200));
    it("responds with the product of 2 and 3", () =>
      agent
        .post("/product")
        .send({ a: 2, b: 3 })
        .then((res) => {
          expect(res.body.result).toEqual(6);
        }));
  });

  describe("POST /sumArray", () => {
    it("responds with 200", () =>
      agent
        .post("/sumArray")
        .send({ array: [2, 5, 7, 10, 11, 15, 20], num: 13 })
        .expect(200));
    it("responds true if the sum of two numbers in the array equals num", () =>
      agent
        .post("/sumArray")
        .send({ array: [2, 5, 7, 10, 11, 15, 20], num: 13 })
        .then((res) => {
          expect(res.body.result).toEqual(true);
        }));
    it("responds false if there aren't any two numbers that add to num", () =>
      agent
        .post("/sumArray")
        .send({ array: [2, 5, 7, 10, 11, 15, 20], num: 300 })
        .then((res) => expect(res.body.result).toEqual(false)));
  });

  describe("POST /numString", () => {
    it("responds with 200", () =>
      agent.post("/numString").send({ string: "hola" }).expect(200));
    it('responds with "4" if body equals "hola"', () =>
      agent
        .post("/numString")
        .send({ string: "hola" })
        .then((res) => expect(res.body.result).toEqual(4)));
    it("responds with status 400 if the body is a number", () =>
      agent.post("/numString").send({ string: 5 }).expect(400));
    it("responds with status 400 if the body is an empty string", () =>
      agent.post("/numString").send({ string: "" }).expect(400));
  });

  describe("POST /pluck", () => {
    it("responds with 200", () =>
      agent
        .post("/pluck")
        .send({
          array: [
            { name: "Efrain", lastname: "Chacon" },
            { name: "Laura", lastname: "Barrera" },
            { name: "Oscar", lastname: "Suarez" },
            { name: "David", lastname: "Uc" },
          ],
          property: "name",
        })
        .expect(200));
    it("responds with an array containing the correct keys", () =>
      agent
        .post("/pluck")
        .send({
          array: [
            { name: "Efrain", lastname: "Chacon" },
            { name: "Laura", lastname: "Barrera" },
            { name: "Oscar", lastname: "Suarez" },
            { name: "David", lastname: "Uc" },
          ],
          property: "name",
        })
        .then((res) =>
          expect(res.body.result).toEqual(["Efrain", "Laura", "Oscar", "David"])
        ));
    it("responds with status 400 if the array value is not an array", () =>
      agent.post("/pluck").send({ array: 5, property: "name" }).expect(400));
    it("responds with status 400 if the property value is an empty string", () =>
      agent
        .post("/pluck")
        .send({
          array: [
            { name: "Efrain", lastname: "Chacon" },
            { name: "Laura", lastname: "Barrera" },
            { name: "Oscar", lastname: "Suarez" },
            { name: "David", lastname: "Uc" },
          ],
          property: "",
        })
        .expect(400));
  });
});
