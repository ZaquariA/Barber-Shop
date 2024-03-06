import React, { useState, useEffect } from 'react';


function Appointment() {
    const [appointmentList, setAppointmentList] = useState([]);

    useEffect(() => {
        fetch('/appointments')
         .then(res => res.json())
         .then(dataArr => setAppointmentList(dataArr))
    }, []);

    // const handlePatchAppointment = async (id, data) => {
    //     fetch(`/appointments/${id}`, {
    //         method: 'PATCH',
    //         headers: {
    //             'Content-Type': 'application/json'
    //         },
    //         body: JSON.stringify(data)
    //     })
    //  .then(res => res.json())
    // }

     const handleDeleteAppointment = async (id) => {
        try {
            const response = await fetch(`/appointments/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            if (response.ok) {
                console.log('Appointment deleted successfully');
            }
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <div className="appointment">
            {appointmentList.map(appointment=> {
                return (
                    <div className="appointment_div" key={appointment.id}>
                        <h1 className="appointment_time">{appointment.time}</h1>
                        <h1 className="appointment_hc_notes">{appointment.hc_notes}</h1>
                        <h1 className="appointment_barber_name">{appointment.barber ? appointment.barber.name : 'No Barber Assigned'}</h1>
                        <h1 className="appointment_haircut_id">{appointment.haircut.name}</h1>
                        {/* <button onClick={() => handlePatchAppointment(appointment.id, { time: 'new time', hc_notes: 'new notes' })}>Update</button> */}
                        <button onClick={() => handleDeleteAppointment(appointment.id)}>Delete</button>
                    </div>
                )
            })}
        </div>
    )
}

export default Appointment;

