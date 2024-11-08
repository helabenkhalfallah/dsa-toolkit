/* eslint-disable @typescript-eslint/no-explicit-any,@typescript-eslint/no-unused-vars,max-lines */
import { binarySearch } from './algorithms/search/BinarySearch.ts';
import { exponentialSearch } from './algorithms/search/ExponentialSearch.ts';
import { hybridSearch } from './algorithms/search/HybridSearch.ts';
import { linearSearch } from './algorithms/search/LinearSearch.ts';
import { ternarySearch } from './algorithms/search/TernarySearch.ts';
import { heapSort } from './algorithms/sort/HeapSort.ts';
import { mergeSort } from './algorithms/sort/MergeSort.ts';
import { timSort } from './algorithms/sort/TimSort.ts';
import { LFUCache } from './data-structures/cache/LFU.ts';
import { LRUCache } from './data-structures/cache/LRU.ts';
import { MaxHeap } from './data-structures/heaps/MaxHeap.ts';
import { MinHeap } from './data-structures/heaps/MinHeap.ts';
import { DoublyLinkedList } from './data-structures/linked-list/DoublyLinkedList.ts';
import { LinkedList } from './data-structures/linked-list/LinkedList.ts';
import { HyperLogLog } from './data-structures/probabilistic/cardinality/HyperLogLog.ts';
import { CountMinSketch } from './data-structures/probabilistic/frequency/CountMinSketch.ts';
import { BloomFilter } from './data-structures/probabilistic/membership/BloomFilter.ts';
import { SkipList } from './data-structures/probabilistic/ordered/SkipList.ts';
import { TDigest } from './data-structures/probabilistic/quantile/TDigest.ts';
import { MinHash } from './data-structures/probabilistic/similarity/MinHash.ts';
import { SimHash } from './data-structures/probabilistic/similarity/SimHash.ts';
import { Queue } from './data-structures/queue/Queue.ts';
import { Stack } from './data-structures/stack/Stack.ts';
import { Treap } from './data-structures/treaps/Treap.ts';
import { AVLTree } from './data-structures/trees/avl/AVLTree.ts';
import { BTree } from './data-structures/trees/b-tree/BTree.ts';
import { BinarySearchTree } from './data-structures/trees/bst/BinarySearchTree.ts';
import { RedBlackTree } from './data-structures/trees/red-black/RedBlackTree.ts';
import { Trie } from './data-structures/trees/trie/Trie.ts';
import { measureTime } from './utils/PerformanceUtils.ts';

// Dataset configurations
const SMALL_DATA = 100;
const MEDIUM_DATA = 1000;
const LARGE_DATA = 10000;
const HUGE_DATA = 100000;

// Operation cases
const BEST_CASE = 'Best';
const AVERAGE_CASE = 'Average';
const WORST_CASE = 'Worst';

/**
 * Generates random data for testing.
 * @param {number} size - The size of the dataset to generate.
 * @returns {any[]} The generated dataset.
 */

function generateNumberData(size: number): any[] {
    return Array.from({ length: size }, () => Math.floor(Math.random() * size));
}

/**
 * Generates random data for testing.
 * @param {number} size - The size of the dataset to generate.
 * @returns {any[]} The generated dataset.
 */

function generateStringData(size: number): any[] {
    return Array.from({ length: size }, () => Math.random().toString(36).substring(2, 7));
}

/**
 * Generates random object data for testing.
 * Each object contains an `id`, `name`, and `value` field.
 * @param {number} size - The number of objects to generate.
 * @returns {any[]} The generated dataset of objects.
 */
function generateObjectData(size: number): any[] {
    return Array.from({ length: size }, (_, index) => ({
        id: index + 1,
        name: Math.random().toString(36).substring(2, 7),
        value: Math.floor(Math.random() * 100),
    }));
}

// General comparison function that supports strings, numbers, and custom objects with 'value' property
const compareFn = (a: any, b: any): number => {
    if (typeof a === 'string' && typeof b === 'string') {
        return a.localeCompare(b);
    } else if (typeof a === 'number' && typeof b === 'number') {
        return a - b;
    } else if (typeof a === 'object' && typeof b === 'object' && 'value' in a && 'value' in b) {
        return (a.value as number) - (b.value as number);
    }

    throw new TypeError('Unsupported data type for comparison');
};

/**
 * Runs benchmarks for various data structures.
 * @param {number} dataSize - The size of the data set.
 * @param {string} operationCase - The operation case for the benchmark (Best, Average, Worst).
 */
