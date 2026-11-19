function ContactItem({
  contact,
  selectMode,
  selected,
  onToggleSelect,
  onEdit,
  onDelete,
}) {
  const { id, name, email, job, phone } = contact;

  const hue = (name.charCodeAt(0) * 37) % 360;
  const avatarStyle = {
    background: `hsl(${hue} 75% 92%)`,
    color: `hsl(${hue} 55% 35%)`,
  };

  return (
    <li
      className={`contact-item ${selected ? "selected" : ""} ${
        selectMode ? "selectable" : ""
      }`}
      onClick={selectMode ? () => onToggleSelect(id) : undefined}
    >
      {selectMode && (
        <input
          type="checkbox"
          checked={selected}
          onChange={() => onToggleSelect(id)}
          onClick={(e) => e.stopPropagation()}
        />
      )}

      <div className="avatar" style={avatarStyle}>
        {name.charAt(0)}
      </div>

      <div className="contact-info">
        <span className="contact-name">{name}</span>
        <span className="contact-job">{job}</span>
      </div>

      <div className="contact-details">
        <span className="contact-email" dir="ltr">
          {email}
        </span>
        <span className="contact-phone" dir="ltr">
          {phone}
        </span>
      </div>

      {!selectMode && (
        <div className="contact-actions">
          <button
            className="icon-btn"
            onClick={() => onEdit(contact)}
            title="ویرایش"
            aria-label="ویرایش"
          >
            ✏️
          </button>
          <button
            className="icon-btn danger"
            onClick={() => onDelete(contact)}
            title="حذف"
            aria-label="حذف"
          >
            🗑️
          </button>
        </div>
      )}
    </li>
  );
}

export default ContactItem;