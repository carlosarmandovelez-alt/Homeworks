class MaxHeap {
    constructor() {
        this.heap = [];
    }

    
    insert(song) {
        
        if (this.heap.some(s => s.id === song.id)) return;
        
        this.heap.push(song);
        this.percolateUp();
    }

    
    extractMax() {
        if (this.heap.length === 0) return null;
        if (this.heap.length === 1) return this.heap.pop();

        const max = this.heap[0];
        this.heap[0] = this.heap.pop();
        this.percolateDown(0);
        return max;
    }

    
    getTop(n) {
        const copia = new MaxHeap();
        copia.heap = [...this.heap];
        
        const top = [];
        for (let i = 0; i < n && !copia.isEmpty(); i++) {
            top.push(copia.extractMax());
        }
        return top;
    }

    
    percolateUp() {
        let index = this.heap.length - 1;
        while (index > 0) {
            const parent = Math.floor((index - 1) / 2);
            if (this.heap[index].popularity > this.heap[parent].popularity) {
                this.swap(index, parent);
                index = parent;
            } else {
                break;
            }
        }
    }

    
    percolateDown(index) {
        const n = this.heap.length;
        let largest = index;
        const left = 2 * index + 1;
        const right = 2 * index + 2;

        if (left < n && this.heap[left].popularity > this.heap[largest].popularity) {
            largest = left;
        }
        if (right < n && this.heap[right].popularity > this.heap[largest].popularity) {
            largest = right;
        }

        if (largest !== index) {
            this.swap(index, largest);
            this.percolateDown(largest);
        }
    }

  
    swap(i, j) {
        [this.heap[i], this.heap[j]] = [this.heap[j], this.heap[i]];
    }

  
    isEmpty() {
        return this.heap.length === 0;
    }
}

export default MaxHeap;