import { DAG } from '../general-graphs/DAG.ts';

/**
 * Represents an Abstract Syntax Tree (AST).
 * An AST is a tree-like structure used to represent the syntactic structure of source code.
 * It extends the Directed Acyclic Graph (DAG) class.
 */
export class AST extends DAG<string, null> {
    /**
     * Adds a node to the AST.
     *
     * @param node - The node to be added (e.g., a language construct or token).
     */
    addNode(node: string): void {
        this.addVertex(node);
    }

    /**
     * Adds a directed edge between two nodes in the AST.
     * This edge represents a parent-child relationship in the syntax tree.
     *
     * @param parent - The parent node in the AST.
     * @param child - The child node in the AST.
     */
    addEdge(parent: string, child: string): void {
        super.addEdge(parent, child, null);
    }
}
