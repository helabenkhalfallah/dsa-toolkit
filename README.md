
# DSA Toolbox 📚

A powerful toolkit for data structures and algorithms in TypeScript, designed for optimal performance and versatility. The toolkit provides implementations of various data structures and algorithms, with a focus on search and sort operations, caching, and probabilistic data structures.

## ✨ Features

- **Search Algorithms**: Binary, Exponential, Hybrid, Linear, and Ternary Search.
- **Sorting Algorithms**: Heap Sort, Merge Sort, and TimSort.
- **Caches**: LRU and LFU cache implementations.
- **Heaps**: Min and Max Heap.
- **Linked Lists**: Singly and Doubly Linked Lists.
- **Probabilistic Data Structures**: HyperLogLog, Count-Min Sketch, Bloom Filter, Skip List, t-Digest, MinHash, and SimHash.
- **Trees**: AVL Tree, B-Tree, Binary Search Tree, Red-Black Tree, and Trie.
- **Additional Structures**: Queue, Stack, and Treap.

## Benchmarks

### Data Structures Benchmarks
┌─────────┬──────────────────────┬────────────────────┬─────────┬───────────────────────┐
│ (index) │ dataStructure        │ operation          │ size    │ time (ms)             │
├─────────┼──────────────────────┼────────────────────┼─────────┼───────────────────────┤
│ 0       │ 'Native Array'       │ 'Insert'           │ 1000    │ 0.004207999999948697  │
│ 1       │ 'Native Array'       │ 'Search'           │ 1000    │ 0.0015419999999721767 │
│ 2       │ 'Native Array'       │ 'Delete'           │ 1000    │ 0.0007909999999355932 │
│ 3       │ 'Queue'              │ 'Insert (Enqueue)' │ 1000    │ 0.1306250000000091    │
│ 4       │ 'Queue'              │ 'Delete (Dequeue)' │ 1000    │ 0.13549999999997908   │
│ 5       │ 'Stack'              │ 'Insert (Push)'    │ 1000    │ 0.12162500000010823   │
│ 6       │ 'Stack'              │ 'Delete (Pop)'     │ 1000    │ 0.11275000000000546   │
│ 7       │ 'Binary Search Tree' │ 'Insert'           │ 1000    │ 0.33016700000007404   │
│ 8       │ 'Binary Search Tree' │ 'Search'           │ 1000    │ 0.043083000000024185  │
│ 9       │ 'Binary Search Tree' │ 'Delete'           │ 1000    │ 0.03079200000001947   │
│ 10      │ 'Red-Black Tree'     │ 'Insert'           │ 1000    │ 0.801834000000099     │
│ 11      │ 'Red-Black Tree'     │ 'Search'           │ 1000    │ 0.020166000000017448  │
│ 12      │ 'Red-Black Tree'     │ 'Delete'           │ 1000    │ 0.07908400000007987   │
│ 13      │ 'AVL Tree'           │ 'Insert'           │ 1000    │ 0.6277499999999918    │
│ 14      │ 'AVL Tree'           │ 'Search'           │ 1000    │ 0.011665999999991072  │
│ 15      │ 'AVL Tree'           │ 'Delete'           │ 1000    │ 0.018916999999987638  │
│ 16      │ 'Trie'               │ 'Insert'           │ 1000    │ 0.3450840000000426    │
│ 17      │ 'Trie'               │ 'Search'           │ 1000    │ 0.01574999999991178   │
│ 18      │ 'Trie'               │ 'Delete'           │ 1000    │ 0.01841699999999946   │
│ 19      │ 'Min Heap'           │ 'Insert'           │ 1000    │ 0.18537499999990814   │
│ 20      │ 'Min Heap'           │ 'Extract'          │ 1000    │ 0.32520899999997255   │
│ 21      │ 'Max Heap'           │ 'Insert'           │ 1000    │ 0.18095899999991616   │
│ 22      │ 'Max Heap'           │ 'Extract'          │ 1000    │ 0.3186670000000049    │
│ 23      │ 'B-Tree'             │ 'Insert'           │ 1000    │ 0.47554200000001856   │
│ 24      │ 'B-Tree'             │ 'Search'           │ 1000    │ 0.015457999999966887  │
│ 25      │ 'B-Tree'             │ 'Delete'           │ 1000    │ 0.07829100000003564   │
│ 26      │ 'Native Array'       │ 'Insert'           │ 10000   │ 0.19754100000000108   │
│ 27      │ 'Native Array'       │ 'Search'           │ 10000   │ 0.0024580000000469227 │
│ 28      │ 'Native Array'       │ 'Delete'           │ 10000   │ 0.0007079999999177744 │
│ 29      │ 'Queue'              │ 'Insert (Enqueue)' │ 10000   │ 0.2820409999999356    │
│ 30      │ 'Queue'              │ 'Delete (Dequeue)' │ 10000   │ 0.18724999999994907   │
│ 31      │ 'Stack'              │ 'Insert (Push)'    │ 10000   │ 0.1817079999999578    │
│ 32      │ 'Stack'              │ 'Delete (Pop)'     │ 10000   │ 0.16466700000000856   │
│ 33      │ 'Binary Search Tree' │ 'Insert'           │ 10000   │ 1.6757920000000013    │
│ 34      │ 'Binary Search Tree' │ 'Search'           │ 10000   │ 0.003916000000003805  │
│ 35      │ 'Binary Search Tree' │ 'Delete'           │ 10000   │ 0.003582999999935055  │
│ 36      │ 'Red-Black Tree'     │ 'Insert'           │ 10000   │ 3.0843340000000126    │
│ 37      │ 'Red-Black Tree'     │ 'Search'           │ 10000   │ 0.005084000000010747  │
│ 38      │ 'Red-Black Tree'     │ 'Delete'           │ 10000   │ 0.01779199999998582   │
│ 39      │ 'AVL Tree'           │ 'Insert'           │ 10000   │ 1.7636669999999413    │
│ 40      │ 'AVL Tree'           │ 'Search'           │ 10000   │ 0.0028340000000071086 │
│ 41      │ 'AVL Tree'           │ 'Delete'           │ 10000   │ 0.004000000000019099  │
│ 42      │ 'Trie'               │ 'Insert'           │ 10000   │ 1.201708999999937     │
│ 43      │ 'Trie'               │ 'Search'           │ 10000   │ 0.005916999999953987  │
│ 44      │ 'Trie'               │ 'Delete'           │ 10000   │ 0.004457999999999629  │
│ 45      │ 'Min Heap'           │ 'Insert'           │ 10000   │ 0.45383399999991525   │
│ 46      │ 'Min Heap'           │ 'Extract'          │ 10000   │ 0.8098329999999123    │
│ 47      │ 'Max Heap'           │ 'Insert'           │ 10000   │ 0.3135409999999865    │
│ 48      │ 'Max Heap'           │ 'Extract'          │ 10000   │ 0.7455420000000004    │
│ 49      │ 'B-Tree'             │ 'Insert'           │ 10000   │ 2.5482500000000528    │
│ 50      │ 'B-Tree'             │ 'Search'           │ 10000   │ 0.009791000000063832  │
│ 51      │ 'B-Tree'             │ 'Delete'           │ 10000   │ 0.0771670000000313    │
│ 52      │ 'Native Array'       │ 'Insert'           │ 100000  │ 0.13804100000004382   │
│ 53      │ 'Native Array'       │ 'Search'           │ 100000  │ 0.016582999999968706  │
│ 54      │ 'Native Array'       │ 'Delete'           │ 100000  │ 0.0009590000000798682 │
│ 55      │ 'Queue'              │ 'Insert (Enqueue)' │ 100000  │ 1.9742090000000871    │
│ 56      │ 'Queue'              │ 'Delete (Dequeue)' │ 100000  │ 0.3028749999999718    │
│ 57      │ 'Stack'              │ 'Insert (Push)'    │ 100000  │ 0.7822499999999764    │
│ 58      │ 'Stack'              │ 'Delete (Pop)'     │ 100000  │ 0.18483400000002348   │
│ 59      │ 'Binary Search Tree' │ 'Insert'           │ 100000  │ 20.20908399999996     │
│ 60      │ 'Binary Search Tree' │ 'Search'           │ 100000  │ 0.012583000000063294  │
│ 61      │ 'Binary Search Tree' │ 'Delete'           │ 100000  │ 0.0031249999999545253 │
│ 62      │ 'Red-Black Tree'     │ 'Insert'           │ 100000  │ 95.10391600000003     │
│ 63      │ 'Red-Black Tree'     │ 'Search'           │ 100000  │ 0.01933299999996052   │
│ 64      │ 'Red-Black Tree'     │ 'Delete'           │ 100000  │ 0.011167000000000371  │
│ 65      │ 'AVL Tree'           │ 'Insert'           │ 100000  │ 29.13545899999997     │
│ 66      │ 'AVL Tree'           │ 'Search'           │ 100000  │ 0.010999999999967258  │
│ 67      │ 'AVL Tree'           │ 'Delete'           │ 100000  │ 0.003624999999942702  │
│ 68      │ 'Trie'               │ 'Insert'           │ 100000  │ 33.300416999999925    │
│ 69      │ 'Trie'               │ 'Search'           │ 100000  │ 0.045500000000060936  │
│ 70      │ 'Trie'               │ 'Delete'           │ 100000  │ 0.08795800000007148   │
│ 71      │ 'Min Heap'           │ 'Insert'           │ 100000  │ 4.6970830000000205    │
│ 72      │ 'Min Heap'           │ 'Extract'          │ 100000  │ 9.893708999999944     │
│ 73      │ 'Max Heap'           │ 'Insert'           │ 100000  │ 3.2794169999999667    │
│ 74      │ 'Max Heap'           │ 'Extract'          │ 100000  │ 9.272040999999945     │
│ 75      │ 'B-Tree'             │ 'Insert'           │ 100000  │ 50.47550000000001     │
│ 76      │ 'B-Tree'             │ 'Search'           │ 100000  │ 0.012458000000037828  │
│ 77      │ 'B-Tree'             │ 'Delete'           │ 100000  │ 0.0196250000000191    │
│ 78      │ 'Native Array'       │ 'Insert'           │ 1000000 │ 2.0249169999999594    │
│ 79      │ 'Native Array'       │ 'Search'           │ 1000000 │ 0.1390840000000253    │
│ 80      │ 'Native Array'       │ 'Delete'           │ 1000000 │ 0.0008749999999508873 │
│ 81      │ 'Queue'              │ 'Insert (Enqueue)' │ 1000000 │ 40.695625000000064    │
│ 82      │ 'Queue'              │ 'Delete (Dequeue)' │ 1000000 │ 3.657124999999951     │
│ 83      │ 'Stack'              │ 'Insert (Push)'    │ 1000000 │ 27.792416999999887    │
│ 84      │ 'Stack'              │ 'Delete (Pop)'     │ 1000000 │ 3.720916999999872     │
│ 85      │ 'Binary Search Tree' │ 'Insert'           │ 1000000 │ 354.1567090000001     │
│ 86      │ 'Binary Search Tree' │ 'Search'           │ 1000000 │ 0.021709000000100787  │
│ 87      │ 'Binary Search Tree' │ 'Delete'           │ 1000000 │ 0.0070420000001831795 │
│ 88      │ 'Red-Black Tree'     │ 'Insert'           │ 1000000 │ 1473.951459           │
│ 89      │ 'Red-Black Tree'     │ 'Search'           │ 1000000 │ 0.013708999999835214  │
│ 90      │ 'Red-Black Tree'     │ 'Delete'           │ 1000000 │ 0.008624999999938154  │
│ 91      │ 'AVL Tree'           │ 'Insert'           │ 1000000 │ 377.26012500000024    │
│ 92      │ 'AVL Tree'           │ 'Search'           │ 1000000 │ 0.003666999999950349  │
│ 93      │ 'AVL Tree'           │ 'Delete'           │ 1000000 │ 0.00233299999990777   │
│ 94      │ 'Trie'               │ 'Insert'           │ 1000000 │ 465.33245799999986    │
│ 95      │ 'Trie'               │ 'Search'           │ 1000000 │ 0.015583999999762455  │
│ 96      │ 'Trie'               │ 'Delete'           │ 1000000 │ 0.01141700000016499   │
│ 97      │ 'Min Heap'           │ 'Insert'           │ 1000000 │ 29.898666999999932    │
│ 98      │ 'Min Heap'           │ 'Extract'          │ 1000000 │ 104.84195799999998    │
│ 99      │ 'Max Heap'           │ 'Insert'           │ 1000000 │ 30.71804199999997     │
│ 100     │ 'Max Heap'           │ 'Extract'          │ 1000000 │ 104.93929200000002    │
│ 101     │ 'B-Tree'             │ 'Insert'           │ 1000000 │ 655.3055409999997     │
│ 102     │ 'B-Tree'             │ 'Search'           │ 1000000 │ 0.009000000000014552  │
│ 103     │ 'B-Tree'             │ 'Delete'           │ 1000000 │ 0.017625000000407454  │
└─────────┴──────────────────────┴────────────────────┴─────────┴───────────────────────┘

