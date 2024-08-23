import React from 'react';
import { formatDate } from '@fullcalendar/core';
import FullCalendar from '@fullcalendar/react';
import adaptivePlugin from '@fullcalendar/adaptive';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import resourceTimelinePlugin from '@fullcalendar/resource-timeline';
import { collection, addDoc, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { db } from '../../../utils/firebaseConfig'; // Import your Firebase configuration
import { UserData } from '../../../utils/userData';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "../reservation.css"
const RESOURCES = [
    { id: 'a', title: 'Auditorium A' },
];
function generateGoogleMeetLink() {
    const segment = () => Math.random().toString(36).substring(2, 6); // Generates a 4-character segment
    return `https://meet.google.com/${segment()}-${segment()}-${segment()}`;
}


export default class DemoApp extends React.Component {
    user = UserData()
    state = {
        weekendsVisible: true,
        currentApps: []
    };

    async componentDidMount() {
        try {
            const querySnapshot = await getDocs(collection(db, "appointments"));
            const appointments = querySnapshot.docs
                .map(doc => ({ ...doc.data(), id: doc.id }));
            console.log("this is the prob", this.props.isDoctor + " DOC ID " + this.props.doctorId)
            const filteredAppointments = this.props.isDoctor
                ? appointments.filter(app => app.doctorId === this.user.uid)
                : appointments.filter(app => app.doctorId === this.props.doctorId);

            this.setState({ currentApps: filteredAppointments });
            console.log("filtered events", filteredAppointments)
        } catch (error) {
            console.error("Error fetching appointments: ", error);
        }
    }



    render() {
        return (
            <div className='demo-app'>
                <ToastContainer />
                {this.renderSidebar()}
                <div className='demo-app-main'>
                    <FullCalendar
                        plugins={[
                            adaptivePlugin,
                            dayGridPlugin,
                            timeGridPlugin,
                            interactionPlugin,
                        ]}
                        headerToolbar={{
                            left: 'prev,next',
                            center: 'title',
                            right: 'dayGridMonth,timeGridWeek,timeGridDay'
                        }}
                        initialView='timeGridWeek'
                        editable={true}
                        selectable={true}
                        selectMirror={true}
                        dayMaxEvents={true}
                        weekends={this.state.weekendsVisible}
                        resources={RESOURCES}
                        eventClassNames={(eventInfo) => this.getEventClassNames(this.props.isDoctor)}
                        events={this.state.currentApps}
                        select={this.handleDateSelect}
                        eventContent={(eventInfo) => renderEventContent(eventInfo, this.props.isDoctor)}
                        eventClick={this.handleEventClick}
                        eventsSet={this.handleEvents}
                        slotMinTime="07:00:00"
                        slotMaxTime="21:00:00"
                    />
                </div>
            </div>
        );
    }

    renderSidebar() {
        return (
            <div className='demo-app-sidebar'>
            </div>
        );
    }

    handleWeekendsToggle = () => {
        this.setState({
            weekendsVisible: !this.state.weekendsVisible
        });
    };

    handleDateSelect = async (selectInfo) => {
        const overlappingEvent = this.state.currentApps.find(event => {
            return (
                selectInfo.start < new Date(event.end) && new Date(event.start) < selectInfo.end
            );
        });

        if (overlappingEvent) {
            toast.error('This time slot is already booked.');
            return;
        }
        if (!confirm('Do you want to book this time slot?')) {
            return;
        }
        let calendarApi = selectInfo.view.calendar;

        calendarApi.unselect();

        const newApp = {
            start: selectInfo.startStr,
            end: selectInfo.endStr,
            allDay: selectInfo.allDay,
            title: "patient",
            resourceId: selectInfo.resource ? selectInfo.resource.id : null,
        };

        const AppToStore = {
            start: selectInfo.startStr,
            end: selectInfo.endStr,
            resourceId: selectInfo.resource ? selectInfo.resource.id : null,
            doctorId: this.props.isDoctor ? this.user.uid : this.props.doctorId,
            ...(this.props.isDoctor ? {} : { patientId: this.user.uid }),
            ...(this.props.isDoctor ? {} : { meetLink: generateGoogleMeetLink() }),
        };

        try {
            // Add the event to Firestore
            const docRef = await addDoc(collection(db, "appointments"), AppToStore);
            newApp.id = docRef.id;
            calendarApi.addEvent(newApp);
        } catch (e) {
            console.error("Error adding document: ", e);
        }

    };


    handleEventClick = async (clickInfo) => {
        if (this.props.isDoctor) {
            if (confirm(`Are you sure you want to delete the event '${clickInfo.event.title}'`)) {
                const eventId = clickInfo.event.id;
                clickInfo.event.remove();

                try {
                    await deleteDoc(doc(db, "appointments", eventId));
                    toast.success('Appointment deleted successfully.');
                } catch (e) {
                    console.error("Error removing document: ", e);
                    toast.error('Error removing the appointment.');
                }
            }
        } else {
            alert('You cannot modify this appointment.');
        }
    };

    func
    handleEvents = (events) => {
        // Compare the new events with the current state to prevent unnecessary updates
        const currentAppIds = this.state.currentApps.map(event => event.id);
        const newAppIds = events.map(event => event.id);

        // Update state only if the events have changed
        if (JSON.stringify(currentAppIds) !== JSON.stringify(newAppIds)) {
            this.setState({
                currentApps: events
            });
        }
    };
    ;
    getEventClassNames(prob) {
        return !prob ? 'disabled-event' : ''; // Add a 'disabled-event' class for patients
    }
    handlePrint = () => {
        window.print();
    };

}

function renderEventContent(eventInfo, isDoctor) {
    const isPatient = !isDoctor;
    return (
        <div>
            <b style={{ opacity: isPatient ? '0.5' : '1' }}>{eventInfo.timeText}</b>
            {" "}<i style={{ opacity: isPatient ? '0.5' : '1' }}>{'    '} {isPatient ? '' : eventInfo.title}</i>
        </div>
    );
}


function renderSidebarEvent(event) {
    return (
        <li key={`${event.id}-${event.start}`}>
            <b>{formatDate(event.start, { year: 'numeric', month: 'short', day: 'numeric' })}</b>
            {" "}<i>{event.title}</i>
        </li>
    );
}