function runFoundationBenchmark(dataSize: number, operationCase: string) {
    const data = generateNumberData(dataSize);
    const bst = new BinarySearchTree<number>();
    const avlTree = new AVLTree<number>();
    const rbTree = new RedBlackTree<number>();
    const linkedList = new LinkedList<number>();
    const doublyLinkedList = new DoublyLinkedList<number>();
    const bTree = new BTree<number>(3);
    const array: number[] = [];

    // Initialize data structures with the initial data set
    data.forEach((value) => {
        bst.insert(value);
        avlTree.insert(value);
        rbTree.insert(value);
        linkedList.insert(value);
        doublyLinkedList.insert(value);
        bTree.insert(value);
        array.push(value);
    });

    console.log(`\n=== Benchmark for Data Size: ${dataSize}, Case: ${operationCase} ===`);

    // INSERTION
    console.log(`\n--- Insert Benchmark ---`);
    const valueToInsert = operationCase === WORST_CASE ? dataSize + 1 : Math.floor(dataSize / 2);

    console.log(
        'Array Insert:',
        measureTime(() => array.push(valueToInsert)),
        'ms',
    );
    console.log(
        'BST Insert:',
        measureTime(() => bst.insert(valueToInsert)),
        'ms',
    );
    console.log(
        'AVL Insert:',
        measureTime(() => avlTree.insert(valueToInsert)),
        'ms',
    );
    console.log(
        'Red-Black Insert:',
        measureTime(() => rbTree.insert(valueToInsert)),
        'ms',
    );
    console.log(
        'Linked List Insert:',
        measureTime(() => linkedList.insert(valueToInsert)),
        'ms',
    );
    console.log(
        'Doubly Linked List Insert:',
        measureTime(() => doublyLinkedList.insert(valueToInsert)),
        'ms',
    );
    console.log(
        'B-Tree Insert:',
        measureTime(() => bTree.insert(valueToInsert)),
        'ms',
    );

    // READ (Access first, middle, or last element based on the case)
    console.log(`\n--- Read Benchmark ---`);
    const indexToRead =
        operationCase === BEST_CASE
            ? 0
            : operationCase === WORST_CASE
              ? dataSize - 1
              : Math.floor(dataSize / 2);
    console.log(`\n---Index To Read: ${indexToRead} ---`);

    console.log(
        'Array Read:',
        measureTime(() => array[indexToRead]),
        'ms',
    );
    console.log(
        'Linked List Read:',
        measureTime(() => linkedList.getAt(indexToRead)),
        'ms',
    );
    console.log(
        'Doubly Linked List Read:',
        measureTime(() => doublyLinkedList.getAt(indexToRead)),
        'ms',
    );

    // SEARCH
    console.log(`\n--- Search Benchmark ---`);
    const valueToSearch =
        operationCase === BEST_CASE
            ? data[0]
            : operationCase === WORST_CASE
              ? data[dataSize - 1]
              : data[Math.floor(dataSize / 2)];
    console.log(`\n---Value To Search: ${valueToSearch} ---`);

    console.log(
        'Array Search:',
        measureTime(() => array.includes(valueToSearch)),
        'ms',
    );
    console.log(
        'BST Search:',
        measureTime(() => bst.search(valueToSearch)),
        'ms',
    );
    console.log(
        'AVL Search:',
        measureTime(() => avlTree.search(valueToSearch)),
        'ms',
    );
    console.log(
        'Red-Black Search:',
        measureTime(() => rbTree.search(valueToSearch)),
        'ms',
    );
    console.log(
        'Linked List Search:',
        measureTime(() => linkedList.search(valueToSearch)),
        'ms',
    );
    console.log(
        'Doubly Linked List Search:',
        measureTime(() => doublyLinkedList.search(valueToSearch)),
        'ms',
    );
    console.log(
        'B-Tree Search:',
        measureTime(() => bTree.search(valueToSearch)),
        'ms',
    );

    // DELETE
    console.log(`\n--- Delete Benchmark ---`);
    const valueToDelete =
        operationCase === BEST_CASE
            ? data[0]
            : operationCase === WORST_CASE
              ? data[dataSize - 1]
              : data[Math.floor(dataSize / 2)];
    console.log(`\n---Value To Delete: ${valueToDelete} ---`);

    console.log(
        'Array Delete:',
        measureTime(() => {
            const index = array.indexOf(valueToDelete);
            if (index > -1) array.splice(index, 1);
        }),
        'ms',
    );
    console.log(
        'BST Delete:',
        measureTime(() => bst.delete(valueToDelete)),
        'ms',
    );
    console.log(
        'AVL Delete:',
        measureTime(() => avlTree.delete(valueToDelete)),
        'ms',
    );
    console.log(
        'Red-Black Delete:',
        measureTime(() => rbTree.delete(valueToDelete)),
        'ms',
    );
    console.log(
        'Linked List Delete:',
        measureTime(() => linkedList.delete(valueToDelete)),
        'ms',
    );
    console.log(
        'Doubly Linked List Delete:',
        measureTime(() => doublyLinkedList.delete(valueToDelete)),
        'ms',
    );
    console.log(
        'B-Tree Delete:',
        measureTime(() => bTree.delete(valueToDelete)),
        'ms',
    );
}

/**
 * Runs benchmarks for array-specific operations.
 * @param {number} dataSize - The size of the data set.
 */
function runArrayBenchmark(dataSize: number) {
    const data = generateNumberData(dataSize);
    console.log(`\n=== Array Benchmark for Data Size: ${dataSize}`);

    // Insert Benchmark (Push to the end of the array)
    const arrayInsertTime = measureTime(() => {
        data.push(dataSize + 1);
    });
    console.log('Array Insert (Push to end):', arrayInsertTime, 'ms');

    // Read Benchmark (Access first element)
    const arrayReadTime = measureTime(() => {
        const _ = data[0];
    });
    console.log('Array Read (First element):', arrayReadTime, 'ms');

    // Search Benchmark (Linear search for a random element)
    const valueToSearch = data[Math.floor(dataSize / 2)];
    const arraySearchTime = measureTime(() => {
        data.includes(valueToSearch);
    });
    console.log('Array Search (Includes):', arraySearchTime, 'ms');

    // Delete Benchmark (Remove last element)
    const arrayDeleteTime = measureTime(() => {
        data.pop();
    });
    console.log('Array Delete (Pop from end):', arrayDeleteTime, 'ms');

    // For Loop Benchmark
    const arrayForTime = measureTime(() => {
        for (let i = 0; i < data.length; i++) {
            const _ = data[i];
        }
    });
    console.log('Array For Loop:', arrayForTime, 'ms');

    // Map Benchmark
    const arrayMapTime = measureTime(() => {
        data.map((x) => x * 2);
    });
    console.log('Array Map:', arrayMapTime, 'ms');

    // Filter Benchmark (Filtering values greater than half the dataset size)
    const threshold = dataSize / 2;
    const arrayFilterTime = measureTime(() => {
        data.filter((x) => x > threshold);
    });
    console.log('Array Filter (Values > threshold):', arrayFilterTime, 'ms');

    // Sort Benchmark
    const arraySortTime = measureTime(() => {
        [...data].sort((a, b) => a - b); // Clone array to prevent mutation
    });
    console.log('Array Sort:', arraySortTime, 'ms');
}

