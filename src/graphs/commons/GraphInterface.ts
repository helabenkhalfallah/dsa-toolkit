export interface GraphInterface<T, E> {
    getVertices(): T[];
    getEdges(): Array<[T, T]>;
    getNeighbors(vertex: T): T[];
    getEdgeData(source: T, target: T): E | undefined;
    hasEdge(source: T, target: T): boolean;
    addEdge(source: T, target: T, edgeData?: E): void;

    // Additional methods for modularity calculation
    getTotalEdgeWeight(): number;
    getNodeDegree(vertex: T): number;
}
