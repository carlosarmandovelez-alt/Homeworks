import { useState, useEffect } from 'react';
import './App.css';
import Stack from './estructura/Stack';
import { LIBROS } from './Informacion/data';
import LibrosFormulario from './componentes/LibrosFormulario';
import PilaLibros from './componentes/PilaLibros';

function App() {
    const [pila] = useState(() => {
        const s = new Stack();
        LIBROS.forEach(libro => s.push(libro));
        return s;
    });

    const [libros, setLibros] = useState([]);
    const [renderKey, setRenderKey] = useState(0);

    const actualizarVista = () => {
        setLibros(pila.getAll());
        setRenderKey(prev => prev + 1);
    };

    useEffect(() => {
        actualizarVista();
    }, []);

    const handleAgregarLibro = (nuevoLibro) => {
        pila.push(nuevoLibro);
        actualizarVista();
    };

    return (
        <div className="app" key={renderKey}>
            <header className="app-header">
                <h1>Pila de Libros</h1>
                <p className="stats">Libros en pila: {libros.length}</p>
            </header>

            <div className="grid-2cols">
                <LibrosFormulario onAgregarLibro={handleAgregarLibro} />
                <PilaLibros libros={libros} />
            </div>

        </div>
    );
}

export default App;