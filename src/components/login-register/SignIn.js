import React, { useState } from 'react';
import './login-register.css';
import { NavLink, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';

const SignIn = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      const res = await axios.post('https://amazonlite-backend.onrender.com/api/login', 
        formData, {
        headers: {
          'Content-Type': 'application/json'
        },
        withCredentials: true
      });

      if (res.status === 201) {
        navigate('/');
      }
    } catch (err) {
      console.error("Login error:", err.response?.data);
       const msg = err.response?.data?.message;
      console.error("Full login error message:", msg);
  if (Array.isArray(msg)) {
    setError(msg); // array of error objects
  } else {
    setError([{ msg: msg || 'Login failed' }]);
  }
    }
  };

  return (
    <div className="signin">
  <div className="form-details">
    <form onSubmit={handleSubmit}>
      <h3>Sign In</h3>

      {error && (
        <Alert severity="error" className="alert error-alert">
          <AlertTitle className="alert-title">Error</AlertTitle>
          {Array.isArray(error) ? (
      error.map((err, index) => <div key={index}>{err.msg}</div>)
    ) : (
      <div>{error}</div>
    )}
        </Alert>
      )}

      <label>Email:</label>
      <input
        type="email"
        name="email"
        value={formData.email}
        onChange={handleChange}
        required
      />

      <label>Password:</label>
      <input
        type="password"
        name="password"
        value={formData.password}
        onChange={handleChange}
        required
      />

      <button type="submit">Login</button>

       <div className="bottom-link">
            Don't have an account? <NavLink to="/register">Register here</NavLink>
          </div>

    </form>
  </div>
</div>
  );
};

export default SignIn;
