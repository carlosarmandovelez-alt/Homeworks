import { useState } from 'react'
import { supabase } from '../lib/supabase'

export function Login({ onLoginSuccess }) {
  const [nombre, setNombre] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [esRegistro, setEsRegistro] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!email.trim() || !password.trim()) {
      return alert('Por favor ingresa correo y contraseña')
    }

    if (esRegistro) {
      if (!nombre.trim()) {
        return alert('Por favor ingresa tu nombre')
      }

      // Proceso de Registro enviando el nombre en user_metadata
      const { data, error } = await supabase.auth.signUp({ 
        email, 
        password,
        options: {
          data: {
            full_name: nombre, // Guardamos el nombre aquí
          }
        }
      })

      if (error) {
        alert(error.message)
      } else {
        alert('¡Usuario registrado con éxito!')
        if (data.user && onLoginSuccess) {
          onLoginSuccess(data.user)
        }
      }
    } else {
      // Proceso de Login
      const { data, error } = await supabase.auth.signInWithPassword({ 
        email, 
        password 
      })

      if (error) {
        alert(error.message)
      } else if (onLoginSuccess) {
        onLoginSuccess(data.user)
      }
    }
  }

  return (
    <div style={{ maxWidth: '300px', margin: 'auto', paddingTop: '50px' }}>
      <h2>{esRegistro ? 'Crear una cuenta' : 'Iniciar Sesión'}</h2>

      <form onSubmit={handleSubmit}>
        {/* Mostramos el campo nombre solo si la pestaña es de Registro */}
        {esRegistro && (
          <input
            type="text"
            placeholder="Nombre completo"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            style={{ width: '100%', marginBottom: '10px', padding: '8px' }}
          />
        )}

        <input
          type="email"
          placeholder="Correo electrónico"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{ width: '100%', marginBottom: '10px', padding: '8px' }}
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{ width: '100%', marginBottom: '10px', padding: '8px' }}
        />
        <button type="submit" style={{ width: '100%', padding: '8px', cursor: 'pointer' }}>
          {esRegistro ? 'Registrarse' : 'Ingresar'}
        </button>
      </form>

      <p style={{ marginTop: '15px', fontSize: '14px', textAlign: 'center' }}>
        {esRegistro ? '¿Ya tienes una cuenta?' : '¿No tienes cuenta aún?'}
        <button
          type="button"
          onClick={() => setEsRegistro(!esRegistro)}
          style={{
            background: 'none',
            border: 'none',
            color: '#0070f3',
            cursor: 'pointer',
            textDecoration: 'underline',
            marginLeft: '5px'
          }}
        >
          {esRegistro ? 'Inicia sesión aquí' : 'Regístrate aquí'}
        </button>
      </p>
    </div>
  )
}