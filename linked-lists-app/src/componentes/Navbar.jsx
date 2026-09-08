import './Navbar.css';

function Navbar({ onNavigate, currentPage }) {
    
    const handleNavigation = (page) => {
        onNavigate(page);
    };

    
    const isActive = (page) => currentPage === page;

    return (
        <nav className="navbar">
            <div className="nav-brand">
                <span className="brand-text">Estructuras de Datos</span>
            </div>
            <ul className="nav-links">
                <li>
                    <a 
                        href="#" 
                        onClick={() => handleNavigation('home')}
                        className={isActive('home') ? 'active' : ''}
                    >
                        🏠 Inicio
                    </a>
                </li>
                <li>
                    <a 
                        href="#" 
                        onClick={() => handleNavigation('music')}
                        className={isActive('music') ? 'active' : ''}
                    >
                        🎵 Música
                    </a>
                </li>
                <li>
                    <a 
                        href="#" 
                        onClick={() => handleNavigation('browser')}
                        className={isActive('browser') ? 'active' : ''}
                    >
                        🌐 Navegador
                    </a>
                </li>
            </ul>
        </nav>
    );
}

export default Navbar;