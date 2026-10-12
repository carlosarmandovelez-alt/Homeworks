class Nodo {
    constructor(valor) {
        this.valor = valor;
        this.izquierda = null;
        this.derecha = null;
    }

    
    isLeaf() {
        return this.izquierda === null && this.derecha === null;
    }
}

export default Nodo;