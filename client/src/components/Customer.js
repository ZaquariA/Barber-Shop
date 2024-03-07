import React, { useState, useEffect } from "react";

function Customer() {
    const [customerList, setCustomerList] = useState([]);
    const [newName, setNewName] = useState('');
    const [newPhone, setNewPhone] = useState('');
    const [newEmail, setNewEmail] = useState('');
    const [customerToUpdate, setCustomerToUpdate] = useState(null);

    useEffect(() => {
        fetch('/customers')
         .then(res => res.json())
         .then(dataArr => setCustomerList(dataArr))
    }, []);

    const handleCustomerDelete = async (id) => {
        try {
            const response = await fetch(`/customers/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            if (response.ok) {
                console.log('Customer deleted successfully');
                setCustomerList(customerList.filter(customer => customer.id !== id));
            }
        } catch (error) {
            console.error(error);
        }
    }

    const toggleForm = (customer) => {
        setNewName(customer.name);
        setNewPhone(customer.phone);
        setNewEmail(customer.email);
        setCustomerToUpdate(customer);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = { name: newName, phone: newPhone, email: newEmail };
        await handleCustomerUpdate(customerToUpdate.id, data);
        setCustomerToUpdate(null);
    };

    const handleCustomerUpdate = async (id, newData) => {
        try {
            const response = await fetch(`/customers/${id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(newData)
            });
            if (response.ok) {
                console.log('Customer updated successfully');
                setCustomerList(customerList.map(customer => {
                    if (customer.id === id) {
                        return { ...customer, ...newData };
                    }
                    return customer;
                }));
            }
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <div className="customer">
          <table className="customer-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Phone</th>
                <th>Email</th>
                <th></th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {customerList.map((customer) => (
                <tr key={customer.id}>
                  <td>{customer.name}</td>
                  <td>{customer.phone}</td>
                  <td>{customer.email}</td>
                  <td>
                    <button onClick={() => toggleForm(customer)}>Update</button>
                  </td>
                  <td>
                    <button onClick={() => handleCustomerDelete(customer.id)}>
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {customerToUpdate && (
            <form onSubmit={handleSubmit}>
              {/* Form fields */}
            </form>
          )}
        </div>
      );
    }

export default Customer;
