import './PilaLibros.css';
function PilaLibros({ libros = [] }) {
    if (libros.length === 0) {
        return (
            <div className="card">
                <h3>📚 Pila de Libros</h3>
                <p className="empty-message">✅ No hay libros en la pila</p>
            </div>
        );
    }

    return (
        <div className="card">
            <h3>📚 Pila de Libros ({libros.length})</h3>
            <ul className="list">
                {libros.map((libro, index) => (
                    <li key={libro.id} className="list-item">
                        <span className="libro-posicion">#{libros.length - index}</span>
                        <span className="libro-nombre">{libro.nombre}</span>
                        <span className="libro-autor">✍️ {libro.autor}</span>
                        <span className="libro-isbn">📇 {libro.isbn}</span>
                        <span className="libro-editorial">🏢 {libro.editorial}</span>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default PilaLibros;