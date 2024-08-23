import React, { useState } from 'react';
import './DocSignUp.css'; 

const DoctorSignup = () => {
  const [doctor, setDoctor] = useState({
    name: '',
    specialty: '',
    bio: '',
    education: [''],
    experience: [''],
    picture: null
  });

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
  };

  const handleAddExperience = () => {
    setDoctor({ ...doctor, experience: [...doctor.experience, ''] });
  };

  const handleRemoveEducation = (index) => {
    const updatedEducation = doctor.education.filter((_, i) => i !== index);
    setDoctor({ ...doctor, education: updatedEducation });
  };

  const handleRemoveExperience = (index) => {
    const updatedExperience = doctor.experience.filter((_, i) => i !== index);
    setDoctor({ ...doctor, experience: updatedExperience });
  };

  const handlePictureChange = (e) => {
    setDoctor({ ...doctor, picture: e.target.files[0] });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(doctor);
    // Add functionality to send data to backend or Firebase
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
      {doctor.education.map((edu, index) => (
        <div key={index} className="input-group">
          <input
            type="text"
            value={edu}
            onChange={(e) => handleEducationChange(index, e.target.value)}
            required
          />
          <button type="button" className="remove-button" onClick={() => handleRemoveEducation(index)}>Remove</button>
        </div>
      ))}
      <button type="button" className="add-button" onClick={handleAddEducation}>Add Education</button>

      <label>Experience:</label>
      {doctor.experience.map((exp, index) => (
        <div key={index} className="input-group">
          <input
            type="text"
            value={exp}
            onChange={(e) => handleExperienceChange(index, e.target.value)}
            required
          />
          <button type="button" className="remove-button" onClick={() => handleRemoveExperience(index)}>Remove</button>
        </div>
      ))}
      <button type="button" className="add-button" onClick={handleAddExperience}>Add Experience</button>

      <label>Profile Picture:</label>
      <input type="file" onChange={handlePictureChange} accept="image/*" required />

      <button type="submit" className="submit-button">Submit</button>
    </form>
  );
};

export default DoctorSignup;
