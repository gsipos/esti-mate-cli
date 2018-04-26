import inquirer from "inquirer";
import { Project, confidenceIntervals } from "../model";
import { showProjectMenu } from "./project";
import { addMenuSeparator } from "./utils";
import { saveProjectToFile } from "../service/files";

interface ProjectInit {
    name: string;
    short: string;
    defaultInterval: inquirer.objects.ChoiceOption;
}

function suggestDefaultShortHandle(answers: ProjectInit) {
    return answers.name
      .split(" ")
      .map(w => w.charAt(0))
      .slice(0, 3)
      .join('')
      .toUpperCase();
}

const createProject: inquirer.Question<ProjectInit>[] = [
    {
        type: 'input',
        message: 'Project name?',
        name: 'name'
    },
    {
        type: 'input',
        message: 'Short handler?',
        name: 'short',
        default: suggestDefaultShortHandle
    },
    {
        type: 'list',
        message: 'Confidence Interval?',
        name: 'defaultInterval',
        choices: confidenceIntervals.map(i => ({ name: ''+i, value:i})),
        default: 2
    }
];

export async function createProjectMenu() {
    addMenuSeparator();
    const { name, short, defaultInterval } = await inquirer.prompt(createProject);
    const project: Project = {
        name,
        short,
        defaultInterval: defaultInterval.value,
        tasks: []
    }
    saveProjectToFile(project);
    showProjectMenu(project);
}