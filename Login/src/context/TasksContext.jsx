// src/context/TasksContext.jsx
import { createContext } from 'react';
import { useCollection } from '../hooks/useCollection';

export const TasksContext = createContext();

export function TasksProvider({ children }) {
    const collection = useCollection('tasks');

    return (
        <TasksContext.Provider value={collection}>
            {children}
        </TasksContext.Provider>
    );
}