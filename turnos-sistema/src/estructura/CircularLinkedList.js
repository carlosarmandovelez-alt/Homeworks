class Node {
    constructor(data) {
        this.data = data;      
        this.next = null;      
    }
}


class CircularLinkedList {
    constructor() {
        this.head = null;      
        this.tail = null;     
        this.length = 0;       
        this.currentNode = null; 
    }

    
    append(data) {
        const newNode = new Node(data);
        
        if (!this.head) {
            // Lista vacía
            this.head = newNode;
            this.tail = newNode;
            newNode.next = newNode;  
            this.currentNode = newNode;
        } else {
            
            this.tail.next = newNode;
            this.tail = newNode;
            this.tail.next = this.head;  
        }
        this.length++;
        return this;
    }


    next() {
        if (!this.currentNode) return null;
        this.currentNode = this.currentNode.next;
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
        return index;
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
            console.log('📭 No hay turnos');
            return;
        }
        
        console.log(`📋 Turnos (${this.length}):`);
        let current = this.head;
        const items = [];
        for (let i = 0; i < this.length; i++) {
            const isCurrent = current === this.currentNode;
            items.push(`${current.data.number}${isCurrent ? ' 👈' : ''}`);
            current = current.next;
        }
        console.log('  ⟳', items.join(' → '), '⟳');
        console.log(`📍 Turno actual: ${this.getCurrent()?.number || 'None'}`);
    }
}

export default CircularLinkedList;