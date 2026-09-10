import { useState, useEffect } from 'react';
import './App.css';
import LinkedList from './estructuras/LinkedList';
import DoubleLinkedList from './estructuras/DoubleLinkedList';
import CircularLinkedList from './estructuras/CircularLinkedList';
import CircularDoublyLinkedList from './estructuras/CircularDoublyLinkedList';
import { initialPatients, initialHistory, initialDoctors, initialCommittee } from './data/informacion';
import PacientesEspera from './componentes/PacientesEspera';
import HistorialAtencion from './componentes/HistorialAtencion';
import RotacionMedicos from './componentes/RotacionMedicos';
import ComiteAdministrativo from './componentes/ComiteAdministrativo';

function App() {

    const [patientList] = useState(() => {
        const list = new LinkedList();
        initialPatients.forEach(p => list.append(p));
        return list;
    });

    const [historyList] = useState(() => {
        const list = new DoubleLinkedList();
        initialHistory.forEach(h => list.append(h));
        return list;
    });

    const [doctorList] = useState(() => {
        const list = new CircularLinkedList();
        initialDoctors.forEach(d => list.append(d));
        return list;
    });

    const [committeeList] = useState(() => {
        const list = new CircularDoublyLinkedList();
        initialCommittee.forEach(m => list.append(m));
        return list;
    });

    const [patients, setPatients] = useState([]);
    const [history, setHistory] = useState([]);
    const [doctors, setDoctors] = useState([]);
    const [committee, setCommittee] = useState([]);
    const [currentDoctor, setCurrentDoctor] = useState(null);
    const [currentCommitteeMember, setCurrentCommitteeMember] = useState(null);
    const [currentHistoryIndex, setCurrentHistoryIndex] = useState(-1);
    const [renderKey, setRenderKey] = useState(0);

    const updateViews = () => {
        const patientData = patientList.getAll();
        const historyData = historyList.getAll();
        const doctorData = doctorList.getAll();
        const committeeData = committeeList.getAll();

        setPatients(patientData);
        setHistory(historyData);
        setDoctors(doctorData);
        setCommittee(committeeData);
        setCurrentDoctor(doctorList.getCurrent());
        setCurrentCommitteeMember(committeeList.getCurrent());
        setCurrentHistoryIndex(historyData.length > 0 ? historyData.length - 1 : -1);
        setRenderKey(prev => prev + 1);
    };


    useEffect(() => {
        updateViews();
    }, []);


    useEffect(() => {
        const interval = setInterval(() => {
            const nextDoctor = doctorList.next();
            if (nextDoctor) {
                setCurrentDoctor(nextDoctor);
                setDoctors(doctorList.getAll());
                setRenderKey(prev => prev + 1);
            }
        }, 10000);

        return () => clearInterval(interval);
    }, [doctorList]);


    const handleAttendPatient = (patientId) => {
        const attendedPatient = patientList.removeById(patientId);
        if (!attendedPatient) return;

        const historyRecord = {
            id: Date.now(),
            pacienteId: attendedPatient.id,
            pacienteNombre: attendedPatient.nombre,
            medico: currentDoctor?.nombre || 'Médico no asignado',
            fecha: new Date().toLocaleString(),
            diagnostico: 'Pendiente de diagnóstico'
        };

        historyList.append(historyRecord);
        updateViews();
    };


    const handleNavigateHistory = (index) => {
        setCurrentHistoryIndex(index);
    };


    const handleNextDoctor = () => {
        const next = doctorList.next();
        if (next) {
            setCurrentDoctor(next);
            setDoctors(doctorList.getAll());
            setRenderKey(prev => prev + 1);
        }
    };


    const handleNextMember = () => {
        const next = committeeList.next();
        if (next) {
            setCurrentCommitteeMember(next);
            setCommittee(committeeList.getAll());
            setRenderKey(prev => prev + 1);
        }
    };

    const handlePrevMember = () => {
        const prev = committeeList.prev();
        if (prev) {
            setCurrentCommitteeMember(prev);
            setCommittee(committeeList.getAll());
            setRenderKey(prev => prev + 1);
        }
    };


    return (
        <div className="app" key={renderKey}>
            <header className="app-header">
                <h1>Sistema de Gestión Clínica</h1>
                <p className="stats">
                    Pacientes: {patients.length} | Médicos: {doctors.length} | Historial: {history.length}
                </p>
            </header>

            <div className="grid-2cols">
                <PacientesEspera patients={patients} onAttendPatient={handleAttendPatient} />
                <HistorialAtencion
                    history={history}
                    currentHistoryIndex={currentHistoryIndex}
                    onNavigateHistory={handleNavigateHistory}
                />
            </div>

            <div className="grid-2cols">
                <RotacionMedicos
                    doctors={doctors}
                    currentDoctor={currentDoctor}
                    onNextDoctor={handleNextDoctor}
                />
                <ComiteAdministrativo
                    members={committee}
                    currentMember={currentCommitteeMember}
                    onNextMember={handleNextMember}
                    onPrevMember={handlePrevMember}
                />
            </div>

        </div>
    );
}
export default App;