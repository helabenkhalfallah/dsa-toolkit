/**
 * Performs a Depth-First Search (DFS) on a graph.
 * @template T - The type of the nodes in the graph.
 * @param start - The starting node for the traversal.
 * @param getNeighbors - A function that retrieves the neighbors of a node.
 * @returns An array of visited nodes in DFS order.
 */
export function DFS<T>(start: T, getNeighbors: (node: T) => T[]): T[] {
    const visited = new Set<T>();
    const result: T[] = [];

    const traverse = (node: T) => {
        if (visited.has(node)) return;
        visited.add(node);
        result.push(node);
        getNeighbors(node).forEach(traverse);
    };

    traverse(start);
    return result;
}
