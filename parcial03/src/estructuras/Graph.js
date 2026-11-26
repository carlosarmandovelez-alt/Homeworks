class Graph {
    constructor() {
        this.adjList = {};
    }

    addSong(song) {
        if (!this.adjList[song.id]) {
            this.adjList[song.id] = [];
        }
    }

    addRelation(songId1, songId2) {
        if (this.adjList[songId1] && this.adjList[songId2]) {
            // Solo agregamos si no existe la relación
            if (!this.adjList[songId1].includes(songId2)) {
                this.adjList[songId1].push(songId2);
            }
            if (!this.adjList[songId2].includes(songId1)) {
                this.adjList[songId2].push(songId1);
            }
        }
    }

    getRecommendations(songId) {
        return this.adjList[songId] || [];
    }
}

export default Graph;