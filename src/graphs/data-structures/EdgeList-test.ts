import { describe, expect, test } from 'vitest';

import { EdgeList } from './EdgeList.ts';

describe('EdgeList Unit Tests', () => {
    // Test 1: Adding Edges Automatically Adds Nodes
    test('should add edges and initialize nodes if they do not exist', () => {
        const graph = new EdgeList<string>();
        const updatedGraph = graph.addEdge('A', 'B', 5);

        expect(updatedGraph.getNeighbors('A')).toEqual([{ node: 'B', weight: 5 }]);
        expect(updatedGraph.getNodes()).toEqual(['A', 'B']);
    });

    // Test 2: Adding Bidirectional Edges
    test('should add bidirectional edges between nodes', () => {
        const graph = new EdgeList<string>();
        const updatedGraph = graph.addEdge('A', 'B', 5, true);

        expect(updatedGraph.getNeighbors('A')).toEqual([{ node: 'B', weight: 5 }]);
        expect(updatedGraph.getNeighbors('B')).toEqual([{ node: 'A', weight: 5 }]);
    });

    // Test 3: Removing an Edge
    test('should remove an edge between nodes', () => {
        const graph = new EdgeList<string>().addEdge('A', 'B', 5).addEdge('B', 'C', 10);

        const graphWithoutEdge = graph.removeEdge('A', 'B');
        expect(graphWithoutEdge.getNeighbors('A')).toEqual([]);
        expect(graphWithoutEdge.getNeighbors('B')).toEqual([{ node: 'C', weight: 10 }]);
    });

    // Test 4: Removing a Node
    test('should remove a node and all its edges', () => {
        const graph = new EdgeList<string>()
            .addEdge('A', 'B', 5)
            .addEdge('B', 'C', 10)
            .addEdge('C', 'A', 15);

        const graphWithoutNodeB = graph.removeNode('B');
        expect(graphWithoutNodeB.getNodes()).toEqual(['C', 'A']);
        expect(graphWithoutNodeB.getNeighbors('A')).not.toContainEqual({ node: 'B', weight: 5 });
        expect(graphWithoutNodeB.getNeighbors('C')).not.toContainEqual({ node: 'B', weight: 10 });
    });

    // Test 5: Querying Non-Existent Nodes
    test('should return empty neighbors for a non-existent node', () => {
        const graph = new EdgeList<string>();
        expect(graph.getNeighbors('A')).toEqual([]);
    });

    // Test 6: Immutability
    test('should not modify the original graph when performing operations', () => {
        const graph = new EdgeList<string>().addEdge('A', 'B', 5, true); // Bidirectional edge
        const updatedGraph = graph.addEdge('B', 'C', 10);

        expect(graph.getNeighbors('B')).toEqual([{ node: 'A', weight: 5 }]); // Original graph
        expect(updatedGraph.getNeighbors('B')).toEqual([
            { node: 'A', weight: 5 },
            { node: 'C', weight: 10 },
        ]); // Updated graph
    });
});
