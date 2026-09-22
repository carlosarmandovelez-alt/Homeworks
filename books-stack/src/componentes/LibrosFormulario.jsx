import { useState } from 'react';

function LibrosFormulario({ onAgregarLibro }) {
    const [nombre, setNombre] = useState('');
    const [isbn, setIsbn] = useState('');
    const [autor, setAutor] = useState('');
    const [editorial, setEditorial] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!nombre.trim() || !isbn.trim() || !autor.trim() || !editorial.trim()) {
            return;
        }

        const nuevoLibro = {
            id: Date.now(),
            nombre: nombre.trim(),
            isbn: isbn.trim(),
            autor: autor.trim(),
            editorial: editorial.trim()
        };

        onAgregarLibro(nuevoLibro);

        setNombre('');
        setIsbn('');
        setAutor('');
        setEditorial('');
    };

    return (
        <div className="card">
            <h3>INGRESAR LIBRO</h3>
            <form onSubmit={handleSubmit} className="form">
                <div className="form-group">
                    <label>Nombre:</label>
                    <input
                        type="text"
                        value={nombre}
                        onChange={(e) => setNombre(e.target.value)}
                        placeholder="Ej: El Quijote"
                    />
                </div>

                <div className="form-group">
                    <label>ISBN:</label>
                    <input
                        type="text"
                        value={isbn}
                        onChange={(e) => setIsbn(e.target.value)}
                        placeholder="Ej: 978-1234567890"
                    />
                </div>

                <div className="form-group">
                    <label>Autor:</label>
                    <input
                        type="text"
                        value={autor}
                        onChange={(e) => setAutor(e.target.value)}
                        placeholder="Ej: Miguel de Cervantes"
                    />
                </div>

                <div className="form-group">
                    <label>Editorial:</label>
                    <input
                        type="text"
                        value={editorial}
                        onChange={(e) => setEditorial(e.target.value)}
                        placeholder="Ej: Editorial Planeta"
                    />
                </div>

                <button type="submit" className="btn-primary">
                    Agregar a la Pila
                </button>
            </form>
        </div>
    );
}

export default LibrosFormulario;