export const initialPatients = [
    { 
        id: 1, 
        nombre: 'Armando Velez', 
        edad: 45, 
        prioridad: 'Alta', 
        motivo: 'Dolor en el pecho' 
    },
    { 
        id: 2, 
        nombre: 'Maria Gomez', 
        edad: 30, 
        prioridad: 'Media', 
        motivo: 'Fiebre persistente' 
    },
    { 
        id: 3, 
        nombre: 'Luis Rodríguez', 
        edad: 60, 
        prioridad: 'Alta', 
        motivo: 'Dificultad para respirar' 
    },
    { 
        id: 4, 
        nombre: 'Ana Mendez', 
        edad: 25, 
        prioridad: 'Baja', 
        motivo: 'Revisión anual' 
    },
    { 
        id: 5, 
        nombre: 'Jorge Costa', 
        edad: 50, 
        prioridad: 'Media', 
        motivo: 'Dolor de cabeza recurrente' 
    },
];


export const initialHistory = [
    {
        id: 1,
        pacienteId: 1,
        pacienteNombre: 'Carlos Velez',
        medico: 'Dra. Laura Sánchez',
        fecha: '2026-09-08 10:30',
        diagnostico: 'Hipertensión controlada'
    },
    {
        id: 2,
        pacienteId: 3,
        pacienteNombre: 'Luis Perez',
        medico: 'Dr. Miguel Torres',
        fecha: '2026-09-08 09:15',
        diagnostico: 'Bronquitis aguda'
    }
];


export const initialDoctors = [
    { id: 1, nombre: 'Dra. Noralba Rojas', especialidad: 'Cardiología' },
    { id: 2, nombre: 'Dr. Nicolas Camargo', especialidad: 'Pediatría' },
    { id: 3, nombre: 'Dra. Ines Murillo', especialidad: 'Medicina General' },
    { id: 4, nombre: 'Dr. Luis Diaz', especialidad: 'Ortopedia' },
];


export const initialCommittee = [
    { id: 1, nombre: 'Dr. Robert Vergara', cargo: 'Director Médico' },
    { id: 2, nombre: 'Lic. Luz Lopez', cargo: 'Gerente Administrativa' },
    { id: 3, nombre: 'Dr. Felipe Arboleda', cargo: 'Jefe de Enfermería' },
    { id: 4, nombre: 'Ing. Carolina Mora', cargo: 'Coordinadora de Calidad' },
];