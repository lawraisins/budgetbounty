import React, { useState } from "react";

function FormInput({ label, type, value, onChange, placeholder, error }) {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const isPasswordField = type === "password";

  return (
    <div>
      <label>
        {label}:
        <input
          name={label.toLowerCase()}
          type={isPasswordField && showPassword ? "text" : type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          style={{ borderColor: error ? "red" : "black" }}
        />
      </label>
      {isPasswordField && (
        <div>
          <input
            type="checkbox"
            id={`${label}-toggle`}
            onChange={togglePasswordVisibility}
            checked={showPassword}
          />
          <label htmlFor={`${label}-toggle`}>
            {showPassword ? "Hide" : "Show"} Password
          </label>
        </div>
      )}
      {error && <span style={{ color: "red" }}>{error}</span>}
    </div>
  );
}

export default FormInput;
