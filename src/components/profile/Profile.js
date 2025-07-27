import React, { useEffect, useState } from 'react';
import NameBanner from './NameBanner';
import UserDetails from './UserDetails';
import { useNavigate } from 'react-router-dom';
import './profile.css';
import axios from 'axios';
import Loader from '../loader/Loader';

const Profile = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [userData, setUserData] = useState(null);

  const navigate = useNavigate();

  useEffect(function () {
    async function fetchUser() {
      try {
        const res = await axios.get("https://amazonlite-backend.onrender.com/api/getAuthUser", {
          withCredentials: true
        });

        if (res) {
          setUserData(res.data);
          setIsLoading(false);
        }
      } catch (error) {
        if (error.response?.data?.message === "No token provided") {
          navigate('/login');
        } else {
          console.log(error);
        }
      }
    }

    fetchUser();
  }, [navigate]);

  if (isLoading) {
    return <Loader />;
  }

  if (!userData) {
    return <p style={{ textAlign: 'center', marginTop: '2rem' }}>User data not found.</p>;
  }

  const name = userData.name;
  const fname = name.includes(' ') ? name.substring(0, name.indexOf(' ')) + "'s Account" : name + "'s Account";

  return (
    <div className='profile'>
      <NameBanner name={fname} />
      <UserDetails user={userData} />
    </div>
  );
};

export default Profile;
