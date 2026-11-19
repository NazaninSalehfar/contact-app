import ContactItem from "./ContactItem";

function ContactList({
  contacts,
  isSearching,
  selectMode,
  selectedIds,
  onToggleSelect,
  onEdit,
  onDelete,
}) {
  if (contacts.length === 0) {
    return (
      <div className="empty-state">
        <div className="empty-icon">{isSearching ? "🔎" : "📇"}</div>
        <p>
          {isSearching
            ? "مخاطبی با این مشخصات پیدا نشد."
            : "هنوز مخاطبی ثبت نشده است."}
        </p>
      </div>
    );
  }

  return (
    <ul className="contact-list">
      {contacts.map((contact) => (
        <ContactItem
          key={contact.id}
          contact={contact}
          selectMode={selectMode}
          selected={selectedIds.includes(contact.id)}
          onToggleSelect={onToggleSelect}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </ul>
  );
}

export default ContactList;