import inquirer from "inquirer";
import { Project, wheightedAverageOfTasks, confidenceIntervalOfProject } from "../model";
import { showAddTaskPrompt } from "./add-task";
import { listTasks } from "./list-tasks";
import Table from "cli-table2";
import { listTags } from "./list-tags";
import { saveProjectToFile } from "../files";
import { chooseProjectMenu } from "./choose-project";

const choices = [
    'Add task',
    'Show tasks',
    'Show tags',
    'Save',
    'Select project'
]

const ProjectMenu: inquirer.Question = {
    type: 'list',
    name: 'selected',
    message: 'What to do next?',
    choices
};

const separator = '------------------------------------------';

function displayProjectInfo(project: Project) {
    const interval = confidenceIntervalOfProject(project, project.defaultInterval);
    const table = new Table();
    const entries = [
        { 'Short handle:': project.short },
        { 'Name:': project.name },
        { 'Task count:': project.tasks.length },
        { 'Estimation:': wheightedAverageOfTasks(project.tasks).toFixed(2) },
        { 'Confidence Interval:': interval.min + ' - ' + interval.max },
    ];
    (table as Array<any>).push(...entries);
    console.log(table.toString());
}

export async function showProjectMenu(project: Project) {
    displayProjectInfo(project);
    const answer = await inquirer.prompt(ProjectMenu);
    if (answer.selected === 'Add task') {
        showAddTaskPrompt(project);
    }
    if (answer.selected === 'Show tasks') {
        listTasks(project.tasks);
        showProjectMenu(project);
    }
    if (answer.selected === 'Show tags') {
        listTags(project);
        showProjectMenu(project);
    }
    if (answer.selected === 'Save') {
        saveProjectToFile(project);
        showProjectMenu(project);
    }
    if (answer.selected === 'Select project') {
        chooseProjectMenu();
    }
}