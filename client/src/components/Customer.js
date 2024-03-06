import React, { useState, useEffect } from "react";


function Customer() {
    const [customerList, setCustomerList] = useState([]);

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
                    </div>
                )
            })}
        </div>
    )
}

export default Customer;
