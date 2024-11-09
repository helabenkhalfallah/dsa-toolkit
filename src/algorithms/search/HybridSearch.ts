import { RedBlackTree } from '../../data-structures/trees/red-black/RedBlackTree.ts';
import { timSort } from '../sort/TimSort.ts';
import { binarySearch } from './BinarySearch.ts';
import { linearSearch } from './LinearSearch.ts';

/**
 * Configuration options for the hybrid search algorithm.
 */
interface HybridSearchConfig<T> {
    linearSearchThreshold?: number; // Threshold for switching to linear search (default: 100)
    binarySearchThreshold?: number; // Threshold for switching to binary search (default: 10000)
    isSorted?: boolean; // Whether the data array is already sorted (default: false)
    compareFn: (a: T, b: T) => number; // Custom comparison function
}

/**
 * Wrapper class for storing values with a custom comparator.
 */
class ComparableNode<T> {
    value: T;
    compareFn: (a: T, b: T) => number;

    constructor(value: T, compareFn: (a: T, b: T) => number) {
        this.value = value;
        this.compareFn = compareFn;
    }

    compare(other: ComparableNode<T>): number {
        return this.compareFn(this.value, other.value);
    }
}

/**
 * Hybrid search that adapts to data length and configuration for optimal performance.
 *
 * @template T - The type of elements in the array.
 * @param {T[]} data - The array of data to search.
 * @param {T} target - The target value to find.
 * @param {HybridSearchConfig<T>} config - Configuration for the hybrid search algorithm.
 * @returns {number | boolean} - The index of the target in the array or -1 if not found for array searches.
 *                               For Red-Black Tree search, returns true if found, false if not.
 */
export function hybridSearch<T>(
    data: T[],
    target: T,
    config: HybridSearchConfig<T>,
): number | boolean {
    const {
        linearSearchThreshold = 100,
        binarySearchThreshold = 10000,
        isSorted = false,
        compareFn,
    } = config;

    const length = data.length;

    // Case 1: Use linear search for small datasets
    if (length < linearSearchThreshold) {
        return linearSearch(data, target, compareFn);
    }

    // Case 2: Use binary search for mid-sized datasets
    if (length >= linearSearchThreshold && length < binarySearchThreshold) {
        const sortedData = isSorted ? data : timSort([...data], compareFn); // Avoid mutating the original array
        return binarySearch(sortedData, target, { isSorted: true, compareFn });
    }

    // Case 3: Use Red-Black Tree for large datasets
    if (length >= binarySearchThreshold) {
        const tree = new RedBlackTree<ComparableNode<T>>();
        const wrappedTarget = new ComparableNode(target, compareFn);

        // Insert all items into the Red-Black Tree
        for (const item of data) {
            tree.insert(new ComparableNode(item, compareFn));
        }

        // Perform search on Red-Black Tree
        return tree.search(wrappedTarget);
    }

    return -1; // Target not found
}
