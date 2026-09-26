import { useState, useEffect } from 'react';
import Queue from '../estructura/Queue';
import { Personas } from '../informacion/data';
import PersonaFormulario from '../componentes/PersonaFormulario';
import ColaCajero from '../componentes/ColaCajero';

function Page1() {
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
        <div key={renderKey}>
            <h2 className="page-title">Cola del Cajero ATM</h2>

            <div className="grid-2cols">
                <PersonaFormulario onAgregarPersona={handleAgregarPersona} />
                <ColaCajero personas={personas} onAtenderPersona={handleAtenderPersona} />
            </div>
        </div>
    );
}

export default Page1;