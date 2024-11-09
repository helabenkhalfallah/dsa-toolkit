import { performance } from 'perf_hooks';

import {
    binarySearch,
    exponentialSearch,
    heapSort,
    hybridSearch,
    linearSearch,
    mergeSort,
    ternarySearch,
    timSort,
} from './src/index.ts';

const DATA_SIZES = {
    SMALL: 1000,
    MEDIUM: 10000,
    LARGE: 100000,
    EXTRA_LARGE: 1000000,
};

type BenchmarkResult = {
    algorithm: string;
    operation: string;
    size: number;
    time: number;
};

function generateData(size: number): number[] {
    return Array.from({ length: size }, () => Math.floor(Math.random() * size));
}

function benchmarkSortAlgorithms(data: number[], size: number): BenchmarkResult[] {
    const results: BenchmarkResult[] = [];

    const startHeapSort = performance.now();
    heapSort([...data], (a, b) => a - b);
    results.push({
        algorithm: 'Heap Sort',
        operation: 'Sort',
        size,
        time: performance.now() - startHeapSort,
    });

    const startMergeSort = performance.now();
    mergeSort([...data], (a, b) => a - b);
    results.push({
        algorithm: 'Merge Sort',
        operation: 'Sort',
        size,
        time: performance.now() - startMergeSort,
    });

    const startTimSort = performance.now();
    timSort([...data], (a, b) => a - b);
    results.push({
        algorithm: 'Tim Sort',
        operation: 'Sort',
        size,
        time: performance.now() - startTimSort,
    });

    const startNativeSort = performance.now();
    [...data].sort((a, b) => a - b);
    results.push({
        algorithm: 'Native Sort',
        operation: 'Sort',
        size,
        time: performance.now() - startNativeSort,
    });

    return results;
}

function benchmarkSearchAlgorithms(
    data: number[],
    target: number,
    size: number,
): BenchmarkResult[] {
    const results: BenchmarkResult[] = [];

    // Ensure data is sorted for binary search variants
    const sortedData = [...data].sort((a, b) => a - b);

    const startBinarySearch = performance.now();
    binarySearch(sortedData, target, { compareFn: (a, b) => a - b, isSorted: true });
    results.push({
        algorithm: 'Binary Search',
        operation: 'Search',
        size,
        time: performance.now() - startBinarySearch,
    });

    const startExponentialSearch = performance.now();
    exponentialSearch(sortedData, target, { compareFn: (a, b) => a - b, isSorted: true });
    results.push({
        algorithm: 'Exponential Search',
        operation: 'Search',
        size,
        time: performance.now() - startExponentialSearch,
    });

    const startHybridSearch = performance.now();
    hybridSearch(sortedData, target, { compareFn: (a, b) => a - b, isSorted: true });
    results.push({
        algorithm: 'Hybrid Search',
        operation: 'Search',
        size,
        time: performance.now() - startHybridSearch,
    });

    const startLinearSearch = performance.now();
    linearSearch(data, target, (a, b) => a - b);
    results.push({
        algorithm: 'Linear Search',
        operation: 'Search',
        size,
        time: performance.now() - startLinearSearch,
    });

    const startTernarySearch = performance.now();
    ternarySearch(sortedData, target, 0, sortedData.length - 1, {
        compareFn: (a, b) => a - b,
        isSorted: true,
    });
    results.push({
        algorithm: 'Ternary Search',
        operation: 'Search',
        size,
        time: performance.now() - startTernarySearch,
    });

    return results;
}

function runBenchmarks(): BenchmarkResult[] {
    const allResults: BenchmarkResult[] = [];

    for (const [, size] of Object.entries(DATA_SIZES)) {
        const data = generateData(size);
        const target = data[Math.floor(Math.random() * size)];

        // Sorting Benchmarks
        allResults.push(...benchmarkSortAlgorithms(data, size));

        // Searching Benchmarks
        allResults.push(...benchmarkSearchAlgorithms(data, target, size));
    }

    return allResults;
}

// Run the benchmark and log the results
const benchmarkResults = runBenchmarks();
console.table(benchmarkResults);
