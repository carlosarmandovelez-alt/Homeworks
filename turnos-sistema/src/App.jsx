import { useState, useEffect } from 'react';
import './App.css';
import CircularLinkedList from './estructura/CircularLinkedList';
import TurnoDisplay from './componentes/TurnoDisplay';
import TurnoFormulario from './componentes/TurnoFormulario';

function App() {
    const [turnList, setTurnList] = useState(() => {
        const list = new CircularLinkedList();
        return list;
    });

    const [currentTurn, setCurrentTurn] = useState(null);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [totalTurns, setTotalTurns] = useState(0);
    const [allTurns, setAllTurns] = useState([]);
    const [message, setMessage] = useState('');
    const [renderKey, setRenderKey] = useState(0);

    
    const getTurnsFromList = (list) => {
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
        const turn = turnList.getCurrent();
        setCurrentTurn(turn);
        const index = turnList.getCurrentIndex();
        setCurrentIndex(index >= 0 ? index : 0);
        setTotalTurns(turnList.size());
        
        
        setAllTurns(getTurnsFromList(turnList));
        
        if (turn) {
            setMessage(`🔔 Turno ${turn.number} atendiendo. Cliente: ${turn.name}`);
        } else {
            setMessage('📭 No hay turnos en espera');
        }
    }, [turnList]);

    
    useEffect(() => {
        if (currentTurn) {
            console.log(`🔄 Cambio de turno: ${currentTurn.number} - ${currentTurn.name}`);
            console.log(`   Posición: ${currentIndex + 1}/${totalTurns}`);
            console.log(`   Servicio: ${currentTurn.service}`);
            
            
            if (turnList.head) {
                console.log('   📋 Cola circular:');
                let current = turnList.head;
                for (let i = 0; i < turnList.size(); i++) {
                    const isCurrent = current === turnList.currentNode;
                    console.log(`     ${isCurrent ? '👉' : '  '} Turno ${current.data.number} - ${current.data.name}${isCurrent ? ' (ACTUAL)' : ''}`);
                    current = current.next;
                }
            }
            console.log('---');
        }
    }, [currentTurn, currentIndex, totalTurns]);

    
    const addTurn = (turnData) => {
        setTurnList(prevList => {
            const newList = new CircularLinkedList();
            
            
            if (prevList.head) {
                let current = prevList.head;
                for (let i = 0; i < prevList.size(); i++) {
                    newList.append(current.data);
                    current = current.next;
                }
            }
            
            newList.append(turnData);
            console.log(`✅ Nuevo turno agregado: ${turnData.number} - ${turnData.name}`);
            setRenderKey(prev => prev + 1);
            return newList;
        });
    };

    
    const handleNext = () => {
        if (turnList.size() === 0) {
            setMessage('⚠️ No hay turnos para atender');
            return;
        }

        setTurnList(prevList => {
            const newList = new CircularLinkedList();
            
            
            if (prevList.head) {
                let current = prevList.head;
                for (let i = 0; i < prevList.size(); i++) {
                    newList.append(current.data);
                    current = current.next;
                }
            }
            
            
            const currentData = prevList.getCurrent();
            if (currentData) {
                let current = newList.head;
                for (let i = 0; i < newList.size(); i++) {
                    if (current.data.number === currentData.number) {
                        newList.currentNode = current;
                        break;
                    }
                    current = current.next;
                }
            }
            
            const nextData = newList.next();
            if (nextData) {
                console.log(`⏭ Avanzando al turno ${nextData.number} - ${nextData.name}`);
            }
            setRenderKey(prev => prev + 1);
            return newList;
        });
    };

    const handleReset = () => {
        if (window.confirm('⚠️ ¿Eliminar todos los turnos?')) {
            const newList = new CircularLinkedList();
            setTurnList(newList);
            console.log('🔄 Sistema de turnos reiniciado');
            setMessage('🔄 Sistema reiniciado');
            setRenderKey(prev => prev + 1);
        }
    };

    return (
        <div className="app" key={renderKey}>
            <header className="app-header">
                <h1>🔢 Sistema de Turnos</h1>
                <p className="subtitle">Lista Enlazada Circular</p>
            </header>

            <div className="status-bar">
                <span className="status-message">{message}</span>
                <span className="status-info">
                    👥 {totalTurns} turnos | 📍 {currentIndex + 1}/{totalTurns || 1}
                </span>
            </div>

            <main className="app-main">
                <div className="left-column">
                    <TurnoFormulario onAddTurn={addTurn} />
                    <button onClick={handleReset} className="btn-reset">
                        🔄 Resetear Sistema
                    </button>
                </div>

                <div className="right-column">
                    <TurnoDisplay
                        currentTurn={currentTurn}
                        currentIndex={currentIndex}
                        totalTurns={totalTurns}
                        allTurns={allTurns}
                        onNext={handleNext}
                    />
                </div>
            </main>

            <footer className="app-footer">
                <p>📚 Estructura de Datos II - Lista Circular Enlazada</p>
            </footer>
        </div>
    );
}

export default App;