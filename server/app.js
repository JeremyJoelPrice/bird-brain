const express = require("express");

const { sampleController, loginController } = require("../controllers");
const {
	handleCustomErrors,
	handlePsqlErrors,
	handleServerErrors
} = require("./errorHandlers");

const app = express();

app.use(express.json());

app.get("/", sampleController);

app.get("/login", loginController);

app.use(handleCustomErrors);
app.use(handlePsqlErrors);
app.use(handleServerErrors);

module.exports = app;
