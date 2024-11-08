import { DoublyLinkedList } from './data-structures/linked-list/DoublyLinkedList.ts';
import { LinkedList } from './data-structures/linked-list/LinkedList.ts';
import { AVLTree } from './data-structures/trees/avl/AVLTree.ts';
import { BTree } from './data-structures/trees/b-tree/BTree.ts';
import { BinarySearchTree } from './data-structures/trees/bst/BinarySearchTree.ts';
import { RedBlackTree } from './data-structures/trees/red-black/RedBlackTree.ts';
import { measureTime } from './utils/PerformanceUtils.ts';

// Dataset configurations
const SMALL_DATA = 100;
const MEDIUM_DATA = 1000;
const LARGE_DATA = 10000;
const HUGE_DATA = 100000;

// Operation cases
const BEST_CASE = 'Best';
const AVERAGE_CASE = 'Average';
const WORST_CASE = 'Worst';

// Helper function to generate random data arrays for different cases
function generateData(size: number): number[] {
    return Array.from({ length: size }, () => Math.floor(Math.random() * size));
}

// Function to perform benchmark on various data structures
function runBenchmark(dataSize: number, operationCase: string) {
    const data = generateData(dataSize);
    const bst = new BinarySearchTree<number>();
    const avlTree = new AVLTree<number>();
    const rbTree = new RedBlackTree<number>();
    const linkedList = new LinkedList<number>();
    const doublyLinkedList = new DoublyLinkedList<number>();
    const bTree = new BTree<number>(3);
    const array: number[] = [];

    // Initialize data structures with the initial data set
    data.forEach((value) => {
        bst.insert(value);
        avlTree.insert(value);
        rbTree.insert(value);
        linkedList.insert(value);
        doublyLinkedList.insert(value);
        bTree.insert(value);
        array.push(value);
    });

    console.log(`\n=== Benchmark for Data Size: ${dataSize}, Case: ${operationCase} ===`);

    // INSERTION
    console.log(`\n--- Insert Benchmark ---`);
    const valueToInsert = operationCase === WORST_CASE ? dataSize + 1 : Math.floor(dataSize / 2);

    console.log(
        'Array Insert:',
        measureTime(() => array.push(valueToInsert)),
        'ms',
    );
    console.log(
        'BST Insert:',
        measureTime(() => bst.insert(valueToInsert)),
        'ms',
    );
    console.log(
        'AVL Insert:',
        measureTime(() => avlTree.insert(valueToInsert)),
        'ms',
    );
    console.log(
        'Red-Black Insert:',
        measureTime(() => rbTree.insert(valueToInsert)),
        'ms',
    );
    console.log(
        'Linked List Insert:',
        measureTime(() => linkedList.insert(valueToInsert)),
        'ms',
    );
    console.log(
        'Doubly Linked List Insert:',
        measureTime(() => doublyLinkedList.insert(valueToInsert)),
        'ms',
    );
    console.log(
        'B-Tree Insert:',
        measureTime(() => bTree.insert(valueToInsert)),
        'ms',
    );

    // READ (Access first, middle, or last element based on the case)
    console.log(`\n--- Read Benchmark ---`);
    const indexToRead =
        operationCase === BEST_CASE
            ? 0
            : operationCase === WORST_CASE
              ? dataSize - 1
              : Math.floor(dataSize / 2);
    console.log(`\n---Index To Read: ${indexToRead} ---`);

    console.log(
        'Array Read:',
        measureTime(() => array[indexToRead]),
        'ms',
    );
    console.log(
        'Linked List Read:',
        measureTime(() => linkedList.getAt(indexToRead)),
        'ms',
    );
    console.log(
        'Doubly Linked List Read:',
        measureTime(() => doublyLinkedList.getAt(indexToRead)),
        'ms',
    );
    // Trees don’t support direct access, so we use search instead.

    // SEARCH
    console.log(`\n--- Search Benchmark ---`);
    const valueToSearch =
        operationCase === BEST_CASE
            ? data[0]
            : operationCase === WORST_CASE
              ? data[dataSize - 1]
              : data[Math.floor(dataSize / 2)];
    console.log(`\n---Value To Search: ${valueToSearch} ---`);

    console.log(
        'Array Search:',
        measureTime(() => array.includes(valueToSearch)),
        'ms',
    );
    console.log(
        'BST Search:',
        measureTime(() => bst.search(valueToSearch)),
        'ms',
    );
    console.log(
        'AVL Search:',
        measureTime(() => avlTree.search(valueToSearch)),
        'ms',
    );
    console.log(
        'Red-Black Search:',
        measureTime(() => rbTree.search(valueToSearch)),
        'ms',
    );
    console.log(
        'Linked List Search:',
        measureTime(() => linkedList.search(valueToSearch)),
        'ms',
    );
    console.log(
        'Doubly Linked List Search:',
        measureTime(() => doublyLinkedList.search(valueToSearch)),
        'ms',
    );
    console.log(
        'B-Tree Search:',
        measureTime(() => bTree.search(valueToSearch)),
        'ms',
    );

    // DELETE
    console.log(`\n--- Delete Benchmark ---`);
    const valueToDelete =
        operationCase === BEST_CASE
            ? data[0]
            : operationCase === WORST_CASE
              ? data[dataSize - 1]
              : data[Math.floor(dataSize / 2)];
    console.log(`\n---Value To Delete: ${valueToDelete} ---`);

    console.log(
        'Array Delete:',
        measureTime(() => {
            const index = array.indexOf(valueToDelete);
            if (index > -1) array.splice(index, 1);
        }),
        'ms',
    );
    console.log(
        'BST Delete:',
        measureTime(() => bst.delete(valueToDelete)),
        'ms',
    );
    console.log(
        'AVL Delete:',
        measureTime(() => avlTree.delete(valueToDelete)),
        'ms',
    );
    console.log(
        'Red-Black Delete:',
        measureTime(() => rbTree.delete(valueToDelete)),
        'ms',
    );
    console.log(
        'Linked List Delete:',
        measureTime(() => linkedList.delete(valueToDelete)),
        'ms',
    );
    console.log(
        'Doubly Linked List Delete:',
        measureTime(() => doublyLinkedList.delete(valueToDelete)),
        'ms',
    );
    console.log(
        'B-Tree Delete:',
        measureTime(() => bTree.delete(valueToDelete)),
        'ms',
    );
}

