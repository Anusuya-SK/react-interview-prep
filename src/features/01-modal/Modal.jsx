import { createPortal } from "react-dom";
import "./modal.css";
import { useEffect, useRef } from "react";

function Modal({ isOpen, onClose }) {
  // LAYER 2 (useRef): reference to the modal's own DOM node,
  // used to search inside it for focusable elements
  const dialogRef = useRef(null);

  useEffect(() => {
    if (!isOpen) return;

    // LAYER 3 (Focus trap): find every focusable element inside the modal
    const focusableElements = dialogRef.current.querySelectorAll(
      "button, [href], input, select, textarea, [tabindex]",
    );
    const first = focusableElements[0];
    const last = focusableElements[focusableElements.length - 1];

    first?.focus(); // auto-focus first element when modal opens

    function handleKeyDown(e) {
      // LAYER 4 (Escape to close): reuses this same listener,
      // no second addEventListener needed
      if (e.key === "Escape") {
        onClose();
        return;
      }

      // LAYER 3 (Focus trap): Tab / Shift+Tab wrap-around
      if (e.key !== "Tab") return;

      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last?.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first?.focus();
      }
    }

    document.addEventListener("keydown", handleKeyDown);

    // cleanup mirrors setup, opposite action
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return createPortal(
    // LAYER 5 (Backdrop click to close):
    // onMouseDown on the backdrop itself, but only closes if the click
    // target IS the backdrop (not something inside the modal box that bubbled up)
    <div
      className="modal-backdrop"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      {/* LAYER 1 (Portal): this whole block renders into document.body */}
      <div ref={dialogRef} className="modal-box">
        <p>I'm the modal content</p>
        <button onClick={onClose}>Close</button>
      </div>
    </div>,
    document.body,
  );
}

export default Modal;
