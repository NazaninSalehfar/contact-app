function SearchBar({ value, onChange }) {
  return (
    <div className="search-bar">
      <span className="search-icon">🔍</span>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="جستجو بر اساس نام یا ایمیل..."
      />
      {value && (
        <button
          className="search-clear"
          onClick={() => onChange("")}
          aria-label="پاک کردن جستجو"
        >
          ×
        </button>
      )}
    </div>
  );
}

export default SearchBar;