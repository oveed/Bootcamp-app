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

const RESOURCES = [
    { id: 'a', title: 'Auditorium A' },
    { id: 'b', title: 'Auditorium B', eventColor: 'green' },
    { id: 'c', title: 'Auditorium C', eventColor: 'orange' },
];
function func(params) {
    console.log(params)
}
export default class DemoApp extends React.Component {

    state = {
        weekendsVisible: true,
        currentEvents: []
    };

    async componentDidMount() {
        // Fetch events from Firestore when component mounts
        const querySnapshot = await getDocs(collection(db, "events"));
        const events = querySnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }));
        this.setState({ currentEvents: events });
    }

    render() {
        return (
            <div className='demo-app'>
                {this.renderSidebar()}
                <div className='demo-app-main'>
                    <FullCalendar
                        plugins={[
                            adaptivePlugin,
                            dayGridPlugin,
                            timeGridPlugin,
                            interactionPlugin,
                            resourceTimelinePlugin,
                        ]}
                        headerToolbar={{
                            left: 'prev,next today',
                            center: 'title',
                            right: 'dayGridMonth,timeGridWeek,resourceTimelineDay'
                        }}
                        initialView='resourceTimelineDay'
                        editable={true}
                        selectable={true}
                        selectMirror={true}
                        dayMaxEvents={true}
                        weekends={this.state.weekendsVisible}
                        resources={RESOURCES}
                        events={this.state.currentEvents} // Load events from state
                        select={this.handleDateSelect}
                        eventContent={renderEventContent}
                        eventClick={this.handleEventClick}
                        eventsSet={this.handleEvents}
                    />
                </div>
            </div>
        );
    }

    renderSidebar() {
        return (
            <div className='demo-app-sidebar'>
                <div className='demo-app-sidebar-section'>
                    <h2>All Events ({this.state.currentEvents.length})</h2>
                    <ul>
                        {this.state.currentEvents.map(renderSidebarEvent)}
                    </ul>
                </div>
            </div>
        );
    }

    handleWeekendsToggle = () => {
        this.setState({
            weekendsVisible: !this.state.weekendsVisible
        });
    };

    handleDateSelect = async (selectInfo) => {
        let title = prompt('Please enter a new title for your event');
        let calendarApi = selectInfo.view.calendar;

        calendarApi.unselect(); // clear date selection

        if (title) {
            const newEvent = {
                title,
                start: selectInfo.startStr,
                end: selectInfo.endStr,
                allDay: selectInfo.allDay,
                resourceId: selectInfo.resource.id
            };

            try {
                // Add the event to Firestore
                const docRef = await addDoc(collection(db, "events"), newEvent);
                newEvent.id = docRef.id;

                // Add the event to FullCalendar's state
                calendarApi.addEvent(newEvent);
            } catch (e) {
                console.error("Error adding document: ", e);
            }
        }
    };

    handleEventClick = async (clickInfo) => {
        if (confirm(`Are you sure you want to delete the event '${clickInfo.event.title}'`)) {
            const eventId = clickInfo.event.id;
            clickInfo.event.remove();

            try {
                // Remove the event from Firestore
                await deleteDoc(doc(db, "events", eventId));
            } catch (e) {
                console.error("Error removing document: ", e);
            }
        }
    };
    func
    handleEvents = (events) => {
        // Compare the new events with the current state to prevent unnecessary updates
        const currentEventIds = this.state.currentEvents.map(event => event.id);
        const newEventIds = events.map(event => event.id);

        // Update state only if the events have changed
        if (JSON.stringify(currentEventIds) !== JSON.stringify(newEventIds)) {
            this.setState({
                currentEvents: events
            });
        }
    };
    ;

    handlePrint = () => {
        window.print();
    };

}

function renderEventContent(eventInfo) {
    return (
        <>
            <b>{eventInfo.timeText}</b>{func(eventInfo)}
            <i>{eventInfo.event.title}</i>
        </>
    );
}

function renderSidebarEvent(event) {
    return (
        <li key={event.id}>
            <b>{formatDate(event.start, { year: 'numeric', month: 'short', day: 'numeric' })}</b>
            {" "}<i>{event.title}</i>
        </li>
    );
}
