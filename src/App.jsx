import { useState, useEffect } from "react";
import initialContacts from "./data/initialContacts";
import Toolbar from "./components/Toolbar";
import SearchBar from "./components/SearchBar";
import ContactList from "./components/ContactList";
import ContactForm from "./components/ContactForm";
import Modal from "./components/Modal";
import Toast from "./components/Toast";
import "./App.css";

function App() {
  const [contacts, setContacts] = useState(() => {
    try {
      const saved = localStorage.getItem("contacts");
      return saved ? JSON.parse(saved) : initialContacts;
    } catch {
      return initialContacts;
    }
  });
  const [searchTerm, setSearchTerm] = useState("");
  const [view, setView] = useState("list"); // "list" | "form"
  const [editingContact, setEditingContact] = useState(null);
  const [selectMode, setSelectMode] = useState(false);
  const [selectedIds, setSelectedIds] = useState([]);
  const [confirm, setConfirm] = useState(null);
  const [toast, setToast] = useState(null);

  useEffect(() => {
    localStorage.setItem("contacts", JSON.stringify(contacts));
  }, [contacts]);

  const query = searchTerm.trim().toLowerCase();
  const filteredContacts = contacts.filter(
    (c) =>
      c.name.toLowerCase().includes(query) ||
      c.email.toLowerCase().includes(query)
  );

  const allSelected =
    filteredContacts.length > 0 &&
    filteredContacts.every((c) => selectedIds.includes(c.id));

  function showToast(message, type = "success") {
    setToast({ message, type, id: Date.now() });
  }

  function closeToast() {
    setToast(null);
  }

  function handleConfirm() {
    confirm.onConfirm();
    setConfirm(null);
  }

  function handleCancelConfirm() {
    setConfirm(null);
  }

  function openAddForm() {
    setEditingContact(null);
    setView("form");
  }

  function openEditForm(contact) {
    setEditingContact(contact);
    setView("form");
  }

  function closeForm() {
    setEditingContact(null);
    setView("list");
  }

  function handleFormSubmit(values) {
    if (editingContact) {
      setConfirm({
        title: "ویرایش مخاطب",
        message: `آیا از ذخیره‌ی تغییرات «${values.name}» مطمئن هستید؟`,
        confirmText: "ذخیره",
        danger: false,
        onConfirm: () => {
          setContacts((prev) =>
            prev.map((c) =>
              c.id === editingContact.id ? { ...c, ...values } : c
            )
          );
          closeForm();
          showToast("مخاطب با موفقیت ویرایش شد.");
        },
      });
    } else {
      setConfirm({
        title: "افزودن مخاطب",
        message: `شما در حال افزودن «${values.name}» هستید. مطمئن هستید؟`,
        confirmText: "افزودن",
        danger: false,
        onConfirm: () => {
          setContacts((prev) => [{ id: Date.now(), ...values }, ...prev]);
          closeForm();
          showToast("مخاطب با موفقیت اضافه شد.");
        },
      });
    }
  }

  function askDelete(contact) {
    setConfirm({
      title: "حذف مخاطب",
      message: `آیا از حذف «${contact.name}» مطمئن هستید؟ این عملیات قابل بازگشت نیست.`,
      confirmText: "حذف",
      danger: true,
      onConfirm: () => {
        setContacts((prev) => prev.filter((c) => c.id !== contact.id));
        setSelectedIds((prev) => prev.filter((id) => id !== contact.id));
        showToast("مخاطب حذف شد.");
      },
    });
  }

  function toggleSelectMode() {
    setSelectMode(!selectMode);
    setSelectedIds([]);
  }

  function toggleSelect(id) {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  }

  function toggleSelectAll() {
    const visibleIds = filteredContacts.map((c) => c.id);
    if (allSelected) {
      setSelectedIds((prev) => prev.filter((id) => !visibleIds.includes(id)));
    } else {
      setSelectedIds((prev) => [...new Set([...prev, ...visibleIds])]);
    }
  }

  function askBulkDelete() {
    const count = selectedIds.length;
    setConfirm({
      title: "حذف گروهی مخاطبین",
      message: `آیا از حذف ${count.toLocaleString("fa-IR")} مخاطب انتخاب‌شده مطمئن هستید؟ این عملیات قابل بازگشت نیست.`,
      confirmText: "حذف همه",
      danger: true,
      onConfirm: () => {
        setContacts((prev) => prev.filter((c) => !selectedIds.includes(c.id)));
        setSelectedIds([]);
        setSelectMode(false);
        showToast(`${count.toLocaleString("fa-IR")} مخاطب حذف شد.`);
      },
    });
  }

  return (
    <div className="app">
      <div className="container">
        {view === "form" ? (
          <ContactForm
            key={editingContact ? editingContact.id : "new"}
            contact={editingContact}
            contacts={contacts}
            onSubmit={handleFormSubmit}
            onCancel={closeForm}
          />
        ) : (
          <>
            <header className="page-header">
              <div>
                <h1>📇 دفترچه مخاطبین</h1>
                <p>{contacts.length.toLocaleString("fa-IR")} مخاطب ذخیره شده</p>
              </div>
            </header>

            <SearchBar value={searchTerm} onChange={setSearchTerm} />

            <Toolbar
              selectMode={selectMode}
              selectedCount={selectedIds.length}
              allSelected={allSelected}
              hasContacts={contacts.length > 0}
              onAdd={openAddForm}
              onToggleSelectMode={toggleSelectMode}
              onToggleAll={toggleSelectAll}
              onBulkDelete={askBulkDelete}
            />

            <ContactList
              contacts={filteredContacts}
              isSearching={query !== ""}
              selectMode={selectMode}
              selectedIds={selectedIds}
              onToggleSelect={toggleSelect}
              onEdit={openEditForm}
              onDelete={askDelete}
            />
          </>
        )}
      </div>

      {confirm && (
        <Modal
          title={confirm.title}
          message={confirm.message}
          confirmText={confirm.confirmText}
          danger={confirm.danger}
          onConfirm={handleConfirm}
          onCancel={handleCancelConfirm}
        />
      )}

      {toast && (
        <Toast
          key={toast.id}
          message={toast.message}
          type={toast.type}
          onClose={closeToast}
        />
      )}
    </div>
  );
}

export default App;