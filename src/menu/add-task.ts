import inquirer from "inquirer";
import { Project, Task } from "../model";
import { showProjectMenu } from "./project";
import { listTasks } from "./list-tasks";

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
    message: "Estimate(best case, most likely, worst case)?"
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
  const estimates = estimate.split(" ").map(e => Number(e));
  const task: Task = {
    sequence,
    code: generateCode(project.short, sequence),
    name,
    tags: tags.split(",").map(t => t.trim()),
    estimate: {
      bestCase: estimates[0],
      mostLikely: estimates[1],
      worstCase: estimates[2]
    }
  };
  project.tasks.push(task);
  listTasks([task]);
  showProjectMenu(project);
}
