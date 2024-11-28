import { describe, expect, it } from 'vitest';

import { WeightedGraph } from './Weighted.ts';

describe('WeightedGraph', () => {
    it('should add weighted edges', () => {
        const graph = new WeightedGraph<string>();
        graph.addVertex('A');
        graph.addVertex('B');
        graph.addEdge('A', 'B', 10);

        expect(graph.getEdgeData('A', 'B')).toBe(10);
        expect(graph.getEdgeData('B', 'A')).toBe(10); // Undirected
    });
});
