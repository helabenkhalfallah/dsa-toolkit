import { BinarySearchTreeNode } from './BinarySearchTreeNode.ts';

/**
 * Class representing a Binary Search Tree (BST).
 * @template T - The type of values stored in the tree nodes.
 */
export class BinarySearchTree<T> {
    /** Root node of the binary search tree */
    root: BinarySearchTreeNode<T> | null = null;

    /**
     * Inserts a value into the binary search tree.
     * @param {T} value - The value to be inserted.
     */
    insert(value: T): void {
        this.root = this._insert(this.root, value);
    }

    /**
     * Recursive helper function for inserting a value into the tree.
     * @private
     * @param {BinarySearchTreeNode<T> | null} node - The current node in the tree.
     * @param {T} value - The value to be inserted.
     * @returns {BinarySearchTreeNode<T>} - The updated node after insertion.
     */
    private _insert(node: BinarySearchTreeNode<T> | null, value: T): BinarySearchTreeNode<T> {
        if (node === null) {
            return new BinarySearchTreeNode(value);
        }
        if (value < node.value) {
            node.left = this._insert(node.left, value);
        } else if (value > node.value) {
            node.right = this._insert(node.right, value);
        } // No need for else, duplicates are ignored
        return node;
    }

    /**
     * Searches for a value in the binary search tree.
     * @param {T} value - The value to search for.
     * @returns {boolean} - True if the value is found, otherwise false.
     */
    search(value: T): boolean {
        return this._search(this.root, value);
    }

    /**
     * Recursive helper function for searching a value in the tree.
     * @private
     * @param {BinarySearchTreeNode<T> | null} node - The current node in the tree.
     * @param {T} value - The value to search for.
     * @returns {boolean} - True if the value is found, otherwise false.
     */
    private _search(node: BinarySearchTreeNode<T> | null, value: T): boolean {
        if (node === null) {
            return false;
        }
        if (value === node.value) {
            return true;
        }
        if (value < node.value) {
            return this._search(node.left, value);
        } else {
            return this._search(node.right, value);
        }
    }

    /**
     * Deletes a value from the binary search tree.
     * @param {T} value - The value to be deleted.
     */
    delete(value: T): void {
        this.root = this._delete(this.root, value);
    }

    /**
     * Recursive helper function for deleting a value from the tree.
     * @private
     * @param {BinarySearchTreeNode<T> | null} node - The current node in the tree.
     * @param {T} value - The value to be deleted.
     * @returns {BinarySearchTreeNode<T> | null} - The updated node after deletion.
     */
    private _delete(
        node: BinarySearchTreeNode<T> | null,
        value: T,
    ): BinarySearchTreeNode<T> | null {
        if (node === null) return null;

        if (value < node.value) {
            node.left = this._delete(node.left, value);
        } else if (value > node.value) {
            node.right = this._delete(node.right, value);
        } else {
            // Node with one or no child
            if (node.left === null) return node.right;
            if (node.right === null) return node.left;

            // Node with two children
            let successor = node.right;
            while (successor.left !== null) {
                successor = successor.left;
            }
            node.value = successor.value;
            node.right = this._delete(node.right, successor.value);
        }
        return node;
    }

    /**
     * In-order traversal generator function for iterating through tree nodes.
     * Yields each node's value in sorted order.
     * @returns {Generator<T>} - An iterator for the tree.
     */
    *inOrderTraversal(): Generator<T> {
        function* traverse(node: BinarySearchTreeNode<T> | null): Generator<T> {
            if (node) {
                yield* traverse(node.left);
                yield node.value;
                yield* traverse(node.right);
            }
        }
        yield* traverse(this.root);
    }

    /**
     * Implements the iterator protocol, enabling in-order traversal with `for...of`.
     */
    [Symbol.iterator](): Generator<T> {
        return this.inOrderTraversal();
    }
}
