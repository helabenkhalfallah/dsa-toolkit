import { AVLTreeNode } from './AVLTreeNode.ts';

export class AVLTree<T> {
    root: AVLTreeNode<T> | null = null;

    // Get the height of a node
    private getHeight(node: AVLTreeNode<T> | null): number {
        return node ? node.height : 0;
    }

    // Right rotate a subtree rooted with y
    private rotateRight(y: AVLTreeNode<T>): AVLTreeNode<T> {
        const x = y.left!;
        const T2 = x.right;

        // Perform rotation
        x.right = y;
        y.left = T2;

        // Update heights
        y.height = Math.max(this.getHeight(y.left), this.getHeight(y.right)) + 1;
        x.height = Math.max(this.getHeight(x.left), this.getHeight(x.right)) + 1;

        // Return new root
        return x;
    }

    // Left rotate a subtree rooted with x
    private rotateLeft(x: AVLTreeNode<T>): AVLTreeNode<T> {
        const y = x.right!;
        const T2 = y.left;

        // Perform rotation
        y.left = x;
        x.right = T2;

        // Update heights
        x.height = Math.max(this.getHeight(x.left), this.getHeight(x.right)) + 1;
        y.height = Math.max(this.getHeight(y.left), this.getHeight(y.right)) + 1;

        // Return new root
        return y;
    }

    // Get balance factor of node
    private getBalance(node: AVLTreeNode<T> | null): number {
        return node ? this.getHeight(node.left) - this.getHeight(node.right) : 0;
    }

    // Insert a value into the AVL tree
    insert(value: T): void {
        this.root = this._insert(this.root, value);
    }

    private _insert(node: AVLTreeNode<T> | null, value: T): AVLTreeNode<T> {
        // Perform normal BST insertion
        if (!node) return new AVLTreeNode(value);
        if (value < node.value) node.left = this._insert(node.left, value);
        else if (value > node.value) node.right = this._insert(node.right, value);
        else return node; // Duplicate values are not allowed

        // Update height of this ancestor node
        node.height = Math.max(this.getHeight(node.left), this.getHeight(node.right)) + 1;

        // Get the balance factor
        const balance = this.getBalance(node);

        // Rotate to maintain balance
        // Left Left Case
        if (balance > 1 && value < node.left!.value) {
            return this.rotateRight(node);
        }
        // Right Right Case
        if (balance < -1 && value > node.right!.value) {
            return this.rotateLeft(node);
        }
        // Left Right Case
        if (balance > 1 && value > node.left!.value) {
            node.left = this.rotateLeft(node.left!);
            return this.rotateRight(node);
        }
        // Right Left Case
        if (balance < -1 && value < node.right!.value) {
            node.right = this.rotateRight(node.right!);
            return this.rotateLeft(node);
        }

        return node;
    }

    // Search for a value in the AVL tree
    search(value: T): boolean {
        return this._search(this.root, value) !== null;
    }

    private _search(node: AVLTreeNode<T> | null, value: T): AVLTreeNode<T> | null {
        if (node === null || node.value === value) return node;
        if (value < node.value) return this._search(node.left, value);
        else return this._search(node.right, value);
    }

    // Delete a value from the AVL tree
    delete(value: T): void {
        this.root = this._delete(this.root, value);
    }

    private _delete(node: AVLTreeNode<T> | null, value: T): AVLTreeNode<T> | null {
        if (node === null) return node;

        // Perform standard BST delete
        if (value < node.value) node.left = this._delete(node.left, value);
        else if (value > node.value) node.right = this._delete(node.right, value);
        else {
            // Node with one or no child
            if (!node.left || !node.right) {
                node = node.left || node.right;
            } else {
                // Node with two children: Get the in-order successor (smallest in the right subtree)
                const temp = this.getMinValueNode(node.right);
                node.value = temp.value;
                node.right = this._delete(node.right, temp.value);
            }
        }

        if (!node) return node;

        // Update height of the current node
        node.height = Math.max(this.getHeight(node.left), this.getHeight(node.right)) + 1;

        // Get the balance factor
        const balance = this.getBalance(node);

        // Balance the tree
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

    // Helper to find the node with the minimum value (used in deletion)
    private getMinValueNode(node: AVLTreeNode<T>): AVLTreeNode<T> {
        let current = node;
        while (current.left !== null) {
            current = current.left;
        }
        return current;
    }
}
