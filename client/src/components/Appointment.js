import React, { useState, useEffect } from 'react';

function Appointment() {
  const [appointmentList, setAppointmentList] = useState([]);
  const [newTime, setNewTime] = useState('');
  const [newNotes, setNewNotes] = useState('');
  const [appointmentToUpdate, setAppointmentToUpdate] = useState(null);

  useEffect(() => {
    fetch('/appointments')
      .then(res => res.json())
      .then(dataArr => setAppointmentList(dataArr));
  }, []);

  const handlePatchAppointment = async (id, data) => {
    fetch(`/appointments/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
      .then(res => res.json())
      .then(() => window.location.reload());
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
        console.log('Appointment deleted successfully');
        // Update appointment list after deletion
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
            <h1 className="appointment_barber_name">{appointment.barber ? appointment.barber.name : 'No Barber Assigned'}</h1>
            <h1 className="appointment_haircut_id">{appointment.haircut.name}</h1>
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
