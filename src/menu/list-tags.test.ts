import { Project, Task } from "../model";
import { parseEstimateString } from "./validators/estimate";
import { listTags } from "./list-tags";

jest.mock('console');

describe('List tags', () => {
    console.log = jest.fn();

    const createTask = (tag: string, estimate: string) => ({
        name: 'task' + tag + estimate,
        code: 't',
        sequence: 1,
        estimate: parseEstimateString(estimate),
        tags: tag.split(','),
    } as Task);

    const estimate1 = [1.1, 2.2, 3.3].map(s => ''+s);
    const estimate2 = [4.4, 5.5, 6.6].map(s => ''+s);
    const sampleProject: Project = {
        name: 'test',
        defaultInterval: 95,
        projectFileVersion: 1,
        short: 'tt',
        tasks: [
            createTask('t1', estimate1.join(',')),
            createTask('t2', estimate2.join(',')),
        ]
    }

    it('displays the tag infos', () => {
        listTags(sampleProject);
        ['t1', 't2', ...estimate1, ...estimate2].forEach(s =>
            expect(console.log).toHaveBeenCalledWith(expect.stringContaining(s)));
    });


});