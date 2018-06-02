jest.mock('inquirer');
jest.mock('../service/task');
jest.mock('./list-tasks.ts');
jest.mock('./project');

import inquirer from 'inquirer';
import { Project } from '../model';
import { showAddTaskPrompt } from './add-task';
import { addTask } from '../service/task';
import { listTasks } from './list-tasks';
import { showProjectMenu } from './project';

describe('Add task menu', () => {

    const sampleProject: Project = {
        name: 'test',
        defaultInterval: 95,
        projectFileVersion: 1,
        short: 'tt',
        tasks: [],
    }

    beforeEach(() => {
        (inquirer.prompt as jest.Mock).mockReset();
    })

    const mockAnswer = (name: string, tags: string, estimate: string) => {
        (inquirer.prompt as jest.Mock).mockReturnValueOnce(Promise.resolve({ name, tags, estimate }));
    };

    it('creates a task and adds it to the project', async () => {
        mockAnswer('task1', 't1,    t2,   t3,  t4', "1,2,3");
        await showAddTaskPrompt(sampleProject);
        expect(addTask).toHaveBeenCalledWith(sampleProject, expect.objectContaining({
            name: 'task1',
            tags: ['t1', 't2', 't3', 't4'],
            estimate: { bestCase: 1, mostLikely: 2, worstCase: 3 },
            sequence: 1,
            code: 'tt-1'
        }));
    });

    it('displays the newly added task', async () => {
        mockAnswer('task1', 't1', "1,2,3");
        await showAddTaskPrompt(sampleProject);
        expect(listTasks).toHaveBeenCalled();
    });

    it('shows the project menu when done', async () => {
        mockAnswer('task1', 't1', "1 2 3");
        await showAddTaskPrompt(sampleProject);
        expect(showProjectMenu).toHaveBeenCalledWith(sampleProject);
    });

});