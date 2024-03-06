import React from 'react';
import Haircut from './Haircut';
import { Link } from 'react-router-dom';

function MainPage() {
  return (
    <div className='cards'>
    <Link to="/haircuts">
      <div className="card">
        <img src="https://cdn.discordapp.com/attachments/1214264641463656448/1214264710258622494/2Q.png?ex=65f87b22&is=65e60622&hm=bf7028c596242c02fc1b1f81ea3bfd5cee9df2466f453d10d80a2fe51c75a9e8&" alt="Image 1" />
        <h2>Card 1</h2>
        <p>10$</p>
      </div>
    </Link>
    <Link to="/haircuts">
      <div className="card">
        <img src="https://cdn.discordapp.com/attachments/1214264641463656448/1214264710258622494/2Q.png?ex=65f87b22&is=65e60622&hm=bf7028c596242c02fc1b1f81ea3bfd5cee9df2466f453d10d80a2fe51c75a9e8&" alt="Image 2" />
        <h2>Card 2</h2>
        <p>10$</p>
      </div>
    </Link>
    <Link to="/haircuts">
      <div className="card">
        <img src="https://cdn.discordapp.com/attachments/1214264641463656448/1214264710258622494/2Q.png?ex=65f87b22&is=65e60622&hm=bf7028c596242c02fc1b1f81ea3bfd5cee9df2466f453d10d80a2fe51c75a9e8&" alt="Image 3" />
        <h2>Card 3</h2>
        <p>10$</p>
      </div>
    </Link>
    </div>
  );
}

export default MainPage;