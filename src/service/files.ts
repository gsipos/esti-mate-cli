import fse from 'fs-extra';
import path from 'path';
import { Project } from '../model';
import stringify from 'csv-stringify';
import { parseProject } from './project.parse';

const projectJsonExt = '.project.json';

export async function getDirProjectFiles() {
    const files = await fse.readdir(process.cwd());
    return files.filter(file => file.endsWith(projectJsonExt));
}

export async function loadProjectFromFile(fileName: string) {
    const filePath = path.join(process.cwd(), fileName);
    const file = await fse.readFile(filePath);
    const result = parseProject(file.toString());
    if(result.updatedVersion) {
        saveProjectToFile(result.project);
    }
    return result.project;
}

const projectFileName = (p: Project) => `[${p.short}] ${p.name}${projectJsonExt}`;

export async function saveProjectToFile(project: Project, fileName: string = projectFileName(project)) {
    const filePath = path.join(process.cwd(), fileName);
    console.log('Saving to ', filePath);
    await fse.writeJson(filePath, project);
}

export async function saveToCSVfile(data: string, fileName: string) {
    const filePath = path.join(process.cwd(), fileName);
    console.log('Exporting to ', filePath);
    await fse.writeFile(filePath, data);
}

export function stringifyToCSV(data: any[][], header: string[]) {
    return new Promise<string>((resolve, reject) =>
        stringify(
            [header, ...data],
            (err, output) => err ? reject(err) : resolve(output)));
}