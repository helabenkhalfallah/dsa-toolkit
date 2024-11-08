import { DoublyLinkedList } from './data-structures/linked-list/DoublyLinkedList.ts';
import { LinkedList } from './data-structures/linked-list/LinkedList.ts';
import { AVLTree } from './data-structures/trees/avl/AVLTree.ts';
import { BTree } from './data-structures/trees/b-tree/BTree.ts';
import { BinarySearchTree } from './data-structures/trees/bst/BinarySearchTree.ts';
import { RedBlackTree } from './data-structures/trees/red-black/RedBlackTree.ts';
import { measureTime } from './utils/PerformanceUtils.ts';

const DATA_LENGTH = 100000;
const data = Array.from({ length: DATA_LENGTH }, () => Math.floor(Math.random() * DATA_LENGTH));

/*
const DATA_LENGTH = 100000;

BST Insert Time: 18.396457999999996 ms
BST Search Time: 15.840791999999965 ms
BST Delete Time: 15.926249999999982 ms
AVL Tree Insert Time: 24.914707999999962 ms
AVL Tree Search Time: 14.21187500000002 ms
AVL Tree Delete Time: 23.679624999999987 ms
Red-Black Tree Insert Time: 23.002749999999992 ms
Red-Black Tree Search Time: 19.270332999999937 ms
Red-Black Tree Delete Time: 25.372124999999983 ms
B-Tree Insert Time: 27.188125000000014 ms
B-Tree Search Time: 18.942874999999958 ms
B-Tree Delete Time: 33.72004199999992 ms
Linked List Insert Time: 1.1497499999999263 ms
Linked List Search Time: 6170.690875 ms
Linked List Delete Time: 0.9895420000002559 ms
Linked List Insert at Beginning: 0.004041000000142958 ms
Linked List Insert at Middle: 0.026333000000704487 ms
Linked List Insert at End: 0.004415999999764608 ms
Linked List Delete at Beginning: 0.002583000000413449 ms
Linked List Delete at Middle: 0.0021670000005542533 ms
Linked List Delete at End: 0.005041999999775726 ms
Doubly Linked List Insert Time: 1.1463330000005953 ms
Doubly Linked List Search Time: 6655.976125000001 ms
Doubly Linked List Delete Time: 1.112875000000713 ms
Doubly Linked List Insert at Beginning: 0.004124999999476131 ms
Doubly Linked List Insert at Middle: 0.028500000000349246 ms
Doubly Linked List Insert at End: 0.004500000000916771 ms
Doubly Linked List Delete at Beginning: 0.0024580000008427305 ms
Doubly Linked List Delete at Middle: 0.0020839999997406267 ms
Doubly Linked List Delete at End: 0.004915999999866472 ms
Array Insert Time: 0.8365840000005846 ms
Array Search Time: 507.68804099999943 ms
Array Delete Time: 1861.601917 ms
Array Insert at Beginning: 0.037374999999883585 ms
Array Insert at Middle: 0.004832999999052845 ms
Array Insert at End: 0.003582999999707681 ms
Array Delete at Beginning: 0.0041250000012951205 ms
Array Delete at Middle: 0.0028750000001309672 ms
Array Delete at End: 0.003917000000001281 ms
 */

// Position indices for testing different operations
const middleIndex = Math.floor(DATA_LENGTH / 2);
const lastIndex = DATA_LENGTH - 1;

// Sample values for specific position testings
const beginValue = -1;
const middleValue = -2;
const endValue = -3;

// Benchmarking for each data structure

// BST
const bst = new BinarySearchTree<number>();
const bstInsertTime = measureTime(() => data.forEach((value) => bst.insert(value)));
const bstSearchTime = measureTime(() => data.forEach((value) => bst.search(value)));
const bstDeleteTime = measureTime(() => data.forEach((value) => bst.delete(value)));

// AVL Tree
const avlTree = new AVLTree<number>();
const avlInsertTime = measureTime(() => data.forEach((value) => avlTree.insert(value)));
const avlSearchTime = measureTime(() => data.forEach((value) => avlTree.search(value)));
const avlDeleteTime = measureTime(() => data.forEach((value) => avlTree.delete(value)));

// Red-Black Tree
const rbTree = new RedBlackTree<number>();
const rbInsertTime = measureTime(() => data.forEach((value) => rbTree.insert(value)));
const rbSearchTime = measureTime(() => data.forEach((value) => rbTree.search(value)));
const rbDeleteTime = measureTime(() => data.forEach((value) => rbTree.delete(value)));

// B-Tree
const bTree = new BTree<number>(3);
const bTreeInsertTime = measureTime(() => data.forEach((value) => bTree.insert(value)));
const bTreeSearchTime = measureTime(() => data.forEach((value) => bTree.search(value)));
const bTreeDeleteTime = measureTime(() => data.forEach((value) => bTree.delete(value)));

// Singly Linked List
const linkedList = new LinkedList<number>();
const linkedListInsertTime = measureTime(() => data.forEach((value) => linkedList.insert(value)));
const linkedListSearchTime = measureTime(() => data.forEach((value) => linkedList.search(value)));
const linkedListDeleteTime = measureTime(() => data.forEach((value) => linkedList.delete(value)));

// Specific position operations for Singly Linked List
const linkedListMiddleInsertTime = measureTime(() => linkedList.insertAt(middleValue, middleIndex));
const linkedListBeginInsertTime = measureTime(() => linkedList.insertAt(beginValue, 0));
const linkedListEndInsertTime = measureTime(() => linkedList.insertAt(endValue, lastIndex + 1));
const linkedListBeginDeleteTime = measureTime(() => linkedList.delete(beginValue));
const linkedListMiddleDeleteTime = measureTime(() => linkedList.delete(middleValue));
const linkedListEndDeleteTime = measureTime(() => linkedList.delete(endValue));

