import {
    wheightedAverageOfEstimate,
    standardDeviationOfEstimate,
    meanValueOfEstimate,
    wheightedAverageOfTasks,
    Task,
    meanValueOfProject,
    Project,
    confidenceIntervalOfTasks
} from "./model";

describe('Model', () => {

    const toEstimate = (b: number, m: number, w: number) => ({
        bestCase: b,
        mostLikely: m,
        worstCase: w
    });

    const tasks = [
        { estimate: toEstimate(1, 2, 3) },
        { estimate: toEstimate(2,3,4) },
    ]

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

    it('mean value of estimate returns the correct value', () => {
        expect(meanValueOfEstimate(toEstimate(1, 2, 3))).toBe(2);
    });

    it('wheightedAverageOfTasks returns the sum estimation of tasks', () => {
        expect(wheightedAverageOfTasks(tasks as Task[])).toBe(5);
    });

    it('meanValueOfProject returns the mean of the task estimations', () => {
        expect(meanValueOfProject({ tasks } as any as Project)).toBe(2.5)
    });

    it('confidenceIntervalOfTasks returns min and max values of an interval', () => {
        const interval = confidenceIntervalOfTasks(tasks as any as Task[]);
        expect(interval.min).toBeGreaterThan(0);
        expect(interval.max).toBeGreaterThan(interval.min);
    });
});