import { performance } from 'perf_hooks';

import {
    AVLTree,
    BTree,
    BinarySearchTree,
    MaxHeap,
    MinHeap,
    Queue,
    RedBlackTree,
    Stack,
    Trie,
} from './src/index.ts';

const DATA_SIZES = {
    SMALL: 1000,
    MEDIUM: 10000,
    LARGE: 100000,
    EXTRA_LARGE: 1000000,
};

type BenchmarkResult = {
    dataStructure: string;
    operation: string;
    size: number;
    time: number;
};

function generateData(size: number): number[] {
    return Array.from({ length: size }, () => Math.floor(Math.random() * size));
}

function benchmarkNativeArray(data: number[], size: number): BenchmarkResult[] {
    const results: BenchmarkResult[] = [];

    const startInsert = performance.now();
    data.push(size + 1);
    results.push({
        dataStructure: 'Native Array',
        operation: 'Insert',
        size,
        time: performance.now() - startInsert,
    });

    const startSearch = performance.now();
    data.includes(size / 2);
    results.push({
        dataStructure: 'Native Array',
        operation: 'Search',
        size,
        time: performance.now() - startSearch,
    });

    const startDelete = performance.now();
    data.pop();
    results.push({
        dataStructure: 'Native Array',
        operation: 'Delete',
        size,
        time: performance.now() - startDelete,
    });

    return results;
}

function benchmarkQueue(data: number[], size: number): BenchmarkResult[] {
    const queue = new Queue<number>();
    const results: BenchmarkResult[] = [];

    const startInsert = performance.now();
    data.forEach((item) => queue.enqueue(item));
    results.push({
        dataStructure: 'Queue',
        operation: 'Insert (Enqueue)',
        size,
        time: performance.now() - startInsert,
    });

    const startDelete = performance.now();
    while (!queue.isEmpty()) {
        queue.dequeue();
    }
    results.push({
        dataStructure: 'Queue',
        operation: 'Delete (Dequeue)',
        size,
        time: performance.now() - startDelete,
    });

    return results;
}

function benchmarkStack(data: number[], size: number): BenchmarkResult[] {
    const stack = new Stack<number>();
    const results: BenchmarkResult[] = [];

    const startInsert = performance.now();
    data.forEach((item) => stack.push(item));
    results.push({
        dataStructure: 'Stack',
        operation: 'Insert (Push)',
        size,
        time: performance.now() - startInsert,
    });

    const startDelete = performance.now();
    while (!stack.isEmpty()) {
        stack.pop();
    }
    results.push({
        dataStructure: 'Stack',
        operation: 'Delete (Pop)',
        size,
        time: performance.now() - startDelete,
    });

    return results;
}

function benchmarkHeap(
    heapInstance: { insert: (value: number) => void; extract: () => number | null },
    data: number[],
    size: number,
    name: string,
): BenchmarkResult[] {
    const results: BenchmarkResult[] = [];

    const startInsert = performance.now();
    data.forEach((item) => heapInstance.insert(item));
    results.push({
        dataStructure: name,
        operation: 'Insert',
        size,
        time: performance.now() - startInsert,
    });

    const startExtract = performance.now();
    while (heapInstance.extract() !== null) {
        // Extract all elements
    }
    results.push({
        dataStructure: name,
        operation: 'Extract',
        size,
        time: performance.now() - startExtract,
    });

    return results;
}

function benchmarkTreeStructures<T>(
    Tree: new () => {
        insert: (value: T) => void;
        delete: (value: T) => void;
        search: (value: T) => boolean;
    },
    data: T[],
    size: number,
    name: string,
): BenchmarkResult[] {
    const tree = new Tree();
    const results: BenchmarkResult[] = [];

    const startInsert = performance.now();
    data.forEach((item) => tree.insert(item));
    results.push({
        dataStructure: name,
        operation: 'Insert',
        size,
        time: performance.now() - startInsert,
    });

    const startSearch = performance.now();
    tree.search(data[Math.floor(size / 2)]);
    results.push({
        dataStructure: name,
        operation: 'Search',
        size,
        time: performance.now() - startSearch,
    });

    const startDelete = performance.now();
    tree.delete(data[Math.floor(size / 2)]);
    results.push({
        dataStructure: name,
        operation: 'Delete',
        size,
        time: performance.now() - startDelete,
    });

    return results;
}

function runBenchmarks() {
    const allResults: BenchmarkResult[] = [];

    for (const [, size] of Object.entries(DATA_SIZES)) {
        const data = generateData(size);

        allResults.push(...benchmarkNativeArray([...data], size));
        allResults.push(...benchmarkQueue([...data], size));
        allResults.push(...benchmarkStack([...data], size));
        allResults.push(
            ...benchmarkTreeStructures(BinarySearchTree, data, size, 'Binary Search Tree'),
        );
        allResults.push(...benchmarkTreeStructures(RedBlackTree, data, size, 'Red-Black Tree'));
        allResults.push(...benchmarkTreeStructures(AVLTree, data, size, 'AVL Tree'));
        allResults.push(...benchmarkTreeStructures(Trie, data.map(String), size, 'Trie'));

        // Separate benchmarks for MinHeap and MaxHeap
        allResults.push(...benchmarkHeap(new MinHeap<number>(), data, size, 'Min Heap'));
        allResults.push(...benchmarkHeap(new MaxHeap<number>(), data, size, 'Max Heap'));

        // Special case for BTree (requires additional constructor parameters)
        const btree = new BTree<number>(3, (a, b) => a - b);
        const startInsertBTree = performance.now();
        data.forEach((item) => btree.insert(item));
        allResults.push({
            dataStructure: 'B-Tree',
            operation: 'Insert',
            size,
            time: performance.now() - startInsertBTree,
        });

        const startSearchBTree = performance.now();
        btree.search(data[Math.floor(size / 2)]);
        allResults.push({
            dataStructure: 'B-Tree',
            operation: 'Search',
            size,
            time: performance.now() - startSearchBTree,
        });

        const startDeleteBTree = performance.now();
        btree.delete(data[Math.floor(size / 2)]);
        allResults.push({
            dataStructure: 'B-Tree',
            operation: 'Delete',
            size,
            time: performance.now() - startDeleteBTree,
        });
    }

    return allResults;
}

// Run the benchmark and log the results
const benchmarkResults = runBenchmarks();
console.table(benchmarkResults);
