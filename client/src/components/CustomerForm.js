import React, { useState } from 'react';

function CustomerForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone_num: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Perform form submission logic here
    console.log(formData);
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
        <input name="phone_num" value={formData.phone_num} onChange={handleChange} />
      </label>
      <button type="submit">Submit</button>
    </form>
  );
}

export default CustomerForm;