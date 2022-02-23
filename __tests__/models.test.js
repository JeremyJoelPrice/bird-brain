const { sampleModel } = require("../models");
const seed = require("../database/seed");
const data = require("../database/data/test-data");
const database = require("../database/connection");

beforeEach(() => seed(data));
afterAll(() => database.end());

describe("completes db query", () => {
	it("does a thing", async () => {
		const response = await sampleModel();
		console.log(response, "<<<response");
	});
});
