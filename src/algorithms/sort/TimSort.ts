interface TimSortConfig {
    minGallop?: number; // Minimum galloping threshold (default: 7)
    minRunLength?: number; // Minimum run length, calculated based on array length if not provided
}

/**
 * Copies a portion of an array to another array.
 *
 * @param {T[]} destArr - The destination array where elements will be copied to.
 * @param {number} destIndex - The starting index in the destination array.
 * @param {T[]} srcArr - The source array from which elements will be copied.
 * @param {number} srcIndex - The starting index in the source array.
 * @param {number} length - The number of elements to copy.
 */
// eslint-disable-next-line max-params
function copyArray<T>(
    destArr: T[],
    destIndex: number,
    srcArr: T[],
    srcIndex: number,
    length: number,
): void {
    for (let i = 0; i < length; i++) {
        destArr[destIndex + i] = srcArr[srcIndex + i];
    }
}

/**
 * Computes the minimum run length for TimSort.
 *
 * @param {number} n - The size of the array.
 * @param {number} defaultMinRun - The default minimum run length.
 * @returns {number} The calculated minimum run length.
 */
function computeMinRunLength(n: number, defaultMinRun: number = 64): number {
    let r = 0;
    while (n >= defaultMinRun) {
        r |= n & 1;
        n >>= 1;
    }
    return n + r;
}

/**
 * Sorts a small portion of the array using binary insertion sort.
 */
// eslint-disable-next-line max-params
function binaryInsertionSort<T>(
    arr: T[],
    low: number,
    start: number,
    high: number,
    compareFn: (a: T, b: T) => number,
): void {
    for (let i = start; i < high; ++i) {
        let left = low;
        let right = i;
        const pivot = arr[i];

        while (left < right) {
            const mid = Math.floor(left + (right - left) / 2);
            if (compareFn(pivot, arr[mid]) < 0) {
                right = mid;
            } else {
                left = mid + 1;
            }
        }

        for (let j = i; j > left; --j) {
            arr[j] = arr[j - 1];
        }
        arr[left] = pivot;
    }
}

/**
 * Identifies and potentially reverses a run within the array.
 */
// eslint-disable-next-line max-params
function countAndMakeRun<T>(
    arr: T[],
    low: number,
    high: number,
    compareFn: (a: T, b: T) => number,
): number {
    if (low >= high - 1) return 1;

    let runLength = 2;
    const isDescending = compareFn(arr[low + 1], arr[low]) < 0;

    for (let i = low + 2; i < high; ++i) {
        const order = compareFn(arr[i], arr[i - 1]);
        if (isDescending) {
            if (order >= 0) break;
        } else {
            if (order < 0) break;
        }
        runLength++;
    }

    if (isDescending) {
        reverseRange(arr, low, low + runLength);
    }
    return runLength;
}

/**
 * Reverses a portion of the array in-place.
 */
function reverseRange<T>(arr: T[], from: number, to: number): void {
    let low = from;
    let high = to - 1;
    while (low < high) {
        const temp = arr[low];
        arr[low] = arr[high];
        arr[high] = temp;
        low++;
        high--;
    }
}

/**
 * Performs a galloping search to the left to find the insertion point of a key.
 */
// eslint-disable-next-line max-params
function gallopLeft<T>(
    arr: T[],
    key: T,
    base: number,
    length: number,
    hint: number,
    compareFn: (a: T, b: T) => number,
): number {
    let lastOfs = 0;
    let offset = 1;

    if (compareFn(arr[base + hint], key) < 0) {
        const maxOfs = length - hint;
        while (offset < maxOfs && compareFn(arr[base + hint + offset], key) < 0) {
            lastOfs = offset;
            offset = (offset << 1) + 1;
            if (offset <= 0) offset = maxOfs;
        }
        if (offset > maxOfs) offset = maxOfs;

        lastOfs += hint;
        offset += hint;
    } else {
        const maxOfs = hint + 1;
        while (offset < maxOfs && compareFn(arr[base + hint - offset], key) >= 0) {
            lastOfs = offset;
            offset = (offset << 1) + 1;
            if (offset <= 0) offset = maxOfs;
        }
        if (offset > maxOfs) offset = maxOfs;

        const tmp = lastOfs;
        lastOfs = hint - offset;
        offset = hint - tmp;
    }

    lastOfs++;
    while (lastOfs < offset) {
        const m = Math.floor(lastOfs + (offset - lastOfs) / 2);
        if (compareFn(arr[base + m], key) < 0) {
            lastOfs = m + 1;
        } else {
            offset = m;
        }
    }

    return offset;
}

/**
 * Performs a galloping search to the right to find the insertion point of a key.
 */
