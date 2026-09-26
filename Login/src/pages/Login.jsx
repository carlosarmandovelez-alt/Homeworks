import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import './Login.css';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        setError('');

        if (!email || !password) {
            setError('⚠️ Por favor completa todos los campos');
            return;
        }

        const success = login(email, password);

        if (success) {
            navigate('/dashboard', { replace: true });
        } else {
            setError('❌ Credenciales incorrectas');
        }
    };

    return (
        <div className="login-container">
            <div className="login-card">
                <h1>🔐 Iniciar Sesión</h1>
                <p className="login-hint">
                    <strong>Usuario:</strong> user@mail.com<br />
                    <strong>Contraseña:</strong> 123
                </p>

                <form onSubmit={handleSubmit} className="login-form">
                    {error && <div className="login-error">{error}</div>}

                    <div className="form-group">
                        <label>Email:</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="user@mail.com"
                        />
                    </div>

                    <div className="form-group">
                        <label>Contraseña:</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="••••"
                        />
                    </div>

                    <button type="submit" className="btn-login">
                        Iniciar Sesión
                    </button>
                </form>
            </div>
        </div>
    );
}

export default Login;