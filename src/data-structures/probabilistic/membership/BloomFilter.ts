/**
 * Class representing a Bloom Filter data structure.
 */
export class BloomFilter {
    private readonly bitArray: Uint8Array; // Array of bits for the filter
    private readonly size: number; // Size of the bit array
    private readonly hashCount: number; // Number of hash functions

    /**
     * Creates an instance of BloomFilter.
     * @param {number} size - The size of the bit array.
     * @param {number} hashCount - The number of hash functions to use.
     */
    constructor(size: number, hashCount: number) {
        this.size = size;
        this.hashCount = hashCount;
        this.bitArray = new Uint8Array(Math.ceil(size / 8)); // Initialize the bit array
    }

    /**
     * Adds an item to the Bloom Filter.
     * @param {string} item - The item to add.
     */
    add(item: string): void {
        const hashes = this.getHashIndices(item);
        for (const index of hashes) {
            this.setBit(index);
        }
    }

    /**
     * Checks if an item is possibly in the Bloom Filter.
     * @param {string} item - The item to check.
     * @returns {boolean} True if the item is possibly in the filter, false if definitely not.
     */
    mightContain(item: string): boolean {
        const hashes = this.getHashIndices(item);
        for (const index of hashes) {
            if (!this.getBit(index)) {
                return false; // If any bit is not set, the item is definitely not in the filter
            }
        }
        return true; // If all bits are set, the item might be in the filter
    }

    /**
     * Sets a bit in the bit array.
     * @param {number} index - The index of the bit to set.
     */
    private setBit(index: number): void {
        const byteIndex = Math.floor(index / 8);
        const bitIndex = index % 8;
        this.bitArray[byteIndex] |= 1 << bitIndex;
    }

    /**
     * Gets the value of a bit in the bit array.
     * @param {number} index - The index of the bit to get.
     * @returns {boolean} True if the bit is set, false otherwise.
     */
    private getBit(index: number): boolean {
        const byteIndex = Math.floor(index / 8);
        const bitIndex = index % 8;
        return (this.bitArray[byteIndex] & (1 << bitIndex)) !== 0;
    }

    /**
     * Generates hash indices for a given item.
     * @param {string} item - The item to hash.
     * @returns {number[]} An array of hash indices.
     */
    private getHashIndices(item: string): number[] {
        const hashes: number[] = [];
        for (let i = 0; i < this.hashCount; i++) {
            const hash = this.hash(item + i); // Combine item with index to generate different hashes
            hashes.push(hash % this.size);
        }
        return hashes;
    }

    /**
     * A simple hash function to hash an item.
     * @param {string} item - The item to hash.
     * @returns {number} The hash value.
     */
    private hash(item: string): number {
        let hash = 0;
        for (let i = 0; i < item.length; i++) {
            hash = (hash << 5) - hash + item.charCodeAt(i); // Bitwise hash
            hash |= 0; // Convert to 32-bit integer
        }
        return hash >>> 0; // Convert to unsigned integer
    }
}
