import { useState } from 'react';
import './Sidebar.scss';


function MenuItem({ nodo, nivel = 0, onSelect }) {
    const [abierto, setAbierto] = useState(false);

    const tieneHijos = nodo.hijos && nodo.hijos.length > 0;

    const handleClick = () => {
        if (tieneHijos) {
            setAbierto(!abierto);
        } else {
            console.log(`🔗 Navegando a: ${nodo.valor.link}`);
            console.log(`📦 Componente: ${nodo.valor.componente}`);
            if (onSelect) onSelect(nodo.valor);
        }
    };

    return (
        <li className="menu-item" style={{ paddingLeft: `${nivel * 16}px` }}>
            <div
                className={`menu-item-header ${tieneHijos ? 'has-children' : ''}`}
                onClick={handleClick}
            >
                <span className="menu-icon">
                    {tieneHijos ? (abierto ? '📂' : '📁') : '📄'}
                </span>
                <span className="menu-title">{nodo.valor.titulo}</span>
                {tieneHijos && (
                    <span className={`menu-arrow ${abierto ? 'open' : ''}`}>
                        ▶
                    </span>
                )}
            </div>

            {tieneHijos && abierto && (
                <ul className="submenu">
                    {nodo.hijos.map((hijo, index) => (
                        <MenuItem
                            key={index}
                            nodo={hijo}
                            nivel={nivel + 1}
                            onSelect={onSelect}
                        />
                    ))}
                </ul>
            )}
        </li>
    );
}


function Sidebar({ raiz, onSelect }) {
    if (!raiz) return null;

    return (
        <aside className="sidebar">
            <div className="sidebar-header">
                <h2>🗂️ Menú</h2>
            </div>

            <ul className="sidebar-menu">
                {raiz.hijos.map((hijo, index) => (
                    <MenuItem
                        key={index}
                        nodo={hijo}
                        nivel={0}
                        onSelect={onSelect}
                    />
                ))}
            </ul>

            <div className="sidebar-footer">
                <p>Challenge 09 - N-ary Tree</p>
            </div>
        </aside>
    );
}

export default Sidebar;