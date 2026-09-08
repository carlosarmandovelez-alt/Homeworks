class Node {
    constructor(value) {
        this.value = value;
        this.next = null;
    }
}

class LinkedList {
    constructor() {
        this.head = null;
        this.tail = null;
        this.length = 0;
        this.currentNode = null;
    }

    append(value) {
        const newNode = new Node(value);
        
        if (!this.head) {
            this.head = newNode;
            this.tail = newNode;
            this.currentNode = newNode;
        } else {
            this.tail.next = newNode;
            this.tail = newNode;
        }
        this.length++;
        return this;
    }

    
    next() {
        if (!this.currentNode) return null;
        this.currentNode = this.currentNode.next;
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

export default LinkedList;