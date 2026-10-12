import NodoNario from '../estructura/NodoNario';

export const construirMenu = () => {
    // ============================================
    // ÍTEMS DEL NIVEL 1
    // ============================================

    // ✅ Perfil (sin hijos)
    const perfil = new NodoNario({
        titulo: 'Perfil',
        link: '/perfil',
        componente: 'Perfil'
    });

    // ✅ Mensajes (sin hijos)
    const mensajes = new NodoNario({
        titulo: 'Mensajes',
        link: '/mensajes',
        componente: 'Mensajes'
    });

    // ============================================
    // SUBMENÚS DE CONFIGURACIÓN (Nivel 2)
    // ============================================

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

    // ✅ Configuración (con 5 hijos)
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

    // ============================================
    // SUBMENÚS DE AYUDA (Nivel 2)
    // ============================================

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

    // ✅ Ayuda (con 3 hijos)
    const ayuda = new NodoNario({
        titulo: 'Ayuda',
        link: '/ayuda',
        componente: 'Ayuda'
    });
    ayuda.agregarHijo(faqs);
    ayuda.agregarHijo(ticket);
    ayuda.agregarHijo(status);

    // ============================================
    // LOGOUT (sin hijos)
    // ============================================

    const logout = new NodoNario({
        titulo: 'Cerrar Sesión',
        link: '/logout',
        componente: 'Logout'
    });

    // ============================================
    // RAÍZ: Menú Principal
    // ============================================

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