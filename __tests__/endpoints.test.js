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

describe("/login", () => {
	describe("GET", () => {
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
	describe("POST", () => {
		it("returns 201 status code if given unused credentials", () => {
			const newUser = {
				email: "ornare.tortor.at@google.ca",
				nickname: "Clinton Taylor",
				password: "OKO17JER2VW"
			};

			return supertest(app).post("/login").send(newUser).expect(201);
		});
		it("creates new user if given unused credentials", () => {
			const newUser = {
				email: "ornare.tortor.at@google.ca",
				nickname: "Clinton Taylor",
				password: "OKO17JER2VW"
			};
			return supertest(app)
				.post("/login")
				.send(newUser)
				.expect(201)
				.then(() => {
					return database
						.query(
							`SELECT * FROM users WHERE email='ornare.tortor.at@google.ca'`
						)
						.then(({ rows }) => {
							expect(rows[0].email).toBe("ornare.tortor.at@google.ca");
						});
				});
		});
		it("returns 409 status if given an already used email address", () => {
			const newUser = {
				email: "augue.eu@icloud.couk",
				nickname: "Clinton Taylor",
				password: "OKO17JER2VW"
			};

			return supertest(app).post("/login").send(newUser).expect(409);
		});
	});
});