**Suggested Applications:**
- Small Data: For datasets around 1,000 elements, Native Arrays, Queues, and Stacks provide excellent performance.
- Medium Data: Up to 10,000 elements, use AVL Tree for balanced tree operations and Min/Max Heap for priority-based insert/extract operations.
- Large Data: At 100,000 elements, consider using B-Trees or Red-Black Trees for optimized insertion and search performance.
- Extra Large Data: Beyond 1,000,000 elements, B-Trees, with their balanced and efficient nature, are superior for handling large datasets, especially for search and delete operations.

### Algorithms Benchmarks

┌─────────┬──────────────────────┬───────────┬─────────┬───────────────────────┐
│ (index) │ algorithm            │ operation │ size    │ time (ms)             │
├─────────┼──────────────────────┼───────────┼─────────┼───────────────────────┤
│ 0       │ 'Heap Sort'          │ 'Sort'    │ 1000    │ 1.1343749999999773    │
│ 1       │ 'Merge Sort'         │ 'Sort'    │ 1000    │ 0.6769580000000133    │
│ 2       │ 'Tim Sort'           │ 'Sort'    │ 1000    │ 0.5847079999999778    │
│ 3       │ 'Native Sort'        │ 'Sort'    │ 1000    │ 0.14208299999995688   │
│ 4       │ 'Binary Search'      │ 'Search'  │ 1000    │ 0.027791999999976724  │
│ 5       │ 'Exponential Search' │ 'Search'  │ 1000    │ 0.02650000000005548   │
│ 6       │ 'Hybrid Search'      │ 'Search'  │ 1000    │ 0.03766700000005585   │
│ 7       │ 'Linear Search'      │ 'Search'  │ 1000    │ 0.02174999999999727   │
│ 8       │ 'Ternary Search'     │ 'Search'  │ 1000    │ 0.025875000000041837  │
│ 9       │ 'Heap Sort'          │ 'Sort'    │ 10000   │ 2.6921250000000327    │
│ 10      │ 'Merge Sort'         │ 'Sort'    │ 10000   │ 3.4184999999999945    │
│ 11      │ 'Tim Sort'           │ 'Sort'    │ 10000   │ 2.1582500000000664    │
│ 12      │ 'Native Sort'        │ 'Sort'    │ 10000   │ 1.2180829999999787    │
│ 13      │ 'Binary Search'      │ 'Search'  │ 10000   │ 0.0049999999999954525 │
│ 14      │ 'Exponential Search' │ 'Search'  │ 10000   │ 0.006209000000012566  │
│ 15      │ 'Hybrid Search'      │ 'Search'  │ 10000   │ 3.510458999999969     │
│ 16      │ 'Linear Search'      │ 'Search'  │ 10000   │ 0.0740409999999656    │
│ 17      │ 'Ternary Search'     │ 'Search'  │ 10000   │ 0.00666599999999562   │
│ 18      │ 'Heap Sort'          │ 'Sort'    │ 100000  │ 18.31458400000008     │
│ 19      │ 'Merge Sort'         │ 'Sort'    │ 100000  │ 24.663625000000025    │
│ 20      │ 'Tim Sort'           │ 'Sort'    │ 100000  │ 12.391457999999943    │
│ 21      │ 'Native Sort'        │ 'Sort'    │ 100000  │ 15.627165999999988    │
│ 22      │ 'Binary Search'      │ 'Search'  │ 100000  │ 0.01999999999998181   │
│ 23      │ 'Exponential Search' │ 'Search'  │ 100000  │ 0.1084170000000313    │
│ 24      │ 'Hybrid Search'      │ 'Search'  │ 100000  │ 30.412333000000103    │
│ 25      │ 'Linear Search'      │ 'Search'  │ 100000  │ 0.6435000000000173    │
│ 26      │ 'Ternary Search'     │ 'Search'  │ 100000  │ 0.010750000000030013  │
│ 27      │ 'Heap Sort'          │ 'Sort'    │ 1000000 │ 272.6623330000001     │
│ 28      │ 'Merge Sort'         │ 'Sort'    │ 1000000 │ 246.91945899999996    │
│ 29      │ 'Tim Sort'           │ 'Sort'    │ 1000000 │ 140.54433300000005    │
│ 30      │ 'Native Sort'        │ 'Sort'    │ 1000000 │ 184.8578329999998     │
│ 31      │ 'Binary Search'      │ 'Search'  │ 1000000 │ 0.027083999999831576  │
│ 32      │ 'Exponential Search' │ 'Search'  │ 1000000 │ 0.7834170000000995    │
│ 33      │ 'Hybrid Search'      │ 'Search'  │ 1000000 │ 375.9163330000001     │
│ 34      │ 'Linear Search'      │ 'Search'  │ 1000000 │ 0.6445420000000013    │
│ 35      │ 'Ternary Search'     │ 'Search'  │ 1000000 │ 0.00937500000009095   │
└─────────┴──────────────────────┴───────────┴─────────┴───────────────────────┘

