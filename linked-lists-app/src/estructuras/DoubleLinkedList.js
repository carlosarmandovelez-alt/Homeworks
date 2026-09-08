class DoubleNode {
    constructor(value) {
        this.value = value;
        this.next = null;
        this.prev = null;
    }
}

class DoubleLinkedList {
    constructor() {
        this.head = null;
        this.tail = null;
        this.length = 0;
        this.currentNode = null;
    }

    append(value) {
        const newNode = new DoubleNode(value);
        
        if (!this.head) {
            this.head = newNode;
            this.tail = newNode;
            this.currentNode = newNode;
        } else {
            this.tail.next = newNode;
            newNode.prev = this.tail;
            this.tail = newNode;
        }
        this.length++;
        return this;
    }

    
    next() {
        if (!this.currentNode) return null;
        if (this.currentNode.next) {
            this.currentNode = this.currentNode.next;
        } else {
            // Comportamiento circular: volver al inicio
            this.currentNode = this.head;
        }
        return this.currentNode;
    }

    
    prev() {
        if (!this.currentNode) return null;
        if (this.currentNode.prev) {
            this.currentNode = this.currentNode.prev;
        } else {
            // Comportamiento circular: ir al final
            this.currentNode = this.tail;
        }
        return this.currentNode;
    }

    getCurrentValue() {
        return this.currentNode ? this.currentNode.value : null;
    }

    getCurrentIndex() {
        if (!this.currentNode || !this.head) return -1;
        
        let index = 0;
        let current = this.head;
        while (current && current !== this.currentNode) {
            current = current.next;
            index++;
        }
        return current === this.currentNode ? index : -1;
    }

    size() {
        return this.length;
    }
}

export default DoubleLinkedList;