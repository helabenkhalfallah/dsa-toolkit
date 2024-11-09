/**
 * Class representing a node in the LFU Cache.
 * Each node stores a key, value, and its frequency of access.
 */
class LFUNode<K, V> {
    constructor(
        public key: K,
        public value: V,
        public frequency: number = 1,
    ) {}
}

/**
 * Class representing an LFU (Least Frequently Used) Cache.
 * The cache evicts the least frequently used items when the capacity is reached.
 *
 * @template K - The type of keys stored in the cache.
 * @template V - The type of values stored in the cache.
 */
export class LFUCache<K, V> {
    private capacity: number;
    private minFrequency: number;
    private keyToNode: Map<K, LFUNode<K, V>>;
    private frequencyToNodes: Map<number, Set<LFUNode<K, V>>>;

    /**
     * Creates an LFU Cache with a specified capacity.
     *
     * @param {number} capacity - The maximum number of items the cache can hold.
     */
    constructor(capacity: number) {
        this.capacity = capacity;
        this.minFrequency = 0;
        this.keyToNode = new Map();
        this.frequencyToNodes = new Map();
    }

    /**
     * Retrieves a value from the cache by key.
     * Updates the frequency of the accessed node.
     *
     * @param {K} key - The key to retrieve from the cache.
     * @returns {V | null} - The value associated with the key, or null if not found.
     */
    get(key: K): V | null {
        const node = this.keyToNode.get(key);
        if (!node) return null;

        this.updateNodeFrequency(node);
        return node.value;
    }

    /**
     * Adds a key-value pair to the cache.
     * If the cache exceeds its capacity, it evicts the least frequently used item.
     *
     * @param {K} key - The key to add to the cache.
     * @param {V} value - The value to associate with the key.
     */
    put(key: K, value: V): void {
        if (this.capacity <= 0) return;

        if (this.keyToNode.has(key)) {
            const node = this.keyToNode.get(key)!;
            node.value = value; // Update the value
            this.updateNodeFrequency(node);
        } else {
            if (this.keyToNode.size >= this.capacity) {
                this.evict();
            }
            const newNode = new LFUNode(key, value);
            this.keyToNode.set(key, newNode);
            this.addNodeToFrequency(newNode, 1);
            this.minFrequency = 1; // Reset minimum frequency to 1
        }
    }

    /**
     * Updates the frequency of a node.
     *
     * @param {LFUNode<K, V>} node - The node to update.
     * @private
     */
    private updateNodeFrequency(node: LFUNode<K, V>): void {
        const oldFrequency = node.frequency;
        node.frequency++;

        this.removeNodeFromFrequency(node, oldFrequency);
        this.addNodeToFrequency(node, node.frequency);

        // Update minFrequency if necessary
        if (oldFrequency === this.minFrequency && !this.frequencyToNodes.get(oldFrequency)?.size) {
            this.minFrequency++;
        }
    }

    /**
     * Adds a node to the set of nodes with a given frequency.
     *
     * @param {LFUNode<K, V>} node - The node to add.
     * @param {number} frequency - The frequency to associate with the node.
     * @private
     */
    private addNodeToFrequency(node: LFUNode<K, V>, frequency: number): void {
        if (!this.frequencyToNodes.has(frequency)) {
            this.frequencyToNodes.set(frequency, new Set());
        }
        this.frequencyToNodes.get(frequency)!.add(node);
    }

    /**
     * Removes a node from the set of nodes with a given frequency.
     *
     * @param {LFUNode<K, V>} node - The node to remove.
     * @param {number} frequency - The frequency to disassociate from the node.
     * @private
     */
    private removeNodeFromFrequency(node: LFUNode<K, V>, frequency: number): void {
        const nodes = this.frequencyToNodes.get(frequency);
        if (nodes) {
            nodes.delete(node);
            if (nodes.size === 0) {
                this.frequencyToNodes.delete(frequency);
            }
        }
    }

    /**
     * Evicts the least frequently used node from the cache.
     *
     * @private
     */
    private evict(): void {
        const nodesWithMinFreq = this.frequencyToNodes.get(this.minFrequency);
        if (!nodesWithMinFreq || nodesWithMinFreq.size === 0) return;

        // Evict the least recently added node with the minimum frequency
        const nodeToEvict = nodesWithMinFreq.values().next().value;
        nodesWithMinFreq.delete(nodeToEvict);
        this.keyToNode.delete(nodeToEvict.key);

        if (nodesWithMinFreq.size === 0) {
            this.frequencyToNodes.delete(this.minFrequency);
        }
    }
}
