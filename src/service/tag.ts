import { Project, wheightedAverageOfTasks, standardErrorOTasks } from "../model";
import { stringifyToCSV, saveToCSVfile } from "./files";

export function tagsOf(p: Project) {
    const tagSet: Set<string> = new Set();
    p.tasks.forEach(task => task.tags.forEach(tag => tagSet.add(tag)));
    return [...tagSet];
}

export const tasksOfTag = (tag: string, project: Project) =>
    project.tasks.filter(t => t.tags.includes(tag));

export function tagToInfoArray(tag: string, project: Project) {
    const tasks = tasksOfTag(tag, project);
    return [
        tag,
        wheightedAverageOfTasks(tasks).toFixed(2),
        tasks.reduce((acc, t) => acc + t.estimate.bestCase, 0),
        tasks.reduce((acc, t) => acc + t.estimate.mostLikely, 0),
        tasks.reduce((acc, t) => acc + t.estimate.worstCase, 0),
        standardErrorOTasks(tasks).toFixed(2)
      ];
}

export async function exportTagsToCSV(project: Project) {
    const fileName = `[${project.short}] ${project.name}.tags.csv`;
    const tagData = tagsOf(project)
        .sort()
        .map(t => tagToInfoArray(t, project));
    const header = ['Tag', 'Estimate', 'Best case', 'Most likely', 'Worst case', 'Standard error'];
    const csvString = await stringifyToCSV(tagData, header);
    await saveToCSVfile(csvString, fileName);
}