jest.mock('inquirer');
jest.mock('../service/files');
jest.mock('./project');
jest.mock('./utils');

import inquirer from 'inquirer';
import { saveProjectToFile } from '../service/files';
import { CURRENT_PROJECT_VERSION } from '../service/project.parse';
import { showProjectMenu } from './project';
import { createProjectMenu } from './create-project';


describe('Create Project menu', () => {

    it('creates a project from the answer', async () => {
        (inquirer.prompt as jest.Mock).mockReturnValueOnce(Promise.resolve({
            name: 'my awesome project',
            short: 'MAP',
            defaultInterval: { value: 95 },
        }))

        await createProjectMenu();

        expect(saveProjectToFile).toHaveBeenCalledWith(expect.objectContaining({
            name: 'my awesome project',
            short: 'MAP',
            defaultInterval: 95,
            projectFileVersion: CURRENT_PROJECT_VERSION,
            tasks: [],
        }));
        expect(showProjectMenu).toHaveBeenCalled();
    });

});