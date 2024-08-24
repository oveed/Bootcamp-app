import React from 'react';
import './DocProfile.css'; 

const DoctorProfile = () => {
  const doctor = {
    name: 'Dr. John Smith',
    specialty: 'Psychiatrist',
    bio: 'Dr. John Smith has over 15 years of experience in mental health care, focusing on treating anxiety and depression. He believes in a holistic approach to therapy.',
    education: [
      'M.D. in Psychiatry, Harvard Medical School',
      'B.S. in Psychology, Stanford University'
    ],
    experience: [
      'Senior Psychiatrist at City Hospital (2010 - Present)',
      'Resident Doctor at Green Clinic (2005 - 2010)'
    ],
    picture: './pic.jpg' 
  };

  return (
    <div className="doctor-profile">
      <div className="doctor-image">
        <img src={doctor.picture} alt={`${doctor.name}`} />
      </div>
      <div className="doctor-info">
        <h2>{doctor.name}</h2>
        <h4>{doctor.specialty}</h4>
        <p className="doctor-bio">{doctor.bio}</p>

        <div className="doctor-education">
          <h3>Education</h3>
          <ul>
            {doctor.education.map((edu, index) => (
              <li key={index}>{edu}</li>
            ))}
          </ul>
        </div>

        <div className="doctor-experience">
          <h3>Experience</h3>
          <ul>
            {doctor.experience.map((exp, index) => (
              <li key={index}>{exp}</li>
            ))}
          </ul>
        </div>
        <br/>
        <button className="appointment-button">Take an Appointment</button>
      </div>
    </div>
  );
};

export default DoctorProfile;
