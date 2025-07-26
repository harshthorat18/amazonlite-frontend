import React from 'react';
import './home.css';
import { Link } from 'react-router-dom';

const Card = ({ name, img, bottom, link = "#" }) => {
  return (
    <div className='cards-card'>
      <h5>{name}</h5>
      <div className='img-container'>
        <Link to={link}>
          <img src={`/images/${img}.jpg`} alt={img} />
        </Link>
      </div>
      <Link to={link} className='bottom-link'>
        {bottom}
      </Link>
    </div>
  );
};

export default Card;
