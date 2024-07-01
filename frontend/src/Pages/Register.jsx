import React, { useState } from 'react';
import axios from 'axios';

const Register = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    role: 'user'
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/users/register', formData, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      console.log(response.data); // Log the response data
      alert(response.data.message || 'Registration successful');
    } catch (error) {
      console.error(error); // Log the error for debugging
      alert('Error registering user');
    }
  };
  
  
  

  return (
    <form onSubmit={handleSubmit}>
      <input name="username" type="text" onChange={handleChange} placeholder="Username" required />
      <input name="email" type="email" onChange={handleChange} placeholder="Email" required />
      <input name="password" type="password" onChange={handleChange} placeholder="Password" required />
      <select name="role" onChange={handleChange}>
        <option value="user">User</option>
        <option value="admin">Admin</option>
      </select>
      <button type="submit">Register</button>
    </form>
  );
};

export default Register;
