import './task';

jest.mock('./files');
import { saveProjectToFile, stringifyToCSV, saveToCSVfile } from './files';
import { changeTaskName, changeTaskEstimation, changeTaskTags, deleteTask, addTask, exportTasksToCSV } from './task';
import { Project, Task, Estimate } from '../model';

describe('Task service', () => {
    const sampleTask: Task = {
        name: 'task 1',
        code: 'T-1',
        sequence: 1,
        estimate: {
            bestCase: 1,
            mostLikely: 2,
            worstCase: 3,
        },
        tags: ['tag1', 'tag2'],
    }

    const sampleProject: Project = {
        name: 'asd',
        defaultInterval: 95,
        projectFileVersion: 1,
        short: 'asd',
        tasks: [
            sampleTask
        ]
    };

    it('changeTaskName modifies the task name and saves the project', () => {
        changeTaskName(sampleProject, sampleTask, 'newName');
        expect(sampleTask.name).toBe('newName');
        expect(saveProjectToFile).toHaveBeenCalledWith(sampleProject);
    });

    it('changeTaskEstimation changes the estimation and saves the project', () => {
        const newEstimation: Estimate = { bestCase: 3, mostLikely: 4, worstCase: 5 };
        changeTaskEstimation(sampleProject, sampleTask, newEstimation);
        expect(sampleTask.estimate).toBe(newEstimation);
        expect(saveProjectToFile).toHaveBeenCalledWith(sampleProject);
    });

    it('changeTaskTags modifies the tags and saves the project', () => {
        const newTags = ['a', 'b'];
        changeTaskTags(sampleProject, sampleTask, newTags);
        expect(sampleTask.tags).toBe(newTags);
        expect(saveProjectToFile).toHaveBeenCalledWith(sampleProject);
    });

    it('deleteTask deletes a task and saves the project', () => {
        deleteTask(sampleProject, sampleTask);
        expect(sampleProject.tasks).toHaveLength(0);
        expect(saveProjectToFile).toHaveBeenCalledWith(sampleProject);
    });

    it('addTask adds a task and saves the project', () => {
        addTask(sampleProject, sampleTask);
        expect(sampleProject.tasks).toHaveLength(1);
        expect(saveProjectToFile).toHaveBeenCalledWith(sampleProject);
    });

    it('exportTasksToCSV saves the tasks as a csv file', async () => {
        const csvString = 'csvString';
        (stringifyToCSV as jest.Mock).mockReturnValueOnce(csvString);
        (saveToCSVfile as jest.Mock).mockReturnValueOnce(Promise.resolve(true));
        await exportTasksToCSV(sampleProject);
        expect(stringifyToCSV).toHaveBeenCalled();
        expect(saveToCSVfile).toHaveBeenCalledWith(csvString, expect.stringContaining('.csv'));
    });
});