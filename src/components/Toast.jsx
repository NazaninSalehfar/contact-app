import { useEffect } from "react";

function Toast({ message, type = "success", onClose }) {
  useEffect(() => {
    const timer = setTimeout(onClose, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className={`toast toast-${type}`} role="status">
      <span className="toast-icon">{type === "success" ? "✓" : "!"}</span>
      <span>{message}</span>
      <button className="toast-close" onClick={onClose} aria-label="بستن">
        ×
      </button>
    </div>
  );
}

export default Toast;