// eslint-disable-next-line max-params
function gallopRight<T>(
    arr: T[],
    key: T,
    base: number,
    length: number,
    hint: number,
    compareFn: (a: T, b: T) => number,
): number {
    let lastOfs = 0;
    let offset = 1;

    if (compareFn(key, arr[base + hint]) < 0) {
        const maxOfs = hint + 1;
        while (offset < maxOfs && compareFn(key, arr[base + hint - offset]) < 0) {
            lastOfs = offset;
            offset = (offset << 1) + 1;
            if (offset <= 0) offset = maxOfs;
        }
        if (offset > maxOfs) offset = maxOfs;

        const tmp = lastOfs;
        lastOfs = hint - offset;
        offset = hint - tmp;
    } else {
        const maxOfs = length - hint;
        while (offset < maxOfs && compareFn(key, arr[base + hint + offset]) >= 0) {
            lastOfs = offset;
            offset = (offset << 1) + 1;
            if (offset <= 0) offset = maxOfs;
        }
        if (offset > maxOfs) offset = maxOfs;

        lastOfs += hint;
        offset += hint;
    }

    lastOfs++;
    while (lastOfs < offset) {
        const m = Math.floor(lastOfs + (offset - lastOfs) / 2);
        if (compareFn(key, arr[base + m]) < 0) {
            offset = m;
        } else {
            lastOfs = m + 1;
        }
    }

    return offset;
}

/**
 * Merges two runs on the pendingRuns stack to maintain TimSort invariants.
 */
// eslint-disable-next-line max-params
function mergeCollapse<T>(
    pendingRuns: { base: number; length: number }[],
    arr: T[],
    compareFn: (a: T, b: T) => number,
    minGallop: number,
): void {
    while (pendingRuns.length > 1) {
        let n = pendingRuns.length - 2;
        if (
            (n > 0 && pendingRuns[n - 1].length <= pendingRuns[n + 1].length) ||
            pendingRuns[n].length <= pendingRuns[n + 1].length
        ) {
            if (n > 0 && pendingRuns[n - 1].length < pendingRuns[n + 1].length) {
                n--;
            }
            mergeAt(pendingRuns, arr, n, minGallop, compareFn);
        } else if (n > 0 && pendingRuns[n - 1].length <= pendingRuns[n].length) {
            mergeAt(pendingRuns, arr, n - 1, minGallop, compareFn);
        } else {
            break;
        }
    }
}

/**
 * Merges all runs on the pendingRuns stack until only one remains.
 */
// eslint-disable-next-line max-params
function mergeForceCollapse<T>(
    pendingRuns: { base: number; length: number }[],
    arr: T[],
    compareFn: (a: T, b: T) => number,
    minGallop: number,
): void {
    while (pendingRuns.length > 1) {
        let n = pendingRuns.length - 2;
        if (n > 0 && pendingRuns[n - 1].length < pendingRuns[n + 1].length) {
            n--;
        }
        mergeAt(pendingRuns, arr, n, minGallop, compareFn);
    }
}

/**
 * Merges two runs with lengthA <= lengthB.
 *
 * @param {T[]} arr - The array being sorted.
 * @param {T[]} tempArray - The temporary array for merging.
 * @param {number} baseA - The starting index of the first run.
 * @param {number} lengthA - The length of the first run.
 * @param {number} baseB - The starting index of the second run.
 * @param {number} lengthB - The length of the second run.
 * @param {number} minGallop - The minimum galloping threshold.
 * @param {function(a: T, b: T): number} compareFn - The comparison function.
 */
