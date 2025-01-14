import React, {useState} from 'react';
import FormInput from './FormInput';

const Login = () => {
  var [formData, setFormData] = useState({
    username:'',
    password:'',
  })

  var [error, setError] = useState('')


  var handleInputChange = (event) => {
    var {name, value} = event.target;
    setFormData({...formData, [name]:value})
    // Clear the error if the user starts typing
    if (error) {
          setError("");
        }
  }

  var handleSubmit = (event) => {
    event.preventDefault();

    // Check if username or password is blank
    if (!formData.username || !formData.password) {
      setError("Username and password cannot be blank.");
    }
  };


  return (
    <div className="login-page">
      <h1>Login</h1>
      <form onSubmit={handleSubmit}> 
        {/* <label>Username</label> */}
        <FormInput label="Username" type="text" value={formData.username} placeholder="Enter your username" onChange={(e)=>handleInputChange(e)} error={error}/>
        {/* <input type="text" placeholder="Enter your username" /> */}
        <FormInput label="Password" type="password" value={formData.password} placeholder="Enter your password" onChange={(e)=>handleInputChange(e)} error={error}/>
        {/* <label>Password</label>
        <input type="password" placeholder="Enter your password" /> */}
        <button type="submit">Login</button>
      </form>
      <p>New user? <a href="/register">Sign Up</a></p>
    </div>
  );
};

export default Login;
