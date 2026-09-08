import { useState, useEffect } from 'react';
import DoubleLinkedList from '../estructuras/DoubleLinkedList';
import { webPages } from '../data/mockData';
import '../styles/pages.css';

function BrowserHistory() {
    const [list, setList] = useState(null);
    const [currentPage, setCurrentPage] = useState('');
    const [currentIndex, setCurrentIndex] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [renderKey, setRenderKey] = useState(0);

    useEffect(() => {
        const newList = new DoubleLinkedList();
        webPages.forEach(page => newList.append(page));
        setList(newList);
        if (newList.size() > 0) {
            setCurrentPage(newList.getCurrentValue());
            setCurrentIndex(0);
            setTotalPages(newList.size());
        }
    }, []);

    const goForward = () => {
        if (!list) return;
        const nextNode = list.next();
        if (nextNode) {
            setCurrentPage(nextNode.value);
            setCurrentIndex(list.getCurrentIndex());
            setRenderKey(prev => prev + 1);
        }
    };

    const goBack = () => {
        if (!list) return;
        const prevNode = list.prev();
        if (prevNode) {
            setCurrentPage(prevNode.value);
            setCurrentIndex(list.getCurrentIndex());
            setRenderKey(prev => prev + 1);
        }
    };

    const renderHistory = () => {
        if (!list || list.size() === 0) {
            return <p className="empty-history">📭 No hay páginas</p>;
        }

        const items = [];
        let current = list.head;
        let index = 0;
        while (current) {
            const isActive = current === list.currentNode;
            items.push(
                <li 
                    key={`page-${index}`}
                    className={isActive ? 'active' : ''}
                >
                    <span className="page-number">{index + 1}</span>
                    <span className="page-name">{current.value}</span>
                    {isActive && <span className="current-indicator">📍</span>}
                </li>
            );
            current = current.next;
            index++;
        }
        return items;
    };

    return (
        <div className="page-container browser-history" key={renderKey}>
            <h2>🌐 Historial del Navegador</h2>
            <p className="page-subtitle">
                Lista Doblemente Enlazada<strong></strong>
            </p>

            <div className="browser-container">
                <div className="current-page">
                    <div className="page-icon">🌍</div>
                    <div className="page-info">
                        <h3>Página actual</h3>
                        <p className="page-url">{currentPage || 'Sin páginas'}</p>
                        <p className="page-position">
                            Posición {currentIndex + 1} de {totalPages}
                        </p>
                    </div>
                </div>

                <div className="browser-controls">
                    <button onClick={goBack} className="control-btn">
                        ⬅ Atrás
                    </button>
                    <button onClick={goForward} className="control-btn">
                        ➡ Adelante
                    </button>
                </div>

                <div className="history-container">
                    <h4>📜 Historial de navegación ({totalPages})</h4>
                    <ul className="history-list">
                        {renderHistory()}
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default BrowserHistory;