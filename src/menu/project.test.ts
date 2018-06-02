jest.mock('inquirer');
jest.mock('./add-task');
jest.mock('./list-tasks');
jest.mock('./list-tags');
jest.mock('./choose-project');
jest.mock('./choose-task');
jest.mock('../service/task');
jest.mock('../service/tag');

import inquirer from 'inquirer';
import { ProjectMenuEntry, showProjectMenu, displayProjectInfo } from './project';
import { Project } from '../model';
import { showAddTaskPrompt } from './add-task';
import { listTasks } from './list-tasks';
import { listTags } from './list-tags';
import { chooseProjectMenu } from './choose-project';
import { chooseTask } from './choose-task';
import { exportTasksToCSV } from '../service/task';
import { exportTagsToCSV } from '../service/tag';


describe('Project menu', () => {

    const project = { name: 'test', tasks: [] } as any as Project;

    const mockAnswer = (selected: ProjectMenuEntry) => {
        (inquirer.prompt as jest.Mock).mockReset();
        (inquirer.prompt as jest.Mock).mockReturnValueOnce(Promise.resolve({ selected }));
    }

    xit('Show project summary shows project info', async () => {
        mockAnswer(ProjectMenuEntry.SHOW_PROJECT_SUMMARY);
        await showProjectMenu(project);
        // TODO
    });

    it('Add task menu', async () => {
        mockAnswer(ProjectMenuEntry.ADD_TASK);
        await showProjectMenu(project);
        expect(showAddTaskPrompt).toHaveBeenCalledWith(project);
    });

    it('List task menu', async () => {
        mockAnswer(ProjectMenuEntry.SHOW_TASKS);
        await showProjectMenu(project);
        expect(listTasks).toHaveBeenCalledWith(project.tasks);
    });

    it('List task menu', async () => {
        mockAnswer(ProjectMenuEntry.SHOW_TAGS);
        await showProjectMenu(project);
        expect(listTags).toHaveBeenCalledWith(project);
    });

    it('Choose project menu', async () => {
        mockAnswer(ProjectMenuEntry.SELECT_PROJECT);
        await showProjectMenu(project);
        expect(chooseProjectMenu).toHaveBeenCalled();
    });

    it('Modify task menu', async () => {
        mockAnswer(ProjectMenuEntry.MODIFY_TASK);
        await showProjectMenu(project);
        expect(chooseTask).toHaveBeenCalledWith(project);
    });

    it('Export tasks to CSV menu', async () => {
        mockAnswer(ProjectMenuEntry.EXPORT_TASKS_TO_CSV);
        await showProjectMenu(project);
        expect(exportTasksToCSV).toHaveBeenCalledWith(project);
    });

    it('Export tags to CSV menu', async () => {
        mockAnswer(ProjectMenuEntry.EXPORT_TAGS_TO_CSV);
        await showProjectMenu(project);
        expect(exportTagsToCSV).toHaveBeenCalledWith(project);
    });
});