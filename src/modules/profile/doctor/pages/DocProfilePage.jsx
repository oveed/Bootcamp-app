import React from 'react';
import DoctorProfile from '../components/docProfile';
import { useSelector } from "react-redux";
import { useParams } from 'react-router-dom';

function DocProfilePage() {
    const { id } = useParams();
    const { doctorId } = useSelector((store) => store.userStore);
    console.log("doctor id from profile page ", doctorId)
    console.log("params", id)
    return (
        <>
            <DoctorProfile doctorId={id} />
        </>
    )
}

export default DocProfilePage;
