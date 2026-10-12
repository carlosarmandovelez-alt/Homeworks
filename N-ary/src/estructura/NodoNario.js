class NodoNario {
    constructor(valor) {
        this.valor = valor;      
        this.hijos = [];
    }

   
    agregarHijo(nodo) {
        this.hijos.push(nodo);
    }

    
    isLeaf() {
        return this.hijos.length === 0;
    }
}

export default NodoNario;