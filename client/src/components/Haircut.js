import React, { useState, useEffect } from 'react';

function Haircut() {
  const [haircutList, setHaircutList] = useState([]);

  useEffect(() => {
    fetch('/haircuts')
      .then(res => res.json())
      .then(dataArr => setHaircutList(dataArr))
  }, []);

  const handleDeleteHaircut = async (id) => {
    try {
      const response = await fetch(`/haircuts/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        }
      });
      if (response.ok) {
        console.log('Haircut deleted successfully');
      }
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className="haircut">
      {haircutList.map(haircut => (
        <div key={haircut.id}>
          <h2>{haircut.name}</h2>
          <p>Price: ${haircut.price}</p>
          <img src={haircut.image} alt={haircut.name} />
          <button onClick={() => handleDeleteHaircut(haircut.id)}>Delete</button>
        </div>
      ))}
    </div>
  );
}

// 123

export default Haircut;