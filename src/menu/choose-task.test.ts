import { Project, Task } from "../model";
jest.mock('./task');
jest.mock('inquirer');
import { showTaskMenu } from "./task";
import { chooseTask } from "./choose-task";
import inquirer from "inquirer";

describe('Choose task menu', () => {
    const project: Partial<Project> = {
        tasks: [
            { name: 'task1', code: '1' } as any as Task,
            { name: 'task2', code: '2' } as any as Task,
        ]
    };

    it('when the user chooses a task, then task menu is shown', async () => {
        const task = (project as Project).tasks[0];
        (inquirer.prompt as jest.Mock).mockReturnValue(Promise.resolve({ task }));
        await chooseTask(project as Project);
        expect(inquirer.prompt).toHaveBeenCalled();
        expect(showTaskMenu).toHaveBeenCalledWith(project, task);
    });
});