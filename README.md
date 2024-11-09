
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

| (index) | dataStructure        | operation         | size    | time (ms)          |
|---------|----------------------|-------------------|---------|--------------------|
| 0       | Native Array         | Insert            | 1000    | 0.0042             |
| 1       | Native Array         | Search            | 1000    | 0.0015             |
| 2       | Native Array         | Delete            | 1000    | 0.0008             |
| 3       | Queue                | Insert (Enqueue)  | 1000    | 0.1306             |
| 4       | Queue                | Delete (Dequeue)  | 1000    | 0.1355             |
| 5       | Stack                | Insert (Push)     | 1000    | 0.1216             |
| 6       | Stack                | Delete (Pop)      | 1000    | 0.1128             |
| 7       | Binary Search Tree   | Insert            | 1000    | 0.3302             |
| 8       | Binary Search Tree   | Search            | 1000    | 0.0431             |
| 9       | Binary Search Tree   | Delete            | 1000    | 0.0308             |
| 10      | Red-Black Tree       | Insert            | 1000    | 0.8018             |
| 11      | Red-Black Tree       | Search            | 1000    | 0.0202             |
| 12      | Red-Black Tree       | Delete            | 1000    | 0.0791             |
| 13      | AVL Tree             | Insert            | 1000    | 0.6278             |
| 14      | AVL Tree             | Search            | 1000    | 0.0117             |
| 15      | AVL Tree             | Delete            | 1000    | 0.0189             |
| 16      | Trie                 | Insert            | 1000    | 0.3451             |
| 17      | Trie                 | Search            | 1000    | 0.0157             |
| 18      | Trie                 | Delete            | 1000    | 0.0184             |
| 19      | Min Heap             | Insert            | 1000    | 0.1854             |
| 20      | Min Heap             | Extract           | 1000    | 0.3252             |
| 21      | Max Heap             | Insert            | 1000    | 0.1810             |
| 22      | Max Heap             | Extract           | 1000    | 0.3187             |
| 23      | B-Tree               | Insert            | 1000    | 0.4755             |
| 24      | B-Tree               | Search            | 1000    | 0.0155             |
| 25      | B-Tree               | Delete            | 1000    | 0.0783             |
| 26      | Native Array         | Insert            | 10000   | 0.1975             |
| 27      | Native Array         | Search            | 10000   | 0.0025             |
| 28      | Native Array         | Delete            | 10000   | 0.0007             |
| 29      | Queue                | Insert (Enqueue)  | 10000   | 0.2820             |
| 30      | Queue                | Delete (Dequeue)  | 10000   | 0.1872             |
| 31      | Stack                | Insert (Push)     | 10000   | 0.1817             |
| 32      | Stack                | Delete (Pop)      | 10000   | 0.1647             |
| 33      | Binary Search Tree   | Insert            | 10000   | 1.6758             |
| 34      | Binary Search Tree   | Search            | 10000   | 0.0039             |
| 35      | Binary Search Tree   | Delete            | 10000   | 0.0036             |
| 36      | Red-Black Tree       | Insert            | 10000   | 3.0843             |
| 37      | Red-Black Tree       | Search            | 10000   | 0.0051             |
| 38      | Red-Black Tree       | Delete            | 10000   | 0.0178             |
| 39      | AVL Tree             | Insert            | 10000   | 1.7637             |
| 40      | AVL Tree             | Search            | 10000   | 0.0028             |
| 41      | AVL Tree             | Delete            | 10000   | 0.0040             |
| 42      | Trie                 | Insert            | 10000   | 1.2017             |
| 43      | Trie                 | Search            | 10000   | 0.0059             |
| 44      | Trie                 | Delete            | 10000   | 0.0045             |
| 45      | Min Heap             | Insert            | 10000   | 0.4538             |
| 46      | Min Heap             | Extract           | 10000   | 0.8098             |
| 47      | Max Heap             | Insert            | 10000   | 0.3135             |
| 48      | Max Heap             | Extract           | 10000   | 0.7455             |
| 49      | B-Tree               | Insert            | 10000   | 2.5483             |
| 50      | B-Tree               | Search            | 10000   | 0.0098             |
| 51      | B-Tree               | Delete            | 10000   | 0.0772             |
| 52      | Native Array         | Insert            | 100000  | 0.1380             |
| 53      | Native Array         | Search            | 100000  | 0.0166             |
| 54      | Native Array         | Delete            | 100000  | 0.0010             |
| 55      | Queue                | Insert (Enqueue)  | 100000  | 1.9742             |
| 56      | Queue                | Delete (Dequeue)  | 100000  | 0.3029             |
| 57      | Stack                | Insert (Push)     | 100000  | 0.7822             |
| 58      | Stack                | Delete (Pop)      | 100000  | 0.1848             |
| 59      | Binary Search Tree   | Insert            | 100000  | 20.2091            |
| 60      | Binary Search Tree   | Search            | 100000  | 0.0126             |
| 61      | Binary Search Tree   | Delete            | 100000  | 0.0031             |
| 62      | Red-Black Tree       | Insert            | 100000  | 95.1039            |
| 63      | Red-Black Tree       | Search            | 100000  | 0.0193             |
| 64      | Red-Black Tree       | Delete            | 100000  | 0.0112             |
| 65      | AVL Tree             | Insert            | 100000  | 29.1355            |
| 66      | AVL Tree             | Search            | 100000  | 0.0110             |
| 67      | AVL Tree             | Delete            | 100000  | 0.0036             |
| 68      | Trie                 | Insert            | 100000  | 33.3004            |
| 69      | Trie                 | Search            | 100000  | 0.0455             |
| 70      | Trie                 | Delete            | 100000  | 0.0880             |
| 71      | Min Heap             | Insert            | 100000  | 4.6971             |
| 72      | Min Heap             | Extract           | 100000  | 9.8937             |
| 73      | Max Heap             | Insert            | 100000  | 3.2794             |
| 74      | Max Heap             | Extract           | 100000  | 9.2720             |
| 75      | B-Tree               | Insert            | 100000  | 50.4755            |
| 76      | B-Tree               | Search            | 100000  | 0.0125             |
| 77      | B-Tree               | Delete            | 100000  | 0.0196             |
| 78      | Native Array         | Insert            | 1000000 | 2.0249             |
| 79      | Native Array         | Search            | 1000000 | 0.1391             |
| 80      | Native Array         | Delete            | 1000000 | 0.000              |

