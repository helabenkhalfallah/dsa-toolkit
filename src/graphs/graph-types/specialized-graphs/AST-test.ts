import { describe, expect, it } from 'vitest';

import { AST } from './AST.ts';

describe('AST', () => {
    it('should add nodes and edges correctly', () => {
        const ast = new AST();
        ast.addNode('Root');
        ast.addNode('Child');

        expect(() => ast.addEdge('Root', 'Child')).not.toThrow();
    });

    it('should not allow cycles', () => {
        const ast = new AST();
        ast.addNode('A');
        ast.addNode('B');

        ast.addEdge('A', 'B');
        expect(() => ast.addEdge('B', 'A')).toThrow('Adding this edge creates a cycle');
    });
});