/**
 * Runs benchmarks comparing Trie and Array operations.
 * @param {number} dataSize - The size of the dataset to generate.
 * @param {string} operationCase - The case for the benchmark (Best, Average, Worst).
 */
function runTrieArrayComparisonBenchmark(dataSize: number, operationCase: string) {
    const data = generateStringData(dataSize); // Generate string data
    const trie = new Trie();
    const array: string[] = [];

    // Initialize Trie and Array with the initial data set
    data.forEach((value) => {
        trie.insert(value);
        array.push(value);
    });

    console.log(
        `\n=== Trie vs. Array Benchmark for Data Size: ${dataSize}, Case: ${operationCase} ===`,
    );

    // INSERTION
    console.log(`\n--- Insert Benchmark ---`);
    const valueToInsert = operationCase === WORST_CASE ? 'worstValue' : 'middleValue';

    console.log(
        'Trie Insert:',
        measureTime(() => trie.insert(valueToInsert)),
        'ms',
    );

    console.log(
        'Array Insert (Push to end):',
        measureTime(() => array.push(valueToInsert)),
        'ms',
    );

    // SEARCH
    console.log(`\n--- Search Benchmark ---`);
    const valueToSearch =
        operationCase === BEST_CASE
            ? data[0]
            : operationCase === WORST_CASE
              ? data[dataSize - 1]
              : data[Math.floor(dataSize / 2)];
    console.log(`\n---Value To Search: ${valueToSearch} ---`);

    console.log(
        'Trie Search:',
        measureTime(() => trie.search(valueToSearch)),
        'ms',
    );

    console.log(
        'Array Search (Includes):',
        measureTime(() => array.includes(valueToSearch)),
        'ms',
    );

    // DELETE
    console.log(`\n--- Delete Benchmark ---`);
    const valueToDelete =
        operationCase === BEST_CASE
            ? data[0]
            : operationCase === WORST_CASE
              ? data[dataSize - 1]
              : data[Math.floor(dataSize / 2)];
    console.log(`\n---Value To Delete: ${valueToDelete} ---`);

    console.log(
        'Trie Delete:',
        measureTime(() => trie.delete(valueToDelete)),
        'ms',
    );

    console.log(
        'Array Delete (Find and Splice):',
        measureTime(() => {
            const index = array.indexOf(valueToDelete);
            if (index > -1) array.splice(index, 1);
        }),
        'ms',
    );
}

/**
 * Runs benchmarks for Queue and Stack operations.
 * @param {number} dataSize - The size of the data set to use for benchmarking.
 */
function runQueueStackBenchmark(dataSize: number) {
    console.log(`\n=== Queue and Stack Benchmark for Data Size: ${dataSize} ===`);

    const data = Array.from({ length: dataSize }, (_, i) => `item-${i}`);
    const queue = new Queue<string>();
    const stack = new Stack<string>();

    // Initialize Queue and Stack with initial data set
    data.forEach((value) => {
        queue.enqueue(value);
        stack.push(value);
    });

    // Queue and Stack Insert Benchmark
    console.log(`\n--- Insert Benchmark ---`);
    const valueToInsert = `item-${dataSize + 1}`;

    console.log(
        'Queue Enqueue:',
        measureTime(() => queue.enqueue(valueToInsert)),
        'ms',
    );
    console.log(
        'Stack Push:',
        measureTime(() => stack.push(valueToInsert)),
        'ms',
    );

    // Queue and Stack Peek (Read) Benchmark
    console.log(`\n--- Read Benchmark ---`);
    console.log(
        'Queue Peek:',
        measureTime(() => queue.peek()),
        'ms',
    );
    console.log(
        'Stack Peek:',
        measureTime(() => stack.peek()),
        'ms',
    );

    // Queue and Stack Delete Benchmark
    console.log(`\n--- Delete Benchmark ---`);
    console.log(
        'Queue Dequeue:',
        measureTime(() => queue.dequeue()),
        'ms',
    );
    console.log(
        'Stack Pop:',
        measureTime(() => stack.pop()),
        'ms',
    );
}

/**
 * Runs benchmarks for the Treap data structure.
 * @param {number} dataSize - The size of the dataset.
 * @param {string} operationCase - The case for benchmarking (Best, Average, Worst).
 */
function runTreapBenchmark(dataSize: number, operationCase: string) {
    console.log(`\n=== Treap Benchmark for Data Size: ${dataSize}, Case: ${operationCase} ===`);

    const data = Array.from({ length: dataSize }, (_, i) => `item-${i}`);
    const treap = new Treap<string>();

    // Initialize Treap with initial data set
    data.forEach((value) => treap.insert(value, Math.floor(Math.random() * dataSize)));

    // Insert Benchmark
    console.log(`\n--- Insert Benchmark ---`);
    const valueToInsert = `item-${dataSize + 1}`;
    const priorityToInsert = Math.floor(Math.random() * dataSize);

    console.log(
        'Treap Insert:',
        measureTime(() => treap.insert(valueToInsert, priorityToInsert)),
        'ms',
    );

    // Search Benchmark
    console.log(`\n--- Search Benchmark ---`);
    const valueToSearch =
        operationCase === 'Best'
            ? data[0]
            : operationCase === 'Worst'
              ? data[dataSize - 1]
              : data[Math.floor(dataSize / 2)];

    console.log(
        `Treap Search for "${valueToSearch}":`,
        measureTime(() => treap.search(valueToSearch)),
        'ms',
    );

    // Delete Benchmark
    console.log(`\n--- Delete Benchmark ---`);
    const valueToDelete =
        operationCase === 'Best'
            ? data[0]
            : operationCase === 'Worst'
              ? data[dataSize - 1]
              : data[Math.floor(dataSize / 2)];

    console.log(
        `Treap Delete for "${valueToDelete}":`,
        measureTime(() => treap.delete(valueToDelete)),
        'ms',
    );
}

