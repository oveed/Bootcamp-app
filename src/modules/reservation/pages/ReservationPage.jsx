import { React, useEffect } from 'react';
import Calendar from "../components/calendar"
import { useDispatch, useSelector } from "react-redux";
import { toast } from 'react-toastify';
import { useParams } from 'react-router-dom';
import UserAppointments from '../components/userAppointments';
import { fetchDoctorName } from '../../../core/UserStore';
import DoctorName from '../components/docName';
function ReservationPage() {
    const dispatch = useDispatch();
    const { id } = useParams();
    const { isDoctor } = useSelector((store) => store.userStore);

    useEffect(() => {
        if (id) {
            dispatch(fetchDoctorName(id));
            console.log("isDoctorrrrrrrrrrrr", isDoctor, id)
        } else {
            toast.error("No id found in navigation state. Redirecting...");
        }
    }, [id, dispatch]);
    return (
        <div style={{
            margin: "10px",
            padding: "40px"
        }}>
            <UserAppointments />
            <DoctorName />
            <Calendar isDoctor={isDoctor} doctorId={id} />
        </div>
    )
}

export default ReservationPage;
