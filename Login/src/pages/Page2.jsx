import { useState, useEffect } from 'react';
import Stack from '../estructura/Stack';
import { LIBROS } from '../informacion/data';
import LibroFormulario from '../componentes/LibroFormulario';
import PilaLibros from '../componentes/PilaLibros';

function Page2() {
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

    const handleDesapilar = () => {
        pila.pop();
        actualizarVista();
    };

    return (
        <div key={renderKey}>
            <h2 className="page-title">Pila de Libros</h2>

            <div className="grid-2cols">
                <LibroFormulario onAgregarLibro={handleAgregarLibro} />
                <PilaLibros libros={libros} onDesapilar={handleDesapilar} />
            </div>
        </div>
    );
}

export default Page2;