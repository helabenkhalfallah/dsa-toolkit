import { timSort } from '../sort/TimSort.ts';

/**
 * Configuration options for the ternary search algorithm.
 */
interface TernarySearchConfig<T> {
    compareFn: (a: T, b: T) => number; // Custom comparison function
    isSorted?: boolean; // Whether the array is already sorted (default: false)
}

/**
 * Performs a ternary search on an array with a custom comparison function.
 * If the array is not sorted and `isSorted` is false, TimSort will be applied.
 *
 * @template T - The type of elements in the array.
 * @param {T[]} data - The array to search.
 * @param {T} target - The value to search for.
 * @param {TernarySearchConfig<T>} config - Configuration object containing compareFn and isSorted.
 * @param {number} [left=0] - The left index of the current search range.
 * @param {number} [right=data.length - 1] - The right index of the current search range.
 * @returns {number} The index of the target in the array, or -1 if not found.
 */
// eslint-disable-next-line max-params
export function ternarySearch<T>(
    data: T[],
    target: T,
    left: number = 0,
    right: number = data.length - 1,
    config: TernarySearchConfig<T>,
): number {
    const { compareFn, isSorted = false } = config;

    // Sort the array if it is not sorted
    const sortedData = isSorted ? data : timSort([...data], compareFn); // Avoid mutating the original array

    // Search for the target
    if (right >= left) {
        const mid1 = left + Math.floor((right - left) / 3);
        const mid2 = right - Math.floor((right - left) / 3);

        if (compareFn(sortedData[mid1], target) === 0) return mid1; // Target found
        if (compareFn(sortedData[mid2], target) === 0) return mid2; // Target found

        if (compareFn(target, sortedData[mid1]) < 0) {
            return ternarySearch(sortedData, target, left, mid1 - 1, config); // Search in the left third
        } else if (compareFn(target, sortedData[mid2]) > 0) {
            return ternarySearch(sortedData, target, mid2 + 1, right, config); // Search in the right third
        } else {
            return ternarySearch(sortedData, target, mid1 + 1, mid2 - 1, config); // Search in the middle third
        }
    }

    return -1; // Target not found
}
