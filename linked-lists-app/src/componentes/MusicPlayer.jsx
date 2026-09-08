import { useState, useEffect } from 'react';
import LinkedList from '../estructuras/LinkedList';
import { songs } from '../data/mockData';
import '../styles/pages.css';

function MusicPlayer() {
    const [list, setList] = useState(null);
    const [currentSong, setCurrentSong] = useState('');
    const [currentIndex, setCurrentIndex] = useState(0);
    const [totalSongs, setTotalSongs] = useState(0);
    const [renderKey, setRenderKey] = useState(0);

    useEffect(() => {
        try {
            const newList = new LinkedList();
            songs.forEach(song => newList.append(song));
            
            console.log('✅ Lista creada:', newList);
            console.log('✅ Tamaño:', newList.size());
            
            setList(newList);
            
            if (newList.size() > 0) {
                const firstSong = newList.getCurrentValue();
                console.log('✅ Primera canción:', firstSong);
                setCurrentSong(firstSong);
                setCurrentIndex(0);
                setTotalSongs(newList.size());
            }
        } catch (error) {
            console.error('❌ Error al inicializar:', error);
        }
    }, []);

    const nextSong = () => {
        if (!list) {
            console.warn('⚠️ Lista no inicializada');
            return;
        }
        
        if (list.size() === 0) {
            console.warn('⚠️ Lista vacía');
            return;
        }
        
        const nextNode = list.next();
        console.log('🔄 Avanzando a:', nextNode);
        
        if (!nextNode) {
            list.currentNode = list.head;
            setCurrentSong(list.head.value);
            setCurrentIndex(0);
        } else {
            setCurrentSong(nextNode.value);
            setCurrentIndex(list.getCurrentIndex());
        }
        
        setRenderKey(prev => prev + 1);
    };

    const addSong = () => {
        if (!list) {
            console.warn('⚠️ Lista no inicializada');
            return;
        }
        
        const newSong = `Canción ${list.size() + 1} - Artista`;
        list.append(newSong);
        setTotalSongs(list.size());
        setRenderKey(prev => prev + 1);
        console.log('✅ Canción agregada:', newSong);
    };

    const removeCurrentSong = () => {
        if (!list || list.size() === 0) {
            console.warn('⚠️ No hay canciones para eliminar');
            return;
        }
        
        if (list.size() === 1) {
            alert('⚠️ No se puede eliminar la única canción');
            return;
        }

        let prev = null;
        let current = list.head;
        
        while (current && current !== list.currentNode) {
            prev = current;
            current = current.next;
        }

        if (!prev) {
            list.head = list.currentNode.next;
            list.currentNode = list.head;
        } else {
            prev.next = list.currentNode.next;
            list.currentNode = list.currentNode.next || list.head;
        }
        
        list.length--;
        setTotalSongs(list.size());
        setCurrentSong(list.getCurrentValue());
        setCurrentIndex(list.getCurrentIndex());
        setRenderKey(prev => prev + 1);
        console.log('🗑️ Canción eliminada');
    };

    const renderPlaylist = () => {
        
        if (!list) {
            console.warn('⚠️ Lista no disponible para renderizar');
            return <p className="empty-playlist">⏳ Cargando...</p>;
        }
        
        if (list.size() === 0) {
            return <p className="empty-playlist">📭 No hay canciones</p>;
        }

        const items = [];
        let current = list.head;
        let index = 0;
        
        while (current) {
            const isActive = current === list.currentNode;
            items.push(
                <li 
                    key={`node-${index}`}
                    className={isActive ? 'active' : ''}
                >
                    <span className="song-number">{index + 1}</span>
                    <span className="song-name">{current.value}</span>
                    {isActive && <span className="playing-indicator">▶</span>}
                </li>
            );
            current = current.next;
            index++;
        }
        return items;
    };

    if (!list) {
        return (
            <div className="page-container music-player">
                <h2>🎵 Reproductor de Música</h2>
                <p>⏳ Cargando lista de reproducción...</p>
            </div>
        );
    }

    return (
        <div className="page-container music-player" key={renderKey}>
            <h2>🎵 Reproductor de Música</h2>
            <p className="page-subtitle">
                Lista Enlazada Simple <strong></strong>
            </p>

            <div className="player-container">
                <div className="current-song">
                    <div className="song-icon">🎶</div>
                    <div className="song-info">
                        <h3>Reproduciendo ahora</h3>
                        <p className="song-title">{currentSong || 'Sin canciones'}</p>
                        <p className="song-position">
                            Canción {currentIndex + 1} de {totalSongs}
                        </p>
                    </div>
                </div>

                <div className="player-controls">
                    <button onClick={nextSong} className="control-btn play-btn">
                        ⏭ Siguiente Canción
                    </button>
                    <button onClick={removeCurrentSong} className="control-btn danger-btn">
                        🗑 Eliminar
                    </button>
                    <button onClick={addSong} className="control-btn add-btn">
                        ➕ Agregar
                    </button>
                </div>

                <div className="playlist-container">
                    <h4>📋 Lista de Reproducción ({totalSongs})</h4>
                    <ul className="playlist">
                        {renderPlaylist()}
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default MusicPlayer;