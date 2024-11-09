/**
 * Class representing a node in the Treap.
 * @template T - The type of value stored in the node.
 */
class TreapNode<T> {
    /** The value stored in the node. */
    value: T;

    /** The priority of the node, used for heap property. */
    priority: number;

    /** Pointer to the left child node. */
    left: TreapNode<T> | null;

    /** Pointer to the right child node. */
    right: TreapNode<T> | null;

    /**
     * Creates a new TreapNode.
     * @param {T} value - The value stored in the node.
     * @param {number} priority - The priority of the node.
     */
    constructor(value: T, priority: number) {
        this.value = value;
        this.priority = priority;
        this.left = null;
        this.right = null;
    }
}

/**
 * Class representing a Treap, a combination of a binary search tree and a heap.
 * @template T - The type of values stored in the Treap.
 */
export class Treap<T> {
    /** The root node of the Treap. */
    private root: TreapNode<T> | null = null;

    /** Custom comparison function for values in the Treap. */
    private compareFn: (a: T, b: T) => number;

    /**
     * Creates a new Treap.
     * @param {(a: T, b: T) => number} [compareFn] - Optional comparison function for custom types.
     */
    constructor(compareFn?: (a: T, b: T) => number) {
        this.compareFn = compareFn || ((a, b) => (a < b ? -1 : a > b ? 1 : 0));
    }

    /**
     * Inserts a value into the Treap.
     * @param {T} value - The value to insert.
     * @param {number} priority - The priority of the value.
     * @returns {boolean} - True if insertion was successful.
     */
    insert(value: T, priority: number): boolean {
        this.root = this._insert(this.root, value, priority);
        return true; // Always succeeds in insertion
    }

    /**
     * Helper method to insert a value recursively.
     * @param {TreapNode<T> | null} node - The current node.
     * @param {T} value - The value to insert.
     * @param {number} priority - The priority of the value.
     * @returns {TreapNode<T>} - The updated node after insertion.
     * @private
     */
    private _insert(node: TreapNode<T> | null, value: T, priority: number): TreapNode<T> {
        if (!node) return new TreapNode(value, priority);

        if (this.compareFn(value, node.value) < 0) {
            node.left = this._insert(node.left, value, priority);
            if (node.left && node.left.priority > node.priority) {
                node = this.rotateRight(node);
            }
        } else {
            node.right = this._insert(node.right, value, priority);
            if (node.right && node.right.priority > node.priority) {
                node = this.rotateLeft(node);
            }
        }

        return node;
    }

    /**
     * Rotates the node to the right.
     * @param {TreapNode<T>} node - The node to rotate.
     * @returns {TreapNode<T>} - The new root after rotation.
     * @private
     */
    private rotateRight(node: TreapNode<T>): TreapNode<T> {
        const newRoot = node.left!;
        node.left = newRoot.right;
        newRoot.right = node;
        return newRoot;
    }

    /**
     * Rotates the node to the left.
     * @param {TreapNode<T>} node - The node to rotate.
     * @returns {TreapNode<T>} - The new root after rotation.
     * @private
     */
    private rotateLeft(node: TreapNode<T>): TreapNode<T> {
        const newRoot = node.right!;
        node.right = newRoot.left;
        newRoot.left = node;
        return newRoot;
    }

    /**
     * Searches for a value in the Treap.
     * @param {T} value - The value to search for.
     * @returns {boolean} - True if the value is found, false otherwise.
     */
    search(value: T): boolean {
        return this._search(this.root, value);
    }

    /**
     * Helper method to search for a value recursively.
     * @param {TreapNode<T> | null} node - The current node.
     * @param {T} value - The value to search for.
     * @returns {boolean} - True if the value is found, false otherwise.
     * @private
     */
    private _search(node: TreapNode<T> | null, value: T): boolean {
        if (!node) return false;
        if (node.value === value) return true;
        return this.compareFn(value, node.value) < 0
            ? this._search(node.left, value)
            : this._search(node.right, value);
    }

    /**
     * Deletes a value from the Treap.
     * @param {T} value - The value to delete.
     * @returns {boolean} - True if the deletion was successful, false if the value was not found.
     */
    delete(value: T): boolean {
        if (!this.search(value)) return false; // Early exit if value not found
        this.root = this._delete(this.root, value);
        return true;
    }

    /**
     * Helper method to delete a value recursively.
     * @param {TreapNode<T> | null} node - The current node.
     * @param {T} value - The value to delete.
     * @returns {TreapNode<T> | null} - The updated node after deletion.
     * @private
     */
    private _delete(node: TreapNode<T> | null, value: T): TreapNode<T> | null {
        if (!node) return null;

        if (this.compareFn(value, node.value) < 0) {
            node.left = this._delete(node.left, value);
        } else if (this.compareFn(value, node.value) > 0) {
            node.right = this._delete(node.right, value);
        } else {
            // Node to delete found
            if (!node.left) return node.right;
            if (!node.right) return node.left;

            // Node has two children, rotate and delete
            if (node.left.priority > node.right.priority) {
                node = this.rotateRight(node);
                node.right = this._delete(node.right, value);
            } else {
                node = this.rotateLeft(node);
                node.left = this._delete(node.left, value);
            }
        }
        return node;
    }

    /**
     * In-order traversal for testing or debugging.
     * @param {TreapNode<T> | null} [node=this.root] - The starting node (default is root).
     * @param {Array<T>} [result=[]] - Array to store traversal result.
     * @returns {Array<T>} - In-order traversal result.
     */
    inOrderTraversal(node: TreapNode<T> | null = this.root, result: Array<T> = []): Array<T> {
        if (!node) return result;
        this.inOrderTraversal(node.left, result);
        result.push(node.value);
        this.inOrderTraversal(node.right, result);
        return result;
    }
}
