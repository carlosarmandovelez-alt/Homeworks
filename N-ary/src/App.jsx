import { useState, useEffect } from 'react';
import './App.scss';
import ArbolNario from './estructura/ArbolNario';
import { construirMenu } from './data/menus';
import Sidebar from './componentes/Sidebar';

function App() {
    
    const [arbol] = useState(() => {
        const a = new ArbolNario();
        a.setRaiz(construirMenu());
        return a;
    });

    
    const [seleccionado, setSeleccionado] = useState(null);

    
    useEffect(() => {
        const dfs = arbol.dfs().map(n => n.titulo);
        const bfs = arbol.bfs().map(n => n.titulo);

        console.log('========================================');
        console.log('🌴 ÁRBOL N-ARIO - MENÚS');
        console.log('========================================');
        console.log('📌 DFS (Depth-First Search):');
        console.log('   ', dfs.join(' → '));
        console.log('');
        console.log('📌 BFS (Breadth-First Search):');
        console.log('   ', bfs.join(' → '));
        console.log('========================================');
    }, [arbol]);

    
    const handleSelect = (valor) => {
        setSeleccionado(valor);
    };

    return (
        <div className="app-layout">
            {/* ✅ Sidebar generado desde el árbol N-ario */}
            <Sidebar raiz={arbol.raiz} onSelect={handleSelect} />

            {/* ✅ Contenido principal */}
            <main className="main-content">
                <header className="main-header">
                    <h1>🌴 Árbol N-ario - Menús</h1>
                </header>

                <section className="info-section">
                    <h2>¿Cómo funciona?</h2>
                    <p>
                        El sidebar de la izquierda está generado <strong>dinámicamente</strong> a partir
                        de un árbol N-ario. Cada nodo tiene:
                    </p>
                    <ul>
                        <li><strong>Título:</strong> Lo que se muestra en el menú</li>
                        <li><strong>Link:</strong> A dónde navega al hacer clic</li>
                        <li><strong>Componente:</strong> Qué componente renderizar</li>
                    </ul>
                    <p>
                        Haz clic en los ítems con 📁 para <strong>expandir submenús</strong>.
                        Los ítems con 📄 se pueden seleccionar.
                    </p>
                </section>

                {/* ✅ Mostrar el componente seleccionado */}
                {seleccionado && (
                    <section className="info-section seleccionado-section">
                        <h2>📌 Selección Actual</h2>
                        <div className="seleccionado-card">
                            <p><strong>Título:</strong> {seleccionado.titulo}</p>
                            <p><strong>Link:</strong> {seleccionado.link}</p>
                            <p><strong>Componente:</strong> {seleccionado.componente}</p>
                        </div>
                    </section>
                )}

                {/* ✅ Recorridos del árbol */}
                <section className="info-section">
                    <h2>📋 Recorridos del Árbol</h2>
                    <p>Revisa la consola del navegador (F12) para ver los recorridos DFS y BFS.</p>

                    <div className="recorrido">
                        <h3>DFS (Depth-First Search)</h3>
                        <p className="valores">
                            {arbol.dfs().map(n => n.titulo).join(' → ')}
                        </p>
                    </div>

                    <div className="recorrido">
                        <h3>BFS (Breadth-First Search)</h3>
                        <p className="valores">
                            {arbol.bfs().map(n => n.titulo).join(' → ')}
                        </p>
                    </div>
                </section>
            </main>
        </div>
    );
}

export default App;