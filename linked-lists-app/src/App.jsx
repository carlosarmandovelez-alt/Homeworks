// src/App.jsx
import { useState } from 'react';
import './App.css';
import Navbar from './componentes/Navbar';
import Home from './componentes/Home';
import MusicPlayer from './componentes/MusicPlayer';
import BrowserHistory from './componentes/BrowserHistory';

function App() {
    const [currentPage, setCurrentPage] = useState('home');

    const navigateTo = (page) => {
        setCurrentPage(page);
    };

    const renderPage = () => {
        switch (currentPage) {
            case 'home':
                return <Home onNavigate={navigateTo} />;  // ← Pasar la función
            case 'music':
                return <MusicPlayer />;
            case 'browser':
                return <BrowserHistory />;
            default:
                return <Home onNavigate={navigateTo} />;
        }
    };

    return (
        <div className="app">
            <Navbar onNavigate={navigateTo} currentPage={currentPage} />
            <main className="main-content">
                {renderPage()}
            </main>
            <footer className="footer">
                <p>📚 Estructuras de Datos II - Listas Enlazadas</p>
            </footer>
        </div>
    );
}

export default App;