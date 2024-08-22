import React from 'react';
import DoctorCard from './docCard';
import './docList.css';

const doctors = [
  {
    id: 1,
    name: 'Dr. John Doe',
    specialization: 'Psychiatrist',
    description: 'Expert in mental health disorders and therapy.',
  },
  {
    id: 2,
    name: 'Dr. Jane Smith',
    specialization: 'Clinical Psychologist',
    description: 'Specializes in diagnosing and treating mental health issues.',
  },
  {
    id: 3,
    name: 'Dr. Emily Johnson',
    specialization: 'Counselor',
    description: 'Provides support and counseling for various emotional and mental health issues.',
  },
  // Add more doctors as needed
];

function DoctorList() {
  return (
    <div className="doctor-list">
      <h2>Our Doctors</h2>
      <div className="doctor-cards">
        {doctors.map((doctor) => (
          <DoctorCard
            key={doctor.id}
            name={doctor.name}
            specialization={doctor.specialization}
            description={doctor.description}
          />
        ))}
      </div>
    </div>
  );
}

export default DoctorList;
