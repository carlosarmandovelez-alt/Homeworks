import { useState } from 'react'
import './ContactForm.css'

function ContactForm({ onAddContact }) {
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [error, setError] = useState('')

  //  validar 
  const validatePhone = (numero) => {
    
    //  Debe tener exactamente 10 dígitos
    if (numero.length !== 10) {
      return 'El número debe tener 10 dígitos'
    }
    // Solo debe contener números
    if (!/^\d+$/.test(numero)) {
      return 'Solo se permiten números'
    }

    return null 
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    
    // Validar nombre
    if (!name.trim()) {
      setError('El nombre es obligatorio')
      return
    }

    // Validar teléfono
    const phoneError = validatePhone(phone.trim())
    if (phoneError) {
      setError(` ${phoneError}`)
      return
    }

    setError('')
    
    // Enviar el nuevo contacto
    onAddContact({ 
      name: name.trim(), 
      phone: phone.trim() 
    })
    
    // Limpiar formulario
    setName('')
    setPhone('')
  }

  return (
    <form className="contact-form" onSubmit={handleSubmit}>
      {error && <div className="error-message">{error}</div>}
      
      <div className="form-group">
        <label>Nombre:</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Ej: Ana García"
        />
      </div>

      <div className="form-group">
        <label>Teléfono (10 dígitos):</label>
        <input
          type="text"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder="Ej: 3141234567"
          maxLength={10} 
        />
        
      </div>

      <button type="submit" className="btn-add">
        Agregar Contacto
      </button>
    </form>
  )
}

export default ContactForm