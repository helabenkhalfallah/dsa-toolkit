import { fc, test } from '@fast-check/vitest';
import { describe, expect } from 'vitest';

import { AdjacencyMatrix } from './AdjacencyMatrix.ts';

describe('AdjacencyMatrix Unit Tests', () => {
    // FastCheck Property-Based Testing
    // Test 1: Adding Nodes and Edges with Random Inputs
    test.prop([
        fc.string({ minLength: 1 }), // Non-empty strings only
        fc.string({ minLength: 1 }),
        fc.integer({ min: 1, max: 100 }), // Weight must be positive
    ])('should add edges with random nodes and weights', (from, to, weight) => {
        const graph = new AdjacencyMatrix<string>();
        const updatedGraph = graph.addEdge(from, to, weight);

        expect(updatedGraph.getNodes()).toContain(from);
        expect(updatedGraph.getNodes()).toContain(to);
        expect(updatedGraph.getNeighbors(from)).toContainEqual({ node: to, weight });
    });

    // Test 2: Removing Edges Should Leave Other Connections Intact
    test.prop([
        fc.string({ minLength: 1 }), // Non-empty strings
        fc.string({ minLength: 1 }),
        fc.string({ minLength: 1 }),
        fc.integer({ min: 1, max: 100 }), // Positive weights only
        // eslint-disable-next-line max-params
    ])('removing an edge should not affect other edges', (nodeA, nodeB, nodeC, weight) => {
        const graph = new AdjacencyMatrix<string>()
            .addEdge(nodeA, nodeB, weight)
            .addEdge(nodeB, nodeC, weight);

        const updatedGraph = graph.removeEdge(nodeA, nodeB);

        expect(updatedGraph.getNeighbors(nodeA)).not.toContainEqual({ node: nodeB, weight });
        expect(updatedGraph.getNeighbors(nodeB)).toContainEqual({ node: nodeC, weight });
    });
});
