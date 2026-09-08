class DoubleNode {
    constructor(data) {
        this.data = data;
        this.next = null;
        this.prev = null;
    }
}

class CircularDoublyLinkedList {
    constructor() {
        this.head = null;
        this.tail = null;
        this.length = 0;
        this.currentNode = null;
    }

    
    append(data) {
        const newNode = new DoubleNode(data);
        
        if (!this.head) {
            this.head = newNode;
            this.tail = newNode;
            newNode.next = newNode;
            newNode.prev = newNode;
            this.currentNode = newNode;
        } else {
            
            this.tail.next = newNode;
            newNode.prev = this.tail;
            
            
            newNode.next = this.head;
            this.head.prev = newNode;
            
            this.tail = newNode;
        }
        this.length++;
        return this;
    }

    
    next() {
        if (!this.currentNode) return null;
        this.currentNode = this.currentNode.next;
        return this.currentNode.data;
    }

    
    prev() {
        if (!this.currentNode) return null;
        this.currentNode = this.currentNode.prev;
        return this.currentNode.data;
    }

   
    getCurrent() {
        return this.currentNode ? this.currentNode.data : null;
    }

    
    getCurrentIndex() {
        if (!this.currentNode || !this.head) return -1;
        
        let index = 0;
        let current = this.head;
        while (current !== this.currentNode && index < this.length) {
            current = current.next;
            index++;
        }
        return current === this.currentNode ? index : -1;
    }

    
    size() {
        return this.length;
    }

   
    isEmpty() {
        return this.length === 0;
    }

  
    clear() {
        this.head = null;
        this.tail = null;
        this.length = 0;
        this.currentNode = null;
    }

    
    print() {
        if (!this.head) {
            console.log('📭 No hay productos');
            return;
        }
        
        console.log(`📋 Productos (${this.length}):`);
        let current = this.head;
        const items = [];
        for (let i = 0; i < this.length; i++) {
            const isCurrent = current === this.currentNode;
            items.push(`${current.data.name}${isCurrent ? ' 👈' : ''}`);
            current = current.next;
        }
        console.log('  ⟳', items.join(' ↔ '), '⟳');
        console.log(`📍 Producto actual: ${this.getCurrent()?.name || 'None'}`);
    }
}

export default CircularDoublyLinkedList;