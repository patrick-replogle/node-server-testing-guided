const express = require("express");

const Hobbits = require("../hobbits/hobbitsModel.js");

const server = express();

server.use(express.json());

server.get("/", (req, res) => {
  res.status(200).json({ api: "up", dbenv: process.env.DB_ENV });
});

server.get("/hobbits", async (req, res, next) => {
  try {
    const hobbits = await Hobbits.list();
    res.status(200).json(hobbits);
  } catch (err) {
    next(err);
  }
});

server.post("/hobbits", async (req, res, next) => {
  try {
    const hobbit = await Hobbits.insert(req.body);
    res.status(201).json(hobbit);
  } catch (err) {
    next(err);
  }
});

module.exports = server;
