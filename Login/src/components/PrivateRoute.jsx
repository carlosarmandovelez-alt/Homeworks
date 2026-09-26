import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

function PrivateRoute({ children }) {
    const { isLogged, isLoading } = useContext(AuthContext);

    
    if (isLoading) {
        return <div>Cargando...</div>;
    }

    
    if (!isLogged) {
        return <Navigate to="/login" replace />;
    }

    
    return children;
}

export default PrivateRoute;