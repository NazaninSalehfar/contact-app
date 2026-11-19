const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_REGEX = /^09\d{9}$/;

export function normalizeDigits(text) {
  return text
    .replace(/[۰-۹]/g, (d) => "۰۱۲۳۴۵۶۷۸۹".indexOf(d))
    .replace(/[٠-٩]/g, (d) => "٠١٢٣٤٥٦٧٨٩".indexOf(d));
}

export function validateContact(values, contacts = [], editingId = null) {
  const errors = {};

  const name = values.name.trim();
  const email = values.email.trim().toLowerCase();
  const job = values.job.trim();
  const phone = normalizeDigits(values.phone.trim());

  if (!name) {
    errors.name = "نام و نام خانوادگی را وارد کنید.";
  } else if (name.length < 7) {
    errors.name = "حداقل ۷ کاراکتر وارد کنید.";
  } else if (name.split(/\s+/).length < 2) {
    errors.name = "نام و نام خانوادگی را با فاصله از هم جدا کنید.";
  }

  if (!email) {
    errors.email = "ایمیل را وارد کنید.";
  } else if (!EMAIL_REGEX.test(email)) {
    errors.email = "یک ایمیل معتبر وارد کنید.";
  } else if (
    contacts.some((c) => c.id !== editingId && c.email.toLowerCase() === email)
  ) {
    errors.email = "این ایمیل قبلاً ثبت شده است.";
  }

  if (!job) {
    errors.job = "شغل را وارد کنید.";
  } else if (job.length < 2) {
    errors.job = "شغل باید حداقل ۲ کاراکتر باشد.";
  }

  if (!phone) {
    errors.phone = "شماره موبایل را وارد کنید.";
  } else if (!PHONE_REGEX.test(phone)) {
    errors.phone = "شماره معتبر وارد کنید (مثال: 09123456789).";
  }

  return errors;
}
