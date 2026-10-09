import { useState } from "react";
import "./multistep-form.css";

function MultiStepForm() {
  const [step, setStep] = useState(0);

  return (
    <div className="multistep-form">
      <h2>Step {step + 1} of 3</h2>

      {/* when step is 0(true), React return p tag. If false return nothing it ignores  */}
      {step === 0 && <p>Personal info goes here</p>}
      {step === 1 && <p>Address goes here</p>}
      {step === 2 && <p>Review goes here</p>}

      <div className="multistep-form-buttons">
        <button onClick={() => setStep(step - 1)} disabled={step === 0}>
          Back
        </button>
        <button onClick={() => setStep(step + 1)} disabled={step === 2}>
          Next
        </button>
      </div>
    </div>
  );
}

export default MultiStepForm;
