import { useEffect, useState, useCallback } from 'react';
import { useGiphy } from './hooks/useGiphy';
import SearchBar from './components/SearchBar';
import GifGrid from './components/GifGrid';
import './App.scss';

function App() {
    const { gifs, isLoading, error, searchGifs } = useGiphy();
    const [lastQuery, setLastQuery] = useState('');

    const handleSearch = useCallback((query) => {
        setLastQuery(query);
        const controller = new AbortController();
        searchGifs(query, controller.signal);
        return () => controller.abort();
    }, [searchGifs]);

    return (
        <div className="app">
            <header>
                <h1>Giphy Search</h1>
            </header>

            <main>
                <SearchBar onSearch={handleSearch} />

                {error && <div className="error-message">❌ {error}</div>}

                {isLoading && (
                    <div className="loading">
                        <div className="spinner"></div>
                        <p>Buscando GIFs...</p>
                    </div>
                )}

                {!isLoading && !error && lastQuery && (
                    <GifGrid gifs={gifs} />
                )}

                {!isLoading && !lastQuery && (
                    <p className="initial-message">Escribe algo para buscar GIFs</p>
                )}
            </main>
        </div>
    );
}

export default App;