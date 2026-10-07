// src/pages/Tasks.jsx
import { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { TasksContext } from '../context/TasksContext';

function Tasks() {
    const [newTask, setNewTask] = useState('');
    const [editingId, setEditingId] = useState(null);
    const [editingText, setEditingText] = useState('');

    const { user, logout } = useContext(AuthContext);
    const { results, isPending, getAll, add, update, remove } = useContext(TasksContext);
    const navigate = useNavigate();

    // ✅ Cargar tareas del usuario
    useEffect(() => {
        if (user) {
            getAll([['userId', '==', user.uid]]);
        }
    }, [user]);

    // ✅ Agregar tarea
    const handleAdd = async (e) => {
        e.preventDefault();
        if (!newTask.trim()) return;

        await add({
            title: newTask.trim(),
            userId: user.uid,
            done: false
        });

        setNewTask('');
        await getAll([['userId', '==', user.uid]]);
    };

    // ✅ Toggle (marcar como hecha/no hecha)
    const handleToggle = async (task) => {
        await update(task.id, { done: !task.done });
        await getAll([['userId', '==', user.uid]]);
    };

    // ✅ Eliminar
    const handleDelete = async (id) => {
        if (window.confirm('¿Eliminar esta tarea?')) {
            await remove(id);
            await getAll([['userId', '==', user.uid]]);
        }
    };

    // ✅ Editar
    const handleEdit = (task) => {
        setEditingId(task.id);
        setEditingText(task.title);
    };

    // ✅ Guardar edición
    const handleSaveEdit = async () => {
        if (!editingText.trim()) return;

        await update(editingId, { title: editingText.trim() });
        setEditingId(null);
        setEditingText('');
        await getAll([['userId', '==', user.uid]]);
    };

    // ✅ Logout
    const handleLogout = async () => {
        await logout();
        navigate('/login', { replace: true });
    };

    return (
        <div className="tasks-container">
            <header className="tasks-header">
                <div>
                    <h1>📝 Mis Tareas</h1>
                    <p>👤 {user?.displayName || user?.email}</p>
                </div>
                <button onClick={handleLogout} className="btn-logout">
                    Cerrar Sesión
                </button>
            </header>

            {/* Formulario para agregar */}
            <form onSubmit={handleAdd} className="task-form">
                <input
                    type="text"
                    value={newTask}
                    onChange={(e) => setNewTask(e.target.value)}
                    placeholder="Nueva tarea..."
                />
                <button type="submit" className="btn-primary">Agregar</button>
            </form>

            {/* Lista de tareas */}
            {isPending ? (
                <p>Cargando...</p>
            ) : results.length === 0 ? (
                <p className="empty-message">No hay tareas. ¡Agrega una!</p>
            ) : (
                <ul className="tasks-list">
                    {results.map(task => (
                        <li key={task.id} className={`task-item ${task.done ? 'done' : ''}`}>
                            <input
                                type="checkbox"
                                checked={task.done}
                                onChange={() => handleToggle(task)}
                            />

                            {editingId === task.id ? (
                                <>
                                    <input
                                        type="text"
                                        value={editingText}
                                        onChange={(e) => setEditingText(e.target.value)}
                                    />
                                    <button onClick={handleSaveEdit}>💾</button>
                                </>
                            ) : (
                                <>
                                    <span>{task.title}</span>
                                    <div className="task-actions">
                                        <button onClick={() => handleEdit(task)}>✏️</button>
                                        <button onClick={() => handleDelete(task.id)}>🗑️</button>
                                    </div>
                                </>
                            )}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default Tasks;