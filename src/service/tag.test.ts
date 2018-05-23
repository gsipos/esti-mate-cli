import './tag';

describe('Tag service', () => {
    it('tagsOf return the list of unique tags of a project');
    it('tasksOfTag returns the list of tasks that have a specific tag');
    it('tagToInfoArray return an array of values to be displayed as a table, or be exported as csv');
    it('exportTagsToCSV export tag summary to csv file');
});