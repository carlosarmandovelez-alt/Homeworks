// src/hooks/useAuth.jsx
import { useState, useEffect } from 'react';
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged,
    updateProfile    // ← NUEVO
} from 'firebase/auth';
import { auth } from '../firebase/config';

export function useAuth() {
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            setIsLoading(false);
        });

        return () => unsubscribe();
    }, []);

    // ✅ REGISTRO CON NOMBRE
    const register = async (email, password, displayName) => {
        setIsLoading(true);
        setError(null);
        try {
            const result = await createUserWithEmailAndPassword(auth, email, password);

            // ✅ Actualizar el perfil con el nombre
            await updateProfile(result.user, {
                displayName: displayName
            });

            // ✅ Actualizar el estado local para reflejar el nombre
            setUser({
                ...result.user,
                displayName: displayName
            });

            setIsLoading(false);
            return result.user;
        } catch (err) {
            setError(err.message);
            setIsLoading(false);
            throw err;
        }
    };

    // ✅ LOGIN
    const login = async (email, password) => {
        setIsLoading(true);
        setError(null);
        try {
            const result = await signInWithEmailAndPassword(auth, email, password);
            setUser(result.user);
            setIsLoading(false);
            return result.user;
        } catch (err) {
            setError(err.message);
            setIsLoading(false);
            throw err;
        }
    };

    // ✅ LOGOUT
    const logout = async () => {
        setIsLoading(true);
        try {
            await signOut(auth);
            setUser(null);
            setIsLoading(false);
        } catch (err) {
            setError(err.message);
            setIsLoading(false);
            throw err;
        }
    };

    return {
        user,
        isLoading,
        error,
        isLogged: !!user,
        register,
        login,
        logout
    };
}