/**
 * Runs a benchmark for the Heap data structure.
 *
 * @param {number} dataSize - The size of the dataset.
 * @param {string} operationCase - The case for benchmarking (Best, Average, Worst).
 */
function runHeapBenchmark(dataSize: number, operationCase: string): void {
    const data = generateNumberData(dataSize);
    const maxHeap = new MaxHeap<number>();
    const minHeap = new MinHeap<number>();
    const array: number[] = [];

    // Initialize heaps and array with the initial data set
    data.forEach((value) => {
        maxHeap.insert(value);
        minHeap.insert(value);
        array.push(value);
    });

    console.log(`\n=== Heap Benchmark for Data Size: ${dataSize}, Case: ${operationCase} ===`);

    // INSERTION
    console.log(`\n--- Insert Benchmark ---`);
    const valueToInsert = operationCase === 'Worst' ? dataSize + 1 : Math.floor(dataSize / 2);
    console.log(
        'MaxHeap Insert:',
        measureTime(() => maxHeap.insert(valueToInsert)),
        'ms',
    );
    console.log(
        'MinHeap Insert:',
        measureTime(() => minHeap.insert(valueToInsert)),
        'ms',
    );
    console.log(
        'Array Insert:',
        measureTime(() => array.push(valueToInsert)),
        'ms',
    );

    // READ (Access root)
    console.log(`\n--- Read Benchmark ---`);
    console.log(
        'MaxHeap Read (Root):',
        measureTime(() => maxHeap.root),
        'ms',
    );
    console.log(
        'MinHeap Read (Root):',
        measureTime(() => minHeap.root),
        'ms',
    );
    console.log(
        'Array Read (First element):',
        measureTime(() => array[0]),
        'ms',
    );

    // SEARCH (Heap doesn't support direct access, simulating search)
    console.log(`\n--- Search Benchmark ---`);
    const valueToSearch =
        operationCase === 'Best'
            ? data[0]
            : operationCase === 'Worst'
              ? data[dataSize - 1]
              : data[Math.floor(dataSize / 2)];
    console.log(
        'MaxHeap Search (Simulated):',
        measureTime(() => maxHeap.extractMax() === valueToSearch),
        'ms',
    );
    console.log(
        'MinHeap Search (Simulated):',
        measureTime(() => minHeap.extractMin() === valueToSearch),
        'ms',
    );
    console.log(
        'Array Search:',
        measureTime(() => array.includes(valueToSearch)),
        'ms',
    );

    // DELETE
    console.log(`\n--- Delete Benchmark ---`);
    const valueToDelete =
        operationCase === 'Best'
            ? data[0]
            : operationCase === 'Worst'
              ? data[dataSize - 1]
              : data[Math.floor(dataSize / 2)];
    console.log(
        'MaxHeap Delete:',
        measureTime(() => maxHeap.extractMax()),
        'ms',
    );
    console.log(
        'MinHeap Delete:',
        measureTime(() => minHeap.extractMin()),
        'ms',
    );
    console.log(
        'Array Delete:',
        measureTime(() => {
            const index = array.indexOf(valueToDelete);
            if (index > -1) array.splice(index, 1);
        }),
        'ms',
    );
}

/**
 * Runs a benchmark for the LFU Cache operations.
 *
 * @param {number} dataSize - The size of the dataset.
 * @param {string} operationCase - The case for benchmarking (Best, Average, Worst).
 */
function runLFUCacheBenchmark(dataSize: number, operationCase: string): void {
    const lfuCache = new LFUCache<number, number>(dataSize);

    console.log(`\n=== LFU Cache Benchmark for Data Size: ${dataSize}, Case: ${operationCase} ===`);

    // INSERTION
    console.log(`\n--- Insert Benchmark ---`);
    const insertTime = measureTime(() => {
        for (let i = 0; i < dataSize; i++) {
            lfuCache.put(i, i); // Inserting items
        }
    });
    console.log('LFU Cache Insert:', insertTime, 'ms');

    // SEARCH
    console.log(`\n--- Search Benchmark ---`);
    const searchTime = measureTime(() => {
        for (let i = 0; i < dataSize; i++) {
            lfuCache.get(i); // Accessing items
        }
    });
    console.log('LFU Cache Search:', searchTime, 'ms');

    // DELETE (Evict least frequently used)
    console.log(`\n--- Delete Benchmark ---`);
    const keysToDelete = Array.from({ length: Math.floor(dataSize / 2) }, (_, i) => i); // Simulate deleting half
    keysToDelete.forEach((key) => lfuCache.get(key)); // Access to increase frequency
    const deleteTime = measureTime(() => {
        keysToDelete.forEach((key) => lfuCache.put(key + dataSize, key + dataSize)); // Adding new items
    });
    console.log('LFU Cache Delete:', deleteTime, 'ms');
}

/**
 * Runs benchmark tests for the LRU Cache.
 *
 * @param {number} dataSize - The size of the data to be used in benchmarks.
 * @param {string} operationCase - The operation case to test (Best, Average, Worst).
 */
