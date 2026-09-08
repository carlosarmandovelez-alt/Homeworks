import './EstudianteLista.css';

function EstudianteLista({ students, onDeleteStudent }) {
    
    if (students.length === 0) {
        return (
            <div className="student-list-container">
                <h3>📋 Lista de Estudiantes</h3>
                <div className="empty-state">
                    <p>📭 No hay estudiantes registrados</p>
                    <p className="empty-subtext">Agrega tu primer estudiante</p>
                </div>
            </div>
        );
    }

    return (
        <div className="student-list-container">
            <h3>📋 Lista de Estudiantes ({students.length})</h3>
            <div className="student-grid">
                {students.map((student) => (
                    <div key={student.code} className="student-card">
                        <div className="student-info">
                            <div className="student-name">{student.name}</div>
                            <div className="student-details">
                                <span className="student-age">🎂 {student.age} años</span>
                                <span className="student-code">🎓 Código: {student.code}</span>
                            </div>
                        </div>
                        <button
                            className="btn-delete"
                            onClick={() => onDeleteStudent(student.code)}
                            title="Eliminar estudiante"
                        >
                            ✕
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default EstudianteLista;