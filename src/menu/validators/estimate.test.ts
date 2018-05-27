import { parseEstimateString } from "./estimate";
import { Estimate } from "../../model";

describe('Estimate validators', () => {
    const integers: Estimate = {
        bestCase: 2,
        mostLikely: 3,
        worstCase: 4,
    };

    it('throws an error for empty string', () => 
        expect(() => parseEstimateString('')).toThrowError());

    it('throws an error for undefined', () => 
        expect(() => parseEstimateString(undefined as any)).toThrowError());

    it('parses comma separated integers', () => 
        expect(parseEstimateString('2, 3, 4')).toEqual(integers));

    it('parses space separated integery', () => 
        expect(parseEstimateString('2 3 4')).toEqual(integers));
    
    
});