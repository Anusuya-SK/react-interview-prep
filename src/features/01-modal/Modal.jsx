import { createPortal } from "react-dom";
import "./modal.css";

function Modal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return createPortal(
    <div className="modal-box">
      <p>I'm the modal content</p>
      <button onClick={onClose}>Close</button>
    </div>,
    document.body,
  );
}

export default Modal;
