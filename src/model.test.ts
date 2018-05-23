import { Estimate, wheightedAverageOfEstimate, standardDeviationOfEstimate } from "./model";


describe('Model', () => {

    const toEstimate = (b: number, m: number, w: number) => ({
        bestCase: b,
        mostLikely: m,
        worstCase: w
    });

    describe('wheighted average of estimate', () => {
        it('should be zero for zero estimates', () =>
            expect(wheightedAverageOfEstimate(toEstimate(0, 0, 0))).toBe(0));

        it('should return the correct value', () =>
            expect(wheightedAverageOfEstimate(toEstimate(1, 2, 3))).toBe(2));
    });

    describe('standard deviation of estimate', () => {
        it('should be zero for zero estimate', () =>
            expect(standardDeviationOfEstimate(toEstimate(0, 0, 0))).toBe(0));

        it('should return the correct value', () =>
            expect(standardDeviationOfEstimate(toEstimate(1,2,7))).toBe(1));
    });

});