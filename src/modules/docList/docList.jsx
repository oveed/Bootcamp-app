import React, { useState, useEffect } from 'react';
import DoctorCard from './docCard';
import './docList.css';
import { getFirestore, collection, query, where, getDocs } from 'firebase/firestore';
import { app } from '../../utils/firebaseConfig';

function DoctorList() {
  const [doctors, setDoctors] = useState([]);
  const [filteredDoctors, setFilteredDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const db = getFirestore(app);
        const q = query(collection(db, 'users'), where('role', '==', 'doctor'));
        const querySnapshot = await getDocs(q);
        const doctorsData = querySnapshot.docs.map(doc => ({
          id: doc.id,
          name: doc.data().fullName || 'N/A',
          specialization: doc.data().specialty || 'N/A',
          age: doc.data().age || 'N/A',
          description: doc.data().description || 'N/A',
          picture: doc.data().picture || '/default-pic.jpg',
        }));
        setDoctors(doctorsData);
        setFilteredDoctors(doctorsData); // Initialize filteredDoctors
      } catch (error) {
        setError('Failed to load doctors.');
      } finally {
        setLoading(false);
      }
    };

    fetchDoctors();
  }, []);

  useEffect(() => {
    const filtered = doctors.filter(doctor =>
      doctor.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredDoctors(filtered);
  }, [searchTerm, doctors]);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="doctor-list">
      <div className="banner">
        <h2>Find Your Doctor</h2>
        <input
          type="text"
          placeholder="Search doctors..."
          value={searchTerm}
          onChange={handleSearchChange}
          className="search-input"
        />
      </div>
      <div className="doctor-cards">
        {filteredDoctors.map((doctor) => (
          <DoctorCard
            key={doctor.id}
            name={doctor.name}
            specialization={doctor.specialization}
            age={doctor.age}
            description={doctor.description}
            picture={doctor.picture}
          />
        ))}
      </div>
    </div>
  );
}

export default DoctorList;