**Suggested Applications:**
- Small Data: For datasets around 1,000 elements, Native Arrays, Queues, and Stacks provide excellent performance.
- Medium Data: Up to 10,000 elements, use AVL Tree for balanced tree operations and Min/Max Heap for priority-based insert/extract operations.
- Large Data: At 100,000 elements, consider using B-Trees or Red-Black Trees for optimized insertion and search performance.
- Extra Large Data: Beyond 1,000,000 elements, B-Trees, with their balanced and efficient nature, are superior for handling large datasets, especially for search and delete operations.

### Algorithms Benchmarks

| (index) | algorithm            | operation | size     | time (ms)     |
|---------|----------------------|-----------|----------|---------------|
| 0       | Heap Sort            | Sort      | 1000     | 1.1344        |
| 1       | Merge Sort           | Sort      | 1000     | 0.6770        |
| 2       | Tim Sort             | Sort      | 1000     | 0.5847        |
| 3       | Native Sort          | Sort      | 1000     | 0.1421        |
| 4       | Binary Search        | Search    | 1000     | 0.0278        |
| 5       | Exponential Search   | Search    | 1000     | 0.0265        |
| 6       | Hybrid Search        | Search    | 1000     | 0.0377        |
| 7       | Linear Search        | Search    | 1000     | 0.0218        |
| 8       | Ternary Search       | Search    | 1000     | 0.0259        |
| 9       | Heap Sort            | Sort      | 10000    | 2.6921        |
| 10      | Merge Sort           | Sort      | 10000    | 3.4185        |
| 11      | Tim Sort             | Sort      | 10000    | 2.1583        |
| 12      | Native Sort          | Sort      | 10000    | 1.2181        |
| 13      | Binary Search        | Search    | 10000    | 0.0050        |
| 14      | Exponential Search   | Search    | 10000    | 0.0062        |
| 15      | Hybrid Search        | Search    | 10000    | 3.5105        |
| 16      | Linear Search        | Search    | 10000    | 0.0740        |
| 17      | Ternary Search       | Search    | 10000    | 0.0067        |
| 18      | Heap Sort            | Sort      | 100000   | 18.3146       |
| 19      | Merge Sort           | Sort      | 100000   | 24.6636       |
| 20      | Tim Sort             | Sort      | 100000   | 12.3915       |
| 21      | Native Sort          | Sort      | 100000   | 15.6272       |
| 22      | Binary Search        | Search    | 100000   | 0.0200        |
| 23      | Exponential Search   | Search    | 100000   | 0.1084        |
| 24      | Hybrid Search        | Search    | 100000   | 30.4123       |
| 25      | Linear Search        | Search    | 100000   | 0.6435        |
| 26      | Ternary Search       | Search    | 100000   | 0.0108        |
| 27      | Heap Sort            | Sort      | 1000000  | 272.6623      |
| 28      | Merge Sort           | Sort      | 1000000  | 246.9195      |
| 29      | Tim Sort             | Sort      | 1000000  | 140.5443      |
| 30      | Native Sort          | Sort      | 1000000  | 184.8578      |
| 31      | Binary Search        | Search    | 1000000  | 0.0271        |
| 32      | Exponential Search   | Search    | 1000000  | 0.7834        |
| 33      | Hybrid Search        | Search    | 1000000  | 375.9163      |
| 34      | Linear Search        | Search    | 1000000  | 0.6445        |
| 35      | Ternary Search       | Search    | 1000000  | 0.0094        |

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