// Function to perform benchmark on array-specific operations
function runArrayBenchmark(dataSize: number) {
    const data = generateData(dataSize);

    console.log(`\n=== Array Benchmark for Data Size: ${dataSize}`);

    // Insert Benchmark (Push to the end of the array)
    const arrayInsertTime = measureTime(() => {
        data.push(dataSize + 1);
    });
    console.log('Array Insert (Push to end):', arrayInsertTime, 'ms');

    // Read Benchmark (Access first element)
    const arrayReadTime = measureTime(() => {
        // eslint-disable-next-line
        const _ = data[0];
    });
    console.log('Array Read (First element):', arrayReadTime, 'ms');

    // Search Benchmark (Linear search for a random element)
    const valueToSearch = data[Math.floor(dataSize / 2)];
    const arraySearchTime = measureTime(() => {
        data.includes(valueToSearch);
    });
    console.log('Array Search (Includes):', arraySearchTime, 'ms');

    // Delete Benchmark (Remove last element)
    const arrayDeleteTime = measureTime(() => {
        data.pop();
    });
    console.log('Array Delete (Pop from end):', arrayDeleteTime, 'ms');

    // For Loop Benchmark
    const arrayForTime = measureTime(() => {
        for (let i = 0; i < data.length; i++) {
            // eslint-disable-next-line
            const _ = data[i];
        }
    });
    console.log('Array For Loop:', arrayForTime, 'ms');

    // Map Benchmark
    const arrayMapTime = measureTime(() => {
        data.map((x) => x * 2);
    });
    console.log('Array Map:', arrayMapTime, 'ms');

    // Filter Benchmark (Filtering values greater than half the dataset size)
    const threshold = dataSize / 2;
    const arrayFilterTime = measureTime(() => {
        data.filter((x) => x > threshold);
    });
    console.log('Array Filter (Values > threshold):', arrayFilterTime, 'ms');

    // Sort Benchmark
    const arraySortTime = measureTime(() => {
        [...data].sort((a, b) => a - b); // Clone array to prevent mutation
    });
    console.log('Array Sort:', arraySortTime, 'ms');
}

