import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

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
    <form className="customer_form" onSubmit={handleSubmit}>
      <label>
        Name:
        <input type="text" name="name" value={formData.name} onChange={handleChange} />
      </label>
      <label>
        Email:
        <input type="email" name="email" value={formData.email} onChange={handleChange} />
      </label>
      <label>
        Phone Number:
        <input type="tel" name="phone" value={formData.phone} onChange={handleChange} />
      </label>
      <button type="submit">Submit</button>
    </form>
  );
}

export default CustomerForm;
