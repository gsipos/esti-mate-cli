import fse from 'fs-extra';
import path from 'path';
import { Project } from '../model';

const projectJsonExt = '.project.json';

export async function getDirProjectFiles() {
    const files = await fse.readdir(process.cwd());
    return files.filter(file => file.endsWith(projectJsonExt));
}

export async function loadProjectFromFile(fileName: string) {
    const filePath = path.join(process.cwd(), fileName);
    const file = await fse.readFile(filePath);
    const project: Project = JSON.parse(file.toString());
    return project;
}

const projectFileName = (p: Project) => `[${p.short}] ${p.name}${projectJsonExt}`;

export async function saveProjectToFile(project: Project, fileName: string = projectFileName(project)) {
    const filePath = path.join(process.cwd(), fileName);
    console.log('Saving to ', filePath);
    await fse.writeJson(filePath, project);
}