export enum Color {
    RED,
    BLACK,
}

export class RedBlackTreeNode<T> {
    value: T;
    color: Color;
    left: RedBlackTreeNode<T> | null = null;
    right: RedBlackTreeNode<T> | null = null;
    parent: RedBlackTreeNode<T> | null = null;

    constructor(value: T, color: Color = Color.RED) {
        this.value = value;
        this.color = color;
    }
}
