import Graph from 'graphology';
import graphologyLouvain from 'graphology-communities-louvain';
import {
    degreeCentrality,
    inDegreeCentrality,
    outDegreeCentrality,
} from 'graphology-metrics/centrality/degree.js';
import { density } from 'graphology-metrics/graph/density.js';

import {
    AdjacencyList,
    AdjacencyMatrix,
    BipartiteGraph,
    CyclicGraph,
    DAG,
    DirectedGraph,
    EdgeList,
    Louvain,
    UndirectedGraph,
    WeightedGraph,
} from './src/index.ts';

console.log('---------------- AdjacencyList ------------------');
const adjacencyList = new AdjacencyList<string, number>();
adjacencyList.addEdge('A', 'B', 10);
adjacencyList.addEdge('A', 'C', 15);
adjacencyList.printGraph();

console.log('---------------- AdjacencyMatrix ------------------');
const adjacencyMatrix = new AdjacencyMatrix<string, number>();
adjacencyMatrix.addEdge('A', 'B', 10);
adjacencyMatrix.addEdge('B', 'C', 5);
adjacencyMatrix.printGraph();

console.log('---------------- EdgeList ------------------');
const edgeList = new EdgeList<string, number>();
edgeList.addEdge('A', 'B', 10);
edgeList.addEdge('B', 'C', 5);
edgeList.printGraph();

console.log('---------------- DirectedGraph ------------------');
const directedGraph = new DirectedGraph<string, number>();
directedGraph.addEdge('A', 'B', 10);
directedGraph.addEdge('B', 'C', 5);
directedGraph.printGraph();

console.log('---------------- UndirectedGraph ------------------');
const undirectedGraph = new UndirectedGraph<string, number>();
undirectedGraph.addEdge('A', 'B', 10);
undirectedGraph.addEdge('B', 'C', 5);
undirectedGraph.printGraph();

console.log('---------------- DAG ------------------');
const dag = new DAG<string, number>();
dag.addEdge('A', 'B', 10);
dag.addEdge('B', 'C', 5);
try {
    dag.addEdge('C', 'A', 15); // This should throw an error
} catch (e) {
    console.error(e.message);
}
dag.printGraph();

console.log('---------------- CyclicGraph ------------------');
const cyclicGraph = new CyclicGraph<string, number>();
cyclicGraph.addEdge('A', 'B', 10);
cyclicGraph.addEdge('B', 'C', 5);
cyclicGraph.addEdge('C', 'A', 15);
cyclicGraph.printGraph();

console.log('---------------- BipartiteGraph ------------------');
const bipartiteGraph = new BipartiteGraph<string>();
bipartiteGraph.addVertexToSetA('A');
bipartiteGraph.addVertexToSetB('B');
bipartiteGraph.addEdge('A', 'B');
try {
    bipartiteGraph.addEdge('A', 'A'); // Should throw an error
} catch (e) {
    console.error(e.message);
}
bipartiteGraph.printGraph();

console.log('---------------- WeightedGraph ------------------');
const weightedGraph = new WeightedGraph<string>();
weightedGraph.addEdge('A', 'B', 10);
weightedGraph.addEdge('B', 'C', 15);
weightedGraph.printGraph();

console.log('================== Advanced Graph Benchmark ==================');

//
// 1. AdjacencyList: Organizational Hierarchy
//
console.log('---------------- AdjacencyList: Organizational Hierarchy ------------------');
const orgChart = new AdjacencyList<string, string>();
orgChart.addEdge('CEO', 'VP1', 'Leads');
orgChart.addEdge('CEO', 'VP2', 'Leads');
orgChart.addEdge('VP1', 'Manager1', 'Manages');
orgChart.addEdge('VP2', 'Manager2', 'Manages');
orgChart.printGraph();
// Example: CEO → VP1 (Edge Data: Leads), VP2 (Edge Data: Leads)

//
// 2. AdjacencyMatrix: Efficient Graph Traversal (Warshall’s Algorithm for Path Finding)
//
console.log('---------------- AdjacencyMatrix: Path Finding ------------------');
const warshallMatrix = new AdjacencyMatrix<string, null>();
warshallMatrix.addEdge('A', 'B');
warshallMatrix.addEdge('B', 'C');
warshallMatrix.addEdge('C', 'D');
// Compute transitive closure
const vertices = warshallMatrix.getVertices();
vertices.forEach((k) => {
    vertices.forEach((i) => {
        vertices.forEach((j) => {
            if (warshallMatrix.getEdgeData(i, k) && warshallMatrix.getEdgeData(k, j)) {
                warshallMatrix.addEdge(i, j);
            }
        });
    });
});
warshallMatrix.printGraph();

