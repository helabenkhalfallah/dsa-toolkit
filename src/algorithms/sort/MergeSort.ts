/* eslint-disable @typescript-eslint/no-explicit-any */
/**
 * Merges two sorted arrays into a single sorted array using a comparison function.
 *
 * @param {any[]} left - The left sorted array.
 * @param {any[]} right - The right sorted array.
 * @param {(a: any, b: any) => number} compareFn - The comparison function.
 * @returns {any[]} The merged sorted array.
 */
function merge(left: any[], right: any[], compareFn: (a: any, b: any) => number): any[] {
    const result: any[] = [];
    let i = 0;
    let j = 0;

    while (i < left.length && j < right.length) {
        if (compareFn(left[i], right[j]) <= 0) {
            result.push(left[i++]);
        } else {
            result.push(right[j++]);
        }
    }

    return [...(result || []), ...(left.slice(i) || []), ...(right.slice(j) || [])];
}

/**
 * Sorts an array using the Merge Sort algorithm with a comparison function.
 *
 * @param {any[]} arr - The array to sort.
 * @param {(a: any, b: any) => number} compareFn - The comparison function.
 * @returns {any[]} The sorted array.
 */
export function mergeSort(arr: any[], compareFn: (a: any, b: any) => number): any[] {
    if (arr.length <= 1) return arr;

    const mid = Math.floor(arr.length / 2);
    const left = mergeSort(arr.slice(0, mid), compareFn);
    const right = mergeSort(arr.slice(mid), compareFn);

    return merge(left, right, compareFn);
}
