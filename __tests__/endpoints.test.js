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
			const { body: bodyA } = await supertest(app).get(
				"/login?email=orci.in.consequat@yahoo.com&password=RDT33MET2KV"
			);

			expect(bodyA).toMatchObject({
				user_id: 1
			});

			const { body: bodyB } = await supertest(app).get(
				"/login?email=feugiat.lorem.ipsum@icloud.org&password=CTR04YFF4GA"
			);

			expect(bodyB).toMatchObject({
				user_id: 3
			});
		});
		it("returns 404 Not Found if given invalid credentials", () => {
			return supertest(app)
				.get("/login", {
					params: {
						email: "orci.in.consequat@yahoo.com",
						password: "not a password"
					}
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

describe("GET /users/:user_id/fact_cards", () => {
	it("returns 200 status and array of cards, each with a 'count' property", () => {
		return supertest(app)
			.get("/users/4/cards")
			.expect(200)
			.then((response) => {
				expect(response.body).toMatchObject({
					cards: [
						{
							card_id: 2,
							fact: "rutrum.",
							image_url: "QZD83SQL6DF",
							bird_name: "Zane Orr",
							count: "2"
						},
						{
							card_id: 5,
							fact: "diam. Proin dolor. Nulla semper tellus id nunc",
							image_url: "JUH93KHS5YM",
							bird_name: "Fletcher Hahn",
							count: "1"
						}
					]
				});
			});
	});
	it("returns 200 status and empty array, if given a user who has no cards", () => {
		return supertest(app)
			.get("/users/1/cards")
			.expect(200)
			.then((response) => {
				expect(response.body).toMatchObject({ cards: [] });
			});
	});
});

describe("POST /photo", () => {
	describe("rewarding user with new fact card", () => {
		test("fetchFactCardsByBird returns an array of all fact cards of the given bird", () => {
			const { fetchFactCardsByBird } = require("../models");
			return fetchFactCardsByBird("Zane Orr").then((cards) => {
				cards.forEach((card) => {
					expect(card.bird_name).toBe("Zane Orr");
				});
			});
		});
		describe("pickACard selects a random index from the given array", () => {
			const { pickACard } = require("../user-ops");
			it("returns 0 when given an array of length 1", () => {
				expect(pickACard([1])).toBe(0);
			});
			it("returns 0 or 1, randomly, when given an array of length 2", () => {
				let mockRandom = jest.spyOn(Math, "random").mockReturnValue(0.5);
				expect(pickACard(["apple", "banana"])).toBe(1);
				mockRandom = jest.spyOn(Math, "random").mockReturnValue(0.49);
				expect(pickACard(["apple", "banana"])).toBe(0);

				mockRandom.mockRestore();
			});
		});
		describe("addOwnershipOfCardByUser", () => {
			it("adds the given card_id and user_id to users_fact_cards table", () => {
				const { addOwnershipOfCardByUser } = require("../models");
				// see card is not there
				return supertest(app)
					.get("/users/4/cards")
					.expect(200)
					.then((response) => {
						expect(response.body).toMatchObject({
							cards: [
								{
									card_id: 2,
									fact: "rutrum.",
									image_url: "QZD83SQL6DF",
									bird_name: "Zane Orr",
									count: "2"
								},
								{
									card_id: 5,
									fact: "diam. Proin dolor. Nulla semper tellus id nunc",
									image_url: "JUH93KHS5YM",
									bird_name: "Fletcher Hahn",
									count: "1"
								}
							]
						});
						// add card
						return addOwnershipOfCardByUser(4, 3).then(() => {
							return supertest(app)
								.get("/users/4/cards")
								.expect(200)
								.then((response) => {
									// see card is there
									expect(response.body).toMatchObject({
										cards: [
											{
												card_id: 2,
												fact: "rutrum.",
												image_url: "QZD83SQL6DF",
												bird_name: "Zane Orr",
												count: "2"
											},

											{
												fact: "mauris. Morbi non sapien molestie orci tincidunt adipiscing. Mauris",
												image_url: "SBS89EJS2ZV",
												bird_name: "Zane Orr"
											},
											{
												card_id: 5,
												fact: "diam. Proin dolor. Nulla semper tellus id nunc",
												image_url: "JUH93KHS5YM",
												bird_name: "Fletcher Hahn",
												count: "1"
											}
										]
									});
								});
						});
					});
			});
		});
	});
});
