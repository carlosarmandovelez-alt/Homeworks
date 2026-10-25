import { useEffect, useState } from 'react'
import { supabase } from './lib/supabase'
import { Tareas } from './componentes/Tareas'
import { Login } from './componentes/Login'

function App() {
  const [usuario, setUsuario] = useState(null)
  const [urlAvatar, setUrlAvatar] = useState('')

  // Cargar el avatar único del usuario
  const cargarAvatar = async (userId) => {
    if (!userId) return
    const ruta = `${userId}/avatar`
    const { data } = supabase.storage.from('avatars').getPublicUrl(ruta)
    setUrlAvatar(`${data.publicUrl}?t=${Date.now()}`)
  }

  useEffect(() => {
    // 1. Validar sesión al cargar
    supabase.auth.getUser().then(({ data: { user } }) => {
      setUsuario(user)
      if (user) cargarAvatar(user.id)
    })

    // 2. Escuchar cambios de estado de sesión
    const { data: authListener } = supabase.auth.onAuthStateChange((_event, session) => {
      const currentUser = session?.user ?? null
      setUsuario(currentUser)

      if (currentUser) {
        cargarAvatar(currentUser.id)
      } else {
        setUrlAvatar('')
      }
    })

    return () => authListener.subscription.unsubscribe()
  }, [])

  // Subir o reemplazar la foto de perfil
  const subirAvatar = async (e) => {
    const file = e.target.files[0]
    if (!file || !usuario) return

    const ruta = `${usuario.id}/avatar`
    const { error } = await supabase.storage.from('avatars').upload(ruta, file, { upsert: true })

    if (error) return alert(error.message)

    const { data } = supabase.storage.from('avatars').getPublicUrl(ruta)
    setUrlAvatar(`${data.publicUrl}?t=${Date.now()}`)
  }

  // Cerrar sesión
  const cerrarSesion = async () => {
    await supabase.auth.signOut()
    setUrlAvatar('')
  }

  if (!usuario) {
    return <Login onLoginSuccess={(user) => setUsuario(user)} />
  }

  // Nombre a mostrar o inicial
  const nombreUsuario = usuario.user_metadata?.full_name || usuario.email || 'U'
  const inicial = nombreUsuario.charAt(0).toUpperCase()

  return (
    <div style={{ width: '100%', maxWidth: '1100px', margin: '0 auto', padding: '20px 40px', boxSizing: 'border-box' }}>
      {/* Header despejado */}
      <header
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          borderBottom: '1px solid #333',
          paddingBottom: '20px',
          marginBottom: '40px',
          gap: '20px'
        }}
      >
        <h1 style={{ margin: 0, fontSize: '26px', color: '#fff', whiteSpace: 'nowrap' }}>
          Dashboard de Tareas
        </h1>

        <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
          <div style={{ textAlign: 'right' }}>
            <p style={{ margin: 0, fontWeight: 'bold', fontSize: '14px', color: '#ccc' }}>
              {nombreUsuario}
            </p>
            <button
              onClick={cerrarSesion}
              style={{
                marginTop: '6px',
                padding: '4px 10px',
                fontSize: '12px',
                cursor: 'pointer',
                background: '#ff4d4f',
                color: '#fff',
                border: 'none',
                borderRadius: '4px',
                fontWeight: '600'
              }}
            >
              Cerrar Sesión
            </button>
          </div>

          {/* Avatar con fallback dinámico de inicial */}
          <label style={{ position: 'relative', cursor: 'pointer', flexShrink: 0 }} title="Haz clic para cambiar foto">
            {urlAvatar ? (
              <img
                src={urlAvatar}
                alt="Avatar"
                onError={() => setUrlAvatar('')}
                style={{
                  width: '52px',
                  height: '52px',
                  borderRadius: '50%',
                  objectFit: 'cover',
                  border: '2px solid #0070f3',
                  display: 'block'
                }}
              />
            ) : (
              <div
                style={{
                  width: '52px',
                  height: '52px',
                  borderRadius: '50%',
                  backgroundColor: '#0070f3',
                  color: '#ffffff',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 'bold',
                  fontSize: '22px',
                  border: '2px solid #0070f3'
                }}
              >
                {inicial}
              </div>
            )}

            <input
              type="file"
              accept="image/*"
              onChange={subirAvatar}
              style={{ display: 'none' }}
            />
          </label>
        </div>
      </header>

      {/* Contenido principal centrado */}
      <main style={{ maxWidth: '650px', margin: '0 auto' }}>
        <Tareas />
      </main>
    </div>
  )
}

export default App