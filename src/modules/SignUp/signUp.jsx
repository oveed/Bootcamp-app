import React, { useState } from 'react';
import './signUp.css';
import { db } from "../../utils/firebaseConfig.js";


function SignUpForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    dob: '',
    gender: '',
    city: '',
    country: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Add form data to Firestore
      const docRef = await db.collection('users').add(formData);
      console.log('Document written with ID: ', docRef.id);
      // Handle success (e.g., show a message or redirect)
    } catch (error) {
      console.error('Error adding document: ', error);
      // Handle error (e.g., show an error message)
    }
  };

  return (
    <form onSubmit={handleSubmit} className="signup-form">
      <label htmlFor="name" className="form-label">Name:</label>
      <input
        id="name"
        type="text"
        name="name"
        value={formData.name}
        onChange={handleChange}
        required
        className="form-input"
      />

      <label htmlFor="email" className="form-label">Email:</label>
      <input
        id="email"
        type="email"
        name="email"
        value={formData.email}
        onChange={handleChange}
        required
        className="form-input"
      />

      <label htmlFor="dob" className="form-label">Date of Birth:</label>
      <input
        id="dob"
        type="date"
        name="dob"
        value={formData.dob}
        onChange={handleChange}
        required
        className="form-input"
      />

      <label htmlFor="gender" className="form-label">Gender:</label>
      <select
        id="gender"
        name="gender"
        value={formData.gender}
        onChange={handleChange}
        required
        className="form-select"
      >
        <option value="">Select Gender</option>
        <option value="male">Male</option>
        <option value="female">Female</option>
        <option value="other">Other</option>
      </select>

      <label htmlFor="city" className="form-label">City:</label>
      <input
        id="city"
        type="text"
        name="city"
        value={formData.city}
        onChange={handleChange}
        required
        className="form-input"
      />

      <label htmlFor="country" className="form-label">Country:</label>
      <input
        id="country"
        type="text"
        name="country"
        value={formData.country}
        onChange={handleChange}
        required
        className="form-input"
      />

      <label htmlFor="password" className="form-label">Password:</label>
      <input
        id="password"
        type="password"
        name="password"
        value={formData.password}
        onChange={handleChange}
        required
        className="form-input"
      />

      <button type="submit" className="signup-button">Sign Up</button>
    </form>
  );
}

export default SignUpForm;
