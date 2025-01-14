import React, {useState} from 'react';
import FormInput from './FormInput';
import '../styles/Login.css';

const Login = () => {
  var [formData, setFormData] = useState({
    username:'',
    password:'',
  })

  const [errors, setErrors] = useState({
    username: "",
    password: "",
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
    setErrors(newErrors);

    if (!hasError) {
      console.log("Registration successful!", formData);
      // Add logic to handle successful registration (e.g., API call, navigation)
    }
  };

  return (
    <div className="login-page">
      <h1>Login</h1>
      <form onSubmit={handleSubmit}> 
        {/* <label>Username</label> */}
        <FormInput label="Username" name="username" type="text" value={formData.username} placeholder="Enter your username" onChange={(e)=>handleInputChange(e)} error={errors.username}/>
        <FormInput label="Password" name="password" type="password" value={formData.password} placeholder="Enter your password" onChange={(e)=>handleInputChange(e)} error={errors.password}/>
        <button type="submit" className='login-button'>Login</button>
      </form>
      <p className="new-user">New user? <a href="/register">Sign Up</a></p>
    </div>
  );
};

export default Login;
