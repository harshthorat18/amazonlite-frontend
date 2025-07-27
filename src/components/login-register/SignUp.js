import React, { useState } from 'react';
import axios from 'axios';
import CountryCode from './CountryCode';
import './login-register.css';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import { NavLink, useNavigate } from 'react-router-dom';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';

const SignUp = () => {
  const [signUpInfo, setSignUpInfo] = useState({
    name: '',
    number: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const [errorMessage, setErrorMessage] = useState([]);
  const [successMessage, setSuccessMessage] = useState(false);
  const navigate = useNavigate();

  const formUpdate = (e) => {
    const { name, value } = e.target;

    // Restrict number input to digits only
    if (name === 'number') {
      const digitsOnly = value.replace(/\D/g, '');
      if (digitsOnly.length > 10) return; // optional limit
      setSignUpInfo((prev) => ({
        ...prev,
        number: digitsOnly
      }));
    } else {
      setSignUpInfo((prev) => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const sendData = async (e) => {
    e.preventDefault();
    setErrorMessage([]);
    setSuccessMessage(false);

    const { name, number, email, password, confirmPassword } = signUpInfo;

    // Basic client-side validation
    if (password !== confirmPassword) {
      setErrorMessage(['Passwords do not match.']);
      return;
    }

    try {
      await axios.post('https://amazonlite-backend.onrender.com/api/register', {
        name: name.trim(),
        number: number.trim(),
        email: email.trim(),
        password: password.trim(),
        confirmPassword: confirmPassword.trim()
      }, {
        headers: {
          'Content-Type': 'application/json'
        }
      });

      setSuccessMessage(true);
      setSignUpInfo({
        name: '',
        number: '',
        email: '',
        password: '',
        confirmPassword: ''
      });

      setTimeout(() => navigate('/login'), 1500);
    } catch (error) {
      const serverMessage = error.response?.data?.message;
      if (Array.isArray(serverMessage)) {
        setErrorMessage(serverMessage.map(err => err.msg || err));
      } else if (typeof serverMessage === 'string') {
        setErrorMessage([serverMessage]);
      } else {
        setErrorMessage(['An unknown error occurred']);
      }
    }
  };

  return (
    <div className='signin signup'>
      <NavLink to='/' className='logo'>
        <img src='images/logo-dark.png' alt='logo' />
      </NavLink>

      {errorMessage.length > 0 && (
        <Alert variant='outlined' severity='warning' className='alert'>
          <AlertTitle>There were some errors</AlertTitle>
          <ul>
            {errorMessage.map((error, index) => (
              <li key={index}>{error}</li>
            ))}
          </ul>
        </Alert>
      )}

      {successMessage && (
        <Alert variant='outlined' severity='success' className='alert'>
          Registered successfully! Please <NavLink to='/login'>login</NavLink>
        </Alert>
      )}

      <div className='form-details'>
        <h3>Create Account</h3>
        <form method='POST' onSubmit={sendData}>
          <label htmlFor='name'>Your name</label>
          <input
            type='text'
            name='name'
            id='name'
            placeholder='First and last name'
            onChange={formUpdate}
            value={signUpInfo.name}
            required
          />

          <label htmlFor='number'>Mobile number</label>
          <div className='mobile-number'>
            <CountryCode />
            <input
              type='text'
              name='number'
              id='number'
              placeholder='Mobile number'
              onChange={formUpdate}
              value={signUpInfo.number}
              required
            />
          </div>

          <label htmlFor='email'>Email</label>
          <input
            type='email'
            name='email'
            id='email'
            placeholder='Email Address'
            onChange={formUpdate}
            value={signUpInfo.email}
            required
          />

          <label htmlFor='password'>Password</label>
          <input
            type='password'
            name='password'
            id='password'
            placeholder='Password (at least 6 characters)'
            onChange={formUpdate}
            value={signUpInfo.password}
            required
          />

          <label htmlFor='confirmPassword'>Confirm Password</label>
          <input
            type='password'
            name='confirmPassword'
            id='confirmPassword'
            placeholder='Confirm Password'
            onChange={formUpdate}
            value={signUpInfo.confirmPassword}
            required
          />

          <button type='submit' id='submit'>Continue</button>
        </form>

        <div className='already-have-account'>
          <p>
            Already have an account? <NavLink to='/login'>Sign in <ArrowRightIcon /></NavLink>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
