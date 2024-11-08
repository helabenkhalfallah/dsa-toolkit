import { AVLTreeNode } from './AVLTreeNode.ts';

export class AVLTree<T> {
    root: AVLTreeNode<T> | null = null;

    private getHeight(node: AVLTreeNode<T> | null): number {
        return node ? node.height : 0;
    }

    private rotateRight(y: AVLTreeNode<T>): AVLTreeNode<T> {
        const x = y.left!;
        const T2 = x.right;

        x.right = y;
        y.left = T2;

        y.height = Math.max(this.getHeight(y.left), this.getHeight(y.right)) + 1;
        x.height = Math.max(this.getHeight(x.left), this.getHeight(x.right)) + 1;

        return x;
    }

    private rotateLeft(x: AVLTreeNode<T>): AVLTreeNode<T> {
        const y = x.right!;
        const T2 = y.left;

        y.left = x;
        x.right = T2;

        x.height = Math.max(this.getHeight(x.left), this.getHeight(x.right)) + 1;
        y.height = Math.max(this.getHeight(y.left), this.getHeight(y.right)) + 1;

        return y;
    }

    private getBalance(node: AVLTreeNode<T> | null): number {
        return node ? this.getHeight(node.left) - this.getHeight(node.right) : 0;
    }

    insert(value: T): void {
        this.root = this._insert(this.root, value);
    }

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

    search(value: T): boolean {
        return this._search(this.root, value);
    }

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

    delete(value: T): void {
        this.root = this._delete(this.root, value);
    }

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
