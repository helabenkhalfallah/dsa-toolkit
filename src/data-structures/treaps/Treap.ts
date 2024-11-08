/**
 * Class representing a node in the Treap.
 */
class TreapNode<T> {
    value: T;
    priority: number;
    left: TreapNode<T> | null;
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
 */
export class Treap<T> {
    root: TreapNode<T> | null = null;

    /**
     * Inserts a value into the Treap.
     * @param {T} value - The value to insert.
     * @param {number} priority - The priority of the value.
     */
    insert(value: T, priority: number): void {
        this.root = this._insert(this.root, value, priority);
    }

    /**
     * Helper method to insert a value recursively.
     * @param {TreapNode<T> | null} node - The current node.
     * @param {T} value - The value to insert.
     * @param {number} priority - The priority of the value.
     * @returns {TreapNode<T>} The updated node.
     * @private
     */
    private _insert(node: TreapNode<T> | null, value: T, priority: number): TreapNode<T> {
        if (!node) return new TreapNode(value, priority);

        if (value < node.value) {
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
     * @returns {TreapNode<T>} The new root after rotation.
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
     * @returns {TreapNode<T>} The new root after rotation.
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
     * @returns {boolean} True if the value is found, false otherwise.
     */
    search(value: T): boolean {
        return this._search(this.root, value);
    }

    /**
     * Helper method to search for a value recursively.
     * @param {TreapNode<T> | null} node - The current node.
     * @param {T} value - The value to search for.
     * @returns {boolean} True if the value is found, false otherwise.
     * @private
     */
    private _search(node: TreapNode<T> | null, value: T): boolean {
        if (!node) return false;
        if (node.value === value) return true;
        return value < node.value
            ? this._search(node.left, value)
            : this._search(node.right, value);
    }

    /**
     * Deletes a value from the Treap.
     * @param {T} value - The value to delete.
     */
    delete(value: T): void {
        this.root = this._delete(this.root, value);
    }

    /**
     * Helper method to delete a value recursively.
     * @param {TreapNode<T> | null} node - The current node.
     * @param {T} value - The value to delete.
     * @returns {TreapNode<T> | null} The updated node.
     * @private
     */
    private _delete(node: TreapNode<T> | null, value: T): TreapNode<T> | null {
        if (!node) return null;

        if (value < node.value) {
            node.left = this._delete(node.left, value);
        } else if (value > node.value) {
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
}
