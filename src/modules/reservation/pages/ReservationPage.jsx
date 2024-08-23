import React from 'react';
import Calendar from "../components/calendar"
import { useDispatch, useSelector } from "react-redux";
import { toast } from 'react-toastify';
import { useParams } from 'react-router-dom';
import UserAppointments from '../components/userAppointments';

function ReservationPage() {
    const { id } = useParams();
    console.log(id)
    const { isDoctor } = useSelector((store) => store.userStore);
    if (!id) {
        toast.error("No id found in navigation state. Redirecting...");
    }
    return (
        <>
            <UserAppointments />
            <Calendar isDoctor={isDoctor} doctorId={id} />
        </>
    )
}

export default ReservationPage;
