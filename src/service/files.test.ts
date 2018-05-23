import './files';

describe('Files service', () => {
    it('getDirProjectFiles returns the available projects based on the jsons in the working directory');
    it('loadProjectFromFile loads the project from the given filename');
    it('saveProjectToFile saves the project object to a project json');
    it('saveToCSVFile saves the given data string to the given csv file');
    it('stringifyToCSV transforms an array of array into a csv string');
});