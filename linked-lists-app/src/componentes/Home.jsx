import '../styles/pages.css';

function Home({ onNavigate }) {  
    const handleNavigation = (page) => {
        onNavigate(page);  
    };

    return (
        <div className="page-container home-page">
            <div className="hero">
                <h1>Estructuras de Datos</h1>
                <h2>Listas Enlazadas</h2>
                <p className="subtitle">
                    
                </p>
            </div>

            <div className="cards-container">
                <div className="info-card">
                    <div className="card-icon">🎵</div>
                    <h3>Lista Enlazada Simple</h3>
                    <p>Reproductor de música </p>
                    <button 
                        onClick={() => handleNavigation('music')} 
                        className="card-btn"
                    >
                        Explorar →
                    </button>
                </div>

                <div className="info-card">
                    <div className="card-icon">🌐</div>
                    <h3>Lista Doblemente Enlazada</h3>
                    <p>Historial del navegador </p>
                    <button 
                        onClick={() => handleNavigation('browser')} 
                        className="card-btn"
                    >
                        Explorar →
                    </button>
                </div>

            </div>

            
        </div>
    );
}

export default Home;