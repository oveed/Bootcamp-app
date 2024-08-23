import React from 'react';
import './docCard.css';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setDoctorId } from '../../core/UserStore';

function DoctorCard({ name, specialization, description, age, id }) {
  const dispatch = useDispatch();
  const { isDoctor } = useSelector((store) => store.userStore);
  const navigate = useNavigate()
  const handleOnClick = () => {
    dispatch(setDoctorId(id));
    console.log("iddddddddddddddd", id)
    navigate('/calendar', {
      state: {
        doctorId: id,
        isDoctor: isDoctor
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
