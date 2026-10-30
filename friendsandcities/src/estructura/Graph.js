class Graph {
    constructor() {
        this.nodes = [];      
        this.adjList = {};    
        this.nodeData = {};   
    }

    
    addNode(nodeData) {
        const { id } = nodeData;
        if (this.searchNode(id)) return; 

        this.nodes.push(id);
        this.adjList[id] = [];
        this.nodeData[id] = nodeData; 
    }

    
    addEdge(node1Id, node2Id) {
        
        if (!this.adjList[node1Id].includes(node2Id)) {
            this.adjList[node1Id].push(node2Id);
        }
        if (!this.adjList[node2Id].includes(node1Id)) {
            this.adjList[node2Id].push(node1Id);
        }
    }

    
    searchNode(id) {
        return this.nodes.find(n => n === id);
    }

    
    printAdjacency(id) {
        if (this.searchNode(id)) {
            console.log(`Vecinos de ${id}:`, this.adjList[id]);
        }
    }

    
    isEmpty() {
        return this.nodes.length === 0;
    }

    toD3Format() {
        const nodes = this.nodes.map(id => ({
            id: id,
            label: this.nodeData[id]?.label || id,
            type: this.nodeData[id]?.type || 'default',
            ...this.nodeData[id]
        }));

        const links = [];
        
        const visited = new Set();
        this.nodes.forEach(id => {
            this.adjList[id].forEach(neighborId => {
                const edgeKey = [id, neighborId].sort().join('-');
                if (!visited.has(edgeKey)) {
                    visited.add(edgeKey);
                    links.push({ source: id, target: neighborId });
                }
            });
        });

        return { nodes, links };
    }
}

export default Graph;