class Node {
    constructor(data) {
        this.data = data;
        this.next = null;
    }
}

class LinkedList {
    constructor() {
        this.head = null;
        this.tail = null;
        this.length = 0;
    }

    append(data) {
        const newNode = new Node(data);
        
        if (!this.head) {
            this.head = newNode;
            this.tail = newNode;
        } else {
            this.tail.next = newNode;
            this.tail = newNode;
        }
        this.length++;
    }

    removeById(id) {
        if (!this.head) return null;

        let current = this.head;
        let previous = null;

        while (current && current.data.id !== id) {
            previous = current;
            current = current.next;
        }

        if (!current) return null;

        if (!previous) {
            this.head = current.next;
            if (this.length === 1) this.tail = null;
        } else {
            previous.next = current.next;
            if (!current.next) this.tail = previous;
        }

        this.length--;
        return current.data;
    }

    findById(id) {
        let current = this.head;
        while (current) {
            if (current.data.id === id) return current.data;
            current = current.next;
        }
        return null;
    }

    getAll() {
        const result = [];
        let current = this.head;
        while (current) {
            result.push(current.data);
            current = current.next;
        }
        return result;
    }
}

export default LinkedList;