// Run the benchmark for different dataset sizes and cases
[SMALL_DATA, MEDIUM_DATA, LARGE_DATA, HUGE_DATA].forEach((dataSize) => {
    [BEST_CASE, AVERAGE_CASE, WORST_CASE].forEach((operationCase) => {
        runBenchmark(dataSize, operationCase);
    });
});

// Run the benchmark for different dataset sizes
[SMALL_DATA, MEDIUM_DATA, LARGE_DATA, HUGE_DATA].forEach((dataSize) => {
    runArrayBenchmark(dataSize);
});

/*
=== Array Benchmark for Data Size: 100
Array Insert (Push to end): 0.004249999999956344 ms
Array Read (First element): 0.004541000000017448 ms
Array Search (Includes): 0.0050420000000030996 ms
Array Delete (Pop from end): 0.004666999999983545 ms
Array For Loop: 0.012457999999980984 ms
Array Map: 0.012000000000000455 ms
Array Filter (Values > threshold): 0.00925000000000864 ms
Array Sort: 0.02354099999996606 ms

=== Array Benchmark for Data Size: 1000
Array Insert (Push to end): 0.0056249999999522515 ms
Array Read (First element): 0.0007499999999822649 ms
Array Search (Includes): 0.0007919999999899119 ms
Array Delete (Pop from end): 0.0005419999999958236 ms
Array For Loop: 0.01733400000000529 ms
Array Map: 0.011832999999967342 ms
Array Filter (Values > threshold): 0.019000000000005457 ms
Array Sort: 0.12133299999999281 ms

=== Array Benchmark for Data Size: 10000
Array Insert (Push to end): 0.005791999999985364 ms
Array Read (First element): 0.0002910000000042601 ms
Array Search (Includes): 0.0012080000000196378 ms
Array Delete (Pop from end): 0.00037500000001955414 ms
Array For Loop: 0.0282919999999649 ms
Array Map: 0.0695840000000203 ms
Array Filter (Values > threshold): 0.11529199999995399 ms
Array Sort: 1.1870000000000118 ms

=== Array Benchmark for Data Size: 100000
Array Insert (Push to end): 0.12370800000002191 ms
Array Read (First element): 0.0003330000000119071 ms
Array Search (Includes): 0.0035419999999817264 ms
Array Delete (Pop from end): 0.00041699999997035775 ms
Array For Loop: 0.0977500000000191 ms
Array Map: 0.5434169999999767 ms
Array Filter (Values > threshold): 1.0697920000000067 ms
Array Sort: 15.142917000000011 ms
 */

