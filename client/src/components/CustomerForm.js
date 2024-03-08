import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import './react.css'; // Import CSS file for styling

function CustomerForm() {
  const history = useHistory();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch('/customers', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        history.push('/customers'); // Redirect to the Customer component
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div className="center">
      <form className="customer-form" onSubmit={handleSubmit}>
        <table>
          <tbody>
            <tr>
              <td>
                <label>Name:</label>
              </td>
              <td>
                <input type="text" name="name" value={formData.name} onChange={handleChange} />
              </td>
            </tr>
            <tr>
              <td>
                <label>Email:</label>
              </td>
              <td>
                <input type="email" name="email" value={formData.email} onChange={handleChange} />
              </td>
            </tr>
            <tr>
              <td>
                <label>Phone Number:</label>
              </td>
              <td>
                <input type="tel" name="phone" value={formData.phone} onChange={handleChange} />
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
    </div>
  );
}

export default CustomerForm;
