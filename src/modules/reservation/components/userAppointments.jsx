import React, { useEffect, useState } from 'react';
import { collection, getDocs, query, where, doc, getDoc } from 'firebase/firestore';
import { db } from '../../../utils/firebaseConfig';
import { useSelector } from "react-redux";
import { formatDate } from '@fullcalendar/core';
import { UserData } from '../../../utils/userData';

const UserAppointments = () => {
    const [appointments, setAppointments] = useState([]);
    const user = UserData()
    const isDoctor = user.role === 'doctor'
    useEffect(() => {
        const fetchAppointments = async () => {
            try {
                let q;
                if (isDoctor) {
                    q = query(
                        collection(db, "appointments"),
                        where("doctorId", "==", user.uid)
                    );
                } else {
                    q = query(
                        collection(db, "appointments"),
                        where("patientId", "==", user.uid)
                    );
                }

                const querySnapshot = await getDocs(q);
                const fetchedAppointments = await Promise.all(querySnapshot.docs.map(async doc => {
                    const appointmentData = doc.data();

                    let relatedUserName = "";
                    if (user.role === "doctor" && appointmentData.patientId) {
                        relatedUserName = await fetchPatientName(appointmentData.patientId);
                    } else if (user.role !== "doctor" && appointmentData.doctorId) {
                        relatedUserName = await fetchDoctorName(appointmentData.doctorId);
                    }

                    return {
                        ...appointmentData,
                        id: doc.id,
                        relatedUserName: relatedUserName

                    };
                }));

                setAppointments(fetchedAppointments);
                console.log("ahiyaaaaa", fetchedAppointments)
            } catch (error) {
                console.error("Error fetching appointments: ", error);
            }
        };

        fetchAppointments();
    }, [user.uid,]);
    const fetchPatientName = async (patientId) => {
        try {
            const patientRef = doc(db, "users", patientId);
            const patientSnap = await getDoc(patientRef);

            if (patientSnap.exists()) {
                return patientSnap.data().fullName;
            } else {
                return "Unknown Patient";
            }
        } catch (error) {
            console.error("Error fetching patient's name: ", error);
            return "Unknown Patient";
        }
    };

    const fetchDoctorName = async (doctorId) => {
        try {
            console.log("hello", doctorId)
            const doctorRef = doc(db, "users", doctorId);
            const doctorSnap = await getDoc(doctorRef);

            if (doctorSnap.exists()) {
                return doctorSnap.data().fullName;
            } else {
                return "Unknown Doctor";
            }
        } catch (error) {
            console.error("Error fetching doctor's name: ", error);
            return "Unknown Doctor";
        }
    };

    if (appointments.length === 0) {
        return <p>No current appointments.</p>;
    }

    return (
        <div className='user-appointments'>
            <h3>Your Appointments</h3>
            <br />
            <ul>
                {appointments.map(appointment => (
                    <li key={appointment.id}>
                        <b>{formatDate(appointment.start, {
                            year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit',
                            minute: '2-digit',
                            hour12: true
                        })}</b>
                        {isDoctor && appointment.relatedUserName ? (
                            <span> Patient: {appointment.relatedUserName}</span>
                        ) : null}
                        {!isDoctor && appointment.relatedUserName ? (
                            <span> Dr. {appointment.relatedUserName}</span>
                        ) : null}
                        {" "}
                        {appointment.meetLink ? (
                            <span>
                                <a href={appointment.meetLink}>
                                    <button>Meet</button>
                                </a>
                            </span>
                        ) : null}
                    </li>
                ))}

            </ul>
            <br />
        </div>
    );

};

export default UserAppointments;
