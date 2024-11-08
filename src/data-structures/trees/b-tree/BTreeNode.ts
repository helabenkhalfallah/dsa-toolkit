export class BTreeNode<T> {
    keys: T[] = [];
    children: BTreeNode<T>[] = [];
    leaf: boolean;

    constructor(leaf: boolean) {
        this.leaf = leaf;
    }
}