function runLRUCacheBenchmark(dataSize: number, operationCase: string) {
    const lruCache = new LRUCache<number>(dataSize);
    const data = generateNumberData(dataSize); // Assume this function generates data for testing

    console.log(
        `\n=== Benchmark for LRU Cache - Data Size: ${dataSize}, Case: ${operationCase} ===`,
    );

    // INSERTION
    console.log(`\n--- Insert Benchmark ---`);
    const valueToInsert = operationCase === WORST_CASE ? dataSize + 1 : Math.floor(dataSize / 2);
    console.log(
        'LRU Cache Insert:',
        measureTime(() => lruCache.put(valueToInsert, valueToInsert)),
        'ms',
    );

    // READ (Access first, middle, or last element based on the case)
    console.log(`\n--- Read Benchmark ---`);
    const keyToRead =
        operationCase === BEST_CASE
            ? data[0]
            : operationCase === WORST_CASE
              ? data[dataSize - 1]
              : data[Math.floor(dataSize / 2)];
    console.log(
        'LRU Cache Read:',
        measureTime(() => lruCache.get(keyToRead)),
        'ms',
    );

    // DELETE (simulate deletion by putting a new key, which would replace the least recently used)
    console.log(`\n--- Delete Benchmark ---`);
    const keyToDelete =
        operationCase === BEST_CASE
            ? data[0]
            : operationCase === WORST_CASE
              ? data[dataSize - 1]
              : data[Math.floor(dataSize / 2)];
    console.log(
        'LRU Cache Delete:',
        measureTime(() => lruCache.put(keyToDelete, -1)), // Setting a value of -1 to indicate deletion
        'ms',
    );
}

/**
 * Runs benchmarks for different search algorithms.
 * @param {number} dataSize - The size of the dataset to generate.
 * @param {string} operationCase - The case for the benchmark (Best, Average, Worst).
 */
function runSearchBenchmark(dataSize: number, operationCase: string) {
    const data = generateObjectData(dataSize); // Generate sorted data for best case
    const targetValue =
        operationCase === 'Best'
            ? data[0]
            : operationCase === 'Worst'
              ? data[dataSize - 1]
              : data[Math.floor(dataSize / 2)];
    console.log(
        `\n=== Linear Search Benchmark for Data Size: ${dataSize}, Case: ${operationCase} ===`,
    );
    const linearSearchTime = measureTime(() => {
        const index = linearSearch(data, targetValue, compareFn);
        console.log(`Found target ${targetValue} at index: ${index}`);
    });
    console.log('Linear Search Time:', linearSearchTime, 'ms');

    console.log(
        `\n=== Default JS Find Benchmark for Data Size: ${dataSize}, Case: ${operationCase} ===`,
    );
    const defaultFindTime = measureTime(() => {
        const foundValue = data.find((value) => value === targetValue);
        console.log(`Found value: ${foundValue}`);
    });
    console.log('Default JS Find Time:', defaultFindTime, 'ms');

    console.log(
        `\n=== Default JS Filter Benchmark for Data Size: ${dataSize}, Case: ${operationCase} ===`,
    );
    const defaultFilterTime = measureTime(() => {
        const filteredValues = data.filter((value) => value === targetValue);
        console.log(`Filtered values: ${filteredValues}`);
    });
    console.log('Default JS Filter Time:', defaultFilterTime, 'ms');

    // Benchmark binary search
    console.log(
        `\n=== Binary Search Benchmark for Data Size: ${dataSize}, Case: ${operationCase} ===`,
    );
    const binarySearchTime = measureTime(() => {
        const index = binarySearch([...data], targetValue, {
            compareFn,
            isSorted: false,
        });
        console.log(`Binary search found target ${targetValue} at index: ${index}`);
    });
    console.log('Binary Search Time:', binarySearchTime, 'ms');

    // Benchmark exponential search
    console.log(
        `\n=== Exponential Search Benchmark for Data Size: ${dataSize}, Case: ${operationCase} ===`,
    );
    const exponentialSearchTime = measureTime(() => {
        const index = exponentialSearch([...data], targetValue, {
            compareFn,
            isSorted: false,
        });
        console.log(`Exponential search found target ${targetValue} at index: ${index}`);
    });
    console.log('Exponential Search Time:', exponentialSearchTime, 'ms');

    // Benchmark ternary search
    console.log(
        `\n=== Ternary Search Benchmark for Data Size: ${dataSize}, Case: ${operationCase} ===`,
    );
    const ternarySearchTime = measureTime(() => {
        const index = ternarySearch([...data], targetValue, 0, data.length - 1, {
            compareFn,
            isSorted: false,
        });
        console.log(`Found target ${targetValue} at index: ${index}`);
    });
    console.log('Ternary Search Time:', ternarySearchTime, 'ms');

    // Benchmark hybrid search
    console.log(
        `\n=== Hybrid Search Benchmark for Data Size: ${dataSize}, Case: ${operationCase} ===`,
    );
    const hybridSearchTime = measureTime(() => {
        const index = hybridSearch([...data], targetValue, {
            linearSearchThreshold: 100,
            binarySearchThreshold: 1000,
            compareFn,
        });
        console.log(`Hybrid Search found target ${targetValue} at index: ${index}`);
    });
    console.log('Hybrid Search Time:', hybridSearchTime, 'ms');
}

/**
 * Sorts an array of numbers or strings using bucket counting and a comparison function.
 *
 * @param {(number|string)[]} arr - The array to sort.
 * @param {(a: any, b: any) => number} compareFn - Comparison function to define the sort order.
 * @returns {(number|string)[]} The sorted array.
 */
