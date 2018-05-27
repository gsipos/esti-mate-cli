import { Project } from "../model";

export const CURRENT_PROJECT_VERSION = 1;

type ProjectVersionTransformer = (p: Project) => Project

/**
 * Fixes mismatched bestCase and worstCase estimations
 * @param p project version 0
 */
function toVersion1(p: Project) {
    if(p.projectFileVersion >= 1) {
        return p;
    }
    const result: Project = {
        ...p,
        projectFileVersion: 1,
        tasks: p.tasks.map(t => ({ 
            ...t,
            estimate: {
                bestCase: t.estimate.worstCase,
                mostLikely: t.estimate.mostLikely,
                worstCase: t.estimate.bestCase
            },
        }))
    };
    return result;
}

const projectVersionUpdater: Function[] = [
    toVersion1
];

export interface ProjectParseResult {
    project: Project;
    updatedVersion: boolean;
}

export function parseProject(projectString: string): ProjectParseResult {
    const obj: Project = JSON.parse(projectString);
    if(!obj.projectFileVersion) {
        obj.projectFileVersion = 0;
    }

    const project = projectVersionUpdater
        .reduce((project, update) => update(project), obj);

    return {
        project,
        updatedVersion: obj.projectFileVersion !== project.projectFileVersion
    };
}
