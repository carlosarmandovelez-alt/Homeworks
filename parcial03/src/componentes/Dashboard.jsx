import { useState, useEffect, useRef } from 'react';
import Trie from '../estructuras/Trie';
import MaxHeap from '../estructuras/MaxHeap';
import Graph from '../estructuras/Graph';
import { initialSongs, initialRelations } from '../data/canciones';
import './Dashboard.scss';

function Dashboard() {
    const [trie] = useState(new Trie());
    const [heap] = useState(new MaxHeap());
    const [graph] = useState(new Graph());

    const [topSongs, setTopSongs] = useState([]);
    const [suggestions, setSuggestions] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResult, setSearchResult] = useState(null);
    const [recommendations, setRecommendations] = useState([]);
    const [selectedSongTitle, setSelectedSongTitle] = useState('');
    const [selectedSong, setSelectedSong] = useState(null);
    const isInitialized = useRef(false);

    useEffect(() => {
        if (isInitialized.current) return;
        isInitialized.current = true;

        initialSongs.forEach(song => {
            trie.insert(song);
            heap.insert(song);
            graph.addSong(song);
        });

        initialRelations.forEach(([id1, id2]) => graph.addRelation(id1, id2));
        setTopSongs(heap.getTop(5));
    }, [trie, heap, graph]);

    const handleSearch = (e) => {
        const query = e.target.value;
        setSearchQuery(query);

        if (query.trim() === '') {
            setSuggestions([]);
            setSearchResult(null);
            setRecommendations([]);
            setSelectedSongTitle('');
            return;
        }

        const found = trie.search(query);
        setSearchResult(found);
        const suggests = trie.getSuggestions(query);
        setSuggestions(suggests);
    };

    const handleSelectSong = (song) => {
        setSearchQuery(song.title);
        setSuggestions([]);
        setSearchResult(true);
        setSelectedSong(song); 
        setSelectedSongTitle(song.title);
        
        const recs = graph.getRecommendations(song.id);
        setRecommendations(recs);
    };



    return (
        <div className="dashboard-container">

            <header className="dashboard-header">
                <div className="header-content">
                    <div className="logo-area">
                        <span className="spotify-icon">🎵</span>
                        <h1>Spotify Educacional</h1>
                    </div>
                </div>
                <div className="header-badge">
                    <span>▶</span>
                </div>
            </header>


            <div className="dashboard-grid">
                

                <div className="left-column">

                    <section className="card search-card">
                        <div className="card-header">
                            <h2>Buscador Predictivo</h2>
                            <span className="badge">Trie</span>
                        </div>
                        
                        <div className="search-box">
                            <input
                                type="text"
                                placeholder="Escribe el nombre de una canción..."
                                value={searchQuery}
                                onChange={handleSearch}
                            />
                            {searchResult !== null && (
                                <span className={`search-status ${searchResult ? 'found' : 'not-found'}`}>
                                    {searchResult ? '✅' : '❌'}
                                </span>
                            )}
                        </div>
                        
                        {suggestions.length > 0 && (
                            <ul className="suggestions-list">
                                {suggestions.map(song => (
                                    <li key={song.id} onClick={() => handleSelectSong(song)}>
                                        <div className="song-info">
                                            <span className="song-title">{song.title}</span>
                                            <span className="song-artist">{song.artist}</span>
                                        </div>
                                        <span className="play-icon">▶</span>
                                    </li>
                                ))}
                            </ul>
                        )}


                        {recommendations.length > 0 && selectedSong && (
                            <div className="recommendations-area">
                                <div className="card-header mt-20">
                                    <h3>Canciones Relacionadas</h3>
                                    <span className="badge">Grafo</span>
                                </div>
                                
        
                                <div className="main-song-node">
                                    <div className="info">
                                        <div className="title">{selectedSong.title}</div>  
                                        <div className="artist">{selectedSong.artist}</div> 
                                    </div>
                                    <span className="popularity-tag">{selectedSong.popularity}%</span>
                                </div>

                                
                                <div className="connector-line">
                                    <span>Conectado con:</span>
                                </div>

                                
                                <ul className="recommendations-list">
                                    {recommendations.map(id => {
                                        const song = initialSongs.find(s => s.id === id);
                                        if (!song) return null;
                                        return (
                                            <li key={id} className="recommendation-item">
                                                <div className="connection-dot"></div>
                                                <div className="song-info">
                                                    <span className="song-title">{song.title}</span>
                                                    <span className="song-artist">{song.artist}</span>
                                                </div>
                                                <button className="btn-play">▶</button>
                                            </li>
                                        );
                                    })}
                                </ul>
                            </div>
                        )}
                    </section>
                </div>


                <div className="right-column">
                    <section className="card ranking-card">
                        <div className="card-header">
                            <h2>Top 5 Populares</h2>
                            <span className="badge">Max-Heap</span>
                        </div>
        
                        <ul className="ranking-list">
                            {topSongs.map((song, index) => (
                                <li key={song.id}>
                                    <div className={`rank-number rank-${index + 1}`}>
                                        #{index + 1}
                                    </div>
                                    <div className="song-info">
                                        <span className="song-title">{song.title}</span>
                                        <span className="song-artist">{song.artist}</span>
                                    </div>
                                    
                            
                                    <div className="popularity-container">
                                        <div className="popularity-bar">
                                            <div 
                                                className="popularity-fill" 
                                                style={{ width: `${song.popularity}%` }}
                                            ></div>
                                        </div>
                                        <span className="popularity-text">{song.popularity}%</span>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </section>
                </div>

            </div>
        </div>
    );
}

export default Dashboard;