import './files';
import { Project } from '../model';
import fse, { write } from 'fs-extra';
import stringify from 'csv-stringify';
jest.mock('./project.parse');
import { parseProject } from './project.parse';
import { getDirProjectFiles, stringifyToCSV, saveToCSVfile, saveProjectToFile, loadProjectFromFile } from './files';

describe('Files service', () => {
    const readdirMock = jest.fn();
    fse.readdir = readdirMock as any;
    const writeJson = jest.fn();
    fse.writeJson = writeJson;

    const sampleProject: Project = {
        name: 'test',
        tasks: [],
        defaultInterval: 95,
        projectFileVersion: 1,
        short: 'ttt'
    };

    it('getDirProjectFiles returns the available projects based on the jsons in the working directory', async () => {
        readdirMock.mockReturnValueOnce([
            'notprojectfile.txt',
            'project1.project.json',
        ]);
        expect(await getDirProjectFiles()).toEqual(['project1.project.json']);
    });

    it('getDirProjectFiles return empty array if no project files are present', async () => {
        readdirMock.mockReturnValueOnce(['asd.txt']);
        expect(await getDirProjectFiles()).toEqual([]);
    });

    it('loadProjectFromFile loads the project from the given filename', async () => {
        const readFile = jest.fn();
        readFile.mockReturnValueOnce(Promise.resolve(Buffer.from(JSON.stringify(sampleProject))));
        (parseProject as jest.Mock).mockReturnValueOnce({ project: sampleProject, updatedVersion: false });
        fse.readFile = readFile;
        const file = "pr.project.json";
        const result = await loadProjectFromFile(file);
        expect(parseProject).toHaveBeenCalled();
        expect(writeJson).not.toHaveBeenCalled();
        expect(readFile).toHaveBeenCalledWith(expect.stringContaining(file));
        expect(result).toEqual(sampleProject);
    });

    it('loadProjectFromFile saves the project immediately if it has been updated during parsing', async () => {
        const readFile = jest.fn();
        readFile.mockReturnValueOnce(Promise.resolve(Buffer.from(JSON.stringify(sampleProject))));
        (parseProject as jest.Mock).mockReturnValueOnce({ project: sampleProject, updatedVersion: true });
        fse.readFile = readFile;
        const file = "pr.project.json";
        const result = await loadProjectFromFile(file);
        expect(parseProject).toHaveBeenCalled();
        expect(writeJson).toHaveBeenCalledWith(expect.anything(), sampleProject);
        expect(readFile).toHaveBeenCalledWith(expect.stringContaining(file));
        expect(result).toEqual(sampleProject);
    });

    it('saveProjectToFile saves the project object to a project json', async () => {
        writeJson.mockReturnValueOnce(Promise.resolve(true));
        await saveProjectToFile(sampleProject);
        expect(writeJson).toHaveBeenCalledWith(expect.anything(), sampleProject);
    });

    it('saveToCSVFile saves the given data string to the given csv file', async () => {
        const data = 'data';
        const fileName = 'filename.txt';
        const writeFile = jest.fn();
        fse.writeFile = writeFile;
        writeFile.mockReturnValueOnce(Promise.resolve(true));
        await saveToCSVfile(data, fileName);
        expect(writeFile).toHaveBeenCalledWith(expect.anything(), data);
    });

    it('stringifyToCSV transforms an array of array into a csv string', async () => {
        const data = [[1, 2], [3, 4]];
        const header = ['a', 'b'];
        const expected = 'a,b\n1,2\n3,4\n';
        const result = await stringifyToCSV(data, header);
        expect(result).toEqual(expected);
    });
});