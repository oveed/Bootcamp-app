import React from 'react';
import { useLocation } from 'react-router-dom';
import Calendar from "../../../reservation/components/calendar"
function CalendarPage() {
    const location = useLocation();
    const { doctorId, isDoctor } = location.state || {};
    if (!doctorId) {
        console.error("No doctorId found in navigation state. Redirecting...");
    }
    return <Calendar isDoctor={isDoctor} doctorId={doctorId} />;
}

export default CalendarPage;
