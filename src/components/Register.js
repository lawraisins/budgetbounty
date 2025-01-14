import React, { useState } from "react";
import FormInput from "./FormInput";
import "../styles/Register.css";


const Register = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    confirm: "",
  });

  const [errors, setErrors] = useState({
    username: "",
    password: "",
    confirm: "",
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });

    // Clear the error for the field being updated
    setErrors({ ...errors, [name]: "" });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    let hasError = false;
    const newErrors = {};

    if (!formData.username) {
      newErrors.username = "Username cannot be blank.";
      hasError = true;
    }
    if (!formData.password) {
      newErrors.password = "Password cannot be blank.";
      hasError = true;
    }
    if (!formData.confirm) {
      newErrors.confirm = "Confim password cannot be blank.";
      hasError = true;
    }
    if (formData.password !== formData.confirm) {
      newErrors.confirm = "Passwords do not match.";
      hasError = true;
    }

    setErrors(newErrors);

    if (!hasError) {
      console.log("Registration successful!", formData);
      // Add logic to handle successful registration (e.g., API call, navigation)
    }
  };

  return (
    <div className="register-page">
      <h1>Register</h1>
      <form onSubmit={handleSubmit}>
        <FormInput
          label="Username"
          name="username"
          type="text"
          value={formData.username}
          placeholder="Enter your username"
          onChange={handleInputChange}
          error={errors.username}
        />
        <FormInput
          label="Password"
          name="password"
          type="password"
          value={formData.password}
          placeholder="Enter your password"
          onChange={handleInputChange}
          error={errors.password}
        />
        <FormInput
          label="Confirm Password"
          name="confirm"
          type="password"
          value={formData.confirm}
          placeholder="Enter your password"
          onChange={handleInputChange}
          error={errors.confirm}
        />

        <button className="register-button"type="submit">Register</button>
      </form>
      <p className="have-account">
        Have an account? <a href="/login">Log in</a>
      </p>
    </div>
  );
};

export default Register;
