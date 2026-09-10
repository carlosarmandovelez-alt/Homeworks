import './ComiteAdministrativo.css';
function ComiteAdministrativo({ members = [], currentMember, onNextMember, onPrevMember }) {
    if (!members || members.length === 0) {
        return (
            <div className="card">
                <h3>Comite Administrativo</h3>
                <p className="empty-message">No hay miembros registrados</p>
            </div>
        );
    }

    return (
        <div className="card">
            <h3>Comité Administrativo</h3>

            <div className="current-member">
                <span className="member-role">{currentMember?.cargo || 'Sin cargo'}</span>
                <span className="member-name">{currentMember?.nombre || 'Sin miembro'}</span>
            </div>

            <div className="comite-controls">
                <button onClick={onPrevMember} className="btn-comite">⬅ Anterior</button>
                <button onClick={onNextMember} className="btn-comite">Siguiente ➡</button>
            </div>

            <ul className="list">
                {members.map((member) => (
                    <li
                        key={member.id}
                        className={`list-item member-item ${member.id === currentMember?.id ? 'active' : ''}`}
                    >
                        <span className="member-name">{member.nombre}</span>
                        <span className="member-role">{member.cargo}</span>
                        {member.id === currentMember?.id && <span className="badge-actual">Actual</span>}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default ComiteAdministrativo;