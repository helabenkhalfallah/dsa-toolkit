import { GraphInterface } from '../../commons/GraphInterface.js';
import { AdjacencyList } from '../../data-structures/index.ts';

/**
 * Represents a Directed Graph.
 * A directed graph is a graph where edges have a direction.
 */
export class DirectedGraph<T, E> extends AdjacencyList<T, E> implements GraphInterface<T, E> {
    /**
     * Adds a directed edge from `vertex1` to `vertex2`.
     *
     * @param vertex1 - The source vertex.
     * @param vertex2 - The destination vertex.
     * @param edgeData - Optional edge data (e.g., weight, label).
     */
    addEdge(vertex1: T, vertex2: T, edgeData?: E): void {
        super.addEdge(vertex1, vertex2, edgeData);
    }
}
