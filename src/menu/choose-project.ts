import inquirer from "inquirer";
import { createProjectMenu } from "./create-project";
import { getDirProjectFiles, loadProjectFromFile } from "../service/files";
import { showProjectMenu } from "./project";

const mainMenu: inquirer.Question<{ mainMenuChoice: string }> = {
  type: "list",
  name: "mainMenuChoice",
  message: "What project to work on?",
};

export async function chooseProjectMenu() {
  const projectFiles = await getDirProjectFiles();

  if (projectFiles.length === 0) {
    createProjectMenu();
    return;
  }

  const choices = ["Create new", ...projectFiles];
  const answer = await inquirer.prompt({
    ...mainMenu,
    choices
  });
  if (answer.mainMenuChoice === "Create new") {
    createProjectMenu();
  } else {
    const project = await loadProjectFromFile(answer.mainMenuChoice);
    showProjectMenu(project);
  }
}
