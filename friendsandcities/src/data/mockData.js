export const inicializarGrafo = (graph) => {

    const ciudades = [
        { id: 'cali', label: 'Cali' },
        { id: 'bogota', label: 'Bogotá' },
        { id: 'medellin', label: 'Medellín' },
        { id: 'barranquilla', label: 'Barranquilla' },
        { id: 'cartagena', label: 'Cartagena' }
    ];

    ciudades.forEach(c => {
        graph.addNode({
            id: c.id,
            label: c.label,
            type: 'city',
            color: '#F59E0B'
        });
    });


    const personas = [
        //cali
        { id: 'p1', nombre: 'Carlos', edad: 25, ciudad: 'cali' },
        { id: 'p2', nombre: 'Luis', edad: 22, ciudad: 'cali' },
        { id: 'p3', nombre: 'Valentina', edad: 28, ciudad: 'cali' },
        { id: 'p4', nombre: 'Andrés', edad: 31, ciudad: 'cali' },
        { id: 'p5', nombre: 'Camila', edad: 26, ciudad: 'cali' },
        { id: 'p6', nombre: 'Diego', edad: 34, ciudad: 'cali' },

        //bogota
        { id: 'p7', nombre: 'Ana', edad: 30, ciudad: 'bogota' },
        { id: 'p8', nombre: 'Sofía', edad: 27, ciudad: 'bogota' },
        { id: 'p9', nombre: 'Daniel', edad: 35, ciudad: 'bogota' },
        { id: 'p10', nombre: 'Isabella', edad: 24, ciudad: 'bogota' },
        { id: 'p11', nombre: 'Felipe', edad: 29, ciudad: 'bogota' },
        { id: 'p12', nombre: 'Mariana', edad: 32, ciudad: 'bogota' },
        { id: 'p13', nombre: 'Sebastián', edad: 28, ciudad: 'bogota' },

        //medellin
        { id: 'p14', nombre: 'María', edad: 28, ciudad: 'medellin' },
        { id: 'p15', nombre: 'Juan', edad: 33, ciudad: 'medellin' },
        { id: 'p16', nombre: 'Laura', edad: 26, ciudad: 'medellin' },
        { id: 'p17', nombre: 'Santiago', edad: 38, ciudad: 'medellin' },
        { id: 'p18', nombre: 'Daniela', edad: 25, ciudad: 'medellin' },
        { id: 'p19', nombre: 'Mateo', edad: 30, ciudad: 'medellin' },

        //barranquilla
        { id: 'p20', nombre: 'Jorge', edad: 35, ciudad: 'barranquilla' },
        { id: 'p21', nombre: 'Paula', edad: 29, ciudad: 'barranquilla' },
        { id: 'p22', nombre: 'Diego', edad: 42, ciudad: 'barranquilla' },
        { id: 'p23', nombre: 'Andrea', edad: 31, ciudad: 'barranquilla' },
        { id: 'p24', nombre: 'Roberto', edad: 37, ciudad: 'barranquilla' },
        { id: 'p25', nombre: 'Patricia', edad: 33, ciudad: 'barranquilla' },

        //cartagena
        { id: 'p26', nombre: 'Natalia', edad: 31, ciudad: 'cartagena' },
        { id: 'p27', nombre: 'Ricardo', edad: 27, ciudad: 'cartagena' },
        { id: 'p28', nombre: 'Alejandra', edad: 26, ciudad: 'cartagena' },
        { id: 'p29', nombre: 'Miguel', edad: 40, ciudad: 'cartagena' },
        { id: 'p30', nombre: 'Catalina', edad: 24, ciudad: 'cartagena' }
    ];

    personas.forEach(p => {
        graph.addNode({
            id: p.id,
            label: `${p.nombre} (${p.edad})`,
            type: 'person',
            color: '#10B981',
            nombre: p.nombre,
            edad: p.edad,
            ciudad: p.ciudad
        });

        
        graph.addEdge(p.id, p.ciudad);
    });
};