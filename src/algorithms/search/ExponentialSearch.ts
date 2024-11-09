import { timSort } from '../sort/TimSort.ts';
import { binarySearch } from './BinarySearch.ts';

/**
 * Configuration options for the exponential search algorithm.
 */
interface ExponentialSearchConfig<T> {
    compareFn: (a: T, b: T) => number; // Custom comparison function
    isSorted?: boolean; // Whether the array is already sorted (default: false)
}

/**
 * Performs an exponential search on an array with a custom comparison function.
 * If the array is not sorted and `isSorted` is false, TimSort will be applied.
 *
 * @template T - The type of elements in the array.
 * @param {T[]} data - The array to search.
 * @param {T} target - The value to search for.
 * @param {ExponentialSearchConfig<T>} config - Configuration object containing compareFn and isSorted.
 * @returns {number} The index of the target in the array, or -1 if not found.
 */
export function exponentialSearch<T>(
    data: T[],
    target: T,
    config: ExponentialSearchConfig<T>,
): number {
    const { compareFn, isSorted = false } = config;

    // Sort the array if it is not sorted
    const sortedData = isSorted ? data : timSort([...data], compareFn);

    // Check the first element
    if (compareFn(sortedData[0], target) === 0) return 0;

    let i = 1;
    while (i < sortedData.length && compareFn(sortedData[i], target) <= 0) {
        i *= 2; // Exponentially increase the range
    }

    // Perform binary search on the found range
    const slicedData = sortedData.slice(Math.floor(i / 2), Math.min(i, sortedData.length));
    const resultIndex = binarySearch(slicedData, target, { compareFn, isSorted: true });

    // Adjust resultIndex to account for the sliced array offset
    return resultIndex === -1 ? -1 : Math.floor(i / 2) + resultIndex;
}