**Sorting Algorithms:**
- Heap Sort: Ideal for priority queues and constrained memory environments.
- Merge Sort: Best for linked lists and large datasets on disk where stable sorting is needed.
- Tim Sort: Great for real-time systems and partially sorted data, widely used in production environments.
- Native Sort: Versatile for general-purpose sorting with built-in optimization.

**Searching Algorithms:**
- Binary Search: Perfect for quick lookups in large, sorted datasets (e.g., databases).
- Exponential Search: Useful for unbounded or sparse datasets to find a starting range for binary search.
- Hybrid Search: Adapts well to changing dataset sizes, ideal for large applications and databases.
- Linear Search: Suited for small, unsorted datasets where search is infrequent.
- Ternary Search: Good for distinct, ordered data ranges, often in optimization or game algorithms.

## 🚀 Getting Started

### Prerequisites
Make sure you have [pnpm](https://pnpm.io/) installed as it’s used for package management in this project.

### Installation

To install the DSA Toolbox, clone the repository and install dependencies with pnpm:

```bash
# Clone the repository
git clone https://github.com/helabenkhalfallah/dsa-toolbox.git

# Navigate into the project directory
cd dsa-toolbox

# Install dependencies
pnpm install
```

### Scripts

- **Build**: `pnpm build:tsc` - Compiles TypeScript files to JavaScript.
- **Development**: `pnpm start:dev` - Runs the project in development mode with auto-reloading.
- **Linting**: `pnpm lint` - Checks code for linting errors.
- **Lint Fix**: `pnpm lint:fix` - Fixes linting issues automatically.
- **Format**: `pnpm format` - Formats code using Prettier.
- **Testing**: `pnpm test` - Runs the test suite.
- **Test Watch**: `pnpm test:watch` - Runs tests in watch mode.
- **Test UI**: `pnpm test:ui` - Opens the test UI.

## 🛠️ Usage

To install the DSA Toolbox:
```bash
pnpm add dsa-toolbox 
```

Then you can import the Data Structure or the Algorithm you want to use:

```typescript
import {
  binarySearch,
  exponentialSearch,
  hybridSearch,
  linearSearch,
  ternarySearch,
  heapSort,
  mergeSort,
  timSort,
  LFUCache,
  LRUCache,
  MaxHeap,
  MinHeap,
  DoublyLinkedList,
  LinkedList,
  HyperLogLog,
  CountMinSketch,
  BloomFilter,
  SkipList,
  TDigest,
  MinHash,
  SimHash,
  Queue,
  Stack,
  Treap,
  AVLTree,
  BTree,
  BinarySearchTree,
  RedBlackTree,
  Trie,
} from 'dsa-toolbox';

// Example: Using binary search
const index = binarySearch([1, 2, 3, 4, 5], 3, (a, b) => a - b);
console.log(`Element found at index: ${index}`);

// Example: Initializing a MaxHeap
const maxHeap = new MaxHeap<number>();
maxHeap.insert(10);
maxHeap.insert(5);
console.log(`Max element: ${maxHeap.extractMax()}`);
```

## 📚 Documentation & References

For detailed explanations of each data structure and algorithm, please visit:

- [Trees in Data Structures: More than Just Wood](https://helabenkhalfallah.com/2024/10/11/trees-in-data-structures-more-than-just-wood/)
- [Heaps: Beyond First-Come-First-Served Queue Wizard](https://helabenkhalfallah.com/2024/10/14/heaps-beyond-first-come-first-served-queue-wizard/)
- [Yet Another Way to Balance BSTs: The Treaps Approach](https://helabenkhalfallah.com/2024/10/28/yet-another-way-to-balance-bsts-the-treaps-approach/)
- [The Secret Life of Caches: A Deep Dive into LRU and LFU](https://helabenkhalfallah.com/2024/11/01/the-secret-life-of-caches-a-deep-dive-into-lru-and-lfu/)
- [Probabilistic Data Structures for Large Data Challenges](https://helabenkhalfallah.com/2024/11/03/probabilistic-data-structures-for-large-data-challenges/)

---

Happy coding with the DSA Toolbox! 🎉
