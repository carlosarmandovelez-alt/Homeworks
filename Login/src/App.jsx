// src/App.jsx
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import './App.scss';
import { AuthProvider } from './context/AuthContext';
import { TasksProvider } from './context/TasksContext';
import PrivateRoute from './components/PrivateRoute';
import Login from './pages/Login';
import Register from './pages/Register';
import Tasks from './pages/Tasks';

function App() {
    return (
        <AuthProvider>
            <TasksProvider>
                <BrowserRouter>
                    <Routes>
                        {/* Rutas públicas */}
                        <Route path="/login" element={<Login />} />
                        <Route path="/register" element={<Register />} />

                        {/* Rutas privadas */}
                        <Route
                            path="/tasks"
                            element={
                                <PrivateRoute>
                                    <Tasks />
                                </PrivateRoute>
                            }
                        />

                        {/* Redirecciones */}
                        <Route path="/" element={<Navigate to="/tasks" replace />} />
                        <Route path="*" element={<Navigate to="/tasks" replace />} />
                    </Routes>
                </BrowserRouter>
            </TasksProvider>
        </AuthProvider>
    );
}

export default App;