import {Node} from './node';

export class Heap {
    constructor() {
        this.heap = [null];
    }

    insert(val, weight) {
        const nodeToAdd = new Node(val, weight);
        this.heap.push(nodeToAdd);
        let currNode = this.heap.length - 1;
        let parentNode = Math.floor(currNode / 2);

        while ( 
            this.heap[parentNode] && nodeToAdd.weight > this.heap[parentNode].weight
        ) {
            const parent = this.heap[parentNode];
            this.heap[parentNode] = nodeToAdd;
            this.heap[currNode] = parent;
            currNode = parentNode;
            parentNode = Math.floor(currNode / 2);
        }
    }

    remove() {
        if (this.heap.length < 3) {
            const toReturn = this.heap.pop();
            this.heap[0] = null;
            return toReturn;
        }

        const toRemove = this.heap[1];
        this.heap[1] = this.heap.pop();
        let currentIdx = 1;
        let [left, right] = [2*currentIdx, 2*currentIdx + 1];
        let currentChildIdx = this.heap[right] && this.heap[right].priority >= this.heap[left].priority ? right : left;
        while (this.heap[currentChildIdx] && this.heap[currentIdx].priority <= this.heap[currentChildIdx].priority) {
          let currentNode = this.heap[currentIdx]
          let currentChildNode = this.heap[currentChildIdx];
          this.heap[currentChildIdx] = currentNode;
          this.heap[currentIdx] = currentChildNode;
        }
        return toRemove;
    }

    print() {
        this.heap.map((x) => x ? console.log(`value: ${x.value} weight: ${x.weight}`) : null);
    }
}