import { describe, expect, it} from "@jest/globals";
import { sum } from "./app";


describe(sum, () => {

    it("sums two numbers", () => {
        expect(sum(1,2)).toBe(3);
    })
})