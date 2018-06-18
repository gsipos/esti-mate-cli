import './tag';
import { Project, Estimate } from '../model';
import { tagsOf, tasksOfTag } from './tag';
import { CURRENT_PROJECT_VERSION } from './project.parse';

describe('Tag service', () => {
    const estimate: Estimate = {
        bestCase: 1,
        mostLikely: 2,
        worstCase: 3,
    }
    const sampleProject: Project = {
        name: 'asd',
        defaultInterval: 95,
        short: 'asd',
        projectFileVersion: CURRENT_PROJECT_VERSION,
        tasks: [
            { name: 'a', code: 'a', sequence: 1, estimate, tags: ['a', 'b'] },
            { name: 'a', code: 'a', sequence: 1, estimate, tags: [] },
            { name: 'a', code: 'a', sequence: 1, estimate, tags: ['c', 'd'] },
            { name: 'a', code: 'a', sequence: 1, estimate, tags: ['a', 'c'] },
            { name: 'a', code: 'a', sequence: 1, estimate, tags: ['e'] },
        ]
    }

    it('tagsOf return the list of unique tags of a project', () =>
        expect(tagsOf(sampleProject)).toEqual(['a', 'b', 'c', 'd', 'e']));

    it('tasksOfTag returns the list of tasks that have a specific tag', () =>
        expect(tasksOfTag('a', sampleProject)).toEqual([sampleProject.tasks[0], sampleProject.tasks[3]]));

    xit('tagToInfoArray return an array of values to be displayed as a table, or be exported as csv', () => {});
    xit('exportTagsToCSV export tag summary to csv file', () => { });
});
