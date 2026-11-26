class TrieNode {
    constructor() {
        this.children = {};
        this.isEndOfWord = false;
        this.songData = null; 
    }
}

class Trie {
    constructor() {
        this.root = new TrieNode();
    }

    
    insert(song) {
        let current = this.root;
        const title = song.title.toLowerCase();
        
        for (const char of title) {
            if (!current.children[char]) {
                current.children[char] = new TrieNode();
            }
            current = current.children[char];
        }
        current.isEndOfWord = true;
        current.songData = song; 
    }

    
    search(title) {
        let current = this.root;
        const lowerTitle = title.toLowerCase();
        
        for (const char of lowerTitle) {
            if (!current.children[char]) return false;
            current = current.children[char];
        }
        return current.isEndOfWord;
    }

    
    getSuggestions(prefix) {
        let current = this.root;
        const lowerPrefix = prefix.toLowerCase();
        
        for (const char of lowerPrefix) {
            if (!current.children[char]) return [];
            current = current.children[char];
        }
        
        const suggestions = [];
        this._collect(current, suggestions);
        return suggestions;
    }

    _collect(node, results) {
        if (node.isEndOfWord) {
            results.push(node.songData);
        }
        for (const char in node.children) {
            this._collect(node.children[char], results);
        }
    }
}

export default Trie;