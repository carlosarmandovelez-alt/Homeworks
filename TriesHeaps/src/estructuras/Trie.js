class TrieNode {
    constructor() {
        this.children = {};        
        this.isEndOfWord = false;
        this.productos = [];       
    }
}

class Trie {
    constructor() {
        this.root = new TrieNode();
    }

    
    insert(nombre, popularidad) {
        let current = this.root;
        const nombreMinuscula = nombre.toLowerCase();

        for (let char of nombreMinuscula) {
            if (!current.children[char]) {
                current.children[char] = new TrieNode();
            }
            current = current.children[char];
        }

        current.isEndOfWord = true;
        
        const existe = current.productos.find(p => p.name === nombre);
        if (existe) {
            existe.popularity = popularidad; 
        } else {
            current.productos.push({ name: nombre, popularity: popularidad });
        }
    }

    
    searchByPrefix(prefijo) {
        let current = this.root;
        const prefijoMinuscula = prefijo.toLowerCase();

        
        for (let char of prefijoMinuscula) {
            if (!current.children[char]) {
                return []; 
            }
            current = current.children[char];
        }

        
        const resultados = [];
        this._recolectar(current, resultados);
        return resultados;
    }

    
    _recolectar(node, resultados) {
        if (node.isEndOfWord) {
            resultados.push(...node.productos);
        }

        for (let char in node.children) {
            this._recolectar(node.children[char], resultados);
        }
    }
}

export default Trie;