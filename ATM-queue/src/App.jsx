import { useState, useEffect } from 'react';
import './App.css';
import Queue from './estructura/queue';
import { Personas } from './informacion/data';
import PersonaFormulario from './componentes/PersonaFormulario';
import ColaCajero from './componentes/ColaCajero';

function App() {
    const [cola] = useState(() => {
        const q = new Queue();
        Personas.forEach(p => q.enqueue(p));
        return q;
    });

    const [personas, setPersonas] = useState([]);
    const [renderKey, setRenderKey] = useState(0);

    const actualizarVista = () => {
        setPersonas(cola.getAll());
        setRenderKey(prev => prev + 1);
    };

    useEffect(() => {
        console.log('🔵 Personas desde la cola:');
        console.table(cola.getAll().map(p => ({
            nombre: p.nombre,
            fecha: p.fechaLlegada,
            timestamp: p.timestamp
        })));
        actualizarVista();
    }, []);

    const handleAgregarPersona = (nuevaPersona) => {
        cola.enqueue(nuevaPersona);
        actualizarVista();
    };

    const handleAtenderPersona = () => {
        cola.dequeue();
        actualizarVista();
    };

    return (
        <div className="app" key={renderKey}>
            <header className="app-header">
                <h1>Cajero ATM </h1>
                <p className="subtitle">Cola ordenada por fecha de llegada</p>
                <p className="stats">Personas en fila: {personas.length}</p>
            </header>

            <div className="grid-2cols">
                <PersonaFormulario onAgregarPersona={handleAgregarPersona} />
                <ColaCajero
                    personas={personas}
                    onAtenderPersona={handleAtenderPersona}
                />
            </div>

        </div>
    );
}

export default App;