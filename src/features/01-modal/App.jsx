import { useState } from "react";
import Modal from "./Modal";
import "./modal.css";

function App() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <button onClick={() => setIsOpen(true)}>Open</button>
      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </div>
  );
}

export default App;
