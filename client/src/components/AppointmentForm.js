import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

function AppointmentForm({ barbers, haircuts, customers }) {
    const history = useHistory();
    const [formData, setFormData] = useState({
        time: '',
        hc_notes: '',
        barber_id: '',
        customer_id: '',
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
                    customer_id: '',
                    haircut_id: ''
                });
                // Route back to the Appointment component
                history.push('/appointments');
            } else {
                console.error('Failed to create appointment');
            }
        } catch (error) {
            console.error('Error creating appointment:', error);
        }
    };

    return (
        <form className="appointment_form" onSubmit={handleSubmit}>
            <table>
                <tbody>
                    <tr>
                        <td>
                            <label>Time:</label>
                        </td>
                        <td>
                            <input type="text" name="time" value={formData.time} onChange={handleChange} />
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <label>HC Notes:</label>
                        </td>
                        <td>
                            <input name="hc_notes" value={formData.hc_notes} onChange={handleChange} />
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <label>Barber:</label>
                        </td>
                        <td>
                            <select name="barber_id" value={formData.barber_id} onChange={handleChange}>
                                <option value="">Select Barber</option>
                                {barbers.map(barber => (
                                    <option key={barber.id} value={barber.id}>{barber.name}</option>
                                ))}
                            </select>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <label>Customer:</label>
                        </td>
                        <td>
                            <select name="customer_id" value={formData.customer_id} onChange={handleChange}>
                                <option value="">Select Customer</option>
                                {customers.map(customer => (
                                    <option key={customer.id} value={customer.id}>{customer.name}</option>
                                ))}
                            </select>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <label>Haircut:</label>
                        </td>
                        <td>
                            <select name="haircut_id" value={formData.haircut_id} onChange={handleChange}>
                                <option value="">Select Haircut</option>
                                {haircuts.map(haircut => (
                                    <option key={haircut.id} value={haircut.id}>{haircut.name}</option>
                                ))}
                            </select>
                        </td>
                    </tr>
                    <tr>
                        <td colSpan="2">
                            <button type="submit">Submit</button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </form>
    );
}

export default AppointmentForm;
