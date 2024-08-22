import { React, useState, useEffect } from 'react';
import DoctorCard from './docCard';
import './docList.css';
import { getFirestore, collection, query, where, getDocs } from 'firebase/firestore';
import { app } from '../../utils/firebaseConfig'; // Assuming Firebase is initialized in a file named firebase.js

// const doctors = [
//   {
//     id: 1,
//     name: 'Dr. John Doe',
//     specialization: 'Psychiatrist',
//     description: 'Expert in mental health disorders and therapy.',
//   },
//   {
//     id: 2,
//     name: 'Dr. Jane Smith',
//     specialization: 'Clinical Psychologist',
//     description: 'Specializes in diagnosing and treating mental health issues.',
//   },
//   {
//     id: 3,
//     name: 'Dr. Emily Johnson',
//     specialization: 'Counselor',
//     description: 'Provides support and counseling for various emotional and mental health issues.',
//   },
//   // Add more doctors as needed
// ];

function DoctorList() {
  const [doctors, setDoctors] = useState([]);
  useEffect(() => {
    const fetchDoctors = async () => {
      const db = getFirestore(app);
      const q = query(collection(db, 'users'), where('role', '==', 'doctor'));
      const querySnapshot = await getDocs(q);
      const doctorsData = querySnapshot.docs.map(doc => ({
        id: doc.id,
        name: doc.data().fullName || 'N/A',
        specialization: doc.data().specialty || 'N/A',
        age: doc.data().age || 'N/A',
        description: doc.data().description || 'N/A',
        email: doc.data().email,
      }));
      setDoctors(doctorsData);
    };

    fetchDoctors();
  }, []);
  function name(params) {
    console.log(params)
  }
  return (
    <div className="doctor-list">
      <h2>Our Doctors</h2>
      <div className="doctor-cards">

        {doctors.map((doctor) => (
          name(doctor),
          < DoctorCard
            key={doctor.id}
            age={doctor.age}
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
