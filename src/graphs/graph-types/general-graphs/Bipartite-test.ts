import { describe, expect, it } from 'vitest';

import { BipartiteGraph } from './Bipartite.ts';

describe('BipartiteGraph', () => {
    it('should add vertices to different sets', () => {
        const graph = new BipartiteGraph<string>();
        graph.addVertexToSetA('A1');
        graph.addVertexToSetB('B1');

        expect(() => graph.addEdge('A1', 'B1')).not.toThrow();
    });

    it('should not allow edges within the same set', () => {
        const graph = new BipartiteGraph<string>();
        graph.addVertexToSetA('A1');
        graph.addVertexToSetA('A2');

        expect(() => graph.addEdge('A1', 'A2')).toThrow('Both vertices belong to Set A.');
    });
});
