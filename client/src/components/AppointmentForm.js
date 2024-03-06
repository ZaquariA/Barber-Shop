import React, { useState } from "react";

function AppointmentForm({ barbers, haircuts }) {
    const [formData, setFormData] = useState({
        time: '',
        hc_notes: '',
        barber_id: '',
        haircut_id: ''
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('/appointments', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'  // Set the Content-Type header to 'application/json'
                },
                body: JSON.stringify(formData)
            });
            if (response.ok) {
                console.log('Appointment created successfully');
                // Reset form data
                setFormData({
                    time: '',
                    hc_notes: '',
                    barber_id: '',
                    haircut_id: ''
                });
            } else {
                console.error('Failed to create appointment');
            }
        } catch (error) {
            console.error('Error creating appointment:', error);
        }
    };
    

    return (
        <form className="appointment_form" onSubmit={handleSubmit}>
            <label>
                Time:
                <input type="text" name="time" value={formData.time} onChange={handleChange} />
            </label>
            <label>
                HC Notes:
                <input name="hc_notes" value={formData.hc_notes} onChange={handleChange} />
            </label>
            <label>
                Barber:
                <select name="barber_id" value={formData.barber_id} onChange={handleChange}>
                    <option value="">Select Barber</option>
                    {barbers.map(barber => (
                        <option key={barber.id} value={barber.id}>{barber.name}</option>
                    ))}
                </select>
            </label>
            <label>
                Haircut:
                <select name="haircut_id" value={formData.haircut_id} onChange={handleChange}>
                    <option value="">Select Haircut</option>
                    {haircuts.map(haircut => (
                        <option key={haircut.id} value={haircut.id}>{haircut.name}</option>
                    ))}
                </select>
            </label>
            <button type="submit">Submit</button>
        </form>
    );
}

export default AppointmentForm;
