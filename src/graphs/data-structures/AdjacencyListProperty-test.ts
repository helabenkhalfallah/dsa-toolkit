import { fc, test } from '@fast-check/vitest';
import { describe, expect } from 'vitest';

import { AdjacencyList } from './AdjacencyList.ts';

describe('AdjacencyList with Property-Based Testing', () => {
    // Test 1: Adding a node ensures it exists in the graph
    test.prop([fc.string()])('should add a node to the graph', (node) => {
        const graph = new AdjacencyList<string>();
        const updatedGraph = graph.addNode(node);
        expect(updatedGraph.getNodes()).toContain(node);
    });

    // Test 2: Adding an edge increases the number of neighbors
    test.prop([fc.string(), fc.string(), fc.integer({ min: 1, max: 100 })])(
        'should add an edge with the correct weight',
        (from, to, weight) => {
            const graph = new AdjacencyList<string>();
            const updatedGraph = graph.addNode(from).addNode(to).addEdge(from, to, weight);

            const neighbors = updatedGraph.getNeighbors(from);
            expect(neighbors).toEqual(expect.arrayContaining([{ node: to, weight }]));
        },
    );

    // Test 3: Removing an edge ensures it no longer exists
    test.prop([fc.string(), fc.string()])('should remove an edge from the graph', (from, to) => {
        const graph = new AdjacencyList<string>();
        const updatedGraph = graph.addNode(from).addNode(to).addEdge(from, to);
        const graphWithoutEdge = updatedGraph.removeEdge(from, to);

        const neighbors = graphWithoutEdge.getNeighbors(from);
        expect(neighbors).not.toEqual(expect.arrayContaining([{ node: to, weight: undefined }]));
    });

    // Test 4: Removing a node removes all associated edges
    test.prop([fc.string(), fc.string(), fc.string()])(
        'should remove a node and all its edges',
        (nodeA, nodeB, nodeC) => {
            const graph = new AdjacencyList<string>();
            const updatedGraph = graph
                .addNode(nodeA)
                .addNode(nodeB)
                .addNode(nodeC)
                .addEdge(nodeA, nodeB)
                .addEdge(nodeB, nodeC);

            const graphWithoutNodeB = updatedGraph.removeNode(nodeB);

            expect(graphWithoutNodeB.getNodes()).not.toContain(nodeB);
            expect(graphWithoutNodeB.getNeighbors(nodeA)).not.toEqual(
                expect.arrayContaining([{ node: nodeB, weight: undefined }]),
            );
            expect(graphWithoutNodeB.getNeighbors(nodeC)).not.toEqual(
                expect.arrayContaining([{ node: nodeB, weight: undefined }]),
            );
        },
    );
});
