import './ProductoDisplay.css';

function ProductoDisplay({ product, index, total, onNext, onPrev }) {
    
    if (!product) {
        return (
            <div className="producto-display empty">
                <p>📭 No hay productos disponibles</p>
            </div>
        );
    }

    return (
        <div className="producto-display">
            {/* Indicador de posición */}
            <div className="producto-indicator">
                <span className="producto-counter">
                    Producto {index + 1} de {total}
                </span>
            </div>

            
            <div className="producto-card">
                <div className="producto-image">
                    {product.image ? (
                        <img src={product.image} alt={product.name} />
                    ) : (
                        <div className="image-placeholder">🛍️</div>
                    )}
                </div>

                <div className="producto-info">
                    <h2 className="producto-name">{product.name}</h2>
                    <p className="producto-description">{product.description}</p>
                    <div className="producto-meta">
                        <span className="producto-price">💰 ${product.price}</span>
                        <span className="producto-category">📂 {product.category}</span>
                        <span className="producto-rating">⭐ {product.rating}/5</span>
                    </div>
                </div>
            </div>

            
            <div className="producto-controls">
                <button onClick={onPrev} className="nav-btn prev-btn">
                    ⬅ Anterior
                </button>
                <button onClick={onNext} className="nav-btn next-btn">
                    Siguiente ➡
                </button>
            </div>

            
            <div className="producto-dots">
                {Array.from({ length: total }).map((_, i) => (
                    <span
                        key={i}
                        className={`dot ${i === index ? 'active' : ''}`}
                    />
                ))}
            </div>
        </div>
    );
}

export default ProductoDisplay;