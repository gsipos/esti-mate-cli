import { Task } from "../model";
import { listTasks } from "./list-tasks";

describe('List tasks', () => {
    console.log = jest.fn();

    const tasks: Task[] = [
        {
            name: 'task1',
            code: 'tt-1',
            sequence: 1,
            tags: ['t1', 't2'],
            estimate: { bestCase: 1, mostLikely: 2, worstCase: 3},
        }
    ];

    it('shows the taks data', () => {
        listTasks(tasks);
        [
            'task1',
            'tt-1',
            't1,t2',
            '1',
            '2',
            '3',
        ].forEach(s => expect(console.log)
            .toHaveBeenCalledWith(expect.stringContaining(s)));
    });
});