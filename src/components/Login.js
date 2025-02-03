import React, { useState } from 'react';
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

  const handleSubmit = (event) => {
    event.preventDefault();

    let hasError = false;
    const newErrors = {};

    if (!formData.username) {
      newErrors.username = 'Username cannot be blank.';
      hasError = true;
    }

    if (!formData.password) {
      newErrors.password = 'Password cannot be blank.';
      hasError = true;
    }

    // Check if the username and password match the dummy account
    if (formData.username !== 'hcl' || formData.password !== 'password') {
      newErrors.username = 'Invalid username or password.';
      hasError = true;
    }

    setErrors(newErrors);

    if (!hasError) {
      console.log('Login successful!', formData);
      localStorage.setItem("isAuthenticated", "true");
      navigate('/'); // Navigate to the Dashboard page upon successful login
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
