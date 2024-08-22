import React from 'react';
import './docCard.css';
import { useNavigate } from 'react-router-dom';
function DoctorCard({ name, specialization, description, age, id }) {
  const navigate = useNavigate()
  const handleOnClick = () => {
    console.log("iddddddddddddddd", id)
    navigate('/calendar', {
      state: {
        doctorId: id,  // Pass the doctor ID
        isDoctor: false  // Set to false since this is for viewing a doctor's schedule
      }
    });
  }
  return (
    <div className="doctor-card">
      <h3 className="doctor-name">{name}</h3>
      <p className="doctor-specialization">{specialization}</p>
      <p className="doctor-specialization">{age}</p>
      <p className="doctor-description">{description}</p>
      <button className="doctor-button" onClick={handleOnClick}>View Schedule</button>
    </div>
  );
}

export default DoctorCard;
