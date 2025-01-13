import React from 'react';

const Register = () => {
  return (
    <div className="register-page">
      <h1>Register</h1>
      <form>
        <label>Username</label>
        <input type="text" placeholder="Enter your username" />
        <label>Password</label>
        <input type="password" placeholder="Enter your password" />
        <label>Re-enter Password</label>
        <input type="password" placeholder="Re-enter your password" />
        <button type="submit">Register</button>
      </form>
      <p>Have an account? <a href="/login">Log in</a></p>
    </div>
  );
};

export default Register;
