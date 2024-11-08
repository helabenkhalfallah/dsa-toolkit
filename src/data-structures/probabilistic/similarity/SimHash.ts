/**
 * Class representing a SimHash for similarity detection.
 */
export class SimHash {
    private hash: number;

    /**
     * Creates a SimHash instance.
     */
    constructor() {
        this.hash = 0;
    }

    /**
     * Adds a set of elements to the SimHash.
     * @param {Set<string>} elements - The set of elements to add.
     */
    add(elements: Set<string>): void {
        const hashVectors: number[] = new Array(64).fill(0); // 64-bit hash

        for (const element of elements) {
            const hashValue = this.computeHash(element);
            for (let i = 0; i < 64; i++) {
                if (hashValue & (1 << i)) {
                    hashVectors[i]++;
                } else {
                    hashVectors[i]--;
                }
            }
        }

        this.hash = 0;
        for (let i = 0; i < 64; i++) {
            if (hashVectors[i] > 0) {
                this.hash |= 1 << i;
            }
        }
    }

    /**
     * Computes a hash value for a given element.
     * @param {string} element - The element to hash.
     * @returns {number} The hash value.
     */
    private computeHash(element: string): number {
        let hash = 0;
        for (let i = 0; i < element.length; i++) {
            hash = (hash * 31 + element.charCodeAt(i)) | 0; // Simple hash function
        }
        return hash >>> 0; // Convert to unsigned 32-bit integer
    }

    /**
     * Computes the Hamming distance between this SimHash and another SimHash.
     * @param {SimHash} other - The other SimHash instance.
     * @returns {number} The Hamming distance.
     */
    hammingDistance(other: SimHash): number {
        return this.countBits(this.hash ^ other.hash);
    }

    /**
     * Counts the number of bits set to 1 in a number.
     * @param {number} value - The value to count bits in.
     * @returns {number} The count of bits set to 1.
     */
    private countBits(value: number): number {
        let count = 0;
        while (value) {
            count++;
            value &= value - 1; // Clear the least significant bit set
        }
        return count;
    }

    /**
     * Returns the hash value.
     * @returns {number} The hash value.
     */
    getHash(): number {
        return this.hash;
    }
}
