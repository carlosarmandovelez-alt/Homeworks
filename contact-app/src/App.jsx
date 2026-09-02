import { useState, useEffect } from 'react'
import './App.css'
import ContactList from './components/ContactList'
import ContactForm from './components/ContactForm'
import Loader from './components/Loader'

// Datos iniciales
const initialContacts = [
  { id: 1, name: 'Ana García', phone: '3105577855' },
  { id: 2, name: 'Luis Pérez', phone: '3113700422' },
  { id: 3, name: 'María López', phone: '3002855613' },
  { id: 4, name: 'Carlos Ruiz', phone: '3207250706' },
]

function App() {
  const [contacts, setContacts] = useState([])
  const [loading, setLoading] = useState(true)

  // useEffect para simular carga inicial
  useEffect(() => {
    // Simular carga de datos 
    const timer = setTimeout(() => {
      setContacts(initialContacts)
      setLoading(false)
    }, 2000) // 2 segundos de carga

    
    return () => clearTimeout(timer)
  }, [])

  // Función para agregar contacto
  const addContact = (newContact) => {
    const contactWithId = {
      ...newContact,
      id: Date.now(), 
    }
    setContacts([...contacts, contactWithId])
  }

  // Función para eliminar contacto
  const deleteContact = (id) => {
    const confirmDelete = window.confirm('¿Eliminar este contacto?')
    if (confirmDelete) {
      setContacts(contacts.filter(contact => contact.id !== id))
    }
  }

  // Mostrar loader mientras carga
  if (loading) {
    return <Loader />
  }

  return (
    <div className="app">
      <h1> Agenda de Contactos</h1>
      <div className="app-container">
        <div className="form-section">
          <h2>Agregar Contacto</h2>
          <ContactForm onAddContact={addContact} />
        </div>
        <div className="list-section">
          <h2>Mis Contactos ({contacts.length})</h2>
          <ContactList 
            contacts={contacts} 
            onDeleteContact={deleteContact} 
          />
        </div>
      </div>
    </div>
  )
}

export default App