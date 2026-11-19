function Toolbar({
  selectMode,
  selectedCount,
  allSelected,
  hasContacts,
  onAdd,
  onToggleSelectMode,
  onToggleAll,
  onBulkDelete,
}) {
  if (selectMode) {
    return (
      <div className="toolbar">
        <label className="select-all">
          <input type="checkbox" checked={allSelected} onChange={onToggleAll} />
          انتخاب همه
        </label>
        <span className="selected-count">
          {selectedCount.toLocaleString("fa-IR")} مورد انتخاب شده
        </span>
        <div className="toolbar-actions">
          <button
            className="btn btn-danger"
            disabled={selectedCount === 0}
            onClick={onBulkDelete}
          >
            🗑️ حذف انتخاب‌شده‌ها
          </button>
          <button className="btn btn-ghost" onClick={onToggleSelectMode}>
            لغو
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="toolbar">
      <button className="btn btn-primary" onClick={onAdd}>
        + افزودن مخاطب
      </button>
      <button
        className="btn btn-ghost"
        disabled={!hasContacts}
        onClick={onToggleSelectMode}
      >
        ☑️ انتخاب چندتایی
      </button>
    </div>
  );
}

export default Toolbar;