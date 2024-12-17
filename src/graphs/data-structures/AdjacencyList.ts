/**
 * Represents an edge in the adjacency list.
 * @template T - The type of the node.
 */
type Edge<T> = {
    /** The target node of the edge. */
    node: T;
    /** The weight of the edge (optional). */
    weight?: number;
};

/**
 * A functional-style Adjacency List for representing graphs.
 * Provides immutable operations for graph construction and manipulation.
 * @template T - The type of the nodes in the graph.
 */
export class AdjacencyList<T extends string | number> {
    /**
     * Internal state of the adjacency list, represented as a mapping from nodes to edges.
     */
    private state: Record<T, Edge<T>[]>;

    /**
     * Constructs an adjacency list.
     * @param initialState - The initial state of the adjacency list (optional).
     */
    constructor(initialState?: Record<T, { node: T; weight?: number }[]>) {
        // Use Object.create(null) to avoid prototype pollution issues
        this.state = initialState || Object.create(null);
    }

    /**
     * Adds a node to the adjacency list.
     * If the node already exists, the graph remains unchanged.
     * @param node - The node to add.
     * @returns A new AdjacencyList instance with the node added.
     */
    addNode(node: T): AdjacencyList<T> {
        if (this.state[node]) return this; // Node already exists
        const newState = { ...this.state, [node]: [] as Edge<T>[] };
        return new AdjacencyList(newState);
    }

    /**
     * Adds an edge between two nodes.
     * Automatically adds the target node if it does not exist.
     * @param from - The source node.
     * @param to - The target node.
     * @param weight - The weight of the edge (optional).
     * @param bidirectional - Whether the edge is bidirectional (default: false).
     * @returns A new AdjacencyList instance with the edge added.
     */
    // eslint-disable-next-line max-params
    addEdge(from: T, to: T, weight?: number, bidirectional = false): AdjacencyList<T> {
        const newState = { ...this.state };

        // Securely initialize the state
        if (!newState[from]) newState[from] = [];
        if (!newState[to]) newState[to] = [];

        newState[from] = [...newState[from], { node: to, weight }];
        if (bidirectional) {
            newState[to] = [...newState[to], { node: from, weight }];
        }

        return new AdjacencyList(newState);
    }

    /**
     * Removes a node and all associated edges.
     * @param node - The node to remove.
     * @returns A new AdjacencyList instance with the node removed.
     */
    removeNode(node: T): AdjacencyList<T> {
        const newState = { ...this.state };
        delete newState[node];
        for (const key in newState) {
            newState[key] = newState[key].filter((edge) => edge.node !== node);
        }
        return new AdjacencyList(newState);
    }

    /**
     * Removes an edge between two nodes.
     * @param from - The source node.
     * @param to - The target node.
     * @returns A new AdjacencyList instance with the edge removed.
     */
    removeEdge(from: T, to: T): AdjacencyList<T> {
        const newState = { ...this.state };
        if (newState[from]) {
            newState[from] = newState[from].filter((edge) => edge.node !== to);
        }
        return new AdjacencyList(newState);
    }

    /**
     * Gets all neighbors (edges) of a node.
     * @param node - The node to query.
     * @returns An array of edges connected to the node.
     */
    getNeighbors(node: T): { node: T; weight?: number }[] {
        return this.state[node] || [];
    }

    /**
     * Gets all neighbors of a node, including nodes pointing to it (reverse edges).
     * @param node - The node to query.
     * @returns An array of neighbors (connected nodes).
     */
    getBidirectionalNeighbors(node: T): T[] {
        const forwardNeighbors = this.getNeighbors(node).map((edge) => edge.node);
        const reverseNeighbors = this.getNodes().filter((neighbor) =>
            this.getNeighbors(neighbor).some((edge) => edge.node === node),
        );
        return [...new Set([...forwardNeighbors, ...reverseNeighbors])];
    }

    /**
     * Gets all nodes in the adjacency list.
     * @returns An array of nodes in the graph.
     */
    getNodes(): T[] {
        return Object.keys(this.state) as T[];
    }

    /**
     * Transforms the edges of the graph using a mapping function.
     * The mapping function receives the edges and the node they belong to.
     * @param transform - The function to apply to the edges.
     * @returns A new AdjacencyList instance with transformed edges.
     */
    map(transform: (edges: Edge<T>[], node: T) => Edge<T>[]): AdjacencyList<T> {
        const newState: Record<T, Edge<T>[]> = {} as Record<T, Edge<T>[]>;
        for (const node in this.state) {
            newState[node] = transform(this.state[node], node as T);
        }
        return new AdjacencyList(newState);
    }

    /**
     * Serializes the adjacency list to a JSON string.
     * @returns A JSON string representing the adjacency list.
     */
    toJSON(): string {
        return JSON.stringify(this.state);
    }

    /**
     * Creates an AdjacencyList from a serialized JSON string.
     * @param json - A JSON string representing the adjacency list.
     * @returns A new AdjacencyList instance.
     */
    static fromJSON<U extends string | number>(json: string): AdjacencyList<U> {
        return new AdjacencyList<U>(JSON.parse(json));
    }

    /**
     * Clears all nodes and edges from the adjacency list.
     * @returns A new, empty AdjacencyList instance.
     */
    clear(): AdjacencyList<T> {
        return new AdjacencyList();
    }
}
