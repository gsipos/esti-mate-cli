import inquirer from "inquirer";
import { Project, Task, Estimate } from "../model";
import { showProjectMenu } from "./project";
import { listTasks } from "./list-tasks";
import { addTask } from "../service/task";
import { validateEstimateString, parseEstimateString } from "./validators/estimate";

function generateNextSequence(project: Project) {
  const max = project.tasks.reduce(
    (max, task) => (task.sequence > max ? task.sequence : max),
    0
  );
  return max + 1;
}

const generateCode = (short: string, sequence: number) =>
  short + "-" + sequence;

interface TaskInit {
  name: string;
  estimate: string;
  tags: string;
}

const addTaskPrompt: inquirer.Questions<TaskInit> = [
  {
    type: "input",
    name: "name",
    message: "Task name?"
  },
  {
    type: "input",
    name: "estimate",
    message: "Estimate(best case, most likely, worst case)?",
    validate: validateEstimateString
  },
  {
    type: "input",
    name: "tags",
    message: "Tags(comma separated)?"
  }
];

export async function showAddTaskPrompt(project: Project) {
  const { name, tags, estimate } = await inquirer.prompt(addTaskPrompt);
  const sequence = generateNextSequence(project);
  const task: Task = {
    sequence,
    code: generateCode(project.short, sequence),
    name,
    tags: tags.split(",").map(t => t.trim()),
    estimate: parseEstimateString(estimate)
  };
  addTask(project, task)
  listTasks([task]);
  showProjectMenu(project);
}
