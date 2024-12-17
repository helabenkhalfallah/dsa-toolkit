/**
 * Represents an edge in the Edge List.
 * @template T - The type of the node.
 */
type Edge<T> = {
    from: T;
    to: T;
    weight?: number;
};

/**
 * A functional-style Edge List for representing graphs.
 * Provides immutable operations for graph construction and manipulation.
 * @template T - The type of the nodes in the graph.
 */
export class EdgeList<T extends string | number> {
    private edges: Edge<T>[];

    /**
     * Constructs an Edge List.
     * @param edges - Initial list of edges (optional).
     */
    constructor(edges: Edge<T>[] = []) {
        this.edges = edges;
    }

    /**
     * Adds a node to the graph.
     * Since Edge Lists don't explicitly store nodes, this is a no-op.
     * @param _node - The node to add.
     * @returns The same EdgeList instance.
     */
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    addNode(_node: T): EdgeList<T> {
        return this; // Nodes are implicit in Edge List
    }

    /**
     * Adds an edge between two nodes.
     * @param from - The source node.
     * @param to - The target node.
     * @param weight - The weight of the edge (optional).
     * @param bidirectional - Whether the edge is bidirectional (default: false).
     * @returns A new EdgeList instance with the edge added.
     */
    // eslint-disable-next-line max-params
    addEdge(from: T, to: T, weight?: number, bidirectional = false): EdgeList<T> {
        const newEdges = [...this.edges, { from, to, weight }];
        if (bidirectional) {
            newEdges.push({ from: to, to: from, weight });
        }
        return new EdgeList(newEdges);
    }

    /**
     * Removes an edge between two nodes.
     * @param from - The source node.
     * @param to - The target node.
     * @returns A new EdgeList instance with the edge removed.
     */
    removeEdge(from: T, to: T): EdgeList<T> {
        const newEdges = this.edges.filter((edge) => !(edge.from === from && edge.to === to));
        return new EdgeList(newEdges);
    }

    /**
     * Removes all edges associated with a node.
     * @param node - The node to remove.
     * @returns A new EdgeList instance with the node removed.
     */
    removeNode(node: T): EdgeList<T> {
        const newEdges = this.edges.filter((edge) => edge.from !== node && edge.to !== node);
        return new EdgeList(newEdges);
    }

    /**
     * Gets all neighbors of a node.
     * @param node - The node to query.
     * @returns An array of neighbors with weights.
     */
    getNeighbors(node: T): { node: T; weight?: number }[] {
        return this.edges
            .filter((edge) => edge.from === node) // Outgoing edges
            .map((edge) => ({ node: edge.to, weight: edge.weight }));
    }

    /**
     * Gets all neighbors of a node, including reverse edges.
     * @param node - The node to query.
     * @returns An array of neighbors with weights.
     */
    getBidirectionalNeighbors(node: T): { node: T; weight?: number }[] {
        return this.edges
            .filter((edge) => edge.from === node || edge.to === node)
            .map((edge) => ({
                node: edge.from === node ? edge.to : edge.from,
                weight: edge.weight,
            }));
    }

    /**
     * Gets all nodes in the graph.
     * @returns An array of unique nodes.
     */
    getNodes(): T[] {
        const nodes = new Set<T>();
        this.edges.forEach((edge) => {
            nodes.add(edge.from);
            nodes.add(edge.to);
        });
        return Array.from(nodes);
    }

    /**
     * Serializes the edge list to a JSON string.
     * @returns A JSON string representing the edge list.
     */
    toJSON(): string {
        return JSON.stringify(this.edges);
    }

    /**
     * Creates an EdgeList from a serialized JSON string.
     * @param json - A JSON string representing the edge list.
     * @returns A new EdgeList instance.
     */
    static fromJSON<U extends string | number>(json: string): EdgeList<U> {
        return new EdgeList<U>(JSON.parse(json));
    }
}
