import React, { useState } from 'react';
import axios from 'axios';

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/users/login', formData, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      console.log(response.data); // Log the response data
      alert(response.data.message || 'Login successful');
      localStorage.setItem('token', response.data.token);
    } catch (error) {
      alert('Error logging in');
    }
  };
  
  

  return (
    <form onSubmit={handleSubmit}>
      <input name="email" type="email" onChange={handleChange} placeholder="Email" required />
      <input name="password" type="password" onChange={handleChange} placeholder="Password" required />
      <button type="submit">Login</button>
    </form>
  );
};

export default Login;
