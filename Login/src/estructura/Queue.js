class Queue {
    constructor() {
        this.items = [];
    }

    enqueue(item) {
        const anioMin = 2000;
        const anioMax = new Date().getFullYear();
        const anio = Math.floor(Math.random() * (anioMax - anioMin + 1)) + anioMin;
        const mes = Math.floor(Math.random() * 12);
        const dia = Math.floor(Math.random() * 28) + 1;
        const hora = Math.floor(Math.random() * 11) + 8;
        const minutos = Math.floor(Math.random() * 60);

        const fechaObj = new Date(anio, mes, dia, hora, minutos);

        item.fecha = fechaObj;
        item.fechaLlegada = `${dia.toString().padStart(2, '0')}/${(mes + 1).toString().padStart(2, '0')}/${anio}`;

        this.items.push(item);
    }

    dequeue() {
        if (this.items.length === 0) return null;
        let indiceMinimo = 0;
        for (let i = 1; i < this.items.length; i++) {
            if (this.items[i].fecha < this.items[indiceMinimo].fecha) {
                indiceMinimo = i;
            }
        }
        return this.items.splice(indiceMinimo, 1)[0];
    }

    peek() {
        if (this.items.length === 0) return null;
        let indiceMinimo = 0;
        for (let i = 1; i < this.items.length; i++) {
            if (this.items[i].fecha < this.items[indiceMinimo].fecha) {
                indiceMinimo = i;
            }
        }
        return this.items[indiceMinimo];
    }

    getAll() {
        return [...this.items].sort((a, b) => a.fecha - b.fecha);
    }

    size() {
        return this.items.length;
    }

    isEmpty() {
        return this.items.length === 0;
    }
}

export default Queue;