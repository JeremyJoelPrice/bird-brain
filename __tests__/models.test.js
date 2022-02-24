const { fetchUserId } = require("../models");
const seed = require("../database/seed");
const data = require("../database/test data");
const database = require("../database/connection");

beforeEach(() => seed(data));
afterAll(() => database.end());

describe("fetchUserId()", () => {
	it("returns user_id when given extant email & password", async () => {
		let user_id = await fetchUserId(
			"orci.in.consequat@yahoo.com",
			"RDT33MET2KV"
		);
		expect(user_id).toBe(1);

		user_id = await fetchUserId("mollis@protonmail.org", "EPM53MHS4SG");
		expect(user_id).toBe(2);
	});
	it("throws 404 Not Found when given unused email/password combination", () => {
		return fetchUserId("orci.in.consequat@yahoo.com", "wrong-password").catch(
			(error) => {
				expect(error).toMatchObject({ status: 404, msg: "Not Found" });
			}
		);
	});
});
