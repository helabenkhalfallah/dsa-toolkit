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
        // Update the total count
        this.totalCount += weight;

        // Add new centroid or update existing ones
        const newCentroid = { mean: value, count: weight };
        this.centroids.push(newCentroid);
        this.mergeCentroids();
    }

    /**
     * Merges centroids to maintain the t-Digest structure.
     */
    private mergeCentroids(): void {
        this.centroids.sort((a, b) => a.mean - b.mean); // Sort centroids by mean

        const merged: { mean: number; count: number }[] = [];
        let current: { mean: number; count: number } | null = null;

        for (const centroid of this.centroids) {
            if (current === null) {
                current = { mean: centroid.mean, count: centroid.count };
            } else if (current.mean === centroid.mean) {
                current.count += centroid.count; // Merge centroids with the same mean
            } else {
                merged.push(current);
                current = { mean: centroid.mean, count: centroid.count };
            }
        }

        if (current !== null) {
            merged.push(current);
        }

        this.centroids = merged;
    }

    /**
     * Computes the quantile estimate for a given value.
     * @param {number} quantile - The quantile to estimate (between 0 and 1).
     * @returns {number} The estimated value at the given quantile.
     */
    quantile(quantile: number): number {
        if (this.centroids.length === 0) return 0;

        const targetCount = quantile * this.totalCount;
        let runningCount = 0;

        for (const centroid of this.centroids) {
            runningCount += centroid.count;
            if (runningCount >= targetCount) {
                return centroid.mean;
            }
        }

        return this.centroids[this.centroids.length - 1].mean; // Return the last centroid's mean if out of bounds
    }

    /**
     * Returns the size of the t-Digest (number of centroids).
     * @returns {number} The number of centroids in the t-Digest.
     */
    size(): number {
        return this.centroids.length;
    }
}
