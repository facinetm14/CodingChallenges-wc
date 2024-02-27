"use strict";
const add = (a, b) => {
    return a + b;
};
describe("Math functions", () => {
    it("should add a to b", () => {
        const a = 3;
        const b = 5;
        const result = add(a, b);
        expect(result).toBe(8);
    });
});
//# sourceMappingURL=demo.test.js.map