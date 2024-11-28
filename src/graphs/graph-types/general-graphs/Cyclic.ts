import { DirectedGraph } from './Directed.ts';

/**
 * Represents a Cyclic Graph.
 * A cyclic graph is a directed graph that allows cycles, where vertices can form closed loops.
 */
export class CyclicGraph<T, E> extends DirectedGraph<T, E> {
    /**
     * Adds a directed edge from `vertex1` to `vertex2`.
     *
     * @param vertex1 - The source vertex.
     * @param vertex2 - The destination vertex.
     * @param edgeData - Optional edge data (e.g., weight, label).
     */
    addEdge(vertex1: T, vertex2: T, edgeData?: E): void {
        super.addEdge(vertex1, vertex2, edgeData); // Allow cycles
    }
}
