import { GraphInterface } from '../../commons/GraphInterface.js';
import { AdjacencyList } from '../../data-structures/index.ts';

/**
 * Represents an Undirected Graph.
 * An undirected graph is a graph where edges are bidirectional.
 */
export class UndirectedGraph<T, E> extends AdjacencyList<T, E> implements GraphInterface<T, E> {
    /**
     * Adds an undirected edge between `vertex1` and `vertex2`.
     *
     * @param vertex1 - The first vertex.
     * @param vertex2 - The second vertex.
     * @param edgeData - Optional edge data (e.g., weight, label).
     */
    addEdge(vertex1: T, vertex2: T, edgeData?: E): void {
        super.addEdge(vertex1, vertex2, edgeData);
        super.addEdge(vertex2, vertex1, edgeData);
    }
}