function linearSort(
    arr: (number | string)[],
    compareFn: (a: any, b: any) => number = (a, b) => a - b,
): (number | string)[] {
    if (arr.length === 0) return []; // Early return for empty array

    // Step 1: Use a Map to count occurrences
    const countMap = new Map<number | string, number>();
    for (const item of arr) {
        countMap.set(item, (countMap.get(item) || 0) + 1);
    }

    // Step 2: Extract keys (unique items) and sort them using compareFn
    const sortedKeys = Array.from(countMap.keys()).sort(compareFn);

    // Step 3: Reconstruct the sorted array using the sorted keys and their counts
    const sorted: (number | string)[] = [];
    for (const key of sortedKeys) {
        const count = countMap.get(key) || 0;
        for (let i = 0; i < count; i++) {
            sorted.push(key);
        }
    }

    return sorted;
}

/**
 * Runs benchmarks for different sorting algorithms.
 * @param {number} dataSize - The size of the dataset to generate.
 * @param {string} operationCase - The case for the benchmark (Best, Average, Worst).
 */
function runSortBenchmark(dataSize: number, operationCase: string) {
    const data = generateStringData(dataSize); // Generate sorted data for best case

    // heap sort
    console.log(`\n=== Heap Sort Benchmark for Data Size: ${dataSize}, Case: ${operationCase} ===`);
    const heapSortTime = measureTime(() => {
        heapSort([...data], compareFn);
    });
    console.log('Heap Sort Time:', heapSortTime, 'ms');

    // merge sort
    console.log(
        `\n=== Merge Sort Benchmark for Data Size: ${dataSize}, Case: ${operationCase} ===`,
    );
    const mergeSortTime = measureTime(() => {
        mergeSort([...data], compareFn);
    });
    console.log('Merge Sort Time:', mergeSortTime, 'ms');

    // tim sort
    console.log(`\n=== Tim Sort Benchmark for Data Size: ${dataSize}, Case: ${operationCase} ===`);
    const timSortTime = measureTime(() => {
        timSort([...data], compareFn, {
            minGallop: 9,
        });
    });
    console.log('Tim Sort Time:', timSortTime, 'ms');

    // linear sort
    console.log(
        `\n=== Linear Sort Benchmark for Data Size: ${dataSize}, Case: ${operationCase} ===`,
    );
    const linearSortTime = measureTime(() => {
        linearSort([...data], compareFn);
    });
    console.log('Linear Sort Time:', linearSortTime, 'ms');

    // default array sort
    console.log(
        `\n=== Default JS Sort Benchmark for Data Size: ${dataSize}, Case: ${operationCase} ===`,
    );
    const defaultSortTime = measureTime(() => {
        [...data].sort(compareFn);
    });
    console.log('Default JS Sort Time:', defaultSortTime, 'ms');
}

/************************************* Deterministic DSA *************************************/

// Run the benchmark for different dataset sizes and cases
[SMALL_DATA, MEDIUM_DATA, LARGE_DATA, HUGE_DATA].forEach((dataSize) => {
    [BEST_CASE, AVERAGE_CASE, WORST_CASE].forEach((operationCase) => {
        runFoundationBenchmark(dataSize, operationCase);
    });
});

// Run the benchmark for different dataset sizes
[SMALL_DATA, MEDIUM_DATA, LARGE_DATA, HUGE_DATA].forEach((dataSize) => {
    runArrayBenchmark(dataSize);
});

// Run the Trie vs Array benchmark for different dataset sizes and cases
[SMALL_DATA, MEDIUM_DATA, LARGE_DATA, HUGE_DATA].forEach((dataSize) => {
    [BEST_CASE, AVERAGE_CASE, WORST_CASE].forEach((operationCase) => {
        runTrieArrayComparisonBenchmark(dataSize, operationCase);
    });
});

// Run the Treap benchmark for different dataset sizes and cases
[SMALL_DATA, MEDIUM_DATA, LARGE_DATA, HUGE_DATA].forEach((dataSize) => {
    [BEST_CASE, AVERAGE_CASE, WORST_CASE].forEach((operationCase) => {
        runTreapBenchmark(dataSize, operationCase);
    });
});

// Run the benchmark for different dataset sizes
[SMALL_DATA, MEDIUM_DATA, LARGE_DATA, HUGE_DATA].forEach((dataSize) => {
    runQueueStackBenchmark(dataSize);
});

// Run the benchmark for different dataset sizes and cases
[SMALL_DATA, MEDIUM_DATA, LARGE_DATA, HUGE_DATA].forEach((dataSize) => {
    [BEST_CASE, AVERAGE_CASE, WORST_CASE].forEach((operationCase) => {
        runHeapBenchmark(dataSize, operationCase);
    });
});

// Run the benchmark for different dataset sizes and cases
[SMALL_DATA, MEDIUM_DATA, LARGE_DATA, HUGE_DATA].forEach((dataSize) => {
    [BEST_CASE, AVERAGE_CASE, WORST_CASE].forEach((operationCase) => {
        runLFUCacheBenchmark(dataSize, operationCase);
    });
});

// Run the benchmark for different dataset sizes and cases for LRU Cache
[SMALL_DATA, MEDIUM_DATA, LARGE_DATA, HUGE_DATA].forEach((dataSize) => {
    [BEST_CASE, AVERAGE_CASE, WORST_CASE].forEach((operationCase) => {
        runLRUCacheBenchmark(dataSize, operationCase);
    });
});

// Run the benchmark for different dataset sizes and cases
[SMALL_DATA, MEDIUM_DATA, LARGE_DATA, HUGE_DATA].forEach((dataSize) => {
    [BEST_CASE, AVERAGE_CASE, WORST_CASE].forEach((operationCase) => {
        runSortBenchmark(dataSize, operationCase);
    });
});

