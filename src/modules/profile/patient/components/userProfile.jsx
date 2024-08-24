import React, { useState, useEffect } from 'react';
import { db } from '../../../../utils/firebaseConfig'; // Make sure to import your Firebase config
import '../userProfile.css';
import { UserData } from '../../../../utils/userData';
import { collection, getDocs, getDoc, doc, query, where, } from 'firebase/firestore';
import { fetchDoctorName } from '../../../../core/UserStore';
import { useDispatch, useSelector } from 'react-redux';

function UserProfile() {
  const user = UserData()
  const userId = user.uid;
  const [userData, setUserData] = useState(null);
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const dispatch = useDispatch()
  const { doctor } = useSelector((state) => state.userStore.name)
  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const userDocRef = doc(db, "users", userId); // Reference to the specific user document
        const docSnapshot = await getDoc(userDocRef); // Fetch the document
        if (docSnapshot.exists()) {
          setUserData(docSnapshot.data()); // Set the user data state
        } else {
          console.error("No such document!");
        }
      } catch (error) {
        console.error("Error fetching user profile: ", error);
        setError("Failed to fetch user profile.");
      }
    };

    const fetchAppointments = async () => {
      let q;
      try {
        q = query(
          collection(db, "appointments"),
          where("patientId", "==", userId)
        );
        const querySnapshot = await getDocs(q);
        const fetchedAppointments = await Promise.all(querySnapshot.docs.map(async doc => {
          const appointmentData = doc.data();
          const doctorName = await dispatch(fetchDoctorName(appointmentData.doctorId));

          return {
            ...appointmentData,
            id: doc.id,
            doctorName: doctorName.payload,
          };

        }));
        console.log("appointments", fetchedAppointments)
        setAppointments(fetchedAppointments);
      } catch (error) {
        console.error("Error fetching appointments: ", error);
      }
    };

    const fetchData = async () => {
      setLoading(true);
      await fetchUserProfile();
      await fetchAppointments();
      setLoading(false);
    };

    fetchData();
  }, [userId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (!userData) {
    return <div>No user data available</div>;
  }
  function formatDate(isoString) {
    const date = new Date(isoString);

    const day = String(date.getDate()).padStart(2, '0'); // Gets the day and pads with leading zero if needed
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Gets the month (0-indexed) and pads with leading zero
    const year = date.getFullYear(); // Gets the full year
    console.log(`${month}/${day}/${year}`)
    return `${month}/${day}/${year}`;
  }
  function formatTime(isoString) {
    const date = new Date(isoString);

    const options = {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    };

    return date.toLocaleTimeString('en-US', options);
  }

  return (
    <div className="user-profile" style={{
    }}>
      <h2>User Profile</h2>
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',

      }}>      <img className="doctor-picture" src="https://firebasestorage.googleapis.com/v0/b/bootcamp-app-5d1fb.appspot.com/o/pic.jpg?alt=media&token=3fe2bf6c-55eb-40fb-aab0-ea81d1831daa" alt="" />
      </div>
      <div className="user-info">
        <p><strong>Name:</strong> {userData.fullName}</p>
        <p><strong>Email:</strong> {userData.email}</p>
        <p><strong>Date of Birth:</strong> {userData.dob}</p>
        <p><strong>Gender:</strong> {userData.gender}</p>
      </div>
      <h3>Appointments</h3>
      <ul className="appointment-list">
        {appointments.length > 0 ? (
          appointments.map(appointment => (
            <li key={appointment.id}>
              <p><strong>Date:</strong> {formatDate(appointment.start)}</p>
              <p><strong>Start:</strong> {formatTime(appointment.start)}</p>
              <p><strong>End:</strong> {formatTime(appointment.end)}</p>
              <p><strong>Doctor:</strong> {appointment.doctorName}</p>
            </li>
          ))
        ) : (
          <p>There are no appointments yet.</p>
        )}
      </ul>

    </div>
  );
}

export default UserProfile;
