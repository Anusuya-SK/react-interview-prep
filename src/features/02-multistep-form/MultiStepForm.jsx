import { useState } from "react";
import "./multistep-form.css";

function MultiStepForm() {
  const [step, setStep] = useState(0);
  const LABELS = {
    name: "Name",
    email: "Email",
    city: "City",
    pincode: "Pincode",
  };
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    city: "",
    pincode: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="multistep-form">
      <h2>Step {step + 1} of 3</h2>

      {/* when step is 0(true), React return p tag. If false return nothing it ignores  */}
      {step === 0 && <p>Personal info goes here</p>}
      {step === 1 && <p>Address goes here</p>}
      {step === 2 && <p>Review goes here</p>}

      {step === 0 && (
        <div className="multistep-form-input">
          {/* If its label tag onclick of label it focus on input field. Helps in Accessibilty  */}
          <label htmlFor="name">Name</label>
          <input
            id="name"
            name="name"
            type="text"
            placeholder="Enter your name"
            value={formData.name}
            onChange={handleChange}
          />
          <label htmlFor="email">Email</label>
          <input
            id="email"
            name="email"
            type="email"
            placeholder="Enter your mailId"
            value={formData.email}
            onChange={handleChange}
          />
        </div>
      )}
      {step === 1 && (
        <div className="multistep-form-input">
          <label htmlFor="city">City</label>
          <input
            id="city"
            name="city"
            type="text"
            placeholder="Enter your city"
            value={formData.city}
            onChange={handleChange}
          />
          <label htmlFor="pincode">Pincode</label>
          <input
            id="pincode"
            name="pincode"
            type="text"
            placeholder="Enter your pincode"
            value={formData.pincode}
            onChange={handleChange}
          />
        </div>
      )}
      {step === 2 && (
        <dl className="multistep-form-review">
          {Object.entries(formData).map(([key, value]) => (
            <div key={key}>
              <dt>{LABELS[key]}</dt>
              <dd>{value}</dd>
            </div>
          ))}
        </dl>
      )}

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
