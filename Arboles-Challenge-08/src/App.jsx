import { useState, useEffect } from 'react';
import './App.scss';
import ArbolBinario from './estructura/ArbolBinario';
import { numeros } from './data/numeros';
import BinaryTreeView from './componentes/BinaryTreeView';

function App() {
    
    const [arbol] = useState(() => {
        const a = new ArbolBinario();
        numeros.forEach(n => a.insertar(n));
        return a;
    });

    
    const [preorder, setPreorder] = useState([]);
    const [inorder, setInorder] = useState([]);
    const [postorder, setPostorder] = useState([]);

    
    const [buscar, setBuscar] = useState('');
    const [resultado, setResultado] = useState(null);
    const [busquedaRealizada, setBusquedaRealizada] = useState(false);

    
    useEffect(() => {
        const pre = arbol.preorder();
        const ino = arbol.inorder();
        const post = arbol.postorder();

        setPreorder(pre);
        setInorder(ino);
        setPostorder(post);

        
        console.log('========================================');
        console.log('🌳 ÁRBOL BINARIO - RECORRIDOS');
        console.log('========================================');
        console.log('📌 Números insertados:', numeros.join(', '));
        console.log('');
        console.log('🟢 PREORDER  (Nodo-Izquierda-Derecha):', pre.join(', '));
        console.log('🟡 INORDER   (Izquierda-Nodo-Derecha):', ino.join(', '));
        console.log('🔴 POSTORDER (Izquierda-Derecha-Nodo):', post.join(', '));
        console.log('========================================');
    }, [arbol]);

    
    const handleBuscar = (e) => {
        e.preventDefault();
        if (!buscar) return;

        const encontrado = arbol.buscar(Number(buscar));
        setResultado(encontrado);
        setBusquedaRealizada(true);

        console.log(`🔍 Buscar ${buscar}: ${encontrado ? '✅ Encontrado' : '❌ No encontrado'}`);
    };

    
    const handleLimpiar = () => {
        setBuscar('');
        setResultado(null);
        setBusquedaRealizada(false);
    };

    return (
        <div className="app">
            <header className="app-header">
                <h1>🌳 Árbol Binario de Búsqueda</h1>
            </header>

            {/* ===== SECCIÓN 1: RECORRIDOS ===== */}
            <section className="section">
                <h2>📊 Recorridos del Árbol</h2>


                <div className="recorridos">
                    <div className="recorrido-card preorder">
                        <h3>🟢 Preorder</h3>
                        <p className="orden">Nodo → Izquierda → Derecha</p>
                        <p className="valores">{preorder.join(' → ')}</p>
                    </div>

                    <div className="recorrido-card inorder">
                        <h3>🟡 Inorder</h3>
                        <p className="orden">Izquierda → Nodo → Derecha</p>
                        <p className="valores">{inorder.join(' → ')}</p>
                    </div>

                    <div className="recorrido-card postorder">
                        <h3>🔴 Postorder</h3>
                        <p className="orden">Izquierda → Derecha → Nodo</p>
                        <p className="valores">{postorder.join(' → ')}</p>
                    </div>
                </div>
            </section>

            {/* ===== SECCIÓN 2: BÚSQUEDA ===== */}
            <section className="section">
                <h2>🔍 Buscar un Valor</h2>

                <form onSubmit={handleBuscar} className="buscador-form">
                    <input
                        type="number"
                        value={buscar}
                        onChange={(e) => setBuscar(e.target.value)}
                        placeholder="Ingresa un número (ej: 25)"
                    />
                    <button type="submit" className="btn-buscar">
                        Buscar
                    </button>
                    {busquedaRealizada && (
                        <button type="button" onClick={handleLimpiar} className="btn-limpiar">
                            Limpiar
                        </button>
                    )}
                </form>

                {busquedaRealizada && (
                    <div className={`resultado ${resultado ? 'encontrado' : 'no-encontrado'}`}>
                        {resultado ? (
                            <>✅ El valor <strong>{buscar}</strong> SÍ existe en el árbol</>
                        ) : (
                            <>❌ El valor <strong>{buscar}</strong> NO existe en el árbol</>
                        )}
                    </div>
                )}

                <div className="valores-disponibles">
                    <p>Valores en el árbol:</p>
                    <div className="chips">
                        {inorder.map((n, i) => (
                            <span key={i} className="chip">{n}</span>
                        ))}
                    </div>
                </div>
            </section>

            {/* ===== SECCIÓN 3: VISUALIZACIÓN ===== */}
            <section className="section">
                <h2>🌲 Visualización del Árbol</h2>
                <p className="section-subtitle">
                    Puedes arrastrar y hacer zoom para explorar
                </p>
                <BinaryTreeView data={arbol.toD3Tree()} />
            </section>
        </div>
    );
}

export default App;