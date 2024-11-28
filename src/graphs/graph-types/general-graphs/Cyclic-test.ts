import { describe, expect, it } from 'vitest';

import { CyclicGraph } from './Cyclic.ts';

describe('CyclicGraph', () => {
    it('should allow cycles', () => {
        const graph = new CyclicGraph<string, number>();
        graph.addVertex('A');
        graph.addVertex('B');
        graph.addVertex('C');

        graph.addEdge('A', 'B', 10);
        graph.addEdge('B', 'C', 20);
        graph.addEdge('C', 'A', 30);

        expect(graph.getNeighbors('C')).toContain('A');
    });
});
