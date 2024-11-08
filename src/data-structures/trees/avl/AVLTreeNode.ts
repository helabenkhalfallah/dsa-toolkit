export class AVLTreeNode<T> {
    value: T;
    height: number = 1;
    left: AVLTreeNode<T> | null = null;
    right: AVLTreeNode<T> | null = null;

    constructor(value: T) {
        this.value = value;
    }
}
