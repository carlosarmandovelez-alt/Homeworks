class ArbolNario {
    constructor() {
        this.raiz = null;
    }

    // ✅ Establecer raíz
    setRaiz(nodo) {
        this.raiz = nodo;
    }

    // ✅ DFS (Depth-First Search) - Recursivo
    dfs(nodo = this.raiz, resultado = []) {
        if (!nodo) return resultado;

        resultado.push(nodo.valor);
        for (const hijo of nodo.hijos) {
            this.dfs(hijo, resultado);
        }

        return resultado;
    }

    // ✅ BFS (Breadth-First Search) - Por niveles
    bfs(raiz = this.raiz) {
        if (!raiz) return [];

        const resultado = [];
        const cola = [raiz];

        while (cola.length > 0) {
            const actual = cola.shift();
            resultado.push(actual.valor);

            for (const hijo of actual.hijos) {
                cola.push(hijo);
            }
        }

        return resultado;
    }

    // ✅ Buscar por título
    buscarPorTitulo(titulo, nodo = this.raiz) {
        if (!nodo) return null;
        if (nodo.valor.titulo === titulo) return nodo;

        for (const hijo of nodo.hijos) {
            const encontrado = this.buscarPorTitulo(titulo, hijo);
            if (encontrado) return encontrado;
        }

        return null;
    }
}

export default ArbolNario;