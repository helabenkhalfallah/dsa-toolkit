export class BinarySearchTreeNode<T> {
    value: T;
    left: BinarySearchTreeNode<T> | null = null;
    right: BinarySearchTreeNode<T> | null = null;

    constructor(value: T) {
        this.value = value;
    }
}
