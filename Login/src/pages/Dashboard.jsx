import { useContext } from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import './Dashboard.css';

function Dashboard() {
    const { user, logout } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login', { replace: true });
    };

    return (
        <div className="dashboard">
            <header className="dashboard-header">
                <div className="dashboard-brand">
                    <span className="dashboard-user">
                        Bienvenido, <strong>{user?.name}</strong>
                    </span>
                </div>
                <button onClick={handleLogout} className="btn-logout">
                    Cerrar Sesión
                </button>
            </header>

            <nav className="dashboard-nav">
                <Link to="/dashboard" className="nav-link">🏠 Inicio</Link>
                <Link to="/dashboard/page1" className="nav-link">🏧 Cola ATM</Link>
                <Link to="/dashboard/page2" className="nav-link">📚 Pila Libros</Link>
            </nav>

            <main className="dashboard-content">
                <Outlet />
            </main>
        </div>
    );
}

export default Dashboard;