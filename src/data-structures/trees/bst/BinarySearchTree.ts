import { BinarySearchTreeNode } from './BinarySearchTreeNode.ts';

export class BinarySearchTree<T> {
    root: BinarySearchTreeNode<T> | null = null;

    insert(value: T): void {
        this.root = this._insert(this.root, value);
    }

    private _insert(node: BinarySearchTreeNode<T> | null, value: T): BinarySearchTreeNode<T> {
        if (node === null) {
            return new BinarySearchTreeNode(value);
        }
        if (value < node.value) {
            node.left = this._insert(node.left, value);
        } else if (value > node.value) {
            node.right = this._insert(node.right, value);
        }
        return node;
    }

    search(value: T): boolean {
        return this._search(this.root, value) !== null;
    }

    private _search(
        node: BinarySearchTreeNode<T> | null,
        value: T,
    ): BinarySearchTreeNode<T> | null {
        if (node === null || node.value === value) {
            return node;
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
            if (node.left === null) return node.right;
            if (node.right === null) return node.left;

            const minValue = this._minValue(node.right);
            node.value = minValue;
            node.right = this._delete(node.right, minValue);
        }
        return node;
    }

    private _minValue(node: BinarySearchTreeNode<T>): T {
        let current = node;
        while (current.left !== null) {
            current = current.left;
        }
        return current.value;
    }
}
