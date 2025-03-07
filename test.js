import { handler } from "./demoLambda1/index.mjs";

const event = { key1: "value1", key2: "value2" };
handler(event).then(console.log).catch(console.error);