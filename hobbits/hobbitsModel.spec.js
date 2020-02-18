const hobbitsModel = require("./hobbitsModel.js");
const db = require("../data/dbConfig.js");

// you can also truncate() the table to start fresh before running tests
describe("hobbits model", () => {
  beforeEach(async () => {
    await db("hobbits").truncate();
  });

  describe("insert", () => {
    it("should add the hobbit to the database", async () => {
      await hobbitsModel.insert({ name: "Same" });
      await hobbitsModel.insert({ name: "Gaffer" });

      const hobbits = await db("hobbits");

      expect(hobbits).toHaveLength(2);
    });
  });
});

//you can also run seeds before testing and wrap all the test within the beforeEach function
beforeEach(async () => {
  await db.seed.run();
});

describe("hobbits model", () => {
  test("list", async () => {
    const res = await hobbitsModel.list();
    expect(res.length).toBeGreaterThan(0);
  });

  test("findById", async () => {
    const res = await hobbitsModel.findById(1);
    expect(res.name).toBe("sam");
  });

  test("insert", async () => {
    await hobbitsModel.insert({ name: "bilbo" });
    const hobbits = await db("hobbits").select();
    expect(hobbits).toHaveLength(5);
  });

  test("update", async () => {
    await hobbitsModel.update(1, { name: "bilbo" });
    const hobbit = await hobbitsModel.findById(1);
    expect(hobbit.name).toBe("bilbo");
  });

  test("remove", async () => {
    await hobbitsModel.remove(1);
    const hobbits = await hobbitsModel.list();
    expect(hobbits).toHaveLength(3);
  });
});
