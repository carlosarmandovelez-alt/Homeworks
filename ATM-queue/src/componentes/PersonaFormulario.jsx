import { useState } from 'react';

function PersonaFormulario({ onAgregarPersona }) {
    const [nombre, setNombre] = useState('');
    const [cantidadRetirar, setCantidadRetirar] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!nombre.trim() || !cantidadRetirar) return;

        onAgregarPersona({
            id: Date.now(),
            nombre: nombre.trim(),
            cantidadRetirar: Number(cantidadRetirar)
        });

        setNombre('');
        setCantidadRetirar('');
    };

    return (
        <div className="card">
            <h3>Nueva Persona en Cola</h3>
            <form onSubmit={handleSubmit} className="form">
                <div className="form-group">
                    <label>Nombre:</label>
                    <input
                        type="text"
                        value={nombre}
                        onChange={(e) => setNombre(e.target.value)}
                        placeholder="Ej: Esteban Rodriguez"
                    />
                </div>
                <div className="form-group">
                    <label>Cantidad a retirar:</label>
                    <input
                        type="number"
                        value={cantidadRetirar}
                        onChange={(e) => setCantidadRetirar(e.target.value)}
                        placeholder="Ej: 150000"
                        min="0"
                    />
                </div>
                <button type="submit" className="btn-primary">
                    Agregar a la Fila
                </button>
            </form>
        </div>
    );
}

export default PersonaFormulario;