// Run the benchmark for different dataset sizes and cases
[SMALL_DATA, MEDIUM_DATA, LARGE_DATA, HUGE_DATA].forEach((dataSize) => {
    [BEST_CASE, AVERAGE_CASE, WORST_CASE].forEach((operationCase) => {
        runSearchBenchmark(dataSize, operationCase);
    });
});

/************************************* Probabilistic DSA *************************************/

/**
 * Runs a benchmark for the HyperLogLog data structure.
 * @param {number} dataSize - The number of elements to add to the HyperLogLog.
 */
function runHyperLogLogBenchmark(dataSize: number) {
    const hll = new HyperLogLog(14); // Using 14 bits for 16384 registers
    const data = generateStringData(dataSize); // Assuming this function generates random strings

    console.log(`\n=== HyperLogLog Benchmark for Data Size: ${dataSize} ===`);

    // INSERTION
    console.log(`\n--- Insert Benchmark ---`);
    const insertTime = measureTime(() => {
        data.forEach((value) => hll.add(value));
    });
    console.log('HyperLogLog Insert:', insertTime, 'ms');

    // ESTIMATE
    console.log(`\n--- Estimate Benchmark ---`);
    const estimateTime = measureTime(() => {
        const estimate = hll.estimate();
        console.log('Estimated distinct count:', estimate);
    });
    console.log('HyperLogLog Estimate:', estimateTime, 'ms');
}

/**
 * Runs benchmarks for the Count-Min Sketch data structure.
 * @param {number} dataSize - The size of the dataset.
 * @param {string} operationCase - The case for benchmarking (Best, Average, Worst).
 */
function runCountMinSketchBenchmark(dataSize: number, operationCase: string) {
    const data = generateNumberData(dataSize); // Generate data
    const countMinSketch = new CountMinSketch(100, 5); // Create Count-Min Sketch instance

    console.log(
        `\n=== Count-Min Sketch Benchmark for Data Size: ${dataSize}, Case: ${operationCase} ===`,
    );

    // INSERTION
    console.log(`\n--- Insert Benchmark ---`);
    const insertTime = measureTime(() => {
        data.forEach((value) => countMinSketch.add(value));
    });
    console.log('Count-Min Sketch Insert:', insertTime, 'ms');

    // ESTIMATION
    console.log(`\n--- Estimate Benchmark ---`);
    const valueToEstimate = data[Math.floor(dataSize / 2)];
    const estimateTime = measureTime(() => {
        const estimateResult = countMinSketch.estimate(valueToEstimate);
        console.log(`Estimate for ${valueToEstimate}:`, estimateResult);
    });
    console.log('Count-Min Sketch Estimate:', estimateTime, 'ms');
}

/**
 * Runs benchmarks for the Bloom Filter data structure.
 * @param {number} dataSize - The size of the dataset.
 * @param {string} operationCase - The case for benchmarking (Best, Average, Worst).
 */
function runBloomFilterBenchmark(dataSize: number, operationCase: string) {
    const data = generateNumberData(dataSize); // Generate data
    const bloomFilter = new BloomFilter(1000, 5); // Create Bloom Filter instance

    console.log(
        `\n=== Bloom Filter Benchmark for Data Size: ${dataSize}, Case: ${operationCase} ===`,
    );

    // INSERTION
    console.log(`\n--- Insert Benchmark ---`);
    const insertTime = measureTime(() => {
        data.forEach((value) => bloomFilter.add(value));
    });
    console.log('Bloom Filter Insert:', insertTime, 'ms');

    // MIGHT CONTAIN
    console.log(`\n--- Might Contain Benchmark ---`);
    const valueToCheck = data[Math.floor(dataSize / 2)];
    const mightContainTime = measureTime(() => {
        const mightContainResult = bloomFilter.mightContain(valueToCheck);
        console.log(`Might contain ${valueToCheck}:`, mightContainResult);
    });
    console.log('Bloom Filter Might Contain:', mightContainTime, 'ms');
}

/**
 * Runs benchmarks for the Skip List data structure.
 * @param {number} dataSize - The size of the dataset.
 * @param {string} operationCase - The case for benchmarking (Best, Average, Worst).
 */
function runSkipListBenchmark(dataSize: number, operationCase: string) {
    const data = generateNumberData(dataSize); // Generate data
    const skipList = new SkipList<number>(4); // Create Skip List instance

    console.log(`\n=== Skip List Benchmark for Data Size: ${dataSize}, Case: ${operationCase} ===`);

    // INSERTION
    console.log(`\n--- Insert Benchmark ---`);
    const insertTime = measureTime(() => {
        data.forEach((value) => skipList.insert(value));
    });
    console.log('Skip List Insert:', insertTime, 'ms');

    // SEARCH
    console.log(`\n--- Search Benchmark ---`);
    const valueToSearch = data[Math.floor(dataSize / 2)];
    const searchTime = measureTime(() => {
        const searchResult = skipList.search(valueToSearch);
        console.log(`Search for ${valueToSearch}:`, searchResult);
    });
    console.log('Skip List Search:', searchTime, 'ms');

    // DELETE
    console.log(`\n--- Delete Benchmark ---`);
    const valueToDelete = data[Math.floor(dataSize / 2)];
    const deleteTime = measureTime(() => {
        skipList.delete(valueToDelete);
        console.log(`Delete ${valueToDelete}:`);
    });
    console.log('Skip List Delete:', deleteTime, 'ms');
}

/**
 * Runs benchmarks for the t-Digest data structure.
 * @param {number} dataSize - The size of the dataset.
 * @param {string} operationCase - The case for benchmarking (Best, Average, Worst).
 */
