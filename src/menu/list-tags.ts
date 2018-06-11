import {
  Project,
  wheightedAverageOfEstimate,
  standardDeviationOfEstimate,
  standardErrorOfEstimate,
  wheightedAverageOfTasks,
  standardErrorOTasks
} from "../model";
import Table from "cli-table3";
import { tagsOf, tagToInfoArray } from "../service/tag";
import { commonTableStyles } from "./utils";

export function listTags(project: Project) {
  const tags = tagsOf(project).sort();

  const table = new Table({
    head: ["Tag", "Estimate", "Best case", "Most likely", "Worst case", "Standard error"],
    style: commonTableStyles
  });

  const rows = tags.map(tag => tagToInfoArray(tag, project));
  (table as Array<any>).push(...rows);
  console.log(table.toString());
}
