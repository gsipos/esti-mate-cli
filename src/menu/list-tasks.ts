import {
  Project,
  wheightedAverageOfEstimate,
  standardDeviationOfEstimate,
  standardErrorOfEstimate,
  Task
} from "../model";
import Table from "cli-table3";
import { commonTableStyles } from "./utils";

export function listTasks(tasks: Task[]) {
  const table = new Table({
    head: [
      "Handle",
      "Name",
      "Tags",
      "Estimate",
      "Best case",
      "Most likely",
      "Worst case",
      "Standard deviation",
      "Standard error"
    ],
    style: commonTableStyles
  });

  const rows = tasks.map(task => [
    task.code,
    task.name,
    task.tags.join(","),
    wheightedAverageOfEstimate(task.estimate).toFixed(2),
    task.estimate.bestCase,
    task.estimate.mostLikely,
    task.estimate.worstCase,
    standardDeviationOfEstimate(task.estimate).toFixed(2),
    standardErrorOfEstimate(task.estimate).toFixed(2)
  ]);

  (table as Array<any>).push(...rows);
  console.log(table.toString());
}
