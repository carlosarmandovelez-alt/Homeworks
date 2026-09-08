import { useState, useEffect } from 'react';
import './App.css';
import CircularDoublyLinkedList from './estructura/CircularDoublyLinkedList';
import ProductoDisplay from './componentes/ProductoDisplay';

const PRODUCTS = [
    {
        id: 1,
        name: '📱 Xiaomi redmi 18',
        description: 'Pantalla OLED 6.7", Cámara 108MP, Batería 5000mAh',
        price: 899990,
        category: 'Electrónicos',
        rating: 4.8,
        image: null
    },
    {
        id: 2,
        name: '💻 Lenovo Pro',
        description: 'Intel i7, 16GB RAM, SSD 512GB, Pantalla 15.6"',
        price: 1299000,
        category: 'Computadoras',
        rating: 4.6,
        image: null
    },
    {
        id: 3,
        name: '🎧 Airpods',
        description: 'Cancelación de ruido, 40 horas de batería',
        price: 199000,
        category: 'Audio',
        rating: 4.7,
        image: null
    },
    {
        id: 4,
        name: '⌚ Samsung Smart Watch Pro',
        description: 'GPS, Frecuencia cardíaca, Oxímetro, 7 días de batería',
        price: 349000,
        category: 'Accesorios',
        rating: 4.5,
        image: null
    },
    {
        id: 5,
        name: '📷 Cámara Sony Mirrorless',
        description: 'Sensor APS-C 24MP, Video 4K, Estabilización 5 ejes',
        price: 799000,
        category: 'Fotografía',
        rating: 4.9,
        image: null
    }
];

function App() {
    const [carouselList, setCarouselList] = useState(() => {
        const list = new CircularDoublyLinkedList();
        PRODUCTS.forEach(product => list.append(product));
        return list;
    });

    const [currentProduct, setCurrentProduct] = useState(null);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [totalProducts, setTotalProducts] = useState(0);
    const [isAutoPlaying, setIsAutoPlaying] = useState(true);
    const [renderKey, setRenderKey] = useState(0);

    // ✅ Función para recorrer lista y obtener productos (SIN toArray)
    const getProductsFromList = (list) => {
        if (!list || list.size() === 0) return [];
        
        const result = [];
        let current = list.head;
        for (let i = 0; i < list.size(); i++) {
            result.push(current.data);
            current = current.next;
        }
        return result;
    };

    useEffect(() => {
        const product = carouselList.getCurrent();
        setCurrentProduct(product);
        const index = carouselList.getCurrentIndex();
        setCurrentIndex(index >= 0 ? index : 0);
        setTotalProducts(carouselList.size());
    }, [carouselList]);

    useEffect(() => {
        if (!isAutoPlaying) return;

        const interval = setInterval(() => {
            handleNext();
        }, 3000);

        return () => clearInterval(interval);
    }, [isAutoPlaying]);

    // ✅ handleNext SIN toArray()
    const handleNext = () => {
        setCarouselList(prevList => {
            const newList = new CircularDoublyLinkedList();
            
            // Recorrer nodo por nodo para copiar
            if (prevList.head) {
                let current = prevList.head;
                for (let i = 0; i < prevList.size(); i++) {
                    newList.append(current.data);
                    current = current.next;
                }
            }
            
            // Establecer el nodo actual
            const currentData = prevList.getCurrent();
            if (currentData) {
                let current = newList.head;
                for (let i = 0; i < newList.size(); i++) {
                    if (current.data.id === currentData.id) {
                        newList.currentNode = current;
                        break;
                    }
                    current = current.next;
                }
            }
            
            newList.next();
            setRenderKey(prev => prev + 1);
            return newList;
        });
    };

    // ✅ handlePrev SIN toArray()
    const handlePrev = () => {
        setCarouselList(prevList => {
            const newList = new CircularDoublyLinkedList();
            
            // Recorrer nodo por nodo para copiar
            if (prevList.head) {
                let current = prevList.head;
                for (let i = 0; i < prevList.size(); i++) {
                    newList.append(current.data);
                    current = current.next;
                }
            }
            
            // Establecer el nodo actual
            const currentData = prevList.getCurrent();
            if (currentData) {
                let current = newList.head;
                for (let i = 0; i < newList.size(); i++) {
                    if (current.data.id === currentData.id) {
                        newList.currentNode = current;
                        break;
                    }
                    current = current.next;
                }
            }
            
            newList.prev();
            setRenderKey(prev => prev + 1);
            return newList;
        });
    };

    const toggleAutoplay = () => {
        setIsAutoPlaying(!isAutoPlaying);
    };

    // ✅ useEffect para consola SIN toArray()
    useEffect(() => {
        console.log('🔄 Cambio en el carrusel:');
        console.log(`   Producto actual: ${currentProduct?.name || 'None'}`);
        console.log(`   Posición: ${currentIndex + 1}/${totalProducts}`);
        console.log(`   Autoplay: ${isAutoPlaying ? '▶️ Activado' : '⏸️ Pausado'}`);
        
        // ✅ Mostrar estructura circular SIN toArray()
        if (carouselList.head) {
            const products = getProductsFromList(carouselList);
            console.log('   Lista circular (⟳):', products.map(p => p.name).join(' ↔ '));
        }
        console.log('---');
    }, [currentProduct, currentIndex, totalProducts, isAutoPlaying]);

    return (
        <div className="app" key={renderKey}>
            <header className="app-header">
                <h1>🛍️ Product Carousel</h1>
                <p className="subtitle">Lista Doblemente Enlazada Circular</p>
            </header>

            <main className="app-main">
                <ProductoDisplay
                    product={currentProduct}
                    index={currentIndex}
                    total={totalProducts}
                    onNext={handleNext}
                    onPrev={handlePrev}
                />

                <div className="app-controls">
                    <button 
                        onClick={toggleAutoplay} 
                        className={`autoplay-btn ${isAutoPlaying ? 'active' : ''}`}
                    >
                        {isAutoPlaying ? '⏸️ Pausar' : '▶️ Reproducir'}
                    </button>
                    
                </div>
            </main>

            <footer className="app-footer">
                <p>Estructura de Datos II - Lista Circular Doblemente Enlazada</p>
                <p className="footer-info">
                    {isAutoPlaying ? '▶️ Autoplay activado' : '⏸️ Autoplay pausado'}
                </p>
            </footer>
        </div>
    );
}

export default App;