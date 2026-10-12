import Nodo from './Nodo';

class ArbolBinario {
    constructor() {
        this.raiz = null;
    }


    insertar(valor) {
        const nuevoNodo = new Nodo(valor);

        if (!this.raiz) {
            this.raiz = nuevoNodo;
            return;
        }

        let actual = this.raiz;
        while (true) {
            if (valor < actual.valor) {
                if (!actual.izquierda) {
                    actual.izquierda = nuevoNodo;
                    return;
                }
                actual = actual.izquierda;
            } else if (valor > actual.valor) {
                if (!actual.derecha) {
                    actual.derecha = nuevoNodo;
                    return;
                }
                actual = actual.derecha;
            } else {
                
                return;
            }
        }
    }



    // PREORDER (N-L-R): Nodo → Izquierda → Derecha
    preorder(nodo = this.raiz, resultado = []) {
        if (!nodo) return resultado;

        resultado.push(nodo.valor);
        this.preorder(nodo.izquierda, resultado);
        this.preorder(nodo.derecha, resultado);

        return resultado;
    }

    // INORDER (L-N-R): Izquierda → Nodo → Derecha
    inorder(nodo = this.raiz, resultado = []) {
        if (!nodo) return resultado;

        this.inorder(nodo.izquierda, resultado);
        resultado.push(nodo.valor);
        this.inorder(nodo.derecha, resultado);

        return resultado;
    }

    // POSTORDER (L-R-N): Izquierda → Derecha → Nodo
    postorder(nodo = this.raiz, resultado = []) {
        if (!nodo) return resultado;

        this.postorder(nodo.izquierda, resultado);
        this.postorder(nodo.derecha, resultado);
        resultado.push(nodo.valor);

        return resultado;
    }


    buscar(valor) {
        let actual = this.raiz;

        while (actual) {
            if (valor === actual.valor) return true;
            if (valor < actual.valor) {
                actual = actual.izquierda;
            } else {
                actual = actual.derecha;
            }
        }

        return false;
    }

   
    // FORMATO react-d3-tree

    toD3Tree(nodo = this.raiz) {
        if (!nodo) return null;

        const resultado = { name: nodo.valor };

        const hijos = [];
        if (nodo.izquierda) hijos.push(this.toD3Tree(nodo.izquierda));
        if (nodo.derecha) hijos.push(this.toD3Tree(nodo.derecha));

        if (hijos.length > 0) {
            resultado.children = hijos;
        }

        return resultado;
    }
}

export default ArbolBinario;