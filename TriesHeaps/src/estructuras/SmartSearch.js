import Trie from './Trie';
import MaxHeap from './MaxHeap';

class SmartSearch {
    constructor() {
        this.trie = new Trie();
    }

    
    addProducto(nombre, popularidad) {
        this.trie.insert(nombre, popularidad);
    }

    
    searchTopK(prefijo, k) {
        
        const productos = this.trie.searchByPrefix(prefijo);

        
        const heap = new MaxHeap();
        productos.forEach(p => heap.push(p));

        
        const topK = [];
        for (let i = 0; i < k && !heap.isEmpty(); i++) {
            topK.push(heap.pop());
        }

        return topK;
    }
}

export default SmartSearch;