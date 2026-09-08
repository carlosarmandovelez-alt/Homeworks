import { useState } from 'react';
import './TurnoFormulario.css';

function TurnoFormulario({ onAddTurn }) {
    const [name, setName] = useState('');
    const [service, setService] = useState('General');
    const [error, setError] = useState('');

    const services = [
        'General',
        'Preferencial',
        'Consultas',
        'Urgencias',
        'Caja',
        'Atención al Cliente'
    ];

    const handleSubmit = (e) => {
        e.preventDefault();
        
        
        if (!name.trim()) {
            setError('⚠️ El nombre es obligatorio');
            return;
        }

        
        const turnNumber = Date.now().toString().slice(-4);
        
        
        const newTurn = {
            number: turnNumber,
            name: name.trim(),
            service: service,
            timestamp: new Date().toLocaleTimeString()
        };

        
        onAddTurn(newTurn);

        setName('');
        setError('');
    };

    return (
        <div className="turn-form-container">
            <h3>➕ Nuevo Turno</h3>
            <form onSubmit={handleSubmit} className="turn-form">
                {error && <div className="error-message">{error}</div>}

                <div className="form-group">
                    <label>Nombre del Cliente:</label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Ej: Luis Perez"
                    />
                </div>

                <div className="form-group">
                    <label>Tipo de Servicio:</label>
                    <select
                        value={service}
                        onChange={(e) => setService(e.target.value)}
                    >
                        {services.map(s => (
                            <option key={s} value={s}>{s}</option>
                        ))}
                    </select>
                </div>

                <button type="submit" className="btn-add">
                    🎫 Generar Turno
                </button>
            </form>
        </div>
    );
}

export default TurnoFormulario;