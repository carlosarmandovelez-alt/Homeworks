import './HistorialAtencion.css';
import { useState } from 'react';

function HistorialAtencion({ history = [], currentHistoryIndex = -1, onNavigateHistory }) {
    const [localIndex, setLocalIndex] = useState(0);

    if (!history || history.length === 0) {
        return (
            <div className="card">
                <h3>Historial de Atención</h3>
                <p className="empty-message"> No hay atenciones registradas</p>
            </div>
        );
    }

    const currentIndex = currentHistoryIndex >= 0 ? currentHistoryIndex : localIndex;
    const safeIndex = Math.min(Math.max(0, currentIndex), history.length - 1);
    const currentRecord = history[safeIndex];

    const navigate = (newIndex) => {
        if (newIndex < 0) newIndex = 0;
        if (newIndex >= history.length) newIndex = history.length - 1;

        if (onNavigateHistory) {
            onNavigateHistory(newIndex);
        } else {
            setLocalIndex(newIndex);
        }
    };

    return (
        <div className="card">
            <h3>Historial de Atención ({history.length})</h3>

            <div className="history-navigation">
                <button
                    onClick={() => navigate(safeIndex - 1)}
                    className="btn-nav"
                    disabled={safeIndex === 0}
                >
                    ⬅ Anterior
                </button>
                <span className="history-counter">{safeIndex + 1} / {history.length}</span>
                <button
                    onClick={() => navigate(safeIndex + 1)}
                    className="btn-nav"
                    disabled={safeIndex === history.length - 1}
                >
                    Siguiente ➡
                </button>
            </div>

            <div className="history-current">
                <div className="history-record">
                    <div className="history-field">
                        <span className="field-label">Paciente:</span>
                        <span className="field-value">{currentRecord.pacienteNombre}</span>
                    </div>
                    <div className="history-field">
                        <span className="field-label">Médico:</span>
                        <span className="field-value"> {currentRecord.medico}</span>
                    </div>
                    <div className="history-field">
                        <span className="field-label">Fecha:</span>
                        <span className="field-value">{currentRecord.fecha}</span>
                    </div>
                    <div className="history-field">
                        <span className="field-label">Diagnóstico:</span>
                        <span className="field-value history-diagnosis">{currentRecord.diagnostico}</span>
                    </div>
                </div>
            </div>

            <ul className="list history-list">
                {history.map((record, index) => (
                    <li
                        key={record.id}
                        className={`list-item ${index === safeIndex ? 'active' : ''}`}
                        onClick={() => navigate(index)}
                    >
                        <span className="history-patient">{record.pacienteNombre}</span>
                        <span className="history-doctor"> {record.medico}</span>
                        <span className="history-date">{record.fecha}</span>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default HistorialAtencion;