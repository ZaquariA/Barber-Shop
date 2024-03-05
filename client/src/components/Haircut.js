import React, { useState, useEffect } from 'react';

function Haircut() {
  const [haircutList, setHaircutList] = useState([]);

  useEffect(() => {
    fetch('/haircuts')
      .then(res => res.json())
      .then(dataArr => setHaircutList(dataArr))
  }, []);

  return (
    <div className="haircut">
      {haircutList.map(haircut => (
        <div key={haircut.id}>
          <h2>{haircut.name}</h2>
          <p>Price: ${haircut.price}</p>
          <img src={haircut.image} alt={haircut.name} />
        </div>
      ))}
    </div>
  );
}

// 123

export default Haircut;