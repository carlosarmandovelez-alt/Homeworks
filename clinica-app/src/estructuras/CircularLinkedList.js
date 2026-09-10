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
    }

    next() {
        if (!this.currentNode) return null;
        this.currentNode = this.currentNode.next;
        return this.currentNode.data;
    }

    getCurrent() {
        return this.currentNode ? this.currentNode.data : null;
    }

    getAll() {
        if (!this.head) return [];
        
        const result = [];
        let current = this.head;
        for (let i = 0; i < this.length; i++) {
            result.push(current.data);
            current = current.next;
        }
        return result;
    }
}

export default CircularLinkedList;