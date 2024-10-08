import React from 'react';
import './docCard.css';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setDoctorId } from '../../core/UserStore';

function DoctorCard({ name, specialization, description, age, id, picture }) {
  const dispatch = useDispatch();
  const { isDoctor } = useSelector((store) => store.userStore);
  const navigate = useNavigate()
  const handleOnClick = () => {
    dispatch(setDoctorId(id));
    navigate(`/profile/${id}`);
  }
  return (
    <div className="doctor-card">

      <div className="doctor-info">
        <img src={picture} alt={`${name}'s picture`} className="doctor-picture" />
        <h3 className="doctor-name">{name}</h3>
        <p className="doctor-specialization">{specialization}</p>
        <p className="doctor-age">{age} years old</p>
        <p className="doctor-description">{description}</p>
        <button className="doctor-button" onClick={handleOnClick}>View Profile</button> </div>
    </div >
  );
}

export default DoctorCard;
