import React, { useState, useEffect } from "react";


function Customer() {
    const [customerList, setCustomerList] = useState([]);

    useEffect(() => {
        fetch('/customers')
         .then(res => res.json())
         .then(dataArr => setCustomerList(dataArr))
    }, []);

    return (
        <div className="customer">
            {customerList.map(customer => {
                return (
                    <div className="customer_div" key={customer.id}>
                        <h1 className="customer_name">{customer.name}</h1>
                        <h1 className="customer_preferred_haircut">{customer.preferref_haircut}</h1>
                        <h1 className="customer_phone">{customer.phone}</h1>
                        <h1 className="customer_email">{customer.email}</h1>
                    </div>
                )
            })}
        </div>
    )
}

export default Customer;
