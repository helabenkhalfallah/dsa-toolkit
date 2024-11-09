import { timSort } from '../sort/TimSort.ts';

/**
 * Configuration options for the binary search algorithm.
 */
interface BinarySearchConfig<T> {
    compareFn: (a: T, b: T) => number; // Custom comparison function
    isSorted?: boolean; // Whether the array is already sorted (default: false)
}

/**
 * Performs a binary search on an array with a custom comparison function.
 * If the array is not sorted and `isSorted` is false, TimSort will be applied.
 *
 * @template T - The type of elements in the array.
 * @param {T[]} data - The array to search.
 * @param {T} target - The value to search for.
 * @param {BinarySearchConfig<T>} config - Configuration object containing compareFn and isSorted.
 * @returns {number} The index of the target in the array, or -1 if not found.
 */
export function binarySearch<T>(data: T[], target: T, config: BinarySearchConfig<T>): number {
    const { compareFn, isSorted = false } = config;

    // Step 1: Sort the array if it is not sorted
    const sortedData = isSorted ? data : timSort([...data], compareFn); // Use spread operator to avoid mutating original data

    // Step 2: Perform binary search
    let left = 0;
    let right = sortedData.length - 1;

    while (left <= right) {
        const mid = Math.floor((left + right) / 2);
        const comparison = compareFn(sortedData[mid], target);

        if (comparison === 0) {
            return mid; // Target found
        } else if (comparison < 0) {
            left = mid + 1; // Search in the right half
        } else {
            right = mid - 1; // Search in the left half
        }
    }

    return -1; // Target not found
}
