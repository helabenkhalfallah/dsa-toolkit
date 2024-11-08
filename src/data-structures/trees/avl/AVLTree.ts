import { AVLTreeNode } from './AVLTreeNode.ts';

/**
 * Class representing an AVL Tree, a self-balancing binary search tree.
 * @template T - The type of values stored in the tree.
 */
export class AVLTree<T> {
    /**
     * The root node of the AVL tree.
     * @type {AVLTreeNode<T> | null}
     */
    root: AVLTreeNode<T> | null = null;

    /**
     * Gets the height of a given node.
     * @param {AVLTreeNode<T> | null} node - The node to get the height of.
     * @returns {number} The height of the node.
     * @private
     */
    private getHeight(node: AVLTreeNode<T> | null): number {
        return node ? node.height : 0;
    }

    /**
     * Performs a right rotation on the subtree rooted at a given node.
     * @param {AVLTreeNode<T>} y - The root of the subtree to rotate.
     * @returns {AVLTreeNode<T>} The new root after rotation.
     * @private
     */
    private rotateRight(y: AVLTreeNode<T>): AVLTreeNode<T> {
        const x = y.left!;
        const T2 = x.right;

        x.right = y;
        y.left = T2;

        y.height = Math.max(this.getHeight(y.left), this.getHeight(y.right)) + 1;
        x.height = Math.max(this.getHeight(x.left), this.getHeight(x.right)) + 1;

        return x;
    }

    /**
     * Performs a left rotation on the subtree rooted at a given node.
     * @param {AVLTreeNode<T>} x - The root of the subtree to rotate.
     * @returns {AVLTreeNode<T>} The new root after rotation.
     * @private
     */
    private rotateLeft(x: AVLTreeNode<T>): AVLTreeNode<T> {
        const y = x.right!;
        const T2 = y.left;

        y.left = x;
        x.right = T2;

        x.height = Math.max(this.getHeight(x.left), this.getHeight(x.right)) + 1;
        y.height = Math.max(this.getHeight(y.left), this.getHeight(y.right)) + 1;

        return y;
    }

    /**
     * Gets the balance factor of a node.
     * @param {AVLTreeNode<T> | null} node - The node to get the balance factor of.
     * @returns {number} The balance factor of the node.
     * @private
     */
    private getBalance(node: AVLTreeNode<T> | null): number {
        return node ? this.getHeight(node.left) - this.getHeight(node.right) : 0;
    }

    /**
     * Inserts a value into the AVL tree.
     * @param {T} value - The value to insert.
     */
    insert(value: T): void {
        this.root = this._insert(this.root, value);
    }

    /**
     * Helper method to recursively insert a value into the tree.
     * @param {AVLTreeNode<T> | null} node - The current node in the tree.
     * @param {T} value - The value to insert.
     * @returns {AVLTreeNode<T>} The updated node after insertion and rebalancing.
     * @private
     */
    private _insert(node: AVLTreeNode<T> | null, value: T): AVLTreeNode<T> {
        if (!node) return new AVLTreeNode(value);

        if (value < node.value) {
            node.left = this._insert(node.left, value);
        } else if (value > node.value) {
            node.right = this._insert(node.right, value);
        } else {
            return node; // Duplicate values are not allowed
        }

        return this.rebalance(node);
    }

    /**
     * Searches for a value in the AVL tree.
     * @param {T} value - The value to search for.
     * @returns {boolean} True if the value is found, false otherwise.
     */
    search(value: T): boolean {
        return this._search(this.root, value);
    }

    /**
     * Helper method to recursively search for a value in the tree.
     * @param {AVLTreeNode<T> | null} node - The current node in the tree.
     * @param {T} value - The value to search for.
     * @returns {boolean} True if the value is found, false otherwise.
     * @private
     */
    private _search(node: AVLTreeNode<T> | null, value: T): boolean {
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
     * Deletes a value from the AVL tree.
     * @param {T} value - The value to delete.
     */
    delete(value: T): void {
        this.root = this._delete(this.root, value);
    }

    /**
     * Helper method to recursively delete a value from the tree.
     * @param {AVLTreeNode<T> | null} node - The current node in the tree.
     * @param {T} value - The value to delete.
     * @returns {AVLTreeNode<T> | null} The updated node after deletion and rebalancing.
     * @private
     */
    private _delete(node: AVLTreeNode<T> | null, value: T): AVLTreeNode<T> | null {
        if (node === null) return node;

        if (value < node.value) {
            node.left = this._delete(node.left, value);
        } else if (value > node.value) {
            node.right = this._delete(node.right, value);
        } else {
            if (!node.left || !node.right) {
                node = node.left || node.right;
            } else {
                let successor = node.right;
                while (successor.left !== null) {
                    successor = successor.left;
                }
                node.value = successor.value;
                node.right = this._delete(node.right, successor.value);
            }
        }

        if (!node) return node;

        return this.rebalance(node);
    }

    /**
     * Rebalances the subtree rooted at the given node.
     * @param {AVLTreeNode<T>} node - The root of the subtree to rebalance.
     * @returns {AVLTreeNode<T>} The new root of the balanced subtree.
     * @private
     */
    private rebalance(node: AVLTreeNode<T>): AVLTreeNode<T> {
        node.height = Math.max(this.getHeight(node.left), this.getHeight(node.right)) + 1;
        const balance = this.getBalance(node);

        // Left Left Case
        if (balance > 1 && this.getBalance(node.left) >= 0) {
            return this.rotateRight(node);
        }
        // Left Right Case
        if (balance > 1 && this.getBalance(node.left) < 0) {
            node.left = this.rotateLeft(node.left!);
            return this.rotateRight(node);
        }
        // Right Right Case
        if (balance < -1 && this.getBalance(node.right) <= 0) {
            return this.rotateLeft(node);
        }
        // Right Left Case
        if (balance < -1 && this.getBalance(node.right) > 0) {
            node.right = this.rotateRight(node.right!);
            return this.rotateLeft(node);
        }

        return node;
    }
}
