import './RotacionMedicos.css';
function RotacionMedicos({ doctors = [], currentDoctor, onNextDoctor }) {
    if (!doctors || doctors.length === 0) {
        return (
            <div className="card">
                <h3>Rotación de Médicos</h3>
                <p className="empty-message">No hay médicos registrados</p>
            </div>
        );
    }

    return (
        <div className="card">
            <h3>Rotación de Médicos</h3>

            <div className="current-doctor">
                <div className="doctor-info">
                    <span className="doctor-name">{currentDoctor?.nombre || 'Sin médico'}</span>
                    <span className="doctor-specialty">{currentDoctor?.especialidad || ''}</span>
                </div>
                <span className="doctor-status">Activo</span>
            </div>

            <button onClick={onNextDoctor} className="btn-rotate">
                Cambiar Médico de Guardia
            </button>

            <ul className="list">
                {doctors.map((doctor) => (
                    <li
                        key={doctor.id}
                        className={`list-item doctor-item ${doctor.id === currentDoctor?.id ? 'active' : ''}`}
                    >
                        <span className="doctor-name">{doctor.nombre}</span>
                        <span className="doctor-specialty">{doctor.especialidad}</span>
                        {doctor.id === currentDoctor?.id && <span className="badge-actual">Actual</span>}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default RotacionMedicos;