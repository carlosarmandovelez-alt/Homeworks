import NodoNario from '../estructura/NodoNario';

export const construirMenu = () => {

    const perfil = new NodoNario({
        titulo: 'Perfil',
        link: '/perfil',
        componente: 'Perfil'
    });

    
    const mensajes = new NodoNario({
        titulo: 'Mensajes',
        link: '/mensajes',
        componente: 'Mensajes'
    });


    const cuenta = new NodoNario({
        titulo: 'Cuenta',
        link: '/config/cuenta',
        componente: 'Cuenta'
    });

    const perfilConfig = new NodoNario({
        titulo: 'Perfil',
        link: '/config/perfil',
        componente: 'PerfilConfig'
    });

    const seguridad = new NodoNario({
        titulo: 'Seguridad y Privacidad',
        link: '/config/seguridad',
        componente: 'Seguridad'
    });

    const password = new NodoNario({
        titulo: 'Contraseña',
        link: '/config/password',
        componente: 'Password'
    });

    const notificaciones = new NodoNario({
        titulo: 'Notificaciones',
        link: '/config/notificaciones',
        componente: 'Notificaciones'
    });

    
    const configuracion = new NodoNario({
        titulo: 'Configuración',
        link: '/config',
        componente: 'Configuracion'
    });
    configuracion.agregarHijo(cuenta);
    configuracion.agregarHijo(perfilConfig);
    configuracion.agregarHijo(seguridad);
    configuracion.agregarHijo(password);
    configuracion.agregarHijo(notificaciones);



    const faqs = new NodoNario({
        titulo: 'FAQs',
        link: '/ayuda/faqs',
        componente: 'FAQs'
    });

    const ticket = new NodoNario({
        titulo: 'Enviar Ticket',
        link: '/ayuda/ticket',
        componente: 'Ticket'
    });

    const status = new NodoNario({
        titulo: 'Estado de la Red',
        link: '/ayuda/status',
        componente: 'Status'
    });

   
    const ayuda = new NodoNario({
        titulo: 'Ayuda',
        link: '/ayuda',
        componente: 'Ayuda'
    });
    ayuda.agregarHijo(faqs);
    ayuda.agregarHijo(ticket);
    ayuda.agregarHijo(status);



    const logout = new NodoNario({
        titulo: 'Cerrar Sesión',
        link: '/logout',
        componente: 'Logout'
    });



    const raiz = new NodoNario({
        titulo: 'Menú Principal',
        link: '/',
        componente: 'Home'
    });

    raiz.agregarHijo(perfil);
    raiz.agregarHijo(mensajes);
    raiz.agregarHijo(configuracion);
    raiz.agregarHijo(ayuda);
    raiz.agregarHijo(logout);

    return raiz;
};
