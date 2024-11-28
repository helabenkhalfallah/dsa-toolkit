import { DirectedGraph } from './Directed.ts';

/**
 * Represents a Directed Acyclic Graph (DAG).
 * A DAG is a directed graph with no cycles, often used for scheduling and dependency resolution.
 */
export class DAG<T, E> extends DirectedGraph<T, E> {
    /**
     * Adds a directed edge from `vertex1` to `vertex2`.
     * Ensures that adding the edge does not create a cycle.
     *
     * @param vertex1 - The source vertex.
     * @param vertex2 - The destination vertex.
     * @param edgeData - Optional edge data (e.g., weight, label).
     * @throws Error if adding the edge creates a cycle.
     */
    addEdge(vertex1: T, vertex2: T, edgeData?: E): void {
        super.addEdge(vertex1, vertex2, edgeData);

        if (this.hasCycle()) {
            super.removeEdge(vertex1, vertex2); // Roll back the addition
            throw new Error('Adding this edge creates a cycle, which is not allowed in a DAG.');
        }
    }

    /**
     * Checks if the graph contains any cycles.
     *
     * @returns `true` if the graph contains a cycle, otherwise `false`.
     */
    private hasCycle(): boolean {
        const visited = new Set<T>();
        const stack = new Set<T>();

        const visit = (vertex: T): boolean => {
            if (stack.has(vertex)) return true; // Cycle detected
            if (visited.has(vertex)) return false;

            visited.add(vertex);
            stack.add(vertex);

            const neighbors = this.getNeighbors(vertex);
            for (const neighbor of neighbors) {
                if (visit(neighbor)) return true;
            }

            stack.delete(vertex);
            return false;
        };

        for (const vertex of this.getVertices()) {
            if (visit(vertex)) return true;
        }

        return false;
    }
}
