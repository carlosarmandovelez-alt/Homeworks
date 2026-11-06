class MaxHeap {
    constructor() {
        this.heap = [];
    }

    
    push(producto) {
        this.heap.push(producto);
        this.percolateUp();
    }

    
    pop() {
        if (this.heap.length === 0) return null;
        if (this.heap.length === 1) return this.heap.pop();

        const max = this.heap[0];
        this.heap[0] = this.heap.pop();
        this.percolateDown(0);
        return max;
    }

    
    peek() {
        return this.heap.length > 0 ? this.heap[0] : null;
    }

  
    percolateUp() {
        let curr = this.heap.length - 1;
        while (curr > 0) {
            const parent = Math.floor((curr - 1) / 2);
            if (this.heap[curr].popularity > this.heap[parent].popularity) {
                this.swap(curr, parent);
                curr = parent;
            } else {
                break;
            }
        }
    }

    
    percolateDown(index) {
        let curr = index;
        const n = this.heap.length;

        while (2 * curr + 1 < n) {
            const left = 2 * curr + 1;
            const right = 2 * curr + 2;
            let maxChild = left;

            if (right < n && this.heap[right].popularity > this.heap[left].popularity) {
                maxChild = right;
            }

            if (this.heap[maxChild].popularity > this.heap[curr].popularity) {
                this.swap(curr, maxChild);
                curr = maxChild;
            } else {
                break;
            }
        }
    }

    swap(i, j) {
        [this.heap[i], this.heap[j]] = [this.heap[j], this.heap[i]];
    }

    size() {
        return this.heap.length;
    }

    isEmpty() {
        return this.heap.length === 0;
    }

    toArray() {
        return [...this.heap];
    }
}

export default MaxHeap;