// Doubly Linked List
const doublyLinkedList = new DoublyLinkedList<number>();
const doublyLinkedListInsertTime = measureTime(() =>
    data.forEach((value) => doublyLinkedList.insert(value)),
);
const doublyLinkedListSearchTime = measureTime(() =>
    data.forEach((value) => doublyLinkedList.search(value)),
);
const doublyLinkedListDeleteTime = measureTime(() =>
    data.forEach((value) => doublyLinkedList.delete(value)),
);

// Specific position operations for Doubly Linked List
const doublyLinkedListMiddleInsertTime = measureTime(() =>
    doublyLinkedList.insertAt(middleValue, middleIndex),
);
const doublyLinkedListBeginInsertTime = measureTime(() => doublyLinkedList.insertAt(beginValue, 0));
const doublyLinkedListEndInsertTime = measureTime(() =>
    doublyLinkedList.insertAt(endValue, lastIndex + 1),
);
const doublyLinkedListBeginDeleteTime = measureTime(() => doublyLinkedList.delete(beginValue));
const doublyLinkedListMiddleDeleteTime = measureTime(() => doublyLinkedList.delete(middleValue));
const doublyLinkedListEndDeleteTime = measureTime(() => doublyLinkedList.delete(endValue));

// Array
const arr: number[] = [];
const arrInsertTime = measureTime(() => data.forEach((value) => arr.push(value)));
const arrSearchTime = measureTime(() => data.forEach((value) => arr.includes(value)));
const arrDeleteTime = measureTime(() =>
    data.forEach((value) => {
        const index = arr.indexOf(value);
        if (index > -1) arr.splice(index, 1);
    }),
);

// Specific position operations for Array
const arrBeginInsertTime = measureTime(() => arr.splice(0, 0, beginValue));
const arrMiddleInsertTime = measureTime(() => arr.splice(middleIndex, 0, middleValue));
const arrEndInsertTime = measureTime(() => arr.push(endValue));
const arrBeginDeleteTime = measureTime(() => arr.splice(arr.indexOf(beginValue), 1));
const arrMiddleDeleteTime = measureTime(() => arr.splice(arr.indexOf(middleValue), 1));
const arrEndDeleteTime = measureTime(() => arr.pop());

// Log results
console.log('BST Insert Time:', bstInsertTime, 'ms');
console.log('BST Search Time:', bstSearchTime, 'ms');
console.log('BST Delete Time:', bstDeleteTime, 'ms');

console.log('AVL Tree Insert Time:', avlInsertTime, 'ms');
console.log('AVL Tree Search Time:', avlSearchTime, 'ms');
console.log('AVL Tree Delete Time:', avlDeleteTime, 'ms');

console.log('Red-Black Tree Insert Time:', rbInsertTime, 'ms');
console.log('Red-Black Tree Search Time:', rbSearchTime, 'ms');
console.log('Red-Black Tree Delete Time:', rbDeleteTime, 'ms');

console.log('B-Tree Insert Time:', bTreeInsertTime, 'ms');
console.log('B-Tree Search Time:', bTreeSearchTime, 'ms');
console.log('B-Tree Delete Time:', bTreeDeleteTime, 'ms');

console.log('Linked List Insert Time:', linkedListInsertTime, 'ms');
console.log('Linked List Search Time:', linkedListSearchTime, 'ms');
console.log('Linked List Delete Time:', linkedListDeleteTime, 'ms');

console.log('Linked List Insert at Beginning:', linkedListBeginInsertTime, 'ms');
console.log('Linked List Insert at Middle:', linkedListMiddleInsertTime, 'ms');
console.log('Linked List Insert at End:', linkedListEndInsertTime, 'ms');
console.log('Linked List Delete at Beginning:', linkedListBeginDeleteTime, 'ms');
console.log('Linked List Delete at Middle:', linkedListMiddleDeleteTime, 'ms');
console.log('Linked List Delete at End:', linkedListEndDeleteTime, 'ms');

console.log('Doubly Linked List Insert Time:', doublyLinkedListInsertTime, 'ms');
console.log('Doubly Linked List Search Time:', doublyLinkedListSearchTime, 'ms');
console.log('Doubly Linked List Delete Time:', doublyLinkedListDeleteTime, 'ms');

console.log('Doubly Linked List Insert at Beginning:', doublyLinkedListBeginInsertTime, 'ms');
console.log('Doubly Linked List Insert at Middle:', doublyLinkedListMiddleInsertTime, 'ms');
console.log('Doubly Linked List Insert at End:', doublyLinkedListEndInsertTime, 'ms');
console.log('Doubly Linked List Delete at Beginning:', doublyLinkedListBeginDeleteTime, 'ms');
console.log('Doubly Linked List Delete at Middle:', doublyLinkedListMiddleDeleteTime, 'ms');
console.log('Doubly Linked List Delete at End:', doublyLinkedListEndDeleteTime, 'ms');

console.log('Array Insert Time:', arrInsertTime, 'ms');
console.log('Array Search Time:', arrSearchTime, 'ms');
console.log('Array Delete Time:', arrDeleteTime, 'ms');
console.log('Array Insert at Beginning:', arrBeginInsertTime, 'ms');
console.log('Array Insert at Middle:', arrMiddleInsertTime, 'ms');
console.log('Array Insert at End:', arrEndInsertTime, 'ms');
console.log('Array Delete at Beginning:', arrBeginDeleteTime, 'ms');
console.log('Array Delete at Middle:', arrMiddleDeleteTime, 'ms');
console.log('Array Delete at End:', arrEndDeleteTime, 'ms');
