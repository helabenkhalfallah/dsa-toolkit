/**
 * Class representing a MinHash for estimating Jaccard similarity.
 */
export class MinHash {
    private hashes: number[];
    private numHashes: number;

    /**
     * Creates a MinHash instance.
     * @param {number} numHashes - The number of hash functions to use.
     */
    constructor(numHashes: number) {
        this.numHashes = numHashes;
        this.hashes = Array(numHashes).fill(Infinity); // Initialize with infinity
    }

    /**
     * Adds a set of elements to the MinHash.
     * @param {Set<string>} elements - The set of elements to add.
     */
    add(elements: Set<string>): void {
        for (const element of elements) {
            for (let i = 0; i < this.numHashes; i++) {
                const hashValue = this.hash(element, i);
                if (hashValue < this.hashes[i]) {
                    this.hashes[i] = hashValue; // Update if new minimum found
                }
            }
        }
    }

    /**
     * Computes the hash for a given element.
     * @param {string} element - The element to hash.
     * @param {number} seed - A seed value for the hash function.
     * @returns {number} The hash value.
     */
    private hash(element: string, seed: number): number {
        let hash = 0;
        for (let i = 0; i < element.length; i++) {
            hash = (hash * 31 + element.charCodeAt(i) + seed) | 0; // Add seed for variation
        }
        return hash >>> 0; // Convert to unsigned 32-bit integer
    }

    /**
     * Estimates the Jaccard similarity with another MinHash.
     * @param {MinHash} other - The other MinHash instance.
     * @returns {number} The estimated Jaccard similarity.
     */
    jaccardSimilarity(other: MinHash): number {
        let count = 0;
        for (let i = 0; i < this.numHashes; i++) {
            if (this.hashes[i] === other.hashes[i]) {
                count++;
            }
        }
        return count / this.numHashes; // Return the ratio of common hashes
    }

    /**
     * Computes the number of unique hash values stored.
     * @returns {number} The number of unique hash values.
     */
    size(): number {
        return this.hashes.length;
    }
}
