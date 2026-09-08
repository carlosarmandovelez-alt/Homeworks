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
        return this;
    }

    
    findByCode(code) {
        let current = this.head;
        while (current) {
            if (current.data.code === code) {
                return current.data;
            }
            current = current.next;
        }
        return null;
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
    }


    forEach(callback) {
        let current = this.head;
        let index = 0;
        while (current) {
            callback(current.data, index);
            current = current.next;
            index++;
        }
    }


    print() {
        if (!this.head) {
            console.log('📭 No hay estudiantes');
            return;
        }
        
        console.log(`📋 Estudiantes (${this.length}):`);
        let current = this.head;
        let index = 0;
        while (current) {
            const student = current.data;
            console.log(`   ${index + 1}. ${student.name} - ${student.age} años - Código: ${student.code}`);
            current = current.next;
            index++;
        }
        console.log('---');
    }
}

export default LinkedList;