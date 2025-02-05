import React, { useState } from "react";
import axios from 'axios';
import FormInput from "./FormInput";
import WelcomeBanner from "./WelcomeBanner";
import "../styles/Register.css";


const Register = () => {
  const [formData, setFormData] = useState({
    username: "",
    firstname: "",
    lastname: "",
    password: "",
    confirm: "",
  });

  const [errors, setErrors] = useState({
    username: "",
    firstname: "",
    lastname: "",
    password: "",
    confirm: "",
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });

    // Clear the error for the field being updated
    setErrors({ ...errors, [name]: "" });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
  
    let hasError = false;
    const newErrors = {};
  
    if (!formData.username) {
      newErrors.username = "Username cannot be blank.";
      hasError = true;
    }
    if (!formData.firstname) {
      newErrors.firstname = "First name cannot be blank.";
      hasError = true;
    }
    if (!formData.lastname) {
      newErrors.lastname = "Last name cannot be blank.";
      hasError = true;
    }
    if (!formData.password) {
      newErrors.password = "Password cannot be blank.";
      hasError = true;
    }
    if (!formData.confirm) {
      newErrors.confirm = "Confirm password cannot be blank.";
      hasError = true;
    }
    if (formData.password !== formData.confirm) {
      newErrors.confirm = "Passwords do not match.";
      hasError = true;
    }
  
    setErrors(newErrors);
  
    if (!hasError) {
      try {
        const response = await axios.post(
          "http://localhost:8087/auth/register",
          {
            username: formData.username,
            firstName: formData.firstname,
            lastName: formData.lastname,
            password: formData.password,
          },
          {
            headers: { "Content-Type": "application/json" },
          }
        );
  
        console.log("Registration successful!", response.data);
        alert("Registration successful! You can now log in.");
        setFormData({
          username: "",
          firstname: "",
          lastname: "",
          password: "",
          confirm: "",
        });
      } catch (error) {
        console.error("Registration failed:", error.response?.data || error.message);
        alert("Registration failed! Please try again.");
      }
    }
  };
  

  return (
    <div className="register-page">
      <WelcomeBanner text={"Register"}/>
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
          label="First Name"
          name="firstname"
          type="text"
          value={formData.firstname}
          placeholder="Enter your first name"
          onChange={handleInputChange}
          error={errors.firstname}
        />
        <FormInput
          label="Last Name"
          name="lastname"
          type="text"
          value={formData.lastname}
          placeholder="Enter your last name"
          onChange={handleInputChange}
          error={errors.lastname}
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
          placeholder="Re-enter your password"
          onChange={handleInputChange}
          error={errors.confirm}
        />

        <button className="login-button"type="submit">Register</button>
      </form>
      <p className="have-account">
        Have an account? <a href="/login">Log in</a>
      </p>
    </div>
  );
};

export default Register;
