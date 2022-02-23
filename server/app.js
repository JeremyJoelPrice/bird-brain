const express = require("express");

const { sampleController } = require("../controllers");

const app = express();

app.use(express.json());

app.get("/", sampleController);

module.exports = app;
