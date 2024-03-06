import React, { useState, useEffect } from 'react';



function Barber() {
  const [barberList, setBarberList] = useState([]);

  useEffect(() => {
    fetch('/barbers')
    .then(res => res.json())
    .then(dataArr => setBarberList(dataArr))
  }, []);

  return (
    <div className="barber">
      {barberList.map((barber) => (
        <div key={barber.id}>
          <h2 className="barber_name">{barber.name}</h2>
          <img src={barber.image} alt={barber.name} />
          <p>{barber.phone}</p>
          <p>{barber.email}</p>
        </div>
      ))}
    </div>
  );
}

export default Barber;