import React, { useState, useEffect } from 'react';
import deleteSound from '../Sound/rusty-blade-slice-5-186530.mp3';

function Appointment() {
  const [appointmentList, setAppointmentList] = useState([]);
  const [newTime, setNewTime] = useState('');
  const [newNotes, setNewNotes] = useState('');
  const [appointmentToUpdate, setAppointmentToUpdate] = useState(null);

  const audio = new Audio(deleteSound);

  useEffect(() => {
    fetch('/appointments')
      .then(res => res.json())
      .then(dataArr => setAppointmentList(dataArr));
  }, []);

  const handlePatchAppointment = async (id, data) => {
    try {
      const response = await fetch(`/appointments/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });
      if (response.ok) {
        console.log('Appointment updated successfully');
        setAppointmentList(appointmentList.map(appointment => {
          if (appointment.id === id) {
            return { ...appointment, ...data };
          }
          return appointment;
        }));
        setAppointmentToUpdate(null);
      } else {
        console.log('Failed to update appointment');
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteAppointment = async (id) => {
    try {
      const response = await fetch(`/appointments/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        }
      });
      if (response.ok) {
        audio.play();
        console.log('Appointment deleted successfully');
        setAppointmentList(appointmentList.filter(appointment => appointment.id !== id));
      }
    } catch (error) {
      console.error(error);
    }
  };

  const toggleForm = (appointment) => {
    setNewTime(appointment.time);
    setNewNotes(appointment.hc_notes);
    setAppointmentToUpdate(appointment);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = { time: newTime, hc_notes: newNotes };
    await handlePatchAppointment(appointmentToUpdate.id, data);
    // Close the form after submission
    setAppointmentToUpdate(null);
  };

  return (
    <div className="appointment">
      {appointmentList.map(appointment => {
        return (
          <div className="appointment_div" key={appointment.id}>
            <h1 className="appointment_time">{appointment.time}</h1>
            <h1 className="appointment_hc_notes">{appointment.hc_notes}</h1>
            <h1 className="appointment_barber_name">{appointment.barber && appointment.barber.name ? appointment.barber.name : 'No Barber Assigned'}</h1>
            <h1 className="appointment_customer_name">{appointment.customer && appointment.customer.name ? appointment.customer.name : 'No Customer Assigned'}</h1>
            <button onClick={() => toggleForm(appointment)}>Update</button>
            <button onClick={() => handleDeleteAppointment(appointment.id)}>Delete</button>
          </div>
        );
      })}
      {appointmentToUpdate && (
        <form onSubmit={handleSubmit}>
          <label>
            New Time:
            <input
              type="text"
              value={newTime}
              onChange={(e) => setNewTime(e.target.value)}
            />
          </label>
          <label>
            New Notes:
            <input
              type="text"
              value={newNotes}
              onChange={(e) => setNewNotes(e.target.value)}
            />
          </label>
          <button type="submit">Submit</button>
        </form>
      )}
    </div>
  );
}

export default Appointment;

