import './PilaLibros.css';

function PilaLibros({ libros = [] }) {
    if (libros.length === 0) {
        return (
            <div className="card">
                <h3>Pila de Libros</h3>
                <p className="empty-message"> No hay libros en la pila</p>
            </div>
        );
    }

    const totalLibros = libros.length;

    return (
        <div className="card">
            <h3> Pila de Libros ({totalLibros})</h3>

            <div className="pila-container">


                <ul className="pila-lista">
                    {libros.map((libro, index) => {
                        const numeroReal = totalLibros - index;

                        return (
                            <li
                                key={libro.id}
                                className={`pila-libro ${index === 0 ? 'pila-libro-tope' : ''}`}
                            >
                                <div className="pila-libro-header">
                                    <span className="pila-libro-posicion">#{numeroReal}</span>
                                    <span className="pila-libro-nombre">{libro.nombre}</span>
                                </div>
                                <div className="pila-libro-detalles">
                                    <span className="pila-libro-detalle">
                                        ✍️ {libro.autor}
                                    </span>
                                    <span className="pila-libro-detalle">
                                        📇 {libro.isbn}
                                    </span>
                                    <span className="pila-libro-detalle">
                                        🏢 {libro.editorial}
                                    </span>
                                </div>

                            </li>
                        );
                    })}
                </ul>

                
            </div>
        </div>
    );
}

export default PilaLibros;