function runTDigestBenchmark(dataSize: number, operationCase: string) {
    const data = generateNumberData(dataSize); // Generate random data
    const tDigest = new TDigest(); // Create t-Digest instance

    console.log(`\n=== t-Digest Benchmark for Data Size: ${dataSize}, Case: ${operationCase} ===`);

    // INSERTION
    console.log(`\n--- Insert Benchmark ---`);
    const insertTime = measureTime(() => {
        data.forEach((value) => tDigest.add(value));
    });
    console.log('t-Digest Insert:', insertTime, 'ms');

    // QUANTILE ESTIMATION
    console.log(`\n--- Quantile Benchmark ---`);
    const quantileToEstimate = 0.5; // Estimate the median
    const quantileTime = measureTime(() => {
        const estimatedQuantile = tDigest.quantile(quantileToEstimate);
        console.log(`Estimate for quantile ${quantileToEstimate}:`, estimatedQuantile);
    });
    console.log('t-Digest Quantile:', quantileTime, 'ms');
}

/**
 * Runs benchmarks for the MinHash data structure.
 * @param {number} dataSize - The size of the dataset.
 * @param {string} operationCase - The case for benchmarking (Best, Average, Worst).
 */
function runMinHashBenchmark(dataSize: number, operationCase: string) {
    const data = generateNumberData(dataSize);
    const minHash = new MinHash(128); // Create MinHash instance with 128 hash functions

    console.log(`\n=== MinHash Benchmark for Data Size: ${dataSize}, Case: ${operationCase} ===`);

    // INSERTION
    console.log(`\n--- Insert Benchmark ---`);
    const insertTime = measureTime(() => {
        minHash.add(new Set(data));
    });
    console.log('MinHash Insert:', insertTime, 'ms');

    // JACCARD SIMILARITY ESTIMATION
    const otherMinHash = new MinHash(128);
    otherMinHash.add(new Set(data)); // Add the same data for similarity
    console.log(`\n--- Jaccard Similarity Benchmark ---`);
    const similarityTime = measureTime(() => {
        const similarity = minHash.jaccardSimilarity(otherMinHash);
        console.log('MinHash Jaccard Similarity:', similarity);
    });
    console.log('MinHash Similarity Calculation:', similarityTime, 'ms');
}

/**
 * Runs benchmarks for the SimHash data structure.
 * @param {number} dataSize - The size of the dataset.
 * @param {string} operationCase - The case for benchmarking (Best, Average, Worst).
 */
function runSimHashBenchmark(dataSize: number, operationCase: string) {
    const data = generateNumberData(dataSize);
    const simHash = new SimHash(); // Create SimHash instance

    console.log(`\n=== SimHash Benchmark for Data Size: ${dataSize}, Case: ${operationCase} ===`);

    // INSERTION
    console.log(`\n--- Insert Benchmark ---`);
    const insertTime = measureTime(() => {
        simHash.add(new Set(data));
    });
    console.log('SimHash Insert:', insertTime, 'ms');

    // HAMMING DISTANCE ESTIMATION
    const otherSimHash = new SimHash();
    otherSimHash.add(new Set(data)); // Add the same data for comparison
    console.log(`\n--- Hamming Distance Benchmark ---`);
    const distanceTime = measureTime(() => {
        const distance = simHash.hammingDistance(otherSimHash);
        console.log('SimHash Hamming Distance:', distance);
    });
    console.log('SimHash Distance Calculation:', distanceTime, 'ms');
}

/*
// Run the benchmark for different dataset sizes and cases for HyperLogLog
[SMALL_DATA, MEDIUM_DATA, LARGE_DATA, HUGE_DATA].forEach((dataSize) => {
    runHyperLogLogBenchmark(dataSize);
});

// Run the benchmark for different dataset sizes and cases
[SMALL_DATA, MEDIUM_DATA, LARGE_DATA, HUGE_DATA].forEach((dataSize) => {
    [BEST_CASE, AVERAGE_CASE, WORST_CASE].forEach((operationCase) => {
        runCountMinSketchBenchmark(dataSize, operationCase);
    });
});

// Run the benchmark for different dataset sizes and cases
[SMALL_DATA, MEDIUM_DATA, LARGE_DATA, HUGE_DATA].forEach((dataSize) => {
    [BEST_CASE, AVERAGE_CASE, WORST_CASE].forEach((operationCase) => {
        runBloomFilterBenchmark(dataSize, operationCase);
    });
});

// Run the benchmark for different dataset sizes and cases
[SMALL_DATA, MEDIUM_DATA, LARGE_DATA, HUGE_DATA].forEach((dataSize) => {
    [BEST_CASE, AVERAGE_CASE, WORST_CASE].forEach((operationCase) => {
        runSkipListBenchmark(dataSize, operationCase);
    });
});

// Run the benchmark for different dataset sizes and cases
[SMALL_DATA, MEDIUM_DATA, LARGE_DATA, HUGE_DATA].forEach((dataSize) => {
    [BEST_CASE, AVERAGE_CASE, WORST_CASE].forEach((operationCase) => {
        runTDigestBenchmark(dataSize, operationCase);
    });
});

// Run the benchmark for different dataset sizes and cases
[SMALL_DATA, MEDIUM_DATA, LARGE_DATA, HUGE_DATA].forEach((dataSize) => {
    [BEST_CASE, AVERAGE_CASE, WORST_CASE].forEach((operationCase) => {
        runMinHashBenchmark(dataSize, operationCase);
    });
});

// Run the benchmark for different dataset sizes and cases
[SMALL_DATA, MEDIUM_DATA, LARGE_DATA, HUGE_DATA].forEach((dataSize) => {
    [BEST_CASE, AVERAGE_CASE, WORST_CASE].forEach((operationCase) => {
        runSimHashBenchmark(dataSize, operationCase);
    });
});
*/
