
const add = (a: number, b: number): number => {
    return a + b;
}

describe("Math functions", () => {
    it("should add a to b", () => {
        const a = 3;
        const b = 5;

        const result = add(a, b);
        
        expect(result).toBe(8);
    })
});