/*
=== Benchmark for Data Size: 100, Case: Best ===

--- Insert Benchmark ---
Array Insert: 0.0038749999999936335 ms
BST Insert: 0.005415999999968335 ms
AVL Insert: 0.006874999999979536 ms
Red-Black Insert: 0.00620800000001509 ms
Linked List Insert: 0.00533300000000736 ms
Doubly Linked List Insert: 0.0036249999999995453 ms
B-Tree Insert: 0.0060839999999871 ms

--- Read Benchmark ---

---Index To Read: 0 ---
Array Read: 0.004583000000025095 ms
Linked List Read: 0.014375000000029559 ms
Doubly Linked List Read: 0.024459000000035758 ms

--- Search Benchmark ---

---Value To Search: 9 ---
Array Search: 0.004416999999989457 ms
BST Search: 0.014458000000047377 ms
AVL Search: 0.013916999999992186 ms
Red-Black Search: 0.012084000000015749 ms
Linked List Search: 0.010083000000008724 ms
Doubly Linked List Search: 0.008625000000051841 ms
B-Tree Search: 0.016875000000027285 ms

--- Delete Benchmark ---

---Value To Delete: 9 ---
Array Delete: 0.009792000000004464 ms
BST Delete: 0.02250000000003638 ms
AVL Delete: 0.01887499999997999 ms
Red-Black Delete: 0.046959000000015294 ms
Linked List Delete: 0.013084000000048945 ms
Doubly Linked List Delete: 0.014541000000008353 ms
B-Tree Delete: 0.07425000000000637 ms

=== Benchmark for Data Size: 100, Case: Average ===

--- Insert Benchmark ---
Array Insert: 0.0005419999999958236 ms
BST Insert: 0.0006250000000136424 ms
AVL Insert: 0.0007919999999899119 ms
Red-Black Insert: 0.0007920000000467553 ms
Linked List Insert: 0.00037500000001955414 ms
Doubly Linked List Insert: 0.0003330000000119071 ms
B-Tree Insert: 0.0012080000000196378 ms

--- Read Benchmark ---

---Index To Read: 50 ---
Array Read: 0.00020800000004328467 ms
Linked List Read: 0.003333999999995285 ms
Doubly Linked List Read: 0.0036670000000071923 ms

--- Search Benchmark ---

---Value To Search: 27 ---
Array Search: 0.0006250000000136424 ms
BST Search: 0.0008749999999508873 ms
AVL Search: 0.005749999999977717 ms
Red-Black Search: 0.0007079999999746178 ms
Linked List Search: 0.0018330000000332802 ms
Doubly Linked List Search: 0.0014170000000035543 ms
B-Tree Search: 0.0017500000000154614 ms

--- Delete Benchmark ---

---Value To Delete: 27 ---
Array Delete: 0.001082999999994172 ms
BST Delete: 0.0014579999999568827 ms
AVL Delete: 0.0027499999999918145 ms
Red-Black Delete: 0.05558400000001029 ms
Linked List Delete: 0.004124999999987722 ms
Doubly Linked List Delete: 0.0020830000000273685 ms
B-Tree Delete: 0.06529100000000199 ms

=== Benchmark for Data Size: 100, Case: Worst ===

--- Insert Benchmark ---
Array Insert: 0.00050000000004502 ms
BST Insert: 0.0004589999999780048 ms
AVL Insert: 0.0009159999999610591 ms
Red-Black Insert: 0.0007919999999899119 ms
Linked List Insert: 0.0002920000000017353 ms
Doubly Linked List Insert: 0.00033400000000938235 ms
B-Tree Insert: 0.0006660000000238142 ms

--- Read Benchmark ---

---Index To Read: 99 ---
Array Read: 0.0002499999999940883 ms
Linked List Read: 0.0015000000000213731 ms
Doubly Linked List Read: 0.002999999999985903 ms

--- Search Benchmark ---

---Value To Search: 7 ---
Array Search: 0.0003749999999627107 ms
BST Search: 0.0011660000000119908 ms
AVL Search: 0.0009170000000153777 ms
Red-Black Search: 0.0008750000000077307 ms
Linked List Search: 0.0017920000000231084 ms
Doubly Linked List Search: 0.0015839999999798238 ms
B-Tree Search: 0.001791999999966265 ms

--- Delete Benchmark ---

---Value To Delete: 7 ---
Array Delete: 0.0007919999999899119 ms
BST Delete: 0.0028340000000071086 ms
AVL Delete: 0.0029170000000249274 ms
Red-Black Delete: 0.0025840000000130203 ms
Linked List Delete: 0.0024999999999977263 ms
Doubly Linked List Delete: 0.003333999999995285 ms
B-Tree Delete: 0.0072499999999990905 ms

=== Benchmark for Data Size: 1000, Case: Best ===

--- Insert Benchmark ---
Array Insert: 0.0006250000000136424 ms
BST Insert: 0.0005840000000034706 ms
AVL Insert: 0.0005409999999983484 ms
Red-Black Insert: 0.000666999999964446 ms
Linked List Insert: 0.00037500000001955414 ms
Doubly Linked List Insert: 0.0003330000000119071 ms
B-Tree Insert: 0.0014170000000035543 ms

--- Read Benchmark ---

---Index To Read: 0 ---
Array Read: 0.0002499999999940883 ms
Linked List Read: 0.0003330000000119071 ms
Doubly Linked List Read: 0.01587499999999409 ms

--- Search Benchmark ---

---Value To Search: 580 ---
Array Search: 0.0003330000000119071 ms
BST Search: 0.0007919999999899119 ms
AVL Search: 0.0016249999999899956 ms
Red-Black Search: 0.0013339999999857355 ms
Linked List Search: 0.0002920000000017353 ms
Doubly Linked List Search: 0.0002920000000017353 ms
B-Tree Search: 0.003375000000005457 ms

--- Delete Benchmark ---

---Value To Delete: 580 ---
Array Delete: 0.0010420000000408436 ms
BST Delete: 0.0017910000000256332 ms
AVL Delete: 0.0019169999999917309 ms
Red-Black Delete: 0.0030000000000427463 ms
Linked List Delete: 0.001125000000001819 ms
Doubly Linked List Delete: 0.0014579999999568827 ms
B-Tree Delete: 0.02949999999998454 ms

=== Benchmark for Data Size: 1000, Case: Average ===

--- Insert Benchmark ---
Array Insert: 0.0007919999999899119 ms
BST Insert: 0.0005409999999983484 ms
AVL Insert: 0.0006670000000212895 ms
Red-Black Insert: 0.0004999999999881766 ms
Linked List Insert: 0.0004589999999780048 ms
Doubly Linked List Insert: 0.0004999999999881766 ms
B-Tree Insert: 0.0007500000000391083 ms

--- Read Benchmark ---

---Index To Read: 500 ---
Array Read: 0.0002499999999940883 ms
Linked List Read: 0.006917000000044027 ms
Doubly Linked List Read: 0.020041999999989457 ms

--- Search Benchmark ---

---Value To Search: 695 ---
Array Search: 0.0005830000000059954 ms
BST Search: 0.0027919999999994616 ms
AVL Search: 0.0009170000000153777 ms
Red-Black Search: 0.0008330000000000837 ms
Linked List Search: 0.005082999999956428 ms
Doubly Linked List Search: 0.004624999999975898 ms
B-Tree Search: 0.0011669999999526226 ms

--- Delete Benchmark ---

---Value To Delete: 695 ---
Array Delete: 0.0011660000000119908 ms
BST Delete: 0.001125000000001819 ms
AVL Delete: 0.0012500000000272848 ms
Red-Black Delete: 0.0025829999999587017 ms
Linked List Delete: 0.005625000000009095 ms
Doubly Linked List Delete: 0.00487500000002683 ms
B-Tree Delete: 0.003999999999962256 ms

=== Benchmark for Data Size: 1000, Case: Worst ===

--- Insert Benchmark ---
Array Insert: 0.0004999999999881766 ms
BST Insert: 0.0005830000000059954 ms
AVL Insert: 0.0008750000000077307 ms
Red-Black Insert: 0.0006670000000212895 ms
Linked List Insert: 0.00041700000002720117 ms
Doubly Linked List Insert: 0.0003749999999627107 ms
B-Tree Insert: 0.0007499999999822649 ms

--- Read Benchmark ---

---Index To Read: 999 ---
Array Read: 0.0002499999999940883 ms
Linked List Read: 0.013417000000004009 ms
Doubly Linked List Read: 0.011333000000036009 ms

--- Search Benchmark ---

---Value To Search: 247 ---
Array Search: 0.00050000000004502 ms
BST Search: 0.0007909999999924366 ms
AVL Search: 0.000666999999964446 ms
Red-Black Search: 0.000666999999964446 ms
Linked List Search: 0.010250000000041837 ms
Doubly Linked List Search: 0.009124999999983174 ms
B-Tree Search: 0.0009999999999763531 ms

--- Delete Benchmark ---

---Value To Delete: 247 ---
Array Delete: 0.001125000000001819 ms
BST Delete: 0.001209000000017113 ms
AVL Delete: 0.0017500000000154614 ms
Red-Black Delete: 0.0016669999999976426 ms
Linked List Delete: 0.011209000000008018 ms
Doubly Linked List Delete: 0.006834000000026208 ms
B-Tree Delete: 0.004042000000026746 ms

=== Benchmark for Data Size: 10000, Case: Best ===

--- Insert Benchmark ---
Array Insert: 0.0010839999999916472 ms
BST Insert: 0.0016669999999976426 ms
AVL Insert: 0.0015000000000213731 ms
Red-Black Insert: 0.0012499999999704414 ms
Linked List Insert: 0.0007919999999899119 ms
Doubly Linked List Insert: 0.0008339999999975589 ms
B-Tree Insert: 0.001082999999994172 ms

--- Read Benchmark ---

---Index To Read: 0 ---
Array Read: 0.0002499999999940883 ms
Linked List Read: 0.0034999999999740794 ms
Doubly Linked List Read: 0.032417000000009466 ms

--- Search Benchmark ---

---Value To Search: 3324 ---
Array Search: 0.001040999999986525 ms
BST Search: 0.0005840000000034706 ms
AVL Search: 0.0007919999999899119 ms
Red-Black Search: 0.0005830000000059954 ms
Linked List Search: 0.0034999999999740794 ms
Doubly Linked List Search: 0.0025420000000053733 ms
B-Tree Search: 0.0010419999999840002 ms

--- Delete Benchmark ---

---Value To Delete: 3324 ---
Array Delete: 0.006832999999971889 ms
BST Delete: 0.0013749999999959073 ms
AVL Delete: 0.0014590000000112013 ms
Red-Black Delete: 0.00808399999999665 ms
Linked List Delete: 0.00045799999998052954 ms
Doubly Linked List Delete: 0.0005419999999958236 ms
B-Tree Delete: 0.012541999999996278 ms

=== Benchmark for Data Size: 10000, Case: Average ===

--- Insert Benchmark ---
Array Insert: 0.0010839999999916472 ms
BST Insert: 0.00333299999999781 ms
AVL Insert: 0.0019159999999942556 ms
Red-Black Insert: 0.0014999999999645297 ms
Linked List Insert: 0.0013329999999882602 ms
Doubly Linked List Insert: 0.001040999999986525 ms
B-Tree Insert: 0.002916999999968084 ms

--- Read Benchmark ---

---Index To Read: 5000 ---
Array Read: 0.0003329999999550637 ms
Linked List Read: 0.032874999999989996 ms
Doubly Linked List Read: 0.07520800000003192 ms

--- Search Benchmark ---

---Value To Search: 234 ---
Array Search: 0.0024579999999900792 ms
BST Search: 0.0012499999999704414 ms
AVL Search: 0.0008750000000077307 ms
Red-Black Search: 0.0012079999999627944 ms
Linked List Search: 0.01704100000000608 ms
Doubly Linked List Search: 0.011625000000037744 ms
B-Tree Search: 0.0018749999999840838 ms

--- Delete Benchmark ---

---Value To Delete: 234 ---
Array Delete: 0.0028340000000071086 ms
BST Delete: 0.001833999999973912 ms
AVL Delete: 0.0015419999999721767 ms
Red-Black Delete: 0.002207999999995991 ms
Linked List Delete: 0.054708000000005086 ms
Doubly Linked List Delete: 0.03866699999997536 ms
B-Tree Delete: 0.06400000000002137 ms

=== Benchmark for Data Size: 10000, Case: Worst ===

--- Insert Benchmark ---
Array Insert: 0.0024169999999799074 ms
BST Insert: 0.0010410000000433683 ms
AVL Insert: 0.001167000000009466 ms
Red-Black Insert: 0.0013329999999882602 ms
Linked List Insert: 0.0010420000000408436 ms
Doubly Linked List Insert: 0.063083000000006 ms
B-Tree Insert: 0.0017090000000052896 ms

--- Read Benchmark ---

---Index To Read: 9999 ---
Array Read: 0.0005419999999958236 ms
Linked List Read: 0.026749999999992724 ms
Doubly Linked List Read: 0.05858299999999872 ms

--- Search Benchmark ---

---Value To Search: 2821 ---
Array Search: 0.002667000000030839 ms
BST Search: 0.0015000000000213731 ms
AVL Search: 0.0013749999999959073 ms
Red-Black Search: 0.0012500000000272848 ms
Linked List Search: 0.11987499999997908 ms
Doubly Linked List Search: 0.015709000000015294 ms
B-Tree Search: 0.0017080000000078144 ms

--- Delete Benchmark ---

---Value To Delete: 2821 ---
Array Delete: 0.004333999999971638 ms
BST Delete: 0.0029580000000350992 ms
AVL Delete: 0.002082999999970525 ms
Red-Black Delete: 0.07575000000002774 ms
Linked List Delete: 0.023042000000032203 ms
Doubly Linked List Delete: 0.021666999999979453 ms
B-Tree Delete: 0.0034160000000156288 ms

=== Benchmark for Data Size: 100000, Case: Best ===

--- Insert Benchmark ---
Array Insert: 0.0040840000000343935 ms
BST Insert: 0.0016669999999976426 ms
AVL Insert: 0.00233299999990777 ms
Red-Black Insert: 0.005666000000019267 ms
Linked List Insert: 0.001125000000001819 ms
Doubly Linked List Insert: 0.0012910000000374566 ms
B-Tree Insert: 0.004000000000019099 ms

--- Read Benchmark ---

---Index To Read: 0 ---
Array Read: 0.0018329999999195934 ms
Linked List Read: 0.01570800000001782 ms
Doubly Linked List Read: 0.8704589999999826 ms

--- Search Benchmark ---

---Value To Search: 36133 ---
Array Search: 0.001958000000058746 ms
BST Search: 0.0019999999999527063 ms
AVL Search: 0.002208999999993466 ms
Red-Black Search: 0.0019999999999527063 ms
Linked List Search: 0.00766600000008566 ms
Doubly Linked List Search: 0.005374999999958163 ms
B-Tree Search: 0.002083000000084212 ms

--- Delete Benchmark ---

---Value To Delete: 36133 ---
Array Delete: 0.04475000000002183 ms
BST Delete: 0.00433300000008785 ms
AVL Delete: 0.0037920000000895016 ms
Red-Black Delete: 0.006457999999952335 ms
Linked List Delete: 0.0006670000000212895 ms
Doubly Linked List Delete: 0.0009580000000823929 ms
B-Tree Delete: 0.019957999999974163 ms

=== Benchmark for Data Size: 100000, Case: Average ===

--- Insert Benchmark ---
Array Insert: 0.001040999999986525 ms
BST Insert: 0.0012920000000349319 ms
AVL Insert: 0.0014169999999467109 ms
Red-Black Insert: 0.0013750000000527507 ms
Linked List Insert: 0.0011660000000119908 ms
Doubly Linked List Insert: 0.0008749999999508873 ms
B-Tree Insert: 0.00233299999990777 ms

--- Read Benchmark ---

---Index To Read: 50000 ---
Array Read: 0.0005419999999958236 ms
Linked List Read: 0.1808330000000069 ms
Doubly Linked List Read: 0.4550420000000486 ms

--- Search Benchmark ---

---Value To Search: 44216 ---
Array Search: 0.009500000000002728 ms
BST Search: 0.0015409999999747015 ms
AVL Search: 0.0012500000000272848 ms
Red-Black Search: 0.0009999999999763531 ms
Linked List Search: 0.10775000000001 ms
Doubly Linked List Search: 0.11570800000004056 ms
B-Tree Search: 0.002207999999995991 ms

--- Delete Benchmark ---

---Value To Delete: 44216 ---
Array Delete: 0.03337499999997817 ms
BST Delete: 0.001958000000058746 ms
AVL Delete: 0.002125000000091859 ms
Red-Black Delete: 0.00437499999998181 ms
Linked List Delete: 0.10866699999996854 ms
Doubly Linked List Delete: 0.11608300000000327 ms
B-Tree Delete: 0.0126669999999649 ms

=== Benchmark for Data Size: 100000, Case: Worst ===

--- Insert Benchmark ---
Array Insert: 0.0013749999999390639 ms
BST Insert: 0.0009999999999763531 ms
AVL Insert: 0.0016660000000001673 ms
Red-Black Insert: 0.0014999999999645297 ms
Linked List Insert: 0.0009579999999687061 ms
Doubly Linked List Insert: 0.00100000000009004 ms
B-Tree Insert: 0.0026669999999739957 ms

--- Read Benchmark ---

---Index To Read: 99999 ---
Array Read: 0.00024999999993724487 ms
Linked List Read: 1.1102079999999432 ms
Doubly Linked List Read: 1.0142499999999472 ms

--- Search Benchmark ---

---Value To Search: 7247 ---
Array Search: 0.01850000000001728 ms
BST Search: 0.0015419999999721767 ms
AVL Search: 0.0014170000000603977 ms
Red-Black Search: 0.001209000000017113 ms
Linked List Search: 0.3032499999999345 ms
Doubly Linked List Search: 0.26658400000007987 ms
B-Tree Search: 0.002333000000021457 ms

--- Delete Benchmark ---

---Value To Delete: 7247 ---
Array Delete: 0.018832999999972344 ms
BST Delete: 0.0017919999999094216 ms
AVL Delete: 0.002292000000011285 ms
Red-Black Delete: 0.0016669999999976426 ms
Linked List Delete: 0.3107919999999922 ms
Doubly Linked List Delete: 0.31920900000000074 ms
B-Tree Delete: 0.018791999999962172 ms
 */
