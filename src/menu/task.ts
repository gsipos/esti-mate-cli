import { Project, Task } from "../model";
import inquirer from "inquirer";
import { estimateFromString } from "./add-task";
import { listTasks } from "./list-tasks";
import { addMenuSeparator } from "./utils";
import { changeTaskName, changeTaskEstimation, changeTaskTags, deleteTask } from '../service/task';

const choices = [
  "Change task name",
  "Change estimation",
  "Change tags",
  "Delete task",
  "Back to project"
];

const taskMenu: inquirer.Question = {
  type: "list",
  name: "name",
  message: "What to do?",
  choices
};

export async function showTaskMenu(project: Project, task: Task) {
  addMenuSeparator();
  listTasks([task]);
  const answer = await inquirer.prompt(taskMenu);
  const idx = choices.indexOf(answer.name);
  if (idx === 0) {
    await changeTaskNameMenu(task, project);
    await showTaskMenu(project, task);
  }
  if (idx === 1) {
    await changeTaskEstimationMenu(task, project);
    await showTaskMenu(project, task);
  }
  if (idx === 2) {
    await changeTaskTagsMenu(task, project);
    await showTaskMenu(project, task);
  }
  if (idx === 3) {
    const deleted = await deleteTaskMenu(task, project);
    if (!deleted) {
      await showTaskMenu(project, task);
    }
  }
  if (idx === 4) {
    return;
  }
}

async function changeTaskNameMenu(task: Task, project: Project) {
  const answer = await inquirer.prompt<{ name: string }>({
    type: "input",
    name: "name",
    message: "New task name:",
    default: task.name
  });
  task.name = answer.name;
  changeTaskName(project, task, answer.name);
}

async function changeTaskEstimationMenu(task: Task, project: Project) {
  const answer = await inquirer.prompt<{ estimate: string }>({
    type: "input",
    name: "estimate",
    message: "New estimation:"
  });
  changeTaskEstimation(project, task, estimateFromString(answer.estimate));
}

async function changeTaskTagsMenu(task: Task, project: Project) {
  const answer = await inquirer.prompt<{ tags: string }>({
    type: "input",
    name: "tags",
    message: "New tags:"
  });
  changeTaskTags(project, task, answer.tags.split(','));
}

async function deleteTaskMenu(task: Task, project: Project) {
  const answer = await inquirer.prompt<{ confirm: boolean }>({
    type: "confirm",
    name: "confirm",
    message: "Are you sure you want to delete " + task.name + "?"
  });
  if (answer.confirm) {
    deleteTask(project, task);
    return true;
  } else {
    return false;
  }
}
