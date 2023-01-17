import { main } from "./index"

describe("scaffolding", () => {
    it("can run a test", () => {
        expect(() => main()).not.toThrow();
    })
})