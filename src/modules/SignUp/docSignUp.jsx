import React, { useState } from 'react';
import './DocSignUp.css';
import { FaTrash } from 'react-icons/fa';

const DoctorSignup = () => {
  const [doctor, setDoctor] = useState({
    name: '',
    specialty: '',
    bio: '',
    education: [''],
    experience: [''],
    picture: null
  });

  const [showEducation, setShowEducation] = useState(false);
  const [showExperience, setShowExperience] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDoctor({
      ...doctor,
      [name]: value,
    });
  };

  const handleEducationChange = (index, value) => {
    const updatedEducation = [...doctor.education];
    updatedEducation[index] = value;
    setDoctor({ ...doctor, education: updatedEducation });
  };

  const handleExperienceChange = (index, value) => {
    const updatedExperience = [...doctor.experience];
    updatedExperience[index] = value;
    setDoctor({ ...doctor, experience: updatedExperience });
  };

  const handleAddEducation = () => {
    setDoctor({ ...doctor, education: [...doctor.education, ''] });
    setShowEducation(true);
  };

  const handleAddExperience = () => {
    setDoctor({ ...doctor, experience: [...doctor.experience, ''] });
    setShowExperience(true);
  };

  const handleRemoveEducation = (index) => {
    const updatedEducation = doctor.education.filter((_, i) => i !== index);
    setDoctor({ ...doctor, education: updatedEducation });
    if (updatedEducation.length === 0) setShowEducation(false);
  };

  const handleRemoveExperience = (index) => {
    const updatedExperience = doctor.experience.filter((_, i) => i !== index);
    setDoctor({ ...doctor, experience: updatedExperience });
    if (updatedExperience.length === 0) setShowExperience(false);
  };

  const handlePictureChange = (e) => {
    setDoctor({ ...doctor, picture: e.target.files[0] });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(doctor);
  };

  return (

    <form className="doctor-signup" onSubmit={handleSubmit}>

      <h2>Doctor Signup</h2>

      <label>Name:</label>
      <input type="text" name="name" value={doctor.name} onChange={handleChange} required />

      <label>Specialty:</label>
      <input type="text" name="specialty" value={doctor.specialty} onChange={handleChange} required />

      <label>Bio:</label>
      <textarea name="bio" value={doctor.bio} onChange={handleChange} required />

      <label>Education:</label>
      {showEducation && doctor.education.map((edu, index) => (
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
      {showExperience && doctor.experience.map((exp, index) => (
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

      <button type="submit" className="submit-button">Submit</button>
    </form>
  );
};

export default DoctorSignup;
