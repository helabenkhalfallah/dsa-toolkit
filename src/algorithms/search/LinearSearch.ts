/* eslint-disable @typescript-eslint/no-explicit-any */
/**
 * Performs a linear search on the data array.
 * @param {any[]} data - The array to search through.
 * @param {any} target - The target value to find.
 * @param {(a: any, b: any) => number} compareFn - Comparison function.
 * @returns {number} - The index of the target in the array, or -1 if not found.
 */
export function linearSearch(
    data: any[],
    target: any,
    compareFn: (a: any, b: any) => number,
): number {
    for (let i = 0; i < data.length; i++) {
        if (compareFn(data[i], target) === 0) return i;
    }
    return -1;
}
