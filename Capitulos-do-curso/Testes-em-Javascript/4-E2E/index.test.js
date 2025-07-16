const { describe, it } = require("mocha")
const supertest = require("supertest")
const assert = require("assert")

describe("API test suit", () => {
    let app
    
    before((done) => {
        app = require("./src/api.js")
        app.once('listening', done)
    })

    after(done => app.close(done))

    describe("/logged-area:get", () => {
        it("should show user information and return HTTP Status 200", async () => {
            const response = await supertest(app)
                .get("/logged-area")
                .expect(200)
            
            assert.strictEqual(response.text, "got user information")
        })
    })

    describe("/login:post", () => {
        it("should log the user on and return HTTP Status 200", async () => {
            const response = await supertest(app)
                .post("/login")
                .send({
                    username: "ThamirisAVicente",
                    password: "123"
                })
                .expect(200)
            assert.strictEqual(response.text, "user logged in successfully")
        })
    })

    describe("/login:post", () => {
        it("should not log the user in and return HTTP Status 401", async () => {
            const response = await supertest(app)
                .post("/login")
                .send({
                    username: "ThamirisAndrade",
                    password: "123"
                })
                .expect(401)
            
            assert.ok(response.unauthorized)
            assert.strictEqual(response.text, "invalid user and/or password")
        })
    })

    describe("/default:get", () => {
        it("should find anything and return HTTP Status 404", async () => {
            const response = await supertest(app)
                .get("/default")
                .expect(404)
            
            assert.strictEqual(response.text, "route not found")
        })
    })
})