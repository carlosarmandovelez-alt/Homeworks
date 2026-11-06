import { useState, useEffect } from 'react';
import './App.scss';
import SmartSearch from './estructuras/SmartSearch';

function App() {
    const [buscador] = useState(() => {
        const s = new SmartSearch();
        s.addProducto('air max', 90);
        s.addProducto('air force', 95);
        s.addProducto('air jordan', 85);
        s.addProducto('air zoom', 88);
        s.addProducto('air pegasus', 82);
        s.addProducto('nike dunk', 87);
        s.addProducto('nike blazer', 78);
        s.addProducto('nike react', 80);
        s.addProducto('nike vapormax', 86);
        s.addProducto('adidas boost', 80);
        s.addProducto('adidas ultraboost', 88);
        s.addProducto('adidas superstar', 75);
        s.addProducto('adidas stan smith', 83);
        s.addProducto('adidas nmd', 79);
        s.addProducto('adidas yeezy', 92);
        s.addProducto('puma suede', 70);
        s.addProducto('puma rs-x', 72);
        s.addProducto('reebok classic', 68);
        s.addProducto('new balance 550', 84);
        s.addProducto('new balance 990', 89);
        s.addProducto('converse chuck taylor', 81);
        s.addProducto('vans old skool', 77);
        s.addProducto('vans sk8-hi', 76);
        s.addProducto('camiseta nike', 65);
        s.addProducto('camiseta adidas', 60);
        s.addProducto('camiseta puma', 55);
        s.addProducto('hoodie nike', 75);
        s.addProducto('hoodie adidas', 70);
        s.addProducto('chaqueta nike', 85);
        s.addProducto('chaqueta adidas', 80);
        s.addProducto('pantalon nike', 72);
        s.addProducto('pantalon adidas', 68);
        s.addProducto('shorts nike', 50);
        s.addProducto('shorts adidas', 48);
        s.addProducto('gorra nike', 45);
        s.addProducto('gorra adidas', 42);
        s.addProducto('mochila nike', 78);
        s.addProducto('mochila adidas', 74);
        s.addProducto('calcetines nike', 30);
        s.addProducto('calcetines adidas', 28);
        s.addProducto('balon nike', 65);
        s.addProducto('balon adidas', 62);

        return s;
    });

    const [prefijo, setPrefijo] = useState('');
    const [resultados, setResultados] = useState([]);
    const [k, setK] = useState(3);

    
    useEffect(() => {
        if (prefijo.trim() === '') {
            setResultados([]);
            return;
        }
        const res = buscador.searchTopK(prefijo, k);
        setResultados(res);
    }, [prefijo, k, buscador]);

        return (
        <div className="app">
            <header className="app-header">
                <h1>Smart Search + Top K</h1>
                <p className="subtitle">Trie (Búsqueda por Prefijo) + Max-Heap (Top Popularidad)</p>
            </header>

            
            <main className="app-main">
                
                
                <aside className="sidebar">
                    <div className="search-panel">
                        <div className="input-group">
                            <label>Buscar producto:</label>
                            <input
                                type="text"
                                value={prefijo}
                                onChange={(e) => setPrefijo(e.target.value)}
                                placeholder="Ej: air, adidas..."
                            />
                        </div>

                        <div className="input-group">
                            <label>Top K resultados:</label>
                            <input
                                type="number"
                                min="1"
                                max="10"
                                value={k}
                                onChange={(e) => setK(Number(e.target.value))}
                            />
                        </div>
                    </div>

                    <div className="info-panel">
                        <h3>Estructuras Utilizadas</h3>
                        <ul>
                            <li><strong>Trie:</strong> Búsqueda rápida por prefijo (O(L)).</li>
                            <li><strong>Max-Heap:</strong> Obtiene los Top K en O(K log N).</li>
                        </ul>
                    </div>
                </aside>

                
                <section className="results-panel">
                    <h2>🏆 Resultados Top {k}</h2>
                    
                    {prefijo === '' ? (
                        <p className="empty-message">Escribe un prefijo para buscar</p>
                    ) : resultados.length === 0 ? (
                        <p className="empty-message">No se encontraron resultados para "{prefijo}"</p>
                    ) : (
                        <ul className="results-list">
                            {resultados.map((producto, index) => (
                                <li key={producto.name} className="result-item">
                                    <span className="rank">#{index + 1}</span>
                                    <span className="product-name">{producto.name}</span>
                                    <span className="product-popularity">
                                        ⭐ {producto.popularity}
                                    </span>
                                </li>
                            ))}
                        </ul>
                    )}
                </section>

            </main>
        </div>
    );
}

export default App;