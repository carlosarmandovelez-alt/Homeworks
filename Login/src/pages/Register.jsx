// src/pages/Register.jsx
import { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

function Register() {
    const [nombre, setNombre] = useState('');           // ← NUEVO
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');  // ← NUEVO
    const [error, setError] = useState('');
    const { register } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        // ✅ Validaciones
        if (!nombre.trim()) {
            setError('El nombre es obligatorio');
            return;
        }

        if (nombre.trim().length < 3) {
            setError('El nombre debe tener al menos 3 caracteres');
            return;
        }

        if (password.length < 6) {
            setError('La contraseña debe tener al menos 6 caracteres');
            return;
        }

        if (password !== confirmPassword) {
            setError('Las contraseñas no coinciden');
            return;
        }

        try {
            await register(email, password, nombre.trim());
            navigate('/tasks', { replace: true });
        } catch (err) {
            if (err.code === 'auth/email-already-in-use') {
                setError('Este email ya está registrado');
            } else if (err.code === 'auth/invalid-email') {
                setError('El email no es válido');
            } else if (err.code === 'auth/weak-password') {
                setError('La contraseña es muy débil');
            } else {
                setError('Error al registrar. Intenta de nuevo.');
            }
        }
    };

    return (
        <div className="auth-container">
            <div className="auth-card">
                <h1>📝 Registrarse</h1>

                <form onSubmit={handleSubmit}>
                    {error && <div className="error-message">{error}</div>}

                    <div className="form-group">
                        <label>Nombre de usuario:</label>
                        <input
                            type="text"
                            value={nombre}
                            onChange={(e) => setNombre(e.target.value)}
                            placeholder="Ej: Carlos Pérez"
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label>Email:</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="tu@email.com"
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label>Contraseña:</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Mínimo 6 caracteres"
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label>Confirmar contraseña:</label>
                        <input
                            type="password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            placeholder="Repite tu contraseña"
                            required
                        />
                    </div>

                    <button type="submit" className="btn-primary">
                        Crear Cuenta
                    </button>
                </form>

                <p className="auth-link">
                    ¿Ya tienes cuenta? <Link to="/login">Inicia Sesión</Link>
                </p>
            </div>
        </div>
    );
}

export default Register;