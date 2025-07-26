import React from 'react';
import './home.css';
import { Link } from 'react-router-dom';

const MultiCard = ({ name, img, a, b, c, d, bottom, link = "#" }) => {
  const items = [
    { img: `${img}-a.jpg`, label: a },
    { img: `${img}-b.jpg`, label: b },
    { img: `${img}-c.jpg`, label: c },
    { img: `${img}-d.jpg`, label: d }
  ];

  return (
    <div className='cards-card'>
      <h5>{name}</h5>
      <div className="row">
        {items.map((item, index) => (
          <div className="col-6" key={index}>
            <div className='multi-img-container'>
              <Link to={link}>
                <img src={`/images/${item.img}`} alt={item.label} />
              </Link>
            </div>
            <span>{item.label}</span>
          </div>
        ))}
      </div>
      <Link to={link} className='bottom-link'>
        {bottom}
      </Link>
    </div>
  );
};

export default MultiCard;
