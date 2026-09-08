import { useState } from 'react';
import './EstudianteFormulario.css';

function EstudianteFormulario({ onAddStudent }) {
    const [name, setName] = useState('');
    const [age, setAge] = useState('');
    const [code, setCode] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        
        // Validar campos
        if (!name.trim() || !age.trim() || !code.trim()) {
            setError('⚠️ Todos los campos son obligatorios');
            return;
        }

        
        const ageNum = Number(age);
        if (isNaN(ageNum) || ageNum < 1 || ageNum > 90) {
            setError('⚠️ Edad inválida (1-90)');
            return;
        }

       
        if (!/^\d+$/.test(code)) {
            setError('⚠️ El código debe ser un número');
            return;
        }

        
        const newStudent = {
            name: name.trim(),
            age: ageNum,
            code: code.trim()
        };

        
        onAddStudent(newStudent);

       
        setName('');
        setAge('');
        setCode('');
        setError('');
    };

    return (
        <div className="student-form-container">
            <h3>📝 Agregar Estudiante</h3>
            <form onSubmit={handleSubmit} className="student-form">
                {error && <div className="error-message">{error}</div>}

                <div className="form-group">
                    <label>Nombre:</label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Ej: Raul Gonzales"
                    />
                </div>

                <div className="form-group">
                    <label>Edad:</label>
                    <input
                        type="number"
                        value={age}
                        onChange={(e) => setAge(e.target.value)}
                        placeholder="Ej: 20"
                        min="1"
                        max="120"
                    />
                </div>

                <div className="form-group">
                    <label>Código:</label>
                    <input
                        type="text"
                        value={code}
                        onChange={(e) => setCode(e.target.value)}
                        placeholder="Ej: 2024001"
                    />
                </div>

                <button type="submit" className="btn-add">
                    Agregar Estudiante
                </button>
            </form>
        </div>
    );
}

export default EstudianteFormulario;