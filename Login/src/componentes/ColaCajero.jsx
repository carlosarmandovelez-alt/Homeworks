import './ColaCajero.css';

function ColaCajero({ personas = [], onAtenderPersona }) {
    if (personas.length === 0) {
        return (
            <div className="card">
                <h3>Fila del Cajero</h3>
                <p className="empty-message">✅ No hay personas en la fila</p>
            </div>
        );
    }

    const primerPersona = personas[0];
    const restoPersonas = personas.slice(1);

    return (
        <div className="card">
            <h3>🏧 Fila del Cajero ({personas.length})</h3>

            <div className="persona-actual">
                <h4>👉 Siguiente en ser atendido:</h4>
                <div className="persona-card">
                    <div className="persona-info">
                        <span className="persona-nombre">{primerPersona.nombre}</span>
                        <span className="persona-fecha">📅 {primerPersona.fechaLlegada}</span>
                    </div>
                    <p className="persona-monto">
                        💰 Retiro: ${primerPersona.cantidadRetirar.toLocaleString()}
                    </p>
                    <button className="btn-attend" onClick={onAtenderPersona}>
                        ✅ Atender
                    </button>
                </div>
            </div>

            {restoPersonas.length > 0 && (
                <div className="resto-personas">
                    <h4>📋 En espera ({restoPersonas.length}):</h4>
                    <ul className="list">
                        {restoPersonas.map((persona) => (
                            <li key={persona.id} className="list-item">
                                <span className="persona-nombre">{persona.nombre}</span>
                                <span className="persona-fecha">📅 {persona.fechaLlegada}</span>
                                <span className="persona-monto">
                                    ${persona.cantidadRetirar.toLocaleString()}
                                </span>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
}

export default ColaCajero;