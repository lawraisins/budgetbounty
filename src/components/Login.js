import React from 'react';

const Login = () => {
  return (
    <div className="login-page">
      <h1>Login</h1>
      <form>
        <label>Username</label>
        <input type="text" placeholder="Enter your username" />
        <label>Password</label>
        <input type="password" placeholder="Enter your password" />
        <button type="submit">Login</button>
      </form>
      <p>New user? <a href="/register">Sign Up</a></p>
    </div>
  );
};

export default Login;
