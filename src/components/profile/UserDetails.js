import React from 'react';
import './profile.css';
import PersonIcon from '@mui/icons-material/Person';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIphoneIcon from '@mui/icons-material/PhoneIphone';

const UserDetails = ({ user }) => {
  if (!user) return null; // prevent rendering on undefined

  const { name, email, number } = user;

  return (
    <div className='user-details'>
      <div className='user-detail'>
        <PersonIcon className='icon' />
        <h5>{name || "N/A"}</h5>
      </div>
      <div className='user-detail'>
        <EmailIcon className='icon' />
        <h5>{email || "N/A"}</h5>
      </div>
      <div className='user-detail'>
        <PhoneIphoneIcon className='icon' />
        <h5>{number || "N/A"}</h5>
      </div>
    </div>
  );
};

export default UserDetails;
