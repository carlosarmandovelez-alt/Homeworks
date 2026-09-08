import './TurnoDisplay.css';

function TurnoDisplay({ 
    currentTurn, 
    currentIndex, 
    totalTurns, 
    allTurns,
    onNext 
}) {
    
    if (!currentTurn) {
        return (
            <div className="turner-display empty">
                <div className="empty-state">
                    <span className="empty-icon">🔢</span>
                    <h2>Sin Turnos</h2>
                    <p>Agrega un nuevo turno para comenzar</p>
                </div>
            </div>
        );
    }

    
    const waitTime = (allTurns.length - currentIndex - 1) * 5;

    return (
        <div className="turner-display">
            {/* Cabecera */}
            <div className="turner-header">
                <span className="turner-icon">🔢</span>
                <span className="turner-title">Sistema de Turnos</span>
                <span className="turner-counter">
                    {currentIndex + 1} / {totalTurns}
                </span>
            </div>

            {/* Turno actual - GRANDE */}
            <div className="current-turn-container">
                <div className="current-turn-number">
                    {currentTurn.number}
                </div>
                <div className="current-turn-label">
                    Turno Actual
                </div>
            </div>

            {/* Detalles del turno */}
            <div className="turn-details">
                <div className="detail-item">
                    <span className="detail-label">Cliente:</span>
                    <span className="detail-value">{currentTurn.name}</span>
                </div>
                <div className="detail-item">
                    <span className="detail-label">Servicio:</span>
                    <span className="detail-value service-badge">
                        {currentTurn.service}
                    </span>
                </div>
                <div className="detail-item">
                    <span className="detail-label">Hora:</span>
                    <span className="detail-value">{currentTurn.timestamp}</span>
                </div>
                <div className="detail-item">
                    <span className="detail-label">Espera estimada:</span>
                    <span className="detail-value">{waitTime} minutos</span>
                </div>
            </div>

            {/* Botón siguiente */}
            <button onClick={onNext} className="btn-next">
                ⏭ Siguiente Turno
            </button>

            {/* Lista de turnos pendientes */}
            <div className="pending-turns">
                <h4>📋 Turnos Pendientes ({totalTurns - currentIndex - 1})</h4>
                <ul className="pending-list">
                    {allTurns.slice(currentIndex + 1, currentIndex + 6).map((turn, idx) => (
                        <li key={idx} className="pending-item">
                            <span className="pending-number">{turn.number}</span>
                            <span className="pending-name">{turn.name}</span>
                            <span className="pending-service">{turn.service}</span>
                        </li>
                    ))}
                    {totalTurns - currentIndex - 1 > 5 && (
                        <li className="pending-more">
                            +{totalTurns - currentIndex - 1 - 5} más...
                        </li>
                    )}
                </ul>
            </div>
        </div>
    );
}

export default TurnoDisplay;