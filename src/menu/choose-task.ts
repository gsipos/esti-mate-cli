import { Project } from "../model";
import inquirer from "inquirer";
import { showTaskMenu } from "./task";

const chooseTaskMenu: inquirer.Question = {
    type: 'list',
    name: 'task',
    message: 'Which task?'
};

export async function chooseTask(project: Project) {
    const choices = project.tasks.map(t => ({
        name: t.code + ' ' + t.name,
        value: t
    }));
    const answer = await inquirer.prompt({
        ...chooseTaskMenu,
        choices
    });
    const task = answer.task;
    await showTaskMenu(project, task);
}