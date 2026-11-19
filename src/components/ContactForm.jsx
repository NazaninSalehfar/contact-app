import { useState } from "react";
import { validateContact, normalizeDigits } from "../utils/validators";

const fields = [
  { name: "name", label: "نام و نام خانوادگی", placeholder: "مثلاً سینا بهرامی" },
  { name: "email", label: "ایمیل", placeholder: "example@gmail.com", ltr: true },
  { name: "job", label: "شغل", placeholder: "مثلاً برنامه‌نویس" },
  { name: "phone", label: "تلفن همراه", placeholder: "09123456789", ltr: true },
];

function ContactForm({ contact, contacts, onSubmit, onCancel }) {
  const isEdit = Boolean(contact);

  const [values, setValues] = useState({
    name: contact?.name ?? "",
    email: contact?.email ?? "",
    job: contact?.job ?? "",
    phone: contact?.phone ?? "",
  });
  const [touched, setTouched] = useState({});

  const errors = validateContact(values, contacts, contact?.id);
  const isValid = Object.keys(errors).length === 0;

  function handleChange(e) {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  }

  function handleBlur(e) {
    setTouched({ ...touched, [e.target.name]: true });
  }

  function handleSubmit(e) {
    e.preventDefault();
    setTouched({ name: true, email: true, job: true, phone: true });
    if (!isValid) return;

    onSubmit({
      name: values.name.trim(),
      email: values.email.trim().toLowerCase(),
      job: values.job.trim(),
      phone: normalizeDigits(values.phone.trim()),
    });
  }

  return (
    <form className="form-card" onSubmit={handleSubmit} noValidate>
      <div className="form-header">
        <button
          type="button"
          className="icon-btn"
          onClick={onCancel}
          aria-label="بازگشت"
          title="بازگشت"
        >
          →
        </button>
        <h2>{isEdit ? "ویرایش مخاطب" : "افزودن مخاطب جدید"}</h2>
      </div>

      {fields.map((field) => {
        const showError = touched[field.name] && errors[field.name];
        return (
          <div className="form-group" key={field.name}>
            <label htmlFor={field.name}>{field.label}</label>
            <input
              id={field.name}
              name={field.name}
              type="text"
              dir={field.ltr ? "ltr" : "rtl"}
              className={showError ? "input-error" : ""}
              value={values[field.name]}
              placeholder={field.placeholder}
              onChange={handleChange}
              onBlur={handleBlur}
              autoComplete="off"
            />
            {showError && <small className="error-text">{errors[field.name]}</small>}
          </div>
        );
      })}

      <div className="form-actions">
        <button type="submit" className="btn btn-primary" disabled={!isValid}>
          {isEdit ? "ذخیره تغییرات" : "افزودن"}
        </button>
        <button type="button" className="btn btn-ghost" onClick={onCancel}>
          انصراف
        </button>
      </div>
    </form>
  );
}

export default ContactForm;