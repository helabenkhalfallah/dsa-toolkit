
# DSA Toolkit 📚

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

## 🚀 Getting Started

### Prerequisites
Make sure you have [pnpm](https://pnpm.io/) installed as it’s used for package management in this project.

### Installation

To install the DSA Toolkit, clone the repository and install dependencies with pnpm:

```bash
# Clone the repository
git clone https://github.com/helabenkhalfallah/dsa-toolkit.git

# Navigate into the project directory
cd dsa-toolkit

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

To install the DSA Toolkit:
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

Happy coding with the DSA Toolkit! 🎉
