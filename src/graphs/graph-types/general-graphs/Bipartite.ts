import { UndirectedGraph } from './Undirected.ts';

/**
 * Represents a Bipartite Graph.
 * A bipartite graph is a special type of graph where vertices can be divided into two distinct sets (Set A and Set B),
 * and edges only connect vertices from different sets.
 */
export class BipartiteGraph<T> extends UndirectedGraph<T, null> {
    private setA: Set<T>;
    private setB: Set<T>;

    constructor() {
        super();
        this.setA = new Set();
        this.setB = new Set();
    }

    /**
     * Adds a vertex to Set A.
     *
     * @param vertex - The vertex to be added to Set A.
     */
    addVertexToSetA(vertex: T): void {
        this.setA.add(vertex);
        this.addVertex(vertex);
    }

    /**
     * Adds a vertex to Set B.
     *
     * @param vertex - The vertex to be added to Set B.
     */
    addVertexToSetB(vertex: T): void {
        this.setB.add(vertex);
        this.addVertex(vertex);
    }

    /**
     * Adds an edge between two vertices.
     * Ensures that the vertices belong to different sets (Set A and Set B).
     *
     * @param vertex1 - The first vertex.
     * @param vertex2 - The second vertex.
     * @throws Error if both vertices belong to the same set.
     */
    addEdge(vertex1: T, vertex2: T): void {
        if (this.setA.has(vertex1) && this.setA.has(vertex2)) {
            throw new Error('Both vertices belong to Set A.');
        }
        if (this.setB.has(vertex1) && this.setB.has(vertex2)) {
            throw new Error('Both vertices belong to Set B.');
        }
        super.addEdge(vertex1, vertex2, null);
    }
}
