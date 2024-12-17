/**
 * A functional-style Adjacency Matrix for representing graphs.
 * Provides immutable operations for graph construction and manipulation.
 * @template T - The type of the nodes in the graph.
 */
export class AdjacencyMatrix<T extends string | number> {
    private matrix: number[][];
    private nodes: T[];

    /**
     * Constructs an adjacency matrix.
     * @param nodes - Initial nodes in the graph (optional).
     * @param matrix - Initial adjacency matrix (optional).
     */
    constructor(nodes: T[] = [], matrix: number[][] = []) {
        this.nodes = nodes;
        this.matrix = matrix;
    }

    /**
     * Finds the index of a node.
     * @param node - The node to find.
     * @returns The index of the node, or -1 if not found.
     */
    private getNodeIndex(node: T): number {
        return this.nodes.indexOf(node);
    }

    /**
     * Adds a node to the graph.
     * If the node already exists, the graph remains unchanged.
     * @param node - The node to add.
     * @returns A new AdjacencyMatrix instance with the node added.
     */
    addNode(node: T): AdjacencyMatrix<T> {
        if (this.nodes.includes(node)) return this; // Node already exists

        const newNodes = [...this.nodes, node];
        const size = newNodes.length;

        // Expand the matrix
        const newMatrix = this.matrix.map((row) => [...row, 0]);
        newMatrix.push(Array(size).fill(0));

        return new AdjacencyMatrix(newNodes, newMatrix);
    }

    /**
     * Adds an edge between two nodes.
     * Automatically adds the nodes if they do not exist.
     * @param from - The source node.
     * @param to - The target node.
     * @param weight - The weight of the edge (default: 1).
     * @param bidirectional - Whether the edge is bidirectional (default: false).
     * @returns A new AdjacencyMatrix instance with the edge added.
     */
    // eslint-disable-next-line max-params
    addEdge(from: T, to: T, weight = 1, bidirectional = false): AdjacencyMatrix<T> {
        if (!from || !to) return this; // Ignore invalid or empty nodes
        if (weight <= 0) return this; // Ignore invalid weights

        const newNodes = [...this.nodes];
        const matrix = this.matrix.map((row) => [...row]);

        const ensureIndex = (node: T) => {
            if (!newNodes.includes(node)) {
                newNodes.push(node);
                matrix.forEach((row) => row.push(0)); // Expand existing rows
                matrix.push(new Array(newNodes.length).fill(0)); // Add a new row
            }
            return newNodes.indexOf(node);
        };

        const fromIndex = ensureIndex(from);
        const toIndex = ensureIndex(to);

        matrix[fromIndex][toIndex] = weight;
        if (bidirectional) {
            matrix[toIndex][fromIndex] = weight;
        }

        return new AdjacencyMatrix(newNodes, matrix);
    }

    /**
     * Removes a node and all its associated edges.
     * @param node - The node to remove.
     * @returns A new AdjacencyMatrix instance with the node removed.
     */
    removeNode(node: T): AdjacencyMatrix<T> {
        const index = this.getNodeIndex(node);
        if (index === -1) return this; // Node doesn't exist

        const newNodes = this.nodes.filter((_, i) => i !== index);
        const newMatrix = this.matrix
            .filter((_, rowIndex) => rowIndex !== index)
            .map((row) => row.filter((_, colIndex) => colIndex !== index));

        return new AdjacencyMatrix(newNodes, newMatrix);
    }

    /**
     * Removes an edge between two nodes.
     * @param from - The source node.
     * @param to - The target node.
     * @returns A new AdjacencyMatrix instance with the edge removed.
     */
    removeEdge(from: T, to: T): AdjacencyMatrix<T> {
        const fromIndex = this.getNodeIndex(from);
        const toIndex = this.getNodeIndex(to);
        if (fromIndex === -1 || toIndex === -1) return this; // Nodes don't exist

        const newMatrix = this.matrix.map((row) => [...row]);
        newMatrix[fromIndex][toIndex] = 0;

        return new AdjacencyMatrix(this.nodes, newMatrix);
    }

    /**
     * Gets all neighbors of a node.
     * @param node - The node to query.
     * @returns An array of neighbors with weights.
     */
    getNeighbors(node: T): { node: T; weight: number }[] {
        const index = this.getNodeIndex(node);
        if (index === -1) return []; // Node doesn't exist

        return this.matrix[index]
            .map((weight, colIndex) => ({ node: this.nodes[colIndex], weight }))
            .filter((edge) => edge.weight > 0);
    }

    /**
     * Gets all neighbors of a node, including reverse edges (bidirectional).
     * @param node - The node to query.
     * @returns An array of neighbors with weights.
     */
    getBidirectionalNeighbors(node: T): { node: T; weight: number }[] {
        const index = this.getNodeIndex(node);
        if (index === -1) return []; // Node doesn't exist

        const forwardNeighbors = this.getNeighbors(node);
        const reverseNeighbors = this.nodes
            .map((n, rowIndex) => ({ node: n, weight: this.matrix[rowIndex][index] }))
            .filter((edge) => edge.weight > 0);

        const neighbors = [...forwardNeighbors, ...reverseNeighbors];
        return Array.from(new Map(neighbors.map((n) => [n.node, n])).values());
    }

    /**
     * Gets all nodes in the graph.
     * @returns An array of nodes.
     */
    getNodes(): T[] {
        return [...this.nodes];
    }

    /**
     * Serializes the adjacency matrix to a JSON string.
     * @returns A JSON string representing the adjacency matrix.
     */
    toJSON(): string {
        return JSON.stringify({ nodes: this.nodes, matrix: this.matrix });
    }

    /**
     * Creates an AdjacencyMatrix from a serialized JSON string.
     * @param json - A JSON string representing the adjacency matrix.
     * @returns A new AdjacencyMatrix instance.
     */
    static fromJSON<U extends string | number>(json: string): AdjacencyMatrix<U> {
        const { nodes, matrix } = JSON.parse(json);
        return new AdjacencyMatrix<U>(nodes, matrix);
    }
}
