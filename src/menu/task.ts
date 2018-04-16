import { Project, Task } from "../model";
import inquirer from "inquirer";
import { internals } from "rx";
import { estimateFromString } from "./add-task";
import { listTasks } from "./list-tasks";

const choices = [
  "Change task name",
  "Change estimation",
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
  listTasks([task]);
  const answer = await inquirer.prompt(taskMenu);
  const idx = choices.indexOf(answer.name);
  if (idx === 0) {
    await changeTaskName(task);
    await showTaskMenu(project, task);
  }
  if (idx === 1) {
    await changeTaskEstimation(task);
    await showTaskMenu(project, task);
  }
  if (idx === 2) {
    const deleted = await deleteTask(task, project);
    if (!deleted) {
      await showTaskMenu(project, task);
    }
  }
  if (idx === 3) {
    return;
  }
}

async function changeTaskName(task: Task) {
  const answer = await inquirer.prompt<{ name: string }>({
    type: "input",
    name: "name",
    message: "New task name:",
    default: task.name
  });
  task.name = answer.name;
}

async function changeTaskEstimation(task: Task) {
  const answer = await inquirer.prompt<{ estimate: string }>({
    type: "input",
    name: "estimate",
    message: "New estimation:"
  });
  task.estimate = estimateFromString(answer.estimate);
}

async function deleteTask(task: Task, project: Project) {
  const answer = await inquirer.prompt<{ confirm: boolean }>({
    type: "confirm",
    name: "confirm",
    message: "Are you sure you want to delete " + task.name + "?"
  });
  if (answer.confirm) {
    project.tasks.splice(project.tasks.indexOf(task), 1);
    return true;
  } else {
    return false;
  }
}
