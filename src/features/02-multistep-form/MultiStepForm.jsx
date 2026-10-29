import { useState } from "react";
import "./multistep-form.css";

function validateStep(step, formData) {
  const errors = {};
  if (step === 0) {
    if (formData.name.trim() === "") {
      errors.name = "Enter your name";
    }
    if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      errors.email = "Enter a valid email";
    }
  }
  if (step === 1) {
    if (formData.city.trim() === "") {
      errors.city = "Enter your city";
    }
    if (!/^\d{6}$/.test(formData.pincode)) {
      errors.pincode = "Enter a valid pincode";
    }
  }
  return errors;
}

function MultiStepForm() {
  const [step, setStep] = useState(0);
  const [errors, setErrors] = useState({});
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
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: "" }); //Clears an error as soon as the user types in that field.
  };

  const handleNext = () => {
    const newErrors = validateStep(step, formData);
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return null;
    } else {
      setErrors({});
      setStep(step + 1);
    }
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
          {errors.name && (
            <span className="multistep-form-error">{errors.name}</span>
          )}
          <label htmlFor="email">Email</label>
          <input
            id="email"
            name="email"
            type="email"
            placeholder="Enter your mailId"
            value={formData.email}
            onChange={handleChange}
          />
          {errors.email && (
            <span className="multistep-form-error">{errors.email}</span>
          )}
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
          {errors.city && (
            <span className="multistep-form-error">{errors.city}</span>
          )}
          <label htmlFor="pincode">Pincode</label>
          <input
            id="pincode"
            name="pincode"
            type="text"
            placeholder="Enter your pincode"
            value={formData.pincode}
            onChange={handleChange}
          />
          {errors.pincode && (
            <span className="multistep-form-error">{errors.pincode}</span>
          )}
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
        <button
          onClick={() => {
            // setErrors({}); Errors are keyed per field, and each Next click replaces the whole object, so I didn’t need to clear on Back. If I added a global summary like “2 errors on this form”, I’d clear on Back.
            setStep(step - 1);
          }}
          disabled={step === 0}
        >
          Back
        </button>
        <button onClick={handleNext} disabled={step === 2}>
          Next
        </button>
      </div>
    </div>
  );
}

export default MultiStepForm;
