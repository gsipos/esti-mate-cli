import { Project, Task, Estimate } from "../model";
import { saveProjectToFile } from './files';

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