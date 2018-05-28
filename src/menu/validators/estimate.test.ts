import { parseEstimateString } from "./estimate";
import { Estimate } from "../../model";

describe('Estimate validators', () => {
    const integers: Estimate = {
        bestCase: 2,
        mostLikely: 3,
        worstCase: 4,
    };

    const floats: Estimate = {
        bestCase: 2.2,
        mostLikely: 3.2,
        worstCase: 4.4,
    }

    it('throws an error for empty string', () => 
        expect(() => parseEstimateString('')).toThrowError());

    it('throws an error for undefined', () => 
        expect(() => parseEstimateString(undefined as any)).toThrowError());

    it('parses comma separated integers', () => 
        expect(parseEstimateString('2, 3, 4')).toEqual(integers));

    it('parses space separated integery', () => 
        expect(parseEstimateString('2 3 4')).toEqual(integers));
    
    it('error if not enough number', () => 
        expect(() => parseEstimateString('1 2')).toThrowError());
    
    it('parses float values', () => 
        expect(parseEstimateString('2.2 3.2 4.4')).toEqual(floats));
    
    it('parses comma separated float values', () => 
        expect(parseEstimateString('2.2, 3.2, 4.4')).toEqual(floats));

    it('throws an error for non numeric characters', () => 
        expect(() => parseEstimateString('a b c')).toThrowError());
});