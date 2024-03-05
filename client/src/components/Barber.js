import React, { useState, useEffect } from 'react';



function Barber() {
  const [barberList, setBarberList] = useState([]);

  useEffect(() => {
    fetch('/barbers')
    .then(res => res.json())
    .then(dataArr => setBarberList(dataArr))
  }, []);

  return (
    <div class="barber">
      {barberList.map((barber) => (
        <div key={barber.id}>
          <h2>{barber.name}</h2>
          <img src={barber.image} alt={barber.name} />
          <p>{barber.phone}</p>
          <p>{barber.email}</p>
        </div>
      ))}
    </div>
  );
}

export default Barber;