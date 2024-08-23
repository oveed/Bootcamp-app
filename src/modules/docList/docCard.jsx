import React from 'react';
import './docCard.css';

function DoctorCard({ name, specialization, description, age }) {
  return (
    <div className="doctor-card">
      <h3 className="doctor-name">{name}</h3>
      <p className="doctor-specialization">{specialization}</p>
      <p className="doctor-specialization">{age}</p>
      <p className="doctor-description">{description}</p>
      <button className="doctor-button">View Profile</button>
    </div>
  );
}

export default DoctorCard;
