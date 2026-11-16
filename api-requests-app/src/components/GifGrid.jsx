import './GifGrid.scss';

function GifGrid({ gifs }) {
    if (gifs.length === 0) {
        return <p className="empty-message">No se encontraron GIFs. Intenta con otra búsqueda.</p>;
    }

    return (
        <div className="gif-grid">
            {gifs.map(gif => (
                <div key={gif.id} className="gif-card">
                    <img src={gif.images.fixed_height.url} alt={gif.title} loading="lazy" />
                    <div className="gif-info">
                        <p>{gif.title || 'Sin título'}</p>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default GifGrid;