// eslint-disable-next-line max-params,max-statements
function mergeLow<T>(
    arr: T[],
    tempArray: T[],
    baseA: number,
    lengthA: number,
    baseB: number,
    lengthB: number,
    minGallop: number,
    compareFn: (a: T, b: T) => number,
): void {
    copyArray(tempArray, 0, arr, baseA, lengthA);
    let dest = baseA;
    let cursorTemp = 0;
    let cursorB = baseB;

    arr[dest++] = arr[cursorB++];
    if (--lengthB === 0) {
        copyArray(arr, dest, tempArray, cursorTemp, lengthA);
        return;
    }
    if (lengthA === 1) {
        copyArray(arr, dest, arr, cursorB, lengthB);
        arr[dest + lengthB] = tempArray[cursorTemp];
        return;
    }

    // eslint-disable-next-line no-constant-condition
    while (true) {
        let countA = 0;
        let countB = 0;

        // eslint-disable-next-line no-constant-condition
        while (true) {
            if (compareFn(arr[cursorB], tempArray[cursorTemp]) < 0) {
                arr[dest++] = arr[cursorB++];
                countB++;
                countA = 0;
                if (--lengthB === 0) break;
                if (countB >= minGallop) break;
            } else {
                arr[dest++] = tempArray[cursorTemp++];
                countA++;
                countB = 0;
                if (--lengthA === 1) break;
                if (countA >= minGallop) break;
            }
        }

        if (lengthA === 1 || lengthB === 0) break;
        minGallop++;
        while (countA >= 7 || countB >= 7) {
            countA = gallopRight(tempArray, arr[cursorB], cursorTemp, lengthA, 0, compareFn);
            if (countA > 0) {
                copyArray(arr, dest, tempArray, cursorTemp, countA);
                dest += countA;
                cursorTemp += countA;
                lengthA -= countA;
                if (lengthA === 1) break;
            }

            arr[dest++] = arr[cursorB++];
            if (--lengthB === 0) return;

            countB = gallopLeft(arr, tempArray[cursorTemp], cursorB, lengthB, 0, compareFn);
            if (countB > 0) {
                copyArray(arr, dest, arr, cursorB, countB);
                dest += countB;
                cursorB += countB;
                lengthB -= countB;
                if (lengthB === 0) return;
            }

            arr[dest++] = tempArray[cursorTemp++];
            if (--lengthA === 1) break;
            minGallop = Math.max(1, minGallop - 1);
        }
        minGallop = Math.max(1, minGallop - 1);
    }

    if (lengthA === 1) {
        copyArray(arr, dest, arr, cursorB, lengthB);
        arr[dest + lengthB] = tempArray[cursorTemp];
    } else {
        copyArray(arr, dest, tempArray, cursorTemp, lengthA);
    }
}

/**
 * Merges two runs with lengthA >= lengthB.
 *
 * @param {T[]} arr - The array being sorted.
 * @param {T[]} tempArray - The temporary array for merging.
 * @param {number} baseA - The starting index of the first run.
 * @param {number} lengthA - The length of the first run.
 * @param {number} baseB - The starting index of the second run.
 * @param {number} lengthB - The length of the second run.
 * @param {number} minGallop - The minimum galloping threshold.
 * @param {function(a: T, b: T): number} compareFn - The comparison function.
 */
// eslint-disable-next-line max-params,max-statements
function mergeHigh<T>(
    arr: T[],
    tempArray: T[],
    baseA: number,
    lengthA: number,
    baseB: number,
    lengthB: number,
    minGallop: number,
    compareFn: (a: T, b: T) => number,
): void {
    copyArray(tempArray, 0, arr, baseB, lengthB);
    let dest = baseB + lengthB - 1;
    let cursorTemp = lengthB - 1;
    let cursorA = baseA + lengthA - 1;

    arr[dest--] = arr[cursorA--];
    if (--lengthA === 0) {
        copyArray(arr, dest - lengthB + 1, tempArray, 0, lengthB);
        return;
    }
    if (lengthB === 1) {
        copyArray(arr, dest - lengthA + 1, arr, baseA, lengthA);
        arr[dest - lengthA] = tempArray[cursorTemp];
        return;
    }

    // eslint-disable-next-line no-constant-condition
    while (true) {
        let countA = 0;
        let countB = 0;

        // eslint-disable-next-line no-constant-condition
        while (true) {
            if (compareFn(tempArray[cursorTemp], arr[cursorA]) < 0) {
                arr[dest--] = arr[cursorA--];
                countA++;
                countB = 0;
                if (--lengthA === 0) break;
                if (countA >= minGallop) break;
            } else {
                arr[dest--] = tempArray[cursorTemp--];
                countB++;
                countA = 0;
                if (--lengthB === 1) break;
                if (countB >= minGallop) break;
            }
        }

        if (lengthB === 1 || lengthA === 0) break;
        minGallop++;
        while (countA >= 7 || countB >= 7) {
            countA = gallopRight(
                arr,
                tempArray[cursorTemp],
                baseA,
                lengthA,
                lengthA - 1,
                compareFn,
            );
            countA = lengthA - countA;
            if (countA > 0) {
                dest -= countA;
                cursorA -= countA;
                copyArray(arr, dest + 1, arr, cursorA + 1, countA);
                lengthA -= countA;
                if (lengthA === 0) return;
            }

            arr[dest--] = tempArray[cursorTemp--];
            if (--lengthB === 1) return;

            countB = gallopLeft(tempArray, arr[cursorA], 0, lengthB, lengthB - 1, compareFn);
            countB = lengthB - countB;
            if (countB > 0) {
                dest -= countB;
                cursorTemp -= countB;
                copyArray(arr, dest + 1, tempArray, cursorTemp + 1, countB);
                lengthB -= countB;
                if (lengthB === 1) break;
                if (lengthB === 0) return;
            }

            arr[dest--] = arr[cursorA--];
            if (--lengthA === 0) return;
            minGallop = Math.max(1, minGallop - 1);
        }
        minGallop = Math.max(1, minGallop - 1);
    }

    if (lengthB === 1) {
        copyArray(arr, dest - lengthA + 1, arr, baseA, lengthA);
        arr[dest - lengthA] = tempArray[cursorTemp];
    } else {
        copyArray(arr, dest - lengthB + 1, tempArray, 0, lengthB);
    }
}

