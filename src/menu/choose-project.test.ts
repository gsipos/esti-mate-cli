jest.mock('inquirer');
jest.mock('../service/files.ts');
jest.mock('./create-project');
jest.mock('./project');

import { getDirProjectFiles, loadProjectFromFile } from "../service/files";
import { chooseProjectMenu } from "./choose-project";
import { createProjectMenu } from "./create-project";
import { showProjectMenu } from "./project";
import inquirer from "inquirer";


describe('Choose project menu', () => {

    beforeEach(() => {
        (getDirProjectFiles as jest.Mock).mockReturnValueOnce(Promise.resolve([]));
    });

    it('looks at the project files, and jumps to create project menu if none is present', async () => {
        await chooseProjectMenu();
        expect(getDirProjectFiles).toHaveBeenCalled();
        expect(createProjectMenu).toHaveBeenCalled();
        expect(showProjectMenu).not.toHaveBeenCalled();
    });

    describe('when there is a project file in the directory', () => {
        beforeEach(() => {
            (getDirProjectFiles as jest.Mock).mockReset();
            (getDirProjectFiles as jest.Mock).mockReturnValue(Promise.resolve(['a', 'b']));
        });

        afterEach(() => {
            (getDirProjectFiles as jest.Mock).mockReset();
            (createProjectMenu as jest.Mock).mockReset();
        });

        const mockMenuSelection = (answer: string) => {
            (inquirer.prompt as jest.Mock).mockReset();
            (inquirer.prompt as jest.Mock)
                .mockReturnValueOnce(Promise.resolve({ mainMenuChoice: answer }))
        };

        it('shows the project files', async () => {
            mockMenuSelection('Create new');
            await chooseProjectMenu();
            expect(getDirProjectFiles).toHaveBeenCalled();
            expect(inquirer.prompt).toHaveBeenCalledWith(expect.objectContaining({
                choices: ['Create new', 'a', 'b']
            }));
        });

        it('moves to the create project menu, if the user chooses it', async () => {
            mockMenuSelection("Create new");
            await chooseProjectMenu();
            expect(createProjectMenu).toHaveBeenCalled();
            expect(showProjectMenu).not.toHaveBeenCalled();
        });

        it('when the user selects a project, it is loaded from a file, then the project menu is showed', async () => {
            mockMenuSelection('a');
            const project = { name: 'sample' };
            (loadProjectFromFile as jest.Mock).mockReturnValueOnce(Promise.resolve(project));
            await chooseProjectMenu();
            expect(loadProjectFromFile).toHaveBeenCalledWith('a');
            expect(showProjectMenu).toHaveBeenCalledWith(project);
            expect(createProjectMenu).not.toHaveBeenCalled();
        });
    });

});