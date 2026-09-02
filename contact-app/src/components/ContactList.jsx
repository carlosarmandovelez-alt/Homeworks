import ContactItem from './ContactItem'
import './ContactList.css'

function ContactList({ contacts, onDeleteContact }) {
  if (contacts.length === 0) {
    return (
      <div className="empty-state">
        <p> No hay contactos</p>
        <p className="empty-subtext">Agrega tu primer contacto</p>
      </div>
    )
  }

  return (
    <div className="contact-list">
      {contacts.map((contact) => (
        <ContactItem
          key={contact.id}
          contact={contact}
          onDelete={onDeleteContact}
        />
      ))}
    </div>
  )
}

export default ContactList