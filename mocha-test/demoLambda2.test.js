import  { expect } from "chai";

// Dynamically import the function (works for both CommonJS & ES Modules)
async function getLambdaFunction() {
        return (await import("../demoLambda2/index.mjs")).handler; // For ES Modules
}

describe("AWS Lambda Function - demoLambda2", () => {
    it("should return a 200 response with a message", async () => {
        const handler = await getLambdaFunction();
        const event = { key1: "value1" }; // Simulated event
        const response = await handler(event);

        expect(response).to.be.an("object");
        expect(response).to.have.property("statusCode").that.equals(200);
        expect(response).to.have.property("body");

        const body = JSON.parse(response.body);
        expect(body).to.have.property("message").that.equals("This is lambda function : demoLambda2");
    });
});