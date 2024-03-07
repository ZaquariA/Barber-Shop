import React from 'react';
import Haircut from './Haircut';
import { Link } from 'react-router-dom';

function MainPage() {
  return (
    <div className='cards'>
      <Link to="/haircuts" className='link'>
        <div className="card">
          <div className="image-container">
            <img src="https://cdn.discordapp.com/attachments/1212789264509566986/1215414515089416193/image.png?ex=65fca9f9&is=65ea34f9&hm=6efadd9406bef04cf295c641c062f47b9b40f4a8014fb8ff82e30ebae0487ccf&" alt="Image 1" />
          </div>
          <h2>New York Slice</h2>
          <p>50$</p>
        </div>
      </Link>
      <Link to="/haircuts" className='link'>
        <div className="card">
          <div className="image-container">
            <img src="https://cdn.discordapp.com/attachments/1212789264509566986/1215414514753863690/wp-16001989765553425548261923989282.png?ex=65fca9f9&is=65ea34f9&hm=5b630c18850aa39bb44f736aa58615983638bcb2ffbf74056b6f66a1e29d383e&" alt="Image 2" />
          </div>
          <h2>A Little Off the Top</h2>
          <p>20$</p>
        </div>
      </Link>
      <Link to="/haircuts" className='link'>
        <div className="card">
          <div className="image-container">
            <img src="https://cdn.discordapp.com/attachments/1212789264509566986/1215414514434969610/image.png?ex=65fca9f9&is=65ea34f9&hm=0490e9d5671b3beee33b83ad606dd7a2fd9568436bae8d851bb4ed5db116662c&" alt="Image 3" />
          </div>
          <h2>Checkers</h2>
          <p>100$</p>
        </div>
      </Link>
    </div>
  );
}

export default MainPage;