/**
 * Merges the two runs at the specified index on the pendingRuns stack.
 */
// eslint-disable-next-line max-params
function mergeAt<T>(
    pendingRuns: { base: number; length: number }[],
    arr: T[],
    i: number,
    minGallop: number,
    compareFn: (a: T, b: T) => number,
): void {
    const { base: baseA, length: lengthA } = pendingRuns[i];
    const { base: baseB, length: lengthB } = pendingRuns[i + 1];

    pendingRuns[i].length = lengthA + lengthB;
    if (i === pendingRuns.length - 3) {
        pendingRuns[i + 1] = pendingRuns[i + 2];
    }
    pendingRuns.pop();

    const k = gallopRight(arr, arr[baseB], baseA, lengthA, 0, compareFn);
    const newBaseA = baseA + k;
    const newLengthA = lengthA - k;
    if (newLengthA === 0) return;

    const newLengthB = gallopLeft(
        arr,
        arr[newBaseA + newLengthA - 1],
        baseB,
        lengthB,
        lengthB - 1,
        compareFn,
    );
    if (newLengthB === 0) return;

    if (newLengthA <= newLengthB) {
        mergeLow(arr, [], newBaseA, newLengthA, baseB, newLengthB, minGallop, compareFn);
    } else {
        mergeHigh(arr, [], newBaseA, newLengthA, baseB, newLengthB, minGallop, compareFn);
    }
}

/**
 * Sorts an array using the TimSort algorithm with configuration options.
 *
 * Guidelines for minGallop:
 * Default Value (7): This is usually a good choice for general-purpose use, as it balances the cost of regular merging with galloping.
 * Lower Values (e.g., 3 to 5): If your data is highly ordered or you notice larger sorted chunks, lowering minGallop can make the algorithm switch to galloping earlier, which can increase speed for such data.
 * Higher Values (e.g., 8 to 10): For data that’s more random or less structured, a higher minGallop may be beneficial, as galloping might be unnecessary and could even add overhead if done too often.
 *
 * Guidelines for minRunLength:
 * Automatic Calculation: TimSort generally calculates minRunLength based on the size of the array (computeMinRunLength), setting it to roughly 32 to 64 elements. This automatic calculation usually works well for most cases, especially with large arrays.
 * Smaller Values (e.g., 16 to 32): For smaller arrays (a few hundred elements or fewer), smaller values may be better as they allow quicker sorting of small chunks and reduce overhead. Lowering minRunLength can also be effective if you know the data is mostly random with little pre-existing order.
 * Larger Values (e.g., 48 to 64): For very large arrays (thousands of elements or more) or datasets with many short ordered subsequences, larger minRunLength values may reduce the number of initial runs and improve merge efficiency.
 *
 * @param {T[]} arr - The array to be sorted.
 * @param {function(a: T, b: T): number} compareFn - The comparison function.
 * @param {TimSortConfig} [config] - Optional configuration parameters for TimSort.
 * @returns {T[]} The sorted array.
 */
export function timSort<T>(
    arr: T[],
    compareFn: (a: T, b: T) => number,
    config: TimSortConfig = {},
): T[] {
    if (arr.length < 2) return arr;

    const pendingRuns: { base: number; length: number }[] = [];
    const minGallop = config.minGallop ?? 7; // Default galloping threshold
    const minRunLength = config.minRunLength ?? computeMinRunLength(arr.length);

    let remaining = arr.length;
    let low = 0;

    while (remaining > 0) {
        let currentRunLength = countAndMakeRun(arr, low, low + remaining, compareFn);

        if (currentRunLength < minRunLength) {
            const forcedRunLength = Math.min(minRunLength, remaining);
            binaryInsertionSort(arr, low, low + currentRunLength, low + forcedRunLength, compareFn);
            currentRunLength = forcedRunLength;
        }

        pendingRuns.push({ base: low, length: currentRunLength });
        mergeCollapse(pendingRuns, arr, compareFn, minGallop);

        low += currentRunLength;
        remaining -= currentRunLength;
    }

    mergeForceCollapse(pendingRuns, arr, compareFn, minGallop);
    return arr;
}
