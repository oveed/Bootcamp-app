// src/components/DoctorName.js
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

function DoctorName() {
    const doctorName = useSelector((state) => state.userStore.name);
    const status = useSelector((state) => state.userStore.status);
    const error = useSelector((state) => state.userStore.error);


    if (status === 'loading') {
        return <p>Loading...</p>;
    }

    if (status === 'failed') {
        return <p>Error: {error}</p>;
    }
    console.log(doctorName)
    return (
        <h1>{doctorName ? `Dr. ${doctorName}` : 'Doctor'}</h1>
    );
}

export default DoctorName;
