const app = require("../server/app");
const supertest = require("supertest");

describe("/", () => {
	describe("GET", () => {
		it("returns status 200 and explanatory api document", () => {
			return supertest(app)
				.get("/")
				.expect(200)
				.then(({ body }) => {
					expect(body).toEqual(require("../server/greeting.json"));
				});
		});
	});
});
