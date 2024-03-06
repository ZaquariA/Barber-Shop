import React, { useState, useEffect } from 'react';


function Appointment() {
    const [appointmentList, setAppointmentList] = useState([]);

    useEffect(() => {
        fetch('/appointments')
         .then(res => res.json())
         .then(dataArr => setAppointmentList(dataArr))
    }, []);

    return (
        <div className="appointment">
            {appointmentList.map(appointment=> {
                return (
                    <div className="appointment_div" key={appointment.id}>
                        <h1 className="appointment_time">{appointment.time}</h1>
                        <h1 className="appointment_hc_notes">{appointment.hc_notes}</h1>
                        <h1 className="appointment_barber_name">{appointment.barber ? appointment.barber.name : 'No Barber Assigned'}</h1>
                        <h1 className="appointment_haircut_id">{appointment.haircut.name}</h1>
                    </div>
                )
            })}
        </div>
    )
}

export default Appointment;