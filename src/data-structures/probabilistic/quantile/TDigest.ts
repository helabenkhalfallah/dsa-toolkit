/**
 * Class representing a t-Digest for approximate quantile estimation.
 */
export class TDigest {
    private centroids: { mean: number; count: number }[] = []; // Array of centroids
    private totalCount: number = 0; // Total count of data points

    /**
     * Adds a value to the t-Digest.
     * @param {number} value - The value to add.
     * @param {number} weight - The weight of the value (default: 1).
     */
    add(value: number, weight: number = 1): void {
        this.totalCount += weight;

        // Find an existing centroid to merge with, or create a new one
        const closest = this.findClosestCentroid(value);
        if (closest && Math.abs(closest.mean - value) <= this.threshold(closest.count)) {
            // Merge with the closest centroid if within threshold
            closest.mean =
                (closest.mean * closest.count + value * weight) / (closest.count + weight);
            closest.count += weight;
        } else {
            // Otherwise, create a new centroid
            this.centroids.push({ mean: value, count: weight });
            this.mergeCentroids();
        }
    }

    /**
     * Merges centroids to maintain the t-Digest structure.
     */
    private mergeCentroids(): void {
        this.centroids.sort((a, b) => a.mean - b.mean);

        const merged: { mean: number; count: number }[] = [];
        let current: { mean: number; count: number } | null = null;

        for (const centroid of this.centroids) {
            if (!current) {
                current = { mean: centroid.mean, count: centroid.count };
            } else if (current.count + centroid.count <= this.threshold(current.count)) {
                // Merge centroid into current if within threshold
                current.mean =
                    (current.mean * current.count + centroid.mean * centroid.count) /
                    (current.count + centroid.count);
                current.count += centroid.count;
            } else {
                merged.push(current);
                current = { mean: centroid.mean, count: centroid.count };
            }
        }

        if (current) {
            merged.push(current);
        }

        this.centroids = merged;
    }

    /**
     * Finds the closest centroid to a given value.
     * @param {number} value - The value to find the closest centroid for.
     * @returns {{ mean: number, count: number } | null} The closest centroid or null if none exists.
     */
    private findClosestCentroid(value: number): { mean: number; count: number } | null {
        if (this.centroids.length === 0) return null;

        return this.centroids.reduce((closest, centroid) =>
            Math.abs(centroid.mean - value) < Math.abs(closest.mean - value) ? centroid : closest,
        );
    }

    /**
     * Computes an adaptive threshold for merging centroids based on the centroid count.
     * @param {number} count - The count of the centroid.
     * @returns {number} The threshold value.
     */
    private threshold(count: number): number {
        const compression = 100; // Compression parameter
        return compression / (count + 1);
    }

    /**
     * Computes the quantile estimate for a given value.
     * @param {number} quantile - The quantile to estimate (between 0 and 1).
     * @returns {number} The estimated value at the given quantile.
     */
    quantile(quantile: number): number {
        if (this.centroids.length === 0 || quantile < 0 || quantile > 1) return NaN;

        const targetCount = quantile * this.totalCount;
        let runningCount = 0;

        for (const centroid of this.centroids) {
            runningCount += centroid.count;
            if (runningCount >= targetCount) {
                return centroid.mean;
            }
        }

        return this.centroids[this.centroids.length - 1].mean;
    }

    /**
     * Returns the number of centroids in the t-Digest.
     * @returns {number} The number of centroids.
     */
    size(): number {
        return this.centroids.length;
    }
}
