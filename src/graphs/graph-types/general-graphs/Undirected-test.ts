import { describe, expect, it } from 'vitest';

import { UndirectedGraph } from './Undirected.ts';

describe('UndirectedGraph', () => {
    it('should add undirected edges', () => {
        const graph = new UndirectedGraph<string, number>();
        graph.addVertex('A');
        graph.addVertex('B');
        graph.addEdge('A', 'B', 5);

        expect(graph.getNeighbors('A')).toContain('B');
        expect(graph.getNeighbors('B')).toContain('A');
    });
});
