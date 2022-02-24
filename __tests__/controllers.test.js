const app = require("../server/app");
const supertest = require("supertest");
const seed = require("../database/seed");
const data = require("../database/test data");
const database = require("../database/connection");

beforeEach(() => seed(data));
afterAll(() => database.end());

describe("GET /", () => {
	it("returns status 200 and explanatory api document", () => {
		return supertest(app)
			.get("/")
			.expect(200)
			.then(({ body }) => {
				expect(body).toEqual(require("../server/greeting.json"));
			});
	});
});

describe("GET /login", () => {
	it("returns 200 status and user_id, if given valid credentials", async () => {
		const { body: bodyA } = await supertest(app).get("/login").send({
			email: "orci.in.consequat@yahoo.com",
			password: "RDT33MET2KV"
		});

		expect(bodyA).toMatchObject({
			user_id: 1
		});

		const { body: bodyB } = await supertest(app).get("/login").send({
			email: "feugiat.lorem.ipsum@icloud.org",
			password: "CTR04YFF4GA"
		});

		expect(bodyB).toMatchObject({
			user_id: 3
		});
	});
	it("returns 404 Not Found if given invalid credentials", () => {
		return supertest(app)
			.get("/login")
			.send({
				email: "orci.in.consequat@yahoo.com",
				password: "not a password"
			})
			.then((response) => {
				expect(response.status).toBe(404);
				expect(response.body).toMatchObject({ msg: "Not Found" });
			});
	});
});
