import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import FormInput from './FormInput';
import WelcomeBanner from './WelcomeBanner';
import '../styles/Login.css';

const Login = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  const [errors, setErrors] = useState({
    username: '',
    password: '',
  });

  const navigate = useNavigate(); // Initialize navigate hook

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });

    // Clear the error for the field being updated
    setErrors({ ...errors, [name]: '' });
  };

  const handleSubmit = async (event) => {
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
  
    setErrors(newErrors);
    if (hasError) return;
  
    try {
      console.log("Logging in...");
      const response = await axios.post("http://localhost:8087/auth/login", {
        username: formData.username,
        password: formData.password,
      });
  
      console.log("Login successful!", response.data);
      localStorage.setItem("isAuthenticated", "true");
      localStorage.setItem("userId", response.data); // Store userId in localStorage
      navigate("/"); // Redirect to dashboard
    } catch (error) {
      if (error.response && error.response.status === 400) {
        setErrors({ username: "Invalid username or password." });
      } else {
        console.error("Login failed:", error);
      }
    }
  };
  return (
    <div className="login-page">
      <WelcomeBanner text={"Log In"} />
      <form onSubmit={handleSubmit}>
        <FormInput
          label="Username"
          name="username"
          type="text"
          value={formData.username}
          placeholder="Enter your username"
          onChange={(e) => handleInputChange(e)}
          error={errors.username}
        />
        <FormInput
          label="Password"
          name="password"
          type="password"
          value={formData.password}
          placeholder="Enter your password"
          onChange={(e) => handleInputChange(e)}
          error={errors.password}
        />
        <button type="submit" className="login-button">Login</button>
      </form>
      <p className="new-user">New user? <a href="/register">Register now!</a></p>
    </div>
  );
};

export default Login;
