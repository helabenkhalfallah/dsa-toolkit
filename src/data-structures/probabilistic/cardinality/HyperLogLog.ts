/**
 * Class representing a HyperLogLog data structure.
 */
export class HyperLogLog {
    private readonly b: number; // Number of bits used for the register
    private readonly m: number; // Number of registers
    private readonly alphaMM: number; // Precomputed constant for bias correction
    private readonly registers: number[];

    /**
     * Creates an instance of HyperLogLog.
     * @param {number} b - The number of bits used for the register (log2 of the number of registers).
     */
    constructor(b: number) {
        if (b < 4 || b > 16) {
            throw new Error('Parameter b must be between 4 and 16');
        }
        this.b = b;
        this.m = 1 << b; // 2^b
        this.alphaMM = this.calculateAlphaMM();
        this.registers = new Array(this.m).fill(0);
    }

    /**
     * Adds an element to the HyperLogLog.
     * @param {string} value - The value to be added.
     */
    add(value: string): void {
        const x = this.hash(value);
        const j = this.getBucket(x);
        const w = this.getW(x);
        const rho = this.calculateRho(w);
        this.registers[j] = Math.max(this.registers[j], rho);
    }

    /**
     * Estimates the number of distinct elements added to the HyperLogLog.
     * @returns {number} The estimated count of distinct elements.
     */
    estimate(): number {
        const Z = 1 / this.registers.reduce((acc, r) => acc + 1 / Math.pow(2, r), 0);
        const E = this.alphaMM * Z;
        return this.correctBias(E);
    }

    /**
     * Hashes a string value to a 32-bit integer using FNV-1a hash function.
     * @param {string} value - The value to hash.
     * @returns {number} The hashed value.
     */
    private hash(value: string): number {
        const hash = 2166136261n;
        const FNV_prime = 16777619n;
        let h = BigInt(hash);

        for (const char of value) {
            h ^= BigInt(char.charCodeAt(0));
            h *= FNV_prime;
        }

        return Number(h & 0xffffffffn); // Mask to 32-bit
    }

    /**
     * Gets the bucket index for a hashed value.
     * @param {number} x - The hashed value.
     * @returns {number} The bucket index.
     */
    private getBucket(x: number): number {
        return x >>> (32 - this.b); // Use the top b bits
    }

    /**
     * Gets the remaining bits after extracting the bucket index.
     * @param {number} x - The hashed value.
     * @returns {number} The remaining bits.
     */
    private getW(x: number): number {
        return x & ((1 << (32 - this.b)) - 1); // Extract the remaining bits
    }

    /**
     * Calculates the position of the first set bit (1-based).
     * @param {number} w - The remaining bits.
     * @returns {number} The position of the first set bit.
     */
    private calculateRho(w: number): number {
        return w === 0 ? 32 - this.b + 1 : Math.clz32(w) + 1;
    }

    /**
     * Computes the alphaMM constant for bias correction.
     * @returns {number} The computed alphaMM.
     */
    private calculateAlphaMM(): number {
        const alpha = 0.7213 / (1 + 1.079 / this.m); // Bias correction constant
        return alpha * this.m * this.m;
    }

    /**
     * Corrects the bias of the estimate.
     * @param {number} E - The raw estimate.
     * @returns {number} The corrected estimate.
     */
    private correctBias(E: number): number {
        const V = this.registers.filter((r) => r === 0).length;

        // Small range correction when estimate is less than or equal to 2.5m
        if (E <= 2.5 * this.m && V > 0) {
            return this.m * Math.log(this.m / V);
        }

        // Large range correction when estimate exceeds a threshold
        const largeRangeThreshold = 1 << 32;
        if (E > largeRangeThreshold / 30) {
            return -largeRangeThreshold * Math.log(1 - E / largeRangeThreshold);
        }

        // No correction for intermediate values
        return E;
    }
}
