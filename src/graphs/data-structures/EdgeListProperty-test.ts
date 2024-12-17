import { fc, test } from '@fast-check/vitest';
import { describe, expect } from 'vitest';

import { EdgeList } from './EdgeList.ts';

describe('EdgeList Unit Tests', () => {
    // Test 1: Adding and Removing Edges
    test.prop([
        fc.string({ minLength: 1 }),
        fc.string({ minLength: 1 }),
        fc.integer({ min: 1, max: 100 }),
    ])('adding and removing an edge should leave graph intact', (from, to, weight) => {
        const graph = new EdgeList<string>().addEdge(from, to, weight);
        const graphWithoutEdge = graph.removeEdge(from, to);

        expect(graphWithoutEdge.getNeighbors(from)).not.toContainEqual({ node: to, weight });
    });

    // Test 2: Removing a Node Should Remove All Related Edges
    test.prop([
        fc.string({ minLength: 1 }),
        fc.string({ minLength: 1 }),
        fc.string({ minLength: 1 }),
        fc.integer({ min: 1, max: 100 }),
        // eslint-disable-next-line max-params
    ])('removing a node should remove all related edges', (nodeA, nodeB, nodeC, weight) => {
        const graph = new EdgeList<string>()
            .addEdge(nodeA, nodeB, weight)
            .addEdge(nodeB, nodeC, weight);

        const graphWithoutNode = graph.removeNode(nodeB);

        expect(graphWithoutNode.getNeighbors(nodeA)).not.toContainEqual({ node: nodeB, weight });
        expect(graphWithoutNode.getNeighbors(nodeC)).not.toContainEqual({ node: nodeB, weight });
    });
});
