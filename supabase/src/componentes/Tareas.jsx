import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'

export function Tareas() {
  const [tareas, setTareas] = useState([])
  const [nuevaTarea, setNuevaTarea] = useState('')

  const cargarTareas = async () => {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return

    const { data, error } = await supabase
      .from('tareas')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false })

    if (error) console.error('Error cargando tareas:', error)
    else setTareas(data || [])
  }

  const agregarTarea = async (e) => {
    e.preventDefault()
    if (!nuevaTarea.trim()) return

    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return

    const { error } = await supabase
      .from('tareas')
      .insert([{ titulo: nuevaTarea.trim(), user_id: user.id }])

    if (error) {
      alert(error.message)
    } else {
      setNuevaTarea('')
      cargarTareas()
    }
  }

  // Actualizamos la columna 'completada' en Supabase
  const alternarEstado = async (id, completada) => {
    const { error } = await supabase
      .from('tareas')
      .update({ completada: !completada })
      .eq('id', id)

    if (error) alert(error.message)
    else cargarTareas()
  }

  const eliminarTarea = async (id) => {
    const { error } = await supabase
      .from('tareas')
      .delete()
      .eq('id', id)

    if (error) alert(error.message)
    else cargarTareas()
  }

  useEffect(() => {
    cargarTareas()

    const canal = supabase
      .channel('cambios-tareas')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'tareas' },
        () => cargarTareas()
      )
      .subscribe()

    return () => {
      supabase.removeChannel(canal)
    }
  }, [])

  return (
    <div>
      <form onSubmit={agregarTarea} style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
        <input
          type="text"
          placeholder="Escribe una nueva tarea..."
          value={nuevaTarea}
          onChange={(e) => setNuevaTarea(e.target.value)}
          style={{
            flex: 1,
            padding: '10px 14px',
            borderRadius: '6px',
            border: '1px solid #444',
            backgroundColor: '#1a1a1a',
            color: '#fff',
            fontSize: '15px',
          }}
        />
        <button
          type="submit"
          style={{
            padding: '10px 20px',
            backgroundColor: '#0070f3',
            color: '#fff',
            border: 'none',
            borderRadius: '6px',
            cursor: 'pointer',
            fontWeight: 'bold',
          }}
        >
          Agregar
        </button>
      </form>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        {tareas.length === 0 ? (
          <p style={{ textAlign: 'center', color: '#888' }}>No tienes tareas pendientes.</p>
        ) : (
          tareas.map((t) => (
            <div
              key={t.id}
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '12px 16px',
                borderRadius: '8px',
                border: '1px solid #333',
                backgroundColor: t.completada ? '#1f1f1f' : '#2a2a2a',
                transition: 'all 0.2s ease',
              }}
            >
              <label
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  cursor: 'pointer',
                  flex: 1,
                  userSelect: 'none',
                }}
              >
                <input
                  type="checkbox"
                  checked={t.completada || false}
                  onChange={() => alternarEstado(t.id, t.completada)}
                  style={{ width: '18px', height: '18px', cursor: 'pointer' }}
                />
                <span
                  style={{
                    fontSize: '16px',
                    textDecoration: t.completada ? 'line-through' : 'none',
                    color: t.completada ? '#777' : '#fff',
                  }}
                >
                  {t.titulo}
                </span>
              </label>

              <button
                onClick={() => eliminarTarea(t.id)}
                style={{
                  background: 'none',
                  border: 'none',
                  color: '#ff4d4f',
                  cursor: 'pointer',
                  fontWeight: 'bold',
                  fontSize: '14px',
                  padding: '4px 8px',
                }}
              >
                Eliminar
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  )
}