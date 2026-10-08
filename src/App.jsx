import { useState } from "react";
import ModalDemo from "./features/01-modal/App";
import MultiStepForm from "./features/02-multistep-form/App";

const features = {
  "01-modal": { label: "Modal", component: ModalDemo },
  "02-multistep-form": { label: "Multi-step Form", component: MultiStepForm },
};

export default function App() {
  const [active, setActive] = useState("01-modal");
  const Active = features[active].component;

  return (
    <div>
      <nav
        style={{
          display: "flex",
          gap: 8,
          padding: 12,
          borderBottom: "1px solid #eee",
        }}
      >
        {Object.entries(features).map(([key, f]) => (
          <button key={key} onClick={() => setActive(key)}>
            {f.label}
          </button>
        ))}
      </nav>
      <Active />
    </div>
  );
}