## 🚀 Contributing

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


## 📚 Documentation & References

For detailed explanations of each data structure and algorithm, please visit:

- [Trees in Data Structures: More than Just Wood](https://helabenkhalfallah.com/2024/10/11/trees-in-data-structures-more-than-just-wood/)
- [Heaps: Beyond First-Come-First-Served Queue Wizard](https://helabenkhalfallah.com/2024/10/14/heaps-beyond-first-come-first-served-queue-wizard/)
- [Yet Another Way to Balance BSTs: The Treaps Approach](https://helabenkhalfallah.com/2024/10/28/yet-another-way-to-balance-bsts-the-treaps-approach/)
- [The Secret Life of Caches: A Deep Dive into LRU and LFU](https://helabenkhalfallah.com/2024/11/01/the-secret-life-of-caches-a-deep-dive-into-lru-and-lfu/)
- [Probabilistic Data Structures for Large Data Challenges](https://helabenkhalfallah.com/2024/11/03/probabilistic-data-structures-for-large-data-challenges/)

---

## Code coverage

| File                                       | % Stmts | % Branch | % Funcs | % Lines | Uncovered Line #s                                                                          |
|--------------------------------------------|---------|----------|---------|---------|--------------------------------------------------------------------------------------------|
| All files                                  | 90.84   | 90.44    | 96.34   | 90.84   |                                                                                            |
| algorithms/search                          | 96.9    | 92.85    | 100     | 96.9    |                                                                                            |
| BinarySearch.ts                            | 100     | 100      | 100     | 100     |                                                                                            |
| ExponentialSearch.ts                       | 100     | 87.5     | 100     | 100     | 70                                                                                         |
| HybridSearch.ts                            | 93.33   | 87.5     | 100     | 93.33   | 121-122                                                                                    |
| LinearSearch.ts                            | 100     | 100      | 100     | 100     |                                                                                            |
| TernarySearch.ts                           | 96      | 92.3     | 100     | 96      | 82                                                                                         |
| algorithms/sort                            | 99.44   | 95.23    | 100     | 99.44   |                                                                                            |
| HeapSort.ts                                | 100     | 100      | 100     | 100     |                                                                                            |
| MergeSort.ts                               | 100     | 100      | 100     | 100     |                                                                                            |
| TimSort.ts                                 | 99.24   | 93.47    | 100     | 99.24   | 128                                                                                        |
| commons                                    | 85.71   | 100      | 75      | 85.71   |                                                                                            |
| ComparableNode.ts                          | 85.71   | 100      | 75      | 85.71   | 50-51                                                                                      |
| data-structures/cache                      | 100     | 94.59    | 100     | 100     |                                                                                            |
| LFU.ts                                     | 100     | 90.9     | 100     | 100     | 75,148                                                                                     |
| LRU.ts                                     | 100     | 100      | 100     | 100     |                                                                                            |
| data-structures/heaps                      | 97.14   | 93.87    | 88.88   | 97.14   |                                                                                            |
| MaxHeap.ts                                 | 97.14   | 96       | 88.88   | 97.14   | 138-139                                                                                    |
| MinHeap.ts                                 | 97.14   | 91.66    | 88.88   | 97.14   | 139-140                                                                                    |
| data-structures/linked-list                | 97.04   | 89.06    | 100     | 97.04   |                                                                                            |
| DoublyLinkedList.ts                        | 95.65   | 88.57    | 100     | 95.65   | 87-89,91                                                                                   |
| LinkedList.ts                              | 98.7    | 89.65    | 100     | 98.7    | 75                                                                                         |
| data-structures/probabilistic/cardinality  | 84.61   | 87.5     | 87.5    | 84.61   |                                                                                            |
| HyperLogLog.ts                             | 84.61   | 87.5     | 87.5    | 84.61   | 61-63,75-81                                                                                |
| data-structures/probabilistic/frequency    | 100     | 100      | 100     | 100     |                                                                                            |
| CountMinSketch.ts                          | 100     | 100      | 100     | 100     |                                                                                            |
| data-structures/probabilistic/membership   | 100     | 100      | 100     | 100     |                                                                                            |
| BloomFilter.ts                             | 100     | 100      | 100     | 100     |                                                                                            |
| data-structures/probabilistic/ordered      | 97.87   | 97.22    | 100     | 97.87   |                                                                                            |
| SkipList.ts                                | 97.87   | 97.22    | 100     | 97.87   | 102-103                                                                                    |
| data-structures/probabilistic/quantile     | 97.97   | 91.42    | 100     | 97.97   |                                                                                            |
| TDigest.ts                                 | 97.97   | 91.42    | 100     | 97.97   | 61,85                                                                                      |
| data-structures/probabilistic/similarity   | 100     | 100      | 100     | 100     |                                                                                            |
| MinHash.ts                                 | 100     | 100      | 100     | 100     |                                                                                            |
| SimHash.ts                                 | 100     | 100      | 100     | 100     |                                                                                            |
| data-structures/queue                      | 100     | 100      | 100     | 100     |                                                                                            |
| Queue.ts                                   | 100     | 100      | 100     | 100     |                                                                                            |
| data-structures/stack                      | 100     | 100      | 100     | 100     |                                                                                            |
| Stack.ts                                   | 100     | 100      | 100     | 100     |                                                                                            |
| data-structures/treaps                     | 82.41   | 88.88    | 92.85   | 82.41   |                                                                                            |
| Treap.ts                                   | 82.41   | 88.88    | 92.85   | 82.41   | 84-85,111-115,163,168-176                                                                  |
| data-structures/trees/avl                  | 90.62   | 84.31    | 100     | 90.62   |                                                                                            |
| AVLTree.ts                                 | 90.62   | 84.31    | 100     | 90.62   | 118-119,169,196-198,201-203                                                                |
| data-structures/trees/b-tree               | 68.71   | 75       | 76.47   | 68.71   |                                                                                            |
| BTree.ts                                   | 68.71   | 75       | 76.47   | 68.71   | 67,114-115,119-120,146-147,169-171,182-192,203-208,220-221,232-243,252-261,270-279,294-295 |
| data-structures/trees/bst                  | 93.4    | 93.61    | 100     | 93.4    |                                                                                            |
| BinarySearchTree.ts                        | 93.4    | 93.61    | 100     | 93.4    | 132-134,137-139                                                                            |
| data-structures/trees/red-black            | 76.07   | 81.81    | 100     | 76.07   |                                                                                            |
| RedBlackTree.ts                            | 76.07   | 81.81    | 100     | 76.07   | 107-114,274,278-279,318-344,347-373,379,395-396,398-399,442-443                            |
| data-structures/trees/trie                 | 100     | 96       | 100     | 100     |                                                                                            |
| Trie.ts                                    | 100     | 96       | 100     | 100     | 89                                                                                         |

Happy coding with the DSA Toolbox! 🎉
