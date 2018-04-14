import inquirer from "inquirer";
import { createProjectMenu } from "./create-project";
import { getDirProjectFiles, loadProjectFromFile } from "../files";
import { showProjectMenu } from "./project";

const mainMenuHandlers: { [key: string]: Function } = {
  "Create new": () => createProjectMenu(),
  "Load from JSON": () => {
    console.log("Sorry not implemented yet!");
    chooseProjectMenu();
  }
};

const mainMenu: inquirer.Question<{ mainMenuChoice: string }> = {
  type: "list",
  name: "mainMenuChoice",
  message: "What project to work on?",
  choices: Object.keys(mainMenuHandlers)
};

export async function chooseProjectMenu() {
  const projectFiles = await getDirProjectFiles();
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
