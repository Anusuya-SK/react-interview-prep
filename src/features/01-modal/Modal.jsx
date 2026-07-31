import "./modal.css";

function Modal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="modal-box">
      <p>I'm the modal content</p>
      <button onClick={onClose}>Close</button>
    </div>
  );
}

export default Modal;
