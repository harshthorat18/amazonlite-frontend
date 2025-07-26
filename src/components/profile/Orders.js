import React, { useEffect, useState } from 'react';
import NameBanner from './NameBanner';
import { useNavigate } from 'react-router-dom';
import './profile.css';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import OrderTop from './OrderTop';
import OrderedProduct from './OrderedProduct';
import Loader from '../loader/Loader';

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000";

const Orders = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [userData, setUserData] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    async function fetchUser() {
      try {
        const res = await axios.get(`${API_URL}/api/getAuthUser`, {
          withCredentials: true
        });

        if (res) {
          setUserData(res.data);
          setIsLoading(false);
        }
      } catch (error) {
        if (error?.response?.data?.message === "No token provided") {
          navigate('/login');
        } else {
          console.error(error);
        }
      }
    }

    fetchUser();
  }, [navigate]);

  if (isLoading) return <Loader />;

  if (!userData) return null;

  const name = userData.name;
  const fname = name.split(' ')[0] + "'s Orders";

  const orders = [...(userData.orders || [])].reverse();

  return (
    <div className='profile'>
      <NameBanner name={fname} />
      <div className='order-list'>
        {orders.length > 0 ? (
          orders.map((order, index) => {
            const orderItem = order.orderInfo;
            const orderedProducts = orderItem?.products || [];

            return (
              <div className='order' key={orderItem._id || index}>
                <OrderTop order={orderItem} />
                <div className='order-bottom'>
                  {orderedProducts.map((product, i) => (
                    <OrderedProduct key={product._id || i} product={product} />
                  ))}
                </div>
              </div>
            );
          })
        ) : (
          <p className="text-center">No orders found.</p>
        )}
      </div>
    </div>
  );
};

export default Orders;
