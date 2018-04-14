import {
  Project,
  wheightedAverageOfEstimate,
  standardDeviationOfEstimate,
  standardErrorOfEstimate,
  tagsOf,
  wheightedAverageOfTasks,
  standardErrorOTasks
} from "../model";
import Table from "cli-table2";

export function listTags(project: Project) {
  const tags = tagsOf(project).sort();
  const tasksOfTag = (tag: string) =>
    project.tasks.filter(t => t.tags.includes(tag));

  const table = new Table({
    head: ["Tag", "Estimate", "Standard error"]
  });

  const rows = tags.map(tag => {
    const tasks = tasksOfTag(tag);
    return [
      tag,
      wheightedAverageOfTasks(tasks).toFixed(2),
      standardErrorOTasks(tasks).toFixed(2)
    ];
  });
  (table as Array<any>).push(...rows);
  console.log(table.toString());
}
