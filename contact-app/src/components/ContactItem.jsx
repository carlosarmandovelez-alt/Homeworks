import './ContactItem.css'

function ContactItem({ contact, onDelete }) {
  return (
    <div className="contact-item">
      <div className="contact-info">
        <div className="contact-name">{contact.name}</div>
        <div className="contact-phone"> {contact.phone}</div>
      </div>
      <button
        className="btn-delete"
        onClick={() => onDelete(contact.id)}
      >
        ✕
      </button>
    </div>
  )
}

export default ContactItem