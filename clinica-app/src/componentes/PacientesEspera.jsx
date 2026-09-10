import './PacientesEspera.css';
function PacientesEspera({ patients = [], onAttendPatient }) {
    if (!patients || patients.length === 0) {
        return (
            <div className="card">
                <h3>Pacientes en Espera</h3>
                <p className="empty-message">No hay pacientes en espera</p>
            </div>
        );
    }

    const primerPaciente = patients[0];
    const restoPacientes = patients.slice(1);

    return (
        <div className="card">
            <h3>Pacientes en Espera ({patients.length})</h3>

            <div className="paciente-actual">
                <h4>Siguiente en ser atendido:</h4>
                <div className="paciente-card">
                    <div className="paciente-info">
                        <span className="paciente-nombre">{primerPaciente.nombre}</span>
                        <span className="paciente-edad">{primerPaciente.edad} años</span>
                        <span className={`priority priority-${primerPaciente.prioridad.toLowerCase()}`}>
                            {primerPaciente.prioridad}
                        </span>
                    </div>
                    <p className="paciente-motivo">{primerPaciente.motivo}</p>
                    <button className="btn-attend" onClick={() => onAttendPatient(primerPaciente.id)}>
                        Atender al siguiente
                    </button>
                </div>
            </div>

            {restoPacientes.length > 0 && (
                <div className="resto-pacientes">
                    <h4>En espera ({restoPacientes.length}):</h4>
                    <ul className="list">
                        {restoPacientes.map((patient) => (
                            <li key={patient.id} className="list-item">
                                <div className="patient-info">
                                    <span className="patient-name">{patient.nombre}</span>
                                    <span className="patient-age">{patient.edad} años</span>
                                    <span className={`priority priority-${patient.prioridad.toLowerCase()}`}>
                                        {patient.prioridad}
                                    </span>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
}

export default PacientesEspera;