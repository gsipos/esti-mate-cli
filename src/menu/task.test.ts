jest.mock('inquirer');
jest.mock('../service/task');
jest.mock('./list-tasks');
jest.mock('./utils');

import { Task, Project } from "../model";
import inquirer from 'inquirer';
import { showTaskMenu } from "./task";
import { changeTaskName, changeTaskEstimation, changeTaskTags, deleteTask } from "../service/task";

describe('Modify task menu', () => {

    const task: Task = {
        name: 'test task',
        code: 'tt-1',
        estimate: {
            bestCase: 1,
            mostLikely: 2,
            worstCase: 3,
        },
        sequence: 1,
        tags: ['t1'],
    };

    const project: Project = {
        name: 'test',
        defaultInterval: 95,
        projectFileVersion: 1,
        short: 'tt',
        tasks: [
            task,
        ],
    };

    beforeEach(() => {
        (inquirer.prompt as jest.Mock).mockReset();
        (inquirer.prompt as jest.Mock).mockReturnValue(Promise.resolve({
            name: 'Back to project'
        }));
        (deleteTask as jest.Mock).mockReset();
    });

    const addAnswer = (answer: any) =>
        (inquirer.prompt as jest.Mock).mockReturnValueOnce(Promise.resolve(answer));

    it('Changes the task name', async () => {
        const newName = 'another task name';
        addAnswer({ name: "Change task name" });
        addAnswer({ name: newName });

        await showTaskMenu(project, task);

        expect(changeTaskName).toHaveBeenCalledWith(project, task, newName);
    });

    it('Changes the task estimate', async () => {
        addAnswer({ name: "Change estimation" });
        addAnswer({ estimate: '5,6,7' });

        await showTaskMenu(project, task);

        expect(changeTaskEstimation).toHaveBeenCalledWith(project, task, {
            bestCase: 5,
            mostLikely: 6,
            worstCase: 7,
        });
    });

    it('Changes the task tags', async () => {
        const newTags = 't1, t2   , t3';
        addAnswer({ name: "Change tags" });
        addAnswer({ tags: newTags });

        await showTaskMenu(project, task);

        expect(changeTaskTags).toHaveBeenCalledWith(project, task, ['t1','t2','t3']);
    });

    it('Confirmed delete task', async () => {
        addAnswer({ name: "Delete task" });
        addAnswer({ confirm: true });

        await showTaskMenu(project, task);

        expect(deleteTask).toHaveBeenCalledWith(project, task);
    });

    it('Confirmed delete task', async () => {
        addAnswer({ name: "Delete task" });
        addAnswer({ confirm: false });

        await showTaskMenu(project, task);

        expect(deleteTask).not.toHaveBeenCalled();
    });
});