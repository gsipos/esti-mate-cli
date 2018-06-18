import inquirer from "inquirer";
import {
  Project,
  wheightedAverageOfTasks,
  confidenceIntervalOfTasks
} from "../model";
import { showAddTaskPrompt } from "./add-task";
import { listTasks } from "./list-tasks";
import Table from "cli-table2";
import { listTags } from "./list-tags";
import { chooseProjectMenu } from "./choose-project";
import { chooseTask } from "./choose-task";
import { addMenuSeparator, commonTableStyles } from "./utils";
import { exportTasksToCSV } from "../service/task";
import { exportTagsToCSV } from "../service/tag";

export enum ProjectMenuEntry {
  ADD_TASK = "Add task",
  SHOW_PROJECT_SUMMARY = "Show project summary",
  SHOW_TASKS = "Show tasks",
  SHOW_TAGS = "Show Tags",
  MODIFY_TASK = "Modify task",
  EXPORT_TASKS_TO_CSV = "Export tasks to CSV",
  EXPORT_TAGS_TO_CSV = "Export tags to CSV",
  SELECT_PROJECT = "Select project"
}

const choices = [
  ProjectMenuEntry.ADD_TASK,
  ProjectMenuEntry.SHOW_PROJECT_SUMMARY,
  ProjectMenuEntry.SHOW_TASKS,
  ProjectMenuEntry.SHOW_TAGS,
  ProjectMenuEntry.MODIFY_TASK,
  ProjectMenuEntry.EXPORT_TASKS_TO_CSV,
  ProjectMenuEntry.EXPORT_TAGS_TO_CSV,
  ProjectMenuEntry.SELECT_PROJECT
];

const ProjectMenu: inquirer.Question = {
  type: "list",
  name: "selected",
  message: "What to do next?",
  choices,
  pageSize: choices.length
};

export function displayProjectInfo(project: Project) {
  const interval = confidenceIntervalOfTasks(
    project.tasks,
    project.defaultInterval
  );
  const table = new Table({
    style: commonTableStyles
  });
  const entries = [
    { "Short handle:": project.short },
    { "Name:": project.name },
    { "Task count:": project.tasks.length },
    { "Estimation:": wheightedAverageOfTasks(project.tasks).toFixed(2) },
    { "Confidence Interval:": interval.min.toFixed(2) + " - " + interval.max.toFixed(2) }
  ];
  (table as Array<any>).push(...entries);
  console.log(table.toString());
}

function executeOnChoice(
  entry: ProjectMenuEntry,
  answers: any,
  handler: Function
) {
  if (entry === answers.selected) {
    handler();
  }
}

export async function showProjectMenu(project: Project) {
  addMenuSeparator();
  const answer = await inquirer.prompt(ProjectMenu);

  executeOnChoice(ProjectMenuEntry.SHOW_PROJECT_SUMMARY, answer, () => {
    displayProjectInfo(project);
    showProjectMenu(project);
  });
  executeOnChoice(ProjectMenuEntry.ADD_TASK, answer, () =>
    showAddTaskPrompt(project)
  );
  executeOnChoice(ProjectMenuEntry.SHOW_TASKS, answer, () => {
    listTasks(project.tasks);
    showProjectMenu(project);
  });
  executeOnChoice(ProjectMenuEntry.SHOW_TAGS, answer, () => {
    listTags(project);
    showProjectMenu(project);
  });
  executeOnChoice(ProjectMenuEntry.SELECT_PROJECT, answer, () =>
    chooseProjectMenu()
  );
  executeOnChoice(ProjectMenuEntry.MODIFY_TASK, answer, async () => {
    await chooseTask(project);
    showProjectMenu(project);
  });
  executeOnChoice(ProjectMenuEntry.EXPORT_TASKS_TO_CSV, answer, async () => {
    await exportTasksToCSV(project);
    showProjectMenu(project);
  });
  executeOnChoice(ProjectMenuEntry.EXPORT_TAGS_TO_CSV, answer, async () => {
    await exportTagsToCSV(project);
    showProjectMenu(project);
  });
}
