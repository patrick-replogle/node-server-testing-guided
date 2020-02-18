const request = require("supertest");

const server = require("./server.js");

describe("server.js", () => {
  describe("environment", () => {
    it("should set environment to testing", () => {
      expect(process.env.DB_ENV).toBe("testing");
    });
  });
});

// use return to test asnychronous code that don't use async await
describe("GET /", () => {
  it('should return {api: "up"}', () => {
    return request(server)
      .get("/")
      .then(res => {
        expect(res.status).toBe(200);
        expect(res.type).toBe("application/json");
        expect(res.body.api).toBe("up");
      });
  });
});

// async await version
test("welcome route", async () => {
  const res = await request(server).get("/");
  // does it return the expected status code?
  expect(res.status).toBe(200);
  // does it return the expected data format?
  expect(res.type).toBe("application/json");
  // does it return the expected data?
  expect(res.body.api).toMatch(/up/i);
});

test("get hobbit list", async () => {
  const res = await request(server).get("/hobbits");
  expect(res.status).toBe(200);
  expect(res.type).toBe("application/json");
  expect(res.body.length).toBeGreaterThan(0);
  expect(res.body[0].id).toBe(2);
  expect(res.body[0].name).toBe("frodo");
});

test("create hobbit route", async () => {
  const res = await request(server)
    .post("/hobbits")
    .send({ name: "gaffer" });
  expect(res.status).toBe(201);
  expect(res.type).toBe("application/json");
  expect(res.body).toEqual({ id: 5, name: "gaffer" });
});

// test('auth example', () => {
//     return request(server)
//       .post("/login")
//       .send({ username: "me", password: "pass" })
//       .then(res => {
//         const token = res.body.token;
//         return request(server)
//           .get("/")
//           .set("Authorization", token)
//           .then(res => {
//             expect(res.status).toBe(200)
//             expect(Array.isArray(res.body)).toBe(true);
//           });
//       });
//   });