//
// 3. EdgeList: Airline Route Optimization
//
console.log('---------------- EdgeList: Airline Route Optimization ------------------');
const routes = new EdgeList<string, number>();
routes.addEdge('A', 'B', 500); // Cost in dollars
routes.addEdge('B', 'C', 300);
routes.addEdge('C', 'A', 700);
// Finding the cheapest route
const cheapest = routes.getEdgeData('A', 'B');
console.log(`Cheapest route from A to B: $${cheapest}`);
// Example: A → B (Edge Data: 500)

//
// 4. DirectedGraph: Citation Network
//
console.log('---------------- DirectedGraph: Citation Network ------------------');
const citations = new DirectedGraph<string, null>();
citations.addEdge('PaperA', 'PaperB');
citations.addEdge('PaperB', 'PaperC');
// Find papers that cite "PaperA"
console.log('Cited by PaperA:', citations.getNeighbors('PaperA'));

//
// 5. UndirectedGraph: Collaboration Network
//
console.log('---------------- UndirectedGraph: Collaboration Network ------------------');
const collaborations = new UndirectedGraph<string, null>();
collaborations.addEdge('Alice', 'Bob');
collaborations.addEdge('Alice', 'Charlie');
collaborations.addEdge('Bob', 'David');
// Find all collaborators of "Alice"
console.log('Collaborators of Alice:', collaborations.getNeighbors('Alice'));

//
// 6. DAG: Build System Dependency Resolution
//
console.log('---------------- DAG: Build System Dependency Resolution ------------------');
const buildSystem = new DAG<string, null>();
buildSystem.addEdge('A', 'B'); // B depends on A
buildSystem.addEdge('B', 'C'); // C depends on B
buildSystem.addEdge('A', 'C'); // Direct dependency for optimization
console.log('Build Order:');
buildSystem.getVertices().forEach((vertex) => {
    console.log(vertex, '->', buildSystem.getNeighbors(vertex));
});

//
// 7. CyclicGraph: Transaction Network with Loops
//
console.log('---------------- CyclicGraph: Transaction Network ------------------');
const transactions = new CyclicGraph<string, number>();
transactions.addEdge('AccountA', 'AccountB', 100); // $100 transfer
transactions.addEdge('AccountB', 'AccountC', 50);
transactions.addEdge('AccountC', 'AccountA', 150); // Circular flow
transactions.printGraph();

//
// 8. BipartiteGraph: Content Recommendation
//
console.log('---------------- BipartiteGraph: Content Recommendation ------------------');
const recommendations = new BipartiteGraph<string>();
recommendations.addVertexToSetA('User1');
recommendations.addVertexToSetA('User2');
recommendations.addVertexToSetB('MovieA');
recommendations.addVertexToSetB('MovieB');
recommendations.addEdge('User1', 'MovieA');
recommendations.addEdge('User2', 'MovieB');
// Find all movies recommended for User1
console.log('Movies for User1:', recommendations.getNeighbors('User1'));

//
// 9. WeightedGraph: Shortest Path for Delivery Routes
//
console.log('---------------- WeightedGraph: Delivery Routes ------------------');
const deliveryRoutes = new WeightedGraph<string>();
deliveryRoutes.addEdge('Warehouse', 'Store1', 10); // Distance in miles
deliveryRoutes.addEdge('Store1', 'Store2', 20);
deliveryRoutes.addEdge('Warehouse', 'Store2', 25);
// Find the shortest route
const distance = deliveryRoutes.getEdgeData('Warehouse', 'Store1');
console.log(`Shortest route from Warehouse to Store1: ${distance} miles`);

console.log('---------------- Graph Algorithms (Graphology) ------------------');

const GRAPH_OPTIONS = {
    allowSelfLoops: true,
    multi: false,
};

const projectGraph = new Graph.UndirectedGraph(GRAPH_OPTIONS);

// Add nodes
const nodes = ['A', 'B', 'C', 'D'];
nodes.forEach((node) => projectGraph.addNode(node));

// Add edges with weights
const edges = [
    ['A', 'B', 1],
    ['B', 'C', 2],
    ['C', 'D', 1],
    ['A', 'D', 2],
];

edges.forEach(([source, target, weight], index) => {
    projectGraph.addEdgeWithKey(`${source}-${target}-${index}`, source, target, { weight });
});

// Perform Louvain community detection
const louvainResults = graphologyLouvain.detailed(projectGraph, {
    attributes: { weight: 'weight' },
});

// Output the results
console.log({
    modularity: louvainResults.modularity,
    communities: louvainResults.communities,
    density: density(projectGraph),
    degreeCentrality: degreeCentrality(projectGraph),
});

console.log('---------------- Graph Algorithms (DSA Toolkit) ------------------');

const dsaGraph = new UndirectedGraph<string, number>();
dsaGraph.addEdge('A', 'B', 1);
dsaGraph.addEdge('B', 'C', 2);
dsaGraph.addEdge('C', 'D', 1);
dsaGraph.addEdge('D', 'A', 2);

const louvain = new Louvain(dsaGraph);
const result = louvain.run();

console.log('Modularity:', result.modularity);
console.log('Communities:', Array.from(result.communities.entries()));
