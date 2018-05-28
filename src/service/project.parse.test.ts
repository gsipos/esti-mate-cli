import './project.parse';
import { Project } from '../model';
import { parseProject } from './project.parse';

describe('Project parse service', () => {
    const version0: Project = {
        name: 'project',
        defaultInterval: 95,
        projectFileVersion: 0,
        short: 'tp',
        tasks: [
            { name: 'first', code: 'TP-1', sequence: 1, tags: [], estimate: { bestCase: 4, mostLikely: 3, worstCase: 2}},
        ]
    };

    const version1: Project = {
        name: 'project',
        defaultInterval: 95,
        projectFileVersion: 1,
        short: 'tp',
        tasks: [
            { name: 'first', code: 'TP-1', sequence: 1, tags: [], estimate: { bestCase: 2, mostLikely: 3, worstCase: 4}},
        ]
    };

    it('returns a project object from a up-to-date project file content', () => 
        expect(parseProject(JSON.stringify(version1)).project).toEqual(version1));

    it('updated version flag is false if parsing an up-to-date version of a project', () => 
        expect(parseProject(JSON.stringify(version1)).updatedVersion).toBeFalsy());
    
    it('updates version 0 project to version 1, fixes bestCase and worstCase values', () => 
        expect(parseProject(JSON.stringify(version0)).project).toEqual(version1));

    it('updating a version 0 project to version 1 sets the updatedVersion flag to true', () => 
        expect(parseProject(JSON.stringify(version0)).updatedVersion).toBeTruthy());
});