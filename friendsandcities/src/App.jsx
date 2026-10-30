import { useState, useEffect } from 'react';
import './App.scss';
import Graph from './estructura/Graph';
import { inicializarGrafo } from './data/mockData';
import GraphView from './componentes/GraphView';

function App() {
    
    const [grafo] = useState(() => {
        const g = new Graph();
        inicializarGrafo(g);
        return g;
    });

    
    const [ciudadSeleccionada, setCiudadSeleccionada] = useState('cali');

    
    useEffect(() => {
        console.log('Grafo inicializado');
        console.log('Nodos:', grafo.nodes);
        console.log('Adyacencia:', grafo.adjList);
    }, [grafo]);

    
    const personasFiltradas = grafo.nodes
        .filter(id => grafo.nodeData[id]?.type === 'person' && grafo.nodeData[id]?.ciudad === ciudadSeleccionada)
        .map(id => grafo.nodeData[id]);

    
    const ciudades = grafo.nodes
        .filter(id => grafo.nodeData[id]?.type === 'city')
        .map(id => grafo.nodeData[id]);

    return (
        <div className="app">
            <header className="app-header">
                <h1>Grafo de Amigos y Ciudades</h1>
            </header>

            <div className="app-content">
                {/* ✅ Panel lateral */}
                <aside className="sidebar">
                    <div className="info-card">
                        <h2>Filtrar por Ciudad</h2>
                        <select
                            value={ciudadSeleccionada}
                            onChange={(e) => setCiudadSeleccionada(e.target.value)}
                            className="select-ciudad"
                        >
                            {ciudades.map(c => (
                                <option key={c.id} value={c.id}>{c.label}</option>
                            ))}
                        </select>
                    </div>

                    <div className="info-card">
                        <h2>Habitantes</h2>
                        <p className="resultado-count">
                            {personasFiltradas.length} persona(s) en {ciudades.find(c => c.id === ciudadSeleccionada)?.label}
                        </p>
                        <ul className="lista-personas">
                            {personasFiltradas.map(p => (
                                <li key={p.id} className="persona-item">
                                    <span className="nombre">{p.nombre}</span>
                                    <span className="edad">{p.edad} años</span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="info-card">
                        <h2>Estadísticas</h2>
                        <p>Total personas: <strong>{grafo.nodes.filter(id => grafo.nodeData[id].type === 'person').length}</strong></p>
                        <p>Total ciudades: <strong>{ciudades.length}</strong></p>
                    </div>
                </aside>

                {/* ✅ Visualización del grafo */}
                <main className="graph-section">
                    <h2>🗺️ Visualización del Grafo</h2>
                    <GraphView data={grafo.toD3Format()} />
                </main>
            </div>
        </div>
    );
}

export default App;