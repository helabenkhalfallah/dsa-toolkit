import { describe, expect, test } from 'vitest';

import { AdjacencyList } from './AdjacencyList.ts';

describe('AdjacencyList Unit Tests', () => {
    // Test 1: Adding Nodes
    test('should add nodes to the graph', () => {
        const graph = new AdjacencyList<string>();
        const updatedGraph = graph.addNode('A').addNode('B');

        expect(updatedGraph.getNodes()).toEqual(['A', 'B']);
        expect(graph.getNodes()).toEqual([]); // Immutability: Original graph remains unchanged
    });

    // Test 2: Adding Edges
    test('should add edges between nodes', () => {
        const graph = new AdjacencyList<string>();
        const updatedGraph = graph.addNode('A').addNode('B').addEdge('A', 'B', 5);

        expect(updatedGraph.getNeighbors('A')).toEqual([{ node: 'B', weight: 5 }]);
        expect(updatedGraph.getNeighbors('B')).toEqual([]); // Directed edge
    });

    // Test 3: Adding Bidirectional Edges
    test('should add bidirectional edges between nodes', () => {
        const graph = new AdjacencyList<string>();
        const updatedGraph = graph.addNode('A').addNode('B').addEdge('A', 'B', 5, true);

        expect(updatedGraph.getNeighbors('A')).toEqual([{ node: 'B', weight: 5 }]);
        expect(updatedGraph.getNeighbors('B')).toEqual([{ node: 'A', weight: 5 }]);
    });

    // Test 4: Removing an Edge
    test('should remove an edge between nodes', () => {
        const graph = new AdjacencyList<string>();
        const updatedGraph = graph.addNode('A').addNode('B').addEdge('A', 'B', 5);
        const graphWithoutEdge = updatedGraph.removeEdge('A', 'B');

        expect(graphWithoutEdge.getNeighbors('A')).toEqual([]);
    });

    // Test 5: Removing a Node
    test('should remove a node and all its edges', () => {
        const graph = new AdjacencyList<string>();
        const updatedGraph = graph
            .addNode('A')
            .addNode('B')
            .addNode('C')
            .addEdge('A', 'B', 5)
            .addEdge('B', 'C', 10);

        const graphWithoutNode = updatedGraph.removeNode('B');

        expect(graphWithoutNode.getNodes()).toEqual(['A', 'C']);
        expect(graphWithoutNode.getNeighbors('A')).toEqual([]); // Edge to 'B' removed
        expect(graphWithoutNode.getNeighbors('C')).toEqual([]); // Edge from 'B' removed
    });

    // Test 6: Querying Non-Existent Nodes
    test('should return empty neighbors for a non-existent node', () => {
        const graph = new AdjacencyList<string>().addNode('A');

        expect(graph.getNeighbors('B')).toEqual([]); // 'B' does not exist
    });

    // Test 7: Immutability
    test('should not modify the original graph when performing operations', () => {
        const graph = new AdjacencyList<string>().addNode('A').addNode('B');
        const updatedGraph = graph.addEdge('A', 'B', 5);

        expect(graph.getNeighbors('A')).toEqual([]); // Original graph remains unchanged
        expect(updatedGraph.getNeighbors('A')).toEqual([{ node: 'B', weight: 5 }]);
    });

    // Test 8: Adding Duplicate Nodes
    test('should not add duplicate nodes', () => {
        const graph = new AdjacencyList<string>().addNode('A').addNode('A');

        expect(graph.getNodes()).toEqual(['A']);
    });

    // Test 9: Adding Duplicate Edges
    test('should allow duplicate edges between nodes', () => {
        const graph = new AdjacencyList<string>()
            .addNode('A')
            .addNode('B')
            .addEdge('A', 'B', 5)
            .addEdge('A', 'B', 5);

        expect(graph.getNeighbors('A')).toEqual([
            { node: 'B', weight: 5 },
            { node: 'B', weight: 5 },
        ]);
    });

    // Test 10: Adding an Edge with Non-Existent Nodes
    test('should add edges and initialize nodes if they do not exist', () => {
        const graph = new AdjacencyList<string>();
        const updatedGraph = graph.addEdge('A', 'B', 5);

        expect(updatedGraph.getNodes()).toEqual(['A', 'B']);
        expect(updatedGraph.getNeighbors('A')).toEqual([{ node: 'B', weight: 5 }]);
    });
});
