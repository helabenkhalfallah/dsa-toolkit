import { describe, expect, it } from 'vitest';

import { DirectedGraph } from './Directed.ts';

describe('DirectedGraph', () => {
    it('should add directed edges', () => {
        const graph = new DirectedGraph<string, number>();
        graph.addVertex('A');
        graph.addVertex('B');
        graph.addEdge('A', 'B', 5);

        expect(graph.getNeighbors('A')).toContain('B');
        expect(graph.getNeighbors('B')).not.toContain('A'); // Directed edge
    });
});
