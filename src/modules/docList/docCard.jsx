import React from 'react';
import './docCard.css';

function DoctorCard({ name, specialization, description, age, picture }) {
  return (
    <div className="doctor-card">
      <img src={picture} alt={`${name}'s picture`} className="doctor-picture" />
      <div className="doctor-info">
        <h3 className="doctor-name">{name}</h3>
        <p className="doctor-specialization">{specialization}</p>
        <p className="doctor-age">{age} years old</p>
        <p className="doctor-description">{description}</p>
        <button className="doctor-button">View Profile</button>
      </div>
    </div>
  );
}

export default DoctorCard;
