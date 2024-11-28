import { describe, expect, it } from 'vitest';

import { TaskGraph } from './Tasks.ts';

describe('TaskGraph', () => {
    it('should add tasks and dependencies correctly', () => {
        const graph = new TaskGraph();
        graph.addTask('Task1');
        graph.addTask('Task2');

        expect(() => graph.addDependency('Task1', 'Task2', 5)).not.toThrow();
    });

    it('should not allow cycles', () => {
        const graph = new TaskGraph();
        graph.addTask('Task1');
        graph.addTask('Task2');

        graph.addDependency('Task1', 'Task2', 5);
        expect(() => graph.addDependency('Task2', 'Task1', 10)).toThrow(
            'Adding this edge creates a cycle',
        );
    });
});
