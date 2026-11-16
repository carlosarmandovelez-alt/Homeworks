import { useState, useEffect } from 'react';
import './SearchBar.scss';

function SearchBar({ onSearch }) {
    const [query, setQuery] = useState('');

    useEffect(() => {
        const timer = setTimeout(() => {
            onSearch(query);
        }, 500);

        return () => clearTimeout(timer);
    }, [query, onSearch]);

    return (
        <div className="search-bar">
            <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="🔍 Busca GIFs (ej: smile, cat, funny...)"
            />
        </div>
    );
}

export default SearchBar;