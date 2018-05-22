import { Project, Task, Estimate, wheightedAverageOfEstimate } from "../model";
import { saveProjectToFile, saveToCSVfile, stringifyToCSV } from './files';

export function changeTaskName(project: Project, task: Task, newName: string) {
    task.name = newName;
    saveProjectToFile(project);
}

export function changeTaskEstimation(project: Project, task: Task, newEstimate: Estimate) {
    task.estimate = newEstimate;
    saveProjectToFile(project);
}

export function changeTaskTags(project: Project, task: Task, newTags: string[]) {
    task.tags = newTags;
    saveProjectToFile(project);
}

export function deleteTask(project: Project, task: Task) {
    project.tasks.splice(project.tasks.indexOf(task), 1);
    saveProjectToFile(project);
}

export function addTask(project: Project, task: Task) {
    project.tasks.push(task);
    saveProjectToFile(project);
}

const taskToArray = (t: Task) => [
    t.code,
    t.name,
    t.tags.join(', '),
    wheightedAverageOfEstimate(t.estimate).toFixed(2),
    t.estimate.bestCase,
    t.estimate.mostLikely,
    t.estimate.worstCase
];

export async function exportTasksToCSV(project: Project) {
    const fileName = `[${project.short}] ${project.name}.tasks.csv`;
    const header = ['Code', 'Name', 'Tags', 'Estimate', 'Best case', 'Most likely', 'Worst case'];
    const csvString = await stringifyToCSV(project.tasks.map(taskToArray), header);
    await saveToCSVfile(csvString, fileName);
}