import { useState, useEffect } from 'react';

export function useAuth() {
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    
    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
        setIsLoading(false);
    }, []);

    
    const login = (email, password) => {
        
        if (email === 'user@mail.com' && password === '123') {
            const userData = {
                email,
                name: 'Usuario Demo',
                loginTime: new Date().toLocaleString()
            };
            setUser(userData);
            localStorage.setItem('user', JSON.stringify(userData));
            return true;
        }
        return false;
    };

    
    const logout = () => {
        setUser(null);
        localStorage.removeItem('user');
    };

    return {
        user,
        isLoading,
        isLogged: !!user,
        login,
        logout
    };
}