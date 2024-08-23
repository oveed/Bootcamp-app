import React, { useState, useEffect } from 'react';
import '../userProfile.css';

function UserProfile() {
  const [userData, setUserData] = useState({
    name: 'John Doe',
    email: 'john.doe@example.com',
    dateOfBirth: '1990-01-01',
    gender: 'Male',
  });

  const [appointments, setAppointments] = useState([
    { id: 1, date: '2024-09-01', time: '10:00 AM', doctor: 'Dr. Smith' },
    { id: 2, date: '2024-09-10', time: '02:00 PM', doctor: 'Dr. Brown' },
  ]);

  return (
    <div className="user-profile">
      <h2>User Profile</h2>
      <div className="user-info">
        <p><strong>Name:</strong> {userData.name}</p>
        <p><strong>Email:</strong> {userData.email}</p>
        <p><strong>Date of Birth:</strong> {userData.dateOfBirth}</p>
        <p><strong>Gender:</strong> {userData.gender}</p>
      </div>

      <h3>Appointments</h3>
      <ul className="appointment-list">
        {appointments.map(appointment => (
          <li key={appointment.id}>
            <p><strong>Date:</strong> {appointment.date}</p>
            <p><strong>Time:</strong> {appointment.time}</p>
            <p><strong>Doctor:</strong> {appointment.doctor}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default UserProfile;
