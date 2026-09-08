import { useState, useEffect } from 'react';
import './App.css';
import LinkedList from './estructura/LinkedList';
import EstudianteFormulario from './componentes/EstudianteFormulario';
import EstudianteLista from './componentes/EstudianteLista';

function App() {
    const [studentList, setStudentList] = useState(new LinkedList());
    const [students, setStudents] = useState([]);
    const [studentCount, setStudentCount] = useState(0);
    const [renderKey, setRenderKey] = useState(0);

    
    const getStudentsFromList = (list) => {
        if (!list || list.size() === 0) return [];
        
        const result = [];
        let current = list.head;
        while (current) {
            result.push(current.data);
            current = current.next;
        }
        return result;
    };

    
    useEffect(() => {
        
        const studentArray = getStudentsFromList(studentList);
        setStudents(studentArray);
        setStudentCount(studentList.size());

        
        console.log(`👥 Número de estudiantes: ${studentList.size()}`);
        console.log('📋 Estudiantes:', studentArray);

    
        console.log('🔗 Lista enlazada (head → tail):');
        let current = studentList.head;
        let index = 0;
        while (current) {
            console.log(`   Nodo ${index}:`, current.data);
            current = current.next;
            index++;
        }
        console.log('---');
    }, [studentList]);

    
    const addStudent = (studentData) => {
        
        if (studentList.findByCode(studentData.code)) {
            alert(`⚠️ El código ${studentData.code} ya existe`);
            return;
        }

        
        const newList = new LinkedList();
        
        
        if (studentList.head) {
            let current = studentList.head;
            while (current) {
                newList.append(current.data);
                current = current.next;
            }
        }
        
        
        newList.append(studentData);
        
        
        setStudentList(newList);
        setRenderKey(prev => prev + 1);
    };

    
    const deleteStudent = (code) => {
        const confirmDelete = window.confirm(
            `¿Eliminar estudiante con código ${code}?`
        );
        
        if (confirmDelete) {
            
            const newList = new LinkedList();
            
            
            if (studentList.head) {
                let current = studentList.head;
                while (current) {
                    if (current.data.code !== code) {
                        newList.append(current.data);
                    }
                    current = current.next;
                }
            }
            
            
            setStudentList(newList);
            setRenderKey(prev => prev + 1);
        }
    };


    return (
        <div className="app" key={renderKey}>
            <header className="app-header">
                <h1>🎓 Registro de Estudiantes</h1>
                <p className="subtitle">
                    Lista Enlazada Simple - {studentCount} estudiantes registrados
                </p>
            </header>

            <main className="app-main">
                <EstudianteFormulario onAddStudent={addStudent} />
                <EstudianteLista 
                    students={students} 
                    onDeleteStudent={deleteStudent} 
                />
                
 
            </main>

            <footer className="app-footer">
                <p>Estructura de Datos II - Lista Enlazada Simple</p>
            </footer>
        </div>
    );
}

export default App;