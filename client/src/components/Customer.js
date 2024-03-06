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
            {customerList.map(customer => {
                return (
                    <div className="customer_div" key={customer.id}>
                        <h1 className="customer_name">{customer.name}</h1>
                        <h1 className="customer_phone">{customer.phone}</h1>
                        <h1 className="customer_email">{customer.email}</h1>
                        <button onClick={() => handleCustomerDelete(customer.id)}>Delete</button>
                        <button onClick={() => toggleForm(customer)}>Update</button>
                    </div>
                )
            })}
            {customerToUpdate && (
                <form onSubmit={handleSubmit}>
                    <label>
                        New Name:
                        <input
                            type="text"
                            value={newName}
                            onChange={(e) => setNewName(e.target.value)}
                        />
                    </label>
                    <label>
                        New Phone:
                        <input
                            type="text"
                            value={newPhone}
                            onChange={(e) => setNewPhone(e.target.value)}
                        />
                    </label>
                    <label>
                        New Email:
                        <input
                            type="text"
                            value={newEmail}
                            onChange={(e) => setNewEmail(e.target.value)}
                        />
                    </label>
                    <button type="submit">Submit</button>
                </form>
            )}
        </div>
    )
}

export default Customer;
