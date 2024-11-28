import { UndirectedGraph } from './Undirected.ts';

/**
 * Represents a Weighted Graph.
 * A weighted graph is an undirected graph where edges have weights.
 */
export class WeightedGraph<T> extends UndirectedGraph<T, number> {
    /**
     * Adds a weighted edge between `vertex1` and `vertex2`.
     *
     * @param vertex1 - The first vertex.
     * @param vertex2 - The second vertex.
     * @param weight - The weight of the edge.
     */
    addEdge(vertex1: T, vertex2: T, weight: number): void {
        super.addEdge(vertex1, vertex2, weight);
    }
}
