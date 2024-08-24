import React, { useState } from 'react';
import './docSignUp.css';
import { FaTrash } from 'react-icons/fa';
import { db, auth } from "../../utils/firebaseConfig.js";
import { doc, setDoc } from "firebase/firestore";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

const SignUpForm = () => {
  const navigate = useNavigate();
  const { role } = useSelector((state) => state.authStore);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    dob: '',
    gender: '',
    city: '',
    country: '',
    specialty: '',
    bio: '',
    education: [''],
    experience: [''],
    picture: null,
  });

  const [showEducation, setShowEducation] = useState(false);
  const [showExperience, setShowExperience] = useState(false);

  const calculateAge = (dob) => {
    const birthDate = new Date(dob);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDifference = today.getMonth() - birthDate.getMonth();

    if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  };


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleEducationChange = (index, value) => {
    const updatedEducation = [...formData.education];
    updatedEducation[index] = value;
    setFormData({ ...formData, education: updatedEducation });
  };

  const handleExperienceChange = (index, value) => {
    const updatedExperience = [...formData.experience];
    updatedExperience[index] = value;
    setFormData({ ...formData, experience: updatedExperience });
  };

  const handleAddEducation = () => {
    setFormData({ ...formData, education: [...formData.education, ''] });
    setShowEducation(true);
  };

  const handleAddExperience = () => {
    setFormData({ ...formData, experience: [...formData.experience, ''] });
    setShowExperience(true);
  };

  const handleRemoveEducation = (index) => {
    const updatedEducation = formData.education.filter((_, i) => i !== index);
    setFormData({ ...formData, education: updatedEducation });
    if (updatedEducation.length === 0) setShowEducation(false);
  };

  const handleRemoveExperience = (index) => {
    const updatedExperience = formData.experience.filter((_, i) => i !== index);
    setFormData({ ...formData, experience: updatedExperience });
    if (updatedExperience.length === 0) setShowExperience(false);
  };

  const handlePictureChange = (e) => {
    setFormData({ ...formData, picture: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, formData.email, formData.password);
      const userId = userCredential.user.uid;

      let imageUrl = null;

      if (formData.picture) {
        const storage = getStorage();
        const storageRef = ref(storage, `profile_pictures/${userId}_${formData.picture.name}`);
        await uploadBytes(storageRef, formData.picture);
        imageUrl = await getDownloadURL(storageRef);
      }

      const userDoc = {
        email: formData.email,
        role: role,
        id: userId,
      };
      const age = calculateAge(formData.dob);
      if (role === 'doctor') {
        await setDoc(doc(db, 'users', userId), {
          ...userDoc,
          fullName: formData.name,
          specialty: formData.specialty,
          age: age,
          description: formData.bio,
          education: formData.education,
          experience: formData.experience,
          picture: imageUrl,
        });
      } else {
        await setDoc(doc(db, 'users', userId), {
          ...userDoc,
          fullName: formData.name,
          age: age,
          dob: formData.dob,
          gender: formData.gender,
          city: formData.city,
          country: formData.country,
        });
      }

      localStorage.setItem('user', JSON.stringify({
        email: formData.email,
        role: role,
        uid: userId,
      }));
      await signInWithEmailAndPassword(auth, formData.email, formData.password);
      navigate("/home");
    } catch (error) {
      console.error('Error during sign up: ', error);
    }
  };

  return (
    <form className="doctor-signup" onSubmit={handleSubmit}>

      <h2>{role === 'doctor' ? 'Doctor Signup' : 'User Signup'}</h2>

      <label>Name:</label>
      <input type="text" name="name" value={formData.name} onChange={handleChange} required />

      <label>Email:</label>
      <input type="email" name="email" value={formData.email} onChange={handleChange} required />

      <label>Password:</label>
      <input type="password" name="password" value={formData.password} onChange={handleChange} required />

      <div>
        <label>Date of Birth:</label>
        <input
          type="date"
          name="dob"
          value={formData.dob}
          onChange={handleChange}
          required
        />
      </div>
      {role === 'doctor' && (
        <>
          <label>Specialty:</label>
          <input type="text" name="specialty" value={formData.specialty} onChange={handleChange} required />

          <label>Bio:</label>
          <textarea name="bio" value={formData.bio} onChange={handleChange} required />

          <label>Education:</label>
          {showEducation && formData.education.map((edu, index) => (
            <div key={index} className="input-group">
              <input
                type="text"
                value={edu}
                onChange={(e) => handleEducationChange(index, e.target.value)}
                required
              />
              <button type="button" className="remove-button" onClick={() => handleRemoveEducation(index)}>
                <FaTrash />
              </button>
            </div>
          ))}
          <button type="button" className="add-button" onClick={handleAddEducation}>
            Add Education
          </button>

          <label>Experience:</label>
          {showExperience && formData.experience.map((exp, index) => (
            <div key={index} className="input-group">
              <input
                type="text"
                value={exp}
                onChange={(e) => handleExperienceChange(index, e.target.value)}
                required
              />
              <button type="button" className="remove-button" onClick={() => handleRemoveExperience(index)}>
                <FaTrash />
              </button>
            </div>
          ))}
          <button type="button" className="add-button" onClick={handleAddExperience}>
            Add Experience
          </button>

          <label>Profile Picture:</label>
          <input type="file" onChange={handlePictureChange} accept="image/*" />
        </>
      )}

      {role !== 'doctor' && (
        <>

          <div>
            <label>Gender:</label>
            <select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              required
            >
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>
          <div>
            <label>City:</label>
            <input
              type="text"
              name="city"
              value={formData.city}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label>Country:</label>
            <input
              type="text"
              name="country"
              value={formData.country}
              onChange={handleChange}
              required
            />
          </div>
        </>
      )}

      <button type="submit" className="submit-button">Sign Up</button>
    </form>
  );
};

export default SignUpForm;
