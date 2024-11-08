/* eslint-disable @typescript-eslint/no-explicit-any */
import { timSort } from '../sort/TimSort.ts';
import { binarySearch } from './BinarySearch.ts';

/**
 * Configuration options for the exponential search algorithm.
 */
interface ExponentialSearchConfig {
    compareFn: (a: any, b: any) => number; // Custom comparison function
    isSorted?: boolean; // Whether the array is already sorted (default: false)
}

/**
 * Performs an exponential search on an array with a custom comparison function.
 * If the array is not sorted and `isSorted` is false, TimSort will be applied.
 *
 * @param {any[]} data - The array to search.
 * @param {any} target - The value to search for.
 * @param {ExponentialSearchConfig} config - Configuration object containing compareFn and isSorted.
 * @returns {number} The index of the target in the array, or -1 if not found.
 */
export function exponentialSearch(
    data: any[],
    target: any,
    config: ExponentialSearchConfig,
): number {
    const { compareFn, isSorted = false } = config;

    // Sort the array if it is not sorted
    let sortedData = data;
    if (!isSorted) {
        sortedData = timSort(data, compareFn);
    }

    // Check the first element
    if (compareFn(sortedData[0], target) === 0) return 0;

    let i = 1;
    while (i < sortedData.length && compareFn(sortedData[i], target) <= 0) {
        i *= 2; // Exponentially increase the range
    }

    // Perform binary search on the found range
    const resultIndex = binarySearch(
        sortedData.slice(Math.floor(i / 2), Math.min(i, sortedData.length)),
        target,
        { compareFn, isSorted: true },
    );

    // Adjust resultIndex to account for the sliced array offset
    return resultIndex === -1 ? -1 : Math.floor(i / 2) + resultIndex;
}
