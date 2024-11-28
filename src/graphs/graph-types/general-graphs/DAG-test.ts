import { beforeEach, describe, expect, it } from 'vitest';

import { DAG } from './DAG.ts';

describe('DAG', () => {
    let dag: DAG<string, number>;

    beforeEach(() => {
        dag = new DAG<string, number>();
    });

    it('should add vertices and directed edges', () => {
        dag.addVertex('A');
        dag.addVertex('B');
        dag.addEdge('A', 'B', 10);

        expect(dag.getNeighbors('A')).toContain('B');
        expect(dag.getNeighbors('B')).not.toContain('A');
    });

    it('should throw an error when adding an edge creates a cycle', () => {
        dag.addVertex('A');
        dag.addVertex('B');
        dag.addVertex('C');

        dag.addEdge('A', 'B', 10);
        dag.addEdge('B', 'C', 20);

        expect(() => dag.addEdge('C', 'A', 30)).toThrow(
            'Adding this edge creates a cycle, which is not allowed in a DAG.',
        );
    });

    it('should allow multiple valid edges', () => {
        dag.addVertex('A');
        dag.addVertex('B');
        dag.addVertex('C');

        dag.addEdge('A', 'B', 10);
        dag.addEdge('A', 'C', 20);

        expect(dag.getNeighbors('A')).toContain('B');
        expect(dag.getNeighbors('A')).toContain('C');
    });

    it('should handle edge cases with isolated vertices', () => {
        dag.addVertex('A');
        dag.addVertex('B');

        expect(dag.getNeighbors('A')).toEqual([]);
        expect(dag.getNeighbors('B')).toEqual([]);
    });

    it('should not throw an error when adding isolated vertices', () => {
        expect(() => {
            dag.addVertex('X');
            dag.addVertex('Y');
        }).not.toThrow();
    });
});
