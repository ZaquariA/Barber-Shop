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
        window.location.href = 'http://localhost:3000/haircuts';
      }
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className="haircut">
      {haircutList.map(haircut => (
        <div key={haircut.id} className="hair-card">
          <h2>{haircut.name}</h2>
          <div className="image-container">
            <img src={haircut.image} alt={haircut.name} />
          </div>
          <p>Price: ${haircut.price}</p>
          <button onClick={() => handleDeleteHaircut(haircut.id)}>Delete</button>
        </div>
      ))}
    </div>
  );
}

export default Haircut;
