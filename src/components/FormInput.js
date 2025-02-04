import React, { useState } from "react";
import "../styles/FormInput.css";
import view from "../images/icons/view.png";
import hide from "../images/icons/hide.png";

function FormInput({ label, name, type, value, onChange, placeholder, error }) {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const isPasswordField = type === "password";

  return (
    <div className="form-input">
      <label>{label}</label>
      <div className="form-input-container">
        <input
          className="form-input-field"
          name={name}
          type={isPasswordField && showPassword ? "text" : type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          style={{ borderColor: error ? "red" : "black" }}
        />
        {isPasswordField && (
          <img className="form-icon"
            src={showPassword ? view : hide}
            alt={showPassword ? "Hide Password" : "Show Password"}
            style={{ width: "20px", height: "20px", cursor: "pointer" }}
            onClick={togglePasswordVisibility}
          />
        )}
      </div>
      {error && <span className="error">{error}</span>}
    </div>
  );
}

export default FormInput;
