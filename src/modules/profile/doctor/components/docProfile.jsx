import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { doc, onSnapshot } from 'firebase/firestore';
import { db } from '../../../../utils/firebaseConfig';
import './DocProfile.css';
import { useNavigate } from 'react-router-dom';
const DoctorProfile = ({ doctorId }) => {
  const navigate = useNavigate();
  const [doctor, setDoctor] = useState(null);
  const [loading, setLoading] = useState(true);
  console.log("hahiya ", doctorId)
  useEffect(() => {
    if (!doctorId) return;

    const doctorRef = doc(db, 'users', doctorId);
    const unsubscribe = onSnapshot(doctorRef, (snapshot) => {
      if (snapshot.exists()) {
        setDoctor(snapshot.data());
        setLoading(false);
      } else {
        console.error('No such document!');
        setLoading(false);
      }
    });

    return () => unsubscribe(); // Cleanup on unmount
  }, [doctorId]);



  if (!doctor) {
    return <div>Doctor profile not found.</div>;
  }
  const handleOnClick = () => {
    navigate(`/reservation/${doctorId}`);
  };

  return (
    <div className="doctor-profile">
      <div className="doctor-image">
        <img src={doctor.picture || './default-pic.jpg'} alt={`${doctor.fullName}`} />
      </div>
      <div className="doctor-info">
        <h2>{doctor.fullName}</h2>
        <h4>{doctor.specialty}</h4>
        <p className="doctor-bio">{doctor.description}</p>

        <div className="doctor-education">
          <h3>Education</h3>
          <ul>
            {doctor.education?.map((edu, index) => (
              <li key={index}>{edu}</li>
            ))}
          </ul>
        </div>

        <div className="doctor-experience">
          <h3>Experience</h3>
          <ul>
            {doctor.experience?.map((exp, index) => (
              <li key={index}>{exp}</li>
            ))}
          </ul>
        </div>

        <button className="appointment-button" onClick={handleOnClick}>Book an Appointment</button>
      </div>
    </div>
  );
};

export default